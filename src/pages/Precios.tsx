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

/* ─── helpers ─── */
const em = (html: string) => html.replace(/<em>/g, '<span class="text-gradient-wine italic">').replace(/<\/em>/g, '</span>');

/* ─── i18n content (ES primary, others follow same structure) ─── */
const i18n: Record<string, typeof ES_CONTENT> = {};

const ES_CONTENT = {
  seo_title: "Planes y Precios de Winerim | Software de Carta de Vinos para Restaurantes",
  seo_desc: "Descubre qué plan de Winerim encaja con tu restaurante, hotel o grupo. Sin permanencia, con implementación en 48h y soporte dedicado.",
  breadcrumb: "Precios",

  /* Hero */
  badge: "Planes y precios",
  title: "Un plan para cada tipo de <em>restaurante</em>",
  subtitle: "Winerim se adapta a tu tamaño, tu nivel de ambición y tu tipo de operación. Sin sorpresas, sin permanencia.",

  /* Value prop strip */
  valuePillars: [
    { icon: "clock", text: "Operativo en menos de 48 horas" },
    { icon: "shield", text: "Sin permanencia ni penalizaciones" },
    { icon: "headphones", text: "Soporte humano en cada plan" },
    { icon: "puzzle", text: "Compatible con cualquier POS" },
  ],

  /* Who fits */
  whoTitle: "¿Qué plan encaja con <em>tu negocio</em>?",
  whoSubtitle: "Winerim sirve a perfiles muy distintos. Encuentra el tuyo.",
  profiles: [
    { icon: "store", name: "Restaurante independiente", plan: "Starter o Pro", desc: "Carta de 30-80 referencias. Necesitas visibilidad y control sin complejidad." },
    { icon: "chef", name: "Restaurante gastronómico", plan: "Pro", desc: "Carta amplia, maridajes, vino por copa. Necesitas recomendaciones inteligentes y analítica." },
    { icon: "hotel", name: "Hotel con F&B", plan: "Pro o Enterprise", desc: "Múltiples puntos de venta, room service, bar. Necesitas consistencia y reporting." },
    { icon: "building", name: "Grupo de restauración", plan: "Enterprise", desc: "Multi-local, governance centralizada, benchmarking entre unidades y despliegue progresivo." },
  ],

  /* Plans */
  plansTitle: "Compara los <em>planes</em>",
  plansBadge: "Estructura clara",
  plans: [
    {
      name: "Starter",
      tagline: "Tu carta, digitalizada y profesional",
      solves: "Resuelve: carta estática, información dispersa, imagen pobre del vino.",
      fits: "Para restaurantes independientes con carta de hasta ~80 referencias.",
      features: [
        "Carta digital interactiva con filtros",
        "Fichas de vino completas con foto y notas",
        "Maridajes básicos por referencia",
        "QR personalizado para sala",
        "Acceso desde móvil del comensal (sin app)",
        "Panel de gestión sencillo",
        "Soporte por email",
      ],
      notIncluded: [
        "Analítica de ventas",
        "Optimización IA",
        "Multi-local",
      ],
    },
    {
      name: "Pro",
      tagline: "Inteligencia para vender más vino",
      solves: "Resuelve: ticket medio bajo, rotación lenta, recomendaciones inconsistentes, falta de datos.",
      fits: "Para restaurantes con carta amplia, gastronómicos u hoteles con F&B.",
      popular: true,
      features: [
        "Todo lo del plan Starter",
        "Analítica de ventas de vino en tiempo real",
        "Optimización de carta con IA",
        "Wine Mapping interactivo",
        "Recomendaciones inteligentes por contexto",
        "Venta por copa optimizada",
        "Comparador de vinos para el comensal",
        "Alertas de rotación y stock muerto",
        "Gestión de precios y márgenes",
        "Soporte prioritario",
      ],
      notIncluded: [
        "Multi-local centralizado",
        "Integraciones POS/PMS avanzadas",
      ],
    },
    {
      name: "Enterprise",
      tagline: "Governance y control para grupos",
      solves: "Resuelve: inconsistencia entre locales, falta de benchmarking, descontrol de surtido y pricing.",
      fits: "Para grupos de restauración, cadenas hoteleras y operadores multi-unidad.",
      features: [
        "Todo lo del plan Pro",
        "Multi-local centralizado",
        "Benchmarking entre unidades",
        "Integraciones POS y PMS avanzadas",
        "Analítica consolidada y reporting ejecutivo",
        "Despliegue progresivo (pilotaje por cluster)",
        "API personalizada",
        "Onboarding dedicado con formación",
        "Account manager asignado",
        "SLA garantizado",
      ],
      notIncluded: [],
    },
  ],

  /* Pricing model note */
  pricingNote: "Los precios de Winerim se adaptan al número de referencias de tu carta y al número de locales. Solicita una propuesta personalizada sin compromiso.",

  /* Comparison table */
  compTitle: "Comparativa detallada entre <em>planes</em>",
  compBadge: "Feature por feature",
  compCategories: [
    {
      name: "Carta digital",
      rows: [
        { feature: "Carta digital interactiva", starter: true, pro: true, enterprise: true },
        { feature: "Filtros por tipo, región, precio", starter: true, pro: true, enterprise: true },
        { feature: "Fichas de vino completas", starter: true, pro: true, enterprise: true },
        { feature: "QR personalizado", starter: true, pro: true, enterprise: true },
        { feature: "Comparador de vinos", starter: false, pro: true, enterprise: true },
        { feature: "Maridajes inteligentes", starter: "Básicos", pro: true, enterprise: true },
      ],
    },
    {
      name: "Inteligencia y analítica",
      rows: [
        { feature: "Analítica de ventas", starter: false, pro: true, enterprise: true },
        { feature: "Optimización de carta con IA", starter: false, pro: true, enterprise: true },
        { feature: "Wine Mapping interactivo", starter: false, pro: true, enterprise: true },
        { feature: "Recomendaciones inteligentes", starter: false, pro: true, enterprise: true },
        { feature: "Alertas de rotación y stock", starter: false, pro: true, enterprise: true },
        { feature: "Gestión de precios y márgenes", starter: false, pro: true, enterprise: true },
        { feature: "Benchmarking entre locales", starter: false, pro: false, enterprise: true },
        { feature: "Reporting ejecutivo consolidado", starter: false, pro: false, enterprise: true },
      ],
    },
    {
      name: "Operaciones",
      rows: [
        { feature: "Panel de gestión", starter: true, pro: true, enterprise: true },
        { feature: "Multi-local centralizado", starter: false, pro: false, enterprise: true },
        { feature: "Integraciones POS/PMS", starter: false, pro: false, enterprise: true },
        { feature: "API personalizada", starter: false, pro: false, enterprise: true },
        { feature: "Despliegue progresivo", starter: false, pro: false, enterprise: true },
      ],
    },
    {
      name: "Soporte",
      rows: [
        { feature: "Soporte por email", starter: true, pro: true, enterprise: true },
        { feature: "Soporte prioritario", starter: false, pro: true, enterprise: true },
        { feature: "Onboarding dedicado", starter: false, pro: false, enterprise: true },
        { feature: "Account manager asignado", starter: false, pro: false, enterprise: true },
        { feature: "SLA garantizado", starter: false, pro: false, enterprise: true },
      ],
    },
  ],

  /* Objection busters */
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

  /* FAQs */
  faqs: [
    { q: "¿Hay permanencia?", a: "No. Puedes cancelar cuando quieras, sin penalizaciones ni letra pequeña." },
    { q: "¿Cuántas referencias admite cada plan?", a: "No hay un límite rígido. El precio se ajusta al volumen de tu carta. Desde 30 hasta más de 500 referencias." },
    { q: "¿Los comensales necesitan descargar una app?", a: "No. La carta digital se abre desde el navegador del móvil escaneando un QR. Sin descargas." },
    { q: "¿Puedo probar Winerim antes de contratar?", a: "Sí. Ofrecemos un análisis gratuito de tu carta de vinos y una demo personalizada con tu carta real." },
    { q: "¿Qué necesito para empezar?", a: "Tu carta de vinos actual (en cualquier formato) y 15 minutos para una llamada de configuración. Nosotros nos encargamos del resto." },
    { q: "¿Funciona para carta de vinos y de cócteles?", a: "Winerim está especializado en vinos. Si tu carta incluye cócteles u otras bebidas, podemos integrarlos, pero el valor diferencial está en la inteligencia aplicada al vino." },
    { q: "¿Cómo se calcula el precio exacto?", a: "El precio depende del número de referencias y del número de locales. Solicita una propuesta personalizada y te enviamos un presupuesto claro en 24h." },
    { q: "¿Puedo cambiar de plan?", a: "Sí. Puedes escalar de Starter a Pro o de Pro a Enterprise en cualquier momento. Sin interrupciones." },
  ],

  /* Final CTA */
  ctaBadge: "Da el paso",
  ctaTitle: "Descubre cuánto más podrías vender con tu <em>carta de vinos</em>",
  ctaSub: "Demo personalizada con tu carta real. Sin compromiso. En 15 minutos entenderás el potencial.",
  ctaBtn: "Solicitar demo",
  ctaBtn2: "Analizar mi carta gratis",
};

