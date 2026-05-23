import { supabase } from "@/integrations/supabase/client";

/**
 * Fire Google Ads conversion event after a successful form submission.
 * Uses gtag.js loaded directly in index.html (independent from GTM).
 * Safe no-op if gtag is unavailable or blocked by consent.
 */
export function fireAdsConversion(formType?: string): void {
  try {
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", "conversion", {
      send_to: "AW-16583988575/2kSXCIOO96QcEN-q7uM9",
      value: 100.0,
      currency: "EUR",
      form_type: formType || "lead",
    });
  } catch (err) {
    console.error("fireAdsConversion failed (non-blocking):", err);
  }
}

/**
 * Sends lead data to the notification edge function.
 * Fire-and-forget: errors are logged but don't block the UI.
 */
export async function notifyLead(lead: Record<string, string | null>) {
  try {
    await supabase.functions.invoke("send-lead-notification", {
      body: lead,
    });
  } catch (err) {
    console.error("notifyLead failed (non-blocking):", err);
  }
  // Fire Google Ads conversion after successful submission
  fireAdsConversion(lead.form_type || undefined);
}
