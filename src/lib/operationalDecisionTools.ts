export type DecisionCurrency = "EUR" | "USD" | "GBP";

export interface OrderPlannerRow {
  id: string;
  name: string;
  currentStock: number;
  weeklySales: number;
  leadDays: number;
  safetyDays: number;
  targetCoverDays: number;
  unitsPerCase: number;
  unitCost: number;
  eventDemand: number;
}

export interface OrderRecommendation extends OrderPlannerRow {
  dailySales: number;
  daysCover: number | null;
  rawNeed: number;
  bottlesToOrder: number;
  casesToOrder: number;
  orderCost: number;
  postOrderCoverDays: number | null;
  status: "urgent" | "order" | "hold";
}

export interface OrderPlanResult {
  rows: OrderRecommendation[];
  totalBottles: number;
  totalCases: number;
  totalCost: number;
  urgentCount: number;
}

export const calculateOrderPlan = (rows: OrderPlannerRow[]): OrderPlanResult => {
  const recommendations = rows.map((row) => {
    const weeklySales = Math.max(0, row.weeklySales);
    const currentStock = Math.max(0, row.currentStock);
    const leadDays = Math.max(0, row.leadDays);
    const safetyDays = Math.max(0, row.safetyDays);
    const targetCoverDays = Math.max(0, row.targetCoverDays);
    const eventDemand = Math.max(0, row.eventDemand);
    const unitsPerCase = Math.max(1, Math.round(row.unitsPerCase || 1));
    const dailySales = weeklySales / 7;
    const horizonDemand = dailySales * (leadDays + safetyDays + targetCoverDays) + eventDemand;
    const rawNeed = Math.max(0, horizonDemand - currentStock);
    const bottlesToOrder = rawNeed > 0 ? Math.ceil(rawNeed) : 0;
    const casesToOrder = bottlesToOrder > 0 ? Math.ceil(bottlesToOrder / unitsPerCase) : 0;
    const roundedBottles = casesToOrder * unitsPerCase;
    const stockNeededBeforeDelivery = dailySales * leadDays + eventDemand;
    const daysCover = dailySales > 0 ? currentStock / dailySales : null;
    const postOrderCoverDays = dailySales > 0
      ? Math.max(0, currentStock + roundedBottles - eventDemand) / dailySales
      : null;
    const status = currentStock < stockNeededBeforeDelivery
      ? "urgent"
      : roundedBottles > 0
        ? "order"
        : "hold";

    return {
      ...row,
      currentStock,
      weeklySales,
      leadDays,
      safetyDays,
      targetCoverDays,
      unitsPerCase,
      unitCost: Math.max(0, row.unitCost),
      eventDemand,
      dailySales,
      daysCover,
      rawNeed,
      bottlesToOrder: roundedBottles,
      casesToOrder,
      orderCost: roundedBottles * Math.max(0, row.unitCost),
      postOrderCoverDays,
      status,
    } satisfies OrderRecommendation;
  }).sort((left, right) => {
    const urgency = { urgent: 0, order: 1, hold: 2 } as const;
    return urgency[left.status] - urgency[right.status] || right.orderCost - left.orderCost;
  });

  return {
    rows: recommendations,
    totalBottles: recommendations.reduce((sum, row) => sum + row.bottlesToOrder, 0),
    totalCases: recommendations.reduce((sum, row) => sum + row.casesToOrder, 0),
    totalCost: recommendations.reduce((sum, row) => sum + row.orderCost, 0),
    urgentCount: recommendations.filter((row) => row.status === "urgent").length,
  };
};

export interface PairingWineRow {
  id: string;
  name: string;
  bottleCost: number;
  bottleMl: number;
  pourMl: number;
}

export interface PairingProfitabilityInput {
  wineRevenuePerGuest: number;
  guestsPerService: number;
  servicesPerMonth: number;
  targetBeverageCostPct: number;
  wines: PairingWineRow[];
}

export interface PairingWineResult extends PairingWineRow {
  costPerGuest: number;
  bottlesPerService: number;
  overpourTenMlCostPerGuest: number;
}

export interface PairingProfitabilityResult {
  wines: PairingWineResult[];
  monthlyGuests: number;
  costPerGuest: number;
  contributionPerGuest: number;
  beverageCostPct: number | null;
  monthlyWineCost: number;
  monthlyContribution: number;
  minimumRevenueForTarget: number;
  overpourTenMlMonthlyImpact: number;
}

