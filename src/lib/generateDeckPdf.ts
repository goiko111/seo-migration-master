import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export type DeckPdfFile = { blob: Blob; filename: string };

export async function deliverDeckPdf({ blob, filename }: DeckPdfFile) {
  const file = new File([blob], filename, { type: blob.type });
  if (matchMedia("(pointer: coarse)").matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename });
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export async function generateDeckPdf(
  filename: string,
  options: { prepareOnly?: boolean; onProgress?: (completed: number, total: number) => void } = {},
): Promise<DeckPdfFile> {
  const slides = Array.from(document.querySelectorAll<HTMLElement>(".presentation-slide"));
  if (!slides.length) throw new Error("No presentation slides available");

  const root = document.querySelector<HTMLElement>(".presentation-root");
  const previousCursor = root?.style.cursor;
  const previousScroll = root?.scrollTop;
  const previousWindowScroll = window.scrollY;
  const previousSnap = root?.style.scrollSnapType;
  const previousBehavior = root?.style.scrollBehavior;
  if (root) root.style.cursor = "progress";
  if (root) {
    root.style.scrollSnapType = "none";
    root.style.scrollBehavior = "auto";
  }

  const exportStyles = document.createElement("style");
  exportStyles.id = "winerim-pdf-export-style";
  exportStyles.textContent = `
    .presentation-slide * {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(exportStyles);

  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  try {
    options.onProgress?.(0, slides.length);
    await document.fonts?.ready;
    for (let index = 0; index < slides.length; index += 1) {
      const slide = slides[index];
      slide.scrollIntoView({ behavior: "auto", block: "start" });
      const previous = {
        width: slide.style.width,
        height: slide.style.height,
        minHeight: slide.style.minHeight,
      };
      slide.style.width = "1600px";
      slide.style.height = "900px";
      slide.style.minHeight = "900px";

      try {
      const images = Array.from(slide.querySelectorAll<HTMLImageElement>("img"));
      await Promise.all(
        images.map((image) =>
          image.complete && image.naturalWidth > 0
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                const loading = image.loading;
                const finish = () => {
                  window.clearTimeout(timeout);
                  image.removeEventListener("load", finish);
                  image.removeEventListener("error", finish);
                  image.loading = loading;
                  resolve();
                };
                const timeout = window.setTimeout(finish, 10_000);
                image.addEventListener("load", finish, { once: true });
                image.addEventListener("error", finish, { once: true });
                image.loading = "eager";
                if (image.complete) finish();
              }),
        ),
      );

      const canvas = await html2canvas(slide, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1600,
        windowHeight: 900,
      });

      const ratio = canvas.width / canvas.height;
      let width = pageWidth;
      let height = width / ratio;
      if (height > pageHeight) {
        height = pageHeight;
        width = height * ratio;
      }
      if (index > 0) pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.86),
        "JPEG",
        (pageWidth - width) / 2,
        (pageHeight - height) / 2,
        width,
        height,
      );
      canvas.width = 0;
      canvas.height = 0;
      options.onProgress?.(index + 1, slides.length);
      } finally {
        slide.style.width = previous.width;
        slide.style.height = previous.height;
        slide.style.minHeight = previous.minHeight;
      }
    }

    const result = {
      blob: pdf.output("blob"),
      filename: `${filename.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase()}.pdf`,
    };
    if (!options.prepareOnly) await deliverDeckPdf(result);
    return result;
  } finally {
    exportStyles.remove();
    if (root) {
      root.style.cursor = previousCursor || "";
      root.scrollTop = previousScroll || 0;
      root.style.scrollSnapType = previousSnap || "";
      root.style.scrollBehavior = previousBehavior || "";
    }
    window.scrollTo({ top: previousWindowScroll, behavior: "instant" });
  }
}
