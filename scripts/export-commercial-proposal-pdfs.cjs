const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const BASE_URL = (process.env.PROPOSAL_BASE_URL || "http://127.0.0.1:4196").replace(/\/$/, "");
const OUTPUT_DIR = process.env.PDF_OUTPUT_DIR || "/Users/GOIKO/Downloads";
const documents = [
  ["/propuesta-comercial", "winerim-propuesta-comercial.pdf"],
  ["/propuesta-comercial-revo", "winerim-propuesta-comercial-revo.pdf"],
];

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1600, height: 900 } });

  for (const [route, filename] of documents) {
    const page = await context.newPage();
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle", timeout: 60_000 });
    await page.locator(".presentation-slide").nth(33).waitFor({ state: "visible" });
    const downloadPromise = page.waitForEvent("download", { timeout: 360_000 });
    await page.getByRole("button", { name: "PDF", exact: true }).click();
    const download = await downloadPromise;
    const outputPath = path.join(OUTPUT_DIR, filename);
    await download.saveAs(outputPath);
    console.log(`${route} -> ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
    await page.close();
  }

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
