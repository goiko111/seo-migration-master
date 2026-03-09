import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const problems = [
  {
    to: "/problemas/carta-de-vinos-no-vende",
    icon: TrendingDown,
    title: "Mi carta de vinos no vende",
    desc: "Las ventas de vino están estancadas, los clientes piden siempre lo más barato o directamente no piden vino. Diagnóstico y solución.",
  },
];

const Problemas = () => {
  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "problemas-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Problemas comunes con la carta de vinos",
      description: "Diagnóstico y solución a los problemas más frecuentes con la carta de vinos en restaurantes.",
      url: "https://winerim.wine/problemas",
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
    });
    document.head.appendChild(schema);
    return () => { schema.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title="Problemas con la Carta de Vinos | Diagnóstico y Solución"
        description="¿Tu carta de vinos no funciona? Diagnóstico de los problemas más comunes y soluciones prácticas para restaurantes."
        url="https://winerim.wine/problemas"
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Problemas" }]} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
            >
              Diagnóstico
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Problemas con la carta de vinos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              Los problemas más frecuentes que afectan a las ventas de vino en restaurantes, con diagnóstico y soluciones prácticas.
            </motion.p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.to} delay={i * 0.05}>
                  <Link
                    to={item.to}
                    className="group bg-gradient-card rounded-2xl border border-border hover:border-wine/50 transition-all block p-8 h-full hover:shadow-lg hover:shadow-wine/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                      <Icon size={22} className="text-destructive" />
                    </div>
                    <h2 className="font-heading text-xl font-bold mb-3 group-hover:text-wine transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase text-accent">
                      Ver diagnóstico <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-10">
              <AlertTriangle size={28} className="text-wine mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold mb-3">¿No encuentras tu problema?</h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                Analiza tu carta de vinos gratis y recibe un diagnóstico personalizado con recomendaciones de mejora.
              </p>
              <Link
                to="/analisis-carta"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
              >
                Analizar mi carta gratis <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <InternalLinks
          title="Contenido relacionado"
          links={[
            { to: "/como-vender-mas-vino-en-un-restaurante", label: "Cómo vender más vino", type: "guide" },
            { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta", type: "guide" },
            { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
            { to: "/soluciones/aumentar-ticket-medio-restaurante", label: "Aumentar ticket medio", type: "solution" },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Problemas;
