import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/landing/HeroSection";
import LogoStrip from "@/components/LogoStrip";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ResultsSection from "@/components/landing/ResultsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import VideoSection from "@/components/VideoSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import { PageContentProvider } from "@/contexts/PageContentContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Carta de Vinos Digital con IA | Vende Más Vino"
        description="Winerim convierte tu carta de vinos en un vendedor inteligente con IA. Recomendaciones automáticas, maridajes y analítica para aumentar las ventas de vino en tu restaurante."
        url="https://winerim.wine"
      />
      <Navbar />
      <PageContentProvider page="home">
        <main>
          <HeroSection />
          <LogoStrip />
          <ProblemSection />
          <SolutionSection />
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
