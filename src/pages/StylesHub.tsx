import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Search, ArrowRight, Filter, X, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import { buildWineLibraryCollectionSchema } from "@/components/seo/wineLibrarySchema";
import ScrollReveal from "@/components/ScrollReveal";
import StrategicWineLibraryRoutes from "@/components/biblioteca/StrategicWineLibraryRoutes";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  familyOrder,
  type StyleFamily,
  type StyleEntry,
} from "@/data/stylesLibrary";
import {
  getLocalizedFamilyMeta,
  getLocalizedStyleEntries,
} from "@/data/stylesLibraryI18n";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl, normalizeWineSearch } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const faqsByLang: Record<string, { q: string; a: string }[]> = {
  es: [
    { q: "¿Cuántos estilos de vino existen?", a: "Winerim clasifica el mundo del vino en 8 grandes familias y más de 50 subtipos, desde tintos y blancos hasta espumosos, generosos, dulces, naranjas y vinos naturales." },
    { q: "¿Por qué importa conocer los estilos para gestionar una carta?", a: "El estilo determina temperatura, copa, maridaje y expectativas. Una carta organizada por estilos ayuda al cliente a elegir y al equipo a vender mejor." },
    { q: "¿Qué diferencia hay entre vino generoso y dulce natural?", a: "El vino generoso suele estar fortificado con alcohol añadido. El dulce natural concentra azúcar por métodos como botrytis, pasificación o congelación." },
    { q: "¿Qué es un orange wine?", a: "Es un vino elaborado con uvas blancas fermentadas con sus pieles. El resultado suele ser ámbar, con tanino, textura y mayor complejidad." },
  ],
  en: [
    { q: "How many wine styles are there?", a: "Winerim groups wine into 8 major families and 50+ subtypes, from red and white to sparkling, fortified, sweet, orange and natural wines." },
    { q: "Why do styles matter for wine-list management?", a: "Style shapes temperature, glassware, pairing and guest expectations. A style-led list is easier to read, recommend and sell." },
    { q: "What is the difference between fortified and natural sweet wine?", a: "Fortified wine usually has added alcohol. Natural sweet wine concentrates sugar through methods such as botrytis, drying grapes or freezing." },
    { q: "What is orange wine?", a: "Orange wine is made from white grapes fermented with their skins. It is usually amber-coloured, textured and more tannic than a typical white wine." },
  ],
  it: [
    { q: "Quanti stili di vino esistono?", a: "Winerim organizza il vino in 8 grandi famiglie e oltre 50 sottotipi, dai rossi e bianchi agli spumanti, fortificati, dolci, orange e naturali." },
    { q: "Perché gli stili contano nella gestione della carta?", a: "Lo stile definisce temperatura, calice, abbinamento e aspettative. Una carta per stili è più leggibile e più facile da vendere." },
    { q: "Che differenza c'è tra vino fortificato e dolce naturale?", a: "Il vino fortificato prevede di norma alcol aggiunto. Il dolce naturale concentra zucchero con botrite, appassimento o congelamento." },
    { q: "Che cos'è un orange wine?", a: "È un vino da uve bianche fermentate con le bucce. Il risultato è spesso ambrato, più tannico, materico e complesso." },
  ],
  fr: [
    { q: "Combien de styles de vin existe-t-il ?", a: "Winerim organise le vin en 8 grandes familles et plus de 50 sous-types, des rouges et blancs aux effervescents, fortifiés, doux, orange et naturels." },
    { q: "Pourquoi les styles comptent-ils dans la gestion d'une carte ?", a: "Le style définit température, verre, accord et attentes. Une carte structurée par styles se lit mieux et se vend plus facilement." },
    { q: "Quelle différence entre vin fortifié et vin doux naturel ?", a: "Le vin fortifié reçoit généralement de l'alcool ajouté. Le vin doux naturel concentre le sucre par botrytis, passerillage ou gel." },
    { q: "Qu'est-ce qu'un vin orange ?", a: "C'est un vin issu de raisins blancs fermentés avec leurs peaux. Il est souvent ambré, texturé, plus tannique et complexe." },
  ],
  de: [
    { q: "Wie viele Weinstile gibt es?", a: "Winerim ordnet Wein in 8 große Familien und mehr als 50 Untertypen ein, von Rot- und Weißwein bis Schaumwein, verstärkten, süßen, orangen und naturbelassenen Weinen." },
    { q: "Warum sind Weinstile für die Karte wichtig?", a: "Der Stil bestimmt Temperatur, Glas, Pairing und Erwartung. Eine nach Stil strukturierte Karte ist leichter zu verstehen, zu empfehlen und zu verkaufen." },
    { q: "Was unterscheidet verstärkten Wein und natursüßen Wein?", a: "Verstärkter Wein enthält meist zugesetzten Alkohol. Natursüßer Wein konzentriert Zucker durch Botrytis, Trocknung oder Gefrieren." },
    { q: "Was ist Orange Wine?", a: "Orange Wine wird aus weißen Trauben mit Schalenkontakt vergoren. Er ist oft bernsteinfarben, texturiert, tanninhaltiger und komplexer." },
  ],
  pt: [
    { q: "Quantos estilos de vinho existem?", a: "A Winerim organiza o vinho em 8 grandes famílias e mais de 50 subtipos, de tintos e brancos a espumantes, fortificados, doces, laranja e naturais." },
    { q: "Porque é que os estilos importam na gestão da carta?", a: "O estilo define temperatura, copo, harmonização e expectativas. Uma carta organizada por estilos é mais fácil de ler, recomendar e vender." },
    { q: "Qual é a diferença entre vinho fortificado e doce natural?", a: "O vinho fortificado recebe normalmente álcool adicionado. O doce natural concentra açúcar por botrytis, passificação ou congelação." },
    { q: "O que é um vinho laranja?", a: "É um vinho de uvas brancas fermentadas com as películas. Costuma ter cor âmbar, tanino, textura e maior complexidade." },
  ],
};

