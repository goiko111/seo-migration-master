/**
 * Centralized internal link graph for SEO and conversion flow.
 * 
 * Flow patterns:
 *   problema → guía → herramienta → recurso → demo
 *   comparativa → solución → CTA
 *   blog MOFU → BOFU → demo
 *   funcionalidad → caso → recurso → CTA
 */

import type { NextStep } from "@/components/seo/NextSteps";

/* ─── Reusable link pools ─── */

export const TOOLS = {
  analyzer: { to: "/analisis-carta", label: "Analiza tu carta gratis", description: "Sube tu carta y recibe un diagnóstico con recomendaciones concretas.", type: "tool" as const },
  margin: { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", description: "Calcula el margen óptimo para cada referencia de tu carta.", type: "tool" as const },
  glass: { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa", description: "Calcula el precio ideal por copa según coste, merma y margen objetivo.", type: "tool" as const },
  ticketMedio: { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de ticket medio", description: "Estima el impacto de mejorar el ratio de mesas y el ticket por mesa.", type: "tool" as const },
  multiLocal: { to: "/herramientas/auditor-carta-multilocal", label: "Auditor multi-local", description: "Compara la carta entre locales: surtido, pricing, copa y ticket.", type: "tool" as const },
  deadStock: { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", description: "Estima el capital inmovilizado en vinos sin rotación.", type: "tool" as const },
  score: { to: "/herramientas/wine-list-score", label: "Wine List Score", description: "Score de 0 a 100 de tu carta de vinos en 6 dimensiones.", type: "tool" as const },
  benchmark: { to: "/wine-list-benchmark", label: "Benchmark de cartas", description: "Compara tu carta con los estándares del sector.", type: "tool" as const },
  roi: { to: "/wine-roi-calculator", label: "Calculadora ROI", description: "Calcula el potencial de mejora al digitalizar tu carta.", type: "tool" as const },
  diagnostic: { to: "/herramientas/diagnostico-vino-por-copa", label: "Diagnóstico vino por copa", description: "Evalúa tu oferta por copa: estilos, precios y rentabilidad.", type: "tool" as const },
};

export const GUIDES = {
  organizar: { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", description: "Estructura tu carta de forma clara, rentable y fácil de entender.", type: "guide" as const },
  cuantos: { to: "/blog/cuantos-vinos-carta-restaurante", label: "Cuántos vinos debe tener una carta", description: "Define el número ideal de referencias según tu tipo de restaurante.", type: "guide" as const },
  rentable: { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", description: "Pricing, wine mapping y selección para maximizar ventas y márgenes.", type: "guide" as const },
  venderMas: { to: "/como-vender-mas-vino-en-un-restaurante", label: "Cómo vender más vino", description: "Estrategias probadas para aumentar ventas de vino en tu restaurante.", type: "guide" as const },
  copa: { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes", description: "Todo lo que necesitas para implementar un programa de copa rentable.", type: "guide" as const },
  precio: { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino", description: "Márgenes, multiplicadores y estrategias de pricing para vino.", type: "guide" as const },
  rotacion: { to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", label: "Mejorar la rotación de vinos", description: "Estrategias para eliminar stock muerto y mantener una bodega rentable.", type: "guide" as const },
  maridaje: { to: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", label: "Estrategia de maridaje", description: "Diseña maridajes que aumenten ventas de vino y mejoren la experiencia.", type: "guide" as const },
  grupos: { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Gestionar carta en grupos", description: "Governance, benchmarking entre locales y control centralizado.", type: "guide" as const },
  copaSinMargen: { to: "/guias/como-implantar-vino-por-copa-sin-perder-margen", label: "Copa sin perder margen", description: "Pricing, merma y rotación para un programa de copa rentable.", type: "guide" as const },
  sinSumiller: { to: "/guias/como-usar-winerim-sin-sumiller", label: "Winerim sin sumiller", description: "Recomendaciones automáticas y formación integrada sin expertise.", type: "guide" as const },
  surtido: { to: "/guias/como-decidir-surtido-segun-ticket-medio-tipo-local", label: "Surtido según ticket medio", description: "Framework para elegir qué vinos tener según tu perfil.", type: "guide" as const },
  canibalizacion: { to: "/guias/como-detectar-canibalizacion-vinos-carta", label: "Detectar canibalización", description: "Identifica referencias que compiten entre sí en tu carta.", type: "guide" as const },
  revisionMensual: { to: "/guias/como-revisar-carta-vinos-cada-mes", label: "Revisar la carta cada mes", description: "Proceso de 90 minutos para mantener tu carta optimizada.", type: "guide" as const },
  formarEquipo: { to: "/guias/como-formar-equipo-sala-para-vender-vino", label: "Formar al equipo de sala", description: "Programa práctico para que tu equipo recomiende vino.", type: "guide" as const },
  datosCompra: { to: "/guias/como-usar-datos-para-decidir-que-vinos-comprar", label: "Usar datos para comprar vinos", description: "Rotación, márgenes y tendencias: compra con criterio.", type: "guide" as const },
};

export const SOLUTIONS = {
  software: { to: "/software-carta-de-vinos", label: "Software de carta de vinos", description: "Plataforma completa para digitalizar y rentabilizar tu carta.", type: "solution" as const },
  funcionalidades: { to: "/funcionalidades", label: "Todas las funcionalidades", description: "11 categorías de funcionalidades especializadas en vino.", type: "solution" as const },
  ia: { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", description: "IA táctica para carta de vinos: pricing, rotación y recomendaciones.", type: "solution" as const },
  gruposPage: { to: "/soluciones/grupos-restauracion", label: "Soluciones para grupos", description: "Gestión centralizada del vino para grupos multi-local.", type: "solution" as const },
  ticketMedio: { to: "/soluciones/aumentar-ticket-medio-restaurante", label: "Aumentar ticket medio", description: "Estrategias basadas en datos para vender más vino por mesa.", type: "solution" as const },
  demo: { to: "/demo", label: "Solicitar demo gratuita", description: "Demo personalizada con tu carta real. Sin compromiso.", type: "solution" as const },
  precios: { to: "/precios", label: "Planes y precios", description: "Consulta los planes de Winerim y elige el que mejor te encaje.", type: "solution" as const },
};

export const RESOURCES = {
  plantillaCarta: { to: "/recursos/plantilla-carta-de-vinos", label: "Plantilla de carta de vinos", description: "Descarga una plantilla profesional para diseñar tu carta.", type: "resource" as const },
  checklistRentable: { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", description: "Revisa punto por punto si tu carta está optimizada.", type: "resource" as const },
  wineMapping: { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", description: "Estructura precios y distribución de vinos.", type: "resource" as const },
  scorecard: { to: "/recursos/scorecard-rendimiento-carta", label: "Scorecard mensual de carta", description: "KPIs esenciales: ventas, rotación, margen y copa.", type: "resource" as const },
  revisionMensual: { to: "/recursos/plantilla-revision-mensual-carta", label: "Plantilla revisión mensual", description: "Proceso estructurado para revisar tu carta cada mes.", type: "resource" as const },
};

export const ARTICLES = {
  softwareCarta: { to: "/article/mejor-software-carta-vinos-restaurante", label: "Mejor software de carta de vinos", description: "Comparativa editorial de las opciones de software en 2025.", type: "article" as const },
  ticketMedioDatos: { to: "/article/como-mejorar-ticket-medio-vino-con-datos", label: "Mejorar ticket medio con datos", description: "Estrategias data-driven para aumentar la facturación en vino.", type: "article" as const },
  erroresPrecios: { to: "/article/errores-fijar-precios-vino-restaurante", label: "Errores al fijar precios del vino", description: "Los 7 errores más frecuentes de pricing en restauración.", type: "article" as const },
  cartaDescompensada: { to: "/article/como-saber-si-carta-vinos-esta-descompensada", label: "¿Tu carta está descompensada?", description: "Diagnóstico rápido para detectar desequilibrios en tu carta.", type: "article" as const },
  cartaLarga: { to: "/article/cuando-carta-vinos-es-demasiado-larga", label: "¿Tu carta es demasiado larga?", description: "Señales de exceso de referencias y cómo reducir sin perder.", type: "article" as const },
};

export const BENCHMARKS = {
  index: { to: "/benchmarks-playbooks", label: "Benchmarks & Playbooks", description: "Datos de referencia y planes de acción para tu carta.", type: "benchmark" as const },
};

export const OTHER = {
  comparativas: { to: "/comparativas", label: "Comparativas Winerim vs alternativas", description: "Comparativas claras para decidir qué solución encaja.", type: "solution" as const },
  casosExito: { to: "/casos-exito", label: "Casos de éxito reales", description: "Cómo restaurantes reales usan Winerim y qué resultados obtienen.", type: "solution" as const },
  problemas: { to: "/problemas", label: "Diagnóstico de problemas comunes", description: "29 problemas que frenan las ventas de vino en restaurantes.", type: "guide" as const },
  blog: { to: "/blog", label: "Blog de Winerim", description: "Artículos y análisis sobre gestión de vinos en restauración.", type: "article" as const },
};


/* ─── Pre-built step sets for common flows ─── */

/** problema → guía → herramienta → recurso → demo */
export const flowProblemaToDemo: NextStep[] = [
  GUIDES.venderMas,
  TOOLS.analyzer,
  RESOURCES.checklistRentable,
  SOLUTIONS.demo,
];

/** blog MOFU → BOFU → demo */
export const flowBlogToConversion: NextStep[] = [
  ARTICLES.softwareCarta,
  ARTICLES.ticketMedioDatos,
  OTHER.comparativas,
  SOLUTIONS.demo,
];

/** funcionalidad → caso → recurso → demo */
export const flowFeatureToDemo: NextStep[] = [
  OTHER.casosExito,
  RESOURCES.scorecard,
  BENCHMARKS.index,
  SOLUTIONS.demo,
];

/** herramienta → guía → recurso → demo */
export const flowToolToDemo: NextStep[] = [
  GUIDES.rentable,
  RESOURCES.wineMapping,
  OTHER.casosExito,
  SOLUTIONS.demo,
];
