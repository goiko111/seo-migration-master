const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const LOCAL = process.env.SADDLE_URL || "http://127.0.0.1:4195/presentacion/saddle";
const LOCAL_GENERAL = process.env.GENERAL_URL || "http://127.0.0.1:4195/presentacion";
const LIVE_GENERAL = "https://winerim.wine/presentacion";
const OUT = path.resolve(process.env.EVIDENCE_DIR || "evidence/commercial-browser");

async function slideSnapshot(page, limit) {
  const slides = page.locator(".presentation-slide");
  const count = Math.min(await slides.count(), limit ?? Number.POSITIVE_INFINITY);
  const result = [];
  for (let index = 0; index < count; index += 1) {
    const slide = slides.nth(index);
    result.push({
      text: (await slide.innerText()).replace(/\s+/g, " ").trim(),
      images: await slide.locator("img").evaluateAll((elements) => elements.map((element) => [
        element.getAttribute("alt"),
      ])),
      structure: await slide.locator("*").evaluateAll((elements) => elements.map((element) => [
        element.tagName, element.getAttribute("class"),
      ])),
    });
  }
  return result;
}

async function inspectViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
  await page.goto(LOCAL, { waitUntil: "networkidle" });
  await page.locator(".presentation-slide").nth(33).waitFor({ state: "visible" });

  const geometry = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    slides: [...document.querySelectorAll(".presentation-slide")].map((slide, index) => {
      const section = slide.getBoundingClientRect();
      const content = slide.firstElementChild?.getBoundingClientRect();
      return {
        index: index + 1,
        height: Math.round(section.height),
        contentBottomOverflow: content ? Math.max(0, Math.round(content.bottom - section.bottom)) : 0,
        scrollWidth: slide.scrollWidth,
        clientWidth: slide.clientWidth,
      };
    }),
  }));

  for (const index of [8, 13, 16, 17, 19, 20, 24, 27, 32, 33]) {
    const slide = page.locator(".presentation-slide").nth(index);
    await slide.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, `${name}-slide-${index + 1}.png`) });
  }

  const metadata = await page.evaluate(() => {
    const text = document.body.innerText.replace(/\s+/g, " ");
    const normalizedText = text.toLocaleLowerCase("es");
    return {
      title: document.title,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: document.querySelector('meta[name="robots"]')?.content,
      presentationEvents: (window.dataLayer || []).filter((item) => item.event === "presentation_view").length,
      chatDisabled: window.__WINERIM_CHAT_DISABLED__ === true,
      contractChecks: {
        productEvidence: normalizedText.includes("conexión controlada y trazabilidad verificable")
          && normalizedText.includes("prototipo funcional") && normalizedText.includes("permanecen inactivas"),
        saviaGuardrail: text.includes("Funciona en solo lectura")
          && text.includes("no aplica cambios ni envía pedidos sin revisión y aprobación humana"),
        scope: text.includes("Alcance de la propuesta") && text.includes("No se incluye desarrollo a medida salvo acuerdo escrito"),
        documents: text.includes("Cómo se computa el uso") && text.includes("Sin doble consumo"),
        agora: text.includes("Perímetro técnico y puesta en marcha") && text.includes("No se garantiza tiempo real continuo"),
        prices: text.includes("175 € + IVA / mes") && text.includes("3.000 € + IVA / año") && text.includes("1.200 €"),
        conditions: text.includes("Esta propuesta no fija permanencia, cuota de alta, SLA, renovación automática ni otros costes"),
        acceptance: text.includes("Selecciona la modalidad de cada servicio") && text.includes("Datos del cliente y aceptación"),
        periodicity: text.includes("los dos deben seleccionarse en la misma modalidad"),
      },
    };
  });
  const result = {
    name,
    viewport,
    slideCount: await page.locator(".presentation-slide").count(),
    navButtonCount: await page.locator("nav button").count(),
    metadata,
    geometry,
    consoleErrors,
  };
  await page.close();
  return result;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto(LOCAL, { waitUntil: "networkidle" });
  const localFirst24 = await slideSnapshot(localPage, 24);
  await localPage.close();

  const localGeneralPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localGeneralPage.goto(LOCAL_GENERAL, { waitUntil: "networkidle" });
  const localGeneralFirst24 = await slideSnapshot(localGeneralPage, 24);
  const localGeneralCount = await localGeneralPage.locator(".presentation-slide").count();
  await localGeneralPage.close();

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto(LIVE_GENERAL, { waitUntil: "networkidle" });
  const liveFirst24 = await slideSnapshot(livePage, 24);
  const liveCount = await livePage.locator(".presentation-slide").count();
  await livePage.close();

  const expectedCustomizedSlides = [9, 14, 17, 18, 20, 21];
  const customizedAgainstLive = localFirst24
    .map((local, index) => JSON.stringify(local) !== JSON.stringify(liveFirst24[index]) ? index + 1 : null)
    .filter(Boolean);
  const customizedAgainstBundle = localFirst24
    .map((local, index) => JSON.stringify(local) !== JSON.stringify(localGeneralFirst24[index]) ? index + 1 : null)
    .filter(Boolean);
  const results = {
    parity: {
      liveGeneralSlides: liveCount,
      localGeneralSlides: localGeneralCount,
      expectedCustomizedSlides,
      customizedAgainstLive,
      customizedAgainstBundle,
      customizedSlidesMatchPlan: JSON.stringify(customizedAgainstLive) === JSON.stringify(expectedCustomizedSlides)
        && JSON.stringify(customizedAgainstBundle) === JSON.stringify(expectedCustomizedSlides),
      generalBundleEqual: JSON.stringify(localGeneralFirst24) === JSON.stringify(liveFirst24),
    },
    viewports: [
      await inspectViewport(browser, "desktop", { width: 1440, height: 900 }),
      await inspectViewport(browser, "mobile", { width: 390, height: 844 }),
    ],
  };
  await browser.close();

  fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));

  if (results.parity.liveGeneralSlides !== 24 || results.parity.localGeneralSlides !== 24
    || !results.parity.customizedSlidesMatchPlan || !results.parity.generalBundleEqual) process.exitCode = 1;
  for (const viewport of results.viewports) {
    if (viewport.slideCount !== 34 || viewport.navButtonCount !== 34) process.exitCode = 1;
    if (viewport.metadata.canonical !== "https://winerim.wine/presentacion/saddle") process.exitCode = 1;
    if (viewport.metadata.robots !== "noindex, follow") process.exitCode = 1;
    if (viewport.metadata.presentationEvents !== 0 || !viewport.metadata.chatDisabled) process.exitCode = 1;
    if (Object.values(viewport.metadata.contractChecks).some((value) => !value)) process.exitCode = 1;
    if (viewport.geometry.documentScrollWidth > viewport.geometry.viewportWidth) process.exitCode = 1;
    if (viewport.geometry.slides.slice(24).some((slide) => slide.scrollWidth > slide.clientWidth)) process.exitCode = 1;
    if (viewport.consoleErrors.length) process.exitCode = 1;
  }
  const desktopAppendices = results.viewports[0].geometry.slides.slice(24);
  if (desktopAppendices.some((slide) => slide.contentBottomOverflow > 0)) process.exitCode = 1;
})();
