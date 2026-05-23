import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, CheckCircle, Sparkles, Utensils, HelpCircle, Target
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedPages from "@/components/seo/RelatedPages";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import type { SeoPage, RelatedPageInfo } from "@/hooks/useSeoPage";

interface Props {
  page: SeoPage;
  related: RelatedPageInfo[];
}

const RestaurantTypeTemplate = ({ page, related }: Props) => {
  const b = page.body;
  const problems: string[] = b.problems || [];
  const wine_styles: string[] = b.wine_styles || [];
  const carta_strategy: { title: string; desc: string }[] = b.carta_strategy || [];
  const winerim_modules: { title: string; desc: string }[] = b.winerim_modules || [];
  const stats: { value: string; label: string }[] = b.stats || [];
  const benefits: string[] = b.benefits || [];
  const internalLinks = (b.internal_links || []).map((l: any) => ({
    to: l.url || l.to || "#",
    label: l.label || l.title || "",
    type: l.type || "guide" as const,
  }));
  const canonical = page.canonical_url || `https://winerim.wine/${page.slug}`;

  const templateI18n: Record<string, {
    breadcrumbHome: string;
    breadcrumbSolutions: string;
    solutionByType: string;
    requestDemo: string;
    wineIn: string;
    challenges: string;
    commonProblems: string;
    recommendedWines: string;
    idealStyles: string;
    strategy: string;
    recommendedStructure: string;
    winerim: string;
    relevantModules: string;
    expectedImpact: string;
    benefits: string;
    keyAdvantages: string;
    faq: string;
    ctaOptimize: (type: string) => string;
    ctaDesc: string;
  }> = {
    es: {
      breadcrumbHome: "Inicio",
      breadcrumbSolutions: "Soluciones",
      solutionByType: "Solución por tipo",
      requestDemo: "Solicitar demo",
      wineIn: "El vino en",
      challenges: "Retos",
      commonProblems: "Problemas comunes con el vino",
      recommendedWines: "Vinos recomendados",
      idealStyles: "Estilos de vino ideales",
      strategy: "Estrategia",
      recommendedStructure: "Estructura de carta recomendada",
      winerim: "Winerim",
      relevantModules: "Módulos de Winerim más relevantes",
      expectedImpact: "Impacto esperado",
      benefits: "Beneficios",
      keyAdvantages: "Ventajas clave",
      faq: "Preguntas frecuentes",
      ctaOptimize: (type: string) => `Optimiza la carta de vinos de tu ${type}`,
      ctaDesc: "Solicita una demo y descubre cómo Winerim se adapta a tu negocio.",
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbSolutions: "Solutions",
      solutionByType: "Solution by Type",
      requestDemo: "Request Demo",
      wineIn: "Wine in",
      challenges: "Challenges",
      commonProblems: "Common Wine Challenges",
      recommendedWines: "Recommended Wines",
      idealStyles: "Ideal Wine Styles",
      strategy: "Strategy",
      recommendedStructure: "Recommended Wine List Structure",
      winerim: "Winerim",
      relevantModules: "Most Relevant Winerim Modules",
      expectedImpact: "Expected Impact",
      benefits: "Benefits",
      keyAdvantages: "Key Advantages",
      faq: "Frequently Asked Questions",
      ctaOptimize: (type: string) => `Optimize your ${type} wine list`,
      ctaDesc: "Request a demo and discover how Winerim adapts to your business.",
    },
    it: {
      breadcrumbHome: "Home",
      breadcrumbSolutions: "Soluzioni",
      solutionByType: "Soluzione per Tipo",
      requestDemo: "Richiedi Demo",
      wineIn: "Il vino in",
      challenges: "Sfide",
      commonProblems: "Problemi comuni con il vino",
      recommendedWines: "Vini Consigliati",
      idealStyles: "Stili di Vino Ideali",
      strategy: "Strategia",
      recommendedStructure: "Struttura della Carta Consigliata",
      winerim: "Winerim",
      relevantModules: "Moduli Winerim più Rilevanti",
      expectedImpact: "Impatto Atteso",
      benefits: "Vantaggi",
      keyAdvantages: "Vantaggi Chiave",
      faq: "Domande Frequenti",
      ctaOptimize: (type: string) => `Ottimizza la carta dei vini del tuo ${type}`,
      ctaDesc: "Richiedi una demo e scopri come Winerim si adatta al tuo business.",
    },
    fr: {
      breadcrumbHome: "Accueil",
      breadcrumbSolutions: "Solutions",
      solutionByType: "Solution par Type",
      requestDemo: "Demander une Démo",
      wineIn: "Le vin dans",
      challenges: "Défis",
      commonProblems: "Problèmes courants avec le vin",
      recommendedWines: "Vins Recommandés",
      idealStyles: "Styles de Vin Idéals",
      strategy: "Stratégie",
      recommendedStructure: "Structure de Carte Recommandée",
      winerim: "Winerim",
      relevantModules: "Modules Winerim les Plus Pertinents",
      expectedImpact: "Impact Attendu",
      benefits: "Avantages",
      keyAdvantages: "Avantages Clés",
      faq: "Questions Fréquemment Posées",
      ctaOptimize: (type: string) => `Optimisez la carte des vins de votre ${type}`,
      ctaDesc: "Demandez une démo et découvrez comment Winerim s'adapte à votre entreprise.",
    },
    de: {
      breadcrumbHome: "Startseite",
      breadcrumbSolutions: "Lösungen",
      solutionByType: "Lösung nach Typ",
      requestDemo: "Demo anfordern",
      wineIn: "Wein in",
      challenges: "Herausforderungen",
      commonProblems: "Häufige Herausforderungen mit Wein",
      recommendedWines: "Empfehlenswerte Weine",
      idealStyles: "Ideale Weinstile",
      strategy: "Strategie",
      recommendedStructure: "Empfohlene Weinkarte-Struktur",
      winerim: "Winerim",
      relevantModules: "Relevanteste Winerim-Module",
      expectedImpact: "Erwartete Auswirkungen",
      benefits: "Vorteile",
      keyAdvantages: "Wichtigste Vorteile",
      faq: "Häufig gestellte Fragen",
      ctaOptimize: (type: string) => `Optimieren Sie Ihre Weinkarte für ${type}`,
      ctaDesc: "Fordern Sie eine Demo an und entdecken Sie, wie sich Winerim an Ihr Geschäft anpasst.",
    },
    pt: {
      breadcrumbHome: "Início",
      breadcrumbSolutions: "Soluções",
      solutionByType: "Solução por Tipo",
      requestDemo: "Pedir uma Demo",
      wineIn: "O vinho em",
      challenges: "Desafios",
      commonProblems: "Problemas comuns com o vinho",
      recommendedWines: "Vinhos Recomendados",
      idealStyles: "Estilos de Vinho Ideais",
      strategy: "Estratégia",
      recommendedStructure: "Estrutura de Carta Recomendada",
      winerim: "Winerim",
      relevantModules: "Módulos Winerim Mais Relevantes",
      expectedImpact: "Impacto Esperado",
      benefits: "Benefícios",
      keyAdvantages: "Vantagens Principais",
      faq: "Perguntas Frequentes",
      ctaOptimize: (type: string) => `Otimize a sua carta de vinhos para ${type}`,
      ctaDesc: "Peça uma demo e descubra como o Winerim se adapta ao seu negócio.",
    },
  };

  const t = templateI18n[page.lang] || templateI18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={page.meta_title} description={page.meta_description} url={canonical} type="article" image={page.og_image || undefined} noindex={page.isThinContent} />
      <DynamicSchemaMarkup id={page.slug} type="Article" title={page.hero_title} description={page.meta_description} url={`https://winerim.wine/${page.slug}`} faqs={page.faqs}
        breadcrumbs={[
          { name: t.breadcrumbHome, url: "https://winerim.wine/" },
          { name: t.breadcrumbSolutions, url: "https://winerim.wine/guias-y-recursos" },
          { name: b.restaurant_type || page.hero_title, url: `https://winerim.wine/${page.slug}` },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadcrumbSolutions, href: "/guias-y-recursos" }, { label: b.restaurant_type || "Tipo" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Utensils size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{page.hero_badge || t.solutionByType}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">{page.hero_title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">{page.hero_subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to={page.cta_primary_url || "/demo"} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {page.cta_primary_text || t.requestDemo} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      {b.intro && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{t.wineIn} {b.restaurant_type_article || "este tipo de restaurante"}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{b.intro}</p>
          </ScrollReveal>
        </section>
      )}

      {/* PROBLEMAS */}
      {problems.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.challenges}</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.commonProblems}</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background">
                    <Target size={18} className="text-wine shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ESTILOS DE VINO */}
      {wine_styles.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.recommendedWines}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.idealStyles}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wine_styles.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-center gap-2 p-4 rounded-xl border border-border bg-gradient-card">
                  <Wine size={16} className="text-wine shrink-0" />
                  <span className="text-sm font-medium">{s}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ESTRATEGIA */}
      {carta_strategy.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.strategy}</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.recommendedStructure}</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {carta_strategy.map((cs, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="p-6 rounded-xl border border-border bg-background h-full">
                    <CheckCircle size={18} className="text-wine mb-3" />
                    <h3 className="font-heading font-bold mb-2">{cs.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WINERIM MODULES */}
      {winerim_modules.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.winerim}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.relevantModules}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {winerim_modules.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                  <h3 className="font-heading font-bold mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* RESULTS */}
      {stats.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">{t.expectedImpact}</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="text-center p-8 rounded-xl border border-border bg-background">
                    <p className="font-heading text-4xl font-bold text-wine mb-2">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.benefits}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.keyAdvantages}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((ben, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-gradient-card">
                  <CheckCircle size={18} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{ben}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal><h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.faq}</h2></ScrollReveal>
          <div className="space-y-6">
            {page.faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="p-6 rounded-xl border border-border bg-gradient-card">
                  <div className="flex items-start gap-3 mb-3"><HelpCircle size={18} className="text-wine shrink-0 mt-0.5" /><h3 className="font-heading font-bold">{faq.q}</h3></div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {internalLinks.length > 0 && <InternalLinks links={internalLinks} />}

      <RelatedPages pages={related} />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaOptimize(b.restaurant_type || "restaurante")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">{t.ctaDesc}</p>
            <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {t.requestDemo} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
      <Footer />
    </div>
  );
};

export default RestaurantTypeTemplate;
