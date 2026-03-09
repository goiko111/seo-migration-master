import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; subtitle: string;
  problemTitle: string; problemDesc: string; viewDiag: string;
  notFound: string; notFoundDesc: string; notFoundBtn: string;
  linksTitle: string;
}> = {
  es: {
    seoTitle: "Problemas con la Carta de Vinos | Diagnóstico y Solución",
    seoDesc: "¿Tu carta de vinos no funciona? Diagnóstico de los problemas más comunes y soluciones prácticas para restaurantes.",
    badge: "Diagnóstico", h1: "Problemas con la carta de vinos",
    subtitle: "Los problemas más frecuentes que afectan a las ventas de vino en restaurantes, con diagnóstico y soluciones prácticas.",
    problemTitle: "Mi carta de vinos no vende",
    problemDesc: "Las ventas de vino están estancadas, los clientes piden siempre lo más barato o directamente no piden vino. Diagnóstico y solución.",
    viewDiag: "Ver diagnóstico",
    notFound: "¿No encuentras tu problema?", notFoundDesc: "Analiza tu carta de vinos gratis y recibe un diagnóstico personalizado con recomendaciones de mejora.",
    notFoundBtn: "Analizar mi carta gratis", linksTitle: "Contenido relacionado",
  },
  en: {
    seoTitle: "Wine List Problems | Diagnosis and Solutions",
    seoDesc: "Is your wine list not working? Diagnosis of the most common problems and practical solutions for restaurants.",
    badge: "Diagnosis", h1: "Wine list problems",
    subtitle: "The most frequent problems affecting wine sales in restaurants, with diagnosis and practical solutions.",
    problemTitle: "My wine list doesn't sell",
    problemDesc: "Wine sales are stagnant, customers always order the cheapest option or skip wine altogether. Diagnosis and solution.",
    viewDiag: "View diagnosis",
    notFound: "Can't find your problem?", notFoundDesc: "Analyze your wine list for free and get a personalized diagnosis with improvement recommendations.",
    notFoundBtn: "Analyze my list free", linksTitle: "Related content",
  },
  it: {
    seoTitle: "Problemi con la Carta dei Vini | Diagnosi e Soluzioni",
    seoDesc: "La tua carta dei vini non funziona? Diagnosi dei problemi più comuni e soluzioni pratiche per ristoranti.",
    badge: "Diagnosi", h1: "Problemi con la carta dei vini",
    subtitle: "I problemi più frequenti che influenzano le vendite di vino nei ristoranti, con diagnosi e soluzioni pratiche.",
    problemTitle: "La mia carta dei vini non vende",
    problemDesc: "Le vendite di vino sono stagnanti, i clienti ordinano sempre il più economico o non ordinano vino. Diagnosi e soluzione.",
    viewDiag: "Vedi diagnosi",
    notFound: "Non trovi il tuo problema?", notFoundDesc: "Analizza la tua carta dei vini gratis e ricevi una diagnosi personalizzata con raccomandazioni di miglioramento.",
    notFoundBtn: "Analizza la mia carta gratis", linksTitle: "Contenuti correlati",
  },
  fr: {
    seoTitle: "Problèmes de Carte des Vins | Diagnostic et Solutions",
    seoDesc: "Votre carte des vins ne fonctionne pas ? Diagnostic des problèmes les plus courants et solutions pratiques pour restaurants.",
    badge: "Diagnostic", h1: "Problèmes de carte des vins",
    subtitle: "Les problèmes les plus fréquents qui affectent les ventes de vin dans les restaurants, avec diagnostic et solutions pratiques.",
    problemTitle: "Ma carte des vins ne vend pas",
    problemDesc: "Les ventes de vin stagnent, les clients commandent toujours le moins cher ou ne commandent pas de vin. Diagnostic et solution.",
    viewDiag: "Voir le diagnostic",
    notFound: "Vous ne trouvez pas votre problème ?", notFoundDesc: "Analysez votre carte des vins gratuitement et recevez un diagnostic personnalisé avec des recommandations d'amélioration.",
    notFoundBtn: "Analyser ma carte gratuitement", linksTitle: "Contenu associé",
  },
};

const Problemas = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/problemas")}`} hreflang={allLangPaths("/problemas")} />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: t.h1 }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">{t.badge}</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.h1}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{t.subtitle}</motion.p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <Link to="/problemas/carta-de-vinos-no-vende" className="group bg-gradient-card rounded-2xl border border-border hover:border-wine/50 transition-all block p-8 h-full hover:shadow-lg hover:shadow-wine/5">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                  <TrendingDown size={22} className="text-destructive" />
                </div>
                <h2 className="font-heading text-xl font-bold mb-3 group-hover:text-wine transition-colors">{t.problemTitle}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.problemDesc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent">{t.viewDiag} <ArrowRight size={12} /></span>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-10">
              <AlertTriangle size={28} className="text-wine mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold mb-3">{t.notFound}</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">{t.notFoundDesc}</p>
              <Link to="/analisis-carta" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                {t.notFoundBtn} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <InternalLinks title={t.linksTitle} links={[
          { to: "/como-vender-mas-vino-en-un-restaurante", label: lang === "es" ? "Cómo vender más vino" : "How to sell more wine", type: "guide" },
          { to: "/wine-list-analyzer", label: "Wine List Analyzer", type: "tool" },
        ]} />
      </main>
      <Footer />
    </div>
  );
};

export default Problemas;
