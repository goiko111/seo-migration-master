import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  restaurant?: string;
  city?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  hp?: string; // honeypot
}

const TARGET_URL = "https://edwuzzmeunzgsrejlmwr.supabase.co/functions/v1/leads-upsert";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Honeypot anti-spam: if filled, silently accept
  if (body.hp && body.hp.trim().length > 0) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!body.email || !body.name) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiKey = Deno.env.get("WINERIM_API_KEY");
  const anonKey = Deno.env.get("WINERIM_ANON_KEY");

  if (!apiKey || !anonKey) {
    console.error("[submit-gastrofunnel] Missing WINERIM_API_KEY or WINERIM_ANON_KEY secret");
    return new Response(JSON.stringify({ error: "Server not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const bodyText = [
    "Lead GastroFunnel desde go.winerim.wine",
    `Ciudad: ${body.city || ""}`,
    `UTM source: ${body.utm_source || ""}`,
    `UTM medium: ${body.utm_medium || ""}`,
    `UTM campaign: ${body.utm_campaign || ""}`,
    `UTM content: ${body.utm_content || ""}`,
    `UTM term: ${body.utm_term || ""}`,
    `fbclid: ${body.fbclid || ""}`,
  ].join("\n");

  const payload = {
    source: "gastrofunnel",
    name: body.name,
    email: body.email,
    phone: body.phone || "",
    company: body.restaurant || "",
    tags: ["gastrofunnel"],
    body_text: bodyText,
  };

  try {
    const upstream = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    let upstreamJson: unknown = null;
    try {
      upstreamJson = JSON.parse(text);
    } catch {
      upstreamJson = { raw: text };
    }

    if (!upstream.ok) {
      console.error("[submit-gastrofunnel] Upstream error", upstream.status, text);
      return new Response(
        JSON.stringify({ success: false, status: upstream.status, upstream: upstreamJson }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, upstream: upstreamJson }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[submit-gastrofunnel] Fetch failed", err);
    return new Response(JSON.stringify({ success: false, error: "Upstream fetch failed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});