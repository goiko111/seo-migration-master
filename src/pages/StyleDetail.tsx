import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Palette, ArrowRight, Wine, Thermometer, GlassWater, Clock,
  Users, TrendingUp, Target, Lightbulb, AlertTriangle, Utensils,
  MapPin, Grape, ShieldCheck
} from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import RelatedWineLibraryLinks from "@/components/biblioteca/RelatedWineLibraryLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import {
  type StyleEntry,
  type StyleCatalogEntry,
} from "@/data/stylesLibrary";
import { getStyleEditorialProfile, type LocalizedStyleEditorialProfile } from "@/data/wineLibraryStyleEditorial";
import { getStrategicWineLibraryLinks } from "@/data/wineLibraryLinks";
import {
  getLocalizedFamilyMeta,
  getLocalizedStyleBySlug,
  getLocalizedStyleCatalogEntry,
  getLocalizedStyleEntries,
} from "@/data/stylesLibraryI18n";
import { getWineLibraryHreflang, getWineLibraryPath, getWineLibraryUi, getWineLibraryUrl } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

const levelLabels: Record<string, string> = {
  baja: "Baja", media: "Media", alta: "Alta", "muy-alta": "Muy alta",
  ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto",
  sencillo: "Sencillo", complejo: "Complejo", "muy-complejo": "Muy complejo",
  ninguna: "Ninguna", sutil: "Sutil", marcada: "Marcada",
  bajo: "Bajo", nicho: "Nicho",
  seguro: "Seguro", diferencial: "Diferencial", premium: "Premium", descubrimiento: "Descubrimiento", tendencia: "Tendencia",
};

const levelLabelsByLang: Record<string, Record<string, string>> = {
  es: levelLabels,
  en: {
    baja: "Low", media: "Medium", alta: "High", "muy-alta": "Very high",
    ligero: "Light", medio: "Medium", alto: "Full", "muy-alto": "Very full",
    sencillo: "Simple", complejo: "Complex", "muy-complejo": "Very complex",
    ninguna: "None", sutil: "Subtle", marcada: "Marked",
    bajo: "Low", nicho: "Niche",
    seguro: "Safe", diferencial: "Differentiating", premium: "Premium", descubrimiento: "Discovery", tendencia: "Trend",
  },
  it: {
    baja: "Bassa", media: "Media", alta: "Alta", "muy-alta": "Molto alta",
    ligero: "Leggero", medio: "Medio", alto: "Pieno", "muy-alto": "Molto pieno",
    sencillo: "Semplice", complejo: "Complesso", "muy-complejo": "Molto complesso",
    ninguna: "Nessuna", sutil: "Sottile", marcada: "Marcata",
    bajo: "Basso", nicho: "Nicchia",
    seguro: "Sicuro", diferencial: "Differenziante", premium: "Premium", descubrimiento: "Scoperta", tendencia: "Tendenza",
  },
  fr: {
    baja: "Faible", media: "Moyenne", alta: "Forte", "muy-alta": "Très forte",
    ligero: "Léger", medio: "Moyen", alto: "Puissant", "muy-alto": "Très puissant",
    sencillo: "Simple", complejo: "Complexe", "muy-complejo": "Très complexe",
    ninguna: "Aucune", sutil: "Subtile", marcada: "Marquée",
    bajo: "Faible", nicho: "Niche",
    seguro: "Sûr", diferencial: "Différenciant", premium: "Premium", descubrimiento: "Découverte", tendencia: "Tendance",
  },
  de: {
    baja: "Niedrig", media: "Mittel", alta: "Hoch", "muy-alta": "Sehr hoch",
    ligero: "Leicht", medio: "Mittel", alto: "Kraftvoll", "muy-alto": "Sehr kraftvoll",
    sencillo: "Einfach", complejo: "Komplex", "muy-complejo": "Sehr komplex",
    ninguna: "Keine", sutil: "Dezent", marcada: "Deutlich",
    bajo: "Niedrig", nicho: "Nische",
    seguro: "Sicher", diferencial: "Differenzierend", premium: "Premium", descubrimiento: "Entdeckung", tendencia: "Trend",
  },
  pt: {
    baja: "Baixa", media: "Média", alta: "Alta", "muy-alta": "Muito alta",
    ligero: "Leve", medio: "Médio", alto: "Encorpado", "muy-alto": "Muito encorpado",
    sencillo: "Simples", complejo: "Complexo", "muy-complejo": "Muito complexo",
    ninguna: "Nenhuma", sutil: "Sutil", marcada: "Marcada",
    bajo: "Baixo", nicho: "Nicho",
    seguro: "Seguro", diferencial: "Diferencial", premium: "Premium", descubrimiento: "Descoberta", tendencia: "Tendência",
  },
};

