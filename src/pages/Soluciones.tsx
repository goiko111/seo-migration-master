import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import SummaryBox from "@/components/seo/SummaryBox";
import FAQSection from "@/components/seo/FAQSection";
import CredibilitySection from "@/components/seo/CredibilitySection";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seoTitle: string; seoDesc: string; badge: string; h1: string; subtitle: string;
  solutions: { title: string; desc: string; esPath: string }[];
  diagTitle: string; diagDesc: string; diagLink: string;
  linksTitle: string;
}> = {
  es: {
    seoTitle: "Soluciones para Restaurantes | Winerim",
    seoDesc: "Soluciones específicas de gestión de carta de vinos: grupos de restauración, aumento de ticket medio y más.",
    badge: "Por caso de uso", h1: "Soluciones Winerim",
    subtitle: "Cada restaurante tiene necesidades distintas. Descubre cómo Winerim se adapta a tu tipo de negocio y tus objetivos.",
    solutions: [
      { title: "Winerim para grupos de restauración", desc: "Gestión centralizada del vino para grupos con múltiples restaurantes. Control de cartas, precios y stock desde un solo panel.", esPath: "/soluciones/grupos-restauracion" },
      { title: "Aumentar el ticket medio", desc: "Estrategias basadas en datos para aumentar el gasto medio por cliente usando el vino como palanca de rentabilidad.", esPath: "/soluciones/aumentar-ticket-medio-restaurante" },
    ],
    diagTitle: "¿Tu carta de vinos no vende?", diagDesc: "Diagnóstico gratuito de los problemas más comunes que frenan las ventas de vino en restaurantes.",
    diagLink: "Ver diagnóstico", linksTitle: "Contenido relacionado",
  },
  en: {
    seoTitle: "Solutions for Restaurants | Winerim",
    seoDesc: "Specific wine list management solutions: restaurant groups, average ticket increase and more.",
    badge: "By use case", h1: "Winerim Solutions",
    subtitle: "Every restaurant has different needs. Discover how Winerim adapts to your business type and goals.",
    solutions: [
      { title: "Winerim for restaurant groups", desc: "Centralized wine management for groups with multiple restaurants. Control menus, pricing and stock from a single dashboard.", esPath: "/soluciones/grupos-restauracion" },
      { title: "Increase average ticket", desc: "Data-driven strategies to increase average spend per customer using wine as a profitability lever.", esPath: "/soluciones/aumentar-ticket-medio-restaurante" },
    ],
    diagTitle: "Is your wine list not selling?", diagDesc: "Free diagnosis of the most common problems that hold back wine sales in restaurants.",
    diagLink: "View diagnosis", linksTitle: "Related content",
  },
  it: {
    seoTitle: "Soluzioni per Ristoranti | Winerim",
    seoDesc: "Soluzioni specifiche per la gestione della carta dei vini: gruppi di ristorazione, aumento dello scontrino medio e altro.",
    badge: "Per caso d'uso", h1: "Soluzioni Winerim",
    subtitle: "Ogni ristorante ha esigenze diverse. Scopri come Winerim si adatta al tuo tipo di attività e ai tuoi obiettivi.",
    solutions: [
      { title: "Winerim per gruppi di ristorazione", desc: "Gestione centralizzata del vino per gruppi con più ristoranti. Controllo delle carte, prezzi e stock da un unico pannello.", esPath: "/soluciones/grupos-restauracion" },
      { title: "Aumentare lo scontrino medio", desc: "Strategie basate sui dati per aumentare la spesa media per cliente usando il vino come leva di redditività.", esPath: "/soluciones/aumentar-ticket-medio-restaurante" },
    ],
    diagTitle: "La tua carta dei vini non vende?", diagDesc: "Diagnosi gratuita dei problemi più comuni che frenano le vendite di vino nei ristoranti.",
    diagLink: "Vedi diagnosi", linksTitle: "Contenuti correlati",
  },
  fr: {
    seoTitle: "Solutions pour Restaurants | Winerim",
    seoDesc: "Solutions spécifiques de gestion de carte des vins : groupes de restauration, augmentation du ticket moyen et plus.",
    badge: "Par cas d'usage", h1: "Solutions Winerim",
    subtitle: "Chaque restaurant a des besoins différents. Découvrez comment Winerim s'adapte à votre type d'établissement et vos objectifs.",
    solutions: [
      { title: "Winerim pour les groupes de restauration", desc: "Gestion centralisée du vin pour les groupes multi-restaurants. Contrôle des cartes, prix et stocks depuis un seul tableau de bord.", esPath: "/soluciones/grupos-restauracion" },
      { title: "Augmenter le ticket moyen", desc: "Stratégies basées sur les données pour augmenter la dépense moyenne par client en utilisant le vin comme levier de rentabilité.", esPath: "/soluciones/aumentar-ticket-medio-restaurante" },
    ],
    diagTitle: "Votre carte des vins ne vend pas ?", diagDesc: "Diagnostic gratuit des problèmes les plus courants qui freinent les ventes de vin dans les restaurants.",
    diagLink: "Voir le diagnostic", linksTitle: "Contenu associé",
  },
};

const solutionIcons = [Building2, BarChart3];

