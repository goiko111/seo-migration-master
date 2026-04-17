import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, TrendingUp, Users,
  Target, CheckCircle, Sparkles, MapPin, HelpCircle
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

const CityTemplate = ({ page, related }: Props) => {
  const b = page.body;
  const problems: string[] = b.problems || [];
  const benefits: string[] = b.benefits || [];
  const features: { title: string; desc: string }[] = b.features || [];
  const stats: { value: string; label: string }[] = b.stats || [];
  const internalLinks = (b.internal_links || []).map((l: any) => ({
    to: l.url || l.to || "#",
    label: l.label || l.title || "",
    type: l.type || "guide" as const,
  }));
  const canonical = page.canonical_url || `https://winerim.wine/${page.slug}`;

  const cityName = b.city_name || "";

  const templateI18n: Record<string, {
    breadcrumbHome: string;
    breadcrumbSolutions: string;
    breadcrumbLabel: string;
    wineInCity: (city: string) => string;
    avgTicket: string;
    commonProblems: string;
    challengesIn: (city: string) => string;
    challengesDesc: (city: string) => string;
    winerimIn: (city: string) => string;
    howWinerimHelps: (city: string) => string;
    expectedResults: string;
    benefits: string;
    digitizeAdvantages: (city: string) => string;
    faq: string;
    ctaTitle: (city: string) => string;
    ctaDesc: string;
    ctaButton: string;
  }> = {
    es: {
      breadcrumbHome: "Inicio",
      breadcrumbSolutions: "Soluciones por ciudad",
      breadcrumbLabel: "Soluciones",
      wineInCity: (city: string) => `El vino en los restaurantes de ${city}`,
      avgTicket: "Ticket medio estimado:",
      commonProblems: "Problemas comunes",
      challengesIn: (city: string) => `Retos en la gestión del vino en ${city}`,
      challengesDesc: (city: string) => `Problemas habituales que encuentran los restaurantes de ${city} en la gestión de su carta de vinos.`,
      winerimIn: (city: string) => `Winerim en ${city}`,
      howWinerimHelps: (city: string) => `Cómo ayuda Winerim a los restaurantes de ${city}`,
      expectedResults: "Resultados esperados",
      benefits: "Beneficios",
      digitizeAdvantages: (city: string) => `Ventajas de digitalizar tu carta en ${city}`,
      faq: "Preguntas frecuentes",
      ctaTitle: (city: string) => `¿Tienes un restaurante en ${city}?`,
      ctaDesc: "Descubre cómo Winerim puede ayudarte a vender más vino y optimizar tu carta.",
      ctaButton: "Solicitar demo",
    },
    en: {
      breadcrumbHome: "Home",
      breadcrumbSolutions: "Solutions by city",
      breadcrumbLabel: "Solutions",
      wineInCity: (city: string) => `Wine in ${city} restaurants`,
      avgTicket: "Average check estimate:",
      commonProblems: "Common challenges",
      challengesIn: (city: string) => `Wine management challenges in ${city}`,
      challengesDesc: (city: string) => `Common issues that restaurants in ${city} face when managing their wine list.`,
      winerimIn: (city: string) => `Winerim in ${city}`,
      howWinerimHelps: (city: string) => `How Winerim helps restaurants in ${city}`,
      expectedResults: "Expected results",
      benefits: "Benefits",
      digitizeAdvantages: (city: string) => `Advantages of digitizing your wine list in ${city}`,
      faq: "Frequently asked questions",
      ctaTitle: (city: string) => `Have a restaurant in ${city}?`,
      ctaDesc: "Discover how Winerim can help you sell more wine and optimize your list.",
      ctaButton: "Request demo",
    },
    it: {
      breadcrumbHome: "Home",
      breadcrumbSolutions: "Soluzioni per città",
      breadcrumbLabel: "Soluzioni",
      wineInCity: (city: string) => `Il vino nei ristoranti di ${city}`,
      avgTicket: "Scontrino medio stimato:",
      commonProblems: "Sfide comuni",
      challengesIn: (city: string) => `Sfide nella gestione del vino a ${city}`,
      challengesDesc: (city: string) => `Problemi comuni che i ristoranti di ${city} affrontano nella gestione della loro carta dei vini.`,
      winerimIn: (city: string) => `Winerim a ${city}`,
      howWinerimHelps: (city: string) => `Come Winerim aiuta i ristoranti di ${city}`,
      expectedResults: "Risultati attesi",
      benefits: "Vantaggi",
      digitizeAdvantages: (city: string) => `Vantaggi della digitalizzazione della tua carta a ${city}`,
      faq: "Domande frequenti",
      ctaTitle: (city: string) => `Hai un ristorante a ${city}?`,
      ctaDesc: "Scopri come Winerim può aiutarti a vendere più vino e ottimizzare la tua carta.",
      ctaButton: "Richiedi demo",
    },
    fr: {
      breadcrumbHome: "Accueil",
      breadcrumbSolutions: "Solutions par ville",
      breadcrumbLabel: "Solutions",
      wineInCity: (city: string) => `Le vin dans les restaurants de ${city}`,
      avgTicket: "Panier moyen estimé :",
      commonProblems: "Défis courants",
      challengesIn: (city: string) => `Défis de gestion des vins à ${city}`,
      challengesDesc: (city: string) => `Problèmes courants rencontrés par les restaurants de ${city} dans la gestion de leur carte des vins.`,
      winerimIn: (city: string) => `Winerim à ${city}`,
      howWinerimHelps: (city: string) => `Comment Winerim aide les restaurants de ${city}`,
      expectedResults: "Résultats attendus",
      benefits: "Avantages",
      digitizeAdvantages: (city: string) => `Avantages de la numérisation de votre carte à ${city}`,
      faq: "Questions fréquemment posées",
      ctaTitle: (city: string) => `Avez-vous un restaurant à ${city} ?`,
      ctaDesc: "Découvrez comment Winerim peut vous aider à vendre plus de vins et à optimiser votre carte.",
      ctaButton: "Demander une démo",
    },
    de: {
      breadcrumbHome: "Startseite",
      breadcrumbSolutions: "Loesungen nach Stadt",
      breadcrumbLabel: "Loesungen",
      wineInCity: (city: string) => `Wein in den Restaurants von ${city}`,
      avgTicket: "Durchschnittlicher Rechnungsbetrag:",
      commonProblems: "Haeufige Herausforderungen",
      challengesIn: (city: string) => `Herausforderungen bei der Weinkartenverwaltung in ${city}`,
      challengesDesc: (city: string) => `Haeufige Probleme, denen sich Restaurants in ${city} bei der Verwaltung ihrer Weinkarte gegenuebersehen.`,
      winerimIn: (city: string) => `Winerim in ${city}`,
      howWinerimHelps: (city: string) => `Wie Winerim Restaurants in ${city} unterstuetzt`,
      expectedResults: "Erwartete Ergebnisse",
      benefits: "Vorteile",
      digitizeAdvantages: (city: string) => `Vorteile der Digitalisierung Ihrer Weinkarte in ${city}`,
      faq: "Haeufig gestellte Fragen",
      ctaTitle: (city: string) => `Haben Sie ein Restaurant in ${city}?`,
      ctaDesc: "Erfahren Sie, wie Winerim Ihnen helfen kann, mehr Wein zu verkaufen und Ihre Weinkarte zu optimieren.",
      ctaButton: "Demo anfordern",
    },
    pt: {
      breadcrumbHome: "Inicio",
      breadcrumbSolutions: "Solucoes por cidade",
      breadcrumbLabel: "Solucoes",
      wineInCity: (city: string) => `O vinho nos restaurantes de ${city}`,
      avgTicket: "Ticket medio estimado:",
      commonProblems: "Desafios comuns",
      challengesIn: (city: string) => `Desafios na gestao do vinho em ${city}`,
      challengesDesc: (city: string) => `Problemas habituais que os restaurantes de ${city} enfrentam na gestao da sua carta de vinhos.`,
      winerimIn: (city: string) => `Winerim em ${city}`,
      howWinerimHelps: (city: string) => `Como a Winerim ajuda os restaurantes de ${city}`,
      expectedResults: "Resultados esperados",
      benefits: "Beneficios",
      digitizeAdvantages: (city: string) => `Vantagens de digitalizar a sua carta em ${city}`,
      faq: "Perguntas frequentes",
      ctaTitle: (city: string) => `Tem um restaurante em ${city}?`,
      ctaDesc: "Descubra como a Winerim pode o ajudar a vender mais vinho e otimizar a sua carta.",
      ctaButton: "Solicitar demo",
    },
  };

  const t = templateI18n[page.lang] || templateI18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={page.meta_title} description={page.meta_description} url={canonical} type="article" image={page.og_image || undefined} noindex={page.isThinContent} />
      <DynamicSchemaMarkup
        id={page.slug}
        type={page.schema_type || "Article"}
        title={page.hero_title}
        description={page.meta_description}
        url={`https://winerim.wine/${page.slug}`}
        faqs={page.faqs}
        breadcrumbs={[
          { name: t.breadcrumbHome, url: "https://winerim.wine/" },
          { name: t.breadcrumbSolutions, url: "https://winerim.wine/soluciones" },
          { name: b.city_name || page.hero_title, url: `https://winerim.wine/${page.slug}` },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: t.breadcrumbLabel, href: "/guias-y-recursos" },
            { label: b.city_name || "Ciudad" },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <MapPin size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{page.hero_badge || b.country || "España"}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {page.hero_title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
            {page.hero_subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
            <Link to={page.cta_primary_url || "/demo"} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {page.cta_primary_text || "Solicitar demo"} <ArrowRight size={16} />
            </Link>
            {page.cta_secondary_text && (
              <Link to={page.cta_secondary_url || "/analisis-carta"} className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {page.cta_secondary_text}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* CONTEXTO */}
      {b.intro && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{t.wineInCity(cityName)}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">{b.intro}</p>
            {b.ticket_medio && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-gradient-card text-sm">
                <TrendingUp size={14} className="text-wine" />
                <span>{t.avgTicket} <strong className="text-foreground">{b.ticket_medio}</strong></span>
              </div>
            )}
          </ScrollReveal>
        </section>
      )}

      {/* PROBLEMAS */}
      {problems.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.commonProblems}</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.challengesIn(cityName)}</h2>
              <p className="text-muted-foreground max-w-2xl mb-12">{t.challengesDesc(cityName)}</p>
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

      {/* CÓMO AYUDA WINERIM */}
      {features.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.winerimIn(cityName)}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.howWinerimHelps(cityName)}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-xl border border-border bg-gradient-card h-full">
                  <CheckCircle size={18} className="text-wine mb-3" />
                  <h3 className="font-heading font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* RESULTADOS */}
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

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">{t.benefits}</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.digitizeAdvantages(cityName)}</h2>
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
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t.faq}</h2>
          </ScrollReveal>
          <div className="space-y-6">
            {page.faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="p-6 rounded-xl border border-border bg-gradient-card">
                  <div className="flex items-start gap-3 mb-3">
                    <HelpCircle size={18} className="text-wine shrink-0 mt-0.5" />
                    <h3 className="font-heading font-bold">{faq.q}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* INTERNAL LINKS */}
      {internalLinks.length > 0 && <InternalLinks links={internalLinks} />}

      {/* RELATED */}
      <RelatedPages pages={related} />

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              {t.ctaTitle(cityName)}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              {t.ctaDesc}
            </p>
            <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {t.ctaButton} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default CityTemplate;
