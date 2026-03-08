import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { articles as staticArticles } from "@/data/articles";
import { usePageContent } from "@/hooks/usePageContent";

interface Interview {
  quote: string;
  name: string;
  role: string;
  excerpt: string;
  image: string;
  slug: string;
}

const SommelierCorner = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = usePageContent("sommelier");

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug, title, excerpt, image_url, author, author_role")
        .eq("published", true)
        .eq("category", "interview")
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setInterviews(data.map(a => ({
          quote: a.title,
          name: a.author || "",
          role: a.author_role || "",
          excerpt: a.excerpt || "",
          image: a.image_url || "",
          slug: `/article/${a.slug}`,
        })));
      } else {
        const staticInterviews = Object.values(staticArticles)
          .filter(a => a.type === "interview")
          .map(a => ({
            quote: a.title,
            name: a.name || "",
            role: a.role || "",
            excerpt: a.subtitle || "",
            image: a.heroImage,
            slug: `/article/${a.slug}`,
          }));
        setInterviews(staticInterviews);
      }
      setLoading(false);
    };
    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-24 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
            {get("hero", "label", "Winerim Academy")}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {get("hero", "title", "Sommelier Corner")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {get("hero", "subtitle", "En Winerim Academy, hablan todos nuestros expertos. Sumilleres y responsables de vinos de los restaurantes, hoteles, vinotecas, distribuidores y bodegas más importantes del país.")}
          </motion.p>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 space-y-16">
          {interviews.map((item, i) => (
            <motion.div key={item.slug} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={item.slug}
                className="group grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-wine transition-colors">
                <div className={`aspect-square md:aspect-auto overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                  <img src={item.image} alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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
                    {get("hero", "read_cta", "Leer entrevista →")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SommelierCorner;
