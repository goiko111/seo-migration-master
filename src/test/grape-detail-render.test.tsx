import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import GrapeDetail from "@/pages/GrapeDetail";
import RegionDetail from "@/pages/RegionDetail";

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

  it("renders localized priority region editorial sections for human users", async () => {
    render(
      <MemoryRouter initialEntries={["/pt/biblioteca-vinho/regioes/portugal/vinho-verde"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/pt/biblioteca-vinho/regioes/:country/:region" element={<RegionDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /Vinho Verde/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Como usar Vinho Verde numa carta/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Papel na carta")).toBeInTheDocument();
    expect(screen.getAllByText("marisco").length).toBeGreaterThan(0);
  });
});
