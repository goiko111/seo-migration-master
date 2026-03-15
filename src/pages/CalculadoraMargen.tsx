import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Wine, TrendingUp, Info } from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const multiplierPresets = [2, 2.5, 3, 3.5, 4];

const CalculadoraMargen = () => {
  const [costPrice, setCostPrice] = useState(12);
  const [glassesPerBottle, setGlassesPerBottle] = useState(5);
  const [multiplier, setMultiplier] = useState(3);

  const results = useMemo(() => {
    const bottlePrice = costPrice * multiplier;
    const glassPrice = bottlePrice / glassesPerBottle;
    const grossMargin = bottlePrice - costPrice;
    const marginPercent = costPrice > 0 ? ((grossMargin / bottlePrice) * 100) : 0;
    const costPerGlass = costPrice / glassesPerBottle;
    const breakEvenGlasses = glassPrice > 0 ? Math.ceil(costPrice / glassPrice) : 0;

    return { bottlePrice, glassPrice, grossMargin, marginPercent, costPerGlass, breakEvenGlasses };
  }, [costPrice, glassesPerBottle, multiplier]);

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

    return () => {
      document.getElementById("calc-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Margen del Vino para Restaurantes"
        description="Calcula el precio de venta y el margen de cada botella y copa de vino en tu restaurante. Herramienta gratuita para optimizar el pricing de tu carta de vinos."
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <Calculator size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Herramienta gratuita</span>
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
                  <div className="flex gap-2 flex-wrap">
                    {multiplierPresets.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMultiplier(m)}
                        className={`px-4 py-3 rounded-lg border text-sm font-semibold transition-all ${
                          multiplier === m
                            ? "bg-wine/20 border-wine/50 text-wine"
                            : "bg-secondary/50 border-border hover:border-wine/30"
                        }`}
                      >
                        ×{m}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={1.5}
                    max={5}
                    step={0.1}
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                    className="w-full mt-3 accent-[hsl(var(--wine))]"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>×1.5</span>
                    <span>×{multiplier.toFixed(1)}</span>
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
                  label="Precio recomendado por botella"
                  value={`${results.bottlePrice.toFixed(2)} €`}
                  highlight
                />
                <ResultCard
                  label="Precio recomendado por copa"
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                Análisis gratuito
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                ¿Tu carta está bien{" "}
                <span className="text-gradient-wine italic">optimizada</span>?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta de vinos y te mostramos cómo mejorar precios, estructura y rotación. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/analisis-carta"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Analizar mi carta de vinos gratis
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contacto"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Contactar
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
