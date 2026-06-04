import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Globe, Search, ArrowRight, Filter, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import { buildWineLibraryCollectionSchema } from "@/components/seo/wineLibrarySchema";
import ScrollReveal from "@/components/ScrollReveal";
import StrategicWineLibraryRoutes from "@/components/biblioteca/StrategicWineLibraryRoutes";
import { Input } from "@/components/ui/input";
import { getLocalizedCountries, getLocalizedRegions } from "@/data/regionsLibraryI18n";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl, normalizeWineSearch } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const faqsByLang: Record<string, { q: string; a: string }[]> = {
  es: [
    { q: "¿Cuántas regiones vinícolas cubre Winerim?", a: "El catálogo de Winerim incluye más de 3.700 denominaciones, regiones e indicaciones geográficas de más de 40 países, con información de más de 95.000 bodegas." },
    { q: "¿Qué diferencia hay entre DO, AOP, AVA y DOC?", a: "Son sistemas de clasificación de distintos países. Todos delimitan zonas geográficas con reglas de producción, aunque cambian los requisitos, el prestigio y la lectura comercial." },
    { q: "¿Por qué importa conocer las regiones para gestionar una carta?", a: "La región es un factor clave de decisión. Entender qué comunica cada denominación permite equilibrar referencias seguras, diferenciales y premium." },
    { q: "¿Cómo usa Winerim esta información?", a: "Winerim conecta regiones con recomendaciones, benchmarks, pricing y herramientas de decisión que tienen en cuenta percepción, origen y rol comercial." },
  ],
  en: [
    { q: "How many wine regions does Winerim cover?", a: "Winerim covers 3,700+ denominations, regions and geographical indications across 40+ countries, with data from more than 95,000 wineries." },
    { q: "What is the difference between DO, AOP, AVA and DOC?", a: "They are national classification systems. Each defines a geographic wine area with production rules, but requirements, prestige and commercial meaning vary by country." },
    { q: "Why do regions matter for wine-list management?", a: "Region is a major decision cue for guests. It helps teams balance safe, distinctive and premium references with clearer positioning." },
    { q: "How does Winerim use this information?", a: "Winerim connects regions with recommendations, benchmarks, pricing and decision tools that account for perception, origin and commercial role." },
  ],
  it: [
    { q: "Quante regioni vinicole copre Winerim?", a: "Winerim copre oltre 3.700 denominazioni, regioni e indicazioni geografiche in più di 40 paesi, con dati di oltre 95.000 cantine." },
    { q: "Che differenza c'è tra DO, AOP, AVA e DOC?", a: "Sono sistemi nazionali di classificazione. Definiscono aree geografiche e regole produttive, ma cambiano requisiti, prestigio e lettura commerciale." },
    { q: "Perché le regioni contano nella gestione della carta?", a: "La regione è un riferimento decisivo per l'ospite. Aiuta a bilanciare referenze sicure, distintive e premium con un posizionamento più chiaro." },
    { q: "Come usa Winerim queste informazioni?", a: "Winerim collega regioni a raccomandazioni, benchmark, pricing e strumenti decisionali che considerano percezione, origine e ruolo commerciale." },
  ],
  fr: [
    { q: "Combien de régions viticoles Winerim couvre-t-il ?", a: "Winerim couvre plus de 3 700 appellations, régions et indications géographiques dans plus de 40 pays, avec des données sur plus de 95 000 domaines." },
    { q: "Quelle différence entre DO, AOP, AVA et DOC ?", a: "Ce sont des systèmes nationaux de classification. Ils définissent une zone et des règles de production, mais les exigences, le prestige et la lecture commerciale varient." },
    { q: "Pourquoi les régions comptent-elles dans une carte des vins ?", a: "La région est un repère de décision majeur. Elle aide à équilibrer références sûres, différenciantes et premium." },
    { q: "Comment Winerim utilise-t-il ces informations ?", a: "Winerim relie régions, recommandations, benchmarks, pricing et outils de décision en tenant compte de la perception, de l'origine et du rôle commercial." },
  ],
  de: [
    { q: "Wie viele Weinregionen deckt Winerim ab?", a: "Winerim umfasst mehr als 3.700 Herkunftsbezeichnungen, Regionen und geografische Angaben in über 40 Ländern, mit Daten zu mehr als 95.000 Weingütern." },
    { q: "Was ist der Unterschied zwischen DO, AOP, AVA und DOC?", a: "Das sind nationale Klassifikationssysteme. Sie definieren Herkunftsgebiete und Produktionsregeln, unterscheiden sich aber in Anforderungen, Prestige und kommerzieller Wirkung." },
    { q: "Warum sind Regionen für die Weinkarte wichtig?", a: "Regionen sind ein zentraler Entscheidungspunkt für Gäste. Sie helfen, sichere, differenzierende und Premium-Referenzen klar zu positionieren." },
    { q: "Wie nutzt Winerim diese Informationen?", a: "Winerim verbindet Regionen mit Empfehlungen, Benchmarks, Pricing und Entscheidungstools, die Wahrnehmung, Herkunft und kommerzielle Rolle berücksichtigen." },
  ],
  pt: [
    { q: "Quantas regiões vinícolas cobre a Winerim?", a: "A Winerim cobre mais de 3.700 denominações, regiões e indicações geográficas em mais de 40 países, com dados de mais de 95.000 adegas." },
    { q: "Qual é a diferença entre DO, AOP, AVA e DOC?", a: "São sistemas nacionais de classificação. Definem zonas geográficas e regras de produção, mas variam em requisitos, prestígio e leitura comercial." },
    { q: "Porque é que as regiões importam na gestão da carta?", a: "A região é uma pista de decisão forte para o cliente. Ajuda a equilibrar referências seguras, diferenciais e premium." },
    { q: "Como é que a Winerim usa esta informação?", a: "A Winerim liga regiões a recomendações, benchmarks, pricing e ferramentas de decisão que consideram perceção, origem e papel comercial." },
  ],
};

