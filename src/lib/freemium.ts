import { useEffect, useState, useCallback } from "react";

export const FREEMIUM_LIMIT = 1;

const KEY_TOOLS = "winerim_tools_used";
const KEY_RESOURCES = "winerim_resources_downloaded";
const KEY_UNLOCKED = "winerim_freemium_unlocked";
const EVT = "winerim:freemium-change";

/** Detect preview / dev environments so the gate never blocks while testing */
function isDevMode(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".lovable.app") ||
    host.endsWith(".lovableproject.com") ||
    host.endsWith(".lovable.dev")
  );
}

/** Log once so developers know the gate is bypassed */
let _devWarned = false;
function warnDevBypass() {
  if (_devWarned) return;
  _devWarned = true;
  // eslint-disable-next-line no-console
  console.info("[Winerim] Freemium gate bypassed — dev/preview mode detected.");
}

function readArr(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeArr(key: string, arr: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* noop */
  }
}

export function getToolsUsed(): string[] {
  if (typeof window === "undefined") return [];
  return readArr(KEY_TOOLS);
}

export function getResourcesDownloaded(): string[] {
  if (typeof window === "undefined") return [];
  return readArr(KEY_RESOURCES);
}

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY_UNLOCKED) === "true";
}

export function unlockFreemium() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_UNLOCKED, "true");
  window.dispatchEvent(new CustomEvent(EVT));
}

export function trackToolUsed(slug: string) {
  if (!slug || typeof window === "undefined") return;
  const arr = readArr(KEY_TOOLS);
  if (!arr.includes(slug)) {
    arr.push(slug);
    writeArr(KEY_TOOLS, arr);
  }
}

export function trackResourceDownloaded(slug: string) {
  if (!slug || typeof window === "undefined") return;
  const arr = readArr(KEY_RESOURCES);
  if (!arr.includes(slug)) {
    arr.push(slug);
    writeArr(KEY_RESOURCES, arr);
  }
}

/**
 * Should the gate block this attempt?
 * Tools: gated when user already used >= LIMIT distinct tools and the *new* one is different.
 * Resources: gated when user already downloaded >= LIMIT distinct resources and the new one is different.
 */
export function shouldGateTool(slug: string): boolean {
  if (isDevMode()) {
    warnDevBypass();
    return false;
  }
  if (isUnlocked()) return false;
  const used = getToolsUsed();
  if (used.includes(slug)) return false;
  return used.length >= FREEMIUM_LIMIT;
}

export function shouldGateResource(slug: string): boolean {
  if (isDevMode()) {
    warnDevBypass();
    return false;
  }
  if (isUnlocked()) return false;
  const used = getResourcesDownloaded();
  if (used.includes(slug)) return false;
  return used.length >= FREEMIUM_LIMIT;
}

/**
 * Map any localized tool/resource pathname to a canonical slug.
 * Returns null when the route isn't a gated tool/resource.
 * The same canonical slug is used across languages so the counter is consistent.
 */
const PATH_TO_SLUG: Array<{ test: RegExp; slug: string }> = [
  // Wine list analyzer
  { test: /^\/(analisis-carta|wine-list-analysis|weinkarten-analyse|analyse-carte-vins|analisi-carta-vini|analise-carta-vinhos)\/?$/, slug: "analisis-carta" },
  // Wine margin calculator
  { test: /^\/(calculadora-margen-vino|wine-margin-calculator|wein-margen-rechner|calculateur-marges-vin|calcolatore-margine-vino|calculadora-margem-vinho)\/?$/, slug: "calculadora-margen-vino" },
  // Resources hub + detail pages
  { test: /^\/(recursos|resources|risorse|ressources|ressourcen)(\/.+)?$/, slug: "recursos" },
  // Generic tool routes (any language) /<tools>/<slug>
  { test: /^\/(herramientas|tools|outils|strumenti|ferramentas|werkzeuge)\/([^/]+)\/?$/, slug: "__capture__" },
];

export function getToolSlugFromPath(pathname: string): string | null {
  // Strip language prefix
  const stripped = pathname.replace(/^\/(en|it|fr|de|pt)(?=\/|$)/, "") || "/";
  for (const entry of PATH_TO_SLUG) {
    const m = stripped.match(entry.test);
    if (m) {
      if (entry.slug === "__capture__") {
        // Use the actual sub-slug so each tool counts as distinct
        return `tool:${m[2]}`;
      }
      return entry.slug;
    }
  }
  return null;
}

/**
 * React hook that re-renders when freemium state changes.
 * Returns current counters + helpers.
 */
export function useFreemiumState() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  const unlock = useCallback(() => unlockFreemium(), []);
  return {
    toolsUsed: getToolsUsed(),
    resourcesDownloaded: getResourcesDownloaded(),
    unlocked: isUnlocked(),
    unlock,
  };
}