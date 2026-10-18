# Costs, limits and spending controls

Budget: **€0/month**. Everything below runs on free plans. Limits were checked on 18 October 2026
against the providers' documentation; re-check them before relying on them.

| Area | Service and plan | Free allowance | Expected use | What happens beyond the limit |
|---|---|---|---|---|
| **Domain** | None yet | — | — | Buying one costs money and needs approval (≈ €10–15/year for `.com`). |
| **Hosting** | Cloudflare Pages, Free | Static requests and bandwidth unlimited; 500 Git-integrated builds/month; 20,000 files and 25 MiB per file per site; 100 custom domains per project | Two sites, a few MB each. Deployments are uploaded from GitHub Actions, not built by Cloudflare | No automatic charges on the Free plan; no payment method is needed. Pages Functions are not used (they would count against Workers Free: 100,000 requests/day) |
| **CI / data refresh** | GitHub Actions, GitHub Free | Public repos: free. Private repos: 2,000 min/month, 500 MB artifacts | Portfolio (public): free. Horizonte (private): ~1 billed min/hour ≈ 744 min/month + pushes | Without a payment method, GitHub **blocks** further runs until the next month — it does not charge. Horizonte would then show its "old data" warning |
| **Development environment** | GitHub Codespaces, GitHub Free | 120 core-hours/month (= 60 h on a 2-core machine) and 15 GB-month storage | A few hours per week | Without a payment method, usage is blocked at the quota. Delete unused codespaces to save storage |
| **Storage & transfer** | Inside Cloudflare Pages deployments | Included | ~5 MB per Horizonte deployment (frames are deduplicated by hash) | Included in hosting. No R2/S3 bucket is used (R2 requires a payment method on file) |
| **Processing & APIs** | EUMETSAT EUMETView WMS | Public, no account, `Fees: none` in its capabilities. Rate limit observed: 20 requests/s, 8 concurrent | ~37 requests/hour from CI only — visitors never call EUMETSAT | Requests are delayed by the server; the job retries and, if it still fails, keeps the previous data |

## Spending controls to set (or keep)

- **GitHub:** do not add a payment method. If one is added later, set *Settings → Billing and licensing →
  Budgets and alerts* to a **$0 budget with "Stop usage when budget limit is reached"** for Actions and Codespaces.
- **Cloudflare:** stay on the Free plan; do not enable Workers Paid, R2 or other paid add-ons.
  Cloudflare's dashboard does not need a card for anything used here.
- **Codespaces:** keep the default 30-minute idle timeout and the 2-core machine.

## Why visitors cannot create costs

Visitors download only static files from Cloudflare's CDN. Satellite images are fetched once per hour by
CI, cropped to the region and served from cache. There is no backend, function or database to scale.

## If Horizonte's Actions minutes become tight

Measure in *Settings → Billing → Usage*. Options, in order:
1. Refresh every 2 hours: change the cron in `.github/workflows/build-deploy.yml` to `17 */2 * * *` and raise
   `FRESHNESS.staleAfterMinutes` in `src/config/app.ts` to ~210.
2. Make the repository public (Actions become free); nothing in it is secret.
