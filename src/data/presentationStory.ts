import type { PresentationContent as CurrentPresentationContent } from "@/data/presentationContent";
import type { PresentationContent as LegacyPresentationContent } from "@/data/presentationLegacyContent";
import type { SupportedLang } from "@/i18n/types";

const localizedLabels: Record<SupportedLang, { pain: string; antidote: string }> = {
  es: { pain: "Dolor habitual", antidote: "Antídoto Winerim" },
  en: { pain: "Everyday pain", antidote: "Winerim answer" },
  fr: { pain: "Problème quotidien", antidote: "Réponse Winerim" },
  it: { pain: "Problema quotidiano", antidote: "Risposta Winerim" },
  de: { pain: "Problem im Alltag", antidote: "Winerim-Lösung" },
  pt: { pain: "Problema diário", antidote: "Resposta Winerim" },
};

export function createCurrentCommercialContent(
  language: SupportedLang,
  legacy: LegacyPresentationContent,
  current: CurrentPresentationContent,
): LegacyPresentationContent {
  if (language === "es") return {
    ...legacy,
    sPainsSubtitle: "Cinco situaciones habituales del vino en hostelería y herramientas para abordarlas con el equipo.",
    sPainsItems: legacy.sPainsItems.map((item, index) => index === 3
      ? { ...item, antidote: "Disponibilidad de la carta basada en el inventario registrado y en las integraciones validadas." } : item),
    s3Body: "Winerim reúne carta digital, herramientas de recomendación y gestión de bodega. El alcance de ventas, stock y automatización depende de los módulos y conexiones validados para cada restaurante.",
    s4ColDinerBody: "Explora vinos por estilo, gusto o maridaje, con el equipo de sala disponible para acompañar la elección.",
    s4ColRestaurantBody: "Revisa oferta, formatos y precios. Contrasta stock, costes y ventas según la cobertura de tus datos.",
    s5Items: [
      { title: "Apoyo a la venta de vino", body: "Maridajes y fichas para acompañar la recomendación, sin garantizar un aumento del ticket." },
      legacy.s5Items[1], legacy.s5Items[2],
      { title: "Disponibilidad informada", body: "Revisa el inventario registrado. La sincronización requiere una conexión validada y conciliación física." },
      { title: "Carta multilingüe", body: "Configura los idiomas y revisa las fichas y el recorrido de tu carta antes de ofrecerlos al huésped." },
      { title: "Rotación con contexto", body: "Identifica referencias para revisar cuando exista histórico fiable de ventas y existencias." },
      { title: "Elección acompañada", body: "Búsqueda, comparador y fichas para reducir dudas en mesa." },
    ],
    s7Pillars: legacy.s7Pillars.map((item, index) => index === 0
      ? { title: "Notas de cata asistidas", body: "Perfiles descriptivos que el equipo debe revisar antes de publicar." }
      : index === 1 ? { title: "Sugerencias de maridaje", body: "Opciones según el plato y la carta; el criterio de sala sigue siendo esencial." } : item),
    s8TastingBody: "Perfiles aromáticos y descripciones para apoyar la elección. La información asistida por IA requiere revisión editorial; no sustituye una cata ni la ficha técnica del productor.",
    s8PairingBody: "Sugiere opciones de la carta considerando el plato y sus ingredientes. El equipo revisa la propuesta según preparación y preferencias del comensal.",
    s9BigDataBullets: ["Revisa demanda y ventas cuando exista histórico validado.", "Compara periodos con la misma cobertura y criterios.", "Identifica referencias que merecen una revisión; no se garantiza una predicción de ventas."],
    s10Body: "El stock registrado necesita entradas, salidas y conciliación. Confirmamos qué datos aporta cada integración antes de usarlos para decisiones operativas.",
    s10Items: [
      { title: "Inventario registrado", body: "Contrasta existencias con conteos físicos." },
      { title: "Integración validada", body: "Verifica formatos, movimientos y ausencia de duplicados." },
      { title: "Rotación", body: "Revisa tendencias con histórico fiable y periodo explícito." },
      { title: "Compras revisadas", body: "Las sugerencias no equivalen a pedidos enviados ni garantizan disponibilidad." },
      { title: "Margen con contexto", body: "Distingue coste, precio y resultado, con impuestos y formato coherentes." },
    ],
    s11Subtitle: "Un despliegue por etapas: primero la operativa de un local, después el alcance compartido del grupo.",
    s11Items: [
      { title: "Roles y permisos", body: "Acordar y validar qué puede consultar o modificar cada equipo." },
      { title: "Datos comparables", body: "Confirmar cobertura, periodos y criterios antes de comparar locales." },
      { title: "Piloto coordinado", body: "Revisar incidencias y readback antes de ampliar la implantación." },
      { title: "Bodega central", body: "Flujo sujeto a alcance y validación específicos; no se presupone activo." },
    ],
    sMgmtSubtitle: "Carta, bodega y análisis se apoyan en datos de distinta procedencia. La disponibilidad de cada módulo y conexión se confirma para cada implantación.",
    sMgmtFootnote: "CloudRIM, SAVia, RIMs, compras y capacidades de grupo requieren confirmar alcance, permisos y estado productivo. Una pantalla no certifica el flujo completo.",
    s12Title: "Una implantación por etapas",
    s12Body: "Revisamos carta, formatos e idiomas; acordamos las conexiones y comprobamos su resultado con el equipo. El calendario depende del alcance y de la calidad de los datos disponibles.",
    s13Subtitle: "Referencias visuales de la presentación existente. Los resultados de cada restaurante dependen de su operativa; no se promete un retorno económico.",
    s13Quote: "Primero información fiable. Después, decisiones que el equipo pueda comprobar.",
  };
  if (language === "en") return legacy;

  const labels = localizedLabels[language];
  return {
    ...legacy,
    metaTitle: current.metaTitle,
    metaDescription: current.metaDescription,
    shareLabel: current.shareLabel,
    shareCopied: current.shareCopied,
    fullscreenLabel: current.fullscreenLabel,
    ctaTalk: current.ctaTalk,
    scrollDown: current.scrollDown,
    preparedFor: current.preparedFor,
    sPainsEyebrow: current.challenge.eyebrow,
    sPainsTitle: current.challenge.title,
    sPainsSubtitle: current.challenge.subtitle,
    sPainsPainLabel: labels.pain,
    sPainsAntidoteLabel: labels.antidote,
    sPainsItems: [
      ...current.challenge.items.map((item) => ({ pain: item.title, antidote: item.body })),
      { pain: current.cellar.items[2].title, antidote: current.cellar.items[2].body },
    ],
    s5Eyebrow: current.performance.eyebrow,
    s5Title: current.performance.title,
    s5Items: [
      ...current.performance.items,
      ...current.groups.items.slice(0, 3),
    ],
    s6Eyebrow: current.core.eyebrow,
    s6Title: current.core.title,
    s6Items: current.core.items,
    s7Eyebrow: current.flow.eyebrow,
    s7Title: current.flow.title,
    s7Subtitle: current.flow.subtitle,
    s7Pillars: [
      ...current.flow.steps.map((step) => ({ title: step.title, body: step.body })),
      ...current.cellar.items.slice(0, 2),
    ],
    s8Eyebrow: current.core.eyebrow,
    s8TastingTitle: current.core.items[1].title,
    s8TastingBody: current.core.items[1].body,
    s8PairingTitle: current.core.items[0].title,
    s8PairingBody: current.core.items[0].body,
    s9Eyebrow: current.performance.eyebrow,
    s9BigDataTitle: current.performance.title,
    s9BigDataBullets: current.performance.items.slice(0, 3).map((item) => item.body),
    s9CompTitle: current.core.items[2].title,
    s9CompBody: current.core.items[2].body,
    s10Eyebrow: current.cellar.eyebrow,
    s10Title: current.cellar.title,
    s10Body: current.cellar.subtitle,
    s10Items: [
      ...current.cellar.items,
      ...current.performance.items.slice(0, 2),
    ],
    s11Eyebrow: current.groups.eyebrow,
    s11Title: current.groups.title,
    s11Subtitle: current.groups.subtitle,
    s11Items: current.groups.items,
    sMgmtEyebrow: current.intelligence.eyebrow,
    sMgmtTitle: current.intelligence.title,
    sMgmtSubtitle: current.intelligence.subtitle,
    sMgmtItems: [
      current.intelligence.rims,
      current.intelligence.savia,
      ...current.flow.steps.slice(1).map((step) => ({ title: step.title, body: step.body })),
      current.groups.items[3],
    ],
    sMgmtFootnote: current.intelligence.approval,
    sSupplyEyebrow: current.performance.items[2].title,
    sSupplyTitle: current.performance.items[2].title,
    sSupplyBody: current.performance.items[2].body,
    sSupplyItems: current.performance.items,
    sSupplyTag: current.performance.eyebrow,
    s12Eyebrow: current.rollout.eyebrow,
    s12Title: current.rollout.title,
    s12Body: current.rollout.body,
    s12Steps: current.rollout.steps,
    s13Eyebrow: current.proof.eyebrow,
    s13Title: current.proof.title,
    s13Subtitle: current.proof.subtitle,
    s13Quote: current.proof.quote,
    s13QuoteAuthor: current.proof.author,
    s14Eyebrow: current.closing.eyebrow,
    s14Title: current.closing.title,
    s14Highlight1: current.closing.body,
    s14Highlight2: current.platform.proof,
    s14CtaPrimary: current.closing.primaryCta,
    s14CtaSecondary: current.closing.secondaryCta,
    s14Email: current.closing.email,
    s14Phone: current.closing.phone,
  };
}

