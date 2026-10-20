---
title: CV Kit
summary: A free CV builder that runs entirely in your browser — write your CV once as structured data, pick a template and download a polished PDF. No accounts, no server, your data never leaves your computer.
status: live
featured: true
order: 20
areas: [software, architecture]
theme: moss
image:
  src: /images/projects/cv-kit.jpg
  alt: Screenshot of CV Kit, with the CV form on the left and a live preview of a fictional sample CV in the Modern template on the right.
  credit: Screenshot of the live app with its fictional sample CV, 20 October 2026.
technologies: [TypeScript, Vite, JSON Resume, Vitest, Cloudflare]
demoUrl: https://cv-kit.gabriel-olius.workers.dev
demoLabel: Open CV Kit
usage:
  - "A fictional sample CV loads the first time: edit it, start from empty, or import a JSON Resume file."
  - "Choose a template (Classic, Modern or Dark), an accent colour and English or Spanish headings."
  - "Download PDF opens the print dialog: choose Save as PDF and paper A4. Use Export JSON to keep your data."
repoUrl: https://github.com/6roli/cv-kit
repoIsPublic: true
needsReview: true
problem: >-
  Keeping a CV up to date means editing the same facts in several documents and formats, and most online CV
  builders ask you to upload personal data to their servers. I wanted to write my CV once, keep every version
  under control, and still get a polished PDF and web version — without handing my data to anyone.
data: >-
  The CV is a single file in the open JSON Resume format, so it can be imported, exported and kept under version
  control. A clearly fictional sample (Alex Example) shows every feature without real personal data.
method: >-
  A static TypeScript app: a form for every JSON Resume section plus a raw JSON tab, a validator that explains
  errors and keeps unknown fields, three print-ready A4 templates, and a "web version" that hides fields marked
  as private (for example the phone number). Everything is saved only in the browser's local storage; a strict
  Content-Security-Policy stops the app from contacting any other site.
results: >-
  A public, free app with three templates, Spanish and English headings and an optional photo compressed in the
  browser. 62 automated tests run before every deployment. My own CV and its versions now live in this format.
limitations: >-
  PDFs are produced with the browser's print dialog, so the result can vary slightly between browsers. Data is
  kept per browser: moving to another computer means exporting and importing the JSON file. There is no AI
  assistance yet — a small model running in the browser is a possible next step.
architecture: >-
  Static files on Cloudflare's free plan, built from GitHub on every push after the type check and tests pass.
  No backend, no database, no tracking; monthly cost €0.
---