const styleHubLabels: Record<string, {
  all: string;
  families: string;
  body: string;
  subtypes: string;
  bodyLevels: Record<string, string>;
}> = {
  es: {
    all: "Todos",
    families: "familias",
    body: "cuerpo",
    subtypes: "subtipos",
    bodyLevels: { ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto" },
  },
  en: {
    all: "All",
    families: "families",
    body: "body",
    subtypes: "subtypes",
    bodyLevels: { ligero: "Light", medio: "Medium", alto: "Full", "muy-alto": "Very full" },
  },
  it: {
    all: "Tutti",
    families: "famiglie",
    body: "corpo",
    subtypes: "sottotipi",
    bodyLevels: { ligero: "Leggero", medio: "Medio", alto: "Pieno", "muy-alto": "Molto pieno" },
  },
  fr: {
    all: "Tous",
    families: "familles",
    body: "corps",
    subtypes: "sous-types",
    bodyLevels: { ligero: "Léger", medio: "Moyen", alto: "Corsé", "muy-alto": "Très corsé" },
  },
  de: {
    all: "Alle",
    families: "Familien",
    body: "Körper",
    subtypes: "Untertypen",
    bodyLevels: { ligero: "Leicht", medio: "Mittel", alto: "Kräftig", "muy-alto": "Sehr kräftig" },
  },
  pt: {
    all: "Todos",
    families: "famílias",
    body: "corpo",
    subtypes: "subtipos",
    bodyLevels: { ligero: "Leve", medio: "Médio", alto: "Encorpado", "muy-alto": "Muito encorpado" },
  },
};

const StylesHub = () => {
  const { lang, localePath } = useLanguage();
  const styleLabels = styleHubLabels[String(lang)] || styleHubLabels.en;
  const hubFaqs = faqsByLang[String(lang)] || faqsByLang.en;
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState<StyleFamily | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const ui = useMemo(() => getWineLibraryUi(lang), [lang]);
  const styleEntries = useMemo(() => getLocalizedStyleEntries(lang), [lang]);
  const localizedFamilyFilters = useMemo(
    () => [
      { key: "all" as const, label: styleLabels.all },
      ...familyOrder.map(f => {
        const meta = getLocalizedFamilyMeta(f, lang);
        return { key: f, label: `${meta.emoji} ${meta.label}` };
      }),
    ],
    [lang, styleLabels]
  );
  const linkTo = (path: string) => getWineLibraryPath(lang, path);
  const collectionSchema = useMemo(
    () => buildWineLibraryCollectionSchema({
      lang,
      hub: "styles",
      title: ui.sections.styles,
      description: ui.hubs.stylesIntro,
      path: "/biblioteca-vino/estilos",
      libraryName: ui.libraryName,
    }),
    [lang, ui]
  );

  const filtered = useMemo(() => {
    let results = styleEntries;
    if (familyFilter !== "all") results = results.filter(s => s.family === familyFilter);
    if (search.trim()) {
      const q = normalizeWineSearch(search);
      results = results.filter(s =>
        normalizeWineSearch(s.name).includes(q) ||
        normalizeWineSearch(s.description).includes(q) ||
        s.mainGrapes.some(g => normalizeWineSearch(g).includes(q)) ||
        s.keyRegions.some(r => normalizeWineSearch(r).includes(q)) ||
        s.subtypes.some(st => normalizeWineSearch(st.name).includes(q))
      );
    }
    return results;
  }, [search, familyFilter, styleEntries]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${ui.sections.styles} | ${ui.libraryName}`}
        description={ui.hubs.stylesIntro}
        url={getWineLibraryUrl(lang, "/biblioteca-vino/estilos")}
        hreflang={getWineLibraryHreflang("/biblioteca-vino/estilos")}
        structuredData={collectionSchema}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
            { label: ui.sections.styles },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <Palette size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{ui.sections.styles}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            {ui.hubs.stylesTitle} <span className="text-gradient-wine italic">{ui.hubs.stylesItalic}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-4"
          >
            {ui.hubs.stylesIntro}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 text-sm text-muted-foreground"
          >
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">8 {styleLabels.families}</span>
            <span className="bg-wine/10 text-wine px-3 py-1 rounded-full font-medium">50+ {ui.hubs.subtypes.toLowerCase()}</span>
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
              <Input
                placeholder={ui.hubs.stylesSearch}
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
              {ui.actions.filters}
              {familyFilter !== "all" && (
                <Badge variant="secondary" className="ml-1 bg-wine/10 text-wine">{getLocalizedFamilyMeta(familyFilter, lang).label}</Badge>
              )}
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="bg-gradient-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold">{ui.hubs.styleFamily}</p>
                  {familyFilter !== "all" && (
                    <button onClick={() => setFamilyFilter("all")} className="text-xs text-wine hover:underline flex items-center gap-1">
                      <X size={12} /> {ui.actions.clear}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {localizedFamilyFilters.map(f => (
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

          <p className="text-sm text-muted-foreground mb-6">{ui.hubs.stylesCount(filtered.length)}</p>
        </div>
      </section>

      {!search.trim() && familyFilter === "all" && <StrategicWineLibraryRoutes hub="styles" className="bg-gradient-dark" />}

      {/* FAMILIES */}
      {familyFilter === "all" ? (
        familyOrder.map((fam, fi) => {
          const meta = getLocalizedFamilyMeta(fam, lang);
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
                    <StyleCard key={entry.slug} entry={entry} delay={i * 0.06} linkTo={linkTo} lang={String(lang)} />
                  ))}
                </div>
                {/* Subtypes */}
                {entries.flatMap(e => e.subtypes).length > 0 && (
                  <ScrollReveal className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">{ui.hubs.subtypes}</h3>
                    <div className="flex flex-wrap gap-2">
                      {entries.flatMap(e => e.subtypes).map(sub => (
                        <Link
                          key={sub.slug}
                          to={linkTo(`/biblioteca-vino/estilos/${sub.slug}`)}
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
                <StyleCard key={entry.slug} entry={entry} delay={i * 0.06} linkTo={linkTo} lang={String(lang)} />
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
                  {ui.cta.stylesTitle}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {ui.cta.stylesBody}
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
      <FAQSection faqs={hubFaqs} schemaId="styles-hub" className="bg-gradient-dark" />

      <Footer />
    </div>
  );
};

/* ─── Card component ─── */
const StyleCard = ({ entry, delay, linkTo, lang }: { entry: StyleEntry; delay: number; linkTo: (path: string) => string; lang: string }) => {
  const labels = styleHubLabels[lang] || styleHubLabels.en;
  return (
    <ScrollReveal delay={delay}>
      <Link
        to={linkTo(`/biblioteca-vino/estilos/${entry.slug}`)}
        className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLocalizedFamilyMeta(entry.family, lang).emoji}</span>
            <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">{entry.name}</h3>
          </div>
          <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{entry.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.servingTemp}</span>
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{labels.bodyLevels[entry.body] || entry.body} {labels.body}</span>
          <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">{entry.subtypes.length} {labels.subtypes}</span>
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
};

export default StylesHub;
