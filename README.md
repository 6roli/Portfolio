# Portfolio — Gabriel Olius

Personal website: profile, CV, projects and links to independent applications.
Built with [Astro](https://astro.build) as a fully static site and deployed to Cloudflare Pages.

| | |
|---|---|
| Live site | https://gabriel-olius.pages.dev (custom domain: pending) |
| Language | English (structure ready for Spanish) |
| Hosting | Cloudflare Pages, Free plan |
| Monthly cost | €0 |

## Contents

- [What is where](#what-is-where)
- [Editing personal information](#editing-personal-information)
- [Adding a project](#adding-a-project)
- [Working in GitHub Codespaces](#working-in-github-codespaces)
- [Working in VS Code on your computer](#working-in-vs-code-on-your-computer)
- [Checks](#checks)
- [Deployment](#deployment)
- [Custom domain](#custom-domain)
- [Adding Spanish](#adding-spanish)
- [Architecture](docs/architecture.md) · [Adding a new app](docs/new-app-guide.md) · [Costs and limits](docs/costs.md)

## What is where

```
src/
  config/site.ts        Name, headline, contact links, CV file, list of live apps
  config/about.ts       Biography, education, experience (shared by About and CV)
  content/projects/en/  One Markdown file per project
  i18n/                 Interface strings (en.ts) and helpers
  pages/                Routes: /, /about, /cv, /projects, /projects/<slug>, /contact
  components/, layouts/ Reusable UI
  styles/global.css     Colours, typography (shared identity with the apps)
public/                 Static files: images, favicon, Cloudflare _headers
scripts/check-links.mjs Verifies every internal link in the build
```

## Editing personal information

Nothing personal is invented. Every missing field is `null` (or an empty list) and shows up on
the site as a yellow **Pending** marker, so it is obvious what still needs filling in.

1. `src/config/site.ts` → `headline`, `intro`, `location`, `email`, `linkedinUrl`, `otherLinks`.
   Only enter an email address you want to publish.
2. `src/config/about.ts` → `bio`, `education`, `experience`, `interests`, `languages`.
3. **CV file:** put the PDF at `public/cv/gabriel-olius-cv.pdf`, remove the `public/cv/*.pdf` line from
   `.gitignore` (it prevents committing personal documents by accident) and set
   `cvFile: '/cv/gabriel-olius-cv.pdf'` in `site.ts`. The download button appears automatically.

## Adding a project

Create `src/content/projects/en/<slug>.md`. The page `/projects/<slug>/` is generated automatically.
The schema in `src/content.config.ts` validates every field at build time.

```markdown
---
title: Flood mapping from Sentinel-1
summary: One or two sentences (max 220 characters).
status: in-progress          # live | in-progress | repository
featured: true               # shown on the home page
order: 5                     # lower = earlier
areas: [ml, earth-observation]   # ml | software | architecture | earth-observation
technologies: [Python, PyTorch]
image:
  src: /images/projects/flood.jpg
  alt: Describe what the image shows.
  credit: Data source and licence.
demoUrl: https://…
repoUrl: https://github.com/6roli/…
repoIsPublic: true
needsReview: false
problem: …        # use null for anything not yet known
data: …
method: …
results: …        # real results only; null renders a "pending" marker
limitations: …
architecture: …
---
```

Prefer real images, maps and results. Do not add self-rated skill percentages.

## Working in GitHub Codespaces

1. On GitHub: **Code → Codespaces → Create codespace on main**.
2. Wait for `npm ci` to finish (configured in `.devcontainer/devcontainer.json`).
3. Run `npm run dev`. Codespaces opens the forwarded port 4321 in a preview tab.

To use your local VS Code instead of the browser: in the codespace menu choose **Open in VS Code Desktop**
(needs the *GitHub Codespaces* extension).

Codespaces stops idle machines after 30 minutes by default. The free quota is 120 core-hours/month
(60 hours on the 2-core machine) plus 15 GB-month of storage; delete codespaces you no longer need.

## Working in VS Code on your computer

Requirements: Node.js 24 LTS and Git.

```bash
git clone https://github.com/6roli/Portfolio.git
cd Portfolio
npm ci
npm run dev        # http://localhost:4321
```

Alternatively, with Docker Desktop and the *Dev Containers* extension, use **Reopen in Container** to get
exactly the Codespaces environment. Docker is optional and not used in production.

## Checks

```bash
npm run check        # TypeScript and Astro diagnostics, content schema validation
npm run build        # static build into dist/
npm run check:links  # every internal link and asset in dist/ must exist
npm run verify       # all of the above
node scripts/check-links.mjs dist --external   # also test external links (manual)
```

GitHub Actions runs the same checks on every push and pull request
(`.github/workflows/ci-deploy.yml`) plus a simple scan of the build for leaked secrets.

## Deployment

```
git push ──► GitHub Actions: check → build → link check ──► wrangler pages deploy ──► Cloudflare Pages
```

- Push to `main` → production: https://gabriel-olius.pages.dev
- Push to any other branch → preview: `https://<branch>.gabriel-olius.pages.dev` (URL in the job summary).

Required repository secrets (*Settings → Secrets and variables → Actions*):

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Custom API token with **Account → Cloudflare Pages → Edit** only |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID shown in the Cloudflare dashboard |

Without them the workflow still runs all checks and skips deployment with a notice.

GitHub Environments are not used: there is one production target and no approval step, so they would add
configuration without a function.

## Custom domain

See [docs/domain.md](docs/domain.md). After connecting a domain, update `SITE_URL` in
`.github/workflows/ci-deploy.yml` and the app links in `src/config/site.ts`.

## Adding Spanish

1. Add `'es'` to `i18n.locales` in `astro.config.mjs`.
2. Create `src/i18n/es.ts` exporting the same keys as `en.ts` (TypeScript enforces it) and register it in `src/i18n/index.ts`.
3. Add translated projects in `src/content/projects/es/`.
4. Add pages under `src/pages/es/` (they can reuse the same components; `Astro.currentLocale` selects the strings).
5. Add a language switcher to `BaseLayout.astro`.
