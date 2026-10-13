import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const readBotRegex = (relativePath: string) => {
  const source = fs.readFileSync(path.resolve(relativePath), "utf8");
  const match = source.match(/const BOT_REGEX = \/(.+)\/([a-z]*);/);
  if (!match) throw new Error(`BOT_REGEX not found in ${relativePath}`);
  return new RegExp(match[1], match[2]);
};

describe("worker bot detection", () => {
  for (const worker of [
    "cloudflare-worker-v3-hybrid.js",
    "edge-router/winerim-pages-router.js",
  ]) {
    it(`${worker} recognizes Googlebot and OAI SearchBot`, () => {
      const botRegex = readBotRegex(worker);
      expect(botRegex.test("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
      expect(botRegex.test("OAI-SearchBot/1.0")).toBe(true);
      expect(botRegex.test("Mozilla/5.0 Safari/605.1.15")).toBe(false);
    });
  }

  it("redirects obsolete simulator aliases to their canonical routes", () => {
    const source = fs.readFileSync(path.resolve("edge-router/winerim-pages-router.js"), "utf8");
    expect(source).toContain('["/simulador", "/simulador-carta"]');
    expect(source).toContain('["/en/simulador-carta", "/en/wine-list-simulator"]');
    expect(source).toContain('"X-Winerim-Router": "legacy-path-redirect"');
  });

  it("serves the pricing architecture from React for humans and bots", () => {
    const source = fs.readFileSync(path.resolve("edge-router/winerim-pages-router.js"), "utf8");
    expect(source).not.toContain("BACKEND_HUMAN_ROUTES");
    expect(source).toContain('if (path === "/precios-modulos-integraciones")');
    expect(source).toContain("return fetchPricingArchitecturePage(request, env, path, BOT_REGEX.test(ua))");
    expect(source).toContain("Precios, módulos e integraciones de Winerim");
    expect(source).toContain('rewriter.on("body > noscript"');
  });

  it("serves every localized public tool from the versioned React release", () => {
    const source = fs.readFileSync(path.resolve("edge-router/winerim-pages-router.js"), "utf8");
    expect(source).toContain('const TOOL_HUB_ROUTES = new Set(["/herramientas", "/en/tools", "/it/strumenti", "/fr/outils", "/de/tools", "/pt/ferramentas"])');
    expect(source).toContain('const TOOL_ROUTE_PREFIXES = ["/herramientas/", "/en/tools/", "/it/strumenti/", "/fr/outils/", "/de/tools/", "/pt/ferramentas/"]');
    expect(source).toContain("TOOL_ROUTE_PREFIXES.some((prefix) => path.startsWith(prefix))");
  });
});
