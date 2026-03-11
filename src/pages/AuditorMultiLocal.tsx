import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, Wine, DollarSign, BarChart3,
  AlertTriangle, CheckCircle, Sparkles, Info, Plus, Trash2,
  Layers, Target
} from "lucide-react";
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

interface LocalData {
  nombre: string;
  referencias: number;
  ticketMedioVino: number;
  ratioVino: number;
  ratioCopa: number;
  precioMedioBottle: number;
  precioMedioCopa: number;
}

const emptyLocal = (): LocalData => ({
  nombre: "",
  referencias: 30,
  ticketMedioVino: 12,
  ratioVino: 35,
  ratioCopa: 30,
  precioMedioBottle: 22,
  precioMedioCopa: 6,
});

const AuditorMultiLocal = () => {
  const [locales, setLocales] = useState<LocalData[]>([
    { ...emptyLocal(), nombre: "Local 1" },
    { ...emptyLocal(), nombre: "Local 2" },
    { ...emptyLocal(), nombre: "Local 3" },
  ]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "auditor-multi-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Auditor de Carta de Vinos para Grupos Multi-Local",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "Compara la carta de vinos de múltiples locales: surtido, pricing, ratio de vino, copa y ticket medio. Detecta inconsistencias y oportunidades de mejora.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: CANONICAL_DOMAIN },
          { "@type": "ListItem", position: 2, name: "Herramientas", item: `${CANONICAL_DOMAIN}/herramientas` },
          { "@type": "ListItem", position: 3, name: "Auditor multi-local", item: `${CANONICAL_DOMAIN}/herramientas/auditor-carta-multilocal` },
        ],
      },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("auditor-multi-jsonld")?.remove(); };
  }, []);

  const addLocal = () => setLocales(prev => [...prev, { ...emptyLocal(), nombre: `Local ${prev.length + 1}` }]);
  const removeLocal = (i: number) => { if (locales.length > 2) setLocales(prev => prev.filter((_, idx) => idx !== i)); };
  const updateLocal = (i: number, field: keyof LocalData, value: string | number) => {
    setLocales(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
  };

  const analysis = useMemo(() => {
    if (locales.length < 2) return null;
    const valid = locales.filter(l => l.nombre.trim());
    if (valid.length < 2) return null;

    const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
    const stdDev = (arr: number[]) => {
      const m = avg(arr);
      return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
    };

    const refs = valid.map(l => l.referencias);
    const tickets = valid.map(l => l.ticketMedioVino);
    const ratios = valid.map(l => l.ratioVino);
    const copas = valid.map(l => l.ratioCopa);
    const pricesBottle = valid.map(l => l.precioMedioBottle);
    const pricesCopa = valid.map(l => l.precioMedioCopa);

    const refAvg = avg(refs);
    const refDev = stdDev(refs);
    const ticketAvg = avg(tickets);
    const ticketDev = stdDev(tickets);
    const ratioAvg = avg(ratios);
    const ratioDev = stdDev(ratios);
    const copaAvg = avg(copas);
    const copaDev = stdDev(copas);
    const priceBottleAvg = avg(pricesBottle);
    const priceBottleDev = stdDev(pricesBottle);
    const priceCopaAvg = avg(pricesCopa);
    const priceCopaDev = stdDev(pricesCopa);

    // Score: lower deviation = higher consistency
    const consistency = (dev: number, avg: number) => avg > 0 ? Math.max(0, Math.round(100 - (dev / avg) * 200)) : 50;

    const scores = {
      surtido: consistency(refDev, refAvg),
      pricing: consistency(priceBottleDev, priceBottleAvg),
      pricingCopa: consistency(priceCopaDev, priceCopaAvg),
      ratioVino: consistency(ratioDev, ratioAvg),
      ratioCopa: consistency(copaDev, copaAvg),
      ticketMedio: consistency(ticketDev, ticketAvg),
    };

    const globalScore = Math.round(Object.values(scores).reduce((s, v) => s + v, 0) / Object.keys(scores).length);

    // Find outliers
    const issues: { local: string; issue: string; severity: "high" | "medium" | "low" }[] = [];

    valid.forEach(l => {
      if (l.referencias < refAvg * 0.6) issues.push({ local: l.nombre, issue: `Surtido muy inferior a la media del grupo (${l.referencias} vs ${Math.round(refAvg)} refs)`, severity: "high" });
      if (l.referencias > refAvg * 1.5) issues.push({ local: l.nombre, issue: `Surtido muy superior a la media (${l.referencias} vs ${Math.round(refAvg)} refs). Posible sobredimensionamiento.`, severity: "medium" });
      if (l.precioMedioBottle < priceBottleAvg * 0.7) issues.push({ local: l.nombre, issue: `Precio medio de botella muy inferior (${l.precioMedioBottle}€ vs ${Math.round(priceBottleAvg)}€). Revisa pricing.`, severity: "high" });
      if (l.precioMedioBottle > priceBottleAvg * 1.3) issues.push({ local: l.nombre, issue: `Precio medio de botella muy superior (${l.precioMedioBottle}€ vs ${Math.round(priceBottleAvg)}€). ¿Justificado por perfil?`, severity: "medium" });
      if (l.ratioVino < ratioAvg * 0.6) issues.push({ local: l.nombre, issue: `Ratio de vino muy bajo (${l.ratioVino}% vs ${Math.round(ratioAvg)}%). Oportunidad de mejora.`, severity: "high" });
      if (l.ratioCopa < 15) issues.push({ local: l.nombre, issue: `Ratio de copa inferior al 15%. Oportunidad de crecimiento a través de copa.`, severity: "medium" });
      if (l.precioMedioCopa < priceCopaAvg * 0.7) issues.push({ local: l.nombre, issue: `Precio medio de copa inferior a la media (${l.precioMedioCopa}€ vs ${Math.round(priceCopaAvg * 10) / 10}€).`, severity: "medium" });
    });

    // Best practices
    const bestLocal = valid.reduce((best, l) => l.ticketMedioVino > best.ticketMedioVino ? l : best, valid[0]);
    const worstLocal = valid.reduce((worst, l) => l.ticketMedioVino < worst.ticketMedioVino ? l : worst, valid[0]);

    return {
      valid,
      scores,
      globalScore,
      issues,
      bestLocal,
      worstLocal,
      averages: { refAvg, ticketAvg, ratioAvg, copaAvg, priceBottleAvg, priceCopaAvg },
    };
  }, [locales]);

  const scoreColor = (s: number) => s >= 75 ? "text-green-500" : s >= 50 ? "text-amber-500" : "text-red-500";
  const scoreBg = (s: number) => s >= 75 ? "bg-green-500/10 border-green-500/20" : s >= 50 ? "bg-amber-500/10 border-amber-500/20" : "bg-red-500/10 border-red-500/20";
  const severityColor = (s: string) => s === "high" ? "border-red-500/30 bg-red-500/5" : s === "medium" ? "border-amber-500/30 bg-amber-500/5" : "border-border";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Auditor de Carta de Vinos para Grupos Multi-Local | Winerim"
        description="Compara la carta de vinos de tus locales: surtido, pricing, copa y ticket medio. Detecta inconsistencias, oportunidades y mejora la gestión centralizada."
        url={`${CANONICAL_DOMAIN}/herramientas/auditor-carta-multilocal`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Auditor multi-local" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Building2 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Herramienta para grupos</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
            Auditor de carta de vinos para grupos multi-local
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compara la gestión del vino en tus locales. Detecta inconsistencias de pricing, desequilibrios de surtido y oportunidades de mejora en tu grupo de restauración.
          </motion.p>
        </div>
      </section>

      {/* SUMMARY */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <SummaryBox
          label="Qué evalúa esta herramienta"
          definition="Compara 6 dimensiones de la carta de vinos entre tus locales y genera un diagnóstico de consistencia con alertas específicas por punto de venta."
          bullets={[
            "Surtido: número de referencias y equilibrio entre locales.",
            "Pricing: coherencia de precios medios de botella y copa.",
            "Ratio de vino: % de mesas que piden vino por local.",
            "Copa: penetración y pricing de la oferta por copa.",
            "Ticket medio: gasto en vino por mesa y desviaciones.",
          ]}
        />
      </div>

      {/* TOOL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Building2 size={20} className="text-wine" /> Datos por local
          </h2>

          <div className="space-y-6">
            {locales.map((local, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <Input
                    value={local.nombre}
                    onChange={e => updateLocal(i, "nombre", e.target.value)}
                    placeholder={`Local ${i + 1}`}
                    className="font-semibold max-w-xs"
                  />
                  {locales.length > 2 && (
                    <button onClick={() => removeLocal(i)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs mb-1 block">Nº referencias</Label>
                    <Input type="number" value={local.referencias} onChange={e => updateLocal(i, "referencias", Number(e.target.value))} className="text-sm" min={1} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Ticket vino/mesa (€)</Label>
                    <Input type="number" value={local.ticketMedioVino} onChange={e => updateLocal(i, "ticketMedioVino", Number(e.target.value))} className="text-sm" min={0} step={0.5} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">% mesas con vino</Label>
                    <Input type="number" value={local.ratioVino} onChange={e => updateLocal(i, "ratioVino", Number(e.target.value))} className="text-sm" min={0} max={100} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">% ventas en copa</Label>
                    <Input type="number" value={local.ratioCopa} onChange={e => updateLocal(i, "ratioCopa", Number(e.target.value))} className="text-sm" min={0} max={100} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Precio medio botella (€)</Label>
                    <Input type="number" value={local.precioMedioBottle} onChange={e => updateLocal(i, "precioMedioBottle", Number(e.target.value))} className="text-sm" min={0} step={0.5} />
                  </div>
                  <div>
                    <Label className="text-xs mb-1 block">Precio medio copa (€)</Label>
                    <Input type="number" value={local.precioMedioCopa} onChange={e => updateLocal(i, "precioMedioCopa", Number(e.target.value))} className="text-sm" min={0} step={0.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            {locales.length < 10 && (
              <Button variant="outline" onClick={addLocal} className="gap-2">
                <Plus size={14} /> Añadir local
              </Button>
            )}
          </div>

          <Button onClick={() => setCalculated(true)}
            className="w-full mt-6 bg-gradient-wine text-primary-foreground py-3 font-semibold tracking-wider uppercase hover:opacity-90">
            Auditar grupo
          </Button>

          {/* RESULTS */}
          {calculated && analysis && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6">

              {/* Global Score */}
              <div className={`p-6 rounded-xl border text-center ${scoreBg(analysis.globalScore)}`}>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Score de consistencia del grupo</p>
                <p className={`font-heading text-5xl font-bold ${scoreColor(analysis.globalScore)}`}>{analysis.globalScore}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {analysis.globalScore >= 75 ? "Alta consistencia. Buen control centralizado." :
                   analysis.globalScore >= 50 ? "Consistencia moderada. Hay oportunidades de estandarización." :
                   "Baja consistencia. Se recomienda implementar un framework de governance."}
                </p>
              </div>

              {/* Dimension scores */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Surtido", score: analysis.scores.surtido },
                  { label: "Pricing botella", score: analysis.scores.pricing },
                  { label: "Pricing copa", score: analysis.scores.pricingCopa },
                  { label: "Ratio de vino", score: analysis.scores.ratioVino },
                  { label: "Ratio de copa", score: analysis.scores.ratioCopa },
                  { label: "Ticket medio", score: analysis.scores.ticketMedio },
                ].map((dim, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-background text-center">
                    <p className="text-xs text-muted-foreground mb-1">{dim.label}</p>
                    <p className={`font-heading text-2xl font-bold ${scoreColor(dim.score)}`}>{dim.score}</p>
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">Local</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">Refs</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">Ticket</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">% Vino</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">% Copa</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">PVP bot.</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-muted-foreground">PVP copa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.valid.map((l, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 px-3 font-medium">{l.nombre}</td>
                        <td className="py-2 px-3 text-right">{l.referencias}</td>
                        <td className="py-2 px-3 text-right">{l.ticketMedioVino}€</td>
                        <td className="py-2 px-3 text-right">{l.ratioVino}%</td>
                        <td className="py-2 px-3 text-right">{l.ratioCopa}%</td>
                        <td className="py-2 px-3 text-right">{l.precioMedioBottle}€</td>
                        <td className="py-2 px-3 text-right">{l.precioMedioCopa}€</td>
                      </tr>
                    ))}
                    <tr className="bg-wine/5 font-semibold">
                      <td className="py-2 px-3 text-wine">Media grupo</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.refAvg)}</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.ticketAvg)}€</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.ratioAvg)}%</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.copaAvg)}%</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.priceBottleAvg)}€</td>
                      <td className="py-2 px-3 text-right">{Math.round(analysis.averages.priceCopaAvg * 10) / 10}€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Issues */}
              {analysis.issues.length > 0 && (
                <div>
                  <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500" /> Alertas detectadas
                  </h3>
                  <div className="space-y-2">
                    {analysis.issues.map((issue, i) => (
                      <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${severityColor(issue.severity)}`}>
                        <AlertTriangle size={14} className={issue.severity === "high" ? "text-red-500 shrink-0 mt-0.5" : "text-amber-500 shrink-0 mt-0.5"} />
                        <div className="text-sm">
                          <span className="font-semibold">{issue.local}:</span>{" "}
                          <span className="text-muted-foreground">{issue.issue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best & Worst */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-green-500 mb-2">Mejor ticket medio</p>
                  <p className="font-semibold">{analysis.bestLocal.nombre}</p>
                  <p className="text-sm text-muted-foreground">{analysis.bestLocal.ticketMedioVino}€/mesa · {analysis.bestLocal.ratioVino}% de mesas</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-2">Mayor oportunidad de mejora</p>
                  <p className="font-semibold">{analysis.worstLocal.nombre}</p>
                  <p className="text-sm text-muted-foreground">{analysis.worstLocal.ticketMedioVino}€/mesa · {analysis.worstLocal.ratioVino}% de mesas</p>
                </div>
              </div>

              {/* Interpretation */}
              <div className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-wine shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="font-medium text-foreground mb-1">Cómo interpretar este diagnóstico</p>
                    <p>El score de consistencia mide cuán homogénea es la gestión del vino entre tus locales. Un score alto (≥75) indica que los locales aplican estándares similares. Un score bajo (&lt;50) sugiere que cada local opera de forma autónoma sin framework común.</p>
                    <p className="mt-2">Las alertas señalan locales con valores significativamente alejados de la media del grupo. No siempre son problemas: un local premium puede tener pricing superior justificado. El objetivo es detectar desviaciones no intencionadas.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/demo"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  Solicitar demo para grupos <ArrowRight size={16} />
                </Link>
                <Link to="/soluciones/grupos-restauracion"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  Ver soluciones para grupos
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATIONAL BLOCK */}
      <section className="bg-gradient-card border-y border-border py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold mb-6">Qué evaluar en un grupo de restauración</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Layers, title: "Coherencia de surtido", desc: "¿Todos los locales tienen un número de referencias proporcional a su perfil? Un casual con 80 referencias o un gastronómico con 15 son señales de desajuste." },
                { icon: DollarSign, title: "Consistencia de pricing", desc: "¿El mismo vino cuesta lo mismo en todos los locales? Las diferencias no justificadas erosionan la percepción de marca y el margen del grupo." },
                { icon: BarChart3, title: "Benchmarking de ticket medio", desc: "¿Qué local vende más vino por mesa? El local referente tiene prácticas replicables para los demás." },
                { icon: Wine, title: "Penetración de copa", desc: "¿Todos los locales tienen oferta de copa? Un local sin copa pierde el 35-45% de mesas que pedirían vino si tuvieran esa opción." },
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

      {/* WHEN TO USE */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <h2 className="font-heading text-2xl font-bold mb-6">Cuándo usar esta herramienta</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Al implementar un sistema de gestión centralizada del vino en tu grupo.",
              "Antes de las reuniones trimestrales de dirección para llevar datos concretos.",
              "Al detectar inconsistencias de precios entre locales.",
              "Cuando un local rinde significativamente peor que los demás en vino.",
              "Al preparar la negociación anual con distribuidores (volumen consolidado).",
              "Al abrir un nuevo local y definir su carta en base a los estándares del grupo.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-background">
                <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <FAQSection
        schemaId="auditor-multi-faq"
        faqs={[
          { q: "¿A partir de cuántos locales tiene sentido esta herramienta?", a: "Desde 2 locales ya puedes comparar y detectar desviaciones. A partir de 5, se convierte en una herramienta de gestión imprescindible." },
          { q: "¿Puedo comparar locales con perfiles muy distintos?", a: "Sí, pero interpreta los resultados con criterio. Un fine dining y un casual tendrán métricas distintas por naturaleza. El valor está en detectar desviaciones no justificadas por el perfil." },
          { q: "¿Un score bajo siempre es malo?", a: "No necesariamente. Un grupo con locales de perfiles muy distintos (hotel, gastrobar, fine dining) puede tener un score bajo en pricing pero ser coherente dentro de cada perfil. Lo importante es que las desviaciones sean intencionadas." },
          { q: "¿Winerim ofrece este análisis de forma automatizada?", a: "Sí. Winerim centraliza la gestión de carta de todos tus locales y genera dashboards comparativos en tiempo real con alertas automáticas de desviación." },
        ]}
      />

      {/* INTERNAL LINKS */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <InternalLinks links={[
          { to: "/soluciones/grupos-restauracion", label: "Winerim para grupos de restauración", type: "solution" },
          { to: "/recursos/plantilla-control-grupo-restauracion", label: "Plantilla de control para grupos", type: "resource" },
          { to: "/guias/como-gestionar-carta-vinos-grupos-restauracion", label: "Guía: gestionar carta en grupos", type: "guide" },
          { to: "/herramientas/calculadora-ticket-medio-vino", label: "Calculadora de ticket medio", type: "tool" },
          { to: "/demo", label: "Solicitar demo para grupos", type: "solution" },
        ]} />
      </div>

      {/* CTA FINAL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <ScrollReveal>
          <div className="text-center bg-gradient-card rounded-2xl border border-border p-10 md:p-14">
            <Sparkles size={28} className="text-wine mx-auto mb-4" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Gestiona el vino de todo tu grupo desde un solo panel
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6 text-sm leading-relaxed">
              Winerim centraliza carta, stock y analítica de todos tus locales. Benchmarking automático, alertas de desviación y control de surtido en tiempo real.
            </p>
            <Link to="/demo"
              className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
              Solicitar demo para grupos <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default AuditorMultiLocal;
