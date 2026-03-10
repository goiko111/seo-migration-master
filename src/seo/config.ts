/**
 * SEO Configuration — Single source of truth for domain and environment.
 *
 * USAGE:
 *   import { CANONICAL_DOMAIN, isProduction, getCanonicalUrl } from "@/seo/config";
 *
 * RULES:
 * - NEVER hardcode "https://winerim.wine" in components. Use these helpers.
 * - Preview/staging domains get noindex automatically via SEOHead.
 * - Canonical URLs always point to the production domain.
 */

/** The canonical production domain — no trailing slash */
export const CANONICAL_DOMAIN = "https://winerim.wine";

/** Known staging/preview domain patterns that should NOT be indexed */
const STAGING_PATTERNS = [
  "lovable.app",
  "lovable.dev",
  "localhost",
  "127.0.0.1",
  "preview--",
];

/**
 * Detect if the current environment is production.
 * Returns false for preview, staging, or local dev.
 */
export function isProduction(): boolean {
  if (typeof window === "undefined") return true; // SSR/edge → assume production
  const host = window.location.hostname;
  return !STAGING_PATTERNS.some((pattern) => host.includes(pattern));
}

/**
 * Build a canonical URL for any path.
 * Always uses the production domain, never the current host.
 *
 * @param path — e.g. "/precios" or "/en/pricing"
 * @returns "https://winerim.wine/precios"
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  // Remove trailing slash (except for root)
  const normalized = cleanPath === "/" ? "/" : cleanPath.replace(/\/+$/, "");
  return `${CANONICAL_DOMAIN}${normalized}`;
}

/**
 * Build hreflang entries for a set of lang→path mappings.
 * Always uses the production domain.
 *
 * @param paths — e.g. { es: "/precios", en: "/en/pricing", it: "/it/prezzi" }
 * @returns Array of { lang, url } for SEOHead
 */
export function buildHreflang(
  paths: Record<string, string>
): { lang: string; url: string }[] {
  const entries = Object.entries(paths).map(([lang, path]) => ({
    lang,
    url: getCanonicalUrl(path),
  }));

  // Add x-default pointing to ES (or first entry)
  const esEntry = entries.find((e) => e.lang === "es");
  if (esEntry) {
    entries.push({ lang: "x-default", url: esEntry.url });
  }

  return entries;
}

/**
 * OG Image URL — always absolute with production domain.
 */
export const DEFAULT_OG_IMAGE = `${CANONICAL_DOMAIN}/og-image.png`;