const Soluciones = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`https://winerim.wine${localePath("/soluciones")}`}
        hreflang={allLangPaths("/soluciones")}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
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

        {/* Summary Box */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
          <ScrollReveal>
            <SummaryBox
              label={lang === "es" ? "¿Qué son las soluciones Winerim?" : "What are Winerim Solutions?"}
              definition={lang === "es"
                ? "Las soluciones Winerim son estrategias específicas de gestión del vino adaptadas a cada tipo de negocio. No son planes genéricos: cada solución aborda un problema concreto con herramientas, datos y metodología probada en restauración real."
                : "Winerim Solutions are specific wine management strategies adapted to each business type. Not generic plans: each solution addresses a concrete problem with tools, data and methodology proven in real hospitality."
              }
              bullets={lang === "es" ? [
                "Cada solución incluye diagnóstico, implementación y seguimiento",
                "Basadas en datos reales de restaurantes, no en teoría",
                "Adaptadas al tamaño y tipo de negocio: desde restaurantes individuales hasta grupos",
                "Resultados medibles desde las primeras semanas de implementación",
              ] : [
                "Each solution includes diagnosis, implementation and follow-up",
                "Based on real restaurant data, not theory",
                "Adapted to business size and type: from individual restaurants to groups",
                "Measurable results from the first weeks of implementation",
              ]}
            />
          </ScrollReveal>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {t.solutions.map((item, i) => {
              const Icon = solutionIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <Link
                    to={localePath(item.esPath)}
                    className="group bg-gradient-card rounded-xl border border-border hover:border-wine/30 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5 duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h2 className="font-heading text-xl font-bold mb-3 group-hover:text-wine transition-colors">{item.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent">
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                  <TrendingUp size={18} className="text-wine" />
                </div>
                <h2 className="font-heading text-xl font-bold mb-2">{t.diagTitle}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.diagDesc}</p>
                <Link
                  to="/problemas/carta-de-vinos-no-vende"
                  className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent hover:text-wine transition-colors"
                >
                  {t.diagLink} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <FAQSection
          schemaId="soluciones"
          title={lang === "es" ? "Preguntas frecuentes" : "FAQ"}
          faqs={lang === "es" ? [
            { q: "¿Winerim sirve para cualquier tipo de restaurante?", a: "Winerim está diseñado para restaurantes, hoteles, wine bars y grupos de restauración que tengan al menos 30-40 referencias de vino en carta. Para establecimientos con menos de 20 referencias, las herramientas gratuitas pueden ser suficientes." },
            { q: "¿Cuánto tiempo lleva implementar una solución?", a: "La implementación básica (digitalización de la carta y configuración inicial) se completa en 1-5 días. Los resultados de optimización empiezan a ser visibles en las primeras 2-4 semanas." },
            { q: "¿Necesito cambiar mi carta actual?", a: "No. Winerim trabaja con tu carta actual. La plataforma analiza lo que ya tienes y sugiere mejoras basadas en datos, sin obligarte a cambiar tu selección." },
            { q: "¿Puedo probar antes de comprometerme?", a: "Sí. Puedes usar las herramientas gratuitas para evaluar tu carta, solicitar un análisis sin coste o pedir una demo personalizada antes de decidir." },
          ] : [
            { q: "Does Winerim work for any type of restaurant?", a: "Winerim is designed for restaurants, hotels, wine bars and restaurant groups with at least 30-40 wine references. For smaller venues, the free tools may be sufficient." },
            { q: "How long does implementation take?", a: "Basic implementation (list digitization and initial setup) is completed in 1-5 days. Optimization results become visible in the first 2-4 weeks." },
            { q: "Do I need to change my current list?", a: "No. Winerim works with your current list. The platform analyzes what you have and suggests data-driven improvements." },
            { q: "Can I try before committing?", a: "Yes. You can use the free tools, request a no-cost analysis, or ask for a personalized demo before deciding." },
          ]}
        />

        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-8">
          <CredibilitySection lang={lang} />
        </section>

        <InternalLinks
          title={t.linksTitle}
          links={[
            { to: localePath("/software-carta-de-vinos") || "/software-carta-de-vinos", label: { es: "Software de carta de vinos inteligente", en: "Smart wine list software", it: "Software intelligente per carta dei vini", fr: "Logiciel intelligent de carte des vins" }[lang]!, type: "solution" },
            { to: "/herramientas", label: { es: "Herramientas gratuitas de análisis y pricing", en: "Free analysis & pricing tools", it: "Strumenti gratuiti di analisi e pricing", fr: "Outils gratuits d'analyse et de tarification" }[lang]!, type: "tool" },
            { to: "/guias-y-recursos", label: { es: "Guías prácticas y recursos descargables", en: "Practical guides & downloadable resources", it: "Guide pratiche e risorse scaricabili", fr: "Guides pratiques et ressources téléchargeables" }[lang]!, type: "guide" },
            { to: "/herramientas/calculadora-ticket-medio-vino", label: { es: "Calculadora de impacto en ticket medio", en: "Average ticket impact calculator", it: "Calcolatrice impatto scontrino medio", fr: "Calculateur d'impact ticket moyen" }[lang]!, type: "tool" },
            { to: localePath("/casos-exito") || "/casos-exito", label: { es: "Casos de éxito de restaurantes reales", en: "Real restaurant case studies", it: "Casi di successo reali", fr: "Cas clients réels" }[lang]!, type: "guide" },
            { to: "/benchmarks-playbooks", label: { es: "Benchmarks y playbooks del sector", en: "Industry benchmarks & playbooks", it: "Benchmark e playbook del settore", fr: "Benchmarks et playbooks du secteur" }[lang]!, type: "resource" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Soluciones;
