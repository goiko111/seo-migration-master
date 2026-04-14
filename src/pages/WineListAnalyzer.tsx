import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Upload, FileText, Link2, BarChart3,
  Layers, TrendingUp, Lightbulb, CheckCircle, AlertTriangle,
  Loader2, GlassWater, Send, X
} from "lucide-react";
import ToolStrategicBlock from "@/components/tools/ToolStrategicBlock";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

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
  email: z.string().trim().email().max(255),
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

/* ───── i18n ───── */
const i18n: Record<SupportedLang, {
  seo_title: string; seo_desc: string;
  jsonld_name: string; jsonld_desc: string;
  bc_tools: string; bc_page: string;
  badge: string; h1_1: string; h1_hl: string; subtitle: string; btn_upload: string;
  h2_how: string; h2_how_sub: string;
  mode_file: string; mode_file_desc: string; mode_paste: string; mode_paste_desc: string; mode_url: string; mode_url_desc: string;
  paste_placeholder: string; url_placeholder: string;
  chars_extracted: string;
  btn_analyze: string; btn_analyzing: string;
  btn_another: string;
  score_label: string; refs_analyzed: string;
  lbl_recommendations: string;
  lbl_duplicates: string; lbl_price_gaps: string; lbl_glass_potential: string;
  report_badge: string; report_title_1: string; report_title_hl: string; report_desc: string;
  report_sent: string; btn_send_report: string;
  ph_email: string; ph_restaurant: string; ph_city: string;
  static_badge: string; static_title_1: string; static_title_hl: string;
  static_cards: { icon: typeof Layers; title: string; desc: string }[];
  links: { to: string; label: string; type: "guide" | "resource" | "solution" }[];
  toast_error_empty: string; toast_error_analyze: string; toast_error_send: string; toast_email_invalid: string; toast_success: string;
  toast_file_error: string;
  decides: string[]; avoids: string[]; impact: string[];
}> = {
  es: {
    seo_title: "Wine List Analyzer – Analiza tu carta de vinos | Winerim",
    seo_desc: "Herramienta gratuita para analizar tu carta de vinos. Detecta oportunidades de mejora en estructura, precios, variedad y obtén un score de 0 a 100.",
    jsonld_name: "Wine List Analyzer", jsonld_desc: "Analiza tu carta de vinos y descubre oportunidades de mejora en estructura, precios y variedad.",
    bc_tools: "Herramientas", bc_page: "Wine List Analyzer",
    badge: "Herramienta gratuita",
    h1_1: "Analiza tu carta de vinos en ", h1_hl: "segundos",
    subtitle: "Descubre cómo mejorar la estructura de tu carta, optimizar precios y aumentar las ventas de vino.",
    btn_upload: "Subir carta de vinos",
    h2_how: "¿Cómo quieres compartir tu carta?", h2_how_sub: "Elige un método para subir o introducir tu carta de vinos",
    mode_file: "Subir archivo", mode_file_desc: "PDF, Excel, CSV o TXT",
    mode_paste: "Pegar texto", mode_paste_desc: "Copiar y pegar tu carta",
    mode_url: "Pegar enlace", mode_url_desc: "URL de tu carta online",
    paste_placeholder: "Pega aquí tu carta de vinos: nombres, regiones, precios, categorías...",
    url_placeholder: "https://turestaurante.com/carta-de-vinos",
    chars_extracted: "caracteres extraídos",
    btn_analyze: "Analizar carta", btn_analyzing: "Analizando carta...",
    btn_another: "← Analizar otra carta",
    score_label: "Score de tu carta", refs_analyzed: "referencias analizadas",
    lbl_recommendations: "Recomendaciones",
    lbl_duplicates: "Duplicados en estilo", lbl_price_gaps: "Huecos de precio", lbl_glass_potential: "Potencial por copa",
    report_badge: "Informe completo",
    report_title_1: "Recibe el informe completo por ", report_title_hl: "email",
    report_desc: "Nuestro equipo de sommeliers revisará tu carta y te enviará un informe detallado con recomendaciones personalizadas.",
    report_sent: "¡Solicitud enviada! Te contactaremos pronto.",
    btn_send_report: "Recibir informe completo",
    ph_email: "tu@email.com *", ph_restaurant: "Restaurante", ph_city: "Ciudad",
    static_badge: "¿Qué analizamos?",
    static_title_1: "Un diagnóstico completo de tu ", static_title_hl: "carta de vinos",
    static_cards: [
      { icon: Layers, title: "Estructura", desc: "Organización por categorías, equilibrio entre tipos de vino y secciones." },
      { icon: TrendingUp, title: "Distribución de precios", desc: "Escalera de precios, huecos y concentración por rango." },
      { icon: Wine, title: "Variedad y equilibrio", desc: "Diversidad de regiones, uvas y estilos. Duplicados detectados." },
      { icon: GlassWater, title: "Potencial por copa", desc: "Vinos candidatos a servirse por copa para aumentar ventas." },
      { icon: AlertTriangle, title: "Huecos detectados", desc: "Rangos de precio sin cobertura y categorías ausentes." },
      { icon: Lightbulb, title: "Oportunidades", desc: "Recomendaciones concretas para mejorar ventas y márgenes." },
    ],
    links: [
      { to: "/blog/como-organizar-carta-de-vinos", label: "Cómo organizar una carta de vinos", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", type: "guide" },
      { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta rentable", type: "resource" },
      { to: "/demo", label: "Solicitar demo de Winerim", type: "solution" },
    ],
    toast_error_empty: "Introduce o sube el contenido de tu carta de vinos",
    toast_error_analyze: "Error al analizar la carta. Inténtalo de nuevo.",
    toast_error_send: "Error al enviar. Inténtalo de nuevo.",
    toast_email_invalid: "Email no válido",
    toast_success: "¡Solicitud enviada! Te contactaremos pronto.",
    toast_file_error: "No se pudo leer el archivo. Prueba con formato .txt o .csv",
    decides: ["Si la estructura de la carta facilita o frena la venta", "Qué huecos de precio y estilo existen", "Qué vinos son candidatos a servirse por copa"],
    avoids: ["Mantener una carta desequilibrada sin saberlo", "Duplicar estilos que compiten entre sí", "Perder ventas por falta de cobertura en rangos clave"],
    impact: ["Detectar oportunidades de venta ocultas en la carta", "Reducir referencias sin impacto y liberar espacio", "Mejorar la experiencia del comensal con una carta más clara"],
  },
  en: {
    seo_title: "Wine List Analyzer – Analyse Your Wine List | Winerim",
    seo_desc: "Free tool to analyse your wine list. Detect improvement opportunities in structure, pricing, variety and get a score from 0 to 100.",
    jsonld_name: "Wine List Analyzer", jsonld_desc: "Analyse your wine list and discover improvement opportunities in structure, pricing and variety.",
    bc_tools: "Tools", bc_page: "Wine List Analyzer",
    badge: "Free tool",
    h1_1: "Analyse your wine list in ", h1_hl: "seconds",
    subtitle: "Discover how to improve your list's structure, optimise prices and increase wine sales.",
    btn_upload: "Upload wine list",
    h2_how: "How do you want to share your list?", h2_how_sub: "Choose a method to upload or enter your wine list",
    mode_file: "Upload file", mode_file_desc: "PDF, Excel, CSV or TXT",
    mode_paste: "Paste text", mode_paste_desc: "Copy and paste your list",
    mode_url: "Paste link", mode_url_desc: "URL of your online list",
    paste_placeholder: "Paste your wine list here: names, regions, prices, categories...",
    url_placeholder: "https://yourrestaurant.com/wine-list",
    chars_extracted: "characters extracted",
    btn_analyze: "Analyse list", btn_analyzing: "Analysing list...",
    btn_another: "← Analyse another list",
    score_label: "Your list score", refs_analyzed: "references analysed",
    lbl_recommendations: "Recommendations",
    lbl_duplicates: "Style duplicates", lbl_price_gaps: "Price gaps", lbl_glass_potential: "By-the-glass potential",
    report_badge: "Full report",
    report_title_1: "Get the full report by ", report_title_hl: "email",
    report_desc: "Our sommelier team will review your list and send you a detailed report with personalised recommendations.",
    report_sent: "Request sent! We'll be in touch soon.",
    btn_send_report: "Get full report",
    ph_email: "you@email.com *", ph_restaurant: "Restaurant", ph_city: "City",
    static_badge: "What we analyse",
    static_title_1: "A complete diagnosis of your ", static_title_hl: "wine list",
    static_cards: [
      { icon: Layers, title: "Structure", desc: "Organisation by category, balance between wine types and sections." },
      { icon: TrendingUp, title: "Price distribution", desc: "Price ladder, gaps and concentration by range." },
      { icon: Wine, title: "Variety & balance", desc: "Diversity of regions, grapes and styles. Duplicates detected." },
      { icon: GlassWater, title: "By-the-glass potential", desc: "Wines suitable for by-the-glass to increase sales." },
      { icon: AlertTriangle, title: "Gaps detected", desc: "Uncovered price ranges and missing categories." },
      { icon: Lightbulb, title: "Opportunities", desc: "Concrete recommendations to improve sales and margins." },
    ],
    links: [
      { to: "/blog/como-organizar-carta-de-vinos", label: "How to organise a wine list", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "How to design a profitable wine list", type: "guide" },
      { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Profitable wine list checklist", type: "resource" },
      { to: "/demo", label: "Request a Winerim demo", type: "solution" },
    ],
    toast_error_empty: "Enter or upload your wine list content",
    toast_error_analyze: "Error analysing the list. Please try again.",
    toast_error_send: "Error sending. Please try again.",
    toast_email_invalid: "Invalid email",
    toast_success: "Request sent! We'll be in touch soon.",
    toast_file_error: "Couldn't read the file. Try .txt or .csv format",
    decides: ["Whether your list structure helps or hinders sales", "What price and style gaps exist", "Which wines are candidates for by-the-glass"],
    avoids: ["Keeping an unbalanced list without knowing it", "Duplicating competing styles", "Losing sales due to uncovered price ranges"],
    impact: ["Uncover hidden sales opportunities in the list", "Reduce low-impact references and free up space", "Improve the guest experience with a clearer list"],
  },
  it: {
    seo_title: "Wine List Analyzer – Analizza la tua carta vini | Winerim",
    seo_desc: "Strumento gratuito per analizzare la carta vini. Individua opportunità di miglioramento in struttura, prezzi e varietà con un punteggio da 0 a 100.",
    jsonld_name: "Wine List Analyzer", jsonld_desc: "Analizza la carta vini e scopri opportunità di miglioramento in struttura, prezzi e varietà.",
    bc_tools: "Strumenti", bc_page: "Wine List Analyzer",
    badge: "Strumento gratuito",
    h1_1: "Analizza la tua carta vini in ", h1_hl: "secondi",
    subtitle: "Scopri come migliorare la struttura della carta, ottimizzare i prezzi e aumentare le vendite di vino.",
    btn_upload: "Carica carta vini",
    h2_how: "Come vuoi condividere la tua carta?", h2_how_sub: "Scegli un metodo per caricare o inserire la carta vini",
    mode_file: "Carica file", mode_file_desc: "PDF, Excel, CSV o TXT",
    mode_paste: "Incolla testo", mode_paste_desc: "Copia e incolla la carta",
    mode_url: "Incolla link", mode_url_desc: "URL della carta online",
    paste_placeholder: "Incolla qui la tua carta vini: nomi, regioni, prezzi, categorie...",
    url_placeholder: "https://tuoristorante.com/carta-vini",
    chars_extracted: "caratteri estratti",
    btn_analyze: "Analizza carta", btn_analyzing: "Analisi in corso...",
    btn_another: "← Analizza un'altra carta",
    score_label: "Punteggio della carta", refs_analyzed: "referenze analizzate",
    lbl_recommendations: "Raccomandazioni",
    lbl_duplicates: "Duplicati di stile", lbl_price_gaps: "Gap di prezzo", lbl_glass_potential: "Potenziale al calice",
    report_badge: "Report completo",
    report_title_1: "Ricevi il report completo via ", report_title_hl: "email",
    report_desc: "Il nostro team di sommelier analizzerà la carta e ti invierà un report dettagliato con raccomandazioni personalizzate.",
    report_sent: "Richiesta inviata! Ti contatteremo presto.",
    btn_send_report: "Ricevi report completo",
    ph_email: "tu@email.com *", ph_restaurant: "Ristorante", ph_city: "Città",
    static_badge: "Cosa analizziamo",
    static_title_1: "Una diagnosi completa della tua ", static_title_hl: "carta vini",
    static_cards: [
      { icon: Layers, title: "Struttura", desc: "Organizzazione per categorie, equilibrio tra tipologie e sezioni." },
      { icon: TrendingUp, title: "Distribuzione prezzi", desc: "Scala prezzi, gap e concentrazione per fascia." },
      { icon: Wine, title: "Varietà ed equilibrio", desc: "Diversità di regioni, vitigni e stili. Duplicati individuati." },
      { icon: GlassWater, title: "Potenziale al calice", desc: "Vini candidati al servizio al calice per aumentare le vendite." },
      { icon: AlertTriangle, title: "Gap individuati", desc: "Fasce di prezzo scoperte e categorie assenti." },
      { icon: Lightbulb, title: "Opportunità", desc: "Raccomandazioni concrete per migliorare vendite e margini." },
    ],
    links: [
      { to: "/blog/como-organizar-carta-de-vinos", label: "Come organizzare una carta vini", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Come progettare una carta redditizia", type: "guide" },
      { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carta redditizia", type: "resource" },
      { to: "/demo", label: "Richiedi una demo di Winerim", type: "solution" },
    ],
    toast_error_empty: "Inserisci o carica il contenuto della carta vini",
    toast_error_analyze: "Errore nell'analisi. Riprova.",
    toast_error_send: "Errore nell'invio. Riprova.",
    toast_email_invalid: "Email non valida",
    toast_success: "Richiesta inviata! Ti contatteremo presto.",
    toast_file_error: "Impossibile leggere il file. Prova con formato .txt o .csv",
    decides: ["Se la struttura della carta facilita o frena la vendita", "Quali gap di prezzo e stile esistono", "Quali vini sono candidati al servizio al calice"],
    avoids: ["Mantenere una carta squilibrata senza saperlo", "Duplicare stili che competono tra loro", "Perdere vendite per mancata copertura in fasce chiave"],
    impact: ["Scoprire opportunità di vendita nascoste nella carta", "Ridurre referenze senza impatto e liberare spazio", "Migliorare l'esperienza del cliente con una carta più chiara"],
  },
  fr: {
    seo_title: "Wine List Analyzer – Analysez votre carte des vins | Winerim",
    seo_desc: "Outil gratuit pour analyser votre carte des vins. Détectez les opportunités d'amélioration en structure, prix et variété avec un score de 0 à 100.",
    jsonld_name: "Wine List Analyzer", jsonld_desc: "Analysez votre carte des vins et découvrez les opportunités d'amélioration en structure, prix et variété.",
    bc_tools: "Outils", bc_page: "Wine List Analyzer",
    badge: "Outil gratuit",
    h1_1: "Analysez votre carte des vins en ", h1_hl: "secondes",
    subtitle: "Découvrez comment améliorer la structure de votre carte, optimiser les prix et augmenter les ventes de vin.",
    btn_upload: "Télécharger la carte",
    h2_how: "Comment souhaitez-vous partager votre carte ?", h2_how_sub: "Choisissez une méthode pour télécharger ou saisir votre carte",
    mode_file: "Télécharger un fichier", mode_file_desc: "PDF, Excel, CSV ou TXT",
    mode_paste: "Coller du texte", mode_paste_desc: "Copier-coller votre carte",
    mode_url: "Coller un lien", mode_url_desc: "URL de votre carte en ligne",
    paste_placeholder: "Collez ici votre carte des vins : noms, régions, prix, catégories...",
    url_placeholder: "https://votrerestaurant.com/carte-des-vins",
    chars_extracted: "caractères extraits",
    btn_analyze: "Analyser la carte", btn_analyzing: "Analyse en cours...",
    btn_another: "← Analyser une autre carte",
    score_label: "Score de votre carte", refs_analyzed: "références analysées",
    lbl_recommendations: "Recommandations",
    lbl_duplicates: "Doublons de style", lbl_price_gaps: "Trous de prix", lbl_glass_potential: "Potentiel au verre",
    report_badge: "Rapport complet",
    report_title_1: "Recevez le rapport complet par ", report_title_hl: "email",
    report_desc: "Notre équipe de sommeliers examinera votre carte et vous enverra un rapport détaillé avec des recommandations personnalisées.",
    report_sent: "Demande envoyée ! Nous vous contacterons bientôt.",
    btn_send_report: "Recevoir le rapport complet",
    ph_email: "vous@email.com *", ph_restaurant: "Restaurant", ph_city: "Ville",
    static_badge: "Ce que nous analysons",
    static_title_1: "Un diagnostic complet de votre ", static_title_hl: "carte des vins",
    static_cards: [
      { icon: Layers, title: "Structure", desc: "Organisation par catégories, équilibre entre types de vin et sections." },
      { icon: TrendingUp, title: "Distribution des prix", desc: "Échelle de prix, trous et concentration par gamme." },
      { icon: Wine, title: "Variété et équilibre", desc: "Diversité des régions, cépages et styles. Doublons détectés." },
      { icon: GlassWater, title: "Potentiel au verre", desc: "Vins candidats au service au verre pour augmenter les ventes." },
      { icon: AlertTriangle, title: "Trous détectés", desc: "Gammes de prix non couvertes et catégories absentes." },
      { icon: Lightbulb, title: "Opportunités", desc: "Recommandations concrètes pour améliorer ventes et marges." },
    ],
    links: [
      { to: "/blog/como-organizar-carta-de-vinos", label: "Comment organiser une carte des vins", type: "guide" },
      { to: "/blog/como-disenar-carta-vinos-rentable", label: "Comment concevoir une carte rentable", type: "guide" },
      { to: "/recursos/checklist-carta-de-vinos-rentable", label: "Checklist carte rentable", type: "resource" },
      { to: "/demo", label: "Demander une démo Winerim", type: "solution" },
    ],
    toast_error_empty: "Saisissez ou téléchargez le contenu de votre carte des vins",
    toast_error_analyze: "Erreur lors de l'analyse. Veuillez réessayer.",
    toast_error_send: "Erreur lors de l'envoi. Veuillez réessayer.",
    toast_email_invalid: "Email invalide",
    toast_success: "Demande envoyée ! Nous vous contacterons bientôt.",
    toast_file_error: "Impossible de lire le fichier. Essayez le format .txt ou .csv",
    decides: ["Si la structure de la carte facilite ou freine la vente", "Quels trous de prix et de style existent", "Quels vins sont candidats au service au verre"],
    avoids: ["Garder une carte déséquilibrée sans le savoir", "Dupliquer des styles qui se font concurrence", "Perdre des ventes par manque de couverture sur les gammes clés"],
    impact: ["Révéler des opportunités de vente cachées dans la carte", "Réduire les références sans impact et libérer de l'espace", "Améliorer l'expérience client avec une carte plus claire"],
  },
};

/* ───── component ───── */
const WineListAnalyzer = () => {
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

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
      name: t.jsonld_name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.jsonld_desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("wla-jsonld")?.remove(); };
  }, [t]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    if (file.type === "text/plain" || file.name.endsWith(".csv") || file.name.endsWith(".txt")) {
      const text = await file.text();
      setWineText(text);
    } else {
      try {
        const text = await file.text();
        setWineText(text);
      } catch {
        toast.error(t.toast_file_error);
      }
    }
  }, [t]);

  const handleAnalyze = async () => {
    const textToAnalyze = inputMode === "url"
      ? `URL de carta de vinos: ${urlValue}\n\nPor favor analiza esta carta basándote en la URL proporcionada.`
      : wineText;

    if (!textToAnalyze || textToAnalyze.trim().length < 10) {
      toast.error(t.toast_error_empty);
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
      toast.error(t.toast_error_analyze);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSendReport = async () => {
    const validation = emailSchema.safeParse({
      email: reportEmail,
      restaurant: reportRestaurant || undefined,
      city: reportCity || undefined,
    });
    if (!validation.success) {
      toast.error(t.toast_email_invalid);
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
      toast.success(t.toast_success);
    } catch {
      toast.error(t.toast_error_send);
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
      <SEOHead title={t.seo_title} description={t.seo_desc} url="https://winerim.wine/wine-list-analyzer"
        hreflang={allLangPaths("/wine-list-analyzer")} />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.bc_tools, href: localePath("/herramientas") }, { label: t.bc_page }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badge}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.h1_1}<span className="text-gradient-wine italic">{t.h1_hl}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            {t.subtitle}
          </motion.p>
          {!result && (
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              onClick={() => document.getElementById("input-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
            >
              <Upload size={16} /> {t.btn_upload}
            </motion.button>
          )}
        </div>
      </section>

      <ToolStrategicBlock layer="core" decides={t.decides} avoids={t.avoids} impact={t.impact} />

      {/* INPUT SECTION */}
      <AnimatePresence mode="wait">
        {!result && (
          <motion.section id="input-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="section-padding">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal className="text-center mb-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.h2_how}</h2>
                <p className="text-muted-foreground">{t.h2_how_sub}</p>
              </ScrollReveal>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { mode: "file" as const, icon: Upload, label: t.mode_file, desc: t.mode_file_desc },
                  { mode: "file" as const, icon: FileText, label: t.mode_paste, desc: t.mode_paste_desc },
                  { mode: "url" as const, icon: Link2, label: t.mode_url, desc: t.mode_url_desc },
                ].map((opt, i) => {
                  const Icon = opt.icon;
                  const isActive = (i === 0 && inputMode === "file" && fileName) ||
                    (i === 1 && inputMode === "file" && !fileName && wineText) ||
                    (i === 2 && inputMode === "url");
                  return (
                    <button key={i} onClick={() => {
                      if (i === 0) { setInputMode("file"); fileInputRef.current?.click(); }
                      else if (i === 1) { setInputMode("file"); setFileName(""); }
                      else { setInputMode("url"); }
                    }} className={`p-5 rounded-xl border transition-all text-left ${isActive ? "border-wine bg-wine/5" : "border-border bg-gradient-card hover:border-wine/40"}`}>
                      <Icon size={20} className="text-wine mb-2" />
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>

              <input ref={fileInputRef} type="file" accept=".pdf,.xlsx,.xls,.csv,.txt" className="hidden" onChange={handleFileChange} />

              {inputMode === "file" && fileName && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-card rounded-xl border border-wine/30 p-5 mb-6 flex items-center gap-3">
                  <FileText size={20} className="text-wine" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{fileName}</p>
                    <p className="text-xs text-muted-foreground">{wineText.length} {t.chars_extracted}</p>
                  </div>
                  <button onClick={() => { setFileName(""); setWineText(""); }} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
                </motion.div>
              )}

              {inputMode === "file" && !fileName && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <textarea value={wineText} onChange={(e) => setWineText(e.target.value)} placeholder={t.paste_placeholder}
                    rows={10} maxLength={15000}
                    className="w-full bg-gradient-card border border-border rounded-xl p-5 text-sm placeholder:text-muted-foreground/50 focus:border-wine focus:outline-none resize-none mb-2" />
                  <p className="text-xs text-muted-foreground text-right">{wineText.length} / 15.000</p>
                </motion.div>
              )}

              {inputMode === "url" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <input type="url" value={urlValue} onChange={(e) => setUrlValue(e.target.value)} placeholder={t.url_placeholder}
                    maxLength={500} className="w-full bg-gradient-card border border-border rounded-xl p-5 text-sm placeholder:text-muted-foreground/50 focus:border-wine focus:outline-none mb-2" />
                </motion.div>
              )}

              {inputMode && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                  <button onClick={handleAnalyze} disabled={analyzing}
                    className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                    {analyzing ? (<><Loader2 size={16} className="animate-spin" />{t.btn_analyzing}</>) : (<><BarChart3 size={16} />{t.btn_analyze}</>)}
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
          <motion.div ref={resultsRef} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <section className="section-padding">
              <div className="max-w-4xl mx-auto text-center">
                <button onClick={resetAnalysis} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 transition-colors">
                  {t.btn_another}
                </button>
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${scoreBg(result.score)} mb-6`}>
                  <span className={`font-heading text-5xl font-bold ${scoreColor(result.score)}`}>{result.score}</span>
                </div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">{t.score_label}</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{result.totalReferences} {t.refs_analyzed}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{result.summary}</p>
              </div>
            </section>

            <section className="section-padding bg-gradient-dark">
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(result.sections).map(([key, section], i) => {
                    const Icon = sectionIcons[key] || Layers;
                    return (
                      <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-gradient-card rounded-xl border border-border p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Icon size={18} className="text-wine" />
                            <h3 className="font-heading font-semibold">{section.label}</h3>
                          </div>
                          <span className={`font-heading text-2xl font-bold ${scoreColor(section.score)}`}>{section.score}</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2 mb-5">
                          <div className={`h-2 rounded-full transition-all duration-1000 ${section.score >= 75 ? "bg-emerald-500" : section.score >= 50 ? "bg-amber-500" : "bg-destructive"}`}
                            style={{ width: `${section.score}%` }} />
                        </div>
                        <div className="space-y-2 mb-4">
                          {section.findings.slice(0, 3).map((f, fi) => (
                            <div key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle size={12} className="text-wine shrink-0 mt-0.5" />{f}
                            </div>
                          ))}
                        </div>
                        {section.recommendations.length > 0 && (
                          <div className="border-t border-border pt-3 space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-wine">{t.lbl_recommendations}</p>
                            {section.recommendations.slice(0, 2).map((r, ri) => (
                              <div key={ri} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />{r}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {result.duplicates.length > 0 && (
                    <div className="bg-gradient-card rounded-xl border border-border p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3 flex items-center gap-2"><AlertTriangle size={14} /> {t.lbl_duplicates}</h4>
                      <ul className="space-y-1.5">{result.duplicates.slice(0, 4).map((d, i) => (<li key={i} className="text-sm text-muted-foreground">• {d}</li>))}</ul>
                    </div>
                  )}
                  {result.priceGaps.length > 0 && (
                    <div className="bg-gradient-card rounded-xl border border-border p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3 flex items-center gap-2"><TrendingUp size={14} /> {t.lbl_price_gaps}</h4>
                      <ul className="space-y-1.5">{result.priceGaps.slice(0, 4).map((g, i) => (<li key={i} className="text-sm text-muted-foreground">• {g}</li>))}</ul>
                    </div>
                  )}
                  {result.byThGlassPotential.length > 0 && (
                    <div className="bg-gradient-card rounded-xl border border-border p-5">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-wine mb-3 flex items-center gap-2"><GlassWater size={14} /> {t.lbl_glass_potential}</h4>
                      <ul className="space-y-1.5">{result.byThGlassPotential.slice(0, 4).map((w, i) => (<li key={i} className="text-sm text-muted-foreground">• {w}</li>))}</ul>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* CTA: Report by email */}
            <section className="section-padding">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                  <div className="relative z-10">
                    <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.report_badge}</p>
                    <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
                      {t.report_title_1}<span className="text-gradient-wine italic">{t.report_title_hl}</span>
                    </h2>
                    <p className="text-muted-foreground mb-8 text-sm">{t.report_desc}</p>

                    {reportSent ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-500 font-semibold">
                        <CheckCircle size={20} /> {t.report_sent}
                      </div>
                    ) : (
                      <div className="space-y-3 max-w-md mx-auto">
                        <input type="email" value={reportEmail} onChange={(e) => setReportEmail(e.target.value)} placeholder={t.ph_email}
                          maxLength={255} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none" />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" value={reportRestaurant} onChange={(e) => setReportRestaurant(e.target.value)} placeholder={t.ph_restaurant}
                            maxLength={255} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none" />
                          <input type="text" value={reportCity} onChange={(e) => setReportCity(e.target.value)} placeholder={t.ph_city}
                            maxLength={255} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:border-wine focus:outline-none" />
                        </div>
                        <button onClick={handleSendReport} disabled={sendingReport}
                          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all disabled:opacity-50">
                          {sendingReport ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                          {t.btn_send_report}
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.static_badge}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                {t.static_title_1}<span className="text-gradient-wine italic">{t.static_title_hl}</span>
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.static_cards.map((item, i) => {
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

      <InternalLinks links={t.links} />
      <Footer />
    </div>
  );
};

export default WineListAnalyzer;
