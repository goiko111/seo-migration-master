export const OPERATIONAL_TIME_MODEL_VERSION = "2.0.0";
export const OPERATIONAL_WEEKS_PER_YEAR = 52;
export const OPERATIONAL_WEEKS_PER_MONTH = OPERATIONAL_WEEKS_PER_YEAR / 12;

export type OperationalTaskId =
  | "posItems"
  | "deliveryNotes"
  | "bottleCount"
  | "stockReconciliation"
  | "orderPreparation"
  | "buyingDecision"
  | "distributorCommunication";

export interface OperationalTaskSpec {
  id: OperationalTaskId;
  title: string;
  description: string;
  boundary: string;
  action: string;
  route: string;
}

export interface OperationalTimeEntry {
  enabled: boolean;
  role: string;
  currentMinutes: string;
  scenarioMinutes: string;
  occurrencesPerWeek: string;
  hourlyCost: string;
}

export type OperationalTimeAnswers = Record<OperationalTaskId, OperationalTimeEntry>;

export interface OperationalTaskResult {
  id: OperationalTaskId;
  role: string | null;
  currentHoursPerWeek: number;
  scenarioHoursPerWeek: number;
  netHoursPerWeek: number;
  recoverableHoursPerWeek: number;
  additionalHoursPerWeek: number;
  hourlyCost: number | null;
  currentTimeValuePerWeek: number | null;
  scenarioTimeValuePerWeek: number | null;
  netTimeValuePerWeek: number | null;
}

export const OPERATIONAL_TASKS: OperationalTaskSpec[] = [
  {
    id: "posItems",
    title: "Dar de alta artículos en el TPV",
    description: "Crear o corregir vinos, formatos, precios y referencias en el TPV.",
    boundary: "Solo mantenimiento del catálogo TPV; no incluye recepcionar albaranes ni analizar ventas.",
    action: "Revisar catálogo e integración TPV",
    route: "/integraciones",
  },
  {
    id: "deliveryNotes",
    title: "Recepcionar albaranes",
    description: "Leer entradas, comprobar líneas y trasladar cantidades, costes y proveedor.",
    boundary: "Solo recepción documental y de mercancía; no incluye decidir qué comprar.",
    action: "Revisar el flujo documental de CloudRIM",
    route: "/producto/cloudrim",
  },
  {
    id: "bottleCount",
    title: "Contar botellas",
    description: "Realizar el recuento físico de bodega, cámaras y puntos de servicio.",
    boundary: "Solo recuento físico; las diferencias frente al teórico se tratan en la tarea siguiente.",
    action: "Ordenar el control físico de stock",
    route: "/producto/winerim-core",
  },
  {
    id: "stockReconciliation",
    title: "Comparar stock teórico y real",
    description: "Cruzar el recuento con ventas, entradas, copas, mermas y stock esperado.",
    boundary: "Incluye localizar y revisar diferencias; no vuelve a contar las botellas.",
    action: "Contrastar ventas, stock y TPV",
    route: "/integraciones",
  },
  {
    id: "orderPreparation",
    title: "Preparar pedidos",
    description: "Convertir necesidades ya decididas en cantidades y pedidos por proveedor.",
    boundary: "Solo preparar el pedido; el análisis para decidir qué comprar se mide aparte.",
    action: "Revisar reposición y compras",
    route: "/producto/winerim-supply",
  },
  {
    id: "buyingDecision",
    title: "Decidir qué comprar",
    description: "Analizar rotación, stock, coste, margen y cobertura antes de reponer.",
    boundary: "Solo análisis y decisión; no incluye confeccionar el pedido ni hablar con proveedores.",
    action: "Consultar la decisión con SAVia",
    route: "/producto/savia",
  },
  {
    id: "distributorCommunication",
    title: "Hablar con distribuidores",
    description: "Consultar disponibilidad, alternativas, precios, incidencias y seguimiento.",
    boundary: "Solo comunicación y seguimiento; no duplica el análisis de compra ni el pedido.",
    action: "Comparar distribuidores con el mismo criterio",
    route: "/herramientas/comparador-distribuidores",
  },
];

