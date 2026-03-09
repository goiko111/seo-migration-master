import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, TrendingUp, Wine, BarChart3, Utensils, Calculator,
  Brain, DollarSign, Download, Search, FileText, CheckCircle,
  Layers, Building2
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
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Guías y recursos para restaurantes | Winerim",
    metaDesc: "Guías prácticas, herramientas gratuitas y recursos descargables para optimizar tu carta de vinos, aumentar ventas y mejorar la experiencia de tus clientes.",
    heroLabel: "Centro de conocimiento", heroTitle: "Guías y recursos",
    heroDesc: "Todo lo que necesitas para organizar, optimizar y rentabilizar la carta de vinos de tu restaurante.",
    guidesTitle: "Guías y artículos", guidesDesc: "Contenido educativo para profesionales de la hostelería.",
    resourcesTitle: "Recursos descargables", resourcesDesc: "Plantillas y checklists para aplicar en tu restaurante.",
    toolsTitle: "Herramientas gratuitas", toolsDesc: "Utilidades online para analizar, calcular y mejorar tu carta.", toolsAll: "Ver todas →",
    solutionsTitle: "Soluciones por caso de uso", solutionsDesc: "Contenido específico según tu situación o tipo de negocio.",
    ctaTitle: "¿Quieres optimizar tu carta de vinos?", ctaDesc: "Descubre cómo Winerim puede ayudarte a organizar, digitalizar y rentabilizar tu oferta de vinos.",
    ctaPrimary: "Analizar mi carta gratis", ctaSecondary: "Solicitar demo",
    readMore: "Leer más →", download: "Descargar →", useTool: "Usar herramienta →", viewSolution: "Ver solución →",
  },
  en: {
    metaTitle: "Guides & Resources for Restaurants | Winerim",
    metaDesc: "Practical guides, free tools, and downloadable resources to optimize your wine list, increase sales, and improve customer experience.",
    heroLabel: "Knowledge center", heroTitle: "Guides & Resources",
    heroDesc: "Everything you need to organize, optimize, and monetize your restaurant's wine list.",
    guidesTitle: "Guides & Articles", guidesDesc: "Educational content for hospitality professionals.",
    resourcesTitle: "Downloadable Resources", resourcesDesc: "Templates and checklists to apply in your restaurant.",
    toolsTitle: "Free Tools", toolsDesc: "Online utilities to analyze, calculate, and improve your list.", toolsAll: "View all →",
    solutionsTitle: "Solutions by Use Case", solutionsDesc: "Specific content based on your situation or business type.",
    ctaTitle: "Want to optimize your wine list?", ctaDesc: "Discover how Winerim can help you organize, digitize, and monetize your wine offer.",
    ctaPrimary: "Analyze my list for free", ctaSecondary: "Request demo",
    readMore: "Read more →", download: "Download →", useTool: "Use tool →", viewSolution: "View solution →",
  },
  it: {
    metaTitle: "Guide e Risorse per Ristoranti | Winerim",
    metaDesc: "Guide pratiche, strumenti gratuiti e risorse scaricabili per ottimizzare la tua carta dei vini.",
    heroLabel: "Centro conoscenze", heroTitle: "Guide e Risorse",
    heroDesc: "Tutto ciò di cui hai bisogno per organizzare, ottimizzare e rendere redditizia la carta dei vini del tuo ristorante.",
    guidesTitle: "Guide e Articoli", guidesDesc: "Contenuti educativi per professionisti della ristorazione.",
    resourcesTitle: "Risorse scaricabili", resourcesDesc: "Template e checklist da applicare nel tuo ristorante.",
    toolsTitle: "Strumenti gratuiti", toolsDesc: "Utilità online per analizzare, calcolare e migliorare la tua carta.", toolsAll: "Vedi tutti →",
    solutionsTitle: "Soluzioni per caso d'uso", solutionsDesc: "Contenuti specifici in base alla tua situazione o tipo di attività.",
    ctaTitle: "Vuoi ottimizzare la tua carta dei vini?", ctaDesc: "Scopri come Winerim può aiutarti a organizzare, digitalizzare e rendere redditizia la tua offerta di vini.",
    ctaPrimary: "Analizza la mia carta gratis", ctaSecondary: "Richiedi demo",
    readMore: "Leggi di più →", download: "Scarica →", useTool: "Usa strumento →", viewSolution: "Vedi soluzione →",
  },
  fr: {
    metaTitle: "Guides et Ressources pour Restaurants | Winerim",
    metaDesc: "Guides pratiques, outils gratuits et ressources téléchargeables pour optimiser votre carte des vins.",
    heroLabel: "Centre de connaissances", heroTitle: "Guides et Ressources",
    heroDesc: "Tout ce dont vous avez besoin pour organiser, optimiser et rentabiliser la carte des vins de votre restaurant.",
    guidesTitle: "Guides et Articles", guidesDesc: "Contenu éducatif pour les professionnels de la restauration.",
    resourcesTitle: "Ressources téléchargeables", resourcesDesc: "Modèles et checklists à appliquer dans votre restaurant.",
    toolsTitle: "Outils gratuits", toolsDesc: "Utilitaires en ligne pour analyser, calculer et améliorer votre carte.", toolsAll: "Voir tout →",
    solutionsTitle: "Solutions par cas d'usage", solutionsDesc: "Contenu spécifique selon votre situation ou type d'activité.",
    ctaTitle: "Vous souhaitez optimiser votre carte des vins ?", ctaDesc: "Découvrez comment Winerim peut vous aider à organiser, numériser et rentabiliser votre offre de vins.",
    ctaPrimary: "Analyser ma carte gratuitement", ctaSecondary: "Demander une démo",
    readMore: "En savoir plus →", download: "Télécharger →", useTool: "Utiliser l'outil →", viewSolution: "Voir la solution →",
  },
};

