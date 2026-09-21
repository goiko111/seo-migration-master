import { readFileSync } from "node:fs";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import {
  COMMERCIAL_CAPACITY_INTRO,
  COMMERCIAL_EXPANSION_MESSAGE,
  COMMERCIAL_INCLUDED_CAPACITY,
  COMMERCIAL_PRICING,
  COMMERCIAL_PAYMENT_LINKS,
  COMMERCIAL_REVO_PRICING,
  COMMERCIAL_TOP_UPS,
  COMMERCIAL_USAGE_EQUIVALENCE,
} from "@/data/commercialProposal";
import PresentationLegacy from "@/pages/PresentationLegacy";
import CommercialProposal from "@/pages/CommercialProposal";
import GenericCommercialProposal from "@/pages/GenericCommercialProposal";
import RevoCommercialProposal from "@/pages/RevoCommercialProposal";

const snapshotSlides = (root: HTMLElement) => [...root.querySelectorAll(".presentation-slide")].map((slide) => ({
  text: slide.textContent,
  structure: [...slide.querySelectorAll("*")].map((node) => [node.tagName, node.getAttribute("class")]),
  images: [...slide.querySelectorAll("img")].map((node) => [node.getAttribute("src"), node.getAttribute("alt")]),
}));

describe("Neutral commercial proposal release", () => {
  it("integrates six product-evidence slides into the 24-page story and starts the proposal on page 25", () => {
    const general = render(
      <MemoryRouter initialEntries={["/presentacion"]}>
        <LanguageProvider><PresentationLegacy variant="current" /></LanguageProvider>
      </MemoryRouter>,
    );
    const baseline = snapshotSlides(general.container);
    general.unmount();

    const proposal = render(
      <MemoryRouter initialEntries={["/propuesta-comercial"]}>
        <LanguageProvider><CommercialProposal /></LanguageProvider>
      </MemoryRouter>,
    );
    const result = snapshotSlides(proposal.container);

    expect(baseline).toHaveLength(24);
    expect(result).toHaveLength(34);
    const customizedPages = [9, 14, 17, 18, 20, 21];
    result.slice(0, 24).forEach((slide, index) => {
      if (customizedPages.includes(index + 1)) expect(slide).not.toEqual(baseline[index]);
      else expect(slide).toEqual(baseline[index]);
    });
    expect(result[8].text).toContain("permanecen inactivas");
    expect(result[13].text).toContain("Conexión controlada y trazabilidad verificable");
    expect(result[16].text).toContain("Cada venta alimenta la siguiente decisión");
    expect(result[17].text).toContain("capital inmovilizado");
    expect(result[19].text).toContain("solo lectura");
    expect(result[20].text).toContain("Prototipo funcional");
    expect(customizedPages.flatMap((page) => result[page - 1].images)).toHaveLength(15);
    expect(result[24].text).toContain("Carta de vinos, inteligencia operativa e integración con Ágora");
    expect(result[25].text).toContain("Alcance de la propuesta");
    expect(result[25].text).toContain("Carta Inteligente");
    expect(result[25].text).toContain("Carta Architect");
    expect(result[25].text).toContain("Gestión de grupos");
    expect(result[26].text).toContain("Capacidad incluida para la operativa diaria");
    expect(result[27].text).toContain("Sin sorpresas en la factura");
    expect(result[27].text).toContain("Ampliaciones para picos puntuales");
    expect(result[27].text).toContain("Pack completo");
    expect(result[28].text).toContain("Cómo se computa el uso");
    expect(result[28].text).toContain("Consumo de SAVia");
    expect(result[28].text).toContain("Consumo de conciliaciones");
    expect(result[29].text).toContain("Perímetro técnico y puesta en marcha");
    expect(result[31].text).toContain("Condiciones esenciales y validez");
    expect(result[32].text).toContain("Selecciona la modalidad de cada servicio");
    expect(result[32].text).toContain("los dos deben seleccionarse en la misma modalidad");
    expect(result[32].text).not.toContain("Ampliación puntual opcional");
    expect(result[32].text).not.toContain("Importe recurrente seleccionado");
    expect(result[33].text).toContain("Datos del cliente y aceptación");
    expect(result[33].text).not.toMatch(/Saddle/i);
    const slides = proposal.container.querySelectorAll(".presentation-slide");
    expect(slides[13].className).toContain("bg-[hsl(140_2%_8%)]");
    expect(slides[24].className).toContain("bg-cream");
    expect(proposal.container.querySelectorAll("nav button")).toHaveLength(34);
    expect(proposal.container.querySelectorAll("h1")).toHaveLength(1);
    const radios = slides[32].querySelectorAll<HTMLInputElement>('input[type="radio"]');
    expect(radios).toHaveLength(6);
    expect(slides[26].querySelector("a[data-pdf-link]")).toBeNull();
    fireEvent.click(radios[1]);
    expect(radios[1].checked).toBe(true);
    fireEvent.click(radios[4]);
    expect(radios[4].checked).toBe(true);
    let paymentLink = slides[32].querySelector<HTMLAnchorElement>("a[data-pdf-link]");
    expect(paymentLink?.href).toBe(COMMERCIAL_PAYMENT_LINKS.monthly.both.href);
    expect(paymentLink?.textContent).toContain("350 € + IVA");
    fireEvent.click(radios[2]);
    expect(radios[2].checked).toBe(true);
    expect(radios[5].checked).toBe(true);
    paymentLink = slides[32].querySelector<HTMLAnchorElement>("a[data-pdf-link]");
    expect(paymentLink?.href).toBe(COMMERCIAL_PAYMENT_LINKS.annual.both.href);
    expect(paymentLink?.textContent).toContain("3.000 € + IVA");
    proposal.unmount();
  });

  it("contains the exact commercial amounts and transparent document limits", () => {
    expect(COMMERCIAL_PRICING).toEqual([
      ["Winerim", "175 € + IVA / mes", "1.500 € + IVA / año", "125 € + IVA / mes", "600 €"],
      ["Integración Winerim–Ágora", "175 € + IVA / mes", "1.500 € + IVA / año", "125 € + IVA / mes", "600 €"],
      ["Ambos servicios", "350 € + IVA / mes", "3.000 € + IVA / año", "250 € + IVA / mes", "1.200 €"],
    ]);
    expect(COMMERCIAL_INCLUDED_CAPACITY.map((row) => row[1])).toEqual(["100 créditos", "100 créditos", "30 unidades"]);
    expect(COMMERCIAL_TOP_UPS).toContainEqual(["Pack completo", "100 documentos + 100 SAVia + 30 conciliaciones", "79 € + IVA"]);
    expect(COMMERCIAL_CAPACITY_INTRO).toContain("dimensionadas para cubrir la operativa habitual");
    expect(COMMERCIAL_USAGE_EQUIVALENCE).toContain("equivale orientativamente");
    expect(COMMERCIAL_EXPANSION_MESSAGE).toContain("No son necesarias para acceder a las funcionalidades ordinarias");
    expect(COMMERCIAL_PAYMENT_LINKS.annual.integration.href).toBe("https://pagos.winerim.wine/p/jzyxpx");
  });

  it("is opt-in, noindex, untracked and absent from public navigation and sitemap", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const page = readFileSync("src/pages/CommercialProposal.tsx", "utf8");
    const data = readFileSync("src/data/commercialProposal.ts", "utf8");
    const shell = readFileSync("index.html", "utf8");
    const worker = readFileSync("edge-router/winerim-pages-router.js", "utf8");

    expect(app).toContain('import.meta.env.VITE_COMMERCIAL_PRESENTATION === "true"');
    expect(page).toContain("canonicalPath={audience.canonicalPath}");
    expect(page).toContain("noindex");
    expect(page).toContain("suppressTracking");
    expect(app).not.toContain('"/presentacion/saddle"');
    expect(shell).not.toMatch(/Saddle/i);
    expect(page).not.toMatch(/Saddle/i);
    expect(data).not.toMatch(/Saddle/i);
    expect(worker).toContain('const LEGACY_CLIENT_ROUTE = "/presentacion/saddle"');
    expect(worker).toContain('Location: "https://winerim.wine/propuesta-comercial"');
    expect(worker).toContain('const COMMERCIAL_ASSET_PREFIX = "/commercial-assets/"');
    expect(worker).toContain("env.COMMERCIAL_ORIGIN");
    for (const file of ["public/sitemap.xml", "supabase/functions/sitemap/index.ts"]) {
      expect(readFileSync(file, "utf8")).not.toContain("/propuesta-comercial");
    }
  });

  it("renders a generic commercial proposal without client references", () => {
    const generic = render(
      <MemoryRouter initialEntries={["/propuesta-comercial"]}>
        <LanguageProvider><GenericCommercialProposal /></LanguageProvider>
      </MemoryRouter>,
    );
    const slides = generic.container.querySelectorAll(".presentation-slide");
    expect(slides).toHaveLength(34);
    expect(generic.container.textContent).not.toMatch(/Saddle/i);
    expect(slides[24].textContent).toContain("Propuesta comercial y condiciones");
    expect(slides[32].querySelectorAll('input[data-pdf-field][type="radio"]')).toHaveLength(6);
    expect(slides[32].querySelectorAll(".commercial-pdf-payment-links a[data-pdf-link]")).toHaveLength(6);
    generic.unmount();
  });

  it("renders a separate REVO proposal with the shared pricing and checkout links", () => {
    const revo = render(
      <MemoryRouter initialEntries={["/propuesta-comercial-revo"]}>
        <LanguageProvider><RevoCommercialProposal /></LanguageProvider>
      </MemoryRouter>,
    );
    const slides = revo.container.querySelectorAll(".presentation-slide");
    expect(slides).toHaveLength(34);
    expect(revo.container.textContent).not.toMatch(/Ágora/i);
    expect(slides[13].textContent).toContain("Integración con REVO");
    expect(slides[24].textContent).toContain("integración con REVO");
    expect(slides[29].textContent).toContain("Revo XEF");
    expect(slides[30].textContent).toContain("175 € + IVA / mes");
    expect(slides[30].textContent).toContain("1.500 € + IVA / año");
    expect(slides[32].querySelectorAll('input[data-pdf-field][type="radio"]')).toHaveLength(6);
    expect(slides[32].querySelectorAll(".commercial-pdf-payment-links a[data-pdf-link]")).toHaveLength(6);
    expect(revo.container.querySelectorAll(".commercial-product-shot img")).toHaveLength(14);
    expect(revo.container.querySelector('img[src*="08-monitor-tpv-anonimizado"]')).toBeNull();
    const radios = slides[32].querySelectorAll<HTMLInputElement>('input[type="radio"]');
    fireEvent.click(radios[1]);
    fireEvent.click(radios[4]);
    const monthlyLink = slides[32].querySelector<HTMLAnchorElement>(".commercial-payment-result a");
    expect(monthlyLink?.href).toBe(COMMERCIAL_PAYMENT_LINKS.monthly.both.href);
    fireEvent.click(radios[2]);
    expect(slides[32].querySelectorAll('input[value="annual"]:checked')).toHaveLength(2);
    const annualLink = slides[32].querySelector<HTMLAnchorElement>(".commercial-payment-result a");
    expect(annualLink?.href).toBe(COMMERCIAL_PAYMENT_LINKS.annual.both.href);
    expect(COMMERCIAL_REVO_PRICING[1][1]).toBe("175 € + IVA / mes");
    revo.unmount();
  });

  it("keeps unsupported commitments out of the offer", () => {
    const page = readFileSync("src/pages/CommercialProposal.tsx", "utf8");
    const data = readFileSync("src/data/commercialProposal.ts", "utf8");
    const offer = `${page}\n${data}`;
    expect(offer).not.toMatch(/tiempo real garantizado|disponibilidad garantizada|fee de onboarding/i);
    expect(offer).not.toMatch(/ilimitad/i);
    expect(offer).not.toContain("Límites de procesamiento transparentes");
    expect(offer).toContain("Sin sorpresas en la factura");
    expect(offer).toContain("nunca activa ni factura una ampliación sin aceptación previa");
    expect(offer).toContain("No se garantiza tiempo real continuo");
    expect(offer).toContain("sin aprobación humana");
    expect(offer).toContain("Esta propuesta no fija permanencia, cuota de alta, SLA, renovación automática ni otros costes");
    expect(page.match(/Razón social:/g)).toHaveLength(1);
    expect(page).not.toContain("Representante y cargo: según datos indicados arriba");
  });
});
