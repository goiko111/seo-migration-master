import {
  Star, Wine, BarChart3, Sparkles, BookOpen, Globe,
  TrendingUp, Users, DollarSign, Target, Layers, Award,
} from "lucide-react";
import VerticalTemplate, { type VerticalContent } from "@/components/templates/VerticalTemplate";

const data: VerticalContent = {
  metaTitle: "Winerim para Restaurantes Gastronómicos | Carta de Vinos con IA",
  metaDescription: "Maximiza el rendimiento de tu carta de vinos gastronómica con Winerim: análisis de rotación, pricing inteligente, fichas enriquecidas y recomendaciones por IA para comensales exigentes.",
  canonicalUrl: "https://winerim.wine/soluciones/restaurantes-gastronomicos",
  schemaId: "gastronomico",
  badgeLabel: "Alta gastronomía",
  badgeIcon: Star,
  breadSolutions: "Soluciones",
  breadLabel: "Restaurantes gastronómicos",
  heroTitle1: "Tu carta de vinos merece la misma excelencia que ",
  heroTitleHighlight: "tu cocina",
  heroDesc: "Winerim convierte cartas extensas y complejas en experiencias de descubrimiento que elevan el ticket, fidelizan al comensal gourmet y optimizan cada referencia.",
  ctaDemo: "Solicitar demo", ctaContact: "Hablar con el equipo",
  heroSummary: "Un restaurante gastronómico con 200+ referencias necesita mucho más que un listado de vinos. Winerim aporta fichas enriquecidas con notas de cata, maridajes contextuales y analítica de rendimiento por referencia. El resultado: una carta que no solo informa, sino que vende y educa.",

  forTitle: "¿Es Winerim para tu restaurante?",
  forLabel: "Encaja perfecto si…",
  notForLabel: "Quizá no sea para ti si…",
  forItems: [
    "Tienes +80 referencias y quieres maximizar su rotación",
    "Tu equipo de sala necesita apoyo para recomendar vinos premium",
    "Buscas elevar el ticket medio de vino sin presionar al comensal",
    "Quieres datos reales sobre qué vinos funcionan y cuáles no",
    "Te importa la coherencia entre cocina, carta y experiencia",
  ],
  notForItems: [
    "Tu carta tiene menos de 30 referencias",
    "No vendes vino o es residual en tu negocio",
    "No tienes interés en datos o analítica de rendimiento",
  ],

  painLabel: "El problema",
  painTitle1: "Los retos del vino en ",
  painTitleHighlight: "alta gastronomía",
  pains: [
    { text: "Cartas de 200+ referencias donde el 40% no rota: capital inmovilizado y complejidad de gestión sin retorno." },
    { text: "El comensal se abruma ante demasiadas opciones, elige por precio o zona conocida y no explora referencias de mayor valor." },
    { text: "El sumiller o jefe de sala no puede estar en todas las mesas: la recomendación depende del momento y la carga de trabajo." },
    { text: "El pricing se fija por multiplicador genérico, sin analizar elasticidad ni margen real por referencia." },
    { text: "Los maridajes existen en la mente del sumiller pero no llegan al comensal de forma proactiva y contextual." },
    { text: "No hay datos para decidir qué referencias incorporar, retirar o reposicionar en la próxima revisión de carta." },
  ],

  tableLabel: "Comparativa",
  tableTitle: "Gestión tradicional vs. Winerim en gastronómicos",
  tableHeaders: ["Área", "Sin Winerim", "Con Winerim"],
  tableRows: [
    { area: "Recomendación", without: "Depende de la disponibilidad del sumiller", with_w: "IA recomienda maridajes por plato en tiempo real" },
    { area: "Rotación", without: "Se revisa esporádicamente por intuición", with_w: "Dashboard de rotación por referencia con alertas automáticas" },
    { area: "Pricing", without: "Multiplicador fijo (×2.5 – ×3.5)", with_w: "Pricing dinámico basado en margen, demanda y posición en carta" },
    { area: "Experiencia", without: "PDF o carta papel sin contexto", with_w: "Fichas enriquecidas con notas, historia y maridaje" },
    { area: "Decisiones", without: "Basadas en relación con el distribuidor", with_w: "Basadas en rendimiento real: margen, rotación y satisfacción" },
    { area: "Formación", without: "Briefings informales antes del servicio", with_w: "Fichas técnicas accesibles que forman al equipo en cada venta" },
  ],

  solLabel: "La solución",
  solTitle1: "Lo que Winerim aporta a un ",
  solTitleHighlight: "restaurante gastronómico",
  advantages: [
    { title: "Fichas enriquecidas premium", desc: "Notas de cata, temperatura, bodega, historia y maridaje sugerido accesibles desde la carta digital. El comensal descubre sin necesitar al sumiller." },
    { title: "Maridajes contextuales por IA", desc: "Recomendaciones automáticas según los platos del menú y las preferencias del comensal. Cada mesa recibe una sugerencia personalizada." },
    { title: "Analítica de carta avanzada", desc: "Visualiza qué referencias generan margen, cuáles no rotan y dónde hay oportunidades de up-selling con datos reales de servicio." },
    { title: "Pricing por referencia", desc: "Abandona el multiplicador genérico. Fija precios basados en el margen objetivo, la elasticidad y el posicionamiento de cada vino." },
    { title: "Gestión de rotación inteligente", desc: "Alertas de stock muerto, detección de canibalización entre referencias similares y sugerencias de sustitución basadas en rendimiento." },
    { title: "Integración con el servicio", desc: "Winerim se adapta al ritmo del restaurante: accesible para el comensal en mesa y para el equipo de sala como herramienta de apoyo." },
  ],
  advIcons: [BookOpen, Sparkles, BarChart3, DollarSign, Layers, Globe],

  howLabel: "En la práctica",
  howTitle: "Cómo funciona en un gastronómico",
  useCases: [
    { title: "Mesa con menú degustación", scenario: "Un comensal pide el menú degustación de 7 pasos. El sumiller no está disponible.", result: "La carta sugiere un maridaje por copa optimizado para el menú, con opción de botella para pasos clave." },
    { title: "Revisión trimestral de carta", scenario: "El chef renueva platos de temporada y necesitas adaptar la carta de vinos.", result: "Winerim muestra qué referencias acompañan los nuevos platos y cuáles retirar por baja rotación." },
    { title: "Comensal explorador", scenario: "Un cliente quiere descubrir algo nuevo pero no sabe qué pedir entre 250 referencias.", result: "El sistema filtra por estilo, región o maridaje y presenta 3 opciones contextualizadas con ficha completa." },
  ],
  ucIcons: [Wine, BarChart3, Star],

  impactLabel: "Resultados",
  impactTitle: "Impacto medible en gastronómicos",
  impactSubtitle: "Basado en restaurantes gastronómicos que ya utilizan Winerim.",
  impacts: [
    { label: "Ticket medio de vino +18–25%", desc: "Las recomendaciones contextuales llevan al comensal hacia referencias de mayor valor sin percepción de presión." },
    { label: "Rotación de carta +30%", desc: "Las alertas de stock muerto y las sugerencias de sustitución mantienen la carta viva y rentable." },
    { label: "Margen bruto de vino +12–20%", desc: "El pricing por referencia y la reducción de stock muerto aumentan el margen global de la categoría." },
    { label: "Tiempo de decisión −40%", desc: "El comensal accede a fichas y maridajes directamente, reduciendo la dependencia del sumiller." },
    { label: "Satisfacción del comensal ↑", desc: "Una experiencia de descubrimiento guiada genera recuerdo, reseñas positivas y repetición." },
    { label: "Decisiones de compra basadas en datos", desc: "Cada incorporación o retirada de referencia se sustenta en rendimiento real, no en intuición." },
  ],
  impactIcons: [DollarSign, TrendingUp, Target, Wine, Users, BarChart3],

  doesLabel: "Lo que Winerim sí hace",
  doesNotLabel: "Lo que Winerim no hace",
  doesTitle: "Expectativas claras",
  doesItems: [
    "Recomienda vinos por maridaje, estilo y preferencia del comensal",
    "Analiza rotación, margen y rendimiento por referencia",
    "Optimiza pricing con datos reales de servicio",
    "Genera fichas enriquecidas accesibles para comensal y equipo",
    "Detecta stock muerto y canibalización entre referencias",
    "Se integra con el flujo de sala sin sustituir al sumiller",
  ],
  doesNotItems: [
    "No sustituye la labor del sumiller — la potencia y escala",
    "No gestiona pedidos a proveedores ni logística de bodega",
    "No modifica la carta sin tu aprobación",
    "No es un TPV ni un sistema de facturación",
  ],

  faqs: [
    { q: "¿Winerim sustituye al sumiller?", a: "No. Winerim amplifica la labor del sumiller, cubriendo las mesas donde no puede estar y proporcionándole datos para tomar mejores decisiones de carta. El sumiller sigue siendo la pieza clave del servicio." },
    { q: "¿Funciona con cartas de más de 300 referencias?", a: "Sí. Winerim está diseñado para gestionar cartas extensas, detectando qué referencias aportan valor y cuáles son prescindibles. Cuantas más referencias, mayor es el impacto de la optimización." },
    { q: "¿Cómo mejora la experiencia del comensal gourmet?", a: "El comensal accede a fichas enriquecidas con notas de cata, historia de la bodega y maridajes contextuales. Es una capa de descubrimiento que complementa la recomendación personal del sumiller." },
    { q: "¿Puedo analizar el margen real por referencia?", a: "Sí. Winerim cruza precio de compra, precio de venta, rotación y demanda para calcular la rentabilidad real de cada referencia, no solo el margen teórico." },
    { q: "¿Se integra con mi carta física o solo es digital?", a: "Winerim funciona como carta digital interactiva, pero también genera informes y datos que alimentan decisiones sobre la carta física. No obliga a eliminar el soporte papel." },
    { q: "¿Cuánto tarda la implementación?", a: "Entre 48 horas y una semana, dependiendo del tamaño de la carta. Cargamos tus referencias, configuramos fichas y maridajes y te formamos para usar el panel de gestión." },
    { q: "¿Puedo probar antes de contratar?", a: "Sí. Ofrecemos un análisis gratuito de tu carta actual que te muestra oportunidades de mejora antes de decidir si implantar Winerim." },
  ],

  ctaLabel: "Da el siguiente paso",
  ctaTitle: "¿Listo para que tu carta de vinos rinda al nivel de tu cocina?",
  ctaDesc: "Solicita un análisis gratuito de tu carta y descubre las oportunidades que hoy estás dejando pasar.",
  ctaPrimary: "Analizar mi carta gratis",
  ctaSecondary: "Solicitar demo",
  ctaMicro: "Sin compromiso. Informe personalizado en menos de 48 horas.",

  nextStepsTitle: "Siguientes pasos",
  nextSteps: [
    { label: "Análisis gratuito", href: "/analisis-carta", desc: "Descubre oportunidades ocultas en tu carta actual" },
    { label: "Casos de éxito", href: "/casos-exito", desc: "Mira cómo otros gastronómicos han mejorado resultados" },
    { label: "Funcionalidades", href: "/funcionalidades", desc: "Explora todo lo que Winerim puede hacer por tu restaurante" },
  ],
  internalLinks: [
    { to: "/analisis-carta", label: "Análisis gratuito de carta", type: "tool" },
    { to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", label: "Guía de rotación de vinos", type: "guide" },
    { to: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", label: "Estrategia de maridaje", type: "guide" },
    { to: "/casos-exito", label: "Casos de éxito", type: "resource" },
    { to: "/software-carta-de-vinos", label: "Software carta de vinos", type: "solution" },
    { to: "/soluciones/restaurantes-sin-sumiller", label: "Restaurantes sin sumiller", type: "solution" },
  ],
};

const RestaurantesGastronomicos = () => <VerticalTemplate t={data} />;
export default RestaurantesGastronomicos;
