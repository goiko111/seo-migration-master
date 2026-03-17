import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DollarSign, Package, ShoppingCart, BarChart3, Wine, Building2,
  ArrowRight, Lock, Shield, Sparkles, Briefcase, Store, Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { InsightCard, insightLibrary } from "@/components/decision";
import DCWelcome from "@/components/decision/DCWelcome";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationDict } from "@/i18n/types";

/* ── Password gate ── */
const GATE_KEY = "wdc_access";
const GATE_PASSWORD = "winerim2026";

const useGate = () => {
  const [granted, setGranted] = useState(() => sessionStorage.getItem(GATE_KEY) === "true");
  const unlock = (pwd: string) => {
    if (pwd === GATE_PASSWORD) {
      sessionStorage.setItem(GATE_KEY, "true");
      setGranted(true);
      return true;
    }
    return false;
  };
  return { granted, unlock };
};

/* ── Area data ── */
type UserProfile = "direccion" | "sala" | "compras-fb" | "grupo";

const getProfileConfig = (t: TranslationDict): Record<UserProfile, { label: string; icon: typeof Briefcase }> => ({
  "direccion":  { label: t.dc_profile_management, icon: Briefcase },
  "sala":       { label: t.dc_profile_floor,      icon: Store },
  "compras-fb": { label: t.dc_profile_purchasing,  icon: ShoppingCart },
  "grupo":      { label: t.dc_profile_group,       icon: Users },
});

interface Area {
  id: string;
  name: string;
  tagline: string;
  description: string;
  profiles: UserProfile[];
  icon: React.ElementType;
  accent: string;
  bg: string;
  border: string;
  href: string;
}

