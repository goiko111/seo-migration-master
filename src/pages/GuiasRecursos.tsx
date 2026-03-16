import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, TrendingUp, Wine, BarChart3, Utensils, Calculator,
  Brain, DollarSign, Download, Search, FileText, CheckCircle,
  Layers, Building2, Users, ArrowRight, Wrench
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type LangContent = {
  metaTitle: string; metaDesc: string;
  heroLabel: string; heroTitle: string; heroDesc: string;
  guidesTitle: string; guidesDesc: string;
  resourcesTitle: string; resourcesDesc: string;
  toolsTitle: string; toolsDesc: string; toolsAll: string;
  solutionsTitle: string; solutionsDesc: string;
  ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string;
  readMore: string; download: string; useTool: string; viewSolution: string;
  all: string; items: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Guías prácticas para restaurantes | Winerim",
    metaDesc: "Guías prácticas y artículos para aprender a optimizar tu carta de vinos. Estrategia, pricing, rotación, equipo y más.",
    heroLabel: "Centro de conocimiento", heroTitle: "Guías",
    heroDesc: "Aprende las mejores prácticas para rentabilizar tu carta de vinos. Y la mejor parte: con Winerim, todo esto se automatiza.",
    guidesTitle: "Guías y artículos", guidesDesc: "Aprende las mejores prácticas — o deja que Winerim las aplique por ti automáticamente.",
    resourcesTitle: "Recursos descargables", resourcesDesc: "Plantillas y checklists útiles. Como cliente de Winerim, ya están integradas en tu panel.",
    toolsTitle: "Herramientas gratuitas", toolsDesc: "Pruébalas gratis aquí. Como cliente de Winerim, las tienes todas integradas y automatizadas.", toolsAll: "Ver todas →",
    solutionsTitle: "Soluciones por caso de uso", solutionsDesc: "¿Reconoces tu situación? Winerim ya lo resuelve.",
    ctaTitle: "¿Por qué hacerlo manual si Winerim lo automatiza?", ctaDesc: "Todo lo que ves en esta página — análisis, pricing, maridajes, rotación — Winerim lo hace automáticamente.",
    ctaPrimary: "Analizar mi carta gratis", ctaSecondary: "Solicitar demo",
    readMore: "Leer guía", download: "Descargar", useTool: "Usar herramienta", viewSolution: "Ver solución",
    all: "Todos", items: "guías",
  },
  en: {
    metaTitle: "Practical Guides for Restaurants | Winerim",
    metaDesc: "Practical guides and articles to learn how to optimize your wine list. Strategy, pricing, rotation, team and more.",
    heroLabel: "Knowledge center", heroTitle: "Guides",
    heroDesc: "Learn best practices to monetize your wine list. The best part: Winerim automates it all.",
    guidesTitle: "Guides & Articles", guidesDesc: "Learn best practices — or let Winerim apply them automatically for you.",
    resourcesTitle: "Downloadable Resources", resourcesDesc: "Useful templates and checklists.",
    toolsTitle: "Free Tools", toolsDesc: "Try them free here.", toolsAll: "View all →",
    solutionsTitle: "Solutions by Use Case", solutionsDesc: "Recognize your situation? Winerim already solves it.",
    ctaTitle: "Why do it manually when Winerim automates it?", ctaDesc: "Everything on this page — analysis, pricing, pairings, rotation — Winerim does it automatically.",
    ctaPrimary: "Analyze my list free", ctaSecondary: "Request demo",
    readMore: "Read guide", download: "Download", useTool: "Use tool", viewSolution: "View solution",
    all: "All", items: "guides",
  },
  it: {
    metaTitle: "Guide pratiche per ristoranti | Winerim",
    metaDesc: "Guide pratiche e articoli per imparare a ottimizzare la tua carta dei vini.",
    heroLabel: "Centro conoscenze", heroTitle: "Guide",
    heroDesc: "Impara le best practice per rendere redditizia la tua carta dei vini. Il bello è che Winerim automatizza tutto.",
    guidesTitle: "Guide e Articoli", guidesDesc: "Impara le best practice — oppure lascia che Winerim le applichi automaticamente.",
    resourcesTitle: "Risorse scaricabili", resourcesDesc: "Template e checklist utili.",
    toolsTitle: "Strumenti gratuiti", toolsDesc: "Provali gratis qui.", toolsAll: "Vedi tutti →",
    solutionsTitle: "Soluzioni per caso d'uso", solutionsDesc: "Riconosci la tua situazione? Winerim la risolve già.",
    ctaTitle: "Perché farlo manualmente se Winerim lo automatizza?", ctaDesc: "Tutto quello che vedi in questa pagina — analisi, pricing, abbinamenti, rotazione — Winerim lo fa automaticamente.",
    ctaPrimary: "Analizza la mia carta gratis", ctaSecondary: "Richiedi demo",
    readMore: "Leggi guida", download: "Scarica", useTool: "Usa strumento", viewSolution: "Vedi soluzione",
    all: "Tutti", items: "guide",
  },
  fr: {
    metaTitle: "Guides pratiques pour restaurants | Winerim",
    metaDesc: "Guides pratiques et articles pour optimiser votre carte des vins.",
    heroLabel: "Centre de connaissances", heroTitle: "Guides",
    heroDesc: "Apprenez les bonnes pratiques pour rentabiliser votre carte des vins. Le meilleur : Winerim automatise tout.",
    guidesTitle: "Guides et Articles", guidesDesc: "Apprenez les bonnes pratiques — ou laissez Winerim les appliquer automatiquement.",
    resourcesTitle: "Ressources téléchargeables", resourcesDesc: "Modèles et checklists utiles.",
    toolsTitle: "Outils gratuits", toolsDesc: "Essayez-les gratuitement ici.", toolsAll: "Voir tout →",
    solutionsTitle: "Solutions par cas d'usage", solutionsDesc: "Vous reconnaissez votre situation ? Winerim la résout déjà.",
    ctaTitle: "Pourquoi le faire manuellement quand Winerim l'automatise ?", ctaDesc: "Tout ce que vous voyez sur cette page — Winerim le fait automatiquement.",
    ctaPrimary: "Analyser ma carte gratuitement", ctaSecondary: "Demander une démo",
    readMore: "Lire le guide", download: "Télécharger", useTool: "Utiliser l'outil", viewSolution: "Voir la solution",
    all: "Tous", items: "guides",
  },
};

