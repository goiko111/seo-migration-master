import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import { useLanguage } from "@/i18n/LanguageContext";

const HomeBelowFold = lazy(() => import("@/components/landing/HomeBelowFold"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const { t, lang, allLangPaths } = useLanguage();
  const [loadBelowFold, setLoadBelowFold] = useState(false);

  // Inject BreadcrumbList + WebPage schemas for Rich Results consistency
  useEffect(() => {
    const langNames: Record<string, string> = { es: "Inicio", en: "Home", it: "Home", fr: "Accueil", de: "Startseite", pt: "Início" };
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: langNames[lang] || "Inicio", item: "https://winerim.wine/" }],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: t.seo_home_title,
        description: t.seo_home_description,
        url: "https://winerim.wine/",
        inLanguage: lang,
        isPartOf: { "@type": "WebSite", name: "Winerim", url: "https://winerim.wine/" },
      },
    ];
    const el = document.createElement("script");
    el.id = "schema-home-webpage";
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schemas);
    document.head.appendChild(el);
    return () => { document.getElementById("schema-home-webpage")?.remove(); };
  }, [lang, t.seo_home_title, t.seo_home_description]);

  useEffect(() => {
    let delayId: number | undefined;

    const revealBelowFold = () => {
      delayId = window.setTimeout(() => setLoadBelowFold(true), 600);
    };

    if (document.readyState === "complete") {
      revealBelowFold();
    } else {
      window.addEventListener("load", revealBelowFold, { once: true });
    }

    return () => {
      window.removeEventListener("load", revealBelowFold);
      if (delayId) {
        window.clearTimeout(delayId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.seo_home_title}
        description={t.seo_home_description}
        url="https://winerim.wine"
        hreflang={allLangPaths("/")}
      />
      <Navbar />
      <main>
        {/* 1. Hero - value prop, stats, CTA */}
        <HeroSection />

        {loadBelowFold ? (
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <HomeBelowFold lang={lang} />
            <FinalCTASection />
          </Suspense>
        ) : (
          <div className="min-h-[200px]" aria-hidden="true" />
        )}
      </main>
      {loadBelowFold && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
