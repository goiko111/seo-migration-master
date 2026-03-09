import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, BarChart3, Utensils, Wine, TrendingUp, DollarSign, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; subtitle: string;
  useTool: string; guidesTitle: string; ctaTitle: string; ctaDesc: string; ctaBtn1: string; ctaBtn2: string;
  tools: { to: string; title: string; desc: string; tag: string }[];
  guides: { to: string; label: string }[];
}> = {
  es: {
    seoTitle: "Herramientas gratuitas para carta de vinos",
    seoDesc: "Calculadoras, analizadores y generadores gratuitos para optimizar la carta de vinos de tu restaurante.",
    badge: "Herramientas gratuitas", h1: "Optimiza tu carta de vinos",
    subtitle: "Calculadoras de márgenes, analizadores de carta, generadores de maridaje y más. Todas las herramientas que necesitas para tomar mejores decisiones sobre tu oferta de vinos.",
    useTool: "Usar herramienta →", guidesTitle: "Guías relacionadas",
    ctaTitle: "¿Quieres ir más allá?", ctaDesc: "Winerim te da todas estas herramientas integradas en una plataforma inteligente para gestionar tu carta de vinos.",
    ctaBtn1: "Analizar mi carta gratis", ctaBtn2: "Solicitar demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analizador de carta de vinos", desc: "Sube tu carta y recibe un análisis detallado con recomendaciones de mejora en estructura, pricing y equilibrio.", tag: "Análisis" },
      { to: "/calculadora-margen-vino", title: "Calculadora de márgenes de vino", desc: "Calcula el margen óptimo para cada referencia de tu carta según coste de botella y multiplicador.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculadora de precio por copa", desc: "Calcula el precio ideal por copa considerando coste, copas por botella y margen objetivo.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Herramienta de pricing de vinos", desc: "Optimiza la estructura de precios de toda tu carta para maximizar márgenes y percepción de valor.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Generador de maridajes con IA", desc: "Genera sugerencias de maridaje personalizadas para los platos de tu carta usando inteligencia artificial.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculadora de ROI", desc: "Calcula el retorno de inversión de digitalizar tu carta de vinos con Winerim.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark de cartas de vinos", desc: "Compara los indicadores de tu carta con los estándares del sector hostelero.", tag: "Benchmark" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino en un restaurante" },
      { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta de vinos rentable" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping para restaurantes" },
    ],
  },
  en: {
    seoTitle: "Free Wine List Tools for Restaurants",
    seoDesc: "Free calculators, analyzers and generators to optimize your restaurant's wine list.",
    badge: "Free tools", h1: "Optimize your wine list",
    subtitle: "Margin calculators, wine list analyzers, pairing generators and more. All the tools you need to make better decisions about your wine offering.",
    useTool: "Use tool →", guidesTitle: "Related guides",
    ctaTitle: "Want to go further?", ctaDesc: "Winerim gives you all these tools integrated into an intelligent platform to manage your wine list.",
    ctaBtn1: "Analyze my list free", ctaBtn2: "Request demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Wine List Analyzer", desc: "Upload your wine list and receive a detailed analysis with improvement recommendations on structure, pricing and balance.", tag: "Analysis" },
      { to: "/calculadora-margen-vino", title: "Wine Margin Calculator", desc: "Calculate the optimal margin for each reference on your list based on bottle cost and multiplier.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "By-the-Glass Price Calculator", desc: "Calculate the ideal price per glass considering cost, glasses per bottle and target margin.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Wine Pricing Tool", desc: "Optimize the entire pricing structure of your wine list to maximize margins and perceived value.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "AI Pairing Generator", desc: "Generate personalized pairing suggestions for your menu dishes using artificial intelligence.", tag: "AI" },
      { to: "/wine-roi-calculator", title: "ROI Calculator", desc: "Calculate the return on investment of digitizing your wine list with Winerim.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Wine List Benchmark", desc: "Compare your wine list indicators against hospitality industry standards.", tag: "Benchmark" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "How to price wine in a restaurant" },
      { to: "/vino-por-copa-restaurante", label: "Wine by the glass in restaurants" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "How to design a profitable wine list" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Wine mapping template for restaurants" },
    ],
  },
  it: {
    seoTitle: "Strumenti Gratuiti per la Carta dei Vini",
    seoDesc: "Calcolatrici, analizzatori e generatori gratuiti per ottimizzare la carta dei vini del tuo ristorante.",
    badge: "Strumenti gratuiti", h1: "Ottimizza la tua carta dei vini",
    subtitle: "Calcolatrici di margini, analizzatori di carta, generatori di abbinamenti e altro. Tutti gli strumenti per prendere decisioni migliori sulla tua offerta di vini.",
    useTool: "Usa strumento →", guidesTitle: "Guide correlate",
    ctaTitle: "Vuoi andare oltre?", ctaDesc: "Winerim ti offre tutti questi strumenti integrati in una piattaforma intelligente per gestire la tua carta dei vini.",
    ctaBtn1: "Analizza la mia carta gratis", ctaBtn2: "Richiedi demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analizzatore carta dei vini", desc: "Carica la tua carta e ricevi un'analisi dettagliata con raccomandazioni di miglioramento.", tag: "Analisi" },
      { to: "/calculadora-margen-vino", title: "Calcolatrice margini vino", desc: "Calcola il margine ottimale per ogni referenza in base al costo bottiglia e moltiplicatore.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calcolatrice prezzo al calice", desc: "Calcola il prezzo ideale al calice considerando costo, calici per bottiglia e margine obiettivo.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Strumento pricing vini", desc: "Ottimizza la struttura prezzi della tua carta per massimizzare margini e percezione di valore.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Generatore abbinamenti IA", desc: "Genera suggerimenti di abbinamento personalizzati per i piatti del tuo menu usando l'intelligenza artificiale.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calcolatrice ROI", desc: "Calcola il ritorno sull'investimento della digitalizzazione della tua carta dei vini.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark carte dei vini", desc: "Confronta gli indicatori della tua carta con gli standard del settore ristorazione.", tag: "Benchmark" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Come prezzare il vino al ristorante" },
      { to: "/vino-por-copa-restaurante", label: "Vino al calice nei ristoranti" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Come progettare una carta dei vini redditizia" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Template wine mapping per ristoranti" },
    ],
  },
  fr: {
    seoTitle: "Outils Gratuits pour la Carte des Vins",
    seoDesc: "Calculateurs, analyseurs et générateurs gratuits pour optimiser la carte des vins de votre restaurant.",
    badge: "Outils gratuits", h1: "Optimisez votre carte des vins",
    subtitle: "Calculateurs de marges, analyseurs de carte, générateurs d'accords et plus. Tous les outils pour prendre de meilleures décisions sur votre offre de vins.",
    useTool: "Utiliser l'outil →", guidesTitle: "Guides associés",
    ctaTitle: "Vous voulez aller plus loin ?", ctaDesc: "Winerim vous offre tous ces outils intégrés dans une plateforme intelligente pour gérer votre carte des vins.",
    ctaBtn1: "Analyser ma carte gratuitement", ctaBtn2: "Demander une démo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analyseur de carte des vins", desc: "Téléchargez votre carte et recevez une analyse détaillée avec des recommandations d'amélioration.", tag: "Analyse" },
      { to: "/calculadora-margen-vino", title: "Calculateur de marges vin", desc: "Calculez la marge optimale pour chaque référence selon le coût bouteille et le multiplicateur.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculateur prix au verre", desc: "Calculez le prix idéal au verre en tenant compte du coût, des verres par bouteille et de la marge cible.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Outil de pricing vins", desc: "Optimisez la structure de prix de toute votre carte pour maximiser marges et perception de valeur.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Générateur d'accords IA", desc: "Générez des suggestions d'accords personnalisées pour les plats de votre menu grâce à l'IA.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculateur de ROI", desc: "Calculez le retour sur investissement de la digitalisation de votre carte des vins.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark cartes des vins", desc: "Comparez les indicateurs de votre carte aux standards du secteur de la restauration.", tag: "Benchmark" },
    ],
    guides: [
      { to: "/precio-vino-restaurante", label: "Comment fixer le prix du vin au restaurant" },
      { to: "/vino-por-copa-restaurante", label: "Vin au verre dans les restaurants" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Comment concevoir une carte des vins rentable" },
      { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Template wine mapping pour restaurants" },
    ],
  },
};

const toolIcons = [Search, Calculator, Wine, DollarSign, Utensils, TrendingUp, BarChart3];

const Herramientas = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`https://winerim.wine${localePath("/herramientas")}`}
        hreflang={allLangPaths("/herramientas")}
      />
      <main>
        <section className="pt-32 pb-16 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.h1 }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.badge}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.h1}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.tools.map((tool, i) => {
              const Icon = toolIcons[i] || Search;
              return (
                <ScrollReveal key={tool.to} delay={i * 0.04}>
                  <Link to={tool.to} className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">{tool.tag}</span>
                    </div>
                    <h2 className="font-heading font-bold mb-2 group-hover:text-wine transition-colors">{tool.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                    <span className="mt-4 text-xs font-semibold tracking-widest uppercase text-accent block">{t.useTool}</span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-6">{t.guidesTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {t.guides.map((link) => (
              <ScrollReveal key={link.to}>
                <Link to={link.to} className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-wine/50 transition-all">
                  <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
                  <span className="ml-auto text-muted-foreground group-hover:text-wine transition-colors text-xs">→</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/analisis-carta" className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  {t.ctaBtn1}
                </Link>
                <Link to={localePath("/demo")} className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  {t.ctaBtn2}
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

export default Herramientas;
