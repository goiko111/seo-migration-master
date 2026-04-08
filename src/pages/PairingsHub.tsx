import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Utensils, Search, ArrowRight, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  pairingEntries,
  categoryMeta,
  categoryOrder,
  type PairingCategory,
  type PairingEntry,
} from "@/data/pairingsLibrary";

const faqs = [
  { q: "¿Cuántas categorías de maridaje cubre Winerim?", a: "Winerim organiza los maridajes en 10 grandes categorías gastronómicas: carnes rojas, aves y caza, pescados y mariscos, quesos, pasta/arroces/legumbres, verduras, embutidos, postres, cocina asiática y tapas. Cada una con principios, combinaciones y lectura comercial." },
  { q: "¿El maridaje tiene reglas fijas?", a: "No hay reglas absolutas, pero sí principios que funcionan. La intensidad del plato debe equilibrarse con la del vino. La grasa pide acidez o taninos. El picante pide dulzura residual. Las salsas suelen importar más que el ingrediente principal." },
  { q: "¿Por qué importa el maridaje para un restaurante?", a: "Un buen maridaje mejora la experiencia del comensal, facilita la venta de vino, sube el ticket medio y genera percepción de profesionalidad. Es una de las palancas comerciales más directas." },
  { q: "¿Un rosado sirve para todo?", a: "El rosado es uno de los vinos más versátiles para maridaje. Funciona con ensaladas, tapas, cocina mediterránea, asiática y muchos platos ligeros. Es un gran comodín, pero no cubre todo el espectro." },
];

const intensityLabels: Record<string, string> = {
  suave: "Suave", media: "Media", intensa: "Intensa", "muy-intensa": "Muy intensa",
};

const PairingsHub = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PairingCategory | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = pairingEntries;
    if (categoryFilter !== "all") results = results.filter(p => p.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.dishes.some(d => d.dish.toLowerCase().includes(q)) ||
        p.recommendedGrapes.some(g => g.toLowerCase().includes(q)) ||
        p.recommendedRegions.some(r => r.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, categoryFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Maridajes: Guía Completa Vino + Plato para Hostelería | Winerim"
        description="Guía de maridaje: 10 categorías, 80+ combinaciones plato+vino. Principios, errores y lectura comercial para restaurantes y equipos de sala."
        url="https://winerim.wine/biblioteca-vino/maridajes"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Maridajes" },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <Utensils size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Maridajes</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            Guía de <span className="text-gradient-wine italic">maridajes</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4"
          >
            10 categorías gastronómicas, más de 80 combinaciones plato + vino. Cada maridaje con principios, errores frecuentes y lectura comercial para hostelería.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">10 categorías</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">80+ combinaciones</span>
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
              <Input placeholder="Buscar plato, uva o región…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-wine/30 transition-colors"
            >
              <Filter size={14} /> Filtros
              {categoryFilter !== "all" && <Badge variant="secondary" className="ml-1 bg-wine/10 text-wine">{categoryMeta[categoryFilter].label}</Badge>}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">Categoría gastronómica</p>
                  {categoryFilter !== "all" && (
                    <button onClick={() => setCategoryFilter("all")} className="text-xs text-wine hover:underline flex items-center gap-1">
                      <X size={12} /> Limpiar
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCategoryFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${categoryFilter === "all" ? "bg-wine text-primary-foreground border-wine" : "border-border hover:border-wine/30"}`}
                  >Todas</button>
                  {categoryOrder.map(cat => (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${categoryFilter === cat ? "bg-wine text-primary-foreground border-wine" : "border-border hover:border-wine/30"}`}
                    >{categoryMeta[cat].emoji} {categoryMeta[cat].label}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">{filtered.length} categoría{filtered.length !== 1 ? "s" : ""} de maridaje</p>
        </div>
      </section>

      {/* CARDS */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((entry, i) => (
              <PairingCard key={entry.slug} entry={entry} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES SECTION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">Principios universales de maridaje</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Intensidad = Intensidad", desc: "Un plato intenso pide un vino intenso. Un plato delicado, un vino delicado. El equilibrio es la base." },
              { title: "La grasa pide acidez", desc: "La acidez del vino limpia el paladar de grasa. Tintos con buena acidez, blancos frescos o espumosos." },
              { title: "La salsa manda", desc: "En muchos platos, la salsa define el maridaje más que el ingrediente principal." },
              { title: "Dulce ≥ Dulce", desc: "El vino debe ser siempre al menos tan dulce como el postre. Si no, parecerá ácido." },
              { title: "Regional = Regional", desc: "El vino local suele funcionar con la comida local. El terroir compartido crea armonía natural." },
              { title: "Afinidad o contraste", desc: "Dos caminos: que vino y plato compartan sabores (afinidad) o que se equilibren por oposición (contraste)." },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                  <h3 className="font-heading text-base font-semibold mb-2 text-wine">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  ¿Quieres que tu carta sugiera <span className="text-gradient-wine italic">maridajes</span>?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Winerim conecta carta de vinos con platos y maridajes, ayudando a tu equipo a recomendar mejor y a tus clientes a elegir con criterio.
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
          <ScrollReveal><h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">Preguntas frecuentes</h2></ScrollReveal>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PairingCard = ({ entry, delay }: { entry: PairingEntry; delay: number }) => {
  const meta = categoryMeta[entry.category];
  return (
    <ScrollReveal delay={delay}>
      <Link
        to={`/biblioteca-vino/maridajes/${entry.slug}`}
        className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{meta.emoji}</span>
            <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">{entry.name}</h3>
          </div>
          <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.dishes.length} platos</span>
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{intensityLabels[entry.intensity]}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entry.recommendedGrapes.slice(0, 3).map(g => (
            <span key={g} className="text-xs text-muted-foreground">{g}</span>
          ))}
          {entry.recommendedGrapes.length > 3 && <span className="text-xs text-muted-foreground">+{entry.recommendedGrapes.length - 3}</span>}
        </div>
      </Link>
    </ScrollReveal>
  );
};

export default PairingsHub;
