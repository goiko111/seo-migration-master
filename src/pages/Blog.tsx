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
import NextSteps from "@/components/seo/NextSteps";
import InternalLinks from "@/components/seo/InternalLinks";
import { BlogSkeleton } from "@/components/ContentSkeletons";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";
import { getI18n } from "@/i18n/types";

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  publishedAt: string | null;
}

const i18n: Record<string, { seoTitle: string; seoDesc: string; readMore: string; heroLabel: string; heroSubtitle: string; guidesQ: string; guidesBtn: string; featured: string }> = {
  es: { seoTitle: "Blog", seoDesc: "Descubre toda la actualidad del mundo del vino de la mano de Winerim.", readMore: "Leer artículo", heroLabel: "Centro de conocimiento", heroSubtitle: "Artículos, análisis y tendencias sobre la gestión de vinos en restauración.", guidesQ: "¿Buscas guías prácticas para optimizar tu carta de vinos?", guidesBtn: "Ver guías y recursos →", featured: "Destacado" },
  en: { seoTitle: "Blog", seoDesc: "Discover the latest from the wine world with Winerim.", readMore: "Read article", heroLabel: "Knowledge center", heroSubtitle: "Articles, analysis, and trends on wine management in restaurants.", guidesQ: "Looking for practical guides to optimize your wine list?", guidesBtn: "View guides & resources →", featured: "Featured" },
  it: { seoTitle: "Blog", seoDesc: "Scopri le ultime novità dal mondo del vino con Winerim.", readMore: "Leggi articolo", heroLabel: "Centro conoscenze", heroSubtitle: "Articoli, analisi e tendenze sulla gestione dei vini nella ristorazione.", guidesQ: "Cerchi guide pratiche per ottimizzare la tua carta dei vini?", guidesBtn: "Vedi guide e risorse →", featured: "In evidenza" },
  fr: { seoTitle: "Blog", seoDesc: "Découvrez l'actualité du monde du vin avec Winerim.", readMore: "Lire l'article", heroLabel: "Centre de connaissances", heroSubtitle: "Articles, analyses et tendances sur la gestion des vins en restauration.", guidesQ: "Vous cherchez des guides pratiques pour optimiser votre carte des vins ?", guidesBtn: "Voir guides et ressources →", featured: "À la une" },
};

const formatDate = (dateStr: string | null, locale = "es-ES") => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = usePageContent("blog");
  const { lang, localePath, allLangPaths } = useLanguage();
  const t = getI18n(i18n, lang) || i18n.es;

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

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.seoTitle} description={t.seoDesc} url={`https://winerim.wine${localePath("/blog")}`} hreflang={allLangPaths("/blog")} />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Blog" }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {t.heroLabel}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {get("hero", "title", "Blog")}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </motion.p>
          </div>
        </section>

        {/* Featured article — full width card */}
        {featured && (
          <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
            <ScrollReveal>
              <Link to={featured.slug}
                className="group block rounded-2xl border border-border overflow-hidden bg-gradient-card hover:border-wine/40 transition-all hover:shadow-xl hover:shadow-wine/5">
                <div className="grid md:grid-cols-2">
                  {featured.image && (
                    <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img src={featured.image} alt={featured.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {t.featured}
                      </span>
                      {featured.publishedAt && (
                        <span className="text-xs text-muted-foreground">{formatDate(featured.publishedAt)}</span>
                      )}
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 group-hover:text-wine transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      {t.readMore} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </section>
        )}

        {/* Grid — spacious 2-col cards */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {rest.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.04}>
                <Link to={post.slug}
                  className="group block rounded-2xl border border-border overflow-hidden bg-gradient-card hover:border-wine/40 transition-all h-full hover:shadow-lg hover:shadow-wine/5">
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.image} alt={post.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent">{post.category}</span>
                      {post.publishedAt && (
                        <>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold mb-3 group-hover:text-wine transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent group-hover:gap-3 transition-all">
                      {t.readMore} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Next steps flow: MOFU → BOFU → conversion */}
        <NextSteps
          title="Profundiza y pasa a la acción"
          subtitle="De lo informativo a lo práctico: herramientas, guías y soluciones."
          steps={[
            { to: "/analisis-carta", label: "Analiza tu carta gratis", description: "Sube tu carta y recibe un diagnóstico con recomendaciones concretas.", type: "tool" },
            { to: "/guias-y-recursos", label: "Guías y recursos prácticos", description: "Plantillas, checklists y guías paso a paso para mejorar tu carta.", type: "guide" },
            { to: "/comparativas", label: "Compara Winerim con alternativas", description: "Comparativas claras para decidir qué solución encaja.", type: "solution" },
            { to: "/demo", label: "Solicitar demo personalizada", description: "Demo con tu carta real. Sin compromiso.", type: "solution" },
          ]}
        />

        <InternalLinks
          title="Recursos complementarios"
          links={[
            { to: "/herramientas", label: "Herramientas gratuitas de análisis y pricing", type: "tool" },
            { to: "/benchmarks-playbooks", label: "Benchmarks y playbooks del sector", type: "resource" },
            { to: "/casos-exito", label: "Casos de éxito de restaurantes reales", type: "guide" },
            { to: "/software-carta-de-vinos", label: "Software de carta de vinos inteligente", type: "solution" },
          ]}
        />

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
