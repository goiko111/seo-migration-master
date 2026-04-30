import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
const YouTubeFacade = lazy(() => import("@/components/YouTubeFacade"));
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContactFormFields from "@/components/ContactFormFields";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";
import { trackFormConversion } from "@/utils/trackConversion";
import { trackFormSubmit } from "@/hooks/useIntentTracker";
import { ads } from "@/lib/analytics";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seo_title: string; seo_desc: string; breadcrumb: string;
  title: string; highlight: string; subtitle: string;
  form_title: string;
  name: string; position: string; email: string; phone: string;
  restaurant: string; city: string; references: string; menu_link: string; message: string;
  button: string; sending: string;
  problems_title: string; problems: string[];
  success: string; error: string;
}> = {
  es: {
    seo_title: "Contacto", seo_desc: "Contacta con Winerim. Analizamos tu carta de vinos gratis y te ayudamos a optimizarla.", breadcrumb: "Contacto",
    title: "¿Quieres optimizar tus ventas", highlight: "de vino?",
    subtitle: "Analizamos tu carta de manera completamente gratuita. Te mostramos oportunidades reales de mejora en margen, rotación y surtido.",
    form_title: "Analizamos tu carta gratis",
    name: "Nombre", position: "Cargo en el restaurante", email: "Email", phone: "Teléfono",
    restaurant: "Restaurante", city: "Ciudad", references: "Número de referencias", menu_link: "Link a tu carta", message: "Mensaje (¿Qué aspectos deseas mejorar?)",
    button: "Enviar solicitud", sending: "Enviando...",
    problems_title: "¿Tienes alguno de estos problemas?",
    problems: ["Siempre vendes los mismos vinos", "Tu equipo de sala no llega", "Tienes vinos estancados", "Te falta variedad", "Gestión en tiempo real"],
    success: "¡Solicitud enviada! Te contactaremos pronto.", error: "Error al enviar. Inténtalo de nuevo.",
  },
  en: {
    seo_title: "Contact", seo_desc: "Contact Winerim. We analyze your wine list for free and help you optimize it.", breadcrumb: "Contact",
    title: "Want to optimize your wine", highlight: "sales?",
    subtitle: "We analyze your wine list completely free. We show you real opportunities to improve margin, rotation and assortment.",
    form_title: "Free wine list analysis",
    name: "Name", position: "Position at restaurant", email: "Email", phone: "Phone",
    restaurant: "Restaurant", city: "City", references: "Number of references", menu_link: "Link to your wine list", message: "Message (What would you like to improve?)",
    button: "Send request", sending: "Sending...",
    problems_title: "Do you have any of these challenges?",
    problems: ["Always selling the same wines", "Your floor staff can't keep up", "Wines sitting without rotation", "Lacking variety", "Real-time management"],
    success: "Request sent! We'll contact you soon.", error: "Error sending. Please try again.",
  },
  it: {
    seo_title: "Contatto", seo_desc: "Contatta Winerim. Analizziamo la tua carta dei vini gratuitamente.", breadcrumb: "Contatto",
    title: "Vuoi ottimizzare le vendite", highlight: "di vino?",
    subtitle: "Analizziamo la tua carta completamente gratis. Ti mostriamo opportunità reali di miglioramento.",
    form_title: "Analizziamo la tua carta gratis",
    name: "Nome", position: "Ruolo nel ristorante", email: "Email", phone: "Telefono",
    restaurant: "Ristorante", city: "Città", references: "Numero di referenze", menu_link: "Link alla tua carta", message: "Messaggio (Cosa vorresti migliorare?)",
    button: "Invia richiesta", sending: "Invio...",
    problems_title: "Hai qualcuno di questi problemi?",
    problems: ["Vendi sempre gli stessi vini", "Il tuo staff non riesce a consigliare", "Vini fermi senza rotazione", "Mancanza di varietà", "Gestione in tempo reale"],
    success: "Richiesta inviata! Ti contatteremo presto.", error: "Errore nell'invio. Riprova.",
  },
  fr: {
    seo_title: "Contact", seo_desc: "Contactez Winerim. Nous analysons votre carte des vins gratuitement.", breadcrumb: "Contact",
    title: "Vous voulez optimiser vos ventes", highlight: "de vin ?",
    subtitle: "Nous analysons votre carte gratuitement. Nous vous montrons des opportunités réelles d'amélioration.",
    form_title: "Analyse gratuite de votre carte",
    name: "Nom", position: "Poste au restaurant", email: "Email", phone: "Téléphone",
    restaurant: "Restaurant", city: "Ville", references: "Nombre de références", menu_link: "Lien vers votre carte", message: "Message (Que souhaitez-vous améliorer ?)",
    button: "Envoyer la demande", sending: "Envoi...",
    problems_title: "Avez-vous l'un de ces défis ?",
    problems: ["Vous vendez toujours les mêmes vins", "Votre équipe en salle ne suit pas", "Des vins stagnants", "Manque de variété", "Gestion en temps réel"],
    success: "Demande envoyée ! Nous vous contacterons bientôt.", error: "Erreur d'envoi. Veuillez réessayer.",
  },
  de: {
    seo_title: "Kontakt", seo_desc: "Kontaktieren Sie Winerim. Wir analysieren Ihre Weinkarte kostenlos und helfen Ihnen, sie zu optimieren.", breadcrumb: "Kontakt",
    title: "Möchten Sie Ihren Weinumsatz", highlight: "optimieren?",
    subtitle: "Wir analysieren Ihre Weinkarte völlig kostenlos. Wir zeigen Ihnen echte Chancen zur Verbesserung von Marge, Rotation und Sortiment.",
    form_title: "Kostenlose Weinkartenanalyse",
    name: "Name", position: "Position im Restaurant", email: "E-Mail", phone: "Telefon",
    restaurant: "Restaurant", city: "Stadt", references: "Anzahl der Referenzen", menu_link: "Link zu Ihrer Weinkarte", message: "Nachricht (Was möchten Sie verbessern?)",
    button: "Anfrage senden", sending: "Wird gesendet...",
    problems_title: "Haben Sie eine dieser Herausforderungen?",
    problems: ["Sie verkaufen immer die gleichen Weine", "Ihr Serviceteam kommt nicht hinterher", "Weine bleiben liegen", "Zu wenig Vielfalt", "Verwaltung in Echtzeit"],
    success: "Anfrage gesendet! Wir melden uns in Kürze.", error: "Fehler beim Senden. Bitte erneut versuchen.",
  },
  pt: {
    seo_title: "Contacto", seo_desc: "Contacte a Winerim. Analisamos a sua carta de vinhos gratuitamente e ajudamos a otimizá-la.", breadcrumb: "Contacto",
    title: "Quer otimizar as suas vendas", highlight: "de vinho?",
    subtitle: "Analisamos a sua carta de forma completamente gratuita. Mostramos oportunidades reais de melhoria em margem, rotação e sortido.",
    form_title: "Análise gratuita da sua carta",
    name: "Nome", position: "Cargo no restaurante", email: "Email", phone: "Telefone",
    restaurant: "Restaurante", city: "Cidade", references: "Número de referências", menu_link: "Link para a sua carta", message: "Mensagem (O que gostaria de melhorar?)",
    button: "Enviar pedido", sending: "A enviar...",
    problems_title: "Tem algum destes problemas?",
    problems: ["Vende sempre os mesmos vinhos", "A sua equipa de sala não chega", "Tem vinhos parados", "Falta-lhe variedade", "Gestão em tempo real"],
    success: "Pedido enviado! Entraremos em contacto em breve.", error: "Erro ao enviar. Tente novamente.",
  },
};

