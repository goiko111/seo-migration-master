import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Utensils, Flame, Globe, Loader2,
  Thermometer, MapPin, Grape, Lightbulb, Sparkles, RotateCcw
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang, I18nMap } from "@/i18n/types";

interface WineRec { name: string; grape: string; region: string; why: string; style: string; servingTemp: string; }
interface PairingResult { wines: WineRec[]; pairingExplanation: string; recommendedStyles: string[]; tips: string; }

const i18n: I18nMap<Record<string, any>> = {
  es: {
    seo_title: "Wine Pairing Generator – Maridaje de vinos con IA | Winerim",
    seo_desc: "Introduce un plato y obtén 3 recomendaciones de vino con explicación del maridaje. Herramienta gratuita potenciada por inteligencia artificial.",
    badge: "IA Sommelier",
    h1_1: "Wine Pairing", h1_2: "Generator",
    subtitle: "Introduce tu plato y deja que nuestra IA sommelier te recomiende los mejores vinos para maridar.",
    bread_tools: "Herramientas", bread_self: "Wine Pairing Generator",
    describe_title: "Describe tu plato",
    dish_label: "Tipo de plato *", dish_placeholder: "Ej: Risotto de setas, Chuletón a la brasa...",
    ingredient_label: "Ingrediente principal *", ingredient_placeholder: "Ej: Setas, Ternera, Bacalao...",
    cuisine_label: "Tipo de cocina", cuisine_placeholder: "Ej: Mediterránea, Japonesa, Peruana...",
    intensity_label: "Intensidad del plato",
    intensities: [
      { value: "ligero", label: "Ligero", desc: "Ensaladas, ceviches, carpaccios" },
      { value: "medio", label: "Medio", desc: "Pastas, arroces, pescados" },
      { value: "intenso", label: "Intenso", desc: "Carnes rojas, guisos, estofados" },
      { value: "muy-intenso", label: "Muy intenso", desc: "Caza, ahumados, especiados" },
    ],
    generate_btn: "Generar recomendaciones",
    generating: "Generando maridaje...",
    new_pairing: "Nuevo maridaje",
    analysis_title: "Análisis del maridaje",
    tip_title: "Consejo del sommelier",
    error_empty: "Introduce al menos el tipo de plato y el ingrediente principal",
    error_generate: "Error al generar recomendaciones. Inténtalo de nuevo.",
    cta_badge: "Para restaurantes",
    cta_title_1: "Maridajes inteligentes para", cta_title_2: "tus clientes",
    cta_desc: "Los restaurantes utilizan Winerim para ofrecer maridajes inteligentes a sus clientes, integrados directamente en su carta digital.",
    cta_btn: "Solicitar demo",
    link_pairing: "Estrategia de maridaje", link_sell: "Cómo vender más vino",
    link_analyzer: "Analizador de carta", link_demo: "Solicitar demo de Winerim",
    decides: ["Qué vino recomendar para cada plato", "Cómo comunicar el maridaje al comensal", "Qué estilos encajan con tu menú"],
    avoids: ["Recomendaciones genéricas sin criterio", "Depender solo de la intuición del equipo de sala", "Perder ventas por falta de sugerencias activas"],
    impact: ["Aumentar la venta cruzada vino-plato", "Mejorar la percepción de servicio profesional", "Elevar el ticket medio con recomendaciones fundamentadas"],
  },
  en: {
    seo_title: "Wine Pairing Generator – AI Wine Pairing | Winerim",
    seo_desc: "Enter a dish and get 3 wine recommendations with pairing explanation. Free AI-powered tool.",
    badge: "AI Sommelier",
    h1_1: "Wine Pairing", h1_2: "Generator",
    subtitle: "Enter your dish and let our AI sommelier recommend the best wines to pair.",
    bread_tools: "Tools", bread_self: "Wine Pairing Generator",
    describe_title: "Describe your dish",
    dish_label: "Dish type *", dish_placeholder: "E.g. Mushroom risotto, Grilled ribeye...",
    ingredient_label: "Main ingredient *", ingredient_placeholder: "E.g. Mushrooms, Beef, Cod...",
    cuisine_label: "Cuisine type", cuisine_placeholder: "E.g. Mediterranean, Japanese, Peruvian...",
    intensity_label: "Dish intensity",
    intensities: [
      { value: "ligero", label: "Light", desc: "Salads, ceviches, carpaccios" },
      { value: "medio", label: "Medium", desc: "Pasta, rice, fish" },
      { value: "intenso", label: "Intense", desc: "Red meats, stews, casseroles" },
      { value: "muy-intenso", label: "Very intense", desc: "Game, smoked, spiced" },
    ],
    generate_btn: "Generate recommendations",
    generating: "Generating pairing...",
    new_pairing: "New pairing",
    analysis_title: "Pairing analysis",
    tip_title: "Sommelier tip",
    error_empty: "Enter at least the dish type and main ingredient",
    error_generate: "Error generating recommendations. Please try again.",
    cta_badge: "For restaurants",
    cta_title_1: "Smart pairings for", cta_title_2: "your guests",
    cta_desc: "Restaurants use Winerim to offer smart pairings to their guests, integrated directly into their digital wine list.",
    cta_btn: "Request demo",
    link_pairing: "Pairing strategy", link_sell: "How to sell more wine",
    link_analyzer: "Wine list analyser", link_demo: "Request Winerim demo",
    decides: ["Which wine to recommend for each dish", "How to communicate the pairing to the guest", "Which styles suit your menu"],
    avoids: ["Generic recommendations without criteria", "Relying solely on floor staff intuition", "Losing sales from lack of active suggestions"],
    impact: ["Increase wine-food cross-selling", "Improve perception of professional service", "Raise average ticket with informed recommendations"],
  },
  it: {
    seo_title: "Wine Pairing Generator – Abbinamento Vini con IA | Winerim",
    seo_desc: "Inserisci un piatto e ottieni 3 raccomandazioni di vino con spiegazione dell'abbinamento. Strumento gratuito con intelligenza artificiale.",
    badge: "IA Sommelier",
    h1_1: "Wine Pairing", h1_2: "Generator",
    subtitle: "Inserisci il tuo piatto e lascia che la nostra IA sommelier ti raccomandi i migliori vini per l'abbinamento.",
    bread_tools: "Strumenti", bread_self: "Wine Pairing Generator",
    describe_title: "Descrivi il tuo piatto",
    dish_label: "Tipo di piatto *", dish_placeholder: "Es: Risotto ai funghi, Bistecca alla brace...",
    ingredient_label: "Ingrediente principale *", ingredient_placeholder: "Es: Funghi, Manzo, Baccalà...",
    cuisine_label: "Tipo di cucina", cuisine_placeholder: "Es: Mediterranea, Giapponese, Peruviana...",
    intensity_label: "Intensità del piatto",
    intensities: [
      { value: "ligero", label: "Leggero", desc: "Insalate, ceviche, carpacci" },
      { value: "medio", label: "Medio", desc: "Pasta, risotti, pesce" },
      { value: "intenso", label: "Intenso", desc: "Carni rosse, stufati, brasati" },
      { value: "muy-intenso", label: "Molto intenso", desc: "Selvaggina, affumicati, speziati" },
    ],
    generate_btn: "Genera raccomandazioni",
    generating: "Generazione abbinamento...",
    new_pairing: "Nuovo abbinamento",
    analysis_title: "Analisi dell'abbinamento",
    tip_title: "Consiglio del sommelier",
    error_empty: "Inserisci almeno il tipo di piatto e l'ingrediente principale",
    error_generate: "Errore nella generazione. Riprova.",
    cta_badge: "Per ristoranti",
    cta_title_1: "Abbinamenti intelligenti per", cta_title_2: "i tuoi clienti",
    cta_desc: "I ristoranti usano Winerim per offrire abbinamenti intelligenti ai clienti, integrati direttamente nella carta digitale.",
    cta_btn: "Richiedi demo",
    link_pairing: "Strategia di abbinamento", link_sell: "Come vendere più vino",
    link_analyzer: "Analizzatore carta", link_demo: "Richiedi demo Winerim",
    decides: ["Quale vino consigliare per ogni piatto", "Come comunicare l'abbinamento al cliente", "Quali stili si adattano al tuo menu"],
    avoids: ["Raccomandazioni generiche senza criterio", "Affidarsi solo all'intuizione del personale di sala", "Perdere vendite per mancanza di suggerimenti attivi"],
    impact: ["Aumentare il cross-selling vino-piatto", "Migliorare la percezione di servizio professionale", "Alzare lo scontrino medio con raccomandazioni fondate"],
  },
  fr: {
    seo_title: "Wine Pairing Generator – Accords Mets & Vins avec IA | Winerim",
    seo_desc: "Entrez un plat et obtenez 3 recommandations de vin avec explication de l'accord. Outil gratuit propulsé par l'IA.",
    badge: "IA Sommelier",
    h1_1: "Wine Pairing", h1_2: "Generator",
    subtitle: "Entrez votre plat et laissez notre IA sommelier vous recommander les meilleurs vins pour l'accord.",
    bread_tools: "Outils", bread_self: "Wine Pairing Generator",
    describe_title: "Décrivez votre plat",
    dish_label: "Type de plat *", dish_placeholder: "Ex : Risotto aux champignons, Côte de bœuf grillée...",
    ingredient_label: "Ingrédient principal *", ingredient_placeholder: "Ex : Champignons, Bœuf, Cabillaud...",
    cuisine_label: "Type de cuisine", cuisine_placeholder: "Ex : Méditerranéenne, Japonaise, Péruvienne...",
    intensity_label: "Intensité du plat",
    intensities: [
      { value: "ligero", label: "Léger", desc: "Salades, ceviches, carpaccios" },
      { value: "medio", label: "Moyen", desc: "Pâtes, riz, poissons" },
      { value: "intenso", label: "Intense", desc: "Viandes rouges, ragoûts, braisés" },
      { value: "muy-intenso", label: "Très intense", desc: "Gibier, fumés, épicés" },
    ],
    generate_btn: "Générer des recommandations",
    generating: "Génération de l'accord...",
    new_pairing: "Nouvel accord",
    analysis_title: "Analyse de l'accord",
    tip_title: "Conseil du sommelier",
    error_empty: "Entrez au moins le type de plat et l'ingrédient principal",
    error_generate: "Erreur lors de la génération. Veuillez réessayer.",
    cta_badge: "Pour les restaurants",
    cta_title_1: "Accords intelligents pour", cta_title_2: "vos clients",
    cta_desc: "Les restaurants utilisent Winerim pour proposer des accords intelligents à leurs clients, intégrés directement dans leur carte digitale.",
    cta_btn: "Demander une démo",
    link_pairing: "Stratégie d'accord", link_sell: "Comment vendre plus de vin",
    link_analyzer: "Analyseur de carte", link_demo: "Demander une démo Winerim",
    decides: ["Quel vin recommander pour chaque plat", "Comment communiquer l'accord au client", "Quels styles conviennent à votre menu"],
    avoids: ["Recommandations génériques sans critère", "Compter uniquement sur l'intuition du personnel de salle", "Perdre des ventes par manque de suggestions actives"],
    impact: ["Augmenter la vente croisée vin-plat", "Améliorer la perception d'un service professionnel", "Augmenter le ticket moyen avec des recommandations fondées"],
  },
};

