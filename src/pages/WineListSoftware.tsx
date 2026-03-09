import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Wine, BarChart3, TrendingUp, Target, Search,
  Utensils, Eye, ShoppingCart, Users, RotateCcw, Layers,
  AlertTriangle, FileText, Smartphone, Cpu, CheckCircle, XCircle, Minus
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import mockupImg from "@/assets/winerim-mockup.png";

const problems = [
  { icon: Eye, text: "Wine lists difficult to understand" },
  { icon: AlertTriangle, text: "Lack of recommendations for guests" },
  { icon: TrendingUp, text: "Poor pricing structure" },
  { icon: FileText, text: "Hard to update references" },
  { icon: BarChart3, text: "No analytics or sales insights" },
];

const capabilities = [
  "Manage all wine references in one place",
  "Organize wine lists with clear categories",
  "Recommend wines based on guest preferences",
  "Show food and wine pairings instantly",
  "Improve the guest experience at the table",
  "Analyze sales data to optimize your cellar",
];

const features = [
  { icon: Smartphone, title: "Digital wine list", desc: "A beautiful, interactive wine list accessible on any device. Always up to date, easy to navigate, and designed to sell." },
  { icon: Search, title: "Smart filters", desc: "Let guests filter by grape, region, style, or price. They find the perfect wine in seconds instead of scrolling through pages." },
  { icon: Utensils, title: "Food pairing suggestions", desc: "Automatic pairing recommendations that match wines to dishes on your menu, helping guests make confident choices." },
  { icon: Layers, title: "Wine comparison tools", desc: "Side-by-side wine comparisons with tasting notes, origin, and price so guests can evaluate options clearly." },
  { icon: Eye, title: "Interactive descriptions", desc: "Clear tasting notes, producer stories, and visual profiles that make every wine approachable — no sommelier required." },
  { icon: Target, title: "Recommendation engine", desc: "AI-powered suggestions based on guest preferences, selected dishes, and context to increase average spend." },
];

const benefits = [
  { icon: TrendingUp, text: "Increase wine sales" },
  { icon: RotateCcw, text: "Improve wine list rotation" },
  { icon: Users, text: "Help staff recommend wines" },
  { icon: Wine, text: "Enhance guest experience" },
  { icon: ShoppingCart, text: "Make wine easier to understand" },
];

const comparison = [
  { feature: "Easy to update", paper: false, pdf: "partial", digital: true },
  { feature: "Interactive filters", paper: false, pdf: false, digital: true },
  { feature: "Food pairings", paper: false, pdf: false, digital: true },
  { feature: "Wine recommendations", paper: false, pdf: false, digital: true },
  { feature: "Sales analytics", paper: false, pdf: false, digital: true },
  { feature: "Guest-friendly design", paper: false, pdf: "partial", digital: true },
  { feature: "Always accurate", paper: false, pdf: "partial", digital: true },
  { feature: "Mobile-friendly", paper: false, pdf: "partial", digital: true },
];

const ComparisonIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <CheckCircle size={18} className="text-wine mx-auto" />;
  if (value === "partial") return <Minus size={18} className="text-muted-foreground mx-auto" />;
  return <XCircle size={18} className="text-muted-foreground/40 mx-auto" />;
};