/* ── Guide topic tags for filtering ── */
type GuideItem = { to: string; icon: React.ElementType; title: string; desc: string; topics: string[] };

const guideTopicFilters = [
  { key: "all", label: "Todos" },
  { key: "estructura", label: "Estructura de carta" },
  { key: "pricing", label: "Pricing" },
  { key: "venta", label: "Ventas" },
  { key: "copa", label: "Vino por copa" },
  { key: "rotación", label: "Rotación" },
  { key: "equipo", label: "Equipo de sala" },
  { key: "datos", label: "Datos y analítica" },
  { key: "grupo", label: "Grupos" },
];

const guides: GuideItem[] = [
  { to: "/blog/como-organizar-carta-de-vinos", icon: BookOpen, title: "Cómo organizar una carta de vinos", desc: "Guía práctica para estructurar tu carta de forma clara, rentable y fácil de entender para tus clientes.", topics: ["estructura"] },
  { to: "/blog/cuantos-vinos-carta-restaurante", icon: Wine, title: "Cuántos vinos debe tener una carta", desc: "Define el número ideal de referencias según tu tipo de restaurante, cocina y perfil de cliente.", topics: ["estructura"] },
  { to: "/blog/como-disenar-carta-vinos-rentable", icon: DollarSign, title: "Cómo diseñar una carta de vinos rentable", desc: "Estrategias de pricing, wine mapping y selección para maximizar ventas y márgenes.", topics: ["pricing", "estructura"] },
  { to: "/como-vender-mas-vino-en-un-restaurante", icon: TrendingUp, title: "Cómo vender más vino en un restaurante", desc: "Estrategias probadas para aumentar las ventas de vino y mejorar la experiencia del cliente.", topics: ["venta"] },
  { to: "/vino-por-copa-restaurante", icon: Wine, title: "Vino por copa en restaurantes", desc: "Todo lo que necesitas saber para implementar y optimizar un programa de vino por copa.", topics: ["copa"] },
  { to: "/precio-vino-restaurante", icon: Calculator, title: "Cómo poner precio al vino", desc: "Guía sobre márgenes, multiplicadores y estrategias de pricing para maximizar la rentabilidad.", topics: ["pricing"] },
  { to: "/como-hacer-una-carta-de-vinos", icon: FileText, title: "Cómo hacer una carta de vinos", desc: "Guía paso a paso para crear una carta de vinos profesional desde cero.", topics: ["estructura"] },
  { to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", icon: Layers, title: "Cómo mejorar la rotación de vinos", desc: "Estrategias para eliminar stock muerto y mantener una bodega rentable.", topics: ["rotación"] },
  { to: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", icon: Utensils, title: "Estrategia de maridaje en restauración", desc: "Diseña maridajes que aumenten ventas de vino y mejoren la experiencia del cliente.", topics: ["venta"] },
  { to: "/guias/como-estructurar-carta-vinos-grupo-restauracion", icon: Layers, title: "Carta de vinos para grupos de restauración", desc: "Cómo gestionar cartas coherentes en múltiples locales con control centralizado.", topics: ["grupo", "estructura"] },
  { to: "/guias/como-fijar-estrategia-rentable-vino-por-copa", icon: Wine, title: "Estrategia rentable de vino por copa", desc: "Selección, pricing, merma y rotación para un programa de copa profesional.", topics: ["copa", "pricing"] },
  { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", icon: Search, title: "Detectar vinos muertos", desc: "Identifica referencias sin rotación, cuantifica el impacto y decide qué hacer.", topics: ["rotación", "datos"] },
  { to: "/guias/como-formar-equipo-sala-para-vender-vino", icon: Users, title: "Formar al equipo de sala en vino", desc: "Programa práctico para que tu equipo recomiende vino sin ser sumiller.", topics: ["equipo"] },
  { to: "/guias/como-usar-datos-para-decidir-que-vinos-comprar", icon: BarChart3, title: "Usar datos para comprar vinos", desc: "Rotación, márgenes y tendencias: cómo decidir qué comprar con criterio.", topics: ["datos"] },
  { to: "/guias/como-conectar-carta-stock-ventas-margen", icon: TrendingUp, title: "Conectar carta, stock, ventas y margen", desc: "Integra las 4 piezas de la gestión del vino en un sistema coherente.", topics: ["datos", "rotación"] },
  { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", icon: Building2, title: "Gestionar carta en grupos de restauración", desc: "Governance, benchmarking entre locales y control centralizado del vino.", topics: ["grupo"] },
  { to: "/guias/como-implantar-vino-por-copa-sin-perder-margen", icon: Wine, title: "Vino por copa sin perder margen", desc: "Selección, pricing, control de merma y rotación para un programa de copa rentable.", topics: ["copa", "pricing"] },
  { to: "/guias/como-usar-winerim-sin-sumiller", icon: Users, title: "Usar Winerim sin sumiller en sala", desc: "Cómo Winerim suple la falta de expertise con recomendaciones automáticas y formación integrada.", topics: ["equipo"] },
  { to: "/guias/como-decidir-surtido-segun-ticket-medio-tipo-local", icon: DollarSign, title: "Surtido según ticket medio y tipo de local", desc: "Framework para elegir qué vinos tener en carta según tu perfil de cliente y restaurante.", topics: ["estructura", "pricing"] },
  { to: "/guias/como-detectar-canibalizacion-vinos-carta", icon: Search, title: "Detectar canibalización entre vinos", desc: "Identifica referencias que compiten entre sí y optimiza la composición de tu carta.", topics: ["datos", "estructura"] },
  { to: "/guias/como-revisar-carta-vinos-cada-mes", icon: FileText, title: "Revisar la carta cada mes", desc: "Proceso de 90 minutos para mantener tu carta optimizada mes a mes con datos reales.", topics: ["datos"] },
];

const resources = [
  { to: "/recursos/plantilla-carta-de-vinos", icon: Download, title: "Plantilla de carta de vinos", desc: "Descarga una plantilla profesional para diseñar tu carta de vinos.", tags: ["estructura", "restaurante", "inicio"] },
  { to: "/recursos/checklist-carta-de-vinos-rentable", icon: CheckCircle, title: "Checklist carta rentable", desc: "Revisa punto por punto si tu carta de vinos está optimizada para vender.", tags: ["rentabilidad", "restaurante", "intermedio"] },
  { to: "/recursos/guia-vino-por-copa-para-restaurantes", icon: Wine, title: "Guía vino por copa", desc: "Todo sobre cómo diseñar y rentabilizar tu oferta de vino por copa.", tags: ["copa", "restaurante", "intermedio"] },
  { to: "/recursos/plantilla-wine-mapping-restaurante", icon: Layers, title: "Plantilla wine mapping", desc: "Plantilla para estructurar precios y distribución de vinos en tu carta.", tags: ["pricing", "restaurante", "intermedio"] },
  { to: "/recursos/plantilla-estrategia-vinos-por-copa", icon: Wine, title: "Estrategia de vinos por copa", desc: "Plan operativo completo para diseñar, ejecutar y controlar tu programa de vino por copa.", tags: ["copa", "restaurante", "avanzado"] },
  { to: "/recursos/checklist-deteccion-vinos-muertos", icon: Search, title: "Detección de vinos muertos", desc: "Identifica referencias sin rotación, cuantifica capital inmovilizado y decide qué hacer.", tags: ["rotación", "restaurante", "intermedio"] },
  { to: "/recursos/plantilla-formacion-equipo-sala", icon: Brain, title: "Formación exprés para sala", desc: "Programa de formación en vino para tu equipo de sala en menos de 2 semanas.", tags: ["equipo", "restaurante", "inicio"] },
  { to: "/recursos/plantilla-analisis-margenes", icon: DollarSign, title: "Análisis de márgenes", desc: "Analiza la rentabilidad de cada referencia: coste, PVP, multiplicador y contribución.", tags: ["pricing", "restaurante", "avanzado"] },
  { to: "/recursos/scorecard-rendimiento-carta", icon: BarChart3, title: "Scorecard mensual", desc: "KPIs esenciales de tu carta cada mes: ventas, rotación, margen y vino por copa.", tags: ["analítica", "restaurante", "avanzado"] },
  { to: "/recursos/checklist-carta-que-vende", icon: TrendingUp, title: "¿Tu carta realmente vende?", desc: "30 puntos para evaluar la capacidad de conversión de tu carta de vinos.", tags: ["rentabilidad", "restaurante", "inicio"] },
  { to: "/recursos/plantilla-equilibrio-carta", icon: Layers, title: "Equilibrio de carta", desc: "Analiza el equilibrio por estilos, regiones, precios y tipologías.", tags: ["estructura", "restaurante", "intermedio"] },
  { to: "/recursos/plantilla-revision-mensual-carta", icon: FileText, title: "Revisión mensual de carta", desc: "Proceso estructurado para revisar tu carta cada mes: rendimiento, pricing, rotación y plan de acción.", tags: ["analítica", "restaurante", "avanzado"] },
  { to: "/recursos/plantilla-control-grupo-restauracion", icon: Building2, title: "Control para grupos", desc: "Dashboard comparativo, surtido centralizado y benchmarking interno entre locales.", tags: ["analítica", "grupo", "avanzado"] },
];

const tools = [
  { to: "/wine-list-analyzer", icon: Search, title: "Analizador de carta", desc: "Analiza tu carta y recibe recomendaciones de mejora." },
  { to: "/calculadora-margen-vino", icon: Calculator, title: "Calculadora de márgenes", desc: "Calcula el margen óptimo para cada referencia." },
  { to: "/herramientas/calculadora-precio-vino-por-copa", icon: Wine, title: "Calculadora precio por copa", desc: "Calcula el precio ideal de venta por copa." },
  { to: "/wine-pricing-tool", icon: DollarSign, title: "Herramienta de pricing", desc: "Optimiza la estructura de precios de tu carta." },
  { to: "/wine-pairing-generator", icon: Utensils, title: "Generador de maridajes", desc: "Genera sugerencias de maridaje con IA." },
  { to: "/wine-roi-calculator", icon: TrendingUp, title: "Calculadora de ROI", desc: "Calcula el retorno de inversión de digitalizar tu carta." },
  { to: "/wine-list-benchmark", icon: BarChart3, title: "Benchmark de cartas", desc: "Compara tu carta con los estándares del sector." },
];

const solutions = [
  { to: "/soluciones/grupos-restauracion", icon: Building2, title: "Winerim para grupos de restauración", desc: "Gestión centralizada del vino para grupos con múltiples restaurantes." },
  { to: "/soluciones/aumentar-ticket-medio-restaurante", icon: BarChart3, title: "Aumentar el ticket medio", desc: "Estrategias para aumentar el gasto medio por cliente usando el vino." },
  { to: "/problemas/carta-de-vinos-no-vende", icon: TrendingUp, title: "Mi carta de vinos no vende", desc: "Diagnóstico y solución cuando tu carta de vinos no genera ventas." },
  { to: "/benchmarks-playbooks", icon: BarChart3, title: "Benchmarks & Playbooks", desc: "Datos de referencia del sector y planes de acción prácticos para tu carta de vinos." },
];

const taxonomyFilters = [
  { key: "all", label: "Todos" },
  { key: "pricing", label: "Pricing y márgenes" },
  { key: "rotación", label: "Rotación y stock" },
  { key: "copa", label: "Vino por copa" },
  { key: "equipo", label: "Equipo de sala" },
  { key: "estructura", label: "Estructura de carta" },
  { key: "rentabilidad", label: "Rentabilidad" },
  { key: "analítica", label: "Analítica y KPIs" },
  { key: "grupo", label: "Grupos de restauración" },
];

/* ── Type badge config for visual differentiation ── */
const typeBadges: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  guide: { label: "Guía", icon: BookOpen, className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  resource: { label: "Descargable", icon: Download, className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  tool: { label: "Herramienta", icon: Wrench, className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  solution: { label: "Solución", icon: CheckCircle, className: "bg-wine/10 text-wine border-wine/20" },
};

const FilterPills = ({ filters, active, onChange }: { filters: { key: string; label: string }[]; active: string; onChange: (k: string) => void }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {filters.map((f) => (
      <button
        key={f.key}
        onClick={() => onChange(f.key)}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
          active === f.key
            ? "bg-wine text-white border-wine"
            : "bg-transparent text-muted-foreground border-border hover:border-wine/40"
        }`}
      >
        {f.label}
      </button>
    ))}
  </div>
);

type SectionItem = { to: string; icon: React.ElementType; title: string; desc: string; tags?: string[]; topics?: string[] };

const TypedCard = ({ item, type, cta }: { item: SectionItem; type: keyof typeof typeBadges; cta: string }) => {
  const Icon = item.icon;
  const badge = typeBadges[type];
  const BadgeIcon = badge.icon;
  return (
    <Link to={item.to} className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-5 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5 duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors">
          <Icon size={18} className="text-wine" />
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${badge.className}`}>
          <BadgeIcon size={10} />
          {badge.label}
        </span>
      </div>
      <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors duration-300">{item.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
        {cta} <ArrowRight size={10} />
      </span>
    </Link>
  );
};

const SectionHeader = ({ icon: HeaderIcon, title, desc, count }: { icon: React.ElementType; title: string; desc: string; count: number }) => (
  <ScrollReveal className="mb-6">
    <div className="flex items-center gap-3 mb-1">
      <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
        <HeaderIcon size={20} className="text-wine" />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{title}</h2>
          <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">{count}</span>
        </div>
      </div>
    </div>
    <p className="text-muted-foreground mt-2 text-sm max-w-2xl pl-[52px]">{desc}</p>
  </ScrollReveal>
);

const GuiasRecursos = () => {
  const { lang, localePath } = useLanguage();
  const t = langContent[lang] || langContent.es;
  const [guideFilter, setGuideFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");

  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "guias-collection-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "CollectionPage",
      name: t.heroTitle, description: t.metaDesc,
      url: "https://winerim.wine/guias-y-recursos",
    });
    document.head.appendChild(schema);
    return () => { schema.remove(); };
  }, [t]);

  const filteredGuides = guideFilter === "all" ? guides : guides.filter(g => g.topics.includes(guideFilter));
  const filteredResources = resourceFilter === "all" ? resources : resources.filter(r => r.tags?.includes(resourceFilter));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/guias-y-recursos" />
      <main>
        {/* HERO */}
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.heroTitle }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.heroLabel}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.heroTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
              {t.heroDesc}
            </motion.p>
            {/* Quick jump nav */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
              {[
                { href: "#guias", icon: BookOpen, label: t.guidesTitle, count: guides.length },
                { href: "#recursos", icon: Download, label: t.resourcesTitle, count: resources.length },
                { href: "#herramientas", icon: Wrench, label: t.toolsTitle, count: tools.length },
                { href: "#soluciones", icon: CheckCircle, label: t.solutionsTitle, count: solutions.length },
              ].map((nav) => (
                <a key={nav.href} href={nav.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-all text-sm group">
                  <nav.icon size={14} className="text-wine" />
                  <span className="font-medium group-hover:text-wine transition-colors">{nav.label}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">{nav.count}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* GUIDES */}
        <section id="guias" className="max-w-7xl mx-auto px-6 md:px-12 pb-16 scroll-mt-24">
          <SectionHeader icon={BookOpen} title={t.guidesTitle} desc={t.guidesDesc} count={filteredGuides.length} />
          <FilterPills filters={guideTopicFilters} active={guideFilter} onChange={setGuideFilter} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGuides.map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 0.03}>
                <TypedCard item={item} type="guide" cta={t.readMore} />
              </ScrollReveal>
            ))}
          </div>
          {filteredGuides.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No hay guías con este filtro. Prueba con otro tema.</p>
          )}
        </section>

        {/* RESOURCES */}
        <section id="recursos" className="max-w-7xl mx-auto px-6 md:px-12 pb-16 scroll-mt-24">
          <SectionHeader icon={Download} title={t.resourcesTitle} desc={t.resourcesDesc} count={filteredResources.length} />
          <FilterPills filters={taxonomyFilters} active={resourceFilter} onChange={setResourceFilter} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 0.03}>
                <TypedCard item={item} type="resource" cta={t.download} />
              </ScrollReveal>
            ))}
          </div>
          {filteredResources.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No hay recursos con este filtro. Prueba con otra categoría.</p>
          )}
        </section>

        {/* TOOLS */}
        <section id="herramientas" className="max-w-7xl mx-auto px-6 md:px-12 pb-16 scroll-mt-24">
          <SectionHeader icon={Wrench} title={t.toolsTitle} desc={t.toolsDesc} count={tools.length} />
          <div className="flex items-end justify-end mb-4">
            <Link to={localePath("/herramientas")} className="text-xs font-semibold tracking-widest uppercase text-accent hover:text-wine transition-colors">
              {t.toolsAll}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 0.03}>
                <TypedCard item={item} type="tool" cta={t.useTool} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* SOLUTIONS */}
        <section id="soluciones" className="max-w-7xl mx-auto px-6 md:px-12 pb-16 scroll-mt-24">
          <SectionHeader icon={CheckCircle} title={t.solutionsTitle} desc={t.solutionsDesc} count={solutions.length} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 0.03}>
                <TypedCard item={item} type="solution" cta={t.viewSolution} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/demo")} className="border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuiasRecursos;
