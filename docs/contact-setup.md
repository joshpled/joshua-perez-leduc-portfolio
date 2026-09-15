# Contact delivery setup and troubleshooting

## Required setup

1. In Resend, add `forms.allpurposeapps.com` and verify ownership using the exact DNS records Resend supplies. Add these at Squarespace; preserve existing mail and website records. Sending does not require a new mailbox at that subdomain.
2. Create a sending-only Resend API key restricted to that domain. Enter it directly into Vercel as `RESEND_API_KEY`; do not paste it into chat, source files, screenshots, or logs.
3. Set `CONTACT_FROM_EMAIL=contact@forms.allpurposeapps.com` in Vercel. The recipient is fixed in `lib/contact.ts` as `info@allpurposeapps.com`; visitors cannot override it.
4. In Cloudflare Turnstile, use the Managed widget **All-Purpose Apps contact form**, created September 15, 2026 for `allpurposeapps.com`. Add the exact trusted preview hostname before testing a Vercel preview. Store `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` directly in Vercel. Only the public site key reaches the browser.
5. Add the exact preview origin to `CONTACT_ALLOWED_ORIGINS` in the Preview environment, e.g. `https://your-project-preview.vercel.app`. Do not broadly allow all Vercel domains. Configure the same hostname in Turnstile. The production domains are already allowed by code.
6. Apply these values to the intended Production/Preview environments and redeploy to pick up environment changes. Do not give untrusted fork previews production secrets.

For local development, copy `.env.example` to ignored `.env.local` and set the actual local origin and widget hostname. Cloudflare's public testing keys can be used only with isolated mock-provider tests; never put them in production. There is no production test-mode switch or spam-check bypass in this application.

## Acceptance checks

- Submit name, email, and a meaningful message from the trusted preview.
- Verify the message arrives in `info@allpurposeapps.com` (including checking spam). Resend's accepted response alone is not this check.
- Open Reply and verify the recipient is the visitor's email. Sending an actual reply is not required.
- Confirm double clicking does not create two messages; an unchanged retry retains its delivery key for Resend's 24-hour window.
- Test keyboard navigation, narrow phone layout, invalid email, a blocked spam script, expired verification, and a failed network request. Form text must remain available after failure.
- After approved merge, repeat delivery and Reply checks on `https://allpurposeapps.com/contact`.

## Troubleshooting

- **Email fallback instead of form:** one or more environment values are missing, or the sender is not a valid email address. Check the deployment environment and redeploy.
- **Spam check fails:** verify widget hostname, site/secret pair, server action `contact`, and exact allowed origin. A retry needs a new token; the widget resets automatically.
- **Could not confirm sending:** inspect Resend's delivery dashboard for domain verification, key permissions, quota, or API errors. Do not log or paste provider payloads containing private values. Retry unchanged content without refreshing to reuse the idempotency key.
- **Success but no inbox message:** inspect Resend's delivery/bounce event and spam folder; the app reports provider acceptance, not final mailbox placement.
- **Spam volume:** review Turnstile and Resend dashboards. There is no shared rate-limit store or automatic alert pipeline. Add those only if observed traffic calls for them.

The site stores no inquiry database or browser draft. Text stays on the current page after failure but is lost on reload. Resend and the receiving mailbox retain message records according to their settings. Keep mailbox access secure and delete inquiries when no longer needed.

## References

- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
- [Resend send API](https://resend.com/docs/api-reference/emails/send-email)
- [Resend retry keys](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Turnstile server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
