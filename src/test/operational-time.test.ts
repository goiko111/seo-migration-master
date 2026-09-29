import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  calculateOperationalTime,
  createEmptyOperationalTimeAnswers,
  EXAMPLE_OPERATIONAL_TIME_ANSWERS,
  parseOperationalTimeValue,
  prioritizeOperationalTasks,
} from "@/lib/operationalTime";

describe("operational time calculator", () => {
  it("keeps empty data separate from zero", () => {
    const result = calculateOperationalTime(createEmptyOperationalTimeAnswers());
    expect(result.coverage).toBe(0);
    expect(result.recoverableHoursPerMonth).toBe(0);
    expect(result.taskResults).toEqual({});
  });

  it("calculates the fictitious example by task and period", () => {
    const result = calculateOperationalTime(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    expect(result.coverage).toBe(8);
    expect(result.taskResults.list?.recoverableHoursPerMonth).toBe(5);
    expect(result.taskResults.documents?.recoverableHoursPerMonth).toBe(4);
    expect(result.recoverableHoursPerMonth).toBe(26);
    expect(result.recoverableHoursPerWeek).toBe(6);
    expect(result.recoverableHoursPerYear).toBe(312);
  });

  it("shows additional time instead of hiding a negative task", () => {
    const answers = createEmptyOperationalTimeAnswers();
    answers.list = {
      enabled: true,
      currentMinutes: "30",
      winerimMinutes: "45",
      occurrencesPerMonth: "4",
    };
    const result = calculateOperationalTime(answers);
    expect(result.taskResults.list?.differenceHoursPerMonth).toBe(-1);
    expect(result.recoverableHoursPerMonth).toBe(0);
    expect(result.additionalHoursPerMonth).toBe(1);
  });

  it("ignores disabled tasks and validates enabled values", () => {
    const answers = createEmptyOperationalTimeAnswers();
    answers.list.enabled = false;
    answers.margins.currentMinutes = "1.000,50";
    const result = calculateOperationalTime(answers);
    expect(result.taskResults.list).toBeUndefined();
    expect(result.errors["margins.currentMinutes"]).toContain("separador");
  });

  it("accepts decimal commas and rejects excessive values", () => {
    expect(parseOperationalTimeValue("10,5")).toBe(10.5);
    expect(() => parseOperationalTimeValue("100001")).toThrow("límite");
  });

  it("prioritizes only positive recoverable tasks", () => {
    const result = calculateOperationalTime(EXAMPLE_OPERATIONAL_TIME_ANSWERS);
    expect(prioritizeOperationalTasks(result.taskResults)).toEqual([
      "list",
      "groups",
      "margins",
    ]);
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
    expect(page).toContain("Recoverable operational time calculator");
    expect(page).toContain("Calculated locally · We do not send this data");
  });
});
