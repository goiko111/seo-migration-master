import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, Search, BookOpen, Utensils, Smartphone,
  TrendingUp, DollarSign, RefreshCw, Users, Sparkles,
  GlassWater, Eye, Layers, Globe, CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";

const traditionalProblems = [
  { icon: BookOpen, text: "Printed on paper — expensive to update and easy to damage" },
  { icon: Layers, text: "Static PDFs — no interactivity, poor mobile experience" },
  { icon: RefreshCw, text: "Difficult to update — every change means reprinting" },
  { icon: Search, text: "Hard to navigate — guests scroll through endless pages" },
];

const features = [
  { icon: Search, title: "Search and filters", desc: "Guests can filter wines by grape, region, price, style, or color. Finding the right bottle takes seconds instead of minutes." },
  { icon: BookOpen, title: "Detailed wine descriptions", desc: "Each wine includes tasting notes, origin, producer, and ratings. Guests feel informed and confident in their choice." },
  { icon: Utensils, title: "Food pairing suggestions", desc: "Smart pairing recommendations that match wines with dishes on your menu, increasing both wine sales and guest satisfaction." },
  { icon: Eye, title: "Visual wine information", desc: "Labels, bottle images, and visual tasting profiles that make wine approachable for every guest, not just experts." },
  { icon: Smartphone, title: "Interactive navigation", desc: "Intuitive interface optimized for phones and tablets. Guests explore your wine list like browsing a curated collection." },
];

const restaurantBenefits = [
  { icon: TrendingUp, title: "Increase wine sales", desc: "Guided recommendations and smart suggestions drive higher average spend per table." },
  { icon: Users, title: "Improve guest experience", desc: "An engaging, easy-to-use wine list makes every guest feel like they have a personal sommelier." },
  { icon: RefreshCw, title: "Update wines instantly", desc: "Add new vintages, remove sold-out bottles, or adjust prices in real time — no reprinting." },
  { icon: DollarSign, title: "Reduce printing costs", desc: "Eliminate recurring printing expenses. Every update is instant and free." },
  { icon: Sparkles, title: "Make wine easier to understand", desc: "Visual profiles and plain-language descriptions help guests discover wines they'll love." },
];

const guestBenefits = [
  { icon: Search, title: "Easier to explore wines", desc: "Filters, categories, and search make it simple to browse hundreds of wines without feeling overwhelmed." },
  { icon: BookOpen, title: "Learn about wine", desc: "Tasting notes, region maps, and grape descriptions turn every glass into a learning experience." },
  { icon: GlassWater, title: "Discover new bottles", desc: "Smart recommendations introduce guests to wines they wouldn't have found on a traditional list." },
  { icon: Utensils, title: "Pair wine with food", desc: "Instant pairing suggestions remove the guesswork from choosing the perfect wine for every course." },
];

const DigitalWineList = () => {
  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = "digital-wine-list-jsonld";
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "What is a Digital Wine List?",
      description: "Learn what a digital wine list is, how it works, and why restaurants are switching from paper to interactive wine menus.",
      author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
      publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
      mainEntityOfPage: "https://winerim.wine/en/digital-wine-list",
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://winerim.wine/" },
          { "@type": "ListItem", position: 2, name: "Digital Wine List", item: "https://winerim.wine/en/digital-wine-list" },
        ],
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById("digital-wine-list-jsonld")?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="What is a Digital Wine List? | Interactive Wine Menu for Restaurants"
        description="Discover what a digital wine list is and how interactive wine menus help restaurants increase wine sales, improve guest experience, and reduce costs."
        url="https://winerim.wine/en/digital-wine-list"
        type="article"
      />
      <Navbar />

      {/* 1. HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Digital wine menu</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
            What is a <span className="text-gradient-wine italic">digital wine list</span>?
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Discover how digital wine lists are transforming the way restaurants present and sell wine.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/demo" className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              Request a demo <ArrowRight size={16} />
            </Link>
            <Link to="/wine-list-analyzer" className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              Analyze my wine list
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCTION — Traditional problems */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                The problem with <span className="text-gradient-wine italic">traditional wine lists</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most restaurants still present their wines on printed paper menus or static PDFs. These formats create friction for guests and operational headaches for staff.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {traditionalProblems.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 bg-destructive/5 rounded-lg p-4 border border-destructive/10">
                      <Icon size={16} className="text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">{p.text}</p>
                    </div>
                  );
                })}
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                A <strong className="text-foreground">digital wine list</strong> solves all of these problems — making wine easier to explore, easier to sell, and easier to manage.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. WHAT IS A DIGITAL WINE LIST */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Definition</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              What exactly is a <span className="text-gradient-wine italic">digital wine list</span>?
            </h2>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10 text-left max-w-3xl mx-auto">
              <p className="text-muted-foreground leading-relaxed mb-4">
                A <strong className="text-foreground">digital wine list</strong> is an interactive wine menu that guests can explore on their phone, tablet, or any device with a browser. Instead of flipping through pages of text, guests search, filter, and discover wines through a visual, intuitive interface.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                It allows restaurants to present wines in a clearer, more engaging way — with detailed descriptions, food pairing suggestions, and smart recommendations that help guests find the perfect bottle.
              </p>
              <div className="flex items-start gap-3 bg-wine/5 rounded-lg p-4 border border-wine/10 mt-4">
                <Sparkles size={16} className="text-wine shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-foreground">Think of it as a sommelier in every guest's pocket</strong> — available 24/7, always up to date, and never intimidating.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. FEATURES */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Features</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              What makes a great <span className="text-gradient-wine italic">interactive wine list</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS FOR RESTAURANTS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">For restaurants</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              Why restaurants choose <span className="text-gradient-wine italic">digital wine menus</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {restaurantBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BENEFITS FOR GUESTS */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">For guests</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              A better wine experience for <span className="text-gradient-wine italic">every guest</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {guestBenefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHY DIGITAL IS THE FUTURE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center">
                  <Globe size={22} className="text-wine" />
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold">
                  Why digital wine lists are the <span className="text-gradient-wine italic">future</span>
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  Restaurants worldwide are adopting digital tools to streamline operations and enhance the guest experience. The wine list — often the most complex and profitable part of the menu — is no exception.
                </p>
                <p>
                  Digital wine lists aren't just a trend. They're becoming the <strong className="text-foreground">standard for modern hospitality</strong>. Guests expect the same intuitive, visual experience they get from every other digital service — and they expect it at the table.
                </p>
                <p>
                  Platforms like <strong className="text-foreground">Winerim</strong> go beyond a simple digital menu. With AI-powered recommendations, real-time analytics, and intelligent wine mapping, Winerim turns your wine list into an <strong className="text-foreground">active sales tool</strong> that increases revenue automatically.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {[
                  { label: "Interactive experience", icon: Smartphone },
                  { label: "AI-powered recommendations", icon: Sparkles },
                  { label: "Real-time analytics", icon: TrendingUp },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-wine/5 rounded-lg p-3 border border-wine/10">
                    <item.icon size={14} className="text-wine shrink-0" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">Get started</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Turn your wine list into an <span className="text-gradient-wine italic">interactive experience</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                See how Winerim can transform your restaurant's wine program. Book a personalized demo with our team.
              </p>
              <Link to="/demo" className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                Request a demo <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigitalWineList;
