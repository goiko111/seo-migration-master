export const PROFITABILITY_MODEL_VERSION = "2.0.0";

export type ProfitabilityArea = "bottle" | "glass" | "capital" | "scenario";
export type ProfitabilityCurrency = "EUR" | "USD" | "GBP";
export type ProfitabilityAnswers = Record<string, string>;
export type ProfitabilityDataSource = "entered" | "calculated" | "verified";

type FieldUnit = "money" | "percent" | "units" | "days" | "glasses";

export interface ProfitabilityAreaSpec {
  title: string;
  question: string;
  basis: string;
  formula: string;
  fields: Array<{ key: string; label: string; unit: FieldUnit }>;
  route: string;
  action: string;
}

export interface BottleResult {
  grossMarginPerBottle: number;
  marginPercent: number;
  beverageCostPercent: number;
  monthlyContribution: number;
}

export interface GlassResult {
  effectiveGlasses: number;
  revenuePerBottle: number;
  grossContributionPerBottle: number;
  beverageCostPercent: number;
  breakEvenGlasses: number;
}

export interface CapitalResult {
  tiedCapital: number;
  estimatedRelease: number;
}

export interface ScenarioResult {
  currentMonthlyContribution: number;
  scenarioMonthlyContribution: number;
  contributionDelta: number;
  volumeChangePercent: number | null;
  currentBeverageCostPercent: number;
  scenarioBeverageCostPercent: number;
  reorderPointUnits: number;
  stockCoverageDays: number | null;
}

export interface ProfitabilityResults {
  bottle?: BottleResult;
  glass?: GlassResult;
  capital?: CapitalResult;
  scenario?: ScenarioResult;
}

export const PROFITABILITY_AREAS: Record<ProfitabilityArea, ProfitabilityAreaSpec> = {
  bottle: {
    title: "Botella",
    question: "¿Qué margen deja una referencia por botella?",
    basis: "Precio y coste netos de impuestos. La contribución mensual no descuenta costes fijos ni merma.",
    formula: "Margen unitario = PVP neto − coste. Beverage Cost = coste ÷ PVP neto. Contribución mensual = margen unitario × botellas vendidas.",
    fields: [
      { key: "bottleCost", label: "Coste de compra por botella", unit: "money" },
      { key: "bottlePvp", label: "PVP neto por botella", unit: "money" },
      { key: "bottleUnitsMonth", label: "Botellas vendidas al mes", unit: "units" },
    ],
    route: "/calculadora-margen-vino",
    action: "Revisar el pricing de la referencia",
  },
  glass: {
    title: "Copa",
    question: "¿Qué resultado deja una botella vendida por copas?",
    basis: "La merma reduce las copas cobrables. No presupone que todas las botellas se vendan completas.",
    formula: "Copas efectivas = copas teóricas × (1 − merma). Beverage Cost = coste de botella ÷ ingresos efectivos por botella.",
    fields: [
      { key: "glassBottleCost", label: "Coste de la botella", unit: "money" },
      { key: "glassPvp", label: "PVP neto por copa", unit: "money" },
      { key: "glassesPerBottle", label: "Copas teóricas por botella", unit: "glasses" },
      { key: "glassWastePercent", label: "Merma estimada", unit: "percent" },
    ],
    route: "/calculadora-margen-vino",
    action: "Contrastar precio por copa y merma",
  },
  capital: {
    title: "Stock lento",
    question: "¿Cuánto capital está inmovilizado en referencias lentas?",
    basis: "Valor a coste de adquisición. Liberar stock es recuperar capital circulante, no generar beneficio.",
    formula: "Capital inmovilizado = unidades lentas × coste medio. Liberación estimada = capital inmovilizado × porcentaje de actuación.",
    fields: [
      { key: "slowStockUnits", label: "Botellas de baja rotación", unit: "units" },
      { key: "averageUnitCost", label: "Coste medio por botella", unit: "money" },
      { key: "releasePercent", label: "Parte sobre la que actuar", unit: "percent" },
    ],
    route: "/herramientas/calculadora-stock-muerto",
    action: "Identificar referencias que necesitan decisión",
  },
  scenario: {
    title: "Escenario",
    question: "¿Qué cambia al ajustar PVP, rotación y reposición?",
    basis: "Tú defines el volumen del escenario. El diagnóstico no predice demanda ni garantiza que un cambio de precio altere la rotación.",
    formula: "Contribución = unidades × (PVP neto − coste). Reposición = consumo diario del escenario × plazo de entrega + stock de seguridad.",
    fields: [
      { key: "currentUnitsMonth", label: "Unidades actuales al mes", unit: "units" },
      { key: "scenarioUnitsMonth", label: "Unidades del escenario al mes", unit: "units" },
      { key: "currentPvp", label: "PVP neto actual", unit: "money" },
      { key: "scenarioPvp", label: "PVP neto del escenario", unit: "money" },
      { key: "scenarioUnitCost", label: "Coste unitario", unit: "money" },
      { key: "stockOnHand", label: "Stock actual", unit: "units" },
      { key: "leadTimeDays", label: "Plazo de reposición", unit: "days" },
      { key: "safetyStockUnits", label: "Stock de seguridad", unit: "units" },
    ],
    route: "/producto/winerim-core",
    action: "Contrastar el escenario con ventas y stock reales",
  },
};

export const EMPTY_PROFITABILITY_ANSWERS: ProfitabilityAnswers = Object.fromEntries(
  Object.values(PROFITABILITY_AREAS).flatMap((area) => area.fields.map((field) => [field.key, ""])),
);

