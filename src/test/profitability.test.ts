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
import { getBeverageCostHealth } from "@/lib/wineMarginHealth";

describe("wine-list profitability diagnosis", () => {
  it("keeps missing data separate from zero", () => {
    const result = calculateProfitabilityDiagnosis(EMPTY_PROFITABILITY_ANSWERS);
    expect(result.coverage).toBe(0);
    expect(result.results).toEqual({});
  });

  it("calculates bottle, glass, capital and scenario independently", () => {
    const result = calculateProfitabilityDiagnosis(EXAMPLE_PROFITABILITY_ANSWERS);
    expect(result.coverage).toBe(4);
    expect(result.results.bottle).toEqual({
      grossMarginPerBottle: 24,
      marginPercent: 66.67,
      beverageCostPercent: 33.33,
      monthlyContribution: 720,
    });
    expect(result.results.glass).toEqual({
      effectiveGlasses: 5.4,
      revenuePerBottle: 37.8,
      grossContributionPerBottle: 25.8,
      beverageCostPercent: 31.75,
      breakEvenGlasses: 2,
    });
    expect(result.results.capital).toEqual({ tiedCapital: 600, estimatedRelease: 150 });
    expect(result.results.scenario).toEqual({
      currentMonthlyContribution: 720,
      scenarioMonthlyContribution: 936,
      contributionDelta: 216,
      volumeChangePercent: 20,
      currentBeverageCostPercent: 33.33,
      scenarioBeverageCostPercent: 31.58,
      reorderPointUnits: 13,
      stockCoverageDays: 16.67,
    });
  });

  it("accepts decimal commas and rejects separators or negative values", () => {
    expect(parseProfitabilityAnswer("10,5")).toBe(10.5);
    expect(() => parseProfitabilityAnswer("1.000,50")).toThrow();
    expect(() => parseProfitabilityAnswer("-1")).toThrow();
  });

  it("rejects invalid percentages and zero divisors without hiding other blocks", () => {
    const result = calculateProfitabilityDiagnosis({
      ...EXAMPLE_PROFITABILITY_ANSWERS,
      glassWastePercent: "100",
      bottlePvp: "0",
    });
    expect(result.errors.glassWastePercent).toContain("inferior");
    expect(result.errors.bottlePvp).toContain("mayor");
    expect(result.results.bottle).toBeUndefined();
    expect(result.results.glass).toBeUndefined();
    expect(result.results.capital).toBeDefined();
    expect(result.results.scenario).toBeDefined();
  });

  it("handles a zero-volume scenario without inventing a rotation percentage", () => {
    const result = calculateProfitabilityDiagnosis({
      ...EXAMPLE_PROFITABILITY_ANSWERS,
      currentUnitsMonth: "0",
      scenarioUnitsMonth: "0",
    });
    expect(result.results.scenario?.volumeChangePercent).toBeNull();
    expect(result.results.scenario?.stockCoverageDays).toBeNull();
    expect(result.results.scenario?.reorderPointUnits).toBe(4);
  });

  it("shows an explicit formula for every area and labels provenance", () => {
    Object.values(PROFITABILITY_AREAS).forEach((area) => expect(area.formula.length).toBeGreaterThan(30));
    const result = calculateProfitabilityDiagnosis(EXAMPLE_PROFITABILITY_ANSWERS);
    expect(result.sources).toEqual({
      inputs: "entered",
      outputs: "calculated",
      operationalData: "verified",
      verifiedConnected: false,
    });
  });

  it("prioritizes three actions without inventing a total score", () => {
    expect(prioritizeProfitabilityAreas("capital")).toEqual(["capital", "scenario", "bottle"]);
  });

  it("marks 34.5% Beverage Cost for review, not as a contradictory overall success", () => {
    expect(getBeverageCostHealth(28)).toBe("good");
    expect(getBeverageCostHealth(34.5)).toBe("warning");
    expect(getBeverageCostHealth(36)).toBe("danger");
    const calculator = readFileSync("src/pages/CalculadoraMargen.tsx", "utf8");
    expect(calculator).toContain('bcWarning: "A revisar"');
    expect(calculator).not.toContain('bcWarning: "En riesgo"');
    expect(calculator).not.toContain("Mejora del margen bruto medio entre un 5-15%");
  });

  it("keeps the human, bot and sitemap route in sync", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const edgeRouter = readFileSync("edge-router/winerim-pages-router.js", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const route = "/herramientas/diagnostico-rentabilidad-bodega";
    const enRoute = "/en/tools/wine-cellar-profitability-diagnostic";

    expect(app).toContain(route);
    expect(app).toContain(enRoute);
    expect(edgeRouter).toContain(route);
    expect(edgeRouter).toContain(enRoute);
    expect(worker).toContain(route);
    expect(worker).toContain(enRoute);
    expect(sitemap).toContain(`{ esPath: '${route}', priority: '0.8', changefreq: 'monthly', multilang: false }`);
    expect(sitemap).toContain(`{ esPath: '${enRoute}', priority: '0.8', changefreq: 'monthly', multilang: false }`);
    expect(prerender).toContain(`'${route}': {`);
    expect(prerender).toContain(`'${enRoute}': {`);
  });
});
