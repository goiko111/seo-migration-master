import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const benefits = [
  "Configuración en menos de 24 horas",
  "Sin compromiso de permanencia",
  "Soporte técnico incluido",
  "Análisis gratuito de tu carta",
];

const Demo = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("contact_leads").insert({
      form_type: "demo",
      name: fd.get("name") as string || null,
      email: fd.get("email") as string || null,
      phone: fd.get("phone") as string || null,
      restaurant: fd.get("restaurant") as string || null,
      city: fd.get("city") as string || null,
    });
    if (error) toast.error("Error al enviar. Inténtalo de nuevo.");
    else {
      toast.success("¡Solicitud recibida! Te contactaremos pronto.");
      (e.target as HTMLFormElement).reset();
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-24 section-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
                Prueba gratuita
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Descubre cómo Winerim{" "}
                <span className="text-gradient-wine">transforma tu carta de vinos</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Solicita una demostración personalizada y comprueba cómo puedes aumentar 
                tus ventas de vino en más de un 30%.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-accent shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right – Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-gradient-card border border-border rounded-2xl p-8 md:p-10"
            >
              <h2 className="font-heading text-2xl font-bold mb-6">
                Solicita tu demo gratuita
              </h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nombre completo" className="bg-background border-border" />
                <Input name="email" type="email" placeholder="Email" className="bg-background border-border" />
                <Input name="phone" type="tel" placeholder="Teléfono" className="bg-background border-border" />
                <Input name="restaurant" placeholder="Nombre del restaurante" className="bg-background border-border" />
                <Input name="city" placeholder="Ciudad" className="bg-background border-border" />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-wine text-primary-foreground py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                >
                  {submitting ? "Enviando..." : "Solicitar demo"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Al enviar aceptas nuestra política de privacidad.
                </p>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
