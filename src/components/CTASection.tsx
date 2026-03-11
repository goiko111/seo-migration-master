import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { getResolvedCTASet, type PageType } from "@/data/ctas";

interface CTASectionProps {
  /** Page type for contextual copy */
  pageType?: PageType;
  /** Override badge/tagline */
  badge?: string;
  /** Override title */
  title?: string;
  /** Override description */
  description?: string;
  /** Override primary button text */
  primaryText?: string;
  /** Override primary button URL */
  primaryUrl?: string;
  /** Override secondary button text */
  secondaryText?: string;
  /** Override secondary button URL */
  secondaryUrl?: string;
  /** Micro-text below buttons */
  micro?: string;
}

/**
 * Reusable final CTA section — funnel-aware with contextual defaults.
 */
const CTASection = ({
  pageType = "home",
  badge,
  title,
  description,
  primaryText,
  primaryUrl,
  secondaryText,
  secondaryUrl,
  micro,
}: CTASectionProps) => {
  const ctaSet = getResolvedCTASet(pageType);

  const resolvedBadge = badge || (pageType === "home" ? "Únete a Winerim" : "Da el siguiente paso");
  const resolvedTitle = title || ctaSet.finalTitle;
  const resolvedDesc = description || ctaSet.finalDesc;
  const resolvedPrimaryText = primaryText || ctaSet.primary.text;
  const resolvedPrimaryUrl = primaryUrl || ctaSet.primary.url;
  const resolvedSecondaryText = secondaryText || ctaSet.secondary.text;
  const resolvedSecondaryUrl = secondaryUrl || ctaSet.secondary.url;
  const resolvedMicro = micro || ctaSet.primary.micro;

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden glow-wine hover:border-wine/30 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
          <div className="relative z-10">
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold mb-6">
              {resolvedBadge}
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {resolvedTitle}
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-sm sm:text-base">
              {resolvedDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={resolvedPrimaryUrl}
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 sm:px-10 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20 hover:-translate-y-0.5"
              >
                {resolvedPrimaryText} <ArrowRight size={16} />
              </Link>
              <Link
                to={resolvedSecondaryUrl}
                className="px-8 sm:px-10 py-4 rounded-lg border border-border text-sm font-semibold tracking-wider uppercase hover:bg-secondary hover:border-wine/30 transition-all hover:-translate-y-0.5"
              >
                {resolvedSecondaryText}
              </Link>
            </div>
            {resolvedMicro && (
              <p className="text-xs text-muted-foreground/60 mt-6 max-w-md mx-auto">{resolvedMicro}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
