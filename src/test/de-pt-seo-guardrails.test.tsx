import { readFileSync } from "node:fs";
import type { ComponentType } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ROUTE_MAP, type SupportedLang } from "@/i18n/types";
import Index from "@/pages/Index";
import Contacto from "@/pages/Contacto";
import Precios from "@/pages/Precios";
import Herramientas from "@/pages/Herramientas";
import CalculadoraFugaMargen from "@/pages/CalculadoraFugaMargen";
import ComparadorDistribuidores from "@/pages/ComparadorDistribuidores";
import SimuladorSenalMargenes from "@/pages/SimuladorSenalMargenes";
import TestPerfilRim from "@/pages/TestPerfilRim";
import SimuladorParetoCarta from "@/pages/SimuladorParetoCarta";
import CalculadoraPrecioCopa from "@/pages/CalculadoraPrecioCopa";
import CalculadoraStockMuerto from "@/pages/CalculadoraStockMuerto";
import CalculadoraTicketMedio from "@/pages/CalculadoraTicketMedio";
import CalculadoraCompraInteligente from "@/pages/CalculadoraCompraInteligente";
import DiagnosticoVinoPorCopa from "@/pages/DiagnosticoVinoPorCopa";
import WineListScore from "@/pages/WineListScore";
import AuditorMultiLocal from "@/pages/AuditorMultiLocal";

const SITE = "https://winerim.wine";

const CRITICAL_LOCALIZED_ROUTES: Array<{
  lang: Extract<SupportedLang, "de" | "pt">;
  esPath: string;
  localizedPath: string;
}> = [
  { lang: "de", esPath: "/", localizedPath: "/de" },
  { lang: "pt", esPath: "/", localizedPath: "/pt" },
  { lang: "de", esPath: "/contacto", localizedPath: "/de/kontakt" },
  { lang: "pt", esPath: "/contacto", localizedPath: "/pt/contacto" },
  { lang: "de", esPath: "/precios", localizedPath: "/de/preise" },
  { lang: "pt", esPath: "/precios", localizedPath: "/pt/precos" },
  { lang: "de", esPath: "/herramientas", localizedPath: "/de/tools" },
  { lang: "pt", esPath: "/herramientas", localizedPath: "/pt/ferramentas" },
  { lang: "de", esPath: "/herramientas/calculadora-fuga-margen", localizedPath: "/de/tools/margenverlust-rechner" },
  { lang: "pt", esPath: "/herramientas/calculadora-fuga-margen", localizedPath: "/pt/ferramentas/calculadora-fuga-margem" },
  { lang: "de", esPath: "/herramientas/comparador-distribuidores", localizedPath: "/de/tools/distributoren-vergleich" },
  { lang: "pt", esPath: "/herramientas/comparador-distribuidores", localizedPath: "/pt/ferramentas/comparador-distribuidores" },
  { lang: "de", esPath: "/herramientas/simulador-senal-margenes", localizedPath: "/de/tools/margensignal-simulator" },
  { lang: "pt", esPath: "/herramientas/simulador-senal-margenes", localizedPath: "/pt/ferramentas/simulador-sinal-margens" },
  { lang: "de", esPath: "/herramientas/test-perfil-rim", localizedPath: "/de/tools/rim-profiltest" },
  { lang: "pt", esPath: "/herramientas/test-perfil-rim", localizedPath: "/pt/ferramentas/teste-perfil-rim" },
  { lang: "de", esPath: "/herramientas/simulador-pareto-carta-vinos", localizedPath: "/de/tools/pareto-weinkarten-simulator" },
  { lang: "pt", esPath: "/herramientas/simulador-pareto-carta-vinos", localizedPath: "/pt/ferramentas/simulador-pareto-carta-vinhos" },
  { lang: "de", esPath: "/herramientas/calculadora-precio-vino-por-copa", localizedPath: "/de/tools/glaspreis-rechner" },
  { lang: "pt", esPath: "/herramientas/calculadora-precio-vino-por-copa", localizedPath: "/pt/ferramentas/calculadora-preco-vinho-por-copo" },
  { lang: "de", esPath: "/herramientas/calculadora-stock-muerto", localizedPath: "/de/tools/totbestand-rechner" },
  { lang: "pt", esPath: "/herramientas/calculadora-stock-muerto", localizedPath: "/pt/ferramentas/calculadora-stock-morto" },
  { lang: "de", esPath: "/herramientas/calculadora-ticket-medio-vino", localizedPath: "/de/tools/durchschnittsbon-rechner" },
  { lang: "pt", esPath: "/herramientas/calculadora-ticket-medio-vino", localizedPath: "/pt/ferramentas/calculadora-ticket-medio" },
  { lang: "de", esPath: "/herramientas/calculadora-compra-inteligente", localizedPath: "/de/tools/intelligenter-einkauf-rechner" },
  { lang: "pt", esPath: "/herramientas/calculadora-compra-inteligente", localizedPath: "/pt/ferramentas/calculadora-compra-inteligente" },
  { lang: "de", esPath: "/herramientas/diagnostico-vino-por-copa", localizedPath: "/de/tools/glasausschank-diagnose" },
  { lang: "pt", esPath: "/herramientas/diagnostico-vino-por-copa", localizedPath: "/pt/ferramentas/diagnostico-vinho-por-copo" },
  { lang: "de", esPath: "/herramientas/wine-list-score", localizedPath: "/de/tools/wine-list-score" },
  { lang: "pt", esPath: "/herramientas/wine-list-score", localizedPath: "/pt/ferramentas/wine-list-score" },
  { lang: "de", esPath: "/herramientas/auditor-carta-multilocal", localizedPath: "/de/tools/multi-standort-auditor" },
  { lang: "pt", esPath: "/herramientas/auditor-carta-multilocal", localizedPath: "/pt/ferramentas/auditor-carta-multilocal" },
];

