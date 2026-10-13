import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Afiliate from "@/pages/Afiliate";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { PARTNER_LANDING_COPY } from "@/data/partnerLandingCopy";

const renderPage = (path = "/afiliate") => render(
  <MemoryRouter initialEntries={[path]}>
    <LanguageProvider><Afiliate /></LanguageProvider>
  </MemoryRouter>,
);

describe("partner landing", () => {
  it("replaces unsupported partner claims with two input-led calculations", () => {
    renderPage();

    expect(screen.getByRole("heading", { name: "Añade valor a las visitas comerciales que ya haces" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "1. Valor operativo para un cliente" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Encaje y capacidad de mi cartera" })).toBeInTheDocument();
    expect(screen.queryByText("10%")).not.toBeInTheDocument();
    expect(screen.queryByText("25-30%")).not.toBeInTheDocument();
    expect(screen.queryByText(/casos reales/i)).not.toBeInTheDocument();

    fireEvent.change(document.getElementById("partner-client-currentHoursPerWeek")!, { target: { value: "8" } });
    fireEvent.change(document.getElementById("partner-client-scenarioHoursPerWeek")!, { target: { value: "5" } });
    fireEvent.change(document.getElementById("partner-client-hourlyCost")!, { target: { value: "20" } });
    expect(screen.getByText("+156 h")).toBeInTheDocument();
    expect(screen.getByText(/3120/)).toBeInTheDocument();

    fireEvent.change(document.getElementById("partner-portfolio-activeAccounts")!, { target: { value: "80" } });
    fireEvent.change(document.getElementById("partner-portfolio-monthlyReachRate")!, { target: { value: "25" } });
    fireEvent.change(document.getElementById("partner-portfolio-qualificationRate")!, { target: { value: "20" } });
    fireEvent.change(document.getElementById("partner-portfolio-hoursPerConversation")!, { target: { value: "1,5" } });
    fireEvent.change(document.getElementById("partner-portfolio-availableHoursPerMonth")!, { target: { value: "8" } });
    expect(screen.getByText("La dedicación cabe en tu disponibilidad declarada.")).toBeInTheDocument();
    expect(screen.getByText("+2 h")).toBeInTheDocument();
  });

  it("keeps negative client time visible instead of inflating the result", () => {
    renderPage();
    fireEvent.change(document.getElementById("partner-client-currentHoursPerWeek")!, { target: { value: "4" } });
    fireEvent.change(document.getElementById("partner-client-scenarioHoursPerWeek")!, { target: { value: "5" } });
    expect(screen.getByText("El escenario añade tiempo")).toBeInTheDocument();
    expect(screen.getByText("-52 h")).toBeInTheDocument();
  });

  it("uses localized English copy, route metadata and USD by default", () => {
    renderPage("/en/affiliate");
    expect(screen.getByRole("heading", { name: "Add value to the sales visits you already make" })).toBeInTheDocument();
    expect(screen.getByLabelText("Currency")).toHaveValue("USD");
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getAllByRole("link", { name: /open the full task calculator/i })[0]).toHaveAttribute("href", "/en/tools/operational-time-calculator");
  });

  it("defines native secondary content for all six supported languages", () => {
    for (const lang of ["it", "fr", "de", "pt"] as const) {
      const copy = PARTNER_LANDING_COPY[lang];
      expect(copy.fitItems).not.toEqual(PARTNER_LANDING_COPY.en.fitItems);
      expect(copy.noFitItems).not.toEqual(PARTNER_LANDING_COPY.en.noFitItems);
      expect(copy.supportItems).not.toEqual(PARTNER_LANDING_COPY.en.supportItems);
      expect(copy.processSteps).not.toEqual(PARTNER_LANDING_COPY.en.processSteps);
      expect(copy.prepareItems).not.toEqual(PARTNER_LANDING_COPY.en.prepareItems);
      expect(copy.faqs).not.toEqual(PARTNER_LANDING_COPY.en.faqs);
    }
  });

  it.each([
    ["/it/affiliati", "Aprire gli strumenti in italiano", "/it/strumenti"],
    ["/fr/affilies", "Ouvrir les outils en français", "/fr/outils"],
    ["/de/partner", "Werkzeuge auf Deutsch öffnen", "/de/tools"],
    ["/pt/afiliados", "Abrir ferramentas em português", "/pt/ferramentas"],
  ])("keeps the partner tool journey localized on %s", (path, label, href) => {
    renderPage(path);
    expect(screen.getAllByRole("link", { name: label })[0]).toHaveAttribute("href", href);
  });
});
