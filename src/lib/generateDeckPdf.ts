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
    .commercial-pdf-payment-links {
      display: block !important;
      margin-top: 8px !important;
      padding-top: 7px !important;
      border-top: 1px solid rgba(113, 0, 10, 0.2) !important;
    }
    .commercial-pdf-payment-links h3,
    .commercial-pdf-payment-links p {
      margin: 0 0 4px !important;
    }
    .commercial-pdf-payment-links > div {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 4px 8px !important;
    }
    .commercial-pdf-payment-links a {
      color: #71000a !important;
      font-size: 10px !important;
      text-decoration: underline !important;
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
      const slideRect = slide.getBoundingClientRect();
      const linkAreas = Array.from(slide.querySelectorAll<HTMLAnchorElement>("a[data-pdf-link][href]"))
        .map((anchor) => ({ href: anchor.href, rect: anchor.getBoundingClientRect() }))
        .filter(({ href, rect }) => /^https?:\/\//i.test(href) && rect.width > 0 && rect.height > 0);
      const radioAreas = Array.from(slide.querySelectorAll<HTMLInputElement>('input[data-pdf-field][type="radio"]'))
        .map((input) => ({
          group: input.name,
          value: input.value,
          rect: input.getBoundingClientRect(),
        }))
        .filter(({ group, value, rect }) => group && value && rect.width > 0 && rect.height > 0);

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
      const imageX = (pageWidth - width) / 2;
      const imageY = (pageHeight - height) / 2;
      pdf.addImage(
        canvas.toDataURL("image/jpeg", 0.86),
        "JPEG",
        imageX,
        imageY,
        width,
        height,
      );
      const scaleX = width / slideRect.width;
      const scaleY = height / slideRect.height;
      for (const { href, rect } of linkAreas) {
        pdf.link(
          imageX + (rect.left - slideRect.left) * scaleX,
          imageY + (rect.top - slideRect.top) * scaleY,
          rect.width * scaleX,
          rect.height * scaleY,
          { url: href },
        );
      }
      const radioGroups = new Map<string, typeof radioAreas>();
      for (const radioArea of radioAreas) {
        const group = radioGroups.get(radioArea.group) || [];
        group.push(radioArea);
        radioGroups.set(radioArea.group, group);
      }
      for (const [groupName, options] of radioGroups) {
        const radioGroup = new pdf.AcroForm.RadioButton();
        radioGroup.fieldName = groupName;
        pdf.addField(radioGroup);
        for (const optionArea of options) {
          const option = radioGroup.createOption(optionArea.value);
          const mappedX = imageX + (optionArea.rect.left - slideRect.left) * scaleX;
          const mappedY = imageY + (optionArea.rect.top - slideRect.top) * scaleY;
          const mappedWidth = Math.max(4, optionArea.rect.width * scaleX);
          const mappedHeight = Math.max(4, optionArea.rect.height * scaleY);
          option.Rect = [mappedX, mappedY, mappedWidth, mappedHeight];
        }
        radioGroup.setAppearance(pdf.AcroForm.Appearance.RadioButton.Circle);
      }
    }

    pdf.save(`${filename.replace(/[^a-z0-9-_]+/gi, "-").toLowerCase()}.pdf`);
  } catch (error) {
    console.error("PDF generation failed", error);
  } finally {
    exportStyles.remove();
    if (root) root.style.cursor = previousCursor || "";
  }
}
