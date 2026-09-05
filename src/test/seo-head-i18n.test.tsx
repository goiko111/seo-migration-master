import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import SEOHead from "@/components/SEOHead";
import { getWineLibraryHreflang } from "@/data/wineLibraryI18n";

afterEach(() => {
  cleanup();
  document.head.innerHTML = "";
  document.title = "";
});

describe("SEOHead i18n metadata", () => {
  it("keeps a single Winerim suffix when localized page titles already include the brand", async () => {
    render(
      <SEOHead
        title="Tempranillo | Grape guide — Winerim"
        description="Localized grape page."
        url="/en/wine-library/grapes/tempranillo"
      />,
    );

    await waitFor(() => {
      expect(document.title).toBe("Tempranillo | Grape guide | Winerim");
      expect(document.title).not.toContain("Winerim | Winerim");
    });
  });

  it("normalizes simulator titles that use the middle-dot brand separator", async () => {
    render(
      <SEOHead
        title="Wine List Simulator · Winerim"
        description="English simulator page."
        url="/en/wine-list-simulator"
      />,
    );

    await waitFor(() => {
      expect(document.title).toBe("Wine List Simulator | Winerim");
      expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
        "content",
        "Wine List Simulator | Winerim",
      );
      expect(document.querySelector('meta[property="og:locale"]')).toHaveAttribute("content", "en_US");
      expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
        "content",
        "https://winerim.wine/og/winerim-og-en.png",
      );
      expect(document.querySelector('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
      expect(document.querySelector('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
      expect(document.querySelector('meta[property="og:image:alt"]')).toHaveAttribute(
        "content",
        "Winerim, AI wine list software for restaurants",
      );
      expect(document.querySelector('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        "https://winerim.wine/og/winerim-og-en.png",
      );
      expect(document.querySelector('meta[name="twitter:image:alt"]')).toHaveAttribute(
        "content",
        "Winerim, AI wine list software for restaurants",
      );
    });
  });

  it("derives og:locale from the page URL when hreflang alternates are present", async () => {
    render(
      <SEOHead
        title="Weinbibliothek"
        description="German wine-library detail page."
        url="/de/weinbibliothek/rebsorten/tempranillo"
        hreflang={getWineLibraryHreflang("/biblioteca-vino/uvas/tempranillo")}
      />,
    );

    await waitFor(() => {
      expect(document.querySelector('meta[property="og:locale"]')).toHaveAttribute("content", "de_DE");
    });
  });
});
