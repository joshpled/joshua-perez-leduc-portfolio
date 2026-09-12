# Architecture

## Shape

This is a single-route, presentation-only company portfolio for All-Purpose Apps, built with React on the Vinext/Next foundation. It has no database, authentication, analytics, contact-form backend, or runtime secrets.

The page is intentionally server-renderable. Project content lives beside its markup in `app/page.tsx`; there is no client state because the experience is reading and anchor navigation. `app/globals.css` owns theme tokens, layout, interaction states, responsive behavior, and reduced-motion handling.

## Visual system

The visual thesis is a versatile independent software company: personal, enthusiastic, credible, and precise. Deep forest green establishes trust, warm cream surfaces reference the name's origin, and burnt orange identifies highlights and technical details. The supplied geometric `A` identity is used as imagery while the company name remains live HTML in navigation for accessibility, responsive clarity, and reliable spelling. The brand kit's traced, path-based badge is integrated beside the hero message on desktop and above it on smaller screens, preserving the approved lettering and proportions while keeping the opening composition cohesive and sharp at every screen density. Fine grain and measurement-like ticks provide subtle all-purpose-flour cues without using bakery imagery. Generous spacing and a consistent card system prioritize the work over decoration. Project imagery remains limited to verified, project-owned assets.

## Content model

The portfolio has two levels of evidence:

1. Two expanded case studies for Boothline and Gatherroll, both supported by project-owned imagery and challenge/solution context.
2. Five compact evidence cards for Wedding Dashboard, Builtproof, Lanes, When, and Noir. The six-column grid creates a balanced two-card row followed by a three-card row on desktop, then collapses to one column for narrower screens.

Maturity labels separate working tools from concepts and prototypes. The concise technology summary reflects the selected projects' actual web, cloud, iOS, and cross-platform stacks without implying unverified outcomes.

## Deployment

The repository supports two explicit build targets:

1. `npm run build` keeps the existing OpenAI Sites/Vinext path for a Cloudflare-compatible runtime. `.openai/hosting.json` stores only the Sites project association and optional platform bindings.
2. `npm run build:pages` uses Next.js static export for GitHub Pages. The Pages workflow supplies the repository name, and `next.config.ts` converts it into the `/joshua-perez-leduc-portfolio` base path used by framework and public assets.

The Pages output is static by design. There are no runtime bindings, server routes, authentication checks, or form handlers to reproduce. If one of those is added later, Pages compatibility must be reconsidered rather than assuming the static export still represents the full application.
