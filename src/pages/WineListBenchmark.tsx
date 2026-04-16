import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, Globe, TrendingUp,
  GlassWater, Layers, MapPin
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import { getI18n } from "@/i18n/types";

/* ─── i18n ─── */
type T = {
  seoTitle: string; seoDesc: string; seoUrl: string;
  breadTools: string; breadLabel: string;
  badge: string; heroTitle1: string; heroHighlight: string;
  heroDesc: string;
  stats: { label: string; value: string; sub: string }[];
  countries: string[];
  styles: string[];
  chartLabel: string; chartTitle1: string; chartHighlight: string;
  chartCountry: string; chartStyle: string; chartRange: string; chartTrend: string;
  priceMean: string; percentage: string;
  ctaLabel: string; ctaTitle1: string; ctaHighlight: string;
  ctaDesc: string; ctaCta: string;
  stratDecides: string[]; stratAvoids: string[]; stratImpact: string[];
  links: { to: string; label: string; type: "guide" | "tool" }[];
};

const es: T = {
  seoTitle: "Wine List Benchmark – Estadísticas de cartas de vinos | Winerim",
  seoDesc: "Estadísticas agregadas del mercado de cartas de vinos: referencias medias, precios por botella y copa, distribución de estilos y precios por país.",
  seoUrl: "https://winerim.wine/wine-list-benchmark",
  breadTools: "Herramientas", breadLabel: "Wine List Benchmark",
  badge: "Datos de mercado",
  heroTitle1: "Wine List ", heroHighlight: "Benchmark",
  heroDesc: "Estadísticas agregadas de cartas de vinos en restaurantes. Compara tu carta con el mercado y detecta oportunidades.",
  stats: [
    { label: "Referencias medias", value: "42", sub: "por restaurante" },
    { label: "Precio medio botella", value: "32 €", sub: "en carta" },
    { label: "Precio medio copa", value: "7,50 €", sub: "vino por copa" },
    { label: "% vino por copa", value: "18%", sub: "de las referencias" },
  ],
  countries: ["España", "Francia", "Italia", "Portugal", "Argentina", "Chile"],
  styles: ["Tinto", "Blanco", "Espumoso", "Rosado", "Dulce/Generoso"],
  chartLabel: "Análisis detallado",
  chartTitle1: "Datos del mercado de ", chartHighlight: "cartas de vinos",
  chartCountry: "Precio medio por país de origen",
  chartStyle: "Distribución por estilo",
  chartRange: "Distribución por rango de precio",
  chartTrend: "Tendencia anual",
  priceMean: "Precio medio", percentage: "Porcentaje",
  ctaLabel: "Compara tu carta",
  ctaTitle1: "Analiza tu carta frente al ", ctaHighlight: "mercado",
  ctaDesc: "Sube tu carta de vinos y compárala con las estadísticas del sector. Descubre dónde estás por encima o por debajo de la media.",
  ctaCta: "Analizar mi carta",
  stratDecides: [
    "Si tu carta está equilibrada frente al mercado en estilos, países y rangos de precio",
    "Qué franjas de precio o estilos están infrarrepresentados respecto a la media del sector",
    "Si tu oferta de vino por copa es competitiva comparada con otros restaurantes similares",
  ],
  stratAvoids: [
    "Montar una carta sin referencia de mercado ni datos comparativos",
    "Sobrecargar un estilo o rango de precio por inercia sin saber qué hace la competencia",
    "Ignorar tendencias de consumo que están ganando tracción en tu segmento",
  ],
  stratImpact: [
    "Carta alineada con la demanda real del mercado y no solo con la oferta del distribuidor",
    "Detección de huecos y oportunidades de diferenciación por franja de precio o estilo",
    "Decisiones de surtido basadas en datos comparativos, no en intuición",
  ],
  links: [
    { to: "/blog/cuantos-vinos-carta-restaurante", label: "Cuántos vinos en carta", type: "guide" },
    { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta", type: "guide" },
    { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
    { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
  ],
};

const en: T = {
  seoTitle: "Wine List Benchmark – Wine List Market Statistics | Winerim",
  seoDesc: "Aggregated wine list market data: average references, bottle and glass prices, style distribution and prices by country.",
  seoUrl: "https://winerim.wine/en/wine-list-benchmark",
  breadTools: "Tools", breadLabel: "Wine List Benchmark",
  badge: "Market data",
  heroTitle1: "Wine List ", heroHighlight: "Benchmark",
  heroDesc: "Aggregated wine list statistics from restaurants. Compare your list with the market and spot opportunities.",
  stats: [
    { label: "Average references", value: "42", sub: "per restaurant" },
    { label: "Average bottle price", value: "€32", sub: "on the list" },
    { label: "Average glass price", value: "€7.50", sub: "wine by the glass" },
    { label: "% by the glass", value: "18%", sub: "of references" },
  ],
  countries: ["Spain", "France", "Italy", "Portugal", "Argentina", "Chile"],
  styles: ["Red", "White", "Sparkling", "Rosé", "Sweet/Fortified"],
  chartLabel: "Detailed analysis",
  chartTitle1: "Wine list ", chartHighlight: "market data",
  chartCountry: "Average price by country of origin",
  chartStyle: "Distribution by style",
  chartRange: "Distribution by price range",
  chartTrend: "Annual trend",
  priceMean: "Average price", percentage: "Percentage",
  ctaLabel: "Compare your list",
  ctaTitle1: "Analyse your list against the ", ctaHighlight: "market",
  ctaDesc: "Upload your wine list and compare it with industry statistics. Find where you're above or below average.",
  ctaCta: "Analyse my list",
  stratDecides: [
    "Whether your list is balanced vs. the market in styles, countries and price ranges",
    "Which price bands or styles are underrepresented compared to the sector average",
    "Whether your by-the-glass offer is competitive vs. similar restaurants",
  ],
  stratAvoids: [
    "Building a list without market benchmarks or comparative data",
    "Overloading a style or price range by inertia without knowing the competition",
    "Ignoring consumption trends gaining traction in your segment",
  ],
  stratImpact: [
    "List aligned with real market demand, not just the distributor's offering",
    "Detection of gaps and differentiation opportunities by price band or style",
    "Assortment decisions based on comparative data, not intuition",
  ],
  links: [
    { to: "/blog/cuantos-vinos-carta-restaurante", label: "How many wines on a list", type: "guide" },
    { to: "/blog/como-organizar-carta-de-vinos", label: "How to organise a list", type: "guide" },
    { to: "/wine-list-analyzer", label: "Wine list analyser", type: "tool" },
    { to: "/calculadora-margen-vino", label: "Margin calculator", type: "tool" },
  ],
};

const it: T = {
  seoTitle: "Wine List Benchmark – Statistiche carte dei vini | Winerim",
  seoDesc: "Dati aggregati del mercato delle carte dei vini: referenze medie, prezzi per bottiglia e calice, distribuzione per stile e paese.",
  seoUrl: "https://winerim.wine/it/wine-list-benchmark",
  breadTools: "Strumenti", breadLabel: "Wine List Benchmark",
  badge: "Dati di mercato",
  heroTitle1: "Wine List ", heroHighlight: "Benchmark",
  heroDesc: "Statistiche aggregate delle carte dei vini nei ristoranti. Confronta la tua carta con il mercato e scopri opportunità.",
  stats: [
    { label: "Referenze medie", value: "42", sub: "per ristorante" },
    { label: "Prezzo medio bottiglia", value: "32 €", sub: "in carta" },
    { label: "Prezzo medio calice", value: "7,50 €", sub: "vino al calice" },
    { label: "% vino al calice", value: "18%", sub: "delle referenze" },
  ],
  countries: ["Spagna", "Francia", "Italia", "Portogallo", "Argentina", "Cile"],
  styles: ["Rosso", "Bianco", "Spumante", "Rosato", "Dolce/Fortificato"],
  chartLabel: "Analisi dettagliata",
  chartTitle1: "Dati di mercato delle ", chartHighlight: "carte dei vini",
  chartCountry: "Prezzo medio per paese di origine",
  chartStyle: "Distribuzione per stile",
  chartRange: "Distribuzione per fascia di prezzo",
  chartTrend: "Tendenza annuale",
  priceMean: "Prezzo medio", percentage: "Percentuale",
  ctaLabel: "Confronta la tua carta",
  ctaTitle1: "Analizza la tua carta rispetto al ", ctaHighlight: "mercato",
  ctaDesc: "Carica la tua carta dei vini e confrontala con le statistiche del settore. Scopri dove sei sopra o sotto la media.",
  ctaCta: "Analizza la mia carta",
  stratDecides: [
    "Se la tua carta è equilibrata rispetto al mercato per stili, paesi e fasce di prezzo",
    "Quali fasce di prezzo o stili sono sottorappresentati rispetto alla media del settore",
    "Se la tua offerta al calice è competitiva rispetto a ristoranti simili",
  ],
  stratAvoids: [
    "Costruire una carta senza riferimenti di mercato né dati comparativi",
    "Sovraccaricare uno stile o fascia di prezzo per inerzia senza conoscere la concorrenza",
    "Ignorare tendenze di consumo in crescita nel tuo segmento",
  ],
  stratImpact: [
    "Carta allineata alla domanda reale del mercato e non solo all'offerta del distributore",
    "Rilevamento di lacune e opportunità di differenziazione per fascia di prezzo o stile",
    "Decisioni di assortimento basate su dati comparativi, non sull'intuizione",
  ],
  links: [
    { to: "/blog/cuantos-vinos-carta-restaurante", label: "Quanti vini in carta", type: "guide" },
    { to: "/blog/como-organizar-carta-de-vinos", label: "Come organizzare una carta", type: "guide" },
    { to: "/wine-list-analyzer", label: "Analizzatore carta", type: "tool" },
    { to: "/calculadora-margen-vino", label: "Calcolatore margini", type: "tool" },
  ],
};

const fr: T = {
  seoTitle: "Wine List Benchmark – Statistiques des cartes des vins | Winerim",
  seoDesc: "Données agrégées du marché des cartes des vins : références moyennes, prix par bouteille et verre, distribution par style et pays.",
  seoUrl: "https://winerim.wine/fr/wine-list-benchmark",
  breadTools: "Outils", breadLabel: "Wine List Benchmark",
  badge: "Données marché",
  heroTitle1: "Wine List ", heroHighlight: "Benchmark",
  heroDesc: "Statistiques agrégées des cartes des vins en restauration. Comparez votre carte avec le marché et détectez les opportunités.",
  stats: [
    { label: "Références moyennes", value: "42", sub: "par restaurant" },
    { label: "Prix moyen bouteille", value: "32 €", sub: "en carte" },
    { label: "Prix moyen verre", value: "7,50 €", sub: "vin au verre" },
    { label: "% vin au verre", value: "18%", sub: "des références" },
  ],
  countries: ["Espagne", "France", "Italie", "Portugal", "Argentine", "Chili"],
  styles: ["Rouge", "Blanc", "Effervescent", "Rosé", "Moelleux/Muté"],
  chartLabel: "Analyse détaillée",
  chartTitle1: "Données du marché des ", chartHighlight: "cartes des vins",
  chartCountry: "Prix moyen par pays d'origine",
  chartStyle: "Répartition par style",
  chartRange: "Répartition par gamme de prix",
  chartTrend: "Tendance annuelle",
  priceMean: "Prix moyen", percentage: "Pourcentage",
  ctaLabel: "Comparez votre carte",
  ctaTitle1: "Analysez votre carte face au ", ctaHighlight: "marché",
  ctaDesc: "Téléchargez votre carte des vins et comparez-la aux statistiques du secteur. Découvrez où vous êtes au-dessus ou en-dessous de la moyenne.",
  ctaCta: "Analyser ma carte",
  stratDecides: [
    "Si votre carte est équilibrée par rapport au marché en styles, pays et gammes de prix",
    "Quelles gammes de prix ou styles sont sous-représentés par rapport à la moyenne du secteur",
    "Si votre offre au verre est compétitive comparée à des restaurants similaires",
  ],
  stratAvoids: [
    "Construire une carte sans référence de marché ni données comparatives",
    "Surcharger un style ou une gamme de prix par inertie sans connaître la concurrence",
    "Ignorer les tendances de consommation en progression dans votre segment",
  ],
  stratImpact: [
    "Carte alignée sur la demande réelle du marché et pas seulement sur l'offre du distributeur",
    "Détection de lacunes et d'opportunités de différenciation par gamme de prix ou style",
    "Décisions d'assortiment basées sur des données comparatives, pas sur l'intuition",
  ],
  links: [
    { to: "/blog/cuantos-vinos-carta-restaurante", label: "Combien de vins en carte", type: "guide" },
    { to: "/blog/como-organizar-carta-de-vinos", label: "Comment organiser une carte", type: "guide" },
    { to: "/wine-list-analyzer", label: "Analyseur de carte", type: "tool" },
    { to: "/calculadora-margen-vino", label: "Calculateur de marges", type: "tool" },
  ],
};

const i18n: Record<string, T> = { es, en, it, fr };

/* ─── Chart data (prices are language-independent) ─── */
const priceValues = [28, 42, 35, 24, 26, 22];
const fills = [
  "hsl(var(--wine))", "hsl(var(--wine) / 0.85)", "hsl(var(--wine) / 0.7)",
  "hsl(var(--wine) / 0.55)", "hsl(var(--wine) / 0.45)", "hsl(var(--wine) / 0.35)",
];
const styleValues = [45, 28, 12, 8, 7];
const styleFills = [
  "hsl(var(--wine))", "hsl(var(--wine) / 0.6)", "hsl(var(--wine) / 0.4)",
  "hsl(var(--wine) / 0.25)", "hsl(var(--muted-foreground) / 0.5)",
];

const priceRanges = [
  { range: "< 20 €", pct: 15 }, { range: "20–30 €", pct: 28 },
  { range: "30–45 €", pct: 30 }, { range: "45–60 €", pct: 15 },
  { range: "60–90 €", pct: 8 }, { range: "> 90 €", pct: 4 },
];

const monthlyTrend = [
  { month: "Jan", refs: 38, price: 30 }, { month: "Feb", refs: 39, price: 30.5 },
  { month: "Mar", refs: 40, price: 31 }, { month: "Apr", refs: 41, price: 31.2 },
  { month: "May", refs: 41, price: 31.5 }, { month: "Jun", refs: 42, price: 32 },
  { month: "Jul", refs: 43, price: 32.5 }, { month: "Aug", refs: 42, price: 32.2 },
  { month: "Sep", refs: 43, price: 32.8 }, { month: "Oct", refs: 44, price: 33 },
  { month: "Nov", refs: 43, price: 32.5 }, { month: "Dec", refs: 42, price: 32 },
];

const statIcons = [Wine, TrendingUp, GlassWater, Layers];
const formatEur = (n: number) => `${n} €`;

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any, names: string[]) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.07 ? (
    <text x={x} y={y} fill="hsl(var(--foreground))" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {names[index]}
    </text>
  ) : null;
};

const WineListBenchmark = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

  const priceByCountry = t.countries.map((country, i) => ({ country, price: priceValues[i], fill: fills[i] }));
  const styleDistribution = t.styles.map((name, i) => ({ name, value: styleValues[i], fill: styleFills[i] }));

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "benchmark-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t.seoTitle,
      description: t.seoDesc,
      author: { "@type": "Organization", name: "Winerim" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("benchmark-jsonld")?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={t.seoUrl}
        hreflang={allLangPaths("/wine-list-benchmark")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadTools, href: localePath("/herramientas") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.stats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 text-center">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-wine" />
                  </div>
                  <p className="font-heading text-3xl font-bold text-wine mb-1">{s.value}</p>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CHARTS ROW 1 */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.chartLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.chartTitle1}<span className="text-gradient-wine italic">{t.chartHighlight}</span>
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <Globe size={16} className="text-wine" /> {t.chartCountry}
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={priceByCountry} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}€`} />
                    <YAxis type="category" dataKey="country" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [formatEur(v), t.priceMean]} />
                    <Bar dataKey="price" radius={[0, 6, 6, 0]}>
                      {priceByCountry.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <Wine size={16} className="text-wine" /> {t.chartStyle}
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={styleDistribution} cx="50%" cy="50%" outerRadius={110} innerRadius={50} dataKey="value" labelLine={false} label={(props: any) => renderCustomLabel(props, t.styles)}>
                      {styleDistribution.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, t.percentage]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {styleDistribution.map((s, i) => (
                    <span key={i} className="text-xs flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
                      {s.name} ({s.value}%)
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CHARTS ROW 2 */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-6">
              <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-wine" /> {t.chartRange}
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={priceRanges} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="range" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`${v}%`, t.percentage]} />
                  <Bar dataKey="pct" fill="hsl(var(--wine))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="bg-gradient-card rounded-2xl border border-border p-6">
              <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-wine" /> {t.chartTrend}
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}€`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line yAxisId="left" type="monotone" dataKey="refs" stroke="hsl(var(--wine))" strokeWidth={2} dot={false} name="References" />
                  <Line yAxisId="right" type="monotone" dataKey="price" stroke="hsl(var(--wine) / 0.5)" strokeWidth={2} dot={false} name={`${t.priceMean} (€)`} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ToolStrategicBlock
        layer="core"
        decides={t.stratDecides}
        avoids={t.stratAvoids}
        impact={t.stratImpact}
      />

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.ctaTitle1}<span className="text-gradient-wine italic">{t.ctaHighlight}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.ctaDesc}</p>
              <Link to={localePath("/wine-list-analyzer")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.ctaCta} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default WineListBenchmark;
