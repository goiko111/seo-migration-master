import {
  TrendingUp, Wine, BarChart3, Sparkles, BookOpen, Globe,
  Target, RefreshCw, Search, DollarSign, Users, Layers,
} from "lucide-react";
import VerticalTemplate, { type VerticalContent } from "@/components/templates/VerticalTemplate";

const data: VerticalContent = {
  metaTitle: "Winerim para Cartas de 80–250 Referencias | Optimización con Criterio",
  metaDescription: "Tu carta tiene la profundidad suficiente para beneficiarse de Winerim: mejor pricing, rotación equilibrada, vino por copa estratégico y crecimiento sin desorden.",
  canonicalUrl: "https://winerim.wine/soluciones/carta-crecimiento",
  schemaId: "carta-crecimiento",
  badgeLabel: "Profundidad con criterio",
  badgeIcon: TrendingUp,
  breadSolutions: "Soluciones",
  breadLabel: "Carta con ambición",
  heroTitle1: "Tu carta ya tiene suficiente complejidad. Lo que necesita es ",
  heroTitleHighlight: "inteligencia para crecer bien",
  heroDesc: "80–250 referencias no es una carta pequeña. Es una carta con potencial real para vender mejor, rotar más y crecer sin perder el control.",
  ctaDemo: "Solicitar demo", ctaContact: "Hablar con el equipo",
  heroSummary: "Una carta de 80 a 250 referencias ya tiene la complejidad comercial suficiente para que las decisiones de surtido, pricing y rotación marquen una diferencia real. Winerim aporta el criterio analítico para que cada referencia justifique su sitio, cada precio esté optimizado y cada decisión de crecimiento esté basada en datos, no en intuición.",

  forTitle: "¿Es Winerim para tu carta?",
  forLabel: "Encaja perfecto si…",
  notForLabel: "Quizá no sea para ti si…",
  forItems: [
    "Tu carta tiene entre 80 y 250 referencias y quieres optimizar antes de seguir creciendo",
    "Sospechas que tu pricing se basa en multiplicadores genéricos sin diferenciación",
    "No tienes datos claros de qué vinos realmente generan margen",
    "Tu estrategia de vino por copa es intuitiva y quieres profesionalizarla",
    "Quieres crecer en referencias con criterio, sin desordenar la carta",
  ],
  notForItems: [
    "Tu carta tiene menos de 40 referencias y la controlas sin dificultad",
    "No consideras el vino como una categoría estratégica del negocio",
    "No tienes intención de optimizar pricing ni rotación",
  ],

  painLabel: "El problema",
  painTitle1: "Los retos de una carta con ",
  painTitleHighlight: "profundidad real pero sin herramientas",
  pains: [
    { text: "Pricing lineal: el mismo multiplicador para todos los vinos, sin diferenciar por rol, demanda o posición en carta." },
    { text: "Rotación desigual: algunas referencias venden siempre y otras se estancan, pero no hay datos para distinguirlas." },
    { text: "Desequilibrio de surtido: demasiada representación de una zona o estilo, huecos en franjas de precio clave." },
    { text: "Vino por copa sin estrategia: la selección de copas se decide por comodidad, no por rentabilidad ni demanda." },
    { text: "Crecimiento desordenado: se añaden referencias por relación con distribuidores, no por necesidad real de la carta." },
    { text: "Formación insuficiente: el equipo de sala no puede conocer 100+ referencias con el briefing habitual." },
  ],

  tableLabel: "Comparativa",
  tableTitle: "Gestión de carta media-alta: intuición vs. datos",
  tableHeaders: ["Decisión", "Por intuición", "Con Winerim"],
  tableRows: [
    { area: "Qué precio poner", without: "Coste × multiplicador fijo", with_w: "Precio óptimo según rol del vino, demanda y margen objetivo" },
    { area: "Qué vinos por copa ofrecer", without: "Los más fáciles de servir", with_w: "Los de mejor ratio rentabilidad-rotación-vida útil" },
    { area: "Cuándo rotar referencias", without: "Cuando el distribuidor lo sugiere", with_w: "Cuando los datos de venta y margen lo indican" },
    { area: "Cómo equilibrar la carta", without: "Por intuición del sumiller o chef", with_w: "Mapeo de estilos, precios y demanda por segmento" },
    { area: "Si crecer o no en referencias", without: "Si hay hueco en la bodega", with_w: "Si hay demanda real y no genera canibalización" },
    { area: "Cómo formar al equipo", without: "Briefing verbal antes del servicio", with_w: "Fichas enriquecidas accesibles en cada interacción" },
  ],

  solLabel: "La solución",
  solTitle1: "Lo que Winerim aporta a una carta con ",
  solTitleHighlight: "ambición de crecimiento",
  advantages: [
    { title: "Pricing diferenciado", desc: "Cada referencia tiene su precio óptimo según su posición en carta, coste, demanda y margen objetivo. Abandona el multiplicador genérico." },
    { title: "Rotación bajo control", desc: "Visualiza la velocidad de rotación de cada referencia. Detecta las que se estancan antes de que se conviertan en stock muerto." },
    { title: "Equilibrio de carta inteligente", desc: "Mapea tu carta por estilo, región, precio y demanda. Identifica huecos y sobrerepresentaciones." },
    { title: "Vino por copa estratégico", desc: "Selecciona copas por rentabilidad, vida útil y perfil de demanda. Controla merma y optimiza margen neto." },
    { title: "Criterio para crecer", desc: "Antes de añadir una referencia, Winerim te muestra si hay demanda real, si canibaliza y qué impacto tiene en la carta." },
    { title: "Equipo preparado", desc: "Fichas enriquecidas y recomendaciones contextuales para que el equipo de sala venda con confianza." },
  ],
  advIcons: [DollarSign, RefreshCw, Layers, Wine, TrendingUp, Users],

  howLabel: "En la práctica",
  howTitle: "Cómo funciona con una carta de 80–250 referencias",
  useCases: [
    { title: "Optimización de pricing", scenario: "Un restaurante con 120 referencias aplica el mismo ×3,2 a todos los vinos. Los vinos de entrada compiten en precio con los de mayor valor percibido.", result: "Winerim genera una escalera de precios diferenciada: multiplicadores más bajos en entrada y más altos en alta gama, mejorando el margen global un 12%." },
    { title: "Estrategia de vino por copa", scenario: "Un gastrobar con 90 referencias ofrece 8 copas pero no sabe cuáles son rentables ni cuáles generan merma.", result: "El análisis de copa muestra que 3 de las 8 copas generan pérdida por merma. Se reformula la selección y el margen neto de copas sube un 22%." },
    { title: "Crecimiento con criterio", scenario: "El sumiller quiere ampliar de 150 a 180 referencias. No sabe en qué estilos hay demanda real.", result: "Winerim identifica demanda insatisfecha en blancos de 20-30€ y tintos naturales, evitando duplicidades en la franja ya saturada de Riojas." },
  ],
  ucIcons: [DollarSign, Wine, TrendingUp],

  impactLabel: "Resultados",
  impactTitle: "Impacto medible en cartas de 80–250 referencias",
  impactSubtitle: "Resultados basados en restaurantes que han optimizado su carta con Winerim.",
  impacts: [
    { label: "Margen global +8–15%", desc: "Con pricing diferenciado y mejor selección de copas, el margen de la categoría de vino mejora significativamente." },
    { label: "Rotación +20% más equilibrada", desc: "Al redistribuir la demanda entre referencias bien posicionadas, se reduce la concentración de ventas." },
    { label: "Copa más rentable desde el día 1", desc: "La selección de copas basada en datos reduce la merma y aumenta la rentabilidad neta por copa." },
    { label: "Crecimiento sin canibalización", desc: "Cada nueva referencia se incorpora con criterio: demanda real, posición en carta y sin duplicar estilos." },
    { label: "Equipo más seguro al recomendar", desc: "Con fichas enriquecidas y menos ambigüedad en la carta, el personal gana confianza." },
    { label: "Decisiones de compra más rápidas", desc: "Con datos de rendimiento claros, decidir qué mantener, rotar o incorporar lleva minutos, no semanas." },
  ],
  impactIcons: [DollarSign, RefreshCw, Wine, TrendingUp, Users, Sparkles],

  doesLabel: "Lo que Winerim sí hace",
  doesNotLabel: "Lo que Winerim no hace",
  doesTitle: "Expectativas claras",
  doesItems: [
    "Analiza el rendimiento de cada referencia con datos reales de venta y margen",
    "Optimiza el pricing referencia a referencia, no con multiplicadores genéricos",
    "Evalúa el equilibrio de tu carta por estilo, precio y demanda",
    "Te indica si una nueva referencia aporta valor o genera canibalización",
    "Profesionaliza tu estrategia de vino por copa con datos de merma y rotación",
    "Proporciona fichas enriquecidas accesibles para el equipo de sala",
  ],
  doesNotItems: [
    "No decide por ti qué vinos comprar — te da los datos para decidir mejor",
    "No gestiona el almacén ni la logística de bodega",
    "No modifica la carta sin tu aprobación",
    "No es un TPV ni un sistema de pedidos a proveedores",
  ],

  faqs: [
    { q: "¿80 referencias son suficientes para usar Winerim?", a: "Sí. A partir de 80 referencias ya hay suficiente complejidad comercial como para que el pricing diferenciado, la optimización de copas y el equilibrio de surtido generen un impacto medible." },
    { q: "¿En qué se diferencia esta solución de la de cartas amplias (+250)?", a: "Las cartas de 250+ tienen problemas adicionales como stock muerto significativo y canibalización masiva. Entre 80 y 250, el foco está en pricing, rotación, vino por copa y crecimiento con criterio." },
    { q: "¿Winerim me ayuda a decidir si debo crecer en referencias?", a: "Sí. Antes de añadir referencias, Winerim te muestra si hay demanda real en el segmento, si la nueva referencia canibalizará a otra y qué impacto tendrá en la carta." },
    { q: "¿Funciona para wine bars o solo para restaurantes?", a: "Funciona para ambos. Los wine bars con 80-250 referencias se benefician especialmente de la optimización de copas y el control de merma." },
    { q: "¿Cuánto tarda en implantarse?", a: "Para cartas de 80-250 referencias, la implantación completa tarda entre 2 y 5 días. Ofrecemos soporte durante todo el proceso." },
    { q: "¿Puedo probar antes de contratar?", a: "Sí. Ofrecemos un análisis gratuito de tu carta actual donde identificamos oportunidades de pricing, equilibrio y vino por copa. Es la mejor forma de ver el valor antes de decidir." },
  ],

  ctaLabel: "Da el siguiente paso",
  ctaTitle: "¿Tu carta de 80–250 referencias está rindiendo al máximo?",
  ctaDesc: "Solicita un análisis gratuito y descubre dónde están las oportunidades de pricing, rotación y copas.",
  ctaPrimary: "Analizar mi carta gratis",
  ctaSecondary: "Solicitar demo",
  ctaMicro: "Sin compromiso. Informe personalizado en menos de 48 horas.",

  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { label: "Análisis gratuito", to: "/analisis-carta", description: "Evalúa tu carta y detecta oportunidades", type: "tool" as const },
    { label: "Calculadora de margen", to: "/calculadora-margen-vino", description: "Calcula el margen por referencia", type: "tool" as const },
    { label: "Guía vino por copa", to: "/guias/como-disenar-estrategia-vino-por-copa", description: "Estrategia completa de copas", type: "guide" as const },
  ],
  internalLinks: [
    { to: "/analisis-carta", label: "Análisis gratuito de carta", type: "tool" },
    { to: "/calculadora-margen-vino", label: "Calculadora de margen", type: "tool" },
    { to: "/guias/como-disenar-estrategia-vino-por-copa", label: "Estrategia vino por copa", type: "guide" },
    { to: "/soluciones/carta-amplia", label: "Cartas amplias (+250 ref.)", type: "solution" },
    { to: "/carta-de-vinos-rentable", label: "Rentabilidad de carta", type: "guide" },
    { to: "/casos-exito", label: "Casos de éxito", type: "resource" },
  ],
};

const CartaCrecimiento = () => <VerticalTemplate t={data} />;
export default CartaCrecimiento;
