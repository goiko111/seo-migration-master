import { WINE_RUNTIME_LANGS, getWineLibraryPath, type WineRuntimeLang } from "./wineLibraryI18n";

export const wineLibraryLegacyShortcutSlugs = [
  "tempranillo",
  "chardonnay",
  "garnacha",
  "sauvignon-blanc",
  "cabernet-sauvignon",
  "rioja",
  "borgona",
  "priorat",
  "napa-valley",
  "vino-tinto",
  "vino-blanco",
  "vino-rosado",
  "vino-espumoso",
  "maridaje-carne",
  "maridaje-pescado",
  "maridaje-queso",
] as const;

export type WineLibraryLegacyShortcutSlug = (typeof wineLibraryLegacyShortcutSlugs)[number];

export const wineLibraryLegacyCanonicalPaths: Record<WineLibraryLegacyShortcutSlug, string> = {
  "tempranillo": "/biblioteca-vino/uvas/tempranillo",
  "chardonnay": "/biblioteca-vino/uvas/chardonnay",
  "garnacha": "/biblioteca-vino/uvas/garnacha",
  "sauvignon-blanc": "/biblioteca-vino/uvas/sauvignon-blanc",
  "cabernet-sauvignon": "/biblioteca-vino/uvas/cabernet-sauvignon",
  "rioja": "/biblioteca-vino/regiones/espana/rioja",
  "borgona": "/biblioteca-vino/regiones/francia/bourgogne",
  "priorat": "/biblioteca-vino/regiones/espana/priorat",
  "napa-valley": "/biblioteca-vino/regiones/estados-unidos/napa-valley",
  "vino-tinto": "/biblioteca-vino/estilos/tinto",
  "vino-blanco": "/biblioteca-vino/estilos/blanco",
  "vino-rosado": "/biblioteca-vino/estilos/rosado",
  "vino-espumoso": "/biblioteca-vino/estilos/espumoso",
  "maridaje-carne": "/biblioteca-vino/maridajes/carnes-rojas",
  "maridaje-pescado": "/biblioteca-vino/maridajes/pescados-y-mariscos",
  "maridaje-queso": "/biblioteca-vino/maridajes/quesos",
};

export const getWineLibraryLegacyCanonicalPath = (slug?: string): string | null => {
  if (!slug) return null;
  return wineLibraryLegacyCanonicalPaths[slug as WineLibraryLegacyShortcutSlug] || null;
};

export const getLocalizedWineLibraryLegacyRedirect = (lang: string | undefined, slug?: string): string | null => {
  const canonicalPath = getWineLibraryLegacyCanonicalPath(slug);
  if (!canonicalPath) return null;
  return getWineLibraryPath(lang, canonicalPath);
};

export const getWineLibraryLegacyRedirectMatrix = () =>
  WINE_RUNTIME_LANGS.flatMap((lang: WineRuntimeLang) =>
    wineLibraryLegacyShortcutSlugs.map((slug) => ({
      lang,
      slug,
      path: getWineLibraryPath(lang, `/biblioteca-vino/${slug}`),
      target: getWineLibraryPath(lang, wineLibraryLegacyCanonicalPaths[slug]),
    }))
  );
