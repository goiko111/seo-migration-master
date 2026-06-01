import { describe, expect, it } from "vitest";
import { articleDbSlugForLang, inferArticleLangFromSlug, localizedArticlePath, stripArticleLangSuffix } from "@/lib/articleRoutes";

describe("articleRoutes", () => {
  it("keeps Spanish article routes unprefixed", () => {
    expect(localizedArticlePath("biblioteca-vino-restaurante-vender-mas", "es")).toBe("/article/biblioteca-vino-restaurante-vender-mas");
    expect(articleDbSlugForLang("biblioteca-vino-restaurante-vender-mas", "es")).toBe("biblioteca-vino-restaurante-vender-mas");
  });

  it("uses localized article routes without leaking suffixes to URLs", () => {
    expect(localizedArticlePath("biblioteca-vino-restaurante-vender-mas_en", "en")).toBe("/en/article/biblioteca-vino-restaurante-vender-mas");
    expect(localizedArticlePath("maridajes-carta-vinos-rentable_de", "de")).toBe("/de/article/maridajes-carta-vinos-rentable");
    expect(articleDbSlugForLang("maridajes-carta-vinos-rentable", "pt")).toBe("maridajes-carta-vinos-rentable_pt");
  });

  it("normalizes legacy suffixed slugs", () => {
    expect(stripArticleLangSuffix("uvas-regiones-equipo-sala-vender-vino_fr")).toBe("uvas-regiones-equipo-sala-vender-vino");
    expect(inferArticleLangFromSlug("uvas-regiones-equipo-sala-vender-vino_fr")).toBe("fr");
    expect(inferArticleLangFromSlug("uvas-regiones-equipo-sala-vender-vino")).toBeNull();
  });
});
