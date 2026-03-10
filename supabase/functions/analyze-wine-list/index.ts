import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { wineListText, saveReport, email, restaurant, city } = await req.json();

    if (!wineListText || typeof wineListText !== "string" || wineListText.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Texto de carta de vinos insuficiente para analizar." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Eres un sommelier experto y consultor de cartas de vinos para restaurantes. Analiza la carta de vinos proporcionada y devuelve un JSON con la siguiente estructura exacta (sin markdown, solo JSON puro):

{
  "score": <number 0-100>,
  "totalReferences": <number>,
  "summary": "<resumen ejecutivo en 2-3 frases>",
  "sections": {
    "estructura": {
      "score": <number 0-100>,
      "label": "Estructura",
      "findings": ["<hallazgo 1>", "<hallazgo 2>", ...],
      "recommendations": ["<recomendación 1>", ...]
    },
    "pricing": {
      "score": <number 0-100>,
      "label": "Distribución de precios",
      "findings": ["<hallazgo>", ...],
      "recommendations": ["<recomendación>", ...]
    },
    "variedad": {
      "score": <number 0-100>,
      "label": "Variedad y equilibrio",
      "findings": ["<hallazgo>", ...],
      "recommendations": ["<recomendación>", ...]
    },
    "oportunidades": {
      "score": <number 0-100>,
      "label": "Oportunidades de mejora",
      "findings": ["<hallazgo>", ...],
      "recommendations": ["<recomendación>", ...]
    }
  },
  "priceDistribution": {
    "low": <number percentage>,
    "mid": <number percentage>,
    "high": <number percentage>,
    "premium": <number percentage>
  },
  "duplicates": ["<vino duplicado en estilo>", ...],
  "priceGaps": ["<hueco en rango de precios>", ...],
  "byThGlassPotential": ["<vino candidato a copa>", ...]
}

Analiza: número de referencias, distribución de precios, equilibrio entre categorías, vinos duplicados en estilo, huecos en rangos de precio y potencial de vino por copa. Sé específico y práctico en las recomendaciones.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analiza esta carta de vinos:\n\n${wineListText.substring(0, 15000)}` },
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", errorText);
      return new Response(
        JSON.stringify({ error: "Error al procesar el análisis. Inténtalo de nuevo." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    // Extract JSON from response (handle potential markdown wrapping)
    let analysisResult;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      analysisResult = JSON.parse(jsonMatch[0]);
    } catch {
      console.error("Failed to parse AI response:", rawContent);
      return new Response(
        JSON.stringify({ error: "Error al interpretar el análisis. Inténtalo de nuevo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save lead if requested
    if (saveReport && email) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const leadData = {
        form_type: "wine-list-analyzer",
        email: email.substring(0, 255),
        restaurant: restaurant?.substring(0, 255) || null,
        city: city?.substring(0, 255) || null,
        message: JSON.stringify({ score: analysisResult.score, totalReferences: analysisResult.totalReferences }),
      };
      await supabase.from("contact_leads").insert(leadData);

      // Fire notification email
      const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
      if (RESEND_KEY) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "Winerim Leads <leads@wine.winerim.wine>",
              to: ["info@winerim.com"],
              subject: `[Analizador de carta] ${restaurant || email}`,
              html: `<p><strong>Nuevo análisis de carta</strong></p><p>Email: ${email}</p><p>Restaurante: ${restaurant || "-"}</p><p>Ciudad: ${city || "-"}</p><p>Score: ${analysisResult.score}/100</p>`,
            }),
          });
        } catch (e) { console.error("Notification email failed:", e); }
      }
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
