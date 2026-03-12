import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BookOpen, CheckCircle, HelpCircle,
  Sparkles, Lightbulb, AlertTriangle, ListChecks
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedPages from "@/components/seo/RelatedPages";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import ArticleMidCTA from "@/components/article/ArticleMidCTA";
import CTASection from "@/components/CTASection";
import StickyCTA from "@/components/StickyCTA";
import EnhancedSections from "@/components/seo/EnhancedSections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GuideSection {
  heading: string;
  content: string;
  tips?: string[];
  icon?: "check" | "lightbulb" | "alert" | "list";
}

interface GuideLink {
  label: string;
  url: string;
}

export interface GuidePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge?: string;
  breadcrumbParent?: { label: string; href: string };
  tableOfContents?: string[];
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  relatedTools?: GuideLink[];
  relatedGuides?: GuideLink[];
  ctaPrimaryText?: string;
  ctaPrimaryUrl?: string;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  ctaFinalTitle?: string;
  ctaFinalDescription?: string;
}

const iconMap = {
  check: CheckCircle,
  lightbulb: Lightbulb,
  alert: AlertTriangle,
  list: ListChecks,
};

const GuideTemplate = ({ data }: { data: GuidePageData }) => {
  const ctaPrimary = data.ctaPrimaryText || "Analiza tu carta gratis";
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
          ...(data.breadcrumbParent
            ? [{ name: data.breadcrumbParent.label, url: `https://winerim.wine${data.breadcrumbParent.href}` }]
            : []),
          { name: data.heroTitle, url: `https://winerim.wine/${data.slug}` },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            ...(data.breadcrumbParent ? [data.breadcrumbParent] : [{ label: "Guías", href: "/guias-y-recursos" }]),
            { label: data.heroTitle },
          ]} />
          {data.heroBadge && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
              <BookOpen size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine">{data.heroBadge}</span>
            </motion.div>
          )}
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
            {data.ctaSecondaryText && (
              <Link to={data.ctaSecondaryUrl || "/demo"}
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                {data.ctaSecondaryText}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      {data.tableOfContents && data.tableOfContents.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <div className="p-6 rounded-xl border border-border bg-gradient-card">
            <h2 className="font-heading font-bold text-sm uppercase tracking-widest text-accent mb-4">Contenido</h2>
            <ol className="space-y-2">
              {data.tableOfContents.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-wine font-semibold shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* SECTIONS — enhanced with lead paragraph extraction */}
      <EnhancedSections
        sections={data.sections}
        insertAfter={data.sections.length > 3 ? {
          index: Math.floor(data.sections.length / 2) - 1,
          node: <ArticleMidCTA pageType="guide" variant="subtle" />,
        } : undefined}
      />

      {/* MID CTA — only if sections are short (otherwise inserted inline above) */}
      {data.sections.length <= 3 && (
        <ArticleMidCTA pageType="guide" variant="subtle" />
      )}

      {/* RELATED TOOLS */}
      {data.relatedTools && data.relatedTools.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">Herramientas relacionadas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.relatedTools.map((tool, i) => (
                <Link key={i} to={tool.url}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-colors group">
                  <Sparkles size={16} className="text-wine shrink-0" />
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors">{tool.label}</span>
                  <ArrowRight size={14} className="ml-auto text-muted-foreground group-hover:text-wine transition-colors" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* RELATED GUIDES */}
      {data.relatedGuides && data.relatedGuides.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">Guías relacionadas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.relatedGuides.map((guide, i) => (
                <Link key={i} to={guide.url}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-colors group">
                  <BookOpen size={16} className="text-wine shrink-0" />
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors">{guide.label}</span>
                  <ArrowRight size={14} className="ml-auto text-muted-foreground group-hover:text-wine transition-colors" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* FAQ — accordion */}
      {data.faqs.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Preguntas frecuentes</h2>
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

      {/* CTA FINAL — MOFU */}
      <CTASection
        pageType="guide"
        badge="Siguiente paso"
        title={data.ctaFinalTitle || "Analiza tu carta de vinos sin compromiso"}
        description={data.ctaFinalDescription || "Envía tu carta en cualquier formato y te devolvemos un diagnóstico con oportunidades reales de mejora."}
        primaryText={ctaPrimary}
        primaryUrl={ctaPrimaryUrl}
        secondaryText="Solicitar demo"
        secondaryUrl="/demo"
      />

      {/* Sticky CTA */}
      <StickyCTA pageType="guide" />

      <Footer />
    </div>
  );
};

export default GuideTemplate;
