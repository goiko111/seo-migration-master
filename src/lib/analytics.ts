/**
 * GA4 / GTM Analytics Layer — Winerim
 * 
 * Centralized event dispatcher. All GA4 events flow through here.
 * Consent-aware: respects Google Consent Mode v2 + cookie banner state.
 * 
 * Usage:
 *   import { ga } from "@/lib/analytics";
 *   ga.ctaClick("hero_home", "/demo");
 *   ga.formSubmit("demo", { business_type: "hotel" });
 */

/* ── Types ─────────────────────────────────────── */

type GAEventParams = Record<string, string | number | boolean | undefined>;

/* ── Helpers ───────────────────────────────────── */

function push(event: string, params: GAEventParams = {}): void {
  if (typeof window === "undefined") return;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ event, ...params });
}

function getPagePath(): string {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

/* ── Consent helpers ───────────────────────────── */

export function updateConsent(granted: boolean): void {
  push("consent_update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });

  // Also push gtag consent update for GA4 consent mode v2
  if (typeof window !== "undefined") {
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("consent", "update", {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
      });
    }
  }
}

/* ── GA4 Event API ─────────────────────────────── */

export const ga = {
  /* ── Page views ─────────────────────── */
  /** Enhanced page_view (GTM auto-tracks, but this allows custom params) */
  pageView(params?: { page_title?: string; content_group?: string }) {
    push("page_view", {
      page_path: getPagePath(),
      page_title: params?.page_title || document.title,
      content_group: params?.content_group || "",
    });
  },

  /** Track visit to high-intent pages */
  highIntentPageView(page_name: string) {
    push("high_intent_page", {
      page_path: getPagePath(),
      page_name,
    });
  },

  /* ── CTA clicks ─────────────────────── */
  ctaClick(cta_id: string, destination: string, position?: string) {
    push("cta_click", {
      cta_id,
      cta_destination: destination,
      cta_position: position || "body",
      page_path: getPagePath(),
    });
  },

  /* ── Forms ──────────────────────────── */
  formStart(form_type: string) {
    push("form_start", {
      form_type,
      page_path: getPagePath(),
    });
  },

  formSubmit(form_type: string, extra?: GAEventParams) {
    push("generate_lead", {
      form_type,
      page_path: getPagePath(),
      ...extra,
    });
  },

  /* ── Resources ──────────────────────── */
  resourceDownload(resource_name: string) {
    push("resource_download", {
      resource_name,
      page_path: getPagePath(),
    });
  },

  resourceOpen(resource_name: string) {
    push("resource_open", {
      resource_name,
      page_path: getPagePath(),
    });
  },

  /* ── Tools / Calculators ────────────── */
  toolUsed(tool_name: string, extra?: GAEventParams) {
    push("tool_used", {
      tool_name,
      page_path: getPagePath(),
      ...extra,
    });
  },

  /* ── Scroll depth ───────────────────── */
  scrollDepth(percent: number) {
    push("scroll_depth", {
      percent,
      page_path: getPagePath(),
    });
  },

  /* ── Navigation patterns ────────────── */
  navigationPath(from_section: string, to_section: string) {
    push("navigation_path", {
      from_section,
      to_section,
      page_path: getPagePath(),
    });
  },

  /* ── Engagement time (session-level) ── */
  engagementTime(seconds: number) {
    push("engagement_milestone", {
      seconds,
      page_path: getPagePath(),
    });
  },

  /* ── Generic custom event ───────────── */
  event(name: string, params?: GAEventParams) {
    push(name, { page_path: getPagePath(), ...params });
  },
};
