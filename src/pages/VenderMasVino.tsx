import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Cpu,
  TrendingUp,
  Wine,
  BookOpen,
  Users,
  DollarSign,
  BarChart3,
  Layers,
  MessageSquare,
  GraduationCap,
  Eye,
  Utensils,
  Sparkles,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

/* ── FAQ data for schema + accordion ── */
const faqs = [
  {
    q: "¿Cuánto se puede aumentar la venta de vino en un restaurante?",
    a: "Con una estrategia bien ejecutada —carta clara, recomendaciones y maridajes— es habitual conseguir incrementos del 15 % al 30 % en ventas de vino y un aumento del ticket medio de entre un 10 % y un 20 %.",
  },
  {
    q: "¿Cómo recomendar vino en un restaurante sin ser sommelier?",
    a: "Basta con ofrecer una carta bien organizada por estilos o maridajes, usar fichas de cata sencillas y apoyarse en herramientas digitales que generan recomendaciones automáticas basadas en los platos del menú.",
  },
  {
    q: "¿Es mejor tener muchos vinos o pocos en la carta?",
    a: "Menos es más. Una selección curada de 30-50 referencias bien explicadas vende más que una carta de 200 vinos que abruma al cliente. La clave es rotación y margen, no volumen.",
  },
  {
    q: "¿Qué es una carta de vinos digital inteligente?",
    a: "Es una plataforma que sustituye la carta impresa por una experiencia interactiva donde el comensal recibe recomendaciones personalizadas, ve maridajes con su plato y accede a información visual del vino, todo desde su móvil.",
  },
  {
    q: "¿Cómo vender vino por copa para aumentar el ticket medio?",
    a: "Ofrece 6-8 vinos por copa con rotación semanal, colócalos de forma visible en la carta y acompáñalos de un maridaje sugerido. Las cartas digitales permiten destacar estas opciones y explicar por qué probarlas.",
  },
];

/* ── Errors data ── */
const errors = [
  {
    icon: BookOpen,
    title: "1. Carta de vinos difícil de entender",
    text: "Cuando la carta está organizada por regiones o bodegas sin contexto, el comensal se pierde. Una carta efectiva agrupa por estilos, ocasiones o maridajes, facilitando que cualquier persona elija con confianza.",
  },
  {
    icon: MessageSquare,
    title: "2. Falta de recomendaciones",
    text: "Si nadie sugiere un vino, el cliente recurre al más barato o al que ya conoce. Las recomendaciones —del personal o automatizadas— son el mayor acelerador de ventas de vino.",
  },
  {
    icon: Wine,
    title: "3. No ofrecer vino por copa",
    text: "Muchos comensales quieren probar sin comprometer una botella. Ofrecer una selección atractiva por copa reduce la barrera de entrada y abre la puerta a descubrir vinos de mayor valor.",
  },
  {
    icon: DollarSign,
    title: "4. Precios mal escalonados",
    text: "Cuando hay un salto brusco entre el vino más barato y el siguiente, el cliente siempre elige el más económico. Escalonar precios de forma gradual invita a subir de gama de manera natural.",
  },
  {
    icon: Layers,
    title: "5. Demasiadas referencias",
    text: "Una carta con 200 vinos parece impresionante, pero genera parálisis de elección. Reducir a 30-50 referencias bien seleccionadas mejora la rotación, reduce merma y aumenta la satisfacción del cliente.",
  },
  {
    icon: Eye,
    title: "6. Falta de storytelling",
    text: "Un vino no es solo uva y añada: es una historia, un territorio, una persona. Contar la historia detrás de cada referencia genera conexión emocional y justifica un precio superior.",
  },
  {
    icon: GraduationCap,
    title: "7. Personal sin formación",
    text: "No hace falta ser sommelier, pero sí conocer lo básico. Cuando el equipo de sala puede explicar un vino con seguridad, la confianza del comensal —y el ticket medio— se dispara.",
  },
];

/* ── Strategies data ── */
const strategies = [
  { title: "Simplificar la carta", text: "Menos referencias, mejor explicadas. Organiza por estilos o momentos de consumo en lugar de regiones." },
  { title: "Crear categorías claras", text: "Usa etiquetas como «Frescos y ligeros», «Para compartir» o «Selección del chef» que hablan el idioma del comensal." },
  { title: "Ofrecer maridajes con platos", text: "Asocia cada plato estrella con uno o dos vinos recomendados. El maridaje sugerido es la forma más natural de upselling." },
  { title: "Mostrar vinos recomendados", text: "Destaca 3-5 vinos como «Recomendación de la casa». Los vinos destacados se venden hasta un 40 % más." },
  { title: "Mejorar el diseño de la carta", text: "Tipografía legible, descripciones cortas, imágenes de calidad. El diseño afecta directamente a la percepción de valor." },
  { title: "Explicar el vino de forma simple", text: "Notas de cata accesibles, sin tecnicismos. Frases como «Fresco, con notas de fruta roja, perfecto para ensaladas» funcionan mejor que «taninos sedosos con final largo»." },
  { title: "Guiar la decisión del cliente", text: "Preguntas como «¿Prefieres tinto o blanco?» seguidas de una recomendación personalizada. La venta guiada convierte más que la carta estática." },
];

/* ── Tech benefits ── */
const techBenefits = [
  { icon: Sparkles, text: "Recomendar vinos automáticamente según las preferencias del comensal" },
  { icon: BookOpen, text: "Explicar el vino al cliente con fichas visuales y notas de cata accesibles" },
  { icon: Utensils, text: "Mostrar maridajes inteligentes con cada plato del menú" },
  { icon: TrendingUp, text: "Aumentar el ticket medio mediante upselling contextual" },
  { icon: BarChart3, text: "Mejorar la rotación de bodega con analítica de ventas en tiempo real" },
];

