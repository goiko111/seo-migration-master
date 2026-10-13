export const OPERATIONAL_TIME_MODEL_VERSION = "5.0.0";
export const OPERATIONAL_WEEKS_PER_YEAR = 52;
export const OPERATIONAL_WEEKS_PER_MONTH = OPERATIONAL_WEEKS_PER_YEAR / 12;
export const OPERATIONAL_WORKDAY_HOURS = 8;

export type OperationalProfileId = "restaurant" | "hotel" | "group";

export type OperationalTaskId =
  | "posItems"
  | "salesPrices"
  | "deliveryNotes"
  | "documentReconciliation"
  | "bottleCount"
  | "stockReconciliation"
  | "orderPreparation"
  | "buyingDecision"
  | "distributorCommunication"
  | "operationalReporting"
  | "multilingualUpdates"
  | "multiLocationConsolidation"
  | "teamTraining";

export interface OperationalTaskSpec {
  id: OperationalTaskId;
  title: string;
  description: string;
  boundary: string;
  action: string;
  route: string;
  defaultReductionPercent: number;
  optional: boolean;
  profiles: OperationalProfileId[];
}

export interface OperationalTimeEntry {
  enabled: boolean;
  role: string;
  currentMinutes: string;
  reductionPercent: string;
  occurrencesPerWeek: string;
  hourlyCost: string;
}

export type OperationalTimeAnswers = Record<OperationalTaskId, OperationalTimeEntry>;

const ALL_PROFILES: OperationalProfileId[] = ["restaurant", "hotel", "group"];

export interface OperationalTaskResult {
  id: OperationalTaskId;
  role: string | null;
  currentHoursPerWeek: number;
  scenarioMinutesPerOccurrence: number;
  reductionPercent: number;
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
    defaultReductionPercent: 95,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "salesPrices",
    title: "Poner y actualizar precios de venta",
    description: "Publicar PVP, precios por copa y formatos en Winerim y en el TPV conectado.",
    boundary: "Solo ejecuta precios ya aprobados; analizar margen y decidir el precio se mide en otra tarea.",
    action: "Automatizar precios y formatos de venta",
    route: "/integraciones",
    defaultReductionPercent: 95,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "deliveryNotes",
    title: "Recepcionar albaranes",
    description: "Leer entradas, comprobar líneas y trasladar cantidades, costes y proveedor.",
    boundary: "Solo recepción documental y de mercancía; no incluye decidir qué comprar.",
    action: "Revisar el flujo documental de CloudRIM",
    route: "/producto/cloudrim",
    defaultReductionPercent: 70,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "documentReconciliation",
    title: "Conciliar pedido, albarán y factura",
    description: "Comparar cantidades, precios, descuentos, impuestos y totales antes de aprobar.",
    boundary: "Solo comparación documental y detección de diferencias; recepcionar mercancía y resolver excepciones se miden aparte.",
    action: "Automatizar la conciliación documental",
    route: "/producto/cloudrim",
    defaultReductionPercent: 80,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "bottleCount",
    title: "Contar botellas",
    description: "Realizar el recuento físico de bodega, cámaras y puntos de servicio.",
    boundary: "Solo recuento físico; las diferencias frente al teórico se tratan en la tarea siguiente.",
    action: "Ordenar el control físico de stock",
    route: "/producto/winerim-core",
    defaultReductionPercent: 60,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "stockReconciliation",
    title: "Comparar stock teórico y real",
    description: "Cruzar el recuento con ventas, entradas, copas, mermas y stock esperado.",
    boundary: "Incluye localizar y revisar diferencias; no vuelve a contar las botellas.",
    action: "Contrastar ventas, stock y TPV",
    route: "/integraciones",
    defaultReductionPercent: 80,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "orderPreparation",
    title: "Preparar pedidos",
    description: "Convertir necesidades ya decididas en cantidades y pedidos por proveedor.",
    boundary: "Solo preparar el pedido; el análisis para decidir qué comprar se mide aparte.",
    action: "Revisar reposición y compras",
    route: "/producto/winerim-supply",
    defaultReductionPercent: 90,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "buyingDecision",
    title: "Decidir qué comprar",
    description: "Analizar rotación, stock, coste, margen y cobertura antes de reponer.",
    boundary: "Solo análisis y decisión; no incluye confeccionar el pedido ni hablar con proveedores.",
    action: "Consultar la decisión con SAVia",
    route: "/producto/savia",
    defaultReductionPercent: 75,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "distributorCommunication",
    title: "Hablar con distribuidores",
    description: "Consultar disponibilidad, alternativas, precios, incidencias y seguimiento.",
    boundary: "Solo comunicación y seguimiento; no duplica el análisis de compra ni el pedido.",
    action: "Comparar distribuidores con el mismo criterio",
    route: "/herramientas/comparador-distribuidores",
    defaultReductionPercent: 75,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "operationalReporting",
    title: "Preparar informes operativos",
    description: "Reunir ventas, stock, rotación, margen y merma para dirección o el equipo de sala.",
    boundary: "Solo prepara y consolida la información; interpretar decisiones y ejecutar cambios se mide aparte.",
    action: "Consolidar informes y seguimiento",
    route: "/producto/inteligencia-dinamica",
    defaultReductionPercent: 85,
    optional: false,
    profiles: ALL_PROFILES,
  },
  {
    id: "multilingualUpdates",
    title: "Actualizar cartas en varios idiomas",
    description: "Replicar cambios aprobados de contenido, precios y disponibilidad en las versiones idiomáticas de la carta.",
    boundary: "Solo actualización de versiones ya configuradas; no incluye crear el catálogo base ni realizar traducción editorial especializada.",
    action: "Centralizar cartas e idiomas",
    route: "/funcionalidades",
    defaultReductionPercent: 90,
    optional: true,
    profiles: ["hotel", "group"],
  },
  {
    id: "multiLocationConsolidation",
    title: "Consolidar varios establecimientos",
    description: "Reunir ventas, stock, compras y seguimiento de distintos centros en una visión común.",
    boundary: "Solo consolidación y seguimiento entre centros; no incluye capturar datos locales ni interpretar decisiones de cada establecimiento.",
    action: "Consolidar la operación del grupo",
    route: "/soluciones/grupos-restauracion",
    defaultReductionPercent: 85,
    optional: true,
    profiles: ["hotel", "group"],
  },
  {
    id: "teamTraining",
    title: "Resolver dudas y formar al equipo",
    description: "Atender consultas operativas recurrentes y mantener criterios de servicio, carta y producto consistentes.",
    boundary: "Solo dudas recurrentes y estandarización operativa; no sustituye el onboarding, la formación humana ni la supervisión del equipo.",
    action: "Dar soporte al equipo con SAVia",
    route: "/producto/savia",
    defaultReductionPercent: 70,
    optional: true,
    profiles: ["hotel", "group"],
  },
];

