import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, TrendingUp, Wine, DollarSign, Users,
  Calculator, Sparkles, Info, BarChart3, GlassWater
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

const CalculadoraTicketMedio = () => {
  const [cubiertos, setCubiertos] = useState(120);
  const [diasMes, setDiasMes] = useState(26);
  const [ratioVino, setRatioVino] = useState(35);
  const [ticketVinoActual, setTicketVinoActual] = useState(8);
  const [ratioCopa, setRatioCopa] = useState(40);
  const [mejoraPct, setMejoraPct] = useState(20);
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

    // Scenario 1: increase ratio of tables ordering wine
    const nuevoRatio = Math.min(ratioVino + (mejoraPct * 0.4), 85);
    const mesasConVinoNuevo = Math.round(mesasMes * (nuevoRatio / 100));

    // Scenario 2: increase ticket per table
    const nuevoTicket = ticketVinoActual * (1 + mejoraPct / 100 * 0.6);

    const facturacionNueva = mesasConVinoNuevo * nuevoTicket;
    const incrementoMes = facturacionNueva - facturacionActual;
    const incrementoAnual = incrementoMes * 12;
    const incrementoPct = facturacionActual > 0 ? ((facturacionNueva - facturacionActual) / facturacionActual) * 100 : 0;

    return {
      mesasMes,
      mesasConVino,
      mesasConVinoNuevo,
      facturacionActual,
      facturacionNueva,
      nuevoTicket,
      nuevoRatio,
      incrementoMes,
      incrementoAnual,
      incrementoPct,
    };
  }, [cubiertos, diasMes, ratioVino, ticketVinoActual, ratioCopa, mejoraPct]);

  const fmt = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtEur = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + "€";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Impacto en Ticket Medio del Vino | Winerim"
        description="Estima cuánto más podrías facturar en vino mejorando el ticket medio, el ratio de mesas que piden y la estrategia de copa. Herramienta gratuita."
        url={`${CANONICAL_DOMAIN}/herramientas/calculadora-ticket-medio-vino`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Calculadora ticket medio vino" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <TrendingUp size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Calculadora de impacto en ticket medio del vino
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estima cuánto más podrías facturar en vino al mes mejorando el ratio de mesas que piden, el ticket por mesa y la estrategia de copa. Introduce tus datos reales y obtén un resultado accionable.
          </motion.p>
        </div>
      </section>

      <ToolStrategicBlock
        layer="core"
        decides={[
          "Cuánto más podrías facturar en vino con mejoras realistas",
          "Si la palanca es más mesas pidiendo vino o mayor gasto por mesa",
          "Qué escenario de mejora es más alcanzable para tu tipo de negocio",
        ]}
        avoids={[
          "Subir precios sin medir el impacto en volumen",
          "Invertir en formación sin saber qué palanca mover primero",
          "Tomar decisiones de carta sin una estimación de retorno",
        ]}
        impact={[
          "Incremento de facturación mensual en vino estimado y accionable",
          "Priorización de las palancas con mayor impacto potencial",
          "Base cuantitativa para justificar inversiones en carta o formación",
        ]}
      />

      {/* SUMMARY BOX */}
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SummaryBox
          label="Qué calcula esta herramienta"
          definition="Estima el incremento mensual y anual de facturación de vino al mejorar dos palancas: el % de mesas que piden vino y el gasto medio en vino por mesa."
          bullets={[
            "Combina mejoras en ratio de mesas + ticket medio por mesa.",
            "Usa parámetros reales de tu restaurante (cubiertos, días, precios).",
            "El resultado es una estimación orientativa, no una garantía. El impacto real depende de la implementación.",
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
              <Label className="text-sm font-medium mb-1.5 block">% de mesas que piden vino actualmente</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={5} max={90} value={ratioVino}
                  onChange={e => setRatioVino(Number(e.target.value))}
                  className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{ratioVino}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Estimación del % de mesas que piden al menos un vino.</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Ticket medio en vino por mesa (€)</Label>
              <Input type="number" value={ticketVinoActual} onChange={e => setTicketVinoActual(Number(e.target.value))}
                className="bg-background" min={1} step={0.5} />
              <p className="text-xs text-muted-foreground mt-1">Gasto medio en vino por mesa que sí pide (copas + botellas).</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">% de ventas de vino que son por copa</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={ratioCopa}
                  onChange={e => setRatioCopa(Number(e.target.value))}
                  className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{ratioCopa}%</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Mejora estimada (%)</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={5} max={50} value={mejoraPct}
                  onChange={e => setMejoraPct(Number(e.target.value))}
                  className="flex-1 accent-wine h-2" />
                <span className="text-sm font-semibold w-12 text-right">{mejoraPct}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">% de mejora objetivo combinando más mesas + mayor ticket. 15-25% es un rango realista con optimización de carta.</p>
            </div>
          </div>

          <Button onClick={() => setCalculated(true)}
            className="w-full bg-gradient-wine text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            Calcular impacto
          </Button>

          {/* RESULTS */}
          {calculated && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6">
              <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                <BarChart3 size={18} className="text-wine" /> Resultados estimados
              </h3>

              {/* Current vs Projected */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border bg-background">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Situación actual</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Mesas con vino / mes</span><span className="font-semibold">{fmt(results.mesasConVino)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Ticket medio vino / mesa</span><span className="font-semibold">{fmtEur(ticketVinoActual)}</span></div>
                    <div className="flex justify-between border-t border-border pt-2 mt-2"><span className="font-medium">Facturación vino / mes</span><span className="font-bold text-foreground">{fmtEur(results.facturacionActual)}</span></div>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-wine/30 bg-wine/5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-3">Con optimización (+{mejoraPct}%)</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Mesas con vino / mes</span><span className="font-semibold">{fmt(results.mesasConVinoNuevo)} <span className="text-wine text-xs">(+{Math.round(results.nuevoRatio - ratioVino)}pp)</span></span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Ticket medio vino / mesa</span><span className="font-semibold">{fmtEur(Math.round(results.nuevoTicket * 100) / 100)}</span></div>
                    <div className="flex justify-between border-t border-wine/20 pt-2 mt-2"><span className="font-medium">Facturación vino / mes</span><span className="font-bold text-wine">{fmtEur(results.facturacionNueva)}</span></div>
                  </div>
                </div>
              </div>

              {/* Impact summary */}
              <div className="p-6 rounded-xl border border-wine/30 bg-gradient-to-r from-wine/5 to-wine/10 text-center">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-2">Incremento potencial</p>
                <p className="font-heading text-3xl md:text-4xl font-bold text-wine mb-1">+{fmtEur(results.incrementoMes)}/mes</p>
                <p className="text-sm text-muted-foreground">+{fmtEur(results.incrementoAnual)}/año · +{Math.round(results.incrementoPct)}% sobre facturación actual</p>
              </div>

              {/* Interpretation */}
              <div className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-wine shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground mb-1">Cómo interpretar este resultado</p>
                    <p>Esta estimación combina dos palancas: aumentar el % de mesas que piden vino (40% del efecto) y aumentar el gasto medio por mesa (60% del efecto). El impacto real dependerá de tu implementación: pricing, copa, recomendación del equipo y experiencia de carta.</p>
                    <p className="mt-2">Un 15-25% de mejora es un rango realista para restaurantes que optimizan su carta con datos. Resultados superiores al 30% requieren cambios estructurales significativos.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/demo"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  Solicitar demo <ArrowRight size={16} />
                </Link>
                <Link to="/analisis-carta"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  Analizar mi carta gratis
                </Link>
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

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-10 md:p-14">
            <Sparkles size={28} className="text-wine mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Con Winerim, no necesitas calcular manualmente
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm leading-relaxed">
              Winerim monitoriza tu ticket medio en vino en tiempo real, detecta oportunidades de mejora y te dice exactamente qué hacer. Pricing, copa, maridajes y formación — todo automatizado.
            </p>
            <Link to="/demo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Solicitar demo gratuita <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default CalculadoraTicketMedio;
