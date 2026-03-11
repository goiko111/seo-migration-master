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
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">{data.subtitle}</p>
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

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                Descubre el potencial de tu carta
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Prueba Winerim con <span className="text-gradient-wine italic">tu carta real</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta en cualquier formato y te preparamos una demo personalizada. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Solicitar demo gratuita <ArrowRight size={16} />
                </Link>
                <Link
                  to="/analisis-carta"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Analizar mi carta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComparisonPageTemplate;
