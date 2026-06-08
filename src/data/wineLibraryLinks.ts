import { getAllGrapeSlugs, getCatalogEntry } from "./grapesLibrary";
import { getAllCountrySlugs, getAllRegionSlugs, getRegionBySlug } from "./regionsLibrary";
import { getAllStyles } from "./stylesLibrary";
import { pairingEntries } from "./pairingsLibrary";

export type TagCategory = "grape" | "region" | "style" | "pairing" | "auto";
export type WineLibraryEntityType = Exclude<TagCategory, "auto">;

interface ResolvedLibraryLink {
  slug: string;
  path: string;
}

type LibraryLookup = Record<WineLibraryEntityType, Map<string, ResolvedLibraryLink>>;

export interface StrategicWineLibraryLinkItem {
  name: string;
  hint: WineLibraryEntityType;
}

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const lookupOrder: WineLibraryEntityType[] = ["grape", "region", "style", "pairing"];

const createLookup = (): LibraryLookup => ({
  grape: new Map(),
  region: new Map(),
  style: new Map(),
  pairing: new Map(),
});

const aliasTargets: Array<[string, string, WineLibraryEntityType]> = [
  ["Xarel-lo", "xarello", "grape"],
  ["Xarel·lo", "xarello", "grape"],
  ["Xarello", "xarello", "grape"],
  ["Borgoña", "bourgogne", "region"],
  ["Borgona", "bourgogne", "region"],
  ["Burdeos", "bordeaux", "region"],
  ["Champaña", "champagne", "region"],
  ["Champan", "champagne", "region"],
  ["Rias Baixas", "rias-baixas", "region"],
  ["Rías Baixas", "rias-baixas", "region"],
  ["Melon de Bourgogne", "muscadet", "grape"],
  ["Melon", "muscadet", "grape"],
  ["Muscadet Sèvre-et-Maine", "muscadet", "region"],
  ["Muscadet Sevre-et-Maine", "muscadet", "region"],
  ["Muscadet sur Lie", "muscadet", "region"],
  ["blanco con lias", "blanco-crianza-lias", "style"],
  ["blanco con lías", "blanco-crianza-lias", "style"],
  ["blanco sobre lias", "blanco-crianza-lias", "style"],
  ["espumoso metodo tradicional", "espumoso", "style"],
  ["espumoso método tradicional", "espumoso", "style"],
  ["metodo tradicional", "espumoso", "style"],
  ["método tradicional", "espumoso", "style"],
  ["rosado gastronomico", "rosado-cuerpo", "style"],
  ["rosado gastronómico", "rosado-cuerpo", "style"],
  ["rosado con estructura", "rosado-cuerpo", "style"],
  ["pescado blanco", "lubina-dorada", "pairing"],
  ["pescados blancos", "lubina-dorada", "pairing"],
  ["marisco", "pescados-y-mariscos", "pairing"],
  ["mariscos", "pescados-y-mariscos", "pairing"],
  ["arroces", "pasta-arroces-y-legumbres", "pairing"],
  ["arroz", "pasta-arroces-y-legumbres", "pairing"],
  ["cocina asiatica", "cocina-asiatica-y-fusion", "pairing"],
  ["cocina asiática", "cocina-asiatica-y-fusion", "pairing"],
];

const addLink = (lookup: LibraryLookup, category: WineLibraryEntityType, key: string, link: ResolvedLibraryLink) => {
  lookup[category].set(key.toLowerCase(), link);
  lookup[category].set(slugify(key), link);
};

const addAlias = (lookup: LibraryLookup, alias: string, targetKey: string, category: WineLibraryEntityType) => {
  const target = lookup[category].get(targetKey) || lookup[category].get(slugify(targetKey));
  if (!target) return;
  addLink(lookup, category, alias, target);
};

