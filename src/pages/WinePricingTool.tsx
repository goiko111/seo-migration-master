import { useState, useMemo, useEffect, useRef } from "react";
import { trackAction } from "@/lib/intentTracking";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, TrendingUp, Calculator, DollarSign,
  Store, Tag, Layers, Info, BarChart3, CheckCircle
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

const i18n: I18nMap<Record<string, any>> = {
  es: {
    seo_title: "Wine Pricing Optimizer – Precio óptimo de vino | Winerim",
    seo_desc: "Calcula el precio de venta óptimo para cada vino de tu carta. Herramienta gratuita con multiplicadores, posicionamiento y psicología de precios.",
    badge: "Herramienta gratuita",
    h1_1: "Wine Pricing", h1_2: "Optimizer",
    subtitle: "Encuentra el precio de venta óptimo para cada vino de tu carta. Maximiza márgenes sin perder ventas.",
    bread_tools: "Herramientas", bread_self: "Wine Pricing Optimizer",
    params: "Parámetros",
    cost_label: "Precio de compra",
    rest_label: "Tipo de restaurante",
    ticket_label: "Ticket medio",
    wine_label: "Tipo de vino",
    recommended: "Precio recomendado",
    multiplier: "multiplicador", margin_label: "margen",
    range_title: "Rango de precios", price_label: "Precio",
    psychology_title: "Psicología de precios",
    cost_chart: "Coste", min_chart: "Mínimo", rec_chart: "Recomendado", max_chart: "Máximo",
    rest_types: [
      { value: "bistro", label: "Bistró / Taberna" }, { value: "casual", label: "Casual dining" },
      { value: "winebar", label: "Wine bar" }, { value: "gastro", label: "Gastronómico" },
      { value: "hotel", label: "Hotel / Resort" },
    ],
    wine_types: [
      { value: "house", label: "Vino de la casa" }, { value: "mid", label: "Gama media" },
      { value: "premium", label: "Premium" }, { value: "icon", label: "Icónico / Gran reserva" },
    ],
    positioning: {
      house: { title: "Entrada de carta", desc: "Primer vino que el cliente ve. Debe ser atractivo en precio y calidad para generar confianza." },
      mid: { title: "Zona media (sweet spot)", desc: "Donde se concentra el mayor volumen de ventas. El cliente lo percibe como buena relación calidad-precio." },
      premium: { title: "Zona alta", desc: "Para clientes que buscan algo especial. El multiplicador más bajo compensa con percepción de valor." },
      icon: { title: "Referencia aspiracional", desc: "Ancla de precio que hace que el resto de la carta parezca más accesible. Vende por prestigio." },
    },
    tips_low_cost: "En vinos de entrada, el cliente es muy sensible al precio. Cada euro cuenta.",
    tips_high_cost: "A partir de cierto precio de coste, el cliente valora más la historia del vino que el precio exacto.",
    tips_low_price: "Por debajo de 25 €, los clientes comparan con precios de supermercado. Justifica con contexto.",
    tips_high_price: "Por encima de 25 €, la decisión es más emocional. Las notas de cata y la recomendación son clave.",
    tips_round: "Evita precios que terminen en ,00 — los precios como {price} se perciben como más accesibles.",
    tips_compromise: "Coloca este vino entre uno más barato y uno más caro para activar el 'efecto de compromiso'.",
    cta_badge: "Optimización automática",
    cta_title_1: "Winerim optimiza los precios de", cta_title_2: "toda tu carta",
    cta_desc: "Deja de calcular vino a vino. Winerim analiza toda tu carta y te sugiere la estrategia de precios óptima.",
    cta_btn: "Solicitar demo",
    link_pricing: "Cómo poner precio al vino", link_margin: "Calculadora de márgenes",
    link_profitable: "Carta de vinos rentable", link_mapping: "Plantilla wine mapping",
    locale: "es-ES",
    decides: ["Qué precio poner a cada vino de tu carta", "Qué multiplicador aplicar según tipo y posicionamiento", "Si tu precio actual está por encima o por debajo del óptimo"],
    avoids: ["Usar un multiplicador fijo para toda la carta", "Fijar precios sin considerar la psicología del comensal", "Perder margen en vinos donde podrías cobrar más"],
    impact: ["Optimizar márgenes sin perder rotación", "Crear una escalera de precios coherente y sin saltos", "Mejorar la percepción de valor de toda la carta"],
  },
  en: {
    seo_title: "Wine Pricing Optimizer – Optimal Wine Price | Winerim",
    seo_desc: "Calculate the optimal selling price for each wine on your list. Free tool with multipliers, positioning and price psychology.",
    badge: "Free tool",
    h1_1: "Wine Pricing", h1_2: "Optimizer",
    subtitle: "Find the optimal selling price for each wine on your list. Maximise margins without losing sales.",
    bread_tools: "Tools", bread_self: "Wine Pricing Optimizer",
    params: "Parameters",
    cost_label: "Purchase price",
    rest_label: "Restaurant type",
    ticket_label: "Average ticket",
    wine_label: "Wine type",
    recommended: "Recommended price",
    multiplier: "multiplier", margin_label: "margin",
    range_title: "Price range", price_label: "Price",
    cost_chart: "Cost", min_chart: "Minimum", rec_chart: "Recommended", max_chart: "Maximum",
    rest_types: [
      { value: "bistro", label: "Bistro / Tavern" }, { value: "casual", label: "Casual dining" },
      { value: "winebar", label: "Wine bar" }, { value: "gastro", label: "Fine dining" },
      { value: "hotel", label: "Hotel / Resort" },
    ],
    wine_types: [
      { value: "house", label: "House wine" }, { value: "mid", label: "Mid-range" },
      { value: "premium", label: "Premium" }, { value: "icon", label: "Icon / Gran reserva" },
    ],
    positioning: {
      house: { title: "List entry point", desc: "First wine the guest sees. Must be attractive in price and quality to build trust." },
      mid: { title: "Sweet spot", desc: "Where most sales volume concentrates. Perceived as great value for money." },
      premium: { title: "Upper range", desc: "For guests seeking something special. Lower multiplier compensated by perceived value." },
      icon: { title: "Aspirational reference", desc: "Price anchor that makes the rest of the list feel more accessible. Sells on prestige." },
    },
    tips_low_cost: "With entry-level wines, the guest is very price-sensitive. Every euro counts.",
    tips_high_cost: "Above a certain cost, the guest values the wine's story more than the exact price.",
    tips_low_price: "Below €25, guests compare with supermarket prices. Justify with context (service, glassware, temperature).",
    tips_high_price: "Above €25, the decision is more emotional. Tasting notes and sommelier recommendations are key.",
    tips_round: "Avoid round prices ending in .00 — prices like {price} feel more accessible.",
    tips_compromise: "Place this wine between a cheaper and more expensive option to activate the 'compromise effect'.",
    cta_badge: "Automatic optimisation",
    cta_title_1: "Winerim optimises the prices of", cta_title_2: "your entire list",
    cta_desc: "Stop calculating wine by wine. Winerim analyses your whole list and suggests the optimal pricing strategy.",
    cta_btn: "Request demo",
    link_pricing: "How to price wine", link_margin: "Margin calculator",
    link_profitable: "Profitable wine list", link_mapping: "Wine mapping template",
    locale: "en-GB",
    decides: ["What price to set for each wine", "Which multiplier to apply by type and positioning", "Whether your current price is above or below optimal"],
    avoids: ["Using a fixed multiplier for the entire list", "Setting prices without considering guest psychology", "Losing margin on wines where you could charge more"],
    impact: ["Optimise margins without losing rotation", "Create a coherent price ladder without gaps", "Improve perceived value across the list"],
  },
  it: {
    seo_title: "Wine Pricing Optimizer – Prezzo Ottimale del Vino | Winerim",
    seo_desc: "Calcola il prezzo di vendita ottimale per ogni vino della tua carta. Strumento gratuito con moltiplicatori, posizionamento e psicologia dei prezzi.",
    badge: "Strumento gratuito",
    h1_1: "Wine Pricing", h1_2: "Optimizer",
    subtitle: "Trova il prezzo di vendita ottimale per ogni vino della tua carta. Massimizza i margini senza perdere vendite.",
    bread_tools: "Strumenti", bread_self: "Wine Pricing Optimizer",
    params: "Parametri",
    cost_label: "Prezzo d'acquisto",
    rest_label: "Tipo di ristorante",
    ticket_label: "Scontrino medio",
    wine_label: "Tipo di vino",
    recommended: "Prezzo consigliato",
    multiplier: "moltiplicatore", margin_label: "margine",
    range_title: "Intervallo prezzi", price_label: "Prezzo",
    cost_chart: "Costo", min_chart: "Minimo", rec_chart: "Consigliato", max_chart: "Massimo",
    rest_types: [
      { value: "bistro", label: "Bistrot / Trattoria" }, { value: "casual", label: "Casual dining" },
      { value: "winebar", label: "Wine bar" }, { value: "gastro", label: "Gastronomico" },
      { value: "hotel", label: "Hotel / Resort" },
    ],
    wine_types: [
      { value: "house", label: "Vino della casa" }, { value: "mid", label: "Gamma media" },
      { value: "premium", label: "Premium" }, { value: "icon", label: "Iconico / Gran riserva" },
    ],
    positioning: {
      house: { title: "Ingresso in carta", desc: "Primo vino che il cliente vede. Deve essere attraente per prezzo e qualità per generare fiducia." },
      mid: { title: "Zona media (sweet spot)", desc: "Dove si concentra il maggior volume di vendite. Percepito come ottimo rapporto qualità-prezzo." },
      premium: { title: "Zona alta", desc: "Per clienti che cercano qualcosa di speciale. Il moltiplicatore più basso è compensato dalla percezione di valore." },
      icon: { title: "Referenza aspirazionale", desc: "Ancora di prezzo che rende il resto della carta più accessibile. Vende per prestigio." },
    },
    tips_low_cost: "Nei vini entry-level, il cliente è molto sensibile al prezzo. Ogni euro conta.",
    tips_high_cost: "Oltre un certo costo, il cliente valorizza più la storia del vino che il prezzo esatto.",
    tips_low_price: "Sotto i 25€, i clienti confrontano con i prezzi del supermercato. Giustifica con il contesto.",
    tips_high_price: "Sopra i 25€, la decisione è più emotiva. Le note di degustazione e la raccomandazione sono fondamentali.",
    tips_round: "Evita prezzi che finiscono in ,00 — prezzi come {price} sono percepiti come più accessibili.",
    tips_compromise: "Posiziona questo vino tra uno più economico e uno più caro per attivare 'l'effetto compromesso'.",
    cta_badge: "Ottimizzazione automatica",
    cta_title_1: "Winerim ottimizza i prezzi di", cta_title_2: "tutta la tua carta",
    cta_desc: "Smetti di calcolare vino per vino. Winerim analizza tutta la carta e ti suggerisce la strategia prezzi ottimale.",
    cta_btn: "Richiedi demo",
    link_pricing: "Come prezzare il vino", link_margin: "Calcolatrice margini",
    link_profitable: "Carta dei vini redditizia", link_mapping: "Template wine mapping",
    locale: "it-IT",
    decides: ["Che prezzo dare a ciascun vino", "Quale moltiplicatore applicare per tipo e posizionamento", "Se il prezzo attuale è sopra o sotto l'ottimale"],
    avoids: ["Usare un moltiplicatore fisso per tutta la carta", "Fissare prezzi senza considerare la psicologia del cliente", "Perdere margine su vini dove potresti guadagnare di più"],
    impact: ["Ottimizzare i margini senza perdere rotazione", "Creare una scala prezzi coerente e senza salti", "Migliorare la percezione di valore di tutta la carta"],
  },
  fr: {
    seo_title: "Wine Pricing Optimizer – Prix Optimal du Vin | Winerim",
    seo_desc: "Calculez le prix de vente optimal pour chaque vin de votre carte. Outil gratuit avec multiplicateurs, positionnement et psychologie des prix.",
    badge: "Outil gratuit",
    h1_1: "Wine Pricing", h1_2: "Optimizer",
    subtitle: "Trouvez le prix de vente optimal pour chaque vin de votre carte. Maximisez les marges sans perdre de ventes.",
    bread_tools: "Outils", bread_self: "Wine Pricing Optimizer",
    params: "Paramètres",
    cost_label: "Prix d'achat",
    rest_label: "Type de restaurant",
    ticket_label: "Ticket moyen",
    wine_label: "Type de vin",
    recommended: "Prix recommandé",
    multiplier: "multiplicateur", margin_label: "marge",
    range_title: "Fourchette de prix", price_label: "Prix",
    cost_chart: "Coût", min_chart: "Minimum", rec_chart: "Recommandé", max_chart: "Maximum",
    rest_types: [
      { value: "bistro", label: "Bistrot / Taverne" }, { value: "casual", label: "Casual dining" },
      { value: "winebar", label: "Bar à vin" }, { value: "gastro", label: "Gastronomique" },
      { value: "hotel", label: "Hôtel / Resort" },
    ],
    wine_types: [
      { value: "house", label: "Vin de la maison" }, { value: "mid", label: "Milieu de gamme" },
      { value: "premium", label: "Premium" }, { value: "icon", label: "Iconique / Grande réserve" },
    ],
    positioning: {
      house: { title: "Entrée de carte", desc: "Premier vin que le client voit. Doit être attractif en prix et qualité pour établir la confiance." },
      mid: { title: "Sweet spot", desc: "Là où se concentre le plus gros volume de ventes. Perçu comme un excellent rapport qualité-prix." },
      premium: { title: "Haut de gamme", desc: "Pour les clients cherchant quelque chose de spécial. Le multiplicateur plus bas est compensé par la perception de valeur." },
      icon: { title: "Référence aspirationnelle", desc: "Ancre de prix qui rend le reste de la carte plus accessible. Se vend par le prestige." },
    },
    tips_low_cost: "Pour les vins d'entrée de gamme, le client est très sensible au prix. Chaque euro compte.",
    tips_high_cost: "Au-delà d'un certain coût, le client valorise davantage l'histoire du vin que le prix exact.",
    tips_low_price: "En dessous de 25€, les clients comparent avec les prix de supermarché. Justifiez par le contexte.",
    tips_high_price: "Au-dessus de 25€, la décision est plus émotionnelle. Les notes de dégustation et la recommandation sont clés.",
    tips_round: "Évitez les prix ronds en ,00 — des prix comme {price} sont perçus comme plus accessibles.",
    tips_compromise: "Placez ce vin entre un moins cher et un plus cher pour activer 'l'effet de compromis'.",
    cta_badge: "Optimisation automatique",
    cta_title_1: "Winerim optimise les prix de", cta_title_2: "toute votre carte",
    cta_desc: "Arrêtez de calculer vin par vin. Winerim analyse toute votre carte et vous suggère la stratégie de prix optimale.",
    cta_btn: "Demander une démo",
    link_pricing: "Comment fixer le prix du vin", link_margin: "Calculateur de marges",
    link_profitable: "Carte des vins rentable", link_mapping: "Template wine mapping",
    locale: "fr-FR",
    decides: ["Quel prix fixer pour chaque vin", "Quel multiplicateur appliquer selon le type et le positionnement", "Si votre prix actuel est au-dessus ou en dessous de l'optimal"],
    avoids: ["Utiliser un multiplicateur fixe pour toute la carte", "Fixer les prix sans considérer la psychologie du client", "Perdre de la marge sur des vins où vous pourriez facturer plus"],
    impact: ["Optimiser les marges sans perdre la rotation", "Créer une échelle de prix cohérente et sans sauts", "Améliorer la perception de valeur de toute la carte"],
  },
};

