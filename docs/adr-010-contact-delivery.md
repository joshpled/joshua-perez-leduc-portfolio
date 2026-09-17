# ADR 010: Store contact inquiries privately in Supabase

- Date: 2026-09-15
- Status: Accepted; database permissions, private hosting configuration, and a real preview submission verified on 2026-09-17

## Context

The owner wants visitors to submit inquiries and prefers the poll site's workflow: save responses in Supabase and read them in the owner dashboard. Automatic email notification is not required. The existing poll project can hold a separate table without creating another project.

## Decision

Add `/contact`, its client form, and `POST /api/contact`. Save name, email, optional company, message, and a database-generated timestamp in `public.contact_inquiries` in the existing `software-name-poll` project. The owner reads the table in Supabase's authenticated dashboard. No email API or email DNS setup is involved.

Vercel checks a bounded JSON request, exact origin allowlist, field validation, honeypot, and server-verified Cloudflare Turnstile token before writing through Supabase's Data API. The server uses a private `sb_secret_` key; the browser receives only the public Turnstile site key. This is intentionally stricter than the informal poll's anonymous direct INSERT: public contact submissions should not bypass the spam check by calling the table API directly.

Enable Row Level Security and revoke all public/anon/authenticated privileges on the new table. Give `service_role` only INSERT on the allowed fields and SELECT on the opaque ID needed by conflict handling. Dashboard administrators retain owner access. This does not alter poll-table permissions. The Supabase secret is project-wide even though this new table has restricted grants; protect it carefully because it can access other project resources according to their grants.

A SHA-256 hash of the page submission UUID and normalized content is the primary key. PostgREST's `resolution=ignore-duplicates,return=minimal` inserts once and ignores an existing identical ID without updating any saved message. Concurrent/uncertain retries rely on the database constraint. Editing content creates a distinct ID. Reloading the page creates a new submission UUID; this is retry deduplication, not an abuse quota.

Success requires the database API's 201 response. A failed/uncertain attempt leaves the message editable and offers retry plus direct email. Missing configuration displays the email fallback. No persistent browser draft, attachments, inquiry-reading API, custom dashboard, or new package is added.

## Tradeoffs

- Reusing the poll project avoids another hosted project but shares its availability and administrative access. New grants apply only to `contact_inquiries`.
- Server-mediated writes require a private hosting secret but preserve mandatory spam verification. Direct anonymous INSERT was rejected because it permits bypassing Turnstile.
- Reading messages in Supabase avoids email delivery configuration. The owner must check manually; there are no notifications.
- Database constraints enforce privacy, limits, and retry uniqueness; API tests mock storage and a rollback-only SQL test verifies real database behavior.
- No in-memory distributed rate limiter. Turnstile and the honeypot offer basic abuse protection; review usage if spam becomes a problem.

## Maintenance

Review Supabase Table Editor, choose `contact_inquiries`, and sort `created_at` newest first. Retain inquiries only as long as needed. Private inquiry bodies, tokens, and keys must never appear in logs or source control. Configure secrets for Production and only trusted previews. Apply the schema once; an existing table error is a signal to inspect its schema, not overwrite it.

Before merge, verify a real preview submission appears exactly once in the owner dashboard and public reads fail. Repeat on production after an explicitly approved merge. Application tests and a successful build do not prove hosted connectivity.
