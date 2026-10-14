import fs from "node:fs/promises";
import { chromium } from "/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const base = process.env.BASE_URL || "http://127.0.0.1:4233";
const out = process.env.SCREENSHOT_DIR || "docs/agent_outputs/tpv_and_decision_tools_2026-10-14/local";
await fs.mkdir(out, { recursive: true });

const tools = [
  {
    slug: "order",
    es: "/herramientas/planificador-pedido-semanal-vino",
    en: "/en/tools/weekly-wine-order-planner",
    esHeading: "¿Qué vino deberías pedir esta semana?",
    enHeading: "What wine should you order this week?",
    expectedResult: "Vinos pendientes de confirmar con proveedor",
    uniqueSelector: ".order-manifest",
  },
  {
    slug: "pairing",
    es: "/herramientas/calculadora-rentabilidad-menu-maridaje",
    en: "/en/tools/pairing-menu-profitability-calculator",
    esHeading: "¿Es rentable tu maridaje?",
    enHeading: "Is your wine pairing profitable?",
    expectedResult: "Botellas consumidas al mes",
    uniqueSelector: ".pairing-pnl",
  },
  {
    slug: "reconciliation",
    es: "/herramientas/conciliador-stock-vino",
    en: "/en/tools/wine-stock-reconciliation",
    esHeading: "¿Dónde se descuadra tu stock de vino?",
    enHeading: "Where does your wine stock diverge?",
    expectedResult: "Botellas que faltan en el recuento",
    uniqueSelector: ".recon-audit-board",
  },
  {
    slug: "stockout",
    es: "/herramientas/simulador-rotura-stock-vino",
    en: "/en/tools/wine-stockout-risk-calculator",
    esHeading: "¿Qué te cuesta quedarte sin un vino?",
    enHeading: "What does running out of a wine cost?",
    expectedResult: "Margen protegido si el cliente acepta otro vino",
    uniqueSelector: ".stockout-radar",
  },
  {
    slug: "tpv-impact",
    es: "/herramientas/simulador-impacto-integracion-tpv",
    en: "/en/tools/pos-integration-impact-calculator",
    esHeading: "¿Qué cambia al conectar todos tus centros con el TPV?",
    enHeading: "What changes when every location is connected to the POS?",
    esCalculate: "Calcular impacto",
    enCalculate: "Calculate impact",
    expectedResult: "Errores o incidencias que podrían evitarse al mes",
    uniqueSelector: ".tpv-before-after",
  },
];

async function rejectCookies(page, language) {
  const label = language === "es" ? "Rechazar" : "Reject";
  const button = page.getByRole("button", { name: label, exact: true });
  if (await button.isVisible().catch(() => false)) await button.click();
}

async function assertNoOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    width: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  if (dimensions.scrollWidth > dimensions.width + 1) {
    throw new Error(`${label}: horizontal overflow ${dimensions.scrollWidth}px > ${dimensions.width}px`);
  }
}

async function assertNoKeyOverlap(page, label) {
  const collisions = await page.evaluate(() => {
    const intersects = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
    const issues = [];
    const intro = document.querySelector(".profit-intro > p:not(.profit-eyebrow)");
    const privacy = document.querySelector(".profit-intro .profit-local");
    if (intro && privacy && intersects(intro.getBoundingClientRect(), privacy.getBoundingClientRect())) issues.push("intro/privacy badge");
    document.querySelectorAll(".decision-field").forEach((field, index) => {
      const labelNode = field.querySelector(":scope > span:first-child");
      const control = field.querySelector(":scope > input, :scope > select, :scope > .decision-input-wrap");
      const help = field.querySelector(":scope > .decision-field-help");
      if (labelNode && control && intersects(labelNode.getBoundingClientRect(), control.getBoundingClientRect())) issues.push(`field ${index} label/control`);
      if (control && help && intersects(control.getBoundingClientRect(), help.getBoundingClientRect())) issues.push(`field ${index} control/help`);
    });
    return issues;
  });
  if (collisions.length) throw new Error(`${label}: overlapping elements: ${collisions.join(", ")}`);
}

async function runSpanishFlow(page, tool, viewportName) {
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  const response = await page.goto(`${base}${tool.es}`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${tool.es}: HTTP ${response?.status()}`);
  await page.getByRole("heading", { name: tool.esHeading, level: 1 }).waitFor();
  await rejectCookies(page, "es");
  await assertNoOverflow(page, `${tool.slug}-${viewportName}-context`);
  await assertNoKeyOverlap(page, `${tool.slug}-${viewportName}-context`);
  if (await page.locator(".decision-field-help").count() < 2) throw new Error(`${tool.es}: field guidance is missing`);
  if (viewportName === "desktop") {
    await page.screenshot({ path: `${out}/${tool.slug}-desktop-context.png`, fullPage: true });
    await page.screenshot({ path: `${out}/${tool.slug}-desktop-context-viewport.png` });
  }

  await page.getByRole("button", { name: "Cargar ejemplo ficticio", exact: true }).first().click();
  await assertNoKeyOverlap(page, `${tool.slug}-${viewportName}-input`);
  if (await page.locator(".decision-field-help").count() < 4) throw new Error(`${tool.es}: row guidance is missing`);
  if (viewportName === "desktop") {
    await page.screenshot({ path: `${out}/${tool.slug}-desktop-input.png`, fullPage: true });
    await page.screenshot({ path: `${out}/${tool.slug}-desktop-input-viewport.png` });
  } else {
    await page.screenshot({ path: `${out}/${tool.slug}-mobile-input.png`, fullPage: true });
  }
  await page.getByRole("button", { name: tool.esCalculate || "Calcular", exact: true }).click();
  await page.locator(".decision-result").waitFor();
  await page.locator(tool.uniqueSelector).waitFor();
  await page.getByText(tool.expectedResult, { exact: true }).waitFor();
  await assertNoOverflow(page, `${tool.slug}-${viewportName}-result`);
  await page.screenshot({ path: `${out}/${tool.slug}-${viewportName}-result.png`, fullPage: true });

  if (viewportName === "desktop") {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Descargar escenario", exact: true }).click();
    const download = await downloadPromise;
    if (!download.suggestedFilename().endsWith(".csv")) {
      throw new Error(`${tool.es}: expected a CSV download, received ${download.suggestedFilename()}`);
    }
  }

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  if (canonical !== `https://winerim.wine${tool.es}`) {
    throw new Error(`${tool.es}: unexpected canonical ${canonical}`);
  }
  if (await page.getByText("Introduce tu email", { exact: false }).count()) {
    throw new Error(`${tool.es}: global lead gate is visible`);
  }
  if (consoleErrors.length || pageErrors.length) {
    throw new Error(`${tool.es}: browser errors: ${[...consoleErrors, ...pageErrors].join(" | ")}`);
  }
}

