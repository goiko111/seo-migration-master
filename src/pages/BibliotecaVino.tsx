import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wine, MapPin, Palette, Utensils, ArrowRight, Grape, Search, BookOpen, GlassWater } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { familyOrder } from "@/data/stylesLibrary";
import { categoryOrder } from "@/data/pairingsLibrary";
import { getLocalizedGrapeCatalog, type LocalizedGrapeCatalogEntry } from "@/data/grapesLibraryI18n";
import { getLocalizedCountries } from "@/data/regionsLibraryI18n";
import { getAllLocalizedStyles, getLocalizedFamilyMeta } from "@/data/stylesLibraryI18n";
import { getLocalizedCategoryMeta, getLocalizedPairingEntries } from "@/data/pairingsLibraryI18n";
import {
  getWineLibraryPath,
  getWineLibraryHreflang,
  getWineLibraryUi,
  getWineLibraryUrl,
  normalizeWineSearch,
  type WineLibraryUiCopy,
} from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";
import type { WineCountry } from "@/data/regionsLibrary";
import type { StyleCatalogEntry, StyleEntry } from "@/data/stylesLibrary";
import type { PairingEntry } from "@/data/pairingsLibrary";

// ── Search index ──
type SearchResult = { name: string; category: string; badge: string; path: string; emoji?: string };

const buildSearchIndex = (
  grapes: LocalizedGrapeCatalogEntry[],
  countries: WineCountry[],
  styles: (StyleEntry | StyleCatalogEntry)[],
  pairings: PairingEntry[],
  lang: string,
  ui: WineLibraryUiCopy
): SearchResult[] => {
  const results: SearchResult[] = [];
  // Grapes
  grapes.forEach((g) => results.push({ name: g.name, category: "uva", badge: ui.badges.variety, path: getWineLibraryPath(lang, `/biblioteca-vino/uvas/${g.slug}`), emoji: "🍇" }));
  // Styles
  styles.forEach((s) => results.push({ name: s.name, category: "estilo", badge: ui.badges.style, path: getWineLibraryPath(lang, `/biblioteca-vino/estilos/${s.slug}`), emoji: getLocalizedFamilyMeta(s.family, lang).emoji }));
  // Pairings
  pairings.forEach((p) => results.push({ name: p.name, category: "maridaje", badge: ui.badges.pairing, path: getWineLibraryPath(lang, `/biblioteca-vino/maridajes/${p.slug}`), emoji: getLocalizedCategoryMeta(p.category, lang).emoji }));
  // Countries
  countries.forEach((c) => results.push({ name: c.name, category: "region", badge: ui.badges.country, path: getWineLibraryPath(lang, `/biblioteca-vino/regiones/${c.slug}`), emoji: c.flag }));
  return results;
};

