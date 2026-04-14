import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Search, ArrowRight, Filter, X, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  styleEntries,
  styleCatalog,
  familyMeta,
  familyOrder,
  type StyleFamily,
  type StyleEntry,
} from "@/data/stylesLibrary";

const faqs = [
  { q: "¿Cuántos estilos de vino existen?", a: "Winerim clasifica el mundo del vino en 8 grandes familias (tinto, blanco, rosado, espumoso, generoso, dulce natural, naranja y ecológico/biodinámico/natural) con más de 50 subtipos y variantes." },
  { q: "¿Por qué importa conocer los estilos para gestionar una carta?", a: "El estilo determina la experiencia del comensal: temperatura, copa, maridaje y expectativas. Una carta bien organizada por estilos ayuda al cliente a elegir y al restaurante a vender mejor." },
  { q: "¿Qué diferencia hay entre vino generoso y dulce natural?", a: "El vino generoso tiene alcohol añadido (fortificado). El dulce natural concentra azúcar por métodos naturales (botrytis, pasificación, congelación) sin añadir alcohol." },
  { q: "¿Qué es un orange wine?", a: "Un vino elaborado con uvas blancas pero fermentado con sus hollejos como un tinto. El resultado es un vino de color ámbar/naranja con taninos y complejidad textural." },
];

const bodyLabels: Record<string, string> = {
  ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto",
};

const familyFilters: { key: StyleFamily | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  ...familyOrder.map(f => ({ key: f, label: familyMeta[f].emoji + " " + familyMeta[f].label })),
];

const StylesHub = () => {
  const { allLangPaths } = useLanguage();
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState<StyleFamily | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = styleEntries;
    if (familyFilter !== "all") results = results.filter(s => s.family === familyFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.mainGrapes.some(g => g.toLowerCase().includes(q)) ||
        s.keyRegions.some(r => r.toLowerCase().includes(q)) ||
        s.subtypes.some(st => st.name.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, familyFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Estilos de Vino: Guía Completa para Hostelería | Winerim"
        description="Guía de estilos de vino: tintos, blancos, rosados, espumosos, generosos, dulces, naranjas y naturales. 8 familias y 50+ subtipos para carta."
        url="https://winerim.wine/biblioteca-vino/estilos"
        hreflang={allLangPaths("/biblioteca-vino/estilos")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Estilos de Vino" },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <Palette size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Estilos</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            Estilos de <span className="text-gradient-wine italic">vino</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4"
          >
            8 grandes familias, más de 50 subtipos. Cada estilo con su elaboración, perfil sensorial, maridajes y lectura comercial para hostelería.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">8 familias</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">50+ subtipos</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">Capa Winerim comercial</span>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar estilo, uva o región…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-wine/30 transition-colors"
            >
              <Filter size={14} />
              Filtros
              {familyFilter !== "all" && (
                <Badge variant="secondary" className="ml-1 bg-wine/10 text-wine">{familyMeta[familyFilter].label}</Badge>
              )}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">Familia de vino</p>
                  {familyFilter !== "all" && (
                    <button onClick={() => setFamilyFilter("all")} className="text-xs text-wine hover:underline flex items-center gap-1">
                      <X size={12} /> Limpiar
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {familyFilters.map(f => (
                    <button
                      key={f.key}
                      onClick={() => setFamilyFilter(f.key)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                        familyFilter === f.key
                          ? "bg-wine text-primary-foreground border-wine"
                          : "border-border hover:border-wine/30"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">{filtered.length} estilo{filtered.length !== 1 ? "s" : ""}</p>
        </div>
      </section>

      {/* FAMILIES */}
      {familyFilter === "all" ? (
        familyOrder.map((fam, fi) => {
          const meta = familyMeta[fam];
          const entries = filtered.filter(s => s.family === fam);
          if (!entries.length) return null;
          return (
            <section key={fam} className={`section-padding ${fi % 2 === 1 ? "bg-gradient-dark" : ""}`}>
              <div className="max-w-7xl mx-auto">
                <ScrollReveal className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{meta.emoji}</span>
                    <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{meta.label}</p>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">{meta.label}</h2>
                  <p className="text-muted-foreground max-w-2xl">{meta.description}</p>
                </ScrollReveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries.map((entry, i) => (
                    <StyleCard key={entry.slug} entry={entry} delay={i * 0.06} />
                  ))}
                </div>
                {/* Subtypes */}
                {entries.flatMap(e => e.subtypes).length > 0 && (
                  <ScrollReveal className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Subtipos y variantes</h3>
                    <div className="flex flex-wrap gap-2">
                      {entries.flatMap(e => e.subtypes).map(sub => (
                        <Link
                          key={sub.slug}
                          to={`/biblioteca-vino/estilos/${sub.slug}`}
                          className="text-xs bg-wine/5 hover:bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </section>
          );
        })
      ) : (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((entry, i) => (
                <StyleCard key={entry.slug} entry={entry} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  ¿Quieres que tu carta refleje esta <span className="text-gradient-wine italic">diversidad</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Winerim organiza tu carta con criterio: estilos, temperaturas, copas y maridajes. Información útil para tu equipo y tus clientes.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                    Solicitar demo <ArrowRight size={16} />
                  </Link>
                  <Link to="/biblioteca-vino" className="inline-flex items-center justify-center gap-2 border border-wine/30 text-wine px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-wine/5 transition-all">
                    Explorar Biblioteca
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
          </ScrollReveal>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Card component ─── */
const StyleCard = ({ entry, delay }: { entry: StyleEntry; delay: number }) => (
  <ScrollReveal delay={delay}>
    <Link
      to={`/biblioteca-vino/estilos/${entry.slug}`}
      className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{familyMeta[entry.family].emoji}</span>
          <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">{entry.name}</h3>
        </div>
        <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.servingTemp}</span>
        <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{bodyLabels[entry.body] || entry.body} cuerpo</span>
        <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.subtypes.length} subtipos</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {entry.mainGrapes.slice(0, 3).map(g => (
          <span key={g} className="text-xs text-muted-foreground">{g}</span>
        ))}
        {entry.mainGrapes.length > 3 && <span className="text-xs text-muted-foreground">+{entry.mainGrapes.length - 3}</span>}
      </div>
    </Link>
  </ScrollReveal>
);

export default StylesHub;
