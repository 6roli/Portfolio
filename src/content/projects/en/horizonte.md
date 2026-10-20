---
title: Horizonte
summary: Earth observation, weather and satellites over Spain and the western Mediterranean — one project made of small modules that share data and design, from a Meteosat viewer to an hourly weather data warehouse.
status: live
featured: true
order: 1
areas: [earth-observation, architecture, software, ml]
theme: sky
technologies: [TypeScript, Python, Leaflet, DuckDB, OGC WMS, GitHub Actions, Cloudflare Workers, Hugging Face Storage]
image:
  src: /images/projects/horizonte-cover.jpg
  alt: Screenshot of the Horizonte hub, with its two modules — a Meteosat satellite image of Spain and a live map of forecast temperatures in the 52 provincial capitals.
  credit: Screenshot of the Horizonte app. Satellite image contains modified EUMETSAT Meteosat data 2026; forecasts by Open-Meteo (CC BY 4.0).
demoUrl: https://horizonte.gabriel-olius.workers.dev
demoLabel: Open Horizonte
repoUrl: https://github.com/6roli/Horizonte
repoIsPublic: false
needsReview: true
problem: >-
  Weather and Earth-observation data for Spain is public but scattered: satellite images without context, forecasts
  that are overwritten every hour, observations in another format. Horizonte brings them together as a set of small
  tools that each answer one question well, and that can be combined later — for example to compare what a satellite
  saw, what was forecast and what a station measured.
data: >-
  EUMETSAT Meteosat imagery (EUMETView WMS, CC BY 4.0), Open-Meteo forecasts (CC BY 4.0) and AEMET OpenData
  observations. Every module states its sources, licences, times and limitations.
method: >-
  Each module lives in its own repository with its own tests and deployment, so one can change or fail without
  breaking the others. They share a visual identity and exchange data through simple public files (Parquet and a
  small JSON snapshot), which keeps them in sync without a shared server.
results: >-
  Two modules are running: a viewer for the latest six hours of Meteosat images, and a weather data warehouse that
  has collected forecasts and observations for the 52 provincial capitals every hour since 18 October 2026.
limitations: >-
  The modules are young and independent; combined views (for example satellite images next to forecast errors) are
  the next step, not a feature yet. Horizonte does not issue warnings: for official warnings use AEMET and Meteoalarm.
architecture: >-
  Static web front ends on Cloudflare, data pipelines on GitHub Actions, and public files in a Hugging Face Storage
  Bucket. Everything runs on free plans, with no server to maintain.
---
