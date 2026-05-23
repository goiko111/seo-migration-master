import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, Package, ShoppingCart, BarChart3, Wine, Building2,
  ArrowLeft, Lock, Shield, Info, Target, Lightbulb, AlertTriangle,
  FileText, Clock, ChevronDown, Calculator, Download, BookOpen, ArrowRight, Zap,
  User, Users, Briefcase, Store
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationDict } from "@/i18n/types";
import margenesPricingContent, { type DeepAreaContent, type SubTopic, type SubTopicPriority, type AreaTopError, type LinkType, type AreaNextStep, type AreaMiniCase, type UserProfile } from "@/data/decisionCenter/margenesPricing";
import margenesPricingEN from "@/data/decisionCenter/margenesPricing.en";
import margenesPricingIT from "@/data/decisionCenter/margenesPricing.it";
import margenesPricingFR from "@/data/decisionCenter/margenesPricing.fr";
import margenesPricingDE from "@/data/decisionCenter/margenesPricing.de";
import margenesPricingPT from "@/data/decisionCenter/margenesPricing.pt";
import stockRotacionContent from "@/data/decisionCenter/stockRotacion";
import stockRotacionEN from "@/data/decisionCenter/stockRotacion.en";
import stockRotacionIT from "@/data/decisionCenter/stockRotacion.it";
import stockRotacionFR from "@/data/decisionCenter/stockRotacion.fr";
import stockRotacionDE from "@/data/decisionCenter/stockRotacion.de";
import stockRotacionPT from "@/data/decisionCenter/stockRotacion.pt";
import comprasReposicionContent from "@/data/decisionCenter/comprasReposicion";
import comprasReposicionEN from "@/data/decisionCenter/comprasReposicion.en";
import comprasReposicionIT from "@/data/decisionCenter/comprasReposicion.it";
import comprasReposicionFR from "@/data/decisionCenter/comprasReposicion.fr";
import comprasReposicionDE from "@/data/decisionCenter/comprasReposicion.de";
import comprasReposicionPT from "@/data/decisionCenter/comprasReposicion.pt";
import cartaEquilibrioContent from "@/data/decisionCenter/cartaEquilibrio";
import cartaEquilibrioEN from "@/data/decisionCenter/cartaEquilibrio.en";
import cartaEquilibrioIT from "@/data/decisionCenter/cartaEquilibrio.it";
import cartaEquilibrioFR from "@/data/decisionCenter/cartaEquilibrio.fr";
import cartaEquilibrioDE from "@/data/decisionCenter/cartaEquilibrio.de";
import cartaEquilibrioPT from "@/data/decisionCenter/cartaEquilibrio.pt";
import vinoPorCopaContent from "@/data/decisionCenter/vinoPorCopa";
import vinoPorCopaEN from "@/data/decisionCenter/vinoPorCopa.en";
import vinoPorCopaIT from "@/data/decisionCenter/vinoPorCopa.it";
import vinoPorCopaFR from "@/data/decisionCenter/vinoPorCopa.fr";
import vinoPorCopaDE from "@/data/decisionCenter/vinoPorCopa.de";
import vinoPorCopaPT from "@/data/decisionCenter/vinoPorCopa.pt";
import gruposBenchmarkingEN from "@/data/decisionCenter/gruposBenchmarking.en";
import gruposBenchmarkingIT from "@/data/decisionCenter/gruposBenchmarking.it";
import gruposBenchmarkingFR from "@/data/decisionCenter/gruposBenchmarking.fr";
import gruposBenchmarkingDE from "@/data/decisionCenter/gruposBenchmarking.de";
import gruposBenchmarkingPT from "@/data/decisionCenter/gruposBenchmarking.pt";
import gruposBenchmarkingContent from "@/data/decisionCenter/gruposBenchmarking";

/* ── Password gate ── */
const GATE_KEY = "wdc_access";
const GATE_PASSWORD = "winerim2026";

const useGate = () => {
  const [granted, setGranted] = useState(() => sessionStorage.getItem(GATE_KEY) === "true");
  const unlock = (pwd: string) => {
    if (pwd === GATE_PASSWORD) {
      sessionStorage.setItem(GATE_KEY, "true");
      setGranted(true);
      return true;
    }
    return false;
  };
  return { granted, unlock };
};