const restaurantMultipliers: Record<string, number[]> = {
  bistro: [2.5, 3.5], casual: [2.8, 3.8], winebar: [2.5, 3.2], gastro: [3.0, 4.5], hotel: [3.5, 5.0],
};
const wineAdjustments: Record<string, number> = { house: -0.3, mid: 0, premium: -0.4, icon: -0.8 };
const ticketAdjustments: Record<string, number> = { low: -0.2, mid: 0, high: 0.2, premium: 0.3 };
const ticketLabels: Record<string, string> = { low: "< 25 €", mid: "25 – 45 €", high: "45 – 80 €", premium: "> 80 €" };

const WinePricingTool = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  const formatEur = (n: number) =>
    new Intl.NumberFormat(t.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n);

  const [costPrice, setCostPrice] = useState(8);
  const [restType, setRestType] = useState("casual");
  const [ticketRange, setTicketRange] = useState("mid");
  const [wineType, setWineType] = useState("mid");
  const tracked = useRef(false);
  const trackOnce = () => { if (!tracked.current) { tracked.current = true; trackAction("tool_use", "tool", "wine-pricing-tool"); } };

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "pricing-tool-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "WebApplication",
      name: "Wine Pricing Optimizer", applicationCategory: "BusinessApplication",
      operatingSystem: "Web", description: t.seo_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("pricing-tool-jsonld")?.remove(); };
  }, [t]);

  const result = useMemo(() => {
    const range = restaurantMultipliers[restType];
    const baseMultiplier = (range[0] + range[1]) / 2;
    const adjustedMultiplier = Math.max(1.8, baseMultiplier + wineAdjustments[wineType] + ticketAdjustments[ticketRange]);
    const recommendedPrice = costPrice * adjustedMultiplier;
    const margin = ((recommendedPrice - costPrice) / recommendedPrice) * 100;
    const pos = t.positioning[wineType];

    const chartData = [
      { name: t.cost_chart, value: costPrice, fill: "hsl(var(--muted-foreground))" },
      { name: t.min_chart, value: costPrice * range[0], fill: "hsl(var(--border))" },
      { name: t.rec_chart, value: recommendedPrice, fill: "hsl(var(--wine))" },
      { name: t.max_chart, value: costPrice * range[1], fill: "hsl(var(--wine) / 0.5)" },
    ];

    const psychologyTips = [
      costPrice < 6 ? t.tips_low_cost : t.tips_high_cost,
      recommendedPrice < 25 ? t.tips_low_price : t.tips_high_price,
      t.tips_round.replace("{price}", formatEur(Math.floor(recommendedPrice) - 0.5)),
      t.tips_compromise,
    ];

    return {
      adjustedMultiplier: Math.round(adjustedMultiplier * 10) / 10,
      recommendedPrice: Math.round(recommendedPrice * 100) / 100,
      margin: Math.round(margin),
      positioning: pos.title,
      positioningDetail: pos.desc,
      chartData, psychologyTips,
      rangeMin: range[0], rangeMax: range[1],
    };
  }, [costPrice, restType, ticketRange, wineType, t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`https://winerim.wine${localePath("/wine-pricing-tool")}`}
        hreflang={allLangPaths("/wine-pricing-tool")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.bread_tools, href: localePath("/herramientas") }, { label: t.bread_self }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Calculator size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1_1}{" "}<span className="text-gradient-wine italic">{t.h1_2}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* CALCULATOR */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 sticky top-28 space-y-6">
                  <h2 className="font-heading text-lg font-bold flex items-center gap-2"><Layers size={16} className="text-wine" /> {t.params}</h2>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium flex items-center gap-1.5"><DollarSign size={13} className="text-wine" /> {t.cost_label}</label>
                      <span className="text-sm font-semibold text-wine">{formatEur(costPrice)}</span>
                    </div>
                    <input type="range" min={1} max={80} step={0.5} value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-wine" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1 €</span><span>80 €</span></div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Store size={13} className="text-wine" /> {t.rest_label}</label>
                    <div className="space-y-1.5">
                      {t.rest_types.map((r: any) => (
                        <button key={r.value} onClick={() => { setRestType(r.value); trackOnce(); }} className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${restType === r.value ? "border-wine bg-wine/5 font-semibold" : "border-border hover:border-wine/40"}`}>
                          {r.label} <span className="text-muted-foreground ml-1">x{restaurantMultipliers[r.value][0]}–{restaurantMultipliers[r.value][1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Tag size={13} className="text-wine" /> {t.ticket_label}</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(ticketLabels).map(([val, label]) => (
                        <button key={val} onClick={() => setTicketRange(val)} className={`px-3 py-2 rounded-lg border text-xs transition-all ${ticketRange === val ? "border-wine bg-wine/5 font-semibold" : "border-border hover:border-wine/40"}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Wine size={13} className="text-wine" /> {t.wine_label}</label>
                    <div className="space-y-1.5">
                      {t.wine_types.map((w: any) => (
                        <button key={w.value} onClick={() => setWineType(w.value)} className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${wineType === w.value ? "border-wine bg-wine/5 font-semibold" : "border-border hover:border-wine/40"}`}>
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">{t.recommended}</p>
                <div className="flex items-end gap-4 mb-4">
                  <span className="font-heading text-5xl md:text-6xl font-bold text-wine">{formatEur(result.recommendedPrice)}</span>
                  <div className="pb-2">
                    <p className="text-sm text-muted-foreground">x{result.adjustedMultiplier} {t.multiplier}</p>
                    <p className="text-sm text-muted-foreground">{result.margin}% {t.margin_label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-wine/5 rounded-lg px-4 py-3 border border-wine/20">
                  <BarChart3 size={16} className="text-wine shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{result.positioning}</p>
                    <p className="text-xs text-muted-foreground">{result.positioningDetail}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-wine" /> {t.range_title}</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={result.chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}€`} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(value: number) => [formatEur(value), t.price_label]} />
                    <ReferenceLine y={result.recommendedPrice} stroke="hsl(var(--wine))" strokeDasharray="4 4" />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {result.chartData.map((entry, index) => (<Cell key={index} fill={entry.fill} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2"><Info size={16} className="text-wine" /> {t.psychology_title}</h3>
                <div className="space-y-3">
                  {result.psychologyTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={13} className="text-wine shrink-0 mt-0.5" /> {tip}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.cta_badge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t.cta_title_1}{" "}<span className="text-gradient-wine italic">{t.cta_title_2}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.cta_desc}</p>
              <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.cta_btn} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/precio-vino-restaurante"), label: t.link_pricing, type: "guide" },
        { to: localePath("/calculadora-margen-vino"), label: t.link_margin, type: "tool" },
        { to: localePath("/blog/como-disenar-carta-vinos-rentable"), label: t.link_profitable, type: "guide" },
        { to: localePath("/recursos/plantilla-wine-mapping-restaurante"), label: t.link_mapping, type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default WinePricingTool;
