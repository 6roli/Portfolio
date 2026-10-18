# Adding a new app (own repository, own deployment)

Each app — ocean, coast, extreme events… — lives in its own repository, with its own dependencies,
checks and Cloudflare Pages project. The portfolio only links to it. Use Horizonte as the template.

## 1. Repository

```bash
gh repo create 6roli/<app> --private --clone
cd <app>
```

Copy from `horizonte` only what you need, typically:

- `.devcontainer/devcontainer.json`, `.editorconfig`, `.gitattributes`, `.nvmrc`, `.gitignore`
- `.github/workflows/build-deploy.yml` (remove the data steps if the app has no scheduled refresh)
- `src/styles/tokens.css` (shared colours and fonts) and the header pattern with the
  **← Portfolio** link
- `public/_headers`, `public/404.html`, `public/favicon.svg`

Start with the smallest stack that does the job: plain static pages first; Vite + TypeScript for an
interactive page; Astro if it is content-heavy. Add a library only for a concrete need.

## 2. Identity

- Give the app its **own name**, defined once in `src/config/app.ts` and in `<title>`.
- Keep the shared tokens (light background, dark text, `#0b6782` accent) so it reads as related to the portfolio.
- Always include a visible link back to the portfolio (`PORTFOLIO_URL`).

## 3. Data (if any)

- Use authorised, documented sources. Check licence, attribution, cost and rate limits; record them in the README.
- Prepare data in CI (or a scheduled job) and publish static results. Visitors must not trigger downloads
  or computation at the source.
- Store only crops, caches and results — never raw satellite files in Git (see `.gitignore`).
- Validate data with a schema before publishing, and show source, time, time zone, age and limitations in the UI.
- Label every layer as **observation**, **estimate** or **forecast**. Do not present experimental detections as warnings.

## 4. Cloudflare Pages project

```bash
npx wrangler@4.147.0 pages project create <app> --production-branch main
```

Then add the repository secrets:

```bash
gh secret set CLOUDFLARE_API_TOKEN  --repo 6roli/<app>   # paste when prompted
gh secret set CLOUDFLARE_ACCOUNT_ID --repo 6roli/<app>
```

Push to `main`: the workflow checks, builds and deploys to `https://<app>.pages.dev`.
If the name is taken, Cloudflare adds a suffix — use the URL it reports.

## 5. Domain (when there is one)

Add `<app>.example.com` as a custom domain of the new Pages project (see `docs/domain.md`).

## 6. Link it from the portfolio

In the Portfolio repository:

1. Add the app to `apps` in `src/config/site.ts`.
2. Add `src/content/projects/en/<app>.md` with problem, data, method, results, limitations and architecture,
   and a real image with its credit.
3. Push — the portfolio redeploys on its own.

## 7. Before calling it done

- [ ] `npm run verify` (or equivalent) passes locally and in Actions
- [ ] Mobile layout checked at ~390 px
- [ ] Loading, error and stale/no-data states tested
- [ ] No secrets, `.env` files, personal data or large raw files committed
- [ ] Public URL opened and the link back to the portfolio works
- [ ] Free-tier usage estimated (Actions minutes if private, Pages limits)
