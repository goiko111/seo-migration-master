import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Package, TrendingUp, AlertTriangle,
  DollarSign, RotateCcw, Sparkles, CheckCircle, ShoppingCart, Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import SummaryBox from "@/components/seo/SummaryBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";

const fmtEur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

type Suggestion = "mantener" | "renegociar" | "no-reponer" | "buscar-alternativa";

const suggestionMeta: Record<Suggestion, { label: string; color: string; bg: string; desc: string }> = {
  mantener:            { label: "Mantener",           color: "text-emerald-500",   bg: "bg-emerald-500/10", desc: "Referencia rentable con buena rotación y coste competitivo." },
  renegociar:          { label: "Renegociar",         color: "text-amber-500",     bg: "bg-amber-500/10",   desc: "Rotación aceptable pero coste mejorable. Contacta al proveedor con datos." },
  "no-reponer":        { label: "No reponer",         color: "text-destructive",   bg: "bg-destructive/10", desc: "Stock excesivo o rotación insuficiente. Agota stock actual sin reponer." },
  "buscar-alternativa":{ label: "Buscar alternativa",  color: "text-destructive",   bg: "bg-destructive/10", desc: "Coste demasiado alto y/o margen por debajo del objetivo. Busca una referencia equivalente." },
};

const CalculadoraCompraInteligente = () => {
  const [nombre, setNombre] = useState("Ribera del Duero Crianza");
  const [coste, setCoste] = useState(8);
  const [pvp, setPvp] = useState(28);
  const [ventasMes, setVentasMes] = useState(6);
  const [stock, setStock] = useState(12);
  const [diasSinVenta, setDiasSinVenta] = useState(14);
  const [costeAlt, setCosteAlt] = useState(6);
  const [margenDeseado, setMargenDeseado] = useState(70);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "calc-compra-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Compra Inteligente de Vinos",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Analiza si una referencia de vino merece la pena: rentabilidad, señal de reposición, sobreprecio y oportunidad de mejora. Demo de Winerim Supply.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("calc-compra-jsonld")?.remove(); };
  }, []);

  const results = useMemo(() => {
    const margenBruto = pvp - coste;
    const margenPct = pvp > 0 ? (margenBruto / pvp) * 100 : 0;
    const capitalInmovilizado = stock * coste;
    const mesesStock = ventasMes > 0 ? stock / ventasMes : Infinity;
    const facturacionMes = ventasMes * pvp;
    const beneficioMes = ventasMes * margenBruto;

    // Reposition signal
    let senalRepo: "ok" | "revisar" | "urgente" = "ok";
    if (mesesStock > 3 || diasSinVenta > 90) senalRepo = "urgente";
    else if (mesesStock > 1.5 || diasSinVenta > 45) senalRepo = "revisar";

    // Overpricing signal
    const ahorroPorUnidad = coste - costeAlt;
    const ahorroMes = ahorroPorUnidad * ventasMes;
    const ahorroAnual = ahorroMes * 12;
    let senalSobreprecio: "ok" | "revisar" | "alto" = "ok";
    if (costeAlt > 0 && ahorroPorUnidad > coste * 0.15) senalSobreprecio = "alto";
    else if (costeAlt > 0 && ahorroPorUnidad > coste * 0.05) senalSobreprecio = "revisar";

    // Alt margin
    const margenAlt = pvp - costeAlt;
    const margenAltPct = pvp > 0 ? (margenAlt / pvp) * 100 : 0;

    // Margin gap
    const margenGap = margenDeseado - margenPct;
    const cumpleMargen = margenPct >= margenDeseado;

    // Suggestion logic
    let suggestion: Suggestion = "mantener";
    if (senalRepo === "urgente" && senalSobreprecio !== "ok") suggestion = "buscar-alternativa";
    else if (senalRepo === "urgente") suggestion = "no-reponer";
    else if (senalSobreprecio === "alto" || (!cumpleMargen && margenGap > 15)) suggestion = "buscar-alternativa";
    else if (senalSobreprecio === "revisar" || !cumpleMargen) suggestion = "renegociar";

    return {
      margenBruto, margenPct, capitalInmovilizado, mesesStock,
      facturacionMes, beneficioMes, senalRepo, senalSobreprecio,
      ahorroPorUnidad, ahorroMes, ahorroAnual, margenAlt, margenAltPct,
      margenGap, cumpleMargen, suggestion,
    };
  }, [coste, pvp, ventasMes, stock, diasSinVenta, costeAlt, margenDeseado]);

  const repoLabel = { ok: "Bajo control", revisar: "Revisar", urgente: "Exceso de stock" };
  const repoColor = { ok: "text-emerald-500", revisar: "text-amber-500", urgente: "text-destructive" };
  const repoBg = { ok: "bg-emerald-500/10", revisar: "bg-amber-500/10", urgente: "bg-destructive/10" };

  const sobreLabel = { ok: "Competitivo", revisar: "Margen de mejora", alto: "Sobreprecio probable" };
  const sobreColor = { ok: "text-emerald-500", revisar: "text-amber-500", alto: "text-destructive" };
  const sobreBg = { ok: "bg-emerald-500/10", revisar: "bg-amber-500/10", alto: "bg-destructive/10" };

  const sg = suggestionMeta[results.suggestion];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Compra Inteligente | Demo Winerim Supply"
        description="Analiza si una referencia de vino merece la pena: rentabilidad, señal de reposición, sobreprecio y oportunidad de mejora. Demo simplificada de Winerim Supply."
        url={`${CANONICAL_DOMAIN}/herramientas/calculadora-compra-inteligente`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-emerald-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(150_40%_30%/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Herramientas", href: "/herramientas" },
            { label: "Calculadora de compra inteligente" },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-6">
            <ShoppingCart size={14} className="text-emerald-500" />
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-500">Demo · Winerim Supply</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Calculadora de Compra Inteligente
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Una demo simplificada para ayudarte a decidir si una referencia merece la pena reponerse, renegociarse o sustituirse.
          </motion.p>
        </div>
      </section>

      {/* ── DEMO INTRO BLOCK ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-4">
        <ScrollReveal>
          <div className="relative bg-gradient-card rounded-2xl border border-emerald-500/20 p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,hsl(150_40%_30%/0.05),transparent_60%)]" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="font-heading text-base font-bold text-foreground mb-1">
                  Comprar bien es la primera decisión de rentabilidad
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Winerim Supply analiza cada referencia cruzando coste de compra, rotación, stock, margen objetivo y alternativas de mercado para decidir si mantener, renegociar, no reponer o buscar sustituto.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ToolStrategicBlock
        layer="supply"
        decides={[
          "Si una referencia justifica su coste de compra actual",
          "Si conviene reponer, renegociar o sustituir por alternativa",
          "Cuánto capital tienes bloqueado y si cumples tu margen objetivo",
        ]}
        avoids={[
          "Reponer referencias que no rotan lo suficiente",
          "Pagar más que el mercado por una misma referencia",
          "Inmovilizar capital en stock sin retorno claro",
        ]}
        impact={[
          "Reducción del coste medio de compra por referencia",
          "Liberación de capital bloqueado en stock sin salida",
          "Decisiones de compra basadas en dato, no en inercia",
        ]}
      />

      {/* CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Package size={20} className="text-emerald-500" /> Datos de la referencia
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-1.5 block">Referencia</Label>
              <Input value={nombre} onChange={e => setNombre(e.target.value)}
                className="bg-background" placeholder="Ej: Ribera del Duero Crianza" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Coste actual (€/ud)</Label>
              <Input type="number" min={0} step={0.5} value={coste}
                onChange={e => setCoste(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">PVP actual (€)</Label>
              <Input type="number" min={0} step={0.5} value={pvp}
                onChange={e => setPvp(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Ventas mensuales (uds)</Label>
              <Input type="number" min={0} value={ventasMes}
                onChange={e => setVentasMes(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Stock actual (uds)</Label>
              <Input type="number" min={0} value={stock}
                onChange={e => setStock(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Días desde última venta</Label>
              <Input type="number" min={0} value={diasSinVenta}
                onChange={e => setDiasSinVenta(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
              <p className="text-xs text-muted-foreground mt-1">Cuántos días lleva sin venderse una unidad.</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Coste alternativo estimado (€/ud)</Label>
              <Input type="number" min={0} step={0.5} value={costeAlt}
                onChange={e => setCosteAlt(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
              <p className="text-xs text-muted-foreground mt-1">Coste de una referencia equivalente de otro proveedor.</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Margen deseado (%)</Label>
              <div className="flex items-center gap-3">
                <input type="range" min={40} max={85} value={margenDeseado}
                  onChange={e => setMargenDeseado(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 h-2" />
                <span className="text-sm font-semibold w-12 text-right">{margenDeseado}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Margen sobre PVP que consideras objetivo para esta categoría.</p>
            </div>
          </div>

          <Button onClick={() => setCalculated(true)}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            Analizar referencia
          </Button>
        </motion.div>
      </section>

      {/* RESULTS */}
      {calculated && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Suggestion banner */}
            <div className={`p-6 rounded-2xl border ${sg.bg} text-center`}>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-2">Sugerencia para «{nombre || "referencia"}»</p>
              <p className={`font-heading text-3xl md:text-4xl font-bold ${sg.color}`}>{sg.label}</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">{sg.desc}</p>
            </div>

            {/* Key metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <TrendingUp size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Rentabilidad actual</p>
                <p className="font-heading text-2xl font-bold text-wine">{results.margenPct.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">{fmtEur(results.margenBruto)} / botella</p>
                {!results.cumpleMargen && (
                  <p className="text-[11px] text-destructive mt-1">-{results.margenGap.toFixed(0)}pp vs objetivo</p>
                )}
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <DollarSign size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Capital inmovilizado</p>
                <p className="font-heading text-2xl font-bold">{fmtEur(results.capitalInmovilizado)}</p>
                <p className="text-xs text-muted-foreground">{stock} uds × {fmtEur(coste)}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <RotateCcw size={18} className={`mx-auto mb-2 ${repoColor[results.senalRepo]}`} />
                <p className="text-xs text-muted-foreground mb-1">Señal de reposición</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${repoBg[results.senalRepo]} ${repoColor[results.senalRepo]}`}>
                  {repoLabel[results.senalRepo]}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{results.mesesStock === Infinity ? "∞" : results.mesesStock.toFixed(1)} meses · {diasSinVenta}d sin venta</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <AlertTriangle size={18} className={`mx-auto mb-2 ${sobreColor[results.senalSobreprecio]}`} />
                <p className="text-xs text-muted-foreground mb-1">Señal de sobreprecio</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${sobreBg[results.senalSobreprecio]} ${sobreColor[results.senalSobreprecio]}`}>
                  {sobreLabel[results.senalSobreprecio]}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{results.ahorroPorUnidad > 0 ? `+${fmtEur(results.ahorroPorUnidad)}/ud vs alt.` : "Coste competitivo"}</p>
              </div>
            </div>

            {/* Opportunity */}
            {results.ahorroPorUnidad > 0 && (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-heading font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-500" /> Oportunidad de mejora
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Ahorro por unidad</p>
                    <p className="font-heading text-xl font-bold text-emerald-500">{fmtEur(results.ahorroPorUnidad)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Ahorro mensual</p>
                    <p className="font-heading text-xl font-bold text-emerald-500">{fmtEur(results.ahorroMes)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Ahorro anual estimado</p>
                    <p className="font-heading text-xl font-bold text-emerald-500">{fmtEur(results.ahorroAnual)}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Con la alternativa a {fmtEur(costeAlt)}/ud, el margen sube de {results.margenPct.toFixed(0)}% a {results.margenAltPct.toFixed(0)}% manteniendo el mismo PVP.
                </p>
              </div>
            )}

            {/* Resumen operativo */}
            <div className="p-6 rounded-xl border border-border bg-gradient-card">
              <h3 className="font-heading font-bold mb-4">Resumen operativo mensual</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Facturación mensual</span><span className="font-semibold">{fmtEur(results.facturacionMes)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Beneficio bruto mensual</span><span className="font-semibold text-wine">{fmtEur(results.beneficioMes)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Margen actual vs objetivo</span>
                  <span className={`font-semibold ${results.cumpleMargen ? "text-emerald-500" : "text-destructive"}`}>
                    {results.margenPct.toFixed(0)}% / {margenDeseado}% {results.cumpleMargen ? "✓" : "✗"}
                  </span>
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">Días desde última venta</span><span className="font-semibold">{diasSinVenta}d</span></div>
              </div>
            </div>

            {/* Insight */}
            <div className="p-4 rounded-xl border border-border bg-background">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Info size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                {results.suggestion === "mantener"
                  ? "Esta referencia tiene buena rotación, coste competitivo y margen dentro del objetivo. Mantén las condiciones actuales y revisa periódicamente."
                  : results.suggestion === "renegociar"
                  ? "La referencia tiene potencial pero el coste o el margen no están alineados con tu objetivo. Usa estos datos como argumento para renegociar condiciones con tu proveedor."
                  : results.suggestion === "no-reponer"
                  ? "La rotación es demasiado lenta o el stock acumulado es excesivo. Agota el stock actual (considera copa o promoción) y no repongas hasta que los datos mejoren."
                  : "El coste de compra es significativamente alto y/o el margen está muy por debajo del objetivo. Busca una referencia equivalente que te permita mantener el PVP con mejor rentabilidad."
                }
              </p>
            </div>
          </motion.div>
        </section>
      )}

      {/* SUPPLY CTA BLOCK */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="relative text-center bg-gradient-card rounded-2xl border border-emerald-500/20 p-10 md:p-14 overflow-hidden">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(150_40%_30%/0.06),transparent_70%)]" />
            <div className="relative z-10">
              <ShoppingCart size={28} className="text-emerald-500 mx-auto mb-4" />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-500 mb-4">Demo simplificada</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Esta herramienta es una demo simplificada de Winerim Supply
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                La plataforma completa analiza todas tus referencias en paralelo, cruza datos de venta, stock y distribuidores, y te genera recomendaciones automáticas de compra, renegociación y retirada.
              </p>
              <Link to="/producto/winerim-supply"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                Ver Winerim Supply <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQSection schemaId="compra-inteligente" faqs={[
        { q: "¿Qué diferencia hay entre esta calculadora y la de stock muerto?", a: "La calculadora de stock muerto evalúa el capital inmovilizado en referencias sin rotación. Esta herramienta va un paso más allá: analiza si una referencia concreta merece seguir comprándose, comparando su rentabilidad, rotación y coste frente a alternativas." },
        { q: "¿Qué es el 'coste alternativo estimado'?", a: "Es el precio al que podrías conseguir una referencia equivalente (misma categoría, estilo y calidad percibida) de otro proveedor o de otra añada. Sirve para detectar si estás pagando más de lo necesario." },
        { q: "¿Cuándo debería renegociar con mi proveedor?", a: "Cuando la señal de sobreprecio indica 'Margen de mejora' o 'Sobreprecio probable'. También cuando el margen actual está por debajo de tu objetivo y la rotación no justifica el coste." },
        { q: "¿Winerim Supply hace esto automáticamente?", a: "Sí. Winerim Supply analiza todas tus referencias en paralelo, cruza datos de compra con ventas y rotación, y genera alertas y recomendaciones automáticas. Esta calculadora es una demo simplificada de esa capacidad." },
      ]} />

      <InternalLinks links={[
        { to: "/herramientas/calculadora-stock-muerto", label: "Calculadora de stock muerto", type: "tool" },
        { to: "/calculadora-margen-vino", label: "Calculadora de márgenes", type: "tool" },
        { to: "/producto/winerim-supply", label: "Winerim Supply: inteligencia de compras", type: "solution" },
        { to: "/producto/winerim-core", label: "Winerim Core: analítica completa", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default CalculadoraCompraInteligente;
