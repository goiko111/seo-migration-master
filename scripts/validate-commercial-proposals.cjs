const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const BASE_URL = (process.env.PROPOSAL_BASE_URL || "http://127.0.0.1:4196").replace(/\/$/, "");
const OUT = path.resolve(process.env.EVIDENCE_DIR || "evidence/commercial-proposals");

const routes = [
  {
    name: "commercial",
    path: "/propuesta-comercial",
    canonical: "https://winerim.wine/propuesta-comercial",
    title: "Propuesta comercial | Winerim",
    mode: "agora",
    screenshotCount: 15,
  },
  {
    name: "commercial-revo",
    path: "/propuesta-comercial-revo",
    canonical: "https://winerim.wine/propuesta-comercial-revo",
    title: "Propuesta comercial REVO | Winerim",
    mode: "revo",
    screenshotCount: 14,
  },
];

const combinations = [
  ["monthly", "none", "https://pagos.winerim.wine/p/ftjeeh"],
  ["annual", "none", "https://pagos.winerim.wine/p/4w46ah"],
  ["none", "monthly", "https://pagos.winerim.wine/p/x3ya3x"],
  ["none", "annual", "https://pagos.winerim.wine/p/jzyxpx"],
  ["monthly", "monthly", "https://pagos.winerim.wine/p/tbnxge"],
  ["annual", "annual", "https://pagos.winerim.wine/p/rf33vb"],
];

async function choose(page, groupIndex, value) {
  const groups = page.locator('.commercial-selection-table tbody tr');
  await groups.nth(groupIndex).locator(`input[value="${value}"]`).check({ force: true });
}

async function inspectRoute(browser, config) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));

  await page.goto(`${BASE_URL}${config.path}`, { waitUntil: "networkidle" });
  const slides = page.locator(".presentation-slide");
  await slides.nth(33).waitFor({ state: "visible" });

  const bodyText = await page.locator("body").innerText();
  const metadata = await page.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href || null,
    robots: document.querySelector('meta[name="robots"]')?.content || null,
    chatDisabled: window.__WINERIM_CHAT_DISABLED__ === true,
    presentationEvents: (window.dataLayer || []).filter((item) => item.event === "presentation_view").length,
  }));

  const payments = [];
  for (const [winerim, integration, expected] of combinations) {
    await page.reload({ waitUntil: "networkidle" });
    await choose(page, 0, winerim);
    await choose(page, 1, integration);
    const actual = await page.locator(".commercial-payment-result a").getAttribute("href");
    payments.push({ winerim, integration, expected, actual, ok: actual === expected });
  }

  let annualSync = null;
  let monthlySync = null;
  await page.reload({ waitUntil: "networkidle" });
  await choose(page, 0, "monthly");
  await choose(page, 1, "monthly");
  await choose(page, 0, "annual");
  annualSync = await page.locator('.commercial-selection-table input[value="annual"]:checked').count();
  await choose(page, 1, "monthly");
  monthlySync = await page.locator('.commercial-selection-table input[value="monthly"]:checked').count();

  await slides.nth(32).scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(OUT, `${config.name}-payment-selection.png`), fullPage: false });

  const result = {
    ...config,
    url: page.url(),
    slideCount: await slides.count(),
    navButtonCount: await page.locator("nav button").count(),
    hasClientName: /saddle/i.test(bodyText),
    hasWrongIntegration: config.mode === "revo" && /ágora/i.test(bodyText),
    screenshotLinks: await page.locator(".commercial-product-shot > a").evaluateAll((anchors) => anchors.map((anchor) => anchor.href)),
    metadata,
    payments,
    annualSync,
    monthlySync,
    errors,
  };
  await page.close();
  return result;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  for (const route of routes) results.push(await inspectRoute(browser, route));
  await browser.close();

  fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));

  for (const result of results) {
    if (result.slideCount !== 34 || result.navButtonCount !== 34) process.exitCode = 1;
    if (result.metadata.title !== result.title || result.metadata.canonical !== result.canonical) process.exitCode = 1;
    if (result.metadata.robots !== "noindex, follow") process.exitCode = 1;
    if (!result.metadata.chatDisabled || result.metadata.presentationEvents !== 0) process.exitCode = 1;
    if (result.hasClientName) process.exitCode = 1;
    if (result.screenshotLinks.length !== result.screenshotCount || result.screenshotLinks.some((href) => !href.includes("/commercial-assets/product-proof/"))) process.exitCode = 1;
    if (result.payments.some((payment) => !payment.ok)) process.exitCode = 1;
    if (result.annualSync !== 2 || result.monthlySync !== 2) process.exitCode = 1;
    if (result.hasWrongIntegration) process.exitCode = 1;
    if (result.errors.length) process.exitCode = 1;
  }
})();
