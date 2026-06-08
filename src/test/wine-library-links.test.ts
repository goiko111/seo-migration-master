import { describe, expect, it } from "vitest";
import { priorityGrapeSlugs } from "@/data/wineLibraryEditorial";
import { getStrategicWineLibraryLinks, resolveLibraryLink } from "@/data/wineLibraryLinks";
import {
  getLocalizedWineLibraryLegacyRedirect,
  getWineLibraryLegacyRedirectMatrix,
  wineLibraryLegacyShortcutSlugs,
} from "@/data/wineLibraryLegacyRedirects";

describe("wine library link resolver", () => {
  it("resolves high-intent aliases without creating duplicate slugs", () => {
    expect(resolveLibraryLink("Xarel-lo", "grape")?.path).toBe("/biblioteca-vino/uvas/xarello");
    expect(resolveLibraryLink("Xarel·lo", "grape")?.path).toBe("/biblioteca-vino/uvas/xarello");
    expect(resolveLibraryLink("Borgoña", "region")?.path).toBe("/biblioteca-vino/regiones/francia/bourgogne");
    expect(resolveLibraryLink("Burdeos", "region")?.path).toBe("/biblioteca-vino/regiones/francia/bordeaux");
    expect(resolveLibraryLink("Melon de Bourgogne", "grape")?.path).toBe("/biblioteca-vino/uvas/muscadet");
    expect(resolveLibraryLink("Muscadet", "region")?.path).toBe("/biblioteca-vino/regiones/francia/muscadet");
    expect(resolveLibraryLink("Muscadet Sèvre-et-Maine", "region")?.path).toBe("/biblioteca-vino/regiones/francia/muscadet");
    expect(resolveLibraryLink("blanco con lías", "style")?.path).toBe("/biblioteca-vino/estilos/blanco-crianza-lias");
    expect(resolveLibraryLink("espumoso método tradicional", "style")?.path).toBe("/biblioteca-vino/estilos/espumoso");
    expect(resolveLibraryLink("rosado gastronómico", "style")?.path).toBe("/biblioteca-vino/estilos/rosado-cuerpo");
    expect(resolveLibraryLink("pescado blanco", "pairing")?.path).toBe("/biblioteca-vino/maridajes/lubina-dorada");
    expect(resolveLibraryLink("marisco", "pairing")?.path).toBe("/biblioteca-vino/maridajes/pescados-y-mariscos");
    expect(resolveLibraryLink("arroces", "pairing")?.path).toBe("/biblioteca-vino/maridajes/pasta-arroces-y-legumbres");
    expect(resolveLibraryLink("cocina asiática", "pairing")?.path).toBe("/biblioteca-vino/maridajes/cocina-asiatica-y-fusion");
  });

  it("respects category hints for names shared by region and style", () => {
    expect(resolveLibraryLink("Champagne", "region")?.path).toBe("/biblioteca-vino/regiones/francia/champagne");
    expect(resolveLibraryLink("Champagne", "style")?.path).toBe("/biblioteca-vino/estilos/champagne");
  });

  it("keeps the strategic relation graph resolvable", () => {
    const xarelloLinks = getStrategicWineLibraryLinks("grape", "xarello");
    const muscadetLinks = getStrategicWineLibraryLinks("grape", "muscadet");
    const riojaLinks = getStrategicWineLibraryLinks("region", "rioja");
    const pairingLinks = getStrategicWineLibraryLinks("pairing", "carnes-rojas");

    expect(xarelloLinks.map((link) => link.name)).toContain("Cava");
    expect(muscadetLinks.map((link) => link.name)).toContain("Ostras");
    expect(riojaLinks.map((link) => link.name)).toContain("Tempranillo");
    expect(pairingLinks.map((link) => link.name)).toContain("Tinto reserva");

    [...xarelloLinks, ...muscadetLinks, ...riojaLinks, ...pairingLinks].forEach((link) => {
      expect(resolveLibraryLink(link.name, link.hint), `${link.name} should resolve`).not.toBeNull();
    });
  });

  it("keeps every priority grape connected to resolvable strategic entities", () => {
    priorityGrapeSlugs.forEach((slug) => {
      const links = getStrategicWineLibraryLinks("grape", slug);

      expect(links.length, `${slug} should have strategic links`).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(resolveLibraryLink(link.name, link.hint), `${slug} -> ${link.name} should resolve`).not.toBeNull();
      });
    });
  });

  it("redirects one-segment legacy shortcuts to canonical section URLs", () => {
    expect(wineLibraryLegacyShortcutSlugs).toHaveLength(16);
    expect(getWineLibraryLegacyRedirectMatrix()).toHaveLength(96);

    expect(getLocalizedWineLibraryLegacyRedirect("es", "borgona")).toBe("/biblioteca-vino/regiones/francia/bourgogne");
    expect(getLocalizedWineLibraryLegacyRedirect("en", "cabernet-sauvignon")).toBe("/en/wine-library/grapes/cabernet-sauvignon");
    expect(getLocalizedWineLibraryLegacyRedirect("it", "vino-espumoso")).toBe("/it/biblioteca-vino/stili/espumoso");
    expect(getLocalizedWineLibraryLegacyRedirect("fr", "maridaje-pescado")).toBe("/fr/bibliotheque-vin/accords/pescados-y-mariscos");
    expect(getLocalizedWineLibraryLegacyRedirect("de", "rioja")).toBe("/de/weinbibliothek/regionen/espana/rioja");
    expect(getLocalizedWineLibraryLegacyRedirect("pt", "maridaje-queso")).toBe("/pt/biblioteca-vinho/harmonizacoes/quesos");
  });
});
