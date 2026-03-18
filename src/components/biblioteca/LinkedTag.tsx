import { Link } from "react-router-dom";
import { getAllGrapeSlugs, getCatalogEntry } from "@/data/grapesLibrary";
import { getAllRegionSlugs, getRegionBySlug, getAllCountrySlugs } from "@/data/regionsLibrary";
import { getStyleBySlug, getStyleCatalogEntry, getAllStyles } from "@/data/stylesLibrary";
import { getPairingBySlug, pairingEntries } from "@/data/pairingsLibrary";

type TagCategory = "grape" | "region" | "style" | "pairing" | "auto";

// Slugify a name to match data slugs
const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Build a lookup map: name → { slug, path }
const buildLookup = (() => {
  let cache: Map<string, { slug: string; path: string }> | null = null;

  return () => {
    if (cache) return cache;
    cache = new Map();

    // Grapes
    getAllGrapeSlugs().forEach((slug) => {
      const entry = getCatalogEntry(slug);
      if (entry) {
        cache!.set(entry.name.toLowerCase(), { slug, path: `/biblioteca-vino/uvas/${slug}` });
        // Also add slug as key
        cache!.set(slug, { slug, path: `/biblioteca-vino/uvas/${slug}` });
      }
    });

    // Regions
    getAllRegionSlugs().forEach((slug) => {
      const entry = getRegionBySlug(slug);
      if (entry) {
        cache!.set(entry.name.toLowerCase(), { slug, path: `/biblioteca-vino/regiones/${entry.country}/${slug}` });
        cache!.set(slug, { slug, path: `/biblioteca-vino/regiones/${entry.country}/${slug}` });
        if (entry.altNames) {
          entry.altNames.forEach((alt) => cache!.set(alt.toLowerCase(), { slug, path: `/biblioteca-vino/regiones/${entry.country}/${slug}` }));
        }
      }
    });

    // Styles
    getAllStyles().forEach((entry) => {
      cache!.set(entry.name.toLowerCase(), { slug: entry.slug, path: `/biblioteca-vino/estilos/${entry.slug}` });
      cache!.set(entry.slug, { slug: entry.slug, path: `/biblioteca-vino/estilos/${entry.slug}` });
    });

    // Pairings
    pairingEntries.forEach((entry) => {
      cache!.set(entry.name.toLowerCase(), { slug: entry.slug, path: `/biblioteca-vino/maridajes/${entry.slug}` });
      cache!.set(entry.slug, { slug: entry.slug, path: `/biblioteca-vino/maridajes/${entry.slug}` });
    });

    return cache;
  };
})();

function resolve(name: string, hint?: TagCategory): { slug: string; path: string } | null {
  const lookup = buildLookup();
  const key = name.toLowerCase();

  // Direct match
  const direct = lookup.get(key);
  if (direct) return direct;

  // Try slugified
  const slugged = slugify(name);
  const bySlug = lookup.get(slugged);
  if (bySlug) return bySlug;

  // Try partial name (e.g. "Rioja Reserva" → match "Rioja")
  // Only for region hints
  if (hint === "region" || hint === "auto") {
    for (const [lookupKey, value] of lookup) {
      if (key.includes(lookupKey) && lookupKey.length > 3) return value;
    }
  }

  return null;
}

interface LinkedTagProps {
  name: string;
  hint?: TagCategory;
  variant?: "wine" | "neutral" | "outline";
  className?: string;
}

const variantClasses = {
  wine: "bg-wine/10 text-wine border border-wine/20 hover:bg-wine/20 hover:border-wine/40",
  neutral: "bg-secondary/50 border border-border hover:border-wine/30 hover:text-wine",
  outline: "border border-border hover:border-wine/30 hover:text-wine",
};

const LinkedTag = ({ name, hint = "auto", variant = "wine", className = "" }: LinkedTagProps) => {
  const resolved = resolve(name, hint);

  const baseClasses = `px-3 py-1.5 rounded-full text-sm transition-all ${variantClasses[variant]} ${className}`;

  if (resolved) {
    return (
      <Link to={resolved.path} className={`${baseClasses} inline-block`}>
        {name}
      </Link>
    );
  }

  // Fallback to static span
  return (
    <span className={`px-3 py-1.5 rounded-full text-sm ${variant === "wine" ? "bg-wine/10 text-wine border border-wine/20" : "bg-secondary/50 border border-border"} ${className}`}>
      {name}
    </span>
  );
};

export default LinkedTag;
export { resolve as resolveLibraryLink };
