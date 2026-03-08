import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import WhatIsWinerim from "@/components/WhatIsWinerim";
import Features from "@/components/Features";
import Quote from "@/components/Quote";
import Benefits from "@/components/Benefits";
import Capabilities from "@/components/Capabilities";
import VideoSection from "@/components/VideoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { PageContentProvider } from "@/contexts/PageContentContext";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Carta de Vinos Digital | Recomendador Inteligente"
        description="Winerim transforma la experiencia gastronómica de tu restaurante con una carta de vinos digital y un recomendador inteligente que potencia tus ventas."
        url="https://winerim.wine"
      />
      <Navbar />
      <PageContentProvider page="home">
        <main>
          <Hero />
          <LogoStrip />
          <WhatIsWinerim />
          <Features />
          <Quote />
          <Benefits />
          <Capabilities />
          <VideoSection />
          <CTASection />
        </main>
      </PageContentProvider>
      <Footer />
    </div>
  );
};

export default Index;
