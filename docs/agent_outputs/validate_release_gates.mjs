import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const files = {
  prerender: path.join(root, "supabase/functions/prerender/index.ts"),
  sitemap: path.join(root, "supabase/functions/sitemap/index.ts"),
  worker: path.join(root, "cloudflare-worker-v3-hybrid.js"),
};

function read(file) {
  return fs.readFileSync(file, "utf8");
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

  if (Object.keys(entries).length === 0) {
    throw new Error(`No string entries parsed from ${name}`);
  }

  return entries;
}

function expectedDbSlugFromPath(articlePath) {
  const localized = articlePath.match(/^\/(en|it|fr|de|pt)\/article\/([^/]+)$/);
  if (localized) return `${localized[2]}_${localized[1]}`;

  const spanish = articlePath.match(/^\/article\/([^/]+)$/);
  if (spanish) return spanish[1];

  return null;
}

function compareMaps(label, leftName, left, rightName, right, errors) {
  for (const [key, value] of Object.entries(left)) {
    if (!(key in right)) {
      errors.push(`${label}: ${key} exists in ${leftName} but not in ${rightName}`);
    } else if (right[key] !== value) {
      errors.push(`${label}: ${key} differs: ${leftName}=${value}, ${rightName}=${right[key]}`);
    }
  }

  for (const key of Object.keys(right)) {
    if (!(key in left)) {
      errors.push(`${label}: ${key} exists in ${rightName} but not in ${leftName}`);
    }
  }
}

const prerender = read(files.prerender);
const sitemap = read(files.sitemap);
const worker = read(files.worker);

const prerenderLinks = parseStringMap(prerender, "LINK_RELEASES");
const prerenderArticles = parseStringMap(prerender, "ARTICLE_RELEASES");
const sitemapArticles = parseStringMap(sitemap, "ARTICLE_RELEASES");
const workerLinks = parseStringMap(worker, "WORKER_LINK_RELEASES");

const errors = [];
const warnings = [];

compareMaps("article releases", "prerender", prerenderArticles, "sitemap", sitemapArticles, errors);
compareMaps("link releases", "prerender", prerenderLinks, "worker", workerLinks, errors);

for (const [articlePath, releaseAt] of Object.entries(prerenderLinks)) {
  const dbSlug = expectedDbSlugFromPath(articlePath);
  if (!dbSlug) {
    warnings.push(`Non-article release path is not checked against ARTICLE_RELEASES: ${articlePath}`);
    continue;
  }

  if (!(dbSlug in prerenderArticles)) {
    errors.push(`Missing ARTICLE_RELEASES entry for ${articlePath}; expected db slug ${dbSlug}`);
  } else if (prerenderArticles[dbSlug] !== releaseAt) {
    errors.push(
      `Date mismatch for ${articlePath}; LINK_RELEASES=${releaseAt}, ARTICLE_RELEASES[${dbSlug}]=${prerenderArticles[dbSlug]}`,
    );
  }
}

const releaseDateRe = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\+02:00$/;
for (const [sourceName, map] of [
  ["prerender LINK_RELEASES", prerenderLinks],
  ["prerender ARTICLE_RELEASES", prerenderArticles],
  ["sitemap ARTICLE_RELEASES", sitemapArticles],
  ["worker WORKER_LINK_RELEASES", workerLinks],
]) {
  for (const [key, value] of Object.entries(map)) {
    if (!releaseDateRe.test(value)) {
      errors.push(`${sourceName}: ${key} has non-standard release timestamp ${value}`);
    }
  }
}

const summary = {
  prerenderLinkReleases: Object.keys(prerenderLinks).length,
  prerenderArticleReleases: Object.keys(prerenderArticles).length,
  sitemapArticleReleases: Object.keys(sitemapArticles).length,
  workerLinkReleases: Object.keys(workerLinks).length,
  warnings,
};

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, ...summary, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, ...summary }, null, 2));
