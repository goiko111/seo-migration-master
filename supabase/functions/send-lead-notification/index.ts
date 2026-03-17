import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API = "https://api.resend.com/emails";
const NOTIFY_TO = "info@winerim.com";
const SITE = "https://winerim.wine";

/* ──────── Human-readable labels + download paths for every form_type ──────── */
const FORM_LABELS: Record<string, { label: string; resource?: string; downloadPath?: string }> = {
  // Non-resource forms
  demo: { label: "Solicitud de demo gratuita" },
  contacto: { label: "Formulario de contacto" },
  "analisis-carta": { label: "Análisis gratuito de carta de vinos" },
  "wine-list-analyzer": { label: "Analizador de carta de vinos (herramienta)" },

  // Resource downloads — 13 resources
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

  // Legacy form_type aliases (keep for backwards compat)
  "plantilla-formacion-expres-sala": {
    label: "Descarga: Plantilla formación exprés sala",
    resource: "Plantilla de Formación Exprés para Equipos de Sala",
    downloadPath: "/recursos/plantilla-formacion-equipo-sala",
  },
};

/* ──────── Internal notification email to info@winerim.com ──────── */
function buildNotificationHtml(lead: Record<string, string | null>) {
  const formInfo = FORM_LABELS[lead.form_type || ""] || { label: lead.form_type };
  const rows = [
    ["Formulario", formInfo.label],
    ["Restaurante", lead.restaurant],
    ["Nombre", lead.name],
    ["Cargo", lead.position],
    ["Email", lead.email],
    ["Teléfono", lead.phone],
    ["Ciudad", lead.city],
    ["Tipo de negocio", lead.business_type],
    ["Nº locales", lead.num_locations],
    ["Nº referencias", lead.references_count],
    ["¿Tiene sumiller?", lead.has_sommelier],
    ["Desafío principal", lead.main_challenge],
    ["Mensaje", lead.message],
    ["Link carta", lead.menu_link],
  ]
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#333;border-bottom:1px solid #eee">${k}</td><td style="padding:6px 12px;color:#555;border-bottom:1px solid #eee">${v}</td></tr>`
    )
    .join("");

  return `
<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f7f7f7;padding:24px">
<div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e5e5">
  <h1 style="font-size:20px;color:#1a1a1a;margin:0 0 4px">Nuevo lead — Winerim</h1>
  <p style="color:#888;font-size:13px;margin:0 0 20px">Origen: <strong>${formInfo.label}</strong></p>
  <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
  <p style="margin-top:24px;font-size:12px;color:#aaa">Este email se ha generado automáticamente desde winerim.wine</p>
</div></body></html>`;
}

