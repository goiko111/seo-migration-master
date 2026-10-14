const base = process.env.BASE_URL || "https://winerim.wine";
const routes = [
  "/herramientas/planificador-pedido-semanal-vino",
  "/en/tools/weekly-wine-order-planner",
  "/herramientas/calculadora-rentabilidad-menu-maridaje",
  "/en/tools/pairing-menu-profitability-calculator",
  "/herramientas/conciliador-stock-vino",
  "/en/tools/wine-stock-reconciliation",
  "/herramientas/simulador-rotura-stock-vino",
  "/en/tools/wine-stockout-risk-calculator",
  "/herramientas/simulador-impacto-integracion-tpv",
  "/en/tools/pos-integration-impact-calculator",
];

const agents = {
  human: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36",
  googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  oai: "OAI-SearchBot/1.0; +https://openai.com/searchbot",
};

const failures = [];
const checks = [];

for (const route of routes) {
  const expectedCanonical = `${base}${route}`;
  for (const [agent, userAgent] of Object.entries(agents)) {
    const response = await fetch(expectedCanonical, { headers: { "user-agent": userAgent } });
    const html = await response.text();
    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]
      || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
    checks.push(`${agent} ${route} ${response.status}`);
    if (response.status !== 200) failures.push(`${agent} ${route}: HTTP ${response.status}`);
    if (canonical !== expectedCanonical) failures.push(`${agent} ${route}: canonical ${canonical || "missing"}`);
    if (agent !== "human" && !/<h1[\s>]/i.test(html)) failures.push(`${agent} ${route}: prerendered H1 missing`);
  }
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
if (sitemapResponse.status !== 200) failures.push(`/sitemap.xml: HTTP ${sitemapResponse.status}`);
for (const route of routes) {
  const loc = `<loc>${base}${route}</loc>`;
  const count = sitemap.split(loc).length - 1;
  if (count !== 1) failures.push(`${route}: sitemap loc count ${count}`);
}

for (const route of ["/", "/funcionalidades"]) {
  const response = await fetch(`${base}${route}`);
  checks.push(`human ${route} ${response.status}`);
  if (response.status !== 200) failures.push(`${route}: HTTP ${response.status}`);
}

for (const route of ["/terminos", "/politica-privacidad"]) {
  const response = await fetch(`${base}${route}`);
  const robots = response.headers.get("x-robots-tag") || "";
  checks.push(`legal ${route} ${response.status} ${robots}`);
  if (response.status !== 200) failures.push(`${route}: HTTP ${response.status}`);
  if (!robots.toLowerCase().includes("noindex")) failures.push(`${route}: X-Robots-Tag noindex missing`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`PRODUCTION_OK ${checks.length} HTTP checks, ${routes.length} exact sitemap locs`);
