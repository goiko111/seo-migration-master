import GuideTemplate from "@/components/templates/GuideTemplate";
import type { GuidePageData } from "@/components/templates/GuideTemplate";

const data: GuidePageData = {
  slug: "guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante",
  metaTitle: "Cómo Mejorar la Rotación de Vinos en un Restaurante | Guía",
  metaDescription: "Guía práctica para mejorar la rotación de vinos en tu restaurante: selección, posicionamiento en carta, vino por copa y uso de datos para eliminar stock muerto.",
  heroTitle: "Cómo mejorar la rotación de vinos en un restaurante",
  heroSubtitle: "La rotación de vinos es uno de los indicadores más importantes de rentabilidad. Descubre cómo evitar que tus vinos se queden inmovilizados en bodega.",
  heroBadge: "Guía práctica",
  breadcrumbParent: { label: "Guías", href: "/guias-y-recursos" },
  ctaPrimaryText: "Analizar mi carta",
  ctaPrimaryUrl: "/analisis-carta",
  ctaSecondaryText: "Solicitar demo",
  ctaSecondaryUrl: "/demo",
  ctaFinalTitle: "No dejes que tu bodega acumule stock muerto",
  ctaFinalDescription: "Winerim te da los datos para saber qué vinos rotan, cuáles sobran y cómo optimizar tu selección para maximizar la rentabilidad.",
  tableOfContents: [
    "Por qué la rotación es clave para la rentabilidad",
    "Problemas comunes que frenan la rotación",
    "Estrategias para mejorar la rotación",
    "Cómo usar datos para tomar decisiones",
    "Cómo ayuda Winerim",
  ],
  sections: [
    {
      heading: "1. Por qué la rotación de vinos es clave para la rentabilidad",
      content: "Cada botella en tu bodega es dinero inmovilizado. Si un vino no se vende en 60-90 días, no solo ocupa espacio — está destruyendo valor.\n\nLa rotación de vinos mide cuántas veces se renueva el stock de cada referencia al año. Un restaurante con buena rotación vende y repone sus vinos 8-12 veces al año. Uno con mala rotación, 3-4 veces.\n\nLa diferencia en rentabilidad es enorme. Con la misma inversión en stock, el restaurante que rota bien genera el doble o triple de ingresos en vino.",
      tips: [
        "Un vino que no se vende en 90 días debería salir de la carta sin excepción",
        "El capital inmovilizado en vinos sin rotación podría invertirse en referencias que sí se venden",
        "Los vinos que se deterioran en bodega generan pérdidas directas, no solo coste de oportunidad",
        "La rotación media ideal es de 8-12 veces al año para la mayoría de referencias",
      ],
      icon: "alert",
    },
    {
      heading: "2. Demasiadas referencias",
      content: "El primer enemigo de la rotación es el exceso de referencias. Cuantos más vinos tienes, más difícil es que cada uno se venda regularmente.\n\nUna carta con 180 referencias donde solo 60 se venden mensualmente significa 120 vinos acumulando polvo. Es el patrón más común que vemos en restaurantes con problemas de rotación.",
      tips: [
        "Revisa cuántas referencias tienes vs cuántas se venden realmente cada mes",
        "Aplica la regla del 80/20: el 80% de tus ventas viene del 20% de tus referencias",
        "Reduce a 50-80 referencias bien seleccionadas en restaurantes medios",
        "Cada vino debe cumplir una función clara: entrada, volumen, premium o descubrimiento",
      ],
      icon: "list",
    },
    {
      heading: "3. Vinos mal posicionados en la carta",
      content: "Muchos vinos no se venden porque el cliente no los encuentra o no los entiende. El posicionamiento en la carta es tan importante como la selección.\n\nUn gran vino escondido en la página 3, dentro de una categoría confusa y sin descripción, es un vino invisible. Un vino mediocre en la primera sección, destacado como recomendación del sommelier, se vende mucho más.",
      tips: [
        "Los vinos que quieres vender deben estar en las posiciones de mayor visibilidad",
        "Las primeras y últimas posiciones de cada sección son las más consultadas",
        "Usa badges de 'Recomendado' o 'Selección del chef' para dirigir la atención",
        "Incluye notas de cata breves que ayuden al cliente a decidir sin depender del camarero",
      ],
      icon: "lightbulb",
    },
    {
      heading: "4. Falta de recomendación activa",
      content: "Si el personal de sala no recomienda vino, las referencias menos conocidas simplemente no se venden. Los comensales eligen lo que conocen o lo más barato.\n\nLa recomendación activa es el motor de la rotación. Cuando un camarero sugiere un vino con convicción, la probabilidad de venta se multiplica.",
      tips: [
        "Forma al personal para que conozca 3-5 vinos y pueda recomendarlos con una frase clara",
        "Implementa un 'vino de la semana' que todo el equipo haya probado",
        "Vincula las recomendaciones a los platos del menú para que la sugerencia sea natural",
        "Si no puedes formar al equipo, usa herramientas digitales que recomienden por ti",
      ],
      icon: "check",
    },
    {
      heading: "5. Estrategias para mejorar la rotación",
      content: "Mejorar la rotación requiere actuar en tres frentes simultáneamente: selección, posicionamiento y promoción.\n\nNo basta con quitar vinos que no se venden. Hay que crear las condiciones para que los que están se vendan mejor y más rápido.",
      tips: [
        "Selección: elige vinos que encajen con tu cocina, tu público y tu ticket medio",
        "Posicionamiento: coloca los vinos de alta rotación en posiciones privilegiadas de la carta",
        "Vino por copa: es la herramienta más potente para rotar referencias. Incluye 6-8 opciones que cambien cada 2-4 semanas",
        "Estacionalidad: adapta la carta a la temporada. Blancos frescos en verano, tintos potentes en invierno",
        "Promociones inteligentes: un vino que no rota puede venderse como maridaje recomendado o como copa del día",
      ],
      icon: "check",
    },
    {
      heading: "6. Cómo usar datos para tomar decisiones",
      content: "La diferencia entre un restaurante que mejora su rotación y uno que no es una: datos.\n\nSin datos, las decisiones se basan en intuición. Con datos, puedes identificar exactamente qué funciona y qué no, y tomar acciones correctivas antes de que el stock se acumule.",
      tips: [
        "Mide la rotación de cada referencia mensualmente: unidades vendidas / stock medio",
        "Identifica los vinos con más de 60 días sin venta y decide si sustituirlos o promocionarlos",
        "Analiza qué franja de precio tiene mejor rotación y refuerza esa zona",
        "Compara la rotación entre categorías: si los blancos rotan más que los tintos, quizás tienes demasiados tintos",
        "Establece alertas automáticas para vinos que lleven 30+ días sin venderse",
      ],
      icon: "lightbulb",
    },
    {
      heading: "7. Cómo ayuda Winerim",
      content: "Winerim está diseñado para resolver exactamente este problema. La plataforma te da visibilidad completa sobre la rotación de tu carta y herramientas para actuar.\n\nNo se trata de más informes. Se trata de recomendaciones accionables que puedes implementar en minutos.",
      tips: [
        "Dashboard de rotación: visualiza qué vinos se venden, cuáles no y desde cuándo",
        "Alertas de stock muerto: notificaciones automáticas cuando un vino lleva demasiado tiempo sin venderse",
        "Recomendador inteligente: el sistema recomienda vinos infravendidos a los comensales adecuados",
        "Maridajes automáticos: vincula vinos con baja rotación a platos del menú para darles visibilidad",
        "Gestión de vino por copa: optimiza la selección y rotación de tu programa de copas",
      ],
      icon: "check",
    },
  ],
  faqs: [
    {
      q: "¿Cuál es una buena tasa de rotación para el vino en un restaurante?",
      a: "Para la mayoría de restaurantes, una rotación de 8-12 veces al año es saludable. Esto significa que cada referencia se vende y repone cada 4-6 semanas. Los vinos por copa deberían rotar más rápido: cada 1-2 semanas.",
    },
    {
      q: "¿Cada cuánto debería revisar mi carta de vinos?",
      a: "Idealmente cada mes a nivel de datos (qué se vende, qué no) y cada trimestre a nivel de selección (quitar, añadir o sustituir referencias). Los vinos por copa deberían revisarse cada 2-4 semanas.",
    },
    {
      q: "¿Qué hago con los vinos que no se venden?",
      a: "Tres opciones: 1) Reposiciónalos en la carta con mejor visibilidad y descripción. 2) Inclúyelos como vino por copa o maridaje recomendado. 3) Si en 30 días más no se venden, retíralos de la carta y liquídalos en eventos o promociones.",
    },
    {
      q: "¿Tener menos vinos mejora la rotación automáticamente?",
      a: "Reducir referencias es condición necesaria pero no suficiente. También necesitas buen posicionamiento, recomendaciones activas y pricing adecuado. Pero sí, una carta más reducida concentra la demanda en menos referencias y mejora la rotación media.",
    },
  ],
  relatedTools: [
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
    { label: "Calculadora de precio por copa", url: "/herramientas/calculadora-precio-vino-por-copa" },
    { label: "Analizador de carta de vinos", url: "/analisis-carta" },
  ],
  relatedGuides: [
    { label: "Cómo hacer una carta de vinos rentable", url: "/como-hacer-una-carta-de-vinos" },
    { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
    { label: "Vino por copa en restaurante", url: "/vino-por-copa-restaurante" },
    { label: "Tu carta de vinos no vende", url: "/problemas/carta-de-vinos-no-vende" },
  ],
};

const RotacionVinos = () => <GuideTemplate data={data} />;

export default RotacionVinos;
