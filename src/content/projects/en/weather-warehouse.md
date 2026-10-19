---
title: Weather data warehouse
summary: An hourly data warehouse that keeps every weather forecast for Spain's 52 provincial capitals next to what was actually observed — the dataset needed to measure forecast accuracy and train prediction models.
status: live
featured: true
order: 5
areas: [architecture, software, ml]
theme: moss
technologies: [Python, DuckDB, SQL, Parquet, GitHub Actions, Hugging Face Storage, Cloudflare Workers, pytest]
liveSnapshot: https://huggingface.co/buckets/groli/weather-warehouse/resolve/gold/web/snapshot.json
demoUrl: https://huggingface.co/buckets/groli/weather-warehouse
demoLabel: Browse the data
repoUrl: https://github.com/6roli/weather-warehouse
repoIsPublic: true
needsReview: true
problem: >-
  Weather forecasts are published every hour and then replaced: once a new forecast appears, the old one is gone.
  Without keeping them there is no way to measure how accurate forecasts were at each lead time, or to train models
  that improve on them. The warehouse collects, from day one, every forecast together with what actually happened.
data: >-
  Open-Meteo forecasts (72 hours ahead, 10 variables) for the 52 provincial capitals, and AEMET OpenData
  observations from about 850 stations, downloaded every hour. Each capital is linked to the nearest AEMET station
  within 25 km. Open-Meteo data is CC BY 4.0; AEMET data is reused citing AEMET as the source.
method: >-
  A medallion architecture on DuckDB. Bronze keeps the raw responses unmodified; silver cleans, types,
  deduplicates and harmonises units into one Parquet file per day; gold combines them into tables for apps and
  machine learning — the latest forecast, every forecast next to its observation with the error per lead time,
  training features and daily summaries. Each table is one SQL file, and every hourly run rebuilds today and
  yesterday, so re-running an hour gives the same result.
results: >-
  Running since 18 October 2026 and published as open files. The first full day already gives a measured
  accuracy: across the capitals, forecasts 1–6 hours ahead missed the observed temperature by about 1 °C on
  average (mean absolute error 0.98 °C on 18 October). The table above is read live from the latest run.
limitations: >-
  The dataset is days old, not years: longer lead times and seasonal effects cannot be evaluated yet. The forecast
  time is the download hour, not the model run time. A single station may not represent a whole city. On the first
  day GitHub's scheduler skipped most hours, so forecasts from those hours are missing (observations were recovered,
  since each AEMET download covers 24 hours); a Cloudflare Cron Trigger is being added to start runs on time.
architecture: >-
  A GitHub Actions workflow runs every hour, started on time by a Cloudflare Cron Trigger with GitHub's own
  schedule as a fallback. DuckDB SQL builds bronze, silver and gold, and the files go to a public Hugging Face
  Storage Bucket, where anyone can read them over HTTPS. This page reads a small JSON snapshot of the gold layer
  directly in the browser. Total cost: €0.
architectureImage:
  src: /images/projects/weather-warehouse-architecture.svg
  alt: Block diagram. A Cloudflare Cron Trigger, with GitHub's schedule as a fallback, starts an hourly GitHub Actions workflow. It downloads Open-Meteo forecasts and AEMET observations into a bronze layer of raw files, then builds a silver layer of clean daily tables and a gold layer of ready-to-use tables and a web snapshot with DuckDB SQL. Everything is uploaded to a public Hugging Face bucket, read by this portfolio and future machine-learning apps.
---
