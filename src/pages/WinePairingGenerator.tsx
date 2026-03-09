import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Utensils, Flame, Globe, Loader2,
  Thermometer, MapPin, Grape, Lightbulb, Sparkles, RotateCcw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { toast } from "sonner";

interface WineRec {
  name: string;
  grape: string;
  region: string;
  why: string;
  style: string;
  servingTemp: string;
}

interface PairingResult {
  wines: WineRec[];
  pairingExplanation: string;
  recommendedStyles: string[];
  tips: string;
}

const intensities = [
  { value: "ligero", label: "Ligero", desc: "Ensaladas, ceviches, carpaccios" },
  { value: "medio", label: "Medio", desc: "Pastas, arroces, pescados" },
  { value: "intenso", label: "Intenso", desc: "Carnes rojas, guisos, estofados" },
  { value: "muy-intenso", label: "Muy intenso", desc: "Caza, ahumados, especiados" },
];

const WinePairingGenerator = () => {
  const [dishType, setDishType] = useState("");
  const [mainIngredient, setMainIngredient] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PairingResult | null>(null);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "pairing-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Wine Pairing Generator",
      applicationCategory: "FoodEstablishment",
      operatingSystem: "Web",
      description: "Introduce un plato y obtén recomendaciones de vino con explicación del maridaje.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("pairing-jsonld")?.remove(); };
  }, []);

  const handleGenerate = async () => {
    if (!dishType.trim() || !mainIngredient.trim()) {
      toast.error("Introduce al menos el tipo de plato y el ingrediente principal");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("wine-pairing", {
        body: { dishType, mainIngredient, cuisineType, intensity },
      });
      if (error) throw error;
      setResult(data as PairingResult);
    } catch {
      toast.error("Error al generar recomendaciones. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setDishType("");
    setMainIngredient("");
    setCuisineType("");
    setIntensity("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine Pairing Generator – Maridaje de vinos con IA | Winerim"
        description="Introduce un plato y obtén 3 recomendaciones de vino con explicación del maridaje. Herramienta gratuita potenciada por inteligencia artificial."
        url="https://winerim.wine/wine-pairing-generator"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">IA Sommelier</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Wine Pairing{" "}<span className="text-gradient-wine italic">Generator</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Introduce tu plato y deja que nuestra IA sommelier te recomiende los mejores vinos para maridar.
          </motion.p>
        </div>
      </section>

      {/* INPUT */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
                  <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                    <Utensils size={18} className="text-wine" />
                    Describe tu plato
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Tipo de plato *</label>
                      <input
                        type="text"
                        value={dishType}
                        onChange={(e) => setDishType(e.target.value)}
                        placeholder="Ej: Risotto de setas, Chuletón a la brasa..."
                        maxLength={200}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Ingrediente principal *</label>
                      <input
                        type="text"
                        value={mainIngredient}
                        onChange={(e) => setMainIngredient(e.target.value)}
                        placeholder="Ej: Setas, Ternera, Bacalao..."
                        maxLength={200}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                        <Globe size={13} className="text-wine" /> Tipo de cocina
                      </label>
                      <input
                        type="text"
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        placeholder="Ej: Mediterránea, Japonesa, Peruana..."
                        maxLength={100}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                        <Flame size={13} className="text-wine" /> Intensidad del plato
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {intensities.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => setIntensity(intensity === opt.value ? "" : opt.value)}
                            className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                              intensity === opt.value
                                ? "border-wine bg-wine/5"
                                : "border-border hover:border-wine/40"
                            }`}
                          >
                            <p className="font-semibold">{opt.label}</p>
                            <p className="text-muted-foreground leading-tight">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-wine/20"
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Generando maridaje...</>
                    ) : (
                      <><Wine size={16} /> Generar recomendaciones</>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 transition-colors">
                  <RotateCcw size={14} /> Nuevo maridaje
                </button>

                {/* Pairing explanation */}
                <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles size={20} className="text-wine shrink-0 mt-1" />
                    <div>
                      <h2 className="font-heading text-lg font-bold mb-2">Análisis del maridaje</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{result.pairingExplanation}</p>
                    </div>
                  </div>

                  {result.recommendedStyles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {result.recommendedStyles.map((s, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full border border-wine/30 bg-wine/5 text-wine font-medium">{s}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Wine cards */}
                <div className="grid md:grid-cols-3 gap-5 mb-6">
                  {result.wines.map((wine, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="bg-gradient-card rounded-xl border border-border p-6 flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                        <Wine size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading font-bold text-base mb-1">{wine.name}</h3>
                      <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                        <p className="flex items-center gap-1.5"><Grape size={11} className="text-wine" /> {wine.grape}</p>
                        <p className="flex items-center gap-1.5"><MapPin size={11} className="text-wine" /> {wine.region}</p>
                        <p className="flex items-center gap-1.5"><Thermometer size={11} className="text-wine" /> {wine.servingTemp}</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-wine/10 text-wine font-medium self-start mb-4">{wine.style}</span>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{wine.why}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Tip */}
                {result.tips && (
                  <div className="bg-wine/5 border border-wine/20 rounded-xl p-5 flex items-start gap-3">
                    <Lightbulb size={18} className="text-wine shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Consejo del sommelier</p>
                      <p className="text-sm text-muted-foreground">{result.tips}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Para restaurantes</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Maridajes inteligentes para{" "}<span className="text-gradient-wine italic">tus clientes</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Los restaurantes utilizan Winerim para ofrecer maridajes inteligentes a sus clientes, integrados directamente en su carta digital.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                Solicitar demo
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/guias/como-crear-una-estrategia-de-maridaje-en-restauracion", label: "Estrategia de maridaje", type: "guide" },
        { to: "/como-vender-mas-vino-en-un-restaurante", label: "Cómo vender más vino", type: "guide" },
        { to: "/wine-list-analyzer", label: "Analizador de carta", type: "tool" },
        { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default WinePairingGenerator;
