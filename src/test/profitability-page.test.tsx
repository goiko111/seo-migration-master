import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RentabilidadBodega from "@/pages/RentabilidadBodega";
import { LanguageProvider } from "@/i18n/LanguageProvider";

describe("RentabilidadBodega", () => {
  it("delivers the complete result before asking for contact", () => {
    render(
      <MemoryRouter>
        <RentabilidadBodega />
      </MemoryRouter>,
    );

    expect(screen.getByText(/resultado antes de decidir/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /solicitar una demo/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /cargar ejemplo ficticio/i })[0]);
    expect(screen.getByText(/puedes modificar todos sus supuestos/i)).toBeInTheDocument();
    expect(screen.getByText(/ver fórmula y criterio/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /ver diagnóstico/i }));
    expect(screen.getByText("Ahorro de costes potencial")).toBeInTheDocument();
    expect(screen.getByText("Margen bruto de contribución adicional")).toBeInTheDocument();
    expect(screen.getByText("Capacidad operativa recuperable")).toBeInTheDocument();
    expect(screen.getByText("Capital circulante potencialmente liberable")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /solicitar una demo/i })).toHaveAttribute("href", "/demo");
    expect(document.querySelector('input[type="email"]')).toBeNull();
  });

  it("delivers the English USD journey without mixing the four measures", () => {
    render(
      <MemoryRouter initialEntries={["/en/tools/wine-cellar-profitability-diagnostic"]}>
        <LanguageProvider>
          <RentabilidadBodega />
        </LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Wine Cellar Profitability Diagnostic" })).toBeInTheDocument();
    expect(screen.getByLabelText("Currency")).toHaveValue("USD");
    expect(screen.getByText(/before deciding whether to speak with Winerim/i)).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /load a fictional example/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /view diagnostic/i }));

    expect(screen.getByText("Potential purchasing cost reduction")).toBeInTheDocument();
    expect(screen.getByText("Additional gross contribution margin")).toBeInTheDocument();
    expect(screen.getByText("Recoverable operational capacity")).toBeInTheDocument();
    expect(screen.getByText("Working capital potentially released")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request a demo/i })).toHaveAttribute("href", "/en/demo");
  });
});
