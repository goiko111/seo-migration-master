import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Maximize2, Minimize2, Share2, Check, ArrowRight, Phone, Mail,
  Wine, Sparkles, BarChart3, Layers3, Boxes, Tags,
  TrendingUp, Users, Languages, Repeat, ShoppingCart, BadgeCheck,
  Shield, Calendar, Database, GitCompare, Bell, Zap,
  Building2, LineChart, Rocket, Target, Upload, QrCode, Printer, LifeBuoy,
  Download,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  PRESENTATION_CONTENT,
  PRESENTATION_ROUTE,
  type PresentationContent,
} from "@/data/presentationContent";
import { CANONICAL_DOMAIN } from "@/seo/config";

import heroApp from "@/assets/presentation/hero-app.jpg";
import wineCard from "@/assets/presentation/wine-card.jpg";
import dashboardLaptop from "@/assets/presentation/dashboard-laptop.jpg";
import tastingNotes from "@/assets/presentation/tasting-notes.jpg";
import pairing from "@/assets/presentation/pairing.jpg";
import bigData from "@/assets/presentation/big-data.jpg";
import comparator from "@/assets/presentation/comparator.jpg";
import stockManagement from "@/assets/presentation/stock-management.jpg";
import clientsGrid from "@/assets/presentation/clients-grid.jpg";

/* ─── Layout primitives ─── */

const SlideShell = ({
  children,
  className = "",
  bg = "default",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: "default" | "wine" | "cream" | "dark";
}) => {
  const bgClass =
    bg === "wine"
      ? "bg-gradient-wine text-cream"
      : bg === "cream"
      ? "bg-cream text-wine-dark"
      : bg === "dark"
      ? "bg-[hsl(140_2%_8%)] text-cream"
      : "bg-background text-foreground";
  return (
    <section
      className={`presentation-slide relative w-full min-h-screen flex items-center justify-center px-6 md:px-16 py-24 md:py-20 snap-start overflow-hidden ${bgClass} ${className}`}
    >
      <div className="max-w-7xl w-full mx-auto">{children}</div>
    </section>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-wine-light/90">
    <span className="h-px w-8 bg-current opacity-60" />
    {children}
  </div>
);

const SlideTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`font-heading font-bold leading-[1.05] text-4xl md:text-5xl lg:text-6xl mt-4 mb-6 ${className}`}
  >
    {children}
  </h2>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── Page ─── */

