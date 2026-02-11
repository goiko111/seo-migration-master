import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const interviews = [
  {
    quote: "\"¿Un consejo? El vino se entiende mejor desde la práctica constante y la curiosidad.\"",
    name: "Berta Romero",
    role: "Sumiller y directora de Restaurante Alameda",
    excerpt: "Entrevistamos a Berta Romero sobre vinos, emociones y su visión del servicio en sala.",
    image: "https://winerim.wine/wp-content/uploads/2025/08/Sumilleres-entrevistas-1.png",
    slug: "#",
  },
  {
    quote: "\"Que apuesten por pequeñas bodegas, D.O y zonas vitivinícolas desconocidas, que hay auténticas joyas en formato vínico\"",
    name: "Paco Martínez Áles",
    role: "Sommelier – Restaurante Antonio Zahara",
    excerpt: "Hablamos con Paco, joven sommelier gaditano, sobre su pasión por descubrir bodegas.",
    image: "https://winerim.wine/wp-content/uploads/2025/05/76.png",
    slug: "#",
  },
  {
    quote: "\"No os quedéis en el primer sorbo y probad el mismo vino en momentos distintos, con personas diferentes\"",
    name: "Simone Monese",
    role: "Sommelier – La Vecchia Griglia, Sirmione",
    excerpt: "Sostenibilidad, maridajes con alma y el vino como experiencia sensorial.",
    image: "https://winerim.wine/wp-content/uploads/2025/06/Sumilleres-entrevistas-2.png",
    slug: "#",
  },
];

const SommelierCorner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
          >
            Winerim Academy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Sommelier Corner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Hablan nuestros expertos. Sumilleres y responsables de vinos de los restaurantes, 
            hoteles, vinotecas, distribuidores y bodegas más importantes del país. Conoce su 
            día a día, consejos, novedades y secretos.
          </motion.p>
        </section>

        {/* Interview cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 space-y-16">
          {interviews.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-wine transition-colors ${
                i % 2 !== 0 ? "md:direction-rtl" : ""
              }`}
            >
              <div className={`aspect-square md:aspect-auto overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className={`flex flex-col justify-center p-8 md:p-12 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                <blockquote className="font-heading text-xl md:text-2xl font-semibold mb-6 leading-snug italic text-foreground/90">
                  {item.quote}
                </blockquote>
                <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                <div className="mt-auto">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
                <span className="mt-6 text-sm font-semibold tracking-widest uppercase text-accent">
                  Leer entrevista →
                </span>
              </div>
            </motion.a>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SommelierCorner;
