import {
  GlassWater, Wine, BarChart3, Sparkles, BookOpen, Globe,
  TrendingUp, Users, DollarSign, Target, Layers, RefreshCw,
} from "lucide-react";
import VerticalTemplate, { type VerticalContent } from "@/components/templates/VerticalTemplate";

const data: VerticalContent = {
  metaTitle: "Winerim para Wine Bars y Vinotecas | Gestión Inteligente de Carta",
  metaDescription: "Optimiza la gestión de tu wine bar con Winerim: rotación por copa, pricing dinámico, fichas para clientes curiosos y analítica de rendimiento por referencia.",
  canonicalUrl: "https://winerim.wine/soluciones/wine-bars",
  schemaId: "wine-bar",
  badgeLabel: "Wine bars & vinotecas",
  badgeIcon: GlassWater,
  breadSolutions: "Soluciones",
  breadLabel: "Wine bars",
  heroTitle1: "Tu carta por copas merece ",
  heroTitleHighlight: "inteligencia, no intuición",
  heroDesc: "Winerim transforma la gestión del vino en wine bars: rotación óptima por copa, pricing que maximiza margen y fichas que convierten curiosos en clientes recurrentes.",
  ctaDemo: "Solicitar demo", ctaContact: "Hablar con el equipo",
  heroSummary: "En un wine bar, el vino no es un complemento — es el producto principal. Cada copa mal gestionada, cada botella que no rota y cada referencia sin ficha son dinero perdido. Winerim da al wine bar las herramientas analíticas que ya existen en hostelería premium, adaptadas a la operativa por copas y al perfil de cliente explorador.",

  forTitle: "¿Es Winerim para tu wine bar?",
  forLabel: "Encaja perfecto si…",
  notForLabel: "Quizá no sea para ti si…",
  forItems: [
    "Vendes vino por copa como categoría principal del negocio",
    "Tienes +40 referencias y rotas con frecuencia",
    "Quieres maximizar el margen por copa sin subir precios a ciegas",
    "Tu clientela es curiosa y valora descubrir vinos nuevos",
    "Necesitas datos para decidir qué vinos entran y salen de carta",
  ],
  notForItems: [
    "Tu negocio es un bar generalista donde el vino es residual",
    "Vendes menos de 10 referencias",
    "No tienes interés en analizar el rendimiento de tu carta",
  ],

  painLabel: "El problema",
  painTitle1: "Los retos específicos de un ",
  painTitleHighlight: "wine bar",
  pains: [
    { text: "Alta rotación de referencias por copa: decidir qué abrir cada día es un riesgo económico si no tienes datos de demanda real." },
    { text: "El margen por copa se fija por multiplicador genérico, sin considerar la merma, la velocidad de consumo ni la elasticidad del precio." },
    { text: "Clientes que quieren descubrir pero no tienen contexto: sin fichas o recomendaciones, eligen lo seguro y de menor precio." },
    { text: "Botellas abiertas que no se terminan a tiempo: la merma destruye el margen de la operativa por copas." },
    { text: "Dificultad para saber qué referencias están funcionando realmente y cuáles generan más coste que beneficio." },
    { text: "El equipo de barra no siempre tiene el conocimiento enológico para guiar al cliente hacia opciones de mayor valor." },
  ],

  tableLabel: "Comparativa",
  tableTitle: "Gestión tradicional vs. Winerim en wine bars",
  tableHeaders: ["Área", "Sin Winerim", "Con Winerim"],
  tableRows: [
    { area: "Selección por copa", without: "Intuición del responsable cada mañana", with_w: "Datos de demanda, margen y rotación para decidir qué abrir" },
    { area: "Pricing por copa", without: "Coste × multiplicador fijo", with_w: "Precio optimizado por referencia: margen + demanda + merma" },
    { area: "Merma", without: "Se asume como coste inevitable", with_w: "Alertas de botellas abiertas y velocidad de consumo por referencia" },
    { area: "Descubrimiento", without: "Depende de la recomendación verbal del equipo", with_w: "Fichas interactivas con notas, historia y maridajes sugeridos" },
    { area: "Rotación", without: "Se revisa cuando hay excedente o rotura", with_w: "Dashboard en tiempo real con alertas de baja rotación" },
    { area: "Formación", without: "Conocimiento informal del equipo de barra", with_w: "Fichas técnicas que forman al equipo en cada interacción" },
  ],

  solLabel: "La solución",
  solTitle1: "Lo que Winerim aporta a un ",
  solTitleHighlight: "wine bar",
  advantages: [
    { title: "Gestión de copa inteligente", desc: "Decide qué botellas abrir cada día basándote en datos de demanda, margen y velocidad de consumo, no en corazonadas." },
    { title: "Pricing dinámico por copa", desc: "Cada referencia tiene su precio óptimo según coste, merma esperada y disposición de pago del cliente. Abandona el ×3." },
    { title: "Fichas de descubrimiento", desc: "Notas de cata, historia de la bodega, sugerencias de maridaje y estilos similares. Convierte curiosos en clientes fieles." },
    { title: "Control de merma", desc: "Monitoriza botellas abiertas, tiempo de exposición y velocidad de servicio. Reduce la merma con alertas proactivas." },
    { title: "Analítica de rendimiento", desc: "Visualiza el margen real por referencia y por copa. Detecta qué vinos son rentables y cuáles están lastrando tu resultado." },
    { title: "Rotación asistida", desc: "Alertas automáticas de referencias que dejan de funcionar, sugerencias de sustitución y análisis de canibalización." },
  ],
  advIcons: [GlassWater, DollarSign, BookOpen, RefreshCw, BarChart3, Layers],

  howLabel: "En la práctica",
  howTitle: "Cómo funciona en un wine bar",
  useCases: [
    { title: "Apertura diaria", scenario: "Lunes por la mañana: hay que decidir qué 8 vinos abrir por copa para la semana.", result: "Winerim sugiere las 8 referencias con mejor ratio margen/demanda, considerando stock y rotación previa." },
    { title: "Cliente indeciso en barra", scenario: "Un cliente pide 'algo diferente pero no muy fuerte' sin más indicaciones.", result: "La carta filtra por estilo y cuerpo, presenta 3 opciones con ficha y precio, guiando sin presión." },
    { title: "Evento de cata privada", scenario: "Un grupo reserva una cata de 6 vinos y necesitas una selección coherente y rentable.", result: "Winerim genera una propuesta de cata con hilo conductor, fichas descargables y margen optimizado." },
  ],
  ucIcons: [Wine, Users, GlassWater],

  impactLabel: "Resultados",
  impactTitle: "Impacto medible en wine bars",
  impactSubtitle: "Basado en establecimientos de vino por copa que ya usan Winerim.",
  impacts: [
    { label: "Margen por copa +15–22%", desc: "El pricing individualizado y la reducción de merma aumentan la rentabilidad por cada copa servida." },
    { label: "Merma reducida −25–35%", desc: "Las alertas de botellas abiertas y la gestión de velocidad de consumo minimizan el desperdicio." },
    { label: "Ticket medio +12–18%", desc: "Las fichas y recomendaciones guían al cliente hacia opciones de mayor valor percibido." },
    { label: "Rotación de carta +40%", desc: "La analítica de rendimiento permite renovar la carta con datos, no con intuición." },
    { label: "Clientes recurrentes ↑", desc: "La experiencia de descubrimiento guiada genera fidelización y recomendación." },
    { label: "Tiempo de decisión −35%", desc: "El cliente accede a contexto y filtros que agilizan la elección sin depender del equipo." },
  ],
  impactIcons: [DollarSign, RefreshCw, TrendingUp, Layers, Users, Target],

  doesLabel: "Lo que Winerim sí hace",
  doesNotLabel: "Lo que Winerim no hace",
  doesTitle: "Expectativas claras",
  doesItems: [
    "Optimiza qué vinos abrir por copa cada día con datos",
    "Calcula el pricing óptimo por copa considerando merma",
    "Genera fichas interactivas que facilitan el descubrimiento",
    "Monitoriza rotación y margen por referencia en tiempo real",
    "Reduce la merma con alertas de botellas abiertas",
    "Forma al equipo de barra con información accesible",
  ],
  doesNotItems: [
    "No gestiona el stock de bodega ni la logística de compras",
    "No es un TPV ni factura las ventas",
    "No decide por ti qué vinos comprar al distribuidor",
    "No sustituye la experiencia humana del servicio en barra",
  ],

  faqs: [
    { q: "¿Winerim gestiona el stock de botellas abiertas?", a: "Winerim monitoriza botellas abiertas y su velocidad de consumo para generar alertas de merma, pero no es un sistema de inventario. Se complementa con tu gestión de bodega existente." },
    { q: "¿Funciona para wine bars con rotación semanal?", a: "Sí. De hecho, cuanto más rotes referencias, más valor aporta Winerim. El sistema aprende de los patrones de demanda y te ayuda a decidir qué abrir con menor riesgo." },
    { q: "¿Puedo usar Winerim para eventos y catas?", a: "Sí. Puedes generar selecciones temáticas con fichas descargables, calcular el margen de la cata y ofrecer la experiencia como servicio premium diferenciador." },
    { q: "¿Cómo ayuda con el pricing por copa?", a: "Winerim analiza coste de compra, merma esperada, demanda histórica y posición en carta para sugerir el precio óptimo de cada copa, maximizando margen sin alejar al cliente." },
    { q: "¿Necesito un sumiller para usar Winerim?", a: "No. Winerim está diseñado para funcionar tanto con equipos especializados como con personal de barra sin formación enológica. Las fichas y recomendaciones hacen accesible el conocimiento." },
    { q: "¿Cuánto cuesta la implantación?", a: "Depende del tamaño de tu carta. Ofrecemos un análisis gratuito inicial y la implantación completa se realiza en menos de una semana. Consulta precios en nuestra página de planes." },
  ],

  ctaLabel: "Da el siguiente paso",
  ctaTitle: "Haz que cada copa cuente",
  ctaDesc: "Solicita un análisis gratuito de tu carta por copas y descubre cuánto margen estás dejando sobre la barra.",
  ctaPrimary: "Analizar mi carta gratis",
  ctaSecondary: "Solicitar demo",
  ctaMicro: "Sin compromiso. Informe personalizado en menos de 48 horas.",

  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { label: "Análisis gratuito", href: "/analisis-carta", desc: "Descubre oportunidades ocultas en tu carta por copas" },
    { label: "Guía vino por copa", href: "/guias/como-fijar-estrategia-rentable-vino-por-copa", desc: "Estrategia completa para maximizar el vino por copa" },
    { label: "Pricing tool", href: "/wine-pricing-tool", desc: "Calcula el precio óptimo para cada copa" },
  ],
  internalLinks: [
    { to: "/analisis-carta", label: "Análisis gratuito de carta", type: "tool" },
    { to: "/guias/como-fijar-estrategia-rentable-vino-por-copa", label: "Estrategia vino por copa", type: "guide" },
    { to: "/guias/como-implantar-vino-por-copa-sin-perder-margen", label: "Copa sin perder margen", type: "guide" },
    { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora precio por copa", type: "tool" },
    { to: "/casos-exito", label: "Casos de éxito", type: "resource" },
    { to: "/soluciones/restaurantes-gastronomicos", label: "Restaurantes gastronómicos", type: "solution" },
  ],
};

const WineBars = () => <VerticalTemplate t={data} />;
export default WineBars;