const VenderMasVino = () => {
  /* FAQ JSON-LD */
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "faq-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);

    const breadcrumb = document.createElement("script");
    breadcrumb.id = "breadcrumb-jsonld";
    breadcrumb.type = "application/ld+json";
    breadcrumb.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine" },
        { "@type": "ListItem", position: 2, name: "Cómo vender más vino en un restaurante", item: "https://winerim.wine/como-vender-mas-vino-en-un-restaurante" },
      ],
    });
    document.head.appendChild(breadcrumb);

    return () => {
      script.remove();
      breadcrumb.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cómo Vender Más Vino en un Restaurante | Guía Completa 2025"
        description="Descubre las estrategias más efectivas para aumentar las ventas de vino en tu restaurante: carta optimizada, maridajes, recomendaciones inteligentes y tecnología."
        url="https://winerim.wine/como-vender-mas-vino-en-un-restaurante"
        type="article"
        author="Winerim"
      />
      <Navbar />

      <main>
        {/* ═══════════ 1. HERO ═══════════ */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
              <Wine size={14} className="text-wine" />
              <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Guía para hostelería</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              Cómo vender más vino{" "}
              <span className="text-gradient-wine italic">en un restaurante</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Estrategias reales para aumentar las ventas de vino, mejorar el ticket medio y rotar mejor la bodega.
            </p>

            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
            >
              Analiza tu carta de vinos gratis
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══════════ 2. INTRODUCCIÓN ═══════════ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="prose-custom">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  El vino: tu producto con <span className="text-gradient-wine">mayor margen</span>… y el peor vendido
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  En la mayoría de los restaurantes, el vino representa el producto con mayor margen bruto de toda la carta. Sin embargo, es también uno de los peor vendidos cuando no existe una estrategia clara de venta.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Los problemas son conocidos y se repiten en casi todos los establecimientos:
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-3 mb-8">
              {[
                "El cliente no entiende la carta de vinos",
                "El personal no recomienda porque no se siente seguro",
                "Hay demasiadas referencias sin una organización clara",
                "No se ofrecen maridajes con los platos del menú",
                "La estructura de precios no invita a subir de gama",
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-3 bg-gradient-card rounded-lg border border-border p-4">
                    <AlertTriangle size={16} className="text-accent flex-shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                La buena noticia es que la mayoría de estos problemas tienen solución. En esta guía te mostramos los errores más frecuentes y las estrategias que funcionan para <strong className="text-foreground">vender más vino en tu restaurante</strong>.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 3. LOS 7 ERRORES ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/20 bg-destructive/5 mb-6">
                <XCircle size={14} className="text-destructive" />
                <span className="text-xs font-semibold tracking-widest uppercase text-destructive">Errores comunes</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Los 7 errores que hacen que{" "}
                <span className="text-gradient-wine italic">no se venda vino</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-6">
              {errors.map((err, i) => {
                const Icon = err.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8 hover:border-wine/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon size={20} className="text-wine" />
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-semibold mb-2">{err.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{err.text}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 4. ESTRATEGIAS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-6">
                <Lightbulb size={14} className="text-accent" />
                <span className="text-xs font-semibold tracking-widest uppercase text-accent">Estrategias</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                7 estrategias para{" "}
                <span className="text-gradient-wine italic">vender más vino</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Acciones concretas que puedes implementar en tu restaurante para mejorar las ventas de vino.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-5">
              {strategies.map((s, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-all h-full">
                    <span className="inline-block text-xs font-bold text-wine bg-wine/10 px-3 py-1 rounded-full mb-4">
                      {i + 1}
                    </span>
                    <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 5. TECNOLOGÍA ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
                <Cpu size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Tecnología</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Cómo la tecnología ayuda a{" "}
                <span className="text-gradient-wine italic">vender más vino</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Las cartas digitales inteligentes están transformando la forma en que los restaurantes venden vino. En lugar de una carta estática, el comensal accede a una experiencia interactiva que le guía hacia mejores decisiones.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5 mb-12">
              {techBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{b.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="bg-gradient-card rounded-2xl border border-wine/20 p-8 md:p-10 glow-wine text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  <strong className="text-foreground">Winerim</strong> es la plataforma que convierte tu carta de vinos en un vendedor inteligente. Con inteligencia artificial, recomienda, educa y aumenta tu ticket medio automáticamente.
                </p>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
                >
                  Descubre Winerim
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ 6. RESULTADOS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Resultados</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Resultados reales en{" "}
                <span className="text-gradient-wine italic">restaurantes</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { value: "+20 %", label: "Incremento medio en ventas de vino", icon: Wine },
                { value: "+15 %", label: "Aumento del ticket medio", icon: TrendingUp },
                { value: "+30 %", label: "Mayor rotación de referencias", icon: BarChart3 },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="bg-gradient-card rounded-2xl border border-border p-8 text-center hover:border-wine/20 transition-colors">
                      <div className="w-14 h-14 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-5">
                        <Icon size={28} className="text-wine" />
                      </div>
                      <p className="font-heading text-4xl md:text-5xl font-bold text-gradient-wine mb-2">{m.value}</p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Preguntas frecuentes
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <details className="group bg-gradient-card rounded-xl border border-border hover:border-wine/20 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-foreground font-semibold">
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown size={18} className="text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 7. CTA FINAL ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                    Da el primer paso
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Descubre cuánto más podrías{" "}
                    <span className="text-gradient-wine italic">vender</span>{" "}
                    con tu carta de vinos
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                    Envíanos tu carta y te mostramos cómo optimizarla para vender más vino. Sin compromiso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/demo"
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
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VenderMasVino;