/* ── Config builders (take t for translations) ── */
const getPriorityConfig = (t: TranslationDict): Record<SubTopicPriority, { label: string; color: string; bg: string; icon: string }> => ({
  "inmediato":    { label: t.dc_priority_urgent,     color: "text-red-400",             bg: "bg-red-500/10",    icon: "●" },
  "esta semana":  { label: t.dc_priority_this_week,  color: "text-amber-400",           bg: "bg-amber-500/10",  icon: "●" },
  "este mes":     { label: t.dc_priority_this_month, color: "text-blue-400",            bg: "bg-blue-500/10",   icon: "●" },
  "seguimiento":  { label: t.dc_priority_followup,   color: "text-muted-foreground/70", bg: "bg-muted/50",      icon: "○" },
});

const getLinkTypeConfig = (t: TranslationDict): Record<LinkType, { label: string; icon: typeof FileText; color: string; bg: string }> => ({
  tool:     { label: t.dc_type_tool,     icon: Calculator,  color: "text-wine",              bg: "bg-wine/10" },
  resource: { label: t.dc_type_resource, icon: Download,    color: "text-emerald-500",        bg: "bg-emerald-500/10" },
  product:  { label: t.dc_type_product,  icon: Zap,         color: "text-amber-500",          bg: "bg-amber-500/10" },
  article:  { label: t.dc_type_article,  icon: FileText,    color: "text-violet-500",         bg: "bg-violet-500/10" },
  guide:    { label: t.dc_type_guide,    icon: BookOpen,    color: "text-blue-400",           bg: "bg-blue-500/10" },
  solution: { label: t.dc_type_solution, icon: Lightbulb,   color: "text-rose-400",           bg: "bg-rose-500/10" },
});

const getProfileConfig = (t: TranslationDict): Record<UserProfile, { label: string; icon: typeof User }> => ({
  "direccion":  { label: t.dc_profile_management, icon: Briefcase },
  "sala":       { label: t.dc_profile_floor,      icon: Store },
  "compras-fb": { label: t.dc_profile_purchasing,  icon: ShoppingCart },
  "grupo":      { label: t.dc_profile_group,       icon: Users },
});

const ProfileBadges = ({ audiences, t }: { audiences?: UserProfile[]; t: TranslationDict }) => {
  if (!audiences || audiences.length === 0) return null;
  const profileCfg = getProfileConfig(t);
  return (
    <div className="flex flex-wrap gap-1.5">
      {audiences.map((a) => {
        const cfg = profileCfg[a];
        const Icon = cfg.icon;
        return (
          <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-muted/50 text-muted-foreground">
            <Icon size={10} />
            {cfg.label}
          </span>
        );
      })}
    </div>
  );
};

/* ── Gate UI ── */
const PasswordGate = ({ onUnlock, t }: { onUnlock: (pwd: string) => boolean; t: TranslationDict }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUnlock(value.trim())) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-wine/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-wine" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">{t.dc_gate_title}</h1>
          <p className="text-sm text-muted-foreground">{t.dc_gate_subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input type="password" value={value} onChange={(e) => setValue(e.target.value)} placeholder={t.dc_gate_placeholder}
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 transition-all ${error ? "border-destructive focus:ring-destructive/30" : "border-border focus:ring-wine/30 focus:border-wine/50"}`}
              autoFocus />
            <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30" />
          </div>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive font-medium">{t.dc_gate_error}</motion.p>}
          <button type="submit" className="w-full bg-gradient-wine text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all">{t.dc_gate_submit}</button>
        </form>
      </motion.div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   DEEP AREA VIEW
   ══════════════════════════════════════════════════════ */

const PriorityBadge = ({ priority, t }: { priority?: SubTopicPriority; t: TranslationDict }) => {
  if (!priority) return null;
  const cfg = getPriorityConfig(t)[priority];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase ${cfg.bg} ${cfg.color}`}>
      <span className="text-[8px]">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
};

