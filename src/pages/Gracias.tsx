import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

/* ── Content per form_type ── */
interface ThankYouContent {
  title: string;
  subtitle: string;
  steps: string[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

interface PageChrome {
  seoTitle: string;
  seoDesc: string;
  nextSteps: string;
  urgent: string;
}

const CHROME: I18nMap<PageChrome> = {
  es: { seoTitle: "Gracias | Winerim", seoDesc: "Tu solicitud ha sido recibida correctamente.", nextSteps: "Próximos pasos", urgent: "¿Necesitas algo urgente?" },
  en: { seoTitle: "Thank You | Winerim", seoDesc: "Your request has been received successfully.", nextSteps: "Next steps", urgent: "Need something urgently?" },
  it: { seoTitle: "Grazie | Winerim", seoDesc: "La tua richiesta è stata ricevuta correttamente.", nextSteps: "Prossimi passi", urgent: "Hai bisogno di qualcosa di urgente?" },
  fr: { seoTitle: "Merci | Winerim", seoDesc: "Votre demande a bien été reçue.", nextSteps: "Prochaines étapes", urgent: "Besoin de quelque chose d'urgent ?" },
};

const CONTENT: I18nMap<Record<string, ThankYouContent>> = {
  es: {
    demo: {
      title: "¡Solicitud de demo recibida!",
      subtitle: "Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para agendar tu demostración personalizada.",
      steps: ["Revisamos tu perfil y carta de vinos", "Te contactamos para agendar la demo", "Te mostramos Winerim en acción con datos reales"],
      cta: { label: "Explorar funcionalidades", href: "/funcionalidades" },
      secondaryCta: { label: "Ver casos de éxito", href: "/casos-exito" },
    },
    contacto: {
      title: "¡Mensaje recibido!",
      subtitle: "Hemos recibido tu consulta. Te responderemos en menos de 24 horas.",
      steps: ["Tu mensaje ha sido registrado", "Un especialista revisará tu consulta", "Recibirás respuesta por email o teléfono"],
      cta: { label: "Mientras, explora Winerim", href: "/que-es-winerim" },
    },
    "analisis-carta": {
      title: "¡Carta recibida para análisis!",
      subtitle: "Nuestro equipo ya está trabajando en tu análisis personalizado. Recibirás el informe en menos de 48 horas.",
      steps: ["Analizamos estructura, precios y variedad", "Identificamos oportunidades de mejora", "Te enviamos un informe con recomendaciones concretas"],
      cta: { label: "Descubre nuestras herramientas", href: "/herramientas" },
      secondaryCta: { label: "Ver precios", href: "/precios" },
    },
    resource: {
      title: "¡Recurso descargado!",
      subtitle: "La descarga ha comenzado automáticamente. También recibirás un email de confirmación con el enlace de acceso.",
      steps: ["Tu recurso se está descargando", "Revisa tu email para acceder de nuevo cuando quieras", "Explora más herramientas gratuitas de Winerim"],
      cta: { label: "Ver más recursos", href: "/guias-y-recursos" },
      secondaryCta: { label: "Probar herramientas", href: "/herramientas" },
    },
    default: {
      title: "¡Recibido correctamente!",
      subtitle: "Hemos registrado tu solicitud. Te contactaremos lo antes posible.",
      steps: ["Tu solicitud ha sido registrada", "Nuestro equipo la revisará", "Te contactaremos en breve"],
      cta: { label: "Volver al inicio", href: "/" },
    },
  },
  en: {
    demo: {
      title: "Demo request received!",
      subtitle: "Our team will contact you within 24 hours to schedule your personalised demonstration.",
      steps: ["We review your profile and wine list", "We contact you to schedule the demo", "We show you Winerim in action with real data"],
      cta: { label: "Explore features", href: "/en/features" },
      secondaryCta: { label: "See case studies", href: "/en/case-studies" },
    },
    contacto: {
      title: "Message received!",
      subtitle: "We've received your enquiry. We'll get back to you within 24 hours.",
      steps: ["Your message has been logged", "A specialist will review your enquiry", "You'll receive a reply by email or phone"],
      cta: { label: "Meanwhile, explore Winerim", href: "/en/what-is-winerim" },
    },
    "analisis-carta": {
      title: "Wine list received for analysis!",
      subtitle: "Our team is already working on your personalised analysis. You'll receive the report within 48 hours.",
      steps: ["We analyse structure, pricing and variety", "We identify improvement opportunities", "We send you a report with specific recommendations"],
      cta: { label: "Discover our tools", href: "/en/tools" },
      secondaryCta: { label: "See pricing", href: "/en/pricing" },
    },
    resource: {
      title: "Resource downloaded!",
      subtitle: "The download has started automatically. You'll also receive a confirmation email with the access link.",
      steps: ["Your resource is downloading", "Check your email to access it again anytime", "Explore more free Winerim tools"],
      cta: { label: "See more resources", href: "/en/guides" },
      secondaryCta: { label: "Try tools", href: "/en/tools" },
    },
    default: {
      title: "Successfully received!",
      subtitle: "We've logged your request. We'll contact you as soon as possible.",
      steps: ["Your request has been logged", "Our team will review it", "We'll contact you shortly"],
      cta: { label: "Back to home", href: "/en" },
    },
  },
  it: {
    demo: {
      title: "Richiesta di demo ricevuta!",
      subtitle: "Il nostro team ti contatterà entro 24 ore per programmare la tua dimostrazione personalizzata.",
      steps: ["Esaminiamo il tuo profilo e la carta dei vini", "Ti contattiamo per fissare la demo", "Ti mostriamo Winerim in azione con dati reali"],
      cta: { label: "Esplora le funzionalità", href: "/it/funzionalita" },
      secondaryCta: { label: "Vedi casi di successo", href: "/it/casi-di-successo" },
    },
    contacto: {
      title: "Messaggio ricevuto!",
      subtitle: "Abbiamo ricevuto la tua richiesta. Ti risponderemo entro 24 ore.",
      steps: ["Il tuo messaggio è stato registrato", "Uno specialista esaminerà la tua richiesta", "Riceverai risposta via email o telefono"],
      cta: { label: "Intanto, scopri Winerim", href: "/it/cose-winerim" },
    },
    "analisis-carta": {
      title: "Carta dei vini ricevuta per l'analisi!",
      subtitle: "Il nostro team sta già lavorando alla tua analisi personalizzata. Riceverai il report entro 48 ore.",
      steps: ["Analizziamo struttura, prezzi e varietà", "Identifichiamo opportunità di miglioramento", "Ti inviamo un report con raccomandazioni concrete"],
      cta: { label: "Scopri i nostri strumenti", href: "/it/strumenti" },
      secondaryCta: { label: "Vedi prezzi", href: "/it/prezzi" },
    },
    resource: {
      title: "Risorsa scaricata!",
      subtitle: "Il download è iniziato automaticamente. Riceverai anche un'email di conferma con il link di accesso.",
      steps: ["La tua risorsa si sta scaricando", "Controlla la tua email per accedervi quando vuoi", "Esplora altri strumenti gratuiti di Winerim"],
      cta: { label: "Vedi più risorse", href: "/it/guide" },
      secondaryCta: { label: "Prova gli strumenti", href: "/it/strumenti" },
    },
    default: {
      title: "Ricevuto correttamente!",
      subtitle: "Abbiamo registrato la tua richiesta. Ti contatteremo il prima possibile.",
      steps: ["La tua richiesta è stata registrata", "Il nostro team la esaminerà", "Ti contatteremo a breve"],
      cta: { label: "Torna alla home", href: "/it" },
    },
  },
  fr: {
    demo: {
      title: "Demande de démo reçue !",
      subtitle: "Notre équipe vous contactera dans les 24 heures pour planifier votre démonstration personnalisée.",
      steps: ["Nous examinons votre profil et votre carte des vins", "Nous vous contactons pour planifier la démo", "Nous vous montrons Winerim en action avec des données réelles"],
      cta: { label: "Explorer les fonctionnalités", href: "/fr/fonctionnalites" },
      secondaryCta: { label: "Voir les cas clients", href: "/fr/cas-clients" },
    },
    contacto: {
      title: "Message reçu !",
      subtitle: "Nous avons reçu votre demande. Nous vous répondrons dans les 24 heures.",
      steps: ["Votre message a été enregistré", "Un spécialiste examinera votre demande", "Vous recevrez une réponse par email ou téléphone"],
      cta: { label: "En attendant, découvrez Winerim", href: "/fr/quest-ce-que-winerim" },
    },
    "analisis-carta": {
      title: "Carte des vins reçue pour analyse !",
      subtitle: "Notre équipe travaille déjà sur votre analyse personnalisée. Vous recevrez le rapport dans les 48 heures.",
      steps: ["Nous analysons structure, prix et variété", "Nous identifions les opportunités d'amélioration", "Nous vous envoyons un rapport avec des recommandations concrètes"],
      cta: { label: "Découvrez nos outils", href: "/fr/outils" },
      secondaryCta: { label: "Voir les tarifs", href: "/fr/tarifs" },
    },
    resource: {
      title: "Ressource téléchargée !",
      subtitle: "Le téléchargement a commencé automatiquement. Vous recevrez également un email de confirmation avec le lien d'accès.",
      steps: ["Votre ressource est en cours de téléchargement", "Vérifiez votre email pour y accéder à nouveau", "Explorez d'autres outils gratuits Winerim"],
      cta: { label: "Voir plus de ressources", href: "/fr/guides" },
      secondaryCta: { label: "Essayer les outils", href: "/fr/outils" },
    },
    default: {
      title: "Bien reçu !",
      subtitle: "Nous avons enregistré votre demande. Nous vous contacterons dès que possible.",
      steps: ["Votre demande a été enregistrée", "Notre équipe l'examinera", "Nous vous contacterons sous peu"],
      cta: { label: "Retour à l'accueil", href: "/fr" },
    },
  },
};

const Gracias = () => {
  const [params] = useSearchParams();
  const { lang } = useLanguage();
  const chrome = CHROME[lang];
  const formType = params.get("tipo") || "default";

  const langContent = CONTENT[lang];
  const isResource = formType.startsWith("plantilla-") || formType.startsWith("checklist-") || formType.startsWith("scorecard-") || formType.startsWith("guia-") || formType.startsWith("revision-");
  const c = langContent[formType] || (isResource ? langContent.resource : langContent.default);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={chrome.seoTitle} description={chrome.seoDesc} noindex />

      <main className="pt-32 pb-24 section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8"
          >
            <CheckCircle className="w-10 h-10 text-accent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
          >
            {c.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground mb-12"
          >
            {c.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-8 mb-10 text-left"
          >
            <h2 className="font-heading text-lg font-semibold mb-6">{chrome.nextSteps}</h2>
            <ol className="space-y-4">
              {c.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button asChild className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg">
              <Link to={c.cta.href}>
                {c.cta.label} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            {c.secondaryCta && (
              <Button asChild variant="outline" className="px-8 py-3 rounded-lg">
                <Link to={c.secondaryCta.href}>{c.secondaryCta.label}</Link>
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-border pt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">{chrome.urgent}</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="mailto:info@winerim.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> info@winerim.com
              </a>
              <a href="https://wa.me/34623165179" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="tel:+34722180348" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> +34 722 180 348
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gracias;
