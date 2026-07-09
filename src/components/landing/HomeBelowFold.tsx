import { lazy, Suspense } from "react";
import { PageContentProvider } from "@/contexts/PageContentContext";
import StickyCTA from "@/components/StickyCTA";
import type { SupportedLang } from "@/i18n/types";

const LogoStrip = lazy(() => import("@/components/LogoStrip"));
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection"));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection"));
const OperationalCapabilitiesTeaser = lazy(() => import("@/components/landing/OperationalCapabilitiesTeaser"));
const WhoItHelpsSection = lazy(() => import("@/components/landing/WhoItHelpsSection"));
const BusinessProfilesSection = lazy(() => import("@/components/landing/BusinessProfilesSection"));
const FeaturesPreview = lazy(() => import("@/components/landing/FeaturesPreview"));
const DynamicIntelligenceTeaser = lazy(() => import("@/components/landing/DynamicIntelligenceTeaser"));
const CategoryLeapSection = lazy(() => import("@/components/landing/CategoryLeapSection"));
const ResultsSection = lazy(() => import("@/components/landing/ResultsSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const DefinitionSection = lazy(() => import("@/components/landing/DefinitionSection"));
const DecisionCenterTeaser = lazy(() => import("@/components/DecisionCenterTeaser"));
const CredibilitySection = lazy(() => import("@/components/seo/CredibilitySection"));

const SectionFallback = () => (
  <div className="min-h-[200px]" />
);

const HomeBelowFold = ({ lang }: { lang: SupportedLang }) => (
  <PageContentProvider page="home">
    {/* 2. Social proof - logos */}
    <Suspense fallback={<SectionFallback />}>
      <LogoStrip />
    </Suspense>

    {/* 3-4. Problem -> Solution (conversion funnel) */}
    <Suspense fallback={<SectionFallback />}>
      <ProblemSection />
      <SolutionSection />
      <OperationalCapabilitiesTeaser />
    </Suspense>

    {/* 5. How it works - reduce friction early */}
    <Suspense fallback={<SectionFallback />}>
      <HowItWorksSection />
    </Suspense>

    {/* 6. Results - outcomes before features */}
    <Suspense fallback={<SectionFallback />}>
      <ResultsSection />
    </Suspense>

    {/* 7. Business profiles - self-identification by visitor type */}
    <Suspense fallback={<SectionFallback />}>
      <BusinessProfilesSection />
    </Suspense>

    {/* 8. Who it helps - role-based value */}
    <Suspense fallback={<SectionFallback />}>
      <WhoItHelpsSection />
    </Suspense>

    {/* 8-9. Category leap + Features + Dynamic Intelligence */}
    <Suspense fallback={<SectionFallback />}>
      <CategoryLeapSection />
      <FeaturesPreview />
      <DynamicIntelligenceTeaser />
    </Suspense>

    {/* 10-11. Testimonials + Video - trust builders */}
    <Suspense fallback={<SectionFallback />}>
      <TestimonialsSection />
      <VideoSection />
    </Suspense>

    {/* 12. Decision Center teaser - premium value layer */}
    <Suspense fallback={<SectionFallback />}>
      <DecisionCenterTeaser lang={lang} />
    </Suspense>

    {/* 13-14. Credibility + Definition - SEO/citability */}
    <Suspense fallback={<SectionFallback />}>
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <CredibilitySection lang={lang} />
      </section>
      <DefinitionSection />
    </Suspense>

    <Suspense fallback={null}>
      <StickyCTA pageType="home" />
    </Suspense>
  </PageContentProvider>
);

export default HomeBelowFold;
