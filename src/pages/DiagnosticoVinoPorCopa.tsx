import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, GlassWater, Wine, TrendingUp, AlertTriangle,
  CheckCircle, DollarSign, Layers, RotateCcw, Sparkles, Info
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

interface CopaDef {
  nombre: string;
  estilo: "espumoso" | "blanco" | "rosado" | "tinto" | "dulce";
  pvp: number;
  coste: number;
  ventasSemana: number;
}

const ESTILOS_RECOMENDADOS = ["espumoso", "blanco", "rosado", "tinto"] as const;
const ESTILO_LABELS: Record<string, string> = { espumoso: "Espumoso", blanco: "Blanco", rosado: "Rosado", tinto: "Tinto", dulce: "Dulce/Generoso" };

const emptyWine = (): CopaDef => ({ nombre: "", estilo: "blanco", pvp: 0, coste: 0, ventasSemana: 0 });

const DiagnosticoVinoPorCopa = () => {
  const [copas, setCopas] = useState<CopaDef[]>([emptyWine(), emptyWine(), emptyWine(), emptyWine()]);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "diag-copa-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Diagnóstico de Vino por Copa",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Evalúa si tu oferta de vino por copa está equilibrada en estilos, precios y rentabilidad.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("diag-copa-jsonld")?.remove(); };
  }, []);

  const addCopa = () => setCopas(prev => [...prev, emptyWine()]);
  const removeCopa = (i: number) => setCopas(prev => prev.filter((_, idx) => idx !== i));
  const updateCopa = (i: number, field: keyof CopaDef, value: string | number) => {
    setCopas(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  };

  const validCopas = copas.filter(c => c.nombre.trim() && c.pvp > 0 && c.coste > 0);

  const analysis = useMemo(() => {
    if (validCopas.length < 2) return null;

    // Style coverage
    const estilosPresentes = new Set(validCopas.map(c => c.estilo));
    const estilosFaltantes = ESTILOS_RECOMENDADOS.filter(e => !estilosPresentes.has(e));
    const cobertura = Math.round((estilosPresentes.size / ESTILOS_RECOMENDADOS.length) * 100);

    // Price analysis
    const precios = validCopas.map(c => c.pvp).sort((a, b) => a - b);
    const precioMin = precios[0];
    const precioMax = precios[precios.length - 1];
    const precioMedio = precios.reduce((s, p) => s + p, 0) / precios.length;
    const rangoOk = precioMax >= precioMin * 2;

    // Margin analysis
    const margenes = validCopas.map(c => ({ nombre: c.nombre, margen: c.pvp > 0 ? ((c.pvp - c.coste) / c.pvp) * 100 : 0, margenEur: c.pvp - c.coste }));
    const margenMedio = margenes.reduce((s, m) => s + m.margen, 0) / margenes.length;
    const bajoMargen = margenes.filter(m => m.margen < 60);

    // Rotation
    const ventasTotales = validCopas.reduce((s, c) => s + c.ventasSemana, 0);
    const sinVentas = validCopas.filter(c => c.ventasSemana === 0);
    const topVenta = [...validCopas].sort((a, b) => b.ventasSemana - a.ventasSemana)[0];

    // Score
    let score = 50;
    score += cobertura >= 75 ? 15 : cobertura >= 50 ? 8 : 0;
    score += rangoOk ? 10 : 0;
    score += margenMedio >= 65 ? 15 : margenMedio >= 55 ? 8 : -5;
    score += sinVentas.length === 0 ? 10 : -5;
    score += validCopas.length >= 6 ? 5 : validCopas.length >= 4 ? 2 : -5;
    score = Math.max(0, Math.min(100, score));

    const diagnosticos: { icon: React.ElementType; tipo: "ok" | "warn" | "error"; texto: string }[] = [];

    if (cobertura >= 75) diagnosticos.push({ icon: CheckCircle, tipo: "ok", texto: "Buena cobertura de estilos. Cubres las tipologías principales." });
    else diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: `Faltan estilos: ${estilosFaltantes.map(e => ESTILO_LABELS[e]).join(", ")}. Esto limita las opciones del cliente.` });

    if (rangoOk) diagnosticos.push({ icon: CheckCircle, tipo: "ok", texto: `Rango de precios adecuado: ${precioMin.toFixed(0)}€ – ${precioMax.toFixed(0)}€. Hay escalera de precios.` });
    else diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: `Rango de precios estrecho (${precioMin.toFixed(0)}€ – ${precioMax.toFixed(0)}€). Amplía para cubrir más perfiles de cliente.` });

    if (margenMedio >= 65) diagnosticos.push({ icon: CheckCircle, tipo: "ok", texto: `Margen medio del ${margenMedio.toFixed(0)}%. Está en buen rango para copa.` });
    else if (margenMedio >= 55) diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: `Margen medio del ${margenMedio.toFixed(0)}%. Podrías mejorar el pricing de las referencias de mayor coste.` });
    else diagnosticos.push({ icon: AlertTriangle, tipo: "error", texto: `Margen medio del ${margenMedio.toFixed(0)}%. Demasiado bajo. Revisa el pricing o el coste de compra.` });

    if (bajoMargen.length > 0) diagnosticos.push({ icon: AlertTriangle, tipo: "warn", texto: `${bajoMargen.length} referencia(s) con margen < 60%: ${bajoMargen.map(m => m.nombre).join(", ")}.` });

    if (sinVentas.length > 0) diagnosticos.push({ icon: AlertTriangle, tipo: "error", texto: `${sinVentas.length} referencia(s) sin ventas esta semana: ${sinVentas.map(c => c.nombre).join(", ")}. Valora rotar.` });

    if (validCopas.length < 4) diagnosticos.push({ icon: Info, tipo: "warn", texto: "Oferta limitada. Con menos de 4 copas, el cliente tiene pocas opciones para explorar." });
    else if (validCopas.length > 12) diagnosticos.push({ icon: Info, tipo: "warn", texto: "Más de 12 copas puede generar complejidad operativa y merma. Evalúa si todas rotan." });

    return { score, cobertura, estilosFaltantes, precioMin, precioMax, precioMedio, margenMedio, bajoMargen, sinVentas, ventasTotales, topVenta, diagnosticos, validCount: validCopas.length };
  }, [validCopas]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Diagnóstico de Vino por Copa para Restaurantes | Winerim"
        description="Evalúa gratis si tu oferta de vino por copa está bien planteada: cobertura de estilos, equilibrio de precios, márgenes y rotación. Feedback accionable."
        url={`${CANONICAL_DOMAIN}/herramientas/diagnostico-vino-por-copa`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Diagnóstico vino por copa" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <GlassWater size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
            Diagnóstico de vino por copa
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Evalúa si tu oferta por copa está equilibrada en estilos, precios y rentabilidad. Recibe feedback accionable para mejorarla.
          </motion.p>
        </div>
      </section>

      {/* TOOL */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Wine size={20} className="text-wine" /> Tus vinos por copa
          </h2>

          <div className="space-y-4 mb-6">
            {copas.map((copa, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-end p-4 rounded-xl border border-border bg-background">
                <div className="col-span-12 sm:col-span-3">
                  <Label className="text-xs mb-1 block">Nombre</Label>
                  <Input placeholder="Ej: Albariño Pazo..." value={copa.nombre}
                    onChange={e => updateCopa(i, "nombre", e.target.value)} className="bg-secondary/50" />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Estilo</Label>
                  <select value={copa.estilo} onChange={e => updateCopa(i, "estilo", e.target.value as CopaDef["estilo"])}
                    className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm">
                    {Object.entries(ESTILO_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label className="text-xs mb-1 block">PVP copa (€)</Label>
                  <Input type="number" min={0} step={0.5} value={copa.pvp || ""}
                    onChange={e => updateCopa(i, "pvp", parseFloat(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Coste copa (€)</Label>
                  <Input type="number" min={0} step={0.1} value={copa.coste || ""}
                    onChange={e => updateCopa(i, "coste", parseFloat(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <Label className="text-xs mb-1 block">Ventas/sem</Label>
                  <Input type="number" min={0} value={copa.ventasSemana || ""}
                    onChange={e => updateCopa(i, "ventasSemana", parseInt(e.target.value) || 0)} className="bg-secondary/50" />
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-end">
                  {copas.length > 2 && (
                    <button onClick={() => removeCopa(i)} className="text-xs text-muted-foreground hover:text-destructive transition-colors p-2">✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={addCopa} className="text-sm">+ Añadir referencia</Button>
            <Button onClick={() => setCalculated(true)} disabled={validCopas.length < 2}
              className="bg-gradient-wine text-primary-foreground text-sm font-semibold tracking-wider uppercase hover:opacity-90">
              Diagnosticar oferta
            </Button>
          </div>
        </motion.div>
      </section>

      {/* RESULTS */}
      {calculated && analysis && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-6">

            {/* Score */}
            <div className="text-center p-8 rounded-2xl border border-border bg-gradient-card">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-2">Puntuación de tu oferta por copa</p>
              <div className={`text-6xl font-heading font-bold ${analysis.score >= 70 ? "text-green-500" : analysis.score >= 50 ? "text-yellow-500" : "text-destructive"}`}>
                {analysis.score}<span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                {analysis.score >= 80 ? "Tu oferta por copa está bien planteada." :
                 analysis.score >= 60 ? "Hay oportunidades claras de mejora." :
                 analysis.score >= 40 ? "Tu oferta necesita ajustes importantes." :
                 "Tu programa de copa requiere una revisión profunda."}
              </p>
            </div>

            {/* KPIs */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Cobertura estilos", value: `${analysis.cobertura}%`, icon: Layers },
                { label: "Margen medio", value: `${analysis.margenMedio.toFixed(0)}%`, icon: DollarSign },
                { label: "Rango precios", value: `${analysis.precioMin.toFixed(0)}–${analysis.precioMax.toFixed(0)}€`, icon: TrendingUp },
                { label: "Ventas/semana", value: `${analysis.ventasTotales} copas`, icon: RotateCcw },
              ].map((kpi, i) => (
                <div key={i} className="rounded-xl border border-border bg-gradient-card p-5 text-center">
                  <kpi.icon size={20} className="text-wine mx-auto mb-2" />
                  <p className="font-heading text-xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Diagnostics */}
            <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <h3 className="font-heading text-lg font-bold mb-6">Diagnóstico detallado</h3>
              <div className="space-y-3">
                {analysis.diagnosticos.map((d, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${
                    d.tipo === "ok" ? "border-green-500/20 bg-green-500/5" :
                    d.tipo === "warn" ? "border-yellow-500/20 bg-yellow-500/5" :
                    "border-destructive/20 bg-destructive/5"
                  }`}>
                    <d.icon size={16} className={`shrink-0 mt-0.5 ${
                      d.tipo === "ok" ? "text-green-500" : d.tipo === "warn" ? "text-yellow-500" : "text-destructive"
                    }`} />
                    <p className="text-sm leading-relaxed">{d.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-2xl border border-wine/20 bg-wine/5">
              <Sparkles size={24} className="text-wine mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2">¿Quieres automatizar la gestión de tu oferta por copa?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                Winerim monitoriza automáticamente el rendimiento de cada copa, sugiere rotaciones y optimiza el pricing en tiempo real.
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Cómo interpretar el diagnóstico</h2>
          </ScrollReveal>

          <SummaryBox
            label="En resumen"
            definition="El diagnóstico de vino por copa evalúa cuatro dimensiones clave: cobertura de estilos, equilibrio de precios, margen operativo y rotación. Una oferta bien diseñada cubre las tipologías principales, ofrece una escalera de precios clara, mantiene márgenes superiores al 65% y rota todas las referencias semanalmente."
            bullets={[
              "Cobertura de estilos: al menos espumoso, blanco, rosado y tinto",
              "Rango de precios: la copa más cara debería doblar en precio a la más barata",
              "Margen por copa: objetivo mínimo del 65% sobre PVP",
              "Rotación: todas las copas deberían venderse al menos una vez por semana",
            ]}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { title: "Cuándo usarlo", points: ["Al lanzar o renovar tu programa de copa", "Cuando la merma supere el 15%", "Si no sabes si tu selección es equilibrada", "Antes de reunirte con el distribuidor"] },
              { title: "Errores comunes", points: ["Ofrecer solo tintos por copa", "Precio único para todas las copas", "No rotar referencias en semanas", "Ignorar la merma como variable de coste"] },
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
        { q: "¿Cuántos vinos por copa debería ofrecer?", a: "Entre 6 y 12 es el rango recomendado para la mayoría de restaurantes. Menos de 4 limita las opciones del cliente; más de 12 genera complejidad operativa y riesgo de merma." },
        { q: "¿Qué margen debería tener un vino por copa?", a: "El objetivo es un margen bruto superior al 65% sobre el PVP. El pricing por copa permite multiplicadores más altos que la botella porque el cliente valora la flexibilidad." },
        { q: "¿Con qué frecuencia debería rotar las copas?", a: "Idealmente, rota al menos 2-3 referencias cada 2-4 semanas. Las referencias que no se venden en una semana deberían evaluarse para rotación o promoción." },
        { q: "¿Es necesario incluir espumoso por copa?", a: "Muy recomendable. El espumoso por copa tiene alta demanda y buen margen. Muchos clientes piden una copa de cava o champagne para empezar, especialmente en cenas." },
      ]} schemaId="diag-copa" />

      <InternalLinks links={[
        { to: "/herramientas/calculadora-precio-vino-por-copa", label: "Calculadora de precio por copa", type: "tool" },
        { to: "/recursos/plantilla-estrategia-vinos-por-copa", label: "Plantilla de estrategia por copa", type: "resource" },
        { to: "/benchmarks-playbooks/benchmark-estrategia-por-copa", label: "Benchmark: estrategia por copa", type: "guide" },
        { to: "/benchmarks-playbooks/playbook-optimizar-vino-copa", label: "Playbook: optimizar vino por copa", type: "guide" },
      ]} />
      <Footer />
    </div>
  );
};

export default DiagnosticoVinoPorCopa;
