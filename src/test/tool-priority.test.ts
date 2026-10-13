import { describe, expect, it } from "vitest";
import { PRIORITY_TOOL_ROUTES, prioritizeToolItems } from "@/lib/toolPriority";

describe("tool priority", () => {
  it("keeps the four newest calculators first in the required order", () => {
    const items = [
      { to: "/wine-list-analyzer", title: "Analyzer" },
      { to: PRIORITY_TOOL_ROUTES[2], title: "Margin" },
      { to: "/wine-roi-calculator", title: "ROI" },
      { to: PRIORITY_TOOL_ROUTES[1], title: "Profitability" },
      { to: PRIORITY_TOOL_ROUTES[0], title: "Time" },
      { to: PRIORITY_TOOL_ROUTES[3], title: "Waste" },
    ];

    expect(prioritizeToolItems(items).map(({ to }) => to)).toEqual([
      ...PRIORITY_TOOL_ROUTES,
      "/wine-list-analyzer",
      "/wine-roi-calculator",
    ]);
  });

  it("moves the available priority tools first without changing the remaining order", () => {
    const localizedItems = [
      { to: "/wine-list-analyzer" },
      { to: "/herramientas/calculadora-stock-muerto" },
      { to: PRIORITY_TOOL_ROUTES[2] },
      { to: "/wine-roi-calculator" },
    ];

    expect(prioritizeToolItems(localizedItems).map(({ to }) => to)).toEqual([
      PRIORITY_TOOL_ROUTES[2],
      "/wine-list-analyzer",
      "/herramientas/calculadora-stock-muerto",
      "/wine-roi-calculator",
    ]);
  });

  it("does not mutate the configured content arrays", () => {
    const items = [{ to: "/wine-list-analyzer" }, { to: PRIORITY_TOOL_ROUTES[0] }];

    prioritizeToolItems(items);

    expect(items.map(({ to }) => to)).toEqual([
      "/wine-list-analyzer",
      PRIORITY_TOOL_ROUTES[0],
    ]);
  });
});
