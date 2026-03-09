import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSharedPageContent } from "@/contexts/PageContentContext";
import ScrollReveal from "./ScrollReveal";

interface BenefitItem {
  title: string;
  desc: string;
}

interface TabItem {
  id: string;
  label: string;
  subtitle: string;
  benefits: BenefitItem[];
}

const defaultTabs: TabItem[] = [
  {
    id: "profesionales", label: "Profesionales", subtitle: "Restaurantes, hoteles, wine bars, vinotecas…",
    benefits: [
      { title: "Carta actualizada", desc: "Winerim permite a los profesionales mantener la carta actualizada, invirtiendo el mínimo tiempo y esfuerzo. La actualización será visible al momento desde cualquier dispositivo." },
      { title: "Apoyo al personal", desc: "En ocasiones, el personal de sala no tiene amplios conocimientos sobre vino. La herramienta servirá como apoyo a la hora de ofrecer el vino a los comensales." },
      { title: "Informes de preferencias", desc: "Accede a datos detallados sobre las preferencias de tus comensales para optimizar tu carta y maximizar ventas." },
    ],
  },
  {
    id: "comensales", label: "Comensales", subtitle: "La mejor experiencia para tus clientes",
    benefits: [
      { title: "Recomendaciones personalizadas", desc: "Cada comensal puede seleccionar el vino en base a sus preferencias de maridaje, añada, bodega, tipo de uva, país o precio." },
      { title: "Experiencia interactiva", desc: "Navega por la carta de vinos de forma intuitiva, con filtros que simplifican la elección del vino perfecto." },
      { title: "Mayor confianza", desc: "El comensal siente mayor libertad y seguridad a la hora de elegir el vino que acompañará su experiencia gastronómica." },
    ],
  },
  {
    id: "sommelier", label: "Sommelier", subtitle: "Tu mejor herramienta de trabajo",
    benefits: [
      { title: "Maridaje perfecto", desc: "Presenta el maridaje perfecto con la cata de vinos del restaurante, combinando tu conocimiento con la tecnología de Winerim." },
      { title: "Gestión eficiente", desc: "Controla y actualiza la bodega en tiempo real, manteniendo siempre la carta al día sin esfuerzo adicional." },
      { title: "Datos de consumo", desc: "Analiza patrones de consumo y preferencias para tomar mejores decisiones sobre la selección de vinos." },
    ],
  },
  {
    id: "bodega", label: "Bodega", subtitle: "Conecta con los mejores restaurantes",
    benefits: [
      { title: "Visibilidad directa", desc: "Tus vinos llegan directamente a los comensales a través de recomendaciones personalizadas en los mejores restaurantes." },
      { title: "Datos de mercado", desc: "Accede a información valiosa sobre cómo se consumen tus vinos en diferentes establecimientos." },
      { title: "Canal de ventas", desc: "Amplía tu canal de distribución y aumenta la rotación de tus referencias en hostelería." },
    ],
  },
];

const Benefits = () => {
  const [activeTab, setActiveTab] = useState("profesionales");
  const { get, getJson } = useSharedPageContent();
  const tabs = getJson<TabItem[]>("benefits", "tabs", defaultTabs);
  const active = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {get("benefits", "label", "Beneficios")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {get("benefits", "title", "Descubre los beneficios de Winerim")}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === tab.id ? "bg-gradient-wine text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <p className="text-center text-muted-foreground mb-10">{active.subtitle}</p>
            <div className="grid md:grid-cols-3 gap-8">
              {active.benefits.map((benefit, i) => (
                <div key={i} className="bg-gradient-card rounded-xl border border-border p-8 hover:border-wine/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-5">
                    <span className="text-wine font-heading text-xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Benefits;
