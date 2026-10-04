export type BeverageCostHealth = "good" | "warning" | "danger";

export function getBeverageCostHealth(beverageCost: number): BeverageCostHealth {
  if (beverageCost <= 28) return "good";
  if (beverageCost <= 35) return "warning";
  return "danger";
}
