import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "\"¿Un consejo? El vino se entiende mejor desde la práctica constante y la curiosidad.\"",
    excerpt: "Entrevistamos a Berta Romero, sumiller y directora de Restaurante Alameda, sobre vinos, emociones y su visión del servicio en sala.",
    image: "https://winerim.wine/wp-content/uploads/2025/08/Sumilleres-entrevistas-1-1024x1024.png",
    category: "Entrevista",
    slug: "/sommelier-corner",
  },
  {
    title: "Cómo mejorar la experiencia del cliente en un restaurante",
    excerpt: "La experiencia del cliente en un restaurante no depende solo de la cocina. Desde la carta hasta el trato en sala, cada detalle cuenta. En este artículo te explicamos cómo identificar los momentos clave del servicio y qué ajustes puedes aplicar para mejorar la percepción del cliente, aumentar la fidelización y ofrecer un servicio más fluido.",
    image: "https://winerim.wine/wp-content/uploads/2025/08/experiencia-cliente-restaurante-01-1024x1024.jpg",
    category: "Estrategia",
    slug: "#",
  },
  {
    title: "\"¿Un consejo? Que apuesten por pequeñas bodegas, D.O y zonas vitivinícolas desconocidas, que hay auténticas joyas en formato vínico\"",
    excerpt: "Hablamos con Paco Martínez Áles, joven sommelier gaditano, responsable de la bodega de Restaurante Antonio Zahara.",
    image: "https://winerim.wine/wp-content/uploads/2025/05/76-1024x1024.png",
    category: "Entrevista",
    slug: "/sommelier-corner",
  },
  {
    title: "IA para restaurantes: las mejores aplicaciones",
    excerpt: "Cada vez más restaurantes usan inteligencia artificial para automatizar procesos, personalizar recomendaciones y aumentar sus ventas. Te contamos cómo están implementando la IA para restaurantes.",
    image: "https://winerim.wine/wp-content/uploads/2025/07/Iia-para-restaurantes-las-mejores-aplicaciones-01-1024x1024.jpg",
    category: "Tecnología",
    slug: "#",
  },
  {
    title: "\"¿Un consejo? No os quedéis en el primer sorbo y probad el mismo vino en momentos distintos, con personas diferentes, con distintas comidas.\"",
    excerpt: "Entrevista al sommelier Simone Monese: sostenibilidad, maridajes con alma y el vino como experiencia sensorial en La Vecchia Griglia (Sirmione).",
    image: "https://winerim.wine/wp-content/uploads/2025/06/Sumilleres-entrevistas-2-1024x1024.png",
    category: "Entrevista",
    slug: "/sommelier-corner",
  },
  {
    title: "Cómo hacer una carta de vinos perfecta para tu restaurante",
    excerpt: "Desglosamos los factores que determinan cómo diseñar una carta de vinos perfecta para tu restaurante y que aumente tus ventas de vino.",
    image: "https://winerim.wine/wp-content/uploads/2025/06/como-hacer-una-carta-de-vinos-perfecta-para-tu-restaurante-01-1024x1024.jpg",
    category: "Guía",
    slug: "#",
  },
  {
    title: "¿Por qué los jóvenes no beben vino en los restaurantes?",
    excerpt: "Analizamos los motivos por los que los jóvenes no beben vino en los restaurantes y cómo aplicar un simple cambio puede atraer de nuevo a las nuevas generaciones hacia el vino.",
    image: "https://winerim.wine/wp-content/uploads/2025/05/por-que-los-jovenes-no-beben-vino-en-los-restaurantes-01-1024x1024.jpg",
    category: "Tendencias",
    slug: "#",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Descubre toda la actualidad del mundo del vino de la mano de Winerim.
          </motion.p>
        </section>

        {/* Featured post */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <motion.a
            href={blogPosts[0].slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-wine transition-colors"
          >
            <div className="aspect-square md:aspect-auto overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:pr-12">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 group-hover:text-gradient-wine transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <span className="mt-6 text-sm font-semibold tracking-widest uppercase text-accent">
                Leer más →
              </span>
            </div>
          </motion.a>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, i) => (
              <motion.a
                key={post.title}
                href={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-gradient-card rounded-xl overflow-hidden border border-border hover:border-wine transition-colors"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
