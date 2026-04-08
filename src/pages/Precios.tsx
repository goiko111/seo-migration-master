import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Zap, Crown, Building2,
  Sparkles, Clock, Headphones, Puzzle, GraduationCap,
  TrendingUp, Shield, Wine, BarChart3, Users, Hotel,
  UtensilsCrossed, ChefHat, Store, X, ShoppingCart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import { useLanguage } from "@/i18n/LanguageContext";
import DecisionCenterTeaser from "@/components/DecisionCenterTeaser";

/* ─── helpers ─── */
const em = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

/* ─── i18n content ─── */
const i18n: Record<string, typeof ES_CONTENT> = {};

const ES_CONTENT = {
  seo_title: "Planes y Precios de Winerim | Software de Carta de Vinos para Restaurantes",
  seo_desc: "Descubre qué plan de Winerim encaja con tu restaurante, hotel o grupo. Sin permanencia, con implementación en 48h y soporte dedicado.",
  breadcrumb: "Precios",
  badge: "Planes y precios",
  title: "Planes y precios de Winerim — Elige el que mejor se adapte a tu <em>negocio</em>",
  subtitle: "Sin permanencia. Implementación en 48 h. Soporte dedicado incluido en todos los planes.",
  valuePillars: [
    { icon: "clock", text: "Operativo en menos de 48 horas" },
    { icon: "shield", text: "Sin permanencia ni penalizaciones" },
    { icon: "headphones", text: "Soporte humano en cada plan" },
    { icon: "puzzle", text: "Compatible con cualquier POS" },
  ],
  whoTitle: "¿Qué plan encaja con <em>tu negocio</em>?",
  whoSubtitle: "Winerim sirve a perfiles muy distintos. Encuentra el tuyo.",
  profiles: [
    { icon: "store", name: "Restaurante independiente", plan: "Starter o Pro", desc: "Carta de 80–150 referencias. Necesitas visibilidad y control sin complejidad." },
    { icon: "chef", name: "Restaurante gastronómico", plan: "Pro", desc: "Carta amplia y compleja, maridajes, vino por copa. Necesitas recomendaciones inteligentes y analítica." },
    { icon: "hotel", name: "Hotel con F&B", plan: "Pro o Enterprise", desc: "Múltiples puntos de venta, room service, bar. Necesitas consistencia y reporting." },
    { icon: "wine", name: "Wine Bar / Enoteca", plan: "Pro", desc: "Alta rotación por copa, gestión de mermas, carta dinámica. Necesitas control fino del servicio por copa y rentabilidad." },
    { icon: "building", name: "Grupo de restauración", plan: "Enterprise", desc: "Multi-local, governance centralizada, benchmarking entre unidades y despliegue progresivo." },
  ],
  plansTitle: "Compara los <em>planes</em>",
  plansBadge: "Estructura clara",
  plans: [
    {
      name: "Starter",
      badge: "PLAN LEGACY",
      tagline: "Tu carta, digitalizada y profesional",
      solves: "Resuelve: carta estática, información dispersa, imagen pobre del vino.",
      fits: "Para clientes legacy y restaurantes con operativa simple.",
      features: [
        "Carta digital interactiva con filtros",
        "Fichas de vino completas con foto y notas",
        "QR personalizado para sala",
        "Acceso desde móvil del comensal",
        "Panel de gestión sencillo",
        "Soporte básico",
      ],
      notIncluded: [
        "Analítica avanzada de vino",
        "Optimización de precios y márgenes",
        "Wine Mapping",
        "Alertas de rotación y stock muerto",
        "Multi-local",
        "Inteligencia de compras",
      ],
    },
    {
      name: "Pro",
      badge: "INCLUYE WINERIM CORE ESSENTIALS",
      tagline: "Analiza mejor. Vende mejor.",
      solves: "Resuelve: ticket medio bajo, rotación lenta, pricing débil, decisiones poco informadas.",
      fits: "Para restaurantes con ambición, cartas con profundidad y operaciones que quieren optimizar de verdad.",
      popular: true,
      features: [
        "Todo lo del plan Starter",
        "Analítica de ventas de vino en tiempo real",
        "Optimización de precios y márgenes",
        "Wine Mapping interactivo",
        "Comparador de vinos para el comensal",
        "Optimización del vino por copa",
        "Alertas de rotación y stock muerto",
        "Salud básica de carta",
        "Recomendaciones inteligentes contextuales básicas",
        "Soporte prioritario",
      ],
      notIncluded: [
        "Multi-local centralizado",
        "Benchmarking entre unidades",
        "Inteligencia Dinámica completa",
        "Winerim Supply completo",
        "Integraciones avanzadas POS / PMS",
        "Reporting ejecutivo",
      ],
    },
    {
      name: "Enterprise",
      badge: "INCLUYE CORE FULL + DINÁMICA + SUPPLY",
      tagline: "Gobierna venta, compra y surtido con inteligencia completa",
      solves: "Resuelve: inconsistencia entre locales, falta de benchmarking, decisiones de compra débiles, descontrol de surtido y reporting fragmentado.",
      fits: "Para grupos de restauración, cadenas hoteleras y operaciones multiunidad.",
      features: [
        "Todo lo del plan Pro",
        "Winerim Core Full",
        "Inteligencia Dinámica completa",
        "Winerim Supply completo",
        "Multi-local centralizado",
        "Benchmarking entre unidades",
        "Integraciones POS y PMS avanzadas",
        "Analítica consolidada y reporting ejecutivo",
        "Despliegue progresivo por cluster o unidad",
        "API personalizada",
        "Onboarding dedicado con formación",
        "Account manager asignado",
        "SLA garantizado",
      ],
      notIncluded: [],
    },
  ],
  pricingNote: "Los precios de Winerim se adaptan al número de referencias de tu carta y al número de locales. Solicita una propuesta personalizada sin compromiso.",
  compTitle: "Qué incluye cada <em>plan</em>",
  compBadge: "Comparativa estratégica",
  compCategories: [
    {
      name: "Carta y experiencia del comensal",
      rows: [
        { feature: "Carta digital interactiva con filtros y QR", starter: true, pro: true, enterprise: true },
        { feature: "Fichas de vino completas", starter: true, pro: true, enterprise: true },
        { feature: "Comparador de vinos y maridajes", starter: false, pro: true, enterprise: true },
      ],
    },
    {
      name: "Inteligencia de producto",
      rows: [
        { feature: "Analítica de ventas y pricing", starter: false, pro: true, enterprise: true },
        { feature: "Wine Mapping y salud de carta", starter: false, pro: "Esencial" as string | boolean, enterprise: "Completo" as string | boolean },
        { feature: "Alertas de rotación y stock muerto", starter: false, pro: true, enterprise: true },
        { feature: "Inteligencia Dinámica (RIMs™)", starter: false, pro: false, enterprise: true },
        { feature: "Inteligencia de compras (Supply)", starter: false, pro: false, enterprise: true },
      ],
    },
    {
      name: "Operaciones y soporte",
      rows: [
        { feature: "Multi-local y benchmarking", starter: false, pro: false, enterprise: true },
        { feature: "Integraciones POS / PMS y API", starter: false, pro: false, enterprise: true },
        { feature: "Soporte prioritario", starter: false, pro: true, enterprise: true },
        { feature: "Onboarding, account manager y SLA", starter: false, pro: false, enterprise: true },
      ],
    },
  ],
  roiTitle: "Impacto estimado por <em>plan</em>",
  roiBadge: "ROI orientativo",
  roiNote: "Datos basados en la experiencia con clientes activos. El impacto real depende del punto de partida, la carta y el perfil del restaurante.",
  roi: [
    { plan: "Starter", metric: "Visibilidad", value: "Carta profesional online", desc: "El comensal explora tu carta completa y entiende tu propuesta de vinos." },
    { plan: "Pro", metric: "Rentabilidad", value: "+15–25 % ticket medio de vino", desc: "Pricing optimizado, copa inteligente y recomendaciones que suben el ticket." },
    { plan: "Enterprise", metric: "Gobierno", value: "+20–35 % margen neto grupo", desc: "Control centralizado de compras, surtido y benchmarking entre unidades." },
  ],
  layerTitle: "Qué capa de inteligencia incluye cada <em>plan</em>",
  layerBadge: "Arquitectura de capas",
  layers: [
    { plan: "Starter", stack: ["Carta Digital"], desc: "Digitalización profesional sin analítica." },
    { plan: "Pro", stack: ["Carta Digital", "Core Essentials"], desc: "Análisis, pricing y optimización del vino." },
    { plan: "Enterprise", stack: ["Carta Digital", "Core Full", "Inteligencia Dinámica", "Supply"], desc: "Suite completa: analiza, actúa y compra mejor." },
  ],
  objectionsTitle: "Lo que nos preguntan <em>antes de empezar</em>",
  objectionsBadge: "Sin fricciones",
  objections: [
    { icon: "clock", title: "¿Cuánto tarda la implementación?", answer: "La mayoría de restaurantes están operativos en menos de 48 horas. Subimos tu carta, configuramos filtros y personalizamos la experiencia. Sin disrupciones en tu servicio." },
    { icon: "graduation", title: "¿Necesito un sumiller en plantilla?", answer: "No. Winerim incluye maridajes automáticos, recomendaciones inteligentes y fichas completas. Tu equipo de sala puede recomendar vino con confianza, sin necesidad de expertise previo." },
    { icon: "puzzle", title: "¿Es compatible con mi POS o PMS?", answer: "Sí. Winerim se integra con los principales sistemas de punto de venta y gestión hotelera. En el plan Enterprise, ofrecemos integraciones personalizadas vía API." },
    { icon: "headphones", title: "¿Qué soporte incluye?", answer: "Todos los planes incluyen soporte humano. Pro añade prioridad y Enterprise incluye un account manager dedicado con SLA garantizado." },
    { icon: "trending", title: "¿Cuánto puedo mejorar mis ventas?", answer: "Depende de tu punto de partida. Nuestros clientes mejoran la exploración de referencias por parte del comensal, optimizan márgenes y reducen stock muerto. El impacto se mide en semanas, no en meses." },
    { icon: "shield", title: "¿Puedo personalizar la apariencia?", answer: "Sí. La carta digital se adapta a tu marca: colores, logo, tipografía y estilo visual. En Enterprise, la personalización es completa." },
  ],
  commonTitle: "¿Qué incluyen <em>todos</em> los planes?",
  commonFeatures: [
    "Carta digital interactiva accesible desde cualquier dispositivo",
    "Códigos QR personalizados para cada mesa o punto de servicio",
    "Fichas de vino completas con foto, notas y descriptores",
    "Panel de gestión para actualizar tu carta en tiempo real",
    "Soporte humano dedicado (no chatbots)",
    "Sin permanencia ni penalizaciones por cancelación",
    "Implementación en menos de 48 horas",
    "Compatible con cualquier sistema POS",
  ],
  helpTitle: "¿No estás seguro? <em>Te ayudamos</em> a elegir",
  helpDesc: "Cuéntanos tu situación y te recomendaremos el plan que mejor se adapta a tu restaurante, hotel o grupo. Sin compromiso.",
  helpCta: "Hablar con un asesor",
  faqs: [
    { q: "¿Hay compromiso de permanencia?", a: "No. Puedes cancelar cuando quieras, sin penalizaciones ni letra pequeña. Sin permanencia." },
    { q: "¿Cuánto tarda la implementación?", a: "La mayoría de restaurantes están operativos en menos de 48 horas. Subimos tu carta, configuramos filtros y personalizamos la experiencia." },
    { q: "¿Puedo cambiar de plan después?", a: "Sí. Puedes escalar de Starter a Pro o de Pro a Enterprise en cualquier momento. Sin interrupciones en el servicio." },
    { q: "¿Hay descuento anual?", a: "Sí. Ofrecemos condiciones especiales para compromisos anuales. Solicita una propuesta personalizada y te detallaremos las opciones." },
    { q: "¿Qué pasa si cancelo?", a: "Tu carta deja de estar activa, pero conservamos tus datos durante 90 días por si decides volver. Sin penalizaciones." },
    { q: "¿Incluye soporte?", a: "Todos los planes incluyen soporte humano. Pro añade prioridad y Enterprise incluye un account manager dedicado con SLA garantizado." },
    { q: "¿Cómo se calcula el precio exacto?", a: "El precio depende del número de referencias y del número de locales. Solicita una propuesta personalizada y te enviamos un presupuesto claro en 24h." },
    { q: "¿Puedo probar Winerim antes de contratar?", a: "Sí. Ofrecemos un análisis gratuito de tu carta de vinos y una demo personalizada con tu carta real." },
  ],
  ctaBadge: "Da el paso",
  ctaTitle: "Descubre cuánto más podrías vender con tu <em>carta de vinos</em>",
  ctaSub: "Demo personalizada con tu carta real. Sin compromiso. En 15 minutos entenderás el potencial.",
  ctaBtn: "Solicitar demo",
  ctaBtn2: "Analizar mi carta gratis",
};

