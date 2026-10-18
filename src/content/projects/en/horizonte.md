---
title: Horizonte
summary: A viewer for recent Meteosat image sequences over Spain and the western Mediterranean, with explicit observation times, sources and limitations.
status: live
featured: true
order: 1
areas: [earth-observation, software, architecture]
technologies: [TypeScript, Vite, Leaflet, OGC WMS, GitHub Actions, Cloudflare Pages]
image:
  src: /images/projects/horizonte.jpg
  alt: Meteosat GeoColour image of the Iberian Peninsula and the western Mediterranean at 12:00 UTC on 18 October 2026, with a band of cloud over eastern Spain.
  credit: Contains modified EUMETSAT Meteosat data 2026 (MTG-I1 FCI, GeoColour RGB, 18 Oct 2026 12:00 UTC).
demoUrl: https://horizonte.pages.dev
repoUrl: https://github.com/6roli/horizonte
repoIsPublic: false
needsReview: false
problem: >-
  Satellite imagery of the weather over Spain is easy to find but often lacks context: which satellite and
  product it is, when it was observed, how old it is and what the colours mean. Horizonte is the first step of
  a wider app about weather, extreme events, the ocean and the coast, starting with a small, honest scope.
data: >-
  Image products from EUMETSAT's public EUMETView Web Map Service (WMS) for Meteosat Third Generation
  (MTG-I1, FCI instrument, full disk every 10 minutes): the IR 10.5 µm channel and the GeoColour RGB composite.
  These visualisations are EUMETSAT "Core" products, free to reuse under CC BY 4.0 with attribution. They are
  coloured images for viewing, not the original numerical data needed for scientific analysis.
method: >-
  A scheduled GitHub Actions job asks the WMS which observation times exist, downloads a small crop of the latest
  frames for the region, validates them and writes a manifest with observation times and provenance. The site is
  rebuilt with those files and deployed as static content, so visitors never trigger requests to EUMETSAT or any
  computation. When live data cannot be fetched, the app shows a clearly labelled historical sample instead.
results: >-
  A public, static web app that plays the latest sequence of observations, states the source, product, observation
  time (UTC and local), last update and data age, and warns when data is stale or missing.
limitations: >-
  Images are reprojected, compressed visualisations, not calibrated measurements. Updates run hourly, so the newest
  frame can be up to about an hour and a half old. Horizonte does not issue warnings, forecasts or detections; for
  official warnings use AEMET and Meteoalarm.
architecture: >-
  Hourly GitHub Actions job → EUMETView WMS (GetCapabilities + GetMap crops) → JSON manifest and JPEG frames →
  Vite static build → Cloudflare Pages. The interface, the data access layer and the processing script are separate
  modules. No server, no database.
---
