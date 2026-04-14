import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download, Wine, Search, DollarSign, BarChart3, Brain,
  FileText, CheckCircle, Layers, Building2, TrendingUp,
  ArrowRight, Package, Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/i18n/LanguageContext";

/* ── i18n content ── */
type LangContent = {
  metaTitle: string; metaDesc: string;
  heroLabel: string; heroTitle: string; heroHighlight: string; heroDesc: string;
  filterAll: string; download: string; items: string;
  ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string;
  alsoLabel: string; guidesLink: string; toolsLink: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Recursos descargables para restaurantes | Plantillas, checklists y scorecards | Winerim",
    metaDesc: "Descarga plantillas, checklists y scorecards profesionales para optimizar tu carta de vinos. Recursos accionables listos para aplicar hoy mismo.",
    heroLabel: "Biblioteca de recursos",
    heroTitle: "Herramientas accionables para ",
    heroHighlight: "aplicar hoy mismo",
    heroDesc: "Plantillas, checklists y scorecards profesionales diseñados para que mejores tu carta de vinos desde el primer día. Sin teoría, solo acción.",
    filterAll: "Todos", download: "Descargar recurso", items: "recursos",
    ctaTitle: "¿Quieres que todo esto se haga automáticamente?",
    ctaDesc: "Todo lo que ofrecen estos recursos — análisis de márgenes, control de rotación, scoring mensual — Winerim lo automatiza para ti.",
    ctaPrimary: "Solicitar demo", ctaSecondary: "Analizar mi carta gratis",
    alsoLabel: "También te interesa", guidesLink: "Guías para aprender", toolsLink: "Herramientas interactivas",
  },
  en: {
    metaTitle: "Downloadable Resources for Restaurants | Templates, Checklists & Scorecards | Winerim",
    metaDesc: "Download professional templates, checklists and scorecards to optimize your wine list. Actionable resources ready to apply today.",
    heroLabel: "Resource library",
    heroTitle: "Actionable tools to ",
    heroHighlight: "apply today",
    heroDesc: "Professional templates, checklists and scorecards designed to improve your wine list from day one. No theory, just action.",
    filterAll: "All", download: "Download resource", items: "resources",
    ctaTitle: "Want all of this done automatically?",
    ctaDesc: "Everything these resources offer — margin analysis, rotation control, monthly scoring — Winerim automates it for you.",
    ctaPrimary: "Request demo", ctaSecondary: "Analyze my list free",
    alsoLabel: "You may also like", guidesLink: "Guides to learn", toolsLink: "Interactive tools",
  },
  it: {
    metaTitle: "Risorse scaricabili per ristoranti | Template, checklist e scorecard | Winerim",
    metaDesc: "Scarica template, checklist e scorecard professionali per ottimizzare la tua carta dei vini. Risorse azionabili pronte da applicare oggi.",
    heroLabel: "Libreria risorse",
    heroTitle: "Strumenti azionabili da ",
    heroHighlight: "applicare subito",
    heroDesc: "Template, checklist e scorecard professionali per migliorare la tua carta dei vini dal primo giorno. Niente teoria, solo azione.",
    filterAll: "Tutti", download: "Scarica risorsa", items: "risorse",
    ctaTitle: "Vuoi che tutto questo sia automatico?",
    ctaDesc: "Tutto quello che offrono queste risorse — analisi margini, controllo rotazione, scoring mensile — Winerim lo automatizza per te.",
    ctaPrimary: "Richiedi demo", ctaSecondary: "Analizza la mia carta gratis",
    alsoLabel: "Potrebbe interessarti anche", guidesLink: "Guide per imparare", toolsLink: "Strumenti interattivi",
  },
  fr: {
    metaTitle: "Ressources téléchargeables pour restaurants | Modèles, checklists et scorecards | Winerim",
    metaDesc: "Téléchargez des modèles, checklists et scorecards professionnels pour optimiser votre carte des vins. Ressources actionnables prêtes à l'emploi.",
    heroLabel: "Bibliothèque de ressources",
    heroTitle: "Outils actionnables à ",
    heroHighlight: "appliquer aujourd'hui",
    heroDesc: "Modèles, checklists et scorecards professionnels pour améliorer votre carte des vins dès le premier jour. Pas de théorie, que de l'action.",
    filterAll: "Tous", download: "Télécharger", items: "ressources",
    ctaTitle: "Vous voulez que tout cela soit automatique ?",
    ctaDesc: "Tout ce qu'offrent ces ressources — analyse des marges, contrôle de la rotation, scoring mensuel — Winerim l'automatise pour vous.",
    ctaPrimary: "Demander une démo", ctaSecondary: "Analyser ma carte gratuitement",
    alsoLabel: "Vous aimerez aussi", guidesLink: "Guides pour apprendre", toolsLink: "Outils interactifs",
  },
};

