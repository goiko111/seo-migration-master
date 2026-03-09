import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Upload, FileText, Link2, BarChart3,
  Layers, TrendingUp, Lightbulb, CheckCircle, AlertTriangle,
  Loader2, GlassWater, Send, X
} from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { toast } from "sonner";

/* ───── types ───── */
interface SectionResult {
  score: number;
  label: string;
  findings: string[];
  recommendations: string[];
}

interface AnalysisResult {
  score: number;
  totalReferences: number;
  summary: string;
  sections: {
    estructura: SectionResult;
    pricing: SectionResult;
    variedad: SectionResult;
    oportunidades: SectionResult;
  };
  priceDistribution: { low: number; mid: number; high: number; premium: number };
  duplicates: string[];
  priceGaps: string[];
  byThGlassPotential: string[];
}

const emailSchema = z.object({
  email: z.string().trim().email("Email no válido").max(255),
  restaurant: z.string().trim().max(255).optional(),
  city: z.string().trim().max(255).optional(),
});

/* ───── helpers ───── */
const sectionIcons: Record<string, typeof Layers> = {
  estructura: Layers,
  pricing: TrendingUp,
  variedad: Wine,
  oportunidades: Lightbulb,
};

const scoreColor = (s: number) =>
  s >= 75 ? "text-emerald-500" : s >= 50 ? "text-amber-500" : "text-destructive";

const scoreBg = (s: number) =>
  s >= 75 ? "bg-emerald-500/10" : s >= 50 ? "bg-amber-500/10" : "bg-destructive/10";

