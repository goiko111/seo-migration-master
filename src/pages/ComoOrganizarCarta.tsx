import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BookOpen, AlertTriangle, CheckCircle,
  Layers, DollarSign, Search, Utensils, XCircle,
  Sparkles, GlassWater, Globe, BarChart3, Target, List
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";

const problems = [
  { icon: Layers, text: "Demasiadas referencias sin criterio claro de selección" },
  { icon: List, text: "Categorías poco claras que confunden al cliente" },
  { icon: Search, text: "Dificultad para comparar vinos entre sí" },
  { icon: DollarSign, text: "Precios mal distribuidos con saltos bruscos entre opciones" },
];

const orgMethods = [
  {
    title: "Por tipo de vino",
    examples: "Tinto, blanco, rosado, espumoso, dulce",
    pros: "Intuitivo para cualquier cliente. Fácil de navegar.",
    cons: "Puede ser poco diferenciador si hay muchas referencias por tipo.",
  },
  {
    title: "Por región o denominación de origen",
    examples: "Rioja, Ribera del Duero, Borgoña, Toscana, Napa Valley",
    pros: "Ideal para cartas con identidad geográfica. Transmite cultura vinícola.",
    cons: "Puede confundir a clientes que no conocen las regiones.",
  },
  {
    title: "Por estilo de vino",
    examples: "Fresco y ligero, afrutado, estructurado, aromático, intenso",
    pros: "Muy accesible. Ayuda al cliente a elegir según sus preferencias reales.",
    cons: "Requiere un buen conocimiento de cada vino para clasificarlo.",
  },
  {
    title: "Por variedad de uva",
    examples: "Tempranillo, Garnacha, Chardonnay, Pinot Noir, Albariño",
    pros: "Claro para clientes con conocimiento básico de vino.",
    cons: "No funciona bien con vinos de coupage o multivarietal.",
  },
];

const clarityTips = [
  { icon: List, title: "Usa categorías claras y consistentes", desc: "Elige un criterio principal de organización y mantenlo en toda la carta. No mezcles regiones con tipos de uva." },
  { icon: Layers, title: "Evita demasiadas subcategorías", desc: "3-5 categorías principales son suficientes. Si necesitas más, es señal de que tienes demasiadas referencias." },
  { icon: BookOpen, title: "Explica los vinos de forma simple", desc: "Notas de cata breves, maridajes sugeridos y una descripción que cualquier cliente pueda entender." },
  { icon: Sparkles, title: "Destaca recomendaciones", desc: "Señala 2-3 vinos por categoría como 'selección del sommelier' o 'recomendado'. Guía la decisión del cliente." },
];

const pricingConcepts = [
  { title: "Escalera de precios", desc: "Distribuye los vinos en una progresión de precios natural: entrada, medio, alto. Cada escalón debe tener al menos 2-3 opciones para que el cliente sienta que elige libremente." },
  { title: "Rangos equilibrados", desc: "Evita saltos de precio bruscos (de 18€ a 45€ sin opciones intermedias). Los huecos en la escalera de precios hacen que el cliente se sienta perdido o empujado." },
  { title: "Vinos ancla", desc: "Incluye 1-2 vinos premium que establezcan el techo de la carta. Su función no es venderse, sino hacer que los vinos de rango medio parezcan más accesibles." },
];

const mistakes = [
  "Mezclar demasiados criterios de organización (región + uva + estilo) en la misma carta",
  "Cartas demasiado largas con más de 80-100 referencias sin guía",
  "No ofrecer vinos por copa, perdiendo ventas de mesas pequeñas o primeras citas con el vino",
  "Descripciones excesivamente técnicas que intimidan al cliente medio",
  "No actualizar la carta cuando cambian las añadas o se agotan referencias",
  "Falta de coherencia entre la carta de vinos y la propuesta gastronómica",
];

const techBenefits = [
  { icon: Search, title: "Filtrar vinos por cualquier criterio", desc: "El cliente elige cómo explorar: por tipo, precio, región, uva o estilo. Cada uno encuentra su camino." },
  { icon: BarChart3, title: "Comparar referencias fácilmente", desc: "Vista comparativa de vinos similares con precios, notas de cata y maridajes lado a lado." },
  { icon: Globe, title: "Explorar por estilo o región", desc: "Navegación visual con mapas de regiones, perfiles de sabor y filtros interactivos." },
  { icon: Utensils, title: "Descubrir maridajes inteligentes", desc: "Sugerencias automáticas de vino según el plato elegido. El cliente descubre vinos que no habría probado." },
];

