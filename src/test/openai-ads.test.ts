import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  initializeOpenAIAds,
  isOpenAIAdsEligiblePath,
  measureOpenAILeadCreated,
  OPENAI_ADS_PIXEL_ID,
  OPENAI_ADS_SDK_URL,
  resetOpenAIAdsForTests,
  updateOpenAIAdsConsent,
} from "@/lib/openaiAds";

type PixelQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

const queuedCalls = () => ((window.oaiq as PixelQueue | undefined)?.q ?? []);
const sdkScripts = () =>
  [...document.querySelectorAll<HTMLScriptElement>("script[data-winerim-openai-ads]")];

beforeEach(() => {
  resetOpenAIAdsForTests();
  localStorage.clear();
  sessionStorage.clear();
  delete window.oaiq;
  sdkScripts().forEach((script) => script.remove());
});

afterEach(() => {
  delete window.oaiq;
  sdkScripts().forEach((script) => script.remove());
});

describe("OpenAI Ads Pixel", () => {
  it("queues denied consent before one global init and makes no SDK request", () => {
    initializeOpenAIAds(false);
    initializeOpenAIAds(false);

    expect(queuedCalls()).toEqual([
      ["consent", false],
      ["init", { pixelId: OPENAI_ADS_PIXEL_ID, debug: true }],
    ]);
    expect(sdkScripts()).toHaveLength(0);
    expect(measureOpenAILeadCreated("lead_denied")).toBe(false);
    expect(queuedCalls().filter(([command]) => command === "measure")).toHaveLength(0);
  });

  it("loads the official SDK once after consent is granted", () => {
    localStorage.setItem("winerim_cookie_consent", "accepted");

    initializeOpenAIAds(true);
    initializeOpenAIAds(true);

    expect(queuedCalls().filter(([command]) => command === "init")).toHaveLength(1);
    expect(sdkScripts()).toHaveLength(1);
    expect(sdkScripts()[0].src).toBe(OPENAI_ADS_SDK_URL);
    expect(queuedCalls()).toContainEqual(["consent", true]);
  });

  it("loads the SDK when a pending visitor accepts later", () => {
    initializeOpenAIAds(false);
    expect(sdkScripts()).toHaveLength(0);

    updateOpenAIAdsConsent(true);

    expect(queuedCalls().slice(0, 3)).toEqual([
      ["consent", false],
      ["init", { pixelId: OPENAI_ADS_PIXEL_ID, debug: true }],
      ["consent", true],
    ]);
    expect(sdkScripts()).toHaveLength(1);
  });

  it("emits one standard lead event with a stable event id", () => {
    localStorage.setItem("winerim_cookie_consent", "accepted");

    expect(measureOpenAILeadCreated("lead_123")).toBe(true);
    expect(measureOpenAILeadCreated("lead_123")).toBe(false);

    expect(queuedCalls().filter(([command]) => command === "measure")).toEqual([
      [
        "measure",
        "lead_created",
        { type: "customer_action" },
        { event_id: "lead_123" },
      ],
    ]);
  });

  it("keeps measurement off private proposal and administration surfaces", () => {
    expect(isOpenAIAdsEligiblePath("/")).toBe(true);
    expect(isOpenAIAdsEligiblePath("/contacto")).toBe(true);
    expect(isOpenAIAdsEligiblePath("/demo")).toBe(true);
    expect(isOpenAIAdsEligiblePath("/meta-demo")).toBe(true);
    expect(isOpenAIAdsEligiblePath("/admin")).toBe(false);
    expect(isOpenAIAdsEligiblePath("/propuesta-comercial")).toBe(false);
    expect(isOpenAIAdsEligiblePath("/presentacion/saddle")).toBe(false);
  });
});
