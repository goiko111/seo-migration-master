import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Brain, TrendingUp, BarChart3, Zap, Target, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "IA táctica aplicada al vino",
    description: "Algoritmos que analizan el comportamiento de tu carta en tiempo real y sugieren acciones concretas para maximizar ventas.",
  },
  {
    icon: TrendingUp,
    title: "Predicción de demanda",
    description: "Anticipa qué vinos van a venderse más según temporada, tendencias y el historial de tu restaurante.",
  },
  {
    icon: Target,
    title: "Recomendaciones dinámicas",
    description: "La carta se adapta automáticamente destacando los vinos con mayor potencial de venta en cada momento.",
  },
  {
    icon: BarChart3,
    title: "Optimización de márgenes",
    description: "Identifica oportunidades de pricing y posicionamiento para mejorar la rentabilidad de cada referencia.",
  },
  {
    icon: RefreshCw,
    title: "Rotación inteligente",
    description: "Detecta vinos estancados y propone estrategias para reactivar su venta antes de que se conviertan en stock muerto.",
  },
  {
    icon: Zap,
    title: "Alertas proactivas",
    description: "Recibe notificaciones cuando hay oportunidades de mejora o cuando un vino necesita atención.",
  },
];

const InteligenciaDinamica = () => {
  const { t, localePath } = useLanguage();

  return (
    <>
      <SEOHead
        title="Inteligencia Dinámica | Winerim – IA táctica para tu carta de vinos"
        description="La capa de inteligencia artificial que analiza, predice y optimiza tu carta de vinos en tiempo real. Vende más, con menos esfuerzo."
        canonical="/producto/inteligencia-dinamica"
      />
      <Navbar />
      <main className="min-h-screen bg-background pt-24 md:pt-32">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-wine/10 text-wine border-wine/20 mb-6">
              Nuevo
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Inteligencia{" "}
              <span className="bg-gradient-wine bg-clip-text text-transparent">
                dinámica
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              La capa de IA táctica que convierte los datos de tu carta en decisiones inteligentes. 
              Analiza, predice y optimiza en tiempo real para que cada vino trabaje al máximo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={localePath("/demo")}
                className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                Solicitar demo
              </Link>
              <Link
                to={localePath("/funcionalidades")}
                className="border border-border text-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:bg-muted/50 transition-all"
              >
                Ver funcionalidades
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features grid */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-wine/30 hover:shadow-lg hover:shadow-wine/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-wine" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-24">
          <div className="p-12 rounded-2xl border border-wine/20 bg-gradient-to-br from-wine/5 to-transparent">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              ¿Listo para activar la inteligencia de tu carta?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre cómo la inteligencia dinámica puede transformar la rentabilidad de tu carta de vinos.
            </p>
            <Link
              to={localePath("/demo")}
              className="inline-block bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
            >
              {t.cta_button}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default InteligenciaDinamica;
