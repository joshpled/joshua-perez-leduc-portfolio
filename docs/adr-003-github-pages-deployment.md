# ADR 003: GitHub Pages static deployment

## Context

GitHub Pages was configured to deploy the repository root with its legacy Jekyll build. Because the repository contains source code rather than a committed static site, that configuration rendered `README.md` instead of the portfolio.

The portfolio currently has one route and no runtime database, authentication, API, or form-processing requirements.

## Decision

Build and deploy the site through GitHub Actions. The workflow runs a dedicated Next.js static export and publishes the generated `out/` directory as a Pages artifact.

The Pages build derives `/joshua-perez-leduc-portfolio` from `GITHUB_REPOSITORY` and embeds it as the application base path by default. When `PAGES_CUSTOM_DOMAIN=true`, it uses an empty base path for the custom-domain root. Local development and the existing Sites build also keep an empty base path.

## Why

- Pages receives deployable HTML, CSS, JavaScript, and images instead of repository documentation.
- The generated site stays reproducible from `package-lock.json` and the committed workflow.
- The production URL can live under GitHub's repository subpath without breaking framework or public assets.
- The existing Sites-oriented build remains available without coupling local development to GitHub Pages.

## Alternatives rejected

- **Commit the generated `out/` directory:** duplicates build output in source control and makes stale artifacts easy to publish.
- **Publish the repository root:** repeats the current failure because it is source code, not a static document root.
- **Replace the existing build command:** unnecessarily couples local development and Sites hosting to GitHub Pages' subpath.

## Consequences

The site remains static on Pages. A repository rename changes the fallback path assumption, while the custom-domain switch is coordinated through ADR 005. Future server-side features require a new hosting decision.
