import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Grape, ArrowRight, Wine, AlertTriangle, Users, TrendingUp, Target, Lightbulb, MapPin } from "lucide-react";
import LinkedTag from "@/components/biblioteca/LinkedTag";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  getGrapeBySlug,
  getCatalogEntry,
  hasFullEntry,
  colorLabels,
} from "@/data/grapesLibrary";

/* i18n translations */
const i18n = {
  es: {
    biblioteca: "Biblioteca del Vino",
    varieties: "Variedades",
    alsoKnownAs: "También conocida como:",
    sensoryProfile: "Perfil sensorial",
    acidity: "Acidez",
    body: "Cuerpo",
    aromaticIntensity: "Intensidad aromática",
    recognition: "Reconocimiento",
    commercialDifficulty: "Dificultad comercial",
    scope: "Alcance",
    characteristicAromas: "Aromas característicos",
    countries: "Países",
    keyRegions: "Regiones clave",
    winerimVision: "Visión Winerim",
    howPerceivedInCarta: "Cómo se percibe en carta",
    perception: "Percepción en carta",
    whenItHelps: "Cuándo ayuda a vender",
    clientProfile: "Qué tipo de cliente la reconoce",
    howSellBetter: "Cómo vende mejor",
    whenWriteBig: "Cuándo escribir la uva en grande",
    usualCartaRole: "Rol habitual en carta",
    bestRegionsForSales: "Regiones donde más vende",
    competingVarieties: "Variedades que compiten",
    competingVarietiesDesc: "Variedades que ocupan un espacio similar en carta o percepción.",
    commonMistakes: "Errores comunes",
    suggestedPairings: "Maridajes sugeridos",
    continueExploring: "Sigue explorando",
    allVarieties: "Todas las variedades",
    winRegions: "Regiones vinícolas",
    winerimCore: "Winerim Core",
    requestDemo: "Solicitar demo",
    bringToCartaWithCriteria: "Lleva {name} a tu carta con criterio",
    winerimIntegrates: "Winerim integra datos de variedades, percepción y rol comercial para ayudarte a decidir qué vinos incluir, destacar o rotar.",
  },
  en: {
    biblioteca: "Wine Library",
    varieties: "Varieties",
    alsoKnownAs: "Also known as:",
    sensoryProfile: "Sensory Profile",
    acidity: "Acidity",
    body: "Body",
    aromaticIntensity: "Aromatic Intensity",
    recognition: "Recognition",
    commercialDifficulty: "Commercial Difficulty",
    scope: "Scope",
    characteristicAromas: "Characteristic Aromas",
    countries: "Countries",
    keyRegions: "Key Regions",
    winerimVision: "Winerim Vision",
    howPerceivedInCarta: "How It Is Perceived on Wine Lists",
    perception: "Perception on Wine Lists",
    whenItHelps: "When It Helps Sales",
    clientProfile: "Type of Client Who Recognizes It",
    howSellBetter: "How to Sell It Better",
    whenWriteBig: "When to Write the Grape in Large",
    usualCartaRole: "Usual Role on Wine Lists",
    bestRegionsForSales: "Regions Where It Sells Best",
    competingVarieties: "Competing Varieties",
    competingVarietiesDesc: "Varieties that occupy a similar space on wine lists or perception.",
    commonMistakes: "Common Mistakes",
    suggestedPairings: "Suggested Pairings",
    continueExploring: "Continue Exploring",
    allVarieties: "All Varieties",
    winRegions: "Wine Regions",
    winerimCore: "Winerim Core",
    requestDemo: "Request Demo",
    bringToCartaWithCriteria: "Bring {name} to Your Wine List with Criteria",
    winerimIntegrates: "Winerim integrates data on grape varieties, perception, and commercial role to help you decide which wines to include, highlight, or rotate.",
  },
  it: {
    biblioteca: "Biblioteca del Vino",
    varieties: "Varieta",
    alsoKnownAs: "Anche conosciuta come:",
    sensoryProfile: "Profilo Sensoriale",
    acidity: "Acidita",
    body: "Corpo",
    aromaticIntensity: "Intensita Aromatica",
    recognition: "Riconoscimento",
    commercialDifficulty: "Difficolta Commerciale",
    scope: "Portata",
    characteristicAromas: "Aromi Caratteristici",
    countries: "Paesi",
    keyRegions: "Regioni Principali",
    winerimVision: "Visione Winerim",
    howPerceivedInCarta: "Come Percepita nella Carta",
    perception: "Percezione nella Carta",
    whenItHelps: "Quando Aiuta la Vendita",
    clientProfile: "Tipo di Cliente che la Riconosce",
    howSellBetter: "Come Venderla Meglio",
    whenWriteBig: "Quando Scrivere l'Uva in Grande",
    usualCartaRole: "Ruolo Abituale nella Carta",
    bestRegionsForSales: "Regioni Dove Vende Meglio",
    competingVarieties: "Varieta Concorrenti",
    competingVarietiesDesc: "Varieta che occupano uno spazio simile nella carta dei vini o nella percezione.",
    commonMistakes: "Errori Comuni",
    suggestedPairings: "Abbinamenti Consigliati",
    continueExploring: "Continua Esplorando",
    allVarieties: "Tutte le Varieta",
    winRegions: "Regioni Vinicole",
    winerimCore: "Winerim Core",
    requestDemo: "Richiedi Demo",
    bringToCartaWithCriteria: "Porta {name} nella Tua Carta con Criterio",
    winerimIntegrates: "Winerim integra dati su varieta, percezione e ruolo commerciale per aiutarti a decidere quali vini includere, evidenziare o ruotare.",
  },
  fr: {
    biblioteca: "Bibliotheque du Vin",
    varieties: "Cepages",
    alsoKnownAs: "Egalement connu sous le nom de:",
    sensoryProfile: "Profil Sensoriel",
    acidity: "Acidite",
    body: "Corps",
    aromaticIntensity: "Intensite Aromatique",
    recognition: "Reconnaissance",
    commercialDifficulty: "Difficulte Commerciale",
    scope: "Portee",
    characteristicAromas: "Aromes Caracteristiques",
    countries: "Pays",
    keyRegions: "Regions Cles",
    winerimVision: "Vision Winerim",
    howPerceivedInCarta: "Comment Il Est Percu sur la Carte",
    perception: "Perception sur la Carte",
    whenItHelps: "Quand Cela Aide a la Vente",
    clientProfile: "Type de Client qui le Reconnait",
    howSellBetter: "Comment le Vendre Mieux",
    whenWriteBig: "Quand Ecrire le Cepage en Grand",
    usualCartaRole: "Role Habituel sur la Carte",
    bestRegionsForSales: "Regions ou Il se Vend le Mieux",
    competingVarieties: "Cepages Concurrents",
    competingVarietiesDesc: "Cepages qui occupent un espace similaire sur la carte ou dans la perception.",
    commonMistakes: "Erreurs Communes",
    suggestedPairings: "Accords Suggerez",
    continueExploring: "Continuer l'Exploration",
    allVarieties: "Tous les Cepages",
    winRegions: "Regions Vinicoles",
    winerimCore: "Winerim Core",
    requestDemo: "Demander une Demonstration",
    bringToCartaWithCriteria: "Apportez {name} a Votre Carte avec Critere",
    winerimIntegrates: "Winerim integre les donnees sur les cepages, la perception et le role commercial pour vous aider a decider quels vins inclure, mettre en evidence ou faire tourner.",
  },
  de: {
    biblioteca: "Weinbibliothek",
    varieties: "Rebsorten",
    alsoKnownAs: "Auch bekannt als:",
    sensoryProfile: "Sensorisches Profil",
    acidity: "Säure",
    body: "Körper",
    aromaticIntensity: "Aromaintensität",
    recognition: "Anerkennung",
    commercialDifficulty: "Geschäftliche Schwierigkeit",
    scope: "Reichweite",
    characteristicAromas: "Charakteristische Aromen",
    countries: "Länder",
    keyRegions: "Wichtigste Regionen",
    winerimVision: "Winerim-Sicht",
    howPerceivedInCarta: "Wie es auf der Weinkarte wahrgenommen wird",
    perception: "Wahrnehmung auf der Weinkarte",
    whenItHelps: "Wann es beim Verkauf hilft",
    clientProfile: "Kundentyp, der es erkennt",
    howSellBetter: "Wie man es besser verkauft",
    whenWriteBig: "Wann die Rebsorte gros schreiben",
    usualCartaRole: "Übliche Rolle auf der Weinkarte",
    bestRegionsForSales: "Regionen, wo es am besten verkauft",
    competingVarieties: "Konkurrierende Rebsorten",
    competingVarietiesDesc: "Rebsorten, die einen ähnlichen Platz auf der Weinkarte oder in der Wahrnehmung einnehmen.",
    commonMistakes: "Häufige Fehler",
    suggestedPairings: "Empfohlene Kombinationen",
    continueExploring: "Weitererkundung",
    allVarieties: "Alle Rebsorten",
    winRegions: "Weinregionen",
    winerimCore: "Winerim Core",
    requestDemo: "Demo anfordern",
    bringToCartaWithCriteria: "Bringen Sie {name} mit Kriterien auf Ihre Weinkarte",
    winerimIntegrates: "Winerim integriert Daten zu Rebsorten, Wahrnehmung und geschäftlicher Rolle, um Ihnen zu helfen, zu entscheiden, welche Weine einbezogen, hervorgehoben oder gewechselt werden sollen.",
  },
  pt: {
    biblioteca: "Biblioteca do Vinho",
    varieties: "Castas",
    alsoKnownAs: "Tambem conhecida como:",
    sensoryProfile: "Perfil Sensorial",
    acidity: "Acidez",
    body: "Corpo",
    aromaticIntensity: "Intensidade Aromatica",
    recognition: "Reconhecimento",
    commercialDifficulty: "Dificuldade Comercial",
    scope: "Alcance",
    characteristicAromas: "Aromas Caracteristicos",
    countries: "Paises",
    keyRegions: "Regioes Principais",
    winerimVision: "Visao Winerim",
    howPerceivedInCarta: "Como e Percebida na Carta",
    perception: "Percepcao na Carta",
    whenItHelps: "Quando Ajuda na Venda",
    clientProfile: "Tipo de Cliente que a Reconhece",
    howSellBetter: "Como Vender Melhor",
    whenWriteBig: "Quando Escrever a Casta em Grande",
    usualCartaRole: "Papel Habitual na Carta",
    bestRegionsForSales: "Regioes Onde Melhor Vende",
    competingVarieties: "Castas Concorrentes",
    competingVarietiesDesc: "Castas que ocupam um espaco similar na carta de vinhos ou na percepcao.",
    commonMistakes: "Erros Comuns",
    suggestedPairings: "Harmonizacoes Sugeridas",
    continueExploring: "Continuar Explorando",
    allVarieties: "Todas as Castas",
    winRegions: "Regioes Vinicolas",
    winerimCore: "Winerim Core",
    requestDemo: "Solicitar Demo",
    bringToCartaWithCriteria: "Leve {name} para sua Carta com Criterio",
    winerimIntegrates: "Winerim integra dados de castas, percepcao e papel comercial para ajuda-lo a decidir quais vinhos incluir, destacar ou rodar.",
  },
};

