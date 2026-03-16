import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Calculator, Wine, TrendingUp, Info,
  BarChart3, ShieldAlert, Sparkles, Target, AlertTriangle, Check,
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

/* ─── Wine type presets ─── */
const wineTypes = [
  { id: "entry", label: "Entrada", sublabel: "< 8 €", defaultMult: 3.5, icon: "🍷" },
  { id: "mid", label: "Gama media", sublabel: "8–20 €", defaultMult: 2.8, icon: "🍷" },
  { id: "premium", label: "Premium", sublabel: "20–50 €", defaultMult: 2.2, icon: "🥂" },
  { id: "icon", label: "Icónico", sublabel: "> 50 €", defaultMult: 1.8, icon: "🏆" },
];

const CalculadoraMargen = () => {
  const [costPrice, setCostPrice] = useState(12);
  const [glassesPerBottle, setGlassesPerBottle] = useState(5);
  const [multiplier, setMultiplier] = useState(2.8);
  const [wineType, setWineType] = useState("mid");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  /* When wine type changes, apply its default multiplier */
  const handleWineType = (id: string) => {
    setWineType(id);
    const preset = wineTypes.find((w) => w.id === id);
    if (preset) setMultiplier(preset.defaultMult);
  };

  const results = useMemo(() => {
    const bottlePrice = costPrice * multiplier;
    const glassPrice = bottlePrice / glassesPerBottle;
    const grossMargin = bottlePrice - costPrice;
    const marginPercent = costPrice > 0 ? (grossMargin / bottlePrice) * 100 : 0;
    const costPerGlass = costPrice / glassesPerBottle;
    const breakEvenGlasses = glassPrice > 0 ? Math.ceil(costPrice / glassPrice) : 0;

    /* Comparison with current price */
    let currentMargin: number | null = null;
    let currentMarginPct: number | null = null;
    let priceDiff: number | null = null;
    if (currentPrice && currentPrice > 0) {
      currentMargin = currentPrice - costPrice;
      currentMarginPct = (currentMargin / currentPrice) * 100;
      priceDiff = bottlePrice - currentPrice;
    }

    return {
      bottlePrice, glassPrice, grossMargin, marginPercent,
      costPerGlass, breakEvenGlasses,
      currentMargin, currentMarginPct, priceDiff,
    };
  }, [costPrice, glassesPerBottle, multiplier, currentPrice]);

  useEffect(() => {
    const schema = document.createElement("script");
    schema.id = "calc-jsonld";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cómo se calcula el precio de venta del vino en un restaurante?",
          acceptedAnswer: { "@type": "Answer", text: "Se multiplica el precio de compra por un factor (normalmente entre 2 y 4). Los vinos de entrada usan multiplicadores más altos (×3-4) y los premium más bajos (×2-2.5) para mantener precios competitivos." },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el margen habitual del vino en hostelería?",
          acceptedAnswer: { "@type": "Answer", text: "El margen bruto del vino en restaurantes suele estar entre el 60% y el 75% sobre el precio de venta, dependiendo del rango de precio y la estrategia del establecimiento." },
        },
        {
          "@type": "Question",
          name: "¿Cómo se calcula el precio de una copa de vino?",
          acceptedAnswer: { "@type": "Answer", text: "Se divide el precio de venta de la botella entre el número de copas (normalmente 5). El objetivo es cubrir el coste de la botella con las 2-3 primeras copas vendidas." },
        },
      ],
    });
    document.head.appendChild(schema);
    return () => { document.getElementById("calc-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Margen del Vino para Restaurantes | Demo Winerim Core"
        description="Calcula el precio de venta y el margen de cada botella y copa de vino en tu restaurante. Demo del motor de pricing de Winerim Core."
        url="https://winerim.wine/calculadora-margen-vino"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Calculadora de margen" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 mb-6"
          >
            <BarChart3 size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-500">Demo · Winerim Core</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] mb-6"
          >
            Calculadora de margen del vino para{" "}
            <span className="text-gradient-wine italic">restaurantes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Descubre cuánto deberías cobrar por cada botella y copa para mantener un margen rentable.
          </motion.p>
        </div>
      </section>

      {/* ── DEMO INTRO BLOCK ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-amber-500/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(38_90%_55%/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-amber-500" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">
                  Demo del motor de pricing y rentabilidad de Winerim Core
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Esta herramienta muestra una versión simplificada de cómo Winerim ayuda a definir precios con más criterio según coste, tipo de vino, margen objetivo y contexto del restaurante.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock
        layer="core"
        decides={[
          "Qué multiplicador aplicar según gama y tipo de referencia",
          "Si tu pricing actual deja margen suficiente por copa y botella",
          "Qué precio de venta es competitivo sin sacrificar rentabilidad",
        ]}
        avoids={[
          "Aplicar el mismo multiplicador a toda la carta sin criterio",
          "Dejar huecos de precio que bloquean la venta",
          "Fijar precios que no cubren el coste por copa",
        ]}
        impact={[
          "Mejora del margen bruto medio entre un 5-15%",
          "Reducción de la percepción de 'caro' con escaleras de precio correctas",
          "Pricing alineado con el posicionamiento real del restaurante",
        ]}
      />

      {/* CALCULATOR */}
      <section className="section-padding pt-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8"
            >
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-wine" />
                Datos de tu vino
              </h2>

              <div className="space-y-6">
                {/* Wine type selector */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Tipo de vino</label>
                  <div className="grid grid-cols-2 gap-2">
                    {wineTypes.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => handleWineType(w.id)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-left text-sm font-semibold transition-all ${
                          wineType === w.id
                            ? "bg-wine/20 border-wine/50 text-wine"
                            : "bg-secondary/50 border-border hover:border-wine/30"
                        }`}
                      >
                        <span className="text-base">{w.icon}</span>
                        <div>
                          <span className="block text-xs leading-tight">{w.label}</span>
                          <span className="block text-[10px] text-muted-foreground font-normal">{w.sublabel}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    Multiplicador sugerido: ×{wineTypes.find((w) => w.id === wineType)?.defaultMult}
                  </p>
                </div>

                {/* Cost price */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Precio de compra (€)</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={costPrice}
                      onChange={(e) => setCostPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€/botella</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={0.5}
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value))}
                    className="w-full mt-3 accent-[hsl(var(--wine))]"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 €</span>
                    <span>100 €</span>
                  </div>
                </div>

                {/* Current price (optional) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Precio actual en carta (€) <span className="text-muted-foreground font-normal text-xs">— opcional</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={currentPrice ?? ""}
                      placeholder="Deja vacío si no aplica"
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setCurrrentPrice(isNaN(v) || v === 0 ? null : v);
                      }}
                      className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all placeholder:text-muted-foreground/40 placeholder:text-sm placeholder:font-normal"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                  </div>
                </div>

                {/* Glasses per bottle */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Copas por botella</label>
                  <div className="flex gap-2">
                    {[4, 5, 6].map((n) => (
                      <button
                        key={n}
                        onClick={() => setGlassesPerBottle(n)}
                        className={`flex-1 py-3 rounded-lg border text-sm font-semibold transition-all ${
                          glassesPerBottle === n
                            ? "bg-wine/20 border-wine/50 text-wine"
                            : "bg-secondary/50 border-border hover:border-wine/30"
                        }`}
                      >
                        {n} copas
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multiplier */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Multiplicador (×)</label>
                  <input
                    type="range"
                    min={1.5}
                    max={5}
                    step={0.1}
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-[hsl(var(--wine))]"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>×1.5</span>
                    <span className="font-semibold text-wine">×{multiplier.toFixed(1)}</span>
                    <span>×5</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8"
            >
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-wine" />
                Resultados
              </h2>

              <div className="space-y-4">
                <ResultCard
                  label="PVP recomendado por botella"
                  value={`${results.bottlePrice.toFixed(2)} €`}
                  highlight
                />
                <ResultCard
                  label="PVP recomendado por copa"
                  value={`${results.glassPrice.toFixed(2)} €`}
                  highlight
                />
                <ResultCard
                  label="Margen bruto por botella"
                  value={`${results.grossMargin.toFixed(2)} €`}
                  sub={`${results.marginPercent.toFixed(0)}% de margen`}
                />
                <ResultCard
                  label="Coste por copa"
                  value={`${results.costPerGlass.toFixed(2)} €`}
                />
                <ResultCard
                  label="Copas para cubrir coste"
                  value={`${results.breakEvenGlasses} copas`}
                  sub={`De ${glassesPerBottle} copas totales`}
                />

                {/* Comparison with current price */}
                {results.priceDiff !== null && currentPrice && (
                  <div className={`rounded-xl border p-4 ${
                    results.priceDiff > 0
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : results.priceDiff < 0
                      ? "bg-amber-500/5 border-amber-500/20"
                      : "bg-secondary/50 border-border"
                  }`}>
                    <p className="text-xs text-muted-foreground mb-1">Comparativa con tu precio actual</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          Tu precio: <span className="font-bold">{currentPrice.toFixed(2)} €</span>
                          <span className="text-muted-foreground mx-1.5">→</span>
                          Recomendado: <span className="font-bold text-wine">{results.bottlePrice.toFixed(2)} €</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Tu margen actual: {results.currentMargin?.toFixed(2)} € ({results.currentMarginPct?.toFixed(0)}%)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-heading text-lg font-bold ${
                          results.priceDiff! > 0 ? "text-emerald-500" : results.priceDiff! < 0 ? "text-amber-500" : "text-foreground"
                        }`}>
                          {results.priceDiff! > 0 ? "+" : ""}{results.priceDiff!.toFixed(2)} €
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-wine/5 border border-wine/20 rounded-xl p-4">
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <Info size={14} className="text-wine shrink-0 mt-0.5" />
                  Con {glassesPerBottle} copas a {results.glassPrice.toFixed(2)} € cada una, las primeras {results.breakEvenGlasses} copas cubren el coste. El resto es beneficio neto.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPLANATION */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Guía de pricing</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo calcular el precio del vino en un{" "}
              <span className="text-gradient-wine italic">restaurante</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-7">
                <h3 className="font-heading text-lg font-semibold mb-3">El método del multiplicador</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  El sistema más extendido en hostelería consiste en multiplicar el precio de compra por un factor fijo. Es sencillo, pero aplicarlo sin matices genera desequilibrios en la carta.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { range: "Vinos de entrada", mult: "×3 – ×4", note: "Mayor margen % porque el precio absoluto es bajo" },
                    { range: "Vinos de gama media", mult: "×2.5 – ×3", note: "Equilibrio entre margen y percepción de precio" },
                    { range: "Vinos premium", mult: "×2 – ×2.5", note: "Menor margen % para mantener precios competitivos" },
                  ].map((item, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4 border border-border">
                      <p className="text-xs uppercase tracking-wider text-wine-light font-semibold mb-1">{item.range}</p>
                      <p className="font-heading text-lg font-bold text-wine mb-1">{item.mult}</p>
                      <p className="text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-card rounded-xl border border-border p-7">
                <h3 className="font-heading text-lg font-semibold mb-3">La regla de la copa</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  El precio de una copa de vino debería ser suficiente para que las 2-3 primeras copas vendidas cubran el coste de la botella completa. Así, aunque se pierdan 1-2 copas por merma, la operación sigue siendo rentable. Es la forma más segura de garantizar margen en la venta por copa.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-card rounded-xl border border-border p-7">
                <h3 className="font-heading text-lg font-semibold mb-3">Errores comunes de pricing</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Usar el mismo multiplicador para todos los vinos",
                    "No tener escalera de precios progresiva",
                    "Dejar huecos entre rangos de precio",
                    "Fijar precios sin analizar la competencia",
                  ].map((error, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Wine size={14} className="text-destructive shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{error}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── WINERIM CORE CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-amber-500/20 p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_90%_55%/0.06),transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] uppercase text-amber-500/70 mb-4">
                <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                Winerim Core
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Esta calculadora es solo el{" "}
                <span className="text-gradient-wine italic">principio</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Winerim Core analiza el pricing, los márgenes, la rotación y la arquitectura completa de tu carta — con 26 módulos especializados que trabajan con tus datos reales, no con fórmulas genéricas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/producto/winerim-core"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Ver cómo lo resuelve Winerim Core
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/analisis-carta"
                  className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all"
                >
                  Analizar mi carta gratis
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/precio-vino-restaurante", label: "Cómo poner precio al vino", type: "guide" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", type: "guide" },
        { to: "/wine-pricing-tool", label: "Herramienta de pricing", type: "tool" },
        { to: "/recursos/plantilla-wine-mapping-restaurante", label: "Plantilla wine mapping", type: "resource" },
        { to: "/producto/winerim-core", label: "Winerim Core: analítica completa", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

const ResultCard = ({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) => (
  <div className={`rounded-xl border p-4 flex items-center justify-between ${highlight ? "bg-wine/5 border-wine/20" : "bg-secondary/50 border-border"}`}>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-xs text-wine mt-0.5">{sub}</p>}
    </div>
    <p className={`font-heading text-xl font-bold ${highlight ? "text-wine" : "text-foreground"}`}>{value}</p>
  </div>
);

export default CalculadoraMargen;
