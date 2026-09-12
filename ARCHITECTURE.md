# Architecture

## Shape

This is a single-route, presentation-only company portfolio for All-Purpose Apps, built with React and Next.js. It has no database, authentication, analytics, contact-form backend, or runtime secrets.

The page is intentionally server-renderable. Project content lives beside its markup in `app/page.tsx`; there is no client state because the experience is reading and anchor navigation. `app/globals.css` owns theme tokens, layout, interaction states, responsive behavior, and reduced-motion handling.

## Visual system

The visual thesis is a versatile independent software company: personal, enthusiastic, credible, and precise. Deep forest green establishes trust, warm cream surfaces reference the name's origin, and burnt orange identifies highlights and technical details. The supplied geometric `A` identity is used as imagery while the company name remains live HTML in navigation for accessibility, responsive clarity, and reliable spelling. The brand kit's traced, path-based badge is integrated beside the hero message on desktop and above it on smaller screens, preserving the approved lettering and proportions while keeping the opening composition cohesive and sharp at every screen density. Fine grain and measurement-like ticks provide subtle all-purpose-flour cues without using bakery imagery. Generous spacing and a consistent card system prioritize the work over decoration. Project imagery remains limited to verified, project-owned assets.

## Content model

The portfolio has two levels of evidence:

1. Two expanded case studies for Boothline and Gatherroll, both supported by project-owned imagery and challenge/solution context.
2. Five compact evidence cards for Wedding Dashboard, Builtproof, Lanes, When, and Noir. The six-column grid creates a balanced two-card row followed by a three-card row on desktop, then collapses to one column for narrower screens.

Maturity labels separate working tools from concepts and prototypes. The concise technology summary reflects the selected projects' actual web, cloud, iOS, and cross-platform stacks without implying unverified outcomes.

## Deployment

The repository uses the standard Next.js lifecycle: `next dev`, `next build`, and `next start`. Vercel detects that framework directly, creates an isolated deployment for every pull request, and promotes the `main` deployment to production. There is no custom output directory, repository base path, or parallel runtime adapter.

The move from GitHub Pages is deliberate. Pages could publish the existing static presentation but could not run the server-side contact handler planned for the next feature. Native Next.js hosting keeps page rendering and future route handlers in one application without exposing delivery credentials to the browser.

Squarespace remains the domain registrar and DNS manager. Only web-routing records change during the cutover; MX and TXT records for `info@allpurposeapps.com` must remain intact. The last Pages deployment is the rollback target until the Vercel production domain has been verified and Pages is disabled.
