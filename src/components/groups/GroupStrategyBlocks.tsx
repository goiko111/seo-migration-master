/**
 * GroupStrategyBlocks — Reusable blocks for group intelligence content.
 *
 * Currently embedded in GruposRestauracion page.
 * Designed to be extracted into a standalone page at:
 *   /soluciones/inteligencia-surtido-grupos (future)
 *
 * Each block is independently renderable and composable.
 */

import { Link } from "react-router-dom";
import {
  Search, GitCompare, Box, Expand, ScanSearch, Copy,
  Sliders, ShieldCheck, Zap, BarChart3, DollarSign,
  TrendingUp, Wine, Warehouse, ArrowRight, Layers,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

// ── Types ──────────────────────────────────────────

export type CapCard = { title: string; desc: string };
export type IntelCard = { title: string; desc: string };
export type PilotStep = { title: string; desc: string };

export interface GroupStrategyContent {
  capLabel: string;
  capTitle: string;
  capSubtitle: string;
  capCards: CapCard[];

  benchLabel: string;
  benchTitle: string;
  benchSubtitle: string;
  benchMetrics: string[];
  benchClosing: string;

  intelLabel: string;
  intelTitle1: string;
  intelTitleHighlight: string;
  intelSubtitle: string;
  intelCards: IntelCard[];

  pilotTitle: string;
  pilotSubtitle: string;
  pilotSteps: PilotStep[];
  pilotClosing: string;
}

// ── Capabilities Block ─────────────────────────────

export const CapabilitiesBlock = ({ t }: { t: Pick<GroupStrategyContent, "capLabel" | "capTitle" | "capSubtitle" | "capCards"> }) => {
  const icons = [GitCompare, ScanSearch, Copy, Sliders, ShieldCheck, Zap];
  return (
    <section className="section-padding bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
            <Layers size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.capLabel}</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{t.capTitle}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{t.capSubtitle}</p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.capCards.map((card, i) => {
            const Icon = icons[i] || Layers;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-wine/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-wine/5 p-6 md:p-7">
                  <div className="w-11 h-11 rounded-xl bg-wine/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
                    <Icon size={22} className="text-wine" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── Benchmarking Block ─────────────────────────────

export const BenchmarkingBlock = ({ t }: { t: Pick<GroupStrategyContent, "benchLabel" | "benchTitle" | "benchSubtitle" | "benchMetrics" | "benchClosing"> }) => {
  const metricIcons = [DollarSign, TrendingUp, Wine, ScanSearch, Warehouse, GitCompare, BarChart3];
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
            <BarChart3 size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.benchLabel}</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{t.benchTitle}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{t.benchSubtitle}</p>
        </ScrollReveal>
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {t.benchMetrics.map((metric, i) => {
              const Icon = metricIcons[i] || BarChart3;
              const isLast = i === t.benchMetrics.length - 1;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className={`flex items-center gap-4 p-5 md:p-6 border-b border-border/30 sm:border-r border-r-border/30 ${isLast ? "border-b-0" : ""} ${(i + 1) % 3 === 0 ? "lg:border-r-0" : ""} ${(i + 1) % 2 === 0 ? "sm:border-r-0 lg:border-r" : ""} ${i >= t.benchMetrics.length - 1 ? "sm:border-b-0" : ""} ${i >= t.benchMetrics.length - 2 ? "lg:border-b-0" : ""}`}>
                    <div className="w-9 h-9 rounded-lg bg-wine/8 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-wine/70" />
                    </div>
                    <span className="text-sm font-medium text-foreground/85">{metric}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        <ScrollReveal>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto text-sm leading-relaxed italic">{t.benchClosing}</p>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ── Intel / Assortment Block ───────────────────────

export const IntelBlock = ({ t }: { t: Pick<GroupStrategyContent, "intelLabel" | "intelTitle1" | "intelTitleHighlight" | "intelSubtitle" | "intelCards"> }) => {
  const icons = [Search, GitCompare, Box, Expand];
  const colors = [
    { gradient: "from-wine/15 to-wine/5", iconBg: "bg-wine/10", iconColor: "text-wine", border: "hover:border-wine/30" },
    { gradient: "from-blue-500/15 to-blue-500/5", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", border: "hover:border-blue-500/30" },
    { gradient: "from-amber-500/15 to-amber-500/5", iconBg: "bg-amber-500/10", iconColor: "text-amber-400", border: "hover:border-amber-500/30" },
    { gradient: "from-emerald-500/15 to-emerald-500/5", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", border: "hover:border-emerald-500/30" },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-wine/6 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/20 bg-wine/5 mb-6">
            <Search size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">{t.intelLabel}</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {t.intelTitle1}<span className="text-gradient-wine italic">{t.intelTitleHighlight}</span>
          </h2>
          <p className="text-muted-foreground mt-5 max-w-3xl mx-auto leading-relaxed">{t.intelSubtitle}</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {t.intelCards.map((card, i) => {
            const Icon = icons[i] || Search;
            const c = colors[i] || colors[0];
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`group relative h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm ${c.border} transition-all duration-500 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 overflow-hidden`}>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  <div className="relative p-7 md:p-8 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${c.iconColor}`} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ── Pilot / Progressive Deployment Block ───────────

export const PilotBlock = ({ t, localePath }: { t: Pick<GroupStrategyContent, "pilotTitle" | "pilotSubtitle" | "pilotSteps" | "pilotClosing">; localePath: (p: string) => string }) => (
  <section className="section-padding">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal className="text-center mb-12">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{t.pilotTitle}</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">{t.pilotSubtitle}</p>
      </ScrollReveal>
      <div className="grid md:grid-cols-3 gap-5">
        {t.pilotSteps.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-7 text-center">
              <div className="w-10 h-10 rounded-full bg-wine/10 border border-wine/20 flex items-center justify-center mx-auto mb-5">
                <span className="text-sm font-bold text-wine">{i + 1}</span>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-muted-foreground/30">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal>
        <p className="text-center text-muted-foreground mt-8 text-sm font-medium italic">{t.pilotClosing}</p>
      </ScrollReveal>
    </div>
  </section>
);
