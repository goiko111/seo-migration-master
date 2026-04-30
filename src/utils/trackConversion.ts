/**
 * Google Ads conversion tracking — Winerim
 *
 * Fires the primary lead conversion via direct gtag.js (loaded in index.html,
 * independent from GTM). Safe no-op when gtag is unavailable or blocked by
 * Consent Mode.
 */

const SEND_TO = "AW-16583988575/2kSXCIOO96QcEN-q7uM9";
const VALUE = 100.0;
const CURRENCY = "EUR";

/**
 * Call AFTER a successful form submission to register a Google Ads conversion.
 *
 * @param formType Optional form identifier (demo, contact, empleo, analisis-carta)
 *                 — passed as event parameter for reporting.
 */
export function trackFormConversion(formType?: string): void {
  try {
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", "conversion", {
      send_to: SEND_TO,
      value: VALUE,
      currency: CURRENCY,
      form_type: formType || "lead",
    });
  } catch (err) {
    console.error("trackFormConversion failed (non-blocking):", err);
  }
}