// ── Animated Counter ──
const Counter = ({ end, label, duration = 1.5 }: { end: number; label: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-3xl md:text-4xl font-bold text-wine">{count.toLocaleString()}+</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

// Top grapes for preview
const topGrapes = ["tempranillo", "garnacha", "cabernet-sauvignon", "pinot-noir", "chardonnay", "sauvignon-blanc"];
const topCountries = ["espana", "francia", "italia", "portugal", "estados-unidos", "alemania"];

const BibliotecaVino = () => {
  const { lang, localePath } = useLanguage();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const ui = useMemo(() => getWineLibraryUi(lang), [lang]);
  const grapes = useMemo(() => getLocalizedGrapeCatalog(lang), [lang]);
  const countries = useMemo(() => getLocalizedCountries(lang), [lang]);
  const styles = useMemo(() => getAllLocalizedStyles(lang), [lang]);
  const pairings = useMemo(() => getLocalizedPairingEntries(lang), [lang]);
  const linkTo = (path: string) => getWineLibraryPath(lang, path);
  const searchIndex = useMemo(() => buildSearchIndex(grapes, countries, styles, pairings, lang, ui), [grapes, countries, styles, pairings, lang, ui]);

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return; }
    const q = normalizeWineSearch(search);
    setSearchResults(searchIndex.filter((r) => normalizeWineSearch(r.name).includes(q)).slice(0, 8));
  }, [search, searchIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${ui.libraryName} | Winerim`}
        description={ui.homeIntro}
        url={getWineLibraryUrl(lang, "/biblioteca-vino")}
        hreflang={getWineLibraryHreflang("/biblioteca-vino")}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <Wine size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{ui.knowledgeBadge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-3xl">
            {ui.homeTitlePrefix} <span className="text-gradient-wine italic">{ui.wineWord}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
            {ui.homeIntro}
          </motion.p>

          {/* GLOBAL SEARCH */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="relative max-w-xl">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={ui.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base bg-secondary/30 border-border rounded-xl"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute z-50 top-full mt-2 w-full bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                {searchResults.map((r) => (
                  <Link key={r.path} to={r.path} onClick={() => setSearch("")}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-wine/5 transition-colors border-b border-border/50 last:border-0">
                    <span className="text-lg">{r.emoji}</span>
                    <span className="text-sm font-medium flex-1">{r.name}</span>
                    <Badge variant="secondary" className="text-xs">{r.badge}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 border-y border-border bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <Counter end={85} label={ui.stats.grapeVarieties} />
            <Counter end={3714} label={ui.stats.denominations} />
            <Counter end={41} label={ui.stats.countries} />
            <Counter end={8} label={ui.stats.wineStyles} />
            <Counter end={10} label={ui.stats.pairingGuides} />
            <Counter end={80} label={ui.stats.dishWineCombinations} />
          </div>
        </div>
      </section>

      {/* ESTILOS PREVIEW */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Palette size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.sections.styles}</h2>
              </div>
              <Link to={linkTo("/biblioteca-vino/estilos")} className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                {ui.actions.viewAllStyles} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {familyOrder.map((family, i) => {
              const meta = getLocalizedFamilyMeta(family, lang);
              const familyStyles = styles.filter(s => s.family === family);
              const firstSlug = familyStyles[0]?.slug;
              return (
                <ScrollReveal key={family} delay={i * 0.04}>
                  <Link
                    to={firstSlug ? linkTo(`/biblioteca-vino/estilos/${firstSlug}`) : linkTo("/biblioteca-vino/estilos")}
                    className="group block bg-gradient-card rounded-xl border border-border p-4 text-center hover:border-wine/30 transition-all h-full"
                  >
                    <span className="text-2xl block mb-2">{meta.emoji}</span>
                    <span className="text-xs font-semibold group-hover:text-wine transition-colors">{meta.label}</span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MARIDAJES PREVIEW */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Utensils size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.sections.pairings}</h2>
              </div>
              <Link to={linkTo("/biblioteca-vino/maridajes")} className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                {ui.actions.viewAllPairings} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {categoryOrder.map((cat, i) => {
              const meta = getLocalizedCategoryMeta(cat, lang);
              const entry = pairings.find(e => e.category === cat);
              return (
                <ScrollReveal key={cat} delay={i * 0.04}>
                  <Link
                    to={entry ? linkTo(`/biblioteca-vino/maridajes/${entry.slug}`) : linkTo("/biblioteca-vino/maridajes")}
                    className="group block bg-gradient-card rounded-xl border border-border p-4 text-center hover:border-wine/30 transition-all h-full"
                  >
                    <span className="text-2xl block mb-2">{meta.emoji}</span>
                    <span className="text-xs font-semibold group-hover:text-wine transition-colors leading-tight block">{meta.label}</span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VARIEDADES PREVIEW */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Grape size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.sections.grapes}</h2>
              </div>
              <Link to={linkTo("/biblioteca-vino/uvas")} className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                {ui.actions.exploreGrapes} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topGrapes.map((slug, i) => {
              const grape = grapes.find((g) => g.slug === slug);
              if (!grape) return null;
              return (
                <ScrollReveal key={slug} delay={i * 0.05}>
                  <Link to={linkTo(`/biblioteca-vino/uvas/${slug}`)}
                    className="group block bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all h-full">
                    <p className="font-heading text-sm font-semibold group-hover:text-wine transition-colors mb-1">{grape.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{grape.tastingNotes}</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGIONES PREVIEW */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-wine" />
                <h2 className="font-heading text-2xl md:text-3xl font-bold">{ui.sections.regions}</h2>
              </div>
              <Link to={linkTo("/biblioteca-vino/regiones")} className="text-wine text-sm font-medium hover:underline flex items-center gap-1">
                {ui.actions.exploreCountries} <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCountries.map((slug, i) => {
              const country = countries.find((c) => c.slug === slug);
              if (!country) return null;
              return (
                <ScrollReveal key={slug} delay={i * 0.05}>
                  <Link to={linkTo(`/biblioteca-vino/regiones/${slug}`)}
                    className="group block bg-gradient-card rounded-xl border border-border p-5 hover:border-wine/30 transition-all h-full text-center">
                    <span className="text-3xl block mb-2">{country.flag}</span>
                    <p className="font-heading text-sm font-semibold group-hover:text-wine transition-colors">{country.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{country.denominationsCount.toLocaleString()} denominaciones</p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">{ui.sections.tools}</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal>
              <Link to={linkTo("/biblioteca-vino/guia-servicio")}
                className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all h-full">
                <GlassWater size={24} className="text-wine mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">{ui.tools.serviceGuide}</h3>
                <p className="text-sm text-muted-foreground">{ui.tools.serviceGuideDesc}</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <Link to={linkTo("/biblioteca-vino/glosario")}
                className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all h-full">
                <BookOpen size={24} className="text-wine mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">{ui.tools.glossary}</h3>
                <p className="text-sm text-muted-foreground">{ui.tools.glossaryDesc}</p>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <Link to={localePath("/herramientas/calculadora-precio-vino-por-copa")}
                className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all h-full">
                <Wine size={24} className="text-wine mb-4" />
                <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-wine transition-colors">{ui.tools.byGlassCalculator}</h3>
                <p className="text-sm text-muted-foreground">{ui.tools.byGlassCalculatorDesc}</p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                {ui.cta.libraryTitle}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                {ui.cta.libraryBody}
              </p>
              <Link to={localePath("/demo")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20">
                {ui.actions.requestDemo} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BibliotecaVino;
