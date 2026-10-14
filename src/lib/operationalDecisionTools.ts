export type DecisionCurrency = "EUR" | "USD" | "GBP";

export type OrderPurchasePolicy = "rotation" | "keep" | "optional" | "stop";
export type OrderSupplierStatus = "confirmed" | "check" | "unavailable";

export interface OrderPlannerRow {
  id: string;
  name: string;
  supplier: string;
  currentStock: number;
  weeklySales: number;
  sales90Days: number;
  leadDays: number;
  safetyDays: number;
  targetCoverDays: number;
  unitsPerCase: number;
  unitCost: number;
  eventDemand: number;
  purchasePolicy: OrderPurchasePolicy;
  supplierStatus: OrderSupplierStatus;
}

export interface OrderRecommendation extends OrderPlannerRow {
  recentDailySales: number;
  historicalDailySales: number;
  dailySales: number;
  daysCover: number | null;
  rawNeed: number;
  bottleRequirement: number;
  bottlesToOrder: number;
  casesToOrder: number;
  orderCost: number;
  preDeliveryShortfall: number;
  caseRoundingSurplus: number;
  caseRoundingCost: number;
  postOrderCoverDays: number | null;
  status: "urgent" | "order" | "hold";
  action: "find-alternative" | "urgent" | "strong" | "light" | "keep" | "optional" | "hold" | "stop";
  needsSupplierCheck: boolean;
}

export interface OrderPlanResult {
  rows: OrderRecommendation[];
  totalBottles: number;
  totalCases: number;
  totalCost: number;
  urgentCount: number;
  orderCount: number;
  holdCount: number;
  totalPreDeliveryShortfall: number;
  totalCaseRoundingSurplus: number;
  totalCaseRoundingCost: number;
  supplierCheckCount: number;
  stoppedCount: number;
}

