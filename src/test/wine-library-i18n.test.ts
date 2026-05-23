import { describe, expect, it } from "vitest";
import { getLocalizedGrape, getLocalizedGrapeCatalogEntry } from "@/data/grapesLibraryI18n";
import { getWineLibraryEsPath, getWineLibraryHreflang, getWineLibraryPath } from "@/data/wineLibraryI18n";

describe("wine library i18n routes", () => {
  it("localizes library hub paths across all supported wine-library languages", () => {
    expect(getWineLibraryPath("es", "/biblioteca-vino/uvas")).toBe("/biblioteca-vino/uvas");
    expect(getWineLibraryPath("en", "/biblioteca-vino/uvas")).toBe("/en/wine-library/grapes");
    expect(getWineLibraryPath("it", "/biblioteca-vino/uvas")).toBe("/it/biblioteca-vino/vitigni");
    expect(getWineLibraryPath("fr", "/biblioteca-vino/uvas")).toBe("/fr/bibliotheque-vin/cepages");
    expect(getWineLibraryPath("de", "/biblioteca-vino/uvas")).toBe("/de/weinbibliothek/rebsorten");
    expect(getWineLibraryPath("pt", "/biblioteca-vino/uvas")).toBe("/pt/biblioteca-vinho/castas");
  });

  it("builds complete hreflang alternates for dynamic wine-library detail pages", () => {
    const alternates = getWineLibraryHreflang("/biblioteca-vino/uvas/tempranillo");

    expect(alternates).toEqual([
      { lang: "es", url: "https://winerim.wine/biblioteca-vino/uvas/tempranillo" },
      { lang: "en", url: "https://winerim.wine/en/wine-library/grapes/tempranillo" },
      { lang: "fr", url: "https://winerim.wine/fr/bibliotheque-vin/cepages/tempranillo" },
      { lang: "it", url: "https://winerim.wine/it/biblioteca-vino/vitigni/tempranillo" },
      { lang: "de", url: "https://winerim.wine/de/weinbibliothek/rebsorten/tempranillo" },
      { lang: "pt", url: "https://winerim.wine/pt/biblioteca-vinho/castas/tempranillo" },
      { lang: "x-default", url: "https://winerim.wine/biblioteca-vino/uvas/tempranillo" },
    ]);
  });

  it("localizes nested region detail paths consistently", () => {
    expect(getWineLibraryPath("de", "/biblioteca-vino/regiones/espana/rioja")).toBe(
      "/de/weinbibliothek/regionen/espana/rioja"
    );
    expect(getWineLibraryPath("pt", "/biblioteca-vino/regiones/espana/rioja")).toBe(
      "/pt/biblioteca-vinho/regioes/espana/rioja"
    );
  });

  it("resolves localized dynamic library paths back to the ES source route", () => {
    expect(getWineLibraryEsPath("/de/weinbibliothek/rebsorten/tempranillo")).toBe(
      "/biblioteca-vino/uvas/tempranillo"
    );
    expect(getWineLibraryEsPath("/pt/biblioteca-vinho/regioes/espana/rioja")).toBe(
      "/biblioteca-vino/regiones/espana/rioja"
    );
    expect(getWineLibraryEsPath("/en/wine-library/sommelier-basics")).toBe(
      "/biblioteca-vino/sommelier-basics"
    );
  });

  it("resolves localized full grape entries by slug", () => {
    const grape = getLocalizedGrape("tempranillo", "de");

    expect(grape?.slug).toBe("tempranillo");
    expect(grape?.seo.title).toContain("Tempranillo");
    expect(grape?.description).not.toEqual("tempranillo");
  });

  it("does not leak Spanish narrative fallbacks into localized full entries", () => {
    const grape = getLocalizedGrape("tempranillo", "de");

    expect(grape?.countries).toContain("Spanien");
    expect(grape?.intro).not.toContain("Tempranillo es la variedad");
    expect(grape?.cartaPerception).not.toContain("comensal");
    expect(grape?.faqs[0]?.q).not.toContain("¿");
  });

  it("provides SEO fallbacks for catalog-only grape detail pages", () => {
    const grape = getLocalizedGrapeCatalogEntry("primitivo", "es");

    expect(grape?.seo?.title).toContain("Primitivo");
    expect(grape?.seo?.description).toBeTruthy();
  });
});
