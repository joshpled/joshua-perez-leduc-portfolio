# Portfolio project notes

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Typecheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Tests: `npm test` (isolated contact storage, no real writes)
- Build: `npm run build`

## Structure

- `app/page.tsx` — portfolio content
- `app/contact/` — contact page and interactive inquiry form
- `app/api/contact/route.ts` — server-only POST endpoint
- `lib/contact.ts` — request validation, spam verification, private Supabase inquiry storage
- `lib/contact-email.ts` — Google SMTP alert, fixed owner recipient, plain-text message
- `tests/contact-email.test.mjs` — isolated mail formatting, authentication, and failure checks
- `docs/contact-email.md` — app-password setup, rollout, and missed-alert troubleshooting
- `tests/contact.test.mjs` — provider-isolated storage and abuse tests
- `supabase/contact-inquiries.sql` — private inquiry table and grants
- `tests/contact-database.sql` — rollback-only database permission checks
- `.env.example` — safe configuration template
- `app/project-gallery.tsx` — client navigation wrapper for server-rendered project panels
- `app/globals.css` — theme, layout, responsive behavior
- `app/layout.tsx` — document metadata and shell
- `next.config.ts` — native Next.js configuration used by Vercel
- `public/brand` — approved logo system, web icons, social card, and locally hosted companion fonts
- `public/projects` — verified project-owned visuals
- `README.md` — setup and content-maintenance notes
- `ARCHITECTURE.md` — system and design rationale

## Decisions log

- 2026-09-17 — Squash-merge Google email inquiry alerts in PR #16 after owner comprehension review and verified preview delivery — inquiries remain private in Supabase and new submissions notify info@allpurposeapps.com through Google SMTP. Production revision e6bb07d is deployed. The feature branch is deleted locally and remotely. Gotchas: email is best-effort with no retry queue; production browser verification encountered Turnstile error 300010 and is awaiting a human submission. See docs/contact-email.md for release evidence.

- 2026-09-17 — Add best-effort Google SMTP alerts to the existing Supabase inbox — the owner wants email notifications and explicitly rejected Resend. Nodemailer uses the existing info@allpurposeapps.com mailbox with a private Google app password. Return only inserted IDs to avoid alerts for duplicate submissions; Next.js after() separates SMTP latency from visitor confirmation. Gotchas: missing credentials, Google rejection, and runtime failure can miss an alert; no automatic retry queue. SMTP acceptance is not inbox-delivery proof. Real preview storage, Gmail Inbox receipt, and visitor Reply-To were verified on 2026-09-17. Owner merge approval and a production delivery check are pending. See ADR 011.

- 2026-09-17 — Approve the contact form for production after real preview verification — the owner will review inquiries manually in Supabase, with no email notification. Both hosting keys are private; Preview secrets are restricted to `feature/contact-form`. A real form submission produced exactly one dashboard row. Gotchas: repeat the check after deployment to production, preserve the poll table, and keep provider keys out of source and logs.

- 2026-09-15 — Store contact inquiries in the poll project's separate Supabase table for manual dashboard review — the owner prefers the poll workflow and does not need email notifications. See ADR 010 and `docs/contact-setup.md`. Gotchas: keep the secret key server-only, require Turnstile before storage, deny direct public table access, use atomic retry deduplication, preserve poll data, and verify an actual preview row before release. Implementation approval does not authorize merge.

