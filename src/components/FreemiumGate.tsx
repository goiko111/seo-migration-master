import { useState, FormEvent, ChangeEvent } from "react";
import { Lock, Upload, FileCheck2, Sparkles, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { useLanguage } from "@/i18n/LanguageContext";
import PhoneInput, { PREFIXES } from "@/components/PhoneInput";
import { useToast } from "@/hooks/use-toast";
import { unlockFreemium, FREEMIUM_LIMIT } from "@/lib/freemium";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_BYTES = 10 * 1024 * 1024;

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
  upload: string;
  uploadHint: string;
  uploadRequired: string;
  uploadError: string;
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
    title: "Has alcanzado el límite gratuito",
    subtitle: "Sube tu carta de vinos para desbloquear acceso ilimitado a todas las herramientas y recursos profesionales.",
    toolsCounter: (n) => `Has usado ${n} de ${FREEMIUM_LIMIT} herramientas gratuitas`,
    resourcesCounter: (n) => `Has descargado ${n} de ${FREEMIUM_LIMIT} recursos gratuitos`,
    name: "Nombre",
    email: "Email profesional",
    restaurant: "Restaurante",
    phone: "Teléfono",
    phoneOpt: "(opcional)",
    upload: "Subir carta de vinos (PDF/imagen)",
    uploadHint: "PDF, JPG o PNG · máx. 10 MB",
    uploadRequired: "Sube tu carta de vinos para continuar",
    uploadError: "Formato no válido. Sube un PDF, JPG o PNG (máx. 10 MB).",
    cta: "Desbloquear acceso completo",
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
    title: "You've reached the free limit",
    subtitle: "Upload your wine list to unlock unlimited access to all professional tools and resources.",
    toolsCounter: (n) => `You've used ${n} of ${FREEMIUM_LIMIT} free tools`,
    resourcesCounter: (n) => `You've downloaded ${n} of ${FREEMIUM_LIMIT} free resources`,
    name: "Name",
    email: "Work email",
    restaurant: "Restaurant",
    phone: "Phone",
    phoneOpt: "(optional)",
    upload: "Upload wine list (PDF/image)",
    uploadHint: "PDF, JPG or PNG · max 10 MB",
    uploadRequired: "Upload your wine list to continue",
    uploadError: "Invalid format. Upload a PDF, JPG or PNG (max 10 MB).",
    cta: "Unlock full access",
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
    title: "Atingiu o limite gratuito",
    subtitle: "Envie a sua carta de vinhos para desbloquear acesso ilimitado a todas as ferramentas e recursos profissionais.",
    toolsCounter: (n) => `Já usou ${n} de ${FREEMIUM_LIMIT} ferramentas gratuitas`,
    resourcesCounter: (n) => `Já descarregou ${n} de ${FREEMIUM_LIMIT} recursos gratuitos`,
    name: "Nome",
    email: "Email profissional",
    restaurant: "Restaurante",
    phone: "Telefone",
    phoneOpt: "(opcional)",
    upload: "Enviar carta de vinhos (PDF/imagem)",
    uploadHint: "PDF, JPG ou PNG · máx. 10 MB",
    uploadRequired: "Envie a sua carta de vinhos para continuar",
    uploadError: "Formato inválido. Envie PDF, JPG ou PNG (máx. 10 MB).",
    cta: "Desbloquear acesso completo",
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
    title: "Vous avez atteint la limite gratuite",
    subtitle: "Téléversez votre carte des vins pour débloquer un accès illimité à tous les outils et ressources professionnels.",
    toolsCounter: (n) => `Vous avez utilisé ${n} sur ${FREEMIUM_LIMIT} outils gratuits`,
    resourcesCounter: (n) => `Vous avez téléchargé ${n} sur ${FREEMIUM_LIMIT} ressources gratuites`,
    name: "Nom",
    email: "Email professionnel",
    restaurant: "Restaurant",
    phone: "Téléphone",
    phoneOpt: "(facultatif)",
    upload: "Téléverser la carte des vins (PDF/image)",
    uploadHint: "PDF, JPG ou PNG · max 10 Mo",
    uploadRequired: "Téléversez votre carte des vins pour continuer",
    uploadError: "Format invalide. Envoyez un PDF, JPG ou PNG (max 10 Mo).",
    cta: "Débloquer l'accès complet",
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
    title: "Hai raggiunto il limite gratuito",
    subtitle: "Carica la tua carta dei vini per sbloccare l'accesso illimitato a tutti gli strumenti e risorse professionali.",
    toolsCounter: (n) => `Hai utilizzato ${n} di ${FREEMIUM_LIMIT} strumenti gratuiti`,
    resourcesCounter: (n) => `Hai scaricato ${n} di ${FREEMIUM_LIMIT} risorse gratuite`,
    name: "Nome",
    email: "Email professionale",
    restaurant: "Ristorante",
    phone: "Telefono",
    phoneOpt: "(facoltativo)",
    upload: "Carica la carta dei vini (PDF/immagine)",
    uploadHint: "PDF, JPG o PNG · max 10 MB",
    uploadRequired: "Carica la tua carta dei vini per continuare",
    uploadError: "Formato non valido. Carica PDF, JPG o PNG (max 10 MB).",
    cta: "Sblocca accesso completo",
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
    title: "Sie haben das kostenlose Limit erreicht",
    subtitle: "Laden Sie Ihre Weinkarte hoch, um unbegrenzten Zugang zu allen professionellen Tools und Ressourcen freizuschalten.",
    toolsCounter: (n) => `Sie haben ${n} von ${FREEMIUM_LIMIT} kostenlosen Tools genutzt`,
    resourcesCounter: (n) => `Sie haben ${n} von ${FREEMIUM_LIMIT} kostenlosen Ressourcen heruntergeladen`,
    name: "Name",
    email: "Geschäftliche E-Mail",
    restaurant: "Restaurant",
    phone: "Telefon",
    phoneOpt: "(optional)",
    upload: "Weinkarte hochladen (PDF/Bild)",
    uploadHint: "PDF, JPG oder PNG · max. 10 MB",
    uploadRequired: "Laden Sie Ihre Weinkarte hoch, um fortzufahren",
    uploadError: "Ungültiges Format. Laden Sie PDF, JPG oder PNG hoch (max. 10 MB).",
    cta: "Vollen Zugang freischalten",
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
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (!f) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(f.type) || f.size > MAX_BYTES) {
      toast({ title: t.errorTitle, description: t.uploadError, variant: "destructive" });
      e.target.value = "";
      setFile(null);
      return;
    }
    setFile(f);
    setFileError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    if (!file) {
      setFileError(true);
      toast({ title: t.errorTitle, description: t.uploadRequired, variant: "destructive" });
      return;
    }

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
      // Upload required carta
      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const path = `${new Date().toISOString().slice(0, 10)}/${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("cartas-vinos")
        .upload(path, file, { contentType: file.type, upsert: false });
      let carta_url: string | null = null;
      if (!upErr) {
        const { data } = supabase.storage.from("cartas-vinos").getPublicUrl(path);
        carta_url = data.publicUrl;
      } else {
        console.error("Upload error:", upErr);
      }

      const { error } = await supabase.from("contact_leads").insert({
        name,
        email,
        restaurant,
        phone,
        carta_url,
        form_type: "freemium_gate",
      });
      if (error) throw error;

      notifyLead({
        name,
        email,
        restaurant,
        phone,
        carta_url,
        menu_link: carta_url,
        form_type: "freemium_gate",
      });

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
              {t.phone} <span className="text-muted-foreground/60">{t.phoneOpt}</span>
            </label>
            <PhoneInput native required={false} />
          </div>

          <div>
            <label
              htmlFor="gate_carta"
              className={`flex items-center justify-center gap-2 w-full h-11 rounded-md border-2 border-dashed px-3 text-sm font-medium cursor-pointer transition-colors ${
                file
                  ? "border-wine/50 bg-wine/10 text-wine-light"
                  : fileError
                    ? "border-destructive/60 bg-destructive/5 text-destructive"
                    : "border-wine/40 bg-wine/5 hover:bg-wine/10 text-wine-light"
              }`}
            >
              {file ? (
                <>
                  <FileCheck2 size={16} />
                  <span className="truncate max-w-[80%]">{file.name}</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>{t.upload} *</span>
                </>
              )}
            </label>
            <input
              id="gate_carta"
              name="carta"
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={onFileChange}
              className="sr-only"
            />
            <p className={`text-[10px] mt-1 ${fileError ? "text-destructive" : "text-muted-foreground/60"}`}>
              {fileError ? t.uploadRequired : t.uploadHint}
            </p>
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