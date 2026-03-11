import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, TrendingUp, Wine, BarChart3, Utensils, Calculator,
  Brain, DollarSign, Download, Search, FileText, CheckCircle,
  Layers, Building2, Users
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
    metaDesc: "Guías prácticas, herramientas y recursos para optimizar tu carta de vinos. Todo esto lo automatiza Winerim: ahorra tiempo, reduce costes y vende más.",
    heroLabel: "Centro de conocimiento", heroTitle: "Guías y recursos",
    heroDesc: "Todo lo que necesitas saber para rentabilizar tu carta de vinos. Y la mejor parte: con Winerim, todo esto se automatiza para que tú te centres en vender.",
    guidesTitle: "Guías y artículos", guidesDesc: "Aprende las mejores prácticas — o deja que Winerim las aplique por ti automáticamente.",
    resourcesTitle: "Recursos descargables", resourcesDesc: "Plantillas y checklists útiles. Como cliente de Winerim, ya están integradas en tu panel.",
    toolsTitle: "Herramientas gratuitas", toolsDesc: "Pruébalas gratis aquí. Como cliente de Winerim, las tienes todas integradas y automatizadas.", toolsAll: "Ver todas →",
    solutionsTitle: "Soluciones por caso de uso", solutionsDesc: "¿Reconoces tu situación? Winerim ya lo resuelve.",
    ctaTitle: "¿Por qué hacerlo manual si Winerim lo automatiza?", ctaDesc: "Todo lo que ves en esta página — análisis, pricing, maridajes, rotación — Winerim lo hace automáticamente. Ahorra horas de gestión y vende más vino desde el primer día.",
    ctaPrimary: "Analizar mi carta gratis", ctaSecondary: "Solicitar demo",
    readMore: "Leer más →", download: "Descargar →", useTool: "Usar herramienta →", viewSolution: "Ver solución →",
  },
  en: {
    metaTitle: "Guides & Resources for Restaurants | Winerim",
    metaDesc: "Practical guides, free tools, and resources to optimize your wine list. Winerim automates all of this: save time, cut costs, and sell more.",
    heroLabel: "Knowledge center", heroTitle: "Guides & Resources",
    heroDesc: "Everything you need to know to monetize your wine list. The best part: Winerim automates it all so you can focus on selling.",
    guidesTitle: "Guides & Articles", guidesDesc: "Learn best practices — or let Winerim apply them automatically for you.",
    resourcesTitle: "Downloadable Resources", resourcesDesc: "Useful templates and checklists. As a Winerim client, they're already built into your dashboard.",
    toolsTitle: "Free Tools", toolsDesc: "Try them free here. As a Winerim client, they're all integrated and automated.", toolsAll: "View all →",
    solutionsTitle: "Solutions by Use Case", solutionsDesc: "Recognize your situation? Winerim already solves it.",
    ctaTitle: "Why do it manually when Winerim automates it?", ctaDesc: "Everything on this page — analysis, pricing, pairings, rotation — Winerim does it automatically. Save hours of management and sell more wine from day one.",
    ctaPrimary: "Analyze my list free", ctaSecondary: "Request demo",
    readMore: "Read more →", download: "Download →", useTool: "Use tool →", viewSolution: "View solution →",
  },
  it: {
    metaTitle: "Guide e Risorse per Ristoranti | Winerim",
    metaDesc: "Guide pratiche, strumenti e risorse per ottimizzare la tua carta dei vini. Winerim automatizza tutto: risparmia tempo, riduci costi e vendi di più.",
    heroLabel: "Centro conoscenze", heroTitle: "Guide e Risorse",
    heroDesc: "Tutto ciò che devi sapere per rendere redditizia la tua carta dei vini. E il bello è che Winerim automatizza tutto per te.",
    guidesTitle: "Guide e Articoli", guidesDesc: "Impara le best practice — oppure lascia che Winerim le applichi automaticamente.",
    resourcesTitle: "Risorse scaricabili", resourcesDesc: "Template e checklist utili. Come cliente Winerim, sono già integrate nel tuo pannello.",
    toolsTitle: "Strumenti gratuiti", toolsDesc: "Provali gratis qui. Come cliente Winerim, li hai tutti integrati e automatizzati.", toolsAll: "Vedi tutti →",
    solutionsTitle: "Soluzioni per caso d'uso", solutionsDesc: "Riconosci la tua situazione? Winerim la risolve già.",
    ctaTitle: "Perché farlo manualmente se Winerim lo automatizza?", ctaDesc: "Tutto quello che vedi in questa pagina — analisi, pricing, abbinamenti, rotazione — Winerim lo fa automaticamente. Risparmia ore di gestione e vendi più vino dal primo giorno.",
    ctaPrimary: "Analizza la mia carta gratis", ctaSecondary: "Richiedi demo",
    readMore: "Leggi di più →", download: "Scarica →", useTool: "Usa strumento →", viewSolution: "Vedi soluzione →",
  },
  fr: {
    metaTitle: "Guides et Ressources pour Restaurants | Winerim",
    metaDesc: "Guides pratiques, outils et ressources pour optimiser votre carte des vins. Winerim automatise tout : gagnez du temps, réduisez les coûts et vendez plus.",
    heroLabel: "Centre de connaissances", heroTitle: "Guides et Ressources",
    heroDesc: "Tout ce que vous devez savoir pour rentabiliser votre carte des vins. Et le meilleur : Winerim automatise tout pour que vous vous concentriez sur la vente.",
    guidesTitle: "Guides et Articles", guidesDesc: "Apprenez les bonnes pratiques — ou laissez Winerim les appliquer automatiquement.",
    resourcesTitle: "Ressources téléchargeables", resourcesDesc: "Modèles et checklists utiles. En tant que client Winerim, ils sont déjà intégrés à votre tableau de bord.",
    toolsTitle: "Outils gratuits", toolsDesc: "Essayez-les gratuitement ici. En tant que client Winerim, ils sont tous intégrés et automatisés.", toolsAll: "Voir tout →",
    solutionsTitle: "Solutions par cas d'usage", solutionsDesc: "Vous reconnaissez votre situation ? Winerim la résout déjà.",
    ctaTitle: "Pourquoi le faire manuellement quand Winerim l'automatise ?", ctaDesc: "Tout ce que vous voyez sur cette page — analyse, pricing, accords, rotation — Winerim le fait automatiquement. Économisez des heures de gestion et vendez plus de vin dès le premier jour.",
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
  { to: "/guias/como-estructurar-carta-vinos-grupo-restauracion", icon: Layers, title: "Carta de vinos para grupos de restauración", desc: "Cómo gestionar cartas coherentes en múltiples locales con control centralizado." },
  { to: "/guias/como-fijar-estrategia-rentable-vino-por-copa", icon: Wine, title: "Estrategia rentable de vino por copa", desc: "Selección, pricing, merma y rotación para un programa de copa profesional." },
  { to: "/guias/como-detectar-vinos-muertos-referencias-frenan-rentabilidad", icon: Search, title: "Detectar vinos muertos", desc: "Identifica referencias sin rotación, cuantifica el impacto y decide qué hacer." },
  { to: "/guias/como-formar-equipo-sala-para-vender-vino", icon: Users, title: "Formar al equipo de sala en vino", desc: "Programa práctico para que tu equipo recomiende vino sin ser sumiller." },
  { to: "/guias/como-usar-datos-para-decidir-que-vinos-comprar", icon: BarChart3, title: "Usar datos para comprar vinos", desc: "Rotación, márgenes y tendencias: cómo decidir qué comprar con criterio." },
  { to: "/guias/como-conectar-carta-stock-ventas-margen", icon: TrendingUp, title: "Conectar carta, stock, ventas y margen", desc: "Integra las 4 piezas de la gestión del vino en un sistema coherente." },
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
