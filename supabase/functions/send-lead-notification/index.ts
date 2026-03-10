import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API = "https://api.resend.com/emails";
const NOTIFY_TO = "info@winerim.com";

/* Human-readable labels for each form_type */
const FORM_LABELS: Record<string, { label: string; resource?: string }> = {
  demo: { label: "Solicitud de demo gratuita" },
  contacto: { label: "Formulario de contacto" },
  "analisis-carta": { label: "Análisis gratuito de carta de vinos" },
  "guia-vino-por-copa": {
    label: "Descarga: Guía de vino por copa",
    resource: "Guía completa de vino por copa para restaurantes",
  },
  "plantilla-carta-vinos": {
    label: "Descarga: Plantilla de carta de vinos",
    resource: "Plantilla profesional de carta de vinos",
  },
  "plantilla-wine-mapping": {
    label: "Descarga: Plantilla Wine Mapping",
    resource: "Plantilla de Wine Mapping para restaurantes",
  },
  "checklist-carta-rentable": {
    label: "Descarga: Checklist carta rentable",
    resource: "Checklist: ¿Tu carta de vinos es rentable?",
  },
  "wine-list-analyzer": { label: "Analizador de carta de vinos (herramienta)" },
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
    ["Nº referencias", lead.references_count],
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

/* ──────── Confirmation / resource email to the lead ──────── */
function buildLeadConfirmationHtml(lead: Record<string, string | null>) {
  const formInfo = FORM_LABELS[lead.form_type || ""] || { label: lead.form_type };
  const name = lead.name?.split(" ")[0] || "Hola";

  // Determine what to say based on form_type
  let bodyContent = "";

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
      <p>Hemos recibido tu solicitud de <strong>análisis gratuito de carta de vinos</strong> para <strong>${lead.restaurant || "tu restaurante"}</strong>.</p>
      <p>Nuestro equipo revisará tu mensaje y te responderá en menos de <strong>24 horas</strong>.</p>
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
    bodyContent = `
      <p>Gracias por solicitar nuestro recurso: <strong>${formInfo.resource}</strong>.</p>
      <p>Nuestro equipo te enviará el recurso a este email en las próximas <strong>24 horas</strong>.</p>
      <p>Mientras tanto, puedes explorar más herramientas gratuitas en <a href="https://winerim.wine/herramientas" style="color:#722F37">winerim.wine/herramientas</a>.</p>
    `;
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
    <a href="https://winerim.wine" style="display:inline-block;background:#722F37;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Visitar Winerim</a>
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
      const confirmRes = await fetch(RESEND_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Winerim <info@wine.winerim.wine>",
          to: [lead.email],
          subject: formInfo.resource
            ? `Tu recurso: ${formInfo.resource} — Winerim`
            : "Hemos recibido tu solicitud — Winerim",
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
