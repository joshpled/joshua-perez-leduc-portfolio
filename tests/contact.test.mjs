import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContact, contactConfigured, CONTACT_EMAIL } from '../lib/contact.ts';

const env = { RESEND_API_KEY: 'test-only', TURNSTILE_SECRET_KEY: 'test-only', TURNSTILE_SITE_KEY: 'test-only', CONTACT_FROM_EMAIL: 'contact@forms.example.com' };
const valid = { name: 'Test Visitor', email: 'visitor@example.com', company: '', message: 'I would like to discuss a website.', website: '', token: 'test-token', submissionId: 'a4e66759-908c-4d71-99d6-aa85a8467128' };
function request(overrides = {}, headers = {}) {
  return new Request('https://allpurposeapps.com/api/contact', { method: 'POST', headers: { origin: 'https://allpurposeapps.com', 'content-type': 'application/json', ...headers }, body: JSON.stringify({ ...valid, ...overrides }) });
}
const challenge = { success: true, hostname: 'allpurposeapps.com', action: 'contact' };
function provider(verify = challenge, delivery = { id: 'accepted-test-id' }, deliveryStatus = 200) {
  const calls = [];
  const send = async (url, options) => { calls.push({ url, ...options }); return Response.json(url.includes('siteverify') ? verify : delivery, { status: url.includes('siteverify') ? 200 : deliveryStatus }); };
  return { calls, send };
}

test('sends a text email to only the owner with visitor Reply-To after verification', async () => {
  const p = provider();
  const result = await handleContact(request(), env, p.send);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.equal(p.calls.length, 2);
  const email = JSON.parse(p.calls[1].body);
  assert.deepEqual(email.to, [CONTACT_EMAIL]);
  assert.equal(email.reply_to, valid.email);
  assert.equal(email.from, 'All-Purpose Apps website <contact@forms.example.com>');
  assert.match(email.text, /I would like/);
  assert.equal(email.html, undefined);
});

for (const [label, values] of Object.entries({
  'invalid email': { email: 'bad' }, 'short message': { message: 'Hi' }, 'long message': { message: 'x'.repeat(5001) },
  'blank name': { name: '  ' }, 'header injection': { name: 'Test\r\nBcc: another@example.com' },
  'missing token': { token: '' }, 'missing id': { submissionId: '' }, 'recipient override': { to: 'another@example.com' },
  'filled honeypot': { website: 'spam.example.com' },
})) test(`rejects ${label} without provider calls`, async () => {
  const p = provider(); assert.equal((await handleContact(request(values), env, p.send)).status, 400); assert.equal(p.calls.length, 0);
});

for (const origin of ['https://evil.example', 'null', '']) test(`rejects untrusted origin ${origin}`, async () => {
  const p = provider(); assert.equal((await handleContact(request({}, { origin }), env, p.send)).status, 403); assert.equal(p.calls.length, 0);
});

test('rejects unsupported content type and malformed JSON', async () => {
  const p = provider();
  assert.equal((await handleContact(request({}, { 'content-type': 'text/plain' }), env, p.send)).status, 415);
  const r = new Request('https://allpurposeapps.com/api/contact', { method: 'POST', headers: { origin: 'https://allpurposeapps.com', 'content-type': 'application/json' }, body: '{' });
  assert.equal((await handleContact(r, env, p.send)).status, 400); assert.equal(p.calls.length, 0);
});

test('bounds actual body bytes without relying on Content-Length', async () => {
  const p = provider(); assert.equal((await handleContact(request({ message: 'x'.repeat(33_000) }), env, p.send)).status, 413); assert.equal(p.calls.length, 0);
});

for (const key of Object.keys(env)) test(`fails closed with missing ${key}`, async () => {
  const p = provider(); const config = { ...env, [key]: '' };
  assert.equal(contactConfigured(config), false);
  assert.equal((await handleContact(request(), config, p.send)).status, 503); assert.equal(p.calls.length, 0);
});

for (const [label, data] of Object.entries({ rejected: { success: false }, expired: { success: false, 'error-codes': ['timeout-or-duplicate'] }, hostname: { ...challenge, hostname: 'evil.example' }, action: { ...challenge, action: 'login' } })) {
  test(`blocks ${label} challenge before email`, async () => {
    const p = provider(data); assert.equal((await handleContact(request(), env, p.send)).status, 400); assert.equal(p.calls.length, 1);
  });
}

test('allows an explicitly configured preview with matching verification hostname', async () => {
  const p = provider({ ...challenge, hostname: 'preview.example.com' });
  assert.equal((await handleContact(request({}, { origin: 'https://preview.example.com' }), { ...env, CONTACT_ALLOWED_ORIGINS: 'https://preview.example.com' }, p.send)).status, 200);
});

for (const [label, body, status] of [['quota', { message: 'Private provider details' }, 429], ['server', {}, 500], ['missing receipt', {}, 200]]) test(`does not claim success on ${label} failure`, async () => {
  const p = provider(challenge, body, status); const result = await handleContact(request(), env, p.send);
  assert.equal(result.status, 502); assert.doesNotMatch(await result.text(), /Private provider details/);
});

test('network failures return a safe retry response without exposing exception details', async () => {
  const result = await handleContact(request(), env, async () => { throw new Error('Private data'); });
  assert.equal(result.status, 502); assert.doesNotMatch(await result.text(), /Private data/);
});

test('unchanged retries share idempotency key even with refreshed challenge tokens; edits get a new key', async () => {
  const p = provider();
  await handleContact(request(), env, p.send);
  await handleContact(request({ token: 'fresh-token' }), env, p.send);
  await handleContact(request({ message: 'A revised inquiry about a different website.' }), env, p.send);
  const deliveries = p.calls.filter(c => c.url.includes('resend'));
  assert.equal(deliveries[0].headers['Idempotency-Key'], deliveries[1].headers['Idempotency-Key']);
  assert.notEqual(deliveries[0].headers['Idempotency-Key'], deliveries[2].headers['Idempotency-Key']);
});
