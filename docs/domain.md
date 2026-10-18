# Connecting a custom domain

There is no domain yet. Both sites work on Cloudflare's free addresses:

- Portfolio: `https://gabriel-olius.pages.dev`
- Horizonte: `https://horizonte.pages.dev`

The target layout once a domain (here `example.com`) is bought:

| Address | Project |
|---|---|
| `example.com` and `www.example.com` | Cloudflare Pages project `gabriel-olius` |
| `horizonte.example.com` | Cloudflare Pages project `horizonte` |
| `<next-app>.example.com` | that app's own Pages project |

The domain itself is the only part that costs money (typically €10–15/year for a `.com`, depending on the
registrar; Cloudflare Registrar sells at cost). Buying one needs your approval.

## Option A — DNS managed by Cloudflare (recommended, required for the apex domain)

1. Cloudflare dashboard → **Add a domain** → choose the **Free** plan.
2. At your registrar, replace the nameservers with the two Cloudflare shows. Wait until the zone is *Active*.
3. **Workers & Pages → gabriel-olius → Custom domains → Set up a custom domain** → `example.com`.
   Cloudflare creates the DNS record and the HTTPS certificate automatically. Repeat for `www.example.com`.
4. **Workers & Pages → horizonte → Custom domains** → `horizonte.example.com`.

Records Cloudflare creates (for reference — do not add them by hand before step 3,
or the domain will not validate):

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` (apex, flattened) | `gabriel-olius.pages.dev` | Proxied |
| CNAME | `www` | `gabriel-olius.pages.dev` | Proxied |
| CNAME | `horizonte` | `horizonte.pages.dev` | Proxied |

Optional: a redirect rule from `www.example.com` to `example.com` (Rules → Redirect Rules, free).

## Option B — DNS stays at another provider (subdomains only)

Cloudflare Pages can only use the apex domain if the zone is on Cloudflare. Subdomains work anywhere:

1. In the Pages project, add the custom domain `horizonte.example.com` first.
2. At your DNS provider, add `CNAME horizonte → horizonte.pages.dev`.
3. Wait for validation; HTTPS is issued automatically.

## After the domain works — update the code

| Repository | File | Change |
|---|---|---|
| Portfolio | `astro.config.mjs` | `site` fallback → `'https://example.com'` |
| Portfolio | `src/config/site.ts` | Horizonte `url: 'https://horizonte.example.com'` |
| Portfolio | `src/content/projects/en/horizonte.md` | `demoUrl` |
| Horizonte | `src/config/app.ts` | `PORTFOLIO_URL = 'https://example.com'` |

Push both repositories; Cloudflare redeploys them. The `*.pages.dev` addresses keep working, which is harmless.
