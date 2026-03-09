import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Plug, Monitor, Database, Warehouse, Code2,
  RefreshCw, BarChart3, Wine, CheckCircle, Layers, Zap, Globe
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";

interface Integration {
  name: string;
  desc: string;
}

const posIntegrations: Integration[] = [
  { name: "Revo", desc: "Sincronización de ventas y artículos en tiempo real" },
  { name: "Agora", desc: "Conexión directa con pedidos y facturación" },
  { name: "ICG", desc: "Integración con sistemas de hostelería" },
  { name: "BDP", desc: "Gestión de ventas y stock centralizado" },
  { name: "Lightspeed", desc: "Punto de venta cloud para restaurantes" },
  { name: "Square", desc: "Pagos y analítica de ventas integrada" },
];

const erpIntegrations: Integration[] = [
  { name: "Holded", desc: "Facturación, inventario y contabilidad en la nube" },
  { name: "Sage", desc: "ERP para gestión financiera y operativa" },
  { name: "Odoo", desc: "ERP modular de código abierto" },
];

const inventoryFeatures = [
  { icon: Wine, label: "Stock de vinos en tiempo real", desc: "Control automático de existencias por botella y por copa." },
  { icon: RefreshCw, label: "Rotación de referencias", desc: "Identifica qué vinos se venden y cuáles se estancan." },
  { icon: BarChart3, label: "Consumo por botella y copa", desc: "Analítica detallada de consumo para optimizar compras." },
  { icon: Layers, label: "Alertas de stock bajo", desc: "Notificaciones automáticas cuando un vino está por agotarse." },
];

const apiFeatures = [
  { icon: Zap, label: "Automatización", desc: "Sincroniza datos entre Winerim y tus sistemas sin intervención manual." },
  { icon: Database, label: "Sistemas propios", desc: "Conecta Winerim con tu ERP, CRM o cualquier software interno." },
  { icon: Globe, label: "Apps externas", desc: "Integra Winerim con aplicaciones de terceros y plataformas de reservas." },
];

const Integraciones = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "integraciones-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Integraciones de Winerim",
      description: "Winerim se integra con los principales TPV, ERP y sistemas de gestión de restaurantes: Revo, Agora, ICG, Lightspeed, Holded, Sage y más.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Integraciones", item: "https://winerim.wine/integraciones" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("integraciones-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Integraciones de Winerim | POS, ERP, Inventario y API"
        description="Winerim se integra con Revo, Agora, ICG, Lightspeed, Square, Holded, Sage, Odoo y más. Conecta tu carta de vinos con los sistemas que ya usas."
        url="https://winerim.wine/integraciones"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Plug size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Ecosistema conectado</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            Integraciones de{" "}<span className="text-gradient-wine italic">Winerim</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Winerim se integra con los sistemas que ya utilizas en tu restaurante. Sin fricciones, sin cambios.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Link to="/solicitar-demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              Solicitar demo <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                  <Plug size={24} className="text-wine" />
                </div>
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-3">Tu restaurante ya tiene herramientas. Winerim las completa.</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Los restaurantes utilizan sistemas de punto de venta (TPV), ERPs, herramientas de inventario, plataformas de pedidos y más. Winerim está diseñado para convivir con todo tu ecosistema tecnológico, no para reemplazarlo.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Conectamos tu carta de vinos con los datos que ya tienes para que tomes mejores decisiones sobre ventas, stock y precios.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. POS / TPV */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Monitor size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Punto de venta</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Integración con <span className="text-gradient-wine italic">TPV</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Winerim puede integrarse con tu sistema de punto de venta para sincronizar ventas en tiempo real, analizar el consumo de vino y gestionar el inventario de forma automática.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posIntegrations.map((int, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-lg font-bold text-wine">{int.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-1">{int.name}</h3>
                  <p className="text-sm text-muted-foreground">{int.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} className="mt-8">
            <div className="bg-wine/5 border border-wine/20 rounded-xl p-5 flex items-start gap-3">
              <CheckCircle size={18} className="text-wine shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">¿Tu TPV no está en la lista?</span> Nuestro equipo puede desarrollar integraciones personalizadas con cualquier sistema de punto de venta. Contáctanos para más información.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. ERP */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Database size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Gestión empresarial</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Integración con sistemas de{" "}<span className="text-gradient-wine italic">gestión</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Conecta Winerim con tu ERP para mejorar el control de bodega, automatizar pedidos a proveedores y tener una visión completa de costes y márgenes.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5">
            {erpIntegrations.map((int, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-lg font-bold text-wine">{int.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-1">{int.name}</h3>
                  <p className="text-sm text-muted-foreground">{int.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INVENTARIO */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Warehouse size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Control de bodega</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Gestión de <span className="text-gradient-wine italic">inventario</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Winerim te ayuda a controlar cada botella de tu bodega, desde la entrada hasta la venta, pasando por el servicio por copa.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {inventoryFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">{feat.label}</h3>
                      <p className="text-sm text-muted-foreground">{feat.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. API */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Code2 size={20} className="text-wine" />
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">Para desarrolladores</p>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              API de <span className="text-gradient-wine italic">Winerim</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Winerim dispone de una API completa para integraciones personalizadas. Conecta cualquier sistema con tu carta de vinos de forma programática.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {apiFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-semibold mb-1">{feat.label}</h3>
                    <p className="text-sm text-muted-foreground">{feat.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-6 md:p-8">
              <div className="font-mono text-xs text-muted-foreground bg-background rounded-lg p-5 overflow-x-auto">
                <pre>{`GET  /api/v1/wine-list          → Obtener carta completa
GET  /api/v1/wines/:id          → Detalle de un vino
POST /api/v1/wines              → Añadir referencia
PUT  /api/v1/wines/:id/stock    → Actualizar stock
GET  /api/v1/analytics/sales    → Datos de ventas
GET  /api/v1/analytics/rotation → Rotación de bodega`}</pre>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Documentación completa disponible para clientes del plan Enterprise.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="section-padding bg-gradient-dark">
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Conecta todo</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Integra Winerim con tu ecosistema{" "}<span className="text-gradient-wine italic">tecnológico</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                Te mostramos cómo conectar Winerim con los sistemas que ya utilizas. Sin fricciones, sin cambios.
              </p>
              <Link to="/solicitar-demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Solicitar demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integraciones;
