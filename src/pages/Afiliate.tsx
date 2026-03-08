import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart3, Package, Layers, PenTool, Users, Zap, Filter, Smartphone, QrCode, Headphones, Activity, ShoppingCart, CreditCard, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";

const features = [
  { icon: TrendingUp, title: "Potencia las ventas", desc: "Duplica el valor de tu ticket medio" },
  { icon: BarChart3, title: "Rotación de bodega", desc: "Aumenta las ventas de tu selección de vinos" },
  { icon: Package, title: "Gestión de inventario", desc: "Mejora la administración de tu stock" },
  { icon: Layers, title: "Flexibilidad en tu oferta", desc: "Adapta tu carta según temporada y disponibilidad" },
  { icon: PenTool, title: "Editor exclusivo", desc: "Maneja tu propio editor para realizar tus actualizaciones diarias" },
  { icon: Users, title: "Selección personalizada", desc: "Ofrece sugerencias personalizadas a cada cliente" },
  { icon: Zap, title: "Sugerencias instantáneas", desc: "Proporciona recomendaciones de forma inmediata" },
  { icon: Filter, title: "Filtros eficientes", desc: "Simplifica la búsqueda de tus clientes con filtros concisos" },
  { icon: Smartphone, title: "Instalación sencilla", desc: "Implementación simple y actualizaciones constantes" },
  { icon: QrCode, title: "Compatibilidad QR", desc: "Disponible en cualquier formato a través de códigos QR" },
  { icon: Headphones, title: "Soporte técnico", desc: "Resuelve dudas con nuestro equipo de soporte" },
  { icon: Activity, title: "Información en tiempo real", desc: "Accede a tus datos actualizados de forma inmediata" },
  { icon: BarChart3, title: "Analítica en tiempo real", desc: "Controla los datos y comportamiento de tu bodega y clientes" },
  { icon: ShoppingCart, title: "Gestión de compras", desc: "Controla y mantén en seguimiento tus pedidos" },
  { icon: CreditCard, title: "Historial de ventas", desc: "Informes de tus ventas y de tu equipo" },
  { icon: Settings, title: "Integraciones", desc: "Nos conectamos a tu TPV, ERP y más" },
];

const Afiliate = () => {
  const { get } = usePageContent("afiliate");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title="Programa de Afiliados" description="Únete a la red de establecimientos que están transformando su carta de vinos con Winerim." url="https://winerim.wine/afiliate" />
      <main>
        <section className="pt-32 pb-20 section-padding text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {get("hero", "title_prefix", "Programa de")}{" "}
            <span className="text-gradient-wine">{get("hero", "title_highlight", "Afiliados")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {get("hero", "subtitle", "Únete a la red de establecimientos que están transformando su carta de vinos. Accede a todas las herramientas de Winerim.")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link to="/demo" className="inline-flex bg-gradient-wine text-primary-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
              {get("hero", "cta", "Solicita tu demo")}
            </Link>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-gradient-card border border-border rounded-xl p-6 hover:border-wine transition-colors group">
                <f.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section-padding bg-gradient-wine text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {get("cta", "title", "¿Listo para transformar tu carta de vinos?")}
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              {get("cta", "subtitle", "Contacta con nosotros y descubre cómo Winerim puede impulsar tu negocio.")}
            </p>
            <Link to="/contacto" className="inline-flex bg-background text-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:bg-background/90 transition-colors">
              {get("cta", "button", "Contactar")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Afiliate;
