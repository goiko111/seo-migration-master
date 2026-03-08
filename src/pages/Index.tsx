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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
