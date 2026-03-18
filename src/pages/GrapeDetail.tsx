import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Grape, ArrowRight, Wine, AlertTriangle, Users, TrendingUp, Target, Lightbulb, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import {
  getGrapeBySlug,
  getCatalogEntry,
  hasFullEntry,
  colorLabels,
} from "@/data/grapesLibrary";

const levelLabels: Record<string, string> = {
  baja: "Baja", media: "Media", alta: "Alta", "muy-alta": "Muy alta",
  ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto",
  sutil: "Sutil",
  "muy-alto": "Muy alto",
  fácil: "Fácil", difícil: "Difícil", "muy-difícil": "Muy difícil",
  internacional: "Internacional", nacional: "Nacional", local: "Local", diferencial: "Diferencial",
};

const GrapeDetail = () => {
  const { grape: grapeSlug } = useParams<{ grape: string }>();
  const fullEntry = grapeSlug ? getGrapeBySlug(grapeSlug) : undefined;
  const catalogEntry = grapeSlug ? getCatalogEntry(grapeSlug) : undefined;

  // JSON-LD
  useEffect(() => {
    const entry = fullEntry || catalogEntry;
    if (!entry) return;
    const schema = document.createElement("script");
    schema.id = "grape-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.name,
      description: fullEntry?.description || entry.tastingNotes,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      mainEntityOfPage: `https://winerim.wine/biblioteca-vino/uvas/${entry.slug}`,
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("grape-detail-jsonld")?.remove(); };
  }, [fullEntry, catalogEntry, grapeSlug]);

  if (!fullEntry && !catalogEntry) {
    return <Navigate to="/biblioteca-vino/uvas" replace />;
  }

  // Render full entry if available, otherwise a simplified catalog view
  if (fullEntry) return <FullGrapeDetail data={fullEntry} />;
  return <CatalogGrapeDetail data={catalogEntry!} />;
};

/* ═══════════════════════════════════════════════════════════════════════
   FULL DETAIL — Complete Winerim layer
   ═══════════════════════════════════════════════════════════════════════ */
