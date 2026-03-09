import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, GlassWater, BarChart3, TrendingUp, Target,
  Utensils, Users, ShoppingCart, Calculator, Lightbulb, CheckCircle, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const introBenefits = [
  { icon: Users, text: "Reduce el miedo del cliente a elegir mal" },
  { icon: Wine, text: "Permite probar más vinos en una misma comida" },
  { icon: TrendingUp, text: "Aumenta el ticket medio de la mesa" },
  { icon: ShoppingCart, text: "Mejora la rotación de botellas en bodega" },
];

const glassOfferings = [
  { type: "Restaurante pequeño", range: "3 – 5 vinos", desc: "Selección esencial: un blanco, un rosado y dos o tres tintos. Suficiente para cubrir todos los perfiles sin complicar la gestión." },
  { type: "Restaurante medio", range: "5 – 8 vinos", desc: "Variedad equilibrada con representación de estilos y regiones. Espacio para incluir un espumoso y un vino dulce o generoso." },
  { type: "Restaurante gastronómico", range: "8 – 12 vinos", desc: "Carta por copa ambiciosa que permite maridajes completos. Incluye opciones premium y rotación frecuente de referencias." },
];

const bestWines = [
  { icon: Star, title: "Vinos versátiles", desc: "Vinos que funcionan con muchos platos diferentes, facilitando la recomendación del personal y la decisión del cliente." },
  { icon: Utensils, title: "Vinos gastronómicos", desc: "Referencias pensadas para acompañar comida, con buena acidez y estructura. Son los que mejor convierten en mesa." },
  { icon: Users, title: "Vinos conocidos", desc: "Denominaciones y variedades que el cliente reconoce generan confianza. Rioja, Verdejo, Albariño, Malbec funcionan como anclas." },
  { icon: TrendingUp, title: "Buena relación calidad-precio", desc: "El cliente que pide por copa es sensible al precio unitario. Ofrecer calidad percibida alta a precio justo maximiza la repetición." },
];

const techFeatures = [
  { title: "Sugerir vinos por copa", desc: "El sistema recomienda el vino por copa ideal según el plato elegido y las preferencias del comensal." },
  { title: "Mostrar maridajes", desc: "Cada vino por copa aparece vinculado a los platos del menú, multiplicando las oportunidades de venta cruzada." },
  { title: "Explicar el vino al cliente", desc: "Notas de cata claras, orígenes y perfiles sensoriales que hacen el vino accesible sin necesidad de sommelier." },
  { title: "Mejorar la decisión del comensal", desc: "Filtros, comparaciones y recomendaciones que eliminan la parálisis de elección y aceleran el pedido." },
];

