import fs from "node:fs/promises";

const EDGE_SITEMAP_URL =
  process.env.EDGE_SITEMAP_URL ||
  "https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/sitemap";

const OUTPUT_PATH = new URL("../public/sitemap.xml", import.meta.url);
const FALLBACK_LASTMOD = process.env.SITEMAP_LASTMOD || "2026-07-03";

const strategicFallbackUrls = [
  { path: "/presentacion", priority: "0.7", alternates: "presentation" },
  { path: "/en/presentation", priority: "0.6", alternates: "presentation" },
  { path: "/it/presentazione", priority: "0.6", alternates: "presentation" },
  { path: "/fr/presentation", priority: "0.6", alternates: "presentation" },
  { path: "/de/praesentation", priority: "0.6", alternates: "presentation" },
  { path: "/pt/apresentacao", priority: "0.6", alternates: "presentation" },
  { path: "/producto/cloudrim", priority: "0.7", alternates: "cloudrim" },
  { path: "/en/product/cloudrim", priority: "0.6", alternates: "cloudrim" },
  { path: "/it/prodotto/cloudrim", priority: "0.6", alternates: "cloudrim" },
  { path: "/fr/produit/cloudrim", priority: "0.6", alternates: "cloudrim" },
  { path: "/de/produkt/cloudrim", priority: "0.6", alternates: "cloudrim" },
  { path: "/pt/produto/cloudrim", priority: "0.6", alternates: "cloudrim" },
  { path: "/producto/savia", priority: "0.7", alternates: "savia" },
  { path: "/en/product/savia", priority: "0.6", alternates: "savia" },
  { path: "/it/prodotto/savia", priority: "0.6", alternates: "savia" },
  { path: "/fr/produit/savia", priority: "0.6", alternates: "savia" },
  { path: "/de/produkt/savia", priority: "0.6", alternates: "savia" },
  { path: "/pt/produto/savia", priority: "0.6", alternates: "savia" },
  { path: "/simulador-carta", priority: "0.8", alternates: "simulator" },
  { path: "/en/wine-list-simulator", priority: "0.7", alternates: "simulator" },
  { path: "/it/simulatore-carta", priority: "0.7", alternates: "simulator" },
  { path: "/fr/simulateur-carte", priority: "0.7", alternates: "simulator" },
  { path: "/de/weinkarten-simulator", priority: "0.7", alternates: "simulator" },
  { path: "/pt/simulador-carta", priority: "0.7", alternates: "simulator" },
  { path: "/herramientas/simulador-senal-margenes", priority: "0.6" },
  { path: "/herramientas/test-perfil-rim", priority: "0.6" },
  { path: "/herramientas/simulador-pareto-carta-vinos", priority: "0.6" },
  { path: "/herramientas/calculadora-fuga-margen", priority: "0.6" },
  { path: "/herramientas/comparador-distribuidores", priority: "0.6" },
];

const alternateGroups = {
  presentation: {
    "x-default": "/presentacion",
    es: "/presentacion",
    en: "/en/presentation",
    it: "/it/presentazione",
    fr: "/fr/presentation",
    de: "/de/praesentation",
    pt: "/pt/apresentacao",
  },
  cloudrim: {
    "x-default": "/producto/cloudrim",
    es: "/producto/cloudrim",
    en: "/en/product/cloudrim",
    it: "/it/prodotto/cloudrim",
    fr: "/fr/produit/cloudrim",
    de: "/de/produkt/cloudrim",
    pt: "/pt/produto/cloudrim",
  },
  savia: {
    "x-default": "/producto/savia",
    es: "/producto/savia",
    en: "/en/product/savia",
    it: "/it/prodotto/savia",
    fr: "/fr/produit/savia",
    de: "/de/produkt/savia",
    pt: "/pt/produto/savia",
  },
  simulator: {
    "x-default": "/simulador-carta",
    es: "/simulador-carta",
    en: "/en/wine-list-simulator",
    it: "/it/simulatore-carta",
    fr: "/fr/simulateur-carte",
    de: "/de/weinkarten-simulator",
    pt: "/pt/simulador-carta",
  },
};

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function alternateLinks(groupName) {
  const group = alternateGroups[groupName];
  if (!group) return "";
  return Object.entries(group)
    .map(([lang, path]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="https://winerim.wine${path}"/>`)
    .join("\n");
}

function urlBlock({ path, priority, alternates }) {
  const alternateXml = alternateLinks(alternates);
  return `  <url>
    <loc>https://winerim.wine${path}</loc>
    <lastmod>${FALLBACK_LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>${alternateXml ? `\n${alternateXml}` : ""}
  </url>
`;
}

function ensureAlternates(xml) {
  let nextXml = xml;
  for (const [groupName, group] of Object.entries(alternateGroups)) {
    const links = alternateLinks(groupName);
    for (const path of new Set(Object.values(group))) {
      const loc = `https://winerim.wine${path}`;
      const pattern = new RegExp(`(<url>\\s*<loc>${escapeRegex(loc)}<\\/loc>)([\\s\\S]*?<\\/url>)`);
      nextXml = nextXml.replace(pattern, (match, start, rest) => {
        if (match.includes("<xhtml:link")) return match;
        return `${start}${rest.replace("</url>", `${links}\n  </url>`)}`;
      });
    }
  }
  return nextXml;
}

async function fetchEdgeSitemap() {
  const response = await fetch(EDGE_SITEMAP_URL);

  if (!response.ok) {
    throw new Error(`Could not fetch edge sitemap: ${response.status} ${response.statusText}`);
  }

  const edgeXml = await response.text();

  if (!edgeXml.includes("</urlset>")) {
    throw new Error("Fetched sitemap does not contain a closing </urlset> tag");
  }

  return { xml: edgeXml, source: "edge" };
}

async function readBaseSitemap() {
  if (process.env.SITEMAP_BASE === "edge") {
    return await fetchEdgeSitemap();
  }

  try {
    const localXml = await fs.readFile(OUTPUT_PATH, "utf8");
    if (localXml.includes("</urlset>")) {
      return { xml: localXml, source: "local" };
    }
  } catch {
    // Fall back to the edge sitemap if the local static sitemap is not present.
  }

  return await fetchEdgeSitemap();
}

const { xml: baseXml, source: baseSource } = await readBaseSitemap();

const existingLocs = new Set(
  [...baseXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);

const additions = strategicFallbackUrls
  .filter(({ path }) => !existingLocs.has(`https://winerim.wine${path}`))
  .map(urlBlock)
  .join("");

const mergedXml = ensureAlternates(baseXml.replace("</urlset>", `${additions}</urlset>`));
await fs.writeFile(OUTPUT_PATH, mergedXml);

const finalCount = [...mergedXml.matchAll(/<url>/g)].length;
console.log(
  JSON.stringify(
    {
      baseSource,
      baseUrlCount: existingLocs.size,
      addedUrlCount: strategicFallbackUrls.length - strategicFallbackUrls.filter(({ path }) => existingLocs.has(`https://winerim.wine${path}`)).length,
      finalUrlCount: finalCount,
      output: OUTPUT_PATH.pathname,
    },
    null,
    2,
  ),
);
