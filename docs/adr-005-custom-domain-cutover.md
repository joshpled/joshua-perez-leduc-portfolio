# ADR 005: Custom-domain cutover

## Context

The public portfolio currently lives at `joshpled.github.io/joshua-perez-leduc-portfolio`. GitHub Pages project sites require that repository subpath in generated asset URLs, while the new primary domain, `allpurposeapps.com`, serves the same site from `/`. Deploying either path assumption at the wrong time would make styles, scripts, and images fail to load.

The primary domain and four defensive domains are managed in Squarespace. GitHub Pages accepts one apex domain and its `www` counterpart for a site, not several unrelated apex domains.

## Decision

Keep one static Pages workflow and choose its base path with the repository Actions variable `PAGES_CUSTOM_DOMAIN`:

- Any value other than `true` keeps the `/joshua-perez-leduc-portfolio` base path.
- The exact value `true` produces root-relative output for `allpurposeapps.com`.

Use `allpurposeapps.com` as the canonical domain, configure `www.allpurposeapps.com` as its companion, and permanently redirect `allpurposeapps.app`, `allpurposeapps.net`, `allpurposeapps.org`, and `allpurpose.app` to the canonical HTTPS address through Squarespace.

## Why

- The code can merge without disrupting the current public URL.
- The DNS cutover can be activated and rolled back through configuration rather than another source change.
- One canonical domain prevents duplicate public addresses from competing in search results or confusing visitors.
- Squarespace forwarding keeps the defensive domains useful without exceeding GitHub Pages' custom-domain model.

## Alternatives rejected

- **Switch the base path permanently in code:** creates an outage between the code deployment and DNS/custom-domain configuration.
- **Attach all five apex domains directly to GitHub Pages:** unsupported for one Pages site and provides no single canonical address.
- **Move hosting providers solely for redirects:** unnecessary because Squarespace already manages the domains and supports permanent forwarding.
- **Duplicate the exported assets at root and under the repository path:** increases build complexity and leaves two public URL structures to maintain.

## Consequences

The repository variable and GitHub Pages custom-domain setting must stay aligned. A custom-domain deployment requires root-relative output; the fallback `github.io` deployment requires the repository base path. DNS changes and certificate provisioning may take time, so the existing public URL remains the rollback target until the custom domain has been verified over HTTPS.
