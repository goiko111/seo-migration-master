import { readFileSync } from "node:fs";
import { priorityGrapeSlugs } from "@/data/wineLibraryEditorial";
import { describe, expect, it } from "vitest";

describe("wine library SEO surface", () => {
  it("publishes dynamic library entities in the sitemap function", () => {
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");

    expect(sitemap).toContain("const WINE_LIBRARY_DYNAMIC_ROUTES");
    expect(sitemap).toContain("/biblioteca-vino/uvas/tempranillo");
    expect(sitemap).toContain("/biblioteca-vino/regiones/espana/rioja");
    expect(sitemap).toContain("/biblioteca-vino/regiones/francia/sancerre");
    expect(sitemap).toContain("/biblioteca-vino/regiones/argentina/mendoza");
    expect(sitemap).toContain("/biblioteca-vino/regiones/italia/chianti-classico");
    expect(sitemap).toContain("/biblioteca-vino/regiones/italia/brunello-di-montalcino");
    expect(sitemap).toContain("/biblioteca-vino/regiones/italia/soave");
    expect(sitemap).toContain("/biblioteca-vino/regiones/italia/etna");
    expect(sitemap).toContain("/biblioteca-vino/estilos/tinto-crianza");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/carnes-rojas");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/ostras");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/solomillo-de-ternera");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/jamon-iberico");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/thai-curry");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/tarta-de-queso");
    expect(sitemap).toContain("function localizedPath");
    expect(sitemap).toContain("WINE_LIBRARY_LEGACY_SHORTCUT_ES_PATHS");
    expect(sitemap).toContain("if (WINE_LIBRARY_LEGACY_SHORTCUT_ES_PATHS.has(route.esPath)) continue");
  });

  it("has a generic bot prerenderer for localized wine-library routes", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("function renderWineLibraryPage");
    expect(prerender).toContain("function resolveWineLibraryPath");
    expect(prerender).toContain("/de/weinbibliothek");
    expect(prerender).toContain("/pt/biblioteca-vinho");
    expect(prerender).toContain("wineLibraryHreflang(esPath)");
  });

  it("adds priority grape editorial content to prerendered bot pages", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("const WINE_LIBRARY_PRIORITY_GRAPES");
    expect(prerender).toContain("tempranillo");
    expect(prerender).toContain("chardonnay");
    expect(prerender).toContain("riesling");
    expect(prerender).toContain("syrah");
    expect(prerender).toContain("nebbiolo");
    expect(prerender).toContain("chenin-blanc");
    expect(prerender).toContain("xarello");
    expect(prerender).toContain("touriga-nacional");
    expect(prerender).toContain("WINE_LIBRARY_EXPANDED_GRAPES");
    expect(prerender).toContain("mencia");
    expect(prerender).toContain("gruner-veltliner");
    expect(prerender).toContain("aglianico");
    expect(prerender).toContain("graciano");
    expect(prerender).toContain("muscadet");
    expect(prerender).toContain("semillon");
    expect(prerender).toContain("petit-verdot");
    expect(prerender).toContain("corvina");
    expect(prerender).toContain("Rol en carta");
    expect(prerender).toContain("Ruolo in carta");
    expect(prerender).toContain("Role en carte");
    expect(prerender).toContain("Papel na carta");
  });

  it("adds priority region editorial content to prerendered bot pages", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("const WINE_LIBRARY_PRIORITY_REGIONS");
    expect(prerender).toContain("ribera-del-duero");
    expect(prerender).toContain("rias-baixas");
    expect(prerender).toContain("bourgogne");
    expect(prerender).toContain("bordeaux");
    expect(prerender).toContain("vinho-verde");
    expect(prerender).toContain("WINE_LIBRARY_EXPANDED_REGIONS");
    expect(prerender).toContain("toscana");
    expect(prerender).toContain("sancerre");
    expect(prerender).toContain("barolo");
    expect(prerender).toContain("ribeira-sacra");
    expect(prerender).toContain("chablis");
    expect(prerender).toContain("santorini");
    expect(prerender).toContain("chianti-classico");
    expect(prerender).toContain("brunello-di-montalcino");
    expect(prerender).toContain("etna");
    expect(prerender).toContain("Rolle auf der Weinkarte");
    expect(prerender).toContain("Papel na carta");
  });

  it("adds priority style editorial content to prerendered bot pages", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("const WINE_LIBRARY_PRIORITY_STYLES");
    expect(prerender).toContain("tinto-crianza");
    expect(prerender).toContain("tinto-reserva");
    expect(prerender).toContain("blanco-crianza-lias");
    expect(prerender).toContain("rosado-cuerpo");
    expect(prerender).toContain("WINE_LIBRARY_EXPANDED_STYLES");
    expect(prerender).toContain("tinto-joven");
    expect(prerender).toContain("fino-manzanilla");
    expect(prerender).toContain("orange-maceracion-corta");
    expect(prerender).toContain("prosecco");
    expect(prerender).toContain("franciacorta");
    expect(prerender).toContain("amontillado");
    expect(prerender).toContain("oporto-tawny");
    expect(prerender).toContain("blanco-fermentado-barrica");
    expect(prerender).toContain("Schaumwein ist nicht nur Feier");
    expect(prerender).toContain("Papel na carta");
  });

  it("adds priority pairing editorial content to prerendered bot pages", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("const WINE_LIBRARY_PRIORITY_PAIRINGS");
    expect(prerender).toContain("lubina-dorada");
    expect(prerender).toContain("pescados-y-mariscos");
    expect(prerender).toContain("pasta-arroces-y-legumbres");
    expect(prerender).toContain("cocina-asiatica-y-fusion");
    expect(prerender).toContain("WINE_LIBRARY_EXPANDED_PAIRINGS");
    expect(prerender).toContain("aves-y-caza");
    expect(prerender).toContain("ostras");
    expect(prerender).toContain("chocolate-negro");
    expect(prerender).toContain("ceviche");
    expect(prerender).toContain("queso-azul");
    expect(prerender).toContain("jamon-iberico");
    expect(prerender).toContain("thai-curry");
    expect(prerender).toContain("tarta-de-queso");
    expect(prerender).toContain("Rotes Fleisch ist das Vertrauenspairing");
    expect(prerender).toContain("Marisco e alavanca de frescura");
  });

  it("adds strategic internal links to prerendered wine-library entities", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const strategicLinksBlock =
      prerender.match(/const WINE_LIBRARY_STRATEGIC_LINKS[\s\S]*?\n};/)?.[0] || "";
    const missingPriorityGrapes = priorityGrapeSlugs.filter(
      (slug) => !strategicLinksBlock.includes(`'/biblioteca-vino/uvas/${slug}'`),
    );
    const strategicTargets = [
      ...new Set([...strategicLinksBlock.matchAll(/esPath: '([^']+)'/g)].map((match) => match[1])),
    ];
    const targetsMissingFromSitemap = strategicTargets.filter(
      (target) => !sitemap.includes(`esPath: '${target}'`),
    );

    expect(prerender).toContain("const WINE_LIBRARY_STRATEGIC_LINKS");
    expect(missingPriorityGrapes).toEqual([]);
    expect(targetsMissingFromSitemap).toEqual([]);
    expect(strategicLinksBlock).toContain("/biblioteca-vino/uvas/xarello");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/uvas/gruner-veltliner");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/uvas/corvina");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/regiones/espana/rias-baixas");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/regiones/francia/muscadet");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/estilos/tinto-crianza");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/estilos/blanco-mineral");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/maridajes/carnes-rojas");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/maridajes/ostras");
    expect(strategicLinksBlock).toContain("/biblioteca-vino/maridajes/risotto-setas");
    expect(prerender).toContain("wineLibraryStrategicLinks(lang, esPath)");
  });

  it("describes prerendered wine-library detail entities with semantic mentions", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("const isWineLibraryDetail");
    expect(prerender).toContain("function getWineLibraryDetailSchemaContext");
    expect(prerender).toContain("const wineLibraryDetailEntity");
    expect(prerender).toContain("'@type': 'WebPage'");
    expect(prerender).toContain("'@type': 'DefinedTermSet'");
    expect(prerender).toContain("termAnchor: 'region-term'");
    expect(prerender).toContain("termAnchor: 'style-term'");
    expect(prerender).toContain("termAnchor: 'pairing-term'");
    expect(prerender).toContain("const mentionLinks");
    expect(prerender).toContain("about: wineLibraryDetailEntity");
    expect(prerender).toContain("mentions: mentionLinks");
    expect(prerender).toContain("/weinbibliothek/");
    expect(prerender).toContain("/biblioteca-vinho/");
  });

  it("redirects legacy one-segment wine-library shortcuts at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("const WINE_LIBRARY_LEGACY_SHORTCUTS");
    expect(worker).toContain("'borgona': '/biblioteca-vino/regiones/francia/bourgogne'");
    expect(worker).toContain("'maridaje-pescado': '/biblioteca-vino/maridajes/pescados-y-mariscos'");
    expect(worker).toContain("getWineLibraryLegacyShortcutTarget(path)");
    expect(worker).toContain("'X-Worker-Branch': 'wine-library-legacy-redirect'");
  });

  it("redirects legacy localized article suffixes at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("function getLegacyLocalizedArticleTarget(path)");
    expect(worker).toContain("/^\\/article\\/([^/]+)_(en|it|fr|de|pt)$/");
    expect(worker).toContain("return `/${lang}/article/${baseSlug}`");
    expect(worker).toContain("getLegacyLocalizedArticleTarget(path)");
    expect(worker).toContain("'X-Worker-Branch': 'legacy-localized-article-redirect'");
  });

  it("redirects unprefixed international article canonicals to localized routes", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("const LOCALIZED_ARTICLE_CANONICAL_REDIRECTS");
    expect(worker).toContain("'/article/alternative-zur-pdf-weinkarte': '/de/article/alternative-zur-pdf-weinkarte'");
    expect(worker).toContain("'/article/wine-by-the-glass-software-restaurants': '/en/article/wine-by-the-glass-software-restaurants'");
    expect(worker).toContain("getLocalizedArticleCanonicalTarget(path)");
    expect(worker).toContain("'X-Worker-Branch': 'localized-article-canonical-redirect'");
  });

  it("maps high-confidence GSC 404 legacy URLs at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("'/privacy-policy': '/politica-privacidad'");
    expect(worker).toContain("'/terms-of-service': '/terminos-y-condiciones-del-contrato'");
    expect(worker).toContain("'/condiciones-de-servicio-2': '/terminos-y-condiciones-del-contrato'");
    expect(worker).toContain("'/landing': '/'");
    expect(worker).toContain("'/reviews-restaurante': '/casos-exito'");
    expect(worker).toContain(
      "'/por-que-los-jovenes-no-beben-vino-en-los-restaurantes': '/article/por-que-los-jovenes-no-beben-vino-en-los-restaurantes'",
    );
  });

  it("maps crawled-not-indexed legacy URLs surfaced by GSC", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("'/en/homepage': '/en'");
    expect(worker).toContain("'/periko-ortega': '/article/periko-ortega'");
    expect(worker).toContain("'/vinos-ecologicos': '/biblioteca-vino/estilos/ecologico-biodinamico-natural'");
    expect(worker).toContain("'/winerim-vs-vinipad': '/comparativas'");
    expect(worker).toContain("'/programa-afiliados/afiliacion': '/afiliate'");
    expect(worker).toContain(
      "'/en/when-the-food-goes-with-the-wine-the-best-restaurants': '/en/guides/wine-pairing-strategy-restaurants'",
    );
    expect(worker).toContain("'/en/cookies': '/en/privacy'");
    expect(worker).toContain("'/un-consejo-prueba-vinos-': '/article/un-consejo-prueba-vinos-nuevos'");
    expect(worker).toContain("'/un-consejo-cata-con-el-': '/article/un-consejo-cata-con-el-corazon'");
    expect(worker).toContain("function getDirectLegacyTarget(path)");
    expect(worker).toContain("const legacyLookupPath = normalizeLegacyLookupPath(path)");
    expect(worker).toContain("(legacyLookupPath.startsWith('/clientes/') ? '/clientes' : null)");
    expect(worker).toContain("(legacyLookupPath.startsWith('/estadisticas/') ? '/benchmarks-playbooks' : null)");
    expect(worker).toContain("(legacyLookupPath.startsWith('/blog-2/') ? '/blog' : null)");
    expect(worker).toContain("(legacyLookupPath.startsWith('/programa-afiliados/') ? '/afiliate' : null)");
    expect(worker.indexOf("const directLegacyTarget = getDirectLegacyTarget(path)")).toBeLessThan(
      worker.indexOf("if (path.length > 1 && path.endsWith('/'))"),
    );
  });

  it("publishes the learn-wine hub as a separate multilingual SEO surface", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const routes = readFileSync("src/i18n/types.ts", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const llms = readFileSync("public/llms.txt", "utf8");
    const llmsFull = readFileSync("public/llms-full.txt", "utf8");
    const aprenderVino = readFileSync("src/pages/AprenderVino.tsx", "utf8");

    expect(app).toContain("const AprenderVino");
    expect(app).toContain('path="/aprender-vino"');
    expect(app).toContain("`${prefix}/learn-wine`");
    expect(app).toContain("`${prefix}/aprender-vinho`");
    expect(routes).toContain('"/aprender-vino": "/en/learn-wine"');
    expect(routes).toContain('"/aprender-vino": "/de/wein-lernen"');
    expect(routes).toContain('"/aprender-vino": "/pt/aprender-vinho"');
    expect(sitemap).toContain("{ esPath: '/aprender-vino', priority: '0.7', changefreq: 'monthly', multilang: true }");
    expect(prerender).toContain("'/aprender-vino': [");
    expect(prerender).toContain("schemaType: 'LearningResource'");
    expect(worker).toContain("const LEARN_WINE_ALTERNATES");
    expect(worker).toContain("'/biblioteca-vino/como-empezar': '/aprender-vino'");
    expect(worker).toContain("'/pt/aprender-vinho'");
    expect(llms).toContain("Learn wine: https://winerim.wine/aprender-vino");
    expect(llms).toContain("https://winerim.wine/de/wein-lernen");
    expect(prerender).toContain("/article/como-catar-vino-en-cinco-pasos");
    expect(worker).toContain("/en/article/wine-tasting-vocabulary");
    expect(llms).toContain("https://winerim.wine/article/maridajes-basicos-para-restaurantes");
    expect(prerender).toContain("/article/tipos-de-vino-para-entender-una-carta");
    expect(worker).toContain("/en/article/types-of-wine-restaurant-wine-list");
    expect(worker).toContain("/pt/article/regioes-vinicolas-para-conhecer-em-restaurante");
    expect(llms).toContain("https://winerim.wine/article/uvas-que-conocer-para-empezar");
    expect(prerender).toContain("/article/recomendar-vino-por-estilos-restaurante");
    expect(worker).toContain("/en/article/recommend-wine-by-style-restaurant");
    expect(worker).toContain("/it/article/raccomandare-vino-per-stile-ristorante");
    expect(worker).toContain("/fr/article/recommander-vin-par-style-restaurant");
    expect(worker).toContain("/de/article/wein-nach-stil-empfehlen-restaurant");
    expect(worker).toContain("/pt/article/recomendar-vinho-por-estilos-restaurante");
    expect(aprenderVino).toContain("visibleArticleLinks");
    expect(aprenderVino).toContain('publishedAt: "2026-07-13T09:00:00+02:00"');
    expect(prerender).toContain("const LINK_RELEASES");
    expect(prerender).toContain("isReleasedLink");
    expect(prerender).toContain("const ARTICLE_RELEASES");
    expect(prerender).toContain("isReleasedArticleSlug");
    expect(worker).toContain("const WORKER_LINK_RELEASES");
    expect(worker).toContain("isWorkerLinkVisible");
    expect(worker).toContain("stripUnreleasedSitemapUrls");
    expect(worker).toContain("(?:(?!</url>)[\\\\s\\\\S])*?");
    expect(worker).toContain("future-article-not-found");
    expect(llms).not.toContain("https://winerim.wine/en/article/recommend-wine-by-style-restaurant");
    expect(llms).not.toContain("https://winerim.wine/pt/article/recomendar-vinho-por-estilos-restaurante");
    expect(llmsFull).not.toContain("https://winerim.wine/en/article/recommend-wine-by-style-restaurant");
    expect(llmsFull).not.toContain("https://winerim.wine/pt/article/recomendar-vinho-por-estilos-restaurante");
  });

  it("prepares the wine-library and learn-wine editorial migration for Lovable Cloud", () => {
    const migration = readFileSync(
      "supabase/migrations/20260703141412_add_wine_library_learn_wine_editorial_expansion.sql",
      "utf8",
    );
    const permissionsMigration = readFileSync(
      "supabase/migrations/20260705081417_harden_articles_editorial_permissions.sql",
      "utf8",
    );
    const articlePage = readFileSync("src/pages/ArticlePage.tsx", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");

    expect(migration).toContain("ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY");
    expect(migration).toContain("GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.articles TO authenticated");
    expect(migration).toContain("GRANT ALL ON TABLE public.articles TO service_role");
    expect(migration).toContain('CREATE POLICY "Public can read published articles"');
    expect(migration).toContain('CREATE POLICY "Admins can manage articles"');
    expect(migration).toContain("wine-library-service-guide-floor-team");
    expect(migration).toContain("learn-wine-recommend-by-style");
    expect(migration).toContain("2026-07-06T09:00:00+02:00");
    expect(migration).toContain("2026-07-13T09:25:00+02:00");
    expect(migration).toContain('"to":"/en/wine-list-analysis"');
    expect(migration).toContain('"to":"/pt/analise-carta"');
    expect(migration).toContain("recommend-wine-by-style-restaurant_en");
    expect(migration).toContain("recomendar-vinho-por-estilos-restaurante_pt");
    expect(permissionsMigration).toContain("ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY");
    expect(permissionsMigration).toContain("GRANT SELECT ON TABLE public.articles TO anon");
    expect(permissionsMigration).toContain("GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.articles TO authenticated");
    expect(permissionsMigration).toContain("GRANT ALL ON TABLE public.articles TO service_role");
    expect(permissionsMigration).toContain('CREATE POLICY "Public can read published articles"');
    expect(articlePage).toContain("article_group");
    expect(articlePage).toContain("hreflang={article.hreflang}");
    expect(prerender).toContain("articleHreflang");
    expect(sitemap).toContain("published_at");
    expect(sitemap).toContain("article_group");
    expect(sitemap).toContain("articleHreflangBlock");
    expect(sitemap).toContain("isReleasedArticleSlug");
  });

  it("prepares the 2026-07-20 wine-library by-the-glass stock rotation batch without early LLM exposure", () => {
    const migration = readFileSync(
      "supabase/migrations/20260707103000_add_wine_library_by_the_glass_stock_rotation.sql",
      "utf8",
    );
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const relatedContent = readFileSync("src/components/article/ArticleRelatedContent.tsx", "utf8");
    const llms = readFileSync("public/llms.txt", "utf8");
    const llmsFull = readFileSync("public/llms-full.txt", "utf8");

    expect(migration).toContain("wine-library-by-the-glass-stock-rotation");
    expect(migration).toContain("como-usar-biblioteca-vino-para-vino-por-copa-y-rotacion");
    expect(migration).toContain("wine-library-by-the-glass-stock-rotation_en");
    expect(migration).toContain("biblioteca-vino-calice-stock-rotazione_it");
    expect(migration).toContain("bibliotheque-vin-verre-stock-rotation_fr");
    expect(migration).toContain("weinbibliothek-offenwein-bestand-rotation_de");
    expect(migration).toContain("biblioteca-vinho-copo-stock-rotacao_pt");
    expect(migration).toContain("2026-07-20T09:00:00+02:00");
    expect(migration).toContain("2026-07-20T09:25:00+02:00");
    expect(migration).toContain('"to":"/en/tools/wine-by-glass-price-calculator"');
    expect(migration).toContain('"to":"/pt/ferramentas/calculadora-stock-morto"');
    expect(migration).toContain('"to":"/de/produkt/winerim-supply"');
    expect(migration).toContain('"type":"conversion"');
    expect(migration).toContain("La Biblioteca del vino no es solo un lugar para consultar uvas");
    expect(migration).toContain("The Wine Library is not only a place to look up grapes");
    expect(migration).toContain("A Biblioteca do vinho não serve apenas para consultar castas");
    expect(prerender).toContain("'wine-library-by-the-glass-stock-rotation_en': '2026-07-20T09:05:00+02:00'");
    expect(sitemap).toContain("'biblioteca-vinho-copo-stock-rotacao_pt': '2026-07-20T09:25:00+02:00'");
    expect(worker).toContain("'/de/article/weinbibliothek-offenwein-bestand-rotation': '2026-07-20T09:20:00+02:00'");
    expect(relatedContent).toContain('type: "tool" | "guide" | "resource" | "solution" | "conversion" | "decision-center"');
    expect(relatedContent).toContain("conversion: { icon: ArrowRight");
    expect(llms).not.toContain("wine-library-by-the-glass-stock-rotation");
    expect(llms).not.toContain("biblioteca-vinho-copo-stock-rotacao");
    expect(llmsFull).not.toContain("wine-library-by-the-glass-stock-rotation");
    expect(llmsFull).not.toContain("biblioteca-vinho-copo-stock-rotacao");
  });

  it("prepares the 2026-07-27 learn-wine label-reading batch without early LLM exposure", () => {
    const migration = readFileSync(
      "supabase/migrations/20260707090000_add_learn_wine_read_label_restaurant.sql",
      "utf8",
    );
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const llms = readFileSync("public/llms.txt", "utf8");
    const llmsFull = readFileSync("public/llms-full.txt", "utf8");

    expect(migration).toContain("learn-wine-read-label-restaurant");
    expect(migration).toContain("como-leer-etiqueta-vino-restaurante");
    expect(migration).toContain("read-wine-label-restaurant_en");
    expect(migration).toContain("come-leggere-etichetta-vino-ristorante_it");
    expect(migration).toContain("lire-etiquette-vin-restaurant_fr");
    expect(migration).toContain("weinetikett-lesen-restaurant_de");
    expect(migration).toContain("como-ler-rotulo-vinho-restaurante_pt");
    expect(migration).toContain("2026-07-27T09:00:00+02:00");
    expect(migration).toContain("2026-07-27T09:25:00+02:00");
    expect(migration).toContain('"to":"/en/wine-library/glossary"');
    expect(migration).toContain('"to":"/pt/produto/cloudrim"');
    expect(migration).toContain('"type":"conversion"');
    expect(migration).toContain("Leer una etiqueta de vino no significa recitar todo lo que aparece");
    expect(migration).toContain("Reading a wine label is not the same as reciting everything printed");
    expect(migration).toContain("Ler um rótulo de vinho não é repetir tudo o que aparece");
    expect(prerender).toContain("'read-wine-label-restaurant_en': '2026-07-27T09:05:00+02:00'");
    expect(sitemap).toContain("'como-ler-rotulo-vinho-restaurante_pt': '2026-07-27T09:25:00+02:00'");
    expect(worker).toContain("'/de/article/weinetikett-lesen-restaurant': '2026-07-27T09:20:00+02:00'");
    expect(llms).not.toContain("read-wine-label-restaurant");
    expect(llms).not.toContain("como-ler-rotulo-vinho-restaurante");
    expect(llmsFull).not.toContain("read-wine-label-restaurant");
    expect(llmsFull).not.toContain("como-ler-rotulo-vinho-restaurante");
  });

  it("normalizes legacy language query URLs at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("function getLegacyLanguageQueryTarget(url)");
    expect(worker).toContain("url.searchParams.has('lang')");
    expect(worker).toContain("const targets = { en: '/en', it: '/it', fr: '/fr', de: '/de', pt: '/pt', es: '/' }");
    expect(worker).toContain("legacy-language-query-redirect");
  });

  it("publishes CloudRIM and SAVia as multilingual product SEO surfaces", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const routes = readFileSync("src/i18n/types.ts", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const llms = readFileSync("public/llms.txt", "utf8");
    const llmsFull = readFileSync("public/llms-full.txt", "utf8");
    const home = readFileSync("src/components/landing/HomeBelowFold.tsx", "utf8");
    const features = readFileSync("src/pages/Funcionalidades.tsx", "utf8");
    const integrations = readFileSync("src/pages/Integraciones.tsx", "utf8");
    const dynamicIntelligence = readFileSync("src/pages/InteligenciaDinamica.tsx", "utf8");

    expect(app).toContain("const CloudRim");
    expect(app).toContain("const SAVia");
    expect(app).toContain('path="/producto/cloudrim"');
    expect(app).toContain('path="/producto/savia"');
    expect(app).toContain("`${prefix}/product/cloudrim`");
    expect(app).toContain("`${prefix}/produto/savia`");
    expect(routes).toContain('"/producto/cloudrim": "/en/product/cloudrim"');
    expect(routes).toContain('"/producto/savia": "/de/produkt/savia"');
    expect(routes).toContain('"/producto/cloudrim": "/pt/produto/cloudrim"');
    expect(sitemap).toContain("{ esPath: '/producto/cloudrim', priority: '0.7', changefreq: 'monthly', multilang: true }");
    expect(sitemap).toContain("{ esPath: '/producto/savia', priority: '0.7', changefreq: 'monthly', multilang: true }");
    expect(prerender).toContain("'/producto/cloudrim': [");
    expect(prerender).toContain("'/producto/savia': [");
    expect(prerender).toContain("La nube donde tu restaurante deja los documentos");
    expect(prerender).toContain("Pregunta a tu bodega. SAVia responde");
    expect(prerender).toContain("CloudRIM centralises wine lists");
    expect(prerender).toContain("SAVia helps teams understand");
    expect(worker).toContain("'/producto/cloudrim'");
    expect(worker).toContain("'/en/product/savia'");
    expect(worker).toContain("'/de/produkt/cloudrim'");
    expect(worker).toContain("'/pt/produto/savia'");
    expect(worker).toContain("const CLOUDRIM_ALTERNATES");
    expect(worker).toContain("const SAVIA_ALTERNATES");
    expect(worker).toContain("const CLOUDRIM_WORKER_PAGES");
    expect(worker).toContain("const SAVIA_WORKER_PAGES");
    expect(worker).toContain("WORKER_CLOUDRIM_SAVIA_SITEMAP_LASTMOD");
    expect(worker).toContain("missingCloudRimSaviaPaths");
    expect(llms).toContain("CloudRIM: https://winerim.wine/producto/cloudrim");
    expect(llms).toContain("SAVia: https://winerim.wine/producto/savia");
    expect(llmsFull).toContain("CloudRIM: an operational document cloud");
    expect(llmsFull).toContain("SAVia: a conversational Winerim agent");
    expect(home).toContain("CloudRimSaviaSection");
    expect(features).toContain("CloudRIM");
    expect(features).toContain("SAVia");
    expect(integrations).toContain("cloudTitle");
    expect(dynamicIntelligence).toContain("savia_title");
  });

  it("marks no-equivalent legacy news as gone at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("const LEGACY_GONE_PATHS");
    expect(worker).toContain("'/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world'");
    expect(worker).toContain("LEGACY_GONE_PATHS.has(path)");
    expect(worker).toContain("'X-Worker-Branch': 'legacy-gone'");
  });

  it("prerenders resource and benchmark detail pages instead of falling back to the homepage", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(prerender).toContain("const RESOURCE_DETAIL_PRERENDER_PAGES");
    expect(prerender).toContain("function renderResourceDetailPage");
    expect(prerender).toContain("'plantilla-formacion-equipo-sala'");
    expect(prerender).toContain("'revision-mensual-margenes'");
    expect(prerender).toContain("schemaType: 'CreativeWork'");
    expect(prerender).toContain("const BENCHMARK_DETAIL_PRERENDER_PAGES");
    expect(prerender).toContain("function renderBenchmarkPlaybookDetailPage");
    expect(prerender).toContain("'benchmark-peso-vino-ticket-medio'");
    expect(prerender).toContain("renderResourceDetailPage(path)");
    expect(prerender).toContain("renderBenchmarkPlaybookDetailPage(path)");
    expect(worker).toContain("function renderWorkerDetailPrerender");
    expect(worker).toContain("'X-Worker-Branch': 'worker-detail-prerender'");
    expect(worker).toContain("injectWorkerDetailUrlsIntoSitemap");
    expect(worker).toContain("const WINE_LIBRARY_SITEMAP_LASTMOD = '2026-06-01'");
    expect(worker).toContain("function stabilizeSitemapLastmod");
    expect(worker).toContain("'X-Worker-Branch': 'sitemap-worker-detail-bridge'");
    expect(worker).toContain("const STATIC_WORKER_PRERENDER_PAGES");
    expect(worker).toContain("'/it/prezzi'");
    expect(worker).toContain("'/integraciones'");
    expect(worker).toContain("'X-Worker-Branch': 'worker-static-prerender'");
  });

  it("submits resource and benchmark details in the sitemap once dedicated prerender exists", () => {
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const exclusionBlock = sitemap.match(/const TEMPORARILY_EXCLUDED_STATIC_SITEMAP_PATHS = new Set\(\[[\s\S]*?\]\);/)?.[0] || "";

    expect(sitemap).toContain("const STATIC_ROUTE_LASTMOD = '2026-07-02'");
    expect(sitemap).toContain("const WINE_LIBRARY_LASTMOD = '2026-06-01'");
    expect(sitemap).toContain("urlBlock(route.esPath, WINE_LIBRARY_LASTMOD");
    expect(sitemap).toContain("{ esPath: '/recursos/plantilla-formacion-equipo-sala'");
    expect(sitemap).toContain("{ esPath: '/recursos/revision-mensual-margenes'");
    expect(sitemap).toContain("{ esPath: '/benchmarks-playbooks/benchmark-peso-vino-ticket-medio'");
    expect(exclusionBlock).not.toContain("'/recursos/plantilla-formacion-equipo-sala'");
    expect(exclusionBlock).not.toContain("'/recursos/revision-mensual-margenes'");
    expect(exclusionBlock).not.toContain("'/benchmarks-playbooks/benchmark-peso-vino-ticket-medio'");
    expect(exclusionBlock).toContain("'/privacidad'");
    expect(exclusionBlock).toContain("'/politica-privacidad'");
    expect(exclusionBlock).toContain("'/terminos'");
    expect(exclusionBlock).toContain("'/terminos-y-condiciones-del-contrato'");
  });

  it("keeps all localized online tools aligned in sitemap, prerender and Worker", () => {
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const toolRoutes = [
      {
        es: "/herramientas/calculadora-precio-vino-por-copa",
        de: "/de/tools/glaspreis-rechner",
        pt: "/pt/ferramentas/calculadora-preco-vinho-por-copo",
      },
      {
        es: "/herramientas/calculadora-stock-muerto",
        de: "/de/tools/totbestand-rechner",
        pt: "/pt/ferramentas/calculadora-stock-morto",
      },
      {
        es: "/herramientas/calculadora-ticket-medio-vino",
        de: "/de/tools/durchschnittsbon-rechner",
        pt: "/pt/ferramentas/calculadora-ticket-medio",
      },
      {
        es: "/herramientas/calculadora-compra-inteligente",
        de: "/de/tools/intelligenter-einkauf-rechner",
        pt: "/pt/ferramentas/calculadora-compra-inteligente",
      },
      {
        es: "/herramientas/diagnostico-vino-por-copa",
        de: "/de/tools/glasausschank-diagnose",
        pt: "/pt/ferramentas/diagnostico-vinho-por-copo",
      },
      {
        es: "/herramientas/wine-list-score",
        de: "/de/tools/wine-list-score",
        pt: "/pt/ferramentas/wine-list-score",
      },
      {
        es: "/herramientas/auditor-carta-multilocal",
        de: "/de/tools/multi-standort-auditor",
        pt: "/pt/ferramentas/auditor-carta-multilocal",
      },
      {
        es: "/herramientas/simulador-senal-margenes",
        de: "/de/tools/margensignal-simulator",
        pt: "/pt/ferramentas/simulador-sinal-margens",
      },
      {
        es: "/herramientas/test-perfil-rim",
        de: "/de/tools/rim-profiltest",
        pt: "/pt/ferramentas/teste-perfil-rim",
      },
      {
        es: "/herramientas/simulador-pareto-carta-vinos",
        de: "/de/tools/pareto-weinkarten-simulator",
        pt: "/pt/ferramentas/simulador-pareto-carta-vinhos",
      },
      {
        es: "/herramientas/calculadora-fuga-margen",
        de: "/de/tools/margenverlust-rechner",
        pt: "/pt/ferramentas/calculadora-fuga-margem",
      },
      {
        es: "/herramientas/comparador-distribuidores",
        de: "/de/tools/distributoren-vergleich",
        pt: "/pt/ferramentas/comparador-distribuidores",
      },
    ];

    for (const { es, de, pt } of toolRoutes) {
      expect(sitemap).toContain(`{ esPath: '${es}', priority: '0.7', changefreq: 'monthly', multilang: true }`);
      expect(sitemap).toContain(`'${es}': '${de}'`);
      expect(sitemap).toContain(`'${es}': '${pt}'`);
      expect(prerender).toContain(`'${es}': '${de}'`);
      expect(prerender).toContain(`'${es}': '${pt}'`);
      expect(worker).toContain(`es: '${es}'`);
      expect(worker).toContain(`de: '${de}'`);
      expect(worker).toContain(`pt: '${pt}'`);
    }

    expect(sitemap).not.toContain("// Missing tools");
  });

  it("serves the long Spanish legal URLs across frontend, footer, worker and prerender", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const footer = readFileSync("src/components/Footer.tsx", "utf8");
    const privacy = readFileSync("src/pages/Privacidad.tsx", "utf8");
    const terms = readFileSync("src/pages/Terminos.tsx", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(app).toContain('path="/politica-privacidad"');
    expect(app).toContain('path="/terminos-y-condiciones-del-contrato"');
    expect(footer).toContain('"/politica-privacidad"');
    expect(footer).toContain('"/terminos-y-condiciones-del-contrato"');
    expect(privacy).toContain('location.pathname === "/politica-privacidad"');
    expect(terms).toContain('location.pathname === "/terminos-y-condiciones-del-contrato"');
    expect(prerender).toContain("path: '/politica-privacidad'");
    expect(prerender).toContain("path: '/terminos-y-condiciones-del-contrato'");
    expect(prerender).toContain("localizedStaticUrl('/politica-privacidad')");
    expect(prerender).toContain("localizedStaticUrl('/terminos-y-condiciones-del-contrato')");
    expect(worker).toContain("'/politica-privacidad'");
    expect(worker).toContain("'/terminos-y-condiciones-del-contrato'");
    expect(worker).toContain("const WORKER_STATIC_HUMAN_ROUTES");
    expect(worker).toContain("'X-Worker-Branch': 'worker-static-human'");
    expect(worker).toContain("content=\"${escapeHtml(page.robots || 'index, follow')}\"");
    expect(worker).toContain("function injectLegalFooterPatch");
    expect(worker).toContain("data-winerim-legal-footer-patch");
  });
});