export const calculateOrderPlan = (rows: OrderPlannerRow[]): OrderPlanResult => {
  const recommendations = rows.map((row) => {
    const weeklySales = Math.max(0, row.weeklySales);
    const sales90Days = Math.max(0, row.sales90Days);
    const currentStock = Math.max(0, row.currentStock);
    const leadDays = Math.max(0, row.leadDays);
    const safetyDays = Math.max(0, row.safetyDays);
    const targetCoverDays = Math.max(0, row.targetCoverDays);
    const eventDemand = Math.max(0, row.eventDemand);
    const unitsPerCase = Math.max(1, Math.round(row.unitsPerCase || 1));
    const recentDailySales = weeklySales / 7;
    const historicalDailySales = sales90Days / 90;
    // This public estimator protects against both a recent acceleration and a
    // slower reference with proven historical demand. SAVia can use richer,
    // connected context inside Winerim; this rule stays deliberately visible.
    const dailySales = Math.max(recentDailySales, historicalDailySales);
    const horizonDemand = dailySales * (leadDays + safetyDays + targetCoverDays) + eventDemand;
    const rawNeed = row.purchasePolicy === "stop" ? 0 : Math.max(0, horizonDemand - currentStock);
    const bottleRequirement = rawNeed > 0 ? Math.ceil(rawNeed) : 0;
    const casesToOrder = bottleRequirement > 0 ? Math.ceil(bottleRequirement / unitsPerCase) : 0;
    const roundedBottles = casesToOrder * unitsPerCase;
    const stockNeededBeforeDelivery = dailySales * leadDays + eventDemand;
    const preDeliveryShortfall = Math.max(0, stockNeededBeforeDelivery - currentStock);
    const caseRoundingSurplus = Math.max(0, roundedBottles - bottleRequirement);
    const daysCover = dailySales > 0 ? currentStock / dailySales : null;
    const postOrderCoverDays = dailySales > 0
      ? Math.max(0, currentStock + roundedBottles - eventDemand) / dailySales
      : null;
    const status = currentStock < stockNeededBeforeDelivery
      ? "urgent"
      : roundedBottles > 0
        ? "order"
        : "hold";
    const needsSupplierCheck = roundedBottles > 0 && row.supplierStatus !== "confirmed";
    const action = row.purchasePolicy === "stop"
      ? "stop"
      : roundedBottles === 0
        ? "hold"
        : row.supplierStatus === "unavailable"
          ? "find-alternative"
          : status === "urgent"
            ? "urgent"
            : row.purchasePolicy === "optional"
              ? "optional"
              : row.purchasePolicy === "keep"
                ? "keep"
                : casesToOrder >= 2
                  ? "strong"
                  : "light";

    return {
      ...row,
      currentStock,
      weeklySales,
      sales90Days,
      leadDays,
      safetyDays,
      targetCoverDays,
      unitsPerCase,
      unitCost: Math.max(0, row.unitCost),
      eventDemand,
      supplier: row.supplier.trim() || "—",
      purchasePolicy: row.purchasePolicy,
      supplierStatus: row.supplierStatus,
      recentDailySales,
      historicalDailySales,
      dailySales,
      daysCover,
      rawNeed,
      bottleRequirement,
      bottlesToOrder: roundedBottles,
      casesToOrder,
      orderCost: roundedBottles * Math.max(0, row.unitCost),
      preDeliveryShortfall,
      caseRoundingSurplus,
      caseRoundingCost: caseRoundingSurplus * Math.max(0, row.unitCost),
      postOrderCoverDays,
      status,
      action,
      needsSupplierCheck,
    } satisfies OrderRecommendation;
  }).sort((left, right) => {
    const priority = { "find-alternative": 0, urgent: 1, strong: 2, light: 3, keep: 4, optional: 5, hold: 6, stop: 7 } as const;
    return priority[left.action] - priority[right.action] || right.orderCost - left.orderCost;
  });

  return {
    rows: recommendations,
    totalBottles: recommendations.reduce((sum, row) => sum + row.bottlesToOrder, 0),
    totalCases: recommendations.reduce((sum, row) => sum + row.casesToOrder, 0),
    totalCost: recommendations.reduce((sum, row) => sum + row.orderCost, 0),
    urgentCount: recommendations.filter((row) => row.action === "urgent" || row.action === "find-alternative").length,
    orderCount: recommendations.filter((row) => !["hold", "stop"].includes(row.action)).length,
    holdCount: recommendations.filter((row) => row.action === "hold" || row.action === "stop").length,
    totalPreDeliveryShortfall: recommendations.reduce((sum, row) => sum + row.preDeliveryShortfall, 0),
    totalCaseRoundingSurplus: recommendations.reduce((sum, row) => sum + row.caseRoundingSurplus, 0),
    totalCaseRoundingCost: recommendations.reduce((sum, row) => sum + row.caseRoundingCost, 0),
    supplierCheckCount: recommendations.filter((row) => row.needsSupplierCheck).length,
    stoppedCount: recommendations.filter((row) => row.action === "stop").length,
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
  monthlyBottleEquivalent: number;
  overpourTenMlBottleEquivalent: number;
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
  targetCostPerGuest: number;
  costGapPerGuest: number;
  monthlyCostGap: number;
  monthlyBottleEquivalent: number;
  overpourTenMlBottleEquivalent: number;
  targetStatus: "within" | "over";
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
      monthlyBottleEquivalent: (pourMl * monthlyGuests) / bottleMl,
      overpourTenMlBottleEquivalent: (10 * monthlyGuests) / bottleMl,
    } satisfies PairingWineResult;
  });
  const costPerGuest = wines.reduce((sum, wine) => sum + wine.costPerGuest, 0);
  const revenue = Math.max(0, input.wineRevenuePerGuest);
  const targetPct = Math.min(100, Math.max(1, input.targetBeverageCostPct || 25));
  const targetCostPerGuest = revenue * (targetPct / 100);
  const costGapPerGuest = costPerGuest - targetCostPerGuest;

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
    targetCostPerGuest,
    costGapPerGuest,
    monthlyCostGap: costGapPerGuest * monthlyGuests,
    monthlyBottleEquivalent: wines.reduce((sum, wine) => sum + wine.monthlyBottleEquivalent, 0),
    overpourTenMlBottleEquivalent: wines.reduce((sum, wine) => sum + wine.overpourTenMlBottleEquivalent, 0),
    targetStatus: costPerGuest <= targetCostPerGuest ? "within" : "over",
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
  missingBottles: number;
  surplusBottles: number;
  missingCost: number;
  surplusCost: number;
  netVariance: number;
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
    missingBottles: lines.filter((row) => row.status === "missing").reduce((sum, row) => sum + Math.abs(row.variance), 0),
    surplusBottles: lines.filter((row) => row.status === "surplus").reduce((sum, row) => sum + row.variance, 0),
    missingCost: lines.filter((row) => row.status === "missing").reduce((sum, row) => sum + row.varianceCost, 0),
    surplusCost: lines.filter((row) => row.status === "surplus").reduce((sum, row) => sum + row.varianceCost, 0),
    netVariance: lines.reduce((sum, row) => sum + row.variance, 0),
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
  riskWindowDays: number;
  contributionProtectedBySubstitution: number;
  status: "risk" | "covered";
}