const ComoOrganizarCarta = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "organizar-carta-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Cómo organizar una carta de vinos en un restaurante",
      description: "Guía práctica para estructurar tu carta de vinos de forma clara, rentable y fácil de entender para el cliente.",
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: "https://winerim.wine/blog/como-organizar-carta-de-vinos",
      inLanguage: "es",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://winerim.wine/blog" },
          { "@type": "ListItem", position: 3, name: "Cómo organizar una carta de vinos", item: "https://winerim.wine/blog/como-organizar-carta-de-vinos" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("organizar-carta-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cómo Organizar una Carta de Vinos en un Restaurante"
        description="Guía práctica para estructurar tu carta de vinos: métodos de organización, errores comunes, estructura de precios y cómo la tecnología puede ayudarte."
        url="https://winerim.wine/blog/como-organizar-carta-de-vinos"
        type="article"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Cómo organizar carta de vinos" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Guía práctica</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            Cómo organizar una <span className="text-gradient-wine italic">carta de vinos</span> en un restaurante
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Guía práctica para estructurar tu carta de vinos de forma clara, rentable y fácil de entender para el cliente.
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
                Una carta mal organizada <span className="text-gradient-wine italic">cuesta dinero</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                La carta de vinos es una de las herramientas de venta más importantes de un restaurante. Sin embargo, muchas cartas están mal estructuradas, lo que genera confusión en el cliente y reduce las ventas de vino.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {problems.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 bg-destructive/5 rounded-lg p-4 border border-destructive/10">
                      <AlertTriangle size={16} className="text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. FORMAS DE ORGANIZAR */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Métodos</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Formas de organizar una <span className="text-gradient-wine italic">carta de vinos</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {orgMethods.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-bold mb-2">{m.title}</h3>
                  <p className="text-xs text-wine font-medium mb-3">{m.examples}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{m.pros}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle size={14} className="text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{m.cons}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÓMO HACER LA CARTA FÁCIL */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Buenas prácticas</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Cómo hacer tu carta <span className="text-gradient-wine italic">fácil de entender</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {clarityTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. IMPORTANCIA DEL PRECIO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Estrategia de precios</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              La estructura de precios <span className="text-gradient-wine italic">importa</span>
            </h2>
          </ScrollReveal>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Organizar una carta de vinos no es solo decidir el orden de las referencias. La distribución de precios influye directamente en la decisión del cliente.
          </p>
          <div className="space-y-5">
            {pricingConcepts.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign size={18} className="text-wine" />
                    <h3 className="font-heading font-bold">{c.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ERRORES COMUNES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Evita estos errores</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Errores comunes al organizar una <span className="text-gradient-wine italic">carta de vinos</span>
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

      {/* 7. CÓMO AYUDA LA TECNOLOGÍA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Tecnología</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              La carta digital: la mejor forma de <span className="text-gradient-wine italic">organizar tus vinos</span>
            </h2>
          </ScrollReveal>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Las cartas digitales eliminan las limitaciones del papel y permiten al cliente explorar los vinos de la forma que prefiera.
          </p>
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
          <ScrollReveal delay={0.3}>
            <div className="mt-8 bg-wine/5 rounded-xl border border-wine/10 p-6 text-center">
              <Sparkles size={20} className="text-wine mx-auto mb-3" />
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                <strong className="text-foreground">Winerim</strong> convierte tu carta de vinos en una experiencia interactiva con filtros, maridajes inteligentes, fichas de vino y recomendaciones personalizadas. Tu carta siempre organizada, siempre actualizada.
              </p>
            </div>
          </ScrollReveal>
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Análisis gratuito</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre si tu carta de vinos está <span className="text-gradient-wine italic">bien organizada</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Analizamos la estructura de tu carta y te damos recomendaciones concretas para mejorarla.
              </p>
              <Link to="/wine-list-analyzer" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Solicitar análisis gratuito <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/blog/cuantos-vinos-carta-restaurante", label: "Cuántos vinos debe tener una carta", type: "guide" },
        { to: "/blog/como-disenar-carta-vinos-rentable", label: "Cómo diseñar una carta rentable", type: "guide" },
        { to: "/wine-list-analyzer", label: "Analizador de carta de vinos", type: "tool" },
        { to: "/recursos/plantilla-carta-de-vinos", label: "Plantilla de carta de vinos", type: "resource" },
      ]} />
      <Footer />
    </div>
  );
};

export default ComoOrganizarCarta;
