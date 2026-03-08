import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

const Contacto = () => {
  const [submitting, setSubmitting] = useState(false);
  const { get } = usePageContent("contacto");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("contact_leads").insert({
      form_type: "contacto",
      name: fd.get("name") as string || null,
      position: fd.get("position") as string || null,
      email: fd.get("email") as string || null,
      phone: fd.get("phone") as string || null,
      restaurant: fd.get("restaurant") as string || null,
      city: fd.get("city") as string || null,
      references_count: fd.get("references") as string || null,
      menu_link: fd.get("menu_link") as string || null,
      message: fd.get("message") as string || null,
    });
    if (error) toast.error("Error al enviar. Inténtalo de nuevo.");
    else {
      toast.success("¡Solicitud enviada! Te contactaremos pronto.");
      (e.target as HTMLFormElement).reset();
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title="Contacto" description="Contacta con Winerim. Analizamos tu carta de vinos gratis y te ayudamos a optimizarla." url="https://winerim.wine/contacto" />
      <main>
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {get("hero", "title", "¿Quieres aumentar tus ventas")}{" "}
            <span className="text-gradient-wine">{get("hero", "title_highlight", "en más de un 30%?")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {get("hero", "subtitle", "Analizamos tu carta de manera completamente gratuita. Te recomendamos cómo optimizarla y qué estrategias utilizar.")}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid lg:grid-cols-5 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <h2 className="font-heading text-2xl font-bold mb-8">
                {get("form", "title", "Analizamos tu carta gratis")}
              </h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="name" placeholder="Nombre" required className="bg-card border-border" />
                  <Input name="position" placeholder="Cargo en el restaurante" className="bg-card border-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="email" type="email" placeholder="Email" className="bg-card border-border" />
                  <Input name="phone" type="tel" placeholder="Teléfono" className="bg-card border-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="restaurant" placeholder="Restaurante" className="bg-card border-border" />
                  <Input name="city" placeholder="Ciudad" className="bg-card border-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input name="references" placeholder="Número de referencias" className="bg-card border-border" />
                  <Input name="menu_link" placeholder="Link a tu carta" className="bg-card border-border" />
                </div>
                <Textarea name="message" placeholder="Mensaje (¿Qué aspectos deseas mejorar?)" className="bg-card border-border min-h-[120px]" />
                <Button type="submit" disabled={submitting}
                  className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity w-full md:w-auto">
                  {submitting ? "Enviando..." : get("form", "button", "Enviar solicitud")}
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {get("sidebar", "problems_title", "¿Tienes alguno de estos problemas?")}
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  {["Siempre vendes los mismos vinos", "Tu equipo de sala no llega", "Tienes vinos estancados", "Te falta variedad", "Gestión en tiempo real"].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href={`mailto:${get("contact", "email", "info@winerim.com")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {get("contact", "email", "info@winerim.com")}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <a href={`https://wa.me/${get("contact", "whatsapp_number", "34623165179")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {get("contact", "whatsapp_display", "+34 623 165 179")}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Llamadas</p>
                    <a href={`tel:${get("contact", "phone_number", "+34722180348")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {get("contact", "phone_display", "+34 722 180 348")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="font-heading text-lg font-semibold mb-4">Winerim en un minuto</h3>
                <div className="aspect-video rounded-xl overflow-hidden border border-border">
                  <iframe src="https://www.youtube.com/embed/-PleM286zeY" title="Winerim en un minuto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="w-full h-full" loading="lazy" />
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
