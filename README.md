# All-Purpose Apps

A responsive company portfolio for All-Purpose Apps, Joshua Perez Leduc's independent software development company. The company builds websites, web apps, mobile apps, desktop apps, and original software products.

The visual direction is intentionally business-focused: deep forest green, warm cream, and a restrained burnt-orange accent frame clear service positioning, evidence-led case studies, and generous spacing. The supplied geometric `A` mark, fine grain, and measured linework nod to the all-purpose-flour reference without turning the company into a bakery brand.

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
- `public/brand` contains the approved All-Purpose Apps mark, app icon, and outlined vector brand seal.
- `public/projects` contains project-owned imagery reused with the portfolio.

## Brand language

- Main descriptor: “Custom software for businesses and big ideas.”
- Hero tagline: “Your ideas. Made from scratch.”
- Supporting tagline: “All-purpose skills. Built for your purpose.”

Each line has one primary placement so the brand remains memorable without becoming repetitive.

## Contact details

The current contact block is presentation-only. A dedicated contact page and server-side email delivery are planned as the first feature after the Vercel migration.

## Selected projects

The portfolio presents seven owner-selected products: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir. Boothline and Gatherroll receive expanded case studies; the remaining five use compact evidence cards so the page stays scannable.

## Project claims

Portfolio copy is based on local source plus the owner's public and private GitHub repositories. Product maturity is stated where relevant: Boothline, Lanes, and Noir are presented as concepts or prototypes, and no client counts, business outcomes, or production status are implied where they were not verified.
