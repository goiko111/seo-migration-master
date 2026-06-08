import { describe, expect, it } from "vitest";
import { getGrapeEditorialProfile, priorityGrapeSlugs } from "@/data/wineLibraryEditorial";
import { getRegionEditorialProfile, priorityRegionSlugs } from "@/data/wineLibraryRegionEditorial";
import { getStyleEditorialProfile, priorityStyleSlugs } from "@/data/wineLibraryStyleEditorial";
import { getPairingEditorialProfile, priorityPairingSlugs } from "@/data/wineLibraryPairingEditorial";

describe("wine library editorial profiles", () => {
  it("defines priority service profiles for the first four editorial tranches", () => {
    expect(priorityGrapeSlugs).toContain("tempranillo");
    expect(priorityGrapeSlugs).toContain("albarino");
    expect(priorityGrapeSlugs).toContain("godello");
    expect(priorityGrapeSlugs).toContain("syrah");
    expect(priorityGrapeSlugs).toContain("chenin-blanc");
    expect(priorityGrapeSlugs).toContain("xarello");
    expect(priorityGrapeSlugs).toContain("touriga-nacional");
    expect(priorityGrapeSlugs).toContain("mencia");
    expect(priorityGrapeSlugs).toContain("cabernet-franc");
    expect(priorityGrapeSlugs).toContain("gruner-veltliner");
    expect(priorityGrapeSlugs).toContain("aglianico");
    expect(priorityGrapeSlugs).toContain("graciano");
    expect(priorityGrapeSlugs).toContain("muscadet");
    expect(priorityGrapeSlugs).toContain("semillon");
    expect(priorityGrapeSlugs).toContain("assyrtiko");
    expect(priorityGrapeSlugs).toContain("vermentino");
    expect(priorityGrapeSlugs).toContain("carmenere");
    expect(priorityGrapeSlugs).toContain("tannat");
    expect(priorityGrapeSlugs).toContain("petit-verdot");
    expect(priorityGrapeSlugs).toContain("torrontes");
    expect(priorityGrapeSlugs).toContain("corvina");
    expect(priorityGrapeSlugs).toHaveLength(40);
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

  it("localizes the fourth editorial tranche for de and pt", () => {
    const de = getGrapeEditorialProfile("muscadet", "de", "Muscadet");
    const pt = getGrapeEditorialProfile("graciano", "pt", "Graciano");

    expect(de?.eyebrow).toBe("Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Rolle auf der Karte")).toBe(true);
    expect(de?.menuHooks).toContain("Meeresfruchte");
    expect(pt?.eyebrow).toBe("Inteligencia de servico");
    expect(pt?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(pt?.menuHooks).toContain("borrego assado");
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
      "toscana",
      "napa-valley",
      "jerez",
      "vallee-du-rhone",
      "piemonte",
      "barossa-valley",
      "marlborough",
      "mendoza",
      "mosel",
      "willamette-valley",
      "sancerre",
      "barolo",
      "ribeira-sacra",
      "bierzo",
      "toro",
      "chablis",
      "alsacia",
      "provence",
      "santorini",
      "valpolicella",
      "chianti-classico",
      "brunello-di-montalcino",
      "soave",
      "etna",
    ]);

    const de = getRegionEditorialProfile("champagne", "de", "Champagne");
    const pt = getRegionEditorialProfile("vinho-verde", "pt", "Vinho Verde");

    expect(de?.eyebrow).toBe("Regionale Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(de?.menuHooks).toContain("Austern");
    expect(pt?.eyebrow).toBe("Inteligencia regional de servico");
    expect(pt?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(pt?.menuHooks).toContain("marisco");

    const expanded = getRegionEditorialProfile("sancerre", "de", "Sancerre");
    expect(expanded?.eyebrow).toBe("Weinkarten-Intelligenz");
    expect(expanded?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(expanded?.menuHooks).toContain("Austern");

    const ptExpanded = getRegionEditorialProfile("santorini", "pt", "Santorini");
    expect(ptExpanded?.eyebrow).toBe("Inteligencia de carta");
    expect(ptExpanded?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(ptExpanded?.menuHooks).toContain("marisco");
  });

  it("defines priority style service profiles in all wine-library languages", () => {
    expect(priorityStyleSlugs).toEqual([
      "tinto-crianza",
      "tinto-reserva",
      "blanco-crianza-lias",
      "espumoso",
      "rosado-cuerpo",
      "tinto-joven",
      "tinto-ligero",
      "tinto-cuerpo",
      "blanco-joven",
      "blanco-mineral",
      "champagne",
      "cava",
      "fino-manzanilla",
      "pedro-ximenez",
      "orange-maceracion-corta",
      "prosecco",
      "cremant",
      "franciacorta",
      "pet-nat",
      "amontillado",
      "oloroso",
      "palo-cortado",
      "oporto-tawny",
      "madeira",
      "blanco-fermentado-barrica",
    ]);

    const de = getStyleEditorialProfile("espumoso", "de", "Schaumwein");
    const pt = getStyleEditorialProfile("blanco-crianza-lias", "pt", "Branco sobre Lias");

    expect(de?.eyebrow).toBe("Stil-Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(de?.menuHooks).toContain("Austern");
    expect(pt?.eyebrow).toBe("Inteligencia de estilo");
    expect(pt?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(pt?.menuHooks).toContain("marisco");

    const expanded = getStyleEditorialProfile("fino-manzanilla", "fr", "Fino / Manzanilla");
    expect(expanded?.eyebrow).toBe("Intelligence de carte");
    expect(expanded?.sections.some((section) => section.title === "Role en carte")).toBe(true);
    expect(expanded?.menuHooks).toContain("aperitif");

    const deExpanded = getStyleEditorialProfile("franciacorta", "de", "Franciacorta");
    expect(deExpanded?.eyebrow).toBe("Weinkarten-Intelligenz");
    expect(deExpanded?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(deExpanded?.menuHooks).toContain("Meeresfruchte");
  });

  it("defines priority pairing service profiles in all wine-library languages", () => {
    expect(priorityPairingSlugs).toEqual([
      "carnes-rojas",
      "lubina-dorada",
      "pescados-y-mariscos",
      "pasta-arroces-y-legumbres",
      "cocina-asiatica-y-fusion",
      "quesos",
      "aves-y-caza",
      "verduras-y-cocina-vegetariana",
      "postres-y-chocolate",
      "tapas-y-aperitivos",
      "solomillo-de-ternera",
      "cordero-asado",
      "pato-confitado",
      "atun-rojo",
      "pulpo-gallego",
      "risotto-setas",
      "ostras",
      "chocolate-negro",
      "ceviche",
      "queso-azul",
      "queso-de-cabra",
      "jamon-iberico",
      "paella",
      "curry",
      "ramen",
      "thai-curry",
      "setas-y-trufas",
      "cochinillo-lechon",
      "queso-manchego",
      "tarta-de-queso",
    ]);

    const de = getPairingEditorialProfile("cocina-asiatica-y-fusion", "de", "Asiatische Kuche");
    const pt = getPairingEditorialProfile("pescados-y-mariscos", "pt", "Peixes e mariscos");

    expect(de?.eyebrow).toBe("Pairing-Service-Intelligenz");
    expect(de?.sections.some((section) => section.title === "Pairing-Rolle")).toBe(true);
    expect(de?.menuHooks).toContain("Ramen");
    expect(pt?.eyebrow).toBe("Inteligencia de harmonizacao");
    expect(pt?.sections.some((section) => section.title === "Papel da harmonizacao")).toBe(true);
    expect(pt?.menuHooks).toContain("ostras");

    const expanded = getPairingEditorialProfile("ostras", "de", "Austern");
    expect(expanded?.eyebrow).toBe("Weinkarten-Intelligenz");
    expect(expanded?.sections.some((section) => section.title === "Rolle auf der Weinkarte")).toBe(true);
    expect(expanded?.menuHooks).toContain("Austern");

    const ptExpanded = getPairingEditorialProfile("ceviche", "pt", "Ceviche");
    expect(ptExpanded?.eyebrow).toBe("Inteligencia de carta");
    expect(ptExpanded?.sections.some((section) => section.title === "Papel na carta")).toBe(true);
    expect(ptExpanded?.menuHooks).toContain("marisco");
  });
});
