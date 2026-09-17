# Contact storage setup and troubleshooting

## Where inquiries go

Open the [software-name-poll Supabase project](https://supabase.com/dashboard/project/vujrrskdxtskmkldvnkj/editor), choose **contact_inquiries**, and sort **created_at** newest first. Each row contains name, email, company, and message. The poll remains in its separate `name_poll_votes` table. There are no email notifications; check the dashboard manually.

## Database

`supabase/contact-inquiries.sql` creates the private table and restricted grants. It was applied to the existing poll project on September 15, 2026. Do not rerun CREATE TABLE blindly; inspect existing schema before changing it. Keep subsequent schema changes versioned.

Row Level Security is enabled. Anonymous and app-authenticated clients have no direct table access. Vercel uses a server-only Supabase secret key (`service_role`), whose access to this table is limited to inserting allowed fields and reading opaque IDs for conflict handling. It cannot read inquiry contents, edit/delete rows, or supply timestamps. Dashboard administrators can review/export/delete records normally. The secret key remains project-wide: it is not limited to this table in other project resources, so never expose it.

Run `tests/contact-database.sql` as postgres in SQL Editor to check permissions, invalid-data rejection, timestamp protection, and retry deduplication. Test writes are rolled back. A semantically equivalent permission script was run successfully on September 15; no test inquiry was retained.

## Hosting configuration

Enter values directly into Vercel's **All-Purpose Apps → Environment Variables** or ignored local `.env.local`. Never paste keys into chat, source, screenshots, or logs.

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL` | `https://vujrrskdxtskmkldvnkj.supabase.co` |
| `SUPABASE_SECRET_KEY` | A Supabase `sb_secret_` key; server-only, never `NEXT_PUBLIC_` |
| `TURNSTILE_SITE_KEY` | Public key for **All-Purpose Apps contact form** |
| `TURNSTILE_SECRET_KEY` | Private key for that same widget |
| `CONTACT_ALLOWED_ORIGINS` | Extra exact trusted local/preview origins, comma-separated |

The Managed Turnstile widget allows `allpurposeapps.com` and the exact trusted preview hostname `all-purpose-apps-git-feature-553c0e-joshuapleduc-2965s-projects.vercel.app`. The production website origins are already allowed in code. Do not trust all `vercel.app` domains. Scope private Preview values to the trusted feature branch; do not provide production secrets to untrusted fork previews. Deployment environment changes require a new deployment.

For local development, copy `.env.example` to `.env.local`. The app refuses publishable keys and non-HTTPS hosted Supabase URLs. Local mock-provider QA can use dummy credentials and Cloudflare's public test widget; never deploy mock providers or test keys. There is no application test-mode bypass.

## Deployment verification

On September 17, 2026, both private keys were saved as Vercel Secret variables for Production and only the `feature/contact-form` Preview branch. Public URL, site key, and exact Preview origin are configured separately. Preview deployment `GR1M8jeEP1Dw6nrsrT6Tp5VtbqxB` at commit `7620580` accepted the labeled `QA-CONTACT-20260917` inquiry through the real form. The owner dashboard showed exactly one matching row with database timestamp `2026-09-17 09:09:02.864684+00`. This verifies actual Turnstile verification and Supabase storage. Production must be checked after merge.

## Acceptance checks

1. Run `npm test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
2. Run the rollback-only database permission tests.
3. Submit a clearly labeled test inquiry from the trusted preview. Verify a single matching row in the owner dashboard with its database timestamp.
4. Retry unchanged content without reloading: it must reuse its row ID. Editing content makes a new inquiry, and reloading starts a new submission UUID.
5. Confirm direct public reads and writes fail. Verify failed requests retain text and display the direct email fallback.
6. After approved merge, repeat a submission from the production contact page. Test rows should be reviewed as test data in the dashboard.

## Troubleshooting and retention

- **Email fallback instead of form:** missing configuration, invalid hosted project URL, or wrong key type. Check the deployment environment and redeploy.
- **Spam check fails:** verify widget domain, matching site/secret pair, action `contact`, and exact allowed origin. Tokens expire and are single-use; retries reset the widget.
- **Could not confirm submission:** check Supabase availability, table existence, grants, key validity, and Vercel environment. Never log the provider's payload or private values. Retry unchanged text without reloading to avoid duplicates.
- **Confirmation but no visible inquiry:** confirm the deployment's project URL, table name, and dashboard filters. Sort newest first. A repeated submission may have been safely ignored because its row already exists.
- **Spam volume:** review Turnstile and database usage. There is no global rate-limit store or notification pipeline.

Messages remain in Supabase until an administrator deletes them. The website has no automatic retention or backup job; use project backup/export facilities appropriate to your needs. The form retains text only in the current page, so refreshing loses an unsent draft.

## References

- [Supabase keys](https://supabase.com/docs/guides/getting-started/api-keys)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [PostgREST insert and duplicate handling](https://docs.postgrest.org/en/v12/references/api/tables_views.html#upsert)
- [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
