export const CATALONIA_ROUTE = "/presentacion/catalonia";

export const CATALONIA_TIERS = [
  { minimum: 1, maximum: 5, label: "1–5", rate: 100 },
  { minimum: 6, maximum: 10, label: "6–10", rate: 95 },
  { minimum: 11, maximum: 15, label: "11–15", rate: 90 },
  { minimum: 16, maximum: Infinity, label: "16 o más", rate: 85 },
] as const;

export const REVO_MONTHLY_RATE = 75;

export function calculateCataloniaQuote(restaurants: number, revoPoints: number) {
  if (!Number.isSafeInteger(restaurants) || restaurants < 1 ||
      !Number.isSafeInteger(revoPoints) || revoPoints < 0) {
    return null;
  }
  const tier = CATALONIA_TIERS.find(({ maximum }) => restaurants <= maximum)!;
  const winerim = restaurants * tier.rate;
  const revo = revoPoints * REVO_MONTHLY_RATE;
  const total = winerim + revo;
  if (!Number.isSafeInteger(total)) return null;
  return { restaurants, revoPoints, rate: tier.rate, winerim, revo, total };
}

export const CATALONIA_PILOT_GATES = [
  { title: "Preparar la carta", body: "Revisar referencias, añadas, formatos, precios e idiomas con el equipo de Beloved Gran Via." },
  { title: "Conectar REVO", body: "Confirmar acceso y alcance del conector. Mapear cada referencia y distinguir botella, copa y otros formatos." },
  { title: "Comprobar una venta", body: "Ejecutar una prueba controlada, contrastar el registro de origen y destino y verificar que no se duplica el movimiento de stock." },
  { title: "Decidir con evidencias", body: "Revisar incidencias, uso en sala y calidad de los datos antes de acordar la siguiente incorporación." },
] as const;