const styleDetailCopy: Record<string, {
  temperature: string;
  glass: string;
  aging: string;
  body: string;
  acidity: string;
  fruit: string;
  wood: string;
  complexity: string;
  winerimReading: string;
  stylePerception: string;
  communicates: string;
  clientType: string;
  sellBetter: string;
  safeOption: string;
  differentialOption: string;
  premiumOption: string;
  competesWith: string;
  bestConcepts: string;
  faqs: string;
  ctaTitle: string;
  catalogCtaTitle: string;
  catalogTitleSuffix: string;
  viewFull: (name: string) => string;
}> = {
  es: {
    temperature: "Temperatura", glass: "Copa", aging: "Potencial de guarda", body: "Cuerpo", acidity: "Acidez", fruit: "Fruta", wood: "Madera", complexity: "Complejidad",
    winerimReading: "Lectura Winerim", stylePerception: "Cómo se percibe este estilo en carta", communicates: "Qué comunica en carta", clientType: "Qué tipo de cliente lo pide", sellBetter: "Cómo venderlo mejor", safeOption: "Cuándo es opción segura", differentialOption: "Cuándo funciona como diferencial", premiumOption: "Cuándo funciona como premium", competesWith: "Compite con", bestConcepts: "Mejor para estos conceptos", faqs: "Preguntas frecuentes",
    ctaTitle: "¿Quieres que tu carta trabaje con esta inteligencia?", catalogCtaTitle: "Descubre cómo Winerim organiza tu carta", catalogTitleSuffix: "Guía del Estilo de Vino", viewFull: (name) => `Ver ${name} completo`,
  },
  en: {
    temperature: "Temperature", glass: "Glass", aging: "Ageing potential", body: "Body", acidity: "Acidity", fruit: "Fruit", wood: "Oak", complexity: "Complexity",
    winerimReading: "Winerim reading", stylePerception: "How this style works on a wine list", communicates: "What it communicates", clientType: "Who orders it", sellBetter: "How to sell it better", safeOption: "When it is a safe option", differentialOption: "When it differentiates", premiumOption: "When it works as premium", competesWith: "Competes with", bestConcepts: "Best for these concepts", faqs: "Frequently asked questions",
    ctaTitle: "Want your wine list to work with this intelligence?", catalogCtaTitle: "See how Winerim organizes your wine list", catalogTitleSuffix: "Wine Style Guide", viewFull: (name) => `View full ${name}`,
  },
  it: {
    temperature: "Temperatura", glass: "Calice", aging: "Potenziale di evoluzione", body: "Corpo", acidity: "Acidità", fruit: "Frutto", wood: "Legno", complexity: "Complessità",
    winerimReading: "Lettura Winerim", stylePerception: "Come questo stile funziona in carta", communicates: "Cosa comunica in carta", clientType: "Chi lo ordina", sellBetter: "Come venderlo meglio", safeOption: "Quando è una scelta sicura", differentialOption: "Quando differenzia", premiumOption: "Quando funziona come premium", competesWith: "Compete con", bestConcepts: "Ideale per questi concept", faqs: "Domande frequenti",
    ctaTitle: "Vuoi che la tua carta lavori con questa intelligenza?", catalogCtaTitle: "Scopri come Winerim organizza la tua carta", catalogTitleSuffix: "Guida allo Stile di Vino", viewFull: (name) => `Vedi ${name} completo`,
  },
  fr: {
    temperature: "Température", glass: "Verre", aging: "Potentiel de garde", body: "Corps", acidity: "Acidité", fruit: "Fruit", wood: "Bois", complexity: "Complexité",
    winerimReading: "Lecture Winerim", stylePerception: "Comment ce style fonctionne en carte", communicates: "Ce qu'il communique", clientType: "Qui le commande", sellBetter: "Comment mieux le vendre", safeOption: "Quand il est sûr", differentialOption: "Quand il différencie", premiumOption: "Quand il devient premium", competesWith: "Concurrence", bestConcepts: "Idéal pour ces concepts", faqs: "Questions fréquentes",
    ctaTitle: "Votre carte doit-elle travailler avec cette intelligence ?", catalogCtaTitle: "Découvrez comment Winerim organise votre carte", catalogTitleSuffix: "Guide du Style de Vin", viewFull: (name) => `Voir ${name} complet`,
  },
  de: {
    temperature: "Temperatur", glass: "Glas", aging: "Reifepotenzial", body: "Körper", acidity: "Säure", fruit: "Frucht", wood: "Holz", complexity: "Komplexität",
    winerimReading: "Winerim-Lesart", stylePerception: "Wie dieser Stil auf der Weinkarte funktioniert", communicates: "Was er auf der Karte signalisiert", clientType: "Wer ihn bestellt", sellBetter: "Wie man ihn besser verkauft", safeOption: "Wann er sicher ist", differentialOption: "Wann er differenziert", premiumOption: "Wann er als Premium funktioniert", competesWith: "Konkurriert mit", bestConcepts: "Am besten für diese Konzepte", faqs: "Häufige Fragen",
    ctaTitle: "Soll Ihre Karte mit dieser Intelligenz arbeiten?", catalogCtaTitle: "So organisiert Winerim Ihre Weinkarte", catalogTitleSuffix: "Weinstil Guide", viewFull: (name) => `${name} vollstandig ansehen`,
  },
  pt: {
    temperature: "Temperatura", glass: "Copo", aging: "Potencial de guarda", body: "Corpo", acidity: "Acidez", fruit: "Fruta", wood: "Madeira", complexity: "Complexidade",
    winerimReading: "Leitura Winerim", stylePerception: "Como este estilo funciona na carta", communicates: "O que comunica na carta", clientType: "Quem o pede", sellBetter: "Como vender melhor", safeOption: "Quando é opção segura", differentialOption: "Quando funciona como diferencial", premiumOption: "Quando funciona como premium", competesWith: "Compete com", bestConcepts: "Melhor para estes conceitos", faqs: "Perguntas frequentes",
    ctaTitle: "Quer que a sua carta trabalhe com esta inteligência?", catalogCtaTitle: "Descubra como a Winerim organiza a sua carta", catalogTitleSuffix: "Guia do Estilo de Vinho", viewFull: (name) => `Ver ${name} completo`,
  },
};