const getAreas = (t: TranslationDict): Area[] => [
  {
    id: "margenes",
    name: t.locale === "es_ES" ? "Márgenes y pricing" : t.locale === "en_GB" ? "Margins & Pricing" : t.locale === "it_IT" ? "Margini e pricing" : "Marges et pricing",
    tagline: t.locale === "es_ES" ? "Entiende la rentabilidad real de cada vino" : t.locale === "en_GB" ? "Understand the real profitability of each wine" : t.locale === "it_IT" ? "Comprendi la redditività reale di ogni vino" : "Comprenez la rentabilité réelle de chaque vin",
    description: t.locale === "es_ES" ? "Qué significa cada métrica de margen, cómo interpretar desviaciones y qué palancas usar para mejorar la rentabilidad de tu carta sin tocar la experiencia del comensal." : t.locale === "en_GB" ? "What each margin metric means, how to interpret deviations and what levers to use to improve your wine list profitability without affecting the guest experience." : t.locale === "it_IT" ? "Cosa significa ogni metrica di margine, come interpretare le deviazioni e quali leve usare per migliorare la redditività della tua carta senza toccare l'esperienza del cliente." : "Ce que signifie chaque métrique de marge, comment interpréter les écarts et quels leviers utiliser pour améliorer la rentabilité de votre carte sans affecter l'expérience client.",
    profiles: ["direccion", "compras-fb"],
    icon: DollarSign,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    href: "/decision-center/margenes-pricing",
  },
  {
    id: "stock",
    name: t.locale === "es_ES" ? "Stock y rotación" : t.locale === "en_GB" ? "Stock & Rotation" : t.locale === "it_IT" ? "Stock e rotazione" : "Stock et rotation",
    tagline: t.locale === "es_ES" ? "Detecta lo que no se mueve antes de que sea tarde" : t.locale === "en_GB" ? "Spot what isn't moving before it's too late" : t.locale === "it_IT" ? "Individua ciò che non si muove prima che sia troppo tardi" : "Détectez ce qui ne bouge pas avant qu'il ne soit trop tard",
    description: t.locale === "es_ES" ? "Cómo identificar vinos muertos, cuánto capital tienes inmovilizado, cuándo retirar una referencia y cómo mantener una bodega viva y rentable." : t.locale === "en_GB" ? "How to identify dead stock, how much capital is tied up, when to delist a reference and how to keep a live, profitable cellar." : t.locale === "it_IT" ? "Come identificare i vini morti, quanto capitale hai immobilizzato, quando ritirare un riferimento e come mantenere una cantina viva e redditizia." : "Comment identifier le stock mort, combien de capital est immobilisé, quand retirer une référence et comment maintenir une cave vivante et rentable.",
    profiles: ["sala", "compras-fb", "direccion"],
    icon: Package,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    href: "/decision-center/stock-rotacion",
  },
  {
    id: "compras",
    name: t.locale === "es_ES" ? "Compras y reposición" : t.locale === "en_GB" ? "Purchasing & Replenishment" : t.locale === "it_IT" ? "Acquisti e rifornimento" : "Achats et réapprovisionnement",
    tagline: t.locale === "es_ES" ? "Compra con datos, no con intuición" : t.locale === "en_GB" ? "Buy with data, not intuition" : t.locale === "it_IT" ? "Acquista con i dati, non con l'intuizione" : "Achetez avec des données, pas à l'intuition",
    description: t.locale === "es_ES" ? "Qué datos usar antes de comprar, cómo detectar sobrecostes, cuándo negociar condiciones y cómo conectar tus decisiones de compra con el rendimiento real de la carta." : t.locale === "en_GB" ? "What data to use before purchasing, how to detect overpricing, when to negotiate conditions and how to connect buying decisions with real wine list performance." : t.locale === "it_IT" ? "Quali dati usare prima di acquistare, come rilevare sovracosti, quando negoziare condizioni e come collegare le decisioni di acquisto al rendimento reale della carta." : "Quelles données utiliser avant d'acheter, comment détecter les surcoûts, quand négocier les conditions et comment relier vos décisions d'achat à la performance réelle de la carte.",
    profiles: ["compras-fb", "direccion"],
    icon: ShoppingCart,
    accent: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    href: "/decision-center/compras-reposicion",
  },
  {
    id: "carta",
    name: t.locale === "es_ES" ? "Carta y equilibrio" : t.locale === "en_GB" ? "Wine List & Balance" : t.locale === "it_IT" ? "Carta ed equilibrio" : "Carte et équilibre",
    tagline: t.locale === "es_ES" ? "Tu carta debe contar una historia coherente" : t.locale === "en_GB" ? "Your wine list should tell a coherent story" : t.locale === "it_IT" ? "La tua carta deve raccontare una storia coerente" : "Votre carte doit raconter une histoire cohérente",
    description: t.locale === "es_ES" ? "Cómo evaluar el equilibrio de tu carta por estilos, precios, regiones y tipologías. Qué canibaliza, qué falta y cómo construir una arquitectura de carta que venda sola." : t.locale === "en_GB" ? "How to assess your wine list balance by style, price, region and type. What cannibalises, what's missing and how to build a list architecture that sells itself." : t.locale === "it_IT" ? "Come valutare l'equilibrio della tua carta per stili, prezzi, regioni e tipologie. Cosa cannibalizza, cosa manca e come costruire un'architettura di carta che si venda da sola." : "Comment évaluer l'équilibre de votre carte par styles, prix, régions et typologies. Ce qui cannibalise, ce qui manque et comment construire une architecture de carte qui vend toute seule.",
    profiles: ["sala", "direccion", "compras-fb"],
    icon: BarChart3,
    accent: "text-wine",
    bg: "bg-wine/10",
    border: "border-wine/20",
    href: "/decision-center/carta-equilibrio",
  },
  {
    id: "copa",
    name: t.locale === "es_ES" ? "Vino por copa" : t.locale === "en_GB" ? "By the Glass" : t.locale === "it_IT" ? "Vino al calice" : "Vin au verre",
    tagline: t.locale === "es_ES" ? "El programa de copa como motor de margen" : t.locale === "en_GB" ? "The by-the-glass programme as a margin driver" : t.locale === "it_IT" ? "Il programma al calice come motore di margine" : "Le programme au verre comme moteur de marge",
    description: t.locale === "es_ES" ? "Cómo diseñar, ejecutar y controlar un programa de vino por copa rentable: selección, pricing, merma, rotación y la relación entre copa y botella." : t.locale === "en_GB" ? "How to design, run and control a profitable by-the-glass programme: selection, pricing, waste, rotation and the glass-to-bottle relationship." : t.locale === "it_IT" ? "Come progettare, gestire e controllare un programma di vino al calice redditizio: selezione, pricing, spreco, rotazione e il rapporto calice-bottiglia." : "Comment concevoir, exécuter et contrôler un programme de vin au verre rentable : sélection, tarification, perte, rotation et la relation verre-bouteille.",
    profiles: ["sala", "direccion"],
    icon: Wine,
    accent: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    href: "/decision-center/vino-por-copa",
  },
  {
    id: "grupos",
    name: t.locale === "es_ES" ? "Grupos y benchmarking" : t.locale === "en_GB" ? "Groups & Benchmarking" : t.locale === "it_IT" ? "Gruppi e benchmarking" : "Groupes et benchmarking",
    tagline: t.locale === "es_ES" ? "Gobierna la categoría vino a escala" : t.locale === "en_GB" ? "Govern the wine category at scale" : t.locale === "it_IT" ? "Governa la categoria vino su scala" : "Gouvernez la catégorie vin à grande échelle",
    description: t.locale === "es_ES" ? "Cómo comparar locales, detectar desviaciones, estandarizar criterios de compra y gestionar surtido de forma centralizada sin perder la identidad de cada restaurante." : t.locale === "en_GB" ? "How to compare units, detect deviations, standardise purchasing criteria and manage assortment centrally without losing each restaurant's identity." : t.locale === "it_IT" ? "Come confrontare i locali, rilevare deviazioni, standardizzare i criteri di acquisto e gestire l'assortimento in modo centralizzato senza perdere l'identità di ogni ristorante." : "Comment comparer les établissements, détecter les écarts, standardiser les critères d'achat et gérer l'assortiment de manière centralisée sans perdre l'identité de chaque restaurant.",
    profiles: ["grupo", "direccion"],
    icon: Building2,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    href: "/decision-center/grupos-benchmarking",
  },
];

