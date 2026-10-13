import { describe, expect, it } from "vitest";
import {
  calculateWineWaste,
  EMPTY_WINE_WASTE_ANSWERS,
  EXAMPLE_WINE_WASTE_ANSWERS,
  type WineWasteAnswers,
} from "@/lib/wineWaste";

const valid = (patch: Partial<WineWasteAnswers> = {}): WineWasteAnswers => ({
  ...EMPTY_WINE_WASTE_ANSWERS,
  averageBottleCost: "10",
  ...patch,
});

describe("wine waste calculator", () => {
  it("matches the fictional 90 EUR monthly example", () => {
    const result = calculateWineWaste(EXAMPLE_WINE_WASTE_ANSWERS);
    expect(result.monthlyCost).toBeCloseTo(90);
    expect(result.annualCost).toBeCloseTo(1080);
    expect(result.lostGlasses).toBeCloseTo(30);
    expect(result.expiryGlasses).toBeCloseTo(6);
    expect(result.generousPourGlasses).toBeCloseTo(0);
    expect(result.unexplainedGlasses).toBeCloseTo(24);
    expect(result.unbilledSales).toBeCloseTo(120);
  });

  it("warns and never creates negative waste when charged glasses exceed expected", () => {
    const result = calculateWineWaste(valid({ glassBottlesOpened: "10", chargedGlasses: "70" }));
    expect(result.warnings).toContain("charged_exceeds_expected");
    expect(result.lostGlasses).toBe(0);
    expect(result.monthlyCost).toBe(0);
  });

  it("attributes generous pours without exceeding total lost glasses", () => {
    const result = calculateWineWaste(valid({
      glassBottlesOpened: "10",
      glassBottleCost: "10",
      chargedGlasses: "40",
      discardedGlassBottles: "0",
      actualPourMl: "150",
    }));
    expect(result.expectedGlasses).toBe(60);
    expect(result.lostGlasses).toBe(20);
    expect(result.generousPourGlasses).toBeCloseTo(10);
    expect(result.unexplainedGlasses).toBeCloseTo(10);
  });

  it("calculates whole-bottle waste without by-the-glass inputs", () => {
    const result = calculateWineWaste(valid({
      sellsByGlass: false,
      brokenBottles: "2",
      unregisteredBottles: "1",
      inventoryDifferenceBottles: "1",
    }));
    expect(result.monthlyCost).toBe(40);
    expect(result.expectedGlasses).toBe(0);
  });

  it("does not show a purchase percentage without monthly purchases", () => {
    const result = calculateWineWaste(valid({ sellsByGlass: false, brokenBottles: "1" }));
    expect(result.wastePercentOfPurchases).toBeNull();
  });

  it("keeps every calculated result non-negative", () => {
    const result = calculateWineWaste(valid({
      glassBottlesOpened: "1",
      chargedGlasses: "99",
      discardedGlassBottles: "20",
      actualPourMl: "250",
      brokenBottles: "0",
      deliveryErrorPercent: "0",
    }));
    expect(result.monthlyCost).toBeGreaterThanOrEqual(0);
    expect(result.breakdown.every((item) => item.amount >= 0 && item.units >= 0)).toBe(true);
  });
});
