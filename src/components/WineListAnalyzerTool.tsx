import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2, FileText, Upload, Loader2, CheckCircle2, AlertTriangle,
  Lock, ExternalLink, Sparkles, Search, X, Star, Clock, Info, Lightbulb,
  BarChart3, CircleDollarSign, Wine, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import PhoneInput, { PREFIXES } from "@/components/PhoneInput";
import { notifyLead } from "@/lib/notifyLead";

/**
 * Pushes the analyzer lead into Autopilot via send-lead-notification.
 * Fire-and-forget; never blocks the analyzer UI.
 */
function notifyAnalyzerLead(payload: {
  name?: string;
  email: string;
  phone?: string;
  restaurant?: string;
  analysisId?: string | null;
  variant: "unlock" | "pending" | "longwait" | "registration" | "partial";
  lang: string;
}) {
  const variantLabel: Record<string, string> = {
    unlock: "Analizador · desbloqueo informe",
    pending: "Analizador · carta extensa (pending)",
    longwait: "Analizador · espera larga",
    registration: "Analizador · registro freemium",
    partial: "Analizador · informe parcial >200",
  };
  notifyLead({
    name: payload.name?.trim() || null,
    email: payload.email,
    phone: payload.phone?.trim() || null,
    restaurant: payload.restaurant?.trim() || null,
    form_type: "wine-list-analyzer",
    form_label: variantLabel[payload.variant] || "Analizador de carta",
    resource: payload.analysisId ? `analysis:${payload.analysisId}` : "wine-list-analyzer",
    lang: payload.lang,
    variant: payload.variant,
    // Tag explicit category so Autopilot/Connect can route this lead as "analisis"
    lead_type: "analisis",
    lead_category: "analisis",
  } as Record<string, string | null>);
}

/* ─── Config ─── */
const API_BASE = "https://api.winerim.wine";
const GOOGLE_MAPS_API_KEY = "AIzaSyAQSpAPWbAe7HHirNOgY6YEiwsd8I5VVFI";
const ADMIN_KEY_STORAGE = "winerim_admin_key";

/** Reads ?admin_key=… from URL, persists in sessionStorage and returns it. */
function getAdminKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("admin_key");
    if (fromUrl) {
      sessionStorage.setItem(ADMIN_KEY_STORAGE, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(ADMIN_KEY_STORAGE);
  } catch { return null; }
}

/** Appends admin_key (if present) to a Worker URL. */
function withAdminKey(url: string): string {
  const key = getAdminKey();
  if (!key) return url;
  return url + (url.includes("?") ? "&" : "?") + "admin_key=" + encodeURIComponent(key);
}

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
const T_RESTAURANT_NOT_FOUND: Record<Lang, string> = {
  es: "¿No encuentras tu restaurante? No pasa nada, puedes continuar sin seleccionarlo.",
  en: "Can't find your restaurant? No problem, you can continue without selecting it.",
  fr: "Vous ne trouvez pas votre restaurant ? Pas de souci, vous pouvez continuer sans le sélectionner.",
  de: "Restaurant nicht gefunden? Kein Problem, Sie können ohne Auswahl fortfahren.",
  it: "Non trovi il tuo ristorante? Nessun problema, puoi continuare senza selezionarlo.",
  pt: "Não encontra o seu restaurante? Não faz mal, pode continuar sem o selecionar.",
};

/* Partial analysis (>200 wines) i18n */
const T_PARTIAL = {
  es: { headline: (a: number, t: number) => <>Hemos analizado <strong>{a} de {t}</strong> vinos de tu carta.</>, name: "Nombre (opcional)", email: "Email", send: "Enviar informe completo", done: (n: number, e: string) => `¡Listo! Te enviaremos el informe completo de las ${n} referencias a ${e}.`, error: "No se pudo enviar. Inténtalo de nuevo." },
  en: { headline: (a: number, t: number) => <>We analyzed <strong>{a} of {t}</strong> wines from your list.</>, name: "Name (optional)", email: "Email", send: "Send full report", done: (n: number, e: string) => `Done! We'll send the full report of all ${n} wines to ${e}.`, error: "Could not send. Please try again." },
  fr: { headline: (a: number, t: number) => <>Nous avons analysé <strong>{a} sur {t}</strong> vins de votre carte.</>, name: "Nom (optionnel)", email: "Email", send: "Envoyer le rapport complet", done: (n: number, e: string) => `C'est fait ! Nous enverrons le rapport complet des ${n} références à ${e}.`, error: "Échec de l'envoi. Réessayez." },
  de: { headline: (a: number, t: number) => <>Wir haben <strong>{a} von {t}</strong> Weinen Ihrer Karte analysiert.</>, name: "Name (optional)", email: "E-Mail", send: "Vollständigen Bericht senden", done: (n: number, e: string) => `Fertig! Wir senden den vollständigen Bericht aller ${n} Weine an ${e}.`, error: "Senden fehlgeschlagen. Bitte erneut versuchen." },
  it: { headline: (a: number, t: number) => <>Abbiamo analizzato <strong>{a} su {t}</strong> vini della tua carta.</>, name: "Nome (opzionale)", email: "Email", send: "Invia il report completo", done: (n: number, e: string) => `Fatto! Ti invieremo il report completo di tutti i ${n} vini a ${e}.`, error: "Invio non riuscito. Riprova." },
  pt: { headline: (a: number, t: number) => <>Analisámos <strong>{a} de {t}</strong> vinhos da sua carta.</>, name: "Nome (opcional)", email: "Email", send: "Enviar relatório completo", done: (n: number, e: string) => `Pronto! Enviaremos o relatório completo dos ${n} vinhos para ${e}.`, error: "Não foi possível enviar. Tente de novo." },
} as const;

/* Rotating commercial claims shown under the progress bar while processing */
const CLAIMS: Record<Lang, string[]> = {
  es: [
    "¿Sabías que el 67% de las cartas de vinos tienen márgenes mal configurados?",
    "Un análisis profesional de tu carta puede aumentar tu beneficio hasta un 30%",
    "Winerim analiza precios, diversidad, estructura y oportunidades de tu carta",
    "Los restaurantes que optimizan su carta de vinos facturan un 22% más en vino",
    "Detectamos vinos con margen bajo, huecos en la oferta y oportunidades perdidas",
    "Tu carta de vinos es tu mejor vendedor silencioso. ¿Está bien entrenado?",
  ],
  en: [
    "Did you know 67% of wine lists have misconfigured margins?",
    "A professional wine list analysis can increase your profit by up to 30%",
    "Winerim analyzes pricing, diversity, structure and opportunities in your list",
    "Restaurants that optimize their wine list sell 22% more wine by revenue",
    "We detect low-margin wines, gaps in your offering and missed opportunities",
    "Your wine list is your best silent salesperson. Is it well trained?",
  ],
  fr: [
    "Saviez-vous que 67% des cartes des vins ont des marges mal configurées ?",
    "Une analyse professionnelle de votre carte peut augmenter vos bénéfices de 30%",
    "Winerim analyse les prix, la diversité, la structure et les opportunités de votre carte",
    "Les restaurants qui optimisent leur carte des vins génèrent 22% de plus en vin",
    "Nous détectons les vins à faible marge, les lacunes et les opportunités manquées",
    "Votre carte des vins est votre meilleur vendeur silencieux. Est-il bien formé ?",
  ],
  de: [
    "Wussten Sie, dass 67% der Weinkarten falsch kalkulierte Margen haben?",
    "Eine professionelle Weinkartenanalyse kann Ihren Gewinn um bis zu 30% steigern",
    "Winerim analysiert Preise, Vielfalt, Struktur und Chancen Ihrer Weinkarte",
    "Restaurants, die ihre Weinkarte optimieren, erzielen 22% mehr Weinumsatz",
    "Wir erkennen margenschwache Weine, Angebotslücken und verpasste Chancen",
    "Ihre Weinkarte ist Ihr bester stiller Verkäufer. Ist sie gut geschult?",
  ],
  it: [
    "Sapevi che il 67% delle carte dei vini ha margini configurati male?",
    "Un'analisi professionale della tua carta può aumentare il profitto fino al 30%",
    "Winerim analizza prezzi, diversità, struttura e opportunità della tua carta",
    "I ristoranti che ottimizzano la carta dei vini fatturano il 22% in più sul vino",
    "Rileviamo vini con margine basso, lacune nell'offerta e opportunità mancate",
    "La tua carta dei vini è il tuo miglior venditore silenzioso. È ben addestrato?",
  ],
  pt: [
    "Sabia que 67% das cartas de vinhos têm margens mal configuradas?",
    "Uma análise profissional da sua carta pode aumentar o lucro em até 30%",
    "Winerim analisa preços, diversidade, estrutura e oportunidades da sua carta",
    "Restaurantes que otimizam sua carta de vinhos faturam 22% mais em vinho",
    "Detectamos vinhos com margem baixa, lacunas na oferta e oportunidades perdidas",
    "Sua carta de vinhos é seu melhor vendedor silencioso. Está bem treinado?",
  ],
};

