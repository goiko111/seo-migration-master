import { motion } from "framer-motion";
import {
  TrendingUp, RotateCcw, Package, Sliders,
  Edit3, Users, Zap, Filter,
  Monitor, QrCode, Headphones, BarChart3,
} from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const features = [
  { icon: TrendingUp, title: "Potencia las ventas", desc: "Duplica el valor de tu ticket medio" },
  { icon: RotateCcw, title: "Rotación de bodega", desc: "Aumenta las ventas de tu selección de vinos" },
  { icon: Package, title: "Gestión de inventario", desc: "Mejora la administración de tu stock" },
  { icon: Sliders, title: "Flexibilidad en tu oferta", desc: "Adapta tu carta en tiempo real" },
  { icon: Edit3, title: "Editor exclusivo", desc: "Realiza tus actualizaciones diarias" },
  { icon: Users, title: "Selección personalizada", desc: "Ofrece sugerencias a cada cliente" },
  { icon: Zap, title: "Sugerencias instantáneas", desc: "Recomendaciones de forma inmediata" },
  { icon: Filter, title: "Filtros eficientes", desc: "Simplifica la búsqueda con filtros concisos" },
  { icon: Monitor, title: "Instalación sencilla", desc: "Implementación simple y actualizable" },
  { icon: QrCode, title: "Códigos QR", desc: "Disponible en cualquier formato vía QR" },
  { icon: Headphones, title: "Soporte técnico", desc: "Resuelve dudas con nuestro equipo" },
  { icon: BarChart3, title: "Analítica en tiempo real", desc: "Controla datos y comportamiento" },
];

const Features = () => {
  const { get } = usePageContent("home");

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {get("features", "label", "Todo lo que necesitas")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {get("features", "title", "¿Por qué necesitas Winerim?")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {get("features", "subtitle", "¿Alguna vez has tenido problemas gestionando aspectos de tu bodega? Winerim es la solución.")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div key={feat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:glow-wine">
              <feat.icon size={28} className="text-wine mb-4 group-hover:text-wine-light transition-colors" />
              <h3 className="font-heading text-lg font-semibold mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/demo" className="inline-flex bg-gradient-wine text-primary-foreground px-8 py-3.5 rounded text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
            {get("features", "cta", "Agenda una llamada")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
