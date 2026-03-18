import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Grape, Search, ArrowRight, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  grapeCatalog,
  grapeEntries,
  hasFullEntry,
  colorLabels,
  type GrapeColor,
  type GrapeCatalogEntry,
} from "@/data/grapesLibrary";

const faqs = [
  { q: "¿Cuántas variedades de uva cubre Winerim?", a: "El catálogo de Winerim incluye más de 85 variedades de uva de más de 30 países, con información sobre sinonimias, regiones clave y notas de cata." },
  { q: "¿Por qué importa conocer las uvas para gestionar una carta?", a: "La variedad de uva es uno de los principales ejes de decisión del comensal. Entender qué comunica cada uva, cómo se percibe y con qué se marida permite diseñar cartas más efectivas y vender mejor." },
  { q: "¿Qué es una variedad internacional vs. una local?", a: "Las variedades internacionales (Cabernet Sauvignon, Chardonnay, Sauvignon Blanc) se cultivan globalmente y tienen alto reconocimiento. Las locales (Mencía, Godello, Nerello Mascalese) son exclusivas de zonas concretas y aportan diferenciación." },
  { q: "¿Qué son los sinónimos de una uva?", a: "Muchas variedades reciben diferentes nombres según el país o región. Tempranillo es Tinto Fino en Ribera del Duero, Cencibel en La Mancha y Tinta Roriz en Portugal. Son la misma uva." },
];

const colorFilters: { key: GrapeColor | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "tinta", label: "🍷 Tintas" },
  { key: "blanca", label: "🥂 Blancas" },
];

const countryOptions = [...new Set(grapeCatalog.flatMap((g) => g.countries))].sort();

