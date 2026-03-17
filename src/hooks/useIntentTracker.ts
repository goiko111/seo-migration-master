import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackPageIntent, trackAction, classifyPath, type IntentCategory } from "@/lib/intentTracking";
import { trackSessionPage, trackSessionToolUse, trackSessionResourceDownload } from "@/lib/sessionJourney";
import { startEngagementTimer } from "@/lib/engagementTimer";
import { ga, ads } from "@/lib/analytics";

/**
 * Hook that automatically tracks pageview intent on route change.
 * Drop into App.tsx or layout components.
 */
export function usePageIntentTracker(): void {
  const location = useLocation();
  const { lang } = useLanguage();
  const prevPath = useRef<string>("");
  const engagementCleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Avoid duplicate tracking on same path
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Clean up previous engagement timer
    engagementCleanup.current?.();

    // Small delay to let page render
    const timer = setTimeout(() => {
      trackPageIntent(location.pathname, lang);

      // Session journey tracking (B2B intent)
      trackSessionPage(location.pathname);

      // Engagement timer (B2B + Smart Bidding signal)
      engagementCleanup.current = startEngagementTimer(location.pathname);

      // GA4: track high-intent page visits
      const classification = classifyPath(location.pathname);
      if (classification) {
        const contentGroup = classification.category.replace(/_/g, " ");
        ga.pageView({ content_group: contentGroup });
        if (classification.level === "high") {
          ga.highIntentPageView(classification.category);

          // Google Ads: fire micro-conversions for key pages
          const microMap: Record<string, string> = {
            pricing: "pricing_visit",
            product_supply: "supply_visit",
            solution_groups: "groups_visit",
          };
          if (microMap[classification.category]) {
            ads.microConversion(microMap[classification.category]);
          }

          // Remarketing: push audience signals
          ads.remarketing({
            page_type: classification.category,
            intent_level: classification.level,
          });
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      engagementCleanup.current?.();
    };
  }, [location.pathname, lang]);

  // Scroll depth tracking — fires once per threshold per page
  useScrollDepthTracker();
}

/**
 * Track scroll depth at 25%, 50%, 75%, 100% thresholds.
 * Only fires on classified (high-intent) pages.
 */
function useScrollDepthTracker(): void {
  const location = useLocation();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();

    const classification = classifyPath(location.pathname);
    if (!classification || classification.level === "low") return;

    const thresholds = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const t of thresholds) {
        if (percent >= t && !fired.current.has(t)) {
          fired.current.add(t);
          trackAction("scroll_depth", classification.category, `scroll_${t}`, t);
          ga.scrollDepth(t);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
}

/**
 * Track a specific user action. Use in event handlers.
 * 
 * @example
 * const track = useIntentAction();
 * <button onClick={() => track("tool_use", "tool", "margin_calculator")}>Calculate</button>
 */
export function useIntentAction() {
  return trackAction;
}

/**
 * Track CTA clicks. Returns a click handler wrapper.
 * 
 * @example
 * const trackCTA = useCTAClickTracker();
 * <Link to="/demo" onClick={trackCTA("demo_hero")}>Demo</Link>
 */
export function useCTAClickTracker() {
  return useCallback((label: string) => {
    return () => trackAction("cta_click", "demo", label);
  }, []);
}

/**
 * Track resource download intent.
 */
export function trackResourceDownload(resourceSlug: string): void {
  trackAction("resource_download", "resource_download" as IntentCategory, resourceSlug);
  ga.resourceDownload(resourceSlug);
}

/**
 * Track form interaction intent.
 */
export function trackFormStart(formType: string): void {
  trackAction("form_start", formType === "demo" ? "demo" : "contact", formType);
  ga.formStart(formType);
}

export function trackFormSubmit(formType: string): void {
  trackAction("form_submit", formType === "demo" ? "demo" : "contact", formType);
  ga.formSubmit(formType);
}
