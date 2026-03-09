import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import LogoStrip from "@/components/LogoStrip";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesPreview from "@/components/landing/FeaturesPreview";
import ResultsSection from "@/components/landing/ResultsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import VideoSection from "@/components/VideoSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PageContentProvider } from "@/contexts/PageContentContext";
import { useLanguage } from "@/i18n/LanguageContext";

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
          <HeroSection />
          <LogoStrip />
          <ProblemSection />
          <SolutionSection />
          <FeaturesPreview />
          <ResultsSection />
          <HowItWorksSection />
          <VideoSection />
          <FinalCTASection />
        </main>
      </PageContentProvider>
      <Footer />
    </div>
  );
};

export default Index;
