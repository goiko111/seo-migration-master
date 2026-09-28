import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const baseUrl = process.env.WINERIM_TEST_URL || "http://127.0.0.1:4222";
const outputDir = "docs/agent_outputs/qa-2026-09-28/tools-resources-journeys";
mkdirSync(outputDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function revealScrollableContent(page) {
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height || 800;
  for (let y = 0; y < pageHeight; y += Math.max(300, viewportHeight - 120)) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(80);
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

  await page.goto(`${baseUrl}/herramientas`, { waitUntil: "networkidle" });
  const timeGoal = page.getByRole("link", { name: /Recuperar tiempo operativo/ }).first();
  await timeGoal.waitFor();
  assert(
    (await timeGoal.getAttribute("href")) === "/herramientas/calculadora-tiempo-operativo",
    "Tools page does not link to the operational time calculator",
  );

  await page.goto(`${baseUrl}/recursos`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Dos recorridos para pasar del diagnóstico a la acción" }).waitFor();
  const profitabilityPath = page.getByRole("link", { name: /Mejorar la rentabilidad/ });
  const timePath = page.getByRole("link", { name: /Recuperar tiempo operativo/ });
  assert(
    (await profitabilityPath.getAttribute("href")) === "/herramientas/diagnostico-rentabilidad-bodega",
    "Spanish profitability path is incorrect",
  );
  assert(
    (await timePath.getAttribute("href")) === "/herramientas/calculadora-tiempo-operativo",
    "Spanish time path is incorrect",
  );
  await revealScrollableContent(page);
  assert(
    await page.getByRole("link", { name: /Plantilla de carta de vinos/ }).isVisible(),
    "Resource cards did not become visible while scrolling",
  );
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(desktopOverflow <= 1, `Desktop horizontal overflow: ${desktopOverflow}px`);
  await page.screenshot({ path: `${outputDir}/recursos-desktop.png`, fullPage: true });

  await page.goto(`${baseUrl}/en/resources`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Two paths from diagnosis to action" }).waitFor();
  const englishProfitabilityPath = page.getByRole("link", { name: /Improve profitability/ });
  const englishTimePath = page.getByRole("link", { name: /Recover operating time/ });
  assert(
    (await englishProfitabilityPath.getAttribute("href")) === "/en/recursos/diagnostico-fuga-margen-carta-vinos",
    "English profitability fallback is incorrect",
  );
  assert(
    (await englishTimePath.getAttribute("href")) === "/en/recursos/plantilla-revision-mensual-carta",
    "English time fallback is incorrect",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/recursos`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Dos recorridos para pasar del diagnóstico a la acción" }).waitFor();
  await revealScrollableContent(page);
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(mobileOverflow <= 1, `Mobile horizontal overflow: ${mobileOverflow}px`);
  await page.screenshot({ path: `${outputDir}/recursos-mobile.png`, fullPage: true });

  assert(pageErrors.length === 0, `Page errors: ${pageErrors.join(" | ")}`);
  assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(" | ")}`);

  console.log(JSON.stringify({
    journeys: 2,
    localesChecked: ["es", "en"],
    desktopOverflow,
    mobileOverflow,
    pageErrors: pageErrors.length,
    consoleErrors: consoleErrors.length,
  }));
} finally {
  await browser.close();
}
