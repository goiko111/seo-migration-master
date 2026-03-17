/**
 * B2B Buyer Intent Tracking Layer
 * 
 * Lightweight, privacy-respecting intent signal system.
 * Pushes structured events to window.dataLayer for GTM/HubSpot/Dealfront compatibility.
 * Stores anonymous session scoring in localStorage (no PII, no cookies).
 * 
 * Integration points:
 * - GTM: events appear in dataLayer automatically
 * - HubSpot: use GTM trigger to forward to HS tracking code
 * - Dealfront/Leadfeeder: reads dataLayer natively
 * - Custom: listen to 'winerim_intent' CustomEvent on window
 */

/* ── Intent categories ─────────────────────────────── */
export type IntentCategory =
  | "product_core"
  | "product_id"
  | "product_supply"
  | "solution_groups"
  | "solution_vertical"
  | "pricing"
  | "tool"
  | "resource_download"
  | "demo"
  | "contact"
  | "blog_commercial"
  | "blog_editorial"
  | "case_study"
  | "decision_center";

export type IntentLevel = "high" | "medium" | "low";

export interface IntentSignal {
  category: IntentCategory;
  level: IntentLevel;
  page: string;
  action: "pageview" | "tool_use" | "resource_download" | "form_start" | "form_submit" | "cta_click" | "scroll_depth";
  label?: string;
  value?: number;
  lang?: string;
  timestamp: number;
}

/* ── Page → Intent mapping ─────────────────────────── */
const PATH_INTENT_MAP: Record<string, { category: IntentCategory; level: IntentLevel }> = {
  // Product pages — HIGH intent
  "/producto/winerim-core": { category: "product_core", level: "high" },
  "/producto/inteligencia-dinamica": { category: "product_id", level: "high" },
  "/producto/winerim-supply": { category: "product_supply", level: "high" },
  "/software-carta-de-vinos": { category: "product_core", level: "high" },
  "/funcionalidades": { category: "product_core", level: "medium" },

  // Solutions — HIGH intent
  "/soluciones/grupos-restauracion": { category: "solution_groups", level: "high" },
  "/soluciones/restaurantes-gastronomicos": { category: "solution_vertical", level: "high" },
  "/soluciones/wine-bars": { category: "solution_vertical", level: "high" },
  "/soluciones/hoteles": { category: "solution_vertical", level: "high" },
  "/soluciones/restaurantes-sin-sumiller": { category: "solution_vertical", level: "medium" },
  "/soluciones/carta-amplia": { category: "solution_vertical", level: "high" },
  "/soluciones/carta-crecimiento": { category: "solution_vertical", level: "high" },
  "/soluciones/aumentar-ticket-medio-restaurante": { category: "solution_vertical", level: "medium" },
  "/soluciones": { category: "solution_vertical", level: "medium" },

  // Pricing — VERY HIGH intent
  "/precios": { category: "pricing", level: "high" },

  // Conversion pages — VERY HIGH intent
  "/demo": { category: "demo", level: "high" },
  "/contacto": { category: "contact", level: "high" },

  // Tools — MEDIUM-HIGH intent (product demos)
  "/analisis-carta": { category: "tool", level: "high" },
  "/calculadora-margen-vino": { category: "tool", level: "medium" },
  "/herramientas/calculadora-precio-vino-por-copa": { category: "tool", level: "medium" },
  "/herramientas/calculadora-stock-muerto": { category: "tool", level: "medium" },
  "/herramientas/calculadora-ticket-medio": { category: "tool", level: "medium" },
  "/herramientas/calculadora-compra-inteligente": { category: "tool", level: "medium" },
  "/herramientas/wine-list-score": { category: "tool", level: "medium" },
  "/herramientas/wine-roi-calculator": { category: "tool", level: "medium" },
  "/herramientas/wine-pricing-tool": { category: "tool", level: "medium" },
  "/herramientas": { category: "tool", level: "low" },

  // Case studies — HIGH commercial intent
  "/casos-exito": { category: "case_study", level: "high" },
  "/clientes": { category: "case_study", level: "medium" },

  // Decision Center — existing client
  "/decision-center": { category: "decision_center", level: "low" },

  // Blog — varies (default low, override per article)
  "/blog": { category: "blog_editorial", level: "low" },

  // Resources hub
  "/guias-y-recursos": { category: "resource_download", level: "low" },
  "/recursos": { category: "resource_download", level: "medium" },
};

/* ── Scoring weights ───────────────────────────────── */
const SCORE_WEIGHTS: Record<IntentCategory, number> = {
  product_core: 15,
  product_id: 15,
  product_supply: 20,    // Supply = enterprise signal
  solution_groups: 25,    // Groups = high-value account
  solution_vertical: 10,
  pricing: 30,            // Pricing visit = strongest signal
  tool: 8,
  resource_download: 12,
  demo: 40,
  contact: 40,
  blog_commercial: 5,
  blog_editorial: 2,
  case_study: 12,
  decision_center: 0,     // Existing client, don't score
};

const ACTION_MULTIPLIERS: Record<IntentSignal["action"], number> = {
  pageview: 1,
  tool_use: 2,
  resource_download: 2.5,
  form_start: 1.5,
  form_submit: 3,
  cta_click: 1.2,
  scroll_depth: 0.5,
};

/* ── Storage keys ──────────────────────────────────── */
const STORAGE_KEY = "winerim_intent_score";
const SESSION_KEY = "winerim_intent_session";
const VISIT_COUNT_KEY = "winerim_visit_count";

interface IntentScore {
  total: number;
  byCategory: Partial<Record<IntentCategory, number>>;
  signals: number;
  firstSeen: number;
  lastSeen: number;
  visitCount: number;
  topCategories: IntentCategory[];
}

