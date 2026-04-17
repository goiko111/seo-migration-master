import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Palette, ArrowRight, Wine, Thermometer, GlassWater, Clock,
  Users, TrendingUp, Target, Lightbulb, AlertTriangle, Utensils,
  MapPin, Grape, ShieldCheck
} from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import {
  getStyleBySlug,
  getStyleCatalogEntry,
  familyMeta,
  styleEntries,
  type StyleEntry,
  type StyleCatalogEntry,
} from "@/data/stylesLibrary";

/* i18n translations */
const i18n = {
  es: {
    biblioteca: "Biblioteca del Vino",
    styles: "Estilos",
    serviceAndSensory: "Servicio y perfil sensorial",
    temperature: "Temperatura",
    glass: "Copa",
    agingPotential: "Potencial de guarda",
    body: "Cuerpo",
    sensoryProfile: "Perfil sensorial",
    acidity: "Acidez",
    fruit: "Fruta",
    wood: "Madera",
    complexity: "Complejidad",
    elaboration: "Elaboración",
    mainGrapes: "Uvas principales",
    highlightedRegions: "Regiones destacadas",
    pairings: "Maridajes",
    subtypesAndVariants: "Subtipos y variantes",
    winerimReading: "Lectura Winerim",
    howPerceivedThisStyle: "Cómo se percibe este estilo en carta",
    whatCommunicates: "Qué comunica en carta",
    clientType: "Qué tipo de cliente lo pide",
    howSellBetter: "Cómo venderlo mejor",
    whenSafe: "Cuándo es opción segura",
    whenDifferential: "Cuándo funciona como diferencial",
    whenPremium: "Cuándo funciona como premium",
    competesWithLabel: "Compite con",
    bestForConcepts: "Mejor para estos conceptos",
    relatedStyles: "Estilos relacionados",
    frequentQuestions: "Preguntas frecuentes",
    discoverWinerimOrganizes: "Descubre cómo Winerim organiza tu carta",
    requestDemo: "Solicitar demo",
    wantChartWorkThisIntelligence: "¿Quieres que tu carta trabaje con esta inteligencia?",
    winerimOrganizes: "Winerim organiza, activa y optimiza tu carta de vinos con criterio profesional.",
  },
  en: {
    biblioteca: "Wine Library",
    styles: "Styles",
    serviceAndSensory: "Service and Sensory Profile",
    temperature: "Temperature",
    glass: "Glass",
    agingPotential: "Aging Potential",
    body: "Body",
    sensoryProfile: "Sensory Profile",
    acidity: "Acidity",
    fruit: "Fruit",
    wood: "Wood",
    complexity: "Complexity",
    elaboration: "Elaboration",
    mainGrapes: "Main Grapes",
    highlightedRegions: "Highlighted Regions",
    pairings: "Pairings",
    subtypesAndVariants: "Subtypes and Variants",
    winerimReading: "Winerim Reading",
    howPerceivedThisStyle: "How This Style Is Perceived on Wine Lists",
    whatCommunicates: "What It Communicates on Wine Lists",
    clientType: "Type of Client Who Orders It",
    howSellBetter: "How to Sell It Better",
    whenSafe: "When It Is a Safe Option",
    whenDifferential: "When It Functions as Differential",
    whenPremium: "When It Functions as Premium",
    competesWithLabel: "Competes With",
    bestForConcepts: "Best for These Concepts",
    relatedStyles: "Related Styles",
    frequentQuestions: "Frequently Asked Questions",
    discoverWinerimOrganizes: "Discover How Winerim Organizes Your Wine List",
    requestDemo: "Request Demo",
    wantChartWorkThisIntelligence: "Do You Want Your Wine List to Work with This Intelligence?",
    winerimOrganizes: "Winerim organizes, activates, and optimizes your wine list with professional criteria.",
  },
  it: {
    biblioteca: "Biblioteca del Vino",
    styles: "Stili",
    serviceAndSensory: "Servizio e Profilo Sensoriale",
    temperature: "Temperatura",
    glass: "Calice",
    agingPotential: "Potenziale di Invecchiamento",
    body: "Corpo",
    sensoryProfile: "Profilo Sensoriale",
    acidity: "Acidita",
    fruit: "Frutta",
    wood: "Legno",
    complexity: "Complessita",
    elaboration: "Elaborazione",
    mainGrapes: "Uve Principali",
    highlightedRegions: "Regioni in Evidenza",
    pairings: "Abbinamenti",
    subtypesAndVariants: "Sottotipi e Varianti",
    winerimReading: "Lettura Winerim",
    howPerceivedThisStyle: "Come Viene Percepito questo Stile sulla Carta",
    whatCommunicates: "Cosa Comunica sulla Carta",
    clientType: "Tipo di Cliente che lo Ordina",
    howSellBetter: "Come Venderlo Meglio",
    whenSafe: "Quando e un'Opzione Sicura",
    whenDifferential: "Quando Funziona come Differenziale",
    whenPremium: "Quando Funziona come Premium",
    competesWithLabel: "Compete Con",
    bestForConcepts: "Migliore per Questi Concetti",
    relatedStyles: "Stili Correlati",
    frequentQuestions: "Domande Frequenti",
    discoverWinerimOrganizes: "Scopri Come Winerim Organizza la Tua Carta",
    requestDemo: "Richiedi Demo",
    wantChartWorkThisIntelligence: "Vuoi che la tua carta funzioni con questa intelligenza?",
    winerimOrganizes: "Winerim organizza, attiva e ottimizza la tua carta dei vini con criterio professionale.",
  },
  fr: {
    biblioteca: "Bibliotheque du Vin",
    styles: "Styles",
    serviceAndSensory: "Service et Profil Sensoriel",
    temperature: "Temperature",
    glass: "Verre",
    agingPotential: "Potentiel de Vieillissement",
    body: "Corps",
    sensoryProfile: "Profil Sensoriel",
    acidity: "Acidite",
    fruit: "Fruit",
    wood: "Bois",
    complexity: "Complexite",
    elaboration: "Elaboration",
    mainGrapes: "Cepages Principaux",
    highlightedRegions: "Regions Mises en Avant",
    pairings: "Accords",
    subtypesAndVariants: "Sous-types et Variantes",
    winerimReading: "Lecture Winerim",
    howPerceivedThisStyle: "Comment ce Style est Percu sur la Carte",
    whatCommunicates: "Ce qu'il Communique sur la Carte",
    clientType: "Type de Client qui le Commande",
    howSellBetter: "Comment le Vendre Mieux",
    whenSafe: "Quand c'est une Option Securisee",
    whenDifferential: "Quand il Fonctionne comme Differentiel",
    whenPremium: "Quand il Fonctionne comme Premium",
    competesWithLabel: "Concurrence Avec",
    bestForConcepts: "Meilleur pour Ces Concepts",
    relatedStyles: "Styles Associes",
    frequentQuestions: "Questions Frequentes",
    discoverWinerimOrganizes: "Decouvrez Comment Winerim Organise Votre Carte",
    requestDemo: "Demander une Demonstration",
    wantChartWorkThisIntelligence: "Voulez-vous que votre carte fonctionne avec cette intelligence?",
    winerimOrganizes: "Winerim organise, active et optimise votre carte des vins avec des criteres professionnels.",
  },
  de: {
    biblioteca: "Weinbibliothek",
    styles: "Weinstile",
    serviceAndSensory: "Ausschank und sensorisches Profil",
    temperature: "Temperatur",
    glass: "Glas",
    agingPotential: "Lagerungspotential",
    body: "Korper",
    sensoryProfile: "Sensorisches Profil",
    acidity: "Saure",
    fruit: "Frucht",
    wood: "Holz",
    complexity: "Komplexitat",
    elaboration: "Herstellung",
    mainGrapes: "Wichtigste Rebsorten",
    highlightedRegions: "Hervorgehobene Weinregionen",
    pairings: "Speisebegleitungen",
    subtypesAndVariants: "Untertypen und Varianten",
    winerimReading: "Winerim-Lesung",
    howPerceivedThisStyle: "Wie dieser Weinstil auf der Weinkarte wahrgenommen wird",
    whatCommunicates: "Was es auf der Weinkarte mitteilt",
    clientType: "Kundentyp, der ihn bestellt",
    howSellBetter: "Wie man ihn besser verkauft",
    whenSafe: "Wenn es eine sichere Option ist",
    whenDifferential: "Wenn es als Differentiator fungiert",
    whenPremium: "Wenn es als Premium fungiert",
    competesWithLabel: "Konkurriert Mit",
    bestForConcepts: "Am besten fur diese Konzepte",
    relatedStyles: "Verwandte Weinstile",
    frequentQuestions: "Haufig gestellte Fragen",
    discoverWinerimOrganizes: "Entdecken Sie, wie Winerim Ihre Weinkarte organisiert",
    requestDemo: "Demo anfordern",
    wantChartWorkThisIntelligence: "Mochten Sie, dass Ihre Weinkarte mit dieser Intelligenz funktioniert?",
    winerimOrganizes: "Winerim organisiert, aktiviert und optimiert Ihre Weinkarte mit professionellen Kriterien.",
  },
  pt: {
    biblioteca: "Biblioteca do Vinho",
    styles: "Estilos",
    serviceAndSensory: "Servico e Perfil Sensorial",
    temperature: "Temperatura",
    glass: "Taça",
    agingPotential: "Potencial de Envelhecimento",
    body: "Corpo",
    sensoryProfile: "Perfil Sensorial",
    acidity: "Acidez",
    fruit: "Fruta",
    wood: "Madeira",
    complexity: "Complexidade",
    elaboration: "Elaboracao",
    mainGrapes: "Castas Principais",
    highlightedRegions: "Regioes em Destaque",
    pairings: "Harmonizacoes",
    subtypesAndVariants: "Subtipos e Variantes",
    winerimReading: "Leitura Winerim",
    howPerceivedThisStyle: "Como este Estilo e Percebido na Carta",
    whatCommunicates: "O que Comunica na Carta",
    clientType: "Tipo de Cliente que o Pede",
    howSellBetter: "Como Vender Melhor",
    whenSafe: "Quando e uma Opcao Segura",
    whenDifferential: "Quando Funciona como Diferencial",
    whenPremium: "Quando Funciona como Premium",
    competesWithLabel: "Compete Com",
    bestForConcepts: "Melhor para Estes Conceitos",
    relatedStyles: "Estilos Relacionados",
    frequentQuestions: "Perguntas Frequentes",
    discoverWinerimOrganizes: "Descubra Como Winerim Organiza sua Carta",
    requestDemo: "Solicitar Demo",
    wantChartWorkThisIntelligence: "Quer que sua carta funcione com esta inteligencia?",
    winerimOrganizes: "Winerim organiza, ativa e otimiza sua carta de vinhos com criterio profissional.",
  },
};

