import { useEffect, useState, useCallback } from "react";

export const FREEMIUM_LIMIT = 2;

const KEY_TOOLS = "winerim_tools_used";
const KEY_RESOURCES = "winerim_resources_downloaded";
const KEY_UNLOCKED = "winerim_freemium_unlocked";
const EVT = "winerim:freemium-change";

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
  if (isUnlocked()) return false;
  const used = getToolsUsed();
  if (used.includes(slug)) return false;
  return used.length >= FREEMIUM_LIMIT;
}

export function shouldGateResource(slug: string): boolean {
  if (isUnlocked()) return false;
  const used = getResourcesDownloaded();
  if (used.includes(slug)) return false;
  return used.length >= FREEMIUM_LIMIT;
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