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
  categoryOrder,
  type PairingCategory,
  type PairingEntry,
} from "@/data/pairingsLibrary";
import {
  getLocalizedCategoryMeta,
  getLocalizedPairingEntries,
} from "@/data/pairingsLibraryI18n";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl, normalizeWineSearch } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const faqs = [
  { q: "¿Cuántas categorías de maridaje cubre Winerim?", a: "Winerim organiza los maridajes en 10 grandes categorías gastronómicas: carnes rojas, aves y caza, pescados y mariscos, quesos, pasta/arroces/legumbres, verduras, embutidos, postres, cocina asiática y tapas. Cada una con principios, combinaciones y lectura comercial." },
  { q: "¿El maridaje tiene reglas fijas?", a: "No hay reglas absolutas, pero sí principios que funcionan. La intensidad del plato debe equilibrarse con la del vino. La grasa pide acidez o taninos. El picante pide dulzura residual. Las salsas suelen importar más que el ingrediente principal." },
  { q: "¿Por qué importa el maridaje para un restaurante?", a: "Un buen maridaje mejora la experiencia del comensal, facilita la venta de vino, sube el ticket medio y genera percepción de profesionalidad. Es una de las palancas comerciales más directas." },
  { q: "¿Un rosado sirve para todo?", a: "El rosado es uno de los vinos más versátiles para maridaje. Funciona con ensaladas, tapas, cocina mediterránea, asiática y muchos platos ligeros. Es un gran comodín, pero no cubre todo el espectro." },
];