const Contacto = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { lang, allLangPaths } = useLanguage();
  const c = content[lang] || content.es;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const leadData = {
      form_type: "contacto",
      restaurant: (fd.get("restaurant") as string)?.trim() || null,
      name: (fd.get("name") as string)?.trim() || null,
      position: (fd.get("position") as string)?.trim() || null,
      phone: (fd.get("phone") as string)?.trim() || null,
      email: (fd.get("email") as string)?.trim() || null,
      city: (fd.get("city") as string)?.trim() || null,
      references_count: (fd.get("references_count") as string)?.trim() || null,
      message: (fd.get("message") as string)?.trim() || null,
    };
    const { error } = await supabase.from("contact_leads").insert(leadData);
    if (error) toast.error(c.error);
    else {
      notifyLead(leadData);
      trackFormSubmit("contact");
      ads.conversion("contact", {
        email: leadData.email || undefined,
        phone: leadData.phone || undefined,
        first_name: leadData.name?.split(" ")[0] || undefined,
        last_name: leadData.name?.split(" ").slice(1).join(" ") || undefined,
        city: leadData.city || undefined,
      });
      trackFormConversion("contact");
      navigate("/gracias?tipo=contacto");
      return;
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/contacto" hreflang={allLangPaths("/contacto")} />
      <main>
        <section className="pt-32 pb-16 section-padding text-center">
          <div className="max-w-2xl mx-auto"><Breadcrumbs items={[{ label: c.breadcrumb }]} /></div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {c.title}{" "}<span className="text-gradient-wine">{c.highlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">{c.subtitle}</motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid lg:grid-cols-5 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-bold mb-8">{c.form_title}</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <ContactFormFields native variant="contact" />
                <Textarea name="message" placeholder={c.message} className="bg-card border-border min-h-[120px]" />
                <Button type="submit" disabled={submitting} className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity w-full md:w-auto">
                  {submitting ? c.sending : c.button}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  {{ es: "Sin compromiso. Al enviar aceptas nuestra ", en: "No commitment. By submitting you accept our ", it: "Senza impegno. Inviando accetti la nostra ", fr: "Sans engagement. En envoyant vous acceptez notre ", de: "Unverbindlich. Mit dem Absenden akzeptieren Sie unsere ", pt: "Sem compromisso. Ao enviar aceita a nossa " }[lang]}
                  <Link to="/privacidad" className="underline hover:text-foreground transition-colors">
                    {{ es: "política de privacidad", en: "privacy policy", it: "informativa sulla privacy", fr: "politique de confidentialité", de: "Datenschutzrichtlinie", pt: "política de privacidade" }[lang]}
                  </Link>.
                </p>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">{c.problems_title}</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  {c.problems.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href="mailto:info@winerim.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">info@winerim.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <a href="https://wa.me/34623165179" className="text-sm text-muted-foreground hover:text-foreground transition-colors">+34 623 165 179</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{lang === "es" ? "Llamadas" : lang === "it" ? "Chiamate" : lang === "fr" ? "Appels" : lang === "de" ? "Anrufe" : lang === "pt" ? "Chamadas" : "Calls"}</p>
                    <a href="tel:+34722180348" className="text-sm text-muted-foreground hover:text-foreground transition-colors">+34 722 180 348</a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-heading text-lg font-semibold mb-4">Winerim {lang === "es" ? "en un minuto" : lang === "en" ? "in one minute" : lang === "it" ? "in un minuto" : lang === "de" ? "in einer Minute" : lang === "pt" ? "num minuto" : "en une minute"}</h3>
                <div className="rounded-xl overflow-hidden border border-border">
                  <Suspense fallback={<div className="aspect-video bg-muted rounded-xl" />}>
                    <YouTubeFacade videoId="-PleM286zeY" title="Winerim en un minuto" />
                  </Suspense>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;
