import { describe, expect, it } from "vitest";
import {
  calculateOrderPlan,
  calculatePairingProfitability,
  calculateStockoutRisk,
  calculateStockReconciliation,
  type OrderPlannerRow,
} from "@/lib/operationalDecisionTools";

describe("operational decision tools", () => {
  it("rounds the weekly order to complete cases and identifies urgent references", () => {
    const row: OrderPlannerRow = {
      id: "one", name: "House white", currentStock: 3, weeklySales: 7,
      leadDays: 5, safetyDays: 2, targetCoverDays: 7, unitsPerCase: 6,
      unitCost: 10, eventDemand: 2,
    };
    const result = calculateOrderPlan([row]);

    expect(result.rows[0]).toMatchObject({ bottlesToOrder: 18, casesToOrder: 3, orderCost: 180, status: "urgent" });
    expect(result.totalCost).toBe(180);
  });

  it("does not recommend stock for a reference without demand", () => {
    const result = calculateOrderPlan([{
      id: "one", name: "No demand", currentStock: 4, weeklySales: 0,
      leadDays: 5, safetyDays: 2, targetCoverDays: 14, unitsPerCase: 6,
      unitCost: 10, eventDemand: 0,
    }]);
    expect(result.rows[0]).toMatchObject({ bottlesToOrder: 0, casesToOrder: 0, status: "hold", daysCover: null });
  });

  it("keeps pairing cost, contribution and overpour impact separate", () => {
    const result = calculatePairingProfitability({
      wineRevenuePerGuest: 30,
      guestsPerService: 20,
      servicesPerMonth: 10,
      targetBeverageCostPct: 25,
      wines: [{ id: "one", name: "Wine", bottleCost: 15, bottleMl: 750, pourMl: 100 }],
    });
    expect(result.costPerGuest).toBe(2);
    expect(result.contributionPerGuest).toBe(28);
    expect(result.monthlyContribution).toBe(5600);
    expect(result.minimumRevenueForTarget).toBe(8);
    expect(result.overpourTenMlMonthlyImpact).toBe(40);
  });

  it("calculates theoretical stock from bottles and glass equivalents", () => {
    const result = calculateStockReconciliation([{
      id: "one", name: "Wine", openingStock: 20, received: 6, bottlesSold: 4,
      glassesSold: 12, glassesPerBottle: 6, breakage: 1, comps: 1,
      actualStock: 10, unitCost: 15,
    }]);
    expect(result.rows[0]).toMatchObject({ glassBottleEquivalent: 2, theoreticalStock: 18, variance: -8, varianceCost: 120, status: "missing" });
    expect(result.mismatchCount).toBe(1);
  });

  it("treats quarter-bottle differences as balanced", () => {
    const result = calculateStockReconciliation([{
      id: "one", name: "Wine", openingStock: 10, received: 0, bottlesSold: 0,
      glassesSold: 1, glassesPerBottle: 6, breakage: 0, comps: 0,
      actualStock: 10, unitCost: 12,
    }]);
    expect(result.rows[0].status).toBe("balanced");
  });

  it("discounts substitution from contribution at risk without hiding the shortage", () => {
    const result = calculateStockoutRisk([{
      id: "one", name: "Wine", currentStock: 5, dailySales: 2,
      daysUntilDelivery: 5, eventDemand: 3, contributionPerBottle: 20,
      substitutionPct: 25,
    }]);
    expect(result.rows[0]).toMatchObject({ demandUntilDelivery: 13, shortage: 8, substitutedUnits: 2, lostUnits: 6, contributionAtRisk: 120, emergencyQuantity: 8, status: "risk" });
  });
});
