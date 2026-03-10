/**
 * SEO Redirects Manifest
 *
 * This file defines all planned 301 redirects for the SEO migration.
 * Use this as the source of truth when implementing server-side redirects
 * (e.g., via Cloudflare Workers, Netlify _redirects, Vercel vercel.json,
 * or an edge function).
 *
 * STATUS KEY:
 * - "pending"   → approved but not yet implemented
 * - "active"    → redirect is live
 * - "blocked"   → needs further discussion before implementing
 */

export interface RedirectEntry {
  from: string;
  to: string;
  status: "pending" | "active" | "blocked";
  type: 301 | 302;
  reason: string;
  priority: "critical" | "high" | "medium" | "low";
}

export const redirects: RedirectEntry[] = [
  // ─────────────────────────────────────────────
  // 1. ENGLISH PAGES AT ROOT → /en/ PREFIX
  // Priority: CRITICAL (language signal confusion for Google)
  // ─────────────────────────────────────────────
  {
    from: "/wine-list-management-software",
    to: "/en/wine-list-management-software",
    status: "pending",
    type: 301,
    reason: "EN page at ES root. Confuses Googlebot language signals. Move to /en/ subdirectory.",
    priority: "critical",
  },
  {
    from: "/what-is-winerim",
    to: "/en/what-is-winerim",
    status: "pending",
    type: 301,
    reason: "EN page at ES root. Already has /en/ equivalent via langRoutes.",
    priority: "critical",
  },
  {
    from: "/ai-wine-software",
    to: "/en/ai-wine-software",
    status: "pending",
    type: 301,
    reason: "EN page at ES root. Needs /en/ route created first.",
    priority: "critical",
  },
  {
    from: "/wine-list-analyzer",
    to: "/en/wine-list-analyzer",
    status: "pending",
    type: 301,
    reason: "EN tool at root. Cannibalizes /analisis-carta.",
    priority: "critical",
  },
  {
    from: "/wine-roi-calculator",
    to: "/en/wine-roi-calculator",
    status: "pending",
    type: 301,
    reason: "EN tool at root.",
    priority: "critical",
  },
  {
    from: "/wine-pairing-generator",
    to: "/en/wine-pairing-generator",
    status: "pending",
    type: 301,
    reason: "EN tool at root.",
    priority: "critical",
  },
  {
    from: "/wine-pricing-tool",
    to: "/en/wine-pricing-tool",
    status: "pending",
    type: 301,
    reason: "EN tool at root. Cannibalizes /calculadora-margen-vino for pricing intent.",
    priority: "critical",
  },
  {
    from: "/wine-list-benchmark",
    to: "/en/wine-list-benchmark",
    status: "pending",
    type: 301,
    reason: "EN tool at root.",
    priority: "critical",
  },

  // ─────────────────────────────────────────────
  // 2. LEGACY / ORPHAN CONSOLIDATION
  // ─────────────────────────────────────────────
  {
    from: "/en/digital-wine-list",
    to: "/en/wine-list-management-software",
    status: "blocked",
    type: 301,
    reason: "Potential duplicate of /en/wine-list-management-software. Evaluate traffic before merging.",
    priority: "medium",
  },

  // ─────────────────────────────────────────────
  // 3. TRAILING SLASH NORMALIZATION
  // Global rule: strip trailing slashes (except root /)
  // Implement as a global rewrite rule, not individual redirects.
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // 4. CASE NORMALIZATION
  // Global rule: lowercase all URLs.
  // Implement as middleware/edge function.
  // ─────────────────────────────────────────────
];

/**
 * Global URL normalization rules (implement in edge/middleware layer)
 */
export const normalizationRules = {
  /**
   * Strip trailing slashes: /precios/ → /precios
   * Exception: root "/" stays as "/"
   */
  trailingSlash: "remove" as const,

  /**
   * Force lowercase: /Blog → /blog
   */
  caseNormalization: "lowercase" as const,

  /**
   * Language detection: if no /en/, /it/, /fr/ prefix → treat as ES.
   * Never serve ES content on /en/ URLs or vice versa.
   */
  defaultLanguage: "es" as const,
};

/**
 * Utility: generate _redirects file content (Netlify/Cloudflare Pages format)
 */
export function generateRedirectsFile(): string {
  const lines = redirects
    .filter(r => r.status === "active" || r.status === "pending")
    .map(r => `${r.from}  ${r.to}  ${r.type}`);

  return [
    "# SEO Redirects — Auto-generated from src/seo/redirects.ts",
    "# Deploy this to public/_redirects or equivalent",
    "",
    "# Trailing slash removal (global)",
    "/*/ /:splat 301",
    "",
    "# Language redirects",
    ...lines,
    "",
  ].join("\n");
}

/**
 * Utility: generate Vercel vercel.json redirects array
 */
export function generateVercelRedirects(): object[] {
  return redirects
    .filter(r => r.status === "active" || r.status === "pending")
    .map(r => ({
      source: r.from,
      destination: r.to,
      statusCode: r.type,
    }));
}
