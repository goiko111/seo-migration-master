import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export async function generateDeckPdf(filename: string) {
  const slides = Array.from(document.querySelectorAll<HTMLElement>(".presentation-slide"));
  if (!slides.length) return;

  const root = document.querySelector<HTMLElement>(".presentation-root");
  const previousCursor = root?.style.cursor;
  if (root) root.style.cursor = "progress";

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

      await new Promise((resolve) => window.setTimeout(resolve, 180));
      const images = Array.from(slide.querySelectorAll<HTMLImageElement>("img"));
      await Promise.all(
        images.map((image) =>
          image.complete && image.naturalWidth > 0
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                image.addEventListener("load", () => resolve(), { once: true });
                image.addEventListener("error", () => resolve(), { once: true });
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

      slide.style.width = previous.width;
      slide.style.height = previous.height;
      slide.style.minHeight = previous.minHeight;

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
    }

    pdf.save(`${filename.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase()}.pdf`);
  } catch (error) {
    console.error("PDF generation failed", error);
  } finally {
    exportStyles.remove();
    if (root) root.style.cursor = previousCursor || "";
  }
}
