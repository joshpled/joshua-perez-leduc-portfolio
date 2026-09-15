# Architecture

## Shape

This is a single-route, presentation-only company portfolio for All-Purpose Apps, built with React and Next.js. It has no database, authentication, analytics, contact-form backend, or runtime secrets.

The page is intentionally server-renderable. Project content lives beside its markup in `app/page.tsx`; there is no client state because the experience is reading and anchor navigation. `app/globals.css` owns theme tokens, layout, interaction states, responsive behavior, and reduced-motion handling.

## Visual system

The visual thesis is a versatile independent software company: personal, enthusiastic, credible, and precise. The approved forest (`#01291A`), warm cream (`#FEFBF3`), and terracotta (`#DE5726`) palette establishes a recognizable system while preserving the site's restrained business tone. The official identity centers on a particle-dissolving `A`: the horizontal lockup appears in wide navigation and footer placements, the standalone symbol appears in compact navigation, and the full badge anchors the hero. All logo lettering and particles remain outlined artwork rather than recreated HTML or CSS.

Barlow Condensed Bold is the display face and Inter is the body/interface face. Both are served locally from the owner-supplied kit, avoiding a third-party font request and keeping the approved typography available during previews. Fine grain and measurement-like ticks continue the subtle all-purpose-flour reference without using bakery imagery. Generous spacing and a consistent card system prioritize the work over decoration. Project imagery remains limited to verified, project-owned assets.

The root metadata publishes the official favicon family, Apple touch icon, web manifest, and 1200×630 share card. `metadataBase` fixes social and icon URLs to the canonical `https://allpurposeapps.com` domain while Vercel previews continue to render the same page content.

## Content model

The portfolio has two levels of evidence:

1. Two expanded case studies for Boothline and Gatherroll, both supported by project-owned imagery and challenge/solution context.
2. Five compact evidence cards for Wedding Dashboard, Builtproof, Lanes, When, and Noir. The six-column grid creates a balanced two-card row followed by a three-card row on desktop, then collapses to one column for narrower screens.

Maturity labels separate working tools from concepts and prototypes. The concise technology summary reflects the selected projects' actual web, cloud, iOS, and cross-platform stacks without implying unverified outcomes.

## Deployment

The repository uses the standard Next.js lifecycle: `next dev`, `next build`, and `next start`. Vercel detects that framework directly, creates an isolated deployment for every pull request, and promotes the `main` deployment to production. There is no custom output directory, repository base path, or parallel runtime adapter.

The move from GitHub Pages is deliberate. Pages could publish the existing static presentation but could not run the server-side contact handler planned for the next feature. Native Next.js hosting keeps page rendering and future route handlers in one application without exposing delivery credentials to the browser.

Squarespace remains the domain registrar and DNS manager. Only web-routing records change during the cutover; MX and TXT records for `info@allpurposeapps.com` must remain intact. The last Pages deployment is the rollback target until the Vercel production domain has been verified and Pages is disabled.
