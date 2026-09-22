export const PROFITABILITY_MODEL_VERSION = "1.1.0";

export type ProfitabilityArea = "cost" | "margin" | "time" | "capital";
export type ProfitabilityCurrency = "EUR" | "USD" | "GBP";
export type ProfitabilityAnswers = Record<string, string>;

export interface ProfitabilityRange {
  low: number;
  high: number;
}

type FieldUnit = "money" | "percent" | "hours" | "units";

export interface ProfitabilityAreaSpec {
  title: string;
  question: string;
  basis: string;
  formula: string;
  fields: Array<{ key: string; label: string; unit: FieldUnit }>;
  route: string;
  action: string;
}

export const PROFITABILITY_AREAS: Record<ProfitabilityArea, ProfitabilityAreaSpec> = {
  cost: {
    title: "Compras",
    question: "¿Qué condiciones de compra podrías mejorar?",
    basis: "Mismo volumen y producto. No incluye merma, descuentos de liquidación ni cambios de venta.",
    formula: "Compras mensuales actuales × porcentaje de reducción de coste.",
    fields: [
      { key: "purchases", label: "Compras mensuales de vino", unit: "money" },
      { key: "purchaseLow", label: "Reducción de coste mínima", unit: "percent" },
      { key: "purchaseHigh", label: "Reducción de coste máxima", unit: "percent" },
    ],
    route: "/herramientas/calculadora-compra-inteligente",
    action: "Contrasta tus condiciones de compra",
  },
  margin: {
    title: "Margen",
    question: "¿Qué aportaría vender más botellas?",
    basis: "Solo unidades adicionales, a precio y coste constantes. No incluye las ventas actuales ni el ahorro en compras.",
    formula: "Botellas adicionales × (precio de venta neto − coste variable por botella).",
    fields: [
      { key: "unitPrice", label: "Precio de venta por botella", unit: "money" },
      { key: "unitCost", label: "Coste variable total por botella", unit: "money" },
      { key: "unitsLow", label: "Botellas adicionales al mes, mínimo", unit: "units" },
      { key: "unitsHigh", label: "Botellas adicionales al mes, máximo", unit: "units" },
    ],
    route: "/calculadora-margen-vino",
    action: "Revisa precio y margen por referencia",
  },
  time: {
    title: "Tiempo",
    question: "¿Cuánto tiempo dedica el equipo a la bodega?",
    basis: "Horas de todo el equipo. Tiempo disponible para otras tareas, no ahorro salarial ni reducción de plantilla.",
    formula: "Horas mensuales actuales × porcentaje de reducción de tiempo.",
    fields: [
      { key: "hours", label: "Horas mensuales de gestión", unit: "hours" },
      { key: "timeLow", label: "Reducción de tiempo mínima", unit: "percent" },
      { key: "timeHigh", label: "Reducción de tiempo máxima", unit: "percent" },
    ],
    route: "/herramientas/simulador-pareto-carta-vinos",
    action: "Prioriza las referencias que revisar",
  },
  capital: {
    title: "Stock",
    question: "¿Cuánto capital tienes en vino sin rotación?",
    basis: "Valor a coste de adquisición. Capital que dejaría de estar inmovilizado, no ingreso ni beneficio mensual.",
    formula: "Stock sin rotación a coste × porcentaje del stock que se prevé liberar.",
    fields: [
      { key: "stockCost", label: "Stock sin rotación valorado a coste", unit: "money" },
      { key: "capitalLow", label: "Parte a liberar, mínimo", unit: "percent" },
      { key: "capitalHigh", label: "Parte a liberar, máximo", unit: "percent" },
    ],
    route: "/herramientas/calculadora-stock-muerto",
    action: "Identifica el stock que necesita una decisión",
  },
};

export const EMPTY_PROFITABILITY_ANSWERS: ProfitabilityAnswers = Object.fromEntries(
  Object.values(PROFITABILITY_AREAS).flatMap((area) => area.fields.map((field) => [field.key, ""])),
);

export const EXAMPLE_PROFITABILITY_ANSWERS: ProfitabilityAnswers = {
  purchases: "10000",
  purchaseLow: "2",
  purchaseHigh: "4",
  unitPrice: "24",
  unitCost: "10",
  unitsLow: "20",
  unitsHigh: "40",
  hours: "60",
  timeLow: "10",
  timeHigh: "20",
  stockCost: "6000",
  capitalLow: "15",
  capitalHigh: "30",
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

const makeRange = (base: number, lowPercent: number, highPercent: number): ProfitabilityRange => ({
  low: Math.round(base * Math.min(lowPercent, highPercent) / 100 * 100) / 100,
  high: Math.round(base * Math.max(lowPercent, highPercent) / 100 * 100) / 100,
});

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

  const results: Partial<Record<ProfitabilityArea, ProfitabilityRange>> = {};
  const complete = (area: ProfitabilityArea) =>
    PROFITABILITY_AREAS[area].fields.every((field) => values[field.key] !== null);

  if (complete("cost")) {
    results.cost = makeRange(values.purchases!, values.purchaseLow!, values.purchaseHigh!);
  }
  if (complete("margin")) {
    const contribution = values.unitPrice! - values.unitCost!;
    const scenarios = [
      contribution * values.unitsLow!,
      contribution * values.unitsHigh!,
    ];
    results.margin = {
      low: Math.round(Math.min(...scenarios) * 100) / 100,
      high: Math.round(Math.max(...scenarios) * 100) / 100,
    };
  }
  if (complete("time")) {
    results.time = makeRange(values.hours!, values.timeLow!, values.timeHigh!);
  }
  if (complete("capital")) {
    results.capital = makeRange(values.stockCost!, values.capitalLow!, values.capitalHigh!);
  }

  return {
    modelVersion: PROFITABILITY_MODEL_VERSION,
    currency,
    results,
    errors,
    coverage: Object.keys(results).length,
  };
}

export function prioritizeProfitabilityAreas(objective: ProfitabilityArea): ProfitabilityArea[] {
  const alternatives: Record<ProfitabilityArea, ProfitabilityArea[]> = {
    cost: ["capital", "margin"],
    margin: ["cost", "capital"],
    time: ["capital", "cost"],
    capital: ["cost", "margin"],
  };
  return [objective, ...alternatives[objective]];
}
