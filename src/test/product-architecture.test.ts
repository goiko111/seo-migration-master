import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Winerim product architecture", () => {
  it("places Wine Cellar and Wine Lockers inside Winerim Core", () => {
    const corePage = read("src/pages/WinerimCore.tsx");
    const coreScope = read("src/components/product/CoreScopeSection.tsx");

    expect(corePage).toContain("<CoreScopeSection />");
    expect(coreScope).toContain('id="core-bodega"');
    expect(coreScope).toContain('id="core-margins"');
    expect(coreScope).toContain("Wine Cellar");
    expect(coreScope).toContain("Wine Lockers");
    expect(coreScope).toContain("Core Carta");
    expect(coreScope).toContain("Core Cellar");
    expect(coreScope).toContain("Core Garrafeira");
  });

  it("shows all six operating layers on home and features", () => {
    const homeTeaser = read("src/components/landing/OperationalCapabilitiesTeaser.tsx");
    const architecture = read("src/components/landing/ProductArchitectureSection.tsx");
    const features = read("src/pages/Funcionalidades.tsx");

    for (const capability of ["Winerim Core", "CloudRIM", "Margins", "Supply", "RIMs™", "SAVia"]) {
      expect(homeTeaser).toContain(capability);
      expect(architecture).toContain(capability);
    }
    expect(features).toContain("<ProductArchitectureSection />");
  });

  it("links Cellar, Lockers and margins back to their Core scope", () => {
    const features = read("src/pages/Funcionalidades.tsx");

    expect(features.match(/winerim-core#core-bodega/g)?.length).toBe(12);
    expect(features.match(/winerim-core#core-margins/g)?.length).toBe(6);
  });

  it("keeps presentation prerender detailed and free of module prices", () => {
    const worker = read("cloudflare-worker-v3-hybrid.js");
    const presentationStart = worker.indexOf("'/presentacion':");
    const presentationEnd = worker.indexOf("'/distribuidor':", presentationStart);
    const presentationPrerender = worker.slice(presentationStart, presentationEnd);

    for (const capability of ["CloudRIM", "Wine Cellar", "Wine Lockers", "MarginRIM", "StockRIM", "Winerim Supply", "SAVia"]) {
      expect(presentationPrerender).toContain(capability);
    }
    expect(presentationPrerender).not.toContain("99 euros");
    expect(presentationPrerender).not.toContain("EUR 99");
  });

  it("routes the product architecture through the current frontend for humans and bots", () => {
    const router = read("edge-router/winerim-pages-router.js");

    expect(router).toContain('"/funcionalidades"');
    expect(router).toContain('"/en/features"');
    expect(router).toContain('"/de/funktionen"');
    expect(router).toContain('"/pt/funcionalidades"');
    expect(router).toContain('"/producto/winerim-core"');
    expect(router).toContain('"/pt/produto/winerim-core"');
    expect(router).toContain('"/producto/cloudrim"');
    expect(router).toContain('"/pt/produto/cloudrim"');
    expect(router).toContain("PRODUCT_ARCHITECTURE_ROUTES.has(path)");
    expect(router).toContain("renderProductArchitectureBotHtml(path)");
    expect(router).toContain("Wine Cellar");
    expect(router).toContain("Wine Lockers");
    expect(router).toContain("MarginRIM");
    expect(router).toContain("SAVia");
  });

  it("only applies noindex headers to legal and private routes", () => {
    const router = read("edge-router/winerim-pages-router.js");
    const legalStart = router.indexOf("const LEGAL_ROUTES");
    const legalEnd = router.indexOf("const NOINDEX_ROUTES", legalStart);
    const legalRoutes = router.slice(legalStart, legalEnd);

    expect(legalRoutes).toContain('"/politica-privacidad"');
    expect(legalRoutes).toContain('"/en/terms"');
    expect(legalRoutes).not.toContain("REACT_ROUTES");
    expect(legalRoutes).not.toContain('"/producto/cloudrim"');
    expect(legalRoutes).not.toContain('"/funcionalidades"');
    expect(router).toContain('path.startsWith("/legal/")');
  });
});
