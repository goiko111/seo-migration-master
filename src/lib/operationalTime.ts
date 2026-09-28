export const OPERATIONAL_TIME_MODEL_VERSION = "1.0.0";

export type OperationalTaskId =
  | "list"
  | "margins"
  | "documents"
  | "reconciliation"
  | "suppliers"
  | "reports"
  | "groups"
  | "training";

export interface OperationalTaskSpec {
  id: OperationalTaskId;
  title: string;
  description: string;
  action: string;
  route: string;
}

export interface OperationalTimeEntry {
  enabled: boolean;
  currentMinutes: string;
  winerimMinutes: string;
  occurrencesPerMonth: string;
}

export type OperationalTimeAnswers = Record<OperationalTaskId, OperationalTimeEntry>;

export interface OperationalTaskResult {
  id: OperationalTaskId;
  differenceHoursPerMonth: number;
  recoverableHoursPerMonth: number;
  additionalHoursPerMonth: number;
}

export const OPERATIONAL_TASKS: OperationalTaskSpec[] = [
  {
    id: "list",
    title: "Actualizar carta y precios",
    description: "Altas, bajas, añadas, formatos, precios y cambios de carta.",
    action: "Centraliza carta, catálogo y precios",
    route: "/producto/winerim-core",
  },
  {
    id: "margins",
    title: "Revisar márgenes",
    description: "Cruzar coste, PVP, venta por copa y objetivos de margen.",
    action: "Contrasta precios y márgenes",
    route: "/calculadora-margen-vino",
  },
  {
    id: "documents",
    title: "Procesar documentos y facturas",
    description: "Leer, clasificar y trasladar albaranes, facturas y tarifas.",
    action: "Revisa el flujo documental de CloudRIM",
    route: "/producto/cloudrim",
  },
  {
    id: "reconciliation",
    title: "Conciliar ventas, stock y TPV",
    description: "Localizar diferencias entre tickets, referencias y existencias.",
    action: "Comprueba tus integraciones",
    route: "/integraciones",
  },
  {
    id: "suppliers",
    title: "Comparar distribuidores",
    description: "Revisar precios, disponibilidad, servicio y referencias alternativas.",
    action: "Compara distribuidores con el mismo criterio",
    route: "/herramientas/comparador-distribuidores",
  },
  {
    id: "reports",
    title: "Preparar informes",
    description: "Reunir ventas, rotación, margen, stock y decisiones pendientes.",
    action: "Consulta datos operativos con SAVia",
    route: "/producto/savia",
  },
  {
    id: "groups",
    title: "Consolidar varios establecimientos",
    description: "Unificar catálogos, precios, indicadores y excepciones entre centros.",
    action: "Ordena la gestión de grupos",
    route: "/soluciones/grupos-restauracion",
  },
  {
    id: "training",
    title: "Resolver dudas y formar al equipo",
    description: "Responder preguntas recurrentes sobre carta, servicio y producto.",
    action: "Estructura el aprendizaje del equipo",
    route: "/aprender-vino",
  },
];

const emptyEntry = (): OperationalTimeEntry => ({
  enabled: true,
  currentMinutes: "",
  winerimMinutes: "",
  occurrencesPerMonth: "",
});

export const createEmptyOperationalTimeAnswers = (): OperationalTimeAnswers =>
  Object.fromEntries(OPERATIONAL_TASKS.map(({ id }) => [id, emptyEntry()])) as OperationalTimeAnswers;

export const EXAMPLE_OPERATIONAL_TIME_ANSWERS: OperationalTimeAnswers = {
  list: { enabled: true, currentMinutes: "120", winerimMinutes: "45", occurrencesPerMonth: "4" },
  margins: { enabled: true, currentMinutes: "90", winerimMinutes: "30", occurrencesPerMonth: "4" },
  documents: { enabled: true, currentMinutes: "20", winerimMinutes: "8", occurrencesPerMonth: "20" },
  reconciliation: { enabled: true, currentMinutes: "90", winerimMinutes: "30", occurrencesPerMonth: "4" },
  suppliers: { enabled: true, currentMinutes: "120", winerimMinutes: "60", occurrencesPerMonth: "1" },
  reports: { enabled: true, currentMinutes: "180", winerimMinutes: "60", occurrencesPerMonth: "1" },
  groups: { enabled: true, currentMinutes: "120", winerimMinutes: "45", occurrencesPerMonth: "4" },
  training: { enabled: true, currentMinutes: "60", winerimMinutes: "30", occurrencesPerMonth: "2" },
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

const round = (value: number) => Math.round(value * 100) / 100;

export function calculateOperationalTime(answers: OperationalTimeAnswers) {
  const errors: Record<string, string> = {};
  const taskResults: Partial<Record<OperationalTaskId, OperationalTaskResult>> = {};

  for (const task of OPERATIONAL_TASKS) {
    const entry = answers[task.id];
    if (!entry.enabled) continue;

    const values: Record<string, number | null> = {};
    for (const field of ["currentMinutes", "winerimMinutes", "occurrencesPerMonth"] as const) {
      try {
        values[field] = parseOperationalTimeValue(entry[field]);
      } catch (error) {
        errors[`${task.id}.${field}`] = error instanceof Error ? error.message : "Valor no válido.";
        values[field] = null;
      }
    }

    if (Object.values(values).some((value) => value === null)) continue;

    const differenceHoursPerMonth = round(
      ((values.currentMinutes! - values.winerimMinutes!) * values.occurrencesPerMonth!) / 60,
    );
    taskResults[task.id] = {
      id: task.id,
      differenceHoursPerMonth,
      recoverableHoursPerMonth: Math.max(0, differenceHoursPerMonth),
      additionalHoursPerMonth: Math.max(0, -differenceHoursPerMonth),
    };
  }

  const results = Object.values(taskResults);
  const recoverableHoursPerMonth = round(
    results.reduce((total, result) => total + result.recoverableHoursPerMonth, 0),
  );
  const additionalHoursPerMonth = round(
    results.reduce((total, result) => total + result.additionalHoursPerMonth, 0),
  );

  return {
    modelVersion: OPERATIONAL_TIME_MODEL_VERSION,
    errors,
    taskResults,
    coverage: results.length,
    recoverableHoursPerWeek: round((recoverableHoursPerMonth * 12) / 52),
    recoverableHoursPerMonth,
    recoverableHoursPerYear: round(recoverableHoursPerMonth * 12),
    additionalHoursPerMonth,
  };
}

export function prioritizeOperationalTasks(
  taskResults: Partial<Record<OperationalTaskId, OperationalTaskResult>>,
  limit = 3,
): OperationalTaskId[] {
  return Object.values(taskResults)
    .filter((result) => result.recoverableHoursPerMonth > 0)
    .sort((left, right) => right.recoverableHoursPerMonth - left.recoverableHoursPerMonth)
    .slice(0, limit)
    .map(({ id }) => id);
}
