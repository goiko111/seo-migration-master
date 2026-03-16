import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, TrendingUp, Wine, DollarSign, Users,
  Calculator, Sparkles, Info, BarChart3, GlassWater, Zap,
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import SummaryBox from "@/components/seo/SummaryBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";

/* ─── Scenario presets ─── */
const scenarios = [
  { id: "base", label: "Sin cambios", deltaRatio: 0, deltaTicket: 0, deltaCopa: 0, desc: "Situación actual sin intervención." },
  { id: "copa", label: "Más copa", deltaRatio: 5, deltaTicket: 0, deltaCopa: 15, desc: "Ampliar oferta de copa para captar mesas que no pedían vino." },
  { id: "mix", label: "Mejor mix", deltaRatio: 0, deltaTicket: 15, deltaCopa: 0, desc: "Mejorar la escalera de precios y visibilidad de gama media-alta." },
  { id: "full", label: "Copa + mix + sala", deltaRatio: 8, deltaTicket: 20, deltaCopa: 10, desc: "Combinación de copa, mix y recomendación activa del equipo." },
];

const CalculadoraTicketMedio = () => {
  const [cubiertos, setCubiertos] = useState(120);
  const [diasMes, setDiasMes] = useState(26);
  const [ratioVino, setRatioVino] = useState(35);
  const [ticketVinoActual, setTicketVinoActual] = useState(8);
  const [ratioCopa, setRatioCopa] = useState(40);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "calc-ticket-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Calculadora de Impacto en Ticket Medio del Vino",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Estima el impacto económico de mejorar las ventas de vino en tu restaurante: ticket medio, ratio copa/botella y facturación mensual.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: CANONICAL_DOMAIN },
          { "@type": "ListItem", position: 2, name: "Herramientas", item: `${CANONICAL_DOMAIN}/herramientas` },
          { "@type": "ListItem", position: 3, name: "Calculadora ticket medio vino", item: `${CANONICAL_DOMAIN}/herramientas/calculadora-ticket-medio-vino` },
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("calc-ticket-jsonld")?.remove(); };
  }, []);

  const results = useMemo(() => {
    const mesasMes = cubiertos * diasMes;
    const mesasConVino = Math.round(mesasMes * (ratioVino / 100));
    const facturacionActual = mesasConVino * ticketVinoActual;

    const scenarioResults = scenarios.map(sc => {
      const nuevoRatio = Math.min(ratioVino + sc.deltaRatio, 90);
      const nuevoTicket = ticketVinoActual * (1 + sc.deltaTicket / 100);
      const nuevoCopa = Math.min(ratioCopa + sc.deltaCopa, 100);
      const mesasNuevo = Math.round(mesasMes * (nuevoRatio / 100));
      const facNueva = mesasNuevo * nuevoTicket;
      const incrementoMes = facNueva - facturacionActual;
      const incrementoPct = facturacionActual > 0 ? (incrementoMes / facturacionActual) * 100 : 0;
      return {
        ...sc,
        nuevoRatio,
        nuevoTicket,
        nuevoCopa,
        mesasNuevo,
        facNueva,
        incrementoMes,
        incrementoAnual: incrementoMes * 12,
        incrementoPct,
      };
    });

    return { mesasMes, mesasConVino, facturacionActual, scenarioResults };
  }, [cubiertos, diasMes, ratioVino, ticketVinoActual, ratioCopa]);

  const fmt = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 0 });
  const fmtEur = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + "€";

  const selected = activeScenario ? results.scenarioResults.find(s => s.id === activeScenario) : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Impacto en Ticket Medio del Vino | Demo Winerim"
        description="Simula el impacto de la penetración del vino, copa vs botella y mix de referencias sobre el ticket medio de tu restaurante. Herramienta gratuita."
        url={`${CANONICAL_DOMAIN}/herramientas/calculadora-ticket-medio-vino`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Calculadora ticket medio vino" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <TrendingUp size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Demo · Winerim Core</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Calculadora de impacto en ticket medio del vino
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simula cómo cambia tu facturación mensual en vino al mejorar la penetración, el mix de referencias y la estrategia de copa.
          </motion.p>
        </div>
      </section>

      {/* ── DEMO INTRO BLOCK ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-wine/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(var(--wine)/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-wine" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">
                  El ticket medio no mejora solo con vender más. Mejora con mejor mix y mejor activación.
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Winerim ayuda a simular el impacto de la penetración del vino, la venta por copa, el mix de referencias y la visibilidad de la carta sobre el ticket medio del restaurante.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock
        layer="core"
        decides={[
          "Si la palanca prioritaria es más mesas pidiendo vino o mayor gasto por mesa",
          "Qué escenario (copa, mix o combinado) genera más retorno con tu perfil",
          "Cuánto impacto real tiene cada palanca sobre la facturación mensual",
        ]}
        avoids={[
          "Subir precios sin dato de elasticidad ni visibilidad de impacto",
          "Invertir en formación sin saber qué palanca mover primero",
          "Tomar decisiones de carta sin una estimación cuantificada de retorno",
        ]}
        impact={[
          "Incremento de facturación mensual estimado y accionable por escenario",
          "Priorización de las palancas con mayor impacto para tu tipo de negocio",
          "Base cuantitativa para justificar inversiones en carta, copa o formación",
        ]}
      />

      {/* SUMMARY BOX */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SummaryBox
          label="Qué simula esta herramienta"
          definition="Compara escenarios de mejora del ticket medio en vino combinando tres palancas: penetración (% de mesas que piden vino), mix (gasto medio por mesa) y copa (ratio copa vs botella)."
          bullets={[
            "Cada escenario representa una estrategia distinta: más copa, mejor mix o acción combinada.",
            "Usa tus datos reales de cubiertos, días de apertura y precios.",
            "El resultado es una estimación orientativa. El impacto real depende de la implementación.",
          ]}
        />
      </div>

      {/* CALCULATOR */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Calculator size={20} className="text-wine" /> Introduce tus datos
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Cubiertos diarios (media)</Label>
              <Input type="number" value={cubiertos} onChange={e => setCubiertos(Number(e.target.value))}
                className="bg-background" min={1} />
              <p className="text-xs text-muted-foreground mt-1">Número medio de comensales por día.</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Días de apertura al mes</Label>
              <Input type="number" value={diasMes} onChange={e => setDiasMes(Number(e.target.value))}
                className="bg-background" min={1} max={31} />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Penetración actual del vino (%)</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={5} max={90} value={ratioVino}
                  onChange={e => setRatioVino(Number(e.target.value))}
                  className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{ratioVino}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">% de mesas que piden al menos un vino (copa o botella).</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Ticket medio en vino por mesa (€)</Label>
              <Input type="number" value={ticketVinoActual} onChange={e => setTicketVinoActual(Number(e.target.value))}
                className="bg-background" min={1} step={0.5} />
              <p className="text-xs text-muted-foreground mt-1">Gasto medio en vino por mesa que sí pide (copas + botellas).</p>
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-1.5 block">Ratio actual de venta por copa (%)</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={ratioCopa}
                  onChange={e => setRatioCopa(Number(e.target.value))}
                  className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{ratioCopa}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">% de la facturación de vino que corresponde a venta por copa.</p>
            </div>
          </div>

          <Button onClick={() => { setCalculated(true); setActiveScenario("full"); }}
            className="w-full bg-gradient-wine text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            Simular escenarios
          </Button>

          {/* RESULTS */}
          {calculated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6">
              <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                <BarChart3 size={18} className="text-wine" /> Escenarios de mejora
              </h3>

              {/* Baseline */}
              <div className="p-5 rounded-xl border border-border bg-background">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Situación actual</p>
                <div className="grid grid-cols-3 gap-4 text-sm text-center">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Mesas con vino / mes</p>
                    <p className="font-heading text-lg font-bold">{fmt(results.mesasConVino)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Ticket vino / mesa</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(ticketVinoActual)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Facturación vino / mes</p>
                    <p className="font-heading text-lg font-bold">{fmtEur(results.facturacionActual)}</p>
                  </div>
                </div>
              </div>

              {/* Scenario selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {results.scenarioResults.filter(s => s.id !== "base").map(sc => (
                  <button key={sc.id} onClick={() => setActiveScenario(sc.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${activeScenario === sc.id ? "border-wine/50 bg-wine/5 shadow-sm" : "border-border bg-background hover:border-wine/30"}`}>
                    <p className="text-xs font-semibold tracking-wide uppercase text-wine mb-1">{sc.label}</p>
                    <p className="font-heading text-xl font-bold text-foreground">
                      {sc.incrementoMes > 0 ? "+" : ""}{fmtEur(sc.incrementoMes)}
                    </p>
                    <p className="text-[11px] text-muted-foreground">/mes · +{sc.incrementoPct.toFixed(0)}%</p>
                  </button>
                ))}
              </div>

              {/* Selected scenario detail */}
              {selected && selected.id !== "base" && (
                <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl border border-wine/20 bg-wine/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-1">Escenario: {selected.label}</p>
                      <p className="text-sm text-muted-foreground">{selected.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-3xl font-bold text-wine">+{fmtEur(selected.incrementoMes)}</p>
                      <p className="text-xs text-muted-foreground">+{fmtEur(selected.incrementoAnual)}/año</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-wine/10">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Penetración</p>
                      <p className="font-heading text-lg font-bold">{selected.nuevoRatio}%</p>
                      {selected.deltaRatio > 0 && <p className="text-[11px] text-wine">+{selected.deltaRatio}pp</p>}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Ticket / mesa</p>
                      <p className="font-heading text-lg font-bold">{fmtEur(Math.round(selected.nuevoTicket * 100) / 100)}</p>
                      {selected.deltaTicket > 0 && <p className="text-[11px] text-wine">+{selected.deltaTicket}%</p>}
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-1">Ratio copa</p>
                      <p className="font-heading text-lg font-bold">{selected.nuevoCopa}%</p>
                      {selected.deltaCopa > 0 && <p className="text-[11px] text-wine">+{selected.deltaCopa}pp</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Interpretation */}
              <div className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-wine shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground mb-1">Cómo interpretar estos escenarios</p>
                    <p><strong>Más copa</strong> aumenta la penetración: más mesas acceden al vino a través de la copa. <strong>Mejor mix</strong> sube el ticket medio por mesa optimizando la escalera de precios y la visibilidad de gama media-alta. <strong>Copa + mix + sala</strong> combina ambas palancas con recomendación activa del equipo.</p>
                    <p className="mt-2">Un 15-25% de mejora es un rango realista para restaurantes que optimizan su carta con datos. Resultados superiores al 30% requieren cambios estructurales significativos.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATIONAL BLOCK */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">Cómo mejorar el ticket medio en vino</h2>
            <div className="space-y-4">
              {[
                { icon: GlassWater, title: "Copa premium como palanca", desc: "Una copa entre 8-12€ ancla el valor percibido y hace que la copa estándar parezca una buena opción. No necesita venderse mucho para cumplir su función." },
                { icon: Wine, title: "Maridaje visible en carta", desc: "Cada plato principal con un vino sugerido reduce la barrera de decisión. Los restaurantes con maridajes visibles venden un 15-25% más de vino." },
                { icon: Users, title: "Recomendación activa del equipo", desc: "'Con este plato va muy bien este Verdejo, ¿te sirvo una copa?' es la acción de venta más rentable en restauración." },
                { icon: DollarSign, title: "Escalera de precios sin huecos", desc: "Si hay un salto entre tu copa a 5€ y tu botella más barata a 22€, pierdes al cliente que gastaría 8-10€." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background">
                  <div className="w-9 h-9 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-wine" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold mb-6">Errores comunes al intentar subir el ticket medio</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { error: "Subir precios sin dato", fix: "Subir precios sin medir elasticidad puede bajar el volumen. Primero mide, luego ajusta." },
              { error: "Eliminar opciones de entrada", fix: "Los vinos de entrada no son un problema: son la puerta de entrada al vino para el 40% de mesas." },
              { error: "Presionar al camarero para que 'venda más'", fix: "Sin formación ni herramientas, la presión genera incomodidad, no ventas." },
              { error: "Ignorar la copa como palanca", fix: "La copa es la forma más segura de aumentar el % de mesas que piden vino." },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-background">
                <p className="text-sm font-bold text-foreground mb-1">❌ {item.error}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">✓ {item.fix}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <FAQSection
        schemaId="calc-ticket-faq"
        faqs={[
          { q: "¿Un 20% de mejora es realista?", a: "Sí, para restaurantes que parten de un ratio de vino bajo (< 40% de mesas) y no tienen estrategia de copa ni recomendación activa. Con optimización de carta + formación de equipo, 15-25% es un rango habitual." },
          { q: "¿Cuánto tarda en notarse el impacto?", a: "Las mejoras de pricing y copa se notan en 2-4 semanas. La formación de equipo genera resultados en 1-2 semanas. Winerim permite medir el impacto desde el primer día." },
          { q: "¿Qué tiene más impacto: más mesas que pidan o mayor gasto por mesa?", a: "Depende de tu punto de partida. Si menos del 35% de mesas pide vino, la prioridad es aumentar el ratio (a través de copa y accesibilidad). Si el ratio ya es alto, la palanca es subir el ticket (copa premium, maridajes, recomendación)." },
          { q: "¿Winerim calcula esto automáticamente?", a: "Sí. Winerim monitoriza el ticket medio en vino por mesa, el ratio de mesas que piden y la evolución mensual. Además, sugiere acciones concretas para mejorar cada palanca." },
        ]}
      />

      {/* INTERNAL LINKS */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <InternalLinks links={[
          { to: "/analisis-carta", label: "Analizador de carta gratuito", type: "tool" },
          { to: "/article/como-mejorar-ticket-medio-vino-con-datos", label: "Cómo mejorar el ticket medio con datos", type: "guide" },
          { to: "/guias/como-decidir-surtido-segun-ticket-medio-tipo-local", label: "Surtido según ticket medio", type: "guide" },
          { to: "/calculadora-margen-vino", label: "Calculadora de margen de vino", type: "tool" },
          { to: "/producto/winerim-core", label: "Winerim Core: analítica completa", type: "solution" },
          { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
        ]} />
      </div>

      {/* ── DUAL CTA: CORE + ID ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-10 md:p-14">
            <Sparkles size={28} className="text-wine mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Winerim conecta análisis y acción en tiempo real
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Winerim Core analiza penetración, mix y copa. La Inteligencia Dinámica activa las recomendaciones del equipo en sala para que el impacto se traduzca en facturación real.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/producto/winerim-core"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                Ver Winerim Core <ArrowRight size={16} />
              </Link>
              <Link to="/producto/inteligencia-dinamica"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                <Zap size={16} /> Inteligencia Dinámica
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default CalculadoraTicketMedio;
