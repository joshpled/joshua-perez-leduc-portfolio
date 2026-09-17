# ADR 011: Email inquiry alerts through the existing Google mailbox

- Date: 2026-09-17
- Status: Accepted; preview inbox delivery and Reply-To verified; production release pending
- Supersedes ADR 010's no-notification decision; private storage remains unchanged.

## Context

The owner likes the working Supabase contact inbox but wants to know when inquiries arrive. They chose email, rejected Resend, and confirmed they can sign into `info@allpurposeapps.com` as a Google mailbox. Reuse that account rather than introducing another email service.

## Decision

Use Nodemailer with Google SMTP over TLS and an app password supplied privately through Vercel. The sender and recipient are fixed to the owner mailbox. Reply-To points to the validated visitor address. Alerts contain a clear subject, server-received time, contact details, message, and inbox link as plain text.

Only a confirmed newly inserted row schedules an alert through Next.js `after()`. PostgREST's `select=id` limits the returned representation to a column already readable by the server role; ignored duplicates return an empty array. This avoids granting access to stored message bodies. No schema migration is required.

Keep visitor success tied to storage. Missing email configuration, rejected SMTP sends, and scheduling errors must not undo a saved inquiry or leak provider details. Log only an outcome code and inquiry ID. SMTP timeout settings and the route's 60-second maximum bound function work.

## Tradeoffs and rejected alternatives

- Google SMTP reuses an existing paid-for mailbox, but depends on its app-password policy, account limits, and Google delivery decisions. Do not disable account security to enable it; if app passwords are unavailable, stop and choose a supported OAuth setup with the owner.
- Resend was explicitly rejected by the owner.
- Awaiting SMTP before the HTTP receipt would make email delays look like a failed inquiry despite successful storage.
- Direct database reads for sending are unnecessary; the validated request already contains the new inquiry.
- A durable outbox and retry worker would handle the insertion-to-email crash window, but add database state and an operational job. This initial alert is explicitly best-effort. A deterministic Message-ID is a reference, not an exactly-once delivery guarantee.

## Validation

Provider-isolated tests cover new inserts versus duplicates, failed persistence, failed scheduling, fixed recipients, plain-text MIME output, credential validation, accepted recipients, and safe logs on SMTP failures. A passing build does not prove Google login or inbox delivery. Require a real preview submission, its saved database row, the received owner email, and a correct Reply-To before merge.

On 2026-09-17, the real preview submission was verified in Supabase and the owner Gmail Inbox, including the visitor Reply-To. See `contact-email.md` for the test reference and release boundary.
