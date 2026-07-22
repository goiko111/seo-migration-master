import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  ALL_MARKET_SIZES,
  MARKET_TOTALS,
  PARTNER_MARKETS,
} from "@/data/partnerDeckData";

describe("international partner deck", () => {
  it("keeps the 13-country opportunity and 12 expansion playbooks complete", () => {
    expect(ALL_MARKET_SIZES).toHaveLength(13);
    expect(PARTNER_MARKETS).toHaveLength(12);
    expect(MARKET_TOTALS).toEqual({
      tam: 1_740_000,
      filtered: 1_194_000,
      sam: 477_600,
      som: 119_400,
    });

    for (const market of PARTNER_MARKETS) {
      expect(market.targetPartners.length).toBeGreaterThanOrEqual(3);
      expect(market.targetIntegrations.length).toBeGreaterThanOrEqual(2);
      expect(market.targetAnchors.length).toBeGreaterThanOrEqual(3);
      expect(market.execution.length).toBeGreaterThanOrEqual(4);
      expect(market.channelMix.reduce((total, item) => total + item.value, 0)).toBe(100);
      expect(market.risks).toHaveLength(3);
    }
  });

  it("keeps the partner story free of financing and monetary metrics", () => {
    const page = readFileSync(resolve(process.cwd(), "src/pages/PartnerDeck.tsx"), "utf8");
    const data = readFileSync(resolve(process.cwd(), "src/data/partnerDeckData.ts"), "utf8");
    const source = `${page}\n${data}`.toLowerCase();

    for (const forbidden of ["mrr", "arpa", "€", "presupuesto", "financiacion", "financiación", "equity", "enisa"])
      expect(source).not.toContain(forbidden);
    expect(source).not.toMatch(/\b(?:eur|usd)\b/);

    expect(source).toContain("volumen de restaurantes");
    expect(source).toContain("prioridad por mercado");
  });

  it("routes the deck through React and keeps it out of search indexes", () => {
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const router = readFileSync(resolve(process.cwd(), "edge-router/winerim-pages-router.js"), "utf8");
    const page = readFileSync(resolve(process.cwd(), "src/pages/PartnerDeck.tsx"), "utf8");

    expect(app).toContain('path="/deck"');
    expect(router).toContain('const PRIVATE_ROUTES = new Set(["/deck", "/presentacion-anterior"])');
    expect(router).toContain("NOINDEX_ROUTES");
    expect(router).toContain('if (REACT_ROUTES.has(path)) return "no-store, max-age=0"');
    expect(router).toContain('if (path.startsWith("/assets/")) return "public, max-age=31536000, immutable"');
    expect(page).toContain("noindex");
    expect(page).toContain('const DECK_VERSION = "partner-international-2026-07-r6"');
    expect(page).toContain('<PresentationLegacy embedded variant="current" partnerName={partner} />');
    expect(page).toContain("Partners objetivo");
    expect(page).toContain("Cuentas ancla objetivo");
  });

  it("uses current Winerim proof on slide 41 instead of the legacy Spain plan", () => {
    const page = readFileSync(resolve(process.cwd(), "src/pages/PartnerDeck.tsx"), "utf8");
    const data = readFileSync(resolve(process.cwd(), "src/data/partnerDeckData.ts"), "utf8");
    const source = `${page}\n${data}`;

    expect(source).toContain("El partner parte de producto, clientes y operacion reales");
    expect(source).toContain('value: "+2.000"');
    expect(source).toContain('value: "+1.000"');
    expect(source).toContain('value: "15"');
    expect(source).toContain('value: "6"');
    expect(source).toContain("CloudRIM, Margenes, Supply, RIMs y SAVia");
    expect(source).not.toContain("Expansion Andalucia y Valencia");
    expect(source).not.toContain("Prueba social");
  });
});
