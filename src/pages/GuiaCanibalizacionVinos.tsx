import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-detectar-canibalizacion-vinos-carta",
  metaTitle: "Cómo Detectar Canibalización entre Vinos de la Carta | Winerim",
  metaDescription: "Guía para identificar y resolver la canibalización entre referencias de tu carta de vinos: diagnóstico, metodología, decisiones y framework de optimización.",
  heroTitle: "Cómo detectar canibalización entre vinos de la carta",
  heroSubtitle: "Si tienes 3 Ribera del Duero crianza en el mismo rango de precio, no están compitiendo con la competencia. Están compitiendo entre sí. La canibalización es el problema invisible que más cartas tienen y menos restaurantes diagnostican.",
  heroBadge: "Guía analítica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "Qué es la canibalización y por qué importa",
    "Señales de que tu carta tiene canibalización",
    "Metodología de diagnóstico paso a paso",
    "Cómo decidir qué referencia queda y cuál sale",
    "Casos típicos de canibalización",
    "Checklist anti-canibalización",
  ],
  sections: [
    {
      heading: "Qué es la canibalización y por qué importa",
      content: "La canibalización ocurre cuando dos o más vinos de tu carta compiten por el mismo cliente, en el mismo momento, sin ofrecer una diferenciación clara. El resultado: las ventas se reparten entre referencias similares en lugar de concentrarse, ninguna rota lo suficiente, y el stock se multiplica innecesariamente.\n\nLa canibalización no es tener vinos parecidos. Es tener vinos parecidos sin una razón estratégica para ello.\n\nImpacto directo:\n• Stock inmovilizado en referencias redundantes.\n• Menor rotación media de cada referencia afectada.\n• Mayor riesgo de vinos muertos.\n• El equipo de sala no sabe cuál recomendar (si son tan parecidos, ¿cuál es mejor?).\n• El comensal se paraliza ante opciones que no puede diferenciar.",
      tips: [
        "Dos Verdejo Rueda a 16€ y 18€ no es diversidad: es confusión. El cliente elegirá el de 16€ casi siempre.",
        "La canibalización cuesta dinero real: capital inmovilizado en stock redundante y oportunidades de venta perdidas en vinos que podrían ocupar ese hueco.",
        "Un restaurante medio tiene entre un 15% y un 25% de redundancia en su carta sin saberlo.",
      ],
      icon: "alert",
    },
    {
      heading: "Señales de que tu carta tiene canibalización",
      content: "Antes de hacer un análisis formal, busca estas señales rápidas que indican canibalización probable.",
      tips: [
        "Dos o más vinos del mismo estilo, región y rango de precio (±20% de PVP). Es la señal más clara.",
        "Una referencia vende mucho y otra similar apenas se mueve. La primera está 'robando' ventas a la segunda.",
        "El equipo de sala siempre recomienda el mismo vino cuando hay 2-3 opciones similares. Las otras son invisibles.",
        "Tienes stock acumulado de un vino que 'debería venderse' dado su perfil y precio. Probablemente otro vino similar lo está canibalizando.",
        "Al preguntar al equipo la diferencia entre dos vinos, no saben explicarla. Si ellos no la ven, el cliente tampoco.",
      ],
      icon: "alert",
    },
    {
      heading: "Metodología de diagnóstico paso a paso",
      content: "Para detectar canibalización de forma sistemática, sigue estos 4 pasos.",
      tips: [
        "Paso 1 — Agrupa por perfil: clasifica todos tus vinos por tipo (blanco, tinto, rosado), estilo (joven, crianza, reserva), región y tramo de precio. Usa una hoja de cálculo o Winerim.",
        "Paso 2 — Busca clusters: identifica grupos donde haya 2+ vinos con el mismo tipo + estilo + rango de precio (±20%). Esos son tus clusters de riesgo.",
        "Paso 3 — Compara rendimiento dentro del cluster: para cada cluster, mira cuál vende más, cuál tiene mejor margen y cuál rota peor. El vino con peor rendimiento es candidato a salir.",
        "Paso 4 — Valida con el equipo: pregunta al equipo de sala si pueden explicar la diferencia entre los vinos del cluster. Si no pueden, la canibalización está confirmada.",
      ],
      icon: "list",
    },
    {
      heading: "Cómo decidir qué referencia queda y cuál sale",
      content: "Cuando confirmas canibalización, necesitas decidir qué vino mantener. No es solo cuestión de ventas. Usa estos 5 criterios ponderados.\n\n1. Rendimiento comercial (30%): ventas en unidades y en euros. El que más vende tiene inercia a su favor.\n2. Margen bruto (25%): el que genera más beneficio absoluto por botella.\n3. Diferenciación (20%): el que aporta algo que ningún otro vino de tu carta ofrece.\n4. Disponibilidad (15%): el que puedes reponer con facilidad y consistencia.\n5. Narrativa (10%): el que tiene mejor historia para contar en sala (productor, proceso, territorio).\n\nPuntúa cada vino del cluster del 1 al 5 en cada criterio. El de menor puntuación sale de carta.",
      tips: [
        "No elimines siempre el que vende menos. A veces el que vende menos tiene mejor margen o más potencial con recomendación activa.",
        "Si dos vinos puntúan igual, quédate con el que tiene mejor historia para sala. La narrativa vende.",
        "Al sacar un vino de carta, no lo tires. Liquídalo en eventos, menús degustación o como copa especial.",
      ],
      icon: "check",
    },
    {
      heading: "Casos típicos de canibalización",
      content: "Estos son los patrones de canibalización que más vemos en restaurantes reales.",
      tips: [
        "Ribera vs Ribera: 3 Ribera del Duero crianza entre 22€ y 28€. Solución: deja 1 Ribera en ese rango e introduce un Toro o Bierzo como alternativa con personalidad diferente.",
        "Verdejo vs Verdejo: 2 Rueda Verdejo entre 14€ y 17€. Solución: mantén 1 y añade un Godello o Albariño para diversificar estilos de blanco.",
        "Copa vs copa: 2 tintos jóvenes por copa a 4€ y 4,50€. Solución: deja 1 tinto joven y convierte el otro hueco en una copa de perfil diferente (un rosado, un blanco con cuerpo).",
        "Entrada vs entrada: 3 vinos entre 12€ y 15€ que compiten como 'el barato'. Solución: deja 2 máximo (1 blanco, 1 tinto) y sube el tercero de rango o sustitúyelo.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Checklist anti-canibalización",
      content: "Antes de cerrar tu carta (o al revisarla cada mes), pasa este checklist.",
      tips: [
        "✓ No hay más de 2 vinos del mismo tipo + estilo + región en el mismo tramo de precio (±20%).",
        "✓ El equipo de sala puede explicar la diferencia entre cada par de vinos similares en 15 segundos.",
        "✓ Cada referencia tiene una 'razón de carta': por qué está ahí y qué aporta que no aporte otra.",
        "✓ Ningún cluster de riesgo tiene una referencia con menos de 3 ventas mensuales.",
        "✓ Al incorporar una referencia nueva, verificas que no canibaliza una existente.",
        "✓ Cada tramo de precio tiene diversidad de estilos, no repetición del mismo perfil.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Tener 2 vinos parecidos siempre es malo?", a: "No siempre. Si tu restaurante es fine dining con clientela experta, puede tener sentido ofrecer 2 Ribera de productores distintos. Pero en restaurantes con carta de 20-40 referencias, la redundancia suele ser un problema." },
    { q: "¿Cómo detecto canibalización entre copa y botella?", a: "Si el mismo vino está disponible en copa y botella, no es canibalización (es complementario). El problema es cuando tienes 2 tintos jóvenes por copa que se reparten las ventas." },
    { q: "¿Cada cuánto debo revisar la canibalización?", a: "En cada revisión mensual de carta. Es un check rápido: mira tus clusters de riesgo y verifica que no hay referencias redundantes sin rendimiento." },
    { q: "¿Winerim detecta la canibalización automáticamente?", a: "Sí. Winerim identifica clusters de vinos similares en tu carta y te alerta cuando detecta patrones de canibalización basados en rendimiento real." },
  ],
  relatedTools: [
    { label: "Analizador de carta", url: "/analisis-carta" },
    { label: "Calculadora de stock muerto", url: "/herramientas/calculadora-stock-muerto" },
  ],
  relatedGuides: [
    { label: "Detectar vinos muertos", url: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad" },
    { label: "Decidir surtido según ticket medio", url: "/guias/como-decidir-surtido-segun-ticket-medio-tipo-local" },
    { label: "Mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
  ],
  ctaPrimaryText: "Analizar mi carta",
  ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo",
  ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "Winerim detecta canibalización antes de que te cueste dinero",
  ctaFinalDescription: "Análisis automático de clusters, alertas de redundancia y recomendaciones de sustitución basadas en rendimiento real.",
};

const GuiaCanibalizacionVinos = () => <GuideTemplate data={data} />;
export default GuiaCanibalizacionVinos;
