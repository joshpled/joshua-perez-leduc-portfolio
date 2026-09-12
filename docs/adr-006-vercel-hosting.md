# ADR 006: Host the commercial site on Vercel Pro

## Context

All-Purpose Apps is a commercial software company site. It is currently deployed as a static export on GitHub Pages, but the next product requirement is a first-party contact page that delivers inquiries without opening the visitor's email application. That requires trusted server-side code and a protected delivery credential.

The repository also carried separate Next.js, Vinext/Cloudflare, and GitHub Pages build paths. Maintaining three deployment models made local and production behavior harder to reason about.

## Decision

Use Vercel Pro as the single application host and deploy the repository as native Next.js.

- Pull requests receive preview deployments.
- Merges to `main` create production deployments.
- Future contact delivery runs in a Next.js route handler with secrets stored in Vercel environment variables.
- Squarespace remains the registrar and DNS manager.
- Existing MX and TXT records for `info@allpurposeapps.com` remain unchanged.

Retire the static-export switch, GitHub Pages workflow, and Vinext/Cloudflare build adapter. Keep the last Pages deployment available only as a temporary rollback target during the DNS cutover.

## Why

The application is already written in Next.js, so native hosting removes translation layers and provides the server runtime needed for the contact form. Vercel's preview deployments also create a reliable review step before changes reach the company domain.

## Alternatives rejected

- **Keep GitHub Pages and use an external form endpoint:** less hosting work, but visitor data and success behavior would depend on a third-party form relay, and Pages is a poor long-term fit for a commercial service site.
- **Keep multiple deployment targets:** preserves optionality, but every server feature would need a separate compatibility decision and duplicate configuration.
- **Move to Vercel Hobby:** not appropriate because Vercel restricts Hobby deployments to personal, non-commercial use.

## Consequences

Vercel Pro adds a recurring hosting cost and a platform dependency. In return, the codebase has one build model and can safely add server-side capabilities. DNS changes must be staged carefully so the website moves without disrupting company email.
