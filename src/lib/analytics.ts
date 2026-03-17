/**
 * GA4 / GTM / Google Ads Analytics Layer — Winerim
 * 
 * Centralized event dispatcher. All analytics events flow through here.
 * Consent-aware: respects Google Consent Mode v2 + cookie banner state.
 * 
 * Usage:
 *   import { ga, ads } from "@/lib/analytics";
 *   ga.ctaClick("hero_home", "/demo");
 *   ga.formSubmit("demo", { business_type: "hotel" });
 *   ads.conversion("demo", { email: "a@b.com" });
 */

/* ── Types ─────────────────────────────────────── */

type GAEventParams = Record<string, string | number | boolean | undefined>;

interface EnhancedConversionData {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  country?: string;
}

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

/* ── Google Ads Conversion API ─────────────────── */

/**
 * Conversion labels — placeholder values.
 * Replace with real AW-XXXXXXXXX/XXXX labels from Google Ads UI.
 * 
 * In GTM-based setup, these are used as dataLayer event identifiers.
 * GTM triggers fire the actual Google Ads conversion tags.
 */
const ADS_CONVERSION_LABELS: Record<string, string> = {
  demo: "AW-XXXXXXXXX/demo_submit",
  contact: "AW-XXXXXXXXX/contact_submit",
  resource: "AW-XXXXXXXXX/resource_download",
};

const ADS_MICRO_LABELS: Record<string, string> = {
  cta_click_demo: "AW-XXXXXXXXX/cta_click_demo",
  tool_used: "AW-XXXXXXXXX/tool_used",
  pricing_visit: "AW-XXXXXXXXX/pricing_visit",
  supply_visit: "AW-XXXXXXXXX/supply_visit",
  groups_visit: "AW-XXXXXXXXX/groups_visit",
  resource_download: "AW-XXXXXXXXX/resource_download_micro",
};

export const ads = {
  /**
   * Fire a primary Google Ads conversion.
   * Pushes to dataLayer for GTM to pick up and fire the Ads tag.
   * Includes enhanced conversion data (hashed by Google) when available.
   */
  conversion(
    form_type: "demo" | "contact" | "resource",
    userData?: EnhancedConversionData,
  ) {
    const conversionLabel = ADS_CONVERSION_LABELS[form_type] || "";

    // Push enhanced conversion user data to dataLayer
    // GTM handles hashing — we send plain text, gtag.js SHA-256 hashes it
    if (userData) {
      const enhancedData: Record<string, string> = {};
      if (userData.email) enhancedData.email = userData.email.trim().toLowerCase();
      if (userData.phone) enhancedData.phone_number = userData.phone.trim();
      if (userData.first_name) enhancedData.first_name = userData.first_name.trim();
      if (userData.last_name) enhancedData.last_name = userData.last_name.trim();
      if (userData.city) enhancedData.city = userData.city.trim();
      if (userData.country) enhancedData.country = userData.country.trim();

      push("enhanced_conversion_data", enhancedData as any);
    }

    // Fire conversion event for GTM
    push("ads_conversion", {
      conversion_type: form_type,
      conversion_label: conversionLabel,
      page_path: getPagePath(),
      value: form_type === "demo" ? 50 : form_type === "contact" ? 30 : 10,
      currency: "EUR",
    });
  },

  /**
   * Fire a microconversion for Google Ads optimization signals.
   * These are imported as secondary conversions in Google Ads.
   */
  microConversion(action: string, extra?: GAEventParams) {
    const label = ADS_MICRO_LABELS[action] || "";
    push("ads_micro_conversion", {
      micro_action: action,
      micro_label: label,
      page_path: getPagePath(),
      ...extra,
    });
  },

  /**
   * Push remarketing parameters for dynamic audience building.
   * GTM uses these to populate Google Ads remarketing lists.
   */
  remarketing(params: {
    page_type: string;
    content_category?: string;
    business_type?: string;
    intent_level?: string;
  }) {
    push("remarketing_event", {
      page_type: params.page_type,
      content_category: params.content_category || "",
      business_type: params.business_type || "",
      intent_level: params.intent_level || "",
      page_path: getPagePath(),
    });
  },
};