i18n.es = ES_CONTENT;

/* EN translation */
i18n.en = {
  seo_title: "Winerim Plans & Pricing | Wine List Software for Restaurants",
  seo_desc: "Find the right Winerim plan for your restaurant, hotel or group. No lock-in, 48h setup, dedicated support.",
  breadcrumb: "Pricing",
  badge: "Plans and pricing",
  title: "A plan for every type of <em>restaurant</em>",
  subtitle: "Winerim adapts to your size, ambition and operation. No surprises, no lock-in.",
  valuePillars: [
    { icon: "clock", text: "Up and running in under 48 hours" },
    { icon: "shield", text: "No lock-in or penalties" },
    { icon: "headphones", text: "Human support on every plan" },
    { icon: "puzzle", text: "Compatible with any POS" },
  ],
  whoTitle: "Which plan fits <em>your business</em>?",
  whoSubtitle: "Winerim serves very different profiles. Find yours.",
  profiles: [
    { icon: "store", name: "Independent restaurant", plan: "Starter or Pro", desc: "30-80 references. You need visibility and control without complexity." },
    { icon: "chef", name: "Fine dining restaurant", plan: "Pro", desc: "Extensive list, pairings, by-the-glass. You need smart recommendations and analytics." },
    { icon: "hotel", name: "Hotel with F&B", plan: "Pro or Enterprise", desc: "Multiple outlets, room service, bar. You need consistency and reporting." },
    { icon: "building", name: "Restaurant group", plan: "Enterprise", desc: "Multi-location, centralized governance, unit benchmarking and progressive rollout." },
  ],
  plansTitle: "Compare the <em>plans</em>",
  plansBadge: "Clear structure",
  plans: [
    {
      name: "Starter", tagline: "Your list, digitized and professional",
      solves: "Solves: static lists, scattered info, poor wine image.",
      fits: "For independent restaurants with up to ~80 references.",
      features: ["Interactive digital wine list with filters", "Complete wine profiles with photo & notes", "Basic pairings per reference", "Custom QR for dining room", "Mobile access (no app needed)", "Simple management panel", "Email support"],
      notIncluded: ["Sales analytics", "AI optimization", "Multi-location"],
    },
    {
      name: "Pro", tagline: "Intelligence to sell more wine", popular: true,
      solves: "Solves: low average ticket, slow rotation, inconsistent recommendations, lack of data.",
      fits: "For restaurants with extensive lists, fine dining or hotels with F&B.",
      features: ["Everything in Starter", "Real-time wine sales analytics", "AI-powered list optimization", "Interactive Wine Mapping", "Context-aware smart recommendations", "Optimized by-the-glass sales", "Wine comparator for diners", "Rotation & dead stock alerts", "Pricing & margin management", "Priority support"],
      notIncluded: ["Centralized multi-location", "Advanced POS/PMS integrations"],
    },
    {
      name: "Enterprise", tagline: "Governance and control for groups",
      solves: "Solves: inconsistency across locations, no benchmarking, assortment and pricing drift.",
      fits: "For restaurant groups, hotel chains and multi-unit operators.",
      features: ["Everything in Pro", "Centralized multi-location", "Cross-unit benchmarking", "Advanced POS & PMS integrations", "Consolidated analytics & executive reporting", "Progressive rollout (cluster piloting)", "Custom API", "Dedicated onboarding with training", "Assigned account manager", "Guaranteed SLA"],
      notIncluded: [],
    },
  ],
  pricingNote: "Winerim pricing adapts to the number of references and locations. Request a personalized quote with no commitment.",
  compTitle: "Detailed <em>plan</em> comparison", compBadge: "Feature by feature",
  compCategories: [
    { name: "Digital list", rows: [
      { feature: "Interactive digital list", starter: true, pro: true, enterprise: true },
      { feature: "Filters by type, region, price", starter: true, pro: true, enterprise: true },
      { feature: "Complete wine profiles", starter: true, pro: true, enterprise: true },
      { feature: "Custom QR", starter: true, pro: true, enterprise: true },
      { feature: "Wine comparator", starter: false, pro: true, enterprise: true },
      { feature: "Smart pairings", starter: "Basic", pro: true, enterprise: true },
    ]},
    { name: "Intelligence & analytics", rows: [
      { feature: "Sales analytics", starter: false, pro: true, enterprise: true },
      { feature: "AI list optimization", starter: false, pro: true, enterprise: true },
      { feature: "Interactive Wine Mapping", starter: false, pro: true, enterprise: true },
      { feature: "Smart recommendations", starter: false, pro: true, enterprise: true },
      { feature: "Rotation & stock alerts", starter: false, pro: true, enterprise: true },
      { feature: "Pricing & margin management", starter: false, pro: true, enterprise: true },
      { feature: "Cross-unit benchmarking", starter: false, pro: false, enterprise: true },
      { feature: "Executive consolidated reporting", starter: false, pro: false, enterprise: true },
    ]},
    { name: "Operations", rows: [
      { feature: "Management panel", starter: true, pro: true, enterprise: true },
      { feature: "Centralized multi-location", starter: false, pro: false, enterprise: true },
      { feature: "POS/PMS integrations", starter: false, pro: false, enterprise: true },
      { feature: "Custom API", starter: false, pro: false, enterprise: true },
      { feature: "Progressive rollout", starter: false, pro: false, enterprise: true },
    ]},
    { name: "Support", rows: [
      { feature: "Email support", starter: true, pro: true, enterprise: true },
      { feature: "Priority support", starter: false, pro: true, enterprise: true },
      { feature: "Dedicated onboarding", starter: false, pro: false, enterprise: true },
      { feature: "Assigned account manager", starter: false, pro: false, enterprise: true },
      { feature: "Guaranteed SLA", starter: false, pro: false, enterprise: true },
    ]},
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
  faqs: [
    { q: "Is there a lock-in?", a: "No. Cancel anytime, no penalties." },
    { q: "How many references per plan?", a: "No rigid limit. Pricing adjusts to your list volume, from 30 to 500+ references." },
    { q: "Do diners need an app?", a: "No. The digital list opens from the mobile browser via QR scan." },
    { q: "Can I try before subscribing?", a: "Yes. We offer a free wine list analysis and a personalized demo with your actual list." },
    { q: "What do I need to start?", a: "Your current wine list (any format) and 15 minutes for a setup call." },
    { q: "Does it work for cocktails too?", a: "Winerim specializes in wine. Other beverages can be included, but the core value is in wine intelligence." },
    { q: "How is pricing calculated?", a: "Based on number of references and locations. Request a quote and receive a clear proposal in 24h." },
    { q: "Can I upgrade plans?", a: "Yes. Scale from Starter to Pro or Enterprise anytime with no interruption." },
  ],
  ctaBadge: "Take the step",
  ctaTitle: "Discover how much more you could sell with your <em>wine list</em>",
  ctaSub: "Personalized demo with your actual list. No commitment. 15 minutes to understand the potential.",
  ctaBtn: "Request demo",
  ctaBtn2: "Analyze my list free",
};

/* IT */
i18n.it = {
  ...i18n.en,
  seo_title: "Piani e Prezzi Winerim | Software Carta dei Vini per Ristoranti",
  seo_desc: "Trova il piano Winerim giusto per il tuo ristorante, hotel o gruppo. Senza vincoli, attivazione in 48h.",
  breadcrumb: "Prezzi", badge: "Piani e prezzi",
  title: "Un piano per ogni tipo di <em>ristorante</em>",
  subtitle: "Winerim si adatta alla tua dimensione, ambizione e operazione. Senza sorprese, senza vincoli.",
  ctaBadge: "Fai il passo", ctaBtn: "Richiedi demo", ctaBtn2: "Analizza la mia carta",
  ctaTitle: "Scopri quanto potresti vendere di più con la tua <em>carta dei vini</em>",
  ctaSub: "Demo personalizzata con la tua carta reale. Senza impegno.",
};

/* FR */
i18n.fr = {
  ...i18n.en,
  seo_title: "Plans et Tarifs Winerim | Logiciel Carte des Vins pour Restaurants",
  seo_desc: "Trouvez le plan Winerim adapté à votre restaurant, hôtel ou groupe. Sans engagement, mise en place en 48h.",
  breadcrumb: "Tarifs", badge: "Plans et tarifs",
  title: "Un plan pour chaque type de <em>restaurant</em>",
  subtitle: "Winerim s'adapte à votre taille, votre ambition et votre opération. Sans surprises, sans engagement.",
  ctaBadge: "Faites le pas", ctaBtn: "Demander démo", ctaBtn2: "Analyser ma carte",
  ctaTitle: "Découvrez combien vous pourriez vendre de plus avec votre <em>carte des vins</em>",
  ctaSub: "Démo personnalisée avec votre carte réelle. Sans engagement.",
};

/* ─── icon lookup ─── */
const iconMap: Record<string, typeof Wine> = {
  clock: Clock, shield: Shield, headphones: Headphones, puzzle: Puzzle,
  graduation: GraduationCap, trending: TrendingUp, store: Store,
  chef: ChefHat, hotel: Hotel, building: Building2,
};
const planIcons = [Zap, Crown, Building2];

/* ─── Cell renderer ─── */
const CellValue = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check size={16} className="text-wine mx-auto" />;
  if (value === false) return <X size={14} className="text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-accent font-medium">{value}</span>;
};

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

      {/* ── WHO FITS ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3" dangerouslySetInnerHTML={{ __html: em(c.whoTitle) }} />
            <p className="text-muted-foreground max-w-xl mx-auto">{c.whoSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
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
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`relative rounded-2xl border p-7 md:p-8 h-full flex flex-col ${highlight ? "border-wine bg-wine/[0.03] shadow-lg shadow-wine/5" : "border-border bg-gradient-card"}`}>
                    {highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full bg-gradient-wine text-primary-foreground text-xs font-semibold tracking-wider uppercase">
                          {lang === "es" ? "Más popular" : lang === "it" ? "Più popolare" : lang === "fr" ? "Le plus populaire" : "Most popular"}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? "bg-wine/15" : "bg-wine/10"}`}>
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                    </div>
                    <p className="text-sm font-medium text-foreground/80 mb-1">{plan.tagline}</p>
                    <p className="text-xs text-muted-foreground italic mb-1">{plan.solves}</p>
                    <p className="text-xs text-wine/80 font-medium mb-5">{plan.fits}</p>

                    <ul className="space-y-2 mb-4 flex-1">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <Check size={14} className="text-wine shrink-0 mt-0.5" />
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
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${highlight ? "bg-gradient-wine text-primary-foreground hover:opacity-90" : "border border-border hover:border-wine/50 hover:bg-wine/5"}`}
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

      {/* ── COMPARISON TABLE ── */}
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

      {/* ── OBJECTION BUSTERS ── */}
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