const levelLabels: Record<string, string> = {
  baja: "Baja", media: "Media", alta: "Alta", "muy-alta": "Muy alta",
  ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto",
  sencillo: "Sencillo", complejo: "Complejo", "muy-complejo": "Muy complejo",
  ninguna: "Ninguna", sutil: "Sutil", marcada: "Marcada",
  bajo: "Bajo", nicho: "Nicho",
  seguro: "Seguro", diferencial: "Diferencial", premium: "Premium", descubrimiento: "Descubrimiento", tendencia: "Tendencia",
};

const StyleDetail = () => {
  const { allLangPaths } = useLanguage();
  const { style: styleSlug } = useParams<{ style: string }>();
  const fullEntry = styleSlug ? getStyleBySlug(styleSlug) : undefined;
  const catalogEntry = styleSlug ? getStyleCatalogEntry(styleSlug) : undefined;

  // JSON-LD
  useEffect(() => {
    const entry = fullEntry || catalogEntry;
    if (!entry) return;
    const schema = document.createElement("script");
    schema.id = "style-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.name,
      description: fullEntry?.seo.description || entry.description,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      mainEntityOfPage: `https://winerim.wine/biblioteca-vino/estilos/${entry.slug}`,
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("style-detail-jsonld")?.remove(); };
  }, [fullEntry, catalogEntry, styleSlug]);

  if (!fullEntry && !catalogEntry) return <Navigate to="/biblioteca-vino/estilos" replace />;

  if (fullEntry) return <FullStyleDetail data={fullEntry} />;
  return <CatalogStyleDetail data={catalogEntry!} />;
};