const FullGrapeDetail = ({ data }: { data: NonNullable<ReturnType<typeof getGrapeBySlug>> }) => (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={data.seo.title}
      description={data.seo.description}
      url={`https://winerim.wine/biblioteca-vino/uvas/${data.slug}`}
      type="article"
    />
    <Navbar />

    {/* HERO */}
    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
          { label: "Variedades", href: "/biblioteca-vino/uvas" },
          { label: data.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
            <span>{colorLabels[data.color].emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{colorLabels[data.color].label}</span>
          </span>
          <span className="text-xs bg-wine/10 text-wine px-3 py-1.5 rounded-full capitalize">{levelLabels[data.scope] || data.scope}</span>
          <span className="text-xs bg-secondary/50 px-3 py-1.5 rounded-full">Reconocimiento: {levelLabels[data.clientRecognition] || data.clientRecognition}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          {data.name}
        </motion.h1>

        {data.synonyms.length > 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mb-4">
            También conocida como: <span className="italic">{data.synonyms.join(", ")}</span>
          </motion.p>
        )}

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {data.description}
        </motion.p>
      </div>
    </section>

    {/* INTRO */}
    <section className="section-padding pt-8">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-muted-foreground text-lg leading-relaxed">{data.intro}</p>
        </ScrollReveal>
      </div>
    </section>

    {/* SENSORY PROFILE */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Perfil sensorial</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <FactCard icon={<Wine size={16} />} label="Acidez" value={levelLabels[data.acidity]} />
          <FactCard icon={<Target size={16} />} label="Cuerpo" value={levelLabels[data.body]} />
          <FactCard icon={<Grape size={16} />} label="Intensidad aromática" value={levelLabels[data.aromaticIntensity]} />
          <FactCard icon={<TrendingUp size={16} />} label="Reconocimiento" value={levelLabels[data.clientRecognition]} />
          <FactCard icon={<Users size={16} />} label="Dificultad comercial" value={levelLabels[data.commercialDifficulty]} />
          <FactCard icon={<MapPin size={16} />} label="Alcance" value={levelLabels[data.scope]} />
        </div>

        <ScrollReveal>
          <h3 className="font-heading text-lg font-semibold mb-4">Aromas característicos</h3>
          <div className="flex flex-wrap gap-2">
            {data.aromas.map((a) => (
              <span key={a} className="bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full text-sm">{a}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* REGIONS & COUNTRIES */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-semibold mb-4">Países</h2>
            <div className="flex flex-wrap gap-2">
              {data.countries.map((c) => (
                <span key={c} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-xl font-semibold mb-4">Regiones clave</h2>
            <div className="flex flex-wrap gap-2">
              {data.keyRegions.map((r) => (
                <span key={r} className="bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full text-sm">{r}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* WINERIM LAYER */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb size={18} className="text-wine" />
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Visión Winerim</p>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Cómo se percibe en carta</h2>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal><WinerimBlock title="Percepción en carta" content={data.cartaPerception} /></ScrollReveal>
          <ScrollReveal delay={0.05}><WinerimBlock title="Cuándo ayuda a vender" content={data.whenItHelps} /></ScrollReveal>
          <ScrollReveal delay={0.1}><WinerimBlock title="Qué tipo de cliente la reconoce" content={data.clientProfile} /></ScrollReveal>
          <ScrollReveal delay={0.15}><WinerimBlock title="Cómo vende mejor" content={data.sellByStrategy} /></ScrollReveal>
          <ScrollReveal delay={0.2}><WinerimBlock title="Cuándo escribir la uva en grande" content={data.whenToWriteBig} /></ScrollReveal>
        </div>

        <ScrollReveal delay={0.25} className="mt-8">
          <h3 className="font-heading text-lg font-semibold mb-3">Rol habitual en carta</h3>
          <div className="flex flex-wrap gap-3">
            {data.cartaRole.map((role) => (
              <span key={role} className="bg-wine/10 text-wine border border-wine/20 px-4 py-2 rounded-full text-sm font-medium capitalize">{role}</span>
            ))}
          </div>
        </ScrollReveal>

        {data.bestRegionsForSales.length > 0 && (
          <ScrollReveal delay={0.3} className="mt-8">
            <h3 className="font-heading text-lg font-semibold mb-3">Regiones donde más vende</h3>
            <div className="flex flex-wrap gap-2">
              {data.bestRegionsForSales.map((r) => (
                <span key={r} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{r}</span>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>

    {/* COMPETING VARIETIES */}
    {data.competingVarieties.length > 0 && (
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Variedades que compiten</h2>
            <p className="text-muted-foreground text-sm mt-2">Variedades que ocupan un espacio similar en carta o percepción.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {data.competingVarieties.map((v) => {
                const hasFull = hasFullEntry(v);
                return hasFull ? (
                  <Link key={v} to={`/biblioteca-vino/uvas/${v}`}
                    className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm hover:border-wine/30 hover:text-wine transition-all capitalize">
                    {v.replace(/-/g, " ")}
                  </Link>
                ) : (
                  <span key={v} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm capitalize">{v.replace(/-/g, " ")}</span>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    )}

    {/* COMMON MISTAKES */}
    {data.commonMistakes.length > 0 && (
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Errores comunes</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {data.commonMistakes.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-wine shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{m}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* PAIRINGS */}
    {data.pairings.length > 0 && (
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Maridajes sugeridos</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.pairings.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-5">
                  <Wine size={16} className="text-wine shrink-0" />
                  <span className="text-sm">{p}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* FAQ */}
    <FAQSection faqs={data.faqs} schemaId={`grape-${data.slug}`} />

    {/* INTERNAL LINKS */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-8">
          <h2 className="font-heading text-xl font-semibold">Sigue explorando</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { to: "/biblioteca-vino/uvas", label: "Todas las variedades" },
            { to: "/biblioteca-vino/regiones", label: "Regiones vinícolas" },
            { to: "/biblioteca-vino", label: "Biblioteca del Vino" },
            { to: "/producto/winerim-core", label: "Winerim Core" },
            { to: "/demo", label: "Solicitar demo" },
          ].map((link) => (
            <Link key={link.to} to={link.to}
              className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group">
              <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              Lleva <span className="text-gradient-wine italic">{data.name}</span> a tu carta con criterio
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
              Winerim integra datos de variedades, percepción y rol comercial para ayudarte a decidir qué vinos incluir, destacar o rotar.
            </p>
            <Link to="/demo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
              Solicitar demo <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   CATALOG DETAIL — Simplified view for grapes without full Winerim layer
   ═══════════════════════════════════════════════════════════════════════ */
const CatalogGrapeDetail = ({ data }: { data: NonNullable<ReturnType<typeof getCatalogEntry>> }) => (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={`${data.name}: Variedad de uva | Biblioteca Winerim`}
      description={`${data.name}: ${data.tastingNotes} Regiones: ${data.keyRegions.join(", ")}. Guía Winerim.`}
      url={`https://winerim.wine/biblioteca-vino/uvas/${data.slug}`}
    />
    <Navbar />

    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
          { label: "Variedades", href: "/biblioteca-vino/uvas" },
          { label: data.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
            <span>{colorLabels[data.color].emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{colorLabels[data.color].label}</span>
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          {data.name}
        </motion.h1>

        {data.synonyms.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            También conocida como: <span className="italic">{data.synonyms.join(", ")}</span>
          </p>
        )}

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{data.tastingNotes}</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">Países</h2>
            <div className="flex flex-wrap gap-2">
              {data.countries.map((c) => (
                <span key={c} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">Regiones clave</h2>
            <div className="flex flex-wrap gap-2">
              {data.keyRegions.map((r) => (
                <span key={r} className="bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full text-sm">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* INTERNAL LINKS */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-xl font-semibold mb-6">Sigue explorando</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { to: "/biblioteca-vino/uvas", label: "Todas las variedades" },
            { to: "/biblioteca-vino/regiones", label: "Regiones vinícolas" },
            { to: "/biblioteca-vino", label: "Biblioteca del Vino" },
            { to: "/demo", label: "Solicitar demo" },
          ].map((link) => (
            <Link key={link.to} to={link.to}
              className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group">
              <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

/* ─── Sub-components ──────────────────────────────────────────────── */
const FactCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-2 mb-2 text-wine">{icon}<span className="text-xs text-muted-foreground">{label}</span></div>
    <p className="font-heading text-sm font-semibold">{value}</p>
  </div>
);

const WinerimBlock = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-6">
    <h3 className="font-heading text-sm font-semibold text-wine mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
  </div>
);

export default GrapeDetail;
