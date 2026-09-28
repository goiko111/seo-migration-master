import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), "utf8");
const failures = [];
const pass = (message) => console.log(`PASS ${message}`);
const fail = (message) => failures.push(message);

const batches = [
  {
    migration: "supabase/migrations/20260713131825_add_wine_library_list_architecture_style_country_price.sql",
    group: "wine-library-list-architecture-style-country-price",
    entries: [
      ["es", "arquitectura-carta-vinos-estilo-pais-precio-restaurante", "/article/arquitectura-carta-vinos-estilo-pais-precio-restaurante", "2026-09-07T09:00:00+02:00"],
      ["en", "restaurant-wine-list-architecture-style-country-price_en", "/en/article/restaurant-wine-list-architecture-style-country-price", "2026-09-07T09:05:00+02:00"],
      ["it", "architettura-carta-vini-stile-paese-prezzo-ristorante_it", "/it/article/architettura-carta-vini-stile-paese-prezzo-ristorante", "2026-09-07T09:10:00+02:00"],
      ["fr", "architecture-carte-vins-style-pays-prix-restaurant_fr", "/fr/article/architecture-carte-vins-style-pays-prix-restaurant", "2026-09-07T09:15:00+02:00"],
      ["de", "weinkarten-architektur-stil-land-preis-restaurant_de", "/de/article/weinkarten-architektur-stil-land-preis-restaurant", "2026-09-07T09:20:00+02:00"],
      ["pt", "arquitetura-carta-vinhos-estilo-pais-preco-restaurante_pt", "/pt/article/arquitetura-carta-vinhos-estilo-pais-preco-restaurante", "2026-09-07T09:25:00+02:00"],
    ],
  },
  {
    migration: "supabase/migrations/20260713131823_add_learn_wine_guest_questions_service_scripts.sql",
    group: "learn-wine-guest-questions-service-scripts",
    entries: [
      ["es", "guiones-recomendacion-vino-sala", "/article/guiones-recomendacion-vino-sala", "2026-09-14T09:00:00+02:00"],
      ["en", "wine-recommendation-scripts-restaurant-floor_en", "/en/article/wine-recommendation-scripts-restaurant-floor", "2026-09-14T09:05:00+02:00"],
      ["it", "copioni-consigliare-vino-sala_it", "/it/article/copioni-consigliare-vino-sala", "2026-09-14T09:10:00+02:00"],
      ["fr", "scripts-recommandation-vin-salle_fr", "/fr/article/scripts-recommandation-vin-salle", "2026-09-14T09:15:00+02:00"],
      ["de", "weinempfehlung-service-skripte_de", "/de/article/weinempfehlung-service-skripte", "2026-09-14T09:20:00+02:00"],
      ["pt", "guioes-recomendacao-vinho-sala_pt", "/pt/article/guioes-recomendacao-vinho-sala", "2026-09-14T09:25:00+02:00"],
    ],
  },
  {
    migration: "supabase/migrations/20260713152451_add_blog_slow_stock_rotation_restaurant.sql",
    group: "slow-stock-pos-cloudrim-savia-rotation",
    entries: [
      ["es", "stock-dormido-bodega-rotacion-tpv-cloudrim-savia", "/article/stock-dormido-bodega-rotacion-tpv-cloudrim-savia", "2026-09-28T09:00:00+02:00"],
      ["en", "sleeping-cellar-stock-pos-cloudrim-savia-rotation_en", "/en/article/sleeping-cellar-stock-pos-cloudrim-savia-rotation", "2026-09-28T09:05:00+02:00"],
      ["it", "stock-dormiente-cantina-rotazione-tpv-cloudrim-savia_it", "/it/article/stock-dormiente-cantina-rotazione-tpv-cloudrim-savia", "2026-09-28T09:10:00+02:00"],
      ["fr", "stock-dormant-cave-rotation-tpv-cloudrim-savia_fr", "/fr/article/stock-dormant-cave-rotation-tpv-cloudrim-savia", "2026-09-28T09:15:00+02:00"],
      ["de", "schlafender-kellerbestand-rotation-pos-cloudrim-savia_de", "/de/article/schlafender-kellerbestand-rotation-pos-cloudrim-savia", "2026-09-28T09:20:00+02:00"],
      ["pt", "stock-adormecido-adega-rotacao-pos-cloudrim-savia_pt", "/pt/article/stock-adormecido-adega-rotacao-pos-cloudrim-savia", "2026-09-28T09:25:00+02:00"],
    ],
  },
];

