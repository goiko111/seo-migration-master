import { useEffect, useState, useRef, FormEvent } from "react";
import { X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { useLanguage } from "@/i18n/LanguageContext";
import PhoneInput, { PREFIXES } from "@/components/PhoneInput";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "tools_lead_popup_dismissed";

const COPY: Record<string, {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  restaurant: string;
  phone: string;
  phoneOpt: string;
  cta: string;
  sending: string;
  privacy: string;
  successTitle: string;
  successMsg: string;
  errorTitle: string;
  errorMsg: string;
}> = {
  es: {
    title: "Sube tu carta de vinos y recibe un diagnóstico profesional gratuito con recomendaciones personalizadas",
    subtitle: "Recibe un diagnóstico profesional gratuito de tu carta de vinos: estructura, pricing, copa y oportunidades de mejora.",
    name: "Nombre",
    email: "Email profesional",
    restaurant: "Restaurante",
    phone: "Teléfono",
    phoneOpt: "(opcional)",
    cta: "Solicitar diagnóstico gratuito",
    sending: "Enviando…",
    privacy: "Sin compromiso. Datos tratados según nuestra política de privacidad.",
    successTitle: "¡Solicitud recibida!",
    successMsg: "Te contactaremos en menos de 24h con tu análisis.",
    errorTitle: "Error al enviar",
    errorMsg: "Inténtalo de nuevo en unos segundos.",
  },
  en: {
    title: "Upload your wine list and get a free professional diagnosis with personalized recommendations",
    subtitle: "Get a free professional diagnosis of your wine list: structure, pricing, by-the-glass and improvement opportunities.",
    name: "Name",
    email: "Work email",
    restaurant: "Restaurant",
    phone: "Phone",
    phoneOpt: "(optional)",
    cta: "Request free diagnosis",
    sending: "Sending…",
    privacy: "No commitment. Data handled per our privacy policy.",
    successTitle: "Request received!",
    successMsg: "We'll get back to you within 24h with your analysis.",
    errorTitle: "Submission error",
    errorMsg: "Please try again in a few seconds.",
  },
  pt: {
    title: "Envie a sua carta de vinhos e receba um diagnóstico profissional gratuito com recomendações personalizadas",
    subtitle: "Receba um diagnóstico profissional gratuito da sua carta de vinhos: estrutura, pricing, copo e oportunidades de melhoria.",
    name: "Nome",
    email: "Email profissional",
    restaurant: "Restaurante",
    phone: "Telefone",
    phoneOpt: "(opcional)",
    cta: "Solicitar diagnóstico gratuito",
    sending: "A enviar…",
    privacy: "Sem compromisso. Dados tratados conforme a nossa política de privacidade.",
    successTitle: "Pedido recebido!",
    successMsg: "Entraremos em contacto em menos de 24h com a sua análise.",
    errorTitle: "Erro ao enviar",
    errorMsg: "Tente novamente em alguns segundos.",
  },
  fr: {
    title: "Téléchargez votre carte des vins et recevez un diagnostic professionnel gratuit avec des recommandations personnalisées",
    subtitle: "Recevez un diagnostic professionnel gratuit de votre carte des vins : structure, pricing, vente au verre et opportunités d'amélioration.",
    name: "Nom",
    email: "Email professionnel",
    restaurant: "Restaurant",
    phone: "Téléphone",
    phoneOpt: "(facultatif)",
    cta: "Demander un diagnostic gratuit",
    sending: "Envoi…",
    privacy: "Sans engagement. Données traitées selon notre politique de confidentialité.",
    successTitle: "Demande reçue !",
    successMsg: "Nous vous recontacterons sous 24h avec votre analyse.",
    errorTitle: "Erreur d'envoi",
    errorMsg: "Veuillez réessayer dans quelques secondes.",
  },
  it: {
    title: "Carica la tua carta dei vini e ricevi una diagnosi professionale gratuita con raccomandazioni personalizzate",
    subtitle: "Ricevi una diagnosi professionale gratuita della tua carta dei vini: struttura, pricing, mescita e opportunità di miglioramento.",
    name: "Nome",
    email: "Email professionale",
    restaurant: "Ristorante",
    phone: "Telefono",
    phoneOpt: "(facoltativo)",
    cta: "Richiedi diagnosi gratuita",
    sending: "Invio in corso…",
    privacy: "Senza impegno. Dati trattati secondo la nostra politica sulla privacy.",
    successTitle: "Richiesta ricevuta!",
    successMsg: "Ti contatteremo entro 24h con la tua analisi.",
    errorTitle: "Errore di invio",
    errorMsg: "Riprova tra qualche secondo.",
  },
  de: {
    title: "Laden Sie Ihre Weinkarte hoch und erhalten Sie eine kostenlose professionelle Diagnose mit personalisierten Empfehlungen",
    subtitle: "Erhalten Sie eine kostenlose professionelle Diagnose Ihrer Weinkarte: Struktur, Pricing, offener Ausschank und Verbesserungsmöglichkeiten.",
    name: "Name",
    email: "Geschäftliche E-Mail",
    restaurant: "Restaurant",
    phone: "Telefon",
    phoneOpt: "(optional)",
    cta: "Kostenlose Diagnose anfordern",
    sending: "Wird gesendet…",
    privacy: "Unverbindlich. Daten werden gemäß unserer Datenschutzrichtlinie verarbeitet.",
    successTitle: "Anfrage erhalten!",
    successMsg: "Wir melden uns innerhalb von 24h mit Ihrer Analyse.",
    errorTitle: "Sendefehler",
    errorMsg: "Bitte versuchen Sie es in wenigen Sekunden erneut.",
  },
};

const ToolsLeadPopup = () => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const t = COPY[lang] || COPY.es;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    const trigger = () => {
      if (triggered.current) return;
      triggered.current = true;
      setOpen(true);
    };

    const timeoutId = window.setTimeout(trigger, 8000); // 8s después de cargar

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const restaurant = String(fd.get("restaurant") || "").trim();
    const phoneNumber = String(fd.get("phone") || "").trim();
    const prefixCode = String(fd.get("phone_prefix") || "").trim();
    const dial = PREFIXES.find((p) => p.code === prefixCode)?.dial || "";
    const phone = phoneNumber ? `${dial} ${phoneNumber}`.trim() : null;

    try {
      const { error } = await supabase.from("contact_leads").insert({
        name,
        email,
        restaurant,
        phone,
        form_type: "herramientas_popup",
      });
      if (error) throw error;

      notifyLead({
        name,
        email,
        restaurant,
        phone,
        form_type: "herramientas_popup",
      });

      toast({ title: t.successTitle, description: t.successMsg });
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
    } catch (err) {
      console.error("ToolsLeadPopup submit error:", err);
      toast({ title: t.errorTitle, description: t.errorMsg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tools-popup-title"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md bg-gradient-card border border-wine/30 rounded-2xl shadow-2xl shadow-wine/10 p-6 md:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Cerrar"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X size={16} />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-wine/30 bg-wine/10 mb-4">
          <Sparkles size={12} className="text-wine" />
          <span className="text-[10px] font-semibold tracking-widest uppercase text-wine-light">
            {lang === "es" ? "Análisis gratuito" : "Free analysis"}
          </span>
        </div>

        <h3 id="tools-popup-title" className="font-heading text-xl md:text-2xl font-bold leading-tight mb-2">
          {t.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="popup_name" className="text-xs font-medium text-muted-foreground">{t.name}</label>
            <input
              id="popup_name"
              name="name"
              type="text"
              required
              maxLength={100}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40"
            />
          </div>
          <div>
            <label htmlFor="popup_email" className="text-xs font-medium text-muted-foreground">{t.email}</label>
            <input
              id="popup_email"
              name="email"
              type="email"
              required
              maxLength={255}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40"
            />
          </div>
          <div>
            <label htmlFor="popup_restaurant" className="text-xs font-medium text-muted-foreground">{t.restaurant}</label>
            <input
              id="popup_restaurant"
              name="restaurant"
              type="text"
              required
              maxLength={150}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
              {t.phone} <span className="text-muted-foreground/60">{t.phoneOpt}</span>
            </label>
            <PhoneInput native required={false} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-wine text-primary-foreground py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? t.sending : t.cta}
          </button>

          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">{t.privacy}</p>
        </form>
      </div>
    </div>
  );
};

export default ToolsLeadPopup;