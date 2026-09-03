import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const migrationPath = path.join(
  root,
  "supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql",
);

const files = {
  migration: migrationPath,
  prerender: path.join(root, "supabase/functions/prerender/index.ts"),
  sitemap: path.join(root, "supabase/functions/sitemap/index.ts"),
  worker: path.join(root, "cloudflare-worker-v3-hybrid.js"),
  llms: path.join(root, "public/llms.txt"),
  llmsFull: path.join(root, "public/llms-full.txt"),
};

const expectedGroup = "wine-library-list-architecture-style-country-price";
const expectedDates = {
  es: "2026-09-07T09:00:00+02:00",
  en: "2026-09-07T09:05:00+02:00",
  it: "2026-09-07T09:10:00+02:00",
  fr: "2026-09-07T09:15:00+02:00",
  de: "2026-09-07T09:20:00+02:00",
  pt: "2026-09-07T09:25:00+02:00",
};
const expectedLangs = Object.keys(expectedDates);
const bannedNeedles = ["winerim-content-expansion", "TELEGRAM_BOT_TOKEN", "@secret", "<!--", "-->"];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function parseRows(sql) {
  const tupleRe =
    /\(\s*\$slug\$([\s\S]*?)\$slug\$,\s*\$title\$([\s\S]*?)\$title\$,\s*\$excerpt\$([\s\S]*?)\$excerpt\$,\s*\$body\$([\s\S]*?)\$body\$,\s*\$image\$([\s\S]*?)\$image\$,\s*\$category\$([\s\S]*?)\$category\$,\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*\$json\$([\s\S]*?)\$json\$::jsonb\s*\)/g;
  const rows = [];
  let match;

  while ((match = tupleRe.exec(sql))) {
    const [, slug, title, excerpt, body, image, category, publishedAt, lang, articleGroup, rawLinks] = match;
    rows.push({
      slug,
      title,
      excerpt,
      body,
      image,
      category,
      publishedAt,
      lang,
      articleGroup,
      links: JSON.parse(rawLinks),
    });
  }

  return rows;
}

function extractObject(source, name) {
  const start = source.indexOf(`const ${name}`);
  if (start === -1) throw new Error(`Missing const ${name}`);

  const open = source.indexOf("{", start);
  if (open === -1) throw new Error(`Missing opening brace for ${name}`);

  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    const char = source[i];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(open + 1, i);
  }

  throw new Error(`Missing closing brace for ${name}`);
}

function parseStringMap(source, name) {
  const body = extractObject(source, name);
  const entries = {};
  const entryRe = /(['"])(.*?)\1\s*:\s*(['"])(.*?)\3\s*,?/g;
  let match;

  while ((match = entryRe.exec(body))) {
    entries[match[2]] = match[4];
  }

  return entries;
}

function baseSlug(row) {
  if (row.lang === "es") return row.slug;
  return row.slug.replace(new RegExp(`_${row.lang}$`), "");
}

function routeFor(row) {
  const prefix = row.lang === "es" ? "" : `/${row.lang}`;
  return `${prefix}/article/${baseSlug(row)}`;
}

function visibleWordCount(markdown) {
  const text = markdown
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#*_`>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text ? text.split(/\s+/).length : 0;
}

function assert(condition, message, errors) {
  if (!condition) errors.push(message);
}

const sources = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, read(file)]));
const rows = parseRows(sources.migration);
const errors = [];
const warnings = [];

assert(rows.length === expectedLangs.length, `Expected ${expectedLangs.length} rows, found ${rows.length}`, errors);

const langs = rows.map((row) => row.lang).sort();
assert(JSON.stringify(langs) === JSON.stringify([...expectedLangs].sort()), `Unexpected languages: ${langs.join(", ")}`, errors);

const prerenderLinks = parseStringMap(sources.prerender, "LINK_RELEASES");
const prerenderArticles = parseStringMap(sources.prerender, "ARTICLE_RELEASES");
const sitemapArticles = parseStringMap(sources.sitemap, "ARTICLE_RELEASES");
const workerLinks = parseStringMap(sources.worker, "WORKER_LINK_RELEASES");

for (const row of rows) {
  const label = `${row.lang}:${row.slug}`;
  const route = routeFor(row);
  const words = visibleWordCount(row.body);
  const allText = `${row.title}\n${row.excerpt}\n${row.body}`;

  assert(row.articleGroup === expectedGroup, `${label} has unexpected article_group ${row.articleGroup}`, errors);
  assert(row.publishedAt === expectedDates[row.lang], `${label} has unexpected published_at ${row.publishedAt}`, errors);
  assert(words >= 900, `${label} has only ${words} visible words`, errors);
  assert(row.links.length === 9, `${label} should have 9 related links, found ${row.links.length}`, errors);
  assert(!row.title.includes("Winerim"), `${label} title includes Winerim and may duplicate SEOHead suffix`, errors);
  assert(row.image.startsWith("https://winerim.wine/"), `${label} image_url is not on winerim.wine`, errors);

  for (const needle of bannedNeedles) {
    assert(!allText.includes(needle), `${label} contains banned marker ${needle}`, errors);
  }

  if (row.lang === "es") {
    assert(!/_es$/.test(row.slug), `${label} should not use _es suffix`, errors);
  } else {
    assert(row.slug.endsWith(`_${row.lang}`), `${label} should keep _${row.lang} DB suffix`, errors);
  }

  for (const link of row.links) {
    assert(typeof link.to === "string" && link.to.startsWith("/"), `${label} has non-internal link ${JSON.stringify(link)}`, errors);

    if (row.lang !== "es") {
      assert(link.to.startsWith(`/${row.lang}/`), `${label} has cross-locale link ${link.to}`, errors);
    } else {
      assert(!/^\/(en|it|fr|de|pt)\//.test(link.to), `${label} has localized link inside ES row ${link.to}`, errors);
    }
  }

  assert(prerenderLinks[route] === row.publishedAt, `${label} missing/mismatched prerender LINK_RELEASES for ${route}`, errors);
  assert(workerLinks[route] === row.publishedAt, `${label} missing/mismatched worker WORKER_LINK_RELEASES for ${route}`, errors);
  assert(prerenderArticles[row.slug] === row.publishedAt, `${label} missing/mismatched prerender ARTICLE_RELEASES`, errors);
  assert(sitemapArticles[row.slug] === row.publishedAt, `${label} missing/mismatched sitemap ARTICLE_RELEASES`, errors);

  for (const [llmName, llmSource] of [
    ["llms.txt", sources.llms],
    ["llms-full.txt", sources.llmsFull],
  ]) {
    if (llmSource.includes(route) || llmSource.includes(baseSlug(row))) {
      warnings.push(`${llmName} already mentions pre-release route/slug for ${label}`);
    }
  }
}

const summary = {
  rows: rows.length,
  languages: rows.map((row) => row.lang),
  minWords: Math.min(...rows.map((row) => visibleWordCount(row.body))),
  maxWords: Math.max(...rows.map((row) => visibleWordCount(row.body))),
  linkCountPerRow: [...new Set(rows.map((row) => row.links.length))],
  releaseRoutesChecked: rows.length,
  warnings,
};

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, ...summary, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, ...summary }, null, 2));
