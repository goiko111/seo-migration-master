import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Wine, AlertTriangle, Users, TrendingUp, Target, Lightbulb, Grape } from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getRegionBySlug, getCountryBySlug } from "@/data/regionsLibrary";

const prestigeLabels: Record<string, string> = {
  "icónico": "Icónico",
  premium: "Premium",
  reconocido: "Reconocido",
  emergente: "Emergente",
  local: "Local",
};

const recognitionLabels: Record<string, string> = {
  "muy-alto": "Muy alto",
  alto: "Alto",
  medio: "Medio",
  bajo: "Bajo",
  nicho: "Nicho",
};

const RegionDetail = () => {
  const { country, region } = useParams<{ country: string; region: string }>();
  const data = region ? getRegionBySlug(region) : undefined;
  const countryData = country ? getCountryBySlug(country) : undefined;

  // JSON-LD Schema
  useEffect(() => {
    if (!data || !countryData) return;
    const schema = document.createElement("script");
    schema.id = "region-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.name,
      description: data.description,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      mainEntityOfPage: `https://winerim.wine/biblioteca-vino/regiones/${country}/${region}`,
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("region-detail-jsonld")?.remove(); };
  }, [data, countryData, country, region]);

  if (!data || !countryData) {
    return <Navigate to={country ? `/biblioteca-vino/regiones/${country}` : "/biblioteca-vino/regiones"} replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        url={`https://winerim.wine/biblioteca-vino/regiones/${country}/${region}`}
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
            { label: "Regiones", href: "/biblioteca-vino/regiones" },
            { label: countryData.name, href: `/biblioteca-vino/regiones/${country}` },
            { label: data.name },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
              <span>{countryData.flag}</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{data.denominationType}</span>
            </span>
            <span className="text-xs bg-wine/10 text-wine px-3 py-1.5 rounded-full">{prestigeLabels[data.prestige]}</span>
            <span className="text-xs bg-secondary/50 px-3 py-1.5 rounded-full">Reconocimiento: {recognitionLabels[data.clientRecognition]}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            {data.name}
          </motion.h1>

          {data.altNames && data.altNames.length > 0 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sm text-muted-foreground mb-4">
              También conocida como: {data.altNames.join(", ")}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
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

      {/* KEY FACTS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Datos clave</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.bodegasCount && (
              <FactCard icon={<Wine size={16} />} label="Bodegas registradas" value={data.bodegasCount.toLocaleString()} />
            )}
            <FactCard icon={<MapPin size={16} />} label="País" value={countryData.name} />
            <FactCard icon={<Target size={16} />} label="Tipo" value={data.denominationType} />
            <FactCard icon={<TrendingUp size={16} />} label="Prestigio" value={prestigeLabels[data.prestige]} />
            <FactCard icon={<Users size={16} />} label="Reconocimiento" value={recognitionLabels[data.clientRecognition]} />
            <FactCard icon={<Grape size={16} />} label="Tipos de vino" value={data.wineTypes.join(", ")} />
          </div>
        </div>
      </section>

      {/* SUBZONES */}
      {data.subzones && data.subzones.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Subzonas</h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3">
                {data.subzones.map((sz) => (
                  <span key={sz} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm font-medium">
                    <MapPin size={12} className="inline mr-1.5 text-wine" />
                    {sz}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* GRAPES & STYLES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <ScrollReveal>
              <h2 className="font-heading text-xl font-semibold mb-4">Uvas principales</h2>
              <div className="flex flex-wrap gap-2">
                {data.mainGrapes.map((g) => (
                  <span key={g} className="bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full text-sm">{g}</span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-xl font-semibold mb-4">Estilos habituales</h2>
              <div className="space-y-2">
                {data.styles.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <Wine size={14} className="text-wine shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WINERIM LAYER — Carta Role & Reading */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb size={18} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Visión Winerim</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Qué comunica en una carta</h2>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal>
              <WinerimBlock title="Lectura en carta" content={data.cartaReading} />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <WinerimBlock title="Cuándo conviene destacarla" content={data.whenToHighlight} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <WinerimBlock title="Qué tipo de cliente la reconoce" content={data.clientProfile} />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <WinerimBlock title="Cómo vende mejor" content={data.sellByStrategy} />
            </ScrollReveal>
          </div>

          {/* Carta roles */}
          <ScrollReveal delay={0.2} className="mt-8">
            <h3 className="font-heading text-lg font-semibold mb-3">Rol habitual en carta</h3>
            <div className="flex flex-wrap gap-3">
              {data.cartaRole.map((role) => (
                <span key={role} className="bg-wine/10 text-wine border border-wine/20 px-4 py-2 rounded-full text-sm font-medium capitalize">
                  {role}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMPETING REGIONS */}
      {data.competingRegions.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-6">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Regiones comparables</h2>
              <p className="text-muted-foreground text-sm mt-2">Denominaciones que compiten en percepción o segmento similar.</p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3">
                {data.competingRegions.map((r) => (
                  <span key={r} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm">{r}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* COMMON MISTAKES */}
      {data.commonMistakes.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle size={18} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Errores comunes de interpretación</h2>
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
      {data.pairings && data.pairings.length > 0 && (
        <section className="section-padding bg-gradient-dark">
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
      <FAQSection faqs={data.faqs} schemaId={`region-${data.slug}`} />

      {/* INTERNAL LINKS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-xl font-semibold">Sigue explorando</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: `/biblioteca-vino/regiones/${country}`, label: `Todas las regiones de ${countryData.name}` },
              { to: "/biblioteca-vino/regiones", label: "Regiones del mundo" },
              { to: "/biblioteca-vino", label: "Biblioteca del Vino" },
              { to: "/producto/winerim-core", label: "Winerim Core" },
              { to: "/demo", label: "Solicitar demo" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group"
              >
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
                Lleva <span className="text-gradient-wine italic">{data.name}</span> a tu carta con criterio
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
                Winerim integra datos de denominaciones, percepción y rol comercial para ayudarte a decidir qué vinos incluir, destacar o rotar.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
              >
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Sub-components ──────────────────────────────────────────────── */
const FactCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-2 mb-2 text-wine">{icon}<span className="text-xs text-muted-foreground">{label}</span></div>
    <p className="font-heading text-sm font-semibold capitalize">{value}</p>
  </div>
);

const WinerimBlock = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-6">
    <h3 className="font-heading text-sm font-semibold text-wine mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
  </div>
);

export default RegionDetail;
