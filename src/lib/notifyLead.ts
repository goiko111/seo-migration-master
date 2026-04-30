import { supabase } from "@/integrations/supabase/client";

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
}
