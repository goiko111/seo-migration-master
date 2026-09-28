import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const baseUrl = process.env.WINERIM_TEST_URL || "http://127.0.0.1:4221";
const outputDir = "docs/agent_outputs/qa-2026-09-28/time-calculator";
mkdirSync(outputDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const pageErrors = [];
  const consoleErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto(`${baseUrl}/herramientas/calculadora-tiempo-operativo`, {
    waitUntil: "networkidle",
  });
  await page.getByRole("heading", { name: "Calculadora de tiempo operativo recuperable" }).waitFor();
  assert(await page.locator(".time-task").count() === 8, "Expected eight operational tasks");
  assert(await page.locator(".time-summary").getByText("0 h", { exact: true }).count() >= 1, "Expected an empty result");
  assert(await page.locator("form").count() === 0, "The calculator must not require a form");

  await page.getByRole("button", { name: "Cargar ejemplo ficticio" }).click();
  await page.locator(".time-summary").getByText("26 h", { exact: true }).waitFor();
  assert(await page.getByText("Ejemplo ficticio.", { exact: false }).isVisible(), "Example disclosure missing");

  const firstTask = page.locator(".time-task").first();
  await firstTask.getByLabel("Ahora").fill("60");
  await page.locator(".time-summary").getByText("22 h", { exact: true }).waitFor();

  const groupTask = page.locator(".time-task").filter({ hasText: "Consolidar varios establecimientos" });
  await groupTask.locator('input[type="checkbox"]').uncheck();
  await page.locator(".time-summary").getByText("17 h", { exact: true }).waitFor();

  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(desktopOverflow <= 1, `Desktop horizontal overflow: ${desktopOverflow}px`);
  await page.screenshot({ path: `${outputDir}/desktop.png`, fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Cargar ejemplo ficticio" }).click();
  await page.locator(".time-summary").getByText("26 h", { exact: true }).waitFor();
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(mobileOverflow <= 1, `Mobile horizontal overflow: ${mobileOverflow}px`);
  await page.screenshot({ path: `${outputDir}/mobile.png`, fullPage: true });

  assert(pageErrors.length === 0, `Page errors: ${pageErrors.join(" | ")}`);
  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(" | ")}`);

  console.log(JSON.stringify({
    tasks: 8,
    exampleMonthlyHours: 26,
    editedMonthlyHours: 22,
    deselectedMonthlyHours: 17,
    desktopOverflow,
    mobileOverflow,
    pageErrors: pageErrors.length,
    consoleErrors: consoleErrors.length,
  }));
} finally {
  await browser.close();
}
