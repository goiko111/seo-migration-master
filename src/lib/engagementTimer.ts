/**
 * Engagement Timer — B2B Buyer Intent
 * 
 * Tracks active engagement time on high-intent pages.
 * Fires milestone events (30s, 60s, 120s, 300s) to dataLayer.
 * Pauses when tab is hidden or user is idle (no scroll/mouse for 30s).
 * 
 * Used by Smart Bidding (Google Ads) and B2B intent tools
 * to distinguish active research from bounce.
 */

import { classifyPath } from "./intentTracking";
import { ga } from "./analytics";

/* ── Constants ─────────────────────────────────── */

const MILESTONES = [30, 60, 120, 300]; // seconds
const IDLE_TIMEOUT = 30_000; // 30s of no activity → pause

/* ── State ─────────────────────────────────────── */

let activeSeconds = 0;
let intervalId: ReturnType<typeof setInterval> | null = null;
let idleTimer: ReturnType<typeof setTimeout> | null = null;
let isActive = true;
let firedMilestones = new Set<number>();
let currentPath = "";

/* ── Helpers ───────────────────────────────────── */

function pushMilestone(seconds: number, path: string): void {
  if (typeof window === "undefined") return;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({
    event: "winerim_engagement_milestone",
    engagement_seconds: seconds,
    engagement_page: path,
  });
  ga.engagementTime(seconds);
}

function resetIdle(): void {
  isActive = true;
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { isActive = false; }, IDLE_TIMEOUT);
}

function tick(): void {
  if (!isActive || document.hidden) return;
  activeSeconds++;

  for (const m of MILESTONES) {
    if (activeSeconds >= m && !firedMilestones.has(m)) {
      firedMilestones.add(m);
      pushMilestone(m, currentPath);
    }
  }
}

/* ── Public API ────────────────────────────────── */

/**
 * Start tracking engagement time for a page.
 * Call on route change. Only tracks medium/high intent pages.
 * Returns cleanup function.
 */
export function startEngagementTimer(pathname: string): (() => void) | null {
  const classification = classifyPath(pathname);
  if (!classification || classification.level === "low") return null;

  // Reset state
  stopEngagementTimer();
  activeSeconds = 0;
  firedMilestones = new Set();
  currentPath = pathname;
  isActive = true;

  // Activity listeners
  const events = ["scroll", "mousemove", "keydown", "touchstart"] as const;
  events.forEach(e => window.addEventListener(e, resetIdle, { passive: true }));
  resetIdle();

  // Start counting
  intervalId = setInterval(tick, 1000);

  return () => {
    stopEngagementTimer();
    events.forEach(e => window.removeEventListener(e, resetIdle));
  };
}

function stopEngagementTimer(): void {
  if (intervalId) { clearInterval(intervalId); intervalId = null; }
  if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
}
