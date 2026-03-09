import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Check, Zap, Crown, Building2,
  BarChart3, TrendingUp, RotateCcw, ChevronDown, Sparkles,
  Layers, Brain, GitCompare, DollarSign, Warehouse
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import InternalLinks from "@/components/seo/InternalLinks";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    subtitle: "Ideal para restaurantes pequeños",
    price: null,
    highlight: false,
    features: [
      "Carta digital de vinos",
      "Filtros interactivos",
      "Fichas de vino completas",
      "Información visual por referencia",
      "Maridajes básicos",
      "Soporte por email",
    ],
    cta: { label: "Empezar", href: "/solicitar-demo" },
  },
  {
    name: "Pro",
    icon: Crown,
    subtitle: "Para restaurantes con carta amplia",
    price: null,
    highlight: true,
    badge: "Más popular",
    features: [
      "Todo lo del plan Starter",
      "Analítica de ventas de vino",
      "Optimización de carta con IA",
      "Wine Mapping interactivo",
      "Recomendaciones inteligentes",
      "Venta por copa optimizada",
      "Comparador de vinos",
      "Soporte prioritario",
    ],
    cta: { label: "Solicitar demo", href: "/solicitar-demo" },
  },
  {
    name: "Enterprise",
    icon: Building2,
    subtitle: "Grupos de restauración y grandes proyectos",
    price: null,
    highlight: false,
    features: [
      "Todo lo del plan Pro",
      "Multi-local centralizado",
      "Integraciones POS y PMS",
      "Analítica avanzada y reporting",
      "API personalizada",
      "Onboarding dedicado",
      "Account manager asignado",
      "SLA garantizado",
    ],
    cta: { label: "Contactar", href: "/contacto" },
  },
];

const capabilities = [
  { icon: Wine, label: "Carta digital interactiva" },
  { icon: Brain, label: "Maridajes inteligentes" },
  { icon: GitCompare, label: "Comparador de vinos" },
  { icon: BarChart3, label: "Analítica de ventas" },
  { icon: DollarSign, label: "Optimización de precios" },
  { icon: Warehouse, label: "Gestión de bodega" },
];

const metrics = [
  { value: "+20%", label: "Ventas de vino", icon: TrendingUp },
  { value: "+15%", label: "Ticket medio", icon: BarChart3 },
  { value: "+30%", label: "Rotación de referencias", icon: RotateCcw },
];

const faqs = [
  {
    q: "¿Cuánto tarda la implementación?",
    a: "La mayoría de restaurantes están operativos en menos de 48 horas. Nos encargamos de digitalizar tu carta de vinos y configurar todo. Solo necesitas un enlace a tu carta actual o un PDF.",
  },
  {
    q: "¿Necesito cambiar mi POS?",
    a: "No. Winerim es compatible con cualquier sistema de punto de venta. En el plan Enterprise ofrecemos integraciones directas con los POS más utilizados en hostelería.",
  },
  {
    q: "¿Es compatible con cualquier carta de vinos?",
    a: "Sí. Da igual si tienes 15 referencias o 500. Winerim se adapta al tamaño de tu carta y la optimiza para que cada vino tenga su espacio y su momento.",
  },
  {
    q: "¿Los clientes necesitan descargar una app?",
    a: "No. La carta digital es accesible desde el navegador del móvil, tablet o cualquier dispositivo. Sin descargas, sin fricciones. El cliente escanea un QR y accede directamente.",
  },
  {
    q: "¿Puedo probar Winerim antes de decidir?",
    a: "Sí. Ofrecemos un análisis gratuito de tu carta de vinos y una demo personalizada donde te mostramos el potencial de mejora para tu restaurante concreto.",
  },
  {
    q: "¿Qué pasa si quiero cancelar?",
    a: "Sin permanencia. Puedes cancelar cuando quieras. Tus datos siempre te pertenecen y te los exportamos sin coste.",
  },
];

const Precios = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "precios-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Planes y precios de Winerim",
      description: "Descubre los planes de Winerim para digitalizar y optimizar la carta de vinos de tu restaurante.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Precios", item: "https://winerim.wine/precios" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("precios-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Planes y Precios de Winerim | Carta de Vinos Digital para Restaurantes"
        description="Descubre los planes de Winerim: Starter, Pro y Enterprise. Digitaliza tu carta de vinos, aumenta ventas y optimiza márgenes. Solicita una demo gratuita."
        url="https://winerim.wine/precios"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
          <Breadcrumbs items={[{ label: "Precios" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Sparkles size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Planes y precios</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl mx-auto">
            Planes de <span className="text-gradient-wine italic">Winerim</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Convierte tu carta de vinos en una herramienta que aumenta tus ventas.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/solicitar-demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              Solicitar demo <ArrowRight size={16} />
            </Link>
            <Link to="/analisis-carta" className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              Analizar mi carta
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. MODELO */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                Winerim adapta sus planes al <span className="text-foreground font-medium">tamaño del restaurante</span> y al <span className="text-foreground font-medium">número de referencias de vino</span>. El objetivo es que cualquier restaurante pueda digitalizar y optimizar su carta de vinos, independientemente de su tamaño.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. PLANES */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className={`relative rounded-2xl border p-7 md:p-8 h-full flex flex-col ${
                    plan.highlight
                      ? "border-wine bg-wine/[0.03] shadow-lg shadow-wine/5"
                      : "border-border bg-gradient-card"
                  }`}>
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-4 py-1 rounded-full bg-gradient-wine text-primary-foreground text-xs font-semibold tracking-wider uppercase">
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plan.highlight ? "bg-wine/15" : "bg-wine/10"}`}>
                        <Icon size={20} className="text-wine" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">{plan.subtitle}</p>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-wine mb-1">Precio personalizado</p>
                      <p className="text-xs text-muted-foreground">Según número de referencias y necesidades</p>
                    </div>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm">
                          <Check size={14} className="text-wine shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={plan.cta.href}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all ${
                        plan.highlight
                          ? "bg-gradient-wine text-primary-foreground hover:opacity-90 hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                          : "border border-border hover:border-wine/50 hover:bg-wine/5"
                      }`}
                    >
                      {plan.cta.label}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. QUÉ INCLUYE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Todo incluido</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Qué incluye <span className="text-gradient-wine italic">Winerim</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <span className="font-medium text-sm">{cap.label}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. RESULTADOS */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Impacto real</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Resultados que obtienen nuestros{" "}<span className="text-gradient-wine italic">clientes</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <p className="font-heading text-4xl md:text-5xl font-bold text-wine mb-2">{m.value}</p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} schemaId="precios" />

      {/* 7. CTA FINAL */}
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Da el paso</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Descubre cuánto más podrías vender con tu{" "}<span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Te mostramos el potencial de mejora de tu carta con una demo personalizada. Sin compromiso.
              </p>
              <Link to="/solicitar-demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <InternalLinks links={[
        { to: "/software-carta-de-vinos", label: "Software carta de vinos", type: "solution" },
        { to: "/analisis-carta", label: "Análisis gratuito de carta", type: "tool" },
        { to: "/casos-exito", label: "Casos de éxito", type: "resource" },
        { to: "/demo", label: "Solicitar demo gratuita", type: "solution" },
      ]} />
      <Footer />
    </div>
  );
};

export default Precios;
