import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Utensils, ArrowRight, Wine, Target, Users, Lightbulb,
  AlertTriangle, TrendingUp, ShieldCheck, MapPin, Grape,
  MessageSquare, Palette
} from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import {
  getPairingBySlug,
  categoryMeta,
  pairingEntries,
  type PairingEntry,
} from "@/data/pairingsLibrary";

const PairingDetail = () => {
  const { pairing: pairingSlug } = useParams<{ pairing: string }>();
  const entry = pairingSlug ? getPairingBySlug(pairingSlug) : undefined;

  useEffect(() => {
    if (!entry) return;
    const schema = document.createElement("script");
    schema.id = "pairing-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.name,
      description: entry.seo.description,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      mainEntityOfPage: `https://winerim.wine/biblioteca-vino/maridajes/${entry.slug}`,
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("pairing-detail-jsonld")?.remove(); };
  }, [entry, pairingSlug]);

  if (!entry) return <Navigate to="/biblioteca-vino/maridajes" replace />;

  const meta = categoryMeta[entry.category];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={entry.seo.title} description={entry.seo.description} url={`https://winerim.wine/biblioteca-vino/maridajes/${entry.slug}`} type="article" />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Maridajes", href: "/biblioteca-vino/maridajes" },
            { label: entry.name },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <span className="text-sm">{meta.emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{meta.label}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6"
          >
            {entry.name}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {entry.description}
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding pt-0">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{entry.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Principios clave</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {entry.principles.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3 bg-gradient-card border border-border rounded-xl p-5">
                  <span className="text-wine font-bold text-lg shrink-0">{i + 1}</span>
                  <p className="text-sm leading-relaxed">{p}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DISHES TABLE */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Combinaciones recomendadas</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {entry.dishes.map((dish, i) => (
              <ScrollReveal key={dish.dish} delay={i * 0.04}>
                <div className="bg-gradient-card border border-border rounded-xl p-5 md:p-6">
                  <div className="md:flex md:items-start md:gap-6">
                    <div className="md:w-1/3 mb-3 md:mb-0">
                      <h3 className="font-heading text-base font-semibold text-wine">{dish.dish}</h3>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {dish.wines.map(w => (
                          <span key={w} className="text-xs bg-wine/10 text-wine px-2.5 py-1 rounded-full">{w}</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{dish.notes}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-6">
          <ScrollReveal>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={18} className="text-wine" />
                <h3 className="font-heading text-base font-semibold">Estilos recomendados</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.recommendedStyles.map(s => (
                  <LinkedTag key={s} name={s} hint="style" />
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-wine" />
                <h3 className="font-heading text-base font-semibold">Regiones recomendadas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.recommendedRegions.map(r => (
                  <span key={r} className="text-sm bg-wine/10 text-wine px-3 py-1 rounded-full">{r}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Grape size={18} className="text-wine" />
                <h3 className="font-heading text-base font-semibold">Uvas frecuentes</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.recommendedGrapes.map(g => (
                  <span key={g} className="text-sm bg-wine/10 text-wine px-3 py-1 rounded-full">{g}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Errores frecuentes</h2>
            </div>
            <div className="space-y-3">
              {entry.commonMistakes.map((m, i) => (
                <div key={i} className="flex items-start gap-3 bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                  <span className="text-destructive shrink-0">✗</span>
                  <p className="text-sm">{m}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WINERIM LAYER */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
              <Wine size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Lectura Winerim</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Cómo usar este maridaje en hostelería</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: "Cómo usarlo en carta", text: entry.cartaUsage },
              { icon: MessageSquare, title: "Lenguaje de sala", text: entry.salaLanguage },
              { icon: ShieldCheck, title: "Opciones seguras", text: entry.safeOptions },
              { icon: TrendingUp, title: "Opciones diferenciales", text: entry.differentialOptions },
              { icon: AlertTriangle, title: "Errores del restaurante", text: entry.restaurantMistakes },
              { icon: Lightbulb, title: "Cuándo lo clásico pierde fuerza", text: entry.whenClassicLoses },
            ].map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.06}>
                <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <block.icon size={18} className="text-wine shrink-0" />
                    <h3 className="font-heading text-base font-semibold">{block.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Best concepts */}
          <ScrollReveal className="mt-6">
            <div className="bg-gradient-card border border-border rounded-xl p-6">
              <h3 className="font-heading text-base font-semibold mb-3">Mejor para estos conceptos</h3>
              <div className="flex flex-wrap gap-2">
                {entry.bestConcepts.map(c => (
                  <span key={c} className="text-sm bg-accent/50 px-3 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Related pairings */}
          {entry.relatedPairings.length > 0 && (
            <ScrollReveal className="mt-6">
              <h3 className="font-heading text-lg font-semibold mb-4">Maridajes relacionados</h3>
              <div className="flex flex-wrap gap-3">
                {entry.relatedPairings.map(slug => {
                  const related = pairingEntries.find(e => e.slug === slug || e.id === slug);
                  if (!related) return null;
                  const rMeta = categoryMeta[related.category];
                  return (
                    <Link key={slug} to={`/biblioteca-vino/maridajes/${related.slug}`}
                      className="flex items-center gap-2 bg-gradient-card border border-border rounded-lg px-4 py-2 hover:border-wine/30 transition-all text-sm"
                    >
                      <span>{rMeta.emoji}</span>
                      <span>{related.name}</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* FAQs */}
      {entry.faqs.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal><h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Preguntas frecuentes</h2></ScrollReveal>
            <FAQSection faqs={entry.faqs} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  ¿Quieres que tu carta sugiera <span className="text-gradient-wine italic">maridajes</span> con inteligencia?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  Winerim conecta carta, platos y maridajes para que tu equipo recomiende mejor y tu cliente elija con criterio.
                </p>
                <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  Solicitar demo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PairingDetail;
