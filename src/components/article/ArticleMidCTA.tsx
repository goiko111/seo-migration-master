import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BarChart3, Wine } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { getResolvedCTASet, type PageType, type FunnelStage } from "@/data/ctas";

interface ArticleMidCTAProps {
  /** Page type for contextual copy */
  pageType?: PageType;
  /** Direct override for title */
  title?: string;
  /** Direct override for description */
  description?: string;
  /** Direct override for button text */
  buttonText?: string;
  /** Direct override for button URL */
  buttonUrl?: string;
  /** Visual variant */
  variant?: "default" | "subtle" | "highlight";
}

const variantIcons: Record<string, React.ElementType> = {
  default: Sparkles,
  subtle: BarChart3,
  highlight: Wine,
};

/**
 * Mid-content CTA block — contextual, funnel-aware.
 * Used inside articles, guides, and long-form pages.
 */
const ArticleMidCTA = ({
  pageType = "blog",
  title,
  description,
  buttonText,
  buttonUrl,
  variant = "default",
}: ArticleMidCTAProps) => {
  const ctaSet = getResolvedCTASet(pageType);
  const Icon = variantIcons[variant] || Sparkles;

  const resolvedTitle = title || ctaSet.midTitle;
  const resolvedDesc = description || ctaSet.midDesc;
  const resolvedBtn = buttonText || ctaSet.primary.text;
  const resolvedUrl = buttonUrl || ctaSet.primary.url;

  const borderCls = variant === "highlight"
    ? "border-wine/30 bg-wine/5"
    : variant === "subtle"
      ? "border-border bg-gradient-card"
      : "border-wine/20 bg-wine/5";

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-12 py-6">
      <ScrollReveal>
        <div className={`flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-xl border ${borderCls}`}>
          <Icon size={24} className="text-wine shrink-0" />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-base sm:text-lg mb-1">{resolvedTitle}</h3>
            <p className="text-sm text-muted-foreground">{resolvedDesc}</p>
          </div>
          <Link
            to={resolvedUrl}
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
          >
            {resolvedBtn} <ArrowRight size={16} />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ArticleMidCTA;
