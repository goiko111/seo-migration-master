import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, BarChart3, Utensils, Wine, TrendingUp, DollarSign, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect } from "react";

const tools = [
  {
    to: "/wine-list-analyzer",
    icon: Search,
    title: "Analizador de carta de vinos",
    desc: "Sube tu carta y recibe un análisis detallado con recomendaciones de mejora en estructura, pricing y equilibrio.",
    tag: "Análisis",
  },
  {
    to: "/calculadora-margen-vino",
    icon: Calculator,
    title: "Calculadora de márgenes de vino",
    desc: "Calcula el margen óptimo para cada referencia de tu carta según coste de botella y multiplicador.",
    tag: "Pricing",
  },
  {
    to: "/herramientas/calculadora-precio-vino-por-copa",
    icon: Wine,
    title: "Calculadora de precio por copa",
    desc: "Calcula el precio ideal por copa considerando coste, copas por botella y margen objetivo.",
    tag: "Pricing",
  },
  {
    to: "/wine-pricing-tool",
    icon: DollarSign,
    title: "Herramienta de pricing de vinos",
    desc: "Optimiza la estructura de precios de toda tu carta para maximizar márgenes y percepción de valor.",
    tag: "Pricing",
  },
  {
    to: "/wine-pairing-generator",
    icon: Utensils,
    title: "Generador de maridajes con IA",
    desc: "Genera sugerencias de maridaje personalizadas para los platos de tu carta usando inteligencia artificial.",
    tag: "IA",
  },
  {
    to: "/wine-roi-calculator",
    icon: TrendingUp,
    title: "Calculadora de ROI",
    desc: "Calcula el retorno de inversión de digitalizar tu carta de vinos con Winerim.",
    tag: "ROI",
  },
  {
    to: "/wine-list-benchmark",
    icon: BarChart3,
    title: "Benchmark de cartas de vinos",
    desc: "Compara los indicadores de tu carta con los estándares del sector hostelero.",
    tag: "Benchmark",
  },
];

const Herramientas = () => {
  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "herramientas-collection-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Herramientas gratuitas para la carta de vinos",
      description: "Calculadoras, analizadores y generadores gratuitos para optimizar la carta de vinos de tu restaurante.",
      url: "https://winerim.wine/herramientas",
      publisher: {
        "@type": "Organization",
        name: "Winerim",
        url: "https://winerim.wine",
      },
      hasPart: tools.map((t) => ({
        "@type": "WebApplication",
        name: t.title,
        url: `https://winerim.wine${t.to}`,
        description: t.desc,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      })),
    });
    document.head.appendChild(schema);
    return () => { schema.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title="Herramientas gratuitas para carta de vinos"
        description="Calculadoras, analizadores y generadores gratuitos para optimizar la carta de vinos de tu restaurante. Mejora márgenes, pricing y maridajes."
        url="https://winerim.wine/herramientas"
      />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Herramientas" }]} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
            >
              Herramientas gratuitas
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Optimiza tu carta de vinos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              Calculadoras de márgenes, analizadores de carta, generadores de maridaje y más.
              Todas las herramientas que necesitas para tomar mejores decisiones sobre tu oferta de vinos.
            </motion.p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <ScrollReveal key={tool.to} delay={i * 0.04}>
                  <Link
                    to={tool.to}
                    className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block p-6 h-full hover:shadow-lg hover:shadow-wine/5"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">
                        {tool.tag}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold mb-2 group-hover:text-wine transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                    <span className="mt-4 text-xs font-semibold tracking-widest uppercase text-accent block">
                      Usar herramienta →
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Related content */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-2xl font-bold mb-6">
              Guías relacionadas
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino en un restaurante" },
              { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes" },
              { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta de vinos rentable" },
              { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping para restaurantes" },
            ].map((link) => (
              <ScrollReveal key={link.to}>
                <Link
                  to={link.to}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-wine/50 transition-all"
                >
                  <span className="text-sm font-medium group-hover:text-wine transition-colors">
                    {link.label}
                  </span>
                  <span className="ml-auto text-muted-foreground group-hover:text-wine transition-colors text-xs">→</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                ¿Quieres ir más allá?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Winerim te da todas estas herramientas integradas en una plataforma inteligente para gestionar tu carta de vinos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/analisis-carta"
                  className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  Analizar mi carta gratis
                </Link>
                <Link
                  to="/demo"
                  className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors"
                >
                  Solicitar demo
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Herramientas;
