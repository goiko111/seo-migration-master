import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ArrowLeft, Wine, Star, Sparkles, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getCountryBySlug, getRegionsByCountry, type RegionEntry } from "@/data/regionsLibrary";

const RegionCountry = () => {
  const { allLangPaths } = useLanguage();
  const { country } = useParams<{ country: string }>();
  const data = country ? getCountryBySlug(country) : undefined;
  const regions = country ? getRegionsByCountry(country) : [];

  if (!data) return <Navigate to="/biblioteca-vino/regiones" replace />;

  const topRegions = regions.filter((r) => data.topRegions.includes(r.slug));
  const differentialRegions = regions.filter((r) => data.differentialRegions.includes(r.slug));
  const otherRegions = regions.filter(
    (r) => !data.topRegions.includes(r.slug) && !data.differentialRegions.includes(r.slug)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        url={`https://winerim.wine/biblioteca-vino/regiones/${data.slug}`}
        hreflang={allLangPaths("/biblioteca-vino/regiones")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Regiones", href: "/biblioteca-vino/regiones" },
            { label: data.name },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <span className="text-lg">{data.flag}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              {data.denominationsCount} denominaciones · {data.bodegasCount.toLocaleString()} bodegas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            Regiones vinícolas de{" "}
            <span className="text-gradient-wine italic">{data.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            {data.intro}
          </motion.p>
        </div>
      </section>

      {/* CLASSIFICATION */}
      <section className="section-padding pt-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={18} className="text-wine" />
                <h2 className="font-heading text-xl font-semibold">Sistema de clasificación</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">{data.classificationExplainer}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.denominationTypes.split(", ").map((t) => (
                  <span key={t} className="text-xs bg-wine/10 text-wine px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TOP REGIONS */}
      {topRegions.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <Star size={18} className="text-wine" />
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Referencia</p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Regiones más reconocidas
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Las denominaciones que todo profesional de hostelería debería conocer.
              </p>
            </ScrollReveal>
            <RegionGrid regions={topRegions} country={data.slug} />
          </div>
        </section>
      )}

      {/* DIFFERENTIAL REGIONS */}
      {differentialRegions.length > 0 && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={18} className="text-wine" />
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Diferencial</p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Regiones diferenciales
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Denominaciones que aportan criterio, tendencia y descubrimiento a una carta.
              </p>
            </ScrollReveal>
            <RegionGrid regions={differentialRegions} country={data.slug} />
          </div>
        </section>
      )}

      {/* OTHER REGIONS */}
      {otherRegions.length > 0 && (
        <section className={`section-padding ${differentialRegions.length > 0 ? "bg-gradient-dark" : ""}`}>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Todas las regiones</h2>
            </ScrollReveal>
            <RegionGrid regions={otherRegions} country={data.slug} />
          </div>
        </section>
      )}

      {/* HOW TO READ */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Wine size={18} className="text-wine" />
                <h2 className="font-heading text-xl font-semibold">
                  Cómo leer {data.name} en una carta
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{data.howToReadInCarta}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ZONES LIST (when no detail regions exist) */}
      {regions.length === 0 && data.mainZones.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">Principales zonas vinícolas</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.mainZones.map((zone) => (
                <div key={zone} className="bg-gradient-card rounded-xl border border-border p-5 flex items-center gap-3">
                  <MapPin size={16} className="text-wine shrink-0" />
                  <span className="text-sm font-medium capitalize">{zone.replace(/-/g, " ")}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={data.faqs} schemaId={`country-${data.slug}`} />

      {/* INTERNAL LINKS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <h2 className="font-heading text-xl font-semibold">Explora más</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: "/biblioteca-vino/regiones", label: "Todas las regiones del mundo" },
              { to: "/biblioteca-vino", label: "Biblioteca del Vino completa" },
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
                Gestiona tu carta con{" "}
                <span className="text-gradient-wine italic">inteligencia regional</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
                Winerim integra datos de {data.denominationsCount} denominaciones de {data.name} para ayudarte a tomar mejores decisiones de carta.
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

/* ─── Sub-component: Region Card Grid ─────────────────────────────── */
const RegionGrid = ({ regions, country }: { regions: RegionEntry[]; country: string }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {regions.map((region, i) => (
      <ScrollReveal key={region.slug} delay={i * 0.05}>
        <Link
          to={`/biblioteca-vino/regiones/${country}/${region.slug}`}
          className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs bg-wine/10 text-wine px-2 py-0.5 rounded-md">{region.denominationType}</span>
            <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors mb-2">
            {region.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
            {region.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {region.cartaRole.map((role) => (
              <span key={role} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md capitalize">{role}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {region.bodegasCount && <span>{region.bodegasCount.toLocaleString()} bodegas</span>}
            <span>{region.mainGrapes.slice(0, 2).join(", ")}</span>
          </div>
        </Link>
      </ScrollReveal>
    ))}
  </div>
);

export default RegionCountry;