/* ── Password Gate UI ── */
const PasswordGate = ({ onUnlock, t }: { onUnlock: (pwd: string) => boolean; t: TranslationDict }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUnlock(value.trim())) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-wine" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t.dc_gate_title}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.dc_gate_subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t.dc_gate_placeholder}
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 transition-all ${
                error
                  ? "border-destructive focus:ring-destructive/30"
                  : "border-border focus:ring-wine/30 focus:border-wine/50"
              }`}
              autoFocus
            />
            <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-destructive font-medium"
            >
              {t.dc_gate_error}
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-wine text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
          >
            {t.dc_gate_submit}
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground/50 mt-6">
          {t.dc_gate_no_access}{" "}
          <Link to="/demo" className="text-wine hover:text-wine-light transition-colors">
            {t.dc_gate_request_demo}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

/* ── Hub page ── */
const DecisionCenter = () => {
  const { granted, unlock } = useGate();
  const { t } = useLanguage();
  const areas = getAreas(t);
  const profileCfg = getProfileConfig(t);

  if (!granted) return <PasswordGate onUnlock={unlock} t={t} />;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Winerim Decision Center"
        description={t.dc_hub_subtitle}
        url="https://winerim.wine/decision-center"
        noindex
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-wine/4 rounded-full blur-[160px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
            >
              <Sparkles size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine">
                {t.dc_hub_badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Decision Center
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4"
            >
              {t.dc_hub_subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-5 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-wine" />
                {t.dc_hub_pill_1}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {areas.length} {t.dc_hub_pill_2}
              </span>
            </motion.div>
          </div>
        </section>

        {/* Area cards grid */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={area.id} delay={i * 0.06}>
                  <Link
                    to={area.href}
                    className={`group relative flex flex-col h-full rounded-xl border ${area.border} bg-card/70 backdrop-blur-sm p-6 md:p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10`}
                  >
                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-xl ${area.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon size={20} className={area.accent} />
                      </div>
                      <div>
                        <h2 className="font-heading text-base font-bold text-foreground leading-tight group-hover:text-wine transition-colors">
                          {area.name}
                        </h2>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className={`text-xs font-semibold tracking-wider uppercase ${area.accent} mb-3`}>
                      {area.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {area.description}
                    </p>

                    {/* Audience — profile badges */}
                    <div className="border-t border-border pt-3 mb-4">
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/50 mb-1.5">
                        {t.dc_relevant_for}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.profiles.map((p) => {
                          const cfg = profileCfg[p];
                          const PIcon = cfg.icon;
                          return (
                            <span key={p} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-muted/50 text-muted-foreground">
                              <PIcon size={10} />
                              {cfg.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-wine/70 group-hover:text-wine transition-colors">
                      {t.dc_enter} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Contextual insights preview */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                {t.dc_hub_insights_title}
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                {t.dc_hub_insights_subtitle}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["margen-bajo", "stock-muerto", "copa-poco-rentable", "baja-rotacion"] as const).map((key, i) => (
              <ScrollReveal key={key} delay={i * 0.06}>
                <InsightCard insight={insightLibrary[key]} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Contextual note */}
        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card/50 p-8 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
                {t.dc_hub_note}
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DecisionCenter;
