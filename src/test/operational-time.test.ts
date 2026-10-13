import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  calculateOperationalTime,
  createEmptyOperationalTimeAnswers,
  EXAMPLE_OPERATIONAL_TIME_ANSWERS,
  OPERATIONAL_TASKS,
  OPERATIONAL_WEEKS_PER_MONTH,
  parseOperationalTimeValue,
  prioritizeOperationalTasks,
} from "@/lib/operationalTime";

describe("operational time calculator", () => {
  it("keeps empty data separate from zero", () => {
    const result = calculateOperationalTime(createEmptyOperationalTimeAnswers());
    expect(result.coverage).toBe(0);
    expect(result.costCoverage).toBe(0);
    expect(result.netHoursPerWeek).toBe(0);
    expect(result.taskResults).toEqual({});
  });

  it("uses seven explicit, non-overlapping weekly tasks", () => {
    expect(OPERATIONAL_TASKS).toHaveLength(7);
    expect(OPERATIONAL_TASKS.map(({ id }) => id)).toEqual([
      "posItems",
      "deliveryNotes",
      "bottleCount",
      "stockReconciliation",
      "orderPreparation",
      "buyingDecision",
      "distributorCommunication",
    ]);
    OPERATIONAL_TASKS.forEach((task) => expect(task.boundary.length).toBeGreaterThan(45));
  });

  it("calculates current, scenario, recoverable, additional and net values", () => {
    const result = calculateOperationalTime(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    expect(result.modelVersion).toBe("2.0.0");
    expect(result.coverage).toBe(7);
    expect(result.costCoverage).toBe(7);
    expect(result.currentHoursPerWeek).toBe(11.42);
    expect(result.scenarioHoursPerWeek).toBe(6.83);
    expect(result.recoverableHoursPerWeek).toBe(4.59);
    expect(result.additionalHoursPerWeek).toBe(0);
    expect(result.netHoursPerWeek).toBe(4.59);
    expect(result.currentTimeValuePerWeek).toBe(229.4);
    expect(result.scenarioTimeValuePerWeek).toBe(133.26);
    expect(result.netTimeValuePerWeek).toBe(96.14);
  });

  it("uses 52/12 for an average month and 52 weeks for a year", () => {
    const result = calculateOperationalTime(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    expect(OPERATIONAL_WEEKS_PER_MONTH).toBeCloseTo(4.333333, 5);
    expect(result.netHoursPerMonth).toBe(19.89);
    expect(result.netHoursPerYear).toBe(238.68);
    expect(result.netTimeValuePerYear).toBe(4999.28);
  });

  it("keeps additional time and subtracts it from the signed net", () => {
    const answers = createEmptyOperationalTimeAnswers();
    answers.posItems = {
      enabled: true,
      role: "Manager",
      currentMinutes: "30",
      scenarioMinutes: "45",
      occurrencesPerWeek: "4",
      hourlyCost: "20",
    };
    const result = calculateOperationalTime(answers);
    expect(result.taskResults.posItems?.netHoursPerWeek).toBe(-1);
    expect(result.recoverableHoursPerWeek).toBe(0);
    expect(result.additionalHoursPerWeek).toBe(1);
    expect(result.netHoursPerWeek).toBe(-1);
    expect(result.netTimeValuePerWeek).toBe(-20);
  });

  it("calculates hours without inventing a missing hourly cost", () => {
    const answers = createEmptyOperationalTimeAnswers();
    answers.deliveryNotes = {
      enabled: true,
      role: "",
      currentMinutes: "20",
      scenarioMinutes: "10",
      occurrencesPerWeek: "3",
      hourlyCost: "",
    };
    const result = calculateOperationalTime(answers);
    expect(result.coverage).toBe(1);
    expect(result.costCoverage).toBe(0);
    expect(result.netHoursPerWeek).toBe(0.5);
    expect(result.taskResults.deliveryNotes?.hourlyCost).toBeNull();
    expect(result.taskResults.deliveryNotes?.netTimeValuePerWeek).toBeNull();
  });

  it("accepts a zero hourly cost without treating it as missing", () => {
    const answers = structuredClone(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    answers.posItems.hourlyCost = "0";
    const result = calculateOperationalTime(answers);
    expect(result.costCoverage).toBe(7);
    expect(result.taskResults.posItems?.hourlyCost).toBe(0);
    expect(result.taskResults.posItems?.netTimeValuePerWeek).toBe(0);
  });

  it("ignores disabled tasks and rejects negative, formatted and extreme values", () => {
    const answers = createEmptyOperationalTimeAnswers();
    answers.posItems.enabled = false;
    answers.deliveryNotes.currentMinutes = "-1";
    answers.bottleCount.currentMinutes = "1.000,50";
    answers.stockReconciliation.currentMinutes = "100001";
    const result = calculateOperationalTime(answers);
    expect(result.taskResults.posItems).toBeUndefined();
    expect(result.errors["deliveryNotes.currentMinutes"]).toContain("positivo");
    expect(result.errors["bottleCount.currentMinutes"]).toContain("separador");
    expect(result.errors["stockReconciliation.currentMinutes"]).toContain("límite");
  });

  it("accepts decimal commas and preserves the role as entered", () => {
    expect(parseOperationalTimeValue("10,5")).toBe(10.5);
    const answers = createEmptyOperationalTimeAnswers();
    answers.buyingDecision = {
      enabled: true,
      role: "Dirección",
      currentMinutes: "60,5",
      scenarioMinutes: "30",
      occurrencesPerWeek: "1",
      hourlyCost: "25,5",
    };
    expect(calculateOperationalTime(answers).taskResults.buyingDecision?.role).toBe("Dirección");
  });

  it("prioritizes the three largest positive net results only", () => {
    const result = calculateOperationalTime(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    expect(prioritizeOperationalTasks(result.taskResults)).toEqual([
      "stockReconciliation",
      "deliveryNotes",
      "posItems",
    ]);
  });

  it("labels inputs, calculations, fictional examples and unconnected verification", () => {
    const result = calculateOperationalTime(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    expect(result.sources).toEqual({
      inputs: "entered",
      outputs: "calculated",
      example: "fictional",
      operationalData: "verified",
      verifiedConnected: false,
    });
  });

  it("keeps the human, bot and sitemap contracts in sync", () => {
    const route = "/herramientas/calculadora-tiempo-operativo";
    const enRoute = "/en/tools/operational-time-calculator";
    const app = readFileSync("src/App.tsx", "utf8");
    const tools = readFileSync("src/pages/Herramientas.tsx", "utf8");
    const edgeRouter = readFileSync("edge-router/winerim-pages-router.js", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");
    const page = readFileSync("src/pages/CalculadoraTiempoOperativo.tsx", "utf8");

    expect(app).toContain(route);
    expect(app).toContain(enRoute);
    expect(tools).toContain(route);
    expect(edgeRouter).toContain(route);
    expect(edgeRouter).toContain(enRoute);
    expect(worker).toContain(route);
    expect(worker).toContain(enRoute);
    expect(sitemap).toContain(`{ esPath: '${route}', priority: '0.8', changefreq: 'monthly', multilang: false }`);
    expect(sitemap).toContain(`{ esPath: '${enRoute}', priority: '0.8', changefreq: 'monthly', multilang: false }`);
    expect(prerender).toContain(`'${route}': {`);
    expect(prerender).toContain(`'${enRoute}': {`);
    expect(page).toContain("What does it cost to manage your wine operation?");
    expect(page).toContain("Calculated locally · We do not send this data");
    expect(page).toContain("does not imply cash savings, headcount reduction, added sales or guaranteed ROI");
  });
});
