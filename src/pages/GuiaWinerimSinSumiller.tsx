import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-usar-winerim-sin-sumiller",
  metaTitle: "Cómo Usar Winerim Cuando No Hay Sumiller en Sala | Winerim",
  metaDescription: "Guía para restaurantes sin sumiller: cómo Winerim suple la falta de expertise en vino con recomendaciones automáticas, formación integrada y carta inteligente.",
  heroTitle: "Cómo usar Winerim cuando no hay sumiller en sala",
  heroSubtitle: "El 85% de los restaurantes en España no tienen sumiller. Pero eso no significa que no puedan vender vino con criterio. Winerim actúa como tu sumiller digital: recomienda, educa al equipo y optimiza la carta sin necesidad de un experto en plantilla.",
  heroBadge: "Guía de producto",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  tableOfContents: [
    "El problema real: no es el vino, es la recomendación",
    "Qué tareas de sumiller cubre Winerim",
    "Cómo funciona la recomendación automática",
    "Formación integrada para el equipo de sala",
    "De la carta pasiva a la carta activa",
    "Checklist: lo que necesitas para empezar",
  ],
  sections: [
    {
      heading: "El problema real: no es el vino, es la recomendación",
      content: "La mayoría de restaurantes sin sumiller no tienen un problema de producto. Tienen buenos vinos en carta. El problema es que nadie sabe recomendar esos vinos.\n\nSin recomendación activa, el comensal elige por precio (el más barato), por familiaridad (el que ya conoce) o por inercia (el de la casa). El resultado: ventas concentradas en 3-4 referencias, ticket medio bajo y vinos excelentes que no rotan.\n\nEl sumiller tradicional resuelve esto con conocimiento, carisma y presencia. Pero contratar un sumiller cualificado cuesta entre 28.000€ y 45.000€/año, algo inviable para la mayoría de locales.",
      tips: [
        "En restaurantes sin sumiller, el 60-70% de las ventas de vino se concentran en menos del 20% de las referencias.",
        "El camarero medio conoce 3-5 vinos de su carta. Si la carta tiene 40 referencias, el 85% es invisible para el cliente.",
        "El problema no es formación (que es temporal), sino un sistema que asista en tiempo real.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Qué tareas de sumiller cubre Winerim",
      content: "Winerim no sustituye al sumiller como figura de sala. Sustituye las tareas operativas y analíticas que el sumiller hace entre bastidores.\n\nTareas que Winerim automatiza:\n• Selección de carta: análisis de rendimiento, rotación y márgenes para decidir qué entra y qué sale.\n• Recomendación contextual: sugerencias de maridaje automáticas según plato, perfil de cliente y stock disponible.\n• Pricing: cálculo de PVP óptimo por referencia basado en coste, competencia y elasticidad.\n• Formación: fichas de producto accesibles para que el equipo pueda hablar de cada vino con confianza.\n• Análisis: dashboard con KPIs de ventas, rotación, margen y copa vs botella.\n\nTareas que siguen siendo humanas:\n• La interacción personal con el comensal.\n• La lectura de la mesa (presupuesto, ocasión, preferencias).\n• El momento de descorchar y servir.",
      tips: [
        "El equipo de sala no necesita saber de vino. Necesita saber contar una historia de 15 segundos sobre cada copa.",
        "Las fichas de producto de Winerim incluyen la descripción, el maridaje ideal y la frase de venta recomendada.",
        "Con Winerim, un camarero nuevo puede recomendar vino con criterio desde su primera semana.",
      ],
      icon: "check",
    },
    {
      heading: "Cómo funciona la recomendación automática",
      content: "Winerim utiliza inteligencia artificial para generar recomendaciones de vino contextuales. No es un listado genérico: cada sugerencia tiene en cuenta el plato, el perfil del restaurante, las preferencias del comensal y el stock disponible.\n\nFlujo de recomendación:\n1. El comensal elige un plato (o perfil de comida).\n2. Winerim sugiere 2-3 vinos que maridan bien, priorizando los de mejor relación calidad-margen-stock.\n3. El camarero presenta la recomendación con la frase de venta sugerida.\n4. Si el comensal pide más detalle, la ficha digital tiene toda la información.\n\nLa carta digital de Winerim actúa como un segundo vendedor silencioso: el comensal puede explorar, filtrar por estilo, ver maridajes y descubrir vinos que de otra forma nunca habría pedido.",
      tips: [
        "Las recomendaciones priorizan vinos con buen margen Y buen stock. No te recomendará un vino del que te quedan 2 botellas.",
        "El algoritmo aprende del comportamiento real de tu restaurante: qué se vende, qué se pide tras ver la recomendación, qué se descarta.",
        "Los restaurantes con recomendación activa (humana o digital) venden un 20-30% más de vino por mesa.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Formación integrada para el equipo de sala",
      content: "Winerim incluye un sistema de formación continua diseñado para equipos sin background en vino. No es un curso teórico: es formación operativa aplicada a tu carta.\n\nQué incluye:\n• Ficha de producto para cada referencia: origen, estilo, notas, maridaje, frase de venta.\n• Quiz rápidos semanales (5 min) para reforzar conocimiento.\n• Alertas de 'vino de la semana' para que el equipo practique la recomendación de una referencia nueva.\n• Historial de qué vinos recomienda cada miembro del equipo y con qué resultado.\n\nEl objetivo no es convertir a tu equipo en sumilleres. Es darles la confianza y las herramientas para decir: 'Con este plato te recomiendo este tinto, es de Ribera, con cuerpo pero muy equilibrado. ¿Te sirvo una copa?'",
      tips: [
        "15 minutos al día durante 5 días es suficiente para que un camarero nuevo se sienta cómodo recomendando 4-5 vinos.",
        "La frase de venta recomendada es el recurso más valorado por los equipos de sala. Les quita el miedo a recomendar.",
        "Gamifica: premia al miembro del equipo que más copas venda de la referencia destacada de la semana.",
      ],
      icon: "check",
    },
    {
      heading: "De la carta pasiva a la carta activa",
      content: "Una carta tradicional (PDF, papel, pizarra) es pasiva: el comensal la lee, se pierde y elige lo seguro. Una carta inteligente es activa: guía, sugiere, educa y convierte.\n\nDiferencias clave:\n\nCarta pasiva: lista de vinos ordenados por tipo/región. El comensal busca solo. Sin contexto ni ayuda.\n\nCarta activa (Winerim): filtros por estilo, maridaje sugerido por plato, descripciones accesibles, etiquetas de 'recomendado' y 'nuevo', fotos de etiquetas, y un diseño que invita a explorar.\n\nEl resultado: más vinos descubiertos, mejor distribución de ventas entre referencias, y un ticket medio superior porque el comensal se atreve a probar.",
      tips: [
        "Los restaurantes que migran de carta pasiva a activa ven un aumento medio del 18% en ventas de vino en los primeros 3 meses.",
        "La etiqueta 'recomendado por el chef' multiplica por 3 la probabilidad de que un vino sea pedido.",
        "Una carta con filtros por precio elimina la vergüenza de preguntar 'qué hay barato'. El cliente filtra en silencio.",
      ],
      icon: "lightbulb",
    },
    {
      heading: "Checklist: lo que necesitas para empezar",
      content: "Si no tienes sumiller y quieres empezar a vender más vino con Winerim, sigue estos pasos.",
      tips: [
        "Paso 1: Sube tu carta actual a Winerim. En 24h tendrás un análisis de rendimiento, pricing y oportunidades.",
        "Paso 2: Activa la carta digital y comparte el enlace/QR con tus mesas.",
        "Paso 3: Comparte las fichas de producto con tu equipo. 15 min de briefing el primer día es suficiente.",
        "Paso 4: Designa una 'copa de la semana' y pide al equipo que la recomiende activamente.",
        "Paso 5: Revisa el dashboard semanal de Winerim: qué se vende, qué no rota, qué margen estás generando.",
        "Paso 6: Ajusta. Cada semana, toma una decisión basada en datos: cambiar una copa, subir un precio, destacar un vino.",
      ],
      icon: "list",
    },
  ],
  faqs: [
    { q: "¿Winerim sustituye la figura del sumiller?", a: "No sustituye la interacción humana en sala, pero sí automatiza las tareas analíticas y operativas que un sumiller haría: selección, pricing, rotación, formación y recomendación." },
    { q: "¿Mi equipo necesita saber de vino para usar Winerim?", a: "No. Las fichas de producto y las frases de venta recomendadas permiten que cualquier miembro del equipo recomiende vino con confianza desde el primer día." },
    { q: "¿Funciona para restaurantes con pocas referencias?", a: "Sí. De hecho, los restaurantes con 15-30 referencias son los que más se benefician, porque cada vino tiene que rendir al máximo." },
    { q: "¿Cuánto cuesta Winerim comparado con un sumiller?", a: "Winerim cuesta una fracción de un salario de sumiller y está disponible 24/7. Consulta nuestros planes en la página de precios." },
  ],
  relatedTools: [
    { label: "Analizador de carta", url: "/analisis-carta" },
    { label: "Generador de maridajes", url: "/wine-pairing-generator" },
  ],
  relatedGuides: [
    { label: "Formar al equipo de sala en vino", url: "/guias/como-formar-equipo-sala-para-vender-vino" },
    { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
    { label: "Vino por copa sin perder margen", url: "/guias/como-implantar-vino-por-copa-sin-perder-margen" },
  ],
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analizar mi carta gratis",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Vende más vino sin sumiller. Empieza con Winerim.",
  ctaFinalDescription: "Recomendaciones automáticas, formación integrada y analítica en tiempo real. Todo lo que necesitas para que tu equipo venda vino con criterio.",
};

const GuiaWinerimSinSumiller = () => <GuideTemplate data={data} />;
export default GuiaWinerimSinSumiller;