/* Soft contact-capture prompt shown if processing exceeds ~45s */
const T_LONG_CAPTURE_TITLE: Record<Lang, string> = {
  es: "Tu carta es muy completa",
  en: "Your wine list is very thorough",
  fr: "Votre carte est très complète",
  de: "Ihre Karte ist sehr umfangreich",
  it: "La tua carta è molto completa",
  pt: "A sua carta é muito completa",
};
const T_LONG_CAPTURE_TEXT: Record<Lang, string> = {
  es: "Si prefieres, déjanos tus datos y te enviaremos el informe completo por email cuando esté listo.",
  en: "If you prefer, leave your details and we'll email you the full report when it's ready.",
  fr: "Si vous préférez, laissez vos coordonnées et nous vous enverrons le rapport complet par email.",
  de: "Wenn Sie möchten, hinterlassen Sie Ihre Daten und wir senden Ihnen den vollständigen Bericht per E-Mail.",
  it: "Se preferisci, lasciaci i tuoi dati e ti invieremo il report completo via email.",
  pt: "Se preferir, deixe os seus dados e enviaremos o relatório completo por email.",
};
const T_SEND_RECEIVE: Record<Lang, string> = {
  es: "Enviar y recibir informe",
  en: "Send and receive report",
  fr: "Envoyer et recevoir le rapport",
  de: "Senden und Bericht erhalten",
  it: "Invia e ricevi il report",
  pt: "Enviar e receber relatório",
};

