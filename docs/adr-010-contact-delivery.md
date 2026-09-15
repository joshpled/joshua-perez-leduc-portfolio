# ADR 010: Contact inquiries delivered to the owner by email

- Date: 2026-09-15
- Status: Accepted for implementation; live delivery verification pending

## Context

The owner wants website visitors to submit an inquiry that actually reaches their inbox. The portfolio already runs on native Next.js hosting in Vercel. A link that only opens a visitor's email app does not fulfill the form requirement.

## Decision

Add `/contact`, a client form, and `POST /api/contact`. Validate a bounded JSON request, check a honeypot and a server-verified Cloudflare Turnstile token, then send plain text through Resend to the fixed owner address `info@allpurposeapps.com`. Use a verified `forms.allpurposeapps.com` sender; set the visitor as Reply-To. Public configuration is limited to the Turnstile site key.

The form shows success only after Resend returns a successful response with an email ID. This means accepted for delivery, not proof of inbox placement. Failed or uncertain attempts retain the form values and offer retry or direct email. A submission UUID plus hash of the email content supplies a Resend idempotency key: unchanged retries within 24 hours do not duplicate mail. Editing content creates a distinct delivery. The UUID lives only in the mounted page, so refreshing or reopening the page starts a new submission.

No database, attachments, visitor auto-replies, or new packages. Use existing Zod for validation, built-in fetch for providers, and Node's test runner with mocked provider boundaries. This handles personal data, so recipient restriction, validation, failure states, and logging deserve extra review.

## Why and alternatives

- Native Vercel route: uses the existing hosting model; no parallel worker or form-host subscription.
- Resend API instead of mailbox SMTP: avoids keeping the owner's mailbox password in the application and supports request idempotency.
- Turnstile plus honeypot: basic automated abuse protection without adding another storage service. No per-instance in-memory rate limiter: it would not reliably limit a distributed deployment. Provider quotas still matter; add shared rate limiting if actual abuse warrants it.
- Plain text instead of visitor-supplied HTML: avoids HTML injection and keeps messages readable in any mail client.
- Mailbox/provider records instead of a database: fewer moving parts, but there is no site-side backup if delivery fails after provider acceptance. Monitor Resend delivery/bounce status and the owner's spam folder.

## Maintenance and gotchas

Preserve Squarespace's existing mailbox MX/TXT records. Add only the precise records supplied by Resend for the sending subdomain. Production and preview need their own explicit environment configuration; previews are not wildcard-trusted. Missing config renders an email fallback and the endpoint refuses delivery.

Origin validation protects browser submissions but is not bot authentication; Turnstile is verified for every delivery request, including its action and hostname. Tokens are single-use and expire, so the client resets the check after an attempt. Provider failures are never logged with message content, token values, or credentials. Request and provider timeouts are bounded by the hosting function duration.

Before merge, verify a real preview submission reaches the owner's inbox and Reply addresses the visitor. After production deployment, repeat that check on the public domain. A mock-provider test or green deployment does not prove this.