const emptyEntry = (): OperationalTimeEntry => ({
  enabled: true,
  role: "",
  currentMinutes: "",
  scenarioMinutes: "",
  occurrencesPerWeek: "",
  hourlyCost: "",
});

export const createEmptyOperationalTimeAnswers = (): OperationalTimeAnswers =>
  Object.fromEntries(OPERATIONAL_TASKS.map(({ id }) => [id, emptyEntry()])) as OperationalTimeAnswers;

export const EXAMPLE_OPERATIONAL_TIME_ANSWERS: OperationalTimeAnswers = {
  posItems: { enabled: true, role: "Responsable de sala", currentMinutes: "45", scenarioMinutes: "20", occurrencesPerWeek: "2", hourlyCost: "18" },
  deliveryNotes: { enabled: true, role: "Responsable de compras", currentMinutes: "20", scenarioMinutes: "10", occurrencesPerWeek: "5", hourlyCost: "20" },
  bottleCount: { enabled: true, role: "Equipo de bodega", currentMinutes: "120", scenarioMinutes: "120", occurrencesPerWeek: "1", hourlyCost: "16" },
  stockReconciliation: { enabled: true, role: "Responsable de bodega", currentMinutes: "90", scenarioMinutes: "35", occurrencesPerWeek: "1", hourlyCost: "20" },
  orderPreparation: { enabled: true, role: "Responsable de compras", currentMinutes: "75", scenarioMinutes: "40", occurrencesPerWeek: "1", hourlyCost: "20" },
  buyingDecision: { enabled: true, role: "Dirección / sumiller", currentMinutes: "90", scenarioMinutes: "45", occurrencesPerWeek: "1", hourlyCost: "28" },
  distributorCommunication: { enabled: true, role: "Responsable de compras", currentMinutes: "60", scenarioMinutes: "40", occurrencesPerWeek: "2", hourlyCost: "20" },
};

export function parseOperationalTimeValue(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (!/^\d+(?:[.,]\d+)?$/.test(trimmed)) {
    throw new Error("Usa un número positivo o cero, sin separador de miles.");
  }
  const value = Number(trimmed.replace(",", "."));
  if (!Number.isFinite(value) || value > 100_000) {
    throw new Error("El valor supera el límite de esta calculadora.");
  }
  return value;
}

const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const sum = (values: number[]) => round(values.reduce((total, value) => total + value, 0));

