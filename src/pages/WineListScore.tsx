import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, BarChart3, CheckCircle, AlertTriangle,
  Wine, DollarSign, Layers, Users, GlassWater, TrendingUp,
  Sparkles, RotateCcw, Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import FAQSection from "@/components/seo/FAQSection";
import SummaryBox from "@/components/seo/SummaryBox";
import { Button } from "@/components/ui/button";
import { CANONICAL_DOMAIN } from "@/seo/config";

interface Block {
  id: string;
  title: string;
  icon: React.ElementType;
  questions: { text: string; options: { label: string; score: number }[] }[];
}

const BLOCKS: Block[] = [
  {
    id: "estructura", title: "Estructura y organización", icon: Layers,
    questions: [
      { text: "¿Cuántas referencias tiene tu carta?", options: [{ label: "< 20", score: 5 }, { label: "20-60", score: 10 }, { label: "60-120", score: 8 }, { label: "> 120", score: 4 }] },
      { text: "¿Está organizada por categorías claras?", options: [{ label: "Sí, intuitivas", score: 10 }, { label: "Sí, técnicas", score: 6 }, { label: "No está clara", score: 2 }] },
      { text: "¿Incluye descripciones de los vinos?", options: [{ label: "Sí, sensoriales", score: 10 }, { label: "Solo denominación", score: 5 }, { label: "No", score: 1 }] },
    ],
  },
  {
    id: "equilibrio", title: "Equilibrio y diversidad", icon: Wine,
    questions: [
      { text: "¿Hay blancos, tintos, rosados y espumosos?", options: [{ label: "Todas las tipologías", score: 10 }, { label: "Faltan 1-2", score: 6 }, { label: "Solo tintos/blancos", score: 2 }] },
      { text: "¿Hay variedad de regiones?", options: [{ label: "Nacional + internacional", score: 10 }, { label: "Solo nacional", score: 6 }, { label: "Concentrada en 1-2 regiones", score: 3 }] },
      { text: "¿Hay vinos para diferentes perfiles de cliente?", options: [{ label: "Sí, variado", score: 10 }, { label: "Más bien homogéneo", score: 4 }, { label: "No lo he pensado", score: 1 }] },
    ],
  },
  {
    id: "pricing", title: "Pricing y márgenes", icon: DollarSign,
    questions: [
      { text: "¿Usas multiplicadores diferenciados por tramo de precio?", options: [{ label: "Sí, escalonados", score: 10 }, { label: "Multiplicador fijo", score: 4 }, { label: "No tengo sistema", score: 1 }] },
      { text: "¿Hay escalera de precios sin saltos bruscos?", options: [{ label: "Sí, progresiva", score: 10 }, { label: "Hay algunos huecos", score: 5 }, { label: "No lo he revisado", score: 2 }] },
      { text: "¿Conoces el margen de cada referencia?", options: [{ label: "Sí, por referencia", score: 10 }, { label: "Solo el global", score: 5 }, { label: "No", score: 1 }] },
    ],
  },
  {
    id: "copa", title: "Vino por copa", icon: GlassWater,
    questions: [
      { text: "¿Ofreces vino por copa?", options: [{ label: "Sí, 6+ referencias", score: 10 }, { label: "Sí, 2-5", score: 6 }, { label: "No", score: 0 }] },
      { text: "¿Controlas la merma de copa?", options: [{ label: "Sí, la mido", score: 10 }, { label: "Más o menos", score: 4 }, { label: "No", score: 1 }] },
    ],
  },
  {
    id: "rotacion", title: "Rotación y gestión", icon: RotateCcw,
    questions: [
      { text: "¿Cada cuánto actualizas la carta?", options: [{ label: "Mensual o trimestral", score: 10 }, { label: "Semestral", score: 5 }, { label: "Casi nunca", score: 1 }] },
      { text: "¿Tienes referencias que llevan meses sin venderse?", options: [{ label: "No, todas rotan", score: 10 }, { label: "Algunas", score: 5 }, { label: "Varias", score: 1 }] },
    ],
  },
  {
    id: "comercial", title: "Potencial comercial", icon: TrendingUp,
    questions: [
      { text: "¿Hay recomendaciones destacadas en la carta?", options: [{ label: "Sí, visibles", score: 10 }, { label: "El equipo las sabe", score: 5 }, { label: "No", score: 1 }] },
      { text: "¿El equipo sabe recomendar vino?", options: [{ label: "Sí, formado", score: 10 }, { label: "Algunos", score: 5 }, { label: "No", score: 1 }] },
      { text: "¿Sugerís maridajes con los platos?", options: [{ label: "Sí, en carta o verbal", score: 10 }, { label: "A veces", score: 5 }, { label: "No", score: 1 }] },
    ],
  },
];

