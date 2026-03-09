import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const { dishType, mainIngredient, cuisineType, intensity } = await req.json();

    if (!dishType || !mainIngredient) {
      return new Response(
        JSON.stringify({ error: "Introduce al menos el tipo de plato y el ingrediente principal." }),
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

    const systemPrompt = `Eres un sommelier experto en maridajes de vino y comida. El usuario te dará información sobre un plato y debes recomendar 3 vinos que mariden bien.

Responde SOLO con un JSON válido (sin markdown) con esta estructura exacta:

{
  "wines": [
    {
      "name": "<nombre del vino o tipo genérico>",
      "grape": "<uva principal>",
      "region": "<región de origen>",
      "why": "<explicación breve de por qué marida bien con el plato>",
      "style": "<estilo del vino: ligero, estructurado, fresco, etc.>",
      "servingTemp": "<temperatura de servicio recomendada>"
    }
  ],
  "pairingExplanation": "<explicación general del maridaje: por qué estos estilos funcionan con este plato>",
  "recommendedStyles": ["<estilo 1>", "<estilo 2>", "<estilo 3>"],
  "tips": "<consejo extra del sommelier para este tipo de plato>"
}

Sé específico con nombres de vinos reales cuando sea posible. Incluye variedad de estilos y rangos de precio.`;

    const userPrompt = `Plato: ${dishType.substring(0, 200)}
Ingrediente principal: ${mainIngredient.substring(0, 200)}
${cuisineType ? `Tipo de cocina: ${cuisineType.substring(0, 100)}` : ""}
${intensity ? `Intensidad del plato: ${intensity}` : ""}`;

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
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Espera unos segundos e inténtalo de nuevo." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      console.error("AI Gateway error:", status, await aiResponse.text());
      return new Response(
        JSON.stringify({ error: "Error al generar recomendaciones. Inténtalo de nuevo." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let result;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      result = JSON.parse(jsonMatch[0]);
    } catch {
      console.error("Failed to parse AI response:", rawContent);
      return new Response(
        JSON.stringify({ error: "Error al interpretar las recomendaciones. Inténtalo de nuevo." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(result), {
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
