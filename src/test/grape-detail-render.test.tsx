import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import GrapeDetail from "@/pages/GrapeDetail";

describe("grape detail rendering", () => {
  it("renders localized grape detail pages for human users", async () => {
    render(
      <MemoryRouter initialEntries={["/de/weinbibliothek/rebsorten/tempranillo"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/de/weinbibliothek/rebsorten/:grape" element={<GrapeDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /Tempranillo/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Service-Intelligenz/i, level: 2 })).toBeInTheDocument();
  });
});