const buildLookup = (() => {
  let cache: LibraryLookup | null = null;

  return () => {
    if (cache) return cache;
    cache = createLookup();

    getAllGrapeSlugs().forEach((slug) => {
      const entry = getCatalogEntry(slug);
      if (!entry) return;
      const link = { slug, path: `/biblioteca-vino/uvas/${slug}` };
      addLink(cache!, "grape", entry.name, link);
      addLink(cache!, "grape", slug, link);
    });

    getAllCountrySlugs().forEach((slug) => {
      addLink(cache!, "region", slug, { slug, path: `/biblioteca-vino/regiones/${slug}` });
    });

    getAllRegionSlugs().forEach((slug) => {
      const entry = getRegionBySlug(slug);
      if (!entry) return;
      const path = `/biblioteca-vino/regiones/${entry.country}/${slug}`;
      const link = { slug, path };
      addLink(cache!, "region", entry.name, link);
      addLink(cache!, "region", slug, link);
      entry.altNames?.forEach((alt) => addLink(cache!, "region", alt, link));
    });

    getAllStyles().forEach((entry) => {
      const link = { slug: entry.slug, path: `/biblioteca-vino/estilos/${entry.slug}` };
      addLink(cache!, "style", entry.name, link);
      addLink(cache!, "style", entry.slug, link);
    });

    pairingEntries.forEach((entry) => {
      const link = { slug: entry.slug, path: `/biblioteca-vino/maridajes/${entry.slug}` };
      addLink(cache!, "pairing", entry.name, link);
      addLink(cache!, "pairing", entry.slug, link);
    });

    aliasTargets.forEach(([alias, target, category]) => addAlias(cache!, alias, target, category));

    return cache;
  };
})();

