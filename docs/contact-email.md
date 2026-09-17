# Contact email alerts

## The flow

1. A visitor submits the contact form and passes the spam check.
2. Vercel saves the inquiry privately in Supabase.
3. The visitor sees confirmation. Vercel then asks Google to email `info@allpurposeapps.com`.
4. Open the email and press **Reply** to answer the visitor. Supabase keeps the original inquiry.

The email is plain text: who wrote, when the server received it (Eastern time), company if supplied, and the message. It also links to the private Supabase inbox. Google receives this copy for email delivery. The database's `created_at` is the authoritative stored timestamp.

## Set up Google sending

The sender and recipient are both `info@allpurposeapps.com`. Use that Google account, not a personal account or an alias without its own mailbox.

1. Sign into that account and open [Google App passwords](https://myaccount.google.com/apppasswords). App passwords require 2-Step Verification and may be unavailable under account policy. Keep existing account protections enabled. If unavailable, stop and choose Google's supported OAuth setup; do not use the normal account password.
2. The owner creates an app password named **All-Purpose Apps contact alerts**. Enter it directly into Vercel as `GOOGLE_APP_PASSWORD`, type **Secret**. Never put it in chat, source, screenshots, terminal arguments, or logs. An app password is a mailbox credential, not a send-only token; protect it accordingly.
3. Scope the value to Production and only the trusted email-alert Preview branch. Existing Supabase and Turnstile secrets must also be available to that preview; allow its exact hostname in Turnstile and `CONTACT_ALLOWED_ORIGINS`.
4. Redeploy the preview. Submit a clearly labeled inquiry, confirm its database row, then verify the actual email in the owner mailbox, including its Reply-To. A provider-accepted response alone is insufficient.
5. Merge only after owner approval; repeat a labeled test from production.

Do not change DNS, incoming-mail routing, account passwords, or Google security policies for this feature. No Resend account or API key is used. Local tests do not need real credentials.

## If an alert is missing

The full inbox is [contact_inquiries](https://supabase.com/dashboard/project/vujrrskdxtskmkldvnkj/editor/17610?schema=public). Check it first, then Gmail's Inbox, Spam, and Sent folders.

Search Vercel function logs for the inquiry's opaque `id`:

| Event | Meaning / next step |
| --- | --- |
| `contact_email_accepted` | Google accepted the owner recipient; check mailbox delivery or spam filtering. |
| `contact_email_not_configured` | App password is missing or malformed. Check the secret's environment/branch scope and redeploy. |
| `contact_email_failed` | Google/SMTP failed or did not accept the owner recipient. Check account policy, app-password validity, Gmail sending limits, and connectivity. |
| `contact_email_schedule_failed` | Background work could not be scheduled. Inspect deployment/runtime health. |

Do not enable SMTP debug logging: it can expose credentials and inquiry content. A password change or account security event can invalidate an app password; create a replacement through Google and update the private Vercel value if needed.

## Delivery limits

This initial email alert is **best-effort**. It has no automatic retry queue. A runtime failure after saving but before scheduling, a function timeout, or Google rejection can miss an email. Unchanged form retries do not send it again, because the database already has that inquiry. Review missing alerts manually in Supabase. A durable outbox/worker can be added separately if guaranteed retry tracking becomes necessary.

The browser's confirmation always means the inquiry was stored, not that the email was delivered. Historical inquiries are not emailed automatically when this feature is enabled.

## Verification status

Implementation and isolated tests are prepared. Google app-password setup, real Preview SMTP submission, inbox receipt, and Reply-To verification remain required before release.

## References

- [Google Workspace: sending email from an app](https://support.google.com/a/answer/176600)
- [Nodemailer: Gmail](https://nodemailer.com/guides/using-gmail)
- [Next.js after](https://nextjs.org/docs/app/api-reference/functions/after)
- [PostgREST response preferences](https://docs.postgrest.org/en/v14/references/api/preferences.html)