/* ──────── Confirmation email to the lead ──────── */
function buildLeadConfirmationHtml(lead: Record<string, string | null>) {
  const formInfo = FORM_LABELS[lead.form_type || ""] || { label: lead.form_type };
  const name = lead.name?.split(" ")[0] || "Hola";

  let bodyContent = "";
  let ctaUrl = SITE;
  let ctaLabel = "Visitar Winerim";

  if (lead.form_type === "demo") {
    bodyContent = `
      <p>Hemos recibido tu solicitud de <strong>demo gratuita</strong> para <strong>${lead.restaurant || "tu restaurante"}</strong>.</p>
      <p>Un miembro de nuestro equipo se pondrá en contacto contigo en las próximas <strong>24 horas</strong> para agendar la demostración personalizada.</p>
      <p>Durante la demo te mostraremos:</p>
      <ul>
        <li>Cómo funciona la carta inteligente de Winerim</li>
        <li>Un análisis inicial de tu carta de vinos</li>
        <li>Las funcionalidades que mejor se adaptan a tu restaurante</li>
      </ul>
    `;
  } else if (lead.form_type === "contacto") {
    bodyContent = `
      <p>Hemos recibido tu mensaje para <strong>${lead.restaurant || "tu restaurante"}</strong>.</p>
      <p>Nuestro equipo revisará tu solicitud y te responderá en menos de <strong>24 horas</strong>.</p>
    `;
  } else if (lead.form_type === "analisis-carta") {
    bodyContent = `
      <p>Hemos recibido tu carta de vinos y nuestro equipo ya está trabajando en tu <strong>análisis personalizado</strong>.</p>
      <p>Recibirás tu informe completo en menos de <strong>48 horas</strong> con:</p>
      <ul>
        <li>Análisis de estructura y organización</li>
        <li>Evaluación de rangos de precio</li>
        <li>Recomendaciones de optimización</li>
        <li>Estimación de potencial de ventas</li>
      </ul>
    `;
  } else if (formInfo.resource) {
    // ── Resource download confirmation ──
    const downloadUrl = formInfo.downloadPath ? `${SITE}${formInfo.downloadPath}` : null;
    bodyContent = `
      <p>Ya tienes disponible tu recurso: <strong>${formInfo.resource}</strong>.</p>
      <p>La descarga se ha iniciado automáticamente desde la web. Este email sirve como <strong>confirmación y respaldo</strong> para que puedas acceder de nuevo en cualquier momento.</p>
      ${downloadUrl ? `<p>Si necesitas descargarlo otra vez, puedes hacerlo aquí:</p>` : ""}
      <p style="margin-top:8px">Mientras tanto, explora más herramientas gratuitas en <a href="${SITE}/herramientas" style="color:#722F37;font-weight:600">winerim.wine/herramientas</a>.</p>
    `;
    if (downloadUrl) {
      ctaUrl = downloadUrl;
      ctaLabel = "Acceder al recurso";
    }
  } else {
    bodyContent = `
      <p>Hemos recibido tu solicitud correctamente. Te contactaremos lo antes posible.</p>
    `;
  }

  return `
<!DOCTYPE html><html><body style="font-family:sans-serif;background:#f7f7f7;padding:24px">
<div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e5e5e5">
  <div style="text-align:center;margin-bottom:24px">
    <h1 style="font-size:24px;color:#722F37;margin:0">Winerim</h1>
    <p style="color:#888;font-size:12px;margin:4px 0 0">La carta inteligente de vinos</p>
  </div>
  <h2 style="font-size:18px;color:#1a1a1a;margin:0 0 16px">¡Gracias, ${name}!</h2>
  <div style="font-size:14px;color:#444;line-height:1.7">${bodyContent}</div>
  <div style="margin-top:28px;text-align:center">
    <a href="${ctaUrl}" style="display:inline-block;background:#722F37;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">${ctaLabel}</a>
  </div>
  <p style="margin-top:24px;font-size:11px;color:#aaa;text-align:center">
    Si no has solicitado esto, puedes ignorar este mensaje.<br/>
    © Winerim — info@winerim.com
  </p>
</div></body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_KEY) throw new Error("RESEND_API_KEY not configured");

    const lead = await req.json();
    const formInfo = FORM_LABELS[lead.form_type || ""] || { label: lead.form_type || "Desconocido" };

    // 1) Send notification to info@winerim.com
    const notifRes = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Winerim Leads <leads@wine.winerim.wine>",
        to: [NOTIFY_TO],
        subject: `[${formInfo.label}] ${lead.restaurant || lead.name || "Nuevo lead"}`,
        html: buildNotificationHtml(lead),
      }),
    });

    if (!notifRes.ok) {
      const err = await notifRes.text();
      console.error("Resend notification error:", err);
    }

    // 2) Send confirmation to the lead (if they provided email)
    if (lead.email) {
      const subjectLine = formInfo.resource
        ? `Tu recurso: ${formInfo.resource} — Winerim`
        : "Hemos recibido tu solicitud — Winerim";

      const confirmRes = await fetch(RESEND_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Winerim <info@wine.winerim.wine>",
          to: [lead.email],
          subject: subjectLine,
          html: buildLeadConfirmationHtml(lead),
        }),
      });

      if (!confirmRes.ok) {
        const err = await confirmRes.text();
        console.error("Resend confirmation error:", err);
      }
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
