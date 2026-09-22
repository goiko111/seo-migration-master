import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  calculateProfitabilityDiagnosis,
  EMPTY_PROFITABILITY_ANSWERS,
  EXAMPLE_PROFITABILITY_ANSWERS,
  parseProfitabilityAnswer,
  prioritizeProfitabilityAreas,
  PROFITABILITY_AREAS,
} from "@/lib/profitability";

describe("profitability diagnosis", () => {
  it("keeps missing data separate from zero", () => {
    const result = calculateProfitabilityDiagnosis(EMPTY_PROFITABILITY_ANSWERS);
    expect(result.coverage).toBe(0);
    expect(result.results).toEqual({});
  });

  it("calculates the four example ranges independently", () => {
    const result = calculateProfitabilityDiagnosis(EXAMPLE_PROFITABILITY_ANSWERS);
    expect(result.coverage).toBe(4);
    expect(result.results.cost).toEqual({ low: 200, high: 400 });
    expect(result.results.margin).toEqual({ low: 280, high: 560 });
    expect(result.results.time).toEqual({ low: 6, high: 12 });
    expect(result.results.capital).toEqual({ low: 900, high: 1800 });
  });

  it("accepts decimal commas and rejects thousand separators", () => {
    expect(parseProfitabilityAnswer("10,5")).toBe(10.5);
    expect(() => parseProfitabilityAnswer("1.000,50")).toThrow();
  });

  it("rejects percentages above 100", () => {
    const result = calculateProfitabilityDiagnosis({
      ...EMPTY_PROFITABILITY_ANSWERS,
      purchases: "1000",
      purchaseLow: "20",
      purchaseHigh: "120",
    });
    expect(result.errors.purchaseHigh).toContain("100");
    expect(result.results.cost).toBeUndefined();
  });

  it("orders a negative contribution range from the larger loss to the smaller loss", () => {
    const result = calculateProfitabilityDiagnosis({
      ...EMPTY_PROFITABILITY_ANSWERS,
      unitPrice: "8",
      unitCost: "10",
      unitsLow: "10",
      unitsHigh: "20",
    });
    expect(result.results.margin).toEqual({ low: -40, high: -20 });
  });

  it("shows an explicit formula for every area", () => {
    Object.values(PROFITABILITY_AREAS).forEach((area) => {
      expect(area.formula.length).toBeGreaterThan(20);
    });
  });

  it("prioritizes three actions without inventing a total score", () => {
    expect(prioritizeProfitabilityAreas("time")).toEqual(["time", "capital", "cost"]);
  });

  it("keeps the human, bot and sitemap route in sync", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const worker = readFileSync("edge-router/winerim-pages-router.js", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const route = "/herramientas/diagnostico-rentabilidad-bodega";

    expect(app).toContain(route);
    expect(worker).toContain(route);
    expect(sitemap).toContain(`{ esPath: '${route}', priority: '0.8', changefreq: 'monthly', multilang: false }`);
    expect(prerender).toContain(`'${route}': {`);
  });
});