export const calculatePairingProfitability = (input: PairingProfitabilityInput): PairingProfitabilityResult => {
  const guestsPerService = Math.max(0, input.guestsPerService);
  const servicesPerMonth = Math.max(0, input.servicesPerMonth);
  const monthlyGuests = guestsPerService * servicesPerMonth;
  const wines = input.wines.map((wine) => {
    const bottleCost = Math.max(0, wine.bottleCost);
    const bottleMl = Math.max(1, wine.bottleMl || 750);
    const pourMl = Math.max(0, wine.pourMl);
    return {
      ...wine,
      bottleCost,
      bottleMl,
      pourMl,
      costPerGuest: bottleCost * (pourMl / bottleMl),
      bottlesPerService: Math.ceil((pourMl * guestsPerService) / bottleMl),
      overpourTenMlCostPerGuest: bottleCost * (10 / bottleMl),
    } satisfies PairingWineResult;
  });
  const costPerGuest = wines.reduce((sum, wine) => sum + wine.costPerGuest, 0);
  const revenue = Math.max(0, input.wineRevenuePerGuest);
  const targetPct = Math.min(100, Math.max(1, input.targetBeverageCostPct || 25));

  return {
    wines,
    monthlyGuests,
    costPerGuest,
    contributionPerGuest: revenue - costPerGuest,
    beverageCostPct: revenue > 0 ? (costPerGuest / revenue) * 100 : null,
    monthlyWineCost: costPerGuest * monthlyGuests,
    monthlyContribution: (revenue - costPerGuest) * monthlyGuests,
    minimumRevenueForTarget: costPerGuest / (targetPct / 100),
    overpourTenMlMonthlyImpact: wines.reduce((sum, wine) => sum + wine.overpourTenMlCostPerGuest, 0) * monthlyGuests,
  };
};

export interface StockReconciliationRow {
  id: string;
  name: string;
  openingStock: number;
  received: number;
  bottlesSold: number;
  glassesSold: number;
  glassesPerBottle: number;
  breakage: number;
  comps: number;
  actualStock: number;
  unitCost: number;
}

export interface StockReconciliationLine extends StockReconciliationRow {
  glassBottleEquivalent: number;
  theoreticalStock: number;
  variance: number;
  absoluteVariance: number;
  varianceCost: number;
  status: "missing" | "surplus" | "balanced";
}

export interface StockReconciliationResult {
  rows: StockReconciliationLine[];
  totalAbsoluteVariance: number;
  totalVarianceCost: number;
  mismatchCount: number;
}

export const calculateStockReconciliation = (
  rows: StockReconciliationRow[],
  tolerance = 0.25,
): StockReconciliationResult => {
  const lines = rows.map((row) => {
    const glassesPerBottle = Math.max(1, row.glassesPerBottle || 1);
    const glassBottleEquivalent = Math.max(0, row.glassesSold) / glassesPerBottle;
    const theoreticalStock = Math.max(0, row.openingStock)
      + Math.max(0, row.received)
      - Math.max(0, row.bottlesSold)
      - glassBottleEquivalent
      - Math.max(0, row.breakage)
      - Math.max(0, row.comps);
    const variance = Math.max(0, row.actualStock) - theoreticalStock;
    const absoluteVariance = Math.abs(variance);
    const status = variance < -tolerance ? "missing" : variance > tolerance ? "surplus" : "balanced";
    return {
      ...row,
      glassesPerBottle,
      glassBottleEquivalent,
      theoreticalStock,
      variance,
      absoluteVariance,
      varianceCost: absoluteVariance * Math.max(0, row.unitCost),
      status,
    } satisfies StockReconciliationLine;
  }).sort((left, right) => right.varianceCost - left.varianceCost);

  return {
    rows: lines,
    totalAbsoluteVariance: lines.reduce((sum, row) => sum + row.absoluteVariance, 0),
    totalVarianceCost: lines.reduce((sum, row) => sum + row.varianceCost, 0),
    mismatchCount: lines.filter((row) => row.status !== "balanced").length,
  };
};

export interface StockoutRiskRow {
  id: string;
  name: string;
  currentStock: number;
  dailySales: number;
  daysUntilDelivery: number;
  eventDemand: number;
  contributionPerBottle: number;
  substitutionPct: number;
}

export interface StockoutRiskLine extends StockoutRiskRow {
  daysCover: number | null;
  demandUntilDelivery: number;
  shortage: number;
  substitutedUnits: number;
  lostUnits: number;
  contributionAtRisk: number;
  emergencyQuantity: number;
  status: "risk" | "covered";
}

export interface StockoutRiskResult {
  rows: StockoutRiskLine[];
  riskCount: number;
  totalUnitsAtRisk: number;
  totalContributionAtRisk: number;
  totalEmergencyQuantity: number;
}

