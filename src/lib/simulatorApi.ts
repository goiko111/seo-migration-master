export const SIMULATOR_BASE_URL = "https://simulator.winerim.wine";

export function formatEuro(amount: number | string | undefined | null): string {
  const n = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export type Teaser = {
  coherenceScore: number;
  totalRefs: number;
  refsRange: { min: number; max: number };
  profile: string;
  currency: string;
  firstPurchase: { low: number; high: number };
  distribution: Record<string, number>;
  alerts: number;
};

export type SimulatePayload = {
  simulationId: string;
  restaurantName: string;
  city?: string;
  country: string;
  cuisineTypes: string[];
  capacity: number;
  hasExistingList?: boolean;
  ticketMedio: string;
  wps: number;
  wineService?: string[];
  hasSommelier?: string;
  storageSize?: string;
  clientProfiles?: string[];
  priceSensitivity?: number;
  wineKnowledge?: string;
  originPreference?: string[];
  budgetFirstPurchase?: number;
  bevCostTarget?: string;
  minMargin?: string;
  servicesPerWeek?: number;
  weeklyCovers?: number;
  preferredWineTypes?: string[];
  preferredRegions?: string[];
  listStyle?: string;
  includeNatural?: string;
  notes?: string;
  objective?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  lang: string;
};

export type StatusResponse = {
  step?: number;
  stepLabel?: string;
  progress?: number;
  status: "processing" | "complete" | string;
  teaser?: Teaser;
};

export function generateSimulationId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "sim_";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export async function submitSimulation(payload: SimulatePayload): Promise<{ teaser?: Teaser } | null> {
  try {
    const res = await fetch(`${SIMULATOR_BASE_URL}/v1/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (!res.ok) {
      console.error("simulator POST failed", res.status);
      return null;
    }
    const data = await res.json();
    return { teaser: data?.teaser };
  } catch (err) {
    console.error("simulator POST error", err);
    return null;
  }
}

export async function pollStatus(id: string): Promise<StatusResponse | null> {
  try {
    const res = await fetch(`${SIMULATOR_BASE_URL}/v1/simulate/status/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("simulator poll error", err);
    return null;
  }
}

export async function unlockReport(
  id: string,
  body: { email: string; name: string; phone?: string },
): Promise<{ success: boolean; reportUrl?: string } | null> {
  try {
    const res = await fetch(`${SIMULATOR_BASE_URL}/v1/simulate/unlock/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("simulator unlock error", err);
    return null;
  }
}

export const SIMULATION_TIMELINE: Array<{ atSec: number; step: number; label: string }> = [
  { atSec: 0, step: 1, label: "Analizando tu concepto..." },
  { atSec: 2, step: 2, label: "Calculando referencias ideales..." },
  { atSec: 5, step: 3, label: "Distribuyendo por tipo de vino..." },
  { atSec: 10, step: 4, label: "Definiendo gamas de precio..." },
  { atSec: 15, step: 5, label: "Configurando geografía del vino..." },
  { atSec: 20, step: 6, label: "Calculando métricas financieras..." },
  { atSec: 25, step: 7, label: "Generando recomendaciones IA..." },
];

export const SIMULATION_DEADLINE_MS = 40_000;