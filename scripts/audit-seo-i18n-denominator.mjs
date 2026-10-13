import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://winerim.wine";
const LANGS = ["es", "en", "it", "fr", "de", "pt"];
const reportDate = process.argv.includes("--date")
  ? process.argv[process.argv.indexOf("--date") + 1]
  : new Date().toISOString().slice(0, 10);

const read = (path) => readFileSync(join(ROOT, path), "utf8");

function parseSource(path) {
  return ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function propertyName(node) {
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node) || ts.isIdentifier(node)) return node.text;
  return undefined;
}

function literalValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(
      node.properties.flatMap((property) => {
        if (!ts.isPropertyAssignment(property)) return [];
        const name = propertyName(property.name);
        if (!name) return [];
        return [[name, literalValue(property.initializer)]];
      }),
    );
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalValue);
  if (ts.isNewExpression(node) && node.arguments?.length === 1) return literalValue(node.arguments[0]);
  return undefined;
}

function findVariable(path, name) {
  const source = parseSource(path);
  let value;

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer) {
      value = literalValue(node.initializer);
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  if (value === undefined) throw new Error(`Could not parse ${name} from ${path}`);
  return value;
}

function objectKeys(path, name) {
  const source = parseSource(path);
  const keys = [];

  function visit(node) {
    if (
      ts.isVariableDeclaration(node)
      && ts.isIdentifier(node.name)
      && node.name.text === name
      && node.initializer
      && ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const property of node.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = propertyName(property.name);
        if (key) keys.push(key);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return new Set(keys);
}

function nestedObjectStringValues(path, propertyToFind) {
  const source = parseSource(path);
  const values = new Set();

  function visit(node) {
    if (ts.isPropertyAssignment(node) && propertyName(node.name) === propertyToFind && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const value = literalValue(property.initializer);
        if (typeof value === "string") values.add(value);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(source);
  return values;
}

function registeredReactRoutes() {
  const source = read("src/App.tsx");
  const routes = new Set();
  const literalPattern = /<Route\s+path="([^"]+)"/g;
  const templatePattern = /<Route\s+path=\{`\$\{prefix\}([^`]*)`\}/g;
  const prefixes = [...source.matchAll(/langRoutes\("([^"]+)"\)/g)].map((match) => match[1]);

  for (const match of source.matchAll(literalPattern)) routes.add(match[1]);
  for (const match of source.matchAll(templatePattern)) {
    for (const prefix of prefixes) routes.add(`${prefix}${match[1]}`);
  }

  return routes;
}

const frontendMap = findVariable("src/i18n/types.ts", "ROUTE_MAP");
const sitemapMap = findVariable("supabase/functions/sitemap/index.ts", "ROUTE_MAP");
const prerenderMap = findVariable("supabase/functions/prerender/index.ts", "STATIC_LOCALIZED_ROUTES");
const sitemapRoutes = findVariable("supabase/functions/sitemap/index.ts", "STATIC_ROUTES");
const sitemapExclusions = new Set(findVariable("supabase/functions/sitemap/index.ts", "TEMPORARILY_EXCLUDED_STATIC_SITEMAP_PATHS"));
const prerenderTemplates = objectKeys("supabase/functions/prerender/index.ts", "STATIC_PAGES");
const workerTemplates = objectKeys("cloudflare-worker-v3-hybrid.js", "STATIC_WORKER_PRERENDER_PAGES");
const workerGeneratedPaths = nestedObjectStringValues("cloudflare-worker-v3-hybrid.js", "paths");
const reactRoutes = registeredReactRoutes();

const indexableRoutes = sitemapRoutes
  .filter((route) => route?.multilang === true)
  .map((route) => route.esPath)
  .filter((path) => !sitemapExclusions.has(path))
  .filter((path) => !path.startsWith("/biblioteca-vino"))
  .sort();

const rows = [];
for (const esPath of indexableRoutes) {
  for (const lang of LANGS) {
    const frontendPath = lang === "es" ? esPath : frontendMap[lang]?.[esPath];
    const sitemapPath = lang === "es" ? esPath : sitemapMap[lang]?.[esPath];
    const prerenderPath = lang === "es" ? esPath : prerenderMap[lang]?.[esPath];
    const expectedPath = frontendPath || sitemapPath || prerenderPath || null;
    const mapAgreement = Boolean(
      expectedPath
      && frontendPath === expectedPath
      && sitemapPath === expectedPath
      && prerenderPath === expectedPath,
    );
    const reactRegistered = Boolean(expectedPath && reactRoutes.has(expectedPath));
    const sitemapEmitted = Boolean(sitemapPath);
    const prerenderReady = Boolean(prerenderPath && prerenderTemplates.has(esPath));
    const workerReady = Boolean(expectedPath && (workerTemplates.has(expectedPath) || workerGeneratedPaths.has(expectedPath)));
    const botReady = prerenderReady || workerReady;
    const pass = mapAgreement && reactRegistered && sitemapEmitted && botReady;

    rows.push({
      esPath,
      lang,
      expectedPath,
      canonical: expectedPath ? `${SITE}${expectedPath}` : null,
      frontendPath: frontendPath || null,
      sitemapPath: sitemapPath || null,
      prerenderPath: prerenderPath || null,
      mapAgreement,
      reactRegistered,
      sitemapEmitted,
      prerenderTemplate: prerenderTemplates.has(esPath),
      prerenderReady,
      workerReady,
      botReady,
      pass,
    });
  }
}

const failures = rows.filter((row) => !row.pass);
const summary = {
  generatedAt: new Date().toISOString(),
  reportDate,
  languages: LANGS,
  routes: indexableRoutes.length,
  denominator: rows.length,
  passing: rows.length - failures.length,
  failing: failures.length,
  coveragePercent: rows.length ? Number((((rows.length - failures.length) / rows.length) * 100).toFixed(1)) : 0,
  surfaces: [
    "frontend route map",
    "React router",
    "sitemap route map/emission",
    "Supabase prerender route map/template",
    "Cloudflare Worker static bot template",
  ],
};

const outputBase = join(ROOT, "docs", "agent_outputs", `seo_i18n_denominator_${reportDate}`);
mkdirSync(dirname(outputBase), { recursive: true });
writeFileSync(`${outputBase}.json`, `${JSON.stringify({ summary, rows }, null, 2)}\n`);

const csvHeaders = [
  "esPath", "lang", "expectedPath", "canonical", "frontendPath", "sitemapPath", "prerenderPath",
  "mapAgreement", "reactRegistered", "sitemapEmitted", "prerenderTemplate", "prerenderReady", "workerReady", "botReady", "pass",
];
const csvEscape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
writeFileSync(
  `${outputBase}.csv`,
  `${csvHeaders.join(",")}\n${rows.map((row) => csvHeaders.map((key) => csvEscape(row[key])).join(",")).join("\n")}\n`,
);

const failureTable = failures.length
  ? failures.map((row) => `| \`${row.esPath}\` | ${row.lang} | \`${row.expectedPath || "missing"}\` | ${row.mapAgreement ? "yes" : "no"} | ${row.reactRegistered ? "yes" : "no"} | ${row.sitemapEmitted ? "yes" : "no"} | ${row.prerenderReady ? "yes" : "no"} | ${row.workerReady ? "yes" : "no"} |`).join("\n")
  : "| - | - | - | - | - | - | - | - |";

const markdown = `# SEO/i18n denominator — ${reportDate}\n\n`
  + `## Scope\n\n`
  + `Indexable static routes declared multilang in the sitemap are crossed with ${LANGS.length} supported languages and the frontend, sitemap and two bot-rendering surfaces. Legal/noindex routes, dynamic articles and Wine Library routes use separate policies and validators and are not counted here. This is a source/package audit, not a Search Console report.\n\n`
  + `## Result\n\n`
  + `- Routes: **${summary.routes}**\n`
  + `- Route × language denominator: **${summary.denominator}**\n`
  + `- Passing: **${summary.passing}**\n`
  + `- Failing: **${summary.failing}**\n`
  + `- Coverage: **${summary.coveragePercent}%**\n\n`
  + `## Failures\n\n`
  + `| ES route | Lang | Expected path | Maps agree | React | Sitemap | Supabase | Worker |\n`
  + `|---|---|---|---:|---:|---:|---:|---:|\n${failureTable}\n\n`
  + `## Interpretation\n\n`
  + `A passing row means the same localized path exists in the frontend, sitemap and Supabase prerender maps, React registers it, the sitemap emits it and at least one bot renderer has an applicable template. It does not prove production deployment, translation quality, indexing or Search Console status.\n`;

writeFileSync(`${outputBase}.md`, markdown);
console.log(JSON.stringify({ summary, outputBase, failures }, null, 2));

if (failures.length) process.exitCode = 1;
