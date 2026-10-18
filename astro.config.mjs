// @ts-check
import { defineConfig } from 'astro/config';

// Public address, used for canonical links and social previews.
// Change it here when a custom domain is connected (or set SITE_URL to override).
const site = process.env.SITE_URL ?? 'https://gabriel-olius.pages.dev';

export default defineConfig({
  site,
  // Fully static output: no server, no functions, nothing that bills per request.
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  i18n: {
    // English first. To add Spanish: add 'es' here, add src/i18n/es.ts,
    // add pages under src/pages/es/ and content under src/content/projects/es/.
    locales: ['en'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
