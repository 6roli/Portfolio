# Portfolio — Gabriel Olius

Personal website: profile, CV, projects and links to independent applications such as
[Horizonte](https://github.com/6roli/Horizonte). A static site built with Astro and published on Cloudflare Pages.

| | |
|---|---|
| Live site | https://gabriel-olius.pages.dev *(final address confirmed after the first deployment)* |
| Language | English (structure ready for Spanish) |
| Hosting | Cloudflare Pages, Free plan, connected to this repository |
| Monthly cost | €0 |

## Technologies: what, where, why

| Technology | Runs where | Why it is needed |
|---|---|---|
| **Astro** | Your computer and Cloudflare's build server | Turns the pages and Markdown project files into plain HTML. The published site ships **no JavaScript**. |
| **CSS** (`src/styles/global.css`) | Browser | All styling, with a handful of variables for colours and fonts. No CSS framework. |
| **TypeScript** | Build time only | Type-checks configuration and the project schema, so a missing field fails the build instead of the live site. |
| **Node.js + npm** | Your computer and Cloudflare's build server | Installs Astro and runs the build and checks. |
| **Cloudflare Pages** | Cloudflare | Builds the site on every push to GitHub and serves it over HTTPS from its CDN. |

Everything a visitor receives is static HTML, CSS and images: no server, database, cookies or tracking.

## What is where

```
src/
  config/site.ts        Name, headline, contact links, CV file, list of live apps
  config/about.ts       Biography, education, experience (used by About and CV)
  content/projects/en/  One Markdown file per project
  content.config.ts     Schema every project file must satisfy
  i18n/                 Interface strings (en.ts) and helpers
  pages/                Routes: /, /about, /cv, /projects, /projects/<slug>, /contact, 404
  components/, layouts/ Reusable pieces of UI
  styles/global.css     Colours and typography (same identity as the apps)
public/                 Files copied as-is: images, favicon, robots.txt, _headers
scripts/check-links.mjs Verifies every internal link and image in the build
docs/                   Architecture, costs, domain, guide for new apps
```

## Develop locally (VS Code)

Requirements: **Node.js 24 LTS** (22.12+ works), **Git** and **VS Code**
(recommended extension: *Astro*, suggested automatically from `.vscode/extensions.json`).

```bash
git clone https://github.com/6roli/Portfolio.git
cd Portfolio
npm ci          # installs exact versions from package-lock.json
npm run dev     # http://localhost:4321 — reloads on save
```

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run check` | TypeScript and Astro diagnostics, project schema validation |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run check:links` | Every internal link and asset in `dist/` must exist |
| `npm run verify` | check + build + link check — same as `npm run build` |
| `node scripts/check-links.mjs dist --external` | Also test external links (manual, needs internet) |

## Publish

Cloudflare (Workers static assets, Free plan) is connected to this GitHub repository through its Git integration. No GitHub Actions or tokens are involved.

- Push to `main` → Cloudflare runs `npm run build` (all checks + build); if every check passes, the new version goes live.
- Push to another branch or open a pull request → a preview URL, shown in GitHub next to the commit.
- If a check fails, nothing is deployed and the previous version stays online. The build log is in the
  Cloudflare dashboard (*Workers & Pages → project → Deployments*).

Cloudflare project settings (*Workers & Pages → project → Settings → Build*):

| Setting | Value |
|---|---|
| Build command | `npm run build` (runs every check before building) |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` (preview URLs) |
| Production branch | `main` |

`wrangler.jsonc` tells Cloudflare the site is **only static files** in `dist/`: no Worker code and no server.
Static requests are free and unlimited. Do not let Wrangler or Astro add the `@astrojs/cloudflare` adapter; it is not needed.

`public/_headers` adds security headers (Content-Security-Policy etc.) and long caching for built assets.

## Editing personal information

Nothing personal is invented. Each missing field is `null` (or an empty list) and appears on the site as a yellow
**Pending** marker, so it is obvious what still needs filling in.

1. `src/config/site.ts` → `headline`, `intro`, `location`, `email`, `linkedinUrl`, `otherLinks`.
   Only enter an email address you want to publish.
2. `src/config/about.ts` → `bio`, `education`, `experience`, `interests`, `languages`.
3. **CV file:** save the PDF as `public/cv/gabriel-olius-cv.pdf`, remove the `public/cv/*.pdf` line from `.gitignore`
   (it prevents committing personal documents by accident), and set `cvFile: '/cv/gabriel-olius-cv.pdf'` in `site.ts`.
   The download button then appears on the CV page.
4. The yellow "First version" banner is in `src/layouts/BaseLayout.astro`; remove it once the pending items are done.

## Adding a project

Create `src/content/projects/en/<slug>.md`; the page `/projects/<slug>/` is generated automatically and the
schema in `src/content.config.ts` validates it at build time.

```markdown
---
title: Flood mapping from Sentinel-1
summary: One or two sentences (max 220 characters).
status: in-progress            # live | in-progress | repository
featured: true                 # shown on the home page
order: 5                       # lower = earlier
areas: [ml, earth-observation] # ml | software | architecture | earth-observation
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
results: …        # real results only; null shows a "pending" marker
limitations: …
architecture: …
---
```

Prefer real images, maps and results. No self-rated skill percentages.

The Car rental chatbot and ChordsAI entries were written from their repositories' code structure and are marked
`needsReview: true`; please check and complete them.

## Adding Spanish

1. Add `'es'` to `i18n.locales` in `astro.config.mjs`.
2. Create `src/i18n/es.ts` with the same keys as `en.ts` (TypeScript enforces it) and register it in `src/i18n/index.ts`.
3. Add translated projects in `src/content/projects/es/`.
4. Add pages under `src/pages/es/` reusing the same components (`Astro.currentLocale` selects the strings).
5. Add a language switcher in `BaseLayout.astro`.

## More

- [Architecture and decisions](docs/architecture.md)
- [Costs and limits](docs/costs.md)
- [Connecting a custom domain](docs/domain.md)
- [Adding a new app with its own repository and deployment](docs/new-app-guide.md)
