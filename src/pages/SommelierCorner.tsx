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

interface Interview {
  quote: string; name: string; role: string; excerpt: string; image: string; slug: string; publishedAt: string | null;
}

type LangContent = {
  metaTitle: string; metaDesc: string;
  label: string; title: string; subtitle: string; readCta: string;
};

const langContent: Record<string, LangContent> = {
  es: {
    metaTitle: "Sommelier Corner", metaDesc: "Entrevistas con los mejores sommeliers y expertos en vino de España.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "En Winerim Academy, hablan todos nuestros expertos. Sumilleres y responsables de vinos de los restaurantes, hoteles, vinotecas, distribuidores y bodegas más importantes del país.",
    readCta: "Leer entrevista →",
  },
  en: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviews with the best sommeliers and wine experts.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "At Winerim Academy, all our experts speak. Sommeliers and wine directors from the most important restaurants, hotels, wine bars, distributors, and wineries.",
    readCta: "Read interview →",
  },
  it: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviste con i migliori sommelier ed esperti di vino.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "Nella Winerim Academy parlano tutti i nostri esperti. Sommelier e responsabili vini dei ristoranti, hotel, enoteche, distributori e cantine più importanti.",
    readCta: "Leggi l'intervista →",
  },
  fr: {
    metaTitle: "Sommelier Corner", metaDesc: "Interviews avec les meilleurs sommeliers et experts en vin.",
    label: "Winerim Academy", title: "Sommelier Corner",
    subtitle: "À la Winerim Academy, tous nos experts s'expriment. Sommeliers et responsables vins des restaurants, hôtels, bars à vins, distributeurs et domaines les plus importants.",
    readCta: "Lire l'interview →",
  },
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
};

const SommelierCorner = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const { get } = usePageContent("sommelier");
  const { lang } = useLanguage();
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SEOHead title={t.metaTitle} description={t.metaDesc} url="https://winerim.wine/sommelier-corner" />
      <main>
        {/* Hero — same as GuiasRecursos */}
        <section className="pt-32 pb-12 section-padding">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <Breadcrumbs items={[{ label: "Sommelier Corner" }]} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              {lang === "es" ? get("hero", "label", t.label) : t.label}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {lang === "es" ? get("hero", "title", t.title) : t.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              {lang === "es" ? get("hero", "subtitle", t.subtitle) : t.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Card grid — GuiasRecursos style with B&W images */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {interviews.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 0.03}>
                <Link to={item.slug}
                  className="group bg-gradient-card rounded-xl border border-border hover:border-wine/50 transition-all block h-full hover:shadow-lg hover:shadow-wine/5 overflow-hidden">
                  {item.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={item.image} alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-accent">Entrevista</span>
                      {item.publishedAt && (
                        <>
                          <span className="text-muted-foreground/40">·</span>
                          <span className="text-[10px] text-muted-foreground">{formatDate(item.publishedAt)}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5 group-hover:text-wine transition-colors line-clamp-2">{item.quote}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.excerpt}</p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.role}</p>
                    </div>
                    <span className="mt-2 text-[10px] font-semibold tracking-widest uppercase text-accent block">
                      {lang === "es" ? get("hero", "read_cta", t.readCta) : t.readCta}
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
