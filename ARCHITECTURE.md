# Architecture

## Shape

This is a single-route, presentation-only portfolio built with React on the Vinext/Next foundation. It has no database, authentication, analytics, contact-form backend, or runtime secrets.

The page is intentionally server-renderable. Project content lives beside its markup in `app/page.tsx`; there is no client state because the experience is reading and anchor navigation. `app/globals.css` owns theme tokens, layout, interaction states, responsive behavior, and reduced-motion handling.

## Visual system

The visual thesis is a focused independent engineering consultancy: calm, credible, and precise. Deep navy establishes trust, white and cool gray keep dense case-study content readable, and a restrained cobalt accent identifies primary actions and technical details. Generous spacing and a consistent card system prioritize the work over decoration. Project imagery remains limited to verified, project-owned assets.

## Content model

The portfolio has two levels of evidence:

1. Two expanded case studies for Boothline and Gatherroll, both supported by project-owned imagery and challenge/solution context.
2. Five compact evidence cards for Wedding Dashboard, Builtproof, Lanes, When, and Noir. The six-column grid creates a balanced two-card row followed by a three-card row on desktop, then collapses to one column for narrower screens.

Maturity labels separate working tools from concepts and prototypes. The concise technology summary reflects the selected projects' actual web, cloud, iOS, and cross-platform stacks without implying unverified outcomes.

## Deployment

OpenAI Sites builds the application for a Cloudflare-compatible runtime. The `.openai/hosting.json` file keeps only the Sites project association and optional platform bindings. This site currently needs no runtime bindings.