const WineListSoftware = () => {
  useEffect(() => {
    const faqSchema = document.createElement("script");
    faqSchema.id = "winelist-faq-jsonld";
    faqSchema.type = "application/ld+json";
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is wine list management software?",
          acceptedAnswer: { "@type": "Answer", text: "Wine list management software is a specialized platform that helps restaurants digitize, organize, and optimize their wine lists. It includes features like smart filters, food pairing suggestions, and sales analytics to increase wine revenue." },
        },
        {
          "@type": "Question",
          name: "How does digital wine list software increase wine sales?",
          acceptedAnswer: { "@type": "Answer", text: "Digital wine list software increases sales by making wines easier to discover through filters and recommendations, suggesting food pairings that encourage orders, and providing clear descriptions that help guests choose with confidence." },
        },
        {
          "@type": "Question",
          name: "What are the advantages of a digital wine list over paper or PDF?",
          acceptedAnswer: { "@type": "Answer", text: "Digital wine lists are always up to date, offer interactive features like filters and pairings, provide sales analytics, work on any device, and actively help sell wine through intelligent recommendations — unlike static paper or PDF lists." },
        },
      ],
    });
    document.head.appendChild(faqSchema);

    const breadcrumbSchema = document.createElement("script");
    breadcrumbSchema.id = "winelist-breadcrumb-jsonld";
    breadcrumbSchema.type = "application/ld+json";
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://winerim.wine/" },
        { "@type": "ListItem", position: 2, name: "Wine List Management Software", item: "https://winerim.wine/wine-list-management-software" },
      ],
    });
    document.head.appendChild(breadcrumbSchema);

    return () => {
      document.getElementById("winelist-faq-jsonld")?.remove();
      document.getElementById("winelist-breadcrumb-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Wine List Management Software for Restaurants | Winerim"
        description="Manage your wine list, optimize your cellar and increase wine sales with intelligent software designed for hospitality. Digital wine lists with smart filters, food pairings and AI recommendations."
        url="https://winerim.wine/wine-list-management-software"
        hreflang={[
          { lang: "en", url: "https://winerim.wine/wine-list-management-software" },
          { lang: "es", url: "https://winerim.wine/software-carta-de-vinos" },
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-8"
              >
                <Wine size={14} className="text-wine" />
                <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">Wine List Software</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-8"
              >
                Wine List Management Software for{" "}
                <span className="text-gradient-wine italic">Restaurants</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
              >
                Manage your wine list, optimize your cellar and increase wine sales with an intelligent platform designed for hospitality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/demo"
                  className="bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] hover:shadow-lg hover:shadow-wine/20 transition-all duration-300 text-center"
                >
                  Request a demo
                </Link>
                <Link
                  to="/analisis-carta"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all duration-300"
                >
                  Analyze my wine list
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(ellipse,hsl(var(--wine)/0.15),transparent_70%)] blur-2xl" />
                <img
                  src={mockupImg}
                  alt="Winerim digital wine list software on tablet and mobile"
                  className="relative w-full max-w-lg mx-auto drop-shadow-2xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* INTRODUCTION */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">The problem</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Static wine lists are <span className="text-gradient-wine italic">costing you sales</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Most restaurants still rely on paper or PDF wine lists that are difficult to navigate, impossible to personalize, and do nothing to help guests choose — or spend more. In an era where every touchpoint can drive revenue, a static wine list is a missed opportunity.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              The most common issues we see across hundreds of restaurant wine programs:
            </p>
            <div className="space-y-3">
              {problems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
                    <Icon size={18} className="text-destructive shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WHAT IS WINE LIST SOFTWARE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">The solution</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What is wine list <span className="text-gradient-wine italic">management software</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A specialized platform that transforms how restaurants manage, present, and sell wine.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border p-8 md:p-10">
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Wine list management software replaces static menus with an intelligent, interactive platform. It gives restaurants full control over their wine program while making wine more accessible — and more sellable — to every guest.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-wine shrink-0 mt-0.5" />
                    <span className="text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Features</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Key features of modern <span className="text-gradient-wine italic">wine list software</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group bg-gradient-card rounded-xl border border-border p-7 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="w-12 h-12 rounded-xl bg-wine/10 flex items-center justify-center mb-5 group-hover:bg-wine/20 group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Benefits</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why restaurants choose <span className="text-gradient-wine italic">wine list software</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-center gap-4 bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <span className="font-medium text-sm">{benefit.text}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Results</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Real impact on <span className="text-gradient-wine italic">wine revenue</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Restaurants using intelligent wine list platforms consistently report measurable improvements across their wine program.
              </p>
              <div className="space-y-5">
                {[
                  { label: "Higher wine sales", desc: "Guided recommendations and clear descriptions help guests choose — and spend — more confidently." },
                  { label: "Better margins", desc: "Strategic pricing visibility and smart positioning move guests toward higher-value wines naturally." },
                  { label: "Efficient cellar management", desc: "Real-time data on what sells, what doesn't, and where the gaps are helps optimize purchasing decisions." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu size={16} className="text-wine" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "+22%", label: "Average ticket increase" },
                  { value: "+35%", label: "Wine orders growth" },
                  { value: "3×", label: "Faster list updates" },
                  { value: "90%", label: "Staff confidence" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-gradient-card rounded-xl border border-border p-6 text-center hover:border-wine/30 transition-all duration-300"
                  >
                    <p className="font-heading text-3xl font-bold text-gradient-wine mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">Comparison</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why digital wine lists are the <span className="text-gradient-wine italic">future</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              See how intelligent wine list software compares to traditional formats.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">Paper</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground">PDF</th>
                      <th className="text-center p-4 font-semibold text-wine">Digital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="p-4">{row.feature}</td>
                        <td className="p-4"><ComparisonIcon value={row.paper} /></td>
                        <td className="p-4"><ComparisonIcon value={row.pdf} /></td>
                        <td className="p-4"><ComparisonIcon value={row.digital} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
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
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
                Get started
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Turn your wine list into a system that{" "}
                <span className="text-gradient-wine italic">sells more wine</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
                See how Winerim can transform your wine program. Request a demo and discover the potential of your wine list.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
                >
                  Request a demo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contacto"
                  className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-all hover:-translate-y-0.5"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WineListSoftware;
