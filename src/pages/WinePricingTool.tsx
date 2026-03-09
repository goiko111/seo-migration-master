import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, TrendingUp, Calculator, DollarSign,
  Store, Tag, Layers, Info, BarChart3, CheckCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const restaurantTypes = [
  { value: "bistro", label: "Bistró / Taberna", multiplierRange: [2.5, 3.5] },
  { value: "casual", label: "Casual dining", multiplierRange: [2.8, 3.8] },
  { value: "winebar", label: "Wine bar", multiplierRange: [2.5, 3.2] },
  { value: "gastro", label: "Gastronómico", multiplierRange: [3.0, 4.5] },
  { value: "hotel", label: "Hotel / Resort", multiplierRange: [3.5, 5.0] },
];

const wineTypes = [
  { value: "house", label: "Vino de la casa", adjustment: -0.3 },
  { value: "mid", label: "Gama media", adjustment: 0 },
  { value: "premium", label: "Premium", adjustment: -0.4 },
  { value: "icon", label: "Icónico / Gran reserva", adjustment: -0.8 },
];

const ticketRanges = [
  { value: "low", label: "< 25 €", avg: 20, adjustment: -0.2 },
  { value: "mid", label: "25 – 45 €", avg: 35, adjustment: 0 },
  { value: "high", label: "45 – 80 €", avg: 60, adjustment: 0.2 },
  { value: "premium", label: "> 80 €", avg: 100, adjustment: 0.3 },
];

const formatEur = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n);