const emptyEntry = (defaultReductionPercent: number, enabled: boolean): OperationalTimeEntry => ({
  enabled,
  role: "",
  currentMinutes: "",
  reductionPercent: String(defaultReductionPercent),
  occurrencesPerWeek: "",
  hourlyCost: "",
});

export const createEmptyOperationalTimeAnswers = (profile: OperationalProfileId = "restaurant"): OperationalTimeAnswers =>
  Object.fromEntries(OPERATIONAL_TASKS.map(({ id, defaultReductionPercent, profiles }) => [id, emptyEntry(defaultReductionPercent, profiles.includes(profile))])) as OperationalTimeAnswers;

export const applyOperationalProfile = (
  answers: OperationalTimeAnswers,
  profile: OperationalProfileId,
): OperationalTimeAnswers => Object.fromEntries(
  OPERATIONAL_TASKS.map(({ id, profiles }) => [id, { ...answers[id], enabled: profiles.includes(profile) }]),
) as OperationalTimeAnswers;

export const EXAMPLE_OPERATIONAL_TIME_ANSWERS: OperationalTimeAnswers = {
  posItems: { enabled: true, role: "Responsable de sala", currentMinutes: "45", reductionPercent: "95", occurrencesPerWeek: "2", hourlyCost: "18" },
  salesPrices: { enabled: true, role: "Dirección / sumiller", currentMinutes: "60", reductionPercent: "95", occurrencesPerWeek: "1", hourlyCost: "20" },
  deliveryNotes: { enabled: true, role: "Responsable de compras", currentMinutes: "20", reductionPercent: "70", occurrencesPerWeek: "5", hourlyCost: "20" },
  documentReconciliation: { enabled: true, role: "Administración / compras", currentMinutes: "45", reductionPercent: "80", occurrencesPerWeek: "2", hourlyCost: "20" },
  bottleCount: { enabled: true, role: "Equipo de bodega", currentMinutes: "120", reductionPercent: "60", occurrencesPerWeek: "1", hourlyCost: "16" },
  stockReconciliation: { enabled: true, role: "Responsable de bodega", currentMinutes: "90", reductionPercent: "80", occurrencesPerWeek: "1", hourlyCost: "20" },
  orderPreparation: { enabled: true, role: "Responsable de compras", currentMinutes: "75", reductionPercent: "90", occurrencesPerWeek: "1", hourlyCost: "20" },
  buyingDecision: { enabled: true, role: "Dirección / sumiller", currentMinutes: "90", reductionPercent: "75", occurrencesPerWeek: "1", hourlyCost: "28" },
  distributorCommunication: { enabled: true, role: "Responsable de compras", currentMinutes: "60", reductionPercent: "75", occurrencesPerWeek: "2", hourlyCost: "20" },
  operationalReporting: { enabled: true, role: "Dirección", currentMinutes: "90", reductionPercent: "85", occurrencesPerWeek: "1", hourlyCost: "28" },
  multilingualUpdates: { enabled: true, role: "Marketing / dirección", currentMinutes: "90", reductionPercent: "90", occurrencesPerWeek: "1", hourlyCost: "24" },
  multiLocationConsolidation: { enabled: true, role: "Dirección de operaciones", currentMinutes: "180", reductionPercent: "85", occurrencesPerWeek: "1", hourlyCost: "30" },
  teamTraining: { enabled: true, role: "Responsable de sala", currentMinutes: "90", reductionPercent: "70", occurrencesPerWeek: "1", hourlyCost: "22" },
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

export function estimateOperationalScenarioMinutes(currentMinutesRaw: string, reductionPercentRaw: string): number | null {
  const currentMinutes = parseOperationalTimeValue(currentMinutesRaw);
  const reductionPercent = parseOperationalTimeValue(reductionPercentRaw);
  if (currentMinutes === null || reductionPercent === null) return null;
  if (reductionPercent > 100) throw new Error("El ahorro estimado debe estar entre 0 y 100 %.");
  return round(currentMinutes * (1 - reductionPercent / 100));
}

export function calculateOperationalTime(answers: OperationalTimeAnswers) {
  const errors: Record<string, string> = {};
  const taskResults: Partial<Record<OperationalTaskId, OperationalTaskResult>> = {};

  for (const task of OPERATIONAL_TASKS) {
    const entry = answers[task.id];
    if (!entry.enabled) continue;

    const required: Record<string, number | null> = {};
    for (const field of ["currentMinutes", "reductionPercent", "occurrencesPerWeek"] as const) {
      try {
        required[field] = parseOperationalTimeValue(entry[field]);
      } catch (error) {
        errors[`${task.id}.${field}`] = error instanceof Error ? error.message : "Valor no válido.";
        required[field] = null;
      }
    }

    if (required.reductionPercent !== null && required.reductionPercent > 100) {
      errors[`${task.id}.reductionPercent`] = "El ahorro estimado debe estar entre 0 y 100 %.";
      required.reductionPercent = null;
    }

    let hourlyCost: number | null = null;
    try {
      hourlyCost = parseOperationalTimeValue(entry.hourlyCost);
    } catch (error) {
      errors[`${task.id}.hourlyCost`] = error instanceof Error ? error.message : "Valor no válido.";
    }

    if (Object.values(required).some((value) => value === null)) continue;

    const scenarioMinutesPerOccurrence = estimateOperationalScenarioMinutes(entry.currentMinutes, entry.reductionPercent)!;
    const currentHoursPerWeek = round(required.currentMinutes! * required.occurrencesPerWeek! / 60);
    const scenarioHoursPerWeek = round(scenarioMinutesPerOccurrence * required.occurrencesPerWeek! / 60);
    const netHoursPerWeek = round(currentHoursPerWeek - scenarioHoursPerWeek);
    taskResults[task.id] = {
      id: task.id,
      role: entry.role.trim() || null,
      currentHoursPerWeek,
      scenarioMinutesPerOccurrence,
      reductionPercent: required.reductionPercent!,
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
    modelCompatibility: "5.0 adds profile presets, optional multi-language, multi-location and training tasks, plus an eight-hour workday equivalent; profile changes never overwrite user-entered values.",
    errors,
    taskResults,
    enabledCount: OPERATIONAL_TASKS.filter(({ id }) => answers[id].enabled).length,
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
    netWorkdaysPerYear: round(Math.max(0, netHoursPerWeek * OPERATIONAL_WEEKS_PER_YEAR) / OPERATIONAL_WORKDAY_HOURS),
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
      scenarioAssumptions: "winerim-baseline" as const,
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