const levelLabels: Record<string, string> = {
  baja: "Baja", media: "Media", alta: "Alta", "muy-alta": "Muy alta",
  ligero: "Ligero", medio: "Medio", alto: "Alto", "muy-alto": "Muy alto",
  sutil: "Sutil",
  fácil: "Fácil", difícil: "Difícil", "muy-difícil": "Muy difícil",
  internacional: "Internacional", nacional: "Nacional", local: "Local", diferencial: "Diferencial",
};

const GrapeDetail = () => {
  const { allLangPaths } = useLanguage();
  const { grape: grapeSlug } = useParams<{ grape: string }>();
  const fullEntry = grapeSlug ? getGrapeBySlug(grapeSlug) : undefined;
  const catalogEntry = grapeSlug ? getCatalogEntry(grapeSlug) : undefined;

  // JSON-LD
  useEffect(() => {
    const entry = fullEntry || catalogEntry;
    if (!entry) return;
    const schema = document.createElement("script");
    schema.id = "grape-detail-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.name,
      description: fullEntry?.description || entry.tastingNotes,
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      mainEntityOfPage: `https://winerim.wine/biblioteca-vino/uvas/${entry.slug}`,
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("grape-detail-jsonld")?.remove(); };
  }, [fullEntry, catalogEntry, grapeSlug]);

  if (!fullEntry && !catalogEntry) {
    return <Navigate to="/biblioteca-vino/uvas" replace />;
  }

  // Render full entry if available, otherwise a simplified catalog view
  if (fullEntry) return <FullGrapeDetail data={fullEntry} />;
  return <CatalogGrapeDetail data={catalogEntry!} />;
};

