import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import { useLanguage } from "@/i18n/LanguageContext";

// Lazy load everything below the fold
const LogoStrip = lazy(() => import("@/components/LogoStrip"));
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const WhoItHelpsSection = lazy(() => import("@/components/landing/WhoItHelpsSection"));
const FeaturesPreview = lazy(() => import("@/components/landing/FeaturesPreview"));
const DynamicIntelligenceTeaser = lazy(() => import("@/components/landing/DynamicIntelligenceTeaser"));
const ResultsSection = lazy(() => import("@/components/landing/ResultsSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const DefinitionSection = lazy(() => import("@/components/landing/DefinitionSection"));
const CredibilitySection = lazy(() => import("@/components/seo/CredibilitySection"));
const FinalCTASection = lazy(() => import("@/components/landing/FinalCTASection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="min-h-[200px]" />
);

const Index = () => {
  const { t, lang, allLangPaths } = useLanguage();

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

        {/* Social proof — logos */}
        <Suspense fallback={<SectionFallback />}>
          <LogoStrip />
        </Suspense>

        {/* Problem → Solution → Who it helps (conversion funnel) */}
        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
          <SolutionSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <WhoItHelpsSection />
        </Suspense>

        {/* Features + Dynamic Intelligence */}
        <Suspense fallback={<SectionFallback />}>
          <FeaturesPreview />
          <DynamicIntelligenceTeaser />
        </Suspense>

        {/* Results + How it works */}
        <Suspense fallback={<SectionFallback />}>
          <ResultsSection />
          <HowItWorksSection />
        </Suspense>

        {/* Testimonials + Definition (citability) + Credibility + Video + CTA */}
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
          <DefinitionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <section className="max-w-3xl mx-auto px-6 md:px-12 py-12">
            <CredibilitySection lang={lang} />
          </section>
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