const SubTopicAccordion = ({ subtopic, index, t }: { subtopic: SubTopic; index: number; t: TranslationDict }) => {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.04}>
      <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-muted/20 transition-colors group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 text-sm font-bold shrink-0">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading text-base font-bold text-foreground group-hover:text-wine transition-colors">
                {subtopic.title}
              </h3>
              <PriorityBadge priority={subtopic.priority} t={t} />
            </div>
          </div>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={18} className="text-muted-foreground/50" />
          </motion.div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6 space-y-6 border-t border-border pt-6">
                {/* Qué significa */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-muted/50 flex items-center justify-center">
                      <Info size={13} className="text-muted-foreground" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">{t.dc_what_means}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.queSignifica}</p>
                </div>

                {/* Por qué importa */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-wine/10 flex items-center justify-center">
                      <Target size={13} className="text-wine" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">{t.dc_why_matters}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{subtopic.porQueImporta}</p>
                </div>

                {/* Qué hacer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                      <Lightbulb size={13} className="text-emerald-500" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">{t.dc_what_to_do}</h4>
                  </div>
                  <ol className="space-y-2.5">
                    {subtopic.queHacer.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Errores frecuentes */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center">
                      <AlertTriangle size={13} className="text-destructive" />
                    </div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">{t.dc_frequent_errors}</h4>
                  </div>
                  <div className="space-y-3">
                    {subtopic.errores.map((err, i) => (
                      <div key={i} className="flex items-start gap-2.5 pb-3 border-b border-border last:border-0 last:pb-0">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold shrink-0 mt-0.5">
                          ✕
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{err.mistake}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{err.consequence}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
};

const DeepAreaView = ({ content, t }: { content: DeepAreaContent; t: TranslationDict }) => {
  const Icon = content.icon;
  const linkTypeCfg = getLinkTypeConfig(t);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-wine/4 rounded-full blur-[140px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 md:px-12">
            <Link to="/decision-center" className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-wine transition-colors mb-6">
              <ArrowLeft size={12} /> Decision Center
            </Link>

            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl ${content.bg} flex items-center justify-center shrink-0`}>
                <Icon size={24} className={content.accent} />
              </div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {content.name}
                </motion.h1>
                <p className={`text-sm font-semibold tracking-wider ${content.accent} mt-1`}>{content.tagline}</p>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/50 mb-1.5">{t.dc_relevant_for}</p>
              <ProfileBadges audiences={content.audiences} t={t} />
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground leading-relaxed max-w-3xl mt-4">
              {content.intro}
            </motion.p>
          </div>
        </section>

        {/* Table of contents */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-8">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card/50 p-5 md:p-6">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50 mb-3">
                {t.dc_in_this_section}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {content.subtopics.map((st, i) => (
                  <span key={st.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0 truncate">{st.title}</span>
                    <PriorityBadge priority={st.priority} t={t} />
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Top errors — consolidated */}
        {content.topErrors && content.topErrors.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 md:px-12 pb-10">
            <ScrollReveal>
              <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle size={18} className="text-destructive" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground">{t.dc_common_errors}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.dc_common_errors_sub}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {content.topErrors.map((err, i) => (
                    <div key={i} className="rounded-lg border border-border bg-muted/20 p-5">
                      <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground">{err.error}</p>
                          <div className="mt-3 grid sm:grid-cols-2 gap-3">
                            <div className="rounded-md bg-card/80 border border-border p-3">
                              <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50 mb-1">{t.dc_why_happens}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{err.porQueOcurre}</p>
                            </div>
                            <div className="rounded-md bg-card/80 border border-border p-3">
                              <p className="text-[10px] font-semibold tracking-widest uppercase text-destructive/60 mb-1">{t.dc_consequence}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{err.consecuencia}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Mini casos de uso */}
        {content.miniCases && content.miniCases.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
            <ScrollReveal>
              <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-wine/10 flex items-center justify-center">
                    <Lightbulb size={18} className="text-wine" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold text-foreground">{t.dc_use_cases}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.dc_use_cases_sub}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-5">
                  {content.miniCases.map((mc, i) => (
                    <div key={i} className="rounded-lg border border-border bg-muted/20 p-5 space-y-3">
                      <p className="text-xs font-semibold tracking-wider uppercase text-wine/70">{mc.profile}</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50 mb-0.5">{t.dc_situation}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{mc.situation}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50 mb-0.5">{t.dc_what_did}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{mc.action}</p>
                        </div>
                        <div className="pt-1 border-t border-border">
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-emerald-500/70 mb-0.5">{t.dc_result}</p>
                          <p className="text-sm font-medium text-foreground leading-relaxed">{mc.result}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* Subtopics */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
          <div className="space-y-4">
            {content.subtopics.map((st, i) => (
              <SubTopicAccordion key={st.id} subtopic={st} index={i} t={t} />
            ))}
          </div>
        </section>

        {/* Related resources — Aprender más */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <FileText size={18} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">{t.dc_learn_more}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.dc_learn_more_sub}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {content.links.map((link) => {
                  const linkType = (link as any).type as LinkType | undefined;
                  const typeCfg = linkType ? linkTypeCfg[linkType] : null;
                  const TypeIcon = typeCfg?.icon || FileText;
                  return (
                    <Link key={link.href} to={link.href}
                      className="flex items-start gap-3 rounded-lg border border-border p-4 hover:border-wine/30 hover:bg-wine/5 transition-all group">
                      <div className={`w-9 h-9 rounded-lg ${typeCfg?.bg || "bg-muted/50"} flex items-center justify-center shrink-0 mt-0.5`}>
                        <TypeIcon size={15} className={typeCfg?.color || "text-muted-foreground"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {typeCfg && (
                          <span className={`text-[10px] font-semibold tracking-widest uppercase ${typeCfg.color}`}>
                            {typeCfg.label}
                          </span>
                        )}
                        <p className="text-sm font-semibold text-foreground group-hover:text-wine transition-colors">
                          {link.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{link.description}</p>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-wine transition-colors shrink-0 mt-1" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Siguiente paso recomendado */}
        {content.nextStep && (
          <section className="max-w-4xl mx-auto px-6 md:px-12 pb-12">
            <ScrollReveal>
              <Link
                to={content.nextStep.href}
                className="block rounded-xl border-2 border-wine/20 bg-gradient-to-r from-wine/5 to-transparent p-6 md:p-8 hover:border-wine/40 hover:from-wine/10 transition-all group"
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-wine/60 mb-2">
                  {t.dc_next_step}
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-wine transition-colors">
                      {content.nextStep.label}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {content.nextStep.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-wine/10 flex items-center justify-center shrink-0 group-hover:bg-wine/20 transition-colors">
                    <ArrowRight size={18} className="text-wine" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </section>
        )}

        {/* Back */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20 text-center">
          <Link to="/decision-center" className="inline-flex items-center gap-2 text-sm font-medium text-wine hover:text-wine-light transition-colors">
            <ArrowLeft size={14} /> {t.dc_back}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SIMPLE AREA VIEW (unused currently but kept for compat)
   ══════════════════════════════════════════════════════ */

interface SimpleAreaContent {
  name: string;
  tagline: string;
  icon: React.ElementType;
  accent: string;
  bg: string;
  priority: SubTopicPriority;
  queSignifica: string[];
  porQueImporta: string[];
  queHacerAhora: string[];
  erroresComunes: { mistake: string; consequence: string }[];
  aprenderMas: { label: string; href: string }[];
}

const simpleAreas: Record<string, SimpleAreaContent> = {};

/* ── Block config (translated) ── */
const getBlockConfig = (t: TranslationDict) => ({
  queSignifica:    { title: t.dc_what_means,      icon: Info,           style: "bg-muted/50 text-muted-foreground" },
  porQueImporta:   { title: t.dc_why_matters,      icon: Target,         style: "bg-wine/10 text-wine" },
  queHacerAhora:   { title: t.dc_what_to_do,       icon: Lightbulb,      style: "bg-emerald-500/10 text-emerald-500" },
  erroresComunes:  { title: t.dc_common_errors,     icon: AlertTriangle,  style: "bg-destructive/10 text-destructive" },
  aprenderMas:     { title: t.dc_learn_more,        icon: FileText,       style: "bg-blue-500/10 text-blue-400" },
});

const ContentBlock = ({ blockKey, children, t }: { blockKey: string; children: React.ReactNode; t: TranslationDict }) => {
  const config = getBlockConfig(t)[blockKey as keyof ReturnType<typeof getBlockConfig>];
  if (!config) return null;
  const BlockIcon = config.icon;
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur-sm p-6 md:p-8">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-lg ${config.style} flex items-center justify-center`}>
          <BlockIcon size={18} />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground">{config.title}</h3>
      </div>
      {children}
    </div>
  );
};

const SimpleAreaView = ({ area, t }: { area: SimpleAreaContent; t: TranslationDict }) => {
  const Icon = area.icon;
  const prio = getPriorityConfig(t)[area.priority];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-wine/4 rounded-full blur-[140px]" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 md:px-12">
            <Link to="/decision-center" className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-muted-foreground hover:text-wine transition-colors mb-6">
              <ArrowLeft size={12} /> Decision Center
            </Link>
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl ${area.bg} flex items-center justify-center shrink-0`}>
                <Icon size={24} className={area.accent} />
              </div>
              <div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {area.name}
                </motion.h1>
                <p className={`text-sm font-semibold tracking-wider ${area.accent} mt-1`}>{area.tagline}</p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${prio.bg} mt-2`}>
              <Clock size={12} className={prio.color} />
              <span className={`text-xs font-semibold tracking-wider uppercase ${prio.color}`}>{t.dc_priority_label}: {prio.label}</span>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
          <div className="space-y-8">
            <ScrollReveal><ContentBlock blockKey="queSignifica" t={t}>
              <ul className="space-y-4">
                {area.queSignifica.map((text, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-2 shrink-0" />{text}
                  </li>
                ))}
              </ul>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.06}><ContentBlock blockKey="porQueImporta" t={t}>
              <ul className="space-y-4">
                {area.porQueImporta.map((text, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <Target size={14} className="text-wine/40 mt-0.5 shrink-0" />{text}
                  </li>
                ))}
              </ul>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.12}><ContentBlock blockKey="queHacerAhora" t={t}>
              <ol className="space-y-4">
                {area.queHacerAhora.map((text, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>{text}
                  </li>
                ))}
              </ol>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.18}><ContentBlock blockKey="erroresComunes" t={t}>
              <div className="space-y-4">
                {area.erroresComunes.map((err, j) => (
                  <div key={j} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{err.mistake}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{err.consequence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentBlock></ScrollReveal>

            <ScrollReveal delay={0.24}><ContentBlock blockKey="aprenderMas" t={t}>
              <div className="space-y-3">
                {area.aprenderMas.map((link, j) => (
                  <Link key={j} to={link.href} className="flex items-center gap-3 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
                    <FileText size={14} className="shrink-0" />
                    <span className="group-hover:underline">{link.label}</span>
                  </Link>
                ))}
              </div>
            </ContentBlock></ScrollReveal>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 pb-20 text-center">
          <Link to="/decision-center" className="inline-flex items-center gap-2 text-sm font-medium text-wine hover:text-wine-light transition-colors">
            <ArrowLeft size={14} /> {t.dc_back}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT — routes to deep or simple view
   ══════════════════════════════════════════════════════ */

const DecisionCenterArea = () => {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const { granted, unlock } = useGate();
  const { t, lang } = useLanguage();

  if (!granted) return <PasswordGate onUnlock={unlock} t={t} />;

  // Language-aware content maps
  const margenesByLang: Record<string, DeepAreaContent> = {
    es: margenesPricingContent,
    en: margenesPricingEN,
    it: margenesPricingIT,
    fr: margenesPricingFR,
    de: margenesPricingDE,
    pt: margenesPricingPT,
  };

  const stockByLang: Record<string, DeepAreaContent> = {
    es: stockRotacionContent,
    en: stockRotacionEN,
    it: stockRotacionIT,
    fr: stockRotacionFR,
    de: stockRotacionDE,
    pt: stockRotacionPT,
  };
  const comprasByLang: Record<string, DeepAreaContent> = {
    es: comprasReposicionContent,
    en: comprasReposicionEN,
    it: comprasReposicionIT,
    fr: comprasReposicionFR,
    de: comprasReposicionDE,
    pt: comprasReposicionPT,
  };
  const cartaByLang: Record<string, DeepAreaContent> = {
    es: cartaEquilibrioContent,
    en: cartaEquilibrioEN,
    it: cartaEquilibrioIT,
    fr: cartaEquilibrioFR,
    de: cartaEquilibrioDE,
    pt: cartaEquilibrioPT,
  };
  const copaByLang: Record<string, DeepAreaContent> = {
    es: vinoPorCopaContent,
    en: vinoPorCopaEN,
    it: vinoPorCopaIT,
    fr: vinoPorCopaFR,
    de: vinoPorCopaDE,
    pt: vinoPorCopaPT,
  };
  const gruposByLang: Record<string, DeepAreaContent> = {
    es: gruposBenchmarkingContent,
    en: gruposBenchmarkingEN,
    it: gruposBenchmarkingIT,
    fr: gruposBenchmarkingFR,
    de: gruposBenchmarkingDE,
    pt: gruposBenchmarkingPT,
  };

  // Deep areas — pick translated version when available, fallback to ES
  const deepAreas: Record<string, DeepAreaContent> = {
    "margenes-pricing": margenesByLang[lang] || margenesPricingContent,
    "stock-rotacion": stockByLang[lang] || stockRotacionContent,
    "compras-reposicion": comprasByLang[lang] || comprasReposicionContent,
    "carta-equilibrio": cartaByLang[lang] || cartaEquilibrioContent,
    "vino-por-copa": copaByLang[lang] || vinoPorCopaContent,
    "grupos-benchmarking": gruposByLang[lang] || gruposBenchmarkingContent,
  };

  if (areaSlug && deepAreas[areaSlug]) {
    return <DeepAreaView content={deepAreas[areaSlug]} t={t} />;
  }

  // Simple areas
  const area = areaSlug ? simpleAreas[areaSlug] : undefined;
  if (!area) return <Navigate to="/decision-center" replace />;

  return <SimpleAreaView area={area} t={t} />;
};

export default DecisionCenterArea;
