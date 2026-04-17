import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Wine, AlertTriangle, Users, TrendingUp, Target, Lightbulb, Grape } from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getRegionBySlug, getCountryBySlug } from "@/data/regionsLibrary";

/* i18n translations */
const i18n = {
  es: {
    biblioteca: "Biblioteca del Vino",
    regions: "Regiones",
    alsoKnownAs: "También conocida como:",
    keyFacts: "Datos clave",
    registeredWineries: "Bodegas registradas",
    country: "País",
    type: "Tipo",
    prestige: "Prestigio",
    recognition: "Reconocimiento",
    wineTypes: "Tipos de vino",
    subzones: "Subzonas",
    mainGrapes: "Uvas principales",
    usualStyles: "Estilos habituales",
    winerimVision: "Visión Winerim",
    whatCommunicatesInCarta: "Qué comunica en una carta",
    cartaReading: "Lectura en carta",
    whenHighlight: "Cuándo conviene destacarla",
    clientProfile: "Qué tipo de cliente la reconoce",
    howSellBetter: "Cómo vende mejor",
    usualCartaRole: "Rol habitual en carta",
    competingRegions: "Regiones comparables",
    competingRegionsDesc: "Denominaciones que compiten en percepción o segmento similar.",
    commonMistakesInterpretation: "Errores comunes de interpretación",
    suggestedPairings: "Maridajes sugeridos",
    continueExploring: "Sigue explorando",
    allRegions: "Todas las regiones de {country}",
    allRegionsWorld: "Regiones del mundo",
    winerimCore: "Winerim Core",
    requestDemo: "Solicitar demo",
    bringToCartaWithCriteria: "Lleva {name} a tu carta con criterio",
    winerimIntegrates: "Winerim integra datos de denominaciones, percepción y rol comercial para ayudarte a decidir qué vinos incluir, destacar o rotar.",
  },
  en: {
    biblioteca: "Wine Library",
    regions: "Regions",
    alsoKnownAs: "Also known as:",
    keyFacts: "Key Facts",
    registeredWineries: "Registered Wineries",
    country: "Country",
    type: "Type",
    prestige: "Prestige",
    recognition: "Recognition",
    wineTypes: "Wine Types",
    subzones: "Subzones",
    mainGrapes: "Main Grapes",
    usualStyles: "Usual Styles",
    winerimVision: "Winerim Vision",
    whatCommunicatesInCarta: "What It Communicates on Wine Lists",
    cartaReading: "Reading on Wine Lists",
    whenHighlight: "When to Highlight It",
    clientProfile: "Type of Client Who Recognizes It",
    howSellBetter: "How to Sell It Better",
    usualCartaRole: "Usual Role on Wine Lists",
    competingRegions: "Comparable Regions",
    competingRegionsDesc: "Denominations that compete in perception or similar segment.",
    commonMistakesInterpretation: "Common Mistakes in Interpretation",
    suggestedPairings: "Suggested Pairings",
    continueExploring: "Continue Exploring",
    allRegions: "All Regions of {country}",
    allRegionsWorld: "Regions of the World",
    winerimCore: "Winerim Core",
    requestDemo: "Request Demo",
    bringToCartaWithCriteria: "Bring {name} to Your Wine List with Criteria",
    winerimIntegrates: "Winerim integrates data on denominations, perception, and commercial role to help you decide which wines to include, highlight, or rotate.",
  },
  it: {
    biblioteca: "Biblioteca del Vino",
    regions: "Regioni",
    alsoKnownAs: "Anche conosciuta come:",
    keyFacts: "Fatti Chiave",
    registeredWineries: "Cantine Registrate",
    country: "Paese",
    type: "Tipo",
    prestige: "Prestigio",
    recognition: "Riconoscimento",
    wineTypes: "Tipi di Vino",
    subzones: "Subzone",
    mainGrapes: "Uve Principali",
    usualStyles: "Stili Abituali",
    winerimVision: "Visione Winerim",
    whatCommunicatesInCarta: "Cosa Comunica sulla Carta",
    cartaReading: "Lettura sulla Carta",
    whenHighlight: "Quando Metterla in Evidenza",
    clientProfile: "Tipo di Cliente che la Riconosce",
    howSellBetter: "Come Venderla Meglio",
    usualCartaRole: "Ruolo Abituale sulla Carta",
    competingRegions: "Regioni Comparabili",
    competingRegionsDesc: "Denominazioni che competono nella percezione o in segmenti simili.",
    commonMistakesInterpretation: "Errori Comuni nell'Interpretazione",
    suggestedPairings: "Abbinamenti Consigliati",
    continueExploring: "Continua Esplorando",
    allRegions: "Tutte le Regioni di {country}",
    allRegionsWorld: "Regioni del Mondo",
    winerimCore: "Winerim Core",
    requestDemo: "Richiedi Demo",
    bringToCartaWithCriteria: "Porta {name} nella Tua Carta con Criterio",
    winerimIntegrates: "Winerim integra dati su denominazioni, percezione e ruolo commerciale per aiutarti a decidere quali vini includere, evidenziare o ruotare.",
  },
  fr: {
    biblioteca: "Bibliotheque du Vin",
    regions: "Regions",
    alsoKnownAs: "Egalement connu sous le nom de:",
    keyFacts: "Faits Cles",
    registeredWineries: "Caves Enregistrees",
    country: "Pays",
    type: "Type",
    prestige: "Prestige",
    recognition: "Reconnaissance",
    wineTypes: "Types de Vin",
    subzones: "Sous-zones",
    mainGrapes: "Cepages Principaux",
    usualStyles: "Styles Habituels",
    winerimVision: "Vision Winerim",
    whatCommunicatesInCarta: "Ce qu'il Communique sur la Carte",
    cartaReading: "Lecture sur la Carte",
    whenHighlight: "Quand la Mettre en Avant",
    clientProfile: "Type de Client qui la Reconnait",
    howSellBetter: "Comment la Vendre Mieux",
    usualCartaRole: "Role Habituel sur la Carte",
    competingRegions: "Regions Comparables",
    competingRegionsDesc: "Denominations qui concurrencent dans la perception ou un segment similaire.",
    commonMistakesInterpretation: "Erreurs Courantes dans l'Interpretation",
    suggestedPairings: "Accords Suggerez",
    continueExploring: "Continuer l'Exploration",
    allRegions: "Toutes les Regions de {country}",
    allRegionsWorld: "Regions du Monde",
    winerimCore: "Winerim Core",
    requestDemo: "Demander une Demonstration",
    bringToCartaWithCriteria: "Apportez {name} a Votre Carte avec Critere",
    winerimIntegrates: "Winerim integre les donnees sur les denominations, la perception et le role commercial pour vous aider a decider quels vins inclure, mettre en evidence ou faire tourner.",
  },
  de: {
    biblioteca: "Weinbibliothek",
    regions: "Weinregionen",
    alsoKnownAs: "Auch bekannt als:",
    keyFacts: "Wichtige Fakten",
    registeredWineries: "Registrierte Weinguter",
    country: "Land",
    type: "Typ",
    prestige: "Prestige",
    recognition: "Anerkennung",
    wineTypes: "Weintypen",
    subzones: "Unterzonen",
    mainGrapes: "Wichtigste Rebsorten",
    usualStyles: "Ubliche Stile",
    winerimVision: "Winerim-Sicht",
    whatCommunicatesInCarta: "Warum es auf der Weinkarte mitteilt",
    cartaReading: "Lesung auf der Weinkarte",
    whenHighlight: "Wann man es hervorheben sollte",
    clientProfile: "Kundentyp, der es erkennt",
    howSellBetter: "Wie man es besser verkauft",
    usualCartaRole: "Ubliche Rolle auf der Weinkarte",
    competingRegions: "Vergleichbare Weinregionen",
    competingRegionsDesc: "Denominationen, die in der Wahrnehmung oder einem ahnlichen Segment konkurrieren.",
    commonMistakesInterpretation: "Haufige Interpretationsfehler",
    suggestedPairings: "Empfohlene Speisebegleitungen",
    continueExploring: "Weitererkundung",
    allRegions: "Alle Regionen von {country}",
    allRegionsWorld: "Weinregionen der Welt",
    winerimCore: "Winerim Core",
    requestDemo: "Demo anfordern",
    bringToCartaWithCriteria: "Bringen Sie {name} mit Kriterien auf Ihre Weinkarte",
    winerimIntegrates: "Winerim integriert Daten zu Denominationen, Wahrnehmung und geschäftlicher Rolle, um Ihnen zu helfen, zu entscheiden, welche Weine einbezogen, hervorgehoben oder gewechselt werden sollen.",
  },
  pt: {
    biblioteca: "Biblioteca do Vinho",
    regions: "Regioes",
    alsoKnownAs: "Tambem conhecida como:",
    keyFacts: "Fatos Principais",
    registeredWineries: "Adegas Registradas",
    country: "Pais",
    type: "Tipo",
    prestige: "Prestigio",
    recognition: "Reconhecimento",
    wineTypes: "Tipos de Vinho",
    subzones: "Subzonas",
    mainGrapes: "Castas Principais",
    usualStyles: "Estilos Habituais",
    winerimVision: "Visao Winerim",
    whatCommunicatesInCarta: "O Que Comunica na Carta",
    cartaReading: "Leitura na Carta",
    whenHighlight: "Quando Destaca-la",
    clientProfile: "Tipo de Cliente que a Reconhece",
    howSellBetter: "Como Vender Melhor",
    usualCartaRole: "Papel Habitual na Carta",
    competingRegions: "Regioes Compariveis",
    competingRegionsDesc: "Denominacoes que competem em percepcao ou segmento similar.",
    commonMistakesInterpretation: "Erros Comuns de Interpretacao",
    suggestedPairings: "Harmonizacoes Sugeridas",
    continueExploring: "Continuar Explorando",
    allRegions: "Todas as Regioes de {country}",
    allRegionsWorld: "Regioes do Mundo",
    winerimCore: "Winerim Core",
    requestDemo: "Solicitar Demo",
    bringToCartaWithCriteria: "Leve {name} para sua Carta com Criterio",
    winerimIntegrates: "Winerim integra dados de regioes vinicolas, percepcao e papel comercial para ajuda-lo a decidir quais vinhos incluir, destacar ou rodar.",
  },
};

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
  const { allLangPaths } = useLanguage();
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

  const { lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        url={`https://winerim.wine/biblioteca-vino/regiones/${country}/${region}`}
        type="article"
        hreflang={allLangPaths("/biblioteca-vino/regiones")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: t.biblioteca, href: "/biblioteca-vino" },
            { label: t.regions, href: "/biblioteca-vino/regiones" },
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.keyFacts}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.bodegasCount && (
              <FactCard icon={<Wine size={16} />} label={t.registeredWineries} value={data.bodegasCount.toLocaleString()} />
            )}
            <FactCard icon={<MapPin size={16} />} label={t.country} value={countryData.name} />
            <FactCard icon={<Target size={16} />} label={t.type} value={data.denominationType} />
            <FactCard icon={<TrendingUp size={16} />} label={t.prestige} value={prestigeLabels[data.prestige]} />
            <FactCard icon={<Users size={16} />} label={t.recognition} value={recognitionLabels[data.clientRecognition]} />
            <FactCard icon={<Grape size={16} />} label={t.wineTypes} value={data.wineTypes.join(", ")} />
          </div>
        </div>
      </section>

      {/* SUBZONES */}
      {data.subzones && data.subzones.length > 0 && (
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.subzones}</h2>
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
              <h2 className="font-heading text-xl font-semibold mb-4">{t.mainGrapes}</h2>
              <div className="flex flex-wrap gap-2">
                {data.mainGrapes.map((g) => (
                  <LinkedTag key={g} name={g} hint="grape" />
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-xl font-semibold mb-4">{t.usualStyles}</h2>
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.winerimVision}</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.whatCommunicatesInCarta}</h2>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal>
              <WinerimBlock title={t.cartaReading} content={data.cartaReading} />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <WinerimBlock title={t.whenHighlight} content={data.whenToHighlight} />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <WinerimBlock title={t.clientProfile} content={data.clientProfile} />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <WinerimBlock title={t.howSellBetter} content={data.sellByStrategy} />
            </ScrollReveal>
          </div>

          {/* Carta roles */}
          <ScrollReveal delay={0.2} className="mt-8">
            <h3 className="font-heading text-lg font-semibold mb-3">{t.usualCartaRole}</h3>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.competingRegions}</h2>
              <p className="text-muted-foreground text-sm mt-2">{t.competingRegionsDesc}</p>
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
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.commonMistakesInterpretation}</h2>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.suggestedPairings}</h2>
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
            <h2 className="font-heading text-xl font-semibold">{t.continueExploring}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { to: `/biblioteca-vino/regiones/${country}`, label: t.allRegions.replace('{country}', countryData.name) },
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
                {t.bringToCartaWithCriteria.replace('{name}', data.name)} <span className="text-gradient-wine italic"></span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
                {t.winerimIntegrates}
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