const pairingHubLabels: Record<string, {
  all: string;
  dishes: string;
  intensity: Record<string, string>;
  principles: { title: string; desc: string }[];
}> = {
  es: {
    all: "Todas",
    dishes: "platos",
    intensity: { suave: "Suave", media: "Media", intensa: "Intensa", "muy-intensa": "Muy intensa" },
    principles: [
      { title: "Intensidad = Intensidad", desc: "Un plato intenso pide un vino intenso. Un plato delicado, un vino delicado. El equilibrio es la base." },
      { title: "La grasa pide acidez", desc: "La acidez del vino limpia el paladar de grasa. Tintos con buena acidez, blancos frescos o espumosos." },
      { title: "La salsa manda", desc: "En muchos platos, la salsa define el maridaje más que el ingrediente principal." },
      { title: "Dulce >= Dulce", desc: "El vino debe ser siempre al menos tan dulce como el postre. Si no, parecerá ácido." },
      { title: "Regional = Regional", desc: "El vino local suele funcionar con la comida local. El terroir compartido crea armonía natural." },
      { title: "Afinidad o contraste", desc: "Dos caminos: que vino y plato compartan sabores o que se equilibren por oposición." },
    ],
  },
  en: {
    all: "All",
    dishes: "dishes",
    intensity: { suave: "Light", media: "Medium", intensa: "Intense", "muy-intensa": "Very intense" },
    principles: [
      { title: "Intensity = Intensity", desc: "An intense dish needs an intense wine. A delicate dish needs a delicate wine. Balance is the base." },
      { title: "Fat needs acidity", desc: "Acidity refreshes the palate. Fresh reds, bright whites and sparkling wines work well." },
      { title: "Sauce leads", desc: "In many dishes, the sauce matters more than the main ingredient." },
      { title: "Sweet >= Sweet", desc: "The wine should be at least as sweet as the dessert, otherwise it will feel acidic." },
      { title: "Regional = Regional", desc: "Local wine often works with local food. Shared terroir creates natural harmony." },
      { title: "Affinity or contrast", desc: "Two paths: matching shared flavours or balancing by opposition." },
    ],
  },
  it: {
    all: "Tutte",
    dishes: "piatti",
    intensity: { suave: "Delicata", media: "Media", intensa: "Intensa", "muy-intensa": "Molto intensa" },
    principles: [
      { title: "Intensità = Intensità", desc: "Un piatto intenso richiede un vino intenso. Un piatto delicato, un vino delicato. L'equilibrio è la base." },
      { title: "Il grasso vuole acidità", desc: "L'acidità del vino pulisce il palato dal grasso. Rossi freschi, bianchi vivaci o spumanti." },
      { title: "La salsa comanda", desc: "In molti piatti è la salsa a definire l'abbinamento più dell'ingrediente principale." },
      { title: "Dolce >= Dolce", desc: "Il vino deve essere almeno dolce quanto il dessert, altrimenti sembrerà acido." },
      { title: "Regionale = Regionale", desc: "Il vino locale funziona spesso con la cucina locale. Il terroir condiviso crea armonia naturale." },
      { title: "Affinità o contrasto", desc: "Due strade: condividere sapori o equilibrarsi per opposizione." },
    ],
  },
  fr: {
    all: "Toutes",
    dishes: "plats",
    intensity: { suave: "Douce", media: "Moyenne", intensa: "Intense", "muy-intensa": "Très intense" },
    principles: [
      { title: "Intensité = Intensité", desc: "Un plat intense appelle un vin intense. Un plat délicat, un vin délicat. L'équilibre est la base." },
      { title: "Le gras appelle l'acidité", desc: "L'acidité du vin nettoie le palais. Rouges frais, blancs vifs ou effervescents." },
      { title: "La sauce décide", desc: "Dans beaucoup de plats, la sauce compte davantage que l'ingrédient principal." },
      { title: "Sucré >= Sucré", desc: "Le vin doit être au moins aussi sucré que le dessert, sinon il paraîtra acide." },
      { title: "Régional = Régional", desc: "Le vin local fonctionne souvent avec la cuisine locale. Le terroir partagé crée l'harmonie." },
      { title: "Affinité ou contraste", desc: "Deux voies: partager des saveurs ou s'équilibrer par opposition." },
    ],
  },
  de: {
    all: "Alle",
    dishes: "Gerichte",
    intensity: { suave: "Leicht", media: "Mittel", intensa: "Intensiv", "muy-intensa": "Sehr intensiv" },
    principles: [
      { title: "Intensität = Intensität", desc: "Ein intensives Gericht braucht einen intensiven Wein. Ein feines Gericht braucht einen feinen Wein. Balance ist die Basis." },
      { title: "Fett braucht Säure", desc: "Säure frischt den Gaumen auf. Frische Rote, lebendige Weiße und Schaumweine funktionieren gut." },
      { title: "Die Sauce führt", desc: "Bei vielen Gerichten entscheidet die Sauce stärker über das Pairing als die Hauptzutat." },
      { title: "Süße >= Süße", desc: "Der Wein sollte mindestens so süß sein wie das Dessert, sonst wirkt er sauer." },
      { title: "Regional = Regional", desc: "Lokaler Wein passt oft zu lokaler Küche. Gemeinsames Terroir schafft natürliche Harmonie." },
      { title: "Affinität oder Kontrast", desc: "Zwei Wege: gemeinsame Aromen aufnehmen oder durch Gegensatz ausbalancieren." },
    ],
  },
  pt: {
    all: "Todas",
    dishes: "pratos",
    intensity: { suave: "Leve", media: "Média", intensa: "Intensa", "muy-intensa": "Muito intensa" },
    principles: [
      { title: "Intensidade = Intensidade", desc: "Um prato intenso pede um vinho intenso. Um prato delicado pede um vinho delicado. O equilíbrio é a base." },
      { title: "A gordura pede acidez", desc: "A acidez refresca o palato. Tintos frescos, brancos vivos e espumantes funcionam bem." },
      { title: "O molho lidera", desc: "Em muitos pratos, o molho pesa mais na harmonização do que o ingrediente principal." },
      { title: "Doce >= Doce", desc: "O vinho deve ser pelo menos tão doce como a sobremesa, caso contrário parecerá ácido." },
      { title: "Regional = Regional", desc: "O vinho local funciona muitas vezes com a comida local. O terroir partilhado cria harmonia natural." },
      { title: "Afinidade ou contraste", desc: "Dois caminhos: alinhar sabores comuns ou equilibrar por oposição." },
    ],
  },
};

