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

/* i18n translations */
const i18n = {
  es: {
    biblioteca: "Biblioteca del Vino",
    regions: "Regiones",
    winRegionsOf: "Regiones vinicolas de",
    reference: "Referencia",
    mostRecognizedRegions: "Regiones mas reconocidas",
    shouldKnow: "Las denominaciones que todo profesional de hosteleria deberia conocer.",
    differential: "Diferencial",
    differentialRegions: "Regiones diferenciales",
    addCriteria: "Denominaciones que aportan criterio, tendencia y descubrimiento a una carta.",
    allRegions: "Todas las regiones",
    classificationSystem: "Sistema de clasificacion",
    howReadInCarta: "Como leer {country} en una carta",
    mainZones: "Principales zonas vinicolas",
    exploreMore: "Explora mas",
    allRegionsWorld: "Todas las regiones del mundo",
    entireWineLibrary: "Biblioteca del Vino completa",
    winerimCore: "Winerim Core",
    requestDemo: "Solicitar demo",
    manageChartWithIntelligence: "Gestiona tu carta con inteligencia regional",
    winerimIntegrates: "Winerim integra datos de {denominationsCount} denominaciones de {country} para ayudarte a tomar mejores decisiones de carta.",
  },
  en: {
    biblioteca: "Wine Library",
    regions: "Regions",
    winRegionsOf: "Wine Regions of",
    reference: "Reference",
    mostRecognizedRegions: "Most Recognized Regions",
    shouldKnow: "The denominations that every hospitality professional should know.",
    differential: "Differential",
    differentialRegions: "Differential Regions",
    addCriteria: "Denominations that add criteria, trends, and discovery to a wine list.",
    allRegions: "All Regions",
    classificationSystem: "Classification System",
    howReadInCarta: "How to Read {country} on a Wine List",
    mainZones: "Main Wine Areas",
    exploreMore: "Explore More",
    allRegionsWorld: "All Regions of the World",
    entireWineLibrary: "Entire Wine Library",
    winerimCore: "Winerim Core",
    requestDemo: "Request Demo",
    manageChartWithIntelligence: "Manage Your Wine List with Regional Intelligence",
    winerimIntegrates: "Winerim integrates data from {denominationsCount} denominations of {country} to help you make better wine list decisions.",
  },
  it: {
    biblioteca: "Biblioteca del Vino",
    regions: "Regioni",
    winRegionsOf: "Regioni Vinicole di",
    reference: "Riferimento",
    mostRecognizedRegions: "Regioni Piu Riconosciute",
    shouldKnow: "Le denominazioni che ogni professionista dell'ospitalita dovrebbe conoscere.",
    differential: "Differenziale",
    differentialRegions: "Regioni Differenziali",
    addCriteria: "Denominazioni che aggiungono criterio, tendenza e scoperta a una carta.",
    allRegions: "Tutte le Regioni",
    classificationSystem: "Sistema di Classificazione",
    howReadInCarta: "Come Leggere {country} su una Carta",
    mainZones: "Principali Zone Vinicole",
    exploreMore: "Esplora di Piu",
    allRegionsWorld: "Tutte le Regioni del Mondo",
    entireWineLibrary: "Intera Biblioteca del Vino",
    winerimCore: "Winerim Core",
    requestDemo: "Richiedi Demo",
    manageChartWithIntelligence: "Gestisci la Tua Carta con Intelligenza Regionale",
    winerimIntegrates: "Winerim integra dati da {denominationsCount} denominazioni di {country} per aiutarti a prendere decisioni migliori sulla carta.",
  },
  fr: {
    biblioteca: "Bibliotheque du Vin",
    regions: "Regions",
    winRegionsOf: "Regions Vinicoles de",
    reference: "Reference",
    mostRecognizedRegions: "Regions les Plus Reconnues",
    shouldKnow: "Les denominations que tout professionnel de l'hospitalite devrait connaitre.",
    differential: "Differentiel",
    differentialRegions: "Regions Differentielles",
    addCriteria: "Denominations qui ajoutent des criteres, des tendances et de la decouverte a une carte.",
    allRegions: "Toutes les Regions",
    classificationSystem: "Systeme de Classification",
    howReadInCarta: "Comment Lire {country} sur une Carte",
    mainZones: "Principales Zones Vinicoles",
    exploreMore: "Explorer Davantage",
    allRegionsWorld: "Toutes les Regions du Monde",
    entireWineLibrary: "Entiere Bibliotheque du Vin",
    winerimCore: "Winerim Core",
    requestDemo: "Demander une Demonstration",
    manageChartWithIntelligence: "Gerez Votre Carte avec l'Intelligence Regionale",
    winerimIntegrates: "Winerim integre les donnees de {denominationsCount} denominations de {country} pour vous aider a prendre de meilleures decisions de carte.",
  },
  de: {
    biblioteca: "Weinbibliothek",
    regions: "Weinregionen",
    winRegionsOf: "Weinregionen von",
    reference: "Referenz",
    mostRecognizedRegions: "Anerkannte Weinregionen",
    shouldKnow: "Denominationen, die jeder Hotellerie-Profi kennen sollte.",
    differential: "Differentiell",
    differentialRegions: "Differentielle Weinregionen",
    addCriteria: "Denominationen, die Kriterien, Trends und Entdeckung auf eine Weinkarte bringen.",
    allRegions: "Alle Regionen",
    classificationSystem: "Klassifizierungssystem",
    howReadInCarta: "Wie man {country} auf einer Weinkarte liest",
    mainZones: "Wichtigste Weinzonen",
    exploreMore: "Mehr Erkundung",
    allRegionsWorld: "Alle Weinregionen der Welt",
    entireWineLibrary: "Komplette Weinbibliothek",
    winerimCore: "Winerim Core",
    requestDemo: "Demo anfordern",
    manageChartWithIntelligence: "Verwalten Sie Ihre Weinkarte mit regionaler Intelligenz",
    winerimIntegrates: "Winerim integriert Daten aus {denominationsCount} Denominationen von {country}, um Ihnen bessere Entscheidungen bei der Weinkarte zu ermoglichen.",
  },
  pt: {
    biblioteca: "Biblioteca do Vinho",
    regions: "Regioes",
    winRegionsOf: "Regioes Vinicolas de",
    reference: "Referencia",
    mostRecognizedRegions: "Regioes Mais Reconhecidas",
    shouldKnow: "As denominacoes que todo profissional de hospitalidade deveria conhecer.",
    differential: "Diferencial",
    differentialRegions: "Regioes Diferenciadas",
    addCriteria: "Denominacoes que trazem criterio, tendencia e descoberta para uma carta.",
    allRegions: "Todas as Regioes",
    classificationSystem: "Sistema de Classificacao",
    howReadInCarta: "Como Ler {country} em uma Carta",
    mainZones: "Principais Zonas Vinicolas",
    exploreMore: "Explorar Mais",
    allRegionsWorld: "Todas as Regioes do Mundo",
    entireWineLibrary: "Biblioteca Inteira do Vinho",
    winerimCore: "Winerim Core",
    requestDemo: "Solicitar Demo",
    manageChartWithIntelligence: "Gerencie sua Carta com Inteligencia Regional",
    winerimIntegrates: "Winerim integra dados de {denominationsCount} denominacoes de {country} para ajuda-lo a tomar melhores decisoes na carta.",
  },
};

const RegionCountry = () => {
  const { lang, allLangPaths } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;
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
            { label: t.biblioteca, href: "/biblioteca-vino" },
            { label: t.regions, href: "/biblioteca-vino/regiones" },
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
            {t.winRegionsOf}{" "}
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
                <h2 className="font-heading text-xl font-semibold">{t.classificationSystem}</h2>
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
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.reference}</p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {t.mostRecognizedRegions}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {t.shouldKnow}
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
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.differential}</p>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {t.differentialRegions}
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                {t.addCriteria}
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.allRegions}</h2>
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
                  {t.howReadInCarta.replace('{country}', data.name)}
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">{t.mainZones}</h2>
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
            <h2 className="font-heading text-xl font-semibold">{t.exploreMore}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: "/biblioteca-vino/regiones", label: t.allRegionsWorld },
              { to: "/biblioteca-vino", label: t.biblioteca },
              { to: "/producto/winerim-core", label: t.winerimCore },
              { to: "/demo", label: t.requestDemo },
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
                {t.manageChartWithIntelligence}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
                {t.winerimIntegrates.replace('{denominationsCount}', data.denominationsCount.toString()).replace('{country}', data.name)}
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
              >
                {t.requestDemo} <ArrowRight size={16} />
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
