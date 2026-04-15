/**
 * Reusable BOFU comparison page template.
 * Designed for SEO, AI citability, and conversion.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SummaryBox from "@/components/seo/SummaryBox";
import ComparisonTable from "@/components/seo/ComparisonTable";
import NotForSection from "@/components/seo/NotForSection";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import ArticleMidCTA from "@/components/article/ArticleMidCTA";
import CTASection from "@/components/CTASection";
import StickyCTA from "@/components/StickyCTA";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap, I18nMap } from "@/i18n/types";
import type { ComparisonData } from "@/data/comparisons";

const chrome: I18nMap<{
  breadComparativas: string; summaryLabel: string; tableTitle: string;
  midCtaTitle: string; midCtaDesc: string; prosConsTitle: string; prosLabel: string; consLabel: string;
  whenTitle: string; idealTitle: string; notTitle: (alt: string) => string;
  ctaBadge: string; ctaTitle: string; ctaDesc: string; ctaPrimary: string; ctaSecondary: string; ctaMicro: string;
  relatedTitle: string; tryFree: string; analyzeList: string;
  breadHome: string;
}> = {
  es: {
    breadComparativas: "Comparativas", summaryLabel: "Resumen de la comparativa", tableTitle: "Comparativa por criterios",
    midCtaTitle: "¿Quieres ver la diferencia en tu restaurante?", midCtaDesc: "Solicita una demo y te mostramos cómo Winerim se compara con tu solución actual.",
    prosConsTitle: "Ventajas y limitaciones", prosLabel: "Ventajas", consLabel: "Limitaciones",
    whenTitle: "¿Cuándo tiene más sentido Winerim?",
    idealTitle: "Winerim encaja mejor si…", notTitle: (alt) => `${alt} puede ser suficiente si…`,
    ctaBadge: "Descubre el potencial de tu carta", ctaTitle: "Prueba Winerim con tu carta real",
    ctaDesc: "Envíanos tu carta en cualquier formato y te preparamos una demo personalizada. Sin compromiso.",
    ctaPrimary: "Solicitar demo personalizada", ctaSecondary: "Analizar mi carta", ctaMicro: "Compruébalo tú mismo. Demo adaptada a tu restaurante.",
    relatedTitle: "Contenido relacionado", tryFree: "Prueba Winerim gratis", analyzeList: "Analiza tu carta",
    breadHome: "Inicio",
  },
  en: {
    breadComparativas: "Comparisons", summaryLabel: "Comparison summary", tableTitle: "Comparison by criteria",
    midCtaTitle: "Want to see the difference in your restaurant?", midCtaDesc: "Request a demo and we'll show you how Winerim compares with your current solution.",
    prosConsTitle: "Advantages and limitations", prosLabel: "Advantages", consLabel: "Limitations",
    whenTitle: "When does Winerim make more sense?",
    idealTitle: "Winerim fits best if…", notTitle: (alt) => `${alt} may be enough if…`,
    ctaBadge: "Discover your list's potential", ctaTitle: "Try Winerim with your real wine list",
    ctaDesc: "Send us your wine list in any format and we'll prepare a personalised demo. No commitment.",
    ctaPrimary: "Request personalised demo", ctaSecondary: "Analyse my list", ctaMicro: "See for yourself. Demo tailored to your restaurant.",
    relatedTitle: "Related content", tryFree: "Try Winerim free", analyzeList: "Analyse your list",
    breadHome: "Home",
  },
  it: {
    breadComparativas: "Confronti", summaryLabel: "Riepilogo del confronto", tableTitle: "Confronto per criteri",
    midCtaTitle: "Vuoi vedere la differenza nel tuo ristorante?", midCtaDesc: "Richiedi una demo e ti mostreremo come Winerim si confronta con la tua soluzione attuale.",
    prosConsTitle: "Vantaggi e limitazioni", prosLabel: "Vantaggi", consLabel: "Limitazioni",
    whenTitle: "Quando Winerim ha più senso?",
    idealTitle: "Winerim è più adatto se…", notTitle: (alt) => `${alt} può essere sufficiente se…`,
    ctaBadge: "Scopri il potenziale della tua carta", ctaTitle: "Prova Winerim con la tua carta reale",
    ctaDesc: "Inviaci la tua carta in qualsiasi formato e prepareremo una demo personalizzata. Senza impegno.",
    ctaPrimary: "Richiedi demo personalizzata", ctaSecondary: "Analizza la mia carta", ctaMicro: "Verificalo tu stesso. Demo adattata al tuo ristorante.",
    relatedTitle: "Contenuti correlati", tryFree: "Prova Winerim gratis", analyzeList: "Analizza la tua carta",
    breadHome: "Home",
  },
  fr: {
    breadComparativas: "Comparatifs", summaryLabel: "Résumé du comparatif", tableTitle: "Comparatif par critères",
    midCtaTitle: "Vous voulez voir la différence dans votre restaurant ?", midCtaDesc: "Demandez une démo et nous vous montrerons comment Winerim se compare à votre solution actuelle.",
    prosConsTitle: "Avantages et limites", prosLabel: "Avantages", consLabel: "Limites",
    whenTitle: "Quand Winerim a-t-il plus de sens ?",
    idealTitle: "Winerim convient mieux si…", notTitle: (alt) => `${alt} peut suffire si…`,
    ctaBadge: "Découvrez le potentiel de votre carte", ctaTitle: "Essayez Winerim avec votre vraie carte",
    ctaDesc: "Envoyez-nous votre carte dans n'importe quel format et nous préparerons une démo personnalisée. Sans engagement.",
    ctaPrimary: "Demander une démo personnalisée", ctaSecondary: "Analyser ma carte", ctaMicro: "Vérifiez par vous-même. Démo adaptée à votre restaurant.",
    relatedTitle: "Contenu associé", tryFree: "Essayez Winerim gratuitement", analyzeList: "Analysez votre carte",
    breadHome: "Accueil",
  },
};

interface Props {
  data: ComparisonData;
}

const ComparisonPageTemplate = ({ data }: Props) => {
  const { lang, localePath } = useLanguage();
  const t = chrome[lang] || chrome.es;
  const url = `https://winerim.wine${localePath(`/comparativa/${data.slug}`)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={data.seoTitle} description={data.seoDesc} url={url} />
      <DynamicSchemaMarkup
        id={`comp-${data.slug}`}
        type="Article"
        title={data.seoTitle}
        description={data.seoDesc}
        url={url}
        faqs={data.faqs}
        breadcrumbs={[
          { name: t.breadHome, url: "https://winerim.wine" },
          { name: t.breadComparativas, url: `https://winerim.wine${localePath("/comparativas")}` },
          { name: data.h1 + " " + data.h1Highlight, url },
        ]}
      />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: t.breadComparativas, href: localePath("/comparativas") },
            { label: data.h1 + " " + data.h1Highlight },
          ]} />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Scale size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{data.badge}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            {data.h1} <span className="text-gradient-wine italic">{data.h1Highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">{data.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {t.tryFree} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/analisis-carta")} className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              {t.analyzeList}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* ── CONTEXT ── */}
        <ScrollReveal>
          <p className="text-muted-foreground leading-relaxed mb-8">{data.context}</p>
        </ScrollReveal>

        {/* ── SUMMARY BOX ── */}
        <ScrollReveal>
          <SummaryBox
            label={t.summaryLabel}
            definition={data.summary.definition}
            bullets={data.summary.bullets}
          />
        </ScrollReveal>

        {/* ── COMPARISON TABLE ── */}
        <ComparisonTable
          title={t.tableTitle}
          columns={data.tableColumns}
          rows={data.tableRows}
          highlightColumn={0}
        />

        {/* ── MID CTA — BOFU ── */}
        <div className="my-4">
          <ArticleMidCTA
            pageType="comparison"
            title={t.midCtaTitle}
            description={t.midCtaDesc}
            variant="highlight"
          />
        </div>

        {/* ── PROS / CONS ── */}
        <section className="my-12">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.prosConsTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {data.prosConsSections.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-bold mb-4">{section.title}</h3>
                  <div className="mb-4">
                    <p className="text-xs font-semibold tracking-wider uppercase text-wine mb-2">{t.prosLabel}</p>
                    <ul className="space-y-1.5">
                      {section.pros.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-wine mt-0.5 shrink-0">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">{t.consLabel}</p>
                    <ul className="space-y-1.5">
                      {section.cons.map((c, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-muted-foreground/50 mt-0.5 shrink-0">–</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── WHO FITS ── */}
        <NotForSection
          idealFor={data.whoFits.winerimIdeal}
          notFor={data.whoFits.alternativeOk}
          titleIdeal={t.idealTitle}
          titleNot={t.notTitle(data.whoFits.alternativeLabel)}
        />

        {/* ── WHEN WINERIM ── */}
        <section className="my-12">
          <ScrollReveal>
            <div className="rounded-2xl border border-wine/20 bg-wine/5 p-6 md:p-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">{t.whenTitle}</h2>
              <ul className="space-y-3">
                {data.whenWinerim.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
                    <ArrowRight size={14} className="text-wine mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>

        {/* ── FAQs ── */}
        <FAQSection faqs={data.faqs} />
      </div>

      {/* ── INTERNAL LINKS ── */}
      <InternalLinks links={data.relatedLinks} title={t.relatedTitle} />

      {/* ── CTA FINAL — BOFU ── */}
      <CTASection
        pageType="comparison"
        badge={t.ctaBadge}
        title={t.ctaTitle}
        description={t.ctaDesc}
        primaryText={t.ctaPrimary}
        primaryUrl={localePath("/demo")}
        secondaryText={t.ctaSecondary}
        secondaryUrl={localePath("/analisis-carta")}
        micro={t.ctaMicro}
      />

      {/* Sticky CTA */}
      <StickyCTA pageType="comparison" />

      <Footer />
    </div>
  );
};

export default ComparisonPageTemplate;