export function calculateOperationalTime(answers: OperationalTimeAnswers) {
  const errors: Record<string, string> = {};
  const taskResults: Partial<Record<OperationalTaskId, OperationalTaskResult>> = {};

  for (const task of OPERATIONAL_TASKS) {
    const entry = answers[task.id];
    if (!entry.enabled) continue;

    const required: Record<string, number | null> = {};
    for (const field of ["currentMinutes", "scenarioMinutes", "occurrencesPerWeek"] as const) {
      try {
        required[field] = parseOperationalTimeValue(entry[field]);
      } catch (error) {
        errors[`${task.id}.${field}`] = error instanceof Error ? error.message : "Valor no válido.";
        required[field] = null;
      }
    }

    let hourlyCost: number | null = null;
    try {
      hourlyCost = parseOperationalTimeValue(entry.hourlyCost);
    } catch (error) {
      errors[`${task.id}.hourlyCost`] = error instanceof Error ? error.message : "Valor no válido.";
    }

    if (Object.values(required).some((value) => value === null)) continue;

    const currentHoursPerWeek = round(required.currentMinutes! * required.occurrencesPerWeek! / 60);
    const scenarioHoursPerWeek = round(required.scenarioMinutes! * required.occurrencesPerWeek! / 60);
    const netHoursPerWeek = round(currentHoursPerWeek - scenarioHoursPerWeek);
    taskResults[task.id] = {
      id: task.id,
      role: entry.role.trim() || null,
      currentHoursPerWeek,
      scenarioHoursPerWeek,
      netHoursPerWeek,
      recoverableHoursPerWeek: Math.max(0, netHoursPerWeek),
      additionalHoursPerWeek: Math.max(0, -netHoursPerWeek),
      hourlyCost,
      currentTimeValuePerWeek: hourlyCost === null ? null : round(currentHoursPerWeek * hourlyCost),
      scenarioTimeValuePerWeek: hourlyCost === null ? null : round(scenarioHoursPerWeek * hourlyCost),
      netTimeValuePerWeek: hourlyCost === null ? null : round(netHoursPerWeek * hourlyCost),
    };
  }

  const results = Object.values(taskResults);
  const valuedResults = results.filter((result) => result.hourlyCost !== null);
  const currentHoursPerWeek = sum(results.map((result) => result.currentHoursPerWeek));
  const scenarioHoursPerWeek = sum(results.map((result) => result.scenarioHoursPerWeek));
  const recoverableHoursPerWeek = sum(results.map((result) => result.recoverableHoursPerWeek));
  const additionalHoursPerWeek = sum(results.map((result) => result.additionalHoursPerWeek));
  const netHoursPerWeek = round(currentHoursPerWeek - scenarioHoursPerWeek);
  const currentTimeValuePerWeek = sum(valuedResults.map((result) => result.currentTimeValuePerWeek!));
  const scenarioTimeValuePerWeek = sum(valuedResults.map((result) => result.scenarioTimeValuePerWeek!));
  const netTimeValuePerWeek = round(currentTimeValuePerWeek - scenarioTimeValuePerWeek);

  return {
    modelVersion: OPERATIONAL_TIME_MODEL_VERSION,
    modelCompatibility: "2.0 uses weekly frequency and seven non-overlapping task boundaries; 1.x monthly inputs are not reused automatically.",
    errors,
    taskResults,
    coverage: results.length,
    costCoverage: valuedResults.length,
    currentHoursPerWeek,
    scenarioHoursPerWeek,
    recoverableHoursPerWeek,
    additionalHoursPerWeek,
    netHoursPerWeek,
    currentHoursPerMonth: round(currentHoursPerWeek * OPERATIONAL_WEEKS_PER_MONTH),
    scenarioHoursPerMonth: round(scenarioHoursPerWeek * OPERATIONAL_WEEKS_PER_MONTH),
    netHoursPerMonth: round(netHoursPerWeek * OPERATIONAL_WEEKS_PER_MONTH),
    currentHoursPerYear: round(currentHoursPerWeek * OPERATIONAL_WEEKS_PER_YEAR),
    scenarioHoursPerYear: round(scenarioHoursPerWeek * OPERATIONAL_WEEKS_PER_YEAR),
    netHoursPerYear: round(netHoursPerWeek * OPERATIONAL_WEEKS_PER_YEAR),
    currentTimeValuePerWeek,
    scenarioTimeValuePerWeek,
    netTimeValuePerWeek,
    currentTimeValuePerMonth: round(currentTimeValuePerWeek * OPERATIONAL_WEEKS_PER_MONTH),
    scenarioTimeValuePerMonth: round(scenarioTimeValuePerWeek * OPERATIONAL_WEEKS_PER_MONTH),
    netTimeValuePerMonth: round(netTimeValuePerWeek * OPERATIONAL_WEEKS_PER_MONTH),
    currentTimeValuePerYear: round(currentTimeValuePerWeek * OPERATIONAL_WEEKS_PER_YEAR),
    scenarioTimeValuePerYear: round(scenarioTimeValuePerWeek * OPERATIONAL_WEEKS_PER_YEAR),
    netTimeValuePerYear: round(netTimeValuePerWeek * OPERATIONAL_WEEKS_PER_YEAR),
    sources: {
      inputs: "entered" as const,
      outputs: "calculated" as const,
      example: "fictional" as const,
      operationalData: "verified" as const,
      verifiedConnected: false,
    },
  };
}

export function prioritizeOperationalTasks(
  taskResults: Partial<Record<OperationalTaskId, OperationalTaskResult>>,
  limit = 3,
): OperationalTaskId[] {
  return Object.values(taskResults)
    .filter((result) => result.netHoursPerWeek > 0)
    .sort((left, right) => right.netHoursPerWeek - left.netHoursPerWeek)
    .slice(0, limit)
    .map(({ id }) => id);
}