- 2026-09-15 — Present all seven projects in a swipeable gallery with named shortcuts — the owner chose sequential browsing to reduce page length while retaining full project evidence. See ADR 009. Gotchas: keep names/children aligned, derive selection from actual scrolling, observe active-panel height, preserve maturity labels, and verify offscreen panels are inert after hydration. This supersedes the proposed expandable-detail follow-up.
- 2026-09-15 — Shorten repeated portfolio copy and decorative spacing while keeping all seven projects fully expanded — visitors can scan capabilities and maturity sooner, with mobile section links always visible. See `docs/adr-008-portfolio-readability.md`. Gotchas: keep status labels beneath titles, retain every proof point and stack, and review 320px layouts plus sticky-header anchor offsets; expandable details belong to the next PR after this stage merges.
- 2026-09-15 — Replace the smooth geometric `A` with the owner-approved particle-dissolving brand system — official badge, horizontal, symbol, favicon, social, color, and typography assets now form one consistent identity across the website. Gotcha: the traced SVG lettering and particles are artwork, not editable text; do not retype, rearrange, recolor individual parts, or add effects.
- 2026-09-12 — Move the commercial portfolio from GitHub Pages to Vercel Pro before adding contact delivery — native Next.js hosting supports a server-side form handler, deployment previews, and commercial use without maintaining a parallel adapter. Gotcha: preserve Squarespace MX and TXT records during the web DNS cutover so `info@allpurposeapps.com` continues working.
- 2026-09-12 — Make GitHub Pages builds switchable between the repository path and `allpurposeapps.com` — a repository variable enables a coordinated Squarespace DNS cutover without merging a build that immediately breaks the current public URL. Gotcha: `PAGES_CUSTOM_DOMAIN` must equal `true` only after the GitHub custom-domain setting and DNS are ready; set it to `false` and redeploy when rolling back.
- 2026-09-12 — Integrate the full All-Purpose Apps badge directly into the opening hero — pairing the badge with the primary message creates one cohesive composition and removes a duplicated company-summary card. Gotcha: the badge moves above the headline below the tablet breakpoint, while capability details remain in Services and About.
- 2026-09-12 — Use the brand kit's traced full-color badge as the hero masthead — the path-based asset preserves the approved badge lettering and proportions without the blur of the supplied JPG, while keeping the compact `A` mark in navigation and the company card. Gotcha: this is a high-fidelity trace of raster artwork rather than an original design-source vector; keep using `badge-full-color-transparent.svg` from the approved kit if the asset is regenerated.
- 2026-09-11 — Apply the owner-supplied geometric `A` identity and its forest-green, cream, and burnt-orange palette — the website now reflects the approved brand system across the header, hero, favicon, calls to action, and supporting interface. Gotcha: keep the company name as live HTML beside the mark, and replace the extracted PNGs in place if official vector exports become available.
- 2026-09-11 — Rebrand the company portfolio as All-Purpose Apps with the line “Your ideas. Made from scratch.” — the name expresses versatile software capability across websites, web apps, mobile, desktop, and original products while keeping Joshua's personal role visible. Gotcha: flour-inspired cues must remain abstract and restrained; do not introduce bakery imagery or repeat the three core brand lines across multiple sections.
- 2026-09-11 — Deploy the portfolio to GitHub Pages through a dedicated Next.js static-export workflow — the presentation-only site needs no server runtime, and an Actions artifact prevents GitHub's legacy Jekyll builder from rendering the README as the website. Gotcha: the repository base path is embedded at build time; a custom domain or repository rename requires revisiting that path.
- 2026-09-11 — Curate the portfolio around seven owner-selected products: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir — the lineup now emphasizes recent product judgment across event, operations, field-service, finance, native iOS, and cross-platform work. Gotcha: maturity labels are intentional; concepts and prototypes must not be described as production products without new evidence.
- 2026-09-11 — Replace the experimental neon presentation with a restrained consulting-style visual system — the primary audience needs fast evidence of judgment, capability, and reliability. Deep navy, white, cool gray, and cobalt support that goal without erasing personality. Gotcha: contact details remain intentionally incomplete until the owner chooses public channels.
- 2026-09-10 — Use one narrative page with five verified case studies — prospective clients need a fast, coherent view of range; unverified business outcomes and production claims are deliberately excluded. Gotcha: public contact details still need to replace the visible placeholder.
- 2026-09-10 — Keep the site presentation-only — the current goal needs no database, authentication, analytics, or contact backend. Gotcha: adding a form later requires a separate delivery and privacy decision.
- 2026-09-10 — Reuse project-owned visuals only — this keeps the portfolio grounded in actual work and avoids generic stock imagery.
