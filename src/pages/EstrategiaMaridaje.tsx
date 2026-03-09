import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-crear-una-estrategia-de-maridaje-en-restauracion",
  metaTitle: "Cómo Crear una Estrategia de Maridaje en Restauración | Guía",
  metaDescription: "Guía práctica para diseñar maridajes que aumenten ventas de vino: selección por plato, presentación en carta, maridaje por copa e impacto en ticket medio.",
  heroTitle: "Cómo crear una estrategia de maridaje en restauración",
  heroSubtitle: "El maridaje bien ejecutado es una de las herramientas más efectivas para vender más vino. Aprende a diseñar una estrategia que conecte tu menú con tu carta de vinos.",
  heroBadge: "Guía estratégica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Solicitar demo",
  ctaPrimaryUrl: "/demo",
  ctaSecondaryText: "Analiza tu carta",
  ctaSecondaryUrl: "/analisis-carta",
  ctaFinalTitle: "Descubre cómo Winerim crea maridajes automáticamente",
  ctaFinalDescription: "Winerim analiza tu menú y tu carta de vinos para generar maridajes inteligentes que aumentan las ventas sin depender de un sommelier en cada mesa.",
  tableOfContents: [
    "Qué es el maridaje estratégico",
    "Cómo elegir vinos para cada plato",
    "Cómo presentar los maridajes en la carta",
    "Maridaje por copa: la gran oportunidad",
    "Impacto real en el ticket medio",
    "Cómo lo automatiza Winerim",
  ],
  sections: [
    {
      heading: "1. Qué es el maridaje estratégico",
      content: "El maridaje tradicional se enfoca en la armonía gastronómica: qué vino sabe mejor con qué plato. Eso está bien, pero es solo la mitad de la ecuación.\n\nEl maridaje estratégico añade una capa comercial: no solo busca el mejor vino para cada plato, sino el que mejor equilibrio ofrece entre experiencia del cliente y rentabilidad para el restaurante.\n\nNo se trata de recomendar el vino más caro. Se trata de recomendar el vino que el comensal va a disfrutar más y que, al mismo tiempo, genera un margen saludable.",
      tips: [
        "Un maridaje bien pensado convierte la carta de vinos en una extensión del menú, no en un documento separado",
        "El objetivo no es que el comensal sepa de maridaje — es que elija vino con confianza",
        "El maridaje elimina la parálisis de decisión: el cliente ya sabe qué pedir",
        "Los restaurantes con maridajes integrados venden entre un 25% y un 40% más de vino",
      ],
      icon: "lightbulb",
    },
    {
      heading: "2. Cómo elegir vinos para cada plato",
      content: "Elegir el vino adecuado para cada plato no requiere ser sommelier. Requiere entender tres principios básicos: intensidad, textura y complemento.\n\nIntensidad: el vino debe tener la misma fuerza que el plato. Un blanco ligero con un estofado potente se pierde. Un tinto robusto con un ceviche lo aplasta.\n\nTextura: platos cremosos piden vinos con cuerpo. Platos crujientes o frescos piden vinos con acidez.\n\nComplemento o contraste: puedes buscar que el vino refuerce los sabores del plato (complemento) o que los equilibre (contraste). Ambas estrategias funcionan.",
      tips: [
        "Platos con grasa o queso → vinos con acidez alta que limpien el paladar",
        "Pescados y mariscos → blancos con mineralidad, no necesariamente siempre Albariño",
        "Carnes rojas a la brasa → tintos con estructura y taninos moderados a altos",
        "Postres → vinos dulces o espumosos semisecos, nunca un tinto seco",
        "Cocina especiada (asiática, mexicana) → blancos aromáticos o tintos ligeros con fruta",
        "Ensaladas y verduras → blancos frescos, rosados o incluso espumosos",
      ],
      icon: "list",
    },
    {
      heading: "3. Cómo presentar los maridajes en la carta",
      content: "El mejor maridaje del mundo no sirve de nada si el cliente no lo ve. La presentación es tan importante como la selección.\n\nHay tres niveles de integración del maridaje en la experiencia del restaurante, de menor a mayor impacto.",
      tips: [
        "Nivel 1 — Sugerencia en la carta de vinos: cada sección indica qué tipo de platos acompaña. Ej: 'Blancos frescos — ideales con pescados, mariscos y ensaladas'",
        "Nivel 2 — Sugerencia en el menú: cada plato principal tiene 1-2 vinos sugeridos con nombre y precio. El cliente ve el maridaje mientras elige la comida",
        "Nivel 3 — Menú de maridaje: ofrecer un menú degustación con opción de maridaje por copas como upgrade. Esto puede aumentar el ticket entre 15€ y 30€ por comensal",
        "La clave es que el maridaje esté visible sin que el cliente tenga que buscarlo ni pedirlo",
        "Usa frases simples: 'Va perfecto con...' funciona mejor que explicaciones enológicas",
      ],
      icon: "check",
    },
    {
      heading: "4. Maridaje por copa: la gran oportunidad",
      content: "El maridaje por copa es donde convergen dos de las tendencias más potentes en restauración: el vino por copa y la personalización de la experiencia.\n\nPermite al comensal probar un vino diferente con cada plato sin comprometerse con una botella completa. Esto es especialmente valioso en menús degustación, mesas de dos personas o comensales que quieren explorar.",
      tips: [
        "Ofrece un 'recorrido de copas' alineado con tu menú degustación: 3-4 copas que acompañan cada plato",
        "El precio del recorrido de copas debería estar entre 20€ y 40€ según el nivel del restaurante",
        "Incluye al menos un vino sorprendente en el recorrido: una copa que el comensal no habría pedido solo",
        "El maridaje por copa permite usar vinos premium que el cliente no compraría en botella",
        "Rota el recorrido de copas cada 3-4 semanas para mantener la novedad",
        "Forma al personal para sugerir el maridaje por copas como upgrade natural al presentar el menú",
      ],
      icon: "lightbulb",
    },
    {
      heading: "5. Impacto real en el ticket medio",
      content: "Los números hablan por sí solos. El maridaje bien ejecutado tiene un impacto directo y medible en la facturación.\n\nUn restaurante con ticket medio de 45€ por comensal donde solo el 30% de las mesas pide vino está dejando dinero en la mesa. Con una estrategia de maridaje, ese porcentaje puede subir al 50-60%.",
      tips: [
        "Restaurantes con maridajes integrados en menú: +25-40% en ventas de vino",
        "Menú degustación con opción de maridaje por copas: +15-30€ de ticket por comensal",
        "Sugerencias de maridaje en la carta: +15-20% en valor medio del vino pedido",
        "El comensal que recibe una sugerencia de maridaje pide vinos de mayor valor que el que elige solo",
        "El maridaje reduce la tasa de mesas que no piden vino: de 50-70% a 30-40%",
      ],
      icon: "check",
    },
    {
      heading: "6. Cómo lo automatiza Winerim",
      content: "Diseñar maridajes manualmente es posible, pero no escala. Cada vez que cambia un plato del menú o una referencia de la carta, los maridajes deben actualizarse.\n\nWinerim automatiza este proceso analizando los perfiles de tus platos y tus vinos para generar maridajes inteligentes en tiempo real.",
      tips: [
        "Maridajes automáticos: el sistema cruza el perfil sensorial de cada plato con cada vino de tu carta",
        "Actualización en tiempo real: si cambia el menú o la carta, los maridajes se recalculan",
        "Personalización por comensal: el recomendador sugiere maridajes basándose en las preferencias del cliente",
        "Visibilidad en carta digital: los maridajes aparecen automáticamente junto a cada plato",
        "Sin dependencia del sommelier: el sistema funciona 24/7 en cada mesa",
      ],
      icon: "check",
    },
  ],
  faqs: [
    {
      q: "¿Necesito un sommelier para diseñar maridajes?",
      a: "No necesariamente. Con los principios básicos de intensidad, textura y complemento puedes crear maridajes efectivos. Herramientas como Winerim automatizan el proceso cruzando perfiles de platos y vinos sin necesidad de conocimiento enológico avanzado.",
    },
    {
      q: "¿Cuántos maridajes debería ofrecer por plato?",
      a: "Lo ideal es 1-2 sugerencias por plato principal. Más de 2 genera confusión. Si ofreces un menú degustación, diseña un recorrido de copas completo con 3-5 vinos.",
    },
    {
      q: "¿El maridaje funciona en restaurantes casuales?",
      a: "Absolutamente. No necesitas un restaurante fine dining para integrar maridajes. Una simple sugerencia en el menú ('Este plato va genial con nuestro Verdejo por copa') ya marca diferencia en las ventas.",
    },
    {
      q: "¿Cuánto puede aumentar el ticket medio con maridajes?",
      a: "Depende del tipo de restaurante, pero los datos que vemos son consistentes: entre un 15% y un 30% de aumento en el ticket medio en vino cuando se implementan maridajes de forma visible y proactiva.",
    },
  ],
  relatedTools: [
    { label: "Generador de maridajes", url: "/wine-pairing-generator" },
    { label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
    { label: "Analizador de carta de vinos", url: "/analisis-carta" },
  ],
  relatedGuides: [
    { label: "Cómo hacer una carta de vinos", url: "/como-hacer-una-carta-de-vinos" },
    { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
    { label: "Vino por copa en restaurante", url: "/vino-por-copa-restaurante" },
    { label: "Cómo mejorar la rotación de vinos", url: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante" },
  ],
};

const EstrategiaMaridaje = () => <GuideTemplate data={data} />;

export default EstrategiaMaridaje;
