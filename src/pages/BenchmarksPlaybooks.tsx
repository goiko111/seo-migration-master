import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import SummaryBox from "@/components/seo/SummaryBox";
import { getBPByType } from "@/data/benchmarksPlaybooks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

const CANONICAL = "https://winerim.wine";

interface PageChrome {
  seoTitle: string;
  seoDesc: string;
  badge: string;
  h1: string;
  subtitle: string;
  summaryLabel: string;
  summaryDef: string;
  summaryBullets: string[];
  benchmarksLabel: string;
  benchmarksSub: string;
  benchmarkBadge: string;
  playbooksLabel: string;
  playbooksSub: string;
  playbookBadge: string;
  viewBenchmark: string;
  viewPlaybook: string;
  linksTitle: string;
  ctaH2: string;
  ctaP: string;
  ctaBtn: string;
  ctaDemo: string;
  faqs: { q: string; a: string }[];
  links: { to: string; label: string; type: "guide" | "tool" | "solution" }[];
}

const i18n: I18nMap<PageChrome> = {
  es: {
    seoTitle: "Benchmarks & Playbooks para Cartas de Vino | Winerim",
    seoDesc: "Benchmarks del sector y playbooks prácticos para optimizar tu carta de vinos. Datos de referencia, planes de acción y criterios expertos para restaurantes.",
    badge: "Conocimiento aplicado",
    h1: "Benchmarks & Playbooks",
    subtitle: "Datos de referencia del sector y planes de acción prácticos para optimizar tu carta de vinos, mejorar la rentabilidad y vender más vino en tu restaurante.",
    summaryLabel: "¿Qué encontrarás aquí?",
    summaryDef: "Esta sección reúne benchmarks del sector y playbooks prácticos para optimizar tu carta de vinos: datos de referencia, planes de acción y criterios expertos para restaurantes reales.",
    summaryBullets: [
      "Benchmarks con rangos de referencia para dimensionar, estructurar y preciar tu carta de vinos.",
      "Playbooks con planes de acción paso a paso para resolver problemas concretos de venta, rotación y formación.",
      "Criterios prácticos, no teóricos: todo está pensado para aplicarse en restaurantes reales.",
    ],
    benchmarksLabel: "Benchmarks",
    benchmarksSub: "Puntos de referencia del sector para evaluar tu carta y tomar decisiones informadas.",
    benchmarkBadge: "Benchmark",
    playbooksLabel: "Playbooks",
    playbooksSub: "Planes de acción paso a paso para resolver problemas concretos y mejorar tu gestión del vino.",
    playbookBadge: "Playbook",
    viewBenchmark: "Ver benchmark",
    viewPlaybook: "Ver playbook",
    linksTitle: "Recursos complementarios",
    ctaH2: "Aplica estos criterios con Winerim",
    ctaP: "Winerim automatiza el análisis, la optimización y el seguimiento de tu carta de vinos para que tomes mejores decisiones con menos esfuerzo.",
    ctaBtn: "Analizar mi carta gratis",
    ctaDemo: "Solicitar demo",
    faqs: [
      { q: "¿Qué es un benchmark de carta de vinos?", a: "Un benchmark es un punto de referencia que te permite comparar tu carta con las prácticas habituales del sector. No son cifras absolutas, sino rangos orientativos basados en la experiencia de restaurantes similares al tuyo." },
      { q: "¿Qué es un playbook para restaurantes?", a: "Un playbook es un plan de acción estructurado que te guía paso a paso para resolver un problema concreto de tu carta de vinos o de la venta de vino en tu restaurante." },
      { q: "¿Necesito datos para usar estos benchmarks?", a: "Tener datos de venta mejora mucho la utilidad, pero los benchmarks están diseñados para ser útiles incluso como referencia cualitativa para evaluar tu situación." },
      { q: "¿Son aplicables a cualquier tipo de restaurante?", a: "Los contenidos están organizados por tipo de restaurante y contexto. Cada benchmark y playbook indica para quién está diseñado y cómo adaptarlo." },
    ],
    links: [
      { to: "/guias-y-recursos", label: "Guías prácticas y recursos descargables", type: "guide" },
      { to: "/herramientas", label: "Herramientas gratuitas de análisis y pricing", type: "tool" },
      { to: "/software-carta-de-vinos", label: "Software de carta de vinos inteligente", type: "solution" },
      { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica: IA para carta de vinos", type: "solution" },
      { to: "/casos-exito", label: "Casos de éxito de restaurantes reales", type: "solution" },
      { to: "/comparativas", label: "Compara Winerim con alternativas", type: "solution" },
    ],
  },
  en: {
    seoTitle: "Wine List Benchmarks & Playbooks | Winerim",
    seoDesc: "Industry benchmarks and practical playbooks to optimise your wine list. Reference data, action plans and expert criteria for restaurants.",
    badge: "Applied knowledge",
    h1: "Benchmarks & Playbooks",
    subtitle: "Industry reference data and practical action plans to optimise your wine list, improve profitability and sell more wine in your restaurant.",
    summaryLabel: "What you'll find here",
    summaryDef: "This section brings together industry benchmarks and practical playbooks to optimise your wine list: reference data, action plans and expert criteria for real restaurants.",
    summaryBullets: [
      "Benchmarks with reference ranges to size, structure and price your wine list.",
      "Playbooks with step-by-step action plans to solve specific sales, rotation and training challenges.",
      "Practical criteria, not theoretical: everything is designed for real restaurants.",
    ],
    benchmarksLabel: "Benchmarks",
    benchmarksSub: "Industry reference points to evaluate your wine list and make informed decisions.",
    benchmarkBadge: "Benchmark",
    playbooksLabel: "Playbooks",
    playbooksSub: "Step-by-step action plans to solve specific challenges and improve your wine management.",
    playbookBadge: "Playbook",
    viewBenchmark: "View benchmark",
    viewPlaybook: "View playbook",
    linksTitle: "Related resources",
    ctaH2: "Apply these criteria with Winerim",
    ctaP: "Winerim automates the analysis, optimisation and tracking of your wine list so you make better decisions with less effort.",
    ctaBtn: "Analyse my list for free",
    ctaDemo: "Request demo",
    faqs: [
      { q: "What is a wine list benchmark?", a: "A benchmark is a reference point that lets you compare your list with standard industry practices. They're not absolute figures, but indicative ranges based on the experience of restaurants similar to yours." },
      { q: "What is a playbook for restaurants?", a: "A playbook is a structured action plan that guides you step by step to solve a specific problem with your wine list or wine sales." },
      { q: "Do I need data to use these benchmarks?", a: "Having sales data greatly improves their usefulness, but benchmarks are designed to be useful even as qualitative references to assess your situation." },
      { q: "Are they applicable to any type of restaurant?", a: "Content is organised by restaurant type and context. Each benchmark and playbook indicates who it's designed for and how to adapt it." },
    ],
    links: [
      { to: "/en/guides", label: "Practical guides and downloadable resources", type: "guide" },
      { to: "/en/tools", label: "Free analysis and pricing tools", type: "tool" },
      { to: "/en/wine-list-management-software", label: "Smart wine list software", type: "solution" },
      { to: "/en/product/dynamic-intelligence", label: "Dynamic intelligence: AI for wine lists", type: "solution" },
      { to: "/en/case-studies", label: "Real restaurant case studies", type: "solution" },
      { to: "/en/comparisons", label: "Compare Winerim with alternatives", type: "solution" },
    ],
  },
  it: {
    seoTitle: "Benchmark & Playbook per Carte dei Vini | Winerim",
    seoDesc: "Benchmark di settore e playbook pratici per ottimizzare la tua carta dei vini. Dati di riferimento, piani d'azione e criteri esperti per ristoranti, hotel e gruppi.",
    badge: "Conoscenza applicata",
    h1: "Benchmarks & Playbooks",
    subtitle: "Dati di riferimento del settore e piani d'azione pratici per ottimizzare la carta dei vini, migliorare la redditività e vendere più vino nel tuo ristorante.",
    summaryLabel: "Cosa troverai qui",
    summaryDef: "Questa sezione raccoglie benchmark di settore e playbook pratici per ottimizzare la tua carta dei vini: dati di riferimento, piani d'azione e criteri esperti per ristoranti reali.",
    summaryBullets: [
      "Benchmark con range di riferimento per dimensionare, strutturare e prezzare la tua carta dei vini.",
      "Playbook con piani d'azione passo passo per risolvere problemi concreti di vendita, rotazione e formazione.",
      "Criteri pratici, non teorici: tutto è pensato per essere applicato in ristoranti reali.",
    ],
    benchmarksLabel: "Benchmarks",
    benchmarksSub: "Punti di riferimento del settore per valutare la tua carta e prendere decisioni informate.",
    benchmarkBadge: "Benchmark",
    playbooksLabel: "Playbooks",
    playbooksSub: "Piani d'azione passo passo per risolvere problemi concreti e migliorare la gestione del vino.",
    playbookBadge: "Playbook",
    viewBenchmark: "Vedi benchmark",
    viewPlaybook: "Vedi playbook",
    linksTitle: "Risorse correlate",
    ctaH2: "Applica questi criteri con Winerim",
    ctaP: "Winerim automatizza l'analisi, l'ottimizzazione e il monitoraggio della tua carta dei vini per prendere decisioni migliori con meno sforzo.",
    ctaBtn: "Analizza la mia carta gratis",
    ctaDemo: "Richiedi demo",
    faqs: [
      { q: "Cos'è un benchmark per la carta dei vini?", a: "Un benchmark è un punto di riferimento che permette di confrontare la tua carta con le pratiche abituali del settore. Non sono cifre assolute, ma range orientativi basati sull'esperienza di ristoranti simili al tuo." },
      { q: "Cos'è un playbook per ristoranti?", a: "Un playbook è un piano d'azione strutturato che ti guida passo passo per risolvere un problema concreto della tua carta dei vini o della vendita di vino." },
      { q: "Servono dati per usare questi benchmark?", a: "Avere dati di vendita migliora molto l'utilità, ma i benchmark sono progettati per essere utili anche come riferimento qualitativo per valutare la tua situazione." },
      { q: "Sono applicabili a qualsiasi tipo di ristorante?", a: "I contenuti sono organizzati per tipo di ristorante e contesto. Ogni benchmark e playbook indica per chi è pensato e come adattarlo." },
    ],
    links: [
      { to: "/it/guide", label: "Guide pratiche e risorse scaricabili", type: "guide" },
      { to: "/it/strumenti", label: "Strumenti gratuiti di analisi e pricing", type: "tool" },
      { to: "/it/software-carta-vini", label: "Software per carta dei vini intelligente", type: "solution" },
      { to: "/it/prodotto/intelligenza-dinamica", label: "Intelligenza dinamica: IA per carta dei vini", type: "solution" },
      { to: "/it/casi-di-successo", label: "Casi di successo di ristoranti reali", type: "solution" },
      { to: "/it/confronti", label: "Confronta Winerim con le alternative", type: "solution" },
    ],
  },
  fr: {
    seoTitle: "Benchmarks & Playbooks pour Cartes des Vins | Winerim",
    seoDesc: "Benchmarks du secteur et playbooks pratiques pour optimiser votre carte des vins. Données de référence, plans d'action et critères experts pour restaurants, hôtels et groupes.",
    badge: "Savoir appliqué",
    h1: "Benchmarks & Playbooks",
    subtitle: "Données de référence du secteur et plans d'action pratiques pour optimiser votre carte des vins, améliorer la rentabilité et vendre plus de vin dans votre restaurant.",
    summaryLabel: "Ce que vous trouverez ici",
    summaryDef: "Cette section réunit des benchmarks du secteur et des playbooks pratiques pour optimiser votre carte des vins : données de référence, plans d'action et critères experts pour des restaurants réels.",
    summaryBullets: [
      "Benchmarks avec des fourchettes de référence pour dimensionner, structurer et tarifer votre carte des vins.",
      "Playbooks avec des plans d'action étape par étape pour résoudre des problèmes concrets de vente, rotation et formation.",
      "Critères pratiques, pas théoriques : tout est conçu pour être appliqué dans des restaurants réels.",
    ],
    benchmarksLabel: "Benchmarks",
    benchmarksSub: "Points de référence du secteur pour évaluer votre carte et prendre des décisions éclairées.",
    benchmarkBadge: "Benchmark",
    playbooksLabel: "Playbooks",
    playbooksSub: "Plans d'action étape par étape pour résoudre des défis concrets et améliorer votre gestion du vin.",
    playbookBadge: "Playbook",
    viewBenchmark: "Voir le benchmark",
    viewPlaybook: "Voir le playbook",
    linksTitle: "Ressources complémentaires",
    ctaH2: "Appliquez ces critères avec Winerim",
    ctaP: "Winerim automatise l'analyse, l'optimisation et le suivi de votre carte des vins pour que vous preniez de meilleures décisions avec moins d'effort.",
    ctaBtn: "Analyser ma carte gratuitement",
    ctaDemo: "Demander une démo",
    faqs: [
      { q: "Qu'est-ce qu'un benchmark de carte des vins ?", a: "Un benchmark est un point de référence qui permet de comparer votre carte avec les pratiques habituelles du secteur. Ce ne sont pas des chiffres absolus, mais des fourchettes indicatives basées sur l'expérience de restaurants similaires au vôtre." },
      { q: "Qu'est-ce qu'un playbook pour restaurants ?", a: "Un playbook est un plan d'action structuré qui vous guide étape par étape pour résoudre un problème concret de votre carte des vins ou de la vente de vin." },
      { q: "Ai-je besoin de données pour utiliser ces benchmarks ?", a: "Avoir des données de vente améliore grandement leur utilité, mais les benchmarks sont conçus pour être utiles même comme référence qualitative pour évaluer votre situation." },
      { q: "Sont-ils applicables à tout type de restaurant ?", a: "Les contenus sont organisés par type de restaurant et contexte. Chaque benchmark et playbook indique pour qui il est conçu et comment l'adapter." },
    ],
    links: [
      { to: "/fr/guides", label: "Guides pratiques et ressources téléchargeables", type: "guide" },
      { to: "/fr/outils", label: "Outils gratuits d'analyse et de pricing", type: "tool" },
      { to: "/fr/logiciel-carte-des-vins", label: "Logiciel de carte des vins intelligent", type: "solution" },
      { to: "/fr/produit/intelligence-dynamique", label: "Intelligence dynamique : IA pour carte des vins", type: "solution" },
      { to: "/fr/cas-clients", label: "Cas clients de restaurants réels", type: "solution" },
      { to: "/fr/comparatifs", label: "Comparez Winerim avec les alternatives", type: "solution" },
    ],
  },
};

const BenchmarksPlaybooks = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang];
  const benchmarks = getBPByType("benchmark");
  const playbooks = getBPByType("playbook");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        url={`${CANONICAL}${localePath("/benchmarks-playbooks")}`}
        hreflang={allLangPaths("/benchmarks-playbooks")}
      />
      <DynamicSchemaMarkup
        id="benchmarks-playbooks"
        type="CollectionPage"
        title={t.h1}
        description={t.seoDesc}
        url={`${CANONICAL}${localePath("/benchmarks-playbooks")}`}
        faqs={t.faqs}
        breadcrumbs={[
          { name: lang === "es" ? "Inicio" : "Home", url: CANONICAL },
          { name: "Benchmarks & Playbooks", url: `${CANONICAL}${localePath("/benchmarks-playbooks")}` },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: "Benchmarks & Playbooks" }]} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
          >
            {t.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            {t.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* SUMMARY BOX */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <ScrollReveal>
          <SummaryBox
            definition={t.summaryDef}
            bullets={t.summaryBullets}
            label={t.summaryLabel}
          />
        </ScrollReveal>
      </section>

      {/* BENCHMARKS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <ScrollReveal className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
              <BarChart3 size={20} className="text-wine" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.benchmarksLabel}</h2>
          </div>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">{t.benchmarksSub}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benchmarks.map((bp, i) => {
            const Icon = bp.icon;
            return (
              <ScrollReveal key={bp.slug} delay={i * 0.04}>
                <Link
                  to={`${localePath("/benchmarks-playbooks")}/${bp.slug}`}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/40 transition-all duration-500 block p-5 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors duration-500">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">{t.benchmarkBadge}</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors duration-300">{bp.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{bp.heroSubtitle}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
                    {t.viewBenchmark} <ArrowRight size={10} />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* PLAYBOOKS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <ScrollReveal className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center">
              <BookOpen size={20} className="text-wine" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.playbooksLabel}</h2>
          </div>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">{t.playbooksSub}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {playbooks.map((bp, i) => {
            const Icon = bp.icon;
            return (
              <ScrollReveal key={bp.slug} delay={i * 0.04}>
                <Link
                  to={`${localePath("/benchmarks-playbooks")}/${bp.slug}`}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/40 transition-all duration-500 block p-5 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors duration-500">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">{t.playbookBadge}</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors duration-300">{bp.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{bp.heroSubtitle}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
                    {t.viewPlaybook} <ArrowRight size={10} />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* FAQS */}
      <FAQSection faqs={t.faqs} schemaId="bp-index" />

      {/* INTERNAL LINKS */}
      <InternalLinks title={t.linksTitle} links={t.links} />

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <BarChart3 size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">{t.ctaH2}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">{t.ctaP}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {t.ctaBtn} <ArrowRight size={16} />
              </Link>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {t.ctaDemo}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default BenchmarksPlaybooks;