const ROUTE_COMPONENTS: Record<string, ComponentType> = {
  "/": Index,
  "/contacto": Contacto,
  "/precios": Precios,
  "/herramientas": Herramientas,
  "/herramientas/calculadora-fuga-margen": CalculadoraFugaMargen,
  "/herramientas/comparador-distribuidores": ComparadorDistribuidores,
  "/herramientas/simulador-senal-margenes": SimuladorSenalMargenes,
  "/herramientas/test-perfil-rim": TestPerfilRim,
  "/herramientas/simulador-pareto-carta-vinos": SimuladorParetoCarta,
  "/herramientas/calculadora-precio-vino-por-copa": CalculadoraPrecioCopa,
  "/herramientas/calculadora-stock-muerto": CalculadoraStockMuerto,
  "/herramientas/calculadora-ticket-medio-vino": CalculadoraTicketMedio,
  "/herramientas/calculadora-compra-inteligente": CalculadoraCompraInteligente,
  "/herramientas/diagnostico-vino-por-copa": DiagnosticoVinoPorCopa,
  "/herramientas/wine-list-score": WineListScore,
  "/herramientas/auditor-carta-multilocal": AuditorMultiLocal,
};

const OBVIOUS_SPANISH_FALLBACKS = [
  "Optimiza tu carta de vinos",
  "Prueba gratis estas herramientas",
  "Herramientas gratuitas",
  "Analizar mi carta gratis",
  "Solicitar demo",
  "Calcula cuánto margen",
  "Compara proveedores",
  "Introduce PVP",
  "Descubre si tu restaurante",
  "Detecta qué referencias",
  "¿Y si todo esto fuese automático?",
  "Lassen Sie uns sobre",
];

const renderLocalizedRoute = (path: string, esPath: string) => {
  const Component = ROUTE_COMPONENTS[esPath];

  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Routes>
          <Route path={path} element={<Component />} />
        </Routes>
      </LanguageProvider>
    </MemoryRouter>,
  );
};

const headAlternateUrls = () =>
  [...document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"]')].map((link) => ({
    lang: link.hreflang,
    href: link.href,
  }));

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ posts: [] }), { status: 200 })),
  );
  vi.stubGlobal(
    "ResizeObserver",
    class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  document.documentElement.lang = "";
  document.title = "";
});

describe("DE/PT SEO guardrails", () => {
  it.each(CRITICAL_LOCALIZED_ROUTES)(
    "$localizedPath emits localized html lang, self canonical and full hreflang set",
    async ({ lang, esPath, localizedPath }) => {
      renderLocalizedRoute(localizedPath, esPath);

      await waitFor(() => {
        expect(document.documentElement).toHaveAttribute("lang", lang);
        expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${localizedPath}`);
      });

      const alternates = headAlternateUrls();
      expect(alternates).toHaveLength(7);
      expect(alternates).toContainEqual({ lang, href: `${SITE}${localizedPath}` });
      expect(alternates).toContainEqual({ lang: "x-default", href: `${SITE}${esPath}` });
    },
  );

  it("keeps ROUTE_MAP aligned with the DE/PT routes covered by the guardrail", () => {
    for (const { lang, esPath, localizedPath } of CRITICAL_LOCALIZED_ROUTES) {
      expect(ROUTE_MAP[lang][esPath]).toBe(localizedPath);
    }
  });

  it.each(CRITICAL_LOCALIZED_ROUTES)(
    "$localizedPath does not render obvious Spanish fallback phrases in the main localized surface",
    async ({ esPath, localizedPath }) => {
      renderLocalizedRoute(localizedPath, esPath);

      await waitFor(() => {
        expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}${localizedPath}`);
      });

      const renderedText = document.body.textContent?.replace(/\s+/g, " ") || "";
      const leakedPhrases = OBVIOUS_SPANISH_FALLBACKS.filter((phrase) => renderedText.includes(phrase));

      expect(leakedPhrases).toEqual([]);
    },
  );

  it("keeps the React footer pointing Spanish legal links at the long canonical legal slugs", () => {
    const footer = readFileSync("src/components/Footer.tsx", "utf8");

    expect(footer).toContain('lang === "es" ? "/politica-privacidad" : localePath("/privacidad")');
    expect(footer).toContain('lang === "es" ? "/terminos-y-condiciones-del-contrato" : localePath("/terminos")');
    expect(footer).not.toContain('lang === "es" ? "/privacidad"');
    expect(footer).not.toContain('lang === "es" ? "/terminos"');
  });
});
