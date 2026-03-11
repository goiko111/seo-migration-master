import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps from "@/components/seo/NextSteps";
import DynamicSchemaMarkup from "@/components/seo/DynamicSchemaMarkup";
import { comparisons } from "@/data/comparisons";

const faqs = [
  { q: "¿Por qué comparar Winerim con otras opciones?", a: "Para que puedas tomar una decisión informada. Cada restaurante tiene necesidades diferentes y no siempre se necesita la herramienta más completa. Estas comparativas te ayudan a decidir qué encaja mejor en tu caso." },
  { q: "¿Winerim sustituye al sommelier?", a: "No. Winerim complementa al equipo de sala. En restaurantes con sommelier, amplifica su alcance. En restaurantes sin sommelier, actúa como asistente inteligente." },
  { q: "¿Puedo probar Winerim antes de decidir?", a: "Sí. Ofrecemos una demo personalizada gratuita con tu carta real para que veas cómo funciona en tu caso concreto." },
];

const Comparativas = () => {
  const url = "https://winerim.wine/comparativas";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Comparativas — Winerim vs Alternativas | Winerim"
        description="Compara Winerim con cartas PDF, QR simples, cartas impresas, gestión manual y menús digitales genéricos. Datos claros para decidir."
        url={url}
      />
      <DynamicSchemaMarkup
        id="comparativas"
        type="CollectionPage"
        title="Comparativas — Winerim vs Alternativas"
        description="Compara Winerim con cartas PDF, QR simples, cartas impresas, gestión manual y menús digitales genéricos."
        url={url}
        faqs={faqs}
        breadcrumbs={[
          { name: "Inicio", url: "https://winerim.wine" },
          { name: "Comparativas", url },
        ]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Comparativas" }]} />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Scale size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Comparativas BOFU</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl">
            Winerim vs <span className="text-gradient-wine italic">alternativas</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Comparativas claras y honestas para que puedas decidir qué solución encaja mejor en tu restaurante. Sin ataques vacíos, con datos reales.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comp, i) => (
            <ScrollReveal key={comp.slug} delay={i * 0.06}>
              <Link
                to={`/comparativa/${comp.slug}`}
                className="group flex flex-col bg-gradient-card rounded-2xl border border-border p-6 h-full hover:border-wine/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wine to-wine-light opacity-30 group-hover:opacity-100 transition-opacity" />
                <Scale size={20} className="text-wine mb-3" />
                <h2 className="font-heading text-lg font-bold mb-2 group-hover:text-wine transition-colors">
                  {comp.h1} <span className="italic">{comp.h1Highlight}</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {comp.seoDesc}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-wine group-hover:gap-2 transition-all">
                  Ver comparativa <ArrowRight size={14} />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-3xl mx-auto">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* Next steps: comparativa → solución → CTA */}
      <NextSteps
        title="Siguientes pasos"
        subtitle="De la comparativa a la acción."
        steps={[
          { to: "/software-carta-de-vinos", label: "Descubre Winerim en detalle", description: "Todas las funcionalidades del software de carta de vinos.", type: "solution" },
          { to: "/casos-exito", label: "Casos de éxito reales", description: "Cómo restaurantes reales usan Winerim y qué resultados obtienen.", type: "solution" },
          { to: "/analisis-carta", label: "Analiza tu carta gratis", description: "Sube tu carta y recibe un diagnóstico con recomendaciones.", type: "tool" },
          { to: "/demo", label: "Solicitar demo personalizada", description: "Demo con tu carta real. Sin compromiso.", type: "solution" },
        ]}
      />

      <InternalLinks
        title="Contenido relacionado"
        links={[
          { to: "/funcionalidades", label: "Todas las funcionalidades de Winerim", type: "solution" },
          { to: "/precios", label: "Planes y precios de Winerim", type: "resource" },
          { to: "/herramientas", label: "Herramientas gratuitas de análisis", type: "tool" },
          { to: "/article/mejor-software-carta-vinos-restaurante", label: "Mejor software de carta de vinos 2025", type: "guide" },
          { to: "/benchmarks-playbooks", label: "Benchmarks y playbooks del sector", type: "resource" },
        ]}
      />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                ¿Quieres ver Winerim con <span className="text-gradient-wine italic">tu carta real</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Demo personalizada gratuita. Sin compromiso.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Comparativas;
