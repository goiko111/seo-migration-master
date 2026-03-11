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
import type { ComparisonData } from "@/data/comparisons";

interface Props {
  data: ComparisonData;
}

const ComparisonPageTemplate = ({ data }: Props) => {
  const url = `https://winerim.wine/comparativa/${data.slug}`;

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
          { name: "Inicio", url: "https://winerim.wine" },
          { name: "Comparativas", url: "https://winerim.wine/comparativas" },
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
            { label: "Comparativas", href: "/comparativas" },
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
            <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Prueba Winerim gratis <ArrowRight size={16} />
            </Link>
            <Link to="/analisis-carta" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              Analiza tu carta
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
            label="Resumen de la comparativa"
            definition={data.summary.definition}
            bullets={data.summary.bullets}
          />
        </ScrollReveal>

        {/* ── COMPARISON TABLE ── */}
        <ComparisonTable
          title="Comparativa por criterios"
          columns={data.tableColumns}
          rows={data.tableRows}
          highlightColumn={0}
        />

        {/* ── MID CTA — BOFU ── */}
        <div className="my-4">
          <ArticleMidCTA
            pageType="comparison"
            title="¿Quieres ver la diferencia en tu restaurante?"
            description="Solicita una demo y te mostramos cómo Winerim se compara con tu solución actual."
            variant="highlight"
          />
        </div>

        {/* ── PROS / CONS ── */}
        <section className="my-12">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Ventajas y limitaciones</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {data.prosConsSections.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-bold mb-4">{section.title}</h3>
                  <div className="mb-4">
                    <p className="text-xs font-semibold tracking-wider uppercase text-wine mb-2">Ventajas</p>
                    <ul className="space-y-1.5">
                      {section.pros.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-wine mt-0.5 shrink-0">✓</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Limitaciones</p>
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
          titleIdeal="Winerim encaja mejor si…"
          titleNot={`${data.whoFits.alternativeLabel} puede ser suficiente si…`}
        />

        {/* ── WHEN WINERIM ── */}
        <section className="my-12">
          <ScrollReveal>
            <div className="rounded-2xl border border-wine/20 bg-wine/5 p-6 md:p-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold mb-4">
                ¿Cuándo tiene más sentido Winerim?
              </h2>
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
      <InternalLinks links={data.relatedLinks} title="Contenido relacionado" />

      {/* ── CTA FINAL — BOFU ── */}
      <CTASection
        pageType="comparison"
        badge="Descubre el potencial de tu carta"
        title="Prueba Winerim con tu carta real"
        description="Envíanos tu carta en cualquier formato y te preparamos una demo personalizada. Sin compromiso."
        primaryText="Solicitar demo personalizada"
        primaryUrl="/demo"
        secondaryText="Analizar mi carta"
        secondaryUrl="/analisis-carta"
        micro="Compruébalo tú mismo. Demo adaptada a tu restaurante."
      />

      {/* Sticky CTA */}
      <StickyCTA pageType="comparison" />

      <Footer />
    </div>
  );
};

export default ComparisonPageTemplate;
