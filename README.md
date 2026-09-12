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

The Pages build supports two URL shapes:

- With the repository variable `PAGES_CUSTOM_DOMAIN` unset or set to anything except `true`, the build uses `/joshua-perez-leduc-portfolio` and remains available at `https://joshpled.github.io/joshua-perez-leduc-portfolio/`.
- With `PAGES_CUSTOM_DOMAIN=true`, the build uses the domain root for `https://allpurposeapps.com/`.

Keeping the switch in a repository variable lets the custom-domain cutover and rollback happen without another code change. Local development and the existing Sites build always use the domain root.

To reproduce the Pages build locally:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=joshpled/joshua-perez-leduc-portfolio npm run build:pages
```

To reproduce the custom-domain build locally:

```bash
GITHUB_PAGES=true PAGES_CUSTOM_DOMAIN=true npm run build:pages
```

### Custom-domain cutover

1. Verify `allpurposeapps.com` in the GitHub account Pages settings using GitHub's TXT record.
2. In the repository Pages settings, set `allpurposeapps.com` as the custom domain.
3. In Squarespace DNS, point the root domain to GitHub Pages with four `A` records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
4. Point `www` to `joshpled.github.io` with a `CNAME` record. Preserve unrelated TXT and email records.
5. Set the repository Actions variable `PAGES_CUSTOM_DOMAIN` to `true`, then run the Pages workflow.
6. After GitHub provisions the certificate, enable **Enforce HTTPS**.
7. In Squarespace, permanently forward the `.app`, `.net`, `.org`, and `allpurpose.app` domains to `https://allpurposeapps.com`.

For rollback, remove the custom domain in the repository Pages settings, set `PAGES_CUSTOM_DOMAIN` to `false`, and rerun the Pages workflow. The original `github.io` project URL will work again.

The portfolio is presentation-only, so static hosting is sufficient. Adding server routes, runtime authentication, or a contact backend would require a different hosting decision.

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

The public email and profile links are intentionally left as a visible placeholder until the owner chooses which details to publish. Replace the `contact-placeholder` block in `app/page.tsx` when those details are available.

## Selected projects

The portfolio presents seven owner-selected products: Boothline, Gatherroll, Wedding Dashboard, Builtproof, Lanes, When, and Noir. Boothline and Gatherroll receive expanded case studies; the remaining five use compact evidence cards so the page stays scannable.

## Project claims

Portfolio copy is based on local source plus the owner's public and private GitHub repositories. Product maturity is stated where relevant: Boothline, Lanes, and Noir are presented as concepts or prototypes, and no client counts, business outcomes, or production status are implied where they were not verified.
