import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { notifyLead } from "@/lib/notifyLead";
import { trackFormSubmit } from "@/hooks/useIntentTracker";
import ContactFormFields from "@/components/ContactFormFields";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import { useLanguage } from "@/i18n/LanguageContext";

const content: Record<string, {
  seo_title: string; seo_desc: string; breadcrumb: string; label: string;
  title: string; highlight: string; subtitle: string;
  benefits: string[]; form_title: string; form_subtitle: string;
  button: string; sending: string; disclaimer: string;
  success: string; error: string;
  trust_response: string; trust_no_commitment: string; trust_demo: string;
  what_next: string; step1: string; step2: string; step3: string;
  link_software: string; link_pricing: string; link_cases: string; link_analysis: string;
}> = {
  es: {
    seo_title: "Demo Gratuita | Winerim", seo_desc: "Solicita una demostración personalizada de Winerim y descubre cómo aumentar tus ventas de vino.", breadcrumb: "Demo gratuita", label: "Prueba gratuita",
    title: "Descubre cómo Winerim", highlight: "transforma tu carta de vinos",
    subtitle: "Solicita una demostración personalizada de 15 minutos. Te mostramos Winerim aplicado a tu caso concreto.",
    benefits: ["Demo adaptada a tu tipo de negocio", "Sin compromiso de permanencia", "Análisis gratuito de tu carta incluido", "Configuración en menos de 24 horas"],
    form_title: "Solicita tu demo personalizada",
    form_subtitle: "Cuanto más contexto nos des, mejor adaptaremos la demo a tu caso.",
    button: "Solicitar demo gratuita", sending: "Enviando...",
    disclaimer: "Sin compromiso. Al enviar aceptas nuestra política de privacidad.",
    success: "¡Solicitud recibida! Te contactaremos en menos de 24 h para agendar tu demo.", error: "Error al enviar. Inténtalo de nuevo.",
    trust_response: "Respuesta en 24 h", trust_no_commitment: "Sin compromiso", trust_demo: "Demo de 15 min",
    what_next: "¿Qué pasa después?",
    step1: "Te contactamos en menos de 24 h para agendar la demo.",
    step2: "Preparamos la demo con tu carta real (si la envías).",
    step3: "En 15 min ves Winerim aplicado a tu caso. Sin compromiso.",
    link_software: "Software carta de vinos", link_pricing: "Planes y precios", link_cases: "Casos de éxito", link_analysis: "Análisis gratuito de carta",
  },
  en: {
    seo_title: "Free Demo | Winerim", seo_desc: "Request a personalized Winerim demo and discover how to increase your wine sales.", breadcrumb: "Free demo", label: "Free trial",
    title: "Discover how Winerim", highlight: "transforms your wine list",
    subtitle: "Request a personalized 15-minute demo. We'll show you Winerim applied to your specific case.",
    benefits: ["Demo tailored to your business", "No commitment required", "Free wine list analysis included", "Setup in under 24 hours"],
    form_title: "Request your personalized demo",
    form_subtitle: "The more context you give us, the better we'll tailor the demo to your case.",
    button: "Request free demo", sending: "Sending...",
    disclaimer: "No commitment. By submitting you accept our privacy policy.",
    success: "Request received! We'll contact you within 24h to schedule your demo.", error: "Error sending. Please try again.",
    trust_response: "Response within 24h", trust_no_commitment: "No commitment", trust_demo: "15-min demo",
    what_next: "What happens next?",
    step1: "We contact you within 24h to schedule the demo.",
    step2: "We prepare the demo with your actual wine list (if you send it).",
    step3: "In 15 min you see Winerim applied to your case. No commitment.",
    link_software: "Wine list software", link_pricing: "Plans & pricing", link_cases: "Case studies", link_analysis: "Free wine list analysis",
  },
  it: {
    seo_title: "Demo Gratuita | Winerim", seo_desc: "Richiedi una demo personalizzata di Winerim e scopri come aumentare le vendite di vino.", breadcrumb: "Demo gratuita", label: "Prova gratuita",
    title: "Scopri come Winerim", highlight: "trasforma la tua carta dei vini",
    subtitle: "Richiedi una demo personalizzata di 15 minuti. Ti mostriamo Winerim applicato al tuo caso specifico.",
    benefits: ["Demo adattata al tuo business", "Senza impegno", "Analisi gratuita della carta inclusa", "Configurazione in meno di 24 ore"],
    form_title: "Richiedi la tua demo personalizzata",
    form_subtitle: "Più contesto ci dai, meglio adatteremo la demo al tuo caso.",
    button: "Richiedi demo gratuita", sending: "Invio...",
    disclaimer: "Senza impegno. Inviando accetti la nostra privacy policy.",
    success: "Richiesta ricevuta! Ti contatteremo entro 24 ore.", error: "Errore nell'invio. Riprova.",
    trust_response: "Risposta entro 24 h", trust_no_commitment: "Senza impegno", trust_demo: "Demo di 15 min",
    what_next: "Cosa succede dopo?",
    step1: "Ti contattiamo entro 24 h per fissare la demo.",
    step2: "Prepariamo la demo con la tua carta reale (se la invii).",
    step3: "In 15 min vedi Winerim applicato al tuo caso. Senza impegno.",
    link_software: "Software carta dei vini", link_pricing: "Piani e prezzi", link_cases: "Casi di successo", link_analysis: "Analisi gratuita della carta",
  },
  fr: {
    seo_title: "Démo Gratuite | Winerim", seo_desc: "Demandez une démo personnalisée de Winerim et découvrez comment augmenter vos ventes de vin.", breadcrumb: "Démo gratuite", label: "Essai gratuit",
    title: "Découvrez comment Winerim", highlight: "transforme votre carte des vins",
    subtitle: "Demandez une démo personnalisée de 15 minutes. Nous vous montrons Winerim appliqué à votre cas.",
    benefits: ["Démo adaptée à votre business", "Sans engagement", "Analyse gratuite de votre carte incluse", "Configuration en moins de 24 heures"],
    form_title: "Demandez votre démo personnalisée",
    form_subtitle: "Plus vous nous donnez de contexte, mieux nous adapterons la démo.",
    button: "Demander démo gratuite", sending: "Envoi...",
    disclaimer: "Sans engagement. En envoyant vous acceptez notre politique de confidentialité.",
    success: "Demande reçue ! Nous vous contacterons sous 24h.", error: "Erreur d'envoi. Veuillez réessayer.",
    trust_response: "Réponse sous 24 h", trust_no_commitment: "Sans engagement", trust_demo: "Démo de 15 min",
    what_next: "Que se passe-t-il ensuite ?",
    step1: "Nous vous contactons sous 24 h pour planifier la démo.",
    step2: "Nous préparons la démo avec votre carte réelle (si vous l'envoyez).",
    step3: "En 15 min, vous voyez Winerim appliqué à votre cas. Sans engagement.",
    link_software: "Logiciel carte des vins", link_pricing: "Plans et tarifs", link_cases: "Cas clients", link_analysis: "Analyse gratuite de carte",
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
      restaurant: (fd.get("restaurant") as string)?.trim() || null,
      name: (fd.get("name") as string)?.trim() || null,
      position: (fd.get("position") as string)?.trim() || null,
      phone: (fd.get("phone") as string)?.trim() || null,
      email: (fd.get("email") as string)?.trim() || null,
      city: (fd.get("city") as string)?.trim() || null,
      references_count: (fd.get("references_count") as string)?.trim() || null,
      business_type: (fd.get("business_type") as string)?.trim() || null,
      num_locations: (fd.get("num_locations") as string)?.trim() || null,
      main_challenge: (fd.get("main_challenge") as string)?.trim() || null,
    };
    const { error } = await supabase.from("contact_leads").insert(leadData);
    if (error) toast.error(c.error);
    else {
      toast.success(c.success);
      (e.target as HTMLFormElement).reset();
      notifyLead(leadData);
      trackFormSubmit("demo");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={c.seo_title} description={c.seo_desc} url="https://winerim.wine/demo" hreflang={allLangPaths("/demo")} />
      <main>
        <section className="pt-32 pb-24 section-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Breadcrumbs items={[{ label: c.breadcrumb }]} />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">{c.label}</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {c.title}{" "}<span className="text-gradient-wine">{c.highlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{c.subtitle}</p>
              <ul className="space-y-3 mb-10">
                {c.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-accent shrink-0" /><span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6 text-xs text-muted-foreground pt-6 border-t border-border">
                <span className="flex items-center gap-1.5"><Clock size={12} /> {c.trust_response}</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={12} /> {c.trust_no_commitment}</span>
                <span className="flex items-center gap-1.5"><Sparkles size={12} /> {c.trust_demo}</span>
              </div>

              {/* Social proof quote */}
              <div className="mt-8 p-4 rounded-xl border border-border bg-background">
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-3">
                  "Lo que antes eran 10/15 minutos para explicar la carta, ahora con Winerim en 3 minutos ya tienen una visión global de los vinos."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-wine flex items-center justify-center text-[9px] font-bold text-white">NO</div>
                  <div>
                    <p className="text-xs font-semibold">Nacho Otamendi</p>
                    <p className="text-[10px] text-muted-foreground">Propietario/Sommelier · Travieso Bar</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="bg-gradient-card border border-border rounded-xl p-8 md:p-10">
              <h2 className="font-heading text-2xl font-bold mb-2">{c.form_title}</h2>
              <p className="text-sm text-muted-foreground mb-6">{c.form_subtitle}</p>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <ContactFormFields native variant="demo" />
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-wine text-primary-foreground py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
                  {submitting ? c.sending : c.button}
                </Button>
                <p className="text-xs text-muted-foreground text-center">{c.disclaimer}</p>
              </form>

              {/* What happens next */}
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs font-semibold text-foreground/70 mb-3 uppercase tracking-widest">{c.what_next}</p>
                <ol className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="font-bold text-wine shrink-0">1.</span> {c.step1}</li>
                  <li className="flex items-start gap-2"><span className="font-bold text-wine shrink-0">2.</span> {c.step2}</li>
                  <li className="flex items-start gap-2"><span className="font-bold text-wine shrink-0">3.</span> {c.step3}</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <InternalLinks links={[
        { to: localePath("/software-carta-de-vinos"), label: c.link_software, type: "solution" },
        { to: localePath("/precios"), label: c.link_pricing, type: "resource" },
        { to: localePath("/casos-exito"), label: c.link_cases, type: "resource" },
        { to: localePath("/analisis-carta"), label: c.link_analysis, type: "tool" },
      ]} />
      <Footer />
    </div>
  );
};

export default Demo;
