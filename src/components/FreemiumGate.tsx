import { useState, FormEvent } from "react";
import { Lock, Sparkles, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { useLanguage } from "@/i18n/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { unlockFreemium, getToolSlugFromPath } from "@/lib/freemium";
import PhoneInput, { PREFIXES } from "@/components/PhoneInput";

const COPY: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  toolsCounter: (n: number) => string;
  resourcesCounter: (n: number) => string;
  name: string;
  email: string;
  restaurant: string;
  phone: string;
  phoneOpt: string;
  upload?: string;
  uploadHint?: string;
  uploadRequired?: string;
  uploadError?: string;
  cta: string;
  sending: string;
  privacy: string;
  successTitle: string;
  successMsg: string;
  errorTitle: string;
  errorMsg: string;
  close: string;
}> = {
  es: {
    badge: "Acceso completo",
    title: "Desbloquea todas las herramientas gratis",
    subtitle: "Ya has probado una herramienta. Introduce tus datos para acceder a todas sin límites.",
    toolsCounter: () => `Acceso ilimitado a todas las herramientas y recursos`,
    resourcesCounter: () => `Acceso ilimitado a todas las herramientas y recursos`,
    name: "Nombre",
    email: "Email profesional",
    restaurant: "Restaurante",
    phone: "Teléfono",
    phoneOpt: "",
    cta: "Desbloquear herramientas",
    sending: "Enviando…",
    privacy: "Sin compromiso. Datos tratados según nuestra política de privacidad.",
    successTitle: "¡Acceso desbloqueado!",
    successMsg: "Ya tienes acceso ilimitado a todas las herramientas y recursos.",
    errorTitle: "Error al enviar",
    errorMsg: "Inténtalo de nuevo en unos segundos.",
    close: "Cerrar",
  },
  en: {
    badge: "Full access",
    title: "Unlock all tools for free",
    subtitle: "You've tried one tool. Enter your details to access all of them without limits.",
    toolsCounter: () => "Unlimited access to all tools and resources",
    resourcesCounter: () => "Unlimited access to all tools and resources",
    name: "Name",
    email: "Work email",
    restaurant: "Restaurant",
    phone: "Phone",
    phoneOpt: "",
    cta: "Unlock tools",
    sending: "Sending…",
    privacy: "No commitment. Data handled per our privacy policy.",
    successTitle: "Access unlocked!",
    successMsg: "You now have unlimited access to all tools and resources.",
    errorTitle: "Submission error",
    errorMsg: "Please try again in a few seconds.",
    close: "Close",
  },
  pt: {
    badge: "Acesso completo",
    title: "Desbloqueie todas as ferramentas gratuitamente",
    subtitle: "Já experimentou uma ferramenta. Introduza os seus dados para aceder a todas sem limites.",
    toolsCounter: () => "Acesso ilimitado a todas as ferramentas e recursos",
    resourcesCounter: () => "Acesso ilimitado a todas as ferramentas e recursos",
    name: "Nome",
    email: "Email profissional",
    restaurant: "Restaurante",
    phone: "Telefone",
    phoneOpt: "",
    cta: "Desbloquear ferramentas",
    sending: "A enviar…",
    privacy: "Sem compromisso. Dados tratados conforme a nossa política de privacidade.",
    successTitle: "Acesso desbloqueado!",
    successMsg: "Tem agora acesso ilimitado a todas as ferramentas e recursos.",
    errorTitle: "Erro ao enviar",
    errorMsg: "Tente novamente em alguns segundos.",
    close: "Fechar",
  },
  fr: {
    badge: "Accès complet",
    title: "Débloquez tous les outils gratuitement",
    subtitle: "Vous avez essayé un outil. Renseignez vos coordonnées pour accéder à tous sans limites.",
    toolsCounter: () => "Accès illimité à tous les outils et ressources",
    resourcesCounter: () => "Accès illimité à tous les outils et ressources",
    name: "Nom",
    email: "Email professionnel",
    restaurant: "Restaurant",
    phone: "Téléphone",
    phoneOpt: "",
    cta: "Débloquer les outils",
    sending: "Envoi…",
    privacy: "Sans engagement. Données traitées selon notre politique de confidentialité.",
    successTitle: "Accès débloqué !",
    successMsg: "Vous avez désormais un accès illimité à tous les outils et ressources.",
    errorTitle: "Erreur d'envoi",
    errorMsg: "Veuillez réessayer dans quelques secondes.",
    close: "Fermer",
  },
  it: {
    badge: "Accesso completo",
    title: "Sblocca tutti gli strumenti gratis",
    subtitle: "Hai già provato uno strumento. Inserisci i tuoi dati per accedere a tutti senza limiti.",
    toolsCounter: () => "Accesso illimitato a tutti gli strumenti e risorse",
    resourcesCounter: () => "Accesso illimitato a tutti gli strumenti e risorse",
    name: "Nome",
    email: "Email professionale",
    restaurant: "Ristorante",
    phone: "Telefono",
    phoneOpt: "",
    cta: "Sblocca gli strumenti",
    sending: "Invio in corso…",
    privacy: "Senza impegno. Dati trattati secondo la nostra politica sulla privacy.",
    successTitle: "Accesso sbloccato!",
    successMsg: "Ora hai accesso illimitato a tutti gli strumenti e risorse.",
    errorTitle: "Errore di invio",
    errorMsg: "Riprova tra qualche secondo.",
    close: "Chiudi",
  },
  de: {
    badge: "Voller Zugang",
    title: "Schalten Sie alle Tools kostenlos frei",
    subtitle: "Sie haben bereits ein Tool ausprobiert. Geben Sie Ihre Daten ein, um auf alle ohne Limits zuzugreifen.",
    toolsCounter: () => "Unbegrenzter Zugriff auf alle Tools und Ressourcen",
    resourcesCounter: () => "Unbegrenzter Zugriff auf alle Tools und Ressourcen",
    name: "Name",
    email: "Geschäftliche E-Mail",
    restaurant: "Restaurant",
    phone: "Telefon",
    phoneOpt: "",
    cta: "Tools freischalten",
    sending: "Wird gesendet…",
    privacy: "Unverbindlich. Daten werden gemäß unserer Datenschutzrichtlinie verarbeitet.",
    successTitle: "Zugang freigeschaltet!",
    successMsg: "Sie haben jetzt unbegrenzten Zugang zu allen Tools und Ressourcen.",
    errorTitle: "Sendefehler",
    errorMsg: "Bitte versuchen Sie es in wenigen Sekunden erneut.",
    close: "Schließen",
  },
};

