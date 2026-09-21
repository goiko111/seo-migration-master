import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { calculateCataloniaQuote, CATALONIA_PILOT_GATES } from "@/data/cataloniaProposal";
import { createCurrentCommercialContent } from "@/data/presentationStory";
import { PRESENTATION_CONTENT as legacy } from "@/data/presentationLegacyContent";
import { PRESENTATION_CONTENT as current } from "@/data/presentationContent";
import { reviewSpanishCapabilities, reviewSpanishDepth } from "@/data/presentationReview";
import { PRESENTATION_CAPABILITY_DEPTH } from "@/data/presentationCapabilityDepth";

describe("Catalonia negotiated proposal", () => {
  it.each([[1,100],[5,100],[6,95],[10,95],[11,90],[15,90],[16,85],[25,85]])("applies the reached rate to all %i restaurants", (count, rate) => {
    expect(calculateCataloniaQuote(count, 0)).toMatchObject({rate,winerim:count*rate,total:count*rate});
  });
  it("prices the confirmed pilot at175 before VAT", () => {
    expect(calculateCataloniaQuote(1,1)).toMatchObject({winerim:100,revo:75,total:175});
  });
  it("counts POS independently from restaurants", () => {
    expect(calculateCataloniaQuote(6,8)?.total).toBe(1170);
  });
  it.each([[0,0],[-1,1],[1,-1],[1.5,0],[1,0.5],[NaN,1],[Infinity,1],[Number.MAX_SAFE_INTEGER,1]])("rejects invalid inputs %s/%s", (restaurants, pos) => {
    expect(calculateCataloniaQuote(restaurants,pos)).toBeNull();
  });
  it("retains verification gates, not a production integration claim", () => {
    expect(CATALONIA_PILOT_GATES).toHaveLength(4);
    expect(CATALONIA_PILOT_GATES[2].body).toContain("no se duplica");
  });
  it("is opt-in, noindex and absent from public sitemap and navigation", () => {
    const app = readFileSync("src/App.tsx","utf8");
    const page = readFileSync("src/pages/CataloniaPresentation.tsx","utf8");
    expect(app).toContain('import.meta.env.VITE_CATALONIA_PRESENTATION === "true"');
    expect(app).toContain('{CataloniaPresentation && <Route');
    expect(page).toContain("noindex");
    for (const file of ["public/sitemap.xml","supabase/functions/sitemap/index.ts"]) {
      expect(readFileSync(file,"utf8")).not.toContain("/presentacion/catalonia");
    }
    expect(page).not.toMatch(/sin permanencia|gratis|gratuit|garantizamos/i);
    expect(page).toContain("Duración y permanencia pendientes");
    expect(page).toContain('<PresentationLegacy variant="current"');
    expect(page).toContain('appendix={{ label:');
    expect(page).not.toContain('cat-hero');
  });
});

describe("reviewed general presentation", () => {
  it("qualifies advanced modules without mutating their original source", () => {
    const original = JSON.stringify([current.es,PRESENTATION_CAPABILITY_DEPTH.es]);
    expect(reviewSpanishCapabilities(current.es).cloudrim.caption).toContain("pendientes");
    expect(reviewSpanishDepth(PRESENTATION_CAPABILITY_DEPTH.es).savia.approval).toContain("Gate:");
    expect(JSON.stringify([current.es,PRESENTATION_CAPABILITY_DEPTH.es])).toBe(original);
  });
  it("removes absolute claims in the reviewed Spanish base story without changing archive or other locales", () => {
    const baseline = JSON.stringify(legacy);
    const reviewed = createCurrentCommercialContent("es",legacy.es,current.es);
    const text = JSON.stringify(reviewed);
    expect(text).not.toMatch(/sin conteos manuales|primera plataforma|vino perfecto|Predice qué etiquetas|Sin desabastecimiento|cuestión de días/i);
    expect(reviewed.s11Items[3].body).toContain("validación");
    expect(JSON.stringify(legacy)).toBe(baseline);
    expect(createCurrentCommercialContent("en",legacy.en,current.en)).toBe(legacy.en);
  });
});
