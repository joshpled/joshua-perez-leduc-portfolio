# Portfolio project notes

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Typecheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`

## Structure

- `app/page.tsx` — single-route portfolio content
- `app/globals.css` — theme, layout, responsive behavior
- `app/layout.tsx` — document metadata and shell
- `next.config.ts` — native Next.js configuration used by Vercel
- `public/brand` — approved logo system, web icons, social card, and locally hosted companion fonts
- `public/projects` — verified project-owned visuals
- `README.md` — setup and content-maintenance notes
- `ARCHITECTURE.md` — system and design rationale

## Decisions log

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
