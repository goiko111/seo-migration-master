import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            ¿Quieres aumentar tus ventas{" "}
            <span className="text-gradient-wine">en más de un 30%?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Analizamos tu carta de manera completamente gratuita. Te recomendamos cómo 
            optimizarla y qué estrategias utilizar.
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="font-heading text-2xl font-bold mb-8">
                Analizamos tu carta gratis
              </h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input placeholder="Nombre" className="bg-card border-border" />
                  <Input placeholder="Cargo en el restaurante" className="bg-card border-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input type="email" placeholder="Email" className="bg-card border-border" />
                  <Input type="tel" placeholder="Teléfono" className="bg-card border-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input placeholder="Restaurante" className="bg-card border-border" />
                  <Input placeholder="Ciudad" className="bg-card border-border" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input placeholder="Número de referencias" className="bg-card border-border" />
                  <Input placeholder="Link a tu carta" className="bg-card border-border" />
                </div>
                <Textarea
                  placeholder="Mensaje (¿Qué aspectos deseas mejorar?)"
                  className="bg-card border-border min-h-[120px]"
                />
                <Button
                  type="submit"
                  className="bg-gradient-wine text-primary-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity w-full md:w-auto"
                >
                  Enviar solicitud
                </Button>
              </form>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">¿Tienes alguno de estos problemas?</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    Siempre vendes los mismos vinos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    Tu equipo de sala no llega
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    Tienes vinos estancados
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    Te falta variedad
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    Gestión en tiempo real
                  </li>
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
                    <p className="text-sm font-medium">Llamadas</p>
                    <a href="tel:+34722180348" className="text-sm text-muted-foreground hover:text-foreground transition-colors">+34 722 180 348</a>
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-heading text-lg font-semibold mb-4">Winerim en un minuto</h3>
                <div className="aspect-video rounded-xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.youtube.com/embed/-PleM286zeY"
                    title="Winerim en un minuto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                  />
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
