import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DollarSign, Package, ShoppingCart, BarChart3, Wine, Building2,
  ArrowRight, Lock, Shield, Sparkles, Briefcase, Store, Users, BookOpen
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
  {
    id: "cursos",
    name: t.locale === "es_ES" ? "Formación y Academia" : t.locale === "en_GB" ? "Training & Academy" : t.locale === "it_IT" ? "Formazione e Accademia" : "Formation et Académie",
    tagline: t.locale === "es_ES" ? "Desarrolla el conocimiento de tu equipo" : t.locale === "en_GB" ? "Develop your team's knowledge" : t.locale === "it_IT" ? "Sviluppa la conoscenza del tuo team" : "Développez les connaissances de votre équipe",
    description: t.locale === "es_ES" ? "Cursos, webinars y talleres para dominar la gestión de cartas de vinos, mejorar habilidades de sommelier y optimizar decisiones comerciales. Acceso a contenido exclusivo diseñado para cada rol." : t.locale === "en_GB" ? "Courses, webinars and workshops to master wine list management, improve sommelier skills and optimise business decisions. Access to exclusive content designed for each role." : t.locale === "it_IT" ? "Corsi, webinar e workshop per padroneggiare la gestione della carta dei vini, migliorare le competenze del sommelier e ottimizzare le decisioni commerciali. Accesso a contenuti esclusivi progettati per ogni ruolo." : "Cours, webinaires et ateliers pour maîtriser la gestion de la carte des vins, améliorer les compétences du sommelier et optimiser les décisions commerciales. Accès au contenu exclusif conçu pour chaque rôle.",
    profiles: ["direccion", "sala", "compras-fb", "grupo"],
    icon: BookOpen,
    accent: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    href: "/decision-center/cursos",
  },
];