i18n.es = ES_CONTENT;

/* EN */
i18n.en = {
  seo_title: "Winerim Plans & Pricing | Wine List Software for Restaurants",
  seo_desc: "Find the right Winerim plan for your restaurant, hotel or group. No lock-in, 48h setup, dedicated support.",
  breadcrumb: "Pricing",
  badge: "Plans and pricing",
  title: "Winerim plans & pricing — Choose the right fit for your <em>business</em>",
  subtitle: "No lock-in. 48h setup. Dedicated support included on every plan.",
  valuePillars: [
    { icon: "clock", text: "Up and running in under 48 hours" },
    { icon: "shield", text: "No lock-in or penalties" },
    { icon: "headphones", text: "Human support on every plan" },
    { icon: "puzzle", text: "Compatible with any POS" },
  ],
  whoTitle: "Which plan fits <em>your business</em>?",
  whoSubtitle: "Winerim serves very different profiles. Find yours.",
  profiles: [
    { icon: "store", name: "Independent restaurant", plan: "Starter or Pro", desc: "80–150 references. You need visibility and control without complexity." },
    { icon: "chef", name: "Fine dining restaurant", plan: "Pro", desc: "Extensive list, pairings, by-the-glass. You need smart recommendations and analytics." },
    { icon: "hotel", name: "Hotel with F&B", plan: "Pro or Enterprise", desc: "Multiple outlets, room service, bar. You need consistency and reporting." },
    { icon: "wine", name: "Wine Bar / Enoteca", plan: "Pro", desc: "High glass rotation, shrinkage management, dynamic list. You need fine control over by-the-glass service and profitability." },
    { icon: "building", name: "Restaurant group", plan: "Enterprise", desc: "Multi-location, centralized governance, unit benchmarking and progressive rollout." },
  ],
  plansTitle: "Compare the <em>plans</em>",
  plansBadge: "Clear structure",
  plans: [
    {
      name: "Starter", badge: "LEGACY PLAN", tagline: "Your list, digitized and professional",
      solves: "Solves: static lists, scattered info, poor wine image.",
      fits: "For legacy clients and restaurants with simple operations.",
      features: ["Interactive digital wine list with filters", "Complete wine profiles with photo & notes", "Custom QR for dining room", "Mobile access for diners", "Simple management panel", "Basic support"],
      notIncluded: ["Advanced wine analytics", "Pricing & margin optimization", "Wine Mapping", "Rotation & dead stock alerts", "Multi-location", "Purchasing intelligence"],
    },
    {
      name: "Pro", badge: "INCLUDES WINERIM CORE ESSENTIALS", tagline: "Analyse better. Sell better.", popular: true,
      solves: "Solves: low average ticket, slow rotation, weak pricing, uninformed decisions.",
      fits: "For ambitious restaurants with depth and operations ready to truly optimize.",
      features: ["Everything in Starter", "Real-time wine sales analytics", "Pricing & margin optimization", "Interactive Wine Mapping", "Wine comparator for diners", "By-the-glass optimization", "Rotation & dead stock alerts", "Basic list health", "Basic contextual smart recommendations", "Priority support"],
      notIncluded: ["Centralized multi-location", "Cross-unit benchmarking", "Full Dynamic Intelligence", "Full Winerim Supply", "Advanced POS/PMS integrations", "Executive reporting"],
    },
    {
      name: "Enterprise", badge: "INCLUDES CORE FULL + DYNAMIC + SUPPLY", tagline: "Govern sales, purchasing and assortment with full intelligence",
      solves: "Solves: inconsistency across locations, no benchmarking, weak purchasing decisions, assortment drift and fragmented reporting.",
      fits: "For restaurant groups, hotel chains and multi-unit operations.",
      features: ["Everything in Pro", "Winerim Core Full", "Full Dynamic Intelligence", "Full Winerim Supply", "Centralized multi-location", "Cross-unit benchmarking", "Advanced POS & PMS integrations", "Consolidated analytics & executive reporting", "Progressive rollout by cluster or unit", "Custom API", "Dedicated onboarding with training", "Assigned account manager", "Guaranteed SLA"],
      notIncluded: [],
    },
  ],
  pricingNote: "Winerim pricing adapts to the number of references and locations. Request a personalized quote with no commitment.",
  compTitle: "What each <em>plan</em> includes",
  compBadge: "Strategic comparison",
  compCategories: [
    { name: "List & guest experience", rows: [
      { feature: "Interactive digital list with filters & QR", starter: true, pro: true, enterprise: true },
      { feature: "Complete wine profiles", starter: true, pro: true, enterprise: true },
      { feature: "Wine comparator & pairings", starter: false, pro: true, enterprise: true },
    ]},
    { name: "Product intelligence", rows: [
      { feature: "Sales analytics & pricing", starter: false, pro: true, enterprise: true },
      { feature: "Wine Mapping & list health", starter: false, pro: "Essential", enterprise: "Full" },
      { feature: "Rotation & dead stock alerts", starter: false, pro: true, enterprise: true },
      { feature: "Dynamic Intelligence (RIMs™)", starter: false, pro: false, enterprise: true },
      { feature: "Purchasing intelligence (Supply)", starter: false, pro: false, enterprise: true },
    ]},
    { name: "Operations & support", rows: [
      { feature: "Multi-location & benchmarking", starter: false, pro: false, enterprise: true },
      { feature: "POS / PMS integrations & API", starter: false, pro: false, enterprise: true },
      { feature: "Priority support", starter: false, pro: true, enterprise: true },
      { feature: "Onboarding, account manager & SLA", starter: false, pro: false, enterprise: true },
    ]},
  ],
  roiTitle: "Estimated impact per <em>plan</em>",
  roiBadge: "Indicative ROI",
  roiNote: "Based on active client experience. Actual impact depends on starting point, list and restaurant profile.",
  roi: [
    { plan: "Starter", metric: "Visibility", value: "Professional online list", desc: "Guests explore your full list and understand your wine proposition." },
    { plan: "Pro", metric: "Profitability", value: "+15–25 % wine ticket", desc: "Optimized pricing, smart by-the-glass and recommendations that raise the ticket." },
    { plan: "Enterprise", metric: "Governance", value: "+20–35 % group net margin", desc: "Centralized purchasing, assortment and cross-unit benchmarking control." },
  ],
  layerTitle: "Which intelligence layer each <em>plan</em> includes",
  layerBadge: "Layer architecture",
  layers: [
    { plan: "Starter", stack: ["Digital List"], desc: "Professional digitization without analytics." },
    { plan: "Pro", stack: ["Digital List", "Core Essentials"], desc: "Analysis, pricing and wine optimization." },
    { plan: "Enterprise", stack: ["Digital List", "Core Full", "Dynamic Intelligence", "Supply"], desc: "Full suite: analyse, act and buy better." },
  ],
  objectionsTitle: "What people ask <em>before starting</em>", objectionsBadge: "Frictionless",
  objections: [
    { icon: "clock", title: "How long does implementation take?", answer: "Most restaurants are live in under 48 hours. We upload your list, configure filters and personalize the experience." },
    { icon: "graduation", title: "Do I need a sommelier?", answer: "No. Winerim includes automatic pairings, smart recommendations and complete profiles. Your team can recommend wine confidently." },
    { icon: "puzzle", title: "Compatible with my POS/PMS?", answer: "Yes. Winerim integrates with major POS and hotel management systems. Enterprise offers custom integrations via API." },
    { icon: "headphones", title: "What support is included?", answer: "All plans include human support. Pro adds priority, Enterprise includes a dedicated account manager with guaranteed SLA." },
    { icon: "trending", title: "How much can I improve sales?", answer: "Depends on your starting point. Our clients improve reference exploration, optimize margins and reduce dead stock. Impact is measured in weeks." },
    { icon: "shield", title: "Can I customize the look?", answer: "Yes. The digital list adapts to your brand: colors, logo, typography and visual style." },
  ],
  commonTitle: "What's included in <em>every</em> plan?",
  commonFeatures: [
    "Interactive digital wine list accessible from any device",
    "Custom QR codes for every table or service point",
    "Complete wine profiles with photo, notes and descriptors",
    "Management panel to update your list in real time",
    "Dedicated human support (no chatbots)",
    "No lock-in or cancellation penalties",
    "Setup in under 48 hours",
    "Compatible with any POS system",
  ],
  helpTitle: "Not sure? <em>We'll help</em> you choose",
  helpDesc: "Tell us about your situation and we'll recommend the plan that best fits your restaurant, hotel or group. No commitment.",
  helpCta: "Talk to an advisor",
  faqs: [
    { q: "Is there a lock-in period?", a: "No. Cancel anytime, no penalties or fine print." },
    { q: "How long does implementation take?", a: "Most restaurants are live in under 48 hours. We upload your list, configure filters and personalize the experience." },
    { q: "Can I change plans later?", a: "Yes. Scale from Starter to Pro or Enterprise anytime with no service interruption." },
    { q: "Is there an annual discount?", a: "Yes. We offer special terms for annual commitments. Request a personalized proposal for details." },
    { q: "What happens if I cancel?", a: "Your list goes offline, but we keep your data for 90 days in case you return. No penalties." },
    { q: "Is support included?", a: "All plans include human support. Pro adds priority and Enterprise includes a dedicated account manager with guaranteed SLA." },
    { q: "How is pricing calculated?", a: "Based on number of references and locations. Request a quote and receive a clear proposal in 24h." },
    { q: "Can I try before subscribing?", a: "Yes. We offer a free wine list analysis and a personalized demo with your actual list." },
  ],
  ctaBadge: "Take the step",
  ctaTitle: "Discover how much more you could sell with your <em>wine list</em>",
  ctaSub: "Personalized demo with your actual list. No commitment. 15 minutes to understand the potential.",
  ctaBtn: "Request demo",
  ctaBtn2: "Analyze my list free",
};

