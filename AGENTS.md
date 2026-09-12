# Portfolio project notes

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Typecheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build`
- Build for GitHub Pages: `GITHUB_PAGES=true GITHUB_REPOSITORY=joshpled/joshua-perez-leduc-portfolio npm run build:pages`

## Structure

- `app/page.tsx` — single-route portfolio content
- `app/globals.css` — theme, layout, responsive behavior
- `app/layout.tsx` — document metadata and shell
- `next.config.ts` — conditional GitHub Pages static export and base path
- `.github/workflows/deploy-pages.yml` — build and deployment workflow for Pages
- `public/brand` — approved All-Purpose Apps mark and app icon
- `public/projects` — verified project-owned visuals
- `README.md` — setup and content-maintenance notes
- `ARCHITECTURE.md` — system and design rationale

## Decisions log

- 2026-09-12 — Use the brand kit's traced full-color badge as the hero masthead — the path-based asset preserves the approved badge lettering and proportions without the blur of the supplied JPG, while keeping the compact `A` mark in navigation and the company card. Gotcha: this is a high-fidelity trace of raster artwork rather than an original design-source vector; keep using `badge-full-color-transparent.svg` from the approved kit if the asset is regenerated.
- 2026-09-11 — Apply the owner-supplied geometric `A` identity and its forest-green, cream, and burnt-orange palette — the website now reflects the approved brand system across the header, hero, favicon, calls to action, and supporting interface. Gotcha: keep the company name as live HTML beside the mark, and replace the extracted PNGs in place if official vector exports become available.
- 2026-09-11 — Rebrand the company portfolio as All-Purpose Apps with the line “Your ideas. Made from scratch.” — the name expresses versatile software capability across websites, web apps, mobile, desktop, and original products while keeping Joshua's personal role visible. Gotcha: flour-inspired cues must remain abstract and restrained; do not introduce bakery imagery or repeat the three core brand lines across multiple sections.
- 2026-09-11 — Deploy the portfolio to GitHub Pages through a dedicated Next.js static-export workflow — the presentation-only site needs no server runtime, and an Actions artifact prevents GitHub's legacy Jekyll builder from rendering the README as the website. Gotcha: the repository base path is embedded at build time; a custom domain or repository rename requires revisiting that path.
- 2026-09-11 — Curate the portfolio around seven owner-selected products: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir — the lineup now emphasizes recent product judgment across event, operations, field-service, finance, native iOS, and cross-platform work. Gotcha: maturity labels are intentional; concepts and prototypes must not be described as production products without new evidence.
- 2026-09-11 — Replace the experimental neon presentation with a restrained consulting-style visual system — the primary audience needs fast evidence of judgment, capability, and reliability. Deep navy, white, cool gray, and cobalt support that goal without erasing personality. Gotcha: contact details remain intentionally incomplete until the owner chooses public channels.
- 2026-09-10 — Use one narrative page with five verified case studies — prospective clients need a fast, coherent view of range; unverified business outcomes and production claims are deliberately excluded. Gotcha: public contact details still need to replace the visible placeholder.
- 2026-09-10 — Keep the site presentation-only — the current goal needs no database, authentication, analytics, or contact backend. Gotcha: adding a form later requires a separate delivery and privacy decision.
- 2026-09-10 — Reuse project-owned visuals only — this keeps the portfolio grounded in actual work and avoids generic stock imagery.
