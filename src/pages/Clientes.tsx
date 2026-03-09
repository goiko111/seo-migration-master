import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const featuredClients = [
  { name: "Miramar", location: "Llançà, Girona", type: "Alta Gastronomía", quote: "Winerim nos ha permitido digitalizar nuestra bodega de más de 600 referencias." },
  { name: "Zortziko", location: "Bilbao", type: "Restaurante Gastronómico", quote: "La gestión de nuestra carta de vinos nunca había sido tan ágil." },
  { name: "Cañabota", location: "Sevilla", type: "Gastrobar", quote: "Nuestros clientes interactúan con el vino de una forma completamente nueva." },
  { name: "Roig Robí", location: "Barcelona", type: "Cocina Catalana", quote: "La IA de Winerim recomienda vinos que realmente encajan con cada plato." },
];

const allClients = [
  "Miramar", "Zortziko", "Tres", "Santé", "Sacla", "La Parra",
  "Ment", "La Carbonería", "Cocina del Sol", "Cañabota", "Alejandra",
  "Bidea", "Tribeca", "Taverna", "Serrano", "Roig Robí",
  "Ríos do Freixo", "Remigio", "La Fábrica", "Jauregibarria",
  "El Motel", "Dámaso", "Casamar", "Bocaatti", "Alameda",
  "Antonio Zahara", "La Vecchia Griglia", "Vinoteca Jaleo",
  "Travieso Bar", "Bodega del Marqués", "Casa Vicente",
  "El Rincón del Vino", "La Mesa Redonda", "Taberna del Puerto",
  "Restaurante Mirador", "Brasserie du Vin", "Ostería del Mare",
  "Viña y Mesa", "La Barrica", "El Sommelier", "Terraza del Lago",
  "Mesón del Vino", "Casa de las Cepas", "El Lagar", "La Cepa de Oro",
];

const stats = [
  { value: "1.000+", label: "Bodegas gestionadas" },
  { value: "45.000+", label: "Referencias de vino" },
  { value: "30%", label: "Incremento medio en ventas de vino" },
  { value: "12", label: "Países" },
];

const Clientes = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Clientes de Winerim | Restaurantes que confían en nosotros"
        description="Más de 1.000 restaurantes confían en Winerim para gestionar su carta de vinos. Descubre quiénes son y cómo les ayudamos."
        url="https://winerim.wine/clientes"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: "Clientes" }]} />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            Nuestros clientes
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Los mejores restaurantes ya usan{" "}<span className="text-gradient-wine italic">Winerim</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Más de 1.000 establecimientos confían en nuestra tecnología para transformar su carta de vinos en una herramienta de venta inteligente.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center bg-gradient-card rounded-xl border border-border p-6">
                <p className="font-heading text-3xl md:text-4xl font-bold text-gradient-wine mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured clients with quotes */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Destacados</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Lo que dicen nuestros <span className="text-gradient-wine italic">clientes</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredClients.map((client, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-8 h-full flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <span className="font-heading text-xl font-bold text-wine">{client.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{client.name}</h3>
                      <p className="text-xs text-muted-foreground">{client.location} · {client.type}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="relative pl-4 border-l-2 border-wine/30">
                      <Quote size={16} className="text-wine/30 absolute -left-2 -top-1" />
                      <p className="text-muted-foreground italic leading-relaxed">{client.quote}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* All clients grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Todos nuestros <span className="text-gradient-wine italic">clientes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Restaurantes de toda España, Portugal, Italia y más confían en Winerim.
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-3">
            {allClients.map((name, i) => (
              <ScrollReveal key={i} delay={Math.min(i * 0.02, 0.5)}>
                <div className="px-5 py-3 rounded-lg border border-border bg-card text-muted-foreground text-sm font-medium tracking-wider whitespace-nowrap hover:border-wine/30 hover:text-foreground transition-all duration-300">
                  {name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Únete</p>
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                  ¿Listo para ser el <span className="text-gradient-wine italic">siguiente?</span>
                </h2>
                <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                  Prueba Winerim gratis y descubre por qué más de 1.000 restaurantes ya confían en nosotros.
                </p>
                <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                  Solicitar demo <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <InternalLinks currentPath="/clientes" />
      <Footer />
    </div>
  );
};

export default Clientes;
