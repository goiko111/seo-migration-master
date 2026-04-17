import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, Sparkles, HelpCircle,
  Target, TrendingUp, BookOpen, Zap, BarChart3
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedPages from "@/components/seo/RelatedPages";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import EnhancedSections from "@/components/seo/EnhancedSections";
import KeyTakeaway from "@/components/seo/KeyTakeaway";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SeoPage, RelatedPageInfo } from "@/hooks/useSeoPage";

interface Props {
  page: SeoPage;
  related: RelatedPageInfo[];
}

const clusterConfig: Record<string, {
  icon: typeof BookOpen;
  breadcrumbParent: Record<string, string>;
  breadcrumbHref: string;
  badge: Record<string, string>;
}> = {
  guide: {
    icon: BookOpen,
    breadcrumbParent: { es: "Guías", en: "Guides", it: "Guide", fr: "Guides", de: "Ratgeber", pt: "Guias" },
    breadcrumbHref: "/guias-y-recursos",
    badge: { es: "Guía", en: "Guide", it: "Guida", fr: "Guide", de: "Ratgeber", pt: "Guia" },
  },
  problem: {
    icon: Target,
    breadcrumbParent: { es: "Problemas", en: "Problems", it: "Problemi", fr: "Problemes", de: "Probleme", pt: "Problemas" },
    breadcrumbHref: "/guias-y-recursos",
    badge: { es: "Problema", en: "Problem", it: "Problema", fr: "Probleme", de: "Problem", pt: "Problema" },
  },
  grape: {
    icon: Sparkles,
    breadcrumbParent: { es: "Biblioteca", en: "Library", it: "Libreria", fr: "Bibliotheque", de: "Bibliothek", pt: "Biblioteca" },
    breadcrumbHref: "/biblioteca-vino",
    badge: { es: "Uva", en: "Grape", it: "Uva", fr: "Raisin", de: "Traube", pt: "Uva" },
  },
  region: {
    icon: BarChart3,
    breadcrumbParent: { es: "Biblioteca", en: "Library", it: "Libreria", fr: "Bibliotheque", de: "Bibliothek", pt: "Biblioteca" },
    breadcrumbHref: "/biblioteca-vino",
    badge: { es: "Región", en: "Region", it: "Regione", fr: "Region", de: "Region", pt: "Regiao" },
  },
  style: {
    icon: Zap,
    breadcrumbParent: { es: "Biblioteca", en: "Library", it: "Libreria", fr: "Bibliotheque", de: "Bibliothek", pt: "Biblioteca" },
    breadcrumbHref: "/biblioteca-vino",
    badge: { es: "Estilo", en: "Style", it: "Stile", fr: "Style", de: "Stil", pt: "Estilo" },
  },
  pairing: {
    icon: Sparkles,
    breadcrumbParent: { es: "Maridajes", en: "Pairings", it: "Abbinamenti", fr: "Accords", de: "Kombinationen", pt: "Harmonias" },
    breadcrumbHref: "/guias-y-recursos",
    badge: { es: "Maridaje", en: "Pairing", it: "Abbinamento", fr: "Accord", de: "Kombination", pt: "Harmonia" },
  },
  comparison: {
    icon: BarChart3,
    breadcrumbParent: { es: "Comparativas", en: "Comparisons", it: "Confronti", fr: "Comparaisons", de: "Vergleiche", pt: "Comparacoes" },
    breadcrumbHref: "/guias-y-recursos",
    badge: { es: "Comparativa", en: "Comparison", it: "Confronto", fr: "Comparaison", de: "Vergleich", pt: "Comparacao" },
  },
  resource: {
    icon: BookOpen,
    breadcrumbParent: { es: "Recursos", en: "Resources", it: "Risorse", fr: "Ressources", de: "Ressourcen", pt: "Recursos" },
    breadcrumbHref: "/guias-y-recursos",
    badge: { es: "Recurso", en: "Resource", it: "Risorsa", fr: "Ressource", de: "Ressource", pt: "Recurso" },
  },
};

