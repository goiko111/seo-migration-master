import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getResolvedCTASet, type PageType } from "@/data/ctas";
import { trackAction } from "@/lib/intentTracking";

interface StickyCTAProps {
  /** Page type to determine CTA copy */
  pageType: PageType;
  /** Override the CTA text */
  text?: string;
  /** Override the CTA URL */
  url?: string;
  /** Scroll threshold in pixels before showing (default: 600) */
  threshold?: number;
}

/**
 * Subtle sticky bottom bar CTA that appears on scroll.
 * Dismissable, non-intrusive, funnel-aware.
 */
const StickyCTA = ({ pageType, text, url, threshold = 600 }: StickyCTAProps) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  // Don't show on demo/contact/admin pages
  const excludedPaths = ["/demo", "/contacto", "/admin", "/analisis-carta", "/en/demo", "/en/contact", "/it/demo", "/it/contatto", "/fr/demo", "/fr/contact"];
  const isExcluded = excludedPaths.some(p => location.pathname.startsWith(p));

  useEffect(() => {
    if (isExcluded || dismissed) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      setVisible(scrolled && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, dismissed, isExcluded]);

  if (isExcluded) return null;

  const ctaSet = getResolvedCTASet(pageType);
  const ctaText = text || ctaSet.stickyText;
  const ctaUrl = url || ctaSet.primary.url;

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none"
        >
          <div className="max-w-lg mx-auto pointer-events-auto">
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg shadow-black/10 px-4 py-3 flex items-center gap-3">
              <Link
                to={ctaUrl}
                onClick={() => trackAction("cta_click", "demo", `sticky_${pageType}`)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-wine/20 hover:shadow-md"
              >
                {ctaText} <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
