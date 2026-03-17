import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackPageIntent, trackAction, classifyPath, type IntentCategory } from "@/lib/intentTracking";

/**
 * Hook that automatically tracks pageview intent on route change.
 * Drop into App.tsx or layout components.
 */
export function usePageIntentTracker(): void {
  const location = useLocation();
  const { lang } = useLanguage();
  const prevPath = useRef<string>("");

  useEffect(() => {
    // Avoid duplicate tracking on same path
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Small delay to let page render (better for scroll depth tracking later)
    const timer = setTimeout(() => {
      trackPageIntent(location.pathname, lang);
    }, 300);

    return () => clearTimeout(timer);
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
}

/**
 * Track form interaction intent.
 */
export function trackFormStart(formType: string): void {
  trackAction("form_start", formType === "demo" ? "demo" : "contact", formType);
}

export function trackFormSubmit(formType: string): void {
  trackAction("form_submit", formType === "demo" ? "demo" : "contact", formType);
}
