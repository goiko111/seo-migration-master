import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, AlertTriangle, TrendingDown, CheckCircle,
  Sparkles, HelpCircle, Zap, DollarSign
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import ArticleMidCTA from "@/components/article/ArticleMidCTA";
import CTASection from "@/components/CTASection";
import StickyCTA from "@/components/StickyCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

interface SolutionStep {
  step: string;
  description: string;
}

interface WinerimModule {
  name: string;
  description: string;
}

export interface PainPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge?: string;
  symptom: string;
  symptomDetails?: string;
  causes: string[];
  economicImpact: string;
  economicImpactDetails?: string;
  solution: SolutionStep[];
  winerimModules: WinerimModule[];
  faqs: { q: string; a: string }[];
  relatedLinks?: { label: string; url: string }[];
  ctaPrimaryText?: string;
  ctaPrimaryUrl?: string;
  ctaFinalTitle?: string;
  ctaFinalDescription?: string;
}

const labels: Record<SupportedLang, {
  problems: string;
  commonProblem: string;
  requestDemo: string;
  symptomTitle: string;
  diagnosis: string;
  whyHappens: string;
  whyHappensDesc: string;
  economicImpact: string;
  midCtaTitle: string;
  midCtaDesc: string;
  midCtaBtn: string;
  solution: string;
  howToFix: string;
  winerimLabel: string;
  howWinerimSolves: string;
  relatedContent: string;
  faqTitle: string;
  nextStep: string;
  defaultCtaTitle: string;
  defaultCtaDesc: string;
  noCommitment: string;
  stickyText: string;
  defaultCtaPrimary: string;
}> = {
  es: {
    problems: "Problemas",
    commonProblem: "Problema común",
    requestDemo: "Solicitar demo",
    symptomTitle: "El síntoma",
    diagnosis: "Diagnóstico",
    whyHappens: "¿Por qué ocurre?",
    whyHappensDesc: "Las causas más comunes de este problema en restaurantes.",
    economicImpact: "Impacto económico",
    midCtaTitle: "¿Quieres saber si tu carta tiene este problema?",
    midCtaDesc: "Analiza tu carta gratis y detecta oportunidades de mejora en margen, rotación y surtido.",
    midCtaBtn: "Analizar mi carta gratis",
    solution: "Solución",
    howToFix: "Cómo corregirlo",
    winerimLabel: "Winerim",
    howWinerimSolves: "Cómo lo resuelve Winerim",
    relatedContent: "Contenido relacionado",
    faqTitle: "Preguntas frecuentes",
    nextStep: "Siguiente paso",
    defaultCtaTitle: "No dejes que tu carta de vinos pierda dinero",
    defaultCtaDesc: "Analiza tu carta gratis. Te mostramos oportunidades reales de mejora en margen, rotación y surtido.",
    noCommitment: "Sin compromiso. Envía tu carta en cualquier formato.",
    stickyText: "Analiza tu carta gratis →",
    defaultCtaPrimary: "Diagnostica tu carta",
  },
  en: {
    problems: "Problems",
    commonProblem: "Common problem",
    requestDemo: "Request demo",
    symptomTitle: "The symptom",
    diagnosis: "Diagnosis",
    whyHappens: "Why does this happen?",
    whyHappensDesc: "The most common causes of this problem in restaurants.",
    economicImpact: "Economic impact",
    midCtaTitle: "Want to know if your wine list has this problem?",
    midCtaDesc: "Analyze your list for free and discover opportunities to improve margin, rotation and assortment.",
    midCtaBtn: "Analyze my list for free",
    solution: "Solution",
    howToFix: "How to fix it",
    winerimLabel: "Winerim",
    howWinerimSolves: "How Winerim solves it",
    relatedContent: "Related content",
    faqTitle: "Frequently asked questions",
    nextStep: "Next step",
    defaultCtaTitle: "Don't let your wine list lose money",
    defaultCtaDesc: "Analyze your list for free. We'll show you real opportunities to improve margin, rotation and assortment.",
    noCommitment: "No commitment. Send your list in any format.",
    stickyText: "Analyze your list for free →",
    defaultCtaPrimary: "Diagnose your list",
  },
  it: {
    problems: "Problemi",
    commonProblem: "Problema comune",
    requestDemo: "Richiedi demo",
    symptomTitle: "Il sintomo",
    diagnosis: "Diagnosi",
    whyHappens: "Perché succede?",
    whyHappensDesc: "Le cause più comuni di questo problema nei ristoranti.",
    economicImpact: "Impatto economico",
    midCtaTitle: "Vuoi sapere se la tua carta dei vini ha questo problema?",
    midCtaDesc: "Analizza la tua carta gratuitamente e scopri opportunità di miglioramento su margine, rotazione e assortimento.",
    midCtaBtn: "Analizza la mia carta gratis",
    solution: "Soluzione",
    howToFix: "Come correggerlo",
    winerimLabel: "Winerim",
    howWinerimSolves: "Come lo risolve Winerim",
    relatedContent: "Contenuti correlati",
    faqTitle: "Domande frequenti",
    nextStep: "Passo successivo",
    defaultCtaTitle: "Non lasciare che la tua carta dei vini perda soldi",
    defaultCtaDesc: "Analizza la tua carta gratuitamente. Ti mostriamo opportunità reali di miglioramento su margine, rotazione e assortimento.",
    noCommitment: "Senza impegno. Invia la tua carta in qualsiasi formato.",
    stickyText: "Analizza la tua carta gratis →",
    defaultCtaPrimary: "Diagnostica la tua carta",
  },
  fr: {
    problems: "Problèmes",
    commonProblem: "Problème courant",
    requestDemo: "Demander une démo",
    symptomTitle: "Le symptôme",
    diagnosis: "Diagnostic",
    whyHappens: "Pourquoi cela se produit-il ?",
    whyHappensDesc: "Les causes les plus fréquentes de ce problème en restauration.",
    economicImpact: "Impact économique",
    midCtaTitle: "Votre carte des vins a-t-elle ce problème ?",
    midCtaDesc: "Analysez votre carte gratuitement et détectez des opportunités d'amélioration sur la marge, la rotation et l'assortiment.",
    midCtaBtn: "Analyser ma carte gratuitement",
    solution: "Solution",
    howToFix: "Comment y remédier",
    winerimLabel: "Winerim",
    howWinerimSolves: "Comment Winerim le résout",
    relatedContent: "Contenu connexe",
    faqTitle: "Questions fréquentes",
    nextStep: "Prochaine étape",
    defaultCtaTitle: "Ne laissez plus votre carte des vins perdre de l'argent",
    defaultCtaDesc: "Analysez votre carte gratuitement. Nous vous montrons des opportunités réelles d'amélioration sur la marge, la rotation et l'assortiment.",
    noCommitment: "Sans engagement. Envoyez votre carte dans n'importe quel format.",
    stickyText: "Analysez votre carte gratuitement →",
    defaultCtaPrimary: "Diagnostiquez votre carte",
  },
};