/* ── Check consent ─────────────────────────────────── */
function hasAnalyticsConsent(): boolean {
  const consent = localStorage.getItem("winerim_cookie_consent");
  return consent === "accepted";
}

/* ── Push to dataLayer (GTM/HubSpot/Dealfront compatible) */
function pushToDataLayer(signal: IntentSignal): void {
  if (typeof window === "undefined") return;

  // Initialize dataLayer if not present
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    event: "winerim_intent",
    intent_category: signal.category,
    intent_level: signal.level,
    intent_action: signal.action,
    intent_page: signal.page,
    intent_label: signal.label || "",
    intent_value: signal.value || 0,
    intent_lang: signal.lang || "es",
    intent_timestamp: signal.timestamp,
  });

  // Also emit CustomEvent for any JS listener
  window.dispatchEvent(new CustomEvent("winerim_intent", { detail: signal }));
}

/* ── Update local score ────────────────────────────── */
function updateScore(signal: IntentSignal): IntentScore {
  const now = Date.now();
  let score: IntentScore;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    score = stored ? JSON.parse(stored) : {
      total: 0,
      byCategory: {},
      signals: 0,
      firstSeen: now,
      lastSeen: now,
      visitCount: 1,
      topCategories: [],
    };
  } catch {
    score = {
      total: 0,
      byCategory: {},
      signals: 0,
      firstSeen: now,
      lastSeen: now,
      visitCount: 1,
      topCategories: [],
    };
  }

  // Calculate points
  const baseWeight = SCORE_WEIGHTS[signal.category] || 5;
  const multiplier = ACTION_MULTIPLIERS[signal.action] || 1;
  const points = baseWeight * multiplier;

  // Repeat visit bonus (max 2x)
  const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "1", 10);
  const repeatBonus = Math.min(visitCount / 3, 2);

  const finalPoints = Math.round(points * (1 + repeatBonus * 0.2));

  // Update score
  score.total += finalPoints;
  score.byCategory[signal.category] = (score.byCategory[signal.category] || 0) + finalPoints;
  score.signals += 1;
  score.lastSeen = now;
  score.visitCount = visitCount;

  // Compute top categories
  score.topCategories = Object.entries(score.byCategory)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([cat]) => cat as IntentCategory);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(score));

  return score;
}

/* ── Track visit count ─────────────────────────────── */
function trackVisitCount(): void {
  const sessionActive = sessionStorage.getItem(SESSION_KEY);
  if (!sessionActive) {
    sessionStorage.setItem(SESSION_KEY, "1");
    const count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10) + 1;
    localStorage.setItem(VISIT_COUNT_KEY, String(count));
  }
}

/* ── Public API ────────────────────────────────────── */

/**
 * Classify a path into its intent category.
 * Returns undefined for unclassified paths.
 */
export function classifyPath(pathname: string): { category: IntentCategory; level: IntentLevel } | undefined {
  // Strip lang prefix for matching
  const clean = pathname.replace(/^\/(en|it|fr)/, "").replace(/\/$/, "") || "/";

  // Exact match first
  if (PATH_INTENT_MAP[clean]) return PATH_INTENT_MAP[clean];

  // Prefix match for dynamic routes
  if (clean.startsWith("/recursos/")) return { category: "resource_download", level: "medium" };
  if (clean.startsWith("/comparativa/")) return { category: "blog_commercial", level: "medium" };
  if (clean.startsWith("/benchmarks-playbooks/")) return { category: "blog_commercial", level: "medium" };
  if (clean.startsWith("/blog/")) return { category: "blog_editorial", level: "low" };
  if (clean.startsWith("/guias/")) return { category: "blog_commercial", level: "low" };
  if (clean.startsWith("/herramientas/")) return { category: "tool", level: "medium" };
  if (clean.startsWith("/soluciones/")) return { category: "solution_vertical", level: "medium" };
  if (clean.startsWith("/problemas/")) return { category: "blog_commercial", level: "medium" };

  return undefined;
}

/**
 * Track an intent signal. Respects cookie consent.
 * Always pushes to dataLayer (for server-side tools).
 * Only stores locally if consent is given.
 */
export function trackIntent(signal: Omit<IntentSignal, "timestamp">): void {
  const fullSignal: IntentSignal = { ...signal, timestamp: Date.now() };

  // Always push to dataLayer — tools like Dealfront handle consent themselves
  pushToDataLayer(fullSignal);

  // Only store locally if user accepted cookies
  if (hasAnalyticsConsent()) {
    trackVisitCount();
    updateScore(fullSignal);
  }
}

/**
 * Track a pageview with automatic intent classification.
 */
export function trackPageIntent(pathname: string, lang: string = "es"): void {
  const classification = classifyPath(pathname);
  if (!classification) return;

  trackIntent({
    category: classification.category,
    level: classification.level,
    page: pathname,
    action: "pageview",
    lang,
  });
}

/**
 * Track a specific user action (tool use, download, form, etc.)
 */
export function trackAction(
  action: IntentSignal["action"],
  category: IntentCategory,
  label?: string,
  value?: number
): void {
  trackIntent({
    category,
    level: "high",
    page: window.location.pathname,
    action,
    label,
    value,
    lang: document.documentElement.lang || "es",
  });
}

/**
 * Get the current anonymous intent score (for debug/admin).
 */
export function getIntentScore(): IntentScore | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Get the intent tier label based on score.
 */
export function getIntentTier(score: number): "cold" | "warm" | "hot" | "qualified" {
  if (score >= 150) return "qualified";
  if (score >= 80) return "hot";
  if (score >= 30) return "warm";
  return "cold";
}
