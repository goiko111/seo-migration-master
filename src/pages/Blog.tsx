import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { articles as staticArticles } from "@/data/articles";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";
import { BlogSkeleton } from "@/components/ContentSkeletons";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = usePageContent("blog");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug, title, excerpt, image_url, category")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setBlogPosts(data.map(a => ({
          title: a.title,
          excerpt: a.excerpt || "",
          image: a.image_url || "",
          category: a.category === "interview" ? "Entrevista" : a.category,
          slug: `/article/${a.slug}`,
        })));
      } else {
        const staticPosts = Object.values(staticArticles).map(a => ({
          title: a.title,
          excerpt: a.subtitle || "",
          image: a.heroImage,
          category: a.category,
          slug: `/article/${a.slug}`,
        }));
        setBlogPosts(staticPosts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main><BlogSkeleton /></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title="Blog" description="Descubre toda la actualidad del mundo del vino de la mano de Winerim." url="https://winerim.wine/blog" />
      <main>
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {get("hero", "title", "Blog")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {get("hero", "subtitle", "Descubre toda la actualidad del mundo del vino de la mano de Winerim.")}
          </motion.p>
        </section>

        {blogPosts.length > 0 && (
          <>
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Link to={blogPosts[0].slug}
                  className="group grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-wine transition-colors">
                  <div className="aspect-square md:aspect-auto overflow-hidden">
                    <img src={blogPosts[0].image} alt={blogPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:pr-12">
                    <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">{blogPosts[0].category}</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 group-hover:text-gradient-wine transition-colors">{blogPosts[0].title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{blogPosts[0].excerpt}</p>
                    <span className="mt-6 text-sm font-semibold tracking-widest uppercase text-accent">Leer más →</span>
                  </div>
                </Link>
              </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(1).map((post, i) => (
                  <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link to={post.slug}
                      className="group bg-gradient-card rounded-xl overflow-hidden border border-border hover:border-wine transition-colors block h-full">
                      <div className="aspect-square overflow-hidden">
                        <img src={post.image} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">{post.category}</span>
                        <h3 className="font-heading text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Guías y recursos */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
                <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-2">Guías y recursos</p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">Aprende a optimizar tu carta de vinos</h2>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { to: "/blog/como-organizar-carta-de-vinos", icon: BookOpen, title: "Cómo organizar una carta de vinos", desc: "Guía práctica para estructurar tu carta de forma clara, rentable y fácil de entender." },
                  { to: "/soluciones/aumentar-ticket-medio-restaurante", icon: TrendingUp, title: "Cómo aumentar el ticket medio", desc: "Estrategias para aumentar el gasto medio por cliente usando el vino como palanca." },
                  { to: "/soluciones/grupos-restauracion", icon: Building2, title: "Winerim para grupos de restauración", desc: "Gestión centralizada del vino para grupos con múltiples restaurantes." },
                  { to: "/en/digital-wine-list", icon: Globe, title: "What is a digital wine list?", desc: "Learn how digital wine lists are transforming the way restaurants sell wine." },
                  { to: "/integraciones", icon: Laptop, title: "Integraciones de Winerim", desc: "Conecta Winerim con tu POS, ERP y sistemas de gestión existentes." },
                  { to: "/precios", icon: Wine, title: "Planes y precios", desc: "Descubre qué plan de Winerim se adapta mejor a tu restaurante." },
                ].map((guide, i) => {
                  const Icon = guide.icon;
                  return (
                    <motion.div key={guide.to} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                      <Link to={guide.to}
                        className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-colors block p-6 h-full">
                        <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-4">
                          <Icon size={20} className="text-wine" />
                        </div>
                        <h3 className="font-heading font-bold mb-2 group-hover:text-wine transition-colors">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{guide.desc}</p>
                        <span className="mt-4 text-xs font-semibold tracking-widest uppercase text-accent block">Leer más →</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