export default function Presentation() {
  const { lang, allLangPaths } = useLanguage();
  const t: PresentationContent = PRESENTATION_CONTENT[lang];
  const [params] = useSearchParams();
  const grupo = params.get("grupo");
  const [shared, setShared] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const url = `${CANONICAL_DOMAIN}${PRESENTATION_ROUTE[lang]}`;
  const hreflang = allLangPaths("/presentacion").map((h) => ({
    lang: h.lang,
    url: h.lang === "x-default" || h.lang === "es"
      ? `${CANONICAL_DOMAIN}/presentacion`
      : `${CANONICAL_DOMAIN}${PRESENTATION_ROUTE[h.lang as keyof typeof PRESENTATION_ROUTE] || h.url}`,
  }));

  /* Tracking */
  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: "presentation_view",
      lang,
      grupo: grupo || undefined,
    });
  }, [lang, grupo]);

  const handleShare = useCallback(async () => {
    const shareUrl = new URL(url);
    shareUrl.searchParams.set("utm_source", "presentation");
    shareUrl.searchParams.set("utm_medium", "share");
    if (grupo) shareUrl.searchParams.set("grupo", grupo);
    const finalUrl = shareUrl.toString();
    const copyFallback = (text: string): boolean => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    };
    let success = false;
    try {
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      if (navigator.share && isMobile) {
        await navigator.share({ title: t.metaTitle, url: finalUrl });
        success = true;
      } else if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(finalUrl);
        success = true;
      } else {
        success = copyFallback(finalUrl);
      }
    } catch {
      success = copyFallback(finalUrl);
    }
    if (success) {
      setShared(true);
      setTimeout(() => setShared(false), 2200);
      (window as any).dataLayer?.push({ event: "presentation_share_click", lang });
    } else {
      window.prompt(t.shareLabel, finalUrl);
    }
  }, [url, grupo, t.metaTitle, t.shareLabel, lang]);

  const handleDownloadPdf = useCallback(() => {
    (window as any).dataLayer?.push({ event: "presentation_download_pdf", lang });
    window.print();
  }, [lang]);

  const handleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const contactPath = useMemo(() => {
    const map: Record<string, string> = {
      es: "/contacto", en: "/en/contact", fr: "/fr/contact",
      it: "/it/contatto", de: "/de/kontakt", pt: "/pt/contacto",
    };
    return `${map[lang]}?origen=presentacion-grupos`;
  }, [lang]);

  return (
    <div ref={containerRef} className="presentation-root bg-background min-h-screen">
      <SEOHead
        title={t.metaTitle}
        description={t.metaDescription}
        url={url}
        hreflang={hreflang}
        image={`${CANONICAL_DOMAIN}/og-default.jpg`}
      />

      {/* Print + scroll-snap styles */}
      <style>{`
        @media (min-width: 1024px) {
          .presentation-root { scroll-snap-type: y mandatory; scroll-behavior: smooth; height: 100vh; overflow-y: auto; }
          .presentation-slide { scroll-snap-align: start; min-height: 100vh; }
        }
        @media print {
          .presentation-chrome { display: none !important; }
          .presentation-slide { page-break-after: always; min-height: auto; padding: 1in; }
        }
      `}</style>

      {/* Top chrome */}
      <header className="presentation-chrome fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-background/70 backdrop-blur border-b border-border/40">
        <Link to={lang === "es" ? "/" : `/${lang}`} className="font-heading text-lg font-bold tracking-tight text-cream">
          winerim
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            size="sm"
            variant="ghost"
            onClick={handleShare}
            className="hidden sm:inline-flex gap-2 text-cream hover:text-cream"
            aria-label={t.shareLabel}
          >
            {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span className="text-xs">{shared ? t.shareCopied : t.shareLabel}</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleFullscreen}
            className="hidden lg:inline-flex text-cream hover:text-cream"
            aria-label={t.fullscreenLabel}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button asChild size="sm" className="bg-wine hover:bg-wine-light text-cream">
            <Link to={contactPath}>{t.ctaTalk}</Link>
          </Button>
        </div>
      </header>

      {/* ──────── SLIDE 1 — COVER ──────── */}
      <SlideShell bg="dark" className="!pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>{t.s1Eyebrow}</Eyebrow>
            <h1 className="font-heading font-bold leading-[1.02] text-5xl md:text-6xl lg:text-7xl mt-4 mb-6">
              {t.s1Title}
            </h1>
            <p className="text-lg md:text-xl text-cream/80 max-w-xl">{t.s1Subtitle}</p>
            {grupo && (
              <p className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-gold text-sm">
                <Sparkles className="h-3.5 w-3.5" /> {t.preparedFor(grupo)}
              </p>
            )}
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-wine opacity-40 blur-3xl rounded-full" />
              <img
                src={heroApp}
                alt="Winerim wine list interface"
                className="relative rounded-2xl shadow-2xl ring-1 ring-cream/10"
                fetchPriority="high"
                width={1200}
                height={760}
              />
            </div>
          </Reveal>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 2 — PROBLEM ──────── */}
      <SlideShell bg="wine">
        <div className="text-center max-w-5xl mx-auto">
          <Reveal>
            <Eyebrow>{t.s2Eyebrow}</Eyebrow>
            <h2 className="font-heading font-bold leading-[1.05] text-4xl md:text-6xl lg:text-7xl mt-6 mb-8">
              {t.s2Title}
            </h2>
            <p className="text-lg md:text-xl text-cream/85 max-w-3xl mx-auto">{t.s2Subtitle}</p>
          </Reveal>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 3 — WHAT IS WINERIM ──────── */}
      <SlideShell>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>{t.s3Eyebrow}</Eyebrow>
            <SlideTitle>{t.s3Title}</SlideTitle>
            <p className="text-lg text-foreground/80 max-w-xl leading-relaxed">{t.s3Body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <img
              src={wineCard}
              alt="Winerim wine card detail"
              loading="lazy"
              className="rounded-2xl shadow-2xl ring-1 ring-border/50 mx-auto max-w-md"
            />
          </Reveal>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 4 — MATCH ──────── */}
      <SlideShell bg="dark">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <Eyebrow>{t.s4Eyebrow}</Eyebrow>
            <SlideTitle>{t.s4Title}</SlideTitle>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Users, title: t.s4ColDinerTitle, body: t.s4ColDinerBody },
            { icon: BadgeCheck, title: t.s4ColRestaurantTitle, body: t.s4ColRestaurantBody },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-gradient-card border border-border/50 rounded-2xl p-8 h-full">
                <c.icon className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-heading text-2xl font-bold mb-3">{c.title}</h3>
                <p className="text-cream/75 leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SlideShell>

      {/* ──────── SLIDE 5 — RESTAURANT BENEFITS ──────── */}
      <SlideShell>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow>{t.s5Eyebrow}</Eyebrow>
            <SlideTitle>{t.s5Title}</SlideTitle>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.s5Items.map((item, i) => {
            const icons = [TrendingUp, Users, Target, Boxes, Languages, Repeat, ShoppingCart, BadgeCheck];
            const Icon = icons[i] || BadgeCheck;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card border border-border/40 rounded-xl p-5 h-full hover:border-wine/40 transition-colors">
                  <Icon className="h-6 w-6 text-wine-light mb-3" />
                  <h3 className="font-heading text-lg font-bold mb-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SlideShell>

      {/* ──────── SLIDE 6 — DINER BENEFITS ──────── */}
      <SlideShell bg="cream">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <Reveal>
              <Eyebrow>{t.s6Eyebrow}</Eyebrow>
              <SlideTitle className="text-wine-dark">{t.s6Title}</SlideTitle>
            </Reveal>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {t.s6Items.map((item, i) => {
              const icons = [Sparkles, Wine, Shield, BadgeCheck];
              const Icon = icons[i] || Sparkles;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-wine-dark/10">
                    <Icon className="h-6 w-6 text-wine mb-3" />
                    <h3 className="font-heading text-lg font-bold mb-1 text-wine-dark">{item.title}</h3>
                    <p className="text-sm text-wine-dark/70 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 7 — 6 PILLARS ──────── */}
      <SlideShell bg="dark">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.s7Eyebrow}</Eyebrow>
            <SlideTitle>{t.s7Title}</SlideTitle>
            <p className="text-cream/70">{t.s7Subtitle}</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.s7Pillars.map((p, i) => {
            const icons = [Sparkles, Wine, BarChart3, GitCompare, Boxes, Tags];
            const Icon = icons[i] || Layers3;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group relative bg-gradient-card border border-border/40 rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-wine/20 text-gold mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-cream/70 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SlideShell>

      {/* ──────── SLIDE 8 — TASTING + PAIRING ──────── */}
      <SlideShell>
        <div className="text-center mb-12">
          <Reveal>
            <Eyebrow>{t.s8Eyebrow}</Eyebrow>
          </Reveal>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <img src={tastingNotes} alt="Tasting notes UI" loading="lazy" className="rounded-2xl shadow-xl ring-1 ring-border/50 mx-auto max-w-xs mb-6" />
            <h3 className="font-heading text-2xl font-bold mb-2">{t.s8TastingTitle}</h3>
            <p className="text-foreground/75 leading-relaxed">{t.s8TastingBody}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={pairing} alt="Automatic pairing UI" loading="lazy" className="rounded-2xl shadow-xl ring-1 ring-border/50 mx-auto max-w-md mb-6" />
            <h3 className="font-heading text-2xl font-bold mb-2">{t.s8PairingTitle}</h3>
            <p className="text-foreground/75 leading-relaxed">{t.s8PairingBody}</p>
          </Reveal>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 9 — BIG DATA + COMPARATOR ──────── */}
      <SlideShell bg="dark">
        <div className="text-center mb-10">
          <Reveal><Eyebrow>{t.s9Eyebrow}</Eyebrow></Reveal>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-7 w-7 text-gold" />
              <h3 className="font-heading text-2xl md:text-3xl font-bold">{t.s9BigDataTitle}</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {t.s9BigDataBullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-cream/80">
                  <ArrowRight className="h-5 w-5 text-wine-light flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <img src={bigData} alt="Big data dashboard" loading="lazy" className="rounded-xl shadow-xl ring-1 ring-cream/10" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <GitCompare className="h-7 w-7 text-gold" />
              <h3 className="font-heading text-2xl md:text-3xl font-bold">{t.s9CompTitle}</h3>
            </div>
            <p className="text-cream/80 mb-6 leading-relaxed">{t.s9CompBody}</p>
            <img src={comparator} alt="Wine comparator" loading="lazy" className="rounded-xl shadow-xl ring-1 ring-cream/10" />
          </Reveal>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 10 — STOCK MANAGEMENT ──────── */}
      <SlideShell>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>{t.s10Eyebrow}</Eyebrow>
            <SlideTitle>{t.s10Title}</SlideTitle>
            <p className="text-foreground/75 leading-relaxed mb-6">{t.s10Body}</p>
            <img src={stockManagement} alt="Stock management UI" loading="lazy" className="rounded-xl shadow-xl ring-1 ring-border/50" />
          </Reveal>
          <div className="grid gap-3">
            {t.s10Items.map((item, i) => {
              const icons = [Zap, Bell, Repeat, ShoppingCart, TrendingUp];
              const Icon = icons[i] || Zap;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex gap-4 bg-gradient-card border border-border/40 rounded-xl p-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-wine/20 text-gold flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-foreground/70">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 11 — FOR GROUPS ──────── */}
      <SlideShell bg="wine">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.s11Eyebrow}</Eyebrow>
            <SlideTitle>{t.s11Title}</SlideTitle>
            <p className="text-cream/85 text-lg">{t.s11Subtitle}</p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {t.s11Items.map((item, i) => {
            const icons = [Building2, LineChart, Rocket, Target];
            const Icon = icons[i] || Building2;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 h-full backdrop-blur-sm">
                  <Icon className="h-7 w-7 text-gold mb-4" />
                  <h3 className="font-heading text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-cream/80 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SlideShell>

      {/* ──────── SLIDE 11b — MANAGEMENT + DYNAMIC INTELLIGENCE ──────── */}
      <SlideShell bg="dark">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.sMgmtEyebrow}</Eyebrow>
            <SlideTitle>{t.sMgmtTitle}</SlideTitle>
            <p className="text-cream/75 text-lg">{t.sMgmtSubtitle}</p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.sMgmtItems.map((item, i) => {
            const icons = [Layers3, Sparkles, Bell, Target, Users, LineChart];
            const Icon = icons[i] || Layers3;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card border border-border/40 rounded-2xl p-6 h-full hover:border-wine/40 transition-colors">
                  <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-wine/20 text-gold mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-cream/70 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-cream/70 italic max-w-3xl mx-auto">
            {t.sMgmtFootnote}
          </p>
        </Reveal>
      </SlideShell>

      {/* ──────── SLIDE 11c — WINERIM SUPPLY ──────── */}
      <SlideShell bg="cream">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <Reveal>
              <Eyebrow>{t.sSupplyEyebrow}</Eyebrow>
              <SlideTitle className="text-wine-dark">{t.sSupplyTitle}</SlideTitle>
              <p className="text-wine-dark/75 leading-relaxed mb-6">{t.sSupplyBody}</p>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold">
                <ShoppingCart className="h-3.5 w-3.5" /> {t.sSupplyTag}
              </span>
            </Reveal>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {t.sSupplyItems.map((item, i) => {
              const icons = [ShoppingCart, GitCompare, Database, TrendingUp];
              const Icon = icons[i] || ShoppingCart;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-wine-dark/10 h-full">
                    <Icon className="h-6 w-6 text-wine mb-3" />
                    <h3 className="font-heading text-lg font-bold mb-1 text-wine-dark">{item.title}</h3>
                    <p className="text-sm text-wine-dark/70 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </SlideShell>

      {/* ──────── SLIDE 12 — IMPLEMENTATION ──────── */}
      <SlideShell>
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.s12Eyebrow}</Eyebrow>
            <SlideTitle>{t.s12Title}</SlideTitle>
            <p className="text-foreground/75">{t.s12Body}</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.s12Steps.map((step, i) => {
            const icons = [Upload, QrCode, Printer, LifeBuoy];
            const Icon = icons[i] || Calendar;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="relative bg-gradient-card border border-border/40 rounded-2xl p-6 h-full">
                  <div className="absolute -top-3 -left-3 h-9 w-9 rounded-full bg-wine text-cream font-heading font-bold flex items-center justify-center shadow-lg">
                    {i + 1}
                  </div>
                  <Icon className="h-6 w-6 text-gold mb-3 mt-2" />
                  <h3 className="font-heading text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SlideShell>

      {/* ──────── SLIDE 13 — CLIENTS ──────── */}
      <SlideShell bg="dark">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.s13Eyebrow}</Eyebrow>
            <SlideTitle>{t.s13Title}</SlideTitle>
            <p className="text-cream/75">{t.s13Subtitle}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden ring-1 ring-cream/10 bg-cream max-w-5xl mx-auto">
            <img src={clientsGrid} alt="Restaurants using Winerim" loading="lazy" className="w-full h-auto" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <blockquote className="mt-10 max-w-3xl mx-auto text-center">
            <p className="font-heading text-xl md:text-2xl italic text-cream/90">"{t.s13Quote}"</p>
            <footer className="mt-3 text-sm text-cream/60">— {t.s13QuoteAuthor}</footer>
          </blockquote>
        </Reveal>
      </SlideShell>

      {/* ──────── SLIDE 14 — CTA ──────── */}
      <SlideShell bg="wine">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal>
            <Eyebrow>{t.s14Eyebrow}</Eyebrow>
            <h2 className="font-heading font-bold leading-[1.05] text-5xl md:text-6xl lg:text-7xl mt-6 mb-8">
              {t.s14Title}
            </h2>
            <p className="text-lg md:text-xl text-cream/90 mb-3 max-w-2xl mx-auto">{t.s14Highlight1}</p>
            <p className="text-lg md:text-xl text-cream/90 mb-10 max-w-2xl mx-auto">{t.s14Highlight2}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Button asChild size="lg" className="bg-cream text-wine hover:bg-cream/90 font-semibold">
                <Link to={contactPath}>
                  {t.s14CtaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
                className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream"
              >
                {shared ? <Check className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
                {shared ? t.shareCopied : t.s14CtaSecondary}
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-cream/80">
              <a href={`mailto:${t.s14Email}`} className="inline-flex items-center gap-2 hover:text-cream">
                <Mail className="h-4 w-4" /> {t.s14Email}
              </a>
              <a href={`tel:${t.s14Phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-cream">
                <Phone className="h-4 w-4" /> {t.s14Phone}
              </a>
            </div>
          </Reveal>
        </div>
      </SlideShell>
    </div>
  );
}