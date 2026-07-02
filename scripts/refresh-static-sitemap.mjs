import fs from "node:fs/promises";

const EDGE_SITEMAP_URL =
  process.env.EDGE_SITEMAP_URL ||
  "https://pwkqbcgjrhoyxrsmcypw.supabase.co/functions/v1/sitemap";

const OUTPUT_PATH = new URL("../public/sitemap.xml", import.meta.url);
const FALLBACK_LASTMOD = process.env.SITEMAP_LASTMOD || "2026-07-02";

const strategicFallbackUrls = [
  { loc: "https://winerim.wine/producto/cloudrim", priority: "0.7" },
  { loc: "https://winerim.wine/en/product/cloudrim", priority: "0.6" },
  { loc: "https://winerim.wine/it/prodotto/cloudrim", priority: "0.6" },
  { loc: "https://winerim.wine/fr/produit/cloudrim", priority: "0.6" },
  { loc: "https://winerim.wine/de/produkt/cloudrim", priority: "0.6" },
  { loc: "https://winerim.wine/pt/produto/cloudrim", priority: "0.6" },
  { loc: "https://winerim.wine/producto/savia", priority: "0.7" },
  { loc: "https://winerim.wine/en/product/savia", priority: "0.6" },
  { loc: "https://winerim.wine/it/prodotto/savia", priority: "0.6" },
  { loc: "https://winerim.wine/fr/produit/savia", priority: "0.6" },
  { loc: "https://winerim.wine/de/produkt/savia", priority: "0.6" },
  { loc: "https://winerim.wine/pt/produto/savia", priority: "0.6" },
];

function urlBlock({ loc, priority }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${FALLBACK_LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

const response = await fetch(EDGE_SITEMAP_URL);

if (!response.ok) {
  throw new Error(`Could not fetch edge sitemap: ${response.status} ${response.statusText}`);
}

const edgeXml = await response.text();

if (!edgeXml.includes("</urlset>")) {
  throw new Error("Fetched sitemap does not contain a closing </urlset> tag");
}

const existingLocs = new Set(
  [...edgeXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
);

const additions = strategicFallbackUrls
  .filter(({ loc }) => !existingLocs.has(loc))
  .map(urlBlock)
  .join("");

const mergedXml = edgeXml.replace("</urlset>", `${additions}</urlset>`);
await fs.writeFile(OUTPUT_PATH, mergedXml);

const finalCount = [...mergedXml.matchAll(/<url>/g)].length;
console.log(
  JSON.stringify(
    {
      edgeUrlCount: existingLocs.size,
      addedUrlCount: strategicFallbackUrls.length - strategicFallbackUrls.filter(({ loc }) => existingLocs.has(loc)).length,
      finalUrlCount: finalCount,
      output: OUTPUT_PATH.pathname,
    },
    null,
    2,
  ),
);
