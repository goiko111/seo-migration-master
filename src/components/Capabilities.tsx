import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Settings, Package, Utensils } from "lucide-react";
import { useSharedPageContent } from "@/contexts/PageContentContext";

const iconMap: Record<string, React.ElementType> = { Settings, Package, Utensils };

const defaultCapabilities = [
  {
    icon: "Settings",
    title: "Gestión propia",
    desc: "Los clientes que utilicen Winerim podrán gestionar su carta en tiempo real y los cambios se visualizarán en el momento. Es posible activar y desactivar los vinos, modificar precios, tipos de uva, añada o maridaje. Además permite añadir descripciones de cada vino o solicitar la incorporación de nuevas referencias.",
  },
  {
    icon: "Package",
    title: "Control de stock",
    desc: "Winerim ofrece un programa de control de stock, que permite comprobar de forma automática el número de botellas que quedan de cada referencia en la bodega durante el servicio o al terminar este, sin la laboriosa tarea de contabilizar manualmente.",
  },
  {
    icon: "Utensils",
    title: "Pairing con la carta",
    desc: "Una de las funcionalidades que permite Winerim es cruzar los vinos de la carta con los platos del menú, para que el comensal pueda realizar la selección de forma directa atendiendo a los platos que va a degustar, teniendo en cuenta no solo el ingrediente principal sino cómo está elaborado.",
  },
];

const Capabilities = () => {
  const { get, getJson } = useSharedPageContent();
  const capabilities = getJson<typeof defaultCapabilities>("capabilities", "items", defaultCapabilities);

  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">
            {get("capabilities", "label", "Winerim te permite")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {get("capabilities", "title", "Funcionalidades principales")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon] || Settings;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-gradient-card rounded-2xl border border-border p-8 hover:border-wine/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-wine/10 flex items-center justify-center mb-6 group-hover:bg-wine/20 transition-colors">
                  <Icon size={28} className="text-wine" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">{cap.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">{cap.desc}</p>
                <Link to="/demo" className="text-sm font-semibold text-wine hover:text-wine-light transition-colors tracking-wider uppercase">
                  {get("capabilities", "cta", "Solicita una demo →")}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
