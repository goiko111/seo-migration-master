import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ArticleSection from "@/components/article/ArticleSection";
import ArticleTableOfContents from "@/components/article/ArticleTableOfContents";
import ArticleMidCTA from "@/components/article/ArticleMidCTA";
import ArticleToolsSection from "@/components/article/ArticleToolsSection";
import CTASection from "@/components/CTASection";
import StickyCTA from "@/components/StickyCTA";
import ArticleRelatedContent, { type RelatedLink } from "@/components/article/ArticleRelatedContent";
import { parseMarkdownSections, type ParsedSection } from "@/components/article/parseMarkdownSections";
import { supabase } from "@/integrations/supabase/client";
import { getArticleBySlug } from "@/data/articles";
import { useLanguage } from "@/i18n/LanguageContext";
import { type SupportedLang } from "@/i18n/types";
import { articleDbSlugForLang, inferArticleLangFromSlug, localizedArticlePath, stripArticleLangSuffix } from "@/lib/articleRoutes";
import { visiblePublishedAtFilter } from "@/lib/publishing";
import { CANONICAL_DOMAIN } from "@/seo/config";

const ARTICLE_LANGS: SupportedLang[] = ["es", "en", "it", "fr", "de", "pt"];

const isSupportedArticleLang = (value: string | null | undefined): value is SupportedLang =>
  !!value && ARTICLE_LANGS.includes(value as SupportedLang);

interface ArticleData {
  title: string;
  subtitle: string;
  heroImage: string;
  body: string;
  type: "interview" | "blog";
  author?: string;
  publishedAt?: string;
  relatedLinks?: RelatedLink[] | null;
  lang?: string;
  hreflang?: { lang: string; url: string }[];
}

