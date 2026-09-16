# All-Purpose Apps

A responsive company portfolio for All-Purpose Apps, Joshua Perez Leduc's independent software development company. The company builds websites, web apps, mobile apps, desktop apps, and original software products.

The visual direction is intentionally business-focused: the official forest, cream, and terracotta palette frames clear service positioning, evidence-led case studies, and generous spacing. The approved particle-dissolving `A`, fine grain, and measured linework suggest ideas taking shape without turning the company into a bakery brand.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

The development server prints the local URL. Use `npm run build` to create the production bundle.

## Deploy to Vercel

Vercel runs the site as a native Next.js application. Import `joshpled/joshua-perez-leduc-portfolio`, keep the detected framework preset as **Next.js**, and use the repository defaults:

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: leave unset so Vercel uses Next.js output
- Node.js: 22.x

Every pull request receives an isolated preview deployment. Merges to `main` publish to production automatically after the project is connected.

### Custom-domain cutover

1. Add `allpurposeapps.com` and `www.allpurposeapps.com` to the Vercel project.
2. Copy the DNS records Vercel provides into Squarespace DNS. Preserve all MX and TXT records used by `info@allpurposeapps.com`.
3. Confirm the Vercel deployment works over HTTPS on both hostnames before changing the primary domain.
4. Make `allpurposeapps.com` the primary production domain and redirect `www` to it.
5. After the Vercel site is verified, disable GitHub Pages in the repository settings. Existing secondary-domain forwards can continue targeting `https://allpurposeapps.com`.

For rollback, restore the previous Squarespace web records while leaving mail records untouched. The last GitHub Pages deployment remains available until Pages is explicitly disabled.

## Content

- `app/page.tsx` contains the portfolio structure and project case studies.
- `app/globals.css` contains the visual system and responsive layout.
- `public/brand` contains the approved badge, horizontal lockup, standalone symbol, web icons, social card, and locally hosted companion fonts.
- `public/projects` contains project-owned imagery reused with the portfolio.

## Brand language

- Main descriptor: “Custom software for businesses and big ideas.”
- Hero tagline: “Your ideas. Made from scratch.”
- Supporting tagline: “All-purpose skills. Built for your purpose.”

Each line has one primary placement so the brand remains memorable without becoming repetitive.

## Brand assets

The website uses the September 15, 2026 professional brand kit supplied by the owner. Logo artwork remains in its official outlined SVG form: do not retype the logo, move its particles, recolor individual elements, or add effects. Use the horizontal lockup for wide navigation and footer placements, the badge for the hero, and the standalone symbol for compact placements.

Companion typography is hosted locally from the supplied kit: Barlow Condensed Bold for display headings and Inter for body and interface copy. The font license files live beside the font files in `public/brand/fonts`.

## Contact inquiries

The `/contact` page saves inquiries in Supabase for the owner to read in its dashboard, using the same storage-and-review workflow as the naming poll. The table is `public.contact_inquiries` in the existing `software-name-poll` project. There are no email notifications. A direct email link remains an optional fallback.

The Vercel endpoint checks Turnstile and validates fields before storing a private inquiry. The public cannot read, edit, delete, or directly insert rows. A database uniqueness constraint prevents duplicates when retrying the same page submission with unchanged content. The database supplies the submission timestamp.

Copy `.env.example` to `.env.local` for local setup. Required values: `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `TURNSTILE_SITE_KEY`, and `TURNSTILE_SECRET_KEY`. `CONTACT_ALLOWED_ORIGINS` adds exact trusted local/preview origins. Only the widget site key reaches the browser. See [contact setup](docs/contact-setup.md) for the owner dashboard, database schema, Vercel configuration, verification, and troubleshooting.

Run `npm test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build`. Application tests mock providers and save no real inquiries. Run `tests/contact-database.sql` in Supabase to verify permissions with rollback-only data. A real browser submission and dashboard receipt check are required separately before release. No new dependency is required.

## Selected projects

The portfolio presents seven owner-selected products in a swipeable gallery: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir. Boothline and Gatherroll include expanded case-study context; the other five retain their descriptions and evidence in matching gallery panels.

### Keeping the page readable

Introduce each project once, then use concrete capabilities as evidence. Keep its full maturity label directly beneath its title: a prototype or planned integration must remain clear before the visitor reads the implementation details. All project evidence, challenge/solution context, and stacks remain expanded within each gallery panel.

Services use their category headings and example lists without a repeated marketing paragraph. Keep the full platform range there and in the technology summary rather than repeating it in the hero and About section. On mobile, Work, Services, and About remain visible beneath the contact action, and the hero badge stays above the headline at a smaller display size.

For layout changes, check 320px, 390px, 768px, and 1280px widths, keyboard focus, anchor destinations below the sticky header, and image proportions. ADR 008 records the initial readability work; ADR 009 records the gallery that replaces the proposed expandable-detail follow-up.

### Project gallery

`app/project-gallery.tsx` adds a small client wrapper around server-rendered project panels from `app/page.tsx`. Swipe horizontally, use Previous/Next, or choose a project by name. With the panel focused, Left/Right browse and Home/End jump to the ends. Navigation never wraps or starts automatically. Reduced-motion preferences disable smooth navigation.

Keep the `names` list and children in the same order. If adding a project, update both. The gallery fits its selected panel's natural height, including after fonts/images load or the viewport changes. Native scroll snapping remains available before JavaScript loads; controls appear after hydration. Print shows every project. Verify that one panel is exposed to assistive technology after hydration, the counter follows swiping, and inactive panels cannot receive keyboard focus.

## Project claims

Portfolio copy is based on local source plus the owner's public and private GitHub repositories. Product maturity is stated where relevant: Boothline, Lanes, and Noir are presented as concepts or prototypes, and no client counts, business outcomes, or production status are implied where they were not verified.
