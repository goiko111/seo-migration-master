import { hasConsent } from "@/lib/analytics";

export const OPENAI_ADS_PIXEL_ID = "PJjbjzqWhEvepS3MMogyEs";
export const OPENAI_ADS_SDK_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

const SDK_MARKER = "data-winerim-openai-ads";
const MEASURED_LEAD_PREFIX = "winerim_openai_ads_lead_";
const EXCLUDED_PREFIXES = [
  "/admin",
  "/presentacion",
  "/propuesta-comercial",
  "/deck",
  "/en/presentation",
  "/fr/presentation",
  "/it/presentazione",
  "/de/praesentation",
  "/pt/apresentacao",
];

type Oaiq = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    oaiq?: Oaiq;
  }
}

let initialized = false;
let sdkRequested = false;
const measuredLeadIds = new Set<string>();

export function isOpenAIAdsEligiblePath(pathname: string): boolean {
  return !EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function getQueue(): Oaiq {
  if (typeof window === "undefined") {
    return (() => undefined) as Oaiq;
  }

  if (typeof window.oaiq === "function") return window.oaiq;

  const queue = ((...args: unknown[]) => {
    queue.q?.push(args);
  }) as Oaiq;
  queue.q = [];
  window.oaiq = queue;
  return queue;
}

function requestSdk(): void {
  if (typeof document === "undefined" || sdkRequested) return;

  const existing = document.querySelector<HTMLScriptElement>(`script[${SDK_MARKER}]`);
  if (existing) {
    sdkRequested = true;
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = OPENAI_ADS_SDK_URL;
  script.setAttribute(SDK_MARKER, "true");
  document.head.appendChild(script);
  sdkRequested = true;
}

/**
 * Installs one global Pixel queue. Consent is always denied before init; the SDK
 * is requested only after a stored or newly granted consent decision.
 */
export function initializeOpenAIAds(consentGranted = hasConsent()): void {
  if (typeof window === "undefined") return;

  const oaiq = getQueue();
  if (!initialized) {
    oaiq("consent", false);
    oaiq("init", {
      pixelId: OPENAI_ADS_PIXEL_ID,
      debug: import.meta.env.DEV,
    });
    initialized = true;
  }

  if (consentGranted) {
    oaiq("consent", true);
    requestSdk();
  }
}

export function updateOpenAIAdsConsent(granted: boolean): void {
  if (!initialized || typeof window === "undefined") return;

  getQueue()("consent", granted);
  if (granted) requestSdk();
}

function wasLeadMeasured(eventId: string): boolean {
  if (measuredLeadIds.has(eventId)) return true;
  try {
    return sessionStorage.getItem(`${MEASURED_LEAD_PREFIX}${eventId}`) === "1";
  } catch {
    return false;
  }
}

function rememberMeasuredLead(eventId: string): void {
  measuredLeadIds.add(eventId);
  try {
    sessionStorage.setItem(`${MEASURED_LEAD_PREFIX}${eventId}`, "1");
  } catch {
    // In-memory deduplication still applies when sessionStorage is unavailable.
  }
}

/** Sends only the standard lead event and never includes form fields or PII. */
export function measureOpenAILeadCreated(leadId: string): boolean {
  if (!leadId || !hasConsent() || wasLeadMeasured(leadId)) return false;

  initializeOpenAIAds(true);
  getQueue()(
    "measure",
    "lead_created",
    { type: "customer_action" },
    { event_id: leadId },
  );
  rememberMeasuredLead(leadId);
  return true;
}

export function resetOpenAIAdsForTests(): void {
  initialized = false;
  sdkRequested = false;
  measuredLeadIds.clear();
}
