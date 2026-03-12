import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { PageContentProvider } from "@/contexts/PageContentContext";
import StickyCTA from "@/components/StickyCTA";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import { useLanguage } from "@/i18n/LanguageContext";

// Lazy load everything below the fold
const LogoStrip = lazy(() => import("@/components/LogoStrip"));
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const WhoItHelpsSection = lazy(() => import("@/components/landing/WhoItHelpsSection"));
const BusinessProfilesSection = lazy(() => import("@/components/landing/BusinessProfilesSection"));
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
      <PageContentProvider page="home">
        <main>
          {/* 1. Hero — value prop, stats, CTA */}
          <HeroSection />

          {/* 2. Social proof — logos */}
          <Suspense fallback={<SectionFallback />}>
            <LogoStrip />
          </Suspense>

          {/* 3–4. Problem → Solution (conversion funnel) */}
          <Suspense fallback={<SectionFallback />}>
            <ProblemSection />
            <SolutionSection />
          </Suspense>

          {/* 5. How it works — reduce friction early */}
          <Suspense fallback={<SectionFallback />}>
            <HowItWorksSection />
          </Suspense>

          {/* 6. Results — outcomes before features */}
          <Suspense fallback={<SectionFallback />}>
            <ResultsSection />
          </Suspense>

          {/* 7. Who it helps — role-based value */}
          <Suspense fallback={<SectionFallback />}>
            <WhoItHelpsSection />
          </Suspense>

          {/* 8–9. Features depth + differentiator */}
          <Suspense fallback={<SectionFallback />}>
            <FeaturesPreview />
            <DynamicIntelligenceTeaser />
          </Suspense>

          {/* 10–11. Testimonials + Video — trust builders */}
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
            <VideoSection />
          </Suspense>

          {/* 12–13. Credibility + Definition — SEO/citability */}
          <Suspense fallback={<SectionFallback />}>
            <section className="max-w-3xl mx-auto px-6 md:px-12 py-12">
              <CredibilitySection lang={lang} />
            </section>
            <DefinitionSection />
          </Suspense>

          {/* 14. Final CTA */}
          <Suspense fallback={<SectionFallback />}>
            <FinalCTASection />
            <StickyCTA pageType="home" />
          </Suspense>
        </main>
      </PageContentProvider>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