const i18n: Record<string, { loading: string; notFoundTitle: string; notFoundDesc: string; backToBlog: string; interview: string; article: string; backToCorner: string }> = {
  es: { loading: "Cargando...", notFoundTitle: "Artículo no encontrado", notFoundDesc: "El contenido que buscas no está disponible.", backToBlog: "Volver al blog", interview: "Entrevista", article: "Artículo", backToCorner: "Sommelier Corner" },
  en: { loading: "Loading...", notFoundTitle: "Article not found", notFoundDesc: "The content you're looking for is not available.", backToBlog: "Back to blog", interview: "Interview", article: "Article", backToCorner: "Sommelier Corner" },
  it: { loading: "Caricamento...", notFoundTitle: "Articolo non trovato", notFoundDesc: "Il contenuto che cerchi non è disponibile.", backToBlog: "Torna al blog", interview: "Intervista", article: "Articolo", backToCorner: "Sommelier Corner" },
  fr: { loading: "Chargement...", notFoundTitle: "Article introuvable", notFoundDesc: "Le contenu que vous recherchez n'est pas disponible.", backToBlog: "Retour au blog", interview: "Interview", article: "Article", backToCorner: "Sommelier Corner" },
  de: { loading: "Wird geladen...", notFoundTitle: "Artikel nicht gefunden", notFoundDesc: "Der gesuchte Inhalt ist nicht verfügbar.", backToBlog: "Zurück zum Blog", interview: "Interview", article: "Artikel", backToCorner: "Sommelier Corner" },
  pt: { loading: "A carregar...", notFoundTitle: "Artigo não encontrado", notFoundDesc: "O conteúdo que procura não está disponível.", backToBlog: "Voltar ao blog", interview: "Entrevista", article: "Artigo", backToCorner: "Sommelier Corner" },
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleData | null | undefined>(undefined);
  const { lang } = useLanguage();
  const t = i18n[lang] || i18n.es;

  useEffect(() => {
    if (!slug) { setArticle(null); return; }

    const baseSlug = stripArticleLangSuffix(slug);
    const legacySlugLang = inferArticleLangFromSlug(slug);
    const dbSlug = legacySlugLang ? slug : articleDbSlugForLang(baseSlug, lang);

    const fetchArticle = async () => {
      // Try the language-specific slug first
      let { data } = await supabase
        .from("articles")
        .select("slug, title, excerpt, body, image_url, category, author, author_role, published_at, related_links, lang, article_group")
        .eq("slug", dbSlug)
        .eq("published", true)
        .or(visiblePublishedAtFilter())
        .maybeSingle();

      // Fallback to Spanish base slug if no translation exists
      if (!data && lang !== "es") {
        ({ data } = await supabase
          .from("articles")
          .select("slug, title, excerpt, body, image_url, category, author, author_role, published_at, related_links, lang, article_group")
          .eq("slug", baseSlug)
          .eq("published", true)
          .or(visiblePublishedAtFilter())
          .maybeSingle());
      }

      if (data) {
        let hreflang: { lang: string; url: string }[] | undefined;

        if (data.article_group) {
          const { data: siblings } = await supabase
            .from("articles")
            .select("slug, lang")
            .eq("article_group", data.article_group)
            .eq("published", true)
            .or(visiblePublishedAtFilter());

          const urlsByLang = new Map<SupportedLang, string>();
          (siblings || []).forEach((sibling) => {
            if (!sibling.slug || !isSupportedArticleLang(sibling.lang)) return;
            urlsByLang.set(
              sibling.lang,
              `${CANONICAL_DOMAIN}${localizedArticlePath(stripArticleLangSuffix(sibling.slug), sibling.lang)}`,
            );
          });

          if (urlsByLang.size > 1) {
            hreflang = [
              ...(urlsByLang.has("es") ? [{ lang: "x-default", url: urlsByLang.get("es")! }] : []),
              ...ARTICLE_LANGS
                .filter((articleLang) => urlsByLang.has(articleLang))
                .map((articleLang) => ({ lang: articleLang, url: urlsByLang.get(articleLang)! })),
            ];
          }
        }

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
          relatedLinks: Array.isArray(data.related_links) ? (data.related_links as unknown as RelatedLink[]) : null,
          lang: data.lang || "es",
          hreflang,
        });
      } else {
        const staticArticle = getArticleBySlug(baseSlug);
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
  }, [slug, lang]);

  const sections = useMemo(() => {
    if (!article?.body) return [];
    return parseMarkdownSections(article.body);
  }, [article?.body]);

  const sectionHeadings = useMemo(() =>
    sections.filter(s => s.heading).map(s => s.heading),
    [sections]
  );

  const requestedArticleLang = (inferArticleLangFromSlug(slug || "") || lang) as SupportedLang;
  const contentLang = (article?.lang && ["es", "en", "it", "fr", "de", "pt"].includes(article.lang)
    ? article.lang
    : requestedArticleLang) as SupportedLang;

  useEffect(() => {
    if (article) document.documentElement.lang = contentLang;
  }, [article, contentLang]);

  if (article === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-24 text-center"><p className="text-muted-foreground">{t.loading}</p></main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEOHead title={t.notFoundTitle} />
        <main className="pt-32 pb-24 text-center section-padding">
          <h1 className="font-heading text-4xl font-bold mb-4">{t.notFoundTitle}</h1>
          <p className="text-muted-foreground mb-8">{t.notFoundDesc}</p>
          <Link to={lang === "es" ? "/blog" : `/${lang}/blog`} className="text-accent underline">{t.backToBlog}</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalLang = contentLang === requestedArticleLang ? requestedArticleLang : contentLang;
  const articleLabels = i18n[requestedArticleLang] || t;
  const baseSlug = stripArticleLangSuffix(slug || "");
  const backLink = article.type === "interview"
    ? (requestedArticleLang === "es" ? "/sommelier-corner" : `/${requestedArticleLang}/sommelier-corner`)
    : (requestedArticleLang === "es" ? "/blog" : `/${requestedArticleLang}/blog`);
  const backLabel = article.type === "interview" ? articleLabels.backToCorner : "Blog";
  const articleUrl = `https://winerim.wine${localizedArticlePath(baseSlug, canonicalLang)}`;
  const midIndex = Math.floor(sections.length / 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <SEOHead
        title={article.title}
        description={article.subtitle}
        image={article.heroImage}
        url={articleUrl}
        type="article"
        author={article.author}
        publishedAt={article.publishedAt}
        wordCount={article.body ? article.body.trim().split(/\s+/).length : undefined}
        hreflang={article.hreflang}
      />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: backLabel, href: backLink },
            { label: article.title },
          ]} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BookOpen size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine">
              {article.type === "interview" ? articleLabels.interview : articleLabels.article}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {article.title}
          </motion.h1>

          {article.subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6">
              {article.subtitle}
            </motion.p>
          )}

          {(article.author || article.publishedAt) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-10 text-sm text-muted-foreground">
              {article.author && <span className="font-medium text-foreground">{article.author}</span>}
              {article.author && article.publishedAt && <span className="text-muted-foreground/30">·</span>}
              {article.publishedAt && (
                <time>{new Date(article.publishedAt).toLocaleDateString(requestedArticleLang === "en" ? "en-US" : requestedArticleLang === "it" ? "it-IT" : requestedArticleLang === "fr" ? "fr-FR" : requestedArticleLang === "de" ? "de-DE" : requestedArticleLang === "pt" ? "pt-PT" : "es-ES", { day: "numeric", month: "long", year: "numeric" })}</time>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* HERO IMAGE */}
      {article.heroImage && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="rounded-2xl overflow-hidden">
            <img src={article.heroImage} alt={article.title} className="w-full max-h-[500px] object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </section>
      )}

      {/* TABLE OF CONTENTS */}
      <ArticleTableOfContents headings={sectionHeadings} lang={contentLang} />

      {/* INTRO (content before first ##) */}
      {sections.length > 0 && sections[0].heading === "" && sections[0].content && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="article-section-body prose prose-lg prose-invert max-w-none
                prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:text-base prose-p:md:text-lg prose-p:mb-6
                prose-strong:text-foreground
                prose-blockquote:border-l-accent prose-blockquote:border-l-4 prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:my-10 prose-blockquote:italic prose-blockquote:text-foreground/80 prose-blockquote:font-heading prose-blockquote:text-xl prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl
                prose-li:text-muted-foreground prose-li:leading-[1.85]
                prose-a:text-accent">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{sections[0].content}</ReactMarkdown>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* SECTIONS */}
      {sections.filter(s => s.heading).map((section, i) => (
        <div key={i}>
          <ArticleSection heading={section.heading} content={section.content} index={i} />
          {/* Insert mid-article CTA after the middle section */}
          {i === midIndex - 1 && <ArticleMidCTA pageType="article" />}
        </div>
      ))}

      {/* USEFUL TOOLS */}
      <ArticleToolsSection body={article.body} />

      {/* RELATED CONTENT */}
      <ArticleRelatedContent slug={baseSlug} body={article.body} manualLinks={article.relatedLinks} />

      {/* CTA FINAL */}
      <CTASection pageType="article" />

      {/* BACK LINK */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
        <Link to={backLink}
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-accent hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {article.type === "interview" ? `← ${articleLabels.backToCorner}` : `← ${articleLabels.backToBlog}`}
        </Link>
      </section>

      <StickyCTA pageType="article" />
      <Footer />
    </div>
  );
};

export default ArticlePage;
