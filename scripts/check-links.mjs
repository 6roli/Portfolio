#!/usr/bin/env node
/**
 * Checks that every internal link and asset referenced by the built site exists.
 *
 * Usage: node scripts/check-links.mjs <dist-dir> [--external]
 *   --external  also checks external http(s) links with HEAD/GET requests
 *               (off by default: third-party outages should not break CI).
 *
 * No dependencies: a regular expression is enough for the HTML Astro generates.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve(process.argv[2] ?? 'dist');
const checkExternal = process.argv.includes('--external');

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listHtmlFiles(fullPath);
      return entry.name.endsWith('.html') ? [fullPath] : [];
    }),
  );
  return files.flat();
}

function extractUrls(html) {
  const urls = [];
  const pattern = /\s(?:href|src)="([^"]+)"/g;
  for (const match of html.matchAll(pattern)) urls.push(match[1]);
  return urls;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

/** Maps an internal URL path to the file that should serve it. */
async function internalTargetExists(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const target = path.join(distDir, clean);
  if (clean.endsWith('/')) return exists(path.join(target, 'index.html'));
  return (await exists(target)) || (await exists(path.join(target, 'index.html'))) || exists(`${target}.html`);
}

async function externalTargetOk(url) {
  try {
    let response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, { method: 'GET', redirect: 'follow' });
    }
    return response.ok;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(distDir))) {
    console.error(`Build directory not found: ${distDir}. Run "npm run build" first.`);
    process.exit(2);
  }

  const htmlFiles = await listHtmlFiles(distDir);
  const problems = [];
  const externalUrls = new Set();
  let checked = 0;

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const url of extractUrls(html)) {
      if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#') || url.startsWith('data:')) continue;
      if (/^https?:\/\//.test(url)) {
        externalUrls.add(url);
        continue;
      }
      checked += 1;
      if (!(await internalTargetExists(url))) {
        problems.push(`${path.relative(distDir, file)} → ${url}`);
      }
    }
  }

  if (checkExternal) {
    for (const url of externalUrls) {
      checked += 1;
      if (!(await externalTargetOk(url))) problems.push(`external → ${url}`);
    }
  }

  console.log(`Checked ${checked} links in ${htmlFiles.length} pages.`);
  if (!checkExternal) console.log(`Skipped ${externalUrls.size} external links (use --external).`);
  if (problems.length > 0) {
    console.error(`Broken links (${problems.length}):\n  ${problems.join('\n  ')}`);
    process.exit(1);
  }
}

await main();