const PairingsHub = () => {
  const { lang, localePath } = useLanguage();
  const pairingLabels = pairingHubLabels[String(lang)] || pairingHubLabels.en;
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PairingCategory | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const ui = useMemo(() => getWineLibraryUi(lang), [lang]);
  const pairingEntries = useMemo(() => getLocalizedPairingEntries(lang), [lang]);
  const linkTo = (path: string) => getWineLibraryPath(lang, path);

  const filtered = useMemo(() => {
    let results = pairingEntries;
    if (categoryFilter !== "all") results = results.filter(p => p.category === categoryFilter);
    if (search.trim()) {
      const q = normalizeWineSearch(search);
      results = results.filter(p =>
        normalizeWineSearch(p.name).includes(q) ||
        normalizeWineSearch(p.description).includes(q) ||
        p.dishes.some(d => normalizeWineSearch(d.dish).includes(q)) ||
        p.recommendedGrapes.some(g => normalizeWineSearch(g).includes(q)) ||
        p.recommendedRegions.some(r => normalizeWineSearch(r).includes(q))
      );
    }
    return results;
  }, [search, categoryFilter, pairingEntries]);

  const principles = pairingLabels.principles;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${ui.sections.pairings} | ${ui.libraryName}`}
        description={ui.hubs.pairingsIntro}
        url={getWineLibraryUrl(lang, "/biblioteca-vino/maridajes")}
        hreflang={getWineLibraryHreflang("/biblioteca-vino/maridajes")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
            { label: ui.sections.pairings },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <Utensils size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{ui.sections.pairings}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            {ui.hubs.pairingsTitle} <span className="text-gradient-wine italic">{ui.hubs.pairingsItalic}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4"
          >
            {ui.hubs.pairingsIntro}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">10 {ui.hubs.pairingCategory.toLowerCase()}</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">80+ {ui.stats.dishWineCombinations}</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">Winerim</span>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={ui.hubs.pairingsSearch} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:border-wine/30 transition-colors"
            >
              <Filter size={14} /> {ui.actions.filters}
              {categoryFilter !== "all" && <Badge variant="secondary" className="ml-1 bg-wine/10 text-wine">{getLocalizedCategoryMeta(categoryFilter, lang).label}</Badge>}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">{ui.hubs.pairingCategory}</p>
                  {categoryFilter !== "all" && (
                    <button onClick={() => setCategoryFilter("all")} className="text-xs text-wine hover:underline flex items-center gap-1">
                      <X size={12} /> {ui.actions.clear}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCategoryFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${categoryFilter === "all" ? "bg-wine text-primary-foreground border-wine" : "border-border hover:border-wine/30"}`}
                  >{pairingLabels.all}</button>
                  {categoryOrder.map(cat => (
                    (() => {
                      const meta = getLocalizedCategoryMeta(cat, lang);
                      return (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${categoryFilter === cat ? "bg-wine text-primary-foreground border-wine" : "border-border hover:border-wine/30"}`}
                    >{meta.emoji} {meta.label}</button>
                      );
                    })()
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground mb-6">{ui.hubs.pairingsCount(filtered.length)}</p>
        </div>
      </section>

      {/* CARDS */}
      <section className="section-padding pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((entry, i) => (
              <PairingCard key={entry.slug} entry={entry} delay={i * 0.06} linkTo={linkTo} lang={String(lang)} />
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES SECTION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{ui.hubs.pairingPrinciples}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
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
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">{ui.cta.pairingsTitle}</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {ui.cta.pairingsBody}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                    {ui.actions.requestDemo} <ArrowRight size={16} />
                  </Link>
                  <Link to={linkTo("/biblioteca-vino")} className="inline-flex items-center justify-center gap-2 border border-wine/30 text-wine px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-wine/5 transition-all">
                    {ui.actions.exploreLibrary}
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
          <ScrollReveal><h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">{ui.sections.faq}</h2></ScrollReveal>
          <FAQSection faqs={faqs} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PairingCard = ({ entry, delay, linkTo, lang }: { entry: PairingEntry; delay: number; linkTo: (path: string) => string; lang: string }) => {
  const meta = getLocalizedCategoryMeta(entry.category, lang);
  const labels = pairingHubLabels[lang] || pairingHubLabels.en;
  const intensityText = labels.intensity[entry.intensity] || entry.intensity;
  return (
    <ScrollReveal delay={delay}>
      <Link
        to={linkTo(`/biblioteca-vino/maridajes/${entry.slug}`)}
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
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.dishes.length} {labels.dishes}</span>
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{intensityText}</span>
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