const templateI18n: Record<string, {
  home: string;
  requestDemo: string;
  theProblem: string;
  commonChallenges: string;
  benefits: string;
  keyAdvantages: string;
  howWinerimHelps: string;
  useCases: string;
  whoIsItFor: string;
  expectedResults: string;
  midCtaTitle: string;
  midCtaDesc: string;
  faq: string;
  finalCtaFallback: string;
  finalCtaDescFallback: string;
}> = {
  es: {
    home: "Inicio",
    requestDemo: "Solicitar demo",
    theProblem: "El problema",
    commonChallenges: "Retos habituales",
    benefits: "Beneficios",
    keyAdvantages: "Ventajas clave",
    howWinerimHelps: "Cómo te ayuda Winerim",
    useCases: "Casos de uso",
    whoIsItFor: "Para quién es útil?",
    expectedResults: "Resultados esperados",
    midCtaTitle: "Quieres optimizar tu carta de vinos?",
    midCtaDesc: "Winerim te ayuda a vender más vino con tecnología e inteligencia artificial.",
    faq: "Preguntas frecuentes",
    finalCtaFallback: "Optimiza tu carta de vinos con Winerim",
    finalCtaDescFallback: "Descubre cómo Winerim puede ayudarte a vender más vino y mejorar la experiencia de tus clientes.",
  },
  en: {
    home: "Home",
    requestDemo: "Request demo",
    theProblem: "The problem",
    commonChallenges: "Common challenges",
    benefits: "Benefits",
    keyAdvantages: "Key advantages",
    howWinerimHelps: "How Winerim helps",
    useCases: "Use cases",
    whoIsItFor: "Who is it for?",
    expectedResults: "Expected results",
    midCtaTitle: "Want to optimize your wine list?",
    midCtaDesc: "Winerim helps you sell more wine with technology and artificial intelligence.",
    faq: "Frequently asked questions",
    finalCtaFallback: "Optimize your wine list with Winerim",
    finalCtaDescFallback: "Discover how Winerim can help you sell more wine and enhance your customers' experience.",
  },
  it: {
    home: "Home",
    requestDemo: "Richiedi demo",
    theProblem: "Il problema",
    commonChallenges: "Sfide comuni",
    benefits: "Vantaggi",
    keyAdvantages: "Vantaggi chiave",
    howWinerimHelps: "Come ti aiuta Winerim",
    useCases: "Casi d'uso",
    whoIsItFor: "Per chi è utile?",
    expectedResults: "Risultati attesi",
    midCtaTitle: "Vuoi ottimizzare la tua carta dei vini?",
    midCtaDesc: "Winerim ti aiuta a vendere più vino con tecnologia e intelligenza artificiale.",
    faq: "Domande frequenti",
    finalCtaFallback: "Ottimizza la tua carta dei vini con Winerim",
    finalCtaDescFallback: "Scopri come Winerim può aiutarti a vendere più vino e migliorare l'esperienza dei tuoi clienti.",
  },
  fr: {
    home: "Accueil",
    requestDemo: "Demander une démo",
    theProblem: "Le problème",
    commonChallenges: "Défis courants",
    benefits: "Avantages",
    keyAdvantages: "Avantages clés",
    howWinerimHelps: "Comment Winerim vous aide",
    useCases: "Cas d'usage",
    whoIsItFor: "Pour qui c'est utile?",
    expectedResults: "Résultats attendus",
    midCtaTitle: "Voulez-vous optimiser votre carte des vins?",
    midCtaDesc: "Winerim vous aide à vendre plus de vin avec la technologie et l'intelligence artificielle.",
    faq: "Foire aux questions",
    finalCtaFallback: "Optimisez votre carte des vins avec Winerim",
    finalCtaDescFallback: "Découvrez comment Winerim peut vous aider à vendre plus de vin et améliorer l'expérience de vos clients.",
  },
  de: {
    home: "Startseite",
    requestDemo: "Demo anfordern",
    theProblem: "Das Problem",
    commonChallenges: "Häufige Herausforderungen",
    benefits: "Vorteile",
    keyAdvantages: "Wichtigste Vorteile",
    howWinerimHelps: "Wie Winerim Ihnen hilft",
    useCases: "Anwendungsfalle",
    whoIsItFor: "Fur wen ist es geeignet?",
    expectedResults: "Erwartete Ergebnisse",
    midCtaTitle: "Mochten Sie Ihre Weinkarte optimieren?",
    midCtaDesc: "Winerim hilft Ihnen, mehr Wein mit Technologie und kunstlicher Intelligenz zu verkaufen.",
    faq: "Haufig gestellte Fragen",
    finalCtaFallback: "Optimieren Sie Ihre Weinkarte mit Winerim",
    finalCtaDescFallback: "Erfahren Sie, wie Winerim Ihnen helfen kann, mehr Wein zu verkaufen und das Kundenerlebnis zu verbessern.",
  },
  pt: {
    home: "Inicio",
    requestDemo: "Solicitar demonstracao",
    theProblem: "O problema",
    commonChallenges: "Desafios comuns",
    benefits: "Beneficios",
    keyAdvantages: "Principais vantagens",
    howWinerimHelps: "Como Winerim o ajuda",
    useCases: "Casos de uso",
    whoIsItFor: "Para quem e util?",
    expectedResults: "Resultados esperados",
    midCtaTitle: "Quer otimizar sua carta de vinhos?",
    midCtaDesc: "Winerim o ajuda a vender mais vinho com tecnologia e inteligencia artificial.",
    faq: "Perguntas frequentes",
    finalCtaFallback: "Otimize sua carta de vinhos com Winerim",
    finalCtaDescFallback: "Descubra como Winerim pode o ajudar a vender mais vinho e melhorar a experiencia dos seus clientes.",
  },
};

