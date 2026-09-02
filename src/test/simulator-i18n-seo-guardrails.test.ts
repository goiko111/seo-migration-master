import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

const localizedSimulatorRoutes = {
  es: "/simulador-carta",
  en: "/en/wine-list-simulator",
  it: "/it/simulatore-carta",
  fr: "/fr/simulateur-carte",
  de: "/de/weinkarten-simulator",
  pt: "/pt/simulador-carta",
} as const;

describe("simulator i18n SEO guardrails", () => {
  it("keeps React and the typed route map on canonical simulator slugs", () => {
    const app = read("src/App.tsx");
    const i18nTypes = read("src/i18n/types.ts");
    const simulatorPage = read("src/pages/SimuladorCarta.tsx");

    for (const route of Object.values(localizedSimulatorRoutes)) {
      expect(app).toContain(`path="${route}"`);
      expect(i18nTypes).toContain(route);
    }

    expect(app).toContain('path="/simulador" element={<Navigate to="/simulador-carta" replace />}');
    expect(app).toContain('path="/en/simulador-carta" element={<Navigate to="/en/wine-list-simulator" replace />}');
    expect(simulatorPage).toContain('hreflang={allLangPaths("/simulador-carta")}');
  });

  it("keeps Worker, Pages router, prerender and sitemap aligned for simulator alternates", () => {
    const worker = read("cloudflare-worker-v3-hybrid.js");
    const router = read("edge-router/winerim-pages-router.js");
    const sitemap = read("supabase/functions/sitemap/index.ts");
    const prerender = read("supabase/functions/prerender/index.ts");
    const staticSitemap = read("public/sitemap.xml");
    const refreshScript = read("scripts/refresh-static-sitemap.mjs");

    for (const route of Object.values(localizedSimulatorRoutes)) {
      expect(worker).toContain(route);
      expect(router).toContain(route);
      expect(sitemap).toContain(route);
      expect(prerender).toContain(route);
      expect(staticSitemap).toContain(`<loc>https://winerim.wine${route}</loc>`);
      expect(refreshScript).toContain(route);
    }

    expect(sitemap).toContain("{ esPath: '/simulador-carta', priority: '0.8', changefreq: 'monthly', multilang: true }");
    expect(prerender).toContain("'/simulador-carta': {");
    expect(prerender).toContain("Wine List Simulator for Restaurants | Winerim");
  });

  it("keeps the pricing architecture route and OG assets healthy at the edge", () => {
    const worker = read("cloudflare-worker-v3-hybrid.js");
    const router = read("edge-router/winerim-pages-router.js");
    const sitemap = read("supabase/functions/sitemap/index.ts");
    const prerender = read("supabase/functions/prerender/index.ts");
    const staticSitemap = read("public/sitemap.xml");
    const refreshScript = read("scripts/refresh-static-sitemap.mjs");
    const indexHtml = read("index.html");

    expect(worker).toContain("'/precios-modulos-integraciones'");
    expect(router).toContain('"/precios-modulos-integraciones": {');
    expect(router).toContain('path.startsWith("/og/")');
    expect(sitemap).toContain("{ esPath: '/precios-modulos-integraciones', priority: '0.8', changefreq: 'monthly', multilang: false }");
    expect(prerender).toContain("'/precios-modulos-integraciones': {");
    expect(staticSitemap).toContain("<loc>https://winerim.wine/precios-modulos-integraciones</loc>");
    expect(refreshScript).toContain('path: "/precios-modulos-integraciones"');
    expect(indexHtml).toContain('"/precios-modulos-integraciones": {');
  });

  it("keeps localized shell metadata, x-default alternates and en_US Open Graph", () => {
    const indexHtml = read("index.html");
    const seoConfig = read("src/seo/config.ts");
    const worker = read("cloudflare-worker-v3-hybrid.js");
    const router = read("edge-router/winerim-pages-router.js");
    const prerender = read("supabase/functions/prerender/index.ts");
    const seoHead = read("src/components/SEOHead.tsx");

    for (const source of [indexHtml, seoConfig, worker, router, prerender]) {
      expect(source).toContain("en_US");
      expect(source).not.toContain("en_GB");
    }

    for (const source of [indexHtml, worker, router, prerender, seoHead]) {
      expect(source).toContain("og:image:alt");
      expect(source).toContain("twitter:image:alt");
    }

    expect(seoConfig).toContain("LOCALIZED_OG_IMAGE_ALT");
    expect(indexHtml).toContain("var homeAlternates");
    expect(indexHtml).toContain("var simulatorAlternates");
    expect(indexHtml).toContain('"x-default": "/simulador-carta"');
    expect(indexHtml).toContain('script.id = "winerim-initial-jsonld"');
    expect(worker).toContain("const WORKER_HOME_SHELL_META");
    expect(worker).toContain("function getWorkerHomeLocalePath(request)");
    expect(worker).toContain("!url.search");
    expect(worker).toContain("!isCampaignHost(hostname)");
    expect(router).toContain("const ROUTER_HOME_META");
    expect(router).toContain("!url.search");
  });

  it("keeps localized OG image files as 1200x630 PNG assets", () => {
    for (const lang of Object.keys(localizedSimulatorRoutes)) {
      const buffer = readFileSync(resolve(process.cwd(), "public/og", `winerim-og-${lang}.png`));

      expect(buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe(true);
      expect(buffer.readUInt32BE(16)).toBe(1200);
      expect(buffer.readUInt32BE(20)).toBe(630);
    }
  });
});
