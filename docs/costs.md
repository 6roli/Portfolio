# Costs, limits and spending controls

Budget: **€0/month**. Everything runs on free plans that do not need a payment method.
Limits checked on 18 October 2026 against the providers' documentation; re-check before relying on them.

| Area | Service and plan | Free allowance | Expected use | Beyond the limit |
|---|---|---|---|---|
| **Domain** | None yet | — | — | Buying one costs money (≈ €10–15/year for a `.com`) and needs approval |
| **Hosting** | Cloudflare Pages, Free | Static requests and bandwidth unlimited; 20,000 files and 25 MiB per file per site; 100 custom domains per project | Two small static sites | Free plan has no usage charges; no card on file |
| **Builds** | Cloudflare Pages, Free | 500 builds/month per account, 1 at a time, 20 min timeout | One build per push to either repository | Further builds wait until next month; the sites stay online |
| **Development** | Your computer (VS Code, Node.js) | — | — | — |
| **Storage & transfer** | Included in Cloudflare Pages | — | Portfolio < 1 MB; Horizonte ≈ 2 MB (mostly the sample) | — |
| **Data / APIs** | EUMETSAT EUMETView WMS | Public, no account; capabilities state `Fees: none` | Each Horizonte visit: ~2 capabilities requests + ~20 images (≈ 2 MB), loaded by the visitor's browser | EUMETView delays excess requests (observed limit 20/s, 8 concurrent per client) |
| **CI** | Not used | — | Checks run inside the Cloudflare build | — |

## Spending controls

- **Cloudflare:** stay on the Free plan; do not add a payment method or enable Workers Paid, R2 or other add-ons.
  Pages Functions are not used (they would count against the Workers Free quota of 100,000 requests/day).
- **GitHub:** nothing billable is used. If a payment method is ever added, set a $0 budget with
  "stop usage" under *Settings → Billing and licensing → Budgets and alerts*.

## Why visitors cannot create costs

Everything we host is static and served by Cloudflare's CDN at no charge. Horizonte's images are requested from
EUMETSAT's public service by the visitor's browser and cached there; there is no backend of ours to scale.
