import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Maximize2, Minimize2, Share2, Check, ArrowRight, Phone, Mail,
  Wine, Sparkles, BarChart3, Layers3, Boxes, Tags,
  TrendingUp, Users, Languages, Repeat, ShoppingCart, BadgeCheck,
  Shield, Calendar, Database, GitCompare, Bell, Zap,
  Building2, LineChart, Rocket, Target, Upload, QrCode, Printer, LifeBuoy,
  Download, CheckCircle2, ChevronDown, Smartphone, Tablet, Globe,
  Cable, Cloud, FileStack, MapPinned, MessageSquareText, ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import SEOHead from "@/components/SEOHead";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import winerimLogo from "@/assets/winerim-logo.webp";
import {
  PRESENTATION_CONTENT,
  type PresentationContent,
} from "@/data/presentationLegacyContent";
import {
  PRESENTATION_CONTENT as CURRENT_PRESENTATION_CONTENT,
  PRESENTATION_ROUTE,
  type PresentationContent as CurrentPresentationContent,
} from "@/data/presentationContent";
import { createCurrentCommercialContent, getCommercialSlideLabels } from "@/data/presentationStory";
import { PRESENTATION_CAPABILITY_DEPTH } from "@/data/presentationCapabilityDepth";
import { CANONICAL_DOMAIN } from "@/seo/config";

type PresentationAnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

import heroApp from "@/assets/presentation/hero-app.webp";
import wineCard from "@/assets/presentation/wine-card.webp";
import dashboardLaptop from "@/assets/presentation/dashboard-laptop.jpg";
import tastingNotes from "@/assets/presentation/tasting-notes.webp";
import pairing from "@/assets/presentation/pairing.webp";
import bigData from "@/assets/presentation/rendimiento-carta.webp";
import comparator from "@/assets/presentation/comparator.webp";
import stockManagement from "@/assets/presentation/stock-management.webp";
import clientsGrid from "@/assets/presentation/clients-grid.jpg";
import cloudrimInbox from "@/assets/feature-cloudrim-inbox-current.webp";
import marginsOverview from "@/assets/feature-margins-overview.webp";
import marginsPortfolio from "@/assets/feature-margins-portfolio.webp";
import marginsSleepingCapital from "@/assets/feature-margins-sleeping-capital.webp";
import marginsForecast from "@/assets/feature-margins-consumption-forecast.webp";
import supplyComparison from "@/assets/feature-supply-tariff-comparison.webp";
import saviaPrompt from "@/assets/feature-savia-prompt.webp";
import saviaAnswer from "@/assets/feature-savia-margin-answer.webp";
import cellarMap from "@/assets/feature-wine-cellar-maps-list.jpg";
import wineLockers from "@/assets/feature-wine-locker-client-wines.jpg";

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
      className={`presentation-slide relative w-full min-h-screen flex items-start lg:items-center justify-center px-6 md:px-16 py-24 md:py-20 snap-start overflow-x-clip overflow-y-visible lg:overflow-hidden ${bgClass} ${className}`}
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

type PresentationLegacyProps = {
  variant?: "archive" | "current";
  embedded?: boolean;
  partnerName?: string | null;
};