/* ── Password Gate UI — Mini landing ── */
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

  const lang = t.locale === "es_ES" ? "es" : t.locale === "en_GB" ? "en" : t.locale === "it_IT" ? "it" : "fr";

  const copy = {
    es: {
      title: "Zona cliente Winerim",
      subtitle: "Accede al entorno privado donde tus datos, insights y recomendaciones se convierten en decisiones más claras.",
      cards: [
        { emoji: "🧠", title: "Decision Center", desc: "Una capa para entender mejor lo que Winerim detecta en tu carta y saber qué hacer ahora." },
        { emoji: "📊", title: "Lectura contextual de tus insights", desc: "No solo ves métricas: entiendes por qué importan, qué prioridad tienen y qué impacto pueden tener." },
        { emoji: "🎯", title: "Prioridad y acción", desc: "Accede a recomendaciones, siguientes pasos y seguimiento para avanzar con más criterio." },
        { emoji: "🔒", title: "Entorno privado para sacar más valor", desc: "Un espacio pensado para clientes y equipos autorizados, conectado a su caso real." },
      ],
      not_title: "Qué no es esta zona",
      not_desc: "No es una biblioteca pública ni una simple recopilación de recursos. Es un entorno privado pensado para ayudarte a interpretar mejor tu realidad dentro de Winerim.",
      for_title: "Para quién es",
      for_desc: "Esta zona está pensada para clientes de Winerim y equipos autorizados.",
      no_client: "¿Aún no eres cliente?",
      request_demo: "Solicitar demo",
    },
    en: {
      title: "Winerim Client Area",
      subtitle: "Access the private environment where your data, insights and recommendations become clearer decisions.",
      cards: [
        { emoji: "🧠", title: "Decision Center", desc: "A layer to better understand what Winerim detects in your wine list and know what to do now." },
        { emoji: "📊", title: "Contextual reading of your insights", desc: "You don't just see metrics: you understand why they matter, their priority and potential impact." },
        { emoji: "🎯", title: "Priority and action", desc: "Access recommendations, next steps and follow-up to move forward with more confidence." },
        { emoji: "🔒", title: "Private environment for more value", desc: "A space designed for clients and authorised teams, connected to their real case." },
      ],
      not_title: "What this area is not",
      not_desc: "It's not a public library or a simple collection of resources. It's a private environment designed to help you better interpret your reality within Winerim.",
      for_title: "Who it's for",
      for_desc: "This area is designed for Winerim clients and authorised teams.",
      no_client: "Not a client yet?",
      request_demo: "Request demo",
    },
    it: {
      title: "Area clienti Winerim",
      subtitle: "Accedi all'ambiente privato dove i tuoi dati, insight e raccomandazioni si trasformano in decisioni più chiare.",
      cards: [
        { emoji: "🧠", title: "Decision Center", desc: "Un livello per capire meglio cosa Winerim rileva nella tua carta e sapere cosa fare ora." },
        { emoji: "📊", title: "Lettura contestuale dei tuoi insight", desc: "Non vedi solo metriche: capisci perché sono importanti, la loro priorità e il potenziale impatto." },
        { emoji: "🎯", title: "Priorità e azione", desc: "Accedi a raccomandazioni, prossimi passi e follow-up per avanzare con più criterio." },
        { emoji: "🔒", title: "Ambiente privato per più valore", desc: "Uno spazio pensato per clienti e team autorizzati, connesso al loro caso reale." },
      ],
      not_title: "Cosa non è questa zona",
      not_desc: "Non è una biblioteca pubblica né una semplice raccolta di risorse. È un ambiente privato pensato per aiutarti a interpretare meglio la tua realtà dentro Winerim.",
      for_title: "Per chi è",
      for_desc: "Questa zona è pensata per i clienti Winerim e i team autorizzati.",
      no_client: "Non sei ancora cliente?",
      request_demo: "Richiedi demo",
    },
    fr: {
      title: "Espace client Winerim",
      subtitle: "Accédez à l'environnement privé où vos données, insights et recommandations se transforment en décisions plus claires.",
      cards: [
        { emoji: "🧠", title: "Decision Center", desc: "Une couche pour mieux comprendre ce que Winerim détecte dans votre carte et savoir quoi faire maintenant." },
        { emoji: "📊", title: "Lecture contextuelle de vos insights", desc: "Vous ne voyez pas que des métriques : vous comprenez pourquoi elles comptent, leur priorité et leur impact potentiel." },
        { emoji: "🎯", title: "Priorité et action", desc: "Accédez aux recommandations, prochaines étapes et suivi pour avancer avec plus de discernement." },
        { emoji: "🔒", title: "Environnement privé pour plus de valeur", desc: "Un espace conçu pour les clients et équipes autorisées, connecté à leur cas réel." },
      ],
      not_title: "Ce que cette zone n'est pas",
      not_desc: "Ce n'est ni une bibliothèque publique ni une simple collection de ressources. C'est un environnement privé conçu pour mieux interpréter votre réalité au sein de Winerim.",
      for_title: "Pour qui",
      for_desc: "Cette zone est conçue pour les clients Winerim et les équipes autorisées.",
      no_client: "Pas encore client ?",
      request_demo: "Demander une démo",
    },
  };

  const c = copy[lang] || copy.es;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-32 pb-20">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-wine/4 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12">
          {/* ── Hero split: pitch left + access right ── */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start mb-16 lg:mb-20">
            {/* Left column — Value pitch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-5">
                <Shield size={14} className="text-wine" />
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-wine">
                  {c.for_desc.split(" ").slice(0, 3).join(" ")}
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-4 text-foreground leading-tight">
                {c.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
                {c.subtitle}
              </p>

              {/* Inline feature highlights */}
              <div className="space-y-3">
                {c.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-lg mt-0.5 shrink-0">{card.emoji}</span>
                    <div>
                      <span className="text-sm font-semibold text-foreground">{card.title}</span>
                      <span className="text-sm text-muted-foreground"> — {card.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column — Access form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-7 md:p-8 shadow-xl shadow-black/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                    <Lock size={20} className="text-wine" />
                  </div>
                  <div>
                    <h2 className="font-heading text-base font-bold text-foreground">
                      {lang === "es" ? "Accede a tu zona" : lang === "en" ? "Access your area" : lang === "it" ? "Accedi alla tua zona" : "Accédez à votre espace"}
                    </h2>
                    <p className="text-[11px] text-muted-foreground/60">
                      {lang === "es" ? "Solo para clientes y equipos autorizados" : lang === "en" ? "For clients and authorised teams only" : lang === "it" ? "Solo per clienti e team autorizzati" : "Pour clients et équipes autorisées uniquement"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={t.dc_gate_placeholder}
                      className={`w-full px-4 py-3.5 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 transition-all ${
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

                <p className="text-center text-[11px] text-muted-foreground/50 mt-4">
                  {c.no_client}{" "}
                  <Link to="/demo" className="text-wine hover:text-wine-light transition-colors font-medium">
                    {c.request_demo}
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom context blocks ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
              <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">{c.not_title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.not_desc}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
              <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-2">{c.for_title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.for_desc}</p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* ── Hub page ── */
const DecisionCenter = () => {
  const { granted, unlock } = useGate();
  const { t, allLangPaths } = useLanguage();
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
        hreflang={allLangPaths("/decision-center")}
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

        {/* Welcome / Onboarding */}
        <DCWelcome
          firstAreaHref={areas[0]?.href || "/decision-center/margenes-pricing"}
          t={{
            welcome_title: t.dcw_title,
            welcome_subtitle: t.dcw_subtitle,
            welcome_what_is_title: t.dcw_what_is_title,
            welcome_what_is_desc: t.dcw_what_is_desc,
            welcome_how_title: t.dcw_how_title,
            welcome_how_desc: t.dcw_how_desc,
            welcome_topics_title: t.dcw_topics_title,
            welcome_topics_desc: t.dcw_topics_desc,
            welcome_usage_title: t.dcw_usage_title,
            welcome_usage_desc: t.dcw_usage_desc,
            pillar_meaning_title: t.dcw_pillar_meaning_title,
            pillar_meaning_desc: t.dcw_pillar_meaning_desc,
            pillar_impact_title: t.dcw_pillar_impact_title,
            pillar_impact_desc: t.dcw_pillar_impact_desc,
            pillar_action_title: t.dcw_pillar_action_title,
            pillar_action_desc: t.dcw_pillar_action_desc,
            pillar_next_title: t.dcw_pillar_next_title,
            pillar_next_desc: t.dcw_pillar_next_desc,
            howto_title: t.dcw_howto_title,
            howto_step1: t.dcw_howto_step1,
            howto_step1_desc: t.dcw_howto_step1_desc,
            howto_step2: t.dcw_howto_step2,
            howto_step2_desc: t.dcw_howto_step2_desc,
            howto_step3: t.dcw_howto_step3,
            howto_step3_desc: t.dcw_howto_step3_desc,
            howto_step4: t.dcw_howto_step4,
            howto_step4_desc: t.dcw_howto_step4_desc,
            cta_primary: t.dcw_cta_primary,
            cta_secondary: t.dcw_cta_secondary,
          }}
        />

        {/* Area cards grid */}
        <section id="areas" className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
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
