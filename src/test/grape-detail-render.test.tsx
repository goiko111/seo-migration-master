import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import GrapeDetail from "@/pages/GrapeDetail";
import RegionDetail from "@/pages/RegionDetail";
import StyleDetail from "@/pages/StyleDetail";
import PairingDetail from "@/pages/PairingDetail";

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

  it("renders localized operational depth for grape pages without a specific editorial profile", async () => {
    render(
      <MemoryRouter initialEntries={["/pt/biblioteca-vinho/castas/airen"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/pt/biblioteca-vinho/castas/:grape" element={<GrapeDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /Airén/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Como usar Airén numa carta real/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Papel na carta")).toBeInTheDocument();
    expect(screen.getByText(/Ligue Airén a regiões, estilos e harmonizações/i)).toBeInTheDocument();
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

  it("renders localized priority style editorial sections for human users", async () => {
    render(
      <MemoryRouter initialEntries={["/de/weinbibliothek/weinstile/espumoso"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/de/weinbibliothek/weinstile/:style" element={<StyleDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /Schaumwein/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Wie Schaumwein auf der Weinkarte verkauft wird/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Rolle auf der Weinkarte")).toBeInTheDocument();
    expect(screen.getAllByText("Austern").length).toBeGreaterThan(0);
  });

  it("renders localized priority pairing editorial sections for human users", async () => {
    render(
      <MemoryRouter initialEntries={["/pt/biblioteca-vinho/harmonizacoes/lubina-dorada"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/pt/biblioteca-vinho/harmonizacoes/:pairing" element={<PairingDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /Harmonização com Peixe Branco/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Como vender Harmonização com Peixe Branco em sala/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Papel da harmonizacao")).toBeInTheDocument();
    expect(screen.getAllByText("robalo").length).toBeGreaterThan(0);
  });
});