/* ── Data arrays (unchanged, Spanish labels — guides/resources/tools are internal) ── */
const guides = [
  { to: "/blog/como-organizar-carta-de-vinos", icon: BookOpen, title: "Cómo organizar una carta de vinos", desc: "Guía práctica para estructurar tu carta de forma clara, rentable y fácil de entender para tus clientes." },
  { to: "/blog/cuantos-vinos-carta-restaurante", icon: Wine, title: "Cuántos vinos debe tener una carta", desc: "Define el número ideal de referencias según tu tipo de restaurante, cocina y perfil de cliente." },
  { to: "/blog/como-disenar-carta-vinos-rentable", icon: DollarSign, title: "Cómo diseñar una carta de vinos rentable", desc: "Estrategias de pricing, wine mapping y selección para maximizar ventas y márgenes." },
  { to: "/como-vender-mas-vino-en-un-restaurante", icon: TrendingUp, title: "Cómo vender más vino en un restaurante", desc: "Estrategias probadas para aumentar las ventas de vino y mejorar la experiencia del cliente." },
  { to: "/vino-por-copa-restaurante", icon: Wine, title: "Vino por copa en restaurantes", desc: "Todo lo que necesitas saber para implementar y optimizar un programa de vino por copa." },
  { to: "/precio-vino-restaurante", icon: Calculator, title: "Cómo poner precio al vino", desc: "Guía sobre márgenes, multiplicadores y estrategias de pricing para maximizar la rentabilidad." },
  { to: "/como-hacer-una-carta-de-vinos", icon: FileText, title: "Cómo hacer una carta de vinos", desc: "Guía paso a paso para crear una carta de vinos profesional desde cero." },
  { to: "/guias/como-mejorar-la-rotacion-de-vinos-en-un-restaurante", icon: Layers, title: "Cómo mejorar la rotación de vinos", desc: "Estrategias para eliminar stock muerto y mantener una bodega rentable." },
  { to: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", icon: Utensils, title: "Estrategia de maridaje en restauración", desc: "Diseña maridajes que aumenten ventas de vino y mejoren la experiencia del cliente." },
];

const resources = [
  { to: "/recursos/plantilla-carta-de-vinos", icon: Download, title: "Plantilla de carta de vinos", desc: "Descarga una plantilla profesional para diseñar tu carta de vinos." },
  { to: "/recursos/checklist-carta-de-vinos-rentable", icon: CheckCircle, title: "Checklist carta rentable", desc: "Revisa punto por punto si tu carta de vinos está optimizada para vender." },
  { to: "/recursos/guia-vino-por-copa-para-restaurantes", icon: Wine, title: "Guía vino por copa", desc: "Todo sobre cómo diseñar y rentabilizar tu oferta de vino por copa." },
  { to: "/recursos/plantilla-wine-mapping-restaurante", icon: Layers, title: "Plantilla wine mapping", desc: "Plantilla para estructurar precios y distribución de vinos en tu carta." },
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
];

type SectionItem = { to: string; icon: React.ElementType; title: string; desc: string };

const CardGrid = ({ items, cta }: { items: SectionItem[]; cta?: string }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
    {items.map((item, i) => {
      const Icon = item.icon;
      return (
        <ScrollReveal key={item.to} delay={i * 0.03}>
          <Link to={item.to} className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-5 h-full hover:shadow-lg hover:shadow-wine/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-wine" />
              </div>
            </div>
            <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors">{item.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            <span className="mt-3 text-[10px] font-semibold tracking-widest uppercase text-accent block">{cta || "→"}</span>
          </Link>
        </ScrollReveal>
      );
    })}
  </div>
);

const GuiasRecursos = () => {
  const { lang, localePath } = useLanguage();
  const t = langContent[lang] || langContent.es;

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/guias-y-recursos" />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.heroTitle }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.heroLabel}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.heroTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.heroDesc}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.guidesTitle}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{t.guidesDesc}</p>
          </ScrollReveal>
          <CardGrid items={guides} cta={t.readMore} />
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.resourcesTitle}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{t.resourcesDesc}</p>
          </ScrollReveal>
          <CardGrid items={resources} cta={t.download} />
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.toolsTitle}</h2>
              <p className="text-muted-foreground mt-1 text-sm">{t.toolsDesc}</p>
            </div>
            <Link to={localePath("/herramientas")} className="hidden md:block text-xs font-semibold tracking-widest uppercase text-accent hover:text-wine transition-colors">
              {t.toolsAll}
            </Link>
          </ScrollReveal>
          <CardGrid items={tools} cta={t.useTool} />
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.solutionsTitle}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{t.solutionsDesc}</p>
          </ScrollReveal>
          <CardGrid items={solutions} cta={t.viewSolution} />
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/analisis-carta")} className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {t.ctaPrimary}
                </Link>
                <Link to={localePath("/demo")} className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
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