const GrapesHub = () => {
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState<GrapeColor | "all">("all");
  const [countryFilter, setCountryFilter] = useState<string>("");

  const filtered = useMemo(() => {
    let results = grapeCatalog;
    if (colorFilter !== "all") {
      results = results.filter((g) => g.color === colorFilter);
    }
    if (countryFilter) {
      results = results.filter((g) => g.countries.includes(countryFilter));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.synonyms.some((s) => s.toLowerCase().includes(q)) ||
          g.keyRegions.some((r) => r.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, colorFilter, countryFilter]);

  const tintas = grapeCatalog.filter((g) => g.color === "tinta").length;
  const blancas = grapeCatalog.filter((g) => g.color === "blanca").length;
  const uniqueCountries = [...new Set(grapeCatalog.flatMap((g) => g.countries))].length;

  const featured = grapeEntries.filter((g) => g.clientRecognition === "muy-alto" || g.clientRecognition === "alto");
  const differential = grapeEntries.filter((g) => g.scope === "diferencial" || g.cartaRole.includes("descubrimiento"));

  // Slugs already shown in featured/differential to avoid duplicates
  const shownSlugs = useMemo(() => {
    const slugs = new Set<string>();
    featured.forEach((g) => slugs.add(g.slug));
    differential.forEach((g) => slugs.add(g.slug));
    return slugs;
  }, [featured, differential]);

  const hasActiveFilters = colorFilter !== "all" || !!countryFilter || !!search.trim();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Variedades de Uva | Guía Completa para Hostelería"
        description="Guía completa de 87 variedades de uva para hostelería. Perfil sensorial, rol en carta, criterio comercial y maridajes. Con enfoque Winerim."
        url="https://winerim.wine/biblioteca-vino/uvas"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Variedades de uva" },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <Grape size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              {grapeCatalog.length} variedades · {uniqueCountries} países
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            Variedades de <span className="text-gradient-wine italic">uva</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            {tintas} tintas, {blancas} blancas: cada variedad con su perfil sensorial, su rol comercial en carta y su lectura Winerim para hostelería.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: "Variedades", value: String(grapeCatalog.length) },
              { label: "Tintas", value: String(tintas) },
              { label: "Blancas", value: String(blancas) },
              { label: "Países", value: "30" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-card rounded-xl border border-border p-4 text-center">
                <p className="font-heading text-2xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar variedad, sinónimo o región…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gradient-card border-border"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Filter size={14} className="text-muted-foreground" />
              </div>
              {colorFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setColorFilter(f.key)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    colorFilter === f.key
                      ? "bg-wine/10 border-wine/30 text-wine font-medium"
                      : "border-border text-muted-foreground hover:border-wine/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}

              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-foreground"
              >
                <option value="">Todos los países</option>
                {countryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={() => { setSearch(""); setColorFilter("all"); setCountryFilter(""); }}
                  className="text-xs text-muted-foreground hover:text-wine flex items-center gap-1 transition-colors"
                >
                  <X size={12} /> Limpiar
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED GRAPES */}
      {!hasActiveFilters && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Variedades más reconocidas
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Las variedades que todo profesional de hostelería debería dominar.
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((grape, i) => (
                <ScrollReveal key={grape.slug} delay={i * 0.05}>
                  <GrapeCard grape={grape} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DIFFERENTIAL GRAPES */}
      {!hasActiveFilters && differential.length > 0 && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Variedades diferenciales
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Variedades que aportan criterio, descubrimiento y sofisticación a una carta.
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {differential.map((grape, i) => (
                <ScrollReveal key={grape.slug} delay={i * 0.05}>
                  <GrapeCard grape={grape} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ALL GRAPES GRID */}
      <section className={`section-padding ${!hasActiveFilters ? "bg-gradient-dark" : ""}`}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              {hasActiveFilters ? `${filtered.length} variedades encontradas` : "Todas las variedades"}
            </h2>
          </ScrollReveal>

          {/* Group by color when no filters active */}
          {!hasActiveFilters ? (
            (["tinta", "blanca", "rosada"] as GrapeColor[]).map((color) => {
              const grapes = filtered.filter((g) => g.color === color);
              if (grapes.length === 0) return null;
              return (
                <div key={color} className="mb-12 last:mb-0">
                  <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                    <span>{colorLabels[color].emoji}</span> {colorLabels[color].label}
                    <span className="text-sm text-muted-foreground font-normal">({grapes.length})</span>
                  </h3>
                  <CatalogGrid grapes={grapes} />
                </div>
              );
            })
          ) : (
            <CatalogGrid grapes={filtered} />
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No se encontraron variedades que coincidan con los filtros.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} schemaId="grapes-hub" />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Lleva este conocimiento a tu{" "}
                <span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Winerim integra información de variedades, percepción comercial y maridajes directamente en tu herramienta de gestión de carta.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
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

const GrapeCard = ({ grape }: { grape: { slug: string; name: string; description: string; color: GrapeColor; cartaRole: string[]; countries: string[] } }) => (
  <Link
    to={`/biblioteca-vino/uvas/${grape.slug}`}
    className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm">{colorLabels[grape.color].emoji}</span>
      <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
    </div>
    <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors mb-2">{grape.name}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{grape.description}</p>
    <div className="flex flex-wrap gap-1.5">
      {grape.cartaRole.slice(0, 3).map((role) => (
        <span key={role} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md capitalize">{role}</span>
      ))}
    </div>
  </Link>
);

const CatalogGrid = ({ grapes }: { grapes: GrapeCatalogEntry[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {grapes.map((grape) => {
      const isFull = hasFullEntry(grape.slug);
      return (
        <Link
          key={grape.slug}
          to={`/biblioteca-vino/uvas/${grape.slug}`}
          className="group flex flex-col bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{colorLabels[grape.color].emoji}</span>
              <h4 className="font-heading text-sm font-semibold group-hover:text-wine transition-colors">{grape.name}</h4>
            </div>
            <ArrowRight size={12} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          {grape.synonyms.length > 0 && (
            <p className="text-xs text-muted-foreground/70 italic mb-2 line-clamp-1">{grape.synonyms.join(", ")}</p>
          )}
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{grape.tastingNotes}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {grape.keyRegions.slice(0, 2).map((r) => (
              <span key={r} className="text-[10px] bg-wine/8 text-wine px-1.5 py-0.5 rounded">{r}</span>
            ))}
            {isFull && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-wine/20 text-wine ml-auto">Guía</Badge>
            )}
          </div>
        </Link>
      );
    })}
  </div>
);

export default GrapesHub;
