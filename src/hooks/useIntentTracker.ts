import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackPageIntent, trackAction, type IntentCategory } from "@/lib/intentTracking";

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
