import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CalculadoraTiempoOperativo from "@/pages/CalculadoraTiempoOperativo";
import { LanguageProvider } from "@/i18n/LanguageProvider";

describe("CalculadoraTiempoOperativo", () => {
  it("shows the full weekly, monthly and annual result without contact capture", () => {
    render(<MemoryRouter><CalculadoraTiempoOperativo /></MemoryRouter>);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Partners" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "¿Cuánto te cuesta gestionar el vino?" })).toBeInTheDocument();
    expect(screen.getAllByText("Minutos por vez (hoy)").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Minutos con Winerim").length).toBeGreaterThan(0);
    expect(screen.getByText(/Los minutos con Winerim aparecen automáticamente/i)).toBeInTheDocument();
    expect(screen.getByText(/semana × 52 ÷ 12/i)).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: /email/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cargar ejemplo ficticio/i }));

    expect(screen.getByText("Tareas calculadas: 10/10")).toBeInTheDocument();
    expect(screen.getByText("Tareas con coste/hora: 10/10")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Valor del tiempo" })).toBeInTheDocument();
    expect(screen.getByText(/coste de oportunidad/i)).toBeInTheDocument();
    expect(screen.getByText("Introducido por ti")).toBeInTheDocument();
    expect(screen.getByText(/No conectados en esta calculadora pública/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver mi diagnóstico de rentabilidad/i })).toHaveAttribute(
      "href",
      "/herramientas/diagnostico-rentabilidad-bodega",
    );
  });

  it("calculates the future scenario automatically and allows tasks to be excluded", () => {
    render(<MemoryRouter><CalculadoraTiempoOperativo /></MemoryRouter>);

    const current = document.getElementById("posItems-currentMinutes") as HTMLInputElement;
    const frequency = document.getElementById("posItems-occurrencesPerWeek") as HTMLInputElement;
    const cost = document.getElementById("posItems-hourlyCost") as HTMLInputElement;

    fireEvent.change(current, { target: { value: "30" } });
    fireEvent.change(frequency, { target: { value: "4" } });
    fireEvent.change(cost, { target: { value: "20" } });

    expect(screen.getAllByText("+1,9 h").length).toBeGreaterThan(0);
    expect(document.getElementById("posItems-winerimMinutes")).toHaveTextContent("1,5 min");
    expect(screen.getByText(/95 % de automatización estimada/i)).toBeInTheDocument();
    expect(screen.getByText(/Con Winerim: 1,5 min\/vez/i)).toBeInTheDocument();

    const deliveryInput = document.getElementById("deliveryNotes-currentMinutes") as HTMLInputElement;
    fireEvent.click(deliveryInput.closest("article")!.querySelector('input[type="checkbox"]')!);
    expect(deliveryInput).toBeDisabled();
  });

  it("uses English copy, USD and localized routes on the English journey", () => {
    render(
      <MemoryRouter initialEntries={["/en/tools/operational-time-calculator"]}>
        <LanguageProvider><CalculadoraTiempoOperativo /></LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "What does it cost to manage your wine operation?" })).toBeInTheDocument();
    expect(screen.getByLabelText("Currency used to value time")).toHaveValue("USD");
    expect(screen.getByText(/week × 52 ÷ 12/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see my profitability diagnostic/i })).toHaveAttribute(
      "href",
      "/en/tools/wine-cellar-profitability-diagnostic",
    );
  });
});
