export const WINE_WASTE_MODEL_VERSION = "1.0.0";

export const WINE_WASTE_BASELINES = {
  targetPourMl: 125,
  theoreticalGlassesPerBottle: 6,
  baseGlassYield: 0.86,
  remainingGlassesPerDiscardedBottle: 2,
  unknownBottleCost: 9,
} as const;

export type WineWasteCurrency = "EUR" | "USD" | "GBP";
export type WineWasteProfile = "restaurant" | "wineBar" | "hotel" | "group";
export type WineWasteSource =
  | "unexplainedGlasses"
  | "expiry"
  | "generousPour"
  | "breakage"
  | "unregistered"
  | "inventory"
  | "deliveryErrors";

export interface WineWasteAnswers {
  profile: WineWasteProfile;
  currency: WineWasteCurrency;
  monthlyPurchases: string;
  averageBottleCost: string;
  sellsByGlass: boolean;
  glassBottlesOpened: string;
  glassBottleCost: string;
  glassPrice: string;
  theoreticalGlassesPerBottle: string;
  chargedGlasses: string;
  estimateChargedGlasses: boolean;
  discardedGlassBottles: string;
  remainingGlassesPerDiscardedBottle: string;
  actualPourMl: string;
  targetPourMl: string;
  brokenBottles: string;
  unregisteredBottles: string;
  inventoryDifferenceBottles: string;
  deliveryErrorPercent: string;
}

export interface WineWasteBreakdownItem {
  source: WineWasteSource;
  amount: number;
  units: number;
}

export interface WineWasteResult {
  monthlyCost: number;
  annualCost: number;
  unbilledSales: number;
  wastePercentOfPurchases: number | null;
  expectedGlasses: number;
  chargedGlasses: number;
  lostGlasses: number;
  expiryGlasses: number;
  generousPourGlasses: number;
  unexplainedGlasses: number;
  glassYield: number | null;
  breakdown: WineWasteBreakdownItem[];
  warnings: Array<"charged_exceeds_expected">;
  usedEstimatedChargedGlasses: boolean;
}

export const EMPTY_WINE_WASTE_ANSWERS: WineWasteAnswers = {
  profile: "restaurant",
  currency: "EUR",
  monthlyPurchases: "",
  averageBottleCost: "",
  sellsByGlass: true,
  glassBottlesOpened: "",
  glassBottleCost: "",
  glassPrice: "",
  theoreticalGlassesPerBottle: String(WINE_WASTE_BASELINES.theoreticalGlassesPerBottle),
  chargedGlasses: "",
  estimateChargedGlasses: false,
  discardedGlassBottles: "",
  remainingGlassesPerDiscardedBottle: String(WINE_WASTE_BASELINES.remainingGlassesPerDiscardedBottle),
  actualPourMl: "",
  targetPourMl: String(WINE_WASTE_BASELINES.targetPourMl),
  brokenBottles: "",
  unregisteredBottles: "",
  inventoryDifferenceBottles: "",
  deliveryErrorPercent: "",
};

export const EXAMPLE_WINE_WASTE_ANSWERS: WineWasteAnswers = {
  ...EMPTY_WINE_WASTE_ANSWERS,
  averageBottleCost: "9",
  glassBottlesOpened: "30",
  glassBottleCost: "9",
  glassPrice: "5",
  chargedGlasses: "150",
  discardedGlassBottles: "3",
  brokenBottles: "2",
  unregisteredBottles: "2",
  inventoryDifferenceBottles: "1",
};

const numericKeys: Array<keyof WineWasteAnswers> = [
  "monthlyPurchases",
  "averageBottleCost",
  "glassBottlesOpened",
  "glassBottleCost",
  "glassPrice",
  "theoreticalGlassesPerBottle",
  "chargedGlasses",
  "discardedGlassBottles",
  "remainingGlassesPerDiscardedBottle",
  "actualPourMl",
  "targetPourMl",
  "brokenBottles",
  "unregisteredBottles",
  "inventoryDifferenceBottles",
  "deliveryErrorPercent",
];

export function parseWineWasteNumber(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (!normalized) return null;
  if (!/^\d+(?:\.\d+)?$/.test(normalized)) {
    throw new Error("positive_number");
  }
  const value = Number(normalized);
  if (!Number.isFinite(value) || value > 1e9) throw new Error("value_too_large");
  return value;
}

export function validateWineWasteAnswers(answers: WineWasteAnswers) {
  const errors: Partial<Record<keyof WineWasteAnswers, "positive_number" | "value_too_large" | "required" | "max_100">> = {};
  const values: Partial<Record<keyof WineWasteAnswers, number | null>> = {};

  numericKeys.forEach((key) => {
    try {
      values[key] = parseWineWasteNumber(String(answers[key] ?? ""));
    } catch (error) {
      errors[key] = error instanceof Error && error.message === "value_too_large" ? "value_too_large" : "positive_number";
      values[key] = null;
    }
  });

  if (!values.averageBottleCost || values.averageBottleCost <= 0) errors.averageBottleCost = "required";
  if (answers.sellsByGlass) {
    if (!values.theoreticalGlassesPerBottle || values.theoreticalGlassesPerBottle <= 0) errors.theoreticalGlassesPerBottle = "required";
    if (!values.targetPourMl || values.targetPourMl <= 0) errors.targetPourMl = "required";
  }
  if ((values.deliveryErrorPercent ?? 0) > 100) errors.deliveryErrorPercent = "max_100";

  return { errors, values };
}