const WinePairingGenerator = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

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
      "@context": "https://schema.org", "@type": "WebApplication",
      name: "Wine Pairing Generator", applicationCategory: "FoodEstablishment",
      operatingSystem: "Web", description: t.seo_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("pairing-jsonld")?.remove(); };
  }, [t]);

  const handleGenerate = async () => {
    if (!dishType.trim() || !mainIngredient.trim()) { toast.error(t.error_empty); return; }
    setLoading(true); setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("wine-pairing", {
        body: { dishType, mainIngredient, cuisineType, intensity },
      });
      if (error) throw error;
      setResult(data as PairingResult);
    } catch { toast.error(t.error_generate); } finally { setLoading(false); }
  };

  const reset = () => { setResult(null); setDishType(""); setMainIngredient(""); setCuisineType(""); setIntensity(""); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.seo_title} description={t.seo_desc} url={`https://winerim.wine${localePath("/wine-pairing-generator")}`}
        hreflang={allLangPaths("/wine-pairing-generator")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.bread_tools, href: localePath("/herramientas") }, { label: t.bread_self }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1_1}{" "}<span className="text-gradient-wine italic">{t.h1_2}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* INPUT */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-10">
                  <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                    <Utensils size={18} className="text-wine" /> {t.describe_title}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">{t.dish_label}</label>
                      <input type="text" value={dishType} onChange={(e) => setDishType(e.target.value)} placeholder={t.dish_placeholder} maxLength={200}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">{t.ingredient_label}</label>
                      <input type="text" value={mainIngredient} onChange={(e) => setMainIngredient(e.target.value)} placeholder={t.ingredient_placeholder} maxLength={200}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Globe size={13} className="text-wine" /> {t.cuisine_label}</label>
                      <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} placeholder={t.cuisine_placeholder} maxLength={100}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Flame size={13} className="text-wine" /> {t.intensity_label}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {t.intensities.map((opt: any) => (
                          <button key={opt.value} onClick={() => setIntensity(intensity === opt.value ? "" : opt.value)}
                            className={`text-left p-2.5 rounded-lg border text-xs transition-all ${intensity === opt.value ? "border-wine bg-wine/5" : "border-border hover:border-wine/40"}`}>
                            <p className="font-semibold">{opt.label}</p>
                            <p className="text-muted-foreground leading-tight">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={handleGenerate} disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-wine/20">
                    {loading ? (<><Loader2 size={16} className="animate-spin" /> {t.generating}</>) : (<><Wine size={16} /> {t.generate_btn}</>)}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 transition-colors">
                  <RotateCcw size={14} /> {t.new_pairing}
                </button>
                <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles size={20} className="text-wine shrink-0 mt-1" />
                    <div>
                      <h2 className="font-heading text-lg font-bold mb-2">{t.analysis_title}</h2>
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
                <div className="grid md:grid-cols-3 gap-5 mb-6">
                  {result.wines.map((wine, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                      className="bg-gradient-card rounded-xl border border-border p-6 flex flex-col">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4"><Wine size={20} className="text-wine" /></div>
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
                {result.tips && (
                  <div className="bg-wine/5 border border-wine/20 rounded-xl p-5 flex items-start gap-3">
                    <Lightbulb size={18} className="text-wine shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold mb-1">{t.tip_title}</p>
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
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.cta_badge}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {t.cta_title_1}{" "}<span className="text-gradient-wine italic">{t.cta_title_2}</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">{t.cta_desc}</p>
              <Link to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                {t.cta_btn} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: localePath("/guias/como-crear-una-estrategia-de-maridaje-en-restauracion"), label: t.link_pairing, type: "guide" },
        { to: localePath("/como-vender-mas-vino-en-un-restaurante"), label: t.link_sell, type: "guide" },
        { to: localePath("/wine-list-analyzer"), label: t.link_analyzer, type: "tool" },
        { to: localePath("/demo"), label: t.link_demo, type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default WinePairingGenerator;
