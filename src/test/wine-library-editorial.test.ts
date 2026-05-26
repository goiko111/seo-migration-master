import { describe, expect, it } from "vitest";
import { getGrapeEditorialProfile, priorityGrapeSlugs } from "@/data/wineLibraryEditorial";
import { getRegionEditorialProfile, priorityRegionSlugs } from "@/data/wineLibraryRegionEditorial";
import { getStyleEditorialProfile, priorityStyleSlugs } from "@/data/wineLibraryStyleEditorial";
import { getPairingEditorialProfile, priorityPairingSlugs } from "@/data/wineLibraryPairingEditorial";

describe("wine library editorial profiles", () => {
  it("defines priority service profiles for the first two editorial tranches", () => {
    expect(priorityGrapeSlugs).toContain("tempranillo");
    expect(priorityGrapeSlugs).toContain("albarino");
    expect(priorityGrapeSlugs).toContain("godello");
    expect(priorityGrapeSlugs).toContain("syrah");
    expect(priorityGrapeSlugs).toContain("chenin-blanc");
    expect(priorityGrapeSlugs).toContain("xarello");
    expect(priorityGrapeSlugs).toContain("touriga-nacional");
    expect(priorityGrapeSlugs).toHaveLength(20);
  });

  it("localizes service intelligence for de and pt priority grapes", () => {
    const de = getGrapeEditorialProfile("tempranillo", "de", "Tempranillo");
    const pt = getGrapeEditorialProfile("albarino", "pt", "Albariño");

    expect(de?.eyebrow).toBe("Service-Intelligenz");
    expect(de?.sections.some((section) => section.body.includes("Vertrauen"))).toBe(true);
    expect(pt?.eyebrow).toBe("Inteligencia de servico");
    expect(pt?.menuHooks).toContain("marisco");
  });

  it("keeps the editorial layer localized in it and fr", () => {
    const it = getGrapeEditorialProfile("chardonnay", "it", "Chardonnay");
    const fr = getGrapeEditorialProfile("riesling", "fr", "Riesling");

    expect(it?.eyebrow).toBe("Intelligenza di servizio");
    expect(it?.sections.some((section) => section.title === "Ruolo in carta")).toBe(true);
    expect(it?.sections.some((section) => section.body.includes("Global white"))).toBe(false);
    expect(fr?.eyebrow).toBe("Intelligence de service");
    expect(fr?.sections.some((section) => section.title === "Role en carte")).toBe(true);
    expect(fr?.sections.some((section) => section.body.includes("Discovery white"))).toBe(false);
  });

  it("localizes the second editorial tranche for de and pt", () => {
    const de = getGrapeEditorialProfile("syrah", "de", "Syrah");
    const pt = getGrapeEditorialProfile("xarello", "pt", "Xarel-lo");

    expect(de?.eyebrow).toBe("Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Rolle auf der Karte")).toBe(true);
    expect(de?.menuHooks).toContain("Grillfleisch");
    expect(pt?.eyebrow).toBe("Inteligencia de servico");
    expect(pt?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(pt?.menuHooks).toContain("marisco");
  });

  it("defines priority regional service profiles in all wine-library languages", () => {
    expect(priorityRegionSlugs).toEqual([
      "rioja",
      "ribera-del-duero",
      "rias-baixas",
      "rueda",
      "priorat",
      "bourgogne",
      "bordeaux",
      "champagne",
      "douro",
      "vinho-verde",
    ]);

    const de = getRegionEditorialProfile("champagne", "de", "Champagne");
    const pt = getRegionEditorialProfile("vinho-verde", "pt", "Vinho Verde");

    expect(de?.eyebrow).toBe("Regionale Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(de?.menuHooks).toContain("Austern");
    expect(pt?.eyebrow).toBe("Inteligencia regional de servico");
    expect(pt?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(pt?.menuHooks).toContain("marisco");
  });

  it("defines priority style service profiles in all wine-library languages", () => {
    expect(priorityStyleSlugs).toEqual([
      "tinto-crianza",
      "tinto-reserva",
      "blanco-crianza-lias",
      "espumoso",
      "rosado-cuerpo",
    ]);

    const de = getStyleEditorialProfile("espumoso", "de", "Schaumwein");
    const pt = getStyleEditorialProfile("blanco-crianza-lias", "pt", "Branco sobre Lias");

    expect(de?.eyebrow).toBe("Stil-Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(de?.menuHooks).toContain("Austern");
    expect(pt?.eyebrow).toBe("Inteligencia de estilo");
    expect(pt?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(pt?.menuHooks).toContain("marisco");
  });

  it("defines priority pairing service profiles in all wine-library languages", () => {
    expect(priorityPairingSlugs).toEqual([
      "carnes-rojas",
      "lubina-dorada",
      "pescados-y-mariscos",
      "pasta-arroces-y-legumbres",
      "cocina-asiatica-y-fusion",
      "quesos",
    ]);

    const de = getPairingEditorialProfile("cocina-asiatica-y-fusion", "de", "Asiatische Kuche");
    const pt = getPairingEditorialProfile("pescados-y-mariscos", "pt", "Peixes e mariscos");

    expect(de?.eyebrow).toBe("Pairing-Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Pairing-Rolle")).toBe(true);
    expect(de?.menuHooks).toContain("Ramen");
    expect(pt?.eyebrow).toBe("Inteligencia de harmonizacao");
    expect(pt?.sections.some((section) => section.title === "Papel da harmonizacao")).toBe(true);
    expect(pt?.menuHooks).toContain("ostras");
  });
});
