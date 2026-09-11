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
- `public/projects` — verified project-owned visuals
- `README.md` — setup and content-maintenance notes
- `ARCHITECTURE.md` — system and design rationale

## Decisions log

- 2026-09-11 — Replace the experimental neon presentation with a restrained consulting-style visual system — the primary audience needs fast evidence of judgment, capability, and reliability. Deep navy, white, cool gray, and cobalt support that goal without erasing personality. Gotcha: contact details remain intentionally incomplete until the owner chooses public channels.
- 2026-09-10 — Use one narrative page with five verified case studies — prospective clients need a fast, coherent view of range; unverified business outcomes and production claims are deliberately excluded. Gotcha: public contact details still need to replace the visible placeholder.
- 2026-09-10 — Keep the site presentation-only — the current goal needs no database, authentication, analytics, or contact backend. Gotcha: adding a form later requires a separate delivery and privacy decision.
- 2026-09-10 — Reuse project-owned visuals only — this keeps the portfolio grounded in actual work and avoids generic stock imagery.
