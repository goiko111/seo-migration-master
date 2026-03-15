import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, RotateCcw, DollarSign, AlertTriangle, TrendingUp,
  Sparkles, CheckCircle, Layers, Wine, BarChart3, Plus, Trash2
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

interface StockItem {
  nombre: string;
  unidades: number;
  costeUnidad: number;
  diasSinVenta: number;
  categoria: "entrada" | "media" | "premium" | "alta";
}

const emptyItem = (): StockItem => ({ nombre: "", unidades: 1, costeUnidad: 10, diasSinVenta: 90, categoria: "media" });

const CAT_LABELS: Record<string, string> = { entrada: "Entrada", media: "Gama media", premium: "Premium", alta: "Alta gama" };

const formatEur = (n: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const CalculadoraStockMuerto = () => {
  const [items, setItems] = useState<StockItem[]>([emptyItem(), emptyItem(), emptyItem()]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "stock-muerto-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Calculadora de Stock Muerto de Vinos",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Calcula el coste del stock de vino inmovilizado en tu restaurante. Estima el capital bloqueado por referencias sin rotación.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("stock-muerto-jsonld")?.remove(); };
  }, []);

  const addItem = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof StockItem, value: string | number) => {
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: value } : it));
  };

  const validItems = items.filter(it => it.nombre.trim() && it.unidades > 0 && it.costeUnidad > 0);

  const analysis = useMemo(() => {
    if (validItems.length === 0) return null;

    const classified = validItems.map(it => {
      const capital = it.unidades * it.costeUnidad;
      const estado: "muerto" | "lento" | "alerta" =
        it.diasSinVenta > 180 ? "muerto" :
        it.diasSinVenta > 90 ? "lento" : "alerta";
      const riesgoDeterioro = it.diasSinVenta > 365 ? "alto" : it.diasSinVenta > 180 ? "medio" : "bajo";
      return { ...it, capital, estado, riesgoDeterioro };
    });

    const totalCapital = classified.reduce((s, it) => s + it.capital, 0);
    const totalUnidades = classified.reduce((s, it) => s + it.unidades, 0);
    const muertos = classified.filter(it => it.estado === "muerto");
    const lentos = classified.filter(it => it.estado === "lento");
    const alerta = classified.filter(it => it.estado === "alerta");

    const capitalMuerto = muertos.reduce((s, it) => s + it.capital, 0);
    const capitalLento = lentos.reduce((s, it) => s + it.capital, 0);

    // By category
    const porCategoria = Object.entries(CAT_LABELS).map(([key, label]) => {
      const refs = classified.filter(it => it.categoria === key);
      return { key, label, count: refs.length, capital: refs.reduce((s, it) => s + it.capital, 0) };
    }).filter(c => c.count > 0);

    // Actions
    const acciones: { icono: React.ElementType; texto: string; tipo: "urgente" | "recomendado" | "preventivo" }[] = [];

    if (muertos.length > 0) {
      acciones.push({ icono: AlertTriangle, tipo: "urgente", texto: `${muertos.length} referencia(s) con más de 6 meses sin venderse (${formatEur(capitalMuerto)} inmovilizados). Acción: ofrecerlas por copa, en menú degustación o negociar devolución.` });
    }
    if (lentos.length > 0) {
      acciones.push({ icono: RotateCcw, tipo: "recomendado", texto: `${lentos.length} referencia(s) con rotación lenta (3-6 meses). Considéralas para promociones o reubicación como recomendación del chef.` });
    }
    if (totalCapital > 5000) {
      acciones.push({ icono: DollarSign, tipo: "recomendado", texto: `Tienes ${formatEur(totalCapital)} en stock de baja rotación. Revisa los criterios de compra y establece límites de stock máximo por referencia.` });
    }
    acciones.push({ icono: CheckCircle, tipo: "preventivo", texto: "Implementa una revisión trimestral de rotación para detectar vinos muertos antes de que acumulen meses sin movimiento." });

    return { classified, totalCapital, totalUnidades, muertos, lentos, alerta, capitalMuerto, capitalLento, porCategoria, acciones };
  }, [validItems]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Calculadora de Stock Muerto de Vinos | Winerim"
        description="Calcula cuánto capital tienes inmovilizado en vinos sin rotación. Identifica referencias muertas, estima el impacto económico y recibe recomendaciones de acción."
        url={`${CANONICAL_DOMAIN}/herramientas/calculadora-stock-muerto`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Calculadora de stock muerto" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <RotateCcw size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
            Calculadora de stock muerto
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Estima cuánto capital tienes inmovilizado en vinos sin rotación. Identifica qué referencias necesitan acción inmediata.
          </motion.p>
        </div>
      </section>

      {/* TOOL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Wine size={20} className="text-wine" /> Referencias con baja o nula rotación
          </h2>

          <div className="space-y-4 mb-6">
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-end p-4 rounded-xl border border-border bg-background">
                <div className="col-span-12 sm:col-span-3">
                  <Label className="text-xs mb-1 block">Nombre del vino</Label>
                  <Input placeholder="Ej: Ribera del Duero..." value={item.nombre}
                    onChange={e => updateItem(i, "nombre", e.target.value)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Unidades</Label>
                  <Input type="number" min={1} value={item.unidades || ""}
                    onChange={e => updateItem(i, "unidades", parseInt(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Coste/ud (€)</Label>
                  <Input type="number" min={0} step={0.5} value={item.costeUnidad || ""}
                    onChange={e => updateItem(i, "costeUnidad", parseFloat(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Días sin venta</Label>
                  <Input type="number" min={0} value={item.diasSinVenta || ""}
                    onChange={e => updateItem(i, "diasSinVenta", parseInt(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-8 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Categoría</Label>
                  <select value={item.categoria} onChange={e => updateItem(i, "categoria", e.target.value as StockItem["categoria"])}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm">
                    {Object.entries(CAT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="col-span-4 sm:col-span-1 flex justify-end">
                  {items.length > 1 && (
                    <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive transition-colors p-2">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={addItem} className="text-sm"><Plus size={16} className="mr-1" /> Añadir referencia</Button>
            <Button onClick={() => setCalculated(true)} disabled={validItems.length === 0}
              className="bg-gradient-wine text-primary-foreground text-sm font-semibold tracking-wider uppercase hover:opacity-90">
              Calcular impacto
            </Button>
          </div>
        </motion.div>
      </section>

      {/* RESULTS */}
      {calculated && analysis && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Summary */}
            <div className="text-center p-8 rounded-2xl border border-border bg-gradient-card">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-2">Capital inmovilizado total</p>
              <div className="text-5xl md:text-6xl font-heading font-bold text-destructive">
                {formatEur(analysis.totalCapital)}
              </div>
              <p className="text-muted-foreground mt-2 text-sm">en {analysis.totalUnidades} unidades de {validItems.length} referencias</p>
            </div>

            {/* Breakdown */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Stock muerto (> 6 meses)", value: formatEur(analysis.capitalMuerto), count: analysis.muertos.length, color: "text-destructive" },
                { label: "Rotación lenta (3-6 meses)", value: formatEur(analysis.capitalLento), count: analysis.lentos.length, color: "text-yellow-500" },
                { label: "En alerta (< 3 meses)", value: formatEur(analysis.alerta.reduce((s, it) => s + it.unidades * it.costeUnidad, 0)), count: analysis.alerta.length, color: "text-wine" },
              ].map((seg, i) => (
                <div key={i} className="rounded-xl border border-border bg-gradient-card p-5 text-center">
                  <p className={`text-2xl font-heading font-bold ${seg.color}`}>{seg.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{seg.label}</p>
                  <p className="text-xs text-muted-foreground">{seg.count} referencia(s)</p>
                </div>
              ))}
            </div>

            {/* By category */}
            {analysis.porCategoria.length > 1 && (
              <div className="rounded-2xl border border-border bg-gradient-card p-6">
                <h3 className="font-heading font-bold mb-4">Desglose por categoría</h3>
                <div className="space-y-3">
                  {analysis.porCategoria.map(cat => (
                    <div key={cat.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm font-medium">{cat.label}</span>
                      <span className="text-sm"><span className="font-bold">{formatEur(cat.capital)}</span> <span className="text-muted-foreground">({cat.count} refs)</span></span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detail table */}
            <div className="rounded-2xl border border-border bg-gradient-card p-6 overflow-x-auto">
              <h3 className="font-heading font-bold mb-4">Detalle por referencia</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium">Vino</th>
                    <th className="pb-3 font-medium text-right">Uds</th>
                    <th className="pb-3 font-medium text-right">Capital</th>
                    <th className="pb-3 font-medium text-right">Días</th>
                    <th className="pb-3 font-medium text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.classified.sort((a, b) => b.capital - a.capital).map((it, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-3">{it.nombre}</td>
                      <td className="py-3 text-right">{it.unidades}</td>
                      <td className="py-3 text-right font-medium">{formatEur(it.capital)}</td>
                      <td className="py-3 text-right">{it.diasSinVenta}d</td>
                      <td className="py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          it.estado === "muerto" ? "bg-destructive/10 text-destructive" :
                          it.estado === "lento" ? "bg-yellow-500/10 text-yellow-600" :
                          "bg-wine/10 text-wine"
                        }`}>
                          {it.estado === "muerto" ? "Muerto" : it.estado === "lento" ? "Lento" : "Alerta"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <h3 className="font-heading text-lg font-bold mb-6">Acciones recomendadas</h3>
              <div className="space-y-3">
                {analysis.acciones.map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                    a.tipo === "urgente" ? "border-destructive/20 bg-destructive/5" :
                    a.tipo === "recomendado" ? "border-yellow-500/20 bg-yellow-500/5" :
                    "border-green-500/20 bg-green-500/5"
                  }`}>
                    <a.icono size={16} className={`shrink-0 mt-0.5 ${
                      a.tipo === "urgente" ? "text-destructive" : a.tipo === "recomendado" ? "text-yellow-500" : "text-green-500"
                    }`} />
                    <p className="text-sm leading-relaxed">{a.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-2xl border border-wine/20 bg-wine/5">
              <Sparkles size={24} className="text-wine mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2">Detecta stock muerto automáticamente</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                Winerim monitoriza la rotación de cada referencia y te alerta cuando un vino deja de venderse. Sin revisiones manuales.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/analisis-carta" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                  Analizar mi carta <ArrowRight size={16} />
                </Link>
                <Link to="/demo" className="border border-border text-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 transition-colors">
                  Solicitar demo
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* EDUCATIONAL */}
      <section className="bg-gradient-card border-y border-border py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Cómo interpretar los resultados</h2>
          </ScrollReveal>

          <SummaryBox
            label="Qué es el stock muerto"
            definition="El stock muerto son las botellas de vino que llevan más de 90 días sin venderse. Representan capital inmovilizado que no genera retorno, ocupa espacio en bodega y puede deteriorarse con el tiempo."
            bullets={[
              "Alerta (30-90 días): la referencia necesita atención pero aún puede recuperarse",
              "Rotación lenta (90-180 días): considerar promociones, copa o reubicación",
              "Stock muerto (> 180 días): acción urgente: liquidar, devolver o eliminar",
              "Riesgo de deterioro: los vinos jóvenes sin crianza pierden frescura con el tiempo",
            ]}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: "Cuándo usar esta calculadora", points: ["Antes de hacer un pedido al distribuidor", "En la revisión trimestral de bodega", "Cuando la inversión en stock crezca sin que crezcan las ventas", "Al preparar el cierre fiscal"] },
              { title: "Errores comunes", points: ["No contabilizar el stock muerto como coste real", "Comprar más sin haber movido lo acumulado", "Esperar a que un vino se venda solo", "No establecer límites de stock por referencia"] },
            ].map((block, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-border bg-background">
                  <h3 className="font-heading font-bold mb-4">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={[
        { q: "¿A partir de cuántos días se considera stock muerto?", a: "El criterio habitual es 90 días sin venta para rotación lenta y 180 días para stock muerto. Pero varía según el tipo de restaurante y la frecuencia de servicio." },
        { q: "¿Qué puedo hacer con los vinos muertos?", a: "Las opciones principales son: ofrecerlos por copa a precio especial, incluirlos en menús degustación, negociar devolución con el proveedor, venderlos en eventos de liquidación o donarlos." },
        { q: "¿Cuánto stock debería tener un restaurante?", a: "Depende del tipo y volumen de negocio, pero como regla general, el stock debería poder rotarse completamente en 60-90 días. Si una referencia necesita más de 3 meses para agotarse, es probable que tengas exceso." },
        { q: "¿Los datos se envían a algún servidor?", a: "No. Todo el cálculo se realiza en tu navegador. No almacenamos ni enviamos ningún dato." },
      ]} schemaId="stock-muerto" />

      <InternalLinks links={[
        { to: "/recursos/checklist-deteccion-vinos-muertos", label: "Checklist de detección de vinos muertos", type: "resource" },
        { to: "/benchmarks-playbooks/playbook-mejorar-rotacion", label: "Playbook: mejorar la rotación", type: "guide" },
        { to: "/benchmarks-playbooks/playbook-decidir-compras-datos", label: "Playbook: decidir compras con datos", type: "guide" },
        { to: "/recursos/scorecard-rendimiento-carta", label: "Scorecard mensual de rendimiento", type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default CalculadoraStockMuerto;
