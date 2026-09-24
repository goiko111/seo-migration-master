import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { persistLeadAndMeasure } from "@/lib/leadSubmission";
import { resetOpenAIAdsForTests } from "@/lib/openaiAds";

const insertMock = vi.hoisted(() => vi.fn());

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({ insert: insertMock })),
  },
}));

type PixelQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

const measureCalls = () =>
  (((window.oaiq as PixelQueue | undefined)?.q ?? []).filter(
    ([command]) => command === "measure",
  ));

const lead = {
  email: "measurement-test@example.com",
  form_type: "demo",
};

beforeEach(() => {
  insertMock.mockReset();
  resetOpenAIAdsForTests();
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem("winerim_cookie_consent", "accepted");
  delete window.oaiq;
  document
    .querySelectorAll("script[data-winerim-openai-ads]")
    .forEach((script) => script.remove());
});

describe("lead persistence and ChatGPT Ads measurement", () => {
  it("measures exactly once after the backend confirms persistence", async () => {
    insertMock.mockResolvedValueOnce({ error: null });

    const result = await persistLeadAndMeasure("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", lead);

    expect(result).toEqual({ ok: true, duplicate: false, error: null });
    expect(insertMock).toHaveBeenCalledWith({
      ...lead,
      id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    });
    expect(measureCalls()).toEqual([
      [
        "measure",
        "lead_created",
        { type: "customer_action" },
        { event_id: "lead_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" },
      ],
    ]);
  });

  it("does not measure when persistence fails", async () => {
    insertMock.mockResolvedValueOnce({ error: { code: "500", message: "failed" } });

    const result = await persistLeadAndMeasure("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", lead);

    expect(result.ok).toBe(false);
    expect(measureCalls()).toHaveLength(0);
  });

  it("measures once after a failed request is retried successfully", async () => {
    insertMock
      .mockResolvedValueOnce({ error: { code: "NETWORK", message: "retry" } })
      .mockResolvedValueOnce({ error: null });

    await persistLeadAndMeasure("cccccccc-cccc-4ccc-8ccc-cccccccccccc", lead);
    await persistLeadAndMeasure("cccccccc-cccc-4ccc-8ccc-cccccccccccc", lead);

    expect(measureCalls()).toHaveLength(1);
  });

  it("does not duplicate measurement when a persisted lead is retried", async () => {
    insertMock
      .mockResolvedValueOnce({ error: null })
      .mockResolvedValueOnce({ error: { code: "23505", message: "duplicate" } });

    const first = await persistLeadAndMeasure("dddddddd-dddd-4ddd-8ddd-dddddddddddd", lead);
    const retry = await persistLeadAndMeasure("dddddddd-dddd-4ddd-8ddd-dddddddddddd", lead);

    expect(first.ok).toBe(true);
    expect(retry).toEqual({ ok: true, duplicate: true, error: null });
    expect(measureCalls()).toHaveLength(1);
  });

  it("keeps every real contact/demo form behind the persistence helper", () => {
    for (const file of [
      "src/pages/Contacto.tsx",
      "src/pages/Demo.tsx",
      "src/pages/MetaDemoLanding.tsx",
    ]) {
      const source = readFileSync(file, "utf8");
      expect(source).toContain("persistLeadAndMeasure(");
      expect(source).not.toContain('.from("contact_leads").insert');
    }
  });
});
