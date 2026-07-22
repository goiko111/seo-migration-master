import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  PRESENTATION_CONTENT,
  PRESENTATION_ROUTE,
} from "@/data/presentationContent";
import { PRESENTATION_CONTENT as LEGACY_PRESENTATION_CONTENT } from "@/data/presentationLegacyContent";
import { createCurrentCommercialContent, getCommercialSlideLabels } from "@/data/presentationStory";
import { PRESENTATION_CAPABILITY_DEPTH } from "@/data/presentationCapabilityDepth";

const languages = ["es", "en", "fr", "it", "de", "pt"] as const;

describe("multilingual Winerim presentation", () => {
  it("publishes a dedicated route and complete 14-slide story in every language", () => {
    expect(new Set(Object.values(PRESENTATION_ROUTE)).size).toBe(languages.length);

    for (const language of languages) {
      const content = PRESENTATION_CONTENT[language];
      expect(PRESENTATION_ROUTE[language]).toMatch(/^\//);
      expect(content.cover.title.length).toBeGreaterThan(20);
      expect(content.challenge.items).toHaveLength(4);
      expect(content.flow.steps).toHaveLength(4);
      expect(content.cloudrim.items).toHaveLength(4);
      expect(content.core.items).toHaveLength(4);
      expect(content.cellar.items).toHaveLength(3);
      expect(content.performance.items).toHaveLength(4);
      expect(content.groups.items).toHaveLength(4);
      expect(content.pricing.plans).toHaveLength(6);
      expect(content.rollout.steps).toHaveLength(4);
    }
  });

  it("keeps every product capability visible in every localized deck", () => {
    for (const language of languages) {
      const serialized = JSON.stringify(PRESENTATION_CONTENT[language]);
      for (const capability of [
        "CloudRIM",
        "SAVia",
        "RIMs",
        "Wine Cellar",
        "Wine Lockers",
        "Winerim Supply",
      ]) {
        expect(serialized).toContain(capability);
      }
    }
  });

  it("uses the current six-module price architecture", () => {
    for (const language of languages) {
      const plans = PRESENTATION_CONTENT[language].pricing.plans;
      expect(plans.map((plan) => plan.name)).toHaveLength(6);
      expect(plans.map((plan) => plan.annual)).toEqual(
        expect.arrayContaining([
          expect.stringContaining("99"),
          expect.stringContaining("75"),
          expect.stringContaining("179"),
          expect.stringContaining("249"),
          expect.stringContaining("349"),
          expect.stringContaining("599"),
        ]),
      );
      expect(plans.map((plan) => plan.monthly)).toEqual(
        expect.arrayContaining([
          expect.stringContaining("150"),
          expect.stringContaining("99"),
          expect.stringContaining("220"),
          expect.stringContaining("299"),
          expect.stringContaining("425"),
          expect.stringContaining("799"),
        ]),
      );
    }
  });

  it("keeps human routes and Worker prerender aligned", () => {
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const worker = readFileSync(resolve(process.cwd(), "cloudflare-worker-v3-hybrid.js"), "utf8");

    for (const route of Object.values(PRESENTATION_ROUTE)) {
      expect(app).toContain(`path="${route}"`);
      expect(worker).toContain(`'${route}':`);
    }

    for (const capability of ["CloudRIM", "SAVia", "RIMs", "Wine Cellar", "Wine Lockers"])
      expect(worker).toContain(capability);
  });

  it("recovers presentation and partner deck chunks after a stale failed import", () => {
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");

    expect(app).toContain("const lazyRouteWithRetry");
    expect(app).toContain('url.searchParams.set("__bundle_retry"');
    expect(app).toContain('const Presentation = lazyRouteWithRetry(() => import("./pages/Presentation"))');
    expect(app).toContain('const PresentationLegacy = lazyRouteWithRetry(() => import("./pages/PresentationLegacy"))');
    expect(app).toContain('const PartnerDeck = lazyRouteWithRetry(() => import("./pages/PartnerDeck"))');
    expect(app).toContain("!hideGlobalConversionChrome && <CookieConsent />");
  });

  it("keeps the previous presentation available as a private archive", () => {
    const app = readFileSync(resolve(process.cwd(), "src/App.tsx"), "utf8");
    const router = readFileSync(resolve(process.cwd(), "edge-router/winerim-pages-router.js"), "utf8");
    const legacy = readFileSync(resolve(process.cwd(), "src/pages/PresentationLegacy.tsx"), "utf8");
    const legacyContent = readFileSync(resolve(process.cwd(), "src/data/presentationLegacyContent.ts"), "utf8");

    expect(app).toContain('path="/presentacion-anterior"');
    expect(router).toContain('"/presentacion-anterior"');
    expect(legacyContent).toContain("La reVINOlución de la carta de vinos");
    expect(legacy).toContain("noindex");
  });

  it("uses the approved legacy story as the current presentation and appends the new capabilities", () => {
    const currentPage = readFileSync(resolve(process.cwd(), "src/pages/Presentation.tsx"), "utf8");
    const legacyPage = readFileSync(resolve(process.cwd(), "src/pages/PresentationLegacy.tsx"), "utf8");

    expect(currentPage).toContain('<PresentationLegacy variant="current" />');
    expect(legacyPage).toContain('variant?: "archive" | "current"');
    expect(legacyPage).toContain("currentT.flow");
    expect(legacyPage).toContain("currentT.cloudrim");
    expect(legacyPage).toContain("currentT.cellar");
    expect(legacyPage).toContain("depthT.margins");
    expect(legacyPage).toContain("depthT.rims");
    expect(legacyPage).toContain("depthT.savia");
    expect(legacyPage).toContain("depthT.supply");
    expect(legacyPage).not.toContain("currentT.pricing");
    expect(legacyPage).toContain("!embedded && !includesUpdates");

    expect(getCommercialSlideLabels(
      LEGACY_PRESENTATION_CONTENT.es,
      PRESENTATION_CONTENT.es,
      { includesUpdates: true, embedded: false },
    )).toHaveLength(24);
    expect(getCommercialSlideLabels(
      LEGACY_PRESENTATION_CONTENT.es,
      PRESENTATION_CONTENT.es,
      { includesUpdates: true, embedded: true },
    )).toHaveLength(23);
  });

  it("uses one CloudRIM product capture in the presentation and product page", () => {
    const presentation = readFileSync(resolve(process.cwd(), "src/pages/PresentationLegacy.tsx"), "utf8");
    const cloudrim = readFileSync(resolve(process.cwd(), "src/pages/CloudRim.tsx"), "utf8");

    expect(presentation.match(/src=\{cloudrimInbox\}/g)).toHaveLength(1);
    expect(presentation).not.toContain("cloudrimUpload");
    expect(cloudrim).toContain('import cloudrimInbox from "@/assets/feature-cloudrim-inbox-current.webp"');
    expect(cloudrim).toContain("src={cloudrimInbox}");
  });

  it("gives margins, Supply, RIMs and SAVia dedicated depth in every language", () => {
    for (const language of languages) {
      const depth = PRESENTATION_CAPABILITY_DEPTH[language];
      expect(depth.cloudrimFlow).toHaveLength(5);
      expect(depth.margins.items).toHaveLength(4);
      expect(depth.supply.items).toHaveLength(4);
      expect(depth.rims.items).toHaveLength(6);
      expect(depth.savia.questions).toHaveLength(4);
      expect(depth.savia.steps).toHaveLength(3);
    }
  });

  it("does not reintroduce English fallback blocks in FR, IT, DE or PT", () => {
    for (const language of ["fr", "it", "de", "pt"] as const) {
      const content = createCurrentCommercialContent(
        language,
        LEGACY_PRESENTATION_CONTENT[language],
        PRESENTATION_CONTENT[language],
      );
      expect(content.s5Title).toBe(PRESENTATION_CONTENT[language].performance.title);
      expect(content.s7Title).toBe(PRESENTATION_CONTENT[language].flow.title);
      expect(content.s10Title).toBe(PRESENTATION_CONTENT[language].cellar.title);
      expect(content.sMgmtTitle).toBe(PRESENTATION_CONTENT[language].intelligence.title);
      expect(content.s12Title).toBe(PRESENTATION_CONTENT[language].rollout.title);
      expect(content.s13Title).toBe(PRESENTATION_CONTENT[language].proof.title);
    }
  });
});
