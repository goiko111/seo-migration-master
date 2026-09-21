import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("integration claims and guided tool entry", () => {
  it("keeps POS availability and sync claims verifiable", () => {
    const integrations = readFileSync("src/pages/Integraciones.tsx", "utf8");
    const features = readFileSync("src/pages/Funcionalidades.tsx", "utf8");

    expect(integrations).not.toMatch(/20\+ POS|más de 20 sistemas/i);
    expect(integrations).not.toMatch(/activated in under 48 hours|menos de 48 horas/i);
    expect(integrations).toContain('{ name: "Revo XEF", desc: "Conector sujeto a preflight, permisos, mapeo y piloto de lectura", status: "custom" }');
    expect(integrations).toContain("No asumimos bidireccionalidad ni tiempo real continuo sin validación técnica.");
    expect(features).not.toContain("evalúa la viabilidad de conexión sin coste adicional");
    expect(features).toContain("Control de stock conectado");
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

    expect(tools).toContain("¿Qué quieres mejorar primero?");
    expect(tools).toContain("What do you want to improve first?");
    expect(tools).toContain('/herramientas/calculadora-fuga-margen');
    expect(tools).toContain('/herramientas/calculadora-stock-muerto');
    expect(tools).toContain('/herramientas/auditor-carta-multilocal');
  });

  it("does not load the third-party chat before explicit cookie consent", () => {
    const shell = readFileSync("index.html", "utf8");

    expect(shell).toContain("localStorage.getItem('winerim_cookie_consent') === 'accepted'");
    expect(shell).toContain("window.addEventListener('winerim:cookie-consent-updated', scheduleChat)");
    expect(shell).toContain("body:not([data-winerim-chat-ready]) #wc-toggle");
  });
});