/* ═══════════════════════════════════════════════════════════════════════
   FULL DETAIL — Complete Winerim layer
   ═══════════════════════════════════════════════════════════════════════ */
const FullGrapeDetail = ({ data }: { data: NonNullable<ReturnType<typeof getGrapeBySlug>> }) => {
  const { lang, allLangPaths } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;
  return (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={data.seo.title}
      description={data.seo.description}
      url={`https://winerim.wine/biblioteca-vino/uvas/${data.slug}`}
      type="article"
        hreflang={allLangPaths("/biblioteca-vino/uvas")}
    />
    <Navbar />

    {/* HERO */}
    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: t.biblioteca, href: "/biblioteca-vino" },
          { label: t.varieties, href: "/biblioteca-vino/uvas" },
          { label: data.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
            <span>{colorLabels[data.color].emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{colorLabels[data.color].label}</span>
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-wine/10 text-wine px-3 py-1.5 rounded-full capitalize cursor-help">{levelLabels[data.scope] || data.scope}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-xs">
              {data.scope === "internacional" && "Variedad reconocida y cultivada en todo el mundo. Fácil de identificar para cualquier comensal."}
              {data.scope === "nacional" && "Variedad reconocida principalmente en su país de origen. Apela al público local y conocedor."}
              {data.scope === "local" && "Variedad de alcance regional. Ideal para diferenciación y storytelling de territorio."}
              {data.scope === "diferencial" && "Variedad que destaca por su singularidad. Permite posicionar la carta como experta."}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs bg-secondary/50 px-3 py-1.5 rounded-full cursor-help">Reconocimiento: {levelLabels[data.clientRecognition] || data.clientRecognition}</span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-xs">
              {data.clientRecognition === "muy-alto" && "La mayoría de comensales la reconocen por nombre. Se vende sola."}
              {data.clientRecognition === "alto" && "Reconocida por el público aficionado. No requiere explicación."}
              {data.clientRecognition === "medio" && "Conocida por quien sabe de vino. Puede necesitar una breve descripción en carta."}
              {data.clientRecognition === "bajo" && "Poco conocida fuera de su zona. Requiere storytelling o recomendación de sala."}
              {data.clientRecognition === "nicho" && "Variedad de culto. Solo la reconocen expertos. Gran potencial diferenciador."}
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          {data.name}
        </motion.h1>

        {data.synonyms.length > 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground mb-4">
            También conocida como: <span className="italic">{data.synonyms.join(", ")}</span>
          </motion.p>
        )}

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
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

    {/* SENSORY PROFILE */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.sensoryProfile}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <FactCard icon={<Wine size={16} />} label={t.acidity} value={levelLabels[data.acidity]} />
          <FactCard icon={<Target size={16} />} label={t.body} value={levelLabels[data.body]} />
          <FactCard icon={<Grape size={16} />} label={t.aromaticIntensity} value={levelLabels[data.aromaticIntensity]} />
          <FactCard icon={<TrendingUp size={16} />} label={t.recognition} value={levelLabels[data.clientRecognition]} />
          <FactCard icon={<Users size={16} />} label={t.commercialDifficulty} value={levelLabels[data.commercialDifficulty]} />
          <FactCard icon={<MapPin size={16} />} label={t.scope} value={levelLabels[data.scope]} />
        </div>

        <ScrollReveal>
          <h3 className="font-heading text-lg font-semibold mb-4">{t.characteristicAromas}</h3>
          <div className="flex flex-wrap gap-2">
            {data.aromas.map((a) => (
              <span key={a} className="bg-wine/10 text-wine border border-wine/20 px-3 py-1.5 rounded-full text-sm">{a}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* REGIONS & COUNTRIES */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-semibold mb-4">{t.countries}</h2>
            <div className="flex flex-wrap gap-2">
              {data.countries.map((c) => (
                <span key={c} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading text-xl font-semibold mb-4">{t.keyRegions}</h2>
            <div className="flex flex-wrap gap-2">
              {data.keyRegions.map((r) => (
                <LinkedTag key={r} name={r} hint="region" />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* WINERIM LAYER */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb size={18} className="text-wine" />
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{t.winerimVision}</p>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.howPerceivedInCarta}</h2>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal><WinerimBlock title={t.perception} content={data.cartaPerception} /></ScrollReveal>
          <ScrollReveal delay={0.05}><WinerimBlock title={t.whenItHelps} content={data.whenItHelps} /></ScrollReveal>
          <ScrollReveal delay={0.1}><WinerimBlock title={t.clientProfile} content={data.clientProfile} /></ScrollReveal>
          <ScrollReveal delay={0.15}><WinerimBlock title={t.howSellBetter} content={data.sellByStrategy} /></ScrollReveal>
          <ScrollReveal delay={0.2}><WinerimBlock title={t.whenWriteBig} content={data.whenToWriteBig} /></ScrollReveal>
        </div>

        <ScrollReveal delay={0.25} className="mt-8">
          <h3 className="font-heading text-lg font-semibold mb-3">{t.usualCartaRole}</h3>
          <div className="flex flex-wrap gap-3">
            {data.cartaRole.map((role) => {
              const tooltips: Record<string, string> = {
                conocida: "Variedad que el comensal identifica sin ayuda. Aporta seguridad a la carta.",
                diferencial: "Variedad que distingue tu carta de la competencia. Genera curiosidad.",
                premium: "Variedad asociada a vinos de alta gama. Eleva la percepción de la carta.",
                descubrimiento: "Variedad poco conocida que sorprende. Ideal para clientes aventureros.",
                valor: "Variedad que ofrece buena relación calidad-precio. Ancla de la carta.",
                identitaria: "Variedad que conecta con un territorio o tradición. Aporta autenticidad.",
              };
              return (
                <Tooltip key={role}>
                  <TooltipTrigger asChild>
                    <span className="bg-wine/10 text-wine border border-wine/20 px-4 py-2 rounded-full text-sm font-medium capitalize cursor-help">{role}</span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs text-xs">
                    {tooltips[role] || role}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </ScrollReveal>

        {data.bestRegionsForSales.length > 0 && (
          <ScrollReveal delay={0.3} className="mt-8">
            <h3 className="font-heading text-lg font-semibold mb-3">{t.bestRegionsForSales}</h3>
            <div className="flex flex-wrap gap-2">
              {data.bestRegionsForSales.map((r) => (
                <span key={r} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{r}</span>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>

    {/* COMPETING VARIETIES */}
    {data.competingVarieties.length > 0 && (
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.competingVarieties}</h2>
            <p className="text-muted-foreground text-sm mt-2">{t.competingVarietiesDesc}</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {data.competingVarieties.map((v) => {
                const hasFull = hasFullEntry(v);
                return hasFull ? (
                  <Link key={v} to={`/biblioteca-vino/uvas/${v}`}
                    className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm hover:border-wine/30 hover:text-wine transition-all capitalize">
                    {v.replace(/-/g, " ")}
                  </Link>
                ) : (
                  <span key={v} className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm capitalize">{v.replace(/-/g, " ")}</span>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    )}

    {/* COMMON MISTAKES */}
    {data.commonMistakes.length > 0 && (
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={18} className="text-wine" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.commonMistakes}</h2>
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
    {data.pairings.length > 0 && (
      <section className="section-padding">
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
    <FAQSection faqs={data.faqs} schemaId={`grape-${data.slug}`} />

    {/* INTERNAL LINKS */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="mb-8">
          <h2 className="font-heading text-xl font-semibold">{t.continueExploring}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { to: "/biblioteca-vino/uvas", label: t.allVarieties },
            { to: "/biblioteca-vino/regiones", label: t.winRegions },
            { to: "/biblioteca-vino", label: t.biblioteca },
            { to: "/producto/winerim-core", label: t.winerimCore },
            { to: "/demo", label: t.requestDemo },
          ].map((link) => (
            <Link key={link.to} to={link.to}
              className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group">
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
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              {t.bringToCartaWithCriteria.replace('{name}', data.name)} <span className="text-gradient-wine italic"></span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm">
              {t.winerimIntegrates}
            </p>
            <Link to="/demo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
              {t.requestDemo} <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);
}

/* ═══════════════════════════════════════════════════════════════════════
   CATALOG DETAIL — Simplified view for grapes without full Winerim layer
   ═══════════════════════════════════════════════════════════════════════ */
const CatalogGrapeDetail = ({ data }: { data: NonNullable<ReturnType<typeof getCatalogEntry>> }) => {
  const { lang } = useLanguage();
  const t = i18n[lang as keyof typeof i18n] ?? i18n.es;
  return (
  <div className="min-h-screen bg-background text-foreground">
    <SEOHead
      title={`${data.name}: Variedad de uva | Biblioteca Winerim`}
      description={`${data.name}: ${data.tastingNotes} Regiones: ${data.keyRegions.join(", ")}. Guía Winerim.`}
      url={`https://winerim.wine/biblioteca-vino/uvas/${data.slug}`}
    />
    <Navbar />

    <section className="relative flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
        <Breadcrumbs items={[
          { label: t.biblioteca, href: "/biblioteca-vino" },
          { label: t.varieties, href: "/biblioteca-vino/uvas" },
          { label: data.name },
        ]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5">
            <span>{colorLabels[data.color].emoji}</span>
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{colorLabels[data.color].label}</span>
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          {data.name}
        </motion.h1>

        {data.synonyms.length > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            {t.alsoKnownAs} <span className="italic">{data.synonyms.join(", ")}</span>
          </p>
        )}

        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{data.tastingNotes}</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{t.countries}</h2>
            <div className="flex flex-wrap gap-2">
              {data.countries.map((c) => (
                <span key={c} className="bg-secondary/50 border border-border px-3 py-1.5 rounded-full text-sm">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{t.keyRegions}</h2>
            <div className="flex flex-wrap gap-2">
              {data.keyRegions.map((r) => (
                <LinkedTag key={r} name={r} hint="region" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* INTERNAL LINKS */}
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-xl font-semibold mb-6">{t.continueExploring}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { to: "/biblioteca-vino/uvas", label: t.allVarieties },
            { to: "/biblioteca-vino/regiones", label: t.winRegions },
            { to: "/biblioteca-vino", label: t.biblioteca },
            { to: "/demo", label: t.requestDemo },
          ].map((link) => (
            <Link key={link.to} to={link.to}
              className="flex items-center justify-between bg-gradient-card rounded-xl border border-border p-4 hover:border-wine/30 transition-all group">
              <span className="text-sm font-medium group-hover:text-wine transition-colors">{link.label}</span>
              <ArrowRight size={14} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
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
    <p className="font-heading text-sm font-semibold">{value}</p>
  </div>
);

const WinerimBlock = ({ title, content }: { title: string; content: string }) => (
  <div className="bg-gradient-card rounded-xl border border-border p-6">
    <h3 className="font-heading text-sm font-semibold text-wine mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
  </div>
);

export default GrapeDetail;
