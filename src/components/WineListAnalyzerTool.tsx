import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2, FileText, Upload, Loader2, CheckCircle2, AlertTriangle,
  Lock, ExternalLink, Sparkles, Search, X, Star, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import usePlacesAutocomplete from "use-places-autocomplete";

/* ─── Config ─── */
const API_BASE = "https://api.winerim.wine";
const GOOGLE_MAPS_API_KEY = "AIzaSyBcqZoVnmhGY12S39puKR248cIACToSZ4A";

type Lang = "es" | "en" | "fr" | "de" | "it" | "pt";
// Short labels for mobile tabs
const TAB_SHORT = { url: "URL", text: "Texto", file: "PDF" } as const;
const TAB_SHORT_EN: Record<Lang, { url: string; text: string; file: string }> = {
  es: { url: "URL", text: "Texto", file: "PDF" },
  en: { url: "URL", text: "Text", file: "PDF" },
  fr: { url: "URL", text: "Texte", file: "PDF" },
  de: { url: "URL", text: "Text", file: "PDF" },
  it: { url: "URL", text: "Testo", file: "PDF" },
  pt: { url: "URL", text: "Texto", file: "PDF" },
};
const URL_NOTE: Record<Lang, string> = {
  es: "Funciona mejor con cartas publicadas en texto. Si tu carta es imagen o PDF, usa las otras opciones.",
  en: "Works best with text-based wine list pages. If your list is an image or PDF, use the other tabs.",
  fr: "Fonctionne mieux avec des cartes publiées en texte. Si votre carte est une image ou un PDF, utilisez les autres onglets.",
  de: "Funktioniert am besten mit Textseiten. Bei Bild- oder PDF-Karten bitte die anderen Tabs nutzen.",
  it: "Funziona meglio con carte pubblicate in testo. Se la tua è immagine o PDF, usa gli altri tab.",
  pt: "Funciona melhor com cartas publicadas em texto. Se for imagem ou PDF, use as outras opções.",
};
const NO_WINES_MSG: Record<Lang, string> = {
  es: "No pudimos identificar vinos en el contenido proporcionado. Intenta con otro formato o revisa que el texto incluya nombres de vinos y precios.",
  en: "We couldn't identify any wines in the content. Try another format or make sure the text includes wine names and prices.",
  fr: "Nous n'avons pas pu identifier de vins dans le contenu. Essayez un autre format ou vérifiez que le texte contient noms de vins et prix.",
  de: "Wir konnten keine Weine im Inhalt erkennen. Versuchen Sie ein anderes Format oder stellen Sie sicher, dass der Text Weinnamen und Preise enthält.",
  it: "Non siamo riusciti a identificare vini nel contenuto. Prova un altro formato o verifica che il testo includa nomi di vini e prezzi.",
  pt: "Não conseguimos identificar vinhos no conteúdo. Tente outro formato ou verifique que o texto inclui nomes de vinhos e preços.",
};

