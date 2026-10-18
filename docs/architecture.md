# Architecture

Each project is an independent GitHub repository with its own dependencies, checks and Cloudflare Pages
project. The portfolio only links to the apps; nothing is shared at build time.

```mermaid
flowchart LR
  subgraph GitHub
    P[6roli/Portfolio<br/>public]
    H[6roli/horizonte<br/>private]
  end

  subgraph CF[Cloudflare Pages - Free plan]
    BP[Build: npm run verify] --> SP[gabriel-olius.pages.dev<br/>static HTML/CSS]
    BH[Build: npm run verify] --> SH[horizonte.pages.dev<br/>static HTML/JS + sample]
  end

  P -- push --> BP
  H -- push --> BH

  V((Visitor's browser))
  V --> SP
  V --> SH
  V -- "Horizonte only: capabilities + images" --> E[(EUMETSAT<br/>EUMETView WMS)]
  SP -. link .-> SH
  SH -. "← Portfolio" .-> SP
```

Plain-text version:

```
git push ──► GitHub ──► Cloudflare Pages build (npm run verify) ──► static files on the CDN (HTTPS)

Visitor ──► gabriel-olius.pages.dev     Portfolio: HTML + CSS only
        └─► horizonte.pages.dev         Horizonte: HTML + JS
               └─► view.eumetsat.int    images requested directly by the browser
```

## Decisions

| Decision | Why |
|---|---|
| **Astro + CSS** for the portfolio | Content-driven site. Astro generates plain HTML with no client JavaScript, validates project files against a schema, and has built-in i18n routing for adding Spanish. |
| **Vite + TypeScript + Leaflet** for Horizonte | A single interactive page. Leaflet (the only runtime library) gives zoom, pan, scale and coordinates in a latitude/longitude projection without a tile server. |
| **Horizonte loads images directly from EUMETView** | EUMETView is EUMETSAT's public map service, built for web clients (CORS enabled, cacheable responses). This avoids a backend, a scheduled job and deployment secrets. The browser limits itself to 3 parallel requests. |
| **Cloudflare Pages Git integration** | Builds and deploys on every push, previews for branches and pull requests, status shown in GitHub, HTTPS and custom domains, all on the Free plan. No GitHub Actions and no API tokens to manage. Works with private repositories via the Cloudflare GitHub app. |
| **Checks run in the Cloudflare build** (`npm run verify`) | A failing check stops the deployment. One place to look, no second CI system. |
| **One Pages project per repository** | Each app deploys independently and can get its own subdomain. Both are static, which is exactly what Pages serves. |
| **Local VS Code, no Docker or Codespaces** | Node.js and npm are all that is needed. Fewer moving parts to understand. |
| **No database, server, Kubernetes or GPU** | No concrete need. |
| **Copied CSS tokens, no shared library** | The projects share ~20 lines of CSS variables. A shared package would tie repositories together for no real gain. Revisit when several apps reuse real components. |
| **Python only when an analysis needs it** | Horizonte v1 only displays images. Future numerical analyses go in an `analysis/` folder with `pyproject.toml` and a local `.venv`. |