type SearchResult = {
  type: "country" | "denomination";
  name: string;
  flag?: string;
  extra: string;
  to: string;
};

const regionHubLabels: Record<string, {
  wineriesInDb: string;
  types: string;
  wineries: string;
  roles: Record<string, string>;
  noResults: (search: string) => string;
}> = {
  es: {
    wineriesInDb: "Bodegas en BD",
    types: "Tipos",
    wineries: "bodegas",
    roles: { segura: "Segura", diferencial: "Diferencial", premium: "Premium", identitaria: "Identitaria", prestigio: "Prestigio", descubrimiento: "Descubrimiento", valor: "Valor" },
    noResults: (search) => `No se encontraron países ni denominaciones que coincidan con "${search}"`,
  },
  en: {
    wineriesInDb: "Wineries in DB",
    types: "Types",
    wineries: "wineries",
    roles: { segura: "Reliable", diferencial: "Differentiating", premium: "Premium", identitaria: "Identity", prestigio: "Prestige", descubrimiento: "Discovery", valor: "Value" },
    noResults: (search) => `No countries or denominations match "${search}"`,
  },
  it: {
    wineriesInDb: "Cantine in DB",
    types: "Tipi",
    wineries: "cantine",
    roles: { segura: "Sicura", diferencial: "Differenziante", premium: "Premium", identitaria: "Identitaria", prestigio: "Prestigio", descubrimiento: "Scoperta", valor: "Valore" },
    noResults: (search) => `Nessun paese o denominazione corrisponde a "${search}"`,
  },
  fr: {
    wineriesInDb: "Domaines en base",
    types: "Types",
    wineries: "domaines",
    roles: { segura: "Sûre", diferencial: "Différenciante", premium: "Premium", identitaria: "Identitaire", prestigio: "Prestige", descubrimiento: "Découverte", valor: "Valeur" },
    noResults: (search) => `Aucun pays ni appellation ne correspond à "${search}"`,
  },
  de: {
    wineriesInDb: "Weingüter in DB",
    types: "Typen",
    wineries: "Weingüter",
    roles: { segura: "Verlässlich", diferencial: "Differenzierend", premium: "Premium", identitaria: "Identität", prestigio: "Prestige", descubrimiento: "Entdeckung", valor: "Wert" },
    noResults: (search) => `Keine Länder oder Herkunftsbezeichnungen passen zu "${search}"`,
  },
  pt: {
    wineriesInDb: "Adegas na BD",
    types: "Tipos",
    wineries: "adegas",
    roles: { segura: "Segura", diferencial: "Diferencial", premium: "Premium", identitaria: "Identitária", prestigio: "Prestígio", descubrimiento: "Descoberta", valor: "Valor" },
    noResults: (search) => `Nenhum país ou denominação corresponde a "${search}"`,
  },
};

