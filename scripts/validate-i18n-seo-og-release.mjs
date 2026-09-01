import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const allowedChangedFiles = new Set([
  "cloudflare-worker-v3-hybrid.js",
  "edge-router/winerim-pages-router.js",
  "index.html",
  "package.json",
  "public/og/winerim-og-de.png",
  "public/og/winerim-og-en.png",
  "public/og/winerim-og-es.png",
  "public/og/winerim-og-fr.png",
  "public/og/winerim-og-it.png",
  "public/og/winerim-og-pt.png",
  "public/sitemap.xml",
  "scripts/generate-localized-og-images.py",
  "scripts/refresh-static-sitemap.mjs",
  "scripts/validate-i18n-seo-og-release.mjs",
  "src/App.tsx",
  "src/components/SEOHead.tsx",
  "src/i18n/types.ts",
  "src/pages/SimuladorCarta.tsx",
  "src/seo/config.ts",
  "src/test/seo-head-i18n.test.tsx",
  "src/test/simulator-i18n-seo-guardrails.test.ts",
  "supabase/functions/prerender/index.ts",
  "supabase/functions/sitemap/index.ts",
]);

const files = {
  app: "src/App.tsx",
  i18nTypes: "src/i18n/types.ts",
  simulatorPage: "src/pages/SimuladorCarta.tsx",
  seoHead: "src/components/SEOHead.tsx",
  seoConfig: "src/seo/config.ts",
  worker: "cloudflare-worker-v3-hybrid.js",
  router: "edge-router/winerim-pages-router.js",
  prerender: "supabase/functions/prerender/index.ts",
  sitemap: "supabase/functions/sitemap/index.ts",
  staticSitemap: "public/sitemap.xml",
  refreshSitemap: "scripts/refresh-static-sitemap.mjs",
  indexHtml: "index.html",
  packageJson: "package.json",
};

const localizedSimulatorRoutes = {
  es: "/simulador-carta",
  en: "/en/wine-list-simulator",
  it: "/it/simulatore-carta",
  fr: "/fr/simulateur-carte",
  de: "/de/weinkarten-simulator",
  pt: "/pt/simulador-carta",
};

const errors = [];
const warnings = [];

function runGit(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function assertContains(label, source, needle) {
  if (!source.includes(needle)) {
    errors.push(`${label}: missing ${JSON.stringify(needle)}`);
  }
}

function assertNotContains(label, source, needle) {
  if (source.includes(needle)) {
    errors.push(`${label}: unexpected ${JSON.stringify(needle)}`);
  }
}

const changedFiles = new Set([
  ...runGit(["diff", "--name-only", "origin/main"]),
  ...runGit(["ls-files", "--others", "--exclude-standard"]),
]);

for (const file of changedFiles) {
  if (!allowedChangedFiles.has(file)) {
    errors.push(`diff scope: unexpected changed file ${file}`);
  }
}

for (const required of allowedChangedFiles) {
  if (required.startsWith("public/og/") && !fs.existsSync(path.join(root, required))) {
    errors.push(`asset: missing ${required}`);
  }
}

const sources = Object.fromEntries(Object.entries(files).map(([key, file]) => [key, read(file)]));

for (const [lang, route] of Object.entries(localizedSimulatorRoutes)) {
  for (const [sourceName, source] of Object.entries({
    app: sources.app,
    i18nTypes: sources.i18nTypes,
    worker: sources.worker,
    router: sources.router,
    prerender: sources.prerender,
    sitemap: sources.sitemap,
    staticSitemap: sources.staticSitemap,
    refreshSitemap: sources.refreshSitemap,
  })) {
    assertContains(`${sourceName} ${lang}`, source, route);
  }

  const imagePath = path.join(root, "public/og", `winerim-og-${lang}.png`);
  const image = fs.readFileSync(imagePath);
  const isPng = image.length > 24
    && image[0] === 0x89
    && image[1] === 0x50
    && image[2] === 0x4e
    && image[3] === 0x47;
  const width = isPng ? image.readUInt32BE(16) : 0;
  const height = isPng ? image.readUInt32BE(20) : 0;
  if (!isPng || width !== 1200 || height !== 630) {
    errors.push(`asset: ${imagePath} is ${width}x${height}, expected 1200x630 PNG`);
  }
}

assertContains("app alias", sources.app, 'path="/en/simulador-carta" element={<Navigate to="/en/wine-list-simulator" replace />}');
assertContains("app alias", sources.app, 'path="/simulador" element={<Navigate to="/simulador-carta" replace />}');
assertContains("simulator hreflang", sources.simulatorPage, 'hreflang={allLangPaths("/simulador-carta")}');
assertContains("sitemap route", sources.sitemap, "{ esPath: '/simulador-carta', priority: '0.8', changefreq: 'monthly', multilang: true }");
assertContains("prerender source page", sources.prerender, "'/simulador-carta': {");
assertContains("prerender en copy", sources.prerender, "Wine List Simulator for Restaurants | Winerim");
assertContains("index shell", sources.indexHtml, "var homeAlternates");
assertContains("index shell", sources.indexHtml, "var simulatorAlternates");
assertContains("index x-default", sources.indexHtml, '"x-default": "/simulador-carta"');
assertContains("index jsonld", sources.indexHtml, 'script.id = "winerim-initial-jsonld"');
assertContains("seo config", sources.seoConfig, 'DEFAULT_OG_IMAGE = `${CANONICAL_DOMAIN}/og/winerim-og-es.png`');

for (const [sourceName, source] of Object.entries({
  seoConfig: sources.seoConfig,
  worker: sources.worker,
  router: sources.router,
  prerender: sources.prerender,
  indexHtml: sources.indexHtml,
})) {
  assertContains(sourceName, source, "en_US");
  assertNotContains(sourceName, source, "en_GB");
}

for (const [sourceName, source] of Object.entries({
  seoHead: sources.seoHead,
  worker: sources.worker,
  router: sources.router,
  prerender: sources.prerender,
  indexHtml: sources.indexHtml,
})) {
  assertContains(sourceName, source, "og:image:alt");
  assertContains(sourceName, source, "twitter:image:alt");
}
assertContains("seo config", sources.seoConfig, "LOCALIZED_OG_IMAGE_ALT");

assertContains("worker root redirect", sources.worker, "!url.search");
assertContains("worker campaign guard", sources.worker, "!isCampaignHost(hostname)");
assertContains("router root redirect", sources.router, "!url.search");
assertContains("worker oai", sources.worker, "oai-searchbot");
assertContains("worker prerender", sources.worker, "X-Prerendered");
assertNotContains("package", sources.packageJson, "@lovable.dev/vite-plugin-dev-server-bridge");
assertNotContains("package", sources.packageJson, "@lovable.dev/vite-plugin-hmr-gate");

for (const [sourceName, source] of Object.entries(sources)) {
  assertNotContains(sourceName, source, "TELEGRAM_BOT_TOKEN");
  assertNotContains(sourceName, source, "@secret");
  assertNotContains(sourceName, source, "winerim-content-expansion");
}

if (changedFiles.size === 0) {
  warnings.push("No changed files detected against origin/main; run from the release branch/worktree.");
}

const summary = {
  changedFiles: [...changedFiles].sort(),
  localizedSimulatorRoutes,
  localizedOgImages: Object.keys(localizedSimulatorRoutes).length,
  warnings,
};

if (errors.length > 0) {
  console.error(JSON.stringify({ ok: false, ...summary, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, ...summary }, null, 2));
