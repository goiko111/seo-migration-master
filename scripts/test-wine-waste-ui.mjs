import fs from "node:fs/promises";
import { chromium } from "/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const base = process.env.BASE_URL || "http://127.0.0.1:4178";
const out = process.env.SCREENSHOT_DIR || "docs/agent_outputs/wine_waste_calculator_2026-10-13";
await fs.mkdir(out, { recursive: true });

async function runFlow(page, prefix, mobile = false) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`${base}/herramientas/calculadora-mermas-vino`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "¿Cuánto vino pierdes cada mes?" }).waitFor();
  const rejectCookies = page.getByRole("button", { name: "Rechazar" });
  if (await rejectCookies.isVisible()) await rejectCookies.click();

  if (mobile) await page.getByTitle("Cargar ejemplo ficticio").click();
  else await page.getByRole("button", { name: "Cargar ejemplo ficticio" }).click();
  await page.screenshot({ path: `${out}/${prefix}-01-contexto.png`, fullPage: true });

  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("heading", { name: "Añade las fuentes que quieras medir" }).waitFor();
  await page.screenshot({ path: `${out}/${prefix}-02-cifras.png`, fullPage: true });

  await page.getByRole("button", { name: "Calcular merma" }).click();
  await page.getByRole("heading", { name: "Tu escenario de merma" }).waitFor();
  await page.getByText("Pierdes ≈ 90 € al mes en vino (1080 € al año), a coste", { exact: false }).waitFor();
  await page.getByText("Además, dejas de facturar ≈ 120 €", { exact: false }).waitFor();
  await page.screenshot({ path: `${out}/${prefix}-03-resultado.png`, fullPage: true });

  if (errors.length) throw new Error(`Browser console errors: ${errors.join(" | ")}`);
}

const browser = await chromium.launch({ headless: true });
const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await runFlow(desktop, "desktop");
await desktop.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await runFlow(mobile, "mobile", true);
await mobile.close();
await browser.close();

console.log(`UI_OK ${out}`);
