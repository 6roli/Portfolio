#!/usr/bin/env node
/**
 * Copies the CV selected for the website into the portfolio, minus anything private.
 *
 *   npm run sync-cv                      reads ../cv/variants/en-web.resume.json
 *   npm run sync-cv -- path/to/file.json  reads another JSON Resume file
 *
 * Steps: remove every field listed in meta.cvkit.hideOnWeb (same rule as CV Kit's
 * publicView: "phone" means basics.phone, "work.client" removes `client` from every
 * work entry), drop the phone and all `meta`, then refuse to write if any text from
 * meta.cv.neverPublish — or anything that looks like a phone number — is still there.
 * The result is src/data/resume.json, which the Home, CV, About and Contact pages read.
 * Commit it and push: the site redeploys with the new CV.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve(process.argv[2] ?? '../cv/variants/en-web.resume.json');
const target = path.resolve('src/data/resume.json');
const BASICS = new Set(['name', 'label', 'image', 'email', 'phone', 'url', 'summary', 'location', 'profiles']);

function remove(node, parts) {
  if (!parts.length || node === null || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach((item) => remove(item, parts));
  const [head, ...rest] = parts;
  if (!(head in node)) return;
  if (rest.length === 0) delete node[head];
  else remove(node[head], rest);
}

const fail = (message) => {
  console.error(`sync-cv: ${message}`);
  process.exit(1);
};

let resume;
try {
  resume = JSON.parse(await readFile(source, 'utf8'));
} catch (error) {
  fail(`cannot read ${source} (${error.message})`);
}
if (!resume?.basics?.name) fail('the file has no basics.name — is it a JSON Resume file?');

const neverPublish = resume.meta?.cv?.neverPublish ?? [];
for (const field of resume.meta?.cvkit?.hideOnWeb ?? []) {
  const parts = String(field).split('.').filter(Boolean);
  remove(resume, BASICS.has(parts[0]) ? ['basics', ...parts] : parts);
}
delete resume.basics.phone;
delete resume.meta;
delete resume.$schema;

const text = JSON.stringify(resume, null, 2);
const leaks = neverPublish.filter((secret) => secret && text.includes(secret));
if (leaks.length) fail(`refusing to publish: found ${leaks.length} private value(s) listed in meta.cv.neverPublish`);
if (/\+?\d[\d\s]{8,}\d/.test(text.replace(/"(start|end|release)Date": "[^"]*"/g, ''))) {
  fail('refusing to publish: something that looks like a phone number is still in the file');
}

await mkdir(path.dirname(target), { recursive: true });
await writeFile(target, `${text}\n`, 'utf8');
console.log(`sync-cv: wrote ${path.relative(process.cwd(), target)} from ${source}`);
