---
title: Horizonte
summary: A viewer for recent Meteosat image sequences over Spain and the western Mediterranean, with explicit observation times, sources and limitations.
status: live
featured: true
order: 1
areas: [earth-observation, software, architecture]
technologies: [TypeScript, Vite, Leaflet, OGC WMS, Vitest, Cloudflare Pages]
image:
  src: /images/projects/horizonte.jpg
  alt: Meteosat GeoColour image of the Iberian Peninsula and the western Mediterranean at 12:00 UTC on 18 October 2026, with a band of cloud over eastern Spain.
  credit: Contains modified EUMETSAT Meteosat data 2026 (MTG-I1 FCI, GeoColour RGB, 18 Oct 2026 12:00 UTC).
demoUrl: https://horizonte.pages.dev
repoUrl: https://github.com/6roli/Horizonte
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
  When the page opens, the browser asks EUMETView which observation times exist for each layer, picks the last
  six hours of times common to both layers and loads the corresponding crops directly from EUMETSAT, a few at a
  time. Every frame shows its observation time in UTC and Spanish time, and the data age. If EUMETView cannot be
  reached, the app shows a small, clearly labelled historical sample bundled with it.
results: >-
  A public, static web app that plays the latest six hours of observations, states the source, product, observation
  time (UTC and local) and data age, and warns when data is stale, missing or a historical sample.
limitations: >-
  Images are reprojected, compressed visualisations, not calibrated measurements. EUMETView publishes each image
  some 15–30 minutes after the scan, so nothing is real time. Horizonte does not issue warnings, forecasts or
  detections; for official warnings use AEMET and Meteoalarm.
architecture: >-
  Static site (Vite + TypeScript + Leaflet) on Cloudflare Pages, built from its own GitHub repository on every
  push. The browser reads EUMETView's WMS time dimension and loads GetMap images directly. Interface, data access
  and validation are separate modules with unit tests. No server, no database, no scheduled jobs.
---
