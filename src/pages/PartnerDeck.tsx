import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cable,
  Check,
  ChevronDown,
  Download,
  Globe2,
  Handshake,
  MapPinned,
  Maximize2,
  Megaphone,
  Minimize2,
  Network,
  Share2,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import {
  ALL_MARKET_SIZES,
  MARKET_TOTALS,
  PARTNER_MARKETS,
  PHASES,
  SPAIN_BASE,
  type PartnerMarket,
} from "@/data/partnerDeckData";
import { CANONICAL_DOMAIN } from "@/seo/config";
import PresentationLegacy from "@/pages/PresentationLegacy";
import { PRESENTATION_CONTENT as LEGACY_PRESENTATION_CONTENT } from "@/data/presentationLegacyContent";
import { PRESENTATION_CONTENT as CURRENT_PRESENTATION_CONTENT } from "@/data/presentationContent";
import { getCommercialSlideLabels } from "@/data/presentationStory";

import winerimLogo from "@/assets/winerim-logo.webp";
import heroApp from "@/assets/presentation/hero-app.webp";

const DECK_VERSION = "partner-international-2026-07-r6";

const formatCount = (value: number) => new Intl.NumberFormat("es-ES").format(value);

const Slide = ({
  children,
  tone = "default",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "default" | "dark" | "wine" | "light";
  className?: string;
}) => {
  const toneClass = {
    default: "bg-background text-foreground",
    dark: "bg-[#141515] text-cream",
    wine: "bg-wine text-cream",
    light: "bg-[#f5f1eb] text-wine-dark",
  }[tone];

  return (
    <section className={`presentation-slide relative flex min-h-screen w-full items-start overflow-visible px-5 py-24 md:px-12 lg:items-center lg:overflow-hidden lg:px-16 lg:py-20 ${toneClass} ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-xs font-semibold uppercase text-wine-light">{children}</p>
);

const Title = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-heading text-4xl font-bold leading-[1.06] md:text-5xl lg:text-6xl ${className}`}>
    {children}
  </h2>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
};

const SmallList = ({ items, dark = false }: { items: readonly string[]; dark?: boolean }) => (
  <ul className={`mt-3 space-y-1.5 text-sm leading-relaxed ${dark ? "text-cream/70" : "text-muted-foreground"}`}>
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-wine-light" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const MarketSlide = ({ market, index }: { market: PartnerMarket; index: number }) => {
  const dark = index % 2 === 1;
  const cards = [
    { icon: Handshake, title: "Partners objetivo", items: market.targetPartners },
    { icon: Cable, title: "Integraciones objetivo", items: market.targetIntegrations },
    { icon: Building2, title: "Cuentas ancla objetivo", items: market.targetAnchors },
    { icon: Megaphone, title: "Ejecucion local", items: market.execution },
  ];

  return (
    <Slide tone={dark ? "dark" : "light"}>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <Reveal>
          <Eyebrow>Playbook de mercado · Fase {market.phase}</Eyebrow>
          <Title className={dark ? "text-cream" : "text-wine-dark"}>{market.name}</Title>
          <p className={`mt-3 text-base ${dark ? "text-cream/65" : "text-wine-dark/65"}`}>Ventana de apertura: {market.duration}</p>
        </Reveal>
        <div className={`rounded-lg border px-5 py-3 text-right ${dark ? "border-cream/15 bg-white/[0.03]" : "border-wine/15 bg-white/60"}`}>
          <p className="text-xs font-semibold uppercase text-wine-light">Mercado servible</p>
          <p className="mt-1 font-heading text-3xl font-bold">{formatCount(market.size.sam)}</p>
          <p className={`text-xs ${dark ? "text-cream/55" : "text-wine-dark/55"}`}>SOM objetivo: {formatCount(market.size.som)}</p>
        </div>
      </div>

      <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, cardIndex) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={cardIndex * 0.04}>
              <article className={`h-full rounded-lg border p-4 ${dark ? "border-cream/15 bg-white/[0.03]" : "border-wine/10 bg-white/65"}`}>
                <Icon size={20} className="text-wine-light" />
                <h3 className="mt-3 font-heading text-lg font-bold">{card.title}</h3>
                <SmallList items={card.items} dark={dark} />
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[0.8fr_1.2fr_1fr]">
        <div className={`grid grid-cols-2 gap-2 rounded-lg border p-4 ${dark ? "border-cream/15 bg-white/[0.03]" : "border-wine/10 bg-white/65"}`}>
          <div>
            <p className="text-[11px] font-semibold uppercase text-wine-light">TAM</p>
            <p className="mt-1 font-heading text-xl font-bold">{formatCount(market.size.tam)}</p>
            <p className={`mt-1 text-[11px] ${dark ? "text-cream/55" : "text-wine-dark/55"}`}>restaurantes</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase text-wine-light">Filtrado</p>
            <p className="mt-1 font-heading text-xl font-bold">{formatCount(market.size.filtered)}</p>
            <p className={`mt-1 text-[11px] ${dark ? "text-cream/55" : "text-wine-dark/55"}`}>con encaje inicial</p>
          </div>
        </div>

        <div className={`rounded-lg border p-4 ${dark ? "border-cream/15 bg-white/[0.03]" : "border-wine/10 bg-white/65"}`}>
          <p className="text-[11px] font-semibold uppercase text-wine-light">Mix de canal objetivo</p>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {market.channelMix.map((channel) => (
              <div key={channel.label}>
                <div className={`flex justify-between text-[11px] ${dark ? "text-cream/65" : "text-wine-dark/65"}`}>
                  <span>{channel.label}</span><span>{channel.value}%</span>
                </div>
                <div className={`mt-1 h-1.5 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-wine/10"}`}>
                  <div className="h-full rounded-full bg-wine-light" style={{ width: `${channel.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-lg border p-4 ${dark ? "border-cream/15 bg-white/[0.03]" : "border-wine/10 bg-white/65"}`}>
          <p className="text-[11px] font-semibold uppercase text-wine-light">Riesgos a gestionar</p>
          <SmallList items={market.risks} dark={dark} />
        </div>
      </div>
    </Slide>
  );
};

export default function PartnerDeck() {
  const [params] = useSearchParams();
  const partner = params.get("partner");
  const rootRef = useRef<HTMLDivElement>(null);
  const [shared, setShared] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showScrollCue, setShowScrollCue] = useState(true);

  const labels = useMemo(
    () => [
      ...getCommercialSlideLabels(
        LEGACY_PRESENTATION_CONTENT.es,
        CURRENT_PRESENTATION_CONTENT.es,
        { includesUpdates: true, embedded: true },
      ),
      "Programa de partnership",
      "Encaje del partner",
      "Oportunidad global",
      "Mercados cuantificados",
      "Fases y escala",
      "Go-to-market comun",
      ...PARTNER_MARKETS.map((market) => market.name),
      "Espana como base",
      "Prioridad por mercado",
      "Siguiente paso",
    ],
    [],
  );

  const goToSlide = useCallback((index: number) => {
    const slides = rootRef.current?.querySelectorAll<HTMLElement>(".presentation-slide");
    slides?.[Math.max(0, Math.min((slides.length || 1) - 1, index))]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>(".presentation-slide"));
    setSlideCount(slides.length);

    const onScroll = () => {
      const usesInternalScroll = window.matchMedia("(min-width: 1024px)").matches;
      const scrollTop = usesInternalScroll ? root.scrollTop : window.scrollY;
      const max = usesInternalScroll
        ? root.scrollHeight - root.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const anchor = 72;
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
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
      setShowScrollCue(scrollTop < 80);
    };

    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goToSlide(currentSlide + 1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goToSlide(currentSlide - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const onFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => document.removeEventListener("fullscreenchange", onFullscreen);
  }, []);

  useEffect(() => {
    (window as Window & { dataLayer?: unknown[] }).dataLayer ||= [];
    (window as Window & { dataLayer?: unknown[] }).dataLayer?.push({
      event: "partner_deck_view",
      partner: partner || undefined,
      version: DECK_VERSION,
    });
  }, [partner]);

  const handleShare = useCallback(async () => {
    const shareUrl = new URL(`${CANONICAL_DOMAIN}/deck`);
    shareUrl.searchParams.set("utm_source", "partner_deck");
    shareUrl.searchParams.set("utm_medium", "share");
    if (partner) shareUrl.searchParams.set("partner", partner);
    try {
      await navigator.clipboard.writeText(shareUrl.toString());
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      window.prompt("Enlace del deck", shareUrl.toString());
    }
  }, [partner]);

  const handleDownload = useCallback(async () => {
    (window as Window & { dataLayer?: unknown[] }).dataLayer?.push({ event: "partner_deck_download", partner: partner || undefined });
    const { generateDeckPdf } = await import("@/lib/generateDeckPdf");
    await generateDeckPdf("Winerim-Partner-Deck-Internacional");
  }, [partner]);

  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen();
  }, []);

  return (
    <div
      ref={rootRef}
      className="presentation-root min-h-screen bg-background"
      data-deck-version={DECK_VERSION}
    >
      <SEOHead
        title="Winerim Partner Deck Internacional"
        description="Programa de partnership internacional de Winerim: volumen de restaurantes, mercados, playbooks y plan de entrada."
        url={`${CANONICAL_DOMAIN}/deck`}
        image={`${CANONICAL_DOMAIN}/og-presentation.jpg`}
        noindex
      />
      <style>{`
        html body #wc-toggle,
        html body #winerim-web-chat,
        html body .winerim-web-chat,
        html body [data-winerim-chat] { display: none !important; }
        @media (min-width: 1024px) {
          .presentation-root { height: 100vh; overflow-y: auto; scroll-behavior: smooth; scroll-snap-type: y mandatory; }
          .presentation-slide { scroll-snap-align: start; }
        }
        @media print {
          @page { size: A4 landscape; margin: 0; }
          .presentation-chrome { display: none !important; }
          .presentation-root { height: auto !important; overflow: visible !important; scroll-snap-type: none !important; }
          .presentation-slide { min-height: 0 !important; height: 100vh !important; break-after: page; page-break-after: always; overflow: hidden !important; }
          .presentation-slide:last-child { break-after: auto; page-break-after: auto; }
        }
      `}</style>

      <header className="presentation-chrome fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#141515]/90 px-4 backdrop-blur md:px-8">
        <Link to="/" aria-label="Winerim"><img src={winerimLogo} alt="Winerim" className="h-8 w-auto" /></Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden text-xs font-semibold uppercase text-cream/55 md:inline">Partner deck · Confidencial</span>
          <Button size="icon" variant="ghost" onClick={handleShare} className="text-cream hover:text-cream" title="Compartir">
            {shared ? <Check size={17} /> : <Share2 size={17} />}
          </Button>
          <Button size="icon" variant="ghost" onClick={handleDownload} className="hidden text-cream hover:text-cream sm:inline-flex" title="Descargar PDF">
            <Download size={17} />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleFullscreen} className="hidden text-cream hover:text-cream lg:inline-flex" title="Pantalla completa">
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </Button>
          <Button asChild size="sm" className="bg-wine text-cream hover:bg-wine-light">
            <Link to="/contacto?origen=partner-deck">Hablemos</Link>
          </Button>
        </div>
      </header>

      <div className="presentation-chrome fixed inset-x-0 top-0 z-[60] h-0.5">
        <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
      </div>

      <nav className="presentation-chrome fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex" aria-label="Navegacion del deck">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button key={labels[index] || index} onClick={() => goToSlide(index)} className="group relative flex justify-end" aria-label={`${index + 1}. ${labels[index] || ""}`}>
            <span className="pointer-events-none absolute right-5 whitespace-nowrap rounded bg-[#141515] px-2 py-1 text-[10px] font-semibold uppercase text-cream opacity-0 group-hover:opacity-100">{labels[index]}</span>
            <span className={`block rounded-full ${index === currentSlide ? "h-2.5 w-2.5 bg-gold" : "h-1.5 w-1.5 bg-cream/50"}`} />
          </button>
        ))}
      </nav>

      {slideCount > 0 && (
        <div className="presentation-chrome fixed bottom-4 right-4 z-40 rounded bg-[#141515]/85 px-3 py-1.5 text-xs text-cream">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
        </div>
      )}

      <PresentationLegacy embedded variant="current" partnerName={partner} />

      <Slide tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal>
            <Eyebrow>Programa internacional de partnership</Eyebrow>
            <h1 className="font-heading text-5xl font-bold leading-[1.02] md:text-6xl lg:text-7xl">Crecer juntos en el mercado del vino</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80 md:text-xl">
              Winerim aporta producto, inteligencia y activos comerciales. El partner aporta acceso local, contexto y capacidad de ejecucion.
            </p>
            {partner && <p className="mt-8 inline-flex rounded border border-gold/40 px-3 py-2 text-sm text-gold">Preparado para {partner}</p>}
          </Reveal>
          <Reveal delay={0.1}>
            <img src={heroApp} alt="Plataforma Winerim" className="mx-auto w-full max-w-3xl object-contain" {...({ fetchpriority: "high" } as Record<string, string>)} />
          </Reveal>
        </div>
        {showScrollCue && (
          <button onClick={() => goToSlide(1)} className="presentation-chrome absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center text-xs text-cream/70 lg:flex">
            Desplazar<ChevronDown size={24} />
          </button>
        )}
      </Slide>

      <Slide tone="wine">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow>Encaje del partner</Eyebrow>
            <Title>Una alianza local respaldada por una plataforma global</Title>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-cream/75">El modelo se adapta al mercado y se concreta en una propuesta de territorio, objetivos, soporte y responsabilidad compartida.</p>
          </Reveal>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {[
            { icon: Globe2, title: "Winerim aporta", items: ["Producto localizado", "Demo y materiales comerciales", "Onboarding y soporte", "Datos y playbooks"] },
            { icon: Handshake, title: "El partner aporta", items: ["Acceso al ecosistema local", "Generacion y avance de pipeline", "Conocimiento de mercado", "Acompanamiento al cliente"] },
            { icon: ShieldCheck, title: "Se acuerda por mercado", items: ["Territorio y alcance", "Gobernanza de la colaboracion", "Objetivos y reporting", "Exclusividad, si procede"] },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-cream/15 bg-cream/5 p-6 text-left">
                  <Icon size={25} className="text-gold" />
                  <h3 className="mt-5 font-heading text-2xl font-bold">{item.title}</h3>
                  <SmallList items={item.items} dark />
                </article>
              </Reveal>
            );
          })}
        </div>
      </Slide>

      <Slide tone="light">
        <Reveal>
          <Eyebrow>Oportunidad global</Eyebrow>
          <Title>Un mercado grande que exige una entrada local</Title>
          <p className="mt-5 max-w-4xl text-lg text-wine-dark/70">Trece mercados analizados. Las cifras agregadas se han recalculado desde la tabla de paises del documento de origen para mantener coherencia matematica.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "TAM listado", value: formatCount(MARKET_TOTALS.tam), note: "Restaurantes en 13 mercados" },
            { label: "TAM filtrado", value: formatCount(MARKET_TOTALS.filtered), note: "Segmento con encaje inicial" },
            { label: "SAM agregado", value: formatCount(MARKET_TOTALS.sam), note: "Mercado servible" },
            { label: "SOM calculado", value: formatCount(MARKET_TOTALS.som), note: "25% del SAM por mercado" },
          ].map((metric) => (
            <article key={metric.label} className="rounded-lg border border-wine/10 bg-white/65 p-5">
              <p className="text-xs font-semibold uppercase text-wine-light">{metric.label}</p>
              <p className="mt-3 font-heading text-4xl font-bold">{metric.value}</p>
              <p className="mt-2 text-sm text-wine-dark/60">{metric.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            { value: "60%", title: "TAM a mercado filtrado", body: "Regla base para identificar establecimientos con encaje." },
            { value: "40%", title: "Filtrado a SAM", body: "Parte servible con producto, canal y operacion disponibles." },
            { value: "25%", title: "SAM a SOM", body: "Cuota de referencia usada por el documento de origen." },
          ].map((step) => (
            <div key={step.title} className="border-l-2 border-wine pl-4">
              <p className="font-heading text-3xl font-bold text-wine">{step.value}</p>
              <h3 className="mt-1 font-heading text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-wine-dark/60">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-wine-dark/50">Excepcion del documento fuente: Estados Unidos usa un filtrado del 90%. Metricas de mercado sujetas a validacion antes de cerrar un territorio.</p>
      </Slide>

      <Slide tone="dark">
        <Reveal>
          <Eyebrow>Mercados cuantificados</Eyebrow>
          <Title>De la oportunidad total a una cuota operable</Title>
        </Reveal>
        <div className="mt-7 hidden overflow-hidden rounded-lg border border-cream/15 md:block">
          <div className="grid grid-cols-[1.25fr_repeat(4,1fr)] bg-white/[0.06] px-4 py-2 text-[11px] font-semibold uppercase text-cream/60">
            <span>Mercado</span><span className="text-right">TAM</span><span className="text-right">Filtrado</span><span className="text-right">SAM</span><span className="text-right">SOM</span>
          </div>
          {ALL_MARKET_SIZES.map((market) => (
            <div key={market.code} className="grid grid-cols-[1.25fr_repeat(4,1fr)] border-t border-cream/10 px-4 py-1.5 text-sm">
              <span><strong className="mr-2 text-wine-light">{market.code}</strong>{market.name}</span>
              <span className="text-right text-cream/70">{formatCount(market.tam)}</span>
              <span className="text-right text-cream/70">{formatCount(market.filtered)}</span>
              <span className="text-right text-cream/70">{formatCount(market.sam)}</span>
              <span className="text-right font-semibold">{formatCount(market.som)}</span>
            </div>
          ))}
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 md:hidden">
          {ALL_MARKET_SIZES.map((market) => (
            <article key={market.code} className="rounded-lg border border-cream/15 bg-white/[0.03] p-4">
              <h3 className="font-heading text-xl font-bold"><span className="mr-2 text-wine-light">{market.code}</span>{market.name}</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-cream/65"><span>TAM {formatCount(market.tam)}</span><span>SAM {formatCount(market.sam)}</span><span>Filtrado {formatCount(market.filtered)}</span><span>SOM {formatCount(market.som)}</span></div>
            </article>
          ))}
        </div>
      </Slide>

      <Slide>
        <Reveal>
          <Eyebrow>Expansion por fases</Eyebrow>
          <Title>Probar, replicar y escalar con canal local</Title>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {PHASES.map((phase) => (
            <article key={phase.number} className="rounded-lg border border-border bg-card p-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-wine font-heading text-lg font-bold text-cream">{phase.number}</span>
              <h3 className="mt-5 font-heading text-2xl font-bold">{phase.title}</h3>
              <p className="mt-2 font-medium text-wine">{phase.markets}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{phase.reason}</p>
            </article>
          ))}
        </div>
        <div className="mt-7 rounded-lg border border-wine/15 bg-wine/[0.04] p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Mercados analizados", value: "13", result: "Espana como base y doce mercados de expansion" },
              { label: "SOM agregado", value: formatCount(MARKET_TOTALS.som), result: "Restaurantes en la cuota operable calculada" },
              { label: "Meta operativa", value: "8.000+", result: "Restaurantes en cinco anos segun el documento fuente" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase text-wine-light">{item.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold">{item.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.result}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">El volumen orienta la prioridad; cada territorio debe validar su segmento, canal y capacidad de implantacion antes de abrirse.</p>
        </div>
      </Slide>

      <Slide tone="wine">
        <Reveal>
          <Eyebrow>Go-to-market comun</Eyebrow>
          <Title>Cinco palancas, una ejecucion medible</Title>
          <p className="mt-5 max-w-3xl text-lg text-cream/75">El partner no trabaja aislado: combina acceso comercial, integracion, prueba social, venta directa y contenido local.</p>
        </Reveal>
        <div className="mt-8 grid gap-3 md:grid-cols-5">
          {[
            { icon: Handshake, title: "Partners", body: "Distribuidores, asociaciones, sumilleres y escuelas." },
            { icon: Cable, title: "POS / ERP", body: "Integraciones que abren un canal tecnico directo." },
            { icon: Building2, title: "Cuentas ancla", body: "Grupos hoteleros y restauracion premium." },
            { icon: Users, title: "Venta B2B", body: "BDM y SDR con playbook y pipeline compartido." },
            { icon: Megaphone, title: "PR local", body: "Casos, demos y contenido adaptado al mercado." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-cream/15 bg-cream/5 p-4">
                <Icon size={22} className="text-gold" />
                <h3 className="mt-4 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{item.body}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["90 dias", "Primer piloto", "Territorio, partner y cuentas iniciales"],
            ["<=14 dias", "Onboarding", "Objetivo estandar para cada restaurante"],
            ["5 palancas", "Canal", "Partners, integraciones, anclas, venta y PR"],
            ["12 mercados", "Playbooks", "Ejecucion adaptada a cada territorio"],
          ].map(([value, label, note]) => (
            <div key={label} className="rounded-lg border border-cream/15 bg-[#141515]/25 p-4">
              <p className="font-heading text-2xl font-bold text-gold">{value}</p><p className="mt-1 font-semibold">{label}</p><p className="mt-1 text-xs text-cream/55">{note}</p>
            </div>
          ))}
        </div>
      </Slide>

      {PARTNER_MARKETS.map((market, index) => <MarketSlide key={market.code} market={market} index={index} />)}

      <Slide tone="wine">
        <Reveal>
          <Eyebrow>Winerim · Base actual</Eyebrow>
          <Title>El partner parte de producto, clientes y operacion reales</Title>
          <p className="mt-5 max-w-4xl text-lg text-cream/75">La expansion no empieza con una hipotesis ni con un producto por construir. Winerim ya combina operacion de bodega, inteligencia, contenido y experiencia comercial en distintos mercados.</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SPAIN_BASE.traction.map((item) => (
            <article key={item.label} className="rounded-lg border border-cream/15 bg-cream/5 p-4">
              <p className="font-heading text-3xl font-bold text-gold">{item.value}</p>
              <p className="mt-1 text-sm font-semibold">{item.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/55">{item.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {SPAIN_BASE.proof.map((block) => (
            <article key={block.title} className="rounded-lg border border-cream/15 bg-[#141515]/20 p-5">
              <h3 className="font-heading text-xl font-bold">{block.title}</h3>
              <SmallList items={block.items} dark />
            </article>
          ))}
        </div>
        <p className="mt-5 border-l-2 border-gold pl-4 text-sm text-cream/70">El partner adapta al mercado una plataforma y un playbook que ya existen; no empieza de cero.</p>
      </Slide>

      <Slide tone="light">
        <Reveal>
          <Eyebrow>Prioridad por mercado</Eyebrow>
          <Title>Doce mercados, una secuencia de entrada</Title>
          <p className="mt-4 max-w-4xl text-lg text-wine-dark/70">La prioridad combina volumen de restaurantes, proximidad operativa, madurez del canal y disponibilidad de partners e integraciones locales.</p>
        </Reveal>
        <div className="mt-6 hidden overflow-hidden rounded-lg border border-wine/15 bg-white/60 md:block">
          <div className="grid grid-cols-[1.3fr_0.55fr_repeat(3,0.8fr)_1fr] bg-wine px-3 py-2 text-[10px] font-semibold uppercase text-cream">
            <span>Mercado</span><span className="text-right">Fase</span><span className="text-right">TAM</span><span className="text-right">SAM</span><span className="text-right">SOM</span><span className="text-right">Apertura</span>
          </div>
          {PARTNER_MARKETS.map((market) => (
            <div key={market.code} className="grid grid-cols-[1.3fr_0.55fr_repeat(3,0.8fr)_1fr] border-t border-wine/10 px-3 py-1.5 text-[11px] text-wine-dark/70">
              <span className="font-semibold text-wine-dark"><strong className="mr-2 text-wine">{market.code}</strong>{market.name}</span>
              <span className="text-right">{market.phase}</span>
              <span className="text-right">{formatCount(market.size.tam)}</span>
              <span className="text-right">{formatCount(market.size.sam)}</span>
              <span className="text-right font-semibold text-wine-dark">{formatCount(market.size.som)}</span>
              <span className="text-right">{market.duration}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:hidden">
          {PARTNER_MARKETS.map((market) => (
            <article key={market.code} className="rounded-lg border border-wine/10 bg-white/65 p-4">
              <div className="flex items-center justify-between"><h3 className="font-heading text-xl font-bold"><span className="mr-2 text-wine">{market.code}</span>{market.name}</h3><strong>Fase {market.phase}</strong></div>
              <p className="mt-3 text-sm text-wine-dark/60">TAM {formatCount(market.size.tam)} · SAM {formatCount(market.size.sam)} · SOM {formatCount(market.size.som)}</p>
              <p className="mt-2 text-sm font-medium">Apertura prevista: {market.duration}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-wine-dark/50">Volumenes estimados del material fuente. Cada territorio se valida con datos locales y un partner concreto antes de activar el plan.</p>
      </Slide>

      <Slide tone="dark">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <Eyebrow>Siguiente paso</Eyebrow>
            <Title>Convertir un mercado en un plan conjunto de 90 dias</Title>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-cream/75">La oportunidad se valida con un territorio concreto, un partner concreto y un primer pipeline compartido. El modelo de colaboracion se define despues de confirmar alcance y capacidad real de ejecucion.</p>
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              { icon: MapPinned, title: "1. Elegir mercado", body: "Prioridad, territorio y segmento inicial." },
              { icon: Network, title: "2. Validar activos", body: "Red comercial, integraciones y cuentas objetivo." },
              { icon: TrendingUp, title: "3. Acordar piloto", body: "Objetivos, soporte, reporting y calendario." },
            ].map((step) => {
              const Icon = step.icon;
              return <article key={step.title} className="rounded-lg border border-cream/15 bg-white/[0.03] p-6 text-left"><Icon className="text-gold" size={24} /><h3 className="mt-5 font-heading text-2xl font-bold">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-cream/65">{step.body}</p></article>;
            })}
          </div>
          <Button asChild size="lg" className="mt-9 bg-wine text-cream hover:bg-wine-light">
            <Link to="/contacto?origen=partner-deck">Disenar el plan de partnership<ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <p className="mt-7 text-xs text-cream/45">Documento comercial confidencial. Mercados, objetivos, alcance y condiciones deben confirmarse en la propuesta de partnership.</p>
        </div>
      </Slide>
    </div>
  );
}
