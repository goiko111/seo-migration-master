import { describe, expect, it } from "vitest";
import { parseMarkdownSections, sanitizeArticleMarkdown } from "@/components/article/parseMarkdownSections";

describe("article markdown sanitizer", () => {
  it("removes internal HTML comments before rendering article copy", () => {
    const body = `<!-- winerim-content-expansion-20260713:batch:es -->

Introducción visible.

## Sección

Contenido visible.`;

    expect(sanitizeArticleMarkdown(body)).not.toContain("winerim-content-expansion");
    expect(parseMarkdownSections(body)).toEqual([
      { heading: "", content: "Introducción visible." },
      { heading: "Sección", content: "Contenido visible." },
    ]);
  });

  it("removes malformed secret marker lines defensively", () => {
    const body = `winerim-content-expansion-@secret:TELEGRAM_BOT_TOKEN:es

Texto público.`;

    expect(sanitizeArticleMarkdown(body)).toBe("Texto público.");
  });
});
