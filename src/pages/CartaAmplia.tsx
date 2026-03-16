import {
  Layers, Wine, BarChart3, Sparkles, BookOpen, Globe,
  TrendingUp, Users, DollarSign, Target, RefreshCw, Search,
} from "lucide-react";
import VerticalTemplate, { type VerticalContent } from "@/components/templates/VerticalTemplate";

const data: VerticalContent = {
  metaTitle: "Winerim para Cartas de Vinos Extensas | +250 Referencias bajo Control",
  metaDescription: "Gestiona cartas de vinos de alta complejidad con Winerim: detecta stock muerto, optimiza rotación, elimina canibalización y toma decisiones de surtido con datos reales.",
  canonicalUrl: "https://winerim.wine/soluciones/carta-amplia",
  schemaId: "carta-amplia",
  badgeLabel: "Alta complejidad",
  badgeIcon: Layers,
  breadSolutions: "Soluciones",
  breadLabel: "Carta amplia",
  heroTitle1: "Más referencias no significa más ventas. Significa ",
  heroTitleHighlight: "más riesgo sin control",
  heroDesc: "Winerim convierte cartas amplias y complejas en activos rentables: cada referencia justificada, cada precio optimizado, cada decisión basada en datos.",
  ctaDemo: "Solicitar demo", ctaContact: "Hablar con el equipo",
  heroSummary: "Una carta con más de 250 referencias puede ser una ventaja competitiva o una trampa financiera. Sin analítica, muchas referencias no rotan, canibalizan entre sí y generan stock muerto. Winerim aporta la inteligencia para que cada vino en tu carta tenga una razón de estar ahí — y lo demuestre con datos.",

  forTitle: "¿Es Winerim para tu carta?",
  forLabel: "Encaja perfecto si…",
  notForLabel: "Quizá no sea para ti si…",
  forItems: [
    "Tu carta tiene más de 250 referencias y sospechas que muchas no rotan",
    "No tienes datos claros de qué vinos generan margen real",
    "Has detectado vinos que se canibalizan entre sí en precio o estilo",
    "Quieres reducir la carta sin perder profundidad ni atractivo",
    "Necesitas justificar ante dirección o propiedad cada decisión de surtido",
  ],
  notForItems: [
    "Tu carta tiene menos de 40 referencias y la gestionas sin dificultad",
    "No consideras el vino como una categoría estratégica del negocio",
    "Prefieres decidir el surtido exclusivamente por relación con distribuidores",
  ],

  painLabel: "El problema",
  painTitle1: "Los peligros de una carta ",
  painTitleHighlight: "demasiado grande sin control",
  pains: [
    { text: "Stock muerto invisible: referencias que llevan meses en carta sin venderse, ocupando capital y espacio sin retorno." },
    { text: "Canibalización silenciosa: vinos de perfil similar compitiendo entre sí, diluyendo ventas y confundiendo al comensal." },
    { text: "Parálisis de elección: el comensal se abruma ante demasiadas opciones y termina pidiendo 'el segundo más barato'." },
    { text: "Imposibilidad de formar al equipo: nadie puede conocer 250+ referencias. El personal evita recomendar vino." },
    { text: "Pricing inconsistente: multiplicadores genéricos aplicados a toda la carta, sin considerar el rol de cada vino." },
    { text: "Revisiones de carta a ciegas: se cambian referencias por intuición, relación con el proveedor o disponibilidad, no por rendimiento." },
    { text: "Coste de oportunidad: cada referencia que no funciona ocupa el lugar de una que podría generar margen y satisfacción." },
  ],

  tableLabel: "Comparativa",
  tableTitle: "Gestión de carta amplia: intuición vs. datos",
  tableHeaders: ["Decisión", "Por intuición", "Con Winerim"],
  tableRows: [
    { area: "Qué referencias mantener", without: "Las que 'siempre han estado'", with_w: "Las que generan margen, rotan y no canibalizan" },
    { area: "Qué referencias retirar", without: "Las que el distribuidor ya no tiene", with_w: "Las de peor rendimiento según datos reales de venta" },
    { area: "Qué precio poner", without: "Coste × multiplicador igual para todas", with_w: "Precio ajustado por referencia: margen + demanda + posición" },
    { area: "Cuántas referencias tener", without: "Cuantas más, mejor (¿verdad?)", with_w: "Las necesarias para cubrir estilos sin canibalización" },
    { area: "Cómo detectar problemas", without: "Cuando alguien se queja o el stock se acumula", with_w: "Alertas automáticas de baja rotación y stock muerto" },
    { area: "Cómo formar al equipo", without: "Briefing verbal esporádico", with_w: "Fichas técnicas accesibles en cada interacción con el comensal" },
  ],

  solLabel: "La solución",
  solTitle1: "Lo que Winerim aporta a una ",
  solTitleHighlight: "carta extensa",
  advantages: [
    { title: "Mapa de rendimiento completo", desc: "Visualiza cada referencia en función de margen, rotación y demanda. Identifica las que aportan y las que lastran en un solo panel." },
    { title: "Detección de canibalización", desc: "Winerim cruza perfiles de precio, región, estilo y uva para señalar referencias que compiten entre sí innecesariamente." },
    { title: "Alertas de stock muerto", desc: "Recibe notificaciones cuando una referencia lleva demasiado tiempo sin moverse. Actúa antes de que el problema se acumule." },
    { title: "Optimización de surtido", desc: "Recomendaciones basadas en datos para reducir, ampliar o reequilibrar la carta según el perfil de tu clientela." },
    { title: "Pricing por referencia", desc: "Abandona el multiplicador genérico. Cada vino tiene su precio óptimo basado en su rol dentro de la carta." },
    { title: "Informes de decisión", desc: "Genera reportes listos para compartir con dirección o propiedad. Cada cambio en la carta se sustenta en datos reales." },
  ],
  advIcons: [BarChart3, Search, RefreshCw, Layers, DollarSign, BookOpen],

  howLabel: "En la práctica",
  howTitle: "Cómo funciona con una carta extensa",
  useCases: [
    { title: "Auditoría de carta trimestral", scenario: "El responsable necesita decidir qué 15 referencias retirar de una carta de 250 para la nueva temporada.", result: "Winerim genera un ranking de rendimiento con las 15 peores referencias y sugiere sustituciones basadas en estilo y precio." },
    { title: "Detección de canibalización", scenario: "Tienes 8 Riojas crianza entre 18€ y 24€ y no sabes cuáles compiten entre sí.", result: "El análisis de canibalización identifica 3 referencias redundantes y muestra cómo redistribuir ventas al reducirlas." },
    { title: "Justificación de presupuesto", scenario: "Dirección pregunta por qué la carta tiene 200 referencias y cuántas son realmente rentables.", result: "Un informe automático muestra que el 35% de la carta genera el 80% del margen, con propuestas de acción claras." },
  ],
  ucIcons: [BarChart3, Search, Layers],

  impactLabel: "Resultados",
  impactTitle: "Impacto medible en cartas extensas",
  impactSubtitle: "Basado en restaurantes con más de 250 referencias que han optimizado su carta con Winerim.",
  impacts: [
    { label: "Stock muerto detectado: 15–30% de la carta", desc: "La mayoría de cartas extensas tienen un 15–30% de referencias que no rotan. Winerim las identifica con datos." },
    { label: "Margen global +10–18%", desc: "Al retirar referencias que no aportan y ajustar pricing, el margen de toda la categoría de vino mejora." },
    { label: "Carta más rentable con menos referencias", desc: "Reducir la carta un 20% puede aumentar las ventas de las referencias restantes por menor canibalización." },
    { label: "Decisiones de compra 3× más rápidas", desc: "Con datos de rendimiento, decidir qué incorporar o retirar pasa de semanas a minutos." },
    { label: "Equipo más seguro al recomendar", desc: "Con menos referencias y fichas enriquecidas, el equipo gana confianza para recomendar vino." },
    { label: "Menor capital inmovilizado en bodega", desc: "Al optimizar el surtido, se reduce el stock dormido y se libera capital para referencias que sí funcionan." },
  ],
  impactIcons: [Target, DollarSign, TrendingUp, Sparkles, Users, RefreshCw],

  doesLabel: "Lo que Winerim sí hace",
  doesNotLabel: "Lo que Winerim no hace",
  doesTitle: "Expectativas claras",
  doesItems: [
    "Analiza el rendimiento de cada referencia con datos reales",
    "Detecta canibalización entre vinos de perfil similar",
    "Genera alertas de stock muerto y baja rotación",
    "Sugiere ajustes de surtido basados en datos, no en opinión",
    "Optimiza pricing por referencia según su rol en carta",
    "Produce informes accionables para compartir con dirección",
  ],
  doesNotItems: [
    "No decide por ti qué vinos comprar — te da los datos para decidir mejor",
    "No gestiona el almacén ni la logística de bodega",
    "No modifica la carta sin tu aprobación",
    "No es un TPV ni un sistema de pedidos a proveedores",
  ],

  faqs: [
    { q: "¿A partir de cuántas referencias tiene sentido usar Winerim?", a: "A partir de 50 referencias ya se pueden detectar patrones de canibalización y stock muerto significativos. El impacto crece con el tamaño de la carta: con +100 referencias, la optimización puede liberar un 15–30% de capital inmovilizado." },
    { q: "¿Winerim me dice qué vinos retirar?", a: "Winerim te muestra un ranking de rendimiento basado en datos reales (margen, rotación, demanda). La decisión final siempre es tuya, pero ahora tienes argumentos objetivos." },
    { q: "¿Qué es la canibalización de vinos?", a: "Ocurre cuando dos o más referencias de perfil similar (misma región, estilo y franja de precio) compiten entre sí, diluyendo las ventas de ambas. Winerim cruza estos atributos para detectarlo automáticamente." },
    { q: "¿Puedo generar informes para dirección o propiedad?", a: "Sí. Winerim genera reportes con métricas claras de rendimiento por referencia, oportunidades de mejora y propuestas de acción, listos para presentar en reuniones de gestión." },
    { q: "¿Cuánto tarda en implantarse?", a: "Depende del tamaño de la carta. Para cartas de 100–300 referencias, la implantación completa tarda entre 3 y 7 días. Ofrecemos soporte durante todo el proceso." },
    { q: "¿Funciona con carta física o solo digital?", a: "Winerim funciona como sistema de análisis y gestión. Los datos alimentan tanto la carta digital como las decisiones sobre la carta física. No obliga a eliminar el soporte papel." },
    { q: "¿Puedo probar antes de contratar?", a: "Sí. Ofrecemos un análisis gratuito de tu carta actual donde identificamos stock muerto, canibalización y oportunidades de pricing. Es la mejor forma de ver el valor antes de decidir." },
  ],

  ctaLabel: "Da el siguiente paso",
  ctaTitle: "¿Cuántas de tus referencias están realmente trabajando para ti?",
  ctaDesc: "Solicita un análisis gratuito y descubre qué parte de tu carta genera margen y cuál es peso muerto.",
  ctaPrimary: "Analizar mi carta gratis",
  ctaSecondary: "Solicitar demo",
  ctaMicro: "Sin compromiso. Informe personalizado en menos de 48 horas.",

  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { label: "Análisis gratuito", to: "/analisis-carta", description: "Detecta stock muerto y canibalización en tu carta", type: "tool" as const },
    { label: "Guía: detectar vinos muertos", to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", description: "Metodología paso a paso", type: "guide" as const },
    { label: "Calculadora de stock muerto", to: "/herramientas/calculadora-stock-muerto", description: "Estima cuánto capital tienes inmovilizado", type: "tool" as const },
  ],
  internalLinks: [
    { to: "/analisis-carta", label: "Análisis gratuito de carta", type: "tool" },
    { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", label: "Detectar vinos muertos", type: "guide" },
    { to: "/guias/como-detectar-canibalizacion-vinos-carta", label: "Canibalización de vinos", type: "guide" },
    { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
    { to: "/casos-exito", label: "Casos de éxito", type: "resource" },
    { to: "/soluciones/grupos-restauracion", label: "Grupos de restauración", type: "solution" },
  ],
};

const CartaAmplia = () => <VerticalTemplate t={data} />;
export default CartaAmplia;
