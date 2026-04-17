#!/usr/bin/env node
// Build-time fetcher: enriches certifications.coursera entries from data.js
// with live metadata (title, image, issuer) via Coursera's public catalog API
// and writes the result to js/certs-data.json.
//
// Runs server-side (no CORS), so the browser only ever reads a same-origin
// JSON file. Re-run whenever you add a cert or want fresh metadata:
//   npm run fetch-certs

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA_PATH = resolve(ROOT, 'js/data.js');
const OUT_PATH = resolve(ROOT, 'js/certs-data.json');

const API = 'https://api.coursera.org/api';
const COURSE_FIELDS = 'name,slug,photoUrl,description,partnerIds,primaryLanguages,workload,specializations';
const PARTNER_FIELDS = 'name,squareLogo,rectangularLogo,shortName';

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchCourse(slug) {
  const url = `${API}/courses.v1?q=slug&slug=${encodeURIComponent(slug)}&fields=${COURSE_FIELDS}`;
  const data = await fetchJson(url);
  const course = data?.elements?.[0];
  if (!course) throw new Error(`No course found for slug: ${slug}`);
  return course;
}

async function fetchPartner(partnerId) {
  const url = `${API}/partners.v1/${encodeURIComponent(partnerId)}?fields=${PARTNER_FIELDS}`;
  const data = await fetchJson(url);
  return data?.elements?.[0] || null;
}

async function enrich(slug) {
  const course = await fetchCourse(slug);
  const partnerId = course.partnerIds?.[0];
  const partner = partnerId ? await fetchPartner(partnerId).catch(() => null) : null;

  return {
    slug: course.slug,
    title: course.name,
    description: course.description || '',
    image: course.photoUrl || null,
    issuer: partner?.name || 'Coursera',
    issuerLogo: partner?.squareLogo || partner?.rectangularLogo || null,
    courseUrl: `https://www.coursera.org/learn/${course.slug}`,
    fetchedAt: new Date().toISOString(),
  };
}

async function main() {
  const { certifications } = await import(pathToFileURL(DATA_PATH).href);
  const entries = certifications?.coursera || [];

  if (!entries.length) {
    console.log('No Coursera certs in data.js — writing empty manifest.');
    await writeFile(OUT_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), courses: {} }, null, 2));
    return;
  }

  console.log(`Fetching metadata for ${entries.length} cert(s)...`);
  const courses = {};
  let failures = 0;

  for (const entry of entries) {
    const { slug } = entry;
    try {
      process.stdout.write(`  • ${slug} ... `);
      courses[slug] = await enrich(slug);
      console.log('OK');
    } catch (err) {
      failures++;
      console.log(`FAIL (${err.message})`);
    }
  }

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(
    OUT_PATH,
    JSON.stringify({ generatedAt: new Date().toISOString(), courses }, null, 2) + '\n',
  );

  console.log(`\nWrote ${OUT_PATH}`);
  console.log(`${Object.keys(courses).length} succeeded, ${failures} failed.`);
  if (failures > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