const strategicLinks: Record<WineLibraryEntityType, Record<string, StrategicWineLibraryLinkItem[]>> = {
  grape: {
    tempranillo: [
      { name: "Rioja", hint: "region" },
      { name: "Ribera del Duero", hint: "region" },
      { name: "Tinto crianza", hint: "style" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    garnacha: [
      { name: "Priorat", hint: "region" },
      { name: "Rioja", hint: "region" },
      { name: "Rosado gastronómico", hint: "style" },
      { name: "Tinto crianza", hint: "style" },
      { name: "arroces", hint: "pairing" },
    ],
    albarino: [
      { name: "Rías Baixas", hint: "region" },
      { name: "marisco", hint: "pairing" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "Cocina asiática", hint: "pairing" },
      { name: "Blanco con lías", hint: "style" },
    ],
    verdejo: [
      { name: "Rueda", hint: "region" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "marisco", hint: "pairing" },
      { name: "arroces", hint: "pairing" },
      { name: "Blanco con lías", hint: "style" },
    ],
    godello: [
      { name: "Rías Baixas", hint: "region" },
      { name: "Blanco con lías", hint: "style" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    chardonnay: [
      { name: "Borgoña", hint: "region" },
      { name: "Champagne", hint: "region" },
      { name: "Blanco con lías", hint: "style" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "quesos", hint: "pairing" },
    ],
    "cabernet-sauvignon": [
      { name: "Burdeos", hint: "region" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    "pinot-noir": [
      { name: "Borgoña", hint: "region" },
      { name: "Champagne", hint: "region" },
      { name: "Rosado gastronómico", hint: "style" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    "sauvignon-blanc": [
      { name: "pescado blanco", hint: "pairing" },
      { name: "Cocina asiática", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    riesling: [
      { name: "Cocina asiática", hint: "pairing" },
      { name: "marisco", hint: "pairing" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "quesos", hint: "pairing" },
    ],
    syrah: [
      { name: "Priorat", hint: "region" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Tinto crianza", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    merlot: [
      { name: "Burdeos", hint: "region" },
      { name: "Tinto crianza", hint: "style" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    malbec: [
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    nebbiolo: [
      { name: "Tinto reserva", hint: "style" },
      { name: "arroces", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    sangiovese: [
      { name: "Tinto crianza", hint: "style" },
      { name: "arroces", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    monastrell: [
      { name: "Tinto crianza", hint: "style" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "arroces", hint: "pairing" },
    ],
    viura: [
      { name: "Rioja", hint: "region" },
      { name: "Blanco con lías", hint: "style" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    "chenin-blanc": [
      { name: "Blanco con lías", hint: "style" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "Cocina asiática", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    xarello: [
      { name: "Penedès", hint: "region" },
      { name: "Cava", hint: "style" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "marisco", hint: "pairing" },
      { name: "arroces", hint: "pairing" },
    ],
    "touriga-nacional": [
      { name: "Douro", hint: "region" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    mencia: [
      { name: "Bierzo", hint: "region" },
      { name: "Ribeira Sacra", hint: "region" },
      { name: "Tinto ligero", hint: "style" },
      { name: "Pato confitado", hint: "pairing" },
      { name: "Risotto de setas", hint: "pairing" },
    ],
    "cabernet-franc": [
      { name: "Burdeos", hint: "region" },
      { name: "Tinto ligero", hint: "style" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Pato confitado", hint: "pairing" },
      { name: "Solomillo de ternera", hint: "pairing" },
    ],
    gamay: [
      { name: "Beaujolais", hint: "region" },
      { name: "Tinto ligero", hint: "style" },
      { name: "Tapas y aperitivos", hint: "pairing" },
      { name: "Pato confitado", hint: "pairing" },
      { name: "Verduras y cocina vegetariana", hint: "pairing" },
    ],
    gewurztraminer: [
      { name: "Blanco joven", hint: "style" },
      { name: "Cocina asiática", hint: "pairing" },
      { name: "Queso azul", hint: "pairing" },
      { name: "Postres y chocolate", hint: "pairing" },
      { name: "Tapas y aperitivos", hint: "pairing" },
    ],
    viognier: [
      { name: "Blanco joven", hint: "style" },
      { name: "Blanco con lías", hint: "style" },
      { name: "Aves y caza", hint: "pairing" },
      { name: "Cocina asiática", hint: "pairing" },
      { name: "Queso de cabra", hint: "pairing" },
    ],
    "gruner-veltliner": [
      { name: "Blanco mineral", hint: "style" },
      { name: "Verduras y cocina vegetariana", hint: "pairing" },
      { name: "Maridaje con pescados y mariscos", hint: "pairing" },
      { name: "Tapas y aperitivos", hint: "pairing" },
    ],
    "pinot-grigio": [
      { name: "Blanco joven", hint: "style" },
      { name: "Maridaje con pescados y mariscos", hint: "pairing" },
      { name: "Tapas y aperitivos", hint: "pairing" },
      { name: "Verduras y cocina vegetariana", hint: "pairing" },
    ],
    barbera: [
      { name: "Piemonte", hint: "region" },
      { name: "Tinto ligero", hint: "style" },
      { name: "Risotto de setas", hint: "pairing" },
      { name: "Pasta a la carbonara", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    primitivo: [
      { name: "Tinto con cuerpo", hint: "style" },
      { name: "Solomillo de ternera", hint: "pairing" },
      { name: "Cordero asado", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    aglianico: [
      { name: "Tinto con cuerpo", hint: "style" },
      { name: "Cordero asado", hint: "pairing" },
      { name: "Solomillo de ternera", hint: "pairing" },
      { name: "Queso azul", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    graciano: [
      { name: "Rioja", hint: "region" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Cordero asado", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    muscadet: [
      { name: "Muscadet", hint: "region" },
      { name: "Blanco mineral", hint: "style" },
      { name: "Blanco con lías", hint: "style" },
      { name: "Ostras", hint: "pairing" },
      { name: "Maridaje con pescados y mariscos", hint: "pairing" },
    ],
    semillon: [
      { name: "Blanco con lías", hint: "style" },
      { name: "quesos", hint: "pairing" },
      { name: "Postres y chocolate", hint: "pairing" },
      { name: "Maridaje con pescados y mariscos", hint: "pairing" },
    ],
    assyrtiko: [
      { name: "Santorini", hint: "region" },
      { name: "Blanco mineral", hint: "style" },
      { name: "Ostras", hint: "pairing" },
      { name: "Maridaje con pescados y mariscos", hint: "pairing" },
      { name: "Tapas y aperitivos", hint: "pairing" },
    ],
    vermentino: [
      { name: "Vermentino di Gallura", hint: "region" },
      { name: "Blanco mineral", hint: "style" },
      { name: "Maridaje con pescados y mariscos", hint: "pairing" },
      { name: "Tapas y aperitivos", hint: "pairing" },
      { name: "Verduras y cocina vegetariana", hint: "pairing" },
    ],
    carmenere: [
      { name: "Tinto con cuerpo", hint: "style" },
      { name: "Solomillo de ternera", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "Cocina asiática", hint: "pairing" },
    ],
    tannat: [
      { name: "Tinto con cuerpo", hint: "style" },
      { name: "Solomillo de ternera", hint: "pairing" },
      { name: "Cordero asado", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "Queso azul", hint: "pairing" },
    ],
    "petit-verdot": [
      { name: "Tinto con cuerpo", hint: "style" },
      { name: "Solomillo de ternera", hint: "pairing" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    torrontes: [
      { name: "Blanco joven", hint: "style" },
      { name: "Cocina asiática", hint: "pairing" },
      { name: "Ceviche", hint: "pairing" },
      { name: "Tapas y aperitivos", hint: "pairing" },
      { name: "Queso de cabra", hint: "pairing" },
    ],
    corvina: [
      { name: "Valpolicella", hint: "region" },
      { name: "Tinto con cuerpo", hint: "style" },
      { name: "Pato confitado", hint: "pairing" },
      { name: "Risotto de setas", hint: "pairing" },
      { name: "Queso azul", hint: "pairing" },
    ],
  },
  region: {
    rioja: [
      { name: "Tempranillo", hint: "grape" },
      { name: "Viura", hint: "grape" },
      { name: "Tinto crianza", hint: "style" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    "ribera-del-duero": [
      { name: "Tempranillo", hint: "grape" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Tinto crianza", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    "rias-baixas": [
      { name: "Albariño", hint: "grape" },
      { name: "marisco", hint: "pairing" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "Blanco con lías", hint: "style" },
    ],
    rueda: [
      { name: "Verdejo", hint: "grape" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "marisco", hint: "pairing" },
      { name: "arroces", hint: "pairing" },
    ],
    priorat: [
      { name: "Garnacha", hint: "grape" },
      { name: "Syrah", hint: "grape" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    bourgogne: [
      { name: "Pinot Noir", hint: "grape" },
      { name: "Chardonnay", hint: "grape" },
      { name: "Blanco con lías", hint: "style" },
      { name: "quesos", hint: "pairing" },
    ],
    bordeaux: [
      { name: "Cabernet Sauvignon", hint: "grape" },
      { name: "Merlot", hint: "grape" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    champagne: [
      { name: "Chardonnay", hint: "grape" },
      { name: "Pinot Noir", hint: "grape" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "marisco", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    douro: [
      { name: "Touriga Nacional", hint: "grape" },
      { name: "Tinto reserva", hint: "style" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    "vinho-verde": [
      { name: "Albariño", hint: "grape" },
      { name: "marisco", hint: "pairing" },
      { name: "pescado blanco", hint: "pairing" },
      { name: "espumoso método tradicional", hint: "style" },
    ],
  },
  style: {
    "tinto-crianza": [
      { name: "Tempranillo", hint: "grape" },
      { name: "Rioja", hint: "region" },
      { name: "Ribera del Duero", hint: "region" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    "tinto-reserva": [
      { name: "Tempranillo", hint: "grape" },
      { name: "Cabernet Sauvignon", hint: "grape" },
      { name: "Rioja", hint: "region" },
      { name: "Burdeos", hint: "region" },
      { name: "Maridaje con carnes rojas", hint: "pairing" },
    ],
    "blanco-crianza-lias": [
      { name: "Chardonnay", hint: "grape" },
      { name: "Godello", hint: "grape" },
      { name: "Viura", hint: "grape" },
      { name: "Borgoña", hint: "region" },
      { name: "pescado blanco", hint: "pairing" },
    ],
    espumoso: [
      { name: "Champagne", hint: "region" },
      { name: "Cava", hint: "style" },
      { name: "Chardonnay", hint: "grape" },
      { name: "Xarel·lo", hint: "grape" },
      { name: "marisco", hint: "pairing" },
    ],
    cava: [
      { name: "Penedès", hint: "region" },
      { name: "Xarel·lo", hint: "grape" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "marisco", hint: "pairing" },
      { name: "quesos", hint: "pairing" },
    ],
    "rosado-cuerpo": [
      { name: "Garnacha", hint: "grape" },
      { name: "Syrah", hint: "grape" },
      { name: "Priorat", hint: "region" },
      { name: "arroces", hint: "pairing" },
      { name: "Cocina asiática", hint: "pairing" },
    ],
  },
  pairing: {
    "carnes-rojas": [
      { name: "Tempranillo", hint: "grape" },
      { name: "Syrah", hint: "grape" },
      { name: "Cabernet Sauvignon", hint: "grape" },
      { name: "Rioja", hint: "region" },
      { name: "Tinto reserva", hint: "style" },
    ],
    "pescados-y-mariscos": [
      { name: "Albariño", hint: "grape" },
      { name: "Verdejo", hint: "grape" },
      { name: "Rías Baixas", hint: "region" },
      { name: "Champagne", hint: "region" },
      { name: "espumoso método tradicional", hint: "style" },
    ],
    "lubina-dorada": [
      { name: "Albariño", hint: "grape" },
      { name: "Verdejo", hint: "grape" },
      { name: "Godello", hint: "grape" },
      { name: "Rías Baixas", hint: "region" },
      { name: "Rueda", hint: "region" },
    ],
    "pasta-arroces-y-legumbres": [
      { name: "Sangiovese", hint: "grape" },
      { name: "Nebbiolo", hint: "grape" },
      { name: "Garnacha", hint: "grape" },
      { name: "Tinto crianza", hint: "style" },
      { name: "Rosado gastronómico", hint: "style" },
    ],
    paella: [
      { name: "Garnacha", hint: "grape" },
      { name: "Albariño", hint: "grape" },
      { name: "Verdejo", hint: "grape" },
      { name: "Rosado gastronómico", hint: "style" },
      { name: "Rueda", hint: "region" },
    ],
    "cocina-asiatica-y-fusion": [
      { name: "Riesling", hint: "grape" },
      { name: "Sauvignon Blanc", hint: "grape" },
      { name: "Albariño", hint: "grape" },
      { name: "espumoso método tradicional", hint: "style" },
      { name: "Rosado gastronómico", hint: "style" },
    ],
    quesos: [
      { name: "Tempranillo", hint: "grape" },
      { name: "Chardonnay", hint: "grape" },
      { name: "Rioja", hint: "region" },
      { name: "Champagne", hint: "region" },
      { name: "Blanco con lías", hint: "style" },
    ],
  },
};

export function resolveLibraryLink(name: string, hint: TagCategory = "auto"): ResolvedLibraryLink | null {
  const lookup = buildLookup();
  const key = name.toLowerCase();
  const categories = hint === "auto" ? lookupOrder : [hint];

  for (const category of categories) {
    const direct = lookup[category].get(key);
    if (direct) return direct;
  }

  const slugKey = slugify(name);
  for (const category of categories) {
    const bySlug = lookup[category].get(slugKey);
    if (bySlug) return bySlug;
  }

  if (hint === "region" || hint === "auto") {
    for (const [lookupKey, value] of lookup.region) {
      if (key.includes(lookupKey) && lookupKey.length > 3) return value;
    }
  }

  return null;
}

export function getStrategicWineLibraryLinks(type: WineLibraryEntityType, slugOrName: string): StrategicWineLibraryLinkItem[] {
  const key = slugify(slugOrName);
  return strategicLinks[type][key] || [];
}