const prerender = read("supabase/functions/prerender/index.ts");
const sitemap = read("supabase/functions/sitemap/index.ts");
const worker = read("cloudflare-worker-v3-hybrid.js");

function bodyForSlug(sql, slug) {
  const start = sql.indexOf(`$slug$${slug}$slug$`);
  if (start < 0) return null;
  const bodyStartMarker = sql.indexOf("$body$", start);
  if (bodyStartMarker < 0) return null;
  const bodyStart = bodyStartMarker + "$body$".length;
  const bodyEnd = sql.indexOf("$body$", bodyStart);
  return bodyEnd < 0 ? null : sql.slice(bodyStart, bodyEnd).trim();
}

for (const batch of batches) {
  const sql = read(batch.migration);
  const languageSet = new Set();

  for (const [lang, slug, publicPath, releaseAt] of batch.entries) {
    languageSet.add(lang);
    const body = bodyForSlug(sql, slug);
    if (!body) {
      fail(`${batch.migration}: missing body for ${slug}`);
      continue;
    }

    const words = body.match(/\p{L}+(?:['’-]\p{L}+)*/gu)?.length || 0;
    const h2Count = (body.match(/^##\s+/gm) || []).length;
    const linkCount = (body.match(/\[[^\]]+\]\(\/[^)]+\)/g) || []).length;
    if (words < 850) fail(`${slug}: only ${words} words (minimum 850)`);
    if (h2Count < 5) fail(`${slug}: only ${h2Count} H2 sections (minimum 5)`);
    if (linkCount < 5) fail(`${slug}: only ${linkCount} internal links (minimum 5)`);
    if (!/ai summary|summary for ai|resumen para ia|riassunto per ia|sintesi per ia|synthese pour ia|resume pour ia|resume pour l.?ia|ki-zusammenfassung|zusammenfassung fuer ki|resumo para ia/i.test(body.normalize("NFD").replace(/\p{Diacritic}/gu, ""))) {
      fail(`${slug}: missing localized AI summary`);
    }
    if (!sql.includes(`'${releaseAt}'`)) fail(`${slug}: migration release timestamp mismatch`);
    if (!sql.includes(`'${lang}'`)) fail(`${slug}: migration language mismatch`);
    if (!sql.includes(`'${batch.group}'`)) fail(`${slug}: article_group mismatch`);
    if (!prerender.includes(`'${slug}': '${releaseAt}'`)) fail(`${slug}: missing prerender article gate`);
    if (!prerender.includes(`'${publicPath}': '${releaseAt}'`)) fail(`${publicPath}: missing prerender link gate`);
    if (!sitemap.includes(`'${slug}': '${releaseAt}'`)) fail(`${slug}: missing sitemap gate`);
    if (!worker.includes(`'${publicPath}': '${releaseAt}'`)) fail(`${publicPath}: missing Worker gate`);
  }

  if ([...languageSet].sort().join(",") !== "de,en,es,fr,it,pt") {
    fail(`${batch.group}: language set is incomplete`);
  } else {
    pass(`${batch.group}: six localized rows and release maps aligned`);
  }
}

const blog = read("src/pages/Blog.tsx");
const articlePage = read("src/pages/ArticlePage.tsx");
const sanitizer = read("src/components/article/parseMarkdownSections.ts");
const sanitizerMigration = read("supabase/migrations/20260811153500_sanitize_article_internal_markers.sql");

if (/fallbackData|Fallback: if no articles in this language/.test(blog)) fail("Blog still contains a Spanish-language fallback");
else pass("Blog does not substitute Spanish rows on localized URLs");

if (/Fallback to Spanish base slug/.test(articlePage)) fail("ArticlePage still contains a Spanish-language fallback");
else pass("Article detail does not substitute Spanish content on localized URLs");

if (!sanitizer.includes("sanitizeArticleMarkdown") || !sanitizerMigration.includes("winerim-content-expansion")) {
  fail("Internal-marker sanitization is not present in both render and data layers");
} else {
  pass("Internal markers are sanitized in render and data layers");
}

if (!worker.includes("status: res.status") || !worker.includes("X-Prerender-Upstream-Status")) {
  fail("Worker does not preserve prerender response status");
} else {
  pass("Worker preserves prerender HTTP status and diagnostic header");
}

if (failures.length) {
  console.error(`\n${failures.length} release gate(s) failed:`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("\nWine Library release validation passed.");
