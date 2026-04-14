import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Wine, MapPin, Utensils, Palette, Grape } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { getBySlug, categoryMeta, type WineEntry } from "@/data/wineLibrary";

const categoryIcons: Record<WineEntry["category"], typeof Wine> = {
  uva: Grape,
  region: MapPin,
  estilo: Palette,
  maridaje: Utensils,
};

const BibliotecaDetalle = () => {
  const { allLangPaths } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const entry = getBySlug(slug || "");

  useEffect(() => {
    if (!entry) return;

    const schema = document.createElement("script");
    schema.id = "biblio-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.name,
      description: entry.description,
      author: { "@type": "Organization", name: "Winerim" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
    });
    document.head.appendChild(schema);

    const breadcrumb = document.createElement("script");
    breadcrumb.id = "biblio-detail-breadcrumb";
    breadcrumb.type = "application/ld+json";
    breadcrumb.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
        { "@type": "ListItem", position: 2, name: "Biblioteca del vino", item: "https://winerim.wine/biblioteca-vino" },
        { "@type": "ListItem", position: 3, name: entry.name, item: `https://winerim.wine/biblioteca-vino/${entry.slug}` },
      ],
    });
    document.head.appendChild(breadcrumb);

    return () => {
      document.getElementById("biblio-detail-jsonld")?.remove();
      document.getElementById("biblio-detail-breadcrumb")?.remove();
    };
  }, [entry]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <h1 className="font-heading text-3xl font-bold mb-4">Entrada no encontrada</h1>
          <Link to="/biblioteca-vino" className="text-wine hover:underline">← Volver a la Biblioteca del vino</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = categoryIcons[entry.category];
  const meta = categoryMeta[entry.category];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${entry.name} | Biblioteca del Vino – Winerim`}
        description={entry.description}
        url={`https://winerim.wine/biblioteca-vino/${entry.slug}`}
        type="article"
        hreflang={allLangPaths("/biblioteca-vino")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <Link
            to="/biblioteca-vino"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-wine transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Biblioteca del vino
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5 mb-4"
          >
            <Icon size={12} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{meta.title}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            {entry.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {entry.description}
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding pt-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed">{entry.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* CHARACTERISTICS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Características</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {entry.characteristics.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 bg-gradient-card rounded-xl border border-border p-5">
                  <Wine size={16} className="text-wine shrink-0 mt-0.5" />
                  <span className="text-sm">{c}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* AROMAS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">Aromas típicos</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {entry.aromas.map((a) => (
                <span key={a} className="bg-wine/10 text-wine border border-wine/20 px-4 py-2 rounded-full text-sm font-medium">
                  {a}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PAIRINGS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Maridajes recomendados</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {entry.pairings.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-5">
                  <Utensils size={16} className="text-wine shrink-0" />
                  <span className="text-sm">{p}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              {entry.category === "region" ? "Subzonas" : "Regiones de producción"}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {entry.regions.map((r) => (
                <span key={r} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin size={12} className="inline mr-1.5 text-wine" />
                  {r}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Ejemplos destacados</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {entry.examples.map((ex, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-5">
                  <Wine size={16} className="text-wine shrink-0" />
                  <span className="text-sm font-medium">{ex}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                Lleva este conocimiento a tu <span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
                Winerim integra información de uvas, regiones y maridajes directamente en la experiencia del comensal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  Solicitar demo <ArrowRight size={16} />
                </Link>
                <Link
                  to="/biblioteca-vino"
                  className="px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all"
                >
                  Explorar más
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BibliotecaDetalle;