/* IT */
i18n.it = {
  seo_title: "Piani e Prezzi Winerim | Software Carta dei Vini per Ristoranti",
  seo_desc: "Trova il piano Winerim giusto per il tuo ristorante, hotel o gruppo. Senza vincoli, attivazione in 48h e supporto dedicato.",
  breadcrumb: "Prezzi",
  badge: "Piani e prezzi",
  title: "Piani e prezzi di Winerim — Scegli quello giusto per il tuo <em>business</em>",
  subtitle: "Senza vincoli. Attivazione in 48h. Supporto dedicato incluso in ogni piano.",
  valuePillars: [
    { icon: "clock", text: "Operativo in meno di 48 ore" },
    { icon: "shield", text: "Senza vincoli né penali" },
    { icon: "headphones", text: "Supporto umano in ogni piano" },
    { icon: "puzzle", text: "Compatibile con qualsiasi POS" },
  ],
  whoTitle: "Quale piano è adatto al <em>tuo business</em>?",
  whoSubtitle: "Winerim serve profili molto diversi. Trova il tuo.",
  profiles: [
    { icon: "store", name: "Ristorante indipendente", plan: "Starter o Pro", desc: "Carta di 80–150 referenze. Hai bisogno di visibilità e controllo senza complessità." },
    { icon: "chef", name: "Ristorante gastronomico", plan: "Pro", desc: "Carta ampia e complessa, abbinamenti, vino al calice. Hai bisogno di raccomandazioni intelligenti e analisi." },
    { icon: "hotel", name: "Hotel con F&B", plan: "Pro o Enterprise", desc: "Più punti vendita, room service, bar. Hai bisogno di coerenza e reportistica." },
    { icon: "wine", name: "Wine Bar / Enoteca", plan: "Pro", desc: "Alta rotazione al calice, gestione perdite, carta dinamica. Hai bisogno di controllo fine del servizio al calice e redditività." },
    { icon: "building", name: "Gruppo di ristorazione", plan: "Enterprise", desc: "Multi-locale, governance centralizzata, benchmark tra unità e roll-out progressivo." },
  ],
  plansTitle: "Confronta i <em>piani</em>",
  plansBadge: "Struttura chiara",
  plans: [
    {
      name: "Starter", badge: "PIANO LEGACY", tagline: "La tua carta, digitalizzata e professionale",
      solves: "Risolve: carta statica, informazioni disperse, immagine scadente del vino.",
      fits: "Per clienti legacy e ristoranti con operatività semplice.",
      features: ["Carta digitale interattiva con filtri", "Schede vino complete con foto e note", "QR personalizzato per la sala", "Accesso da mobile del commensale", "Pannello di gestione semplice", "Supporto base"],
      notIncluded: ["Analisi avanzata del vino", "Ottimizzazione prezzi e margini", "Wine Mapping", "Avvisi rotazione e stock morto", "Multi-locale", "Intelligenza acquisti"],
    },
    {
      name: "Pro", badge: "INCLUDE WINERIM CORE ESSENTIALS", tagline: "Analizza meglio. Vendi meglio.", popular: true,
      solves: "Risolve: scontrino medio basso, rotazione lenta, pricing debole, decisioni poco informate.",
      fits: "Per ristoranti ambiziosi, carte con profondità e operazioni che vogliono davvero ottimizzare.",
      features: ["Tutto del piano Starter", "Analisi vendite vino in tempo reale", "Ottimizzazione prezzi e margini", "Wine Mapping interattivo", "Comparatore vini per il commensale", "Ottimizzazione vino al calice", "Avvisi rotazione e stock morto", "Salute base della carta", "Raccomandazioni intelligenti contestuali base", "Supporto prioritario"],
      notIncluded: ["Multi-locale centralizzato", "Benchmark tra unità", "Intelligenza Dinamica completa", "Winerim Supply completo", "Integrazioni POS/PMS avanzate", "Reportistica esecutiva"],
    },
    {
      name: "Enterprise", badge: "INCLUDE CORE FULL + DINAMICA + SUPPLY", tagline: "Governa vendita, acquisti e assortimento con intelligenza completa",
      solves: "Risolve: incoerenza tra locali, assenza di benchmark, decisioni di acquisto deboli, scontrollo assortimento e reporting frammentato.",
      fits: "Per gruppi di ristorazione, catene alberghiere e operazioni multi-unità.",
      features: ["Tutto del piano Pro", "Winerim Core Full", "Intelligenza Dinamica completa", "Winerim Supply completo", "Multi-locale centralizzato", "Benchmark tra unità", "Integrazioni POS e PMS avanzate", "Analisi consolidata e reportistica esecutiva", "Roll-out progressivo per cluster o unità", "API personalizzata", "Onboarding dedicato con formazione", "Account manager assegnato", "SLA garantito"],
      notIncluded: [],
    },
  ],
  pricingNote: "I prezzi di Winerim si adattano al numero di referenze della carta e al numero di locali. Richiedi una proposta personalizzata senza impegno.",
  compTitle: "Cosa include ogni <em>piano</em>",
  compBadge: "Confronto strategico",
  compCategories: [
    { name: "Carta ed esperienza del commensale", rows: [
      { feature: "Carta digitale interattiva con filtri e QR", starter: true, pro: true, enterprise: true },
      { feature: "Schede vino complete", starter: true, pro: true, enterprise: true },
      { feature: "Comparatore vini e abbinamenti", starter: false, pro: true, enterprise: true },
    ]},
    { name: "Intelligenza di prodotto", rows: [
      { feature: "Analisi vendite e pricing", starter: false, pro: true, enterprise: true },
      { feature: "Wine Mapping e salute carta", starter: false, pro: "Essenziale", enterprise: "Completo" },
      { feature: "Avvisi rotazione e stock morto", starter: false, pro: true, enterprise: true },
      { feature: "Intelligenza Dinamica (RIMs™)", starter: false, pro: false, enterprise: true },
      { feature: "Intelligenza acquisti (Supply)", starter: false, pro: false, enterprise: true },
    ]},
    { name: "Operazioni e supporto", rows: [
      { feature: "Multi-locale e benchmark", starter: false, pro: false, enterprise: true },
      { feature: "Integrazioni POS / PMS e API", starter: false, pro: false, enterprise: true },
      { feature: "Supporto prioritario", starter: false, pro: true, enterprise: true },
      { feature: "Onboarding, account manager e SLA", starter: false, pro: false, enterprise: true },
    ]},
  ],
  roiTitle: "Impatto stimato per <em>piano</em>",
  roiBadge: "ROI indicativo",
  roiNote: "Dati basati sull'esperienza con clienti attivi. L'impatto reale dipende dal punto di partenza, dalla carta e dal profilo del ristorante.",
  roi: [
    { plan: "Starter", metric: "Visibilità", value: "Carta professionale online", desc: "Il commensale esplora la tua carta completa e comprende la tua proposta enologica." },
    { plan: "Pro", metric: "Redditività", value: "+15–25 % scontrino medio vino", desc: "Pricing ottimizzato, calice intelligente e raccomandazioni che alzano lo scontrino." },
    { plan: "Enterprise", metric: "Governance", value: "+20–35 % margine netto gruppo", desc: "Controllo centralizzato acquisti, assortimento e benchmark tra unità." },
  ],
  layerTitle: "Quale livello di intelligenza include ogni <em>piano</em>",
  layerBadge: "Architettura a livelli",
  layers: [
    { plan: "Starter", stack: ["Carta Digitale"], desc: "Digitalizzazione professionale senza analisi." },
    { plan: "Pro", stack: ["Carta Digitale", "Core Essentials"], desc: "Analisi, pricing e ottimizzazione del vino." },
    { plan: "Enterprise", stack: ["Carta Digitale", "Core Full", "Intelligenza Dinamica", "Supply"], desc: "Suite completa: analizza, agisci e compra meglio." },
  ],
  objectionsTitle: "Cosa ci chiedono <em>prima di iniziare</em>",
  objectionsBadge: "Senza frizioni",
  objections: [
    { icon: "clock", title: "Quanto tempo richiede l'implementazione?", answer: "La maggior parte dei ristoranti è operativa in meno di 48 ore. Carichiamo la tua carta, configuriamo i filtri e personalizziamo l'esperienza." },
    { icon: "graduation", title: "Serve un sommelier in organico?", answer: "No. Winerim include abbinamenti automatici, raccomandazioni intelligenti e schede complete. Il tuo team di sala può consigliare vino con sicurezza." },
    { icon: "puzzle", title: "È compatibile con il mio POS o PMS?", answer: "Sì. Winerim si integra con i principali sistemi POS e gestionali alberghieri. Il piano Enterprise offre integrazioni personalizzate via API." },
    { icon: "headphones", title: "Quale supporto è incluso?", answer: "Tutti i piani includono supporto umano. Pro aggiunge priorità, Enterprise include un account manager dedicato con SLA garantito." },
    { icon: "trending", title: "Quanto posso migliorare le vendite?", answer: "Dipende dal tuo punto di partenza. I nostri clienti migliorano l'esplorazione delle referenze, ottimizzano i margini e riducono lo stock morto. L'impatto si misura in settimane." },
    { icon: "shield", title: "Posso personalizzare l'aspetto?", answer: "Sì. La carta digitale si adatta al tuo brand: colori, logo, tipografia e stile visivo." },
  ],
  commonTitle: "Cosa include <em>ogni</em> piano?",
  commonFeatures: [
    "Carta digitale interattiva accessibile da qualsiasi dispositivo",
    "Codici QR personalizzati per ogni tavolo o punto di servizio",
    "Schede vino complete con foto, note e descrittori",
    "Pannello di gestione per aggiornare la carta in tempo reale",
    "Supporto umano dedicato (niente chatbot)",
    "Senza vincoli né penali di cancellazione",
    "Attivazione in meno di 48 ore",
    "Compatibile con qualsiasi sistema POS",
  ],
  helpTitle: "Non sei sicuro? <em>Ti aiutiamo</em> a scegliere",
  helpDesc: "Raccontaci la tua situazione e ti consiglieremo il piano più adatto al tuo ristorante, hotel o gruppo. Senza impegno.",
  helpCta: "Parla con un consulente",
  faqs: [
    { q: "C'è un vincolo di permanenza?", a: "No. Puoi cancellare quando vuoi, senza penali né clausole nascoste." },
    { q: "Quanto tempo richiede l'implementazione?", a: "La maggior parte dei ristoranti è operativa in meno di 48 ore. Carichiamo la tua carta, configuriamo i filtri e personalizziamo l'esperienza." },
    { q: "Posso cambiare piano dopo?", a: "Sì. Puoi passare da Starter a Pro o da Pro a Enterprise in qualsiasi momento. Senza interruzioni." },
    { q: "C'è uno sconto annuale?", a: "Sì. Offriamo condizioni speciali per impegni annuali. Richiedi una proposta personalizzata per i dettagli." },
    { q: "Cosa succede se cancello?", a: "La tua carta va offline, ma conserviamo i tuoi dati per 90 giorni nel caso tu voglia tornare. Senza penali." },
    { q: "Il supporto è incluso?", a: "Tutti i piani includono supporto umano. Pro aggiunge priorità, Enterprise include un account manager dedicato con SLA garantito." },
    { q: "Come si calcola il prezzo esatto?", a: "Il prezzo dipende dal numero di referenze e dal numero di locali. Richiedi un preventivo e ricevi una proposta chiara in 24h." },
    { q: "Posso provare prima di acquistare?", a: "Sì. Offriamo un'analisi gratuita della tua carta dei vini e una demo personalizzata con la tua carta reale." },
  ],
  ctaBadge: "Fai il passo",
  ctaTitle: "Scopri quanto potresti vendere di più con la tua <em>carta dei vini</em>",
  ctaSub: "Demo personalizzata con la tua carta reale. Senza impegno. In 15 minuti capirai il potenziale.",
  ctaBtn: "Richiedi demo",
  ctaBtn2: "Analizza la mia carta gratis",
};