export const calculateStockoutRisk = (rows: StockoutRiskRow[]): StockoutRiskResult => {
  const lines = rows.map((row) => {
    const currentStock = Math.max(0, row.currentStock);
    const dailySales = Math.max(0, row.dailySales);
    const daysUntilDelivery = Math.max(0, row.daysUntilDelivery);
    const eventDemand = Math.max(0, row.eventDemand);
    const substitutionPct = Math.min(100, Math.max(0, row.substitutionPct));
    const demandUntilDelivery = dailySales * daysUntilDelivery + eventDemand;
    const shortage = Math.max(0, demandUntilDelivery - currentStock);
    const substitutedUnits = shortage * (substitutionPct / 100);
    const lostUnits = Math.max(0, shortage - substitutedUnits);
    const emergencyQuantity = shortage > 0 ? Math.ceil(shortage) : 0;
    return {
      ...row,
      currentStock,
      dailySales,
      daysUntilDelivery,
      eventDemand,
      contributionPerBottle: Math.max(0, row.contributionPerBottle),
      substitutionPct,
      daysCover: dailySales > 0 ? currentStock / dailySales : null,
      demandUntilDelivery,
      shortage,
      substitutedUnits,
      lostUnits,
      contributionAtRisk: lostUnits * Math.max(0, row.contributionPerBottle),
      emergencyQuantity,
      status: shortage > 0 ? "risk" : "covered",
    } satisfies StockoutRiskLine;
  }).sort((left, right) => right.contributionAtRisk - left.contributionAtRisk);

  return {
    rows: lines,
    riskCount: lines.filter((row) => row.status === "risk").length,
    totalUnitsAtRisk: lines.reduce((sum, row) => sum + row.lostUnits, 0),
    totalContributionAtRisk: lines.reduce((sum, row) => sum + row.contributionAtRisk, 0),
    totalEmergencyQuantity: lines.reduce((sum, row) => sum + row.emergencyQuantity, 0),
  };
};

export const ORDER_EXAMPLE: OrderPlannerRow[] = [
  { id: "order-1", name: "Blanco de alta rotación", currentStock: 8, weeklySales: 12, leadDays: 3, safetyDays: 3, targetCoverDays: 14, unitsPerCase: 6, unitCost: 11, eventDemand: 6 },
  { id: "order-2", name: "Tinto reserva", currentStock: 18, weeklySales: 5, leadDays: 5, safetyDays: 4, targetCoverDays: 14, unitsPerCase: 6, unitCost: 19, eventDemand: 0 },
  { id: "order-3", name: "Espumoso", currentStock: 4, weeklySales: 3, leadDays: 4, safetyDays: 3, targetCoverDays: 14, unitsPerCase: 6, unitCost: 15, eventDemand: 8 },
];

export const PAIRING_EXAMPLE: PairingProfitabilityInput = {
  wineRevenuePerGuest: 42,
  guestsPerService: 30,
  servicesPerMonth: 12,
  targetBeverageCostPct: 25,
  wines: [
    { id: "pairing-1", name: "Espumoso de bienvenida", bottleCost: 15, bottleMl: 750, pourMl: 75 },
    { id: "pairing-2", name: "Blanco", bottleCost: 13, bottleMl: 750, pourMl: 90 },
    { id: "pairing-3", name: "Tinto", bottleCost: 18, bottleMl: 750, pourMl: 90 },
  ],
};

export const RECONCILIATION_EXAMPLE: StockReconciliationRow[] = [
  { id: "recon-1", name: "Blanco por copa", openingStock: 18, received: 12, bottlesSold: 3, glassesSold: 48, glassesPerBottle: 6, breakage: 1, comps: 0, actualStock: 17, unitCost: 11 },
  { id: "recon-2", name: "Tinto reserva", openingStock: 14, received: 6, bottlesSold: 5, glassesSold: 6, glassesPerBottle: 6, breakage: 0, comps: 1, actualStock: 13, unitCost: 19 },
  { id: "recon-3", name: "Espumoso", openingStock: 9, received: 0, bottlesSold: 2, glassesSold: 0, glassesPerBottle: 6, breakage: 0, comps: 0, actualStock: 7, unitCost: 15 },
];

export const STOCKOUT_EXAMPLE: StockoutRiskRow[] = [
  { id: "stockout-1", name: "Blanco de alta rotación", currentStock: 5, dailySales: 2.2, daysUntilDelivery: 5, eventDemand: 4, contributionPerBottle: 32, substitutionPct: 25 },
  { id: "stockout-2", name: "Tinto reserva", currentStock: 14, dailySales: 1.1, daysUntilDelivery: 5, eventDemand: 0, contributionPerBottle: 48, substitutionPct: 40 },
  { id: "stockout-3", name: "Espumoso", currentStock: 4, dailySales: 0.8, daysUntilDelivery: 5, eventDemand: 6, contributionPerBottle: 36, substitutionPct: 20 },
];