const StyleDetail = () => {
  const { style: styleSlug } = useParams<{ style: string }>();
  const { lang } = useLanguage();
  const linkTo = (path: string) => getWineLibraryPath(lang, path);
  const fullEntry = styleSlug ? getLocalizedStyleBySlug(styleSlug, lang) : undefined;
  const catalogEntry = styleSlug ? getLocalizedStyleCatalogEntry(styleSlug, lang) : undefined;
  const localizedStyleEntries = getLocalizedStyleEntries(lang);

  // JSON-LD
  useEffect(() => {
    const entry = fullEntry || catalogEntry;
    if (!entry) return;
    const pageUrl = getWineLibraryUrl(lang, `/biblioteca-vino/estilos/${entry.slug}`);
    const description = fullEntry?.seo.description || entry.description;
    const schema = document.createElement("script");
    schema.id = "style-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: entry.name,
          description,
          author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
          publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
          mainEntityOfPage: pageUrl,
          about: { "@id": `${pageUrl}#style-term` },
        },
        {
          "@id": `${pageUrl}#style-term`,
          "@type": "DefinedTerm",
          name: entry.name,
          description,
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "Winerim Wine Library",
            url: getWineLibraryUrl(lang, "/biblioteca-vino/estilos"),
          },
        },
      ],
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("style-detail-jsonld")?.remove(); };
  }, [fullEntry, catalogEntry, styleSlug, lang]);

  if (!fullEntry && !catalogEntry) return <Navigate to={linkTo("/biblioteca-vino/estilos")} replace />;

  const urlFor = (path: string) => getWineLibraryUrl(lang, path);

  if (fullEntry) return <FullStyleDetail data={fullEntry} linkTo={linkTo} localizedStyleEntries={localizedStyleEntries} lang={lang} urlFor={urlFor} />;
  return <CatalogStyleDetail data={catalogEntry!} linkTo={linkTo} localizedStyleEntries={localizedStyleEntries} lang={lang} urlFor={urlFor} />;
};

