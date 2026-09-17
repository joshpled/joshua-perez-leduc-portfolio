import assert from 'node:assert/strict';
import test from 'node:test';
import nodemailer from 'nodemailer';
import { googleMailOptions, inquiryEmail, sendInquiryAlert } from '../lib/contact-email.ts';

const inquiry = { id: 'a'.repeat(64), name: 'Test Visitor', email: 'visitor@example.com', company: 'Example', message: '<script>not HTML</script>\nA project idea.', receivedAt: '2026-09-17T12:30:00Z' };
const env = { GOOGLE_APP_PASSWORD: 'abcd efgh ijkl mnop' };
function captureLogs(t) {
  const logs = [];
  t.mock.method(console, 'info', (...values) => logs.push(values));
  t.mock.method(console, 'error', (...values) => logs.push(values));
  return logs;
}

test('uses encrypted Google SMTP and a fixed owner account, normalizing app-password spacing', () => {
  const options = googleMailOptions(env);
  assert.equal(options.host, 'smtp.gmail.com');
  assert.equal(options.port, 465); assert.equal(options.secure, true);
  assert.deepEqual(options.auth, { user: 'info@allpurposeapps.com', pass: 'abcdefghijklmnop' });
  assert.equal(options.tls.minVersion, 'TLSv1.2');
  assert.equal(options.logger, false); assert.equal(options.debug, false);
  assert.equal(options.disableFileAccess, true); assert.equal(options.disableUrlAccess, true);
  assert.ok(options.socketTimeout <= 10000);
});

test('missing or malformed app credentials do not create a transport and never log the credential', async t => {
  const logs = captureLogs(t);
  for (const password of ['', 'private-normal-password', 'abcdefghijklmnopq']) {
    assert.equal(googleMailOptions({ GOOGLE_APP_PASSWORD: password }), null);
    await sendInquiryAlert(inquiry, { GOOGLE_APP_PASSWORD: password }, () => { throw new Error('must not create a transport'); });
  }
  assert.equal(logs.length, 3);
  assert.ok(logs.every(([event]) => event === 'contact_email_not_configured'));
  assert.doesNotMatch(JSON.stringify(logs), /password|visitor@example|script/);
});

test('clear plain-text alert goes only to owner and Reply addresses the visitor', () => {
  const mail = inquiryEmail(inquiry);
  assert.equal(mail.to, 'info@allpurposeapps.com');
  assert.deepEqual(mail.from, { name: 'All-Purpose Apps', address: 'info@allpurposeapps.com' });
  assert.deepEqual(mail.replyTo, { name: inquiry.name, address: inquiry.email });
  assert.equal(mail.subject, 'New website inquiry from Test Visitor');
  assert.match(mail.text, /Sep 17, 2026, 8:30:00 AM EDT/);
  assert.ok(mail.text.includes(inquiry.message));
  assert.match(mail.text, /Press Reply/);
  assert.match(mail.text, /editor\/17610/);
  assert.equal(mail.html, undefined); assert.equal(mail.attachments, undefined);
  assert.equal(mail.bcc, undefined); assert.equal(mail.cc, undefined);
  assert.equal(mail.messageId, `<inquiry-${inquiry.id}@allpurposeapps.com>`);
  assert.doesNotMatch(inquiryEmail({ ...inquiry, company: '' }).text, /Company:/);
});

test('Nodemailer compiles visitor content as text and produces the intended envelope', async () => {
  const transport = nodemailer.createTransport({ streamTransport: true, buffer: true });
  const info = await transport.sendMail(inquiryEmail(inquiry));
  assert.deepEqual(info.envelope.to, ['info@allpurposeapps.com']);
  const raw = info.message.toString();
  assert.match(raw, /Reply-To: Test Visitor <visitor@example.com>/);
  assert.match(raw, /Content-Type: text\/plain/);
  assert.doesNotMatch(raw, /Content-Type: text\/html/);
});

test('accepted SMTP submission logs only its opaque reference and closes the transport', async t => {
  const logs = captureLogs(t); let closed = false; let message;
  await sendInquiryAlert(inquiry, env, () => ({
    sendMail: async mail => { message = mail; return { accepted: ['info@allpurposeapps.com'] }; },
    close: () => { closed = true; },
  }));
  assert.equal(message.to, 'info@allpurposeapps.com'); assert.equal(closed, true);
  assert.deepEqual(logs, [['contact_email_accepted', { inquiryId: inquiry.id }]]);
});

for (const reason of ['smtp rejection', 'network failure', 'empty accepted list']) {
  test(`${reason} is contained and logs no private provider details`, async t => {
    const logs = captureLogs(t); let closed = false;
    await sendInquiryAlert(inquiry, env, () => ({
      sendMail: async () => {
        if (reason === 'empty accepted list') return { accepted: [] };
        throw new Error('visitor@example.com and private credential');
      },
      close: () => { closed = true; },
    }));
    assert.equal(closed, true);
    assert.deepEqual(logs, [['contact_email_failed', { inquiryId: inquiry.id }]]);
  });
}
