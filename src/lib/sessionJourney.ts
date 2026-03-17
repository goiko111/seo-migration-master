/**
 * Session Journey Tracker — B2B Buyer Intent
 * 
 * Tracks the visitor's navigation path within a session and pushes
 * structured journey data to dataLayer for HubSpot / Dealfront / Leadfeeder.
 * 
 * Data stored in sessionStorage (ephemeral, no consent needed for storage).
 * dataLayer pushes happen always (tools handle their own consent).
 * 
 * Signals captured:
 * - Pages visited (ordered, with timestamps)
 * - Product depth (Core, Supply, Groups interest)
 * - Tools used count
 * - Resources downloaded
 * - Session engagement time
 * - Navigation funnel stage (awareness → consideration → decision)
 */

import { classifyPath, type IntentCategory } from "./intentTracking";

/* ── Types ─────────────────────────────────────── */

interface SessionPage {
  path: string;
  category: IntentCategory | "other";
  ts: number;
}

interface SessionJourney {
  pages: SessionPage[];
  toolsUsed: string[];
  resourcesDownloaded: string[];
  startTime: number;
  productDepth: {
    core: number;
    supply: number;
    groups: number;
    id: number;
  };
}

type FunnelStage = "awareness" | "consideration" | "decision";

/* ── Constants ─────────────────────────────────── */

const SESSION_JOURNEY_KEY = "winerim_session_journey";

const DECISION_CATEGORIES = new Set<IntentCategory>([
  "demo", "contact", "pricing",
]);

const CONSIDERATION_CATEGORIES = new Set<IntentCategory>([
  "product_core", "product_id", "product_supply",
  "solution_groups", "solution_vertical",
  "tool", "case_study", "resource_download",
]);

/* ── Storage ───────────────────────────────────── */

function getJourney(): SessionJourney {
  try {
    const raw = sessionStorage.getItem(SESSION_JOURNEY_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    pages: [],
    toolsUsed: [],
    resourcesDownloaded: [],
    startTime: Date.now(),
    productDepth: { core: 0, supply: 0, groups: 0, id: 0 },
  };
}

function saveJourney(j: SessionJourney): void {
  try {
    sessionStorage.setItem(SESSION_JOURNEY_KEY, JSON.stringify(j));
  } catch { /* ignore */ }
}

/* ── Push to dataLayer ─────────────────────────── */

function pushJourneyEvent(eventName: string, data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ event: eventName, ...data });
}

/* ── Funnel classification ─────────────────────── */

function classifyFunnelStage(journey: SessionJourney): FunnelStage {
  const categories = new Set(journey.pages.map(p => p.category));

  for (const cat of categories) {
    if (DECISION_CATEGORIES.has(cat as IntentCategory)) return "decision";
  }
  for (const cat of categories) {
    if (CONSIDERATION_CATEGORIES.has(cat as IntentCategory)) return "consideration";
  }
  return "awareness";
}

/* ── Public API ────────────────────────────────── */

/**
 * Track a page visit within the current session.
 * Call on every route change.
 */
export function trackSessionPage(pathname: string): void {
  const journey = getJourney();
  const classification = classifyPath(pathname);
  const category: IntentCategory | "other" = classification?.category || "other";

  // Avoid duplicate consecutive entries
  const last = journey.pages[journey.pages.length - 1];
  if (last && last.path === pathname) return;

  journey.pages.push({ path: pathname, category, ts: Date.now() });

  // Track product depth
  if (category === "product_core") journey.productDepth.core++;
  if (category === "product_supply") journey.productDepth.supply++;
  if (category === "solution_groups") journey.productDepth.groups++;
  if (category === "product_id") journey.productDepth.id++;

  saveJourney(journey);

  // Push session summary to dataLayer on every page
  const sessionSeconds = Math.round((Date.now() - journey.startTime) / 1000);
  const funnelStage = classifyFunnelStage(journey);
  const uniqueCategories = [...new Set(journey.pages.map(p => p.category))].filter(c => c !== "other");

  pushJourneyEvent("winerim_session_update", {
    session_pages_count: journey.pages.length,
    session_unique_categories: uniqueCategories.length,
    session_categories: uniqueCategories.join(","),
    session_funnel_stage: funnelStage,
    session_duration_seconds: sessionSeconds,
    session_tools_used: journey.toolsUsed.length,
    session_resources_downloaded: journey.resourcesDownloaded.length,
    session_product_depth_core: journey.productDepth.core,
    session_product_depth_supply: journey.productDepth.supply,
    session_product_depth_groups: journey.productDepth.groups,
    session_product_depth_id: journey.productDepth.id,
    session_current_path: pathname,
    session_current_category: category,
  });

  // Fire milestone events for B2B tools
  if (journey.pages.length === 3) {
    pushJourneyEvent("winerim_engaged_session", {
      session_pages: journey.pages.map(p => p.path).join(" → "),
      funnel_stage: funnelStage,
    });
  }

  // Fire product-deep event when visiting 2+ product pages
  const productPageCount = journey.productDepth.core + journey.productDepth.supply
    + journey.productDepth.groups + journey.productDepth.id;
  if (productPageCount === 2) {
    pushJourneyEvent("winerim_product_explorer", {
      products_explored: Object.entries(journey.productDepth)
        .filter(([, v]) => v > 0)
        .map(([k]) => k)
        .join(","),
    });
  }
}

/**
 * Record a tool usage in the session.
 */
export function trackSessionToolUse(toolName: string): void {
  const journey = getJourney();
  if (!journey.toolsUsed.includes(toolName)) {
    journey.toolsUsed.push(toolName);
    saveJourney(journey);
  }
}

/**
 * Record a resource download in the session.
 */
export function trackSessionResourceDownload(resourceSlug: string): void {
  const journey = getJourney();
  if (!journey.resourcesDownloaded.includes(resourceSlug)) {
    journey.resourcesDownloaded.push(resourceSlug);
    saveJourney(journey);
  }
}

/**
 * Get current session journey data (for debug/admin).
 */
export function getSessionJourney(): SessionJourney | null {
  try {
    const raw = sessionStorage.getItem(SESSION_JOURNEY_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
