import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart3, Package, Layers, PenTool, Users, Zap, Filter, Smartphone, QrCode, Headphones, Activity, ShoppingCart, CreditCard, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, BarChart3, Package, Layers, PenTool, Users, Zap, Filter,
  Smartphone, QrCode, Headphones, Activity, ShoppingCart, CreditCard, Settings,
};

const defaultFeatures = [
  { icon: "TrendingUp", title: "Potencia las ventas", desc: "Duplica el valor de tu ticket medio" },
  { icon: "BarChart3", title: "Rotación de bodega", desc: "Aumenta las ventas de tu selección de vinos" },
  { icon: "Package", title: "Gestión de inventario", desc: "Mejora la administración de tu stock" },
  { icon: "Layers", title: "Flexibilidad en tu oferta", desc: "Adapta tu carta según temporada y disponibilidad" },
  { icon: "PenTool", title: "Editor exclusivo", desc: "Maneja tu propio editor para realizar tus actualizaciones diarias" },
  { icon: "Users", title: "Selección personalizada", desc: "Ofrece sugerencias personalizadas a cada cliente" },
  { icon: "Zap", title: "Sugerencias instantáneas", desc: "Proporciona recomendaciones de forma inmediata" },
  { icon: "Filter", title: "Filtros eficientes", desc: "Simplifica la búsqueda de tus clientes con filtros concisos" },
  { icon: "Smartphone", title: "Instalación sencilla", desc: "Implementación simple y actualizaciones constantes" },
  { icon: "QrCode", title: "Compatibilidad QR", desc: "Disponible en cualquier formato a través de códigos QR" },
  { icon: "Headphones", title: "Soporte técnico", desc: "Resuelve dudas con nuestro equipo de soporte" },
  { icon: "Activity", title: "Información en tiempo real", desc: "Accede a tus datos actualizados de forma inmediata" },
  { icon: "BarChart3", title: "Analítica en tiempo real", desc: "Controla los datos y comportamiento de tu bodega y clientes" },
  { icon: "ShoppingCart", title: "Gestión de compras", desc: "Controla y mantén en seguimiento tus pedidos" },
  { icon: "CreditCard", title: "Historial de ventas", desc: "Informes de tus ventas y de tu equipo" },
  { icon: "Settings", title: "Integraciones", desc: "Nos conectamos a tu TPV, ERP y más" },
];

type LangContent = {
  metaTitle: string; metaDesc: string;
  heroTitlePrefix: string; heroTitleHighlight: string;
  heroSubtitle: string; heroCta: string;
  ctaTitle: string; ctaSubtitle: string; ctaButton: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Programa de Afiliados", metaDesc: "Únete a la red de establecimientos que están transformando su carta de vinos con Winerim.",
    heroTitlePrefix: "Programa de", heroTitleHighlight: "Afiliados",
    heroSubtitle: "Únete a la red de establecimientos que están transformando su carta de vinos. Accede a todas las herramientas de Winerim.",
    heroCta: "Solicita tu demo",
    ctaTitle: "¿Listo para transformar tu carta de vinos?",
    ctaSubtitle: "Contacta con nosotros y descubre cómo Winerim puede impulsar tu negocio.",
    ctaButton: "Contactar",
  },
  en: {
    metaTitle: "Affiliate Program", metaDesc: "Join the network of establishments transforming their wine lists with Winerim.",
    heroTitlePrefix: "Affiliate", heroTitleHighlight: "Program",
    heroSubtitle: "Join the network of establishments transforming their wine lists. Access all Winerim tools.",
    heroCta: "Request your demo",
    ctaTitle: "Ready to transform your wine list?",
    ctaSubtitle: "Contact us and discover how Winerim can boost your business.",
    ctaButton: "Contact us",
  },
  it: {
    metaTitle: "Programma Affiliati", metaDesc: "Unisciti alla rete di ristoranti che stanno trasformando la loro carta dei vini con Winerim.",
    heroTitlePrefix: "Programma", heroTitleHighlight: "Affiliati",
    heroSubtitle: "Unisciti alla rete di ristoranti che stanno trasformando la loro carta dei vini. Accedi a tutti gli strumenti di Winerim.",
    heroCta: "Richiedi la tua demo",
    ctaTitle: "Pronto a trasformare la tua carta dei vini?",
    ctaSubtitle: "Contattaci e scopri come Winerim può potenziare il tuo business.",
    ctaButton: "Contattaci",
  },
  fr: {
    metaTitle: "Programme Affiliés", metaDesc: "Rejoignez le réseau d'établissements qui transforment leur carte des vins avec Winerim.",
    heroTitlePrefix: "Programme", heroTitleHighlight: "d'Affiliés",
    heroSubtitle: "Rejoignez le réseau d'établissements qui transforment leur carte des vins. Accédez à tous les outils Winerim.",
    heroCta: "Demandez votre démo",
    ctaTitle: "Prêt à transformer votre carte des vins ?",
    ctaSubtitle: "Contactez-nous et découvrez comment Winerim peut booster votre activité.",
    ctaButton: "Nous contacter",
  },
};

const Afiliate = () => {
  const { get, getJson } = usePageContent("afiliate");
  const { lang, localePath } = useLanguage();
  const t = langContent[lang] || langContent.es;
  const features = getJson<typeof defaultFeatures>("features", "items", defaultFeatures);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/afiliate" />
      <main>
        <section className="pt-32 pb-20 section-padding text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {lang === "es" ? get("hero", "title_prefix", t.heroTitlePrefix) : t.heroTitlePrefix}{" "}
            <span className="text-gradient-wine">{lang === "es" ? get("hero", "title_highlight", t.heroTitleHighlight) : t.heroTitleHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {lang === "es" ? get("hero", "subtitle", t.heroSubtitle) : t.heroSubtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link to={localePath("/demo")} className="inline-flex bg-gradient-wine text-primary-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
              {lang === "es" ? get("hero", "cta", t.heroCta) : t.heroCta}
            </Link>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || TrendingUp;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-gradient-card border border-border rounded-xl p-6 hover:border-wine transition-colors group">
                  <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="section-padding bg-gradient-wine text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {lang === "es" ? get("cta", "title", t.ctaTitle) : t.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              {lang === "es" ? get("cta", "subtitle", t.ctaSubtitle) : t.ctaSubtitle}
            </p>
            <Link to={localePath("/contacto")} className="inline-flex bg-background text-foreground px-8 py-3 rounded text-sm font-semibold tracking-wider uppercase hover:bg-background/90 transition-colors">
              {lang === "es" ? get("cta", "button", t.ctaButton) : t.ctaButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Afiliate;