const WineListScore = () => {
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "wls-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Wine List Score – Auditor de Carta de Vinos",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Evalúa tu carta de vinos con un score de 0 a 100. Diagnóstico por bloques: estructura, equilibrio, pricing, copa, rotación y potencial comercial.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("wls-jsonld")?.remove(); };
  }, []);

  const setAnswer = (blockId: string, qIdx: number, score: number) => {
    setAnswers(prev => {
      const block = [...(prev[blockId] || [])];
      block[qIdx] = score;
      return { ...prev, [blockId]: block };
    });
  };

  const totalQuestions = BLOCKS.reduce((s, b) => s + b.questions.length, 0);
  const answeredQuestions = Object.values(answers).reduce((s, a) => s + a.filter(v => v !== undefined).length, 0);
  const allAnswered = answeredQuestions === totalQuestions;

  const results = useMemo(() => {
    if (!allAnswered) return null;

    const blockScores = BLOCKS.map(block => {
      const blockAnswers = answers[block.id] || [];
      const maxPossible = block.questions.length * 10;
      const actual = blockAnswers.reduce((s, v) => s + (v || 0), 0);
      const pct = Math.round((actual / maxPossible) * 100);
      return { id: block.id, title: block.title, icon: block.icon, pct };
    });

    const globalScore = Math.round(blockScores.reduce((s, b) => s + b.pct, 0) / blockScores.length);

    const weakBlocks = blockScores.filter(b => b.pct < 50);
    const strongBlocks = blockScores.filter(b => b.pct >= 75);

    return { globalScore, blockScores, weakBlocks, strongBlocks };
  }, [answers, allAnswered]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine List Score: Audita tu Carta de Vinos (0-100) | Winerim"
        description="Evalúa tu carta de vinos con un score global de 0 a 100. Diagnóstico gratuito por bloques: estructura, equilibrio, pricing, vino por copa, rotación y potencial comercial."
        url={`${CANONICAL_DOMAIN}/herramientas/wine-list-score`}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Wine List Score" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
            Wine List Score
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Responde a {totalQuestions} preguntas y obtén un score global de 0 a 100 con diagnóstico por bloques. Descubre en qué destaca tu carta y dónde pierde potencial.
          </motion.p>
        </div>
      </section>

      {/* QUESTIONNAIRE */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
        <div className="space-y-8">
          {BLOCKS.map((block) => (
            <motion.div key={block.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                  <block.icon size={20} className="text-wine" />
                </div>
                <h2 className="font-heading text-lg font-bold">{block.title}</h2>
              </div>
              <div className="space-y-6">
                {block.questions.map((q, qi) => (
                  <div key={qi}>
                    <p className="text-sm font-medium mb-3">{q.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, oi) => {
                        const selected = (answers[block.id] || [])[qi] === opt.score;
                        return (
                          <button key={oi} onClick={() => setAnswer(block.id, qi, opt.score)}
                            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                              selected ? "bg-wine/20 border-wine/50 text-wine" : "bg-secondary/50 border-border hover:border-wine/30"
                            }`}>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">{answeredQuestions} de {totalQuestions} preguntas respondidas</p>
          <Button onClick={() => setCalculated(true)} disabled={!allAnswered}
            className="bg-gradient-wine text-primary-foreground px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:opacity-90">
            Calcular Wine List Score
          </Button>
        </div>
      </section>

      {/* RESULTS */}
      {calculated && results && (
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Global Score */}
            <div className="text-center p-10 rounded-2xl border border-border bg-gradient-card">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Tu Wine List Score</p>
              <div className={`text-7xl font-heading font-bold ${
                results.globalScore >= 75 ? "text-green-500" : results.globalScore >= 50 ? "text-yellow-500" : "text-destructive"
              }`}>
                {results.globalScore}<span className="text-3xl text-muted-foreground">/100</span>
              </div>
              <p className="text-muted-foreground mt-3">
                {results.globalScore >= 80 ? "Tu carta está muy bien optimizada. Hay margen para la excelencia." :
                 results.globalScore >= 60 ? "Buen punto de partida con oportunidades claras de mejora." :
                 results.globalScore >= 40 ? "Tu carta tiene áreas importantes que necesitan atención." :
                 "Tu carta necesita una revisión profunda para alcanzar su potencial."}
              </p>
            </div>

            {/* Block Scores */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.blockScores.map((block) => (
                <div key={block.id} className="rounded-xl border border-border bg-gradient-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <block.icon size={16} className="text-wine" />
                    <span className="text-sm font-medium">{block.title}</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className={`text-2xl font-heading font-bold ${
                      block.pct >= 75 ? "text-green-500" : block.pct >= 50 ? "text-yellow-500" : "text-destructive"
                    }`}>{block.pct}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${
                      block.pct >= 75 ? "bg-green-500" : block.pct >= 50 ? "bg-yellow-500" : "bg-destructive"
                    }`} style={{ width: `${block.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="rounded-2xl border border-border bg-gradient-card p-6 md:p-8">
              <h3 className="font-heading text-lg font-bold mb-6">Resumen del diagnóstico</h3>
              {results.strongBlocks.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-green-500 mb-2">Puntos fuertes</p>
                  {results.strongBlocks.map(b => (
                    <div key={b.id} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <CheckCircle size={14} className="text-green-500" /> {b.title} ({b.pct}%)
                    </div>
                  ))}
                </div>
              )}
              {results.weakBlocks.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-destructive mb-2">Áreas de mejora prioritarias</p>
                  {results.weakBlocks.map(b => (
                    <div key={b.id} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <AlertTriangle size={14} className="text-destructive" /> {b.title} ({b.pct}%)
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-2xl border border-wine/20 bg-wine/5">
              <Sparkles size={24} className="text-wine mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold mb-2">¿Quieres un análisis profesional de tu carta?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-lg mx-auto">
                Envíanos tu carta y nuestro equipo te entregará un informe completo con recomendaciones concretas de mejora.
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
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Qué mide el Wine List Score</h2>
          </ScrollReveal>

          <SummaryBox
            label="Metodología"
            definition="El Wine List Score evalúa tu carta de vinos en 6 dimensiones: estructura y organización, equilibrio y diversidad, pricing y márgenes, oferta por copa, rotación y gestión, y potencial comercial. Cada bloque contribuye al score global de 0 a 100."
            bullets={[
              "Estructura: ¿la carta es navegable, clara y tiene descripciones útiles?",
              "Equilibrio: ¿hay variedad de tipologías, regiones y perfiles?",
              "Pricing: ¿los márgenes son diferenciados y la escalera de precios progresiva?",
              "Copa: ¿la oferta por copa es suficiente y controlada?",
              "Rotación: ¿la carta se actualiza y todas las referencias se venden?",
              "Comercial: ¿hay recomendaciones, maridajes y el equipo está formado?",
            ]}
          />
        </div>
      </section>

      <FAQSection faqs={[
        { q: "¿Qué score es bueno para una carta de vinos?", a: "Por encima de 70 se considera una carta bien optimizada. Entre 50 y 70 hay oportunidades claras. Por debajo de 50, la carta necesita mejoras estructurales." },
        { q: "¿Este auditor sustituye un análisis profesional?", a: "No. Es una autoevaluación rápida que identifica áreas de mejora. Un análisis profesional examina cada referencia en detalle con datos de mercado y benchmarks del sector." },
        { q: "¿Cada cuánto debería hacer esta auditoría?", a: "Trimestralmente como mínimo, o cada vez que hagas cambios relevantes en la carta." },
        { q: "¿Los datos que introduzco se guardan?", a: "No. Todo el cálculo se realiza en tu navegador. No se envían ni almacenan datos." },
      ]} schemaId="wls" />

      <InternalLinks links={[
        { to: "/wine-list-analyzer", label: "Analizador de carta de vinos con IA", type: "tool" },
        { to: "/recursos/checklist-carta-que-vende", label: "Checklist: ¿tu carta realmente vende?", type: "resource" },
        { to: "/benchmarks-playbooks/playbook-carta-rentable", label: "Playbook: construir una carta rentable", type: "guide" },
        { to: "/software-carta-de-vinos", label: "Software de carta de vinos", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default WineListScore;
