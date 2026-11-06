import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ capture: vi.fn(), output: vi.fn(() => new Blob(["%PDF-1.3"], { type: "application/pdf" })) }));
vi.mock("html2canvas-pro", () => ({ default: mocks.capture }));
vi.mock("jspdf", () => ({ default: class {
  internal = { pageSize: { getWidth: () => 297, getHeight: () => 210 } };
  addPage() {}
  addImage() {}
  output = mocks.output;
} }));

import { generateDeckPdf, deliverDeckPdf } from "@/lib/generateDeckPdf";

beforeEach(() => {
  document.body.innerHTML = '<div class="presentation-root"><section class="presentation-slide" style="width: 80%; height: 600px"></section></div>';
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  HTMLElement.prototype.scrollIntoView = vi.fn();
  mocks.capture.mockResolvedValue({ width: 1600, height: 900, toDataURL: () => "data:image/jpeg;base64,dGVzdA==" });
});
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); document.body.innerHTML = ""; });

describe("presentation PDF export", () => {
  it("prepares a PDF without triggering delivery and reports completion", async () => {
    const progress = vi.fn();
    const result = await generateDeckPdf("Winerim EN", { prepareOnly: true, onProgress: progress });
    expect(result.filename).toBe("winerim-en.pdf");
    expect(result.blob.type).toBe("application/pdf");
    expect(result.blob.size).toBeGreaterThan(0);
    expect(progress).toHaveBeenLastCalledWith(1, 1);
  });

  it("restores dimensions and propagates capture failure for retry", async () => {
    mocks.capture.mockRejectedValueOnce(new Error("capture failed"));
    await expect(generateDeckPdf("Winerim", { prepareOnly: true })).rejects.toThrow("capture failed");
    expect(document.querySelector<HTMLElement>(".presentation-slide")?.style.width).toBe("80%");
    expect(document.querySelector<HTMLElement>(".presentation-slide")?.style.height).toBe("600px");
    expect(document.querySelector("#winerim-pdf-export-style")).toBeNull();
  });

  it("does not hang indefinitely on an image that never loads", async () => {
    vi.useFakeTimers();
    const image = document.createElement("img");
    image.loading = "lazy";
    Object.defineProperty(image, "complete", { value: false });
    document.querySelector(".presentation-slide")?.appendChild(image);
    const result = generateDeckPdf("Winerim", { prepareOnly: true });
    await vi.advanceTimersByTimeAsync(10_000);
    expect((await result).blob.size).toBeGreaterThan(0);
    expect(image.loading).toBe("lazy");
  });

  it("starts a prepared download and keeps its URL alive until the browser receives it", async () => {
    vi.useFakeTimers();
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: vi.fn(() => "blob:pdf") });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    await deliverDeckPdf({ blob: new Blob(["%PDF"], { type: "application/pdf" }), filename: "winerim.pdf" });
    expect(click).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(30_000);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:pdf");
  });
});