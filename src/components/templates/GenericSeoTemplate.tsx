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
import type { SeoPage, RelatedPageInfo } from "@/hooks/useSeoPage";

interface Props {
  page: SeoPage;
  related: RelatedPageInfo[];
}

const clusterConfig: Record<string, { icon: typeof BookOpen; breadcrumbParent: string; breadcrumbHref: string; badge: string }> = {
  guide: { icon: BookOpen, breadcrumbParent: "Guías", breadcrumbHref: "/guias-y-recursos", badge: "Guía" },
  problem: { icon: Target, breadcrumbParent: "Problemas", breadcrumbHref: "/guias-y-recursos", badge: "Problema" },
  grape: { icon: Sparkles, breadcrumbParent: "Biblioteca", breadcrumbHref: "/biblioteca-vino", badge: "Uva" },
  region: { icon: BarChart3, breadcrumbParent: "Biblioteca", breadcrumbHref: "/biblioteca-vino", badge: "Región" },
  style: { icon: Zap, breadcrumbParent: "Biblioteca", breadcrumbHref: "/biblioteca-vino", badge: "Estilo" },
  pairing: { icon: Sparkles, breadcrumbParent: "Maridajes", breadcrumbHref: "/guias-y-recursos", badge: "Maridaje" },
  comparison: { icon: BarChart3, breadcrumbParent: "Comparativas", breadcrumbHref: "/guias-y-recursos", badge: "Comparativa" },
  resource: { icon: BookOpen, breadcrumbParent: "Recursos", breadcrumbHref: "/guias-y-recursos", badge: "Recurso" },
};

const GenericSeoTemplate = ({ page, related }: Props) => {
  const b = page.body;
  const config = clusterConfig[page.cluster] || clusterConfig.guide;
  const Icon = config.icon;

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
          { name: "Inicio", url: "https://winerim.wine/" },
          { name: config.breadcrumbParent, url: `https://winerim.wine${config.breadcrumbHref}` },
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
            { label: config.breadcrumbParent, href: config.breadcrumbHref },
            { label: page.hero_title },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Icon size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">{page.hero_badge || config.badge}</span>
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
              {page.cta_primary_text || "Solicitar demo"} <ArrowRight size={16} />
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
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">El problema</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Retos habituales</h2>
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

      {/* SECTIONS (rich body content) */}
      {sections.map((section, i) => {
        const isAlt = i % 2 === (problems.length > 0 ? 0 : 1);
        return (
          <section key={i} className={isAlt ? "bg-gradient-card border-y border-border py-16" : "py-16"}>
            <div className="max-w-4xl mx-auto px-6 md:px-12">
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8 whitespace-pre-line">{section.content}</p>
                {section.tips && section.tips.length > 0 && (
                  <div className="space-y-3">
                    {section.tips.map((tip, j) => (
                      <div key={j} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background">
                        <CheckCircle size={16} className="text-wine shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollReveal>
            </div>
          </section>
        );
      })}

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Beneficios</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Ventajas clave</h2>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Cómo te ayuda Winerim</h2>
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
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent block mb-3">Casos de uso</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">¿Para quién es útil?</h2>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">Resultados esperados</h2>
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
              <h3 className="font-heading font-bold text-lg mb-1">¿Quieres optimizar tu carta de vinos?</h3>
              <p className="text-sm text-muted-foreground">Winerim te ayuda a vender más vino con tecnología e inteligencia artificial.</p>
            </div>
            <Link to={page.cta_primary_url || "/demo"}
              className="shrink-0 inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
              {page.cta_primary_text || "Solicitar demo"} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="bg-gradient-card border-y border-border py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Preguntas frecuentes</h2>
            </ScrollReveal>
            <div className="space-y-6">
              {page.faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="p-6 rounded-xl border border-border bg-background">
                    <div className="flex items-start gap-3 mb-3">
                      <HelpCircle size={18} className="text-wine shrink-0 mt-0.5" />
                      <h3 className="font-heading font-bold">{faq.q}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-7">{faq.a}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
              {b.cta_final_title || "Optimiza tu carta de vinos con Winerim"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              {b.cta_final_description || "Descubre cómo Winerim puede ayudarte a vender más vino y mejorar la experiencia de tus clientes."}
            </p>
            <Link to={page.cta_primary_url || "/demo"}
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              {page.cta_primary_text || "Solicitar demo"} <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default GenericSeoTemplate;
