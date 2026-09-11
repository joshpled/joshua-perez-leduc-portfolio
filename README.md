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

## Deploy to GitHub Pages

GitHub Pages uses `.github/workflows/deploy-pages.yml`. A push to `main` installs the locked dependencies, runs the dedicated static export with `npm run build:pages`, and deploys the generated `out/` directory.

The Pages build sets the repository base path at build time. This keeps framework assets, project images, and the favicon working at `https://joshpled.github.io/joshua-perez-leduc-portfolio/` while leaving local development and the existing Sites build at the domain root.

To reproduce the Pages build locally:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=joshpled/joshua-perez-leduc-portfolio npm run build:pages
```

The portfolio is presentation-only, so static hosting is sufficient. Adding server routes, runtime authentication, or a contact backend would require a different hosting decision.

## Content

- `app/page.tsx` contains the portfolio structure and project case studies.
- `app/globals.css` contains the visual system and responsive layout.
- `public/brand` contains the approved All-Purpose Apps mark and app icon.
- `public/projects` contains project-owned imagery reused with the portfolio.

## Brand language

- Main descriptor: “Custom software for businesses and big ideas.”
- Hero tagline: “Your ideas. Made from scratch.”
- Supporting tagline: “All-purpose skills. Built for your purpose.”

Each line has one primary placement so the brand remains memorable without becoming repetitive.

## Contact details

The public email and profile links are intentionally left as a visible placeholder until the owner chooses which details to publish. Replace the `contact-placeholder` block in `app/page.tsx` when those details are available.

## Selected projects

The portfolio presents seven owner-selected products: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir. Boothline and Gatherroll receive expanded case studies; the remaining five use compact evidence cards so the page stays scannable.

## Project claims

Portfolio copy is based on local source plus the owner's public and private GitHub repositories. Product maturity is stated where relevant: Boothline, Lanes, and Noir are presented as concepts or prototypes, and no client counts, business outcomes, or production status are implied where they were not verified.
