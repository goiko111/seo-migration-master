import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import GrapeDetail from "@/pages/GrapeDetail";
import RegionDetail from "@/pages/RegionDetail";
import StyleDetail from "@/pages/StyleDetail";
import PairingDetail from "@/pages/PairingDetail";

const readSchemaGraph = (id: string) => {
  const schema = JSON.parse(document.getElementById(id)?.textContent || "{}");
  return schema["@graph"] as Array<Record<string, unknown>>;
};

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

  it("emits enriched grape schema and clarifies Muscadet as grape versus region", async () => {
    render(
      <MemoryRouter initialEntries={["/de/weinbibliothek/rebsorten/muscadet"]}>
        <LanguageProvider>
          <Routes>
            <Route path="/de/weinbibliothek/rebsorten/:grape" element={<GrapeDetail />} />
          </Routes>
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: /Melon de Bourgogne|Muscadet/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Muscadet als die Rebsorte Melon de Bourgogne/i)).toBeInTheDocument();

    await waitFor(() => expect(document.getElementById("grape-detail-jsonld")).toBeTruthy());
    const schema = JSON.parse(document.getElementById("grape-detail-jsonld")?.textContent || "{}");
    const graph = schema["@graph"] as Array<Record<string, unknown>>;
    const term = graph.find((node) => node["@type"] === "DefinedTerm" && String(node["@id"]).includes("#grape-term"));
    const article = graph.find((node) => node["@type"] === "Article");
    const properties = term?.additionalProperty as Array<Record<string, string>>;
    const mentions = article?.mentions as Array<Record<string, string>>;

    expect(term?.alternateName).toContain("Muscadet");
    expect(properties.some((property) => property.name === "Countries" && property.value.includes("Frankreich"))).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/de/weinbibliothek/regionen/francia/muscadet"))).toBe(true);
    expect(graph.some((node) => node["@type"] === "FAQPage")).toBe(false);
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

  it("emits enriched region schema with strategic mentions", async () => {
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
    await waitFor(() => expect(document.getElementById("region-detail-jsonld")).toBeTruthy());

    const graph = readSchemaGraph("region-detail-jsonld");
    const term = graph.find((node) => node["@type"] === "DefinedTerm" && String(node["@id"]).includes("#region-term"));
    const article = graph.find((node) => node["@type"] === "Article");
    const properties = term?.additionalProperty as Array<Record<string, string>>;
    const mentions = article?.mentions as Array<Record<string, string>>;

    expect(graph.some((node) => node["@type"] === "WebPage")).toBe(true);
    expect(graph.some((node) => node["@type"] === "DefinedTermSet")).toBe(true);
    expect(term?.additionalType).toBe("Wine region or denomination");
    expect(properties.some((property) => property.name === "Country" && property.value.includes("Portugal"))).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/pt/biblioteca-vinho/castas/albarino"))).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/pt/biblioteca-vinho/harmonizacoes/pescados-y-mariscos"))).toBe(true);
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

  it("emits enriched style schema with strategic mentions", async () => {
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
    await waitFor(() => expect(document.getElementById("style-detail-jsonld")).toBeTruthy());

    const graph = readSchemaGraph("style-detail-jsonld");
    const term = graph.find((node) => node["@type"] === "DefinedTerm" && String(node["@id"]).includes("#style-term"));
    const article = graph.find((node) => node["@type"] === "Article");
    const properties = term?.additionalProperty as Array<Record<string, string>>;
    const mentions = article?.mentions as Array<Record<string, string>>;

    expect(graph.some((node) => node["@type"] === "WebPage")).toBe(true);
    expect(graph.some((node) => node["@type"] === "DefinedTermSet")).toBe(true);
    expect(term?.additionalType).toBe("Wine style");
    expect(properties.some((property) => property.name === "Serving temperature")).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/de/weinbibliothek/regionen/francia/champagne"))).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/de/weinbibliothek/rebsorten/chardonnay"))).toBe(true);
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

  it("emits enriched pairing schema with strategic mentions", async () => {
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
    await waitFor(() => expect(document.getElementById("pairing-detail-jsonld")).toBeTruthy());

    const graph = readSchemaGraph("pairing-detail-jsonld");
    const term = graph.find((node) => node["@type"] === "DefinedTerm" && String(node["@id"]).includes("#pairing-term"));
    const article = graph.find((node) => node["@type"] === "Article");
    const properties = term?.additionalProperty as Array<Record<string, string>>;
    const mentions = article?.mentions as Array<Record<string, string>>;

    expect(graph.some((node) => node["@type"] === "WebPage")).toBe(true);
    expect(graph.some((node) => node["@type"] === "DefinedTermSet")).toBe(true);
    expect(term?.additionalType).toBe("Wine pairing");
    expect(properties.some((property) => property.name === "Recommended styles")).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/pt/biblioteca-vinho/castas/albarino"))).toBe(true);
    expect(mentions.some((mention) => mention.url.includes("/pt/biblioteca-vinho/regioes/espana/rias-baixas"))).toBe(true);
  });
});
