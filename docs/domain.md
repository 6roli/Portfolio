# Connecting a custom domain

There is no domain yet. Both sites work on Cloudflare's free addresses:

- Portfolio: `https://portfolio.gabriel-olius.workers.dev`
- Horizonte: `https://horizonte.gabriel-olius.workers.dev`

Target layout once a domain (here `example.com`) is bought:

| Address | Cloudflare project (Worker) |
|---|---|
| `example.com` and `www.example.com` | `portfolio` |
| `horizonte.example.com` | `horizonte` |
| `<next-app>.example.com` | that app's own project |

The domain is the only part that costs money (typically €10–15/year for a `.com`; Cloudflare Registrar sells at
cost). Buying one needs your approval.

## Steps

Custom domains on Workers require the domain's DNS to be managed by Cloudflare (free plan).

1. If the domain is bought elsewhere: Cloudflare dashboard → **Add a domain** → **Free** plan → at your registrar,
   replace the nameservers with the two Cloudflare shows. Wait until the zone is *Active*.
   (Bought at Cloudflare Registrar: already done.)
2. **Workers & Pages → portfolio → Domains → Add Domain** → `example.com`. Repeat for `www.example.com`.
   Cloudflare creates the DNS records and the HTTPS certificate; do not add records by hand.
3. **Workers & Pages → horizonte → Domains → Add Domain** → `horizonte.example.com`.

Optional: redirect `www.example.com` to `example.com` (*Rules → Redirect Rules*, free).

## After the domain works — update the code

| Repository | File | Change |
|---|---|---|
| Portfolio | `astro.config.mjs` | `site` fallback → `'https://example.com'` |
| Portfolio | `src/config/site.ts` | Horizonte `url: 'https://horizonte.example.com'` |
| Portfolio | `src/content/projects/en/horizonte.md` | `demoUrl` |
| Horizonte | `src/config/app.ts` | `PORTFOLIO_URL = 'https://example.com'` |

Push both repositories; Cloudflare redeploys them. The `*.workers.dev` addresses can then be switched off in
*Domains → Worker URL* if you want a single public address.
