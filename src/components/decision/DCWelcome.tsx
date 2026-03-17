import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Lightbulb, TrendingUp, ListChecks, BookOpen,
  ArrowRight, Zap, Search, CheckCircle2, Layers,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface Props {
  t: {
    welcome_title: string;
    welcome_subtitle: string;
    welcome_what_is_title: string;
    welcome_what_is_desc: string;
    welcome_how_title: string;
    welcome_how_desc: string;
    welcome_topics_title: string;
    welcome_topics_desc: string;
    welcome_usage_title: string;
    welcome_usage_desc: string;
    pillar_meaning_title: string;
    pillar_meaning_desc: string;
    pillar_impact_title: string;
    pillar_impact_desc: string;
    pillar_action_title: string;
    pillar_action_desc: string;
    pillar_next_title: string;
    pillar_next_desc: string;
    howto_title: string;
    howto_step1: string;
    howto_step1_desc: string;
    howto_step2: string;
    howto_step2_desc: string;
    howto_step3: string;
    howto_step3_desc: string;
    howto_step4: string;
    howto_step4_desc: string;
    cta_primary: string;
    cta_secondary: string;
  };
  firstAreaHref: string;
}

const pillars = [
  { key: "meaning" as const, icon: Lightbulb, accent: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { key: "impact" as const, icon: TrendingUp, accent: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { key: "action" as const, icon: ListChecks, accent: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { key: "next" as const, icon: BookOpen, accent: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

const steps = [
  { key: "step1" as const, icon: Zap, accent: "text-wine" },
  { key: "step2" as const, icon: Search, accent: "text-amber-500" },
  { key: "step3" as const, icon: CheckCircle2, accent: "text-emerald-500" },
  { key: "step4" as const, icon: Layers, accent: "text-blue-500" },
];

const DCWelcome = ({ t, firstAreaHref }: Props) => {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
      {/* Welcome header */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold mb-4"
          >
            {t.welcome_title}
          </motion.h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.welcome_subtitle}
          </p>
        </div>
      </ScrollReveal>

      {/* Context grid: What is, How it helps, Topics, Usage */}
      <ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {([
            { title: t.welcome_what_is_title, desc: t.welcome_what_is_desc, icon: "💡" },
            { title: t.welcome_how_title, desc: t.welcome_how_desc, icon: "🎯" },
            { title: t.welcome_topics_title, desc: t.welcome_topics_desc, icon: "📋" },
            { title: t.welcome_usage_title, desc: t.welcome_usage_desc, icon: "⚡" },
          ]).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6"
            >
              <span className="text-xl mb-3 block">{item.icon}</span>
              <h3 className="font-heading text-sm font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* 4 pillars */}
      <ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const titleKey = `pillar_${p.key}_title` as keyof typeof t;
            const descKey = `pillar_${p.key}_desc` as keyof typeof t;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className={`rounded-xl border ${p.border} bg-card/70 backdrop-blur-sm p-6 text-center`}
              >
                <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={22} className={p.accent} />
                </div>
                <h3 className="font-heading text-sm font-bold mb-2">{t[titleKey]}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{t[descKey]}</p>
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* How to get the most out of Decision Center */}
      <ScrollReveal>
        <div className="rounded-xl border border-wine/15 bg-gradient-to-br from-wine/5 via-card/80 to-card/60 backdrop-blur-sm p-8 md:p-10 mb-8">
          <h3 className="font-heading text-xl md:text-2xl font-bold mb-8 text-center">
            {t.howto_title}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const stepKey = `howto_${s.key}` as keyof typeof t;
              const descKey = `howto_${s.key}_desc` as keyof typeof t;
              return (
                <div key={s.key} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center text-xs font-bold text-wine">
                      {i + 1}
                    </span>
                    {i < 3 && <div className="w-px h-full bg-wine/10 mt-1 hidden sm:block" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1 flex items-center gap-2">
                      <Icon size={14} className={s.accent} />
                      {t[stepKey]}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t[descKey]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* CTAs */}
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={firstAreaHref}
            className="inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
          >
            {t.cta_primary}
            <ArrowRight size={14} />
          </Link>
          <a
            href="#areas"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase border border-border text-muted-foreground hover:text-foreground hover:border-wine/30 transition-all"
          >
            {t.cta_secondary}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default DCWelcome;
