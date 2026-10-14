import { describe, expect, it } from "vitest";
import {
  calculateOrderPlan,
  calculatePairingProfitability,
  calculateStockoutRisk,
  calculateStockReconciliation,
  calculateTpvIntegrationImpact,
  TPV_IMPACT_EXAMPLE,
  type OrderPlannerRow,
} from "@/lib/operationalDecisionTools";

describe("operational decision tools", () => {
  it("rounds the weekly order to complete cases and identifies urgent references", () => {
    const row: OrderPlannerRow = {
      id: "one", name: "House white", supplier: "Supplier", currentStock: 3, weeklySales: 7, sales90Days: 90,
      leadDays: 5, safetyDays: 2, targetCoverDays: 7, unitsPerCase: 6,
      unitCost: 10, eventDemand: 2, purchasePolicy: "rotation", supplierStatus: "confirmed",
    };
    const result = calculateOrderPlan([row]);

    expect(result.rows[0]).toMatchObject({ bottleRequirement: 13, bottlesToOrder: 18, casesToOrder: 3, orderCost: 180, preDeliveryShortfall: 4, caseRoundingSurplus: 5, caseRoundingCost: 50, status: "urgent" });
    expect(result.totalCost).toBe(180);
    expect(result.totalCaseRoundingSurplus).toBe(5);
    expect(result.totalPreDeliveryShortfall).toBe(4);
  });

  it("does not recommend stock for a reference without demand", () => {
    const result = calculateOrderPlan([{
      id: "one", name: "No demand", currentStock: 4, weeklySales: 0,
      leadDays: 5, safetyDays: 2, targetCoverDays: 14, unitsPerCase: 6,
      unitCost: 10, eventDemand: 0, supplier: "Supplier", sales90Days: 0,
      purchasePolicy: "rotation", supplierStatus: "confirmed",
    }]);
    expect(result.rows[0]).toMatchObject({ bottlesToOrder: 0, casesToOrder: 0, status: "hold", daysCover: null });
  });

  it("uses proven 90-day rotation when the latest week has no sales", () => {
    const result = calculateOrderPlan([{
      id: "one", name: "Occasional premium", supplier: "Winery", currentStock: 1,
      weeklySales: 0, sales90Days: 18, leadDays: 5, safetyDays: 2,
      targetCoverDays: 14, unitsPerCase: 6, unitCost: 25, eventDemand: 0,
      purchasePolicy: "keep", supplierStatus: "check",
    }]);

    expect(result.rows[0]).toMatchObject({ historicalDailySales: 0.2, dailySales: 0.2, casesToOrder: 1, action: "keep", needsSupplierCheck: true });
    expect(result.supplierCheckCount).toBe(1);
  });

  it("respects a human decision not to restock", () => {
    const result = calculateOrderPlan([{
      id: "one", name: "Delisted wine", supplier: "Supplier", currentStock: 0,
      weeklySales: 14, sales90Days: 100, leadDays: 5, safetyDays: 2,
      targetCoverDays: 14, unitsPerCase: 6, unitCost: 10, eventDemand: 0,
      purchasePolicy: "stop", supplierStatus: "confirmed",
    }]);

    expect(result.rows[0]).toMatchObject({ bottlesToOrder: 0, casesToOrder: 0, action: "stop" });
    expect(result.stoppedCount).toBe(1);
    expect(result.urgentCount).toBe(0);
  });

  it("keeps the need visible when the supplier is unavailable", () => {
    const result = calculateOrderPlan([{
      id: "one", name: "Unavailable wine", supplier: "Supplier", currentStock: 0,
      weeklySales: 7, sales90Days: 60, leadDays: 3, safetyDays: 2,
      targetCoverDays: 14, unitsPerCase: 6, unitCost: 10, eventDemand: 0,
      purchasePolicy: "rotation", supplierStatus: "unavailable",
    }]);

    expect(result.rows[0]).toMatchObject({ action: "find-alternative", needsSupplierCheck: true });
    expect(result.rows[0].bottlesToOrder).toBeGreaterThan(0);
    expect(result.supplierCheckCount).toBe(1);
    expect(result.urgentCount).toBe(1);
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
    expect(result.targetCostPerGuest).toBe(7.5);
    expect(result.costGapPerGuest).toBe(-5.5);
    expect(result.monthlyBottleEquivalent).toBeCloseTo(26.67, 2);
    expect(result.overpourTenMlBottleEquivalent).toBeCloseTo(2.67, 2);
    expect(result.targetStatus).toBe("within");
  });

  it("calculates theoretical stock from bottles and glass equivalents", () => {
    const result = calculateStockReconciliation([{
      id: "one", name: "Wine", openingStock: 20, received: 6, bottlesSold: 4,
      glassesSold: 12, glassesPerBottle: 6, breakage: 1, comps: 1,
      actualStock: 10, unitCost: 15,
    }]);
    expect(result.rows[0]).toMatchObject({ glassBottleEquivalent: 2, theoreticalStock: 18, variance: -8, varianceCost: 120, status: "missing" });
    expect(result.mismatchCount).toBe(1);
    expect(result.missingBottles).toBe(8);
    expect(result.missingCost).toBe(120);
    expect(result.surplusBottles).toBe(0);
  });

  it("treats quarter-bottle differences as balanced", () => {
    const result = calculateStockReconciliation([{
      id: "one", name: "Wine", openingStock: 10, received: 0, bottlesSold: 0,
      glassesSold: 1, glassesPerBottle: 6, breakage: 0, comps: 0,
      actualStock: 10, unitCost: 12,
    }]);
    expect(result.rows[0].status).toBe("balanced");
  });

  it("keeps missing and surplus stock separate instead of cancelling the operational problem", () => {
    const result = calculateStockReconciliation([
      { id: "missing", name: "Missing", openingStock: 10, received: 0, bottlesSold: 0, glassesSold: 0, glassesPerBottle: 6, breakage: 0, comps: 0, actualStock: 8, unitCost: 10 },
      { id: "surplus", name: "Surplus", openingStock: 10, received: 0, bottlesSold: 0, glassesSold: 0, glassesPerBottle: 6, breakage: 0, comps: 0, actualStock: 12, unitCost: 20 },
    ]);

    expect(result.netVariance).toBe(0);
    expect(result.missingBottles).toBe(2);
    expect(result.surplusBottles).toBe(2);
    expect(result.missingCost).toBe(20);
    expect(result.surplusCost).toBe(40);
    expect(result.totalAbsoluteVariance).toBe(4);
  });

  it("discounts substitution from contribution at risk without hiding the shortage", () => {
    const result = calculateStockoutRisk([{
      id: "one", name: "Wine", currentStock: 5, dailySales: 2,
      daysUntilDelivery: 5, eventDemand: 3, contributionPerBottle: 20,
      substitutionPct: 25,
    }]);
    expect(result.rows[0]).toMatchObject({ demandUntilDelivery: 13, shortage: 8, substitutedUnits: 2, lostUnits: 6, contributionAtRisk: 120, contributionProtectedBySubstitution: 40, emergencyQuantity: 8, riskWindowDays: 4, status: "risk" });
    expect(result.totalPhysicalShortage).toBe(8);
    expect(result.totalSubstitutedUnits).toBe(2);
    expect(result.totalContributionProtectedBySubstitution).toBe(40);
  });

  it("scales POS integration workload by center and keeps time from commercial cost", () => {
    const result = calculateTpvIntegrationImpact(TPV_IMPACT_EXAMPLE);

    expect(result.centers).toBe(4);
    expect(result.manualHoursMonthly).toBeCloseTo(74.67, 2);
    expect(result.integratedHoursMonthly).toBeCloseTo(12.53, 2);
    expect(result.hoursRecoveredMonthly).toBeCloseTo(62.13, 2);
    expect(result.laborValueMonthly).toBeCloseTo(1366.93, 2);
    expect(result.recurringIntegrationCostMonthly).toBe(480);
    expect(result.setupCostTotal).toBe(1200);
  });

  it("only calculates net impact and payback when commercial cost is supplied", () => {
    const withoutPrice = calculateTpvIntegrationImpact({
      ...TPV_IMPACT_EXAMPLE,
      monthlyIntegrationCostPerCenter: 0,
      setupCostPerCenter: 0,
    });
    const withPrice = calculateTpvIntegrationImpact(TPV_IMPACT_EXAMPLE);

    expect(withoutPrice.hasCommercialCost).toBe(false);
    expect(withoutPrice.netOperationalImpactMonthly).toBeNull();
    expect(withoutPrice.paybackMonths).toBeNull();
    expect(withPrice.netOperationalImpactMonthly).toBeCloseTo(886.93, 2);
    expect(withPrice.firstYearNetImpact).toBeCloseTo(9443.2, 1);
    expect(withPrice.paybackMonths).toBeCloseTo(1.35, 2);
  });

  it("counts avoided incidents only for rows explicitly marked as incidents", () => {
    const result = calculateTpvIntegrationImpact(TPV_IMPACT_EXAMPLE);

    expect(result.incidentsAvoidedMonthly).toBeCloseTo(16.8, 1);
    expect(result.tasks.find((task) => task.id === "tpv-3")?.occurrencesAvoidedMonthly).toBe(0);
    expect(result.tasks.find((task) => task.id === "tpv-5")?.occurrencesAvoidedMonthly).toBeCloseTo(16.8, 1);
  });
});
