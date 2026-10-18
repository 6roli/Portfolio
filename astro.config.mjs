// @ts-check
import { defineConfig } from 'astro/config';

// The public URL is injected at build time so the same code works on the
// provider address (*.pages.dev) today and on a custom domain later.
// Set SITE_URL in the deployment workflow; the fallback is only for local builds.
const site = process.env.SITE_URL ?? 'http://localhost:4321';

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