const WinePricingTool = () => {
  const [costPrice, setCostPrice] = useState(8);
  const [restType, setRestType] = useState("casual");
  const [ticketRange, setTicketRange] = useState("mid");
  const [wineType, setWineType] = useState("mid");

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "pricing-tool-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Wine Pricing Optimizer",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Calcula el precio óptimo de venta de cada vino en tu carta de restaurante.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("pricing-tool-jsonld")?.remove(); };
  }, []);

  const result = useMemo(() => {
    const rest = restaurantTypes.find((r) => r.value === restType)!;
    const wine = wineTypes.find((w) => w.value === wineType)!;
    const ticket = ticketRanges.find((t) => t.value === ticketRange)!;

    const baseMultiplier = (rest.multiplierRange[0] + rest.multiplierRange[1]) / 2;
    const adjustedMultiplier = Math.max(1.8, baseMultiplier + wine.adjustment + ticket.adjustment);
    const recommendedPrice = costPrice * adjustedMultiplier;
    const margin = ((recommendedPrice - costPrice) / recommendedPrice) * 100;

    // Price ladder context
    const lowPrice = recommendedPrice * 0.65;
    const highPrice = recommendedPrice * 1.6;

    // Positioning
    let positioning: string;
    let positioningDetail: string;
    if (wineType === "house") {
      positioning = "Entrada de carta";
      positioningDetail = "Primer vino que el cliente ve. Debe ser atractivo en precio y calidad para generar confianza.";
    } else if (wineType === "mid") {
      positioning = "Zona media (sweet spot)";
      positioningDetail = "Donde se concentra el mayor volumen de ventas. El cliente lo percibe como buena relación calidad-precio.";
    } else if (wineType === "premium") {
      positioning = "Zona alta";
      positioningDetail = "Para clientes que buscan algo especial. El multiplicador más bajo compensa con percepción de valor.";
    } else {
      positioning = "Referencia aspiracional";
      positioningDetail = "Ancla de precio que hace que el resto de la carta parezca más accesible. Vende por prestigio.";
    }

    const chartData = [
      { name: "Coste", value: costPrice, fill: "hsl(var(--muted-foreground))" },
      { name: "Mínimo", value: costPrice * rest.multiplierRange[0], fill: "hsl(var(--border))" },
      { name: "Recomendado", value: recommendedPrice, fill: "hsl(var(--wine))" },
      { name: "Máximo", value: costPrice * rest.multiplierRange[1], fill: "hsl(var(--wine) / 0.5)" },
    ];

    const psychologyTips = [
      costPrice < 6
        ? "En vinos de entrada, el cliente es muy sensible al precio. Cada euro cuenta."
        : "A partir de cierto precio de coste, el cliente valora más la historia del vino que el precio exacto.",
      recommendedPrice < 25
        ? "Por debajo de 25 €, los clientes comparan con precios de supermercado. Justifica con contexto (servicio, copa, temperatura)."
        : "Por encima de 25 €, la decisión es más emocional. Las notas de cata y la recomendación del sommelier son clave.",
      "Evita precios que terminen en ,00 — los precios como " + formatEur(Math.floor(recommendedPrice) - 0.5) + " se perciben como más accesibles.",
      "Coloca este vino entre uno más barato y uno más caro para activar el 'efecto de compromiso': el cliente elige el del medio.",
    ];

    return {
      adjustedMultiplier: Math.round(adjustedMultiplier * 10) / 10,
      recommendedPrice: Math.round(recommendedPrice * 100) / 100,
      margin: Math.round(margin),
      positioning,
      positioningDetail,
      chartData,
      lowPrice,
      highPrice,
      psychologyTips,
      rangeMin: rest.multiplierRange[0],
      rangeMax: rest.multiplierRange[1],
    };
  }, [costPrice, restType, ticketRange, wineType]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine Pricing Optimizer – Precio óptimo de vino | Winerim"
        description="Calcula el precio de venta óptimo para cada vino de tu carta. Herramienta gratuita con multiplicadores, posicionamiento y psicología de precios."
        url="https://winerim.wine/wine-pricing-tool"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Calculator size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Wine Pricing{" "}<span className="text-gradient-wine italic">Optimizer</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Encuentra el precio de venta óptimo para cada vino de tu carta. Maximiza márgenes sin perder ventas.
          </motion.p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs – 2 cols */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 sticky top-28 space-y-6">
                  <h2 className="font-heading text-lg font-bold flex items-center gap-2">
                    <Layers size={16} className="text-wine" /> Parámetros
                  </h2>

                  {/* Cost price */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium flex items-center gap-1.5"><DollarSign size={13} className="text-wine" /> Precio de compra</label>
                      <span className="text-sm font-semibold text-wine">{formatEur(costPrice)}</span>
                    </div>
                    <input type="range" min={1} max={80} step={0.5} value={costPrice} onChange={(e) => setCostPrice(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border accent-wine" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1 €</span><span>80 €</span></div>
                  </div>

                  {/* Restaurant type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Store size={13} className="text-wine" /> Tipo de restaurante</label>
                    <div className="space-y-1.5">
                      {restaurantTypes.map((r) => (
                        <button key={r.value} onClick={() => setRestType(r.value)} className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${restType === r.value ? "border-wine bg-wine/5 font-semibold" : "border-border hover:border-wine/40"}`}>
                          {r.label} <span className="text-muted-foreground ml-1">x{r.multiplierRange[0]}–{r.multiplierRange[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ticket range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Tag size={13} className="text-wine" /> Ticket medio</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {ticketRanges.map((t) => (
                        <button key={t.value} onClick={() => setTicketRange(t.value)} className={`px-3 py-2 rounded-lg border text-xs transition-all ${ticketRange === t.value ? "border-wine bg-wine/5 font-semibold" : "border-border hover:border-wine/40"}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wine type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Wine size={13} className="text-wine" /> Tipo de vino</label>
                    <div className="space-y-1.5">
                      {wineTypes.map((w) => (
                        <button key={w.value} onClick={() => setWineType(w.value)} className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${wineType === w.value ? "border-wine bg-wine/5 font-semibold" : "border-border hover:border-wine/40"}`}>
                          {w.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Results – 3 cols */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main result */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">Precio recomendado</p>
                <div className="flex items-end gap-4 mb-4">
                  <span className="font-heading text-5xl md:text-6xl font-bold text-wine">{formatEur(result.recommendedPrice)}</span>
                  <div className="pb-2">
                    <p className="text-sm text-muted-foreground">x{result.adjustedMultiplier} multiplicador</p>
                    <p className="text-sm text-muted-foreground">{result.margin}% margen</p>
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

              {/* Chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-wine" /> Rango de precios
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={result.chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `${v}€`} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(value: number) => [formatEur(value), "Precio"]} />
                    <ReferenceLine y={result.recommendedPrice} stroke="hsl(var(--wine))" strokeDasharray="4 4" />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {result.chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Price psychology */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2">
                  <Info size={16} className="text-wine" /> Psicología de precios
                </h3>
                <div className="space-y-3">
                  {result.psychologyTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={13} className="text-wine shrink-0 mt-0.5" />
                      {tip}
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
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Optimización automática</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Winerim optimiza los precios de{" "}<span className="text-gradient-wine italic">toda tu carta</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Deja de calcular vino a vino. Winerim analiza toda tu carta y te sugiere la estrategia de precios óptima.
              </p>
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino", type: "guide" },
        { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Carta de vinos rentable", type: "guide" },
        { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default WinePricingTool;