const VinoPorCopa = () => {
  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "copa-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Cuántos vinos por copa debería ofrecer un restaurante?",
          acceptedAnswer: { "@type": "Answer", text: "Depende del tipo de restaurante: entre 3-5 para establecimientos pequeños, 5-8 para restaurantes de tamaño medio y 8-12 para restaurantes gastronómicos. Lo importante es que cada referencia aporte variedad sin generar confusión." },
        },
        {
          "@type": "Question",
          name: "¿Cómo se calcula el precio de un vino por copa?",
          acceptedAnswer: { "@type": "Answer", text: "El método más habitual es dividir el coste de la botella entre el número de copas (normalmente 5) y aplicar un margen. El objetivo es cubrir el coste de la botella con las primeras 2-3 copas vendidas, convirtiendo el resto en beneficio neto." },
        },
        {
          "@type": "Question",
          name: "¿Qué tipo de vinos funcionan mejor por copa?",
          acceptedAnswer: { "@type": "Answer", text: "Los vinos versátiles que maridan con muchos platos, las denominaciones conocidas que generan confianza, los vinos gastronómicos con buena acidez y estructura, y los que ofrecen buena relación calidad-precio." },
        },
        {
          "@type": "Question",
          name: "¿Cómo aumentar las ventas de vino por copa?",
          acceptedAnswer: { "@type": "Answer", text: "Sugiriendo maridajes con cada plato, utilizando herramientas digitales que recomienden el vino ideal, formando al personal en técnicas de venta y manteniendo una oferta rotativa que genere interés." },
        },
      ],
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.getElementById("copa-faq-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cómo Vender Vino por Copa en un Restaurante | Guía Práctica"
        description="Guía práctica para diseñar una oferta de vinos por copa rentable en tu restaurante. Aprende cuántos vinos ofrecer, cómo fijar precios, qué referencias funcionan mejor y cómo aumentar ventas."
        url="https://winerim.wine/vino-por-copa-restaurante"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8"
            >
              <GlassWater size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Vino por copa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8"
            >
              Cómo vender vino por copa en un{" "}
              <span className="text-gradient-wine italic">restaurante</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              Guía práctica para diseñar una oferta de vinos por copa rentable, atractiva para el cliente y fácil de gestionar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/analisis-carta"
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
              >
                Analizar mi carta de vinos
              </Link>
              <Link
                to="/demo"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
              >
                Solicitar demo
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRODUCCIÓN */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La oportunidad</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              El vino por copa es la forma más efectiva de{" "}
              <span className="text-gradient-wine italic">vender más vino</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Ofrecer vino por copa elimina la barrera más importante de la venta de vino: el compromiso con una botella entera. El cliente puede explorar, probar y disfrutar sin riesgo. Para el restaurante, es una herramienta potente para aumentar el ticket medio y la rotación de bodega.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {introBenefits.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                    <Icon size={18} className="text-wine shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CUÁNTOS VINOS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La cantidad justa</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              ¿Cuántos vinos ofrecer <span className="text-gradient-wine italic">por copa</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Demasiadas opciones confunden. Pocas opciones limitan. La clave está en el equilibrio según el tipo de restaurante.
            </p>
          </ScrollReveal>

          <div className="space-y-4 max-w-2xl mx-auto">
            {glassOfferings.map((tier, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="bg-wine/10 rounded-lg px-4 py-3 text-center sm:text-left shrink-0 min-w-[160px]">
                    <p className="text-xs uppercase tracking-wider text-wine-light font-semibold">{tier.type}</p>
                    <p className="font-heading text-lg font-bold text-wine">{tier.range}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Estrategia de pricing</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo fijar el precio del vino <span className="text-gradient-wine italic">por copa</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                El método más habitual parte de una regla simple: <strong className="text-foreground">cubrir el coste de la botella con las primeras 2-3 copas vendidas</strong>. El resto es beneficio neto. Veamos un ejemplo práctico:
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Coste botella", value: "24 €", icon: Wine },
                  { label: "Copas por botella", value: "5", icon: GlassWater },
                  { label: "Precio por copa", value: "6 – 8 €", icon: Calculator },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="bg-secondary/50 rounded-xl border border-border p-5 text-center"
                    >
                      <Icon size={20} className="text-wine mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-heading text-xl font-bold text-wine">{item.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-wine/5 border border-wine/20 rounded-xl p-6 mb-6">
                <p className="text-sm font-semibold text-wine mb-2">💡 La regla de oro</p>
                <p className="text-sm text-muted-foreground">
                  Con 5 copas a 7 € cada una, facturas 35 € por una botella de 24 €. Las <strong className="text-foreground">dos primeras copas ya cubren el coste</strong>. Las tres restantes son margen puro. Si se pierden 1-2 copas por merma, la operación sigue siendo rentable.
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                Para vinos premium, ajusta el multiplicador a la baja (×1.5-2) para mantener precios atractivos. Para vinos de entrada, puedes aplicar márgenes mayores (×2.5-3) porque el precio absoluto sigue siendo bajo.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* QUÉ VINOS FUNCIONAN */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Selección inteligente</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Qué vinos funcionan mejor <span className="text-gradient-wine italic">por copa</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {bestWines.map((wine, i) => {
              const Icon = wine.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{wine.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{wine.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARIDAJE */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Venta cruzada</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                El maridaje multiplica la venta <span className="text-gradient-wine italic">por copa</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sugerir un vino por copa junto a cada plato del menú es la técnica de venta más efectiva en hostelería. El cliente percibe la recomendación como un servicio, no como una venta — y pide más.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cuando un comensal ve <strong className="text-foreground">"Recomendado con este plato"</strong> junto a un vino por copa, la probabilidad de pedirlo se multiplica. Es la venta más natural que existe.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-gradient-card rounded-2xl border border-border p-6 space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <Utensils size={18} className="text-wine" />
                  <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Ejemplo de maridaje</span>
                </div>
                {[
                  { dish: "Ensalada de burrata", wine: "Verdejo — 6,50 €/copa" },
                  { dish: "Risotto de setas", wine: "Chardonnay fermentado — 7 €/copa" },
                  { dish: "Entrecot a la brasa", wine: "Ribera del Duero Crianza — 8 €/copa" },
                  { dish: "Tarta de chocolate", wine: "Pedro Ximénez — 5,50 €/copa" },
                ].map((pair, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-secondary/50 rounded-lg px-4 py-3 border border-border"
                  >
                    <p className="text-sm font-medium mb-1">{pair.dish}</p>
                    <p className="text-xs text-wine flex items-center gap-2">
                      <GlassWater size={12} /> {pair.wine}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">La solución</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cómo la tecnología potencia la venta <span className="text-gradient-wine italic">por copa</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Herramientas como Winerim automatizan las recomendaciones y hacen que cada copa se venda sola.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {techFeatures.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 h-full">
                  <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={16} className="text-wine" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                Análisis gratuito
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre si tu oferta de vinos por copa está{" "}
                <span className="text-gradient-wine italic">optimizada</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta y analizamos tu selección de vinos por copa, precios, maridajes y oportunidades de mejora. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/analisis-carta"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Solicitar análisis gratuito
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contacto"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VinoPorCopa;