/* FR */
i18n.fr = {
  seo_title: "Plans et Tarifs Winerim | Logiciel Carte des Vins pour Restaurants",
  seo_desc: "Trouvez le plan Winerim adapté à votre restaurant, hôtel ou groupe. Sans engagement, mise en place en 48h et support dédié.",
  breadcrumb: "Tarifs",
  badge: "Plans et tarifs",
  title: "Plans et tarifs Winerim — Choisissez celui qui convient à votre <em>établissement</em>",
  subtitle: "Sans engagement. Mise en place en 48h. Support dédié inclus dans tous les plans.",
  valuePillars: [
    { icon: "clock", text: "Opérationnel en moins de 48 heures" },
    { icon: "shield", text: "Sans engagement ni pénalités" },
    { icon: "headphones", text: "Support humain sur chaque plan" },
    { icon: "puzzle", text: "Compatible avec n'importe quel POS" },
  ],
  whoTitle: "Quel plan correspond à <em>votre établissement</em> ?",
  whoSubtitle: "Winerim sert des profils très différents. Trouvez le vôtre.",
  profiles: [
    { icon: "store", name: "Restaurant indépendant", plan: "Starter ou Pro", desc: "Carte de 80–150 références. Vous avez besoin de visibilité et de contrôle sans complexité." },
    { icon: "chef", name: "Restaurant gastronomique", plan: "Pro", desc: "Carte étendue, accords, vin au verre. Vous avez besoin de recommandations intelligentes et d'analytique." },
    { icon: "hotel", name: "Hôtel avec F&B", plan: "Pro ou Enterprise", desc: "Plusieurs points de vente, room service, bar. Vous avez besoin de cohérence et de reporting." },
    { icon: "wine", name: "Wine Bar / Enoteca", plan: "Pro", desc: "Forte rotation au verre, gestion des pertes, carte dynamique. Vous avez besoin d'un contrôle fin du service au verre et de la rentabilité." },
    { icon: "building", name: "Groupe de restauration", plan: "Enterprise", desc: "Multi-sites, gouvernance centralisée, benchmarking inter-unités et déploiement progressif." },
  ],
  plansTitle: "Comparez les <em>plans</em>",
  plansBadge: "Structure claire",
  plans: [
    {
      name: "Starter", badge: "PLAN LEGACY", tagline: "Votre carte, numérisée et professionnelle",
      solves: "Résout : carte statique, informations dispersées, image médiocre du vin.",
      fits: "Pour les clients legacy et les restaurants à fonctionnement simple.",
      features: ["Carte digitale interactive avec filtres", "Fiches vin complètes avec photo et notes", "QR personnalisé pour la salle", "Accès mobile du convive", "Panneau de gestion simple", "Support basique"],
      notIncluded: ["Analytique avancée du vin", "Optimisation prix et marges", "Wine Mapping", "Alertes rotation et stock mort", "Multi-sites", "Intelligence achats"],
    },
    {
      name: "Pro", badge: "INCLUT WINERIM CORE ESSENTIALS", tagline: "Analysez mieux. Vendez mieux.", popular: true,
      solves: "Résout : ticket moyen bas, rotation lente, pricing faible, décisions peu informées.",
      fits: "Pour les restaurants ambitieux, cartes en profondeur et opérations prêtes à vraiment optimiser.",
      features: ["Tout du plan Starter", "Analytique des ventes de vin en temps réel", "Optimisation des prix et marges", "Wine Mapping interactif", "Comparateur de vins pour le convive", "Optimisation du vin au verre", "Alertes de rotation et stock mort", "Santé basique de la carte", "Recommandations intelligentes contextuelles basiques", "Support prioritaire"],
      notIncluded: ["Multi-sites centralisé", "Benchmarking inter-unités", "Intelligence Dynamique complète", "Winerim Supply complet", "Intégrations POS/PMS avancées", "Reporting exécutif"],
    },
    {
      name: "Enterprise", badge: "INCLUT CORE FULL + DYNAMIQUE + SUPPLY", tagline: "Gouvernez vente, achats et assortiment avec une intelligence complète",
      solves: "Résout : incohérence entre sites, absence de benchmarking, décisions d'achat faibles, dérive d'assortiment et reporting fragmenté.",
      fits: "Pour les groupes de restauration, chaînes hôtelières et opérations multi-unités.",
      features: ["Tout du plan Pro", "Winerim Core Full", "Intelligence Dynamique complète", "Winerim Supply complet", "Multi-sites centralisé", "Benchmarking inter-unités", "Intégrations POS et PMS avancées", "Analytique consolidée et reporting exécutif", "Déploiement progressif par cluster ou unité", "API personnalisée", "Onboarding dédié avec formation", "Account manager assigné", "SLA garanti"],
      notIncluded: [],
    },
  ],
  pricingNote: "Les prix de Winerim s'adaptent au nombre de références de votre carte et au nombre de sites. Demandez une proposition personnalisée sans engagement.",
  compTitle: "Ce que chaque <em>plan</em> inclut",
  compBadge: "Comparaison stratégique",
  compCategories: [
    { name: "Carte et expérience convive", rows: [
      { feature: "Carte digitale interactive avec filtres et QR", starter: true, pro: true, enterprise: true },
      { feature: "Fiches vin complètes", starter: true, pro: true, enterprise: true },
      { feature: "Comparateur de vins et accords", starter: false, pro: true, enterprise: true },
    ]},
    { name: "Intelligence produit", rows: [
      { feature: "Analytique ventes et pricing", starter: false, pro: true, enterprise: true },
      { feature: "Wine Mapping et santé carte", starter: false, pro: "Essentiel", enterprise: "Complet" },
      { feature: "Alertes rotation et stock mort", starter: false, pro: true, enterprise: true },
      { feature: "Intelligence Dynamique (RIMs™)", starter: false, pro: false, enterprise: true },
      { feature: "Intelligence achats (Supply)", starter: false, pro: false, enterprise: true },
    ]},
    { name: "Opérations et support", rows: [
      { feature: "Multi-sites et benchmarking", starter: false, pro: false, enterprise: true },
      { feature: "Intégrations POS / PMS et API", starter: false, pro: false, enterprise: true },
      { feature: "Support prioritaire", starter: false, pro: true, enterprise: true },
      { feature: "Onboarding, account manager et SLA", starter: false, pro: false, enterprise: true },
    ]},
  ],
  roiTitle: "Impact estimé par <em>plan</em>",
  roiBadge: "ROI indicatif",
  roiNote: "Données basées sur l'expérience avec des clients actifs. L'impact réel dépend du point de départ, de la carte et du profil du restaurant.",
  roi: [
    { plan: "Starter", metric: "Visibilité", value: "Carte professionnelle en ligne", desc: "Le convive explore votre carte complète et comprend votre proposition de vins." },
    { plan: "Pro", metric: "Rentabilité", value: "+15–25 % ticket moyen vin", desc: "Pricing optimisé, verre intelligent et recommandations qui augmentent le ticket." },
    { plan: "Enterprise", metric: "Gouvernance", value: "+20–35 % marge nette groupe", desc: "Contrôle centralisé des achats, assortiment et benchmarking inter-unités." },
  ],
  layerTitle: "Quelle couche d'intelligence chaque <em>plan</em> inclut",
  layerBadge: "Architecture en couches",
  layers: [
    { plan: "Starter", stack: ["Carte Digitale"], desc: "Numérisation professionnelle sans analytique." },
    { plan: "Pro", stack: ["Carte Digitale", "Core Essentials"], desc: "Analyse, pricing et optimisation du vin." },
    { plan: "Enterprise", stack: ["Carte Digitale", "Core Full", "Intelligence Dynamique", "Supply"], desc: "Suite complète : analyser, agir et mieux acheter." },
  ],
  objectionsTitle: "Ce qu'on nous demande <em>avant de commencer</em>",
  objectionsBadge: "Sans friction",
  objections: [
    { icon: "clock", title: "Combien de temps prend l'implémentation ?", answer: "La plupart des restaurants sont opérationnels en moins de 48 heures. Nous chargeons votre carte, configurons les filtres et personnalisons l'expérience." },
    { icon: "graduation", title: "Faut-il un sommelier ?", answer: "Non. Winerim inclut des accords automatiques, des recommandations intelligentes et des fiches complètes. Votre équipe peut recommander du vin en toute confiance." },
    { icon: "puzzle", title: "Compatible avec mon POS/PMS ?", answer: "Oui. Winerim s'intègre aux principaux systèmes POS et de gestion hôtelière. Enterprise propose des intégrations personnalisées via API." },
    { icon: "headphones", title: "Quel support est inclus ?", answer: "Tous les plans incluent un support humain. Pro ajoute la priorité, Enterprise inclut un account manager dédié avec SLA garanti." },
    { icon: "trending", title: "De combien puis-je améliorer mes ventes ?", answer: "Cela dépend de votre point de départ. Nos clients améliorent l'exploration des références, optimisent les marges et réduisent le stock mort. L'impact se mesure en semaines." },
    { icon: "shield", title: "Puis-je personnaliser l'apparence ?", answer: "Oui. La carte digitale s'adapte à votre marque : couleurs, logo, typographie et style visuel." },
  ],
  commonTitle: "Qu'est-ce qui est inclus dans <em>tous</em> les plans ?",
  commonFeatures: [
    "Carte digitale interactive accessible depuis n'importe quel appareil",
    "Codes QR personnalisés pour chaque table ou point de service",
    "Fiches vin complètes avec photo, notes et descripteurs",
    "Panneau de gestion pour mettre à jour votre carte en temps réel",
    "Support humain dédié (pas de chatbots)",
    "Sans engagement ni pénalités d'annulation",
    "Mise en place en moins de 48 heures",
    "Compatible avec n'importe quel système POS",
  ],
  helpTitle: "Pas sûr ? <em>Nous vous aidons</em> à choisir",
  helpDesc: "Décrivez votre situation et nous vous recommanderons le plan le plus adapté à votre restaurant, hôtel ou groupe. Sans engagement.",
  helpCta: "Parler à un conseiller",
  faqs: [
    { q: "Y a-t-il un engagement ?", a: "Non. Annulez quand vous voulez, sans pénalités ni petites lignes." },
    { q: "Combien de temps prend la mise en place ?", a: "La plupart des restaurants sont opérationnels en moins de 48 heures. Nous chargeons votre carte, configurons les filtres et personnalisons l'expérience." },
    { q: "Puis-je changer de plan après ?", a: "Oui. Passez de Starter à Pro ou Enterprise à tout moment, sans interruption de service." },
    { q: "Y a-t-il une remise annuelle ?", a: "Oui. Nous proposons des conditions spéciales pour les engagements annuels. Demandez une proposition personnalisée pour les détails." },
    { q: "Que se passe-t-il si j'annule ?", a: "Votre carte passe hors ligne, mais nous conservons vos données 90 jours au cas où vous reviendriez. Sans pénalités." },
    { q: "Le support est-il inclus ?", a: "Tous les plans incluent un support humain. Pro ajoute la priorité, Enterprise inclut un account manager dédié avec SLA garanti." },
    { q: "Comment le prix exact est-il calculé ?", a: "Le prix dépend du nombre de références et de sites. Demandez un devis et recevez une proposition claire en 24h." },
    { q: "Puis-je essayer avant de m'abonner ?", a: "Oui. Nous proposons une analyse gratuite de votre carte des vins et une démo personnalisée avec votre carte réelle." },
  ],
  ctaBadge: "Passez à l'action",
  ctaTitle: "Découvrez combien vous pourriez vendre de plus avec votre <em>carte des vins</em>",
  ctaSub: "Démo personnalisée avec votre carte réelle. Sans engagement. En 15 minutes, comprenez le potentiel.",
  ctaBtn: "Demander une démo",
  ctaBtn2: "Analyser ma carte gratuitement",
};

