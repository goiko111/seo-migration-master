import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, AlertTriangle, Crosshair, BookOpen, BarChart3, Lightbulb, XCircle } from "lucide-react";
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
import InternalLinks from "@/components/seo/InternalLinks";
import ArticleMidCTA from "@/components/article/ArticleMidCTA";
import CTASection from "@/components/CTASection";
import StickyCTA from "@/components/StickyCTA";
import type { BPItem } from "@/data/benchmarksPlaybooks";
import { getRelatedBPs } from "@/data/benchmarksPlaybooks";

const CANONICAL = "https://winerim.wine";

const BenchmarkPlaybookTemplate = ({ data }: { data: BPItem }) => {
  const isBenchmark = data.type === "benchmark";
  const typeLabel = isBenchmark ? "Benchmark" : "Playbook";
  const related = getRelatedBPs(data.relatedSlugs);
  const url = `${CANONICAL}/benchmarks-playbooks/${data.slug}`;
  const ctaText = data.ctaText || "Solicitar demo personalizada";
  const ctaUrl = data.ctaUrl || "/demo";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        url={url}
        type="article"
      />
      <DynamicSchemaMarkup
        id={data.slug}
        type="Article"
        title={data.title}
        description={data.metaDescription}
        url={url}
        faqs={data.faqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL },
          { name: "Benchmarks & Playbooks", url: `${CANONICAL}/benchmarks-playbooks` },
          { name: data.title, url },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[
            { label: "Benchmarks & Playbooks", href: "/benchmarks-playbooks" },
            { label: data.title },
          ]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            {isBenchmark ? <BarChart3 size={14} className="text-wine" /> : <BookOpen size={14} className="text-wine" />}
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{typeLabel}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            {data.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-4">
            <Link to={ctaUrl} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {ctaText} <ArrowRight size={16} />
            </Link>
            <Link to="/analisis-carta" className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
              Analiza tu carta gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <aside role="note" aria-label="Resumen ejecutivo" className="rounded-xl border border-border bg-gradient-card p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
              <Lightbulb size={18} className="text-wine" /> Resumen ejecutivo
            </h2>
            <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
          </aside>
        </ScrollReveal>
      </section>

      {/* AUDIENCE */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
              <Users size={22} className="text-wine" /> Para quién es
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{data.audience}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
            <AlertTriangle size={22} className="text-wine" /> Qué problema resuelve
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{data.problem}</p>
        </ScrollReveal>
      </section>

      {/* METHODOLOGY */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
              <Crosshair size={22} className="text-wine" /> {isBenchmark ? "Metodología y criterio" : "Metodología"}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{data.methodology}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* KEY POINTS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">
            {isBenchmark ? "Puntos clave del benchmark" : "Plan de acción"}
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          {data.keyPoints.map((kp, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="group p-5 md:p-6 rounded-xl border border-border bg-gradient-card hover:border-wine/30 transition-all duration-500">
                <h3 className="font-heading font-bold text-base mb-2 group-hover:text-wine transition-colors duration-300">{kp.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{kp.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHAT IT MEANS / WHEN TO USE / COMMON MISTAKES */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-3">Qué significa</h2>
            <p className="text-muted-foreground leading-relaxed">{data.whatItMeans}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-3">Cuándo usarlo</h2>
            <p className="text-muted-foreground leading-relaxed">{data.whenToUse}</p>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <XCircle size={18} className="text-destructive" /> Errores comunes
            </h2>
            <ul className="space-y-3">
              {data.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-destructive font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* MID CTA — BOFU */}
      <ArticleMidCTA
        pageType="benchmark"
        title="¿Quieres aplicar esto a tu carta?"
        description="Solicita una demo y te mostramos cómo Winerim automatiza el análisis y la optimización de tu carta de vinos."
        variant="highlight"
      />

      {/* FAQs — accordion */}
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

      {/* RELATED */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-6">Contenido relacionado</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((r, i) => {
              const Icon = r.icon;
              return (
                <ScrollReveal key={r.slug} delay={i * 0.04}>
                  <Link
                    to={`/benchmarks-playbooks/${r.slug}`}
                    className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-gradient-card hover:border-wine/40 transition-all duration-500"
                  >
                    <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-wine" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-accent block mb-0.5">
                        {r.type === "benchmark" ? "Benchmark" : "Playbook"}
                      </span>
                      <p className="text-sm font-medium group-hover:text-wine transition-colors">{r.title}</p>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine transition-colors shrink-0 mt-1" />
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>
      )}

      {/* INTERNAL LINKS */}
      <InternalLinks
        title="Explora más recursos de Winerim"
        links={[
          { to: "/guias-y-recursos", label: "Guías y recursos", type: "guide" },
          { to: "/herramientas", label: "Herramientas gratuitas", type: "tool" },
          { to: "/funcionalidades", label: "Funcionalidades de Winerim", type: "solution" },
          { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
        ]}
      />

      {/* FINAL CTA — BOFU */}
      <CTASection
        pageType="benchmark"
        badge={`Aplica este ${typeLabel.toLowerCase()}`}
        title={`Optimiza tu carta con datos e inteligencia artificial`}
        description="Winerim automatiza el análisis, la optimización y el seguimiento de tu carta de vinos para que tomes decisiones basadas en datos."
        primaryText={ctaText}
        primaryUrl={ctaUrl}
        secondaryText="Analiza tu carta gratis"
        secondaryUrl="/analisis-carta"
      />

      {/* Sticky CTA */}
      <StickyCTA pageType="benchmark" />

      <Footer />
    </div>
  );
};

export default BenchmarkPlaybookTemplate;
