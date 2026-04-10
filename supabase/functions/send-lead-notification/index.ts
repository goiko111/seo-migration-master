import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SITE = "https://winerim.wine";

/* ──────── Human-readable labels + download paths for every form_type ──────── */
const FORM_LABELS: Record<string, { label: string; resource?: string; downloadPath?: string }> = {
  demo: { label: "Solicitud de demo gratuita" },
  empleo: { label: "Candidatura de empleo" },
  contacto: { label: "Formulario de contacto" },
  "analisis-carta": { label: "Análisis gratuito de carta de vinos" },
  "wine-list-analyzer": { label: "Analizador de carta de vinos (herramienta)" },
  "plantilla-estrategia-vinos-copa": {
    label: "Descarga: Plantilla estrategia vinos por copa",
    resource: "Plantilla de Estrategia de Vinos por Copa",
    downloadPath: "/recursos/plantilla-estrategia-vinos-por-copa",
  },
  "checklist-vinos-muertos": {
    label: "Descarga: Checklist detección vinos muertos",
    resource: "Checklist de Detección de Vinos Muertos",
    downloadPath: "/recursos/checklist-deteccion-vinos-muertos",
  },
  "plantilla-formacion-sala": {
    label: "Descarga: Plantilla formación exprés sala",
    resource: "Plantilla de Formación Exprés para Equipos de Sala",
    downloadPath: "/recursos/plantilla-formacion-equipo-sala",
  },
  "plantilla-analisis-margenes": {
    label: "Descarga: Plantilla análisis de márgenes",
    resource: "Plantilla de Análisis de Márgenes por Referencia",
    downloadPath: "/recursos/plantilla-analisis-margenes",
  },
  "scorecard-rendimiento-carta": {
    label: "Descarga: Scorecard mensual de rendimiento",
    resource: "Scorecard Mensual de Rendimiento de Carta",
    downloadPath: "/recursos/scorecard-rendimiento-carta",
  },
  "checklist-carta-que-vende": {
    label: "Descarga: Checklist ¿tu carta realmente vende?",
    resource: "Checklist: ¿Tu Carta de Vinos Realmente Vende?",
    downloadPath: "/recursos/checklist-carta-que-vende",
  },
  "plantilla-equilibrio-carta": {
    label: "Descarga: Plantilla equilibrio de carta",
    resource: "Plantilla para Evaluar el Equilibrio de tu Carta",
    downloadPath: "/recursos/plantilla-equilibrio-carta",
  },
  "plantilla-revision-mensual": {
    label: "Descarga: Plantilla revisión mensual de carta",
    resource: "Plantilla de Revisión Mensual de Carta de Vinos",
    downloadPath: "/recursos/plantilla-revision-mensual-carta",
  },
  "plantilla-control-grupo": {
    label: "Descarga: Plantilla control grupo restauración",
    resource: "Plantilla de Control para Grupos de Restauración",
    downloadPath: "/recursos/plantilla-control-grupo-restauracion",
  },
  "revision-mensual-margenes": {
    label: "Descarga: Revisión mensual de márgenes",
    resource: "Plantilla de Revisión Mensual de Márgenes",
    downloadPath: "/recursos/revision-mensual-margenes",
  },
  "plantilla-carta-vinos": {
    label: "Descarga: Plantilla de carta de vinos",
    resource: "Plantilla Profesional de Carta de Vinos",
    downloadPath: "/recursos/plantilla-carta-de-vinos",
  },
  "checklist-carta-rentable": {
    label: "Descarga: Checklist carta rentable",
    resource: "Checklist: ¿Tu Carta de Vinos es Rentable?",
    downloadPath: "/recursos/checklist-carta-de-vinos-rentable",
  },
  "guia-vino-por-copa": {
    label: "Descarga: Guía de vino por copa",
    resource: "Guía Completa de Vino por Copa para Restaurantes",
    downloadPath: "/recursos/guia-vino-por-copa-para-restaurantes",
  },
  "plantilla-wine-mapping": {
    label: "Descarga: Plantilla Wine Mapping",
    resource: "Plantilla Wine Mapping para Restaurantes",
    downloadPath: "/recursos/plantilla-wine-mapping-restaurante",
  },
  "plantilla-formacion-expres-sala": {
    label: "Descarga: Plantilla formación exprés sala",
    resource: "Plantilla de Formación Exprés para Equipos de Sala",
    downloadPath: "/recursos/plantilla-formacion-equipo-sala",
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const lead = await req.json();
    const formInfo = FORM_LABELS[lead.form_type || ""] || { label: lead.form_type || "Desconocido" };

    // 1) Send internal notification to info@winerim.com via transactional email
    const notifId = crypto.randomUUID();
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "lead-notification",
        recipientEmail: "info@winerim.com",
        idempotencyKey: `lead-notif-${notifId}`,
        templateData: {
          formLabel: formInfo.label,
          restaurant: lead.restaurant,
          name: lead.name,
          position: lead.position,
          email: lead.email,
          phone: lead.phone,
          city: lead.city,
          business_type: lead.business_type,
          num_locations: lead.num_locations,
          references_count: lead.references_count,
          has_sommelier: lead.has_sommelier,
          main_challenge: lead.main_challenge,
          message: lead.message,
          menu_link: lead.menu_link,
        },
      },
    });

    // 2) Forward lead to Winerim Connect (Lead Autopilot)
    const CONNECT_URL = Deno.env.get("WINERIM_CONNECT_WEBHOOK_URL");
    if (CONNECT_URL) {
      try {
        const connectRes = await fetch(CONNECT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: lead.name || null,
            email: lead.email || null,
            phone: lead.phone || null,
            company: lead.restaurant || null,
            city: lead.city || null,
            position: lead.position || null,
            business_type: lead.business_type || null,
            num_locations: lead.num_locations || null,
            references_count: lead.references_count || null,
            has_sommelier: lead.has_sommelier || null,
            main_challenge: lead.main_challenge || null,
            message: lead.message || null,
            menu_link: lead.menu_link || null,
            form_type: lead.form_type || null,
            form_label: formInfo.label,
            resource: formInfo.resource || null,
            source: "winerim_web",
          }),
        });
        if (!connectRes.ok) {
          const err = await connectRes.text();
          console.error("Winerim Connect webhook error:", err);
        } else {
          console.log("Lead forwarded to Winerim Connect");
        }
      } catch (e) {
        console.error("Winerim Connect webhook failed (non-blocking):", e);
      }
    }

    // 3) Send confirmation to the lead (if they provided email)
    if (lead.email) {
      const confirmId = crypto.randomUUID();
      let templateName = "lead-confirmation-generic";
      const templateData: Record<string, string> = { name: lead.name || "" };

      if (lead.form_type === "demo") {
        templateName = "lead-confirmation-demo";
        templateData.restaurant = lead.restaurant || "";
      } else if (lead.form_type === "contacto") {
        templateName = "lead-confirmation-contact";
        templateData.restaurant = lead.restaurant || "";
      } else if (lead.form_type === "analisis-carta") {
        templateName = "lead-confirmation-analysis";
      } else if (formInfo.resource) {
        templateName = "lead-confirmation-resource";
        templateData.resourceName = formInfo.resource;
        if (formInfo.downloadPath) {
          templateData.downloadUrl = `${SITE}${formInfo.downloadPath}`;
        }
      }

      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName,
          recipientEmail: lead.email,
          idempotencyKey: `lead-confirm-${confirmId}`,
          templateData,
        },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-lead-notification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
