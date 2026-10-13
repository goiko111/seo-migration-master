import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RentabilidadBodega from "@/pages/RentabilidadBodega";
import { LanguageProvider } from "@/i18n/LanguageProvider";

describe("RentabilidadBodega", () => {
  it("delivers the full result before offering minimal contact capture", () => {
    render(<MemoryRouter><RentabilidadBodega /></MemoryRouter>);

    expect(screen.getByText(/resultado completo aparece antes/i)).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /email profesional/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /cargar ejemplo ficticio/i })[0]);
    expect(screen.getByText(/puedes modificar cada supuesto/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /ver diagnóstico/i }));

    expect(screen.getByText("Margen bruto por botella")).toBeInTheDocument();
    expect(screen.getByText("Beverage Cost por copa")).toBeInTheDocument();
    expect(screen.getByText("Capital en stock lento")).toBeInTheDocument();
    expect(screen.getByText("Cambio de contribución del escenario")).toBeInTheDocument();
    expect(screen.getByText(/Contribución por botella:/)).toBeInTheDocument();
    expect(screen.getByText("Introducido por ti")).toBeInTheDocument();
    expect(screen.getByText("Calculado con tus datos")).toBeInTheDocument();
    expect(screen.getByText(/no conectado en este diagnóstico público/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email profesional/i })).toBeRequired();
    expect(screen.getByRole("checkbox", { name: /use estos datos para responder/i })).toBeRequired();
    expect(screen.getByRole("checkbox", { name: /recibir novedades/i })).not.toBeRequired();
    expect(screen.getAllByRole("link", { name: /ver winerim core/i })[0]).toHaveAttribute("href", "/producto/winerim-core");
    expect(screen.getByRole("link", { name: /ver cloudrim/i })).toHaveAttribute("href", "/producto/cloudrim");
  });

  it("delivers the English USD journey without mixing source types", () => {
    render(
      <MemoryRouter initialEntries={["/en/tools/wine-cellar-profitability-diagnostic"]}>
        <LanguageProvider><RentabilidadBodega /></LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Wine List Profitability Diagnostic" })).toBeInTheDocument();
    expect(screen.getByLabelText("Currency")).toHaveValue("USD");
    expect(screen.getByText(/before any contact details are requested/i)).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /load a fictional example/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /view diagnostic/i }));

    expect(screen.getByText("Gross margin per bottle")).toBeInTheDocument();
    expect(screen.getByText("By-the-glass Beverage Cost")).toBeInTheDocument();
    expect(screen.getByText("Capital in slow stock")).toBeInTheDocument();
    expect(screen.getByText("Scenario contribution change")).toBeInTheDocument();
    expect(screen.getByText("Entered by you")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /work email/i })).toBeRequired();
    expect(screen.getByRole("link", { name: /request a demo/i })).toHaveAttribute("href", "/en/demo");
  });
});