const T_RESTAURANT_LABEL: Record<Lang, string> = {
  es: "Tu restaurante (opcional)",
  en: "Your restaurant (optional)",
  fr: "Votre restaurant (optionnel)",
  de: "Ihr Restaurant (optional)",
  it: "Il tuo ristorante (opzionale)",
  pt: "O seu restaurante (opcional)",
};
const T_RESTAURANT_PLACEHOLDER: Record<Lang, string> = {
  es: "Busca tu restaurante…",
  en: "Search for your restaurant…",
  fr: "Cherchez votre restaurant…",
  de: "Restaurant suchen…",
  it: "Cerca il tuo ristorante…",
  pt: "Procure o seu restaurante…",
};
const T_RESTAURANT_HELP: Record<Lang, string> = {
  es: "Si seleccionas tu restaurante, añadiremos estimaciones de negocio (ticket medio, ingresos vino, botellas/servicio).",
  en: "Selecting your restaurant adds business estimates (average ticket, wine revenue, bottles/service).",
  fr: "Sélectionner votre restaurant ajoute des estimations (ticket moyen, revenus vin, bouteilles/service).",
  de: "Wenn Sie Ihr Restaurant auswählen, ergänzen wir Geschäftsschätzungen (Durchschnittsbon, Weinumsatz, Flaschen/Service).",
  it: "Selezionando il tuo ristorante aggiungeremo stime di business (scontrino medio, ricavi vino, bottiglie/servizio).",
  pt: "Selecionar o seu restaurante adiciona estimativas (ticket médio, receita de vinho, garrafas/serviço).",
};
const T_PENDING_TITLE: Record<Lang, string> = {
  es: "Tu carta es muy completa",
  en: "Your wine list is very extensive",
  fr: "Votre carte est très complète",
  de: "Ihre Karte ist sehr umfangreich",
  it: "La tua carta è molto ampia",
  pt: "A sua carta é muito extensa",
};
const T_PENDING_TEXT: Record<Lang, string> = {
  es: "Nuestro equipo la está analizando manualmente. Te contactaremos en menos de 48h con tu informe personalizado.",
  en: "Our team is analysing it manually. We'll contact you within 48h with your personalised report.",
  fr: "Notre équipe l'analyse manuellement. Nous vous contacterons sous 48h avec votre rapport personnalisé.",
  de: "Unser Team analysiert sie manuell. Wir melden uns innerhalb von 48 Std. mit Ihrem personalisierten Bericht.",
  it: "Il nostro team la sta analizzando manualmente. Ti contatteremo entro 48h con il report personalizzato.",
  pt: "A nossa equipa está a analisá-la manualmente. Contactaremos em menos de 48h com o seu relatório.",
};
const T_KPI: Record<Lang, { ticket: string; ticketWine: string; bottles: string; revenue: string; profile: string; rating: string; reviews: string; type: string; address: string; conf: { high: string; medium: string; low: string } }> = {
  es: { ticket: "Ticket medio", ticketWine: "Ticket vino/comensal", bottles: "Botellas/servicio", revenue: "Ingresos vino/mes", profile: "Perfil de carta", rating: "Valoración Google", reviews: "reseñas", type: "Tipo", address: "Dirección", conf: { high: "Alta confianza", medium: "Confianza media", low: "Baja confianza" } },
  en: { ticket: "Average ticket", ticketWine: "Wine ticket / guest", bottles: "Bottles / service", revenue: "Wine revenue / month", profile: "List profile", rating: "Google rating", reviews: "reviews", type: "Type", address: "Address", conf: { high: "High confidence", medium: "Medium confidence", low: "Low confidence" } },
  fr: { ticket: "Ticket moyen", ticketWine: "Ticket vin / convive", bottles: "Bouteilles / service", revenue: "Revenus vin / mois", profile: "Profil de carte", rating: "Note Google", reviews: "avis", type: "Type", address: "Adresse", conf: { high: "Confiance élevée", medium: "Confiance moyenne", low: "Confiance faible" } },
  de: { ticket: "Ø Bon", ticketWine: "Weinbon / Gast", bottles: "Flaschen / Service", revenue: "Weinumsatz / Monat", profile: "Kartenprofil", rating: "Google-Bewertung", reviews: "Rezensionen", type: "Typ", address: "Adresse", conf: { high: "Hohe Konfidenz", medium: "Mittlere Konfidenz", low: "Niedrige Konfidenz" } },
  it: { ticket: "Scontrino medio", ticketWine: "Vino / coperto", bottles: "Bottiglie / servizio", revenue: "Ricavi vino / mese", profile: "Profilo carta", rating: "Valutazione Google", reviews: "recensioni", type: "Tipo", address: "Indirizzo", conf: { high: "Alta affidabilità", medium: "Media affidabilità", low: "Bassa affidabilità" } },
  pt: { ticket: "Ticket médio", ticketWine: "Vinho / cliente", bottles: "Garrafas / serviço", revenue: "Receita vinho / mês", profile: "Perfil da carta", rating: "Avaliação Google", reviews: "avaliações", type: "Tipo", address: "Morada", conf: { high: "Alta confiança", medium: "Confiança média", low: "Baixa confiança" } },
};

/* ─── Google Maps script loader (singleton) ─── */
let mapsScriptPromise: Promise<void> | null = null;
function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).google?.maps?.places) return Promise.resolve();
  if (mapsScriptPromise) return mapsScriptPromise;
  mapsScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-google-maps="true"]');
    if (existing) { existing.addEventListener("load", () => resolve()); return; }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
    s.async = true; s.defer = true;
    s.dataset.googleMaps = "true";
    s.onload = () => resolve();
    s.onerror = () => { mapsScriptPromise = null; reject(new Error("maps load failed")); };
    document.head.appendChild(s);
  });
  return mapsScriptPromise;
}
function useGoogleMapsScript(): boolean {
  const [ready, setReady] = useState<boolean>(() =>
    typeof window !== "undefined" && !!(window as any).google?.maps?.places
  );
  useEffect(() => {
    if (ready) return;
    let mounted = true;
    loadGoogleMaps().then(() => { if (mounted) setReady(true); }).catch(() => {});
    return () => { mounted = false; };
  }, [ready]);
  return ready;
}

