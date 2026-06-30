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
 * Returns false when the Edge Function invocation itself fails.
 */
export async function notifyLead(lead: Record<string, string | null>): Promise<boolean> {
  let ok = true;
  try {
    const { error } = await supabase.functions.invoke("send-lead-notification", {
      body: lead,
    });
    if (error) {
      ok = false;
      console.error("notifyLead edge function error:", error);
    }
  } catch (err) {
    ok = false;
    console.error("notifyLead failed (non-blocking):", err);
  }
  // Fire Google Ads conversion after successful submission
  fireAdsConversion(lead.form_type || undefined);
  return ok;
}
