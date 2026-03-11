import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import { useLanguage } from "@/i18n/LanguageContext";

// Lazy load everything below the fold
const LogoStrip = lazy(() => import("@/components/LogoStrip"));
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const FeaturesPreview = lazy(() => import("@/components/landing/FeaturesPreview"));
const DynamicIntelligenceTeaser = lazy(() => import("@/components/landing/DynamicIntelligenceTeaser"));
const ResultsSection = lazy(() => import("@/components/landing/ResultsSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const DefinitionSection = lazy(() => import("@/components/landing/DefinitionSection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const Footer = lazy(() => import("@/components/Footer"));

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
      <main>
        {/* Above the fold — eagerly loaded, no framer-motion */}
        <HeroSection />
        {/* Below the fold — lazy loaded in groups */}
        <Suspense fallback={<SectionFallback />}>
          <LogoStrip />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
          <SolutionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturesPreview />
          <DynamicIntelligenceTeaser />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ResultsSection />
          <HowItWorksSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
          <DefinitionSection />
          <VideoSection />
          <FinalCTASection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
