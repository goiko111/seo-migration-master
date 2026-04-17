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
import { InterviewSkeleton } from "@/components/ContentSkeletons";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";

interface Interview {
  quote: string; name: string; role: string; excerpt: string; image: string; slug: string; publishedAt: string | null;
}

type LangContent = {
  metaTitle: string; metaDesc: string;
  label: string; title: string; subtitle: string; readCta: string; featured: string; interviewLabel: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Sommelier Corner", metaDesc: "Entrevistas con los mejores sommeliers y expertos en vino de España.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "En Winerim Academy, hablan todos nuestros expertos. Sumilleres y responsables de vinos de los restaurantes, hoteles, vinotecas, distribuidores y bodegas más importantes del país.",
    readCta: "Leer entrevista", featured: "Destacado", interviewLabel: "Entrevista",
  },
  en: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviews with the best sommeliers and wine experts.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "At Winerim Academy, all our experts speak. Sommeliers and wine directors from the most important restaurants, hotels, wine bars, distributors, and wineries.",
    readCta: "Read interview", featured: "Featured", interviewLabel: "Interview",
  },
  it: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviste con i migliori sommelier ed esperti di vino.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "Nella Winerim Academy parlano tutti i nostri esperti. Sommelier e responsabili vini dei ristoranti, hotel, enoteche, distributori e cantine più importanti.",
    readCta: "Leggi l'intervista", featured: "In evidenza", interviewLabel: "Intervista",
  },
  fr: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviews avec les meilleurs sommeliers et experts en vin.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "À la Winerim Academy, tous nos experts s'expriment. Sommeliers et responsables vins des restaurants, hôtels, bars à vins, distributeurs et domaines les plus importants.",
    readCta: "Lire l'interview", featured: "À la une", interviewLabel: "Interview",
  },
  de: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviews mit den besten Sommeliers und Weinexperten.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "In der Winerim Academy kommen alle unsere Experten zu Wort. Sommeliers und Weinverantwortliche der wichtigsten Restaurants, Hotels, Weinbars, Distributoren und Weingüter.",
    readCta: "Interview lesen", featured: "Empfohlen", interviewLabel: "Interview",
  },
  pt: {
    metaTitle: "Sommelier Corner", metaDesc: "Entrevistas com os melhores sommeliers e especialistas em vinho.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "Na Winerim Academy, falam todos os nossos especialistas. Escanções e responsáveis de vinhos dos restaurantes, hotéis, garrafeiras, distribuidores e adegas mais importantes.",
    readCta: "Ler entrevista", featured: "Destaque", interviewLabel: "Entrevista",
  },
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
};

const SommelierCorner = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = usePageContent("sommelier");
  const { lang, allLangPaths } = useLanguage();
  const t = langContent[lang] || langContent.es;

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug, title, excerpt, image_url, author, author_role, published_at")
        .eq("published", true)
        .eq("category", "interview")
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setInterviews(data.map(a => ({
          quote: a.title, name: a.author || "", role: a.author_role || "",
          excerpt: a.excerpt || "", image: a.image_url || "", slug: `/article/${a.slug}`,
          publishedAt: a.published_at,
        })));
      } else {
        const staticInterviews = Object.values(staticArticles)
          .filter(a => a.type === "interview")
          .map(a => ({
            quote: a.title, name: a.name || "", role: a.role || "",
            excerpt: a.subtitle || "", image: a.heroImage, slug: `/article/${a.slug}`,
            publishedAt: null,
          }));
        setInterviews(staticInterviews);
      }
      setLoading(false);
    };
    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background"><Navbar /><main><InterviewSkeleton /></main><Footer /></div>
    );
  }

  const featured = interviews[0];
  const rest = interviews.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/sommelier-corner"
        hreflang={allLangPaths("/sommelier-corner")} />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Sommelier Corner" }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {lang === "es" ? get("hero", "label", t.label) : t.label}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {lang === "es" ? get("hero", "title", t.title) : t.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {lang === "es" ? get("hero", "subtitle", t.subtitle) : t.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Featured interview — full width */}
        {featured && (
          <section className="max-w-6xl mx-auto px-6 md:px-12 pb-16">
            <ScrollReveal>
              <Link to={featured.slug}
                className="group block rounded-2xl border border-border overflow-hidden bg-gradient-card hover:border-wine/40 transition-all hover:shadow-xl hover:shadow-wine/5">
                <div className="grid md:grid-cols-2">
                  {featured.image && (
                    <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img src={featured.image} alt={featured.name}
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
                      {featured.quote}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-foreground">{featured.name}</p>
                      <p className="text-xs text-muted-foreground">{featured.role}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                      {t.readCta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </section>
        )}

        {/* Grid — spacious 2-col cards */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {rest.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.04}>
                <Link to={item.slug}
                  className="group block rounded-2xl border border-border overflow-hidden bg-gradient-card hover:border-wine/40 transition-all h-full hover:shadow-lg hover:shadow-wine/5">
                  {item.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={item.image} alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent">{t.interviewLabel}</span>
                      {item.publishedAt && (
                        <>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-xs text-muted-foreground">{formatDate(item.publishedAt)}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold mb-3 group-hover:text-wine transition-colors leading-snug line-clamp-2">
                      {item.quote}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent group-hover:gap-3 transition-all">
                      {t.readCta} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SommelierCorner;