interface FreemiumGateProps {
  context: "tool" | "resource";
  count: number;
  onUnlocked?: () => void;
  /** When true, allow user to dismiss the gate (not used for hard blocks). */
  dismissible?: boolean;
  onDismiss?: () => void;
}

const FreemiumGate = ({ context, count, onUnlocked, dismissible, onDismiss }: FreemiumGateProps) => {
  const { lang } = useLanguage();
  const { toast } = useToast();
  const t = COPY[lang] || COPY.es;
  const [submitting, setSubmitting] = useState(false);

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
    const toolSlug = getToolSlugFromPath(window.location.pathname);

    try {
      const { error } = await supabase.from("freemium_leads").insert({
        name,
        email,
        restaurant,
        phone,
        tool_slug: toolSlug,
      });
      if (error) throw error;

      // Best-effort notification — don't fail the unlock if it errors
      try {
        notifyLead({
          name,
          email,
          restaurant,
          phone,
          form_type: "freemium_gate",
        });
      } catch (notifyErr) {
        console.warn("notifyLead failed:", notifyErr);
      }

      unlockFreemium();
      toast({ title: t.successTitle, description: t.successMsg });
      onUnlocked?.();
    } catch (err) {
      console.error("FreemiumGate submit error:", err);
      toast({ title: t.errorTitle, description: t.errorMsg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const counterText = context === "tool" ? t.toolsCounter(count) : t.resourcesCounter(count);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-background/95 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="freemium-gate-title"
    >
      <div className="relative w-full max-w-lg my-auto bg-gradient-card border border-wine/30 rounded-2xl shadow-2xl shadow-wine/10 p-6 md:p-8 animate-scale-in">
        {dismissible && onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={t.close}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X size={16} />
          </button>
        )}

        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-wine/10 border border-wine/30 flex items-center justify-center mb-3">
            <Lock size={24} className="text-wine" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-wine/30 bg-wine/10 mb-3">
            <Sparkles size={12} className="text-wine" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-wine-light">
              {t.badge}
            </span>
          </div>
          <h2 id="freemium-gate-title" className="font-heading text-2xl md:text-3xl font-bold leading-tight mb-2">
            {t.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-md">
            {t.subtitle}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine/5 border border-wine/20">
            <span className="w-2 h-2 rounded-full bg-wine animate-pulse" />
            <span className="text-xs font-medium text-foreground">{counterText}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div>
            <label htmlFor="gate_name" className="text-xs font-medium text-muted-foreground">{t.name}</label>
            <input id="gate_name" name="name" type="text" required maxLength={100}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40" />
          </div>
          <div>
            <label htmlFor="gate_email" className="text-xs font-medium text-muted-foreground">{t.email}</label>
            <input id="gate_email" name="email" type="email" required maxLength={255}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40" />
          </div>
          <div>
            <label htmlFor="gate_restaurant" className="text-xs font-medium text-muted-foreground">{t.restaurant}</label>
            <input id="gate_restaurant" name="restaurant" type="text" required maxLength={150}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine/40" />
          </div>
          <div>
            <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
              {t.phone}
            </label>
            <PhoneInput native required={true} />
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

export default FreemiumGate;