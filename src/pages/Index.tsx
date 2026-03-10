import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import LogoStrip from "@/components/LogoStrip";
import { PageContentProvider } from "@/contexts/PageContentContext";
import { useLanguage } from "@/i18n/LanguageContext";

// Lazy load below-fold sections — only render when needed
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const FeaturesPreview = lazy(() => import("@/components/landing/FeaturesPreview"));
const ResultsSection = lazy(() => import("@/components/landing/ResultsSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const DefinitionSection = lazy(() => import("@/components/landing/DefinitionSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));

const SectionFallback = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  const { t, allLangPaths } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t.seo_home_title}
        description={t.seo_home_description}
        url="https://winerim.wine"
        hreflang={allLangPaths("/")}
      />
      <Navbar />
      <PageContentProvider page="home">
        <main>
          {/* Above the fold — eagerly loaded */}
          <HeroSection />
          <LogoStrip />
          {/* Below the fold — lazy loaded */}
          <Suspense fallback={<SectionFallback />}>
            <ProblemSection />
            <SolutionSection />
            <FeaturesPreview />
            <ResultsSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <DefinitionSection />
            <VideoSection />
            <FinalCTASection />
          </Suspense>
        </main>
      </PageContentProvider>
      <Footer />
    </div>
  );
};

export default Index;
