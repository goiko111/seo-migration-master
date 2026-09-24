import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(
  "/Users/GOIKO/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const baseUrl = process.env.WINERIM_TEST_URL || "http://127.0.0.1:4197";
const sdkUrl = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const browser = await chromium.launch({ headless: true });

try {
  const deniedContext = await browser.newContext();
  const deniedPage = await deniedContext.newPage();
  const deniedOpenAiRequests = [];
  deniedPage.on("request", (request) => {
    if (/https:\/\/bzr(cdn)?\.openai\.com/.test(request.url())) {
      deniedOpenAiRequests.push(request.url());
    }
  });
  await deniedPage.goto(`${baseUrl}/contacto`, { waitUntil: "networkidle" });
  await deniedPage.waitForTimeout(300);
  assert(
    deniedOpenAiRequests.length === 0,
    `Denied/pending consent made OpenAI requests: ${deniedOpenAiRequests.join(", ")}`,
  );
  await deniedContext.close();

  const acceptedContext = await browser.newContext();
  await acceptedContext.addInitScript(() => {
    localStorage.setItem("winerim_cookie_consent", "accepted");
  });
  const acceptedPage = await acceptedContext.newPage();
  const openAiRequests = [];
  const leadPayloads = [];
  const pageErrors = [];
  let leadRequestCount = 0;

  acceptedPage.on("pageerror", (error) => pageErrors.push(error.message));
  acceptedPage.on("request", (request) => {
    if (/https:\/\/bzr(cdn)?\.openai\.com/.test(request.url())) {
      openAiRequests.push(request.url());
    }
  });
  await acceptedPage.route(sdkUrl, async (route) => {
    await route.fulfill({
      contentType: "application/javascript",
      body: `window.__oaiqCaptured = Array.isArray(window.oaiq && window.oaiq.q) ? window.oaiq.q.slice() : [];
window.oaiq = (...args) => window.__oaiqCaptured.push(args);`,
    });
  });
  await acceptedPage.route("**/rest/v1/contact_leads*", async (route) => {
    leadRequestCount += 1;
    leadPayloads.push(route.request().postDataJSON());
    if (leadRequestCount === 1) {
      await route.fulfill({ status: 500, contentType: "application/json", body: '{"message":"retry"}' });
      return;
    }
    await route.fulfill({ status: 201, contentType: "application/json", body: "{}" });
  });
  await acceptedPage.route("**/functions/v1/send-lead-notification*", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await acceptedPage.goto(`${baseUrl}/contacto`, { waitUntil: "networkidle" });
  try {
    await acceptedPage.waitForFunction(() => Array.isArray(window.__oaiqCaptured), null, {
      timeout: 10_000,
    });
  } catch (error) {
    const state = await acceptedPage.evaluate(() => ({
      consent: localStorage.getItem("winerim_cookie_consent"),
      hasQueue: typeof window.oaiq === "function",
      queued: window.oaiq?.q ?? null,
      sdkScripts: [...document.querySelectorAll("script")].map((script) => script.src).filter(Boolean),
      bodyText: document.body.textContent?.slice(0, 200),
    }));
    throw new Error(`SDK mock did not initialize: ${JSON.stringify({ state, openAiRequests, pageErrors })}`, {
      cause: error,
    });
  }
  assert(
    openAiRequests.filter((url) => url === sdkUrl).length === 1,
    `Expected one SDK request, got ${openAiRequests.join(", ")}`,
  );

  await acceptedPage.fill('input[name="restaurant"]', "Browser QA Restaurant");
  await acceptedPage.fill('input[name="name"]', "Browser QA");
  await acceptedPage.selectOption('select[name="position"]', "gerente");
  await acceptedPage.selectOption('select[name="phone_prefix"]', "ES");
  await acceptedPage.fill('input[name="phone"]', "600000000");
  await acceptedPage.fill('input[name="email"]', "browser-qa@example.com");
  await acceptedPage.fill('input[name="city"]', "Madrid");
  await acceptedPage.selectOption('select[name="references_count"]', "40-80");

  await acceptedPage.click('form button[type="submit"]');
  await acceptedPage.waitForFunction(() => document.querySelector('form button[type="submit"]')?.hasAttribute("disabled") === false);
  let measureCalls = await acceptedPage.evaluate(() =>
    window.__oaiqCaptured.filter(([command]) => command === "measure"),
  );
  assert(measureCalls.length === 0, "A failed backend request emitted a lead event");

  await acceptedPage.click('form button[type="submit"]');
  await acceptedPage.waitForURL("**/gracias?tipo=contacto");
  measureCalls = await acceptedPage.evaluate(() =>
    window.__oaiqCaptured.filter(([command]) => command === "measure"),
  );

  assert(leadPayloads.length === 2, `Expected two persistence attempts, got ${leadPayloads.length}`);
  assert(leadPayloads[0].id === leadPayloads[1].id, "Retry did not reuse the stable lead UUID");
  assert(measureCalls.length === 1, `Expected one lead event, got ${measureCalls.length}`);
  assert(measureCalls[0][1] === "lead_created", "Unexpected OpenAI event name");
  assert(measureCalls[0][2]?.type === "customer_action", "Unexpected OpenAI event type");
  assert(
    measureCalls[0][3]?.event_id === `lead_${leadPayloads[0].id}`,
    "OpenAI event_id does not match the persisted lead UUID",
  );

  console.log(JSON.stringify({
    deniedOpenAiRequests: deniedOpenAiRequests.length,
    acceptedSdkRequests: openAiRequests.filter((url) => url === sdkUrl).length,
    persistenceAttempts: leadPayloads.length,
    leadEvents: measureCalls.length,
    retryUsedStableId: leadPayloads[0].id === leadPayloads[1].id,
  }));
  await acceptedContext.close();
} finally {
  await browser.close();
}