const T: Record<Lang, any> = {
  es: {
    badge: "Análisis gratuito · 30 segundos",
    title: "Analiza tu carta de vinos",
    subtitle: "Sube tu carta o pega el texto y recibe un diagnóstico profesional al instante.",
    country: "País del restaurante",
    tabUrl: "Pegar URL", tabText: "Pegar texto", tabFile: "Subir PDF",
    urlPh: "https://restaurante.com/carta-de-vinos",
    textPh: "Ejemplo:\n\nTINTOS\nRibera del Duero Reserva 2019 — 45€\nRioja Crianza 2021 — 28€\nTempranillo Joven — 18€\n\nBLANCOS\nAlbariño Rías Baixas 2023 — 22€\nVerdejo Rueda — 16€\n\nCOPAS\nRioja Crianza — 6€\nAlbariño — 7€",
    fileLabel: "Selecciona PDF, JPG o PNG",
    fileHint: "Máx. 10 MB",
    cta: "Analizar mi carta",
    analyzing: "Analizando…",
    countries: { ES: "España", US: "Estados Unidos", UK: "Reino Unido", FR: "Francia", MX: "México", IT: "Italia", DE: "Alemania", CH: "Suiza", AR: "Argentina", CL: "Chile", CO: "Colombia", BR: "Brasil", PT: "Portugal", NL: "Países Bajos", BE: "Bélgica", AT: "Austria" },
    steps: ["Extrayendo vinos de la carta", "Analizando precios y markups", "Evaluando diversidad y balance", "Detectando oportunidades", "Generando diagnóstico"],
    semaphoreTitle: "Semáforo de tu carta",
    problemsTitle: "Top problemas detectados",
    lockedTitle: "Desbloquea el informe completo",
    lockedSub: "Recibe el análisis detallado con recomendaciones, mapa por regiones, comparativa de mercado y vinos sugeridos.",
    formRestaurant: "Nombre del restaurante",
    formName: "Tu nombre",
    formEmail: "Email profesional",
    formPhone: "Teléfono (opcional)",
    formConsent: "Acepto recibir el informe por email y la política de privacidad.",
    unlock: "Desbloquear informe completo",
    unlocking: "Generando…",
    successTitle: "¡Informe generado!",
    successText: "Te lo hemos enviado por email. También puedes abrirlo aquí:",
    openReport: "Abrir informe completo",
    errMin: "Pega al menos 50 caracteres de tu carta.",
    errEmail: "Introduce un email válido.",
    errGeneric: "No pudimos analizar la carta. Revisa la URL o prueba pegando el texto.",
    errSlow: "Está tardando más de lo habitual…",
    of: "de",
    score: "Puntuación de tu carta",
    references: "referencias",
    byGlass: "por copa",
    priceRange: "Rango de precios",
    detected: "Detectado",
  },
  en: {
    badge: "Free analysis · 30 seconds",
    title: "Analyse your wine list",
    subtitle: "Upload your wine list or paste the text and get a professional diagnosis instantly.",
    country: "Restaurant country",
    tabUrl: "Paste URL", tabText: "Paste text", tabFile: "Upload PDF",
    urlPh: "https://restaurant.com/wine-list",
    textPh: "Example:\n\nREDS\nRibera del Duero Reserva 2019 — €45\nRioja Crianza 2021 — €28\nTempranillo Joven — €18\n\nWHITES\nAlbariño Rías Baixas 2023 — €22\nVerdejo Rueda — €16\n\nBY THE GLASS\nRioja Crianza — €6\nAlbariño — €7",
    fileLabel: "Select PDF, JPG or PNG",
    fileHint: "Max 10 MB",
    cta: "Analyse my list",
    analyzing: "Analysing…",
    countries: { ES: "Spain", US: "United States", UK: "United Kingdom", FR: "France", MX: "Mexico", IT: "Italy", DE: "Germany", CH: "Switzerland", AR: "Argentina", CL: "Chile", CO: "Colombia", BR: "Brazil", PT: "Portugal", NL: "Netherlands", BE: "Belgium", AT: "Austria" },
    steps: ["Extracting wines from the list", "Analysing prices and markups", "Evaluating diversity and balance", "Spotting opportunities", "Generating diagnosis"],
    semaphoreTitle: "Your list at a glance",
    problemsTitle: "Top problems detected",
    lockedTitle: "Unlock the full report",
    lockedSub: "Get the detailed analysis with recommendations, region map, market benchmark and suggested wines.",
    formRestaurant: "Restaurant name",
    formName: "Your name",
    formEmail: "Work email",
    formPhone: "Phone (optional)",
    formConsent: "I accept to receive the report by email and the privacy policy.",
    unlock: "Unlock full report",
    unlocking: "Generating…",
    successTitle: "Report ready!",
    successText: "We've sent it to your email. You can also open it here:",
    openReport: "Open full report",
    errMin: "Paste at least 50 characters of your list.",
    errEmail: "Enter a valid email.",
    errGeneric: "We couldn't analyse the list. Check the URL or try pasting the text.",
    errSlow: "Taking longer than usual…",
    of: "of",
    score: "Your list score",
    references: "references",
    byGlass: "by the glass",
    priceRange: "Price range",
    detected: "Detected",
  },
  fr: {
    badge: "Analyse gratuite · 30 secondes",
    title: "Analysez votre carte des vins",
    subtitle: "Téléchargez votre carte ou collez le texte et obtenez un diagnostic professionnel instantanément.",
    country: "Pays du restaurant",
    tabUrl: "Coller l'URL", tabText: "Coller le texte", tabFile: "Téléverser PDF",
    urlPh: "https://restaurant.com/carte-des-vins",
    textPh: "Collez votre carte ici…\n\nROUGES\nRibera del Duero Reserva 2019 — 45€",
    fileLabel: "Sélectionnez PDF, JPG ou PNG",
    fileHint: "Max 10 Mo",
    cta: "Analyser ma carte",
    analyzing: "Analyse en cours…",
    countries: { ES: "Espagne", US: "États-Unis", UK: "Royaume-Uni", FR: "France", MX: "Mexique", IT: "Italie", DE: "Allemagne", CH: "Suisse", AR: "Argentine", CL: "Chili", CO: "Colombie", BR: "Brésil", PT: "Portugal", NL: "Pays-Bas", BE: "Belgique", AT: "Autriche" },
    steps: ["Extraction des vins", "Analyse des prix et marges", "Évaluation de la diversité", "Détection des opportunités", "Génération du diagnostic"],
    semaphoreTitle: "Aperçu de votre carte",
    problemsTitle: "Principaux problèmes détectés",
    lockedTitle: "Débloquez le rapport complet",
    lockedSub: "Recevez l'analyse détaillée avec recommandations, carte des régions, comparatif de marché et vins suggérés.",
    formRestaurant: "Nom du restaurant",
    formName: "Votre nom",
    formEmail: "Email professionnel",
    formPhone: "Téléphone (optionnel)",
    formConsent: "J'accepte de recevoir le rapport par email et la politique de confidentialité.",
    unlock: "Débloquer le rapport complet",
    unlocking: "Génération…",
    successTitle: "Rapport prêt !",
    successText: "Nous vous l'avons envoyé par email. Vous pouvez aussi l'ouvrir ici :",
    openReport: "Ouvrir le rapport complet",
    errMin: "Collez au moins 50 caractères de votre carte.",
    errEmail: "Saisissez un email valide.",
    errGeneric: "Impossible d'analyser la carte. Vérifiez l'URL ou essayez de coller le texte.",
    errSlow: "Cela prend plus de temps que d'habitude…",
    of: "de",
    score: "Score de votre carte",
    references: "références",
    byGlass: "au verre",
    priceRange: "Fourchette de prix",
    detected: "Détecté",
  },
  de: {
    badge: "Kostenlose Analyse · 30 Sekunden",
    title: "Analysieren Sie Ihre Weinkarte",
    subtitle: "Laden Sie Ihre Weinkarte hoch oder fügen Sie den Text ein und erhalten Sie sofort eine professionelle Diagnose.",
    country: "Land des Restaurants",
    tabUrl: "URL einfügen", tabText: "Text einfügen", tabFile: "PDF hochladen",
    urlPh: "https://restaurant.com/weinkarte",
    textPh: "Fügen Sie hier Ihre Weinkarte ein…",
    fileLabel: "PDF, JPG oder PNG auswählen",
    fileHint: "Max. 10 MB",
    cta: "Meine Karte analysieren",
    analyzing: "Analyse läuft…",
    countries: { ES: "Spanien", US: "USA", UK: "Vereinigtes Königreich", FR: "Frankreich", MX: "Mexiko", IT: "Italien", DE: "Deutschland", CH: "Schweiz", AR: "Argentinien", CL: "Chile", CO: "Kolumbien", BR: "Brasilien", PT: "Portugal", NL: "Niederlande", BE: "Belgien", AT: "Österreich" },
    steps: ["Weine extrahieren", "Preise und Margen analysieren", "Vielfalt bewerten", "Chancen erkennen", "Diagnose erstellen"],
    semaphoreTitle: "Ihre Karte auf einen Blick",
    problemsTitle: "Erkannte Hauptprobleme",
    lockedTitle: "Vollständigen Bericht freischalten",
    lockedSub: "Erhalten Sie die detaillierte Analyse mit Empfehlungen, Regionskarte, Marktvergleich und vorgeschlagenen Weinen.",
    formRestaurant: "Name des Restaurants",
    formName: "Ihr Name",
    formEmail: "Geschäftliche E-Mail",
    formPhone: "Telefon (optional)",
    formConsent: "Ich akzeptiere, den Bericht per E-Mail zu erhalten und die Datenschutzrichtlinie.",
    unlock: "Bericht freischalten",
    unlocking: "Wird erstellt…",
    successTitle: "Bericht bereit!",
    successText: "Wir haben ihn per E-Mail gesendet. Sie können ihn auch hier öffnen:",
    openReport: "Vollständigen Bericht öffnen",
    errMin: "Fügen Sie mindestens 50 Zeichen ein.",
    errEmail: "Geben Sie eine gültige E-Mail ein.",
    errGeneric: "Karte konnte nicht analysiert werden. Bitte URL prüfen oder Text einfügen.",
    errSlow: "Es dauert länger als gewöhnlich…",
    of: "von",
    score: "Ihre Punktzahl",
    references: "Referenzen",
    byGlass: "im Glas",
    priceRange: "Preisspanne",
    detected: "Erkannt",
  },
  it: {
    badge: "Analisi gratuita · 30 secondi",
    title: "Analizza la tua carta dei vini",
    subtitle: "Carica la tua carta o incolla il testo e ricevi una diagnosi professionale all'istante.",
    country: "Paese del ristorante",
    tabUrl: "Incolla URL", tabText: "Incolla testo", tabFile: "Carica PDF",
    urlPh: "https://ristorante.com/carta-vini",
    textPh: "Incolla qui la tua carta…",
    fileLabel: "Seleziona PDF, JPG o PNG",
    fileHint: "Max 10 MB",
    cta: "Analizza la mia carta",
    analyzing: "Analisi in corso…",
    countries: { ES: "Spagna", US: "Stati Uniti", UK: "Regno Unito", FR: "Francia", MX: "Messico", IT: "Italia", DE: "Germania", CH: "Svizzera", AR: "Argentina", CL: "Cile", CO: "Colombia", BR: "Brasile", PT: "Portogallo", NL: "Paesi Bassi", BE: "Belgio", AT: "Austria" },
    steps: ["Estrazione dei vini", "Analisi prezzi e margini", "Valutazione diversità", "Rilevamento opportunità", "Generazione diagnosi"],
    semaphoreTitle: "La tua carta in sintesi",
    problemsTitle: "Problemi principali rilevati",
    lockedTitle: "Sblocca il report completo",
    lockedSub: "Ricevi l'analisi dettagliata con raccomandazioni, mappa per regioni, confronto di mercato e vini suggeriti.",
    formRestaurant: "Nome del ristorante",
    formName: "Il tuo nome",
    formEmail: "Email professionale",
    formPhone: "Telefono (opzionale)",
    formConsent: "Accetto di ricevere il report via email e la privacy policy.",
    unlock: "Sblocca report completo",
    unlocking: "Generazione…",
    successTitle: "Report pronto!",
    successText: "Te l'abbiamo inviato per email. Puoi anche aprirlo qui:",
    openReport: "Apri report completo",
    errMin: "Incolla almeno 50 caratteri.",
    errEmail: "Inserisci un'email valida.",
    errGeneric: "Non siamo riusciti ad analizzare la carta. Controlla l'URL o prova a incollare il testo.",
    errSlow: "Sta richiedendo più del solito…",
    of: "di",
    score: "Punteggio della carta",
    references: "referenze",
    byGlass: "al calice",
    priceRange: "Fascia di prezzo",
    detected: "Rilevato",
  },
  pt: {
    badge: "Análise gratuita · 30 segundos",
    title: "Analise a sua carta de vinhos",
    subtitle: "Carregue a sua carta ou cole o texto e receba um diagnóstico profissional ao instante.",
    country: "País do restaurante",
    tabUrl: "Colar URL", tabText: "Colar texto", tabFile: "Carregar PDF",
    urlPh: "https://restaurante.com/carta-de-vinhos",
    textPh: "Cole aqui a sua carta…",
    fileLabel: "Selecione PDF, JPG ou PNG",
    fileHint: "Máx. 10 MB",
    cta: "Analisar a minha carta",
    analyzing: "A analisar…",
    countries: { ES: "Espanha", US: "Estados Unidos", UK: "Reino Unido", FR: "França", MX: "México", IT: "Itália", DE: "Alemanha", CH: "Suíça", AR: "Argentina", CL: "Chile", CO: "Colômbia", BR: "Brasil", PT: "Portugal", NL: "Países Baixos", BE: "Bélgica", AT: "Áustria" },
    steps: ["A extrair vinhos", "A analisar preços e margens", "A avaliar diversidade", "A detetar oportunidades", "A gerar diagnóstico"],
    semaphoreTitle: "A sua carta em resumo",
    problemsTitle: "Principais problemas detetados",
    lockedTitle: "Desbloqueie o relatório completo",
    lockedSub: "Receba a análise detalhada com recomendações, mapa por regiões, comparativo de mercado e vinhos sugeridos.",
    formRestaurant: "Nome do restaurante",
    formName: "O seu nome",
    formEmail: "Email profissional",
    formPhone: "Telefone (opcional)",
    formConsent: "Aceito receber o relatório por email e a política de privacidade.",
    unlock: "Desbloquear relatório",
    unlocking: "A gerar…",
    successTitle: "Relatório pronto!",
    successText: "Enviámos para o seu email. Também pode abri-lo aqui:",
    openReport: "Abrir relatório completo",
    errMin: "Cole pelo menos 50 caracteres.",
    errEmail: "Introduza um email válido.",
    errGeneric: "Não conseguimos analisar a carta. Verifique o URL ou tente colar o texto.",
    errSlow: "Está a demorar mais do que o habitual…",
    of: "de",
    score: "Pontuação da sua carta",
    references: "referências",
    byGlass: "a copo",
    priceRange: "Intervalo de preços",
    detected: "Detetado",
  },
};

