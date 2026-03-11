import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, BarChart3, Utensils, Wine, TrendingUp, DollarSign, Search, GlassWater, RotateCcw, ClipboardList } from "lucide-react";
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
    seoDesc: "Calculadoras, analizadores y generadores gratuitos para tu carta de vinos. Como cliente de Winerim, todo esto va automatizado.",
    badge: "Herramientas gratuitas", h1: "Optimiza tu carta de vinos",
    subtitle: "Prueba gratis estas herramientas de análisis, pricing y maridaje. La buena noticia: como cliente de Winerim, todo esto se ejecuta automáticamente — sin trabajo manual, sin perder tiempo, con resultados desde el día uno.",
    useTool: "Probar gratis →", guidesTitle: "Guías relacionadas",
    ctaTitle: "¿Y si todo esto fuese automático?",
    ctaDesc: "Con Winerim, no necesitas usar estas herramientas una por una. Nuestra plataforma analiza tu carta, optimiza precios, sugiere maridajes y controla la rotación — todo en automático. Ahorra horas de gestión cada semana y aumenta tus ventas de vino.",
    ctaBtn1: "Analizar mi carta gratis", ctaBtn2: "Solicitar demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analizador de carta de vinos", desc: "Sube tu carta y recibe un análisis con recomendaciones de mejora. Con Winerim, este análisis se actualiza automáticamente cada semana.", tag: "Análisis" },
      { to: "/calculadora-margen-vino", title: "Calculadora de márgenes de vino", desc: "Calcula el margen óptimo para cada referencia. Como cliente de Winerim, los márgenes se optimizan automáticamente según tus objetivos.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculadora de precio por copa", desc: "Calcula el precio ideal por copa. Winerim lo calcula por ti y te alerta cuando conviene ajustar precios.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Herramienta de pricing de vinos", desc: "Optimiza la estructura de precios de tu carta. Con Winerim, el pricing inteligente se aplica en tiempo real.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Generador de maridajes con IA", desc: "Genera sugerencias de maridaje con IA. Con Winerim, tus camareros reciben recomendaciones automáticas en cada servicio.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculadora de ROI", desc: "Calcula cuánto puedes ganar digitalizando tu carta. Nuestros clientes incrementan sus ventas de vino una media del 30%.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark de cartas de vinos", desc: "Compara tu carta con los estándares del sector. Winerim te envía informes automáticos con tu posición competitiva.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "Diagnóstico de vino por copa", desc: "Evalúa si tu oferta por copa está equilibrada en estilos, precios y rentabilidad. Con Winerim, esto se monitoriza en tiempo real.", tag: "Diagnóstico" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Audita tu carta con un score de 0 a 100. Estructura, equilibrio, pricing, copa, rotación y potencial comercial en un solo diagnóstico.", tag: "Auditoría" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Calculadora de stock muerto", desc: "Estima el capital inmovilizado en vinos sin rotación. Winerim lo detecta automáticamente y te alerta antes de que se acumule.", tag: "Gestión" },
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
    seoDesc: "Free calculators, analyzers and generators for your wine list. As a Winerim client, all of this is automated.",
    badge: "Free tools", h1: "Optimize your wine list",
    subtitle: "Try these analysis, pricing and pairing tools for free. The good news: as a Winerim client, all of this runs automatically — no manual work, no wasted time, results from day one.",
    useTool: "Try free →", guidesTitle: "Related guides",
    ctaTitle: "What if all of this were automatic?",
    ctaDesc: "With Winerim, you don't need to use these tools one by one. Our platform analyzes your list, optimizes prices, suggests pairings and controls rotation — all automatically. Save hours of management every week and increase wine sales.",
    ctaBtn1: "Analyze my list free", ctaBtn2: "Request demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Wine List Analyzer", desc: "Upload your list and get improvement recommendations. With Winerim, this analysis updates automatically every week.", tag: "Analysis" },
      { to: "/calculadora-margen-vino", title: "Wine Margin Calculator", desc: "Calculate the optimal margin for each reference. As a Winerim client, margins are optimized automatically based on your goals.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "By-the-Glass Price Calculator", desc: "Calculate the ideal price per glass. Winerim calculates it for you and alerts you when to adjust prices.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Wine Pricing Tool", desc: "Optimize your entire pricing structure. With Winerim, smart pricing is applied in real time.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "AI Pairing Generator", desc: "Generate AI pairing suggestions. With Winerim, your waitstaff get automatic recommendations every service.", tag: "AI" },
      { to: "/wine-roi-calculator", title: "ROI Calculator", desc: "Calculate how much you can earn by digitizing your list. Our clients increase wine sales by an average of 30%.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Wine List Benchmark", desc: "Compare your list against industry standards. Winerim sends you automatic reports with your competitive position.", tag: "Benchmark" },
      { to: "/herramientas/diagnostico-vino-por-copa", title: "By-the-Glass Diagnostic", desc: "Evaluate if your by-the-glass offering is balanced in styles, prices and profitability.", tag: "Diagnostic" },
      { to: "/herramientas/wine-list-score", title: "Wine List Score", desc: "Audit your wine list with a 0-100 score across structure, balance, pricing, rotation and commercial potential.", tag: "Audit" },
      { to: "/herramientas/calculadora-stock-muerto", title: "Dead Stock Calculator", desc: "Estimate tied-up capital in slow-moving wines. Winerim detects this automatically.", tag: "Management" },
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
    seoDesc: "Calcolatrici, analizzatori e generatori gratuiti per la tua carta dei vini. Come cliente Winerim, tutto è automatizzato.",
    badge: "Strumenti gratuiti", h1: "Ottimizza la tua carta dei vini",
    subtitle: "Prova gratis questi strumenti di analisi, pricing e abbinamento. La buona notizia: come cliente Winerim, tutto funziona in automatico — senza lavoro manuale, senza perdere tempo, con risultati dal primo giorno.",
    useTool: "Prova gratis →", guidesTitle: "Guide correlate",
    ctaTitle: "E se tutto fosse automatico?",
    ctaDesc: "Con Winerim, non devi usare questi strumenti uno per uno. La nostra piattaforma analizza la tua carta, ottimizza i prezzi, suggerisce abbinamenti e controlla la rotazione — tutto in automatico. Risparmia ore di gestione ogni settimana e aumenta le vendite di vino.",
    ctaBtn1: "Analizza la mia carta gratis", ctaBtn2: "Richiedi demo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analizzatore carta dei vini", desc: "Carica la tua carta e ricevi raccomandazioni di miglioramento. Con Winerim, questa analisi si aggiorna automaticamente ogni settimana.", tag: "Analisi" },
      { to: "/calculadora-margen-vino", title: "Calcolatrice margini vino", desc: "Calcola il margine ottimale per ogni referenza. Come cliente Winerim, i margini si ottimizzano automaticamente.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calcolatrice prezzo al calice", desc: "Calcola il prezzo ideale al calice. Winerim lo calcola per te e ti avvisa quando conviene aggiustare i prezzi.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Strumento pricing vini", desc: "Ottimizza la struttura prezzi della tua carta. Con Winerim, il pricing intelligente si applica in tempo reale.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Generatore abbinamenti IA", desc: "Genera suggerimenti di abbinamento con IA. Con Winerim, il personale riceve raccomandazioni automatiche ad ogni servizio.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calcolatrice ROI", desc: "Calcola quanto puoi guadagnare digitalizzando la tua carta. I nostri clienti aumentano le vendite di vino del 30% in media.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark carte dei vini", desc: "Confronta la tua carta con gli standard del settore. Winerim ti invia report automatici con la tua posizione competitiva.", tag: "Benchmark" },
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
    seoDesc: "Calculateurs, analyseurs et générateurs gratuits pour votre carte des vins. En tant que client Winerim, tout est automatisé.",
    badge: "Outils gratuits", h1: "Optimisez votre carte des vins",
    subtitle: "Essayez gratuitement ces outils d'analyse, pricing et accords. La bonne nouvelle : en tant que client Winerim, tout fonctionne automatiquement — sans travail manuel, sans perte de temps, avec des résultats dès le premier jour.",
    useTool: "Essayer gratuitement →", guidesTitle: "Guides associés",
    ctaTitle: "Et si tout était automatique ?",
    ctaDesc: "Avec Winerim, pas besoin d'utiliser ces outils un par un. Notre plateforme analyse votre carte, optimise les prix, suggère des accords et contrôle la rotation — tout automatiquement. Économisez des heures de gestion chaque semaine et augmentez vos ventes de vin.",
    ctaBtn1: "Analyser ma carte gratuitement", ctaBtn2: "Demander une démo",
    tools: [
      { to: "/wine-list-analyzer", title: "Analyseur de carte des vins", desc: "Téléchargez votre carte et recevez des recommandations. Avec Winerim, cette analyse se met à jour automatiquement chaque semaine.", tag: "Analyse" },
      { to: "/calculadora-margen-vino", title: "Calculateur de marges vin", desc: "Calculez la marge optimale pour chaque référence. En tant que client Winerim, les marges s'optimisent automatiquement.", tag: "Pricing" },
      { to: "/herramientas/calculadora-precio-vino-por-copa", title: "Calculateur prix au verre", desc: "Calculez le prix idéal au verre. Winerim le calcule pour vous et vous alerte quand il faut ajuster les prix.", tag: "Pricing" },
      { to: "/wine-pricing-tool", title: "Outil de pricing vins", desc: "Optimisez la structure de prix de votre carte. Avec Winerim, le pricing intelligent s'applique en temps réel.", tag: "Pricing" },
      { to: "/wine-pairing-generator", title: "Générateur d'accords IA", desc: "Générez des suggestions d'accords avec l'IA. Avec Winerim, votre personnel reçoit des recommandations automatiques à chaque service.", tag: "IA" },
      { to: "/wine-roi-calculator", title: "Calculateur de ROI", desc: "Calculez combien vous pouvez gagner en digitalisant votre carte. Nos clients augmentent leurs ventes de vin de 30% en moyenne.", tag: "ROI" },
      { to: "/wine-list-benchmark", title: "Benchmark cartes des vins", desc: "Comparez votre carte aux standards du secteur. Winerim vous envoie des rapports automatiques avec votre position concurrentielle.", tag: "Benchmark" },
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