const RegionsHub = () => {
  const { lang, localePath } = useLanguage();
  const regionLabels = regionHubLabels[String(lang)] || regionHubLabels.en;
  const hubFaqs = faqsByLang[String(lang)] || faqsByLang.en;
  const [search, setSearch] = useState("");
  const ui = useMemo(() => getWineLibraryUi(lang), [lang]);
  const wineCountries = useMemo(() => getLocalizedCountries(lang), [lang]);
  const regionEntries = useMemo(() => getLocalizedRegions(lang), [lang]);
  const linkTo = useCallback((path: string) => getWineLibraryPath(lang, path), [lang]);

  const totalDenominations = wineCountries.reduce((acc, c) => acc + c.denominationsCount, 0);
  const collectionSchema = useMemo(
    () => buildWineLibraryCollectionSchema({
      lang,
      hub: "regions",
      title: ui.sections.regions,
      description: ui.hubs.regionsIntro(wineCountries.length),
      path: "/biblioteca-vino/regiones",
      libraryName: ui.libraryName,
    }),
    [lang, ui, wineCountries.length]
  );

  // Combined search across countries AND denominations
  const { filteredCountries, searchResults } = useMemo(() => {
    if (!search.trim()) return { filteredCountries: wineCountries, searchResults: [] as SearchResult[] };
    const q = normalizeWineSearch(search);

    const countries = wineCountries.filter(
      (c) =>
        normalizeWineSearch(c.name).includes(q) ||
        normalizeWineSearch(c.nameEn).includes(q) ||
        normalizeWineSearch(c.denominationTypes).includes(q)
    );

    // Search within denominations/regions
    const denomResults: SearchResult[] = regionEntries
      .filter((r) =>
        normalizeWineSearch(r.name).includes(q) ||
        (r.altNames && r.altNames.some((a) => normalizeWineSearch(a).includes(q))) ||
        normalizeWineSearch(r.denominationType).includes(q)
      )
      .slice(0, 12)
      .map((r) => {
        const country = wineCountries.find((c) => c.slug === r.country);
        return {
          type: "denomination" as const,
          name: r.name,
          flag: country?.flag,
          extra: `${country?.name || r.country} · ${r.denominationType}`,
          to: linkTo(`/biblioteca-vino/regiones/${r.country}/${r.slug}`),
        };
      });

    return { filteredCountries: countries, searchResults: denomResults };
  }, [search, wineCountries, regionEntries, linkTo]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${ui.sections.regions} | ${ui.libraryName}`}
        description={ui.hubs.regionsIntro(wineCountries.length)}
        url={getWineLibraryUrl(lang, "/biblioteca-vino/regiones")}
        hreflang={getWineLibraryHreflang("/biblioteca-vino/regiones")}
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
            { label: ui.sections.regions },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <Globe size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              {wineCountries.length} {ui.stats.countries} · {totalDenominations.toLocaleString()}+ {ui.stats.denominations}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            {ui.hubs.regionsTitle} <span className="text-gradient-wine italic">{ui.hubs.regionsItalic}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            {ui.hubs.regionsIntro(wineCountries.length)}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: ui.stats.countries, value: String(wineCountries.length) },
              { label: ui.stats.denominations, value: totalDenominations.toLocaleString() },
              { label: regionLabels.wineriesInDb, value: wineCountries.reduce((a, c) => a + c.bodegasCount, 0).toLocaleString() },
              { label: regionLabels.types, value: "DO, AOP, AVA..." },
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-card rounded-xl border border-border p-4 text-center">
                <p className="font-heading text-2xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-md"
          >
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={ui.hubs.regionsSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gradient-card border-border"
            />

            {/* Denomination search results dropdown */}
            {search.trim() && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">{ui.stats.denominations}</p>
                {searchResults.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm">{r.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.extra}</p>
                    </div>
                    <ArrowRight size={12} className="text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {!search.trim() && <StrategicWineLibraryRoutes hub="regions" />}

      {/* COUNTRIES GRID */}
      <section className="section-padding pt-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              {ui.hubs.exploreByCountry}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {ui.hubs.exploreByCountryIntro}
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country, i) => {
              const countryRegions = regionEntries.filter((r) => r.country === country.slug);
              return (
                <ScrollReveal key={country.slug} delay={i * 0.04}>
                  <Link
                    to={linkTo(`/biblioteca-vino/regiones/${country.slug}`)}
                    className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">
                            {country.name}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">
                        {country.denominationsCount} {ui.stats.denominations}
                      </span>
                      <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-md">
                        {country.bodegasCount.toLocaleString()} {regionLabels.wineries}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {country.denominationTypes}
                    </p>

                    {countryRegions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-1.5">
                        {countryRegions.slice(0, 3).map((r) => (
                          <span key={r.slug} className="text-xs bg-secondary/30 px-2 py-0.5 rounded-md text-foreground/70">
                            {r.name}
                          </span>
                        ))}
                        {countryRegions.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{countryRegions.length - 3}</span>
                        )}
                      </div>
                    )}
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filteredCountries.length === 0 && searchResults.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{regionLabels.noResults(search)}</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED REGIONS */}
      {!search.trim() && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {ui.hubs.featuredRegions}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {ui.hubs.featuredRegionsIntro}
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionEntries.filter((r) => r.prestige === "icónico").map((region, i) => {
                const country = wineCountries.find((c) => c.slug === region.country);
                return (
                  <ScrollReveal key={region.slug} delay={i * 0.06}>
                    <Link
                      to={linkTo(`/biblioteca-vino/regiones/${region.country}/${region.slug}`)}
                      className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">{country?.flag}</span>
                        <span className="text-xs text-muted-foreground">{country?.name}</span>
                        <span className="text-xs bg-wine/10 text-wine px-2 py-0.5 rounded-md ml-auto">
                          {region.denominationType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">
                          {region.name}
                        </h3>
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {region.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.cartaRole.slice(0, 3).map((role) => (
                          <span key={role} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md">
                            {regionLabels.roles[role] || role}
                          </span>
                        ))}
                        {region.bodegasCount && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {region.bodegasCount.toLocaleString()} {regionLabels.wineries}
                          </span>
                        )}
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={hubFaqs} schemaId="regions-hub" />

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
                {ui.cta.regionsTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                {ui.cta.regionsBody()}
              </p>
              <Link
                to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                {ui.actions.requestDemo}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegionsHub;
