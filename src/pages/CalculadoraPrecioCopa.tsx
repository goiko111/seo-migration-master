import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, GlassWater, DollarSign, TrendingUp,
  Sparkles, Calculator, CheckCircle, BarChart3, Info,
  Clock, ShieldAlert, AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import { Slider } from "@/components/ui/slider";

/* ─── Wine type presets for by-the-glass ─── */
const wineTypes = [
  { id: "still-white", label: "Blanco", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.5, icon: "🥂" },
  { id: "still-red", label: "Tinto", glasses: 5, shelfLife: "48–72 h", preservation: 0, mult: 3.2, icon: "🍷" },
  { id: "sparkling", label: "Espumoso", glasses: 6, shelfLife: "12–24 h", preservation: 0.30, mult: 3.8, icon: "🍾" },
  { id: "fortified", label: "Generoso / Dulce", glasses: 8, shelfLife: "2–4 semanas", preservation: 0, mult: 3.0, icon: "🫗" },
  { id: "premium", label: "Premium (Coravin)", glasses: 5, shelfLife: "4–8 semanas", preservation: 0.80, mult: 2.5, icon: "🏆" },
];

const CalculadoraPrecioCopa = () => {
  const [wineType, setWineType] = useState("still-red");
  const [costeBotella, setCosteBotella] = useState(12);
  const [copasPorBotella, setCopasPorBotella] = useState(5);
  const [multiplicador, setMultiplicador] = useState(3.2);

  const preset = wineTypes.find((w) => w.id === wineType)!;

  const handleWineType = (id: string) => {
    const p = wineTypes.find((w) => w.id === id)!;
    setWineType(id);
    setCopasPorBotella(p.glasses);
    setMultiplicador(p.mult);
  };

  const results = useMemo(() => {
    const costePorCopa = costeBotella / copasPorBotella;
    const costeRealPorCopa = costePorCopa + preset.preservation;
    const precioCopa = +(costeRealPorCopa * multiplicador).toFixed(2);
    const margenCopa = +(precioCopa - costeRealPorCopa).toFixed(2);
    const margenPct = precioCopa > 0 ? +((margenCopa / precioCopa) * 100).toFixed(1) : 0;
    const copasEquilibrio = precioCopa > 0 ? Math.ceil(costeBotella / precioCopa) : 0;
    const beneficioTotal = +(precioCopa * copasPorBotella - costeBotella - preset.preservation * copasPorBotella).toFixed(2);
    const ingresoTotal = +(precioCopa * copasPorBotella).toFixed(2);

    return {
      costePorCopa, costeRealPorCopa, precioCopa, margenCopa, margenPct,
      copasEquilibrio, beneficioTotal, ingresoTotal,
    };
  }, [costeBotella, copasPorBotella, multiplicador, preset]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Precio de Vino por Copa | Demo Winerim Core"
        description="Calcula el precio óptimo del vino por copa en tu restaurante. Demo del motor de pricing de Winerim Core con lógica de conservación, merma y tipo de vino."
        url="https://winerim.wine/herramientas/calculadora-precio-vino-por-copa"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Herramientas", href: "/guias-y-recursos" },
            { label: "Calculadora precio por copa" },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 mb-6">
            <BarChart3 size={14} className="text-amber-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-500">Demo · Winerim Core</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
            Calculadora de precio de vino{" "}
            <span className="text-gradient-wine italic">por copa</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Calcula el precio óptimo, el margen por copa y el punto de equilibrio para tu programa de vino por copa.
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
                  Decidir bien el copeo no es solo dividir una botella entre cinco
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Winerim tiene en cuenta rentabilidad, tipo de vino, conservación, merma y lógica comercial para ayudarte a decidir cuándo conviene sacar un vino por copa y a qué precio.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock
        layer="core"
        decides={[
          "Qué vinos merecen entrar en el programa de copeo y a qué precio",
          "Cuántas copas necesitas vender para cubrir la botella según tipo de vino",
          "Si un vino premium por copa es rentable con sistema de preservación",
        ]}
        avoids={[
          "Vender copas por debajo del punto de equilibrio real (incluyendo merma)",
          "Ofrecer espumosos por copa sin considerar su vida útil limitada",
          "Ignorar el sobrecoste de preservación en vinos premium",
        ]}
        impact={[
          "Margen por copa controlado y predecible según tipología",
          "Reducción de pérdidas por botellas abiertas no terminadas",
          "Programa de copeo más rentable y con mejor experiencia para el comensal",
        ]}
      />

      {/* CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* INPUTS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-border bg-gradient-card space-y-7">
            <h2 className="font-heading text-xl font-bold flex items-center gap-2">
              <Calculator size={20} className="text-wine" />
              Datos de la botella
            </h2>

            {/* Wine type selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tipo de vino</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                      <span className="block text-[10px] text-muted-foreground font-normal">{w.glasses} copas · {w.shelfLife}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cost */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Precio de compra</label>
                <span className="text-sm font-bold text-wine">{costeBotella.toFixed(2)} €</span>
              </div>
              <input
                type="number"
                min={1}
                max={200}
                step={0.5}
                value={costeBotella}
                onChange={(e) => setCosteBotella(Math.max(0.5, Math.min(200, parseFloat(e.target.value) || 0.5)))}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine/50 transition-all mb-2"
              />
              <Slider
                value={[costeBotella]}
                onValueChange={([v]) => setCosteBotella(v)}
                min={1}
                max={100}
                step={0.5}
              />
              <p className="text-xs text-muted-foreground mt-1">Coste de adquisición (sin IVA)</p>
            </div>

            {/* Glasses */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Copas por botella</label>
                <span className="text-sm font-bold text-wine">{copasPorBotella}</span>
              </div>
              <Slider
                value={[copasPorBotella]}
                onValueChange={([v]) => setCopasPorBotella(v)}
                min={3}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3 (generosas)</span>
                <span>10 (catación)</span>
              </div>
            </div>

            {/* Multiplier */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Multiplicador</label>
                <span className="text-sm font-bold text-wine">×{multiplicador.toFixed(1)}</span>
              </div>
              <Slider
                value={[multiplicador]}
                onValueChange={([v]) => setMultiplicador(v)}
                min={2}
                max={6}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>×2</span>
                <span>×{multiplicador.toFixed(1)}</span>
                <span>×6</span>
              </div>
            </div>
          </motion.div>

          {/* OUTPUTS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="space-y-5">
            {/* Main price */}
            <div className="p-8 rounded-2xl border border-wine/30 bg-wine/5 text-center">
              <GlassWater size={28} className="text-wine mx-auto mb-3" />
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Precio por copa recomendado</p>
              <p className="font-heading text-5xl md:text-6xl font-bold text-wine">{results.precioCopa.toFixed(2)} €</p>
              <p className="text-sm text-muted-foreground mt-2">
                Coste real por copa: {results.costeRealPorCopa.toFixed(2)} €
                {preset.preservation > 0 && (
                  <span className="text-xs ml-1">(incl. {preset.preservation.toFixed(2)} € preservación)</span>
                )}
              </p>
            </div>

            {/* Margin & equilibrium */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <TrendingUp size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Margen por copa</p>
                <p className="font-heading text-2xl font-bold">{results.margenCopa.toFixed(2)} €</p>
                <p className="text-xs text-wine font-semibold">{results.margenPct}%</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <DollarSign size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Punto de equilibrio</p>
                <p className="font-heading text-2xl font-bold">{results.copasEquilibrio} {results.copasEquilibrio === 1 ? "copa" : "copas"}</p>
                <p className="text-xs text-muted-foreground">para recuperar coste</p>
              </div>
            </div>

            {/* Shelf life & preservation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <Clock size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Vida útil estimada</p>
                <p className="font-heading text-lg font-bold">{preset.shelfLife}</p>
                <p className="text-xs text-muted-foreground">una vez abierta</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <ShieldAlert size={18} className={`mx-auto mb-2 ${preset.preservation > 0 ? "text-amber-500" : "text-muted-foreground/40"}`} />
                <p className="text-xs text-muted-foreground mb-1">Sobrecoste preservación</p>
                <p className={`font-heading text-lg font-bold ${preset.preservation > 0 ? "text-amber-500" : "text-muted-foreground/60"}`}>
                  {preset.preservation > 0 ? `${preset.preservation.toFixed(2)} €/copa` : "No aplica"}
                </p>
                <p className="text-xs text-muted-foreground">{preset.preservation > 0 ? "Coravin / gas inerte" : "Sin sistema especial"}</p>
              </div>
            </div>

            {/* Total profit */}
            <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
              <p className="text-xs text-muted-foreground mb-1">Beneficio total si se venden las {copasPorBotella} copas</p>
              <p className="font-heading text-3xl font-bold text-wine">{results.beneficioTotal.toFixed(2)} €</p>
              <p className="text-sm text-muted-foreground mt-1">
                Ingreso: {results.ingresoTotal.toFixed(2)} € — Coste: {costeBotella.toFixed(2)} €
                {preset.preservation > 0 && <span> — Preservación: {(preset.preservation * copasPorBotella).toFixed(2)} €</span>}
              </p>
            </div>

            {/* Insight */}
            <div className="bg-wine/5 border border-wine/20 rounded-xl p-4">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Info size={14} className="text-wine shrink-0 mt-0.5" />
                {results.copasEquilibrio <= 2
                  ? `Excelente ratio: cubres la botella con solo ${results.copasEquilibrio} copa${results.copasEquilibrio > 1 ? "s" : ""}. Las restantes ${copasPorBotella - results.copasEquilibrio} son beneficio neto.`
                  : results.copasEquilibrio >= copasPorBotella
                  ? "Atención: necesitas vender todas las copas para cubrir el coste. Revisa el multiplicador o considera otro formato."
                  : `Con ${copasPorBotella} copas a ${results.precioCopa.toFixed(2)} € cada una, las primeras ${results.copasEquilibrio} cubren el coste. El resto es beneficio neto.`
                }
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIPS */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Consejos para fijar el precio por copa</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {[
              "La regla clásica: el precio de la copa debería permitirte recuperar el coste de la botella con 2 copas vendidas.",
              "Las copas de espumoso suelen tener 6-7 por botella. Las de tinto, 4-5. Ajusta el cálculo según el tipo.",
              "Un multiplicador ×3–×4 es estándar. Los wine bars pueden llegar a ×4–×5 en copas premium.",
              "El precio de la copa no debe superar el 35-40% del precio de la misma botella en carta.",
              "Si una botella no se termina en 48-72 h, el coste de merma debe incluirse en el cálculo.",
            ].map((tip, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-background">
                  <CheckCircle size={16} className="text-wine shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={[
          { q: "¿Cuántas copas salen de una botella de vino?", a: "Una botella estándar de 750ml da entre 4 y 6 copas según el tamaño del servicio. Lo habitual en restaurantes son 5 copas de 150ml. Para cataciones o copas generosas, 4 copas de 180ml." },
          { q: "¿Qué multiplicador debo usar?", a: "Depende del tipo de establecimiento. Restaurantes casuales: ×3–×3.5. Restaurantes de gama media-alta: ×3.5–×4. Wine bars: ×4–×5. La clave es que el precio resultante sea competitivo en tu zona." },
          { q: "¿Cómo gestiono la merma?", a: "Con sistemas de conservación (Coravin, gas inerte) puedes mantener el vino 5-7 días. Sin sistema, calcula 48-72 h. Si una botella no se termina, incluye un 10-15% de merma en tu coste." },
        ]}
        schemaId="calculadora-copa"
      />

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
                Winerim Core gestiona el copeo completo: rentabilidad por copa, control de merma, alertas de botellas abiertas y rotación óptima — con datos reales de tu operativa, no con fórmulas genéricas.
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
        { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes", type: "guide" },
        { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
        { to: "/recursos/guia-vino-por-copa-para-restaurantes", label: "Guía vino por copa", type: "resource" },
        { to: "/producto/winerim-core", label: "Winerim Core: analítica completa", type: "solution" },
        { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default CalculadoraPrecioCopa;
