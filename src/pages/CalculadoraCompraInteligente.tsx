import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Package, TrendingUp, AlertTriangle,
  DollarSign, RotateCcw, Sparkles, CheckCircle, ShoppingCart
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
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";

const fmtEur = (n: number) =>
  n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const CalculadoraCompraInteligente = () => {
  const [nombre, setNombre] = useState("Ribera del Duero Crianza");
  const [coste, setCoste] = useState(8);
  const [pvp, setPvp] = useState(28);
  const [ventasMes, setVentasMes] = useState(6);
  const [stock, setStock] = useState(12);
  const [diasSinRepo, setDiasSinRepo] = useState(45);
  const [costeAlt, setCosteAlt] = useState(6);
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const margenBruto = pvp - coste;
    const margenPct = pvp > 0 ? (margenBruto / pvp) * 100 : 0;
    const capitalInmovilizado = stock * coste;
    const mesesStock = ventasMes > 0 ? stock / ventasMes : Infinity;
    const facturacionMes = ventasMes * pvp;
    const beneficioMes = ventasMes * margenBruto;

    // Reposition signal
    let senalRepo: "ok" | "revisar" | "urgente" = "ok";
    if (mesesStock > 3) senalRepo = "urgente";
    else if (mesesStock > 1.5) senalRepo = "revisar";

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

    return {
      margenBruto, margenPct, capitalInmovilizado, mesesStock,
      facturacionMes, beneficioMes, senalRepo, senalSobreprecio,
      ahorroPorUnidad, ahorroMes, ahorroAnual, margenAlt, margenAltPct,
    };
  }, [coste, pvp, ventasMes, stock, diasSinRepo, costeAlt]);

  const repoLabel = { ok: "Bajo control", revisar: "Revisar", urgente: "Exceso de stock" };
  const repoColor = { ok: "text-emerald-500", revisar: "text-yellow-500", urgente: "text-destructive" };
  const repoBg = { ok: "bg-emerald-500/10", revisar: "bg-yellow-500/10", urgente: "bg-destructive/10" };

  const sobreLabel = { ok: "Competitivo", revisar: "Margen de mejora", alto: "Sobreprecio probable" };
  const sobreColor = { ok: "text-emerald-500", revisar: "text-yellow-500", alto: "text-destructive" };
  const sobreBg = { ok: "bg-emerald-500/10", revisar: "bg-yellow-500/10", alto: "bg-destructive/10" };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Compra Inteligente de Vinos | Winerim"
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
            <ShoppingCart size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">Demo de Winerim Supply</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Calculadora de compra inteligente
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            ¿Estás pagando caro? ¿Tiene sentido reponer? ¿Cuánto capital inmovilizas? Analiza cada referencia con criterio antes de decidir.
          </motion.p>
        </div>
      </section>

      <ToolStrategicBlock
        layer="supply"
        decides={[
          "Si una referencia justifica su coste de compra actual",
          "Si conviene reponer, renegociar o sustituir",
          "Cuánto capital tienes bloqueado en esa referencia",
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
            <Package size={20} className="text-emerald-400" /> Datos de la referencia
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div className="md:col-span-2">
              <Label className="text-sm font-medium mb-1.5 block">Nombre de la referencia</Label>
              <Input value={nombre} onChange={e => setNombre(e.target.value)}
                className="bg-background" placeholder="Ej: Ribera del Duero Crianza" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Precio de compra (€/ud)</Label>
              <Input type="number" min={0} step={0.5} value={coste}
                onChange={e => setCoste(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">PVP en carta (€)</Label>
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
              <Label className="text-sm font-medium mb-1.5 block">Días desde última reposición</Label>
              <Input type="number" min={0} value={diasSinRepo}
                onChange={e => setDiasSinRepo(Math.max(0, parseInt(e.target.value) || 0))} className="bg-background" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1.5 block">Coste alternativo estimado (€/ud)</Label>
              <Input type="number" min={0} step={0.5} value={costeAlt}
                onChange={e => setCosteAlt(Math.max(0, parseFloat(e.target.value) || 0))} className="bg-background" />
              <p className="text-xs text-muted-foreground mt-1">Coste de una referencia equivalente de otro proveedor o añada.</p>
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

            {/* Header */}
            <div className="text-center p-6 rounded-2xl border border-border bg-gradient-card">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-2">Análisis de referencia</p>
              <p className="font-heading text-2xl md:text-3xl font-bold">{nombre || "Sin nombre"}</p>
            </div>

            {/* Key metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <TrendingUp size={18} className="text-wine mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Margen bruto</p>
                <p className="font-heading text-2xl font-bold text-wine">{fmtEur(results.margenBruto)}</p>
                <p className="text-xs text-muted-foreground">{results.margenPct.toFixed(0)}% sobre PVP</p>
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
                <p className="text-xs text-muted-foreground mt-1">{results.mesesStock === Infinity ? "∞" : results.mesesStock.toFixed(1)} meses de stock</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-gradient-card text-center">
                <AlertTriangle size={18} className={`mx-auto mb-2 ${sobreColor[results.senalSobreprecio]}`} />
                <p className="text-xs text-muted-foreground mb-1">Señal de sobreprecio</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${sobreBg[results.senalSobreprecio]} ${sobreColor[results.senalSobreprecio]}`}>
                  {sobreLabel[results.senalSobreprecio]}
                </span>
                <p className="text-xs text-muted-foreground mt-1">vs. alternativa: {results.ahorroPorUnidad > 0 ? `+${fmtEur(results.ahorroPorUnidad)}/ud` : "igual o menor"}</p>
              </div>
            </div>

            {/* Opportunity */}
            {results.ahorroPorUnidad > 0 && (
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-heading font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-400" /> Oportunidad de mejora
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Ahorro por unidad</p>
                    <p className="font-heading text-xl font-bold text-emerald-400">{fmtEur(results.ahorroPorUnidad)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Ahorro mensual</p>
                    <p className="font-heading text-xl font-bold text-emerald-400">{fmtEur(results.ahorroMes)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Ahorro anual estimado</p>
                    <p className="font-heading text-xl font-bold text-emerald-400">{fmtEur(results.ahorroAnual)}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  Si cambias a la alternativa a {fmtEur(costeAlt)}/ud, el margen sube de {results.margenPct.toFixed(0)}% a {results.margenAltPct.toFixed(0)}% manteniendo el mismo PVP.
                </p>
              </div>
            )}

            {/* P&L summary */}
            <div className="p-6 rounded-xl border border-border bg-gradient-card">
              <h3 className="font-heading font-bold mb-4">Resumen operativo mensual</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Facturación mensual</span><span className="font-semibold">{fmtEur(results.facturacionMes)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Beneficio bruto mensual</span><span className="font-semibold text-wine">{fmtEur(results.beneficioMes)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Días desde última reposición</span><span className="font-semibold">{diasSinRepo}d</span></div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="font-medium">Veredicto</span>
                  <span className="font-semibold">
                    {results.senalRepo === "urgente" && results.senalSobreprecio !== "ok"
                      ? "Renegociar o sustituir"
                      : results.senalRepo === "urgente"
                      ? "Reducir stock, revisar reposición"
                      : results.senalSobreprecio === "alto"
                      ? "Buscar alternativa más competitiva"
                      : results.senalSobreprecio === "revisar"
                      ? "Explorar opciones de compra"
                      : "Referencia bien posicionada"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* SUPPLY DEMO BLOCK */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="relative text-center bg-gradient-card rounded-2xl border border-emerald-500/20 p-10 md:p-14 overflow-hidden">
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(150_40%_30%/0.06),transparent_70%)]" />
            <div className="relative z-10">
              <ShoppingCart size={28} className="text-emerald-400 mx-auto mb-4" />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-emerald-400 mb-4">Demo simplificada</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Esto es una fracción de lo que hace Winerim Supply
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                La plataforma completa analiza todas tus referencias en paralelo, cruza datos de venta, stock y distribuidores, y te genera recomendaciones automáticas de compra, renegociación y retirada. Sin cálculos manuales.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/producto/winerim-supply"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                  Ver Winerim Supply <ArrowRight size={16} />
                </Link>
                <Link to="/demo"
                  className="border border-border text-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-emerald-500/50 transition-colors">
                  Solicitar demo
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQSection schemaId="compra-inteligente" faqs={[
        { q: "¿Qué diferencia hay entre esta calculadora y la de stock muerto?", a: "La calculadora de stock muerto evalúa el capital inmovilizado en referencias sin rotación. Esta herramienta va un paso más allá: analiza si una referencia concreta merece seguir comprándose, comparando su rentabilidad, rotación y coste frente a alternativas." },
        { q: "¿Qué es el 'coste alternativo estimado'?", a: "Es el precio al que podrías conseguir una referencia equivalente (misma categoría, estilo y calidad percibida) de otro proveedor o de otra añada. Sirve para detectar si estás pagando más de lo necesario." },
        { q: "¿Cuándo debería renegociar con mi proveedor?", a: "Cuando la señal de sobreprecio indica 'Margen de mejora' o 'Sobreprecio probable'. También cuando llevas más de 3 meses de stock acumulado y el proveedor no ofrece condiciones de devolución." },
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