export interface StockoutRiskResult {
  rows: StockoutRiskLine[];
  riskCount: number;
  totalUnitsAtRisk: number;
  totalContributionAtRisk: number;
  totalEmergencyQuantity: number;
  totalPhysicalShortage: number;
  totalSubstitutedUnits: number;
  totalContributionProtectedBySubstitution: number;
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
    const effectiveCoverDays = dailySales > 0 ? Math.max(0, currentStock - eventDemand) / dailySales : 0;
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
      riskWindowDays: shortage > 0 ? Math.max(0, daysUntilDelivery - effectiveCoverDays) : 0,
      contributionProtectedBySubstitution: substitutedUnits * Math.max(0, row.contributionPerBottle),
      status: shortage > 0 ? "risk" : "covered",
    } satisfies StockoutRiskLine;
  }).sort((left, right) => right.contributionAtRisk - left.contributionAtRisk);

  return {
    rows: lines,
    riskCount: lines.filter((row) => row.status === "risk").length,
    totalUnitsAtRisk: lines.reduce((sum, row) => sum + row.lostUnits, 0),
    totalContributionAtRisk: lines.reduce((sum, row) => sum + row.contributionAtRisk, 0),
    totalEmergencyQuantity: lines.reduce((sum, row) => sum + row.emergencyQuantity, 0),
    totalPhysicalShortage: lines.reduce((sum, row) => sum + row.shortage, 0),
    totalSubstitutedUnits: lines.reduce((sum, row) => sum + row.substitutedUnits, 0),
    totalContributionProtectedBySubstitution: lines.reduce((sum, row) => sum + row.contributionProtectedBySubstitution, 0),
  };
};

export type TpvImpactTaskType = "operation" | "incident";

export interface TpvImpactTaskRow {
  id: string;
  name: string;
  type: TpvImpactTaskType;
  monthlyOccurrencesPerCenter: number;
  manualMinutesPerOccurrence: number;
  automationPct: number;
}

export interface TpvImpactInput {
  centers: number;
  hourlyCost: number;
  monthlyIntegrationCostPerCenter: number;
  setupCostPerCenter: number;
  tasks: TpvImpactTaskRow[];
}

export interface TpvImpactTaskResult extends TpvImpactTaskRow {
  manualHoursMonthly: number;
  integratedHoursMonthly: number;
  hoursRecoveredMonthly: number;
  occurrencesAvoidedMonthly: number;
}

export interface TpvIntegrationImpactResult {
  centers: number;
  tasks: TpvImpactTaskResult[];
  manualHoursMonthly: number;
  integratedHoursMonthly: number;
  hoursRecoveredMonthly: number;
  laborValueMonthly: number;
  recurringIntegrationCostMonthly: number;
  setupCostTotal: number;
  hasCommercialCost: boolean;
  netOperationalImpactMonthly: number | null;
  firstYearNetImpact: number | null;
  paybackMonths: number | null;
  incidentsAvoidedMonthly: number;
}

