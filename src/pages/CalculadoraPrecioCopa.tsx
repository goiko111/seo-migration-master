import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, GlassWater, DollarSign, TrendingUp,
  Sparkles, Calculator, CheckCircle, HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const CalculadoraPrecioCopa = () => {
  const [costeBotella, setCosteBotella] = useState(8);
  const [copasPorBotella, setCopasPorBotella] = useState(5);
  const [multiplicador, setMultiplicador] = useState(3.5);

  const costePorCopa = costeBotella / copasPorBotella;
  const precioCopa = +(costePorCopa * multiplicador).toFixed(2);
  const margenCopa = +(precioCopa - costePorCopa).toFixed(2);
  const margenPct = precioCopa > 0 ? +((margenCopa / precioCopa) * 100).toFixed(1) : 0;
  const copasEquilibrio = costeBotella > 0 ? Math.ceil(costeBotella / precioCopa) : 0;
  const beneficioTotalBotella = +(precioCopa * copasPorBotella - costeBotella).toFixed(2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Precio de Vino por Copa | Winerim"
        description="Calcula el precio óptimo del vino por copa en tu restaurante. Introduce el coste de la botella, copas por botella y multiplicador para obtener precio, margen y punto de equilibrio."
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Calculator size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
            Calculadora de precio de vino por copa
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Calcula el precio óptimo, el margen por copa y el punto de equilibrio para tu programa de vino por copa.
          </motion.p>
        </div>
      </section>

      <ToolStrategicBlock
        layer="core"
        decides={[
          "Qué precio poner a cada copa según coste y tipo de servicio",
          "Cuántas copas necesitas vender para cubrir la botella",
          "Si tu programa de copa es rentable o está generando pérdida",
        ]}
        avoids={[
          "Vender copas por debajo del punto de equilibrio",
          "Asumir un número de copas por botella que no se cumple en la práctica",
          "Ignorar la merma como coste real del servicio por copa",
        ]}
        impact={[
          "Margen por copa controlado y predecible",
          "Reducción de pérdidas por botellas abiertas no terminadas",
          "Mejor decisión sobre qué vinos ofrecer por copa",
        ]}
      />

      {/* CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* INPUTS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-border bg-gradient-card space-y-8">
            <h2 className="font-heading text-xl font-bold">Datos de la botella</h2>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Precio de compra de la botella</Label>
                <span className="text-sm font-bold text-wine">{costeBotella.toFixed(2)}€</span>
              </div>
              <Input
                type="number"
                min={1}
                max={200}
                step={0.5}
                value={costeBotella}
                onChange={(e) => setCosteBotella(Math.max(0.5, Math.min(200, parseFloat(e.target.value) || 0.5)))}
                className="bg-background mb-2"
              />
              <Slider
                value={[costeBotella]}
                onValueChange={([v]) => setCosteBotella(v)}
                min={1}
                max={100}
                step={0.5}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Coste de adquisición (sin IVA)</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Copas por botella</Label>
                <span className="text-sm font-bold text-wine">{copasPorBotella}</span>
              </div>
              <Slider
                value={[copasPorBotella]}
                onValueChange={([v]) => setCopasPorBotella(v)}
                min={3}
                max={8}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3 copas (generosas)</span>
                <span>8 copas (catación)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Multiplicador</Label>
                <span className="text-sm font-bold text-wine">x{multiplicador.toFixed(1)}</span>
              </div>
              <Slider
                value={[multiplicador]}
                onValueChange={([v]) => setMultiplicador(v)}
                min={2}
                max={6}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>x2 (bajo)</span>
                <span>x3.5 (medio)</span>
                <span>x6 (alto)</span>
              </div>
            </div>
          </motion.div>

          {/* OUTPUTS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="space-y-6">
            {/* Precio recomendado */}
            <div className="p-8 rounded-2xl border border-wine/30 bg-wine/5 text-center">
              <GlassWater size={28} className="text-wine mx-auto mb-3" />
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Precio por copa recomendado</p>
              <p className="font-heading text-5xl md:text-6xl font-bold text-wine">{precioCopa.toFixed(2)}€</p>
              <p className="text-sm text-muted-foreground mt-2">Coste por copa: {costePorCopa.toFixed(2)}€</p>
            </div>

            {/* Margen y equilibrio */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-border bg-gradient-card text-center">
                <TrendingUp size={20} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Margen por copa</p>
                <p className="font-heading text-2xl font-bold">{margenCopa.toFixed(2)}€</p>
                <p className="text-xs text-wine font-semibold">{margenPct}%</p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-gradient-card text-center">
                <DollarSign size={20} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Punto de equilibrio</p>
                <p className="font-heading text-2xl font-bold">{copasEquilibrio} {copasEquilibrio === 1 ? "copa" : "copas"}</p>
                <p className="text-xs text-muted-foreground">para recuperar coste</p>
              </div>
            </div>

            {/* Beneficio total */}
            <div className="p-6 rounded-xl border border-border bg-gradient-card text-center">
              <p className="text-xs text-muted-foreground mb-1">Beneficio total si se venden las {copasPorBotella} copas</p>
              <p className="font-heading text-3xl font-bold text-wine">{beneficioTotalBotella.toFixed(2)}€</p>
              <p className="text-sm text-muted-foreground mt-1">
                Ingreso total: {(precioCopa * copasPorBotella).toFixed(2)}€ — Coste: {costeBotella.toFixed(2)}€
              </p>
            </div>

            {/* CTA */}
            <Link to="/analisis-carta"
              className="flex items-center justify-center gap-2 w-full bg-gradient-wine text-primary-foreground px-8 py-4 rounded-xl text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Analizar carta de vinos <ArrowRight size={16} />
            </Link>
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
              "Un multiplicador x3-x4 es estándar. Los wine bars pueden llegar a x4-x5 en copas premium.",
              "El precio de la copa no debe superar el 35-40% del precio de la misma botella en carta.",
              "Si una botella no se termina en 48-72h, el coste de merma debe incluirse en el cálculo.",
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
          { q: "¿Qué multiplicador debo usar?", a: "Depende del tipo de establecimiento. Restaurantes casuales: x3-x3.5. Restaurantes de gama media-alta: x3.5-x4. Wine bars: x4-x5. La clave es que el precio resultante sea competitivo en tu zona." },
          { q: "¿Cómo gestiono la merma?", a: "Con sistemas de conservación (Coravin, gas inerte) puedes mantener el vino 5-7 días. Sin sistema, calcula 48-72h. Si una botella no se termina, incluye un 10-15% de merma en tu coste." },
        ]}
        schemaId="calculadora-copa"
      />

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-12 md:p-16">
            <Sparkles size={32} className="text-wine mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4">
              Optimiza toda tu carta de vinos
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Pricing por copa, recomendaciones con IA, maridajes automáticos y analítica de ventas en una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analisis-carta"
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Analizar carta de vinos <ArrowRight size={16} />
              </Link>
              <Link to="/demo"
                className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                Solicitar demo
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <InternalLinks links={[
        { to: "/vino-por-copa-restaurante", label: "Vino por copa en restaurantes", type: "guide" },
        { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
        { to: "/recursos/guia-vino-por-copa-para-restaurantes", label: "Guía vino por copa", type: "resource" },
        { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default CalculadoraPrecioCopa;
