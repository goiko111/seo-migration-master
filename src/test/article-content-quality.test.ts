import { describe, expect, it } from "vitest";
import { getArticleBySlug } from "@/data/articles";

describe("article content quality", () => {
  it("keeps alex-peiro as a substantive indexable interview fallback", () => {
    const article = getArticleBySlug("alex-peiro");
    expect(article).toBeDefined();

    const wordCount = article.body.trim().split(/\s+/).length;
    expect(wordCount).toBeGreaterThan(500);
    expect(article.body).not.toMatch(/Contenido pendiente|URL original|no está disponible actualmente/i);
    expect(article.body).toContain("[biblioteca del vino](/biblioteca-vino)");
    expect(article.body).toContain("[uva](/biblioteca-vino/uvas)");
    expect(article.body).toContain("[región](/biblioteca-vino/regiones)");
    expect(article.body).toContain("[maridaje](/biblioteca-vino/maridajes)");
    expect(article.body).toContain("[software de carta de vinos](/software-carta-de-vinos)");
  });
});