export const calculateTpvIntegrationImpact = (input: TpvImpactInput): TpvIntegrationImpactResult => {
  const centers = Math.min(100, Math.max(1, Math.round(input.centers || 1)));
  const hourlyCost = Math.max(0, input.hourlyCost);
  const monthlyIntegrationCostPerCenter = Math.max(0, input.monthlyIntegrationCostPerCenter);
  const setupCostPerCenter = Math.max(0, input.setupCostPerCenter);
  const tasks = input.tasks.map((task) => {
    const monthlyOccurrencesPerCenter = Math.max(0, task.monthlyOccurrencesPerCenter);
    const manualMinutesPerOccurrence = Math.max(0, task.manualMinutesPerOccurrence);
    const automationPct = Math.min(100, Math.max(0, task.automationPct));
    const manualHoursMonthly = monthlyOccurrencesPerCenter * manualMinutesPerOccurrence * centers / 60;
    const integratedHoursMonthly = manualHoursMonthly * (1 - automationPct / 100);
    const hoursRecoveredMonthly = Math.max(0, manualHoursMonthly - integratedHoursMonthly);
    return {
      ...task,
      monthlyOccurrencesPerCenter,
      manualMinutesPerOccurrence,
      automationPct,
      manualHoursMonthly,
      integratedHoursMonthly,
      hoursRecoveredMonthly,
      occurrencesAvoidedMonthly: task.type === "incident"
        ? monthlyOccurrencesPerCenter * centers * (automationPct / 100)
        : 0,
    } satisfies TpvImpactTaskResult;
  }).sort((left, right) => right.hoursRecoveredMonthly - left.hoursRecoveredMonthly);

  const manualHoursMonthly = tasks.reduce((sum, task) => sum + task.manualHoursMonthly, 0);
  const integratedHoursMonthly = tasks.reduce((sum, task) => sum + task.integratedHoursMonthly, 0);
  const hoursRecoveredMonthly = tasks.reduce((sum, task) => sum + task.hoursRecoveredMonthly, 0);
  const laborValueMonthly = hoursRecoveredMonthly * hourlyCost;
  const recurringIntegrationCostMonthly = monthlyIntegrationCostPerCenter * centers;
  const setupCostTotal = setupCostPerCenter * centers;
  const hasCommercialCost = recurringIntegrationCostMonthly > 0 || setupCostTotal > 0;
  const netOperationalImpactMonthly = hasCommercialCost
    ? laborValueMonthly - recurringIntegrationCostMonthly
    : null;
  const firstYearNetImpact = hasCommercialCost
    ? laborValueMonthly * 12 - recurringIntegrationCostMonthly * 12 - setupCostTotal
    : null;
  const paybackMonths = hasCommercialCost && setupCostTotal > 0 && netOperationalImpactMonthly !== null && netOperationalImpactMonthly > 0
    ? setupCostTotal / netOperationalImpactMonthly
    : null;

  return {
    centers,
    tasks,
    manualHoursMonthly,
    integratedHoursMonthly,
    hoursRecoveredMonthly,
    laborValueMonthly,
    recurringIntegrationCostMonthly,
    setupCostTotal,
    hasCommercialCost,
    netOperationalImpactMonthly,
    firstYearNetImpact,
    paybackMonths,
    incidentsAvoidedMonthly: tasks.reduce((sum, task) => sum + task.occurrencesAvoidedMonthly, 0),
  };
};

export const ORDER_EXAMPLE: OrderPlannerRow[] = [
  { id: "order-1", name: "Blanco de alta rotación", supplier: "Distribuidor Norte", currentStock: 8, weeklySales: 12, sales90Days: 126, leadDays: 3, safetyDays: 3, targetCoverDays: 14, unitsPerCase: 6, unitCost: 11, eventDemand: 6, purchasePolicy: "rotation", supplierStatus: "confirmed" },
  { id: "order-2", name: "Tinto reserva", supplier: "Bodega directa", currentStock: 18, weeklySales: 5, sales90Days: 72, leadDays: 5, safetyDays: 4, targetCoverDays: 14, unitsPerCase: 6, unitCost: 19, eventDemand: 0, purchasePolicy: "keep", supplierStatus: "check" },
  { id: "order-3", name: "Espumoso", supplier: "Distribuidor Centro", currentStock: 4, weeklySales: 3, sales90Days: 48, leadDays: 4, safetyDays: 3, targetCoverDays: 14, unitsPerCase: 6, unitCost: 15, eventDemand: 8, purchasePolicy: "rotation", supplierStatus: "unavailable" },
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

export const TPV_IMPACT_EXAMPLE: TpvImpactInput = {
  centers: 4,
  hourlyCost: 22,
  monthlyIntegrationCostPerCenter: 120,
  setupCostPerCenter: 300,
  tasks: [
    { id: "tpv-1", name: "Altas y cambios de artículos", type: "operation", monthlyOccurrencesPerCenter: 20, manualMinutesPerOccurrence: 8, automationPct: 95 },
    { id: "tpv-2", name: "Actualizaciones de precios", type: "operation", monthlyOccurrencesPerCenter: 30, manualMinutesPerOccurrence: 4, automationPct: 95 },
    { id: "tpv-3", name: "Conciliación de ventas y stock", type: "operation", monthlyOccurrencesPerCenter: 12, manualMinutesPerOccurrence: 35, automationPct: 80 },
    { id: "tpv-4", name: "Consolidación de centros e informes", type: "operation", monthlyOccurrencesPerCenter: 4, manualMinutesPerOccurrence: 60, automationPct: 85 },
    { id: "tpv-5", name: "Incidencias y reintentos manuales", type: "incident", monthlyOccurrencesPerCenter: 6, manualMinutesPerOccurrence: 30, automationPct: 70 },
  ],
};