const PainTemplate = ({ data }: { data: PainPageData }) => {
  const { lang } = useLanguage();
  const l = labels[lang];
  const ctaPrimary = data.ctaPrimaryText || l.defaultCtaPrimary;
  const ctaPrimaryUrl = data.ctaPrimaryUrl || "/analisis-carta";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        url={`https://winerim.wine/${data.slug}`}
        type="article"
      />
      <DynamicSchemaMarkup
        id={data.slug}
        type="Article"
        title={data.heroTitle}
        description={data.metaDescription}
        url={`https://winerim.wine/${data.slug}`}
        faqs={data.faqs}
        breadcrumbs={[
          { name: "Inicio", url: "https://winerim.wine/" },
          { name: l.problems, url: "https://winerim.wine/guias-y-recursos" },
          { name: data.heroTitle, url: `https://winerim.wine/${data.slug}` },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-destructive/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: l.problems, href: "/guias-y-recursos" },
            { label: data.heroTitle },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/30 bg-destructive/5 mb-6">
            <AlertTriangle size={14} className="text-destructive" />
            <span className="text-xs font-semibold tracking-widest uppercase text-destructive">{data.heroBadge || l.commonProblem}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {data.heroTitle}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            {data.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4">
            <Link to={ctaPrimaryUrl}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {ctaPrimary} <ArrowRight size={16} />
            </Link>
            <Link to="/demo"
              className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              {l.requestDemo}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SÍNTOMA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <ScrollReveal>
          <div className="p-6 md:p-8 rounded-xl border border-destructive/20 bg-destructive/5">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle size={24} className="text-destructive shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{l.symptomTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{data.symptom}</p>
                {data.symptomDetails && (
                  <p className="text-muted-foreground leading-relaxed mt-3">{data.symptomDetails}</p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* POR QUÉ OCURRE */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{l.diagnosis}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{l.whyHappens}</h2>
            <p className="text-muted-foreground max-w-2xl mb-12">{l.whyHappensDesc}</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {data.causes.map((cause, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-wine/10 text-wine text-xs font-bold shrink-0">{i + 1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cause}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO ECONÓMICO */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <div className="p-6 md:p-8 rounded-xl border border-accent/20 bg-accent/5">
            <div className="flex items-start gap-4">
              <DollarSign size={24} className="text-accent shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{l.economicImpact}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{data.economicImpact}</p>
                {data.economicImpactDetails && (
                  <p className="text-muted-foreground leading-relaxed mt-3">{data.economicImpactDetails}</p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ArticleMidCTA
        pageType="guide"
        title={l.midCtaTitle}
        description={l.midCtaDesc}
        buttonText={l.midCtaBtn}
        buttonUrl="/analisis-carta"
        variant="highlight"
      />

      {/* SOLUCIÓN PASO A PASO */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{l.solution}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{l.howToFix}</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {data.solution.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-5 p-6 rounded-xl border border-border bg-background">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-wine/10 text-wine font-bold shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-heading font-bold mb-2">{s.step}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO LO RESUELVE WINERIM */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <ScrollReveal>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-wine block mb-3">{l.winerimLabel}</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{l.howWinerimSolves}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {data.winerimModules.map((m, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                <Zap size={18} className="text-wine mb-3" />
                <h3 className="font-heading font-bold mb-2">{m.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* RELATED LINKS */}
      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">{l.relatedContent}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.relatedLinks.map((link, i) => (
                <Link key={i} to={link.url}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-colors group">
                  <CheckCircle size={16} className="text-wine shrink-0" />
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors">{link.label}</span>
                  <ArrowRight size={14} className="ml-auto text-muted-foreground group-hover:text-wine transition-colors" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{l.faqTitle}</h2>
            </ScrollReveal>
            <Accordion type="multiple" className="space-y-3">
              {data.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-background px-6 data-[state=open]:border-wine/20">
                  <AccordionTrigger className="text-left font-heading font-bold text-sm hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      <CTASection
        pageType="guide"
        badge={l.nextStep}
        title={data.ctaFinalTitle || l.defaultCtaTitle}
        description={data.ctaFinalDescription || l.defaultCtaDesc}
        primaryText={ctaPrimary}
        primaryUrl={ctaPrimaryUrl}
        secondaryText={l.requestDemo}
        secondaryUrl="/demo"
        micro={l.noCommitment}
      />

      <StickyCTA pageType="guide" text={l.stickyText} url="/analisis-carta" />

      <Footer />
    </div>
  );
};

export default PainTemplate;
