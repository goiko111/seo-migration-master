import { getAllGrapeSlugs, getCatalogEntry } from "./grapesLibrary";
import { getAllCountrySlugs, getAllRegionSlugs, getRegionBySlug } from "./regionsLibrary";
import { getAllStyles } from "./stylesLibrary";
import { pairingEntries } from "./pairingsLibrary";

export type TagCategory = "grape" | "region" | "style" | "pairing" | "auto";

interface ResolvedLibraryLink {
  slug: string;
  path: string;
}

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const buildLookup = (() => {
  let cache: Map<string, ResolvedLibraryLink> | null = null;

  return () => {
    if (cache) return cache;
    cache = new Map();

    getAllGrapeSlugs().forEach((slug) => {
      const entry = getCatalogEntry(slug);
      if (!entry) return;
      cache!.set(entry.name.toLowerCase(), { slug, path: `/biblioteca-vino/uvas/${slug}` });
      cache!.set(slug, { slug, path: `/biblioteca-vino/uvas/${slug}` });
    });

    getAllCountrySlugs().forEach((slug) => {
      cache!.set(slug, { slug, path: `/biblioteca-vino/regiones/${slug}` });
    });

    getAllRegionSlugs().forEach((slug) => {
      const entry = getRegionBySlug(slug);
      if (!entry) return;
      const path = `/biblioteca-vino/regiones/${entry.country}/${slug}`;
      cache!.set(entry.name.toLowerCase(), { slug, path });
      cache!.set(slug, { slug, path });
      entry.altNames?.forEach((alt) => cache!.set(alt.toLowerCase(), { slug, path }));
    });

    getAllStyles().forEach((entry) => {
      cache!.set(entry.name.toLowerCase(), { slug: entry.slug, path: `/biblioteca-vino/estilos/${entry.slug}` });
      cache!.set(entry.slug, { slug: entry.slug, path: `/biblioteca-vino/estilos/${entry.slug}` });
    });

    pairingEntries.forEach((entry) => {
      cache!.set(entry.name.toLowerCase(), { slug: entry.slug, path: `/biblioteca-vino/maridajes/${entry.slug}` });
      cache!.set(entry.slug, { slug: entry.slug, path: `/biblioteca-vino/maridajes/${entry.slug}` });
    });

    return cache;
  };
})();

export function resolveLibraryLink(name: string, hint: TagCategory = "auto"): ResolvedLibraryLink | null {
  const lookup = buildLookup();
  const key = name.toLowerCase();

  const direct = lookup.get(key);
  if (direct) return direct;

  const bySlug = lookup.get(slugify(name));
  if (bySlug) return bySlug;

  if (hint === "region" || hint === "auto") {
    for (const [lookupKey, value] of lookup) {
      if (key.includes(lookupKey) && lookupKey.length > 3) return value;
    }
  }

  return null;
}