/* ─── icon lookup ─── */
const iconMap: Record<string, typeof Wine> = {
  clock: Clock, shield: Shield, headphones: Headphones, puzzle: Puzzle,
  graduation: GraduationCap, trending: TrendingUp, store: Store,
  chef: ChefHat, hotel: Hotel, building: Building2, wine: Wine,
};
const planIcons = [Zap, Crown, Building2];

/* Per-plan positioning + layer badges */
const planPositioning: Record<string, { line: string; badge: string; badgeColor: string; link: string }[]> = {
  es: [
    { line: "Para digitalizar la carta y mantener una base profesional", badge: "Plan legacy", badgeColor: "text-muted-foreground border-border bg-muted/30", link: "/producto/winerim-core" },
    { line: "Para analizar, optimizar y decidir mejor con Winerim Core Essentials", badge: "Incluye Winerim Core Essentials", badgeColor: "text-wine border-wine/25 bg-wine/5", link: "/producto/winerim-core" },
    { line: "Para gobernar venta, compra y surtido con Winerim Intelligence Suite", badge: "Core Full + Dinámica + Supply", badgeColor: "text-emerald-500 border-emerald-500/25 bg-emerald-500/5", link: "/producto/winerim-supply" },
  ],
  en: [
    { line: "To digitize your list and maintain a professional base", badge: "Legacy plan", badgeColor: "text-muted-foreground border-border bg-muted/30", link: "/producto/winerim-core" },
    { line: "To analyse, optimize and decide better with Winerim Core Essentials", badge: "Includes Winerim Core Essentials", badgeColor: "text-wine border-wine/25 bg-wine/5", link: "/producto/winerim-core" },
    { line: "To govern sales, purchasing and assortment with Winerim Intelligence Suite", badge: "Core Full + Dynamic + Supply", badgeColor: "text-emerald-500 border-emerald-500/25 bg-emerald-500/5", link: "/producto/winerim-supply" },
  ],
  it: [
    { line: "Per digitalizzare la carta e mantenere una base professionale", badge: "Piano legacy", badgeColor: "text-muted-foreground border-border bg-muted/30", link: "/producto/winerim-core" },
    { line: "Per analizzare, ottimizzare e decidere meglio con Winerim Core Essentials", badge: "Include Winerim Core Essentials", badgeColor: "text-wine border-wine/25 bg-wine/5", link: "/producto/winerim-core" },
    { line: "Per governare vendita, acquisti e assortimento con Winerim Intelligence Suite", badge: "Core Full + Dinamica + Supply", badgeColor: "text-emerald-500 border-emerald-500/25 bg-emerald-500/5", link: "/producto/winerim-supply" },
  ],
  fr: [
    { line: "Pour numériser la carte et maintenir une base professionnelle", badge: "Plan legacy", badgeColor: "text-muted-foreground border-border bg-muted/30", link: "/producto/winerim-core" },
    { line: "Pour analyser, optimiser et mieux décider avec Winerim Core Essentials", badge: "Inclut Winerim Core Essentials", badgeColor: "text-wine border-wine/25 bg-wine/5", link: "/producto/winerim-core" },
    { line: "Pour gouverner vente, achats et assortiment avec Winerim Intelligence Suite", badge: "Core Full + Dynamique + Supply", badgeColor: "text-emerald-500 border-emerald-500/25 bg-emerald-500/5", link: "/producto/winerim-supply" },
  ],
};

