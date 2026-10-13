const { chromium } = require("playwright");

const expected = [
  "/herramientas/calculadora-tiempo-operativo",
  "/herramientas/diagnostico-rentabilidad-bodega",
  "/herramientas/calculadora-fuga-margen",
];

const assertPriority = (actual, section) => {
  if (JSON.stringify(actual.slice(0, 3)) !== JSON.stringify(expected)) {
    throw new Error(`${section}: ${JSON.stringify(actual.slice(0, 3))}`);
  }
};

(async () => {
  const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:4327";
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.goto(`${baseUrl}/herramientas`);
  await page.waitForLoadState("networkidle");

  const sections = page.locator("main > section");
  const hrefs = async (section) => section.locator("a").evaluateAll((links) =>
    links.map((link) => new URL(link.href).pathname),
  );
  const startLinks = await hrefs(sections.nth(1));
  const listLinks = await hrefs(sections.nth(2));

  assertPriority(startLinks, "start_here");
  assertPriority(listLinks, "tool_list");
  if (consoleErrors.length > 0) throw new Error(`console: ${JSON.stringify(consoleErrors)}`);
  await page.screenshot({ path: "/tmp/winerim-tools-priority.png", fullPage: true });
  console.log(JSON.stringify({ start_here: startLinks.slice(0, 3), tool_list: listLinks.slice(0, 3) }));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