export function getCommercialSlideLabels(
  legacy: LegacyPresentationContent,
  current: CurrentPresentationContent,
  options: { includesUpdates: boolean; embedded: boolean },
) {
  const { includesUpdates, embedded } = options;
  return [
    legacy.s1Eyebrow,
    legacy.s2Eyebrow,
    legacy.sPainsEyebrow,
    legacy.s3Eyebrow,
    legacy.s4Eyebrow,
    legacy.s5Eyebrow,
    legacy.s6Eyebrow,
    legacy.s7Eyebrow,
    legacy.s8Eyebrow,
    legacy.s9Eyebrow,
    legacy.s10Eyebrow,
    legacy.s11Eyebrow,
    legacy.sMgmtEyebrow,
    ...(includesUpdates
      ? [
          current.flow.eyebrow,
          current.cloudrim.eyebrow,
          current.cellar.eyebrow,
          current.performance.eyebrow,
          current.performance.eyebrow,
          current.intelligence.eyebrow,
          "SAVia",
        ]
      : []),
    legacy.sSupplyEyebrow,
    legacy.s12Eyebrow,
    legacy.s13Eyebrow,
    ...(!embedded
      ? [...(!includesUpdates ? [legacy.sPricingEyebrow] : []), legacy.s14Eyebrow]
      : []),
  ];
}
