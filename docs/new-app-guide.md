# Adding a new app (own repository, own deployment)

Each app — ocean, coast, extreme events… — lives in its own repository with its own dependencies, checks and
Cloudflare project. The portfolio only links to it. Horizonte is the reference example.

## 1. Repository

On github.com: **New repository** → name `<app>` → **Private** → create (empty). Then locally:

```bash
mkdir <app> && cd <app>
git init -b main
git remote add origin https://github.com/6roli/<app>.git
```

Start with the smallest stack that does the job:

- plain HTML/CSS for a mostly static page;
- **Vite + TypeScript** for an interactive page (copy Horizonte's `package.json`, `tsconfig.json`, `vite.config.ts`);
- **Astro** if it is content-heavy;
- **Python** (`pyproject.toml` + `.venv`) only for analyses, in an `analysis/` folder.

From Horizonte, copy what applies: `.gitignore`, `.editorconfig`, `.gitattributes`, `.nvmrc`,
`src/styles/tokens.css` (shared colours and fonts), the header with the **← Portfolio** link,
`public/_headers`, `public/404.html`, `public/favicon.svg`.

Add an `npm run verify` script that runs the type check, tests and build. Cloudflare runs it before every deployment.

## 2. Identity

- Give the app its **own name**, defined once in a config file and in `<title>`.
- Keep the shared tokens (light background, dark text, `#0b6782` accent) so it reads as related to the portfolio.
- Always include a visible link back to the portfolio.

## 3. Data (if any)

- Use authorised, documented sources; record licence, attribution, cost and rate limits in the README.
- Prefer services designed for direct web use (like EUMETView WMS). If the data needs heavy processing, pre-compute
  it and publish only the small results; visitors must not trigger expensive work.
- Never commit raw satellite files, secrets or `.env` files (see `.gitignore`).
- Validate data before showing it, and show source, time, time zone, age and limitations.
- Label every layer as **observation**, **estimate** or **forecast**. Experimental detections are never warnings.

## 4. Publish on Cloudflare

1. Add a `wrangler.jsonc` (copy Horizonte's) and set `"name"` to the app name. It declares the site as static files
   in `dist/` — without it, Cloudflare tries to set up a server adapter and the deployment fails.
2. Make `npm run build` run the checks (type check, tests) before building, as in Horizonte.
3. Push the code: `git add -A && git commit -m "…" && git push -u origin main`.
4. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → choose the repository.
   If it is not listed, grant the Cloudflare GitHub app access to it.
5. Project name: **exactly the `name` in `wrangler.jsonc`**. Keep the default commands
   (`npm run build`, `npx wrangler deploy`). Deploy.
6. The address is `https://<name>.gabriel-olius.workers.dev` (*project → Domains*).

From then on every push to `main` deploys; other branches get preview versions.

## 5. Domain (when there is one)

Add `<app>.example.com` as a custom domain of the new Cloudflare project (see `docs/domain.md`).

## 6. Link it from the portfolio

In the Portfolio repository:

1. Add the app to `apps` in `src/config/site.ts`.
2. Add `src/content/projects/en/<app>.md` with problem, data, method, results, limitations and architecture,
   plus a real image with its credit.
3. Push — the portfolio redeploys by itself.

## 7. Before calling it done

- [ ] `npm run verify` passes locally and in the Cloudflare build
- [ ] Layout checked at phone width (~390 px)
- [ ] Loading, error and stale/no-data states tested
- [ ] No secrets, `.env` files, personal data or large raw files committed
- [ ] Public URL opened over HTTPS, and the link back to the portfolio works
- [ ] Free-plan usage estimated (builds, external API limits)
