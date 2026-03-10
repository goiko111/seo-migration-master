import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";
import ContactFormFields from "@/components/ContactFormFields";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seo_title: string; seo_desc: string; breadcrumb: string; label: string;
  title: string; highlight: string; subtitle: string;
  benefits: string[]; form_title: string;
  name: string; email: string; phone: string; restaurant: string; city: string;
  button: string; sending: string; disclaimer: string;
  success: string; error: string;
}> = {
  es: {
    seo_title: "Demo Gratuita", seo_desc: "Solicita una demostración personalizada de Winerim y descubre cómo aumentar tus ventas de vino.", breadcrumb: "Demo gratuita", label: "Prueba gratuita",
    title: "Descubre cómo Winerim", highlight: "transforma tu carta de vinos",
    subtitle: "Solicita una demostración personalizada y comprueba cómo puedes aumentar tus ventas de vino en más de un 30%.",
    benefits: ["Configuración en menos de 24 horas", "Sin compromiso de permanencia", "Soporte técnico incluido", "Análisis gratuito de tu carta"],
    form_title: "Solicita tu demo gratuita",
    name: "Nombre completo", email: "Email", phone: "Teléfono", restaurant: "Nombre del restaurante", city: "Ciudad",
    button: "Solicitar demo", sending: "Enviando...", disclaimer: "Al enviar aceptas nuestra política de privacidad.",
    success: "¡Solicitud recibida! Te contactaremos pronto.", error: "Error al enviar. Inténtalo de nuevo.",
  },
  en: {
    seo_title: "Free Demo", seo_desc: "Request a personalized Winerim demo and discover how to increase your wine sales.", breadcrumb: "Free demo", label: "Free trial",
    title: "Discover how Winerim", highlight: "transforms your wine list",
    subtitle: "Request a personalized demo and see how you can increase your wine sales by over 30%.",
    benefits: ["Setup in under 24 hours", "No commitment required", "Technical support included", "Free wine list analysis"],
    form_title: "Request your free demo",
    name: "Full name", email: "Email", phone: "Phone", restaurant: "Restaurant name", city: "City",
    button: "Request demo", sending: "Sending...", disclaimer: "By submitting you accept our privacy policy.",
    success: "Request received! We'll contact you soon.", error: "Error sending. Please try again.",
  },
  it: {
    seo_title: "Demo Gratuita", seo_desc: "Richiedi una demo personalizzata di Winerim e scopri come aumentare le vendite di vino.", breadcrumb: "Demo gratuita", label: "Prova gratuita",
    title: "Scopri come Winerim", highlight: "trasforma la tua carta dei vini",
    subtitle: "Richiedi una demo personalizzata e scopri come puoi aumentare le vendite di vino di oltre il 30%.",
    benefits: ["Configurazione in meno di 24 ore", "Senza impegno", "Supporto tecnico incluso", "Analisi gratuita della tua carta"],
    form_title: "Richiedi la tua demo gratuita",
    name: "Nome completo", email: "Email", phone: "Telefono", restaurant: "Nome del ristorante", city: "Città",
    button: "Richiedi demo", sending: "Invio...", disclaimer: "Inviando accetti la nostra privacy policy.",
    success: "Richiesta ricevuta! Ti contatteremo presto.", error: "Errore nell'invio. Riprova.",
  },
  fr: {
    seo_title: "Démo Gratuite", seo_desc: "Demandez une démo personnalisée de Winerim et découvrez comment augmenter vos ventes de vin.", breadcrumb: "Démo gratuite", label: "Essai gratuit",
    title: "Découvrez comment Winerim", highlight: "transforme votre carte des vins",
    subtitle: "Demandez une démo personnalisée et découvrez comment augmenter vos ventes de vin de plus de 30%.",
    benefits: ["Configuration en moins de 24 heures", "Sans engagement", "Support technique inclus", "Analyse gratuite de votre carte"],
    form_title: "Demandez votre démo gratuite",
    name: "Nom complet", email: "Email", phone: "Téléphone", restaurant: "Nom du restaurant", city: "Ville",
    button: "Demander démo", sending: "Envoi...", disclaimer: "En envoyant vous acceptez notre politique de confidentialité.",
    success: "Demande reçue ! Nous vous contacterons bientôt.", error: "Erreur d'envoi. Veuillez réessayer.",
  },
};

const Demo = () => {
  const [submitting, setSubmitting] = useState(false);
  const { lang, allLangPaths, localePath } = useLanguage();
  const c = content[lang] || content.es;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const leadData = {
      form_type: "demo",
      restaurant: fd.get("restaurant") as string || null,
      name: fd.get("name") as string || null,
      position: fd.get("position") as string || null,
      phone: fd.get("phone") as string || null,
      email: fd.get("email") as string || null,
      city: fd.get("city") as string || null,
      references_count: fd.get("references_count") as string || null,
    };
    const { error } = await supabase.from("contact_leads").insert(leadData);
    if (error) toast.error(c.error);
    else {
      toast.success(c.success);
      (e.target as HTMLFormElement).reset();
      notifyLead(leadData);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/demo" hreflang={allLangPaths("/demo")} />
      <main>
        <section className="pt-32 pb-24 section-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Breadcrumbs items={[{ label: c.breadcrumb }]} />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">{c.label}</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {c.title}{" "}<span className="text-gradient-wine">{c.highlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{c.subtitle}</p>
              <ul className="space-y-3">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-accent shrink-0" /><span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="bg-gradient-card border border-border rounded-2xl p-8 md:p-10">
              <h2 className="font-heading text-2xl font-bold mb-6">{c.form_title}</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <ContactFormFields native />
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-wine text-primary-foreground py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
                  {submitting ? c.sending : c.button}
                </Button>
                <p className="text-xs text-muted-foreground text-center">{c.disclaimer}</p>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: lang === "es" ? "Software carta de vinos" : "Wine list software", type: "solution" },
        { to: localePath("/precios"), label: lang === "es" ? "Planes y precios" : "Plans & pricing", type: "resource" },
        { to: localePath("/casos-exito"), label: lang === "es" ? "Casos de éxito" : "Case studies", type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default Demo;
