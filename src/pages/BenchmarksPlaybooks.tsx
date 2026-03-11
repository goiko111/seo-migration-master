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

const CANONICAL = "https://winerim.wine";

const indexFaqs = [
  { q: "¿Qué es un benchmark de carta de vinos?", a: "Un benchmark es un punto de referencia que te permite comparar tu carta con las prácticas habituales del sector. No son cifras absolutas, sino rangos orientativos basados en la experiencia de restaurantes similares al tuyo." },
  { q: "¿Qué es un playbook para restaurantes?", a: "Un playbook es un plan de acción estructurado que te guía paso a paso para resolver un problema concreto de tu carta de vinos o de la venta de vino en tu restaurante." },
  { q: "¿Necesito datos para usar estos benchmarks?", a: "Tener datos de venta mejora mucho la utilidad, pero los benchmarks están diseñados para ser útiles incluso como referencia cualitativa para evaluar tu situación." },
  { q: "¿Son aplicables a cualquier tipo de restaurante?", a: "Los contenidos están organizados por tipo de restaurante y contexto. Cada benchmark y playbook indica para quién está diseñado y cómo adaptarlo." },
];

const BenchmarksPlaybooks = () => {
  const benchmarks = getBPByType("benchmark");
  const playbooks = getBPByType("playbook");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Benchmarks & Playbooks para Cartas de Vino | Winerim"
        description="Benchmarks del sector y playbooks prácticos para optimizar tu carta de vinos. Datos de referencia, planes de acción y criterios expertos para restaurantes, hoteles y grupos."
        url={`${CANONICAL}/benchmarks-playbooks`}
      />
      <DynamicSchemaMarkup
        id="benchmarks-playbooks"
        type="CollectionPage"
        title="Benchmarks & Playbooks para Cartas de Vino"
        description="Benchmarks del sector y playbooks prácticos para optimizar tu carta de vinos."
        url={`${CANONICAL}/benchmarks-playbooks`}
        faqs={indexFaqs}
        breadcrumbs={[
          { name: "Inicio", url: CANONICAL },
          { name: "Benchmarks & Playbooks", url: `${CANONICAL}/benchmarks-playbooks` },
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
            Conocimiento aplicado
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Benchmarks & Playbooks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            Datos de referencia del sector y planes de acción prácticos para optimizar tu carta de vinos, mejorar la rentabilidad y vender más vino en tu restaurante.
          </motion.p>
        </div>
      </section>

      {/* SUMMARY BOX */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <ScrollReveal>
          <SummaryBox
            definition="Esta sección reúne benchmarks del sector y playbooks prácticos para optimizar tu carta de vinos: datos de referencia, planes de acción y criterios expertos para restaurantes reales."
            bullets={[
              "Benchmarks con rangos de referencia para dimensionar, estructurar y preciar tu carta de vinos.",
              "Playbooks con planes de acción paso a paso para resolver problemas concretos de venta, rotación y formación.",
              "Criterios prácticos, no teóricos: todo está pensado para aplicarse en restaurantes reales.",
            ]}
            label="¿Qué encontrarás aquí?"
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Benchmarks</h2>
          </div>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
            Puntos de referencia del sector para evaluar tu carta y tomar decisiones informadas.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benchmarks.map((bp, i) => {
            const Icon = bp.icon;
            return (
              <ScrollReveal key={bp.slug} delay={i * 0.04}>
                <Link
                  to={`/benchmarks-playbooks/${bp.slug}`}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/40 transition-all duration-500 block p-5 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors duration-500">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">Benchmark</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors duration-300">{bp.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{bp.heroSubtitle}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
                    Ver benchmark <ArrowRight size={10} />
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Playbooks</h2>
          </div>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
            Planes de acción paso a paso para resolver problemas concretos y mejorar tu gestión del vino.
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {playbooks.map((bp, i) => {
            const Icon = bp.icon;
            return (
              <ScrollReveal key={bp.slug} delay={i * 0.04}>
                <Link
                  to={`/benchmarks-playbooks/${bp.slug}`}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/40 transition-all duration-500 block p-5 h-full hover:shadow-lg hover:shadow-wine/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/15 transition-colors duration-500">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">Playbook</span>
                  </div>
                  <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors duration-300">{bp.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{bp.heroSubtitle}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest uppercase text-accent group-hover:text-wine transition-colors">
                    Ver playbook <ArrowRight size={10} />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* FAQS */}
      <FAQSection faqs={indexFaqs} schemaId="bp-index" />

      {/* INTERNAL LINKS */}
      <InternalLinks
        title="Recursos complementarios"
        links={[
          { to: "/guias-y-recursos", label: "Guías y recursos", type: "guide" },
          { to: "/herramientas", label: "Herramientas gratuitas", type: "tool" },
          { to: "/software-carta-de-vinos", label: "Software carta de vinos", type: "solution" },
          { to: "/producto/inteligencia-dinamica", label: "Inteligencia dinámica", type: "solution" },
        ]}
      />

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <BarChart3 size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              Aplica estos criterios con Winerim
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Winerim automatiza el análisis, la optimización y el seguimiento de tu carta de vinos para que tomes mejores decisiones con menos esfuerzo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analisis-carta" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Analizar mi carta gratis <ArrowRight size={16} />
              </Link>
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Solicitar demo
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