/* ───── component ───── */
const WineListAnalyzer = () => {
  const [inputMode, setInputMode] = useState<"file" | "url" | null>(null);
  const [wineText, setWineText] = useState("");
  const [fileName, setFileName] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [reportEmail, setReportEmail] = useState("");
  const [reportRestaurant, setReportRestaurant] = useState("");
  const [reportCity, setReportCity] = useState("");
  const [sendingReport, setSendingReport] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "wla-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Wine List Analyzer",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Analiza tu carta de vinos y descubre oportunidades de mejora en estructura, precios y variedad.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("wla-jsonld")?.remove(); };
  }, []);

  /* file reader */
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    if (file.type === "text/plain" || file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
      const text = await file.text();
      setWineText(text);
    } else {
      // For PDF/Excel, read as text (basic extraction)
      try {
        const text = await file.text();
        setWineText(text);
      } catch {
        toast.error("No se pudo leer el archivo. Prueba con formato .txt o .csv");
      }
    }
  }, []);

  /* analyze */
  const handleAnalyze = async () => {
    const textToAnalyze = inputMode === "url"
      ? `URL de carta de vinos: ${urlValue}\n\nPor favor analiza esta carta basándote en la URL proporcionada.`
      : wineText;

    if (!textToAnalyze || textToAnalyze.trim().length < 10) {
      toast.error("Introduce o sube el contenido de tu carta de vinos");
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-wine-list", {
        body: { wineListText: textToAnalyze },
      });

      if (error) throw error;
      setResult(data as AnalysisResult);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (err: unknown) {
      console.error(err);
      toast.error("Error al analizar la carta. Inténtalo de nuevo.");
    } finally {
      setAnalyzing(false);
    }
  };

  /* send report */
  const handleSendReport = async () => {
    const validation = emailSchema.safeParse({
      email: reportEmail,
      restaurant: reportRestaurant || undefined,
      city: reportCity || undefined,
    });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      return;
    }

    setSendingReport(true);
    try {
      const { error } = await supabase.functions.invoke("analyze-wine-list", {
        body: {
          wineListText: wineText || `URL: ${urlValue}`,
          saveReport: true,
          email: reportEmail,
          restaurant: reportRestaurant,
          city: reportCity,
        },
      });
      if (error) throw error;
      setReportSent(true);
      toast.success("¡Solicitud enviada! Te contactaremos pronto.");
    } catch {
      toast.error("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setSendingReport(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setWineText("");
    setFileName("");
    setUrlValue("");
    setInputMode(null);
    setReportSent(false);
    setReportEmail("");
    setReportRestaurant("");
    setReportCity("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine List Analyzer – Analiza tu carta de vinos | Winerim"
        description="Herramienta gratuita para analizar tu carta de vinos. Detecta oportunidades de mejora en estructura, precios, variedad y obtén un score de 0 a 100."
        url="https://winerim.wine/wine-list-analyzer"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Herramientas", href: "/herramientas" }, { label: "Wine List Analyzer" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Herramienta gratuita</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Analiza tu carta de vinos en{" "}<span className="text-gradient-wine italic">segundos</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Descubre cómo mejorar la estructura de tu carta, optimizar precios y aumentar las ventas de vino.
          </motion.p>
          {!result && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={() => {
                document.getElementById("input-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
            >
              <Upload size={16} />
              Subir carta de vinos
            </motion.button>
          )}
        </div>
      </section>

      {/* INPUT SECTION */}
      <AnimatePresence mode="wait">
        {!result && (
          <motion.section
            id="input-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="section-padding"
          >
            <div className="max-w-3xl mx-auto">
              <ScrollReveal className="text-center mb-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">¿Cómo quieres compartir tu carta?</h2>
                <p className="text-muted-foreground">Elige un método para subir o introducir tu carta de vinos</p>
              </ScrollReveal>

              {/* Mode selector */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { mode: "file" as const, icon: Upload, label: "Subir archivo", desc: "PDF, Excel, CSV o TXT" },
                  { mode: "file" as const, icon: FileText, label: "Pegar texto", desc: "Copiar y pegar tu carta" },
                  { mode: "url" as const, icon: Link2, label: "Pegar enlace", desc: "URL de tu carta online" },
                ].map((opt, i) => {
                  const Icon = opt.icon;
                  const isActive = (i === 0 && inputMode === "file" && fileName) ||
                    (i === 1 && inputMode === "file" && !fileName && wineText) ||
                    (i === 2 && inputMode === "url");
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === 0) {
                          setInputMode("file");
                          fileInputRef.current?.click();
                        } else if (i === 1) {
                          setInputMode("file");
                          setFileName("");
                        } else {
                          setInputMode("url");
                        }
                      }}
                      className={`p-5 rounded-xl border transition-all text-left ${
                        isActive
                          ? "border-wine bg-wine/5"
                          : "border-border bg-gradient-card hover:border-wine/40"
                      }`}
                    >
                      <Icon size={20} className="text-wine mb-2" />
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.xlsx,.xls,.csv,.txt"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* File uploaded */}
              {inputMode === "file" && fileName && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-card rounded-xl border border-wine/30 p-5 mb-6 flex items-center gap-3">
                  <FileText size={20} className="text-wine" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{fileName}</p>
                    <p className="text-xs text-muted-foreground">{wineText.length} caracteres extraídos</p>
                  </div>
                  <button onClick={() => { setFileName(""); setWineText(""); }} className="text-muted-foreground hover:text-foreground">
                    <X size={16} />
                  </button>
                </motion.div>
              )}

              {/* Text input */}
              {inputMode === "file" && !fileName && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <textarea
                    value={wineText}
                    onChange={(e) => setWineText(e.target.value)}
                    placeholder="Pega aquí tu carta de vinos: nombres, regiones, precios, categorías..."
                    rows={10}
                    maxLength={15000}
                    className="w-full bg-gradient-card border border-border rounded-xl p-5 text-sm placeholder:text-muted-foreground/50 focus:border-wine focus:outline-none resize-none mb-2"
                  />
                  <p className="text-xs text-muted-foreground text-right">{wineText.length} / 15.000</p>
                </motion.div>
              )}

              {/* URL input */}
              {inputMode === "url" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <input
                    type="url"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="https://turestaurante.com/carta-de-vinos"
                    maxLength={500}
                    className="w-full bg-gradient-card border border-border rounded-xl p-5 text-sm placeholder:text-muted-foreground/50 focus:border-wine focus:outline-none mb-2"
                  />
                </motion.div>
              )}

              {/* Analyze button */}
              {inputMode && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Analizando carta...
                      </>
                    ) : (
                      <>
                        <BarChart3 size={16} />
                        Analizar carta
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* RESULTS */}
      <AnimatePresence>
        {result && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Score hero */}
            <section className="section-padding">
              <div className="max-w-4xl mx-auto text-center">
                <button onClick={resetAnalysis} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 transition-colors">
                  ← Analizar otra carta
                </button>

                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${scoreBg(result.score)} mb-6`}>
                  <span className={`font-heading text-5xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
                </div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Score de tu carta</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{result.totalReferences} referencias analizadas</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{result.summary}</p>
              </div>
            </section>

            {/* Section cards */}
            <section className="section-padding bg-gradient-dark">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(result.sections).map(([key, section], i) => {
                    const Icon = sectionIcons[key] || Layers;
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gradient-card rounded-xl border border-border p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Icon size={18} className="text-wine" />
                            <h3 className="font-heading font-semibold">{section.label}</h3>
                          </div>
                          <span className={`font-heading text-2xl font-bold ${scoreColor(section.score)}`}>{section.score}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-border rounded-full h-2 mb-5">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              section.score >= 75 ? "bg-emerald-500" : section.score >= 50 ? "bg-amber-500" : "bg-destructive"
                            }`}
                            style={{ width: `${section.score}%` }}
                          />
                        </div>

                        <div className="space-y-2 mb-4">
                          {section.findings.slice(0, 3).map((f, fi) => (
                            <div key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle size={12} className="text-wine shrink-0 mt-0.5" />
                              {f}
                            </div>
                          ))}
                        </div>

                        {section.recommendations.length > 0 && (
                          <div className="border-t border-border pt-3 space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-wine">Recomendaciones</p>
                            {section.recommendations.slice(0, 2).map((r, ri) => (
                              <div key={ri} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                                {r}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Extra insights */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {result.duplicates.length > 0 && (
                    <div className="bg-gradient-card rounded-xl border border-border p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3 flex items-center gap-2">
                        <AlertTriangle size={14} /> Duplicados en estilo
                      </h4>
                      <ul className="space-y-1.5">
                        {result.duplicates.slice(0, 4).map((d, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.priceGaps.length > 0 && (
                    <div className="bg-gradient-card rounded-xl border border-border p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3 flex items-center gap-2">
                        <TrendingUp size={14} /> Huecos de precio
                      </h4>
                      <ul className="space-y-1.5">
                        {result.priceGaps.slice(0, 4).map((g, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {g}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.byThGlassPotential.length > 0 && (
                    <div className="bg-gradient-card rounded-xl border border-border p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3 flex items-center gap-2">
                        <GlassWater size={14} /> Potencial por copa
                      </h4>
                      <ul className="space-y-1.5">
                        {result.byThGlassPotential.slice(0, 4).map((w, i) => (
                          <li key={i} className="text-sm text-muted-foreground">• {w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* CTA: Report by email */}
            <section className="section-padding">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                  <div className="relative z-10">
                    <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Informe completo</p>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
                      Recibe el informe completo por{" "}<span className="text-gradient-wine italic">email</span>
                    </h2>
                    <p className="text-muted-foreground mb-8 text-sm">
                      Nuestro equipo de sommeliers revisará tu carta y te enviará un informe detallado con recomendaciones personalizadas.
                    </p>

                    {reportSent ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-500 font-semibold">
                        <CheckCircle size={20} />
                        ¡Solicitud enviada! Te contactaremos pronto.
                      </div>
                    ) : (
                      <div className="space-y-3 max-w-md mx-auto">
                        <input
                          type="email"
                          value={reportEmail}
                          onChange={(e) => setReportEmail(e.target.value)}
                          placeholder="tu@email.com *"
                          maxLength={255}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={reportRestaurant}
                            onChange={(e) => setReportRestaurant(e.target.value)}
                            placeholder="Restaurante"
                            maxLength={255}
                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none"
                          />
                          <input
                            type="text"
                            value={reportCity}
                            onChange={(e) => setReportCity(e.target.value)}
                            placeholder="Ciudad"
                            maxLength={255}
                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={handleSendReport}
                          disabled={sendingReport}
                          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50"
                        >
                          {sendingReport ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                          Recibir informe completo
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static CTA when no results */}
      {!result && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">¿Qué analizamos?</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Un diagnóstico completo de tu{" "}<span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Layers, title: "Estructura", desc: "Organización por categorías, equilibrio entre tipos de vino y secciones." },
                { icon: TrendingUp, title: "Distribución de precios", desc: "Escalera de precios, huecos y concentración por rango." },
                { icon: Wine, title: "Variedad y equilibrio", desc: "Diversidad de regiones, uvas y estilos. Duplicados detectados." },
                { icon: GlassWater, title: "Potencial por copa", desc: "Vinos candidatos a servirse por copa para aumentar ventas." },
                { icon: AlertTriangle, title: "Huecos detectados", desc: "Rangos de precio sin cobertura y categorías ausentes." },
                { icon: Lightbulb, title: "Oportunidades", desc: "Recomendaciones concretas para mejorar ventas y márgenes." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <InternalLinks links={[
        { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", type: "guide" },
        { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", type: "resource" },
        { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default WineListAnalyzer;
