import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

/* ── Content per form_type ── */
interface ThankYouContent {
  title: string;
  subtitle: string;
  steps: string[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const CONTENT: Record<string, ThankYouContent> = {
  demo: {
    title: "¡Solicitud de demo recibida!",
    subtitle: "Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para agendar tu demostración personalizada.",
    steps: [
      "Revisamos tu perfil y carta de vinos",
      "Te contactamos para agendar la demo",
      "Te mostramos Winerim en acción con datos reales",
    ],
    cta: { label: "Explorar funcionalidades", href: "/funcionalidades" },
    secondaryCta: { label: "Ver casos de éxito", href: "/casos-exito" },
  },
  contacto: {
    title: "¡Mensaje recibido!",
    subtitle: "Hemos recibido tu consulta. Te responderemos en menos de 24 horas.",
    steps: [
      "Tu mensaje ha sido registrado",
      "Un especialista revisará tu consulta",
      "Recibirás respuesta por email o teléfono",
    ],
    cta: { label: "Mientras, explora Winerim", href: "/que-es-winerim" },
  },
  "analisis-carta": {
    title: "¡Carta recibida para análisis!",
    subtitle: "Nuestro equipo ya está trabajando en tu análisis personalizado. Recibirás el informe en menos de 48 horas.",
    steps: [
      "Analizamos estructura, precios y variedad",
      "Identificamos oportunidades de mejora",
      "Te enviamos un informe con recomendaciones concretas",
    ],
    cta: { label: "Descubre nuestras herramientas", href: "/herramientas" },
    secondaryCta: { label: "Ver precios", href: "/precios" },
  },
  resource: {
    title: "¡Recurso descargado!",
    subtitle: "La descarga ha comenzado automáticamente. También recibirás un email de confirmación con el enlace de acceso.",
    steps: [
      "Tu recurso se está descargando",
      "Revisa tu email para acceder de nuevo cuando quieras",
      "Explora más herramientas gratuitas de Winerim",
    ],
    cta: { label: "Ver más recursos", href: "/guias-y-recursos" },
    secondaryCta: { label: "Probar herramientas", href: "/herramientas" },
  },
};

const DEFAULT_CONTENT: ThankYouContent = {
  title: "¡Recibido correctamente!",
  subtitle: "Hemos registrado tu solicitud. Te contactaremos lo antes posible.",
  steps: [
    "Tu solicitud ha sido registrada",
    "Nuestro equipo la revisará",
    "Te contactaremos en breve",
  ],
  cta: { label: "Volver al inicio", href: "/" },
};

const Gracias = () => {
  const [params] = useSearchParams();
  const formType = params.get("tipo") || "default";

  // Map resource form_types to the generic resource content
  const isResource = formType.startsWith("plantilla-") || formType.startsWith("checklist-") || formType.startsWith("scorecard-") || formType.startsWith("guia-") || formType.startsWith("revision-");
  const c = CONTENT[formType] || (isResource ? CONTENT.resource : DEFAULT_CONTENT);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title="Gracias | Winerim" description="Tu solicitud ha sido recibida correctamente." noindex />

      <main className="pt-32 pb-24 section-padding">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8"
          >
            <CheckCircle className="w-10 h-10 text-accent" />
          </motion.div>

          {/* Title */}
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

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-8 mb-10 text-left"
          >
            <h2 className="font-heading text-lg font-semibold mb-6">Próximos pasos</h2>
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

          {/* CTAs */}
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

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-border pt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">¿Necesitas algo urgente?</p>
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
