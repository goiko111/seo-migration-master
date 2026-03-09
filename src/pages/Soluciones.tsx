import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const solutions = [
  {
    to: "/soluciones/grupos-restauracion",
    icon: Building2,
    title: "Winerim para grupos de restauración",
    desc: "Gestión centralizada del vino para grupos con múltiples restaurantes. Control de cartas, precios y stock desde un solo panel.",
  },
  {
    to: "/soluciones/aumentar-ticket-medio-restaurante",
    icon: BarChart3,
    title: "Aumentar el ticket medio",
    desc: "Estrategias basadas en datos para aumentar el gasto medio por cliente usando el vino como palanca de rentabilidad.",
  },
];

const Soluciones = () => {
  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "soluciones-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Soluciones Winerim para restaurantes",
      description: "Soluciones específicas de gestión de carta de vinos para distintos tipos de negocio y objetivos.",
      url: "https://winerim.wine/soluciones",
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
    });
    document.head.appendChild(schema);
    return () => { schema.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title="Soluciones para Restaurantes | Winerim"
        description="Soluciones específicas de gestión de carta de vinos: grupos de restauración, aumento de ticket medio y más."
        url="https://winerim.wine/soluciones"
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Soluciones" }]} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
            >
              Por caso de uso
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Soluciones Winerim
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              Cada restaurante tiene necesidades distintas. Descubre cómo Winerim se adapta a tu tipo de negocio y tus objetivos.
            </motion.p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.to} delay={i * 0.05}>
                  <Link
                    to={item.to}
                    className="group bg-gradient-card rounded-2xl border border-border hover:border-wine/50 transition-all block p-8 h-full hover:shadow-lg hover:shadow-wine/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h2 className="font-heading text-xl font-bold mb-3 group-hover:text-wine transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent">
                      Ver solución <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                  <TrendingUp size={18} className="text-wine" />
                </div>
                <h2 className="font-heading text-xl font-bold mb-2">¿Tu carta de vinos no vende?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Diagnóstico gratuito de los problemas más comunes que frenan las ventas de vino en restaurantes.
                </p>
                <Link
                  to="/problemas/carta-de-vinos-no-vende"
                  className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent hover:text-wine transition-colors"
                >
                  Ver diagnóstico <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <InternalLinks
          title="Contenido relacionado"
          links={[
            { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
            { to: "/inteligencia-artificial-restaurantes", label: "IA para restaurantes", type: "guide" },
            { to: "/wine-roi-calculator", label: "Calculadora de ROI", type: "tool" },
            { to: "/casos-exito", label: "Casos de éxito", type: "guide" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Soluciones;
