# Architecture

## Shape

This is a single-route, presentation-only portfolio built with React on the Vinext/Next foundation. It has no database, authentication, analytics, contact-form backend, or runtime secrets.

The page is intentionally server-renderable. Project content lives beside its markup in `app/page.tsx`; there is no client state because the experience is reading and anchor navigation. `app/globals.css` owns theme tokens, layout, interaction states, responsive behavior, and reduced-motion handling.

## Visual system

The visual thesis is a focused independent engineering consultancy: calm, credible, and precise. Deep navy establishes trust, white and cool gray keep dense case-study content readable, and a restrained cobalt accent identifies primary actions and technical details. Generous spacing and a consistent card system prioritize the work over decoration. Project imagery remains limited to verified, project-owned assets.

## Content model

The portfolio has three levels of evidence:

1. Two expanded case studies for Boothline and Event Camera Platform.
2. Three compact project cards for DJ Request List, Velocity Overdrive, and the Solo Developer's Stack Guide.
3. A concise technology summary that acknowledges additional iOS, QR, PDF, and automation work without presenting unverified case-study details.

## Deployment

OpenAI Sites builds the application for a Cloudflare-compatible runtime. The `.openai/hosting.json` file keeps only the Sites project association and optional platform bindings. This site currently needs no runtime bindings.
