import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight, TrendingUp, Wine, MapPin, Utensils, BarChart3,
  AlertTriangle, CheckCircle, ShoppingCart, RotateCcw
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

interface CaseStudy {
  restaurant: string;
  city: string;
  cuisine: string;
  references: number;
  situation: string;
  problems: string[];
  implementation: string;
  results: string;
  metrics: { label: string; value: string; icon: typeof TrendingUp }[];
}

const cases: CaseStudy[] = [
  {
    restaurant: "Restaurante La Viña",
    city: "Madrid",
    cuisine: "Cocina mediterránea de autor",
    references: 85,
    situation: "Restaurante con 1 estrella Michelin y una bodega amplia pero mal aprovechada. La carta de vinos era un PDF extenso que el personal repartía en mesa. Los clientes se sentían abrumados y la mayoría pedía 'el vino de la casa' o referencias conocidas.",
    problems: [
      "Carta en PDF de 12 páginas difícil de navegar",
      "Solo el 20% de las referencias rotaban regularmente",
      "El personal no tenía tiempo de recomendar en servicio",
      "Ticket medio de vino estancado en 28 €",
      "Vinos premium sin visibilidad ni ventas",
    ],
    implementation: "Se digitalizó la carta completa con Winerim, se añadieron maridajes con los platos del menú degustación y se activaron recomendaciones inteligentes. El equipo de sala recibió formación para usar la herramienta como apoyo en mesa.",
    results: "En 3 meses, las ventas de vino aumentaron un 34%. Los clientes empezaron a explorar referencias que antes ignoraban y el personal ganó confianza para recomendar. Los vinos premium pasaron de representar el 5% al 18% de las ventas.",
    metrics: [
      { label: "Incremento ventas de vino", value: "+34%", icon: TrendingUp },
      { label: "Aumento ticket medio", value: "+12 €", icon: ShoppingCart },
      { label: "Rotación de bodega", value: "+45%", icon: RotateCcw },
    ],
  },
  {
    restaurant: "Gastrobar El Celler",
    city: "Barcelona",
    cuisine: "Tapas gastronómicas y vinos naturales",
    references: 42,
    situation: "Gastrobar especializado en vinos naturales y de autor, con una clientela joven e interesada pero que no conocía las referencias. La carta estaba escrita en una pizarra que se actualizaba a mano y los nombres de los vinos no significaban nada para la mayoría.",
    problems: [
      "Carta en pizarra imposible de mantener actualizada",
      "Vinos desconocidos sin contexto ni explicación",
      "Clientes que pedían siempre lo mismo por inseguridad",
      "No se ofrecían maridajes con las tapas",
      "Merma alta en vinos por copa que no se vendían",
    ],
    implementation: "Se implementó una carta digital con descripciones claras de cada vino natural, perfil de sabor visual y maridajes automáticos con cada tapa. Se activó una selección rotativa de vinos por copa con recomendación destacada.",
    results: "La venta de vino por copa se duplicó en 6 semanas. Los clientes empezaron a pedir vinos que antes solo el dueño conocía. La merma se redujo un 60% gracias a la mejor rotación de las copas.",
    metrics: [
      { label: "Incremento ventas de vino", value: "+52%", icon: TrendingUp },
      { label: "Aumento ticket medio", value: "+8 €", icon: ShoppingCart },
      { label: "Reducción de merma", value: "-60%", icon: RotateCcw },
    ],
  },
  {
    restaurant: "Hotel Gran Vía Palace",
    city: "Valencia",
    cuisine: "Cocina internacional – Restaurante y bar del hotel",
    references: 120,
    situation: "Hotel 5 estrellas con restaurante principal y bar de cócteles, ambos con carta de vinos extensa pero descoordinada. Cada punto de venta tenía su propia carta sin coherencia de precios ni de selección. El sommelier solo estaba disponible en cenas.",
    problems: [
      "Dos cartas diferentes sin coherencia de marca",
      "Precios inconsistentes entre restaurante y bar",
      "120 referencias sin análisis de rendimiento",
      "Sommelier disponible solo 4 horas al día",
      "Clientes internacionales sin acceso a información en su idioma",
    ],
    implementation: "Se unificaron ambas cartas en Winerim con precios coherentes y se activó la traducción automática a inglés, francés y alemán. El sistema de recomendación sustituyó al sommelier en las horas sin cobertura y se eliminaron 30 referencias duplicadas.",
    results: "El revenue de vino del hotel creció un 28% en el primer trimestre. La unificación de cartas eliminó confusiones de precio y los clientes internacionales aumentaron su consumo de vino un 40%.",
    metrics: [
      { label: "Incremento ventas de vino", value: "+28%", icon: TrendingUp },
      { label: "Aumento ticket medio", value: "+15 €", icon: ShoppingCart },
      { label: "Mejora rotación", value: "+38%", icon: RotateCcw },
    ],
  },
];

const CasosExito = () => {
  useEffect(() => {
    const breadcrumb = document.createElement("script");
    breadcrumb.id = "casos-breadcrumb-jsonld";
    breadcrumb.type = "application/ld+json";
    breadcrumb.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
        { "@type": "ListItem", position: 2, name: "Casos de éxito", item: "https://winerim.wine/casos-exito" },
      ],
    });
    document.head.appendChild(breadcrumb);
    return () => { document.getElementById("casos-breadcrumb-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Casos de Éxito | Restaurantes que Venden Más Vino con Winerim"
        description="Descubre cómo restaurantes reales utilizan Winerim para aumentar ventas de vino, mejorar el ticket medio y optimizar su bodega. Resultados medibles y verificables."
        url="https://winerim.wine/casos-exito"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: "Casos de éxito" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Resultados reales</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl"
          >
            Casos <span className="text-gradient-wine italic">reales</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Cómo restaurantes utilizan Winerim para vender más vino, mejorar márgenes y optimizar su bodega.
          </motion.p>
        </div>
      </section>

      {/* CASES */}
      {cases.map((cs, idx) => (
        <section key={idx} className={`section-padding ${idx % 2 === 0 ? "" : "bg-gradient-dark"}`}>
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <ScrollReveal className="mb-10">
              <div className="bg-gradient-card rounded-2xl border border-border p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-1">{cs.restaurant}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-wine" />{cs.city}</span>
                      <span className="flex items-center gap-1.5"><Utensils size={14} className="text-wine" />{cs.cuisine}</span>
                      <span className="flex items-center gap-1.5"><Wine size={14} className="text-wine" />{cs.references} referencias</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {cs.metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="bg-wine/5 border border-wine/20 rounded-xl p-4 text-center"
                      >
                        <Icon size={16} className="text-wine mx-auto mb-1" />
                        <p className="font-heading text-2xl font-bold text-wine">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Story */}
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-destructive" />
                    Situación inicial
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.situation}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-destructive" />
                    Problemas detectados
                  </h3>
                  <ul className="space-y-2">
                    {cs.problems.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive mt-1">•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <Wine size={16} className="text-wine" />
                    Implementación
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.implementation}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="bg-wine/5 border border-wine/20 rounded-xl p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-wine" />
                    Resultados
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cs.results}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Tu restaurante puede ser el siguiente</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre el potencial de tu <span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Envíanos tu carta y te mostramos qué resultados podrías obtener. Sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/analisis-carta"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Solicitar análisis de carta
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/demo"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Solicitar demo
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

export default CasosExito;