/* Freemium / registration gate copy */
const T_REG_TITLE: Record<Lang, string> = {
  es: "Regístrate para seguir analizando",
  en: "Register to keep analyzing",
  fr: "Inscrivez-vous pour continuer à analyser",
  de: "Registrieren Sie sich, um weiter zu analysieren",
  it: "Registrati per continuare ad analizzare",
  pt: "Regista-te para continuar a analisar",
};
const T_REG_FOOT: Record<Lang, string> = {
  es: "Tu primer análisis fue gratis. Regístrate para desbloquear más análisis e informes detallados.",
  en: "Your first analysis was free. Register to unlock more analyses and detailed reports.",
  fr: "Votre première analyse était gratuite. Inscrivez-vous pour en débloquer d'autres et accéder aux rapports détaillés.",
  de: "Ihre erste Analyse war kostenlos. Registrieren Sie sich, um weitere Analysen und detaillierte Berichte freizuschalten.",
  it: "La tua prima analisi è stata gratuita. Registrati per sbloccare più analisi e report dettagliati.",
  pt: "A sua primeira análise foi gratuita. Registe-se para desbloquear mais análises e relatórios detalhados.",
};
const T_REG_CTA: Record<Lang, string> = {
  es: "Registrarme gratis", en: "Register for free", fr: "Inscription gratuite",
  de: "Kostenlos registrieren", it: "Registrati gratis", pt: "Registar-me grátis",
};
const T_REG_RESTAURANT: Record<Lang, string> = {
  es: "Restaurante (opcional)", en: "Restaurant (optional)", fr: "Restaurant (optionnel)",
  de: "Restaurant (optional)", it: "Ristorante (opzionale)", pt: "Restaurante (opcional)",
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

/* ─── Preview block (pendingContact + error) i18n ─── */
const T_PREV: Record<Lang, {
  detected: (n: number) => string;
  categories: string;
  samples: string;
  retry: string;
  retryHint: string;
  formatHints: string;
  fallbackError: string;
}> = {
  es: {
    detected: (n) => `Hemos detectado aproximadamente ${n} vinos en tu carta`,
    categories: "Categorías encontradas",
    samples: "Algunos ejemplos detectados",
    retry: "Intentar de nuevo",
    retryHint: "Vuelve a probar con los datos actuales o cambia de formato.",
    formatHints: "También puedes pegar el texto directamente o subir otro formato (PDF, foto, URL).",
    fallbackError: "Ha ocurrido un error procesando tu carta.",
  },
  en: {
    detected: (n) => `We detected approximately ${n} wines on your list`,
    categories: "Categories found",
    samples: "Sample wines detected",
    retry: "Try again",
    retryHint: "Retry with the current data or switch format.",
    formatHints: "You can also paste the text directly or upload another format (PDF, photo, URL).",
    fallbackError: "An error occurred while processing your list.",
  },
  fr: {
    detected: (n) => `Nous avons détecté environ ${n} vins sur votre carte`,
    categories: "Catégories trouvées",
    samples: "Quelques vins détectés",
    retry: "Réessayer",
    retryHint: "Réessayez avec les données actuelles ou changez de format.",
    formatHints: "Vous pouvez aussi coller le texte directement ou utiliser un autre format (PDF, photo, URL).",
    fallbackError: "Une erreur est survenue lors du traitement de votre carte.",
  },
  de: {
    detected: (n) => `Wir haben ungefähr ${n} Weine auf Ihrer Karte erkannt`,
    categories: "Gefundene Kategorien",
    samples: "Beispielhafte Weine",
    retry: "Erneut versuchen",
    retryHint: "Mit den aktuellen Daten erneut versuchen oder Format wechseln.",
    formatHints: "Sie können den Text auch direkt einfügen oder ein anderes Format hochladen (PDF, Foto, URL).",
    fallbackError: "Beim Verarbeiten Ihrer Karte ist ein Fehler aufgetreten.",
  },
  it: {
    detected: (n) => `Abbiamo rilevato circa ${n} vini nella tua carta`,
    categories: "Categorie trovate",
    samples: "Esempi di vini rilevati",
    retry: "Riprova",
    retryHint: "Riprova con i dati attuali o cambia formato.",
    formatHints: "Puoi anche incollare il testo direttamente o caricare un altro formato (PDF, foto, URL).",
    fallbackError: "Si è verificato un errore durante l'elaborazione della tua carta.",
  },
  pt: {
    detected: (n) => `Detetámos aproximadamente ${n} vinhos na sua carta`,
    categories: "Categorias encontradas",
    samples: "Exemplos de vinhos detetados",
    retry: "Tentar novamente",
    retryHint: "Tente novamente com os dados atuais ou mude de formato.",
    formatHints: "Também pode colar o texto diretamente ou carregar outro formato (PDF, foto, URL).",
    fallbackError: "Ocorreu um erro ao processar a sua carta.",
  },
};

/* ─── Reusable preview block (vinos detectados + categorías + muestras) ─── */
function PreviewBlock({
  lang, preview,
}: { lang: Lang; preview: { estimatedWines?: number; categoriesFound?: string[]; sampleWines?: string[] } }) {
  const tt = T_PREV[lang];
  const cats = preview.categoriesFound || [];
  const samples = preview.sampleWines || [];
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4 md:p-5 space-y-4 text-left">
      {typeof preview.estimatedWines === "number" && preview.estimatedWines > 0 && (
        <p className="text-sm md:text-base text-foreground">
          {tt.detected(preview.estimatedWines).split(String(preview.estimatedWines))[0]}
          <strong className="text-wine">{preview.estimatedWines}</strong>
          {tt.detected(preview.estimatedWines).split(String(preview.estimatedWines))[1] || ""}
        </p>
      )}
      {cats.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{tt.categories}</p>
          <div className="flex flex-wrap gap-1.5">
            {cats.slice(0, 12).map((c, i) => (
              <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-wine/10 text-wine border border-wine/20 capitalize">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      {samples.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{tt.samples}</p>
          <ul className="space-y-1 text-sm text-foreground/85">
            {samples.slice(0, 5).map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-wine">•</span><span className="truncate">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
  mapsScriptPromise = new Promise<void>((resolve, reject) => {
    const ensurePlaces = async () => {
      try {
        const g: any = (window as any).google;
        if (g?.maps?.importLibrary) {
          await g.maps.importLibrary("places");
        }
        // Fallback: poll briefly in case importLibrary is unavailable
        const start = Date.now();
        while (!(window as any).google?.maps?.places && Date.now() - start < 5000) {
          await new Promise((r) => setTimeout(r, 100));
        }
        if ((window as any).google?.maps?.places) resolve();
        else reject(new Error("places library not available"));
      } catch (e) { reject(e as Error); }
    };
    const existing = document.querySelector<HTMLScriptElement>('script[data-google-maps="true"]');
    if (existing) { existing.addEventListener("load", ensurePlaces); return; }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&loading=async&v=weekly`;
    s.async = true; s.defer = true;
    s.dataset.googleMaps = "true";
    s.onload = ensurePlaces;
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

type ValueProp = { title: string; desc: string };
const VALUE_PROPS: Record<Lang, ValueProp[]> = {
  es: [
    { title: "Score global", desc: "Tu carta puntuada de 0 a 100 en márgenes, diversidad, estructura y precios." },
    { title: "Márgenes por vino", desc: "Cada referencia con su margen estimado y comparada con el benchmark del mercado." },
    { title: "Diversidad y huecos", desc: "Mapa completo: países, regiones y uvas. Qué te falta y qué te sobra." },
    { title: "Problemas detectados", desc: "Precios anómalos, márgenes excesivos o bajos y desequilibrios en la carta." },
    { title: "Estimación de negocio", desc: "Ticket medio de vino, ingresos estimados y potencial de mejora real." },
    { title: "Recomendaciones", desc: "Acciones concretas para optimizar márgenes, equilibrar la carta y vender más." },
  ],
  en: [
    { title: "Overall score", desc: "Your wine list rated 0–100 on margins, diversity, structure and pricing." },
    { title: "Margins per wine", desc: "Every reference analysed with its estimated margin against market benchmarks." },
    { title: "Diversity & gaps", desc: "Full map: countries, regions and grapes. What's missing and what's redundant." },
    { title: "Issues detected", desc: "Price anomalies, margins too high or low, and imbalances in your list." },
    { title: "Business estimates", desc: "Average wine ticket, projected revenue and real upside potential." },
    { title: "Recommendations", desc: "Concrete actions to optimise margins, rebalance the list and sell more." },
  ],
  fr: [
    { title: "Score global", desc: "Votre carte notée de 0 à 100 sur marges, diversité, structure et prix." },
    { title: "Marges par vin", desc: "Chaque référence avec sa marge estimée comparée au benchmark du marché." },
    { title: "Diversité et lacunes", desc: "Carte complète : pays, régions, cépages. Ce qui manque et ce qui est en trop." },
    { title: "Problèmes détectés", desc: "Prix anormaux, marges excessives ou faibles, déséquilibres dans la carte." },
    { title: "Estimation business", desc: "Ticket moyen vin, revenus estimés et potentiel d'amélioration réel." },
    { title: "Recommandations", desc: "Actions concrètes pour optimiser les marges, équilibrer la carte et vendre plus." },
  ],
  de: [
    { title: "Gesamtscore", desc: "Ihre Karte mit 0–100 Punkten zu Margen, Vielfalt, Struktur und Preisen." },
    { title: "Margen pro Wein", desc: "Jede Referenz mit geschätzter Marge im Vergleich zum Marktbenchmark." },
    { title: "Vielfalt & Lücken", desc: "Vollständige Karte: Länder, Regionen, Rebsorten. Was fehlt und was zu viel ist." },
    { title: "Erkannte Probleme", desc: "Auffällige Preise, zu hohe oder niedrige Margen und Ungleichgewichte." },
    { title: "Geschäftsprognose", desc: "Durchschnittlicher Wein-Ticket, geschätzter Umsatz und echtes Verbesserungspotenzial." },
    { title: "Empfehlungen", desc: "Konkrete Aktionen zur Optimierung von Margen, Balance und Umsatz." },
  ],
  it: [
    { title: "Punteggio globale", desc: "La tua carta valutata 0–100 su margini, diversità, struttura e prezzi." },
    { title: "Margini per vino", desc: "Ogni referenza con il margine stimato confrontato con il benchmark di mercato." },
    { title: "Diversità e gap", desc: "Mappa completa: paesi, regioni, uve. Cosa manca e cosa è in eccesso." },
    { title: "Problemi rilevati", desc: "Prezzi anomali, margini eccessivi o bassi e squilibri nella carta." },
    { title: "Stima di business", desc: "Ticket medio vino, ricavi stimati e potenziale reale di miglioramento." },
    { title: "Raccomandazioni", desc: "Azioni concrete per ottimizzare margini, equilibrare la carta e vendere di più." },
  ],
  pt: [
    { title: "Pontuação global", desc: "A sua carta avaliada de 0 a 100 em margens, diversidade, estrutura e preços." },
    { title: "Margens por vinho", desc: "Cada referência com a sua margem estimada comparada com o benchmark de mercado." },
    { title: "Diversidade e lacunas", desc: "Mapa completo: países, regiões e castas. O que falta e o que sobra." },
    { title: "Problemas detetados", desc: "Preços anómalos, margens excessivas ou baixas e desequilíbrios na carta." },
    { title: "Estimativa de negócio", desc: "Ticket médio de vinho, receitas estimadas e potencial real de melhoria." },
    { title: "Recomendações", desc: "Ações concretas para otimizar margens, equilibrar a carta e vender mais." },
  ],
};
const VALUE_PROP_ICONS = [BarChart3, CircleDollarSign, Wine, AlertTriangle, TrendingUp, Lightbulb] as const;

const CURRENCY_SYMBOL_MAP: Record<string, string> = {
  "€": "EUR", "$": "USD", "£": "GBP", "¥": "JPY", "₣": "CHF", "₽": "RUB",
  "R$": "BRL", "MX$": "MXN", "AR$": "ARS", "CL$": "CLP", "CO$": "COP",
};
function toCurrencyCode(input?: string): string {
  if (!input) return "EUR";
  const trimmed = input.trim();
  if (/^[A-Za-z]{3}$/.test(trimmed)) return trimmed.toUpperCase();
  return CURRENCY_SYMBOL_MAP[trimmed] || "EUR";
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
    successTitle: "¡Solicitud enviada!",
    successText: "Te contactaremos en menos de 48h con tu informe personalizado.",
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
    textPh: "Example:\n\nREDS\nBarolo DOCG 2018 — £58\nChâteauneuf-du-Pape 2020 — £52\nNapa Cabernet Sauvignon 2019 — £64\n\nWHITES\nSancerre 2022 — £38\nChablis 1er Cru 2021 — £46\n\nBY THE GLASS\nProsecco DOC — £8\nMalbec Mendoza — £9",
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
    successTitle: "Request sent!",
    successText: "We'll contact you within 48h with your personalised report.",
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
    textPh: "Exemple :\n\nROUGES\nChâteauneuf-du-Pape 2020 — 52€\nSaint-Émilion Grand Cru 2018 — 68€\nCôtes du Rhône 2021 — 28€\n\nBLANCS\nSancerre 2022 — 38€\nChablis 1er Cru 2021 — 46€\n\nAU VERRE\nCôtes du Rhône — 7€\nSancerre — 9€",
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
    successTitle: "Demande envoyée !",
    successText: "Nous vous contacterons sous 48h avec votre rapport personnalisé.",
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
    textPh: "Beispiel:\n\nROTWEINE\nSpätburgunder Baden 2020 — 42€\nBlaufränkisch Burgenland 2021 — 36€\nBarolo DOCG 2018 — 58€\n\nWEISSWEINE\nRiesling Mosel Kabinett 2022 — 32€\nGrüner Veltliner Wachau 2022 — 28€\n\nOFFENER WEIN\nRiesling — 7€\nGrüner Veltliner — 6€",
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
    successTitle: "Anfrage gesendet!",
    successText: "Wir melden uns innerhalb von 48 Std. mit Ihrem personalisierten Bericht.",
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
    textPh: "Esempio:\n\nROSSI\nBarolo DOCG 2018 — 58€\nBrunello di Montalcino 2017 — 72€\nChianti Classico Riserva 2019 — 38€\n\nBIANCHI\nGavi di Gavi 2022 — 26€\nVermentino di Sardegna 2023 — 22€\n\nAL CALICE\nProsecco DOC — 6€\nChianti Classico — 8€",
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
    textPh: "Exemplo:\n\nTINTOS\nDouro Reserva 2019 — 35€\nAlentejo Reserva 2020 — 28€\nDão Touriga Nacional 2021 — 24€\n\nBRANCOS\nVinho Verde Alvarinho 2023 — 18€\nDouro Branco Reserva 2022 — 26€\n\nA COPO\nVinho Verde — 5€\nDouro Tinto — 6€",
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
  restaurant: {
    name: string | null;
    location: string | null;
    cuisine_type: string | null;
    google?: {
      rating?: number;
      reviews?: number;
      type?: string;
      address?: string;
      website?: string;
    } | null;
  };
  summary: { totalWines: number; totalByGlass: number; priceRange: { min: number; max: number; median: number; currency: string }; score: number; scoreLabel: string; scoreColor: string };
  semaphore: SemaphoreItem[];
  topProblems: Problem[];
  fullAnalysis: { locked: boolean; previewSections: string[] };
  estimates?: {
    restaurantType?: { type: string; confidence: "high" | "medium" | "low" };
    ticketMedio?: { value: number; currency: string; confidence: "high" | "medium" | "low"; method?: string };
    ticketVino?: { value: number; currency: string; glassCount?: number };
    bottlesPerService?: { value: number; confidence: "high" | "medium" | "low"; estimatedCovers?: number };
    monthlyRevenue?: { value: number; currency: string; servicesPerMonth?: number };
    wps?: { estimated: number; profile: string };
  };
  pendingContact?: boolean;
  partialAnalysis?: boolean;
  analyzedWines?: number;
  totalWines?: number;
  partialMessage?: string;
  preview?: {
    estimatedWines?: number;
    categoriesFound?: string[];
    sampleWines?: string[];
  };
  message?: string;
  emailConfirmation?: string;
}

const STATUS_BG: Record<SemaphoreStatus, string> = { red: "border-l-red-500 bg-red-500/5", yellow: "border-l-amber-500 bg-amber-500/5", green: "border-l-emerald-500 bg-emerald-500/5" };
const STATUS_DOT: Record<SemaphoreStatus, string> = { red: "bg-red-500", yellow: "bg-amber-500", green: "bg-emerald-500" };

/* ─── Partial (progressive) data emitted by /v1/status while processing ─── */
interface PartialData {
  restaurant?: {
    name?: string;
    address?: string;
    rating?: number;
    totalRatings?: number;
    priceLevel?: number;
  };
  wines?: {
    total?: number;
    categories?: Record<string, number>;
    priceRange?: { min: number; max: number; currency: string };
  };
  analysis?: {
    totalWines?: number;
    uniqueCountries?: number;
    uniqueRegions?: number;
    uniqueGrapes?: number;
    byColor?: Record<string, number>;
    avgPrice?: number;
    medianPrice?: number;
  };
  scoring?: {
    globalScore?: number;
    scoreBreakdown?: Record<string, number>;
    problemCount?: number;
    recommendationCount?: number;
  };
  estimates?: {
    avgTicket?: number;
    monthlyWineRevenue?: number;
    bottlesPerService?: number;
    potentialUplift?: number;
    currency?: string;
  } | null;
}

/* ─── Component ─── */
interface Props { defaultLang?: Lang } // kept for backwards-compat; ignored

export default function WineListAnalyzerTool(_props: Props = {}) {
  const { lang: globalLang } = useLanguage();
  const lang: Lang = (["es","en","fr","de","it","pt"].includes(globalLang as string) ? globalLang : "es") as Lang;
  const t = T[lang];

  const [tab, setTab] = useState<"url" | "text" | "file">("text");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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
  const [showLongCapture, setShowLongCapture] = useState(false);
  const [claimIdx, setClaimIdx] = useState(0);
  const [pollLabel, setPollLabel] = useState<string | null>(null);
  const [pollProgress, setPollProgress] = useState<number | null>(null);
  const [partial, setPartial] = useState<PartialData>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [errorPreview, setErrorPreview] = useState<{
    estimatedWines?: number;
    categoriesFound?: string[];
    sampleWines?: string[];
  } | null>(null);
  const [urlFailedInfo, setUrlFailedInfo] = useState<{
    message: string;
    suggestions?: Array<{ method: string; label: string; description?: string }>;
  } | null>(null);
  const currentAnalysisIdRef = useRef<string | null>(null);
  const pollAbortRef = useRef<{ aborted: boolean }>({ aborted: false });
  // v5: hard 60s deadline. When reached without a "complete" status, we
  // surface the contact-capture form. Polling continues in the background
  // so the backend result is still saved server-side for the admin.
  const deadlineHitRef = useRef<boolean>(false);
  // Freemium / rate-limit
  const [registrationGate, setRegistrationGate] = useState<{ message: string } | null>(null);
  const [rateLimitMsg, setRateLimitMsg] = useState<string | null>(null);

  const showInlineError = (message: string) => {
    setErrorMsg(message);
    window.setTimeout(() => {
      document.getElementById("analyzer-inline-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const resetForRetry = () => {
    setErrorMsg(null); setErrorPreview(null); setResult(null); setUrlFailedInfo(null);
  };

  // Loading step animator
  const stepTimer = useRef<number | null>(null);
  const slowTimer = useRef<number | null>(null);
  const claimTimer = useRef<number | null>(null);
  useEffect(() => {
    if (loading) {
      setStep(0); setShowLongCapture(false); setClaimIdx(0);
      stepTimer.current = window.setInterval(() => {
        setStep((s) => (s < t.steps.length - 1 ? s + 1 : s));
      }, 3000);
      slowTimer.current = window.setTimeout(() => setShowLongCapture(true), 45000);
      claimTimer.current = window.setInterval(() => {
        setClaimIdx((i) => (i + 1) % CLAIMS[lang].length);
      }, 3500);
    }
    return () => {
      if (stepTimer.current) window.clearInterval(stepTimer.current);
      if (slowTimer.current) window.clearTimeout(slowTimer.current);
      if (claimTimer.current) window.clearInterval(claimTimer.current);
    };
  }, [loading, t.steps.length, lang]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Client validation
    if (tab === "text" && text.trim().length < 50) { showInlineError(t.errMin); return; }
    if (tab === "url" && !/^https?:\/\/.+/i.test(url.trim())) { showInlineError(t.errGeneric); return; }
    if (tab === "file" && files.length === 0) { showInlineError(t.fileLabel); return; }
    await runAnalysis();
  };

  const runAnalysis = async () => {
    setLoading(true); setResult(null); setErrorMsg(null); setErrorPreview(null);
    setUrlFailedInfo(null);
    setRateLimitMsg(null);
    setPollLabel(null); setPollProgress(null);
    setPartial({});
    pollAbortRef.current = { aborted: false };
    deadlineHitRef.current = false;
    const myAbortRef = pollAbortRef.current;

    // Generate analysisId on the client so we can begin polling immediately,
    // without waiting for the (slow) POST /v1/analyze response.
    const clientAnalysisId = Math.random().toString(16).slice(2, 10);
    currentAnalysisIdRef.current = clientAnalysisId;

    try {
      // Fire POST in parallel (no await on body unless it returns early with
      // rate-limit / registration / sync payload).
      const postPromise: Promise<any> = (async () => {
        try {
          let res: Response;
          if (tab === "file" && files.length > 0) {
            const fd = new FormData();
            fd.append("type", "file");
            for (const f of files) fd.append("file", f);
            fd.append("lang", lang);
            fd.append("analysisId", clientAnalysisId);
            if (placeId) fd.append("placeId", placeId);
            if (restaurantName) fd.append("restaurantName", restaurantName);
            // Fire-and-forget: do NOT await; polling drives the UI.
            fetch(withAdminKey(`${API_BASE}/v1/analyze`), { method: "POST", body: fd })
              .catch((err) => console.error("POST failed:", err));
            return { res: null, data: null };
          } else {
            const base: Record<string, any> = { lang, analysisId: clientAnalysisId };
            if (placeId) base.placeId = placeId;
            if (restaurantName) base.restaurantName = restaurantName;
            const body = tab === "url"
              ? { type: "url", url: url.trim(), ...base }
              : { type: "text", text: text.trim(), ...base };
            // Fire-and-forget for text/url too (v5): the POST can take ~50s on
            // the backend; we never want it to block the UI. Polling drives
            // everything, including rate-limit / registration surfacing via
            // the status endpoint.
            fetch(withAdminKey(`${API_BASE}/v1/analyze`), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }).catch((err) => console.error("POST failed:", err));
            return { res: null, data: null };
          }
          return { res: null, data: null };
        } catch (err) {
          return { error: err };
        }
      })();

      // React to early POST outcomes (rate-limit, registration, sync payload).
      postPromise.then((out: any) => {
        if (!out || myAbortRef.aborted) return;
        const { res, data } = out;
        if (!res || !data) return;
        if (data?.rateLimited && data?.requiresRegistration) {
          myAbortRef.aborted = true;
          setRegistrationGate({ message: data?.message || T_REG_FOOT[lang] });
          return;
        }
        if (res.status === 429 || (data?.rateLimited && !data?.requiresRegistration)) {
          myAbortRef.aborted = true;
          setRateLimitMsg(data?.message || t.errGeneric);
          return;
        }
        // Backwards-compat: full sync payload (no async flow)
        if (data?.success && data?.analysisId && data?.status === undefined) {
          myAbortRef.aborted = true;
          handleFinalPayload(data);
        }
      }).catch(() => {});

      // Start polling immediately with the client-generated analysisId.
      // v5: race polling against a hard 60s deadline. If the deadline wins,
      // we hand the user a friendly contact-capture form and let polling
      // continue silently in the background (backend result still lands in
      // KV for the admin).
      const DEADLINE_MS = 60_000;
      const finalPayload = await Promise.race([
        pollStatus(clientAnalysisId, myAbortRef),
        new Promise<any>((resolve) =>
          setTimeout(() => {
            deadlineHitRef.current = true;
            resolve({
              success: true,
              pendingContact: true,
              analysisId: clientAnalysisId,
              deadline: true,
            });
          }, DEADLINE_MS),
        ),
      ]);
      if (!myAbortRef.aborted && finalPayload) handleFinalPayload(finalPayload);
    } catch (err: any) {
      console.error(err);
      if (!myAbortRef.aborted) showInlineError(t.errGeneric);
    } finally {
      setLoading(false);
      setPollLabel(null); setPollProgress(null);
      currentAnalysisIdRef.current = null;
    }
  };

  // Poll /v1/status/{id} every 2.5s up to ~5 min
  const pollStatus = async (id: string, abortRef?: { aborted: boolean }): Promise<any> => {
    const startedAt = Date.now();
    const MAX_MS = 5 * 60 * 1000;
    while (Date.now() - startedAt < MAX_MS) {
      if (abortRef?.aborted) return null;
      await new Promise((r) => setTimeout(r, 2000));
      if (abortRef?.aborted) return null;
      try {
        const r = await fetch(withAdminKey(`${API_BASE}/v1/status/${encodeURIComponent(id)}`));
        const d = await r.json().catch(() => ({}));
        if (typeof d?.progress === "number") setPollProgress(d.progress);
        if (typeof d?.stepLabel === "string") setPollLabel(d.stepLabel);
        if (d?.partial && typeof d.partial === "object") {
          setPartial((prev) => ({ ...prev, ...d.partial }));
        }
        const status = d?.status;
        if (status && status !== "processing") {
          // Build a unified payload for handleFinalPayload
          if (status === "complete") {
            return { success: true, analysisId: id, ...(d.result || {}) };
          }
          if (status === "url_failed") {
            return { success: true, urlFailed: true, analysisId: id, ...(d.result || {}) };
          }
          if (status === "pending_contact" || status === "url_captured") {
            return { success: true, pendingContact: true, analysisId: id, ...(d.result || {}) };
          }
          if (status === "error") {
            return {
              success: false,
              error: d?.error || d?.result?.error,
              message: d?.message || d?.result?.message,
              preview: d?.preview || d?.result?.preview,
            };
          }
          return d;
        }
      } catch (e) {
        // transient errors → keep polling
        console.warn("status poll failed", e);
      }
    }
    throw Object.assign(new Error("poll timeout"), { name: "AbortError" });
  };

  const handleFinalPayload = (data: any) => {
    if (!data?.success) {
      const apiErr: string = (data?.error || "").toString();
      let msg = (data?.message as string) || apiErr || t.errGeneric;
      if (/no wines? found/i.test(apiErr)) msg = NO_WINES_MSG[lang];
      if (data?.preview) setErrorPreview(data.preview);
      showInlineError(msg);
      return;
    }
    if (data.urlFailed) {
      if (data?.restaurant?.name && !restaurantName) {
        setRestaurantName(data.restaurant.name);
        if (data.restaurant.address) setRestaurantAddress(data.restaurant.address);
      }
      setUrlFailedInfo({
        message: data.message || data.reason || t.errGeneric,
        suggestions: data.suggestions,
      });
      setTimeout(() => {
        document.getElementById("analyzer-url-failed")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    if (data.pendingContact) {
      setResult({ ...(data as any), pendingContact: true } as AnalysisResult);
      setTimeout(() => {
        document.getElementById("analyzer-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }
    setResult(data as AnalysisResult);
    setTimeout(() => {
      document.getElementById("analyzer-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
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

        {/* Value props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {VALUE_PROPS[lang].map((vp, i) => {
            const Icon = VALUE_PROP_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 hover:border-accent/40 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-base mb-1.5 text-foreground">{vp.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{vp.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
          {/* Restaurant search (Google Places — optional) */}
          <div className="mb-6">
            <Label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Search size={16} className="text-accent" />
              {T_RESTAURANT_LABEL[lang]}
            </Label>
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
            {!placeId && (
              <p className="mt-1 text-xs text-muted-foreground/80 italic">{T_RESTAURANT_NOT_FOUND[lang]}</p>
            )}
          </div>

          {/* Tabs */}
          <Label className="mb-2 block text-sm font-semibold text-foreground">
            {lang === "es" ? "¿Cómo quieres enviar tu carta?"
              : lang === "en" ? "How do you want to send your wine list?"
              : lang === "fr" ? "Comment souhaitez-vous envoyer votre carte ?"
              : lang === "de" ? "Wie möchten Sie Ihre Weinkarte senden?"
              : lang === "it" ? "Come vuoi inviare la tua carta?"
              : "Como quer enviar a sua carta?"}
          </Label>
          <div className="grid grid-cols-3 gap-2 mb-4 p-1.5 bg-secondary/70 border border-border rounded-lg">
            {([
              { k: "url", icon: Link2, label: t.tabUrl },
              { k: "text", icon: FileText, label: t.tabText },
              { k: "file", icon: Upload, label: t.tabFile },
            ] as const).map(({ k, icon: Icon, label }) => (
              <button key={k} type="button" onClick={() => setTab(k)}
                className={`flex items-center justify-center gap-2 px-2 sm:px-3 py-3 rounded-md text-sm font-semibold transition-all ${tab === k ? "bg-card shadow-md text-accent ring-1 ring-accent/40" : "text-foreground/70 hover:text-foreground hover:bg-card/50"}`}>
                <Icon size={18} />
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
              <MultiFilePicker
                files={files}
                setFiles={setFiles}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                lang={lang}
              />
            )}
          </div>

          {/* URL fetch failed — friendly fallback */}
          {urlFailedInfo && !loading && (
            <div id="analyzer-url-failed" role="status"
              className="mb-4 p-4 rounded-lg border border-amber-500/40 bg-amber-500/10">
              <div className="flex items-start gap-3">
                <Info size={20} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm mb-1">
                    {lang === "es" ? "No pudimos leer la carta desde esa URL"
                      : lang === "en" ? "We couldn't read the list from that URL"
                      : lang === "fr" ? "Impossible de lire la carte depuis cette URL"
                      : lang === "de" ? "Wir konnten die Karte unter dieser URL nicht lesen"
                      : lang === "it" ? "Non siamo riusciti a leggere la carta da quell'URL"
                      : "Não conseguimos ler a carta a partir desse URL"}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{urlFailedInfo.message}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {(urlFailedInfo.suggestions || [
                      { method: "text", label: t.tabText },
                      { method: "file", label: t.tabFile },
                    ]).map((s) => {
                      const Icon = s.method === "file" ? Upload : FileText;
                      return (
                        <button key={s.method} type="button"
                          onClick={() => {
                            if (s.method === "text" || s.method === "file") {
                              setTab(s.method);
                              setUrlFailedInfo(null);
                            }
                          }}
                          className="flex items-start gap-3 p-3 rounded-md border border-border bg-card hover:border-accent/60 hover:bg-accent/5 transition-colors text-left">
                          <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{s.label}</p>
                            {s.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inline error (visible, no sticky overlap) */}
          {errorMsg && !loading && (
            <div id="analyzer-inline-error" role="alert" className="mb-4 rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
              <div className="flex items-start gap-3 text-destructive">
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">{errorMsg}</p>
              </div>
              {errorPreview && (
                <PreviewBlock lang={lang} preview={errorPreview} />
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resetForRetry}
                  className="border-wine/40 text-wine hover:bg-wine/10"
                >
                  {T_PREV[lang].retry}
                </Button>
                <p className="text-xs text-muted-foreground">{T_PREV[lang].formatHints}</p>
              </div>
            </div>
          )}

          {/* Hard daily limit reached */}
          {rateLimitMsg && !loading && (
            <div role="status" className="mb-4 flex items-start gap-3 p-4 rounded-lg border border-amber-500/40 bg-amber-500/10">
              <Info size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm leading-relaxed">{rateLimitMsg}</p>
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
                {(pollLabel || pollProgress != null) && (
                  <div className="mt-4">
                    {pollLabel && (
                      <p className="text-sm font-medium text-foreground mb-2">{pollLabel}</p>
                    )}
                    {pollProgress != null && (
                      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-wine transition-all duration-500"
                          style={{ width: `${Math.max(0, Math.min(100, pollProgress))}%` }} />
                      </div>
                    )}
                  </div>
                )}
                {/* Progressive partial data while the backend works */}
                <ProgressivePartial partial={partial} lang={lang} />
                {/* Rotating commercial claim */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={claimIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 flex items-start gap-2 text-[13px] text-muted-foreground"
                  >
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <span className="leading-relaxed">{CLAIMS[lang][claimIdx]}</span>
                  </motion.div>
                </AnimatePresence>
                {/* After ~45s: optional contact-capture form (analysis keeps running) */}
                {showLongCapture && (
                  <LongWaitCaptureForm
                    lang={lang}
                    analysisId={currentAnalysisIdRef.current}
                    defaultCountry={null}
                    t={t}
                  />
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
              {result.pendingContact ? (
                <PendingContactView
                  lang={lang}
                  message={(result as any).message}
                  analysisId={result.analysisId}
                  preview={(result as any).preview}
                  emailConfirmation={(result as any).emailConfirmation}
                  t={t}
                />
              ) : (
                <ResultsView result={result} t={t} lang={lang} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Freemium registration gate */}
        {registrationGate && (
          <RegistrationGateModal
            lang={lang}
            t={t}
            message={registrationGate.message}
            defaultRestaurant={restaurantName || ""}
            onClose={() => setRegistrationGate(null)}
            onRegistered={async () => {
              setRegistrationGate(null);
              await runAnalysis();
            }}
          />
        )}
      </div>
    </section>
  );
}

/* ─── Results subview ─── */
function ResultsView({ result, t, lang }: { result: AnalysisResult; t: any; lang: Lang }) {
  const { summary, semaphore, topProblems, restaurant, fullAnalysis, analysisId, estimates } = result;
  const k = T_KPI[lang];
  const google = restaurant?.google;
  const fmtMoney = (v: number, cur = "EUR") => {
    const code = toCurrencyCode(cur);
    try { return new Intl.NumberFormat(lang, { style: "currency", currency: code, maximumFractionDigits: 0 }).format(v); }
    catch { return `${Math.round(v)} ${cur}`; }
  };
  const confColor: Record<string, string> = { high: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400", medium: "bg-amber-500/15 text-amber-700 dark:text-amber-400", low: "bg-red-500/15 text-red-600 dark:text-red-400" };

  return (
    <>
      {result.partialAnalysis && (
        <PartialAnalysisBanner
          lang={lang}
          analyzedWines={result.analyzedWines || 200}
          totalWines={result.totalWines || summary.totalWines}
          message={result.partialMessage}
          analysisId={analysisId}
          defaultRestaurant={restaurant?.name || ""}
        />
      )}
      {/* Restaurant + Score */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center bg-card border border-border rounded-2xl p-8">
        <div>
          {restaurant?.name && (
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">{restaurant.name}</h3>
          )}
          {google?.address && (
            <p className="text-sm text-muted-foreground mb-2">{google.address}</p>
          )}
          {(google?.rating || google?.type) && (
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {google.rating != null && (
                <span className="inline-flex items-center gap-1 text-sm font-medium">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span>{google.rating.toFixed(1)}</span>
                  {google.reviews != null && (
                    <span className="text-muted-foreground">({google.reviews.toLocaleString(lang)} {k.reviews})</span>
                  )}
                </span>
              )}
              {google.type && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">{google.type}</span>
              )}
            </div>
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

      {/* Business estimates KPIs (only if API returned them) */}
      {estimates && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {estimates.ticketMedio && (
            <KpiCard
              label={k.ticket}
              value={fmtMoney(estimates.ticketMedio.value, estimates.ticketMedio.currency)}
              confidence={estimates.ticketMedio.confidence}
              confLabels={k.conf}
              confColor={confColor}
            />
          )}
          {estimates.ticketVino && (
            <KpiCard
              label={k.ticketWine}
              value={fmtMoney(estimates.ticketVino.value, estimates.ticketVino.currency)}
              confLabels={k.conf}
              confColor={confColor}
            />
          )}
          {estimates.bottlesPerService && (
            <KpiCard
              label={k.bottles}
              value={String(estimates.bottlesPerService.value)}
              confidence={estimates.bottlesPerService.confidence}
              confLabels={k.conf}
              confColor={confColor}
            />
          )}
          {estimates.monthlyRevenue && (
            <KpiCard
              label={k.revenue}
              value={fmtMoney(estimates.monthlyRevenue.value, estimates.monthlyRevenue.currency)}
              confLabels={k.conf}
              confColor={confColor}
            />
          )}
        </div>
      )}

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
  const { lang } = useLanguage();
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
      const res = await fetch(withAdminKey(`${API_BASE}/v1/unlock`), {
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
        notifyAnalyzerLead({
          name, email, phone, restaurant,
          analysisId, variant: "unlock", lang,
        });
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
          <div>
            <Label htmlFor="g-email" className="mb-1.5 block text-sm">{t.formEmail} *</Label>
            <Input id="g-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="g-phone" className="mb-1.5 block text-sm">{t.formPhone}</Label>
            <PhoneInputControlled id="g-phone" value={phone} onChange={setPhone} />
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

/* ─── Google Places search input ─── */
interface PlacesSuggestion {
  place_id: string;
  description: string;
  structured_formatting?: { main_text?: string; secondary_text?: string };
}
function PlacesSearchInput({
  ready, placeholder, onSelect,
}: { ready: boolean; placeholder: string; onSelect: (s: PlacesSuggestion) => void }) {
  // Uses the new google.maps.places.AutocompleteSuggestion API (the legacy
  // AutocompleteService is unavailable for Google Cloud projects created after
  // March 1st, 2025). We call fetchAutocompleteSuggestions() directly with
  // debounce + a session token (one token per search session reduces billing).
  const [value, setValue] = useState("");
  const [data, setData] = useState<PlacesSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef<any>(null);
  const debounceRef = useRef<number | null>(null);
  const reqIdRef = useRef(0);

  // Outside-click close
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) { setOpen(false); }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const fetchSuggestions = (input: string) => {
    const places = (window as any).google?.maps?.places;
    if (!places?.AutocompleteSuggestion?.fetchAutocompleteSuggestions) return;
    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new places.AutocompleteSessionToken();
    }
    const reqId = ++reqIdRef.current;
    places.AutocompleteSuggestion
      .fetchAutocompleteSuggestions({
        input,
        includedPrimaryTypes: ["restaurant", "bar", "cafe"],
        sessionToken: sessionTokenRef.current,
      })
      .then((res: any) => {
        if (reqId !== reqIdRef.current) return; // stale
        const list: PlacesSuggestion[] = (res?.suggestions || [])
          .map((s: any) => s.placePrediction)
          .filter(Boolean)
          .map((p: any) => ({
            place_id: p.placeId,
            description: p.text?.toString?.() || "",
            structured_formatting: {
              main_text: p.mainText?.toString?.() || p.text?.toString?.() || "",
              secondary_text: p.secondaryText?.toString?.() || "",
            },
          }));
        setData(list);
        setOpen(true);
      })
      .catch((err: any) => {
        console.error("Places fetchAutocompleteSuggestions failed", err);
        setData([]);
      });
  };

  const onChange = (next: string) => {
    setValue(next);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (!ready || next.trim().length < 2) { setData([]); return; }
    debounceRef.current = window.setTimeout(() => fetchSuggestions(next.trim()), 250);
  };

  return (
    <div ref={wrapRef} className="relative">
       <div className="relative rounded-lg ring-1 ring-accent/40 focus-within:ring-2 focus-within:ring-accent transition-shadow shadow-sm bg-background">
         <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
         <Input
           value={value}
           onChange={(e) => onChange(e.target.value)}
           onFocus={() => setOpen(true)}
           placeholder={placeholder}
           className="h-14 pl-11 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/50"
           autoComplete="off"
         />
       </div>
      {open && data.length > 0 && (
        <ul className="absolute z-30 left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-72 overflow-auto">
          {data.map((s) => (
            <li key={s.place_id}>
              <button type="button"
                onClick={() => {
                  setValue(s.description);
                  setData([]);
                  setOpen(false);
                  sessionTokenRef.current = null;
                  onSelect(s as PlacesSuggestion);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-accent/10 flex flex-col gap-0.5 border-b border-border last:border-0"
              >
                <span className="text-sm font-medium truncate">{s.structured_formatting?.main_text || s.description}</span>
                {s.structured_formatting?.secondary_text && (
                  <span className="text-xs text-muted-foreground truncate">{s.structured_formatting.secondary_text}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── KPI Card ─── */
function KpiCard({
  label, value, confidence, confLabels, confColor,
}: {
  label: string;
  value: string;
  confidence?: "high" | "medium" | "low";
  confLabels: { high: string; medium: string; low: string };
  confColor: Record<string, string>;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="font-heading text-2xl font-bold text-foreground">{value}</span>
      {confidence && (
        <span className={`mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${confColor[confidence]}`}>
          {confLabels[confidence]}
        </span>
      )}
    </div>
  );
}

/* ─── Pending contact (very large lists) ─── */
function PendingContactView({
  lang, message, analysisId, preview, emailConfirmation, t,
}: {
  lang: Lang;
  message?: string;
  analysisId?: string;
  preview?: { estimatedWines?: number; categoriesFound?: string[]; sampleWines?: string[] };
  emailConfirmation?: string;
  t: any;
}) {
  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-wine/10 border border-amber-500/30 rounded-2xl p-8 md:p-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/15 mb-5">
        <Clock size={32} className="text-amber-600" />
      </div>
      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">{T_PENDING_TITLE[lang]}</h3>
      <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
        {message || T_PENDING_TEXT[lang]}
      </p>
      {preview && (
        <div className="mt-6 max-w-xl mx-auto">
          <PreviewBlock lang={lang} preview={preview} />
        </div>
      )}
      <div className="mt-8 max-w-xl mx-auto text-left">
        <ContactCaptureForm
          lang={lang}
          analysisId={analysisId || null}
          t={t}
          variant="pending"
          successOverride={emailConfirmation}
        />
      </div>
    </div>
  );
}

/* ─── Phone input wrapper (controlled, prefix + number) ─── */
function PhoneInputControlled({
  id = "phone", value, onChange,
}: { id?: string; value: string; onChange: (v: string) => void }) {
  const { lang } = useLanguage();
  // Parse current value for initial state
  const initial = (() => {
    const m = (value || "").match(/^(\+\d{1,4})(.*)$/);
    if (m) {
      const dial = m[1];
      const found = PREFIXES.find((p) => p.dial === dial);
      return { code: found?.code || "", number: m[2].trim() };
    }
    return { code: "", number: value || "" };
  })();
  const [code, setCode] = useState(initial.code);
  const [number, setNumber] = useState(initial.number);

  const placeholder: Record<string, string> = {
    es: "Selecciona país", en: "Select country", it: "Seleziona paese",
    fr: "Choisir pays", de: "Land wählen", pt: "Selecionar país",
  };

  const emit = (c: string, n: string) => {
    const dial = PREFIXES.find((p) => p.code === c)?.dial || "";
    const cleaned = n.replace(/[^\d]/g, "");
    onChange(c && cleaned ? `${dial}${cleaned}` : cleaned);
  };

  return (
    <div className="flex mt-1.5">
      <select
        id={`${id}_prefix`}
        value={code}
        onChange={(e) => { setCode(e.target.value); emit(e.target.value, number); }}
        className="h-10 rounded-l-md border border-r-0 border-input bg-background px-2 py-2 text-sm appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ width: 130, minWidth: 130 }}
        aria-label="Country prefix"
      >
        <option value="">{placeholder[lang] || placeholder.en}</option>
        {PREFIXES.map((p) => (
          <option key={p.code} value={p.code}>{p.flag} {p.dial}</option>
        ))}
      </select>
      <Input
        id={id}
        type="tel"
        placeholder="600 000 000"
        value={number}
        onChange={(e) => { setNumber(e.target.value); emit(code, e.target.value); }}
        className="flex-1 rounded-l-none"
        maxLength={15}
      />
    </div>
  );
}

/* ─── Generic contact capture form (used in long-wait + pending-contact) ─── */
function ContactCaptureForm({
  lang, analysisId, t, variant, successOverride,
}: {
  lang: Lang;
  analysisId: string | null;
  t: any;
  variant: "longwait" | "pending";
  successOverride?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error(t.errEmail); return; }
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(withAdminKey(`${API_BASE}/v1/unlock`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId, name, email, phone, consent: true, lang, source: variant }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        toast.error(data?.error || t.errGeneric);
      } else {
        setSent(true);
        toast.success(t.successTitle);
        notifyAnalyzerLead({
          name, email, phone,
          analysisId, variant, lang,
        });
      }
    } catch (err) {
      console.error(err); toast.error(t.errGeneric);
    } finally { setSubmitting(false); }
  };

  if (sent) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="text-sm leading-relaxed">{successOverride || t.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`cc-name-${variant}`} className="mb-1 block text-xs">{t.formName} *</Label>
          <Input id={`cc-name-${variant}`} required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`cc-email-${variant}`} className="mb-1 block text-xs">{t.formEmail} *</Label>
          <Input id={`cc-email-${variant}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor={`cc-phone-${variant}`} className="mb-1 block text-xs">{t.formPhone}</Label>
        <PhoneInputControlled id={`cc-phone-${variant}`} value={phone} onChange={setPhone} />
      </div>
      <Button type="submit" disabled={submitting} className="w-full bg-gradient-wine text-primary-foreground font-semibold">
        {submitting ? (<><Loader2 size={16} className="animate-spin" /> {t.unlocking}</>) : T_SEND_RECEIVE[lang]}
      </Button>
    </form>
  );
}

/* ─── Long-wait soft capture (shown after ~45s, analysis still running) ─── */
function LongWaitCaptureForm({
  lang, analysisId, defaultCountry, t,
}: { lang: Lang; analysisId: string | null; defaultCountry: string | null; t: any }) {
  return (
    <div className="mt-6 p-4 rounded-lg border border-border bg-secondary/40">
      <p className="text-sm font-semibold mb-1">{T_LONG_CAPTURE_TITLE[lang]}</p>
      <p className="text-xs text-muted-foreground mb-3">{T_LONG_CAPTURE_TEXT[lang]}</p>
      <ContactCaptureForm lang={lang} analysisId={analysisId} t={t} variant="longwait" />
    </div>
  );
}

/* ─── Registration gate modal (shown when freemium limit hit) ─── */
function RegistrationGateModal({
  lang, t, message, defaultRestaurant, onClose, onRegistered,
}: {
  lang: Lang; t: any; message: string; defaultRestaurant: string;
  onClose: () => void; onRegistered: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [restaurant, setRestaurant] = useState(defaultRestaurant);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error(t.errEmail); return; }
    setSubmitting(true);
    try {
      const res = await fetch(withAdminKey(`${API_BASE}/v1/register`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, restaurant: restaurant || undefined, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        toast.error(data?.message || data?.error || t.errGeneric);
        return;
      }
      notifyAnalyzerLead({
        name, email, phone, restaurant,
        analysisId: null, variant: "registration", lang,
      });
      try {
        localStorage.setItem("winerim_registered", "1");
        localStorage.setItem("winerim_user", JSON.stringify({ name, email }));
      } catch {}
      onRegistered();
    } catch (err) {
      console.error(err); toast.error(t.errGeneric);
    } finally { setSubmitting(false); }
  };

  return (
    <div
      role="dialog" aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose}
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X size={18} />
        </button>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-wine/10 mx-auto mb-4">
          <Lock size={22} className="text-wine" />
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-bold text-center mb-2">{T_REG_TITLE[lang]}</h3>
        <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">{message}</p>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <Label htmlFor="reg-name" className="mb-1 block text-xs">{t.formName} *</Label>
            <Input id="reg-name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="reg-email" className="mb-1 block text-xs">{t.formEmail} *</Label>
            <Input id="reg-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="reg-phone" className="mb-1 block text-xs">{t.formPhone}</Label>
            <PhoneInputControlled id="reg-phone" value={phone} onChange={setPhone} />
          </div>
          <div>
            <Label htmlFor="reg-restaurant" className="mb-1 block text-xs">{T_REG_RESTAURANT[lang]}</Label>
            <Input id="reg-restaurant" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
          </div>
          <Button type="submit" disabled={submitting} size="lg"
            className="w-full h-12 bg-gradient-wine text-primary-foreground font-semibold">
            {submitting ? (<><Loader2 size={16} className="animate-spin" /> {t.unlocking}</>) : T_REG_CTA[lang]}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed pt-1">
            {T_REG_FOOT[lang]}
          </p>
        </form>
      </div>
    </div>
  );
}

/* ─── Partial analysis banner + email capture ─── */
function PartialAnalysisBanner({
  lang, analyzedWines, totalWines, message, analysisId, defaultRestaurant,
}: {
  lang: Lang;
  analyzedWines: number;
  totalWines: number;
  message?: string;
  analysisId?: string;
  defaultRestaurant?: string;
}) {
  const tt = T_PARTIAL[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true); setErr(null);
    try {
      const res = await fetch(withAdminKey(`${API_BASE}/v1/register`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          email,
          restaurant: defaultRestaurant || undefined,
          analysisId: analysisId || undefined,
          lang,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || d?.success === false) throw new Error(d?.message || "register failed");
      setDone(true);
      notifyAnalyzerLead({
        name, email, restaurant: defaultRestaurant,
        analysisId: analysisId || null, variant: "partial", lang,
      });
    } catch {
      setErr(tt.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 md:p-6">
      <div className="flex items-start gap-3 mb-3">
        <Info size={20} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm md:text-base text-foreground leading-relaxed">
            {tt.headline(analyzedWines, totalWines)}
          </p>
          {message && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">{message}</p>
          )}
        </div>
      </div>
      {done ? (
        <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">{tt.done(totalWines, email)}</p>
        </div>
      ) : (
        <form onSubmit={submit} className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 mt-3">
          <Input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={tt.email} className="bg-background"
          />
          <Input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder={tt.name} className="bg-background"
          />
          <Button type="submit" disabled={submitting} className="bg-gradient-wine text-primary-foreground font-semibold">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : tt.send}
          </Button>
          {err && <p className="sm:col-span-3 text-xs text-destructive">{err}</p>}
        </form>
      )}
    </div>
  );
}
/* ─── Progressive partial preview rendered during loading ─── */
const PARTIAL_LABELS: Record<Lang, {
  restaurant: string;
  wines: string;
  total: string;
  countries: string;
  regions: string;
  grapes: string;
  avgPrice: string;
  priceRange: string;
  score: string;
  problems: string;
  recommendations: string;
  estimates: string;
  ticket: string;
  revenue: string;
  bottles: string;
  uplift: string;
  colors: Record<string, string>;
}> = {
  es: { restaurant: "Restaurante", wines: "Tu carta en números", total: "vinos", countries: "países", regions: "regiones", grapes: "uvas", avgPrice: "Precio medio", priceRange: "Rango", score: "Score preliminar", problems: "problemas detectados", recommendations: "recomendaciones", estimates: "Estimaciones de negocio", ticket: "Ticket medio vino", revenue: "Ingresos vino/mes", bottles: "Botellas/servicio", uplift: "Potencial de mejora", colors: { tinto: "Tintos", blanco: "Blancos", rosado: "Rosados", espumoso: "Espumosos", dulce: "Dulces", generoso: "Generosos" } },
  en: { restaurant: "Restaurant", wines: "Your list in numbers", total: "wines", countries: "countries", regions: "regions", grapes: "grapes", avgPrice: "Average price", priceRange: "Range", score: "Preliminary score", problems: "issues detected", recommendations: "recommendations", estimates: "Business estimates", ticket: "Avg wine ticket", revenue: "Monthly wine revenue", bottles: "Bottles/service", uplift: "Improvement potential", colors: { tinto: "Reds", blanco: "Whites", rosado: "Rosés", espumoso: "Sparkling", dulce: "Sweet", generoso: "Fortified" } },
  fr: { restaurant: "Restaurant", wines: "Votre carte en chiffres", total: "vins", countries: "pays", regions: "régions", grapes: "cépages", avgPrice: "Prix moyen", priceRange: "Fourchette", score: "Score préliminaire", problems: "problèmes détectés", recommendations: "recommandations", estimates: "Estimations business", ticket: "Ticket moyen vin", revenue: "Revenu vin/mois", bottles: "Bouteilles/service", uplift: "Potentiel d'amélioration", colors: { tinto: "Rouges", blanco: "Blancs", rosado: "Rosés", espumoso: "Effervescents", dulce: "Doux", generoso: "Vins doux" } },
  de: { restaurant: "Restaurant", wines: "Ihre Karte in Zahlen", total: "Weine", countries: "Länder", regions: "Regionen", grapes: "Rebsorten", avgPrice: "Durchschnittspreis", priceRange: "Bereich", score: "Vorläufige Bewertung", problems: "Probleme erkannt", recommendations: "Empfehlungen", estimates: "Geschäftsschätzungen", ticket: "Ø Wein-Ticket", revenue: "Wein-Umsatz/Monat", bottles: "Flaschen/Service", uplift: "Verbesserungspotenzial", colors: { tinto: "Rot", blanco: "Weiß", rosado: "Rosé", espumoso: "Schaumwein", dulce: "Süß", generoso: "Likörwein" } },
  it: { restaurant: "Ristorante", wines: "La tua carta in numeri", total: "vini", countries: "paesi", regions: "regioni", grapes: "uve", avgPrice: "Prezzo medio", priceRange: "Fascia", score: "Punteggio preliminare", problems: "problemi rilevati", recommendations: "raccomandazioni", estimates: "Stime di business", ticket: "Ticket medio vino", revenue: "Ricavi vino/mese", bottles: "Bottiglie/servizio", uplift: "Potenziale di miglioramento", colors: { tinto: "Rossi", blanco: "Bianchi", rosado: "Rosati", espumoso: "Spumanti", dulce: "Dolci", generoso: "Liquorosi" } },
  pt: { restaurant: "Restaurante", wines: "A sua carta em números", total: "vinhos", countries: "países", regions: "regiões", grapes: "castas", avgPrice: "Preço médio", priceRange: "Intervalo", score: "Pontuação preliminar", problems: "problemas detetados", recommendations: "recomendações", estimates: "Estimativas de negócio", ticket: "Ticket médio vinho", revenue: "Receita vinho/mês", bottles: "Garrafas/serviço", uplift: "Potencial de melhoria", colors: { tinto: "Tintos", blanco: "Brancos", rosado: "Rosés", espumoso: "Espumantes", dulce: "Doces", generoso: "Generosos" } },
};

function ProgressivePartial({ partial, lang }: { partial: PartialData; lang: Lang }) {
  const L = PARTIAL_LABELS[lang];
  const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any } };
  const hasAny = !!(partial.restaurant || partial.wines || partial.analysis || partial.scoring || partial.estimates);
  if (!hasAny) return null;

  const winesTotal = partial.wines?.total ?? partial.analysis?.totalWines;
  const categories = partial.wines?.categories || partial.analysis?.byColor;
  const totalCats = categories ? Object.values(categories).reduce((a, b) => a + (Number(b) || 0), 0) : 0;
  const fmtMoney = (v?: number, cur = "EUR") => {
    if (typeof v !== "number") return "—";
    const code = toCurrencyCode(cur);
    try { return new Intl.NumberFormat(lang, { style: "currency", currency: code, maximumFractionDigits: 0 }).format(v); }
    catch { return `${Math.round(v)} ${cur}`; }
  };

  return (
    <div className="mt-6 space-y-4">
      <AnimatePresence>
        {partial.restaurant?.name && (
          <motion.div key="r" {...fadeIn} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{L.restaurant}</p>
                <h4 className="font-semibold text-base truncate">{partial.restaurant.name}</h4>
                {partial.restaurant.address && (
                  <p className="text-xs text-muted-foreground truncate">{partial.restaurant.address}</p>
                )}
              </div>
              {typeof partial.restaurant.rating === "number" && (
                <span className="inline-flex items-center gap-1 text-sm font-medium shrink-0">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  {partial.restaurant.rating.toFixed(1)}
                </span>
              )}
            </div>
          </motion.div>
        )}

        {(winesTotal || categories) && (
          <motion.div key="w" {...fadeIn} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{L.wines}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <Stat value={winesTotal} label={L.total} />
              <Stat value={partial.analysis?.uniqueCountries} label={L.countries} />
              <Stat value={partial.analysis?.uniqueRegions} label={L.regions} />
              <Stat value={partial.analysis?.uniqueGrapes} label={L.grapes} />
            </div>
            {categories && totalCats > 0 && (
              <div className="space-y-1.5">
                {Object.entries(categories).map(([k, v]) => {
                  const num = Number(v) || 0;
                  const pct = Math.round((num / totalCats) * 100);
                  return (
                    <div key={k} className="flex items-center gap-2 text-xs">
                      <span className="w-20 text-muted-foreground capitalize shrink-0">{L.colors[k] || k}</span>
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }}
                          className="h-full bg-wine" />
                      </div>
                      <span className="font-mono text-muted-foreground w-14 text-right shrink-0">{num} · {pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}
            {(partial.wines?.priceRange || partial.analysis?.avgPrice != null) && (
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                {partial.analysis?.avgPrice != null && (
                  <span><strong className="text-foreground">{L.avgPrice}:</strong> {fmtMoney(partial.analysis.avgPrice, partial.wines?.priceRange?.currency)}</span>
                )}
                {partial.wines?.priceRange && (
                  <span><strong className="text-foreground">{L.priceRange}:</strong> {fmtMoney(partial.wines.priceRange.min, partial.wines.priceRange.currency)} – {fmtMoney(partial.wines.priceRange.max, partial.wines.priceRange.currency)}</span>
                )}
              </div>
            )}
          </motion.div>
        )}

        {partial.scoring && typeof partial.scoring.globalScore === "number" && (
          <motion.div key="s" {...fadeIn} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <svg viewBox="0 0 80 80" className="w-full h-full">
                  <circle cx="40" cy="40" r="32" stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
                  <motion.circle cx="40" cy="40" r="32" stroke="hsl(var(--wine, var(--primary)))" strokeWidth="6" fill="none"
                    strokeLinecap="round" strokeDasharray={2 * Math.PI * 32}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - (partial.scoring.globalScore || 0) / 100) }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    transform="rotate(-90 40 40)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-xl font-bold">{partial.scoring.globalScore}</span>
                  <span className="text-[10px] text-muted-foreground -mt-1">/100</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{L.score}</p>
                {partial.scoring.scoreBreakdown && (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    {Object.entries(partial.scoring.scoreBreakdown).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-2">
                        <span className="text-muted-foreground capitalize truncate">{k}</span>
                        <span className="font-mono font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border text-xs">
              {typeof partial.scoring.problemCount === "number" && (
                <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <AlertTriangle size={12} /> {partial.scoring.problemCount} {L.problems}
                </span>
              )}
              {typeof partial.scoring.recommendationCount === "number" && (
                <span className="inline-flex items-center gap-1.5 text-wine">
                  <Lightbulb size={12} /> {partial.scoring.recommendationCount} {L.recommendations}
                </span>
              )}
            </div>
          </motion.div>
        )}

        {partial.estimates && (
          <motion.div key="e" {...fadeIn} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">{L.estimates}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {partial.estimates.avgTicket != null && (
                <Stat value={fmtMoney(partial.estimates.avgTicket, partial.estimates.currency)} label={L.ticket} />
              )}
              {partial.estimates.monthlyWineRevenue != null && (
                <Stat value={fmtMoney(partial.estimates.monthlyWineRevenue, partial.estimates.currency)} label={L.revenue} />
              )}
              {partial.estimates.bottlesPerService != null && (
                <Stat value={String(partial.estimates.bottlesPerService)} label={L.bottles} />
              )}
              {partial.estimates.potentialUplift != null && (
                <Stat value={`+${partial.estimates.potentialUplift}%`} label={L.uplift} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ value, label }: { value: number | string | undefined; label: string }) {
  return (
    <div className="text-center">
      <div className="font-heading text-2xl font-bold leading-tight">{value ?? "—"}</div>
      <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}

/* ─── Multi-file picker (drag & drop, list, remove) ─── */
const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const ACCEPT_FILE = ".pdf,.xlsx,.docx,.csv,.txt,.jpg,.jpeg,.png,.webp,.heic,image/*";
const ACCEPT_EXT = /\.(pdf|xlsx|docx|csv|txt|jpe?g|png|webp|heic)$/i;

const MFP_T: Record<Lang, {
  drop: string; click: string; formats: string; limits: string;
  selected: string; total: string; remove: string;
  errMax: string; errSize: string; errFmt: (n: string) => string;
}> = {
  es: { drop: "Arrastra archivos aquí o", click: "haz clic para seleccionar", formats: "PDF, imágenes, Excel, Word, CSV", limits: "Máx. 10 archivos · 20 MB en total", selected: "Archivos seleccionados", total: "archivos", remove: "Quitar", errMax: "Máximo 10 archivos por análisis", errSize: "Tamaño total máximo: 20 MB", errFmt: (n) => `Formato no soportado: ${n}` },
  en: { drop: "Drop files here or", click: "click to select", formats: "PDF, images, Excel, Word, CSV", limits: "Max 10 files · 20 MB total", selected: "Selected files", total: "files", remove: "Remove", errMax: "Maximum 10 files per analysis", errSize: "Maximum total size: 20 MB", errFmt: (n) => `Unsupported format: ${n}` },
  fr: { drop: "Glissez des fichiers ici ou", click: "cliquez pour sélectionner", formats: "PDF, images, Excel, Word, CSV", limits: "Max 10 fichiers · 20 Mo au total", selected: "Fichiers sélectionnés", total: "fichiers", remove: "Retirer", errMax: "Maximum 10 fichiers par analyse", errSize: "Taille totale maximale : 20 Mo", errFmt: (n) => `Format non pris en charge : ${n}` },
  de: { drop: "Dateien hierher ziehen oder", click: "klicken zum Auswählen", formats: "PDF, Bilder, Excel, Word, CSV", limits: "Max. 10 Dateien · 20 MB insgesamt", selected: "Ausgewählte Dateien", total: "Dateien", remove: "Entfernen", errMax: "Maximal 10 Dateien pro Analyse", errSize: "Maximale Gesamtgröße: 20 MB", errFmt: (n) => `Format nicht unterstützt: ${n}` },
  it: { drop: "Trascina i file qui o", click: "clicca per selezionare", formats: "PDF, immagini, Excel, Word, CSV", limits: "Max 10 file · 20 MB totali", selected: "File selezionati", total: "file", remove: "Rimuovi", errMax: "Massimo 10 file per analisi", errSize: "Dimensione totale massima: 20 MB", errFmt: (n) => `Formato non supportato: ${n}` },
  pt: { drop: "Arraste ficheiros aqui ou", click: "clique para selecionar", formats: "PDF, imagens, Excel, Word, CSV", limits: "Máx. 10 ficheiros · 20 MB no total", selected: "Ficheiros selecionados", total: "ficheiros", remove: "Remover", errMax: "Máximo 10 ficheiros por análise", errSize: "Tamanho total máximo: 20 MB", errFmt: (n) => `Formato não suportado: ${n}` },
};

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function MultiFilePicker({
  files, setFiles, isDragging, setIsDragging, lang,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  lang: Lang;
}) {
  const L = MFP_T[lang];
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addFiles = (incoming: File[]) => {
    if (!incoming.length) return;
    // Format check
    const bad = incoming.find((f) => !ACCEPT_EXT.test(f.name) && !f.type.startsWith("image/"));
    if (bad) { toast.error(L.errFmt(bad.name.split(".").pop() || "?")); return; }
    setFiles((prev) => {
      const merged: File[] = [];
      const seen = new Set<string>();
      for (const f of [...prev, ...incoming]) {
        const key = `${f.name}__${f.size}`;
        if (seen.has(key)) continue;
        seen.add(key);
        merged.push(f);
      }
      if (merged.length > MAX_FILES) {
        toast.error(L.errMax);
        merged.length = MAX_FILES;
      }
      const total = merged.reduce((s, f) => s + f.size, 0);
      if (total > MAX_TOTAL_BYTES) {
        toast.error(L.errSize);
        // Trim from the end until under budget
        while (merged.length && merged.reduce((s, f) => s + f.size, 0) > MAX_TOTAL_BYTES) merged.pop();
      }
      return merged;
    });
  };

  const removeAt = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const totalBytes = files.reduce((s, f) => s + f.size, 0);

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(Array.from(e.dataTransfer.files || []));
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 py-10 px-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? "border-wine bg-wine/10" : "border-border hover:border-wine/50 hover:bg-wine/5"}`}
      >
        <Upload size={28} className="text-wine" />
        <p className="text-sm font-medium text-center">
          {L.drop} <span className="text-wine underline">{L.click}</span>
        </p>
        <p className="text-xs text-muted-foreground">{L.formats}</p>
        <p className="text-[11px] text-muted-foreground/70">{L.limits}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_FILE}
          className="hidden"
          onChange={(e) => {
            addFiles(Array.from(e.target.files || []));
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
      </div>

      {files.length > 0 && (
        <div className="rounded-lg border border-border bg-card/50">
          <ul className="divide-y divide-border">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center gap-3 px-3 py-2">
                <FileText size={16} className="shrink-0 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{f.name}</p>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{fmtBytes(f.size)}</span>
                <button
                  type="button"
                  aria-label={L.remove}
                  onClick={(e) => { e.stopPropagation(); removeAt(i); }}
                  className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
          <div className="px-3 py-2 text-xs text-muted-foreground border-t border-border">
            {files.length} {L.total} · {fmtBytes(totalBytes)}
          </div>
        </div>
      )}
    </div>
  );
}