const valueOrZero = (value: number | null | undefined) => value ?? 0;

export function calculateWineWaste(answers: WineWasteAnswers): WineWasteResult {
  const { errors, values } = validateWineWasteAnswers(answers);
  if (Object.keys(errors).length > 0) throw new Error("invalid_answers");

  const averageBottleCost = valueOrZero(values.averageBottleCost);
  const monthlyPurchases = values.monthlyPurchases ?? null;
  let expectedGlasses = 0;
  let chargedGlasses = 0;
  let lostGlasses = 0;
  let expiryGlasses = 0;
  let generousPourGlasses = 0;
  let unexplainedGlasses = 0;
  let glassYield: number | null = null;
  let glassCost = 0;
  let unbilledSales = 0;
  const warnings: WineWasteResult["warnings"] = [];

  if (answers.sellsByGlass) {
    const bottles = valueOrZero(values.glassBottlesOpened);
    const theoretical = valueOrZero(values.theoreticalGlassesPerBottle);
    expectedGlasses = bottles * theoretical;
    chargedGlasses = answers.estimateChargedGlasses
      ? expectedGlasses * WINE_WASTE_BASELINES.baseGlassYield
      : valueOrZero(values.chargedGlasses);

    if (chargedGlasses > expectedGlasses && expectedGlasses > 0) warnings.push("charged_exceeds_expected");
    lostGlasses = Math.max(0, expectedGlasses - chargedGlasses);
    expiryGlasses = Math.min(
      valueOrZero(values.discardedGlassBottles) * valueOrZero(values.remainingGlassesPerDiscardedBottle),
      lostGlasses,
    );

    const actualPour = valueOrZero(values.actualPourMl);
    const targetPour = valueOrZero(values.targetPourMl);
    const remainingAfterExpiry = Math.max(0, lostGlasses - expiryGlasses);
    if (actualPour > targetPour) {
      generousPourGlasses = Math.min(
        Math.max(0, bottles * (theoretical - 750 / actualPour)),
        remainingAfterExpiry,
      );
    }
    unexplainedGlasses = Math.max(0, lostGlasses - expiryGlasses - generousPourGlasses);
    const glassBottleCost = values.glassBottleCost ?? averageBottleCost;
    glassCost = theoretical > 0 ? lostGlasses * (valueOrZero(glassBottleCost) / theoretical) : 0;
    unbilledSales = (generousPourGlasses + unexplainedGlasses) * valueOrZero(values.glassPrice);
    glassYield = expectedGlasses > 0 ? chargedGlasses / expectedGlasses : null;
  }

  const bottleCost = (
    valueOrZero(values.brokenBottles)
    + valueOrZero(values.unregisteredBottles)
    + valueOrZero(values.inventoryDifferenceBottles)
  ) * averageBottleCost;
  const deliveryCost = monthlyPurchases !== null && values.deliveryErrorPercent !== null
    ? monthlyPurchases * valueOrZero(values.deliveryErrorPercent) / 100
    : 0;
  const monthlyCost = Math.max(0, glassCost + bottleCost + deliveryCost);

  const glassCostPerGlass = valueOrZero(values.theoreticalGlassesPerBottle) > 0
    ? valueOrZero(values.glassBottleCost ?? values.averageBottleCost) / valueOrZero(values.theoreticalGlassesPerBottle)
    : 0;
  const breakdown: WineWasteBreakdownItem[] = [
    { source: "unexplainedGlasses", amount: unexplainedGlasses * glassCostPerGlass, units: unexplainedGlasses },
    { source: "expiry", amount: expiryGlasses * glassCostPerGlass, units: expiryGlasses },
    { source: "generousPour", amount: generousPourGlasses * glassCostPerGlass, units: generousPourGlasses },
    { source: "breakage", amount: valueOrZero(values.brokenBottles) * averageBottleCost, units: valueOrZero(values.brokenBottles) },
    { source: "unregistered", amount: valueOrZero(values.unregisteredBottles) * averageBottleCost, units: valueOrZero(values.unregisteredBottles) },
    { source: "inventory", amount: valueOrZero(values.inventoryDifferenceBottles) * averageBottleCost, units: valueOrZero(values.inventoryDifferenceBottles) },
    { source: "deliveryErrors", amount: deliveryCost, units: valueOrZero(values.deliveryErrorPercent) },
  ].sort((left, right) => right.amount - left.amount);

  return {
    monthlyCost,
    annualCost: monthlyCost * 12,
    unbilledSales: Math.max(0, unbilledSales),
    wastePercentOfPurchases: monthlyPurchases && monthlyPurchases > 0 ? monthlyCost / monthlyPurchases : null,
    expectedGlasses,
    chargedGlasses,
    lostGlasses,
    expiryGlasses,
    generousPourGlasses,
    unexplainedGlasses,
    glassYield,
    breakdown,
    warnings,
    usedEstimatedChargedGlasses: answers.sellsByGlass && answers.estimateChargedGlasses,
  };
}
