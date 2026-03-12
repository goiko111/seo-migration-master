import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, AlertTriangle, Check, X, Wine,
  TrendingUp, Sparkles, type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import InternalLinks from "@/components/seo/InternalLinks";
import NextSteps, { type NextStep } from "@/components/seo/NextSteps";
import FAQSection from "@/components/seo/FAQSection";
import { useLanguage } from "@/i18n/LanguageContext";

/* ─── Data types ─── */
export interface TableRow { area: string; without: string; with_w: string }
export interface UseCase { title: string; scenario: string; result: string }
export interface Advantage { title: string; desc: string }
export interface Impact { label: string; desc: string }
export interface FAQ { q: string; a: string }
export interface InternalLink { to: string; label: string; type: "guide" | "tool" | "solution" | "resource" }
export type { NextStep } from "@/components/seo/NextSteps";

export interface VerticalContent {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  schemaId: string;
  badgeLabel: string;
  badgeIcon: LucideIcon;
  breadSolutions: string;
  breadLabel: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroDesc: string;
  ctaDemo: string;
  ctaContact: string;
  heroSummary: string;
  /* For / not for */
  forTitle: string;
  forLabel: string;
  notForLabel: string;
  forItems: string[];
  notForItems: string[];
  /* Pains */
  painLabel: string;
  painTitle1: string;
  painTitleHighlight: string;
  pains: { text: string }[];
  /* Table */
  tableLabel: string;
  tableTitle: string;
  tableHeaders: [string, string, string];
  tableRows: TableRow[];
  /* Solution */
  solLabel: string;
  solTitle1: string;
  solTitleHighlight: string;
  advantages: Advantage[];
  advIcons: LucideIcon[];
  /* Use cases */
  howLabel: string;
  howTitle: string;
  useCases: UseCase[];
  ucIcons: LucideIcon[];
  /* Impact */
  impactLabel: string;
  impactTitle: string;
  impactSubtitle: string;
  impacts: Impact[];
  impactIcons: LucideIcon[];
  /* Does / doesn't */
  doesLabel: string;
  doesNotLabel: string;
  doesTitle: string;
  doesItems: string[];
  doesNotItems: string[];
  /* FAQs */
  faqs: FAQ[];
  /* CTA */
  ctaLabel: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaMicro: string;
  /* Links */
  internalLinks: InternalLink[];
  nextSteps: NextStep[];
  nextStepsTitle: string;
}

const VerticalTemplate = ({ t }: { t: VerticalContent }) => {
  const { localePath } = useLanguage();
  const BadgeIcon = t.badgeIcon;

  useEffect(() => {
    const ld = document.createElement("script");
    ld.id = `${t.schemaId}-jsonld`;
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: t.metaTitle,
      description: t.metaDescription,
      mainEntity: {
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t.heroDesc,
      },
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(`${t.schemaId}-jsonld`)?.remove(); };
  }, [t]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={t.metaTitle} description={t.metaDescription} url={t.canonicalUrl} />
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[{ label: t.breadSolutions, href: localePath("/soluciones") }, { label: t.breadLabel }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6">
            <BadgeIcon size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.badgeLabel}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl">
            {t.heroTitle1}<span className="text-gradient-wine italic">{t.heroTitleHighlight}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">{t.heroDesc}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link to={localePath("/demo")} className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
              {t.ctaDemo} <ArrowRight size={16} />
            </Link>
            <Link to={localePath("/contacto")} className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:border-wine/50 hover:bg-wine/5 transition-all">
              {t.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SUMMARY ── */}
      <section className="pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-xl border border-wine/15 p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">{t.heroSummary}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOR / NOT FOR ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.forTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.forLabel}</p>
                <ul className="space-y-3">
                  {t.forItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.notForLabel}</p>
                <ul className="space-y-3">
                  {t.notForItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PAINS ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.painLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.painTitle1}<span className="text-gradient-wine italic">{t.painTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {t.pains.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-gradient-card rounded-xl border border-border p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} className="text-destructive" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABLE ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.tableLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.tableTitle}</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left p-4 font-medium text-muted-foreground w-[22%]">{t.tableHeaders[0]}</th>
                    <th className="text-left p-4 font-medium text-muted-foreground/60 w-[39%]">{t.tableHeaders[1]}</th>
                    <th className="text-left p-4 font-medium text-wine w-[39%]">{t.tableHeaders[2]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.tableRows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="p-3 pl-4 font-medium text-foreground/80">{row.area}</td>
                      <td className="p-3 text-muted-foreground/60">{row.without}</td>
                      <td className="p-3 text-foreground/90">{row.with_w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.solLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold">
              {t.solTitle1}<span className="text-gradient-wine italic">{t.solTitleHighlight}</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.advantages.map((adv, i) => {
              const Icon = t.advIcons[i] || Wine;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-wine" />
                    </div>
                    <h3 className="font-heading font-bold mb-2">{adv.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{adv.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.howLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.howTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {t.useCases.map((uc, i) => {
              const Icon = t.ucIcons[i] || Wine;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                        <Icon size={20} className="text-wine" />
                      </div>
                      <h3 className="font-heading text-sm font-bold">{uc.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{uc.scenario}</p>
                    <div className="mt-auto flex items-start gap-2 bg-wine/5 rounded-lg p-3">
                      <Sparkles size={13} className="text-wine shrink-0 mt-0.5" />
                      <p className="text-xs font-medium">{uc.result}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-4">{t.impactLabel}</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t.impactTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.impactSubtitle}</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.impacts.map((imp, i) => {
              const Icon = t.impactIcons[i] || TrendingUp;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                    <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-wine" />
                    </div>
                    <h3 className="font-heading text-sm font-bold mb-1.5">{imp.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{imp.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DOES / DOESN'T ── */}
      <section className="section-padding bg-gradient-dark">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">{t.doesTitle}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-wine mb-4">{t.doesLabel}</p>
                <ul className="space-y-3">
                  {t.doesItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-wine shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">{t.notForLabel}</p>
                <ul className="space-y-3">
                  {t.doesNotItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQSection faqs={t.faqs} schemaId={t.schemaId} />

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">{t.ctaLabel}</p>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-5 leading-tight">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{t.ctaDesc}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link to={localePath("/analisis-carta")} className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5">
                  {t.ctaPrimary} <ArrowRight size={16} />
                </Link>
                <Link to={localePath("/demo")} className="inline-flex items-center justify-center gap-2 border border-border hover:border-wine/30 px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all hover:-translate-y-0.5 text-muted-foreground hover:text-foreground">
                  {t.ctaSecondary}
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/60 max-w-lg mx-auto">{t.ctaMicro}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next Steps ── */}
      <NextSteps title={t.nextStepsTitle} steps={t.nextSteps} />

      {/* ── Internal Links ── */}
      <InternalLinks links={t.internalLinks} />

      <Footer />
    </div>
  );
};

export default VerticalTemplate;