export const EXAMPLE_PROFITABILITY_ANSWERS: ProfitabilityAnswers = {
  bottleCost: "12",
  bottlePvp: "36",
  bottleUnitsMonth: "30",
  glassBottleCost: "12",
  glassPvp: "7",
  glassesPerBottle: "6",
  glassWastePercent: "10",
  slowStockUnits: "40",
  averageUnitCost: "15",
  releasePercent: "25",
  currentUnitsMonth: "30",
  scenarioUnitsMonth: "36",
  currentPvp: "36",
  scenarioPvp: "38",
  scenarioUnitCost: "12",
  stockOnHand: "20",
  leadTimeDays: "7",
  safetyStockUnits: "4",
};

const round = (value: number, decimals = 2) => {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function parseProfitabilityAnswer(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (!/^\d+(?:[.,]\d+)?$/.test(trimmed)) {
    throw new Error("Usa un número positivo o cero, sin separador de miles.");
  }
  const value = Number(trimmed.replace(",", "."));
  if (!Number.isFinite(value) || value > 1e9) {
    throw new Error("El valor supera el límite de este diagnóstico.");
  }
  return value;
}

export function calculateProfitabilityDiagnosis(
  answers: ProfitabilityAnswers,
  currency: ProfitabilityCurrency = "EUR",
) {
  const errors: Record<string, string> = {};
  const values: Record<string, number | null> = {};

  Object.values(PROFITABILITY_AREAS).forEach((area) => {
    area.fields.forEach((field) => {
      try {
        const value = parseProfitabilityAnswer(answers[field.key] ?? "");
        if (value !== null && field.unit === "percent" && value > 100) {
          throw new Error("El porcentaje no puede superar el 100 %.");
        }
        values[field.key] = value;
      } catch (error) {
        errors[field.key] = error instanceof Error ? error.message : "Valor no válido.";
        values[field.key] = null;
      }
    });
  });

  ["bottlePvp", "glassPvp", "glassesPerBottle", "currentPvp", "scenarioPvp"].forEach((key) => {
    if (values[key] === 0) errors[key] = "El valor debe ser mayor que cero.";
  });
  if (values.glassWastePercent === 100) {
    errors.glassWastePercent = "La merma debe ser inferior al 100 %.";
  }

  const results: ProfitabilityResults = {};
  const complete = (area: ProfitabilityArea) =>
    PROFITABILITY_AREAS[area].fields.every((field) => values[field.key] !== null && !errors[field.key]);

  if (complete("bottle")) {
    const grossMarginPerBottle = values.bottlePvp! - values.bottleCost!;
    results.bottle = {
      grossMarginPerBottle: round(grossMarginPerBottle),
      marginPercent: round(grossMarginPerBottle / values.bottlePvp! * 100),
      beverageCostPercent: round(values.bottleCost! / values.bottlePvp! * 100),
      monthlyContribution: round(grossMarginPerBottle * values.bottleUnitsMonth!),
    };
  }

  if (complete("glass")) {
    const effectiveGlasses = values.glassesPerBottle! * (1 - values.glassWastePercent! / 100);
    const revenuePerBottle = effectiveGlasses * values.glassPvp!;
    results.glass = {
      effectiveGlasses: round(effectiveGlasses),
      revenuePerBottle: round(revenuePerBottle),
      grossContributionPerBottle: round(revenuePerBottle - values.glassBottleCost!),
      beverageCostPercent: round(values.glassBottleCost! / revenuePerBottle * 100),
      breakEvenGlasses: Math.ceil(values.glassBottleCost! / values.glassPvp!),
    };
  }

  if (complete("capital")) {
    const tiedCapital = values.slowStockUnits! * values.averageUnitCost!;
    results.capital = {
      tiedCapital: round(tiedCapital),
      estimatedRelease: round(tiedCapital * values.releasePercent! / 100),
    };
  }

  if (complete("scenario")) {
    const currentMonthlyContribution = values.currentUnitsMonth! * (values.currentPvp! - values.scenarioUnitCost!);
    const scenarioMonthlyContribution = values.scenarioUnitsMonth! * (values.scenarioPvp! - values.scenarioUnitCost!);
    const dailyScenarioUnits = values.scenarioUnitsMonth! / 30;
    results.scenario = {
      currentMonthlyContribution: round(currentMonthlyContribution),
      scenarioMonthlyContribution: round(scenarioMonthlyContribution),
      contributionDelta: round(scenarioMonthlyContribution - currentMonthlyContribution),
      volumeChangePercent: values.currentUnitsMonth! > 0
        ? round((values.scenarioUnitsMonth! - values.currentUnitsMonth!) / values.currentUnitsMonth! * 100)
        : null,
      currentBeverageCostPercent: round(values.scenarioUnitCost! / values.currentPvp! * 100),
      scenarioBeverageCostPercent: round(values.scenarioUnitCost! / values.scenarioPvp! * 100),
      reorderPointUnits: Math.ceil(dailyScenarioUnits * values.leadTimeDays! + values.safetyStockUnits!),
      stockCoverageDays: dailyScenarioUnits > 0 ? round(values.stockOnHand! / dailyScenarioUnits) : null,
    };
  }

  return {
    modelVersion: PROFITABILITY_MODEL_VERSION,
    currency,
    results,
    errors,
    coverage: Object.keys(results).length,
    sources: {
      inputs: "entered" as ProfitabilityDataSource,
      outputs: "calculated" as ProfitabilityDataSource,
      operationalData: "verified" as ProfitabilityDataSource,
      verifiedConnected: false,
    },
  };
}

export function prioritizeProfitabilityAreas(objective: ProfitabilityArea): ProfitabilityArea[] {
  const alternatives: Record<ProfitabilityArea, ProfitabilityArea[]> = {
    bottle: ["glass", "scenario"],
    glass: ["bottle", "scenario"],
    capital: ["scenario", "bottle"],
    scenario: ["capital", "bottle"],
  };
  return [objective, ...alternatives[objective]];
}
