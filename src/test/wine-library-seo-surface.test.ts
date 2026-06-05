import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("wine library SEO surface", () => {
  it("publishes dynamic library entities in the sitemap function", () => {
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");

    expect(sitemap).toContain("const WINE_LIBRARY_DYNAMIC_ROUTES");
    expect(sitemap).toContain("/biblioteca-vino/uvas/tempranillo");
    expect(sitemap).toContain("/biblioteca-vino/regiones/espana/rioja");
    expect(sitemap).toContain("/biblioteca-vino/regiones/francia/sancerre");
    expect(sitemap).toContain("/biblioteca-vino/regiones/argentina/mendoza");
    expect(sitemap).toContain("/biblioteca-vino/estilos/tinto-crianza");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/carnes-rojas");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/ostras");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/solomillo-de-ternera");
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
    expect(prerender).toContain("Rotes Fleisch ist das Vertrauenspairing");
    expect(prerender).toContain("Marisco e alavanca de frescura");
  });

  it("adds strategic internal links to prerendered wine-library entities", () => {
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    expect(prerender).toContain("const WINE_LIBRARY_STRATEGIC_LINKS");
    expect(prerender).toContain("/biblioteca-vino/uvas/xarello");
    expect(prerender).toContain("/biblioteca-vino/regiones/espana/rias-baixas");
    expect(prerender).toContain("/biblioteca-vino/estilos/tinto-crianza");
    expect(prerender).toContain("/biblioteca-vino/maridajes/carnes-rojas");
    expect(prerender).toContain("wineLibraryStrategicLinks(lang, esPath)");
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

  it("maps high-confidence GSC 404 legacy URLs at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("'/terms-of-service': '/terminos'");
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
    expect(worker).toContain("(path.startsWith('/blog-2/') ? '/blog' : null)");
    expect(worker).toContain("(path.startsWith('/programa-afiliados/') ? '/afiliate' : null)");
  });

  it("normalizes legacy language query URLs at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("function getLegacyLanguageQueryTarget(url)");
    expect(worker).toContain("url.searchParams.has('lang')");
    expect(worker).toContain("const targets = { en: '/en', it: '/it', fr: '/fr', de: '/de', pt: '/pt', es: '/' }");
    expect(worker).toContain("legacy-language-query-redirect");
  });

  it("marks no-equivalent legacy news as gone at the Worker edge", () => {
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");

    expect(worker).toContain("const LEGACY_GONE_PATHS");
    expect(worker).toContain("'/en/castillo-ygay-gran-reserva-especial-recognized-as-the-best-wine-in-the-world'");
    expect(worker).toContain("LEGACY_GONE_PATHS.has(path)");
    expect(worker).toContain("'X-Worker-Branch': 'legacy-gone'");
  });
});
