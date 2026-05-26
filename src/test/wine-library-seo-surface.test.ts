import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("wine library SEO surface", () => {
  it("publishes dynamic library entities in the sitemap function", () => {
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");

    expect(sitemap).toContain("const WINE_LIBRARY_DYNAMIC_ROUTES");
    expect(sitemap).toContain("/biblioteca-vino/uvas/tempranillo");
    expect(sitemap).toContain("/biblioteca-vino/regiones/espana/rioja");
    expect(sitemap).toContain("/biblioteca-vino/estilos/tinto-crianza");
    expect(sitemap).toContain("/biblioteca-vino/maridajes/carnes-rojas");
    expect(sitemap).toContain("function localizedPath");
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
});
