import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Monitor,
  Filter,
  Utensils,
  Eye,
  BarChart3,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  Users,
  Wine,
  FileText,
  Smartphone,
  CheckCircle2,
  XCircle,
  MinusCircle,
  AlertTriangle,
  Layers,
  DollarSign,
  RefreshCw,
  Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import mockupImg from "@/assets/winerim-mockup.png";

/* ── Intro problems ── */
const problems = [
  "Cartas difíciles de entender para el comensal",
  "Falta de recomendaciones que guíen la compra",
  "Mala gestión de precios y escalado de gama",
  "Dificultad para actualizar referencias en tiempo real",
  "Ausencia total de analítica sobre ventas de vino",
];

/* ── What is ── */
const whatIs = [
  { icon: Layers, text: "Gestionar todas las referencias de tu bodega de forma centralizada" },
  { icon: Filter, text: "Organizar la carta por estilos, regiones, precios o maridajes" },
  { icon: Sparkles, text: "Recomendar vinos de forma automática e inteligente" },
  { icon: Utensils, text: "Mostrar maridajes personalizados con cada plato del menú" },
  { icon: Eye, text: "Mejorar la experiencia del cliente con información visual y accesible" },
  { icon: BarChart3, text: "Analizar ventas, rotación y rentabilidad de cada referencia" },
];

/* ── Features ── */
const features = [
  { icon: Monitor, title: "Carta digital interactiva", desc: "El comensal navega tu carta desde su móvil con una experiencia visual moderna que invita a explorar y comprar." },
  { icon: Filter, title: "Filtros inteligentes", desc: "Búsqueda por tipo, región, precio, maridaje o estilo. El cliente encuentra su vino ideal en segundos." },
  { icon: Utensils, title: "Maridajes automáticos", desc: "El sistema sugiere vinos que combinan con cada plato del menú, impulsando las ventas cruzadas." },
  { icon: Eye, title: "Información clara para el cliente", desc: "Notas de cata accesibles, imágenes de calidad y descripciones sin tecnicismos que cualquier persona entiende." },
  { icon: Search, title: "Comparador de vinos", desc: "El comensal compara opciones lado a lado para elegir con confianza y descubrir vinos de mayor valor." },
  { icon: Sparkles, title: "Recomendaciones personalizadas", desc: "La IA aprende del contexto y sugiere vinos según las preferencias del comensal, el plato elegido y la ocasión." },
];

/* ── Benefits ── */
const benefits = [
  { icon: TrendingUp, title: "Aumentar el ticket medio", desc: "Las recomendaciones inteligentes y el upselling contextual incrementan el gasto medio en vino entre un 15 % y un 25 %." },
  { icon: RefreshCw, title: "Mejorar la rotación de vinos", desc: "La analítica identifica vinos sin rotación y sugiere acciones para dar salida a stock parado." },
  { icon: Users, title: "Ayudar al personal de sala", desc: "El equipo no necesita ser sommelier: la carta digital hace el trabajo de recomendación por ellos." },
  { icon: ShoppingCart, title: "Facilitar la decisión del cliente", desc: "Una carta clara, visual y con recomendaciones reduce la indecisión y aumenta la satisfacción." },
  { icon: Wine, title: "Mejorar la experiencia gastronómica", desc: "El vino deja de ser una decisión estresante y se convierte en parte memorable de la experiencia." },
];

/* ── Comparison ── */
const comparisonRows = [
  { feature: "Actualización en tiempo real", paper: false, pdf: false, smart: true },
  { feature: "Recomendaciones personalizadas", paper: false, pdf: false, smart: true },
  { feature: "Maridajes automáticos", paper: false, pdf: false, smart: true },
  { feature: "Filtros y búsqueda", paper: false, pdf: false, smart: true },
  { feature: "Analítica de ventas", paper: false, pdf: false, smart: true },
  { feature: "Información visual y accesible", paper: false, pdf: "partial", smart: true },
  { feature: "Coste de impresión", paper: true, pdf: false, smart: false },
  { feature: "Necesita conexión", paper: false, pdf: "partial", smart: true },
];

/* ── FAQ ── */
const faqs = [
  { q: "¿Qué es un software de carta de vinos?", a: "Es una plataforma digital que permite a restaurantes gestionar, organizar y presentar su carta de vinos de forma interactiva, con funcionalidades como recomendaciones inteligentes, maridajes automáticos y analítica de ventas." },
  { q: "¿Cuánto cuesta implementar un software de carta de vinos?", a: "Depende de la plataforma. Winerim ofrece planes adaptados al tamaño del restaurante, con un análisis gratuito de la carta como punto de partida para evaluar el potencial de mejora." },
  { q: "¿Es difícil de implementar para el restaurante?", a: "No. Winerim se configura en menos de 24 horas. Solo necesitas enviar tu carta de vinos actual y el equipo se encarga de digitalizarla y optimizarla." },
  { q: "¿Funciona en cualquier dispositivo?", a: "Sí. La carta digital es 100 % responsive y funciona en móviles, tablets y ordenadores sin necesidad de instalar ninguna aplicación." },
  { q: "¿Sustituye al sommelier?", a: "No sustituye, complementa. La plataforma ayuda al personal de sala a recomendar con confianza y ofrece recomendaciones automáticas cuando el sommelier no está disponible." },
];

const CellIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <CheckCircle2 size={18} className="text-wine mx-auto" />;
  if (value === "partial") return <MinusCircle size={18} className="text-accent mx-auto" />;
  return <XCircle size={18} className="text-muted-foreground/40 mx-auto" />;
};