const GenericSeoTemplate = ({ page, related }: Props) => {
  const b = page.body;
  const config = clusterConfig[page.cluster] || clusterConfig.guide;
  const Icon = config.icon;
  const lang = page.lang || "es";
  const t = templateI18n[lang] || templateI18n.es;

  const intro: string = b.intro || "";
  const problems: string[] = b.problems || [];
  const benefits: string[] = b.benefits || [];
  const features: { title: string; desc: string }[] = b.features || [];
  const stats: { value: string; label: string }[] = b.stats || [];
  const useCases: string[] = b.use_cases || [];
  const sections: { heading: string; content: string; tips?: string[] }[] = b.sections || [];
  const internalLinks = (b.internal_links || []).map((l: any) => ({
    to: l.url || l.to || "#",
    label: l.label || l.title || "",
    type: l.type || "guide" as const,
  }));

  const canonical = page.canonical_url || `https://winerim.wine/${page.slug}`;
  const schemaType = page.schema_type || "Article";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={page.meta_title}
        description={page.meta_description}
        url={canonical}
        type="article"
        image={page.og_image || undefined}
        noindex={page.isThinContent}
      />
      <DynamicSchemaMarkup
        id={page.slug}
        type={schemaType}
        title={page.hero_title}
        description={page.meta_description}
        url={canonical}
        faqs={page.faqs}
        breadcrumbs={[
          { name: t.home, url: "https://winerim.wine/" },
          { name: config.breadcrumbParent[lang] || config.breadcrumbParent.es, url: `https://winerim.wine${config.breadcrumbHref}` },
          { name: page.hero_title, url: canonical },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: config.breadcrumbParent[lang] || config.breadcrumbParent.es, href: config.breadcrumbHref },
            { label: page.hero_title },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Icon size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{page.hero_badge || config.badge[lang] || config.badge.es}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {page.hero_title}
          </motion.h1>
          {page.hero_subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              {page.hero_subtitle}
            </motion.p>
          )}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4">
            <Link to={page.cta_primary_url || "/demo"}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {page.cta_primary_text || t.requestDemo} <ArrowRight size={16} />
            </Link>
            {page.cta_secondary_text && (
              <Link to={page.cta_secondary_url || "/analisis-carta"}
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {page.cta_secondary_text}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      {intro && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed text-lg">{intro}</p>
          </ScrollReveal>
        </section>
      )}

      {/* PROBLEMS */}
      {problems.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.theProblem}</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.commonChallenges}</h2>
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

      {/* SECTIONS (rich body content) — enhanced with lead extraction */}
      {sections.length > 0 && (
        <EnhancedSections
          sections={sections}
          altOffset={problems.length > 0 ? 0 : 1}
        />
      )}

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.benefits}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.keyAdvantages}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-gradient-card">
                  <CheckCircle size={18} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* FEATURES / SOLUTION */}
      {features.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-wine block mb-3">Winerim</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.howWinerimHelps}</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="p-6 rounded-xl border border-border bg-background h-full">
                    <Zap size={18} className="text-wine mb-3" />
                    <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* USE CASES */}
      {useCases.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.useCases}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.whoIsItFor}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-gradient-card">
                  <TrendingUp size={16} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* STATS */}
      {stats.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">{t.expectedResults}</h2>
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

      {/* MID CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-xl border border-wine/20 bg-wine/5">
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg mb-1">{t.midCtaTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.midCtaDesc}</p>
            </div>
            <Link to={page.cta_primary_url || "/demo"}
              className="shrink-0 inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
              {page.cta_primary_text || t.requestDemo} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ — accordion for scannability */}
      {page.faqs.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.faq}</h2>
            </ScrollReveal>
            <Accordion type="multiple" className="space-y-3">
              {page.faqs.map((faq, i) => (
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

      {/* INTERNAL LINKS */}
      {internalLinks.length > 0 && (
        <InternalLinks links={internalLinks} />
      )}

      {/* RELATED PAGES */}
      <RelatedPages pages={related} />

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              {b.cta_final_title || t.finalCtaFallback}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              {b.cta_final_description || t.finalCtaDescFallback}
            </p>
            <Link to={page.cta_primary_url || "/demo"}
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {page.cta_primary_text || t.requestDemo} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default GenericSeoTemplate;
