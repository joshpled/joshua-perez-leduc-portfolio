# Joshua Perez Leduc — Software Engineer

A responsive freelance software-engineering portfolio built around verified project work. The site presents Joshua's product, full-stack, mobile, cloud, and automation experience without overstating the maturity of unpublished concepts.

The visual direction is intentionally business-focused: restrained navy and cobalt, clear service positioning, evidence-led case studies, and generous spacing suitable for prospective clients or hiring teams.

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
- `public/projects` contains project-owned imagery reused with the portfolio.

## Contact details

The public email and profile links are intentionally left as a visible placeholder until the owner chooses which details to publish. Replace the `contact-placeholder` block in `app/page.tsx` when those details are available.

## Selected projects

The portfolio presents seven owner-selected products: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir. Boothline and Gatherroll receive expanded case studies; the remaining five use compact evidence cards so the page stays scannable.

## Project claims

Portfolio copy is based on local source plus the owner's public and private GitHub repositories. Product maturity is stated where relevant: Boothline, Lanes, and Noir are presented as concepts or prototypes, and no client counts, business outcomes, or production status are implied where they were not verified.