/* ─── Cell renderer ─── */
const CellValue = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check size={16} className="text-wine mx-auto" />;
  if (value === false) return <X size={14} className="text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-accent font-medium">{value}</span>;
};

/* Layer stack colors */
const layerColors: Record<string, { bg: string; text: string; border: string }> = {
  "Carta Digital": { bg: "bg-muted/40", text: "text-muted-foreground", border: "border-border" },
  "Digital List": { bg: "bg-muted/40", text: "text-muted-foreground", border: "border-border" },
  "Carte Digitale": { bg: "bg-muted/40", text: "text-muted-foreground", border: "border-border" },
  "Core Essentials": { bg: "bg-wine/10", text: "text-wine", border: "border-wine/25" },
  "Core Full": { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/25" },
  "Inteligencia Dinámica": { bg: "bg-wine/10", text: "text-wine-light", border: "border-wine/25" },
  "Dynamic Intelligence": { bg: "bg-wine/10", text: "text-wine-light", border: "border-wine/25" },
  "Intelligence Dynamique": { bg: "bg-wine/10", text: "text-wine-light", border: "border-wine/25" },
  "Intelligenza Dinamica": { bg: "bg-wine/10", text: "text-wine-light", border: "border-wine/25" },
  "Supply": { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/25" },
};

const getLayerColor = (name: string) => layerColors[name] || { bg: "bg-muted/40", text: "text-muted-foreground", border: "border-border" };

/* ═══════════════════════════════════════════════ */

const Precios = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const c = i18n[lang] || i18n.es;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "precios-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: c.seo_title,
      description: c.seo_desc,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          offerCount: 3,
        },
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("precios-jsonld")?.remove(); };
  }, [c]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/precios" hreflang={allLangPaths("/precios")} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: c.breadcrumb }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{c.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{ __html: em(c.title) }} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            {c.subtitle}
          </motion.p>

          {/* Value pillars strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            {c.valuePillars.map((p, i) => {
              const Icon = iconMap[p.icon] || Shield;
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon size={16} className="text-wine shrink-0" />
                  <span>{p.text}</span>
                </div>
              );
            })}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={localePath("/demo")}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {c.ctaBtn} <ArrowRight size={16} />
            </Link>
            <Link to="/analisis-carta"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {c.ctaBtn2}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT ARCHITECTURE ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-wine/60 mb-4">
              <span className="w-1 h-1 rounded-full bg-wine/50" />
              {lang === "es" ? "Arquitectura de producto" : lang === "it" ? "Architettura di prodotto" : lang === "fr" ? "Architecture produit" : "Product architecture"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
              {lang === "es" ? "Una plataforma, tres capas de " : lang === "it" ? "Una piattaforma, tre livelli di " : lang === "fr" ? "Une plateforme, trois couches de " : "One platform, three layers of "}
              <span className="text-gradient-wine">{lang === "es" ? "valor" : lang === "it" ? "valore" : lang === "fr" ? "valeur" : "value"}</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {lang === "es"
                ? "Winerim combina análisis, ejecución táctica e inteligencia de compras para gestionar mejor todo el negocio del vino."
                : lang === "it"
                ? "Winerim combina analisi, esecuzione tattica e intelligenza degli acquisti per gestire meglio l'intero business del vino."
                : lang === "fr"
                ? "Winerim combine analyse, exécution tactique et intelligence d'achats pour mieux gérer l'ensemble du business du vin."
                : "Winerim combines analytics, tactical execution and purchasing intelligence to better manage every aspect of the wine business."}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-8">
            {[
              {
                name: "Winerim Core",
                verb: lang === "es" ? "Analiza" : lang === "it" ? "Analizza" : lang === "fr" ? "Analyse" : "Analyses",
                description: lang === "es"
                  ? "Pricing, márgenes, stock, arquitectura y benchmark."
                  : lang === "it" ? "Pricing, margini, stock, architettura e benchmark."
                  : lang === "fr" ? "Pricing, marges, stock, architecture et benchmark."
                  : "Pricing, margins, stock, architecture and benchmarking.",
                icon: BarChart3,
                href: "/producto/winerim-core",
                accent: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
              },
              {
                name: lang === "es" ? "Inteligencia Dinámica" : lang === "it" ? "Intelligenza Dinamica" : lang === "fr" ? "Intelligence Dynamique" : "Dynamic Intelligence",
                verb: lang === "es" ? "Actúa" : lang === "it" ? "Agisce" : lang === "fr" ? "Agit" : "Acts",
                description: lang === "es"
                  ? "Actúa sobre la carta en tiempo real según contexto y objetivos."
                  : lang === "it" ? "Agisce sulla carta in tempo reale in base al contesto e agli obiettivi."
                  : lang === "fr" ? "Agit sur la carte en temps réel selon le contexte et les objectifs."
                  : "Acts on the wine list in real time based on context and goals.",
                icon: Zap,
                href: "/producto/inteligencia-dinamica",
                accent: "text-wine",
                bg: "bg-wine/10",
                border: "border-wine/20",
              },
              {
                name: "Winerim Supply",
                verb: lang === "es" ? "Compra mejor" : lang === "it" ? "Compra meglio" : lang === "fr" ? "Achète mieux" : "Buy smarter",
                description: lang === "es"
                  ? "Ayuda a comprar mejor y reponer con más criterio."
                  : lang === "it" ? "Aiuta a comprare meglio e rifornirsi con più criterio."
                  : lang === "fr" ? "Aide à mieux acheter et à réapprovisionner avec plus de critère."
                  : "Helps you buy smarter and restock with better criteria.",
                icon: ShoppingCart,
                href: "/producto/winerim-supply",
                accent: "text-emerald-500",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
            ].map((layer, i) => (
              <ScrollReveal key={layer.name} delay={i * 0.08}>
                <Link
                  to={localePath(layer.href)}
                  className={`group relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl border ${layer.border} bg-card/70 backdrop-blur-sm hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
                >
                  <div className={`w-10 h-10 rounded-lg ${layer.bg} flex items-center justify-center mb-4`}>
                    <layer.icon size={18} className={layer.accent} />
                  </div>
                  <h3 className="font-heading text-sm font-bold tracking-wide uppercase text-foreground mb-1">
                    {layer.name}
                  </h3>
                  <span className={`text-xs font-semibold tracking-widest uppercase ${layer.accent} mb-2`}>
                    {layer.verb}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                  <ArrowRight size={14} className="mt-3 text-muted-foreground group-hover:text-wine transition-colors" />
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom phrase */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground">
              <span className="text-emerald-500">
                {lang === "es" ? "Comprar mejor" : lang === "it" ? "Comprare meglio" : lang === "fr" ? "Acheter mieux" : "Buy smarter"}
              </span>
              <span className="text-border">→</span>
              <span className="text-amber-500">
                {lang === "es" ? "Analizar mejor" : lang === "it" ? "Analizzare meglio" : lang === "fr" ? "Mieux analyser" : "Analyse better"}
              </span>
              <span className="text-border">→</span>
              <span className="text-wine">
                {lang === "es" ? "Vender mejor" : lang === "it" ? "Vendere meglio" : lang === "fr" ? "Mieux vendre" : "Sell better"}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── WHO FITS ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3" dangerouslySetInnerHTML={{ __html: em(c.whoTitle) }} />
            <p className="text-muted-foreground max-w-xl mx-auto">{c.whoSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.profiles.map((p, i) => {
              const Icon = iconMap[p.icon] || Users;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-base mb-0.5">{p.name}</h3>
                        <span className="text-xs font-semibold text-wine tracking-wider uppercase">→ {p.plan}</span>
                        <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-4">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.plansBadge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3" dangerouslySetInnerHTML={{ __html: em(c.plansTitle) }} />
          </ScrollReveal>

          {/* Pricing note */}
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <div className="bg-gradient-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">{c.pricingNote}</p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {c.plans.map((plan, i) => {
              const Icon = planIcons[i];
              const highlight = plan.popular;
              const isLegacy = i === 0;
              const isEnterprise = i === 2;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`relative rounded-2xl border p-7 md:p-8 h-full flex flex-col ${
                    highlight
                      ? "border-wine bg-wine/[0.03] shadow-lg shadow-wine/5 lg:scale-[1.03] lg:-my-2"
                      : isEnterprise
                      ? "border-emerald-500/30 bg-gradient-card"
                      : "border-border/60 bg-gradient-card opacity-90"
                  }`}>
                    {/* Top badge */}
                    {highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full bg-gradient-wine text-primary-foreground text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
                          {lang === "es" ? "Plan comercial" : lang === "it" ? "Piano commerciale" : lang === "fr" ? "Plan commercial" : "Commercial plan"}
                        </span>
                      </div>
                    )}
                    {isEnterprise && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
                          Intelligence Suite
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        highlight ? "bg-wine/15" : isEnterprise ? "bg-emerald-500/10" : "bg-muted/50"
                      }`}>
                        <Icon size={20} className={highlight ? "text-wine" : isEnterprise ? "text-emerald-500" : "text-muted-foreground"} />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                        {isLegacy && (
                          <span className="text-[10px] tracking-widest uppercase text-muted-foreground/60 font-medium">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm font-medium mb-1 ${highlight ? "text-foreground/90" : "text-foreground/70"}`}>{plan.tagline}</p>
                    <p className="text-xs text-muted-foreground italic mb-1">{plan.solves}</p>
                    <p className={`text-xs font-medium mb-3 ${highlight ? "text-wine/80" : isEnterprise ? "text-emerald-500/80" : "text-muted-foreground/70"}`}>{plan.fits}</p>

                    {/* Positioning line + layer badge */}
                    {(() => {
                      const pos = (planPositioning[lang] || planPositioning.es)[i];
                      return (
                        <div className="mb-5 space-y-2">
                          <p className="text-xs text-foreground/70 font-medium leading-relaxed">{pos.line}</p>
                          <Link to={localePath(pos.link)} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase transition-colors hover:opacity-80 ${pos.badgeColor}`}>
                            {pos.badge} <ArrowRight size={10} />
                          </Link>
                        </div>
                      );
                    })()}

                    <ul className="space-y-2 mb-4 flex-1">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <Check size={14} className={`shrink-0 mt-0.5 ${highlight ? "text-wine" : isEnterprise ? "text-emerald-500" : "text-muted-foreground"}`} />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="mb-6 pt-3 border-t border-border/50">
                         <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-2">
                           {lang === "es" ? "No incluido" : lang === "it" ? "Non incluso" : lang === "fr" ? "Non inclus" : "Not included"}
                         </p>
                        <ul className="space-y-1.5">
                          {plan.notIncluded.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2 text-sm">
                              <X size={12} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground/50 text-xs">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      to={i === 2 ? localePath("/contacto") : localePath("/demo")}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${
                        highlight
                          ? "bg-gradient-wine text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-wine/20"
                          : isEnterprise
                          ? "border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-500/50"
                          : "border border-border hover:border-wine/30 hover:bg-wine/5"
                      }`}
                    >
                      {i === 2
                        ? (lang === "es" ? "Contactar" : lang === "it" ? "Contattaci" : lang === "fr" ? "Nous contacter" : "Contact us")
                        : c.ctaBtn
                      } <ArrowRight size={14} />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LAYER ARCHITECTURE ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.layerBadge}</p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: em(c.layerTitle) }} />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {c.layers.map((layer, i) => {
              const isHighlight = i === 1;
              const isEnterprise = i === 2;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`relative rounded-xl border p-6 h-full ${
                    isHighlight ? "border-wine/40 bg-wine/[0.03]" : isEnterprise ? "border-emerald-500/30 bg-emerald-500/[0.02]" : "border-border bg-card/50"
                  }`}>
                    <h3 className={`font-heading text-lg font-bold mb-1 ${
                      isHighlight ? "text-wine" : isEnterprise ? "text-emerald-400" : "text-muted-foreground"
                    }`}>{layer.plan}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{layer.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.stack.map((s, si) => {
                        const col = getLayerColor(s);
                        return (
                          <span key={si} className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wide ${col.bg} ${col.text} ${col.border}`}>
                            {s}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ROI BLOCK ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.roiBadge}</p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: em(c.roiTitle) }} />
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {c.roi.map((r, i) => {
              const isHighlight = i === 1;
              const isEnterprise = i === 2;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`rounded-xl border p-6 text-center ${
                    isHighlight ? "border-wine/30 bg-wine/[0.03]" : isEnterprise ? "border-emerald-500/20 bg-gradient-card" : "border-border bg-gradient-card"
                  }`}>
                    <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase ${
                      isHighlight ? "text-wine" : isEnterprise ? "text-emerald-500" : "text-muted-foreground"
                    }`}>{r.plan} · {r.metric}</span>
                    <p className={`font-heading text-xl md:text-2xl font-bold mt-2 mb-2 ${
                      isHighlight ? "text-wine" : isEnterprise ? "text-emerald-400" : "text-foreground"
                    }`}>{r.value}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-xs text-muted-foreground/60 max-w-2xl mx-auto italic">{c.roiNote}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── COMPARISON TABLE (simplified) ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.compBadge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: em(c.compTitle) }} />
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                     <th className="text-left p-4 font-medium text-muted-foreground w-[40%]">
                       {lang === "es" ? "Funcionalidad" : lang === "it" ? "Funzionalità" : lang === "fr" ? "Fonctionnalité" : "Feature"}
                     </th>
                    {["Starter", "Pro", "Enterprise"].map((name, i) => (
                      <th key={name} className={`p-4 text-center font-heading font-bold ${i === 1 ? "text-wine" : ""}`}>
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.compCategories.map((cat, ci) => (
                    <>
                      <tr key={`cat-${ci}`} className="bg-wine/[0.03]">
                        <td colSpan={4} className="px-4 py-2.5 font-semibold text-xs tracking-widest uppercase text-wine">
                          {cat.name}
                        </td>
                      </tr>
                      {cat.rows.map((row, ri) => (
                        <tr key={`${ci}-${ri}`} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                          <td className="p-3 pl-4 text-muted-foreground">{row.feature}</td>
                          <td className="p-3 text-center"><CellValue value={row.starter} /></td>
                          <td className="p-3 text-center"><CellValue value={row.pro} /></td>
                          <td className="p-3 text-center"><CellValue value={row.enterprise} /></td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── COMMON FEATURES ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: em(c.commonTitle) }} />
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-3">
              {c.commonFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 bg-gradient-card rounded-xl border border-border p-4">
                  <Check size={16} className="text-wine shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HELP CHOOSING ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: em(c.helpTitle) }} />
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{c.helpDesc}</p>
            <Link to={localePath("/contacto")}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {c.helpCta} <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{c.objectionsBadge}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold" dangerouslySetInnerHTML={{ __html: em(c.objectionsTitle) }} />
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {c.objections.map((obj, i) => {
              const Icon = iconMap[obj.icon] || Shield;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm mb-2">{obj.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{obj.answer}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQSection faqs={c.faqs} schemaId="precios" />

      {/* ── FINAL CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{c.ctaBadge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                dangerouslySetInnerHTML={{ __html: em(c.ctaTitle) }} />
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{c.ctaSub}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={localePath("/demo")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {c.ctaBtn} <ArrowRight size={16} />
                </Link>
                <Link to="/analisis-carta"
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
                  {c.ctaBtn2}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decision Center teaser */}
      <DecisionCenterTeaser lang={lang} compact />

      {/* ── Next Steps ── */}
      <NextSteps
        title={{ es: "Explora más", en: "Explore more", it: "Esplora di più", fr: "En savoir plus" }[lang] || "Explore more"}
        steps={[
          { to: "/analisis-carta", label: { es: "Analiza tu carta gratis", en: "Analyze your list free", it: "Analizza la tua carta gratis", fr: "Analysez votre carte gratuitement" }[lang]!, description: { es: "Sube tu carta y recibe un diagnóstico con recomendaciones concretas.", en: "Upload your list and get a diagnostic with actionable recommendations.", it: "Carica la tua carta e ricevi un report con raccomandazioni concrete.", fr: "Envoyez votre carte et recevez un diagnostic avec des recommandations concrètes." }[lang]!, type: "tool" },
          { to: "/casos-exito", label: { es: "Casos de éxito de restaurantes reales", en: "Real restaurant case studies", it: "Casi di successo reali", fr: "Cas clients réels" }[lang]!, description: { es: "Cómo restaurantes reales usan Winerim y qué resultados obtienen.", en: "How real restaurants use Winerim and what results they achieve.", it: "Come ristoranti reali usano Winerim e quali risultati ottengono.", fr: "Comment de vrais restaurants utilisent Winerim et quels résultats ils obtiennent." }[lang]!, type: "solution" },
          { to: "/funcionalidades", label: { es: "Todas las funcionalidades de Winerim", en: "All Winerim features", it: "Tutte le funzionalità di Winerim", fr: "Toutes les fonctionnalités de Winerim" }[lang]!, description: { es: "11 categorías de funcionalidades especializadas en vino.", en: "11 categories of wine-specialized features.", it: "11 categorie di funzionalità specializzate nel vino.", fr: "11 catégories de fonctionnalités spécialisées dans le vin." }[lang]!, type: "solution" },
          { to: "/comparativas", label: { es: "Compara Winerim con alternativas", en: "Compare Winerim with alternatives", it: "Confronta Winerim con le alternative", fr: "Comparez Winerim avec les alternatives" }[lang]!, description: { es: "Comparativas claras para decidir qué solución encaja.", en: "Clear comparisons to decide which solution fits.", it: "Confronti chiari per decidere quale soluzione fa per te.", fr: "Comparaisons claires pour choisir la bonne solution." }[lang]!, type: "solution" },
        ]}
      />

      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: { es: "Software de carta de vinos inteligente", en: "Smart wine list software", it: "Software intelligente per carta dei vini", fr: "Logiciel intelligent de carte des vins" }[lang]!, type: "solution" },
        { to: "/herramientas", label: { es: "Herramientas gratuitas de análisis y pricing", en: "Free analysis & pricing tools", it: "Strumenti gratuiti di analisi e pricing", fr: "Outils gratuits d'analyse et de tarification" }[lang]!, type: "tool" },
        { to: "/guias-y-recursos", label: { es: "Guías prácticas y recursos descargables", en: "Practical guides & resources", it: "Guide pratiche e risorse scaricabili", fr: "Guides pratiques et ressources téléchargeables" }[lang]!, type: "guide" },
        { to: localePath("/soluciones/grupos-restauracion"), label: { es: "Soluciones para grupos de restauración", en: "Solutions for restaurant groups", it: "Soluzioni per gruppi di ristorazione", fr: "Solutions pour groupes de restauration" }[lang]!, type: "solution" },
        { to: "/benchmarks-playbooks", label: { es: "Benchmarks y playbooks del sector", en: "Industry benchmarks & playbooks", it: "Benchmark e playbook del settore", fr: "Benchmarks et playbooks du secteur" }[lang]!, type: "resource" },
      ]} />

      <Footer />
    </div>
  );
};

export default Precios;
