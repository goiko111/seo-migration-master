import { describe, expect, it } from "vitest";
import { getStrategicWineLibraryLinks, resolveLibraryLink } from "@/data/wineLibraryLinks";

describe("wine library link resolver", () => {
  it("resolves high-intent aliases without creating duplicate slugs", () => {
    expect(resolveLibraryLink("Xarel-lo", "grape")?.path).toBe("/biblioteca-vino/uvas/xarello");
    expect(resolveLibraryLink("Xarel·lo", "grape")?.path).toBe("/biblioteca-vino/uvas/xarello");
    expect(resolveLibraryLink("Borgoña", "region")?.path).toBe("/biblioteca-vino/regiones/francia/bourgogne");
    expect(resolveLibraryLink("Burdeos", "region")?.path).toBe("/biblioteca-vino/regiones/francia/bordeaux");
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
    const riojaLinks = getStrategicWineLibraryLinks("region", "rioja");
    const pairingLinks = getStrategicWineLibraryLinks("pairing", "carnes-rojas");

    expect(xarelloLinks.map((link) => link.name)).toContain("Cava");
    expect(riojaLinks.map((link) => link.name)).toContain("Tempranillo");
    expect(pairingLinks.map((link) => link.name)).toContain("Tinto reserva");

    [...xarelloLinks, ...riojaLinks, ...pairingLinks].forEach((link) => {
      expect(resolveLibraryLink(link.name, link.hint), `${link.name} should resolve`).not.toBeNull();
    });
  });
});
