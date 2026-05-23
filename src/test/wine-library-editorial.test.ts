import { describe, expect, it } from "vitest";
import { getGrapeEditorialProfile, priorityGrapeSlugs } from "@/data/wineLibraryEditorial";

describe("wine library editorial profiles", () => {
  it("defines priority service profiles for the first editorial tranche", () => {
    expect(priorityGrapeSlugs).toContain("tempranillo");
    expect(priorityGrapeSlugs).toContain("albarino");
    expect(priorityGrapeSlugs).toContain("godello");
    expect(priorityGrapeSlugs).toHaveLength(10);
  });

  it("localizes service intelligence for de and pt priority grapes", () => {
    const de = getGrapeEditorialProfile("tempranillo", "de", "Tempranillo");
    const pt = getGrapeEditorialProfile("albarino", "pt", "Albariño");

    expect(de?.eyebrow).toBe("Service-Intelligenz");
    expect(de?.sections.some((section) => section.body.includes("Vertrauen"))).toBe(true);
    expect(pt?.eyebrow).toBe("Inteligencia de servico");
    expect(pt?.menuHooks).toContain("marisco");
  });

  it("keeps the editorial layer localized in it and fr", () => {
    const it = getGrapeEditorialProfile("chardonnay", "it", "Chardonnay");
    const fr = getGrapeEditorialProfile("riesling", "fr", "Riesling");

    expect(it?.eyebrow).toBe("Intelligenza di servizio");
    expect(it?.sections.some((section) => section.title === "Ruolo in carta")).toBe(true);
    expect(it?.sections.some((section) => section.body.includes("Global white"))).toBe(false);
    expect(fr?.eyebrow).toBe("Intelligence de service");
    expect(fr?.sections.some((section) => section.title === "Role en carte")).toBe(true);
    expect(fr?.sections.some((section) => section.body.includes("Discovery white"))).toBe(false);
  });
});
