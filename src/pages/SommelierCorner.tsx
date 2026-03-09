import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { articles as staticArticles } from "@/data/articles";
import { usePageContent } from "@/hooks/usePageContent";
import SEOHead from "@/components/SEOHead";
import { InterviewSkeleton } from "@/components/ContentSkeletons";
import { useLanguage } from "@/i18n/LanguageContext";

interface Interview {
  quote: string; name: string; role: string; excerpt: string; image: string; slug: string;
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
        .select("slug, title, excerpt, image_url, author, author_role")
        .eq("published", true)
        .eq("category", "interview")
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setInterviews(data.map(a => ({
          quote: a.title, name: a.author || "", role: a.author_role || "",
          excerpt: a.excerpt || "", image: a.image_url || "", slug: `/article/${a.slug}`,
        })));
      } else {
        const staticInterviews = Object.values(staticArticles)
          .filter(a => a.type === "interview")
          .map(a => ({
            quote: a.title, name: a.name || "", role: a.role || "",
            excerpt: a.subtitle || "", image: a.heroImage, slug: `/article/${a.slug}`,
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
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
            {lang === "es" ? get("hero", "label", t.label) : t.label}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6">
            {lang === "es" ? get("hero", "title", t.title) : t.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {lang === "es" ? get("hero", "subtitle", t.subtitle) : t.subtitle}
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
                    {lang === "es" ? get("hero", "read_cta", t.readCta) : t.readCta}
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
