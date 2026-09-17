import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContact, contactConfigured } from '../lib/contact.ts';

const env = { SUPABASE_SECRET_KEY: 'sb_secret_test_only', TURNSTILE_SECRET_KEY: 'test-only', TURNSTILE_SITE_KEY: 'test-only', SUPABASE_URL: 'https://testproject.supabase.co' };
const valid = { name: 'Test Visitor', email: 'visitor@example.com', company: '', message: 'I would like to discuss a website.', website: '', token: 'test-token', submissionId: 'a4e66759-908c-4d71-99d6-aa85a8467128' };
function request(overrides = {}, headers = {}) {
  return new Request('https://allpurposeapps.com/api/contact', { method: 'POST', headers: { origin: 'https://allpurposeapps.com', 'content-type': 'application/json', ...headers }, body: JSON.stringify({ ...valid, ...overrides }) });
}
const challenge = { success: true, hostname: 'allpurposeapps.com', action: 'contact' };
function provider(verify = challenge, storageStatus = 201) {
  const calls = [];
  const send = async (url, options) => {
    calls.push({ url, ...options });
    return url.includes('siteverify') ? Response.json(verify) : new Response(null, { status: storageStatus });
  };
  return { calls, send };
}

test('stores only validated inquiry fields after verification, with private credentials', async () => {
  const p = provider();
  const result = await handleContact(request(), env, p.send);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.equal(p.calls.length, 2);
  assert.equal(p.calls[1].url, 'https://testproject.supabase.co/rest/v1/contact_inquiries?on_conflict=id');
  assert.equal(p.calls[1].headers.apikey, env.SUPABASE_SECRET_KEY);
  assert.equal(p.calls[1].headers.Authorization, undefined);
  assert.equal(p.calls[1].headers.Prefer, 'resolution=ignore-duplicates,return=minimal');
  assert.equal(p.calls[1].redirect, 'error');
  const inquiry = JSON.parse(p.calls[1].body);
  assert.deepEqual(Object.keys(inquiry).sort(), ['company', 'email', 'id', 'message', 'name']);
  assert.equal(inquiry.email, valid.email);
  assert.equal(inquiry.message, valid.message);
  assert.match(inquiry.id, /^[a-f0-9]{64}$/);
  assert.match((await result.json()).message, /received/);
});

for (const [label, values] of Object.entries({
  'invalid email': { email: 'bad' }, 'short message': { message: 'Hi' }, 'long message': { message: 'x'.repeat(5001) },
  'blank name': { name: '  ' }, 'control characters': { name: 'Test\r\nBcc: another@example.com' },
  'missing token': { token: '' }, 'missing id': { submissionId: '' }, 'client timestamp': { created_at: '2020-01-01' },
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
  test(`blocks ${label} challenge before storage`, async () => {
    const p = provider(data); assert.equal((await handleContact(request(), env, p.send)).status, 400); assert.equal(p.calls.length, 1);
  });
}

test('allows an explicitly configured preview with matching verification hostname', async () => {
  const p = provider({ ...challenge, hostname: 'preview.example.com' });
  assert.equal((await handleContact(request({}, { origin: 'https://preview.example.com' }), { ...env, CONTACT_ALLOWED_ORIGINS: 'https://preview.example.com' }, p.send)).status, 200);
});

for (const [label, status] of [['quota', 429], ['database', 500], ['forbidden', 403], ['unconfirmed status', 200]]) test(`does not claim success on ${label} failure`, async () => {
  const p = provider(challenge, status); const result = await handleContact(request(), env, p.send);
  assert.equal(result.status, 502); assert.match(await result.text(), /retry/);
});

test('does not expose database error details', async () => {
  const send = async url => url.includes('siteverify') ? Response.json(challenge) : Response.json({message: 'Private database details'}, {status: 500});
  assert.doesNotMatch(await (await handleContact(request(), env, send)).text(), /Private database details/);
});

test('rejects publishable keys and invalid project URLs before contacting providers', async () => {
  for (const config of [{...env, SUPABASE_SECRET_KEY: 'sb_publishable_test'}, {...env, SUPABASE_URL: 'https://evil.example'}, {...env, SUPABASE_URL: 'http://testproject.supabase.co'}]) {
    const p = provider(); assert.equal((await handleContact(request(), config, p.send)).status, 503); assert.equal(p.calls.length, 0);
  }
});

test('network failures return a safe retry response without exposing exception details', async () => {
  const result = await handleContact(request(), env, async () => { throw new Error('Private data'); });
  assert.equal(result.status, 502); assert.doesNotMatch(await result.text(), /Private data/);
});

test('unchanged retries share a row ID with refreshed tokens; edits create a new row ID', async () => {
  const p = provider();
  await handleContact(request(), env, p.send);
  await handleContact(request({ token: 'fresh-token' }), env, p.send);
  await handleContact(request({ message: 'A revised inquiry about a different website.' }), env, p.send);
  const records = p.calls.filter(c => c.url.includes('supabase')).map(c => JSON.parse(c.body));
  assert.equal(records[0].id, records[1].id);
  assert.notEqual(records[0].id, records[2].id);
});