const SoftwareCartaVinos = () => {
  useEffect(() => {
    const faqScript = document.createElement("script");
    faqScript.id = "faq-jsonld-software";
    faqScript.type = "application/ld+json";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(faqScript);

    return () => { faqScript.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Software para Carta de Vinos en Restaurantes | Winerim"
        description="El mejor software para gestionar tu carta de vinos: recomendaciones con IA, maridajes automáticos, analítica y carta digital interactiva para restaurantes."
        url="https://winerim.wine/software-carta-de-vinos"
        hreflang={[
          { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
          { lang: "en", url: "https://winerim.wine/wine-list-management-software" },
        ]}
      />
      <Navbar />

      <main>
        {/* ═══════════ 1. HERO ═══════════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Breadcrumbs items={[{ label: "Software carta de vinos" }]} />
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8">
                  <Monitor size={14} className="text-wine" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Software para hostelería</span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
                  Software para{" "}
                  <span className="text-gradient-wine italic">carta de vinos</span>{" "}
                  en restaurantes
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  Gestiona tu carta, optimiza tu bodega y aumenta las ventas de vino con una plataforma diseñada para hostelería.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300"
                  >
                    Solicitar demo
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/analisis-carta"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
                  >
                    Analizar mi carta de vinos
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
                  <img
                    src={mockupImg}
                    alt="Software carta de vinos digital Winerim en tablet y móvil"
                    className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* ═══════════ 2. INTRODUCCIÓN ═══════════ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                La carta de vinos en papel{" "}
                <span className="text-gradient-wine">ya no es suficiente</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Muchos restaurantes siguen utilizando cartas estáticas en papel o PDF que no ayudan a vender vino. Son difíciles de actualizar, no ofrecen información relevante al comensal y no generan ningún dato útil para el negocio.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Un <strong className="text-foreground">software especializado para carta de vinos</strong> resuelve estos problemas y convierte la carta en una herramienta activa de venta.
              </p>
            </ScrollReveal>

            <div className="grid gap-3">
              {problems.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-3 bg-gradient-card rounded-lg border border-border p-4">
                    <AlertTriangle size={16} className="text-accent flex-shrink-0" />
                    <span className="text-foreground/90">{p}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ 3. QUÉ ES ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Concepto</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Qué es un software de{" "}
                <span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Una plataforma inteligente que centraliza la gestión de tu bodega y transforma la experiencia del comensal.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-5">
              {whatIs.map((w, i) => {
                const Icon = w.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="flex items-start gap-4 bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/20 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{w.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 4. FUNCIONALIDADES ═══════════ */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Funcionalidades</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Todo lo que necesitas para{" "}
                <span className="text-gradient-wine italic">vender más vino</span>
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.07}>
                    <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                        <Icon size={24} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 5. BENEFICIOS ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Beneficios</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Qué gana tu restaurante con{" "}
                <span className="text-gradient-wine italic">Winerim</span>
              </h2>
            </ScrollReveal>

            <div className="space-y-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8 hover:border-wine/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-wine/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon size={22} className="text-wine" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold mb-1">{b.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 6. RESULTADOS ═══════════ */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Resultados</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Resultados reales con{" "}
                <span className="text-gradient-wine italic">Winerim</span>
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

        {/* ═══════════ 7. COMPARATIVA ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Carta tradicional vs.{" "}
                <span className="text-gradient-wine italic">carta digital inteligente</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-3 font-semibold text-foreground">Característica</th>
                      <th className="text-center py-4 px-3 font-semibold text-muted-foreground">
                        <FileText size={16} className="mx-auto mb-1" />Papel
                      </th>
                      <th className="text-center py-4 px-3 font-semibold text-muted-foreground">
                        <Smartphone size={16} className="mx-auto mb-1" />PDF
                      </th>
                      <th className="text-center py-4 px-3 font-semibold text-wine">
                        <Sparkles size={16} className="mx-auto mb-1" />Inteligente
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="py-3.5 px-3 text-foreground/90">{row.feature}</td>
                        <td className="py-3.5 px-3"><CellIcon value={row.paper} /></td>
                        <td className="py-3.5 px-3"><CellIcon value={row.pdf} /></td>
                        <td className="py-3.5 px-3"><CellIcon value={row.smart} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Preguntas frecuentes
              </h2>
            </ScrollReveal>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <details className="group bg-gradient-card rounded-xl border border-border hover:border-wine/20 transition-colors">
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-foreground font-semibold">
                      <span className="pr-4">{faq.q}</span>
                      <span className="text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180">▾</span>
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

        {/* ═══════════ 8. CTA FINAL ═══════════ */}
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
                <div className="relative z-10">
                  <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                    Empieza hoy
                  </p>
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Convierte tu carta de vinos en un sistema que{" "}
                    <span className="text-gradient-wine italic">vende más vino</span>
                  </h2>
                  <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                    Descubre cómo Winerim puede transformar la forma en que tu restaurante vende vino. Sin compromiso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/demo"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                    >
                      Solicitar demo
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/analisis-carta"
                      className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                    >
                      Analizar mi carta gratis
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <InternalLinks links={[
        { to: "/carta-papel-vs-digital", label: "Carta papel vs digital", type: "guide" },
        { to: "/inteligencia-artificial-restaurantes", label: "IA para restaurantes", type: "guide" },
        { to: "/wine-roi-calculator", label: "Calculadora de ROI", type: "tool" },
        { to: "/casos-exito", label: "Casos de éxito", type: "guide" },
      ]} />
      <Footer />
    </div>
  );
};

export default SoftwareCartaVinos;