/* ═══════════════════════════════════════════════════════════════
   FULL DETAIL — Complete Winerim layer
   ═══════════════════════════════════════════════════════════════ */
const FullStyleDetail = ({ data }: { data: StyleEntry }) => {
  const { lang, allLangPaths } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;
  const familyInfo = familyMeta[data.family];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={data.seo.title} description={data.seo.description} url={`https://winerim.wine/biblioteca-vino/estilos/${data.slug}`} type="article"
        hreflang={allLangPaths("/biblioteca-vino/estilos")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: t.biblioteca, href: "/biblioteca-vino" },
            { label: t.styles, href: "/biblioteca-vino/estilos" },
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.serviceAndSensory}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Thermometer, label: t.temperature, value: data.servingTemp },
              { icon: GlassWater, label: t.glass, value: data.glassRecommendation },
              { icon: Clock, label: t.agingPotential, value: data.agingPotential },
              { icon: Wine, label: t.body, value: levelLabels[data.body] || data.body },
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
              <h3 className="font-heading text-lg font-semibold mb-4">{t.sensoryProfile}</h3>
              <div className="space-y-3">
                {[
                  { label: t.body, value: data.body, levels: ["ligero", "medio", "alto", "muy-alto"] },
                  { label: t.acidity, value: data.acidity, levels: ["baja", "media", "alta", "muy-alta"] },
                  { label: t.fruit, value: data.fruitIntensity, levels: ["baja", "media", "alta"] },
                  { label: t.wood, value: data.woodPresence, levels: ["ninguna", "sutil", "media", "marcada"] },
                  { label: t.complexity, value: data.complexity, levels: ["sencillo", "medio", "complejo", "muy-complejo"] },
                ].map(bar => {
                  const idx = bar.levels.indexOf(bar.value);
                  const pct = ((idx + 1) / bar.levels.length) * 100;
                  return (
                    <div key={bar.label} className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-24 shrink-0">{bar.label}</span>
                      <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-wine rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-wine font-medium w-20 text-right">{levelLabels[bar.value] || bar.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ELABORATION */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{t.elaboration}</h2>
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
                <h3 className="font-heading text-lg font-semibold">{t.mainGrapes}</h3>
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
                <h3 className="font-heading text-lg font-semibold">{t.highlightedRegions}</h3>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.pairings}</h2>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.subtypesAndVariants}</h2>
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
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.winerimReading}</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.howPerceivedThisStyle}</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: t.whatCommunicates, text: data.cartaCommunication },
              { icon: Users, title: t.clientType, text: data.clientProfile },
              { icon: Lightbulb, title: t.howSellBetter, text: data.sellByStrategy },
              { icon: ShieldCheck, title: t.whenSafe, text: data.whenSafe },
              { icon: TrendingUp, title: t.whenDifferential, text: data.whenDifferential },
              { icon: Wine, title: t.whenPremium, text: data.whenPremium },
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
                  <h3 className="font-heading text-base font-semibold">{t.competesWithLabel}</h3>
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
                <h3 className="font-heading text-base font-semibold mb-3">{t.bestForConcepts}</h3>
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
              <h3 className="font-heading text-lg font-semibold mb-4">{t.relatedStyles}</h3>
              <div className="flex flex-wrap gap-3">
                {data.relatedStyles.map(slug => {
                  const related = styleEntries.find(e => e.slug === slug || e.id === slug);
                  if (!related) return null;
                  return (
                    <Link
                      key={slug}
                      to={`/biblioteca-vino/estilos/${related.slug}`}
                      className="flex items-center gap-2 bg-gradient-card border border-border rounded-lg px-4 py-2 hover:border-wine/30 transition-all text-sm"
                    >
                      <span>{familyMeta[related.family].emoji}</span>
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
      {data.faqs.length > 0 && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{t.frequentQuestions}</h2>
            </ScrollReveal>
            <FAQSection faqs={data.faqs} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
                  {t.wantChartWorkThisIntelligence}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  {t.winerimOrganizes}
                </p>
                <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  {t.requestDemo} <ArrowRight size={16} />
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
const CatalogStyleDetail = ({ data }: { data: StyleCatalogEntry }) => {
  const { lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;
  const familyInfo = familyMeta[data.family];
  // Find parent style
  const parent = styleEntries.find(e => e.family === data.family);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${data.name}: Guía del Estilo de Vino | Winerim`}
        description={data.description}
        url={`https://winerim.wine/biblioteca-vino/estilos/${data.slug}`}
        type="article"
      />
      <Navbar />

      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: t.biblioteca, href: "/biblioteca-vino" },
            { label: t.styles, href: "/biblioteca-vino/estilos" },
            ...(parent ? [{ label: parent.name, href: `/biblioteca-vino/estilos/${parent.slug}` }] : []),
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
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t.temperature}</p>
              <p className="text-sm font-medium">{data.servingTemp}</p>
            </div>
            <div className="bg-gradient-card border border-border rounded-xl p-4">
              <Grape size={16} className="text-wine mb-2" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t.commonGrapes}</p>
              <p className="text-sm font-medium">{data.mainGrapes.join(", ")}</p>
            </div>
            <div className="bg-gradient-card border border-border rounded-xl p-4">
              <MapPin size={16} className="text-wine mb-2" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{t.highlightedRegions}</p>
              <p className="text-sm font-medium">{data.keyRegions.join(", ")}</p>
            </div>
          </div>

          {parent && (
            <Link to={`/biblioteca-vino/estilos/${parent.slug}`}
              className="inline-flex items-center gap-2 text-wine hover:underline text-sm font-medium"
            >
              ← Ver {parent.name} completo
            </Link>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">{t.discoverWinerimOrganizes}</h2>
              <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                {t.requestDemo} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StyleDetail;