/* ── Resource type config ── */
const typeConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  plantilla: { label: "Plantilla", icon: FileText, className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  checklist: { label: "Checklist", icon: CheckCircle, className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  scorecard: { label: "Scorecard", icon: BarChart3, className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  revision: { label: "Revisión", icon: Search, className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  control: { label: "Control", icon: Building2, className: "bg-wine/10 text-wine border-wine/20" },
};

type ResourceItem = {
  to: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  type: keyof typeof typeConfig;
  tags: string[];
};

const resources: ResourceItem[] = [
  { to: "/recursos/plantilla-carta-de-vinos", icon: FileText, title: "Plantilla de carta de vinos", desc: "Plantilla profesional para diseñar y estructurar tu carta de vinos desde cero.", type: "plantilla", tags: ["estructura", "inicio"] },
  { to: "/recursos/checklist-carta-de-vinos-rentable", icon: CheckCircle, title: "Checklist carta rentable", desc: "Revisa punto por punto si tu carta está optimizada para vender.", type: "checklist", tags: ["rentabilidad", "intermedio"] },
  { to: "/recursos/guia-vino-por-copa-para-restaurantes", icon: Wine, title: "Guía vino por copa", desc: "Todo sobre cómo diseñar y rentabilizar tu oferta de vino por copa.", type: "plantilla", tags: ["copa", "intermedio"] },
  { to: "/recursos/plantilla-wine-mapping-restaurante", icon: Layers, title: "Plantilla wine mapping", desc: "Estructura precios y distribución de vinos en tu carta con criterio.", type: "plantilla", tags: ["pricing", "intermedio"] },
  { to: "/recursos/plantilla-estrategia-vinos-por-copa", icon: Wine, title: "Estrategia de vinos por copa", desc: "Plan operativo completo para diseñar, ejecutar y controlar tu programa de copa.", type: "plantilla", tags: ["copa", "avanzado"] },
  { to: "/recursos/checklist-deteccion-vinos-muertos", icon: Search, title: "Detección de vinos muertos", desc: "Identifica referencias sin rotación y cuantifica el capital inmovilizado.", type: "checklist", tags: ["rotación", "intermedio"] },
  { to: "/recursos/plantilla-formacion-equipo-sala", icon: Brain, title: "Formación exprés para sala", desc: "Programa de formación en vino para tu equipo de sala en menos de 2 semanas.", type: "plantilla", tags: ["equipo", "inicio"] },
  { to: "/recursos/plantilla-analisis-margenes", icon: DollarSign, title: "Análisis de márgenes", desc: "Analiza la rentabilidad de cada referencia: coste, PVP, multiplicador y contribución.", type: "revision", tags: ["pricing", "avanzado"] },
  { to: "/recursos/scorecard-rendimiento-carta", icon: BarChart3, title: "Scorecard mensual", desc: "KPIs esenciales de tu carta cada mes: ventas, rotación, margen y vino por copa.", type: "scorecard", tags: ["analítica", "avanzado"] },
  { to: "/recursos/checklist-carta-que-vende", icon: TrendingUp, title: "¿Tu carta realmente vende?", desc: "30 puntos para evaluar la capacidad de conversión de tu carta de vinos.", type: "checklist", tags: ["rentabilidad", "inicio"] },
  { to: "/recursos/plantilla-equilibrio-carta", icon: Layers, title: "Equilibrio de carta", desc: "Analiza el equilibrio por estilos, regiones, precios y tipologías.", type: "plantilla", tags: ["estructura", "intermedio"] },
  { to: "/recursos/plantilla-revision-mensual-carta", icon: FileText, title: "Revisión mensual de carta", desc: "Proceso estructurado para revisar tu carta cada mes con datos reales.", type: "revision", tags: ["analítica", "avanzado"] },
  { to: "/recursos/revision-mensual-margenes", icon: DollarSign, title: "Revisión mensual de márgenes", desc: "Una plantilla para revisar cada mes si tu carta está perdiendo margen y decidir qué corregir antes de que el problema crezca.", type: "revision", tags: ["pricing", "rentabilidad", "avanzado"] },
  { to: "/recursos/plantilla-control-grupo-restauracion", icon: Building2, title: "Control para grupos", desc: "Dashboard comparativo, surtido centralizado y benchmarking entre locales.", type: "control", tags: ["grupo", "avanzado"] },
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
  { key: "grupo", label: "Grupos" },
];

const Recursos = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = langContent[lang] || langContent.es;
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? resources : resources.filter(r => r.tags.includes(filter));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/recursos"
        hreflang={allLangPaths("/recursos")} />
      <main>
        {/* ── Hero ── */}
        <section className="pt-32 pb-14 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[160px]" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-wine/4 rounded-full blur-[120px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: lang === "es" ? "Recursos" : lang === "en" ? "Resources" : lang === "it" ? "Risorse" : "Ressources" }]} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-6">
              <Package size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">{t.heroLabel}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.heroTitle}
              <span className="text-gradient-wine">{t.heroHighlight}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
              {t.heroDesc}
            </motion.p>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">{resources.length}</strong> {t.items}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">Excel</strong> + PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-muted-foreground"><strong className="text-foreground">100%</strong> {lang === "es" ? "gratis" : "free"}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filter + Grid ── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {taxonomyFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all border ${
                    filter === f.key
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-transparent text-muted-foreground border-border hover:border-emerald-500/30"
                  }`}
                >
                  {f.key === "all" ? t.filterAll : f.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Counter */}
          <p className="text-xs text-muted-foreground mb-6 font-medium tracking-wider uppercase">
            {filtered.length} {t.items}
          </p>

          {/* Resource cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const Icon = item.icon;
              const typeCfg = typeConfig[item.type];
              const TypeIcon = typeCfg.icon;
              return (
                <ScrollReveal key={item.to} delay={i * 0.03}>
                  <Link to={item.to}
                    className="group relative bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-emerald-500/30 transition-all block p-6 h-full hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 duration-300">
                    {/* Type badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${typeCfg.className}`}>
                        <TypeIcon size={10} />
                        {typeCfg.label}
                      </span>
                      <Download size={14} className="text-muted-foreground/40 group-hover:text-emerald-400 transition-colors" />
                    </div>

                    {/* Icon + content */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/15 transition-colors">
                        <Icon size={18} className="text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-bold mb-1 group-hover:text-emerald-400 transition-colors duration-300 leading-snug">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-emerald-400/70 group-hover:text-emerald-400 transition-colors">
                      {t.download} <ArrowRight size={10} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-16">
              {lang === "es" ? "No hay recursos con este filtro." : "No resources match this filter."}
            </p>
          )}
        </section>

        {/* ── Cross-links ── */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground/60 mb-4">{t.alsoLabel}</p>
            <div className="flex flex-wrap gap-3">
              <Link to={localePath("/guias-y-recursos")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/60 hover:border-blue-500/30 transition-all text-sm group">
                <Sparkles size={14} className="text-blue-400" />
                <span className="font-medium group-hover:text-blue-400 transition-colors">{t.guidesLink}</span>
              </Link>
              <Link to={localePath("/herramientas")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card/60 hover:border-amber-500/30 transition-all text-sm group">
                <Sparkles size={14} className="text-amber-400" />
                <span className="font-medium group-hover:text-amber-400 transition-colors">{t.toolsLink}</span>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/analisis-carta")} className="border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
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

export default Recursos;
