import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { articles as staticArticles } from "@/data/articles";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import { BlogSkeleton } from "@/components/ContentSkeletons";
import { useLanguage } from "@/i18n/LanguageContext";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  publishedAt: string | null;
}

const i18n: Record<string, { seoTitle: string; seoDesc: string; readMore: string; heroLabel: string; guidesQ: string; guidesBtn: string }> = {
  es: { seoTitle: "Blog", seoDesc: "Descubre toda la actualidad del mundo del vino de la mano de Winerim.", readMore: "Leer más →", heroLabel: "Centro de conocimiento", guidesQ: "¿Buscas guías prácticas para optimizar tu carta de vinos?", guidesBtn: "Ver guías y recursos →" },
  en: { seoTitle: "Blog", seoDesc: "Discover the latest from the wine world with Winerim.", readMore: "Read more →", heroLabel: "Knowledge center", guidesQ: "Looking for practical guides to optimize your wine list?", guidesBtn: "View guides & resources →" },
  it: { seoTitle: "Blog", seoDesc: "Scopri le ultime novità dal mondo del vino con Winerim.", readMore: "Leggi di più →", heroLabel: "Centro conoscenze", guidesQ: "Cerchi guide pratiche per ottimizzare la tua carta dei vini?", guidesBtn: "Vedi guide e risorse →" },
  fr: { seoTitle: "Blog", seoDesc: "Découvrez l'actualité du monde du vin avec Winerim.", readMore: "Lire la suite →", heroLabel: "Centre de connaissances", guidesQ: "Vous cherchez des guides pratiques pour optimiser votre carte des vins ?", guidesBtn: "Voir guides et ressources →" },
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = usePageContent("blog");
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = i18n[lang] || i18n.es;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug, title, excerpt, image_url, category, published_at")
        .eq("published", true)
        .neq("category", "interview")
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setBlogPosts(data.map(a => ({
          title: a.title,
          excerpt: a.excerpt || "",
          image: a.image_url || "",
          category: a.category,
          slug: `/article/${a.slug}`,
          publishedAt: a.published_at,
        })));
      } else {
        const staticPosts = Object.values(staticArticles)
          .filter(a => a.type !== "interview")
          .map(a => ({
            title: a.title,
            excerpt: a.subtitle || "",
            image: a.heroImage,
            category: a.category,
            slug: `/article/${a.slug}`,
            publishedAt: null,
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
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/blog")}`} hreflang={allLangPaths("/blog")} />
      <main>
        {/* Hero — same as GuiasRecursos */}
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Blog" }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.heroLabel}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {get("hero", "title", "Blog")}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {t.seoDesc}
            </motion.p>
          </div>
        </section>

        {/* Card grid — GuiasRecursos style with B&W images */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.03}>
                <Link to={post.slug}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block h-full hover:shadow-lg hover:shadow-wine/5 overflow-hidden">
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.image} alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">{post.category}</span>
                      {post.publishedAt && (
                        <>
                          <span className="text-muted-foreground/40">·</span>
                          <span className="text-[10px] text-muted-foreground">{formatDate(post.publishedAt)}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <span className="mt-3 text-[10px] font-semibold tracking-widest uppercase text-accent block">{t.readMore}</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24 text-center">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-12">
              <p className="text-muted-foreground mb-6">{t.guidesQ}</p>
              <Link to={localePath("/guias-y-recursos")}
                className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">
                {t.guidesBtn}
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
