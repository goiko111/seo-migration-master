import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { measureOpenAILeadCreated } from "@/lib/openaiAds";

type ContactLead = Omit<
  Database["public"]["Tables"]["contact_leads"]["Insert"],
  "id"
>;

type LeadSubmissionResult = {
  ok: boolean;
  duplicate: boolean;
  error: unknown | null;
};

export function createLeadSubmissionId(): string {
  if (typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * Persists the lead first, then measures it. Reusing the same UUID on retry makes
 * a duplicate-key response proof that the original lead already exists.
 */
export async function persistLeadAndMeasure(
  leadId: string,
  lead: ContactLead,
): Promise<LeadSubmissionResult> {
  const { error } = await supabase.from("contact_leads").insert({
    ...lead,
    id: leadId,
  });
  const duplicate = error?.code === "23505";

  if (error && !duplicate) {
    return { ok: false, duplicate: false, error };
  }

  measureOpenAILeadCreated(`lead_${leadId}`);
  return { ok: true, duplicate, error: null };
}