// Language is taken from the global useLanguage() context; no internal switcher.

/* ─── Types ─── */
type SemaphoreStatus = "red" | "yellow" | "green";
interface SemaphoreItem { area: string; label: string; status: SemaphoreStatus; score: number; summary: string; }
interface Problem { rank: number; title: string; description: string; metric: string; area: string; severity: number; }
interface AnalysisResult {
  success: boolean;
  analysisId: string;
  restaurant: { name: string | null; location: string | null; cuisine_type: string | null };
  summary: { totalWines: number; totalByGlass: number; priceRange: { min: number; max: number; median: number; currency: string }; score: number; scoreLabel: string; scoreColor: string };
  semaphore: SemaphoreItem[];
  topProblems: Problem[];
  fullAnalysis: { locked: boolean; previewSections: string[] };
}

const STATUS_BG: Record<SemaphoreStatus, string> = { red: "border-l-red-500 bg-red-500/5", yellow: "border-l-amber-500 bg-amber-500/5", green: "border-l-emerald-500 bg-emerald-500/5" };
const STATUS_DOT: Record<SemaphoreStatus, string> = { red: "bg-red-500", yellow: "bg-amber-500", green: "bg-emerald-500" };

/* ─── Component ─── */
interface Props { defaultLang?: Lang } // kept for backwards-compat; ignored