export default function PresentationLegacy({
  variant = "archive",
  embedded = false,
  partnerName,
}: PresentationLegacyProps) {
  const { lang, allLangPaths } = useLanguage();
  const currentT: CurrentPresentationContent = CURRENT_PRESENTATION_CONTENT[lang];
  const depthT = PRESENTATION_CAPABILITY_DEPTH[lang];
  const t: PresentationContent = variant === "current" || embedded
    ? createCurrentCommercialContent(lang, PRESENTATION_CONTENT[lang], currentT)
    : PRESENTATION_CONTENT[lang];
  const [params] = useSearchParams();
  const grupo = params.get("grupo");
  const preparedForName = partnerName || grupo;
  const includesUpdates = variant === "current" || embedded;
  const supplyContent = includesUpdates
    ? depthT.supply
    : {
        eyebrow: t.sSupplyEyebrow,
        title: t.sSupplyTitle,
        subtitle: t.sSupplyBody,
        items: t.sSupplyItems,
        outcomeLabel: "",
        outcome: t.sSupplyTag,
      };
  const [shared, setShared] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /* Short labels per slide for side dots / tooltips */
  const slideLabels = useMemo<string[]>(
    () => getCommercialSlideLabels(t, currentT, { includesUpdates, embedded }),
    [currentT, embedded, includesUpdates, t],
  );

  const route = embedded
    ? "/deck"
    : variant === "archive"
      ? "/presentacion-anterior"
      : PRESENTATION_ROUTE[lang];
  const url = `${CANONICAL_DOMAIN}${route}`;
  const hreflang = variant === "current" && !embedded
    ? allLangPaths("/presentacion").map((entry) => ({
        lang: entry.lang,
        url:
          entry.lang === "x-default" || entry.lang === "es"
            ? `${CANONICAL_DOMAIN}/presentacion`
            : `${CANONICAL_DOMAIN}${PRESENTATION_ROUTE[entry.lang as keyof typeof PRESENTATION_ROUTE] || entry.url}`,
      }))
    : undefined;

  /* Tracking */
  useEffect(() => {
    if (typeof window === "undefined" || embedded) return;
    const analyticsWindow = window as PresentationAnalyticsWindow;
    analyticsWindow.dataLayer ||= [];
    analyticsWindow.dataLayer.push({
      event: "presentation_view",
      lang,
      grupo: preparedForName || undefined,
      version: includesUpdates ? "commercial-story-2026-07-deep" : "legacy-archive-2026-07",
    });
  }, [embedded, includesUpdates, lang, preparedForName]);

  const handleShare = useCallback(async () => {
    const shareUrl = new URL(url);
    shareUrl.searchParams.set("utm_source", "presentation");
    shareUrl.searchParams.set("utm_medium", "share");
    if (preparedForName) shareUrl.searchParams.set(embedded ? "partner" : "grupo", preparedForName);
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
      (window as PresentationAnalyticsWindow).dataLayer?.push({ event: "presentation_share_click", lang });
    } else {
      window.prompt(t.shareLabel, finalUrl);
    }
  }, [embedded, url, preparedForName, t.metaTitle, t.shareLabel, lang]);

  const handleDownloadPdf = useCallback(async () => {
    (window as PresentationAnalyticsWindow).dataLayer?.push({ event: "presentation_download_pdf", lang });
    const { generateDeckPdf } = await import("@/lib/generateDeckPdf");
    await generateDeckPdf(t.metaTitle || "winerim-presentacion");
  }, [lang, t.metaTitle]);

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

  /* Scroll tracking: arrow visibility + current slide + progress */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const getSlides = () =>
      Array.from(el.querySelectorAll<HTMLElement>(".presentation-slide"));
    setTotalSlides(getSlides().length);
    const onScroll = () => {
      if (el.scrollTop > 100) setShowScrollArrow(false);
      else setShowScrollArrow(true);
      const slides = getSlides();
      const anchor = el.getBoundingClientRect().top + 72;
      const containingIndex = slides.findIndex((slide) => {
        const rect = slide.getBoundingClientRect();
        return rect.top <= anchor && rect.bottom > anchor;
      });
      const nearest = slides.reduce(
        (best, slide, index) => {
          const distance = Math.abs(slide.getBoundingClientRect().top - anchor);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      setCurrentSlide(containingIndex >= 0 ? containingIndex : nearest.index);
      const max = el.scrollHeight - el.clientHeight;
      setScrollProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goToSlide = useCallback((idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const slides = el.querySelectorAll<HTMLElement>(".presentation-slide");
    const target = slides[Math.max(0, Math.min(slides.length - 1, idx))];
    if (target) el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }, []);

  const scrollToNextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [goToSlide, currentSlide]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          goToSlide(currentSlide + 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goToSlide(currentSlide - 1);
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case "f":
        case "F":
          handleFullscreen();
          break;
        case "Escape":
          if (document.fullscreenElement) document.exitFullscreen?.();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide, totalSlides, goToSlide, handleFullscreen]);

  /* Mobile swipe (vertical) */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startY = 0;
    let startT = 0;
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startT = Date.now();
    };
    const onEnd = (e: TouchEvent) => {
      const dy = e.changedTouches[0].clientY - startY;
      const dt = Date.now() - startT;
      if (Math.abs(dy) > 60 && dt < 600) {
        if (dy < 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [currentSlide, goToSlide]);

  const contactPath = useMemo(() => {
    const map: Record<string, string> = {
      es: "/contacto", en: "/en/contact", fr: "/fr/contact",
      it: "/it/contatto", de: "/de/kontakt", pt: "/pt/contacto",
    };
    return `${map[lang]}?origen=${embedded ? "partner-deck" : "presentacion-grupos"}`;
  }, [embedded, lang]);

  return (
    <div
      ref={embedded ? undefined : containerRef}
      className={embedded ? "contents" : "presentation-root bg-background min-h-screen"}
      data-presentation-version={includesUpdates ? "commercial-story-2026-07-deep" : "legacy-archive-2026-07"}
    >
      {!embedded && (
        <SEOHead
          title={includesUpdates ? currentT.metaTitle : t.metaTitle}
          description={includesUpdates ? currentT.metaDescription : t.metaDescription}
          url={url}
          hreflang={hreflang}
          image={`${CANONICAL_DOMAIN}/og-presentation.jpg`}
          noindex={variant === "archive"}
        />
      )}

      {/* Print + scroll-snap styles */}
      <style>{`
        html body #wc-toggle,
        html body #winerim-web-chat,
        html body .winerim-web-chat,
        html body [data-winerim-chat] { display: none !important; }
        @media (min-width: 1024px) {
          .presentation-root { scroll-snap-type: y mandatory; scroll-behavior: smooth; height: 100vh; overflow-y: auto; }
          .presentation-slide { scroll-snap-align: start; min-height: 100vh; }
        }
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body {
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          *, *::before, *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          .presentation-chrome { display: none !important; }
          .presentation-root { height: auto !important; overflow: visible !important; scroll-snap-type: none !important; }
          .presentation-slide {
            page-break-after: always;
            break-after: page;
            page-break-inside: avoid;
            break-inside: avoid;
            min-height: 0 !important;
            height: auto !important;
            padding: 0.4in !important;
            overflow: hidden !important;
          }
          .presentation-slide:last-child { page-break-after: auto; }
          .presentation-slide img { max-height: 3in !important; object-fit: contain !important; }
        }
      `}</style>

      {/* Top chrome */}
      {!embedded && <header className="presentation-chrome fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-background/70 backdrop-blur border-b border-border/40">
        <Link
          to={lang === "es" ? "/" : `/${lang}`}
          className="flex items-center gap-2 text-cream"
          aria-label="Winerim"
        >
          <img
            src={winerimLogo}
            alt="Winerim"
            className="h-7 md:h-8 w-auto"
            loading="eager"
            decoding="async"
          />
        </Link>
        <div className="flex items-center gap-2">
          {variant === "current" && <LanguageSwitcher />}
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
            onClick={handleDownloadPdf}
            className="hidden md:inline-flex gap-2 text-cream hover:text-cream"
            aria-label="PDF"
          >
            <Download className="h-4 w-4" />
            <span className="text-xs">PDF</span>
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
      </header>}

      {/* Progress bar */}
      {!embedded && <div
        className="presentation-chrome fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
        aria-hidden
      >
        <div
          className="h-full bg-gold transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>}

      {/* Side dots navigation (desktop) */}
      {!embedded && <nav
        className="presentation-chrome hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5"
        aria-label="Slide navigation"
      >
        {Array.from({ length: totalSlides }).map((_, i) => {
          const active = i === currentSlide;
          return (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="group relative flex items-center justify-end"
              aria-label={`Slide ${i + 1}: ${slideLabels[i] || ""}`}
              aria-current={active ? "true" : undefined}
            >
              <span className="absolute right-6 whitespace-nowrap text-[10px] uppercase tracking-widest font-semibold text-cream/0 group-hover:text-cream/90 bg-background/80 backdrop-blur px-2 py-1 rounded transition-opacity pointer-events-none opacity-0 group-hover:opacity-100">
                {slideLabels[i] || `Slide ${i + 1}`}
              </span>
              <span
                className={`block rounded-full transition-all ${
                  active
                    ? "h-2.5 w-2.5 bg-gold ring-2 ring-gold/30"
                    : "h-1.5 w-1.5 bg-cream/40 hover:bg-cream/80"
                }`}
              />
            </button>
          );
        })}
      </nav>}

      {/* Slide counter (bottom-right) */}
      {!embedded && totalSlides > 0 && (
        <div className="presentation-chrome fixed bottom-4 right-4 z-40 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-border/40 text-[11px] font-mono tabular-nums text-cream/80">
          {String(currentSlide + 1).padStart(2, "0")}
          <span className="text-cream/40"> / {String(totalSlides).padStart(2, "0")}</span>
        </div>
      )}

      {/* ──────── SLIDE 1 — COVER ──────── */}
      <SlideShell bg="dark" className="!pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>{t.s1Eyebrow}</Eyebrow>
            <h1 className="font-heading font-bold leading-[1.02] text-5xl md:text-6xl lg:text-7xl mt-4 mb-6">
              {t.s1Title}
            </h1>
            <p className="text-lg md:text-xl text-cream/80 max-w-xl">{t.s1Subtitle}</p>
            {preparedForName && (
              <p className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 text-gold text-sm">
                <Sparkles className="h-3.5 w-3.5" /> {t.preparedFor(preparedForName)}
              </p>
            )}
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-wine opacity-40 blur-3xl rounded-full" />
              <img
                src={heroApp}
                alt="Winerim wine list interface"
                className="relative"
                {...({ fetchpriority: "high" } as Record<string, string>)}
                width={1200}
                height={760}
              />
            </div>
          </Reveal>
        </div>

        {/* Scroll down arrow */}
        {!embedded && showScrollArrow && (
          <motion.button
            onClick={scrollToNextSlide}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/80 hover:text-cream transition-colors cursor-pointer z-20"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={reduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to next slide"
          >
            <span className="text-[10px] uppercase tracking-widest font-medium">{t.scrollDown || "Scroll"}</span>
            <ChevronDown className="h-7 w-7" />
          </motion.button>
        )}
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
      {/* ──────── SLIDE 2b — 5 PAINS / 5 REMEDIES ──────── */}
      <SlideShell bg="cream">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.sPainsEyebrow}</Eyebrow>
            <SlideTitle className="text-wine-dark">{t.sPainsTitle}</SlideTitle>
            <p className="text-wine-dark/75 text-lg">{t.sPainsSubtitle}</p>
          </Reveal>
        </div>
        <div className="grid gap-3 max-w-5xl mx-auto">
          {t.sPainsItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="grid md:grid-cols-[auto,1fr,auto,1fr] items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-wine-dark/10">
                <div className="hidden md:flex h-9 w-9 rounded-full bg-wine-dark/5 text-wine-dark font-heading font-bold text-sm items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-wine-dark/50 mb-1">{t.sPainsPainLabel}</p>
                  <p className="font-heading text-base md:text-lg text-wine-dark leading-snug">{item.pain}</p>
                </div>
                <ArrowRight className="hidden md:block h-5 w-5 text-wine mx-auto" />
                <div className="md:border-l md:border-wine-dark/10 md:pl-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-wine mb-1">{t.sPainsAntidoteLabel}</p>
                  <p className="text-sm md:text-base text-wine-dark/80 leading-snug">{item.antidote}</p>
                </div>
              </div>
            </Reveal>
          ))}
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
              className="mx-auto max-w-md"
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
            <img src={tastingNotes} alt="Tasting notes UI" loading="lazy" className="mx-auto w-full max-w-md mb-6" />
            <h3 className="font-heading text-2xl font-bold mb-2">{t.s8TastingTitle}</h3>
            <p className="text-foreground/75 leading-relaxed">{t.s8TastingBody}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <img src={pairing} alt="Automatic pairing UI" loading="lazy" className="mx-auto max-w-md mb-6" />
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
            <img src={bigData} alt="Big data dashboard" loading="lazy" className="rounded-xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <GitCompare className="h-7 w-7 text-gold" />
              <h3 className="font-heading text-2xl md:text-3xl font-bold">{t.s9CompTitle}</h3>
            </div>
            <p className="text-cream/80 mb-6 leading-relaxed">{t.s9CompBody}</p>
            <img src={comparator} alt="Wine comparator" loading="lazy" />
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
            <img src={stockManagement} alt="Stock management UI" loading="lazy" className="w-full max-w-2xl lg:max-w-none lg:scale-110 lg:origin-left" />
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

      {includesUpdates && (
        <>
          {/* NUEVO — ARQUITECTURA CONECTADA */}
          <SlideShell bg="wine">
            <div className="text-center mb-10 max-w-4xl mx-auto">
              <Reveal>
                <Eyebrow>{currentT.flow.eyebrow}</Eyebrow>
                <SlideTitle>{currentT.flow.title}</SlideTitle>
                <p className="text-cream/80 text-lg">{currentT.flow.subtitle}</p>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              {currentT.flow.steps.map((step, i) => {
                const icons = [Cloud, Cable, BarChart3, MessageSquareText];
                const Icon = icons[i] || Layers3;
                return (
                  <Reveal key={step.label} delay={i * 0.06}>
                    <article className="h-full rounded-2xl border border-cream/15 bg-cream/5 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <Icon className="h-6 w-6 text-gold" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-cream/55">{step.label}</span>
                      </div>
                      <h3 className="mt-5 font-heading text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream/75">{step.body}</p>
                      <p className="mt-4 border-t border-cream/10 pt-3 text-[11px] leading-relaxed text-gold/80">{step.capabilities}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <p className="mx-auto mt-7 max-w-4xl text-center text-sm text-cream/65">{currentT.flow.footnote}</p>
          </SlideShell>

          {/* NUEVO — CLOUDRIM */}
          <SlideShell bg="cream">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <Reveal>
                <Eyebrow>{currentT.cloudrim.eyebrow}</Eyebrow>
                <SlideTitle className="text-wine-dark">{currentT.cloudrim.title}</SlideTitle>
                <p className="text-wine-dark/70 leading-relaxed">{currentT.cloudrim.body}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentT.cloudrim.items.map((item, i) => (
                    <div key={item.title} className="border-l-2 border-wine pl-4">
                      <h3 className="font-heading text-lg font-bold text-wine-dark">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-wine-dark/65">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-2">
                  {depthT.cloudrimFlow.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-md border border-wine/20 bg-white px-3 py-2 text-[11px] font-semibold text-wine-dark shadow-sm">
                        {step}
                      </span>
                      {i < depthT.cloudrimFlow.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-wine/45" />}
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <figure>
                  <div className="aspect-[16/10] overflow-hidden rounded-xl border border-wine-dark/10 bg-[#171817] shadow-sm">
                    <img src={cloudrimInbox} alt="CloudRIM inbox" loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <figcaption className="mt-3 text-center text-xs text-wine-dark/55">{currentT.cloudrim.caption}</figcaption>
                </figure>
              </Reveal>
            </div>
          </SlideShell>

          {/* NUEVO — WINE CELLAR + WINE LOCKERS */}
          <SlideShell bg="dark">
            <div className="text-center mb-8 max-w-4xl mx-auto">
              <Reveal>
                <Eyebrow>{currentT.cellar.eyebrow}</Eyebrow>
                <SlideTitle>{currentT.cellar.title}</SlideTitle>
                <p className="text-cream/70 text-lg">{currentT.cellar.subtitle}</p>
              </Reveal>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Reveal>
                <figure>
                  <div className="aspect-[16/8] overflow-hidden rounded-xl border border-cream/15 bg-white/5">
                    <img src={cellarMap} alt="Wine Cellar map" loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <figcaption className="mt-2 text-xs text-cream/55">{currentT.cellar.mapCaption}</figcaption>
                </figure>
              </Reveal>
              <Reveal delay={0.08}>
                <figure>
                  <div className="aspect-[16/8] overflow-hidden rounded-xl border border-cream/15 bg-white/5">
                    <img src={wineLockers} alt="Wine Lockers" loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <figcaption className="mt-2 text-xs text-cream/55">{currentT.cellar.lockersCaption}</figcaption>
                </figure>
              </Reveal>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {currentT.cellar.items.map((item, i) => {
                const icons = [MapPinned, Users, Boxes];
                const Icon = icons[i] || MapPinned;
                return (
                  <article key={item.title} className="rounded-xl border border-cream/15 bg-white/[0.03] p-5">
                    <Icon className="h-5 w-5 text-gold" />
                    <h3 className="mt-3 font-heading text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/65">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </SlideShell>

          {/* NUEVO — MARGENES */}
          <SlideShell>
            <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <Reveal>
                <Eyebrow>{depthT.margins.eyebrow}</Eyebrow>
                <SlideTitle>{depthT.margins.title}</SlideTitle>
                <p className="text-foreground/70 text-lg leading-relaxed">{depthT.margins.subtitle}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {depthT.margins.items.map((item) => (
                    <div key={item.title} className="border-l-2 border-wine pl-3">
                      <h3 className="font-heading text-base font-bold">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/60">{item.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-l-2 border-wine pl-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-wine">{depthT.margins.outcomeLabel}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{depthT.margins.outcome}</p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <figure>
                  <div className="aspect-[16/11] overflow-hidden rounded-xl border border-border/60 bg-[#242525] shadow-xl shadow-black/10">
                    <img src={marginsOverview} alt="Winerim margins dashboard" loading="lazy" className="h-full w-full object-contain object-top" />
                  </div>
                  <figcaption className="mt-3 text-center text-xs text-foreground/45">{depthT.margins.subtitle}</figcaption>
                </figure>
              </Reveal>
            </div>
          </SlideShell>

          <SlideShell bg="dark">
            <div className="mb-7 max-w-4xl">
              <Reveal>
                <Eyebrow>{depthT.margins.eyebrow}</Eyebrow>
                <SlideTitle>{depthT.margins.outcomeLabel}</SlideTitle>
                <p className="mt-3 text-cream/70">{depthT.margins.outcome}</p>
              </Reveal>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                { image: marginsPortfolio, label: depthT.margins.items[0].title },
                { image: marginsSleepingCapital, label: depthT.margins.items[2].title },
                { image: marginsForecast, label: depthT.margins.items[3].title },
              ].map((visual, index) => (
                <Reveal key={visual.label} delay={index * 0.05}>
                  <figure>
                    <div className="aspect-[4/3] overflow-hidden rounded-xl border border-cream/15 bg-white/[0.03]">
                      <img src={visual.image} alt={visual.label} loading="lazy" className="h-full w-full object-contain object-top" />
                    </div>
                    <figcaption className="mt-2 text-center text-xs text-cream/55">{visual.label}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </SlideShell>

          {/* NUEVO — RIMS */}
          <SlideShell bg="wine">
            <div className="text-center mb-9 max-w-4xl mx-auto">
              <Reveal>
                <Eyebrow>{depthT.rims.eyebrow}</Eyebrow>
                <SlideTitle>{depthT.rims.title}</SlideTitle>
                <p className="text-cream/75 text-lg leading-relaxed">{depthT.rims.subtitle}</p>
              </Reveal>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {depthT.rims.items.map((item, i) => {
                const icons = [TrendingUp, Boxes, Target, Globe, Repeat, Sparkles];
                const Icon = icons[i] || Sparkles;
                return (
                  <Reveal key={item.title} delay={i * 0.04}>
                    <article className="h-full rounded-xl border border-cream/15 bg-cream/5 p-5">
                      <Icon className="h-5 w-5 text-gold" />
                      <h3 className="mt-3 font-heading text-lg font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-cream/65">{item.body}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-gold/25 bg-gold/10 px-5 py-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">{depthT.rims.outcomeLabel}</p>
              <p className="mt-2 text-sm text-cream/80">{depthT.rims.outcome}</p>
            </div>
          </SlideShell>

          {/* NUEVO — SAVIA */}
          <SlideShell bg="dark">
            <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <Reveal>
                <Eyebrow>{depthT.savia.eyebrow}</Eyebrow>
                <SlideTitle>{depthT.savia.title}</SlideTitle>
                <p className="text-cream/70 text-lg leading-relaxed">{depthT.savia.subtitle}</p>
                <div className="mt-6 space-y-2">
                  {depthT.savia.questions.map((question) => (
                    <p key={question} className="rounded-lg border border-cream/10 bg-white/[0.03] px-4 py-3 text-sm text-cream/80">
                      “{question}”
                    </p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="grid gap-3 sm:grid-cols-[0.34fr_1.66fr]">
                  <img src={saviaPrompt} alt="SAVia prompt" loading="lazy" className="h-full min-h-56 w-full rounded-xl border border-cream/15 bg-[#1b1c1f] object-contain object-top" />
                  <img src={saviaAnswer} alt="SAVia answer" loading="lazy" className="h-full min-h-56 w-full rounded-xl border border-cream/15 bg-[#1b1c1f] object-contain object-top" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {depthT.savia.steps.map((step) => (
                    <div key={step.title} className="border-l-2 border-gold pl-3">
                      <h3 className="font-heading text-base font-bold">{step.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-cream/60">{step.body}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 text-sm leading-relaxed text-cream/75">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  {depthT.savia.approval}
                </p>
                <p className="mt-3 text-center text-xs text-cream/45">{depthT.savia.caption}</p>
              </Reveal>
            </div>
          </SlideShell>
        </>
      )}

      {/* ──────── SLIDE 11c — WINERIM SUPPLY ──────── */}
      <SlideShell bg="cream">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow>{supplyContent.eyebrow}</Eyebrow>
              <SlideTitle className="text-wine-dark">{supplyContent.title}</SlideTitle>
              <p className="text-wine-dark/75 leading-relaxed mb-6">{supplyContent.subtitle}</p>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wine/10 text-wine text-xs font-semibold">
                <ShoppingCart className="h-3.5 w-3.5" /> {supplyContent.outcomeLabel || supplyContent.eyebrow}
              </span>
              <p className="mt-3 text-sm font-medium text-wine-dark/65">{supplyContent.outcome}</p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.08}>
              <figure className="overflow-hidden rounded-xl border border-wine-dark/10 bg-[#242525] shadow-xl shadow-black/10">
                <img src={supplyComparison} alt="Winerim Supply distributor comparison" loading="lazy" className="aspect-[16/10] w-full object-contain object-top" />
              </figure>
            </Reveal>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {supplyContent.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.04}>
                  <div className="h-full border-l-2 border-wine pl-3">
                    <h3 className="font-heading text-sm font-bold text-wine-dark">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-wine-dark/65">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
            const icons = [Smartphone, Tablet, QrCode, Globe];
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

      {/* ──────── ARCHIVED LEGACY PRICING ──────── */}
      {!embedded && !includesUpdates && <SlideShell bg="cream">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>{t.sPricingEyebrow}</Eyebrow>
            <SlideTitle className="text-wine-dark">{t.sPricingTitle}</SlideTitle>
            <p className="text-wine-dark/75 text-lg">{t.sPricingSubtitle}</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.sPricingPlans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className={`relative h-full rounded-2xl p-6 flex flex-col border ${
                  plan.highlight
                    ? "bg-wine text-cream border-wine shadow-xl"
                    : "bg-white text-wine-dark border-wine-dark/10 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                      plan.highlight
                        ? "bg-gold text-wine-dark"
                        : "bg-wine-dark text-cream"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <h3 className="font-heading text-2xl font-bold mb-1 mt-2">{plan.name}</h3>
                <p className={`text-sm font-semibold mb-3 ${plan.highlight ? "text-cream" : "text-wine-dark"}`}>
                  {plan.tagline}
                </p>
                {plan.solves && (
                  <p className={`text-xs italic mb-2 leading-snug ${plan.highlight ? "text-cream/70" : "text-wine-dark/60"}`}>
                    {plan.solves}
                  </p>
                )}
                {plan.fits && (
                  <p className={`text-xs mb-4 leading-snug ${plan.highlight ? "text-cream/80" : "text-wine-dark/70"}`}>
                    {plan.fits}
                  </p>
                )}
                <div className={`mb-4 pb-4 border-b ${plan.highlight ? "border-cream/20" : "border-wine-dark/10"}`} />
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-snug">
                      <CheckCircle2
                        className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlight ? "text-gold" : "text-wine"}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="sm"
                  className={
                    plan.highlight
                      ? "bg-cream text-wine hover:bg-cream/90"
                      : "bg-wine text-cream hover:bg-wine-light"
                  }
                >
                  <Link to={contactPath}>
                    {plan.cta} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-sm text-wine-dark/60 max-w-2xl mx-auto">
            {t.sPricingFootnote}
          </p>
        </Reveal>
      </SlideShell>}

      {/* ──────── SLIDE 14 — CTA ──────── */}
      {!embedded && <SlideShell bg="wine">
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
      </SlideShell>}
    </div>
  );
}
