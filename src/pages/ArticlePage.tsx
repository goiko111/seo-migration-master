import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { getArticleBySlug } from "@/data/articles";
import { ArrowLeft } from "lucide-react";

const useMarkdownComponents = (isInterview: boolean): Components => {
  return useMemo(() => {
    if (!isInterview) return {};
    return {
      p: ({ children, ...props }) => {
        // Check if this paragraph contains only a single <strong> that starts with a number
        const childArray = Array.isArray(children) ? children : [children];
        if (childArray.length === 1 && typeof childArray[0] === "object" && childArray[0] !== null && "type" in childArray[0] && childArray[0].type === "strong") {
          const text = String(childArray[0].props?.children || "");
          if (/^\d+\.?\s/.test(text)) {
            return (
              <p className="!mt-12 !pt-8 !border-t !border-border !font-heading !text-[1.35rem] !leading-snug !text-foreground !font-bold" {...props}>
                {children}
              </p>
            );
          }
        }
        return <p {...props}>{children}</p>;
      },
    };
  }, [isInterview]);
};

interface ArticleData {
  title: string;
  subtitle: string;
  heroImage: string;
  body: string;
  type: "interview" | "blog";
  author?: string;
  publishedAt?: string;
}

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleData | null | undefined>(undefined);
  const mdComponents = useMarkdownComponents(article?.type === "interview");

  useEffect(() => {
    if (!slug) { setArticle(null); return; }

    const fetchArticle = async () => {
      const { data } = await supabase
        .from("articles")
        .select("title, excerpt, body, image_url, category, author, author_role, published_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (data) {
        setArticle({
          title: data.title,
          subtitle: data.category === "interview"
            ? `${data.author || ""}${data.author_role ? ", " + data.author_role : ""}`
            : (data.excerpt || ""),
          heroImage: data.image_url || "",
          body: data.body || "",
          type: data.category === "interview" ? "interview" : "blog",
          author: data.author || undefined,
          publishedAt: data.published_at || undefined,
        });
      } else {
        const staticArticle = getArticleBySlug(slug);
        if (staticArticle) {
          setArticle({
            title: staticArticle.title,
            subtitle: staticArticle.subtitle,
            heroImage: staticArticle.heroImage,
            body: staticArticle.body,
            type: staticArticle.type,
          });
        } else {
          setArticle(null);
        }
      }
    };
    fetchArticle();
  }, [slug]);

  if (article === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-24 text-center"><p className="text-muted-foreground">Cargando...</p></main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEOHead title="Artículo no encontrado" />
        <main className="pt-32 pb-24 text-center section-padding">
          <h1 className="font-heading text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-muted-foreground mb-8">El contenido que buscas no está disponible.</p>
          <Link to="/blog" className="text-accent underline">Volver al blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const backLink = article.type === "interview" ? "/sommelier-corner" : "/blog";
  const backLabel = article.type === "interview" ? "Sommelier Corner" : "Blog";
  const articleUrl = `https://winerim.wine/article/${slug}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead
        title={article.title}
        description={article.subtitle}
        image={article.heroImage}
        url={articleUrl}
        type="article"
        author={article.author}
        publishedAt={article.publishedAt}
      />
      <main>
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Link to={backLink}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Volver a {backLabel}
              </Link>
            </motion.div>

            {article.type === "blog" && article.subtitle && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4">
                {article.subtitle}
              </motion.p>
            )}

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </motion.h1>

            {(article.author || article.publishedAt) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                className="flex items-center gap-4 mb-10 text-sm text-muted-foreground">
                {article.author && <span className="font-medium text-foreground">{article.author}</span>}
                {article.author && article.publishedAt && <span className="text-muted-foreground/30">·</span>}
                {article.publishedAt && (
                  <time>{new Date(article.publishedAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</time>
                )}
              </motion.div>
            )}

            {article.type === "interview" && article.subtitle && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {article.subtitle}
              </motion.p>
            )}

            {article.heroImage && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl overflow-hidden mb-12">
                <img src={article.heroImage} alt={article.title} className="w-full max-h-[600px] object-cover grayscale" />
              </motion.div>
            )}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="article-body prose prose-lg prose-invert max-w-none
              prose-headings:font-heading prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-border
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-3 prose-h4:text-accent
              prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:text-base prose-p:md:text-lg prose-p:mb-6
              prose-strong:text-foreground prose-strong:font-bold
              prose-blockquote:border-l-accent prose-blockquote:border-l-4 prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:my-10 prose-blockquote:italic prose-blockquote:text-foreground/80 prose-blockquote:font-heading prose-blockquote:text-xl prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl
              prose-li:text-muted-foreground prose-li:leading-[1.85] prose-li:mb-2
              prose-ul:my-8 prose-ol:my-8
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:my-12
              prose-hr:border-border prose-hr:my-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{article.body}</ReactMarkdown>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-border">
            <Link to={backLink}
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Volver a {backLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
