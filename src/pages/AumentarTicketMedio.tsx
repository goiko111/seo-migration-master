import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, TrendingUp, BarChart3, AlertTriangle,
  Lightbulb, Utensils, GlassWater, BookOpen, Users,
  Sparkles, CheckCircle, XCircle, Cpu, Target, DollarSign
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

const wineAdvantages = [
  { icon: DollarSign, title: "Mayor margen que otros productos", desc: "El vino ofrece márgenes del 65-75%, superiores a la mayoría de productos de la carta. Cada copa vendida mejora directamente la rentabilidad." },
  { icon: Users, title: "Fácil de compartir", desc: "Una botella se comparte entre toda la mesa, facilitando la venta. No necesitas convencer a cada comensal individualmente." },
  { icon: Utensils, title: "Acompaña toda la comida", desc: "A diferencia de otros productos, el vino puede estar presente desde el aperitivo hasta el postre, multiplicando las oportunidades de venta." },
  { icon: Target, title: "Múltiples opciones de precio", desc: "Desde copas a 5€ hasta botellas premium, el vino permite adaptarse al presupuesto de cada mesa y maximizar el gasto." },
];

const strategies = [
  { icon: GlassWater, title: "Ofrecer vinos por copa", desc: "La venta por copas reduce la barrera de entrada. Un cliente que no pediría una botella sí probará una copa. Ofrece al menos 6-8 referencias por copa." },
  { icon: Utensils, title: "Crear maridajes con platos", desc: "Sugiere un vino específico para cada plato destacado. Los maridajes aumentan la percepción de valor y facilitan la decisión del cliente." },
  { icon: BookOpen, title: "Recomendar vinos desde la carta", desc: "Una carta bien estructurada con descripciones claras y recomendaciones destacadas guía al cliente hacia vinos de mayor valor." },
  { icon: Users, title: "Explicar el vino al cliente", desc: "Cuando el cliente entiende lo que bebe, está dispuesto a pagar más. Fichas de vino con notas de cata, origen y maridajes marcan la diferencia." },
  { icon: Target, title: "Mejorar la estructura de la carta", desc: "Organiza por estilos, no solo por regiones. Destaca 2-3 vinos por categoría. Posiciona los vinos con mejor margen en zonas de alta visibilidad." },
];

const mistakes = [
  "Cartas de vinos difíciles de entender con terminología excesivamente técnica",
  "Demasiadas referencias que paralizan la decisión del cliente",
  "Precios mal distribuidos con saltos grandes entre opciones",
  "Falta de recomendaciones que dejan al cliente sin orientación",
  "No ofrecer vino por copa, perdiendo ventas de mesas pequeñas",
  "Personal sin formación para recomendar vino con confianza",
];

const techBenefits = [
  { icon: Sparkles, title: "Recomendar vinos automáticamente", desc: "Algoritmos que sugieren el vino ideal según el plato elegido, las preferencias del cliente y el momento del día." },
  { icon: BookOpen, title: "Explicar el vino al cliente", desc: "Fichas digitales con notas de cata, maridajes, origen y puntuaciones. El cliente se siente informado y seguro al elegir." },
  { icon: Target, title: "Guiar la decisión de compra", desc: "Filtros interactivos, comparador de vinos y recomendaciones destacadas que simplifican la elección y aumentan el ticket." },
  { icon: BarChart3, title: "Optimizar la carta con datos", desc: "Analítica de ventas que muestra qué vinos funcionan, cuáles rotan poco y dónde están las oportunidades de mejora." },
];

const metrics = [
  { value: "+15%", label: "Ticket medio", icon: TrendingUp },
  { value: "+20%", label: "Ventas de vino", icon: Wine },
  { value: "+30%", label: "Rotación de referencias", icon: BarChart3 },
];

const AumentarTicketMedio = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "ticket-medio-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Cómo aumentar el ticket medio en un restaurante",
      description: "Estrategias prácticas para aumentar el gasto medio por cliente en restaurantes utilizando el vino como herramienta de venta.",
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: "https://winerim.wine/soluciones/aumentar-ticket-medio-restaurante",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Soluciones", item: "https://winerim.wine/soluciones" },
          { "@type": "ListItem", position: 3, name: "Aumentar ticket medio", item: "https://winerim.wine/soluciones/aumentar-ticket-medio-restaurante" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("ticket-medio-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cómo Aumentar el Ticket Medio en un Restaurante | Winerim"
        description="Estrategias prácticas para aumentar el gasto medio por cliente en tu restaurante. Descubre cómo el vino puede ser tu herramienta más efectiva."
        url="https://winerim.wine/soluciones/aumentar-ticket-medio-restaurante"
        type="article"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Soluciones" }, { label: "Aumentar ticket medio" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <TrendingUp size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Rentabilidad</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            Cómo aumentar el <span className="text-gradient-wine italic">ticket medio</span> en un restaurante
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Estrategias prácticas para aumentar el gasto medio por cliente sin afectar la experiencia gastronómica.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/wine-list-analyzer" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              Analizar mi carta de vinos <ArrowRight size={16} />
            </Link>
            <Link to="/demo" className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              Solicitar demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                El ticket medio: la métrica que define la <span className="text-gradient-wine italic">rentabilidad</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  Aumentar el ticket medio es uno de los objetivos más importantes en restauración. No se trata de subir precios, sino de <strong className="text-foreground">mejorar la experiencia de compra</strong> para que cada cliente gaste más de forma natural.
                </p>
                <p>Los factores que más influyen en el ticket medio son:</p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                  {[
                    { icon: Wine, text: "Venta de bebidas, especialmente vino" },
                    { icon: Users, text: "Recomendación activa del personal" },
                    { icon: BookOpen, text: "Estructura y diseño de la carta" },
                    { icon: Sparkles, text: "Experiencia global del cliente" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <item.icon size={16} className="text-wine shrink-0 mt-1" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  De todos estos factores, el <strong className="text-foreground">vino es la herramienta más efectiva</strong> para aumentar el ticket medio: alto margen, fácil de recomendar y presente durante toda la comida.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. POR QUÉ EL VINO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">El vino como palanca</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Por qué el vino <span className="text-gradient-wine italic">aumenta el ticket medio</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {wineAdvantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ESTRATEGIAS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Estrategias</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              5 formas de <span className="text-gradient-wine italic">aumentar el ticket medio</span> con vino
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {strategies.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{`${i + 1}. ${s.title}`}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ERRORES COMUNES */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Evita estos errores</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Errores que <span className="text-gradient-wine italic">reducen</span> tu ticket medio
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {mistakes.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-3">
                  <XCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{m}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TECNOLOGÍA */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Tecnología</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Cómo Winerim te ayuda a <span className="text-gradient-wine italic">vender más</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {techBenefits.map((tb, i) => {
              const Icon = tb.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{tb.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tb.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. RESULTADOS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Impacto</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Resultados <span className="text-gradient-wine italic">reales</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <p className="font-heading text-3xl md:text-4xl font-bold text-wine mb-2">{m.value}</p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Da el siguiente paso</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre cuánto más podrías <span className="text-gradient-wine italic">vender</span> con tu carta de vinos
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Analizamos tu carta de vinos y te mostramos oportunidades concretas para aumentar tu ticket medio.
              </p>
              <Link to="/wine-list-analyzer" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Solicitar análisis de carta <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AumentarTicketMedio;
