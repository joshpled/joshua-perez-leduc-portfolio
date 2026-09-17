# Architecture

## Shape

This is an All-Purpose Apps portfolio with a home page, a dedicated contact page, and a server-side contact endpoint, built with React and Next.js. Supabase stores private contact inquiries. There is no visitor account system or analytics. The Vercel contact endpoint uses private provider credentials.

The page is intentionally server-renderable. Project content lives beside its markup in `app/page.tsx` and is passed as children to the small client wrapper in `app/project-gallery.tsx`. Gallery navigation and the contact form use client state. `app/globals.css` owns theme tokens, layout, interaction states, responsive behavior, and reduced-motion handling.

## Visual system

The visual thesis is a versatile independent software company: personal, enthusiastic, credible, and precise. The approved forest (`#01291A`), warm cream (`#FEFBF3`), and terracotta (`#DE5726`) palette establishes a recognizable system while preserving the site's restrained business tone. The official identity centers on a particle-dissolving `A`: the horizontal lockup appears in wide navigation and footer placements, the standalone symbol appears in compact navigation, and the full badge anchors the hero. All logo lettering and particles remain outlined artwork rather than recreated HTML or CSS.

Barlow Condensed Bold is the display face and Inter is the body/interface face. Both are served locally from the owner-supplied kit, avoiding a third-party font request and keeping the approved typography available during previews. Fine grain and measurement-like ticks continue the subtle all-purpose-flour reference without using bakery imagery. Generous spacing and a consistent card system prioritize the work over decoration. Project imagery remains limited to verified, project-owned assets.

The root metadata publishes the official favicon family, Apple touch icon, web manifest, and 1200×630 share card. `metadataBase` fixes social and icon URLs to the canonical `https://allpurposeapps.com` domain while Vercel previews continue to render the same page content.

## Content model

The portfolio has two levels of evidence:

1. Two expanded case studies for Boothline and Gatherroll, both supported by project-owned imagery and challenge/solution context.
2. Five supporting panels for Wedding Dashboard, Builtproof, Lanes, When, and Noir, each retaining its description, proof points, stack, and status. Their existing category icons provide a decorative illustration rather than implying a product screenshot.

All seven panels form one swipeable gallery with a counter, Previous/Next controls, and named project shortcuts. Desktop pairs evidence and imagery; mobile stacks them. Native horizontal scrolling and CSS scroll snapping handle touch and trackpads. The nearest panel to the scroll position drives the React selection state so swipes and buttons share one source of truth. Keyboard controls operate only when the track itself is focused.

A ResizeObserver fits the track to the selected panel after content or viewport changes. A hydration snapshot delays offscreen accessibility hiding until the controls are available; inactive panels then use `aria-hidden` and `inert`. The short status announcement reports project name and position without re-announcing its entire text. No autoplay or wraparound occurs. Print restores all panels to a vertical list. See `docs/adr-009-project-gallery.md`.

Maturity labels separate working tools from concepts and prototypes. The concise technology summary reflects the selected projects' actual web, cloud, iOS, and cross-platform stacks without implying unverified outcomes.

The first readability stage places each maturity label directly under its project title and keeps all evidence expanded. Repeated introductory copy and decorative vertical gaps are reduced; no capability or technology list is removed. Featured project text precedes its image in document and mobile reading order, while desktop pairs them side by side. Images retain their proportions rather than filling tall cropped panels.

Mobile navigation keeps the existing anchor links visible in a second row. Section scroll margins account for the sticky header, and links have visible keyboard focus. The approved hero badge remains above the mobile headline at a smaller display size. The gallery supersedes the previously proposed disclosure follow-up; every selected project's details remain expanded. See `docs/adr-008-portfolio-readability.md` for the earlier rationale and boundaries.

## Deployment

The repository uses the standard Next.js lifecycle: `next dev`, `next build`, and `next start`. Vercel detects that framework directly, creates an isolated deployment for every pull request, and promotes the `main` deployment to production. There is no custom output directory, repository base path, or parallel runtime adapter.

The move from GitHub Pages is deliberate. Pages could publish the existing static presentation but could not run the server-side contact handler planned for the next feature. Native Next.js hosting keeps page rendering and route handlers in one application without exposing database credentials to the browser.

Squarespace remains the domain registrar and DNS manager. Only web-routing records change during the cutover; MX and TXT records for `info@allpurposeapps.com` must remain intact. The last Pages deployment is the rollback target until the Vercel production domain has been verified and Pages is disabled.

## Contact storage

`app/contact/page.tsx` renders at request time and checks environment readiness. It passes only the public Turnstile site key to `app/contact/contact-form.tsx`. The client manages submission, verification renewal, retries, feedback focus, and duplicate-click prevention. Missing configuration renders a direct email fallback.

`app/api/contact/route.ts` is the Node runtime boundary. `lib/contact.ts` bounds the request, validates with existing Zod, checks origin and honeypot, verifies Turnstile's success/action/hostname, then inserts into Supabase's `contact_inquiries` table using a server-only secret key. The browser cannot bypass spam checks through a public table insert. No provider credentials or inquiry payloads are logged.

A hash of the submission UUID and normalized fields provides the row ID. PostgREST ignores an existing identical ID, and the database constraint prevents concurrent duplicate writes. The endpoint reports success only for a confirmed 201 database response. Failure preserves form values; there is no persistent browser draft.

The owner reviews inquiries in the existing poll project's Supabase dashboard. `supabase/contact-inquiries.sql` enables RLS and revokes direct public access. The server role has INSERT on allowed fields and SELECT on the opaque ID, with no inquiry-content read/update/delete access. Timestamps come from the database. Other poll tables are unchanged. The secret key still carries project-wide privileges on other resources according to their grants, so keep it private.

`tests/contact.test.mjs` injects fake provider responses. `tests/contact-database.sql` checks database permissions and idempotency using a rollback-only transaction. ADR 010 records the design; `docs/contact-setup.md` explains manual review, retention, and real submission checks. Google-mail alerts are described below.

## Google-mail alerts

After a verified insert, PostgREST returns only `id` through `select=id` and `return=representation`, using the existing SELECT(id) grant. An ignored duplicate returns an empty array, so an unchanged retry does not schedule another email. No schema or broader table permissions are needed.

The route schedules `lib/contact-email.ts` through Next.js `after()`. This keeps the function alive for SMTP work after the visitor receives storage confirmation. Nodemailer connects to `smtp.gmail.com:465` with TLS and the existing owner mailbox's private app password. The fixed sender and recipient are `info@allpurposeapps.com`; the visitor appears only in Reply-To and the plain-text body. No request field controls the destination or SMTP host.

The message includes a server-received time in America/New_York, the inquiry text, and the private inbox link. The database timestamp remains authoritative. SMTP errors, passwords, and message bodies are never logged: events include only a safe outcome code and the opaque inquiry ID. SMTP acceptance is not proof of inbox delivery.

This is best-effort background delivery, not a durable queue. A crash after insertion but before notification, a provider failure, or a function timeout can miss an alert. An unchanged retry does not resend it. The database remains the complete inbox; failures require manual review. A durable outbox/retry worker would be a separate reliability change. See ADR 011 and `docs/contact-email.md`.