/* ═══════════════════════════════════════════════════════════════
   FULL DETAIL — Complete Winerim layer
   ═══════════════════════════════════════════════════════════════ */
const FullStyleDetail = ({ data, linkTo, localizedStyleEntries, lang, urlFor }: { data: StyleEntry; linkTo: (path: string) => string; localizedStyleEntries: StyleEntry[]; lang: string; urlFor: (path: string) => string }) => {
  const familyInfo = getLocalizedFamilyMeta(data.family, lang);
  const ui = getWineLibraryUi(lang);
  const copy = styleDetailCopy[lang] || styleDetailCopy.en;
  const labels = levelLabelsByLang[lang] || levelLabelsByLang.en;
  const editorial = getStyleEditorialProfile(data.slug, lang, data.name);
  const faqs = editorial ? [...data.faqs, ...editorial.faqs] : data.faqs;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={data.seo.title} description={data.seo.description} url={urlFor(`/biblioteca-vino/estilos/${data.slug}`)} type="article" hreflang={getWineLibraryHreflang(`/biblioteca-vino/estilos/${data.slug}`)} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
            { label: ui.sections.styles, href: linkTo("/biblioteca-vino/estilos") },
            { label: data.name },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6 mt-6"
          >
            <span className="text-sm">{familyInfo.emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{familyInfo.label}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6"
          >
            {data.name}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding pt-0">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-base md:text-lg leading-relaxed text-foreground/90">{data.intro}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICE INFO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{ui.detail.serviceProfile}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Thermometer, label: copy.temperature, value: data.servingTemp },
              { icon: GlassWater, label: copy.glass, value: data.glassRecommendation },
              { icon: Clock, label: copy.aging, value: data.agingPotential },
              { icon: Wine, label: copy.body, value: labels[data.body] || data.body },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.08}>
                <div className="bg-gradient-card border border-border rounded-xl p-5 h-full">
                  <item.icon size={18} className="text-wine mb-3" />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Sensory bars */}
          <ScrollReveal className="mt-8">
            <div className="bg-gradient-card border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg font-semibold mb-4">{ui.detail.sensoryProfile}</h3>
              <div className="space-y-3">
                {[
                  { label: copy.body, value: data.body, levels: ["ligero", "medio", "alto", "muy-alto"] },
                  { label: copy.acidity, value: data.acidity, levels: ["baja", "media", "alta", "muy-alta"] },
                  { label: copy.fruit, value: data.fruitIntensity, levels: ["baja", "media", "alta"] },
                  { label: copy.wood, value: data.woodPresence, levels: ["ninguna", "sutil", "media", "marcada"] },
                  { label: copy.complexity, value: data.complexity, levels: ["sencillo", "medio", "complejo", "muy-complejo"] },
                ].map(bar => {
                  const idx = bar.levels.indexOf(bar.value);
                  const pct = ((idx + 1) / bar.levels.length) * 100;
                  return (
                    <div key={bar.label} className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-24 shrink-0">{bar.label}</span>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-wine rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-wine font-medium w-20 text-right">{labels[bar.value] || bar.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {editorial && <StyleServiceIntelligenceSection profile={editorial} />}

      {/* ELABORATION */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{ui.detail.elaboration}</h2>
            <p className="text-muted-foreground leading-relaxed">{data.elaboration}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* GRAPES & REGIONS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Grape size={18} className="text-wine" />
                <h3 className="font-heading text-lg font-semibold">{ui.detail.keyGrapes}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.mainGrapes.map(g => (
                  <LinkedTag key={g} name={g} hint="grape" />
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-wine" />
                <h3 className="font-heading text-lg font-semibold">{ui.detail.keyRegions}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.keyRegions.map(r => (
                  <LinkedTag key={r} name={r} hint="region" />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PAIRINGS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-4">
              <Utensils size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.detail.suggestedPairings}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.pairings.map(p => (
                <div key={p} className="flex items-start gap-2 text-sm">
                  <span className="text-wine mt-0.5">•</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SUBTYPES */}
      {data.subtypes.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{ui.hubs.subtypes}</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.subtypes.map((sub, i) => (
                <ScrollReveal key={sub.slug} delay={i * 0.06}>
                  <div className="bg-gradient-card border border-border rounded-xl p-5 h-full">
                    <h3 className="font-heading text-base font-semibold mb-2 text-wine">{sub.name}</h3>
                    <p className="text-sm text-muted-foreground">{sub.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WINERIM LAYER */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
              <Wine size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{copy.winerimReading}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{copy.stylePerception}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: copy.communicates, text: data.cartaCommunication },
              { icon: Users, title: copy.clientType, text: data.clientProfile },
              { icon: Lightbulb, title: copy.sellBetter, text: data.sellByStrategy },
              { icon: ShieldCheck, title: copy.safeOption, text: data.whenSafe },
              { icon: TrendingUp, title: copy.differentialOption, text: data.whenDifferential },
              { icon: Wine, title: copy.premiumOption, text: data.whenPremium },
            ].map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.06}>
                <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <block.icon size={18} className="text-wine shrink-0" />
                    <h3 className="font-heading text-base font-semibold">{block.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Competing styles & best concepts */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ScrollReveal>
              <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle size={18} className="text-wine shrink-0" />
                  <h3 className="font-heading text-base font-semibold">{copy.competesWith}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.competingStyles.map(s => (
                    <span key={s} className="text-sm bg-wine/10 text-wine px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card border border-border rounded-xl p-6 h-full">
                <h3 className="font-heading text-base font-semibold mb-3">{copy.bestConcepts}</h3>
                <div className="flex flex-wrap gap-2">
                  {data.bestConcepts.map(c => (
                    <span key={c} className="text-sm bg-accent/50 px-3 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Related styles */}
          {data.relatedStyles.length > 0 && (
            <ScrollReveal className="mt-8">
              <h3 className="font-heading text-lg font-semibold mb-4">{ui.detail.relatedStyles}</h3>
              <div className="flex flex-wrap gap-3">
                {data.relatedStyles.map(slug => {
                  const related = localizedStyleEntries.find(e => e.slug === slug || e.id === slug);
                  if (!related) return null;
                  return (
                    <Link
                      key={slug}
                      to={linkTo(`/biblioteca-vino/estilos/${related.slug}`)}
                      className="flex items-center gap-2 bg-gradient-card border border-border rounded-lg px-4 py-2 hover:border-wine/30 transition-all text-sm"
                    >
                      <span>{getLocalizedFamilyMeta(related.family, lang).emoji}</span>
                      <span>{related.name}</span>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{copy.faqs}</h2>
            </ScrollReveal>
            <FAQSection faqs={faqs} schemaId={`style-${data.slug}`} />
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <RelatedWineLibraryLinks
            items={[
              ...getStrategicWineLibraryLinks("style", data.slug),
              ...data.mainGrapes.map((name) => ({ name, hint: "grape" as const })),
              ...data.keyRegions.map((name) => ({ name, hint: "region" as const })),
              ...data.pairings.map((name) => ({ name, hint: "pairing" as const })),
              ...data.relatedStyles.map((name) => ({ name, hint: "style" as const })),
              ...data.competingStyles.map((name) => ({ name, hint: "style" as const })),
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  {copy.ctaTitle}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  {ui.cta.stylesBody}
                </p>
                <Link to={linkTo("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {ui.actions.requestDemo} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CATALOG DETAIL — Simplified view for subtypes
   ═══════════════════════════════════════════════════════════════ */
const CatalogStyleDetail = ({ data, linkTo, localizedStyleEntries, lang, urlFor }: { data: StyleCatalogEntry; linkTo: (path: string) => string; localizedStyleEntries: StyleEntry[]; lang: string; urlFor: (path: string) => string }) => {
  const familyInfo = getLocalizedFamilyMeta(data.family, lang);
  const ui = getWineLibraryUi(lang);
  const copy = styleDetailCopy[lang] || styleDetailCopy.en;
  const editorial = getStyleEditorialProfile(data.slug, lang, data.name);
  // Find parent style
  const parent = localizedStyleEntries.find(e => e.family === data.family);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${data.name}: ${copy.catalogTitleSuffix} | Winerim`}
        description={data.description}
        url={urlFor(`/biblioteca-vino/estilos/${data.slug}`)}
        type="article"
        hreflang={getWineLibraryHreflang(`/biblioteca-vino/estilos/${data.slug}`)}
      />
      <Navbar />

      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: ui.libraryName, href: linkTo("/biblioteca-vino") },
            { label: ui.sections.styles, href: linkTo("/biblioteca-vino/estilos") },
            ...(parent ? [{ label: parent.name, href: linkTo(`/biblioteca-vino/estilos/${parent.slug}`) }] : []),
            { label: data.name },
          ]} />

          <div className="mt-6 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wine/10 text-wine text-xs font-medium">
              {familyInfo.emoji} {familyInfo.label}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] mb-6">{data.name}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">{data.description}</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-card border border-border rounded-xl p-4">
              <Thermometer size={16} className="text-wine mb-2" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{copy.temperature}</p>
              <p className="text-sm font-medium">{data.servingTemp}</p>
            </div>
            <div className="bg-gradient-card border border-border rounded-xl p-4">
              <Grape size={16} className="text-wine mb-2" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{ui.detail.keyGrapes}</p>
              <p className="text-sm font-medium">{data.mainGrapes.join(", ")}</p>
            </div>
            <div className="bg-gradient-card border border-border rounded-xl p-4">
              <MapPin size={16} className="text-wine mb-2" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{ui.detail.regions}</p>
              <p className="text-sm font-medium">{data.keyRegions.join(", ")}</p>
            </div>
          </div>

          {parent && (
            <Link to={linkTo(`/biblioteca-vino/estilos/${parent.slug}`)}
              className="inline-flex items-center gap-2 text-wine hover:underline text-sm font-medium"
            >
              ← {copy.viewFull(parent.name)}
            </Link>
          )}
        </div>
      </section>

      {editorial && <StyleServiceIntelligenceSection profile={editorial} />}

      {editorial && (
        <FAQSection faqs={editorial.faqs} schemaId={`style-${data.slug}`} />
      )}

      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <RelatedWineLibraryLinks
            items={[
              ...getStrategicWineLibraryLinks("style", data.slug),
              ...data.mainGrapes.map((name) => ({ name, hint: "grape" as const })),
              ...data.keyRegions.map((name) => ({ name, hint: "region" as const })),
              ...(parent ? [{ name: parent.slug, hint: "style" as const }] : []),
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">{copy.catalogCtaTitle}</h2>
              <Link to={linkTo("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                {ui.actions.requestDemo} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StyleFactCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-5">
    <div className="flex items-center gap-2 mb-2 text-wine">
      <Wine size={16} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="font-heading text-sm font-semibold">{value}</p>
  </div>
);

const StyleServiceIntelligenceSection = ({ profile }: { profile: LocalizedStyleEditorialProfile }) => (
  <section className="section-padding bg-gradient-dark">
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      <ScrollReveal className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target size={18} className="text-wine" />
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{profile.eyebrow}</p>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold">{profile.title}</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">{profile.subtitle}</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {profile.facts.map((fact) => (
          <StyleFactCard key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {profile.sections.map((section, index) => (
          <ScrollReveal key={section.title} delay={index * 0.04}>
            <div className="bg-gradient-card rounded-xl border border-border p-6">
              <h3 className="font-heading text-sm font-semibold text-wine mb-2">{section.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{section.body}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-8">
        <h3 className="font-heading text-lg font-semibold mb-4">{profile.menuTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {profile.menuHooks.map((hook) => (
            <div key={hook} className="flex items-center gap-3 bg-gradient-card rounded-xl border border-border p-4">
              <Utensils size={15} className="text-wine shrink-0" />
              <span className="text-sm text-muted-foreground">{hook}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default StyleDetail;