async function checkEnglish(page, tool) {
  const response = await page.goto(`${base}${tool.en}`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${tool.en}: HTTP ${response?.status()}`);
  await page.getByRole("heading", { name: tool.enHeading, level: 1 }).waitFor();
  await rejectCookies(page, "en");
  await page.getByRole("button", { name: "Load fictional example", exact: true }).first().click();
  await page.getByRole("button", { name: tool.enCalculate || "Calculate", exact: true }).click();
  await page.locator(".decision-result").waitFor();
  await page.locator(tool.uniqueSelector).waitFor();
  await assertNoOverflow(page, `${tool.slug}-en`);
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  if (canonical !== `https://winerim.wine${tool.en}`) {
    throw new Error(`${tool.en}: unexpected canonical ${canonical}`);
  }
}

const browser = await chromium.launch({ headless: true });

for (const tool of tools) {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await runSpanishFlow(desktop, tool, "desktop");
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await runSpanishFlow(mobile, tool, "mobile");
  await mobile.close();
}

const english = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
for (const tool of tools) await checkEnglish(english, tool);
await english.close();

const hub = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await hub.goto(`${base}/herramientas`, { waitUntil: "networkidle" });
await rejectCookies(hub, "es");
const expectedFeatured = [
  "/herramientas/calculadora-tiempo-operativo",
  "/herramientas/diagnostico-rentabilidad-bodega",
  "/herramientas/calculadora-fuga-margen",
  "/herramientas/calculadora-mermas-vino",
];
const featuredHrefs = await hub.locator('[data-tool-priority="goals"] a').evaluateAll((anchors) =>
  anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
);
if (JSON.stringify(featuredHrefs) !== JSON.stringify(expectedFeatured)) {
  throw new Error(`/herramientas featured priority mismatch: ${JSON.stringify(featuredHrefs)}`);
}
const catalogHrefs = await hub.locator('[data-tool-priority="catalog"] a').evaluateAll((anchors) =>
  anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
);
const allHrefs = [...featuredHrefs, ...catalogHrefs];
if (new Set(allHrefs).size !== allHrefs.length) {
  throw new Error(`/herramientas repeats tool routes: ${JSON.stringify(allHrefs)}`);
}
for (const tool of tools) {
  if (!allHrefs.includes(tool.es)) throw new Error(`/herramientas is missing ${tool.es}`);
}
const expectedGroups = ["diagnosis", "margin", "operations", "supply", "service", "groups"];
const renderedGroups = await hub.locator("[data-tool-group]").evaluateAll((groups) =>
  groups.map((group) => group.getAttribute("data-tool-group")),
);
if (JSON.stringify(renderedGroups) !== JSON.stringify(expectedGroups)) {
  throw new Error(`/herramientas group order mismatch: ${JSON.stringify(renderedGroups)}`);
}
const marginHrefs = await hub.locator('[data-tool-group="margin"] a').evaluateAll((anchors) =>
  anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
);
if (!marginHrefs.includes("/herramientas/calculadora-precio-vino-por-copa")) {
  throw new Error("/herramientas should classify the by-the-glass calculator under margin and pricing");
}
await assertNoOverflow(hub, "tools-hub-desktop");
await hub.screenshot({ path: `${out}/tools-hub-desktop.png`, fullPage: true });
await hub.close();

const mobileHub = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await mobileHub.goto(`${base}/herramientas`, { waitUntil: "networkidle" });
await rejectCookies(mobileHub, "es");
await assertNoOverflow(mobileHub, "tools-hub-mobile");
const mobileHrefs = await mobileHub.locator('[data-tool-priority="goals"] a, [data-tool-priority="catalog"] a').evaluateAll((anchors) =>
  anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
);
if (new Set(mobileHrefs).size !== mobileHrefs.length) {
  throw new Error(`/herramientas repeats tool routes on mobile: ${JSON.stringify(mobileHrefs)}`);
}
await mobileHub.screenshot({ path: `${out}/tools-hub-mobile.png`, fullPage: true });
await mobileHub.close();

await browser.close();
console.log(`UI_OK ${out}`);
