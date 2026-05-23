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
