import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("integration claims and guided tool entry", () => {
  it("keeps POS availability and sync claims verifiable", () => {
    const integrations = readFileSync("src/pages/Integraciones.tsx", "utf8");
    const features = readFileSync("src/pages/Funcionalidades.tsx", "utf8");
    const provider = readFileSync("src/pages/IntegrationProvider.tsx", "utf8");

    expect(integrations).not.toMatch(/20\+ POS|más de 20 sistemas/i);
    expect(integrations).not.toMatch(/activated in under 48 hours|menos de 48 horas/i);
    expect(integrations).toContain('{ name: "Revo XEF", desc: "Conector sujeto a preflight, permisos, mapeo y piloto de lectura", status: "custom", href: "/integraciones/revo-xef" }');
    expect(integrations).toContain("No asumimos bidireccionalidad ni tiempo real continuo sin validación técnica.");
    expect(provider).toContain("Una conexión técnica no se considera certificada");
    expect(provider).toContain("No confirmamos bidireccionalidad, escritura o tiempo real antes del piloto.");
    for (const suffix of [
      'es: "TPV y datos operativos"',
      'en: "POS and operational data"',
      'it: "POS e dati operativi"',
      'fr: "Caisse et données opérationnelles"',
      'de: "Kassensystem und Betriebsdaten"',
      'pt: "POS e dados operacionais"',
    ]) expect(provider).toContain(suffix);
    expect(provider).toContain('integrationProviderPath("revo-xef", lang)');
    expect(features).not.toContain("evalúa la viabilidad de conexión sin coste adicional");
    expect(features).toContain("Control de stock conectado");
  });

  it("keeps provider detail pages aligned across human routes, bots and sitemap", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const worker = readFileSync("cloudflare-worker-v3-hybrid.js", "utf8");
    const sitemap = readFileSync("supabase/functions/sitemap/index.ts", "utf8");
    const prerender = readFileSync("supabase/functions/prerender/index.ts", "utf8");

    for (const route of [
      "/integraciones/agora",
      "/integraciones/revo-xef",
      "/en/integrations/agora",
      "/en/integrations/revo-xef",
    ]) {
      expect(app).toContain(route);
      expect(worker).toContain(`'${route}'`);
      expect(sitemap).toContain(`esPath: '${route}'`);
      expect(prerender).toContain(`'${route}': {`);
    }
  });

  it("removes unsupported universal integration and outcome claims", () => {
    const about = readFileSync("src/pages/SobreWinerim.tsx", "utf8");
    const purchasing = readFileSync("src/pages/InteligenciaCompras.tsx", "utf8");
    const whatIs = readFileSync("src/pages/WhatIsWinerim.tsx", "utf8");

    expect(about).not.toContain("22+ integraciones TPV disponibles");
    expect(purchasing).not.toContain("los principales TPV del sector");
    expect(whatIs).not.toMatch(/\+30%|\+20%|\+35%/);
    expect(whatIs).toContain("Impacto medible");
    expect(whatIs).toContain("Measurable impact");
  });

  it("defines complete IT, FR, DE and PT integration copy without inheriting English content", () => {
    const integrations = readFileSync("src/pages/Integraciones.tsx", "utf8");

    for (const locale of ["IT", "FR", "DE", "PT"]) {
      expect(integrations).toContain(`const ${locale}: Content = {`);
      expect(integrations).not.toContain(`const ${locale}: Content = { ...EN`);
    }

    for (const englishOnly of [
      "Why it matters",
      "How integration works",
      "Does Winerim integrate with my POS?",
      "Your POS not listed?",
    ]) {
      expect(integrations.split(englishOnly)).toHaveLength(2);
    }

    expect(integrations).toContain("Perché è importante");
    expect(integrations).toContain("Pourquoi c'est important");
    expect(integrations).toContain("Warum das wichtig ist");
    expect(integrations).toContain("Porque é importante");
  });

  it("offers a problem-led route into the existing tools in Spanish and English", () => {
    const tools = readFileSync("src/pages/Herramientas.tsx", "utf8");
    const popup = readFileSync("src/components/ToolsLeadPopup.tsx", "utf8");

    expect(tools).toContain("Herramientas que te ahorran trabajo manual");
    expect(tools).toContain("Tools that reduce manual work");
    expect(tools.indexOf("Calculadora de tiempo operativo recuperable")).toBeLessThan(
      tools.indexOf("Diagnóstico de rentabilidad de bodega"),
    );
    expect(tools.indexOf("Recoverable Operational Time Calculator")).toBeLessThan(
      tools.indexOf("Wine Cellar Profitability Diagnostic"),
    );
    expect(tools).toContain('featured: "Empieza aquí"');
    expect(tools).toContain('/herramientas/calculadora-fuga-margen');
    expect(tools).toContain('/herramientas/calculadora-stock-muerto');
    expect(tools).toContain('/herramientas/auditor-carta-multilocal');
    expect(tools).toContain("const prioritizedTools = prioritizeToolItems(t.tools)");
    expect(tools).toContain("const featuredTools = TIME_SAVING_TOOL_ROUTES");
    expect(tools).toContain("const catalogTools = prioritizedTools");
    expect(popup).not.toContain("herramientas|tools|outils|strumenti|ferramentas|werkzeuge|recursos");
  });

  it("does not load the third-party chat before explicit cookie consent", () => {
    const shell = readFileSync("index.html", "utf8");

    expect(shell).toContain("localStorage.getItem('winerim_cookie_consent') === 'accepted'");
    expect(shell).toContain("window.addEventListener('winerim:cookie-consent-updated', scheduleChat)");
    expect(shell).toContain("body:not([data-winerim-chat-ready]) #wc-toggle");
  });
});