export default function WineListAnalyzerTool(_props: Props = {}) {
  const { lang: globalLang } = useLanguage();
  const lang: Lang = (["es","en","fr","de","it","pt"].includes(globalLang as string) ? globalLang : "es") as Lang;
  const t = T[lang];

  const [tab, setTab] = useState<"url" | "text" | "file">("text");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Google Places — restaurant identification (optional)
  const [placeId, setPlaceId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [restaurantAddress, setRestaurantAddress] = useState<string | null>(null);
  const placesReady = useGoogleMapsScript();
  const clearRestaurant = () => {
    setPlaceId(null); setRestaurantName(null); setRestaurantAddress(null);
  };

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [slow, setSlow] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const showInlineError = (message: string) => {
    setErrorMsg(message);
    window.setTimeout(() => {
      document.getElementById("analyzer-inline-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  // Loading step animator
  const stepTimer = useRef<number | null>(null);
  const slowTimer = useRef<number | null>(null);
  useEffect(() => {
    if (loading) {
      setStep(0); setSlow(false);
      stepTimer.current = window.setInterval(() => {
        setStep((s) => (s < t.steps.length - 1 ? s + 1 : s));
      }, 3000);
      slowTimer.current = window.setTimeout(() => setSlow(true), 25000);
    }
    return () => {
      if (stepTimer.current) window.clearInterval(stepTimer.current);
      if (slowTimer.current) window.clearTimeout(slowTimer.current);
    };
  }, [loading, t.steps.length]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Client validation
    if (tab === "text" && text.trim().length < 50) { showInlineError(t.errMin); return; }
    if (tab === "url" && !/^https?:\/\/.+/i.test(url.trim())) { showInlineError(t.errGeneric); return; }
    if (tab === "file" && !file) { showInlineError(t.fileLabel); return; }

    setLoading(true); setResult(null); setErrorMsg(null);
    const controller = new AbortController();
    // Larger lists (100+ wines) can take 60-90s in Claude. Allow 120s.
    const timeout = setTimeout(() => controller.abort(), 120000);

    try {
      let res: Response;
      if (tab === "file" && file) {
        const fd = new FormData();
        fd.append("type", "file");
        fd.append("file", file);
        fd.append("lang", lang);
        if (placeId) fd.append("placeId", placeId);
        if (restaurantName) fd.append("restaurantName", restaurantName);
        res = await fetch(`${API_BASE}/v1/analyze`, { method: "POST", body: fd, signal: controller.signal });
      } else {
        const base: Record<string, any> = { lang };
        if (placeId) base.placeId = placeId;
        if (restaurantName) base.restaurantName = restaurantName;
        const body = tab === "url"
          ? { type: "url", url: url.trim(), ...base }
          : { type: "text", text: text.trim(), ...base };
        res = await fetch(`${API_BASE}/v1/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
      }
      clearTimeout(timeout);
      const data = await res.json().catch(() => ({}));
      // Handle pendingContact (very large lists processed manually)
      if (res.ok && data?.success && data?.pendingContact) {
        setResult({ ...(data as any), pendingContact: true } as AnalysisResult);
        setTimeout(() => {
          document.getElementById("analyzer-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else if (!res.ok || !data?.success) {
        const apiErr: string = (data?.error || "").toString();
        let msg = apiErr || t.errGeneric;
        if (/no wines? found/i.test(apiErr)) msg = NO_WINES_MSG[lang];
        showInlineError(msg);
      } else {
        setResult(data as AnalysisResult);
        // Scroll into view
        setTimeout(() => {
          document.getElementById("analyzer-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (err: any) {
      clearTimeout(timeout);
      console.error(err);
      const isAbort = err?.name === "AbortError";
      showInlineError(
        isAbort
          ? (lang === "es"
              ? "El análisis está tardando demasiado. Inténtalo de nuevo o prueba con un fragmento más pequeño."
              : lang === "en"
              ? "The analysis is taking too long. Please try again or try a smaller excerpt."
              : t.errGeneric)
          : t.errGeneric
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analizador" className="relative py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">{t.badge}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
          {/* Restaurant search (Google Places — optional) */}
          <div className="mb-6">
            <Label className="mb-2 block text-sm font-medium">{T_RESTAURANT_LABEL[lang]}</Label>
            {placeId && restaurantName ? (
              <div className="flex items-start gap-3 p-3 rounded-md border border-accent/40 bg-accent/5">
                <CheckCircle2 size={18} className="text-accent mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{restaurantName}</p>
                  {restaurantAddress && (
                    <p className="text-xs text-muted-foreground truncate">{restaurantAddress}</p>
                  )}
                </div>
                <button type="button" onClick={clearRestaurant}
                  className="text-muted-foreground hover:text-foreground p-1" aria-label="Clear">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <PlacesSearchInput
                ready={placesReady}
                placeholder={T_RESTAURANT_PLACEHOLDER[lang]}
                onSelect={(s) => {
                  setPlaceId(s.place_id);
                  setRestaurantName(s.structured_formatting?.main_text || s.description);
                  setRestaurantAddress(s.structured_formatting?.secondary_text || null);
                }}
              />
            )}
            <p className="mt-1.5 text-xs text-muted-foreground">{T_RESTAURANT_HELP[lang]}</p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-1 bg-secondary rounded-lg">
            {([
              { k: "url", icon: Link2, label: t.tabUrl },
              { k: "text", icon: FileText, label: t.tabText },
              { k: "file", icon: Upload, label: t.tabFile },
            ] as const).map(({ k, icon: Icon, label }) => (
              <button key={k} type="button" onClick={() => setTab(k)}
                className={`flex items-center justify-center gap-2 px-2 sm:px-3 py-2.5 rounded-md text-sm font-medium transition-all ${tab === k ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{TAB_SHORT_EN[lang][k]}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mb-6">
            {tab === "url" && (
              <div className="space-y-2">
                <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={t.urlPh} className="h-12" />
                <p className="text-xs text-muted-foreground leading-relaxed">{URL_NOTE[lang]}</p>
              </div>
            )}
            {tab === "text" && (
              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.textPh} className="min-h-[180px] sm:min-h-[220px] font-mono text-sm" />
            )}
            {tab === "file" && (
              <label className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-wine/50 hover:bg-wine/5 transition-colors">
                <Upload size={28} className="text-wine" />
                <span className="text-sm font-medium">{file ? file.name : t.fileLabel}</span>
                <span className="text-xs text-muted-foreground">{t.fileHint}</span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.txt,.csv,application/pdf,image/jpeg,image/png,text/plain,text/csv" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && f.size > 10 * 1024 * 1024) { toast.error("Max 10MB"); return; }
                    setFile(f || null);
                  }} />
              </label>
            )}
          </div>

          {/* Inline error (visible, no sticky overlap) */}
          {errorMsg && !loading && (
            <div id="analyzer-inline-error" role="alert" className="mb-4 flex items-start gap-3 p-4 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed">{errorMsg}</p>
            </div>
          )}

          {/* CTA */}
          <Button type="submit" disabled={loading} size="lg" className="w-full h-12 bg-gradient-wine text-primary-foreground text-base font-semibold">
            {loading ? (<><Loader2 size={18} className="animate-spin" /> {t.analyzing}</>) : (<><Sparkles size={18} /> {t.cta}</>)}
          </Button>

          {/* Loading steps */}
          <AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden">
                <div className="space-y-2">
                  {t.steps.map((label: string, i: number) => (
                    <div key={i} className={`flex items-center gap-3 text-sm transition-opacity ${i <= step ? "opacity-100" : "opacity-40"}`}>
                      {i < step ? <CheckCircle2 size={16} className="text-emerald-500" />
                        : i === step ? <Loader2 size={16} className="animate-spin text-wine" />
                        : <div className="w-4 h-4 rounded-full border border-border" />}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                {slow && (
                  <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                    <AlertTriangle size={12} /> {t.errSlow}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div id="analyzer-results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mt-12 space-y-10">
              <ResultsView result={result} t={t} lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Results subview ─── */
function ResultsView({ result, t, lang }: { result: AnalysisResult; t: any; lang: Lang }) {
  const { summary, semaphore, topProblems, restaurant, fullAnalysis, analysisId } = result;

  return (
    <>
      {/* Restaurant + Score */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center bg-card border border-border rounded-2xl p-8">
        <div>
          {restaurant?.name && (
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">{restaurant.name}</h3>
          )}
          <p className="text-sm text-muted-foreground mb-4">{t.detected}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div><strong className="text-foreground">{summary.totalWines}</strong> <span className="text-muted-foreground">{t.references}</span></div>
            <div><strong className="text-foreground">{summary.totalByGlass}</strong> <span className="text-muted-foreground">{t.byGlass}</span></div>
            <div><span className="text-muted-foreground">{t.priceRange}: </span><strong className="text-foreground">{summary.priceRange.min}–{summary.priceRange.max} {summary.priceRange.currency}</strong></div>
          </div>
        </div>
        <ScoreCircle score={summary.score} color={summary.scoreColor} label={summary.scoreLabel} title={t.score} />
      </div>

      {/* Semaphore */}
      <div>
        <h3 className="font-heading text-2xl font-bold mb-6">{t.semaphoreTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {semaphore.map((s, i) => (
            <motion.div key={s.area} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`border-l-4 ${STATUS_BG[s.status]} bg-card border border-border rounded-lg p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s.status]}`} />
                <span className="font-semibold text-sm">{s.label}</span>
                <span className="ml-auto text-xs font-bold text-muted-foreground">{s.score}/100</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top problems */}
      {topProblems?.length > 0 && (
        <div>
          <h3 className="font-heading text-2xl font-bold mb-6">{t.problemsTitle}</h3>
          <div className="space-y-4">
            {topProblems.map((p) => (
              <div key={p.rank} className="flex gap-4 bg-card border border-border border-l-4 border-l-red-500 rounded-lg p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                  {p.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
                    <h4 className="font-semibold">{p.title}</h4>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-red-500/10 text-red-600 dark:text-red-400">{p.metric}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked / Unlock gate */}
      <UnlockGate analysisId={analysisId} previewSections={fullAnalysis?.previewSections || []} t={t} />
    </>
  );
}

/* ─── Score circle ─── */
function ScoreCircle({ score, color, label, title }: { score: number; color: string; label: string; title: string }) {
  const radius = 60; const circ = 2 * Math.PI * radius;
  const [animScore, setAnimScore] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnimScore(score), 150); return () => clearTimeout(t); }, [score]);
  const offset = circ - (animScore / 100) * circ;

  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{title}</p>
      <div className="relative inline-flex">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={radius} stroke="hsl(var(--border))" strokeWidth="10" fill="none" />
          <circle cx="80" cy="80" r={radius} stroke={color} strokeWidth="10" fill="none"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
            transform="rotate(-90 80 80)" style={{ transition: "stroke-dashoffset 1.4s ease-out" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-medium mt-2 max-w-[180px]" style={{ color }}>{label}</p>
    </div>
  );
}

/* ─── Unlock gate ─── */
function UnlockGate({ analysisId, previewSections, t }: { analysisId: string; previewSections: string[]; t: any }) {
  const [restaurant, setRestaurant] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error(t.errEmail); return; }
    if (!name.trim()) return;
    if (!consent) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/v1/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId, restaurant, name, email, phone, consent }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        toast.error(data?.error || t.errGeneric);
      } else {
        setReportUrl(data.reportUrl);
        toast.success(t.successTitle);
      }
    } catch (err) {
      console.error(err); toast.error(t.errGeneric);
    } finally { setSubmitting(false); }
  };

  if (reportUrl) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-emerald-500/10 to-wine/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
        <h3 className="font-heading text-2xl font-bold mb-2">{t.successTitle}</h3>
        <p className="text-muted-foreground mb-6">{t.successText}</p>
        <a href={reportUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-wine text-primary-foreground rounded-lg font-semibold hover:bg-wine-dark transition-colors">
          {t.openReport} <ExternalLink size={16} />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div aria-hidden className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 select-none pointer-events-none" style={{ filter: "blur(8px)", opacity: 0.5 }}>
        {previewSections.map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-5 h-32">
            <p className="font-semibold text-sm mb-2">{s}</p>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-4/5" />
              <div className="h-2 bg-muted rounded w-3/5" />
            </div>
          </div>
        ))}
      </div>

      {/* Form overlay */}
      <div className="relative bg-card/95 backdrop-blur-sm border-2 border-wine/30 rounded-2xl p-8 md:p-10 shadow-xl">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-wine/10 mx-auto mb-4">
          <Lock size={24} className="text-wine" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-center mb-3">{t.lockedTitle}</h3>
        <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">{t.lockedSub}</p>

        <form onSubmit={submit} className="max-w-xl mx-auto space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="g-restaurant" className="mb-1.5 block text-sm">{t.formRestaurant} *</Label>
              <Input id="g-restaurant" required value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="g-name" className="mb-1.5 block text-sm">{t.formName} *</Label>
              <Input id="g-name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="g-email" className="mb-1.5 block text-sm">{t.formEmail} *</Label>
              <Input id="g-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="g-phone" className="mb-1.5 block text-sm">{t.formPhone}</Label>
              <Input id="g-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>{t.formConsent}</span>
          </label>
          <Button type="submit" disabled={submitting} size="lg" className="w-full h-12 bg-gradient-wine text-primary-foreground font-semibold">
            {submitting ? (<><Loader2 size={18} className="animate-spin" /> {t.unlocking}</>) : (<><Lock size={18} /> {t.unlock}</>)}
          </Button>
        </form>
      </div>
    </div>
  );
}