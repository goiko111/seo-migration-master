export interface ParsedSection {
  heading: string;
  content: string;
}

/**
 * Splits markdown body by ## headings into distinct sections.
 * Content before the first ## is treated as an intro section.
 */
export function parseMarkdownSections(body: string): ParsedSection[] {
  const lines = body.split("\n");
  const sections: ParsedSection[] = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      // Save previous section
      const content = currentLines.join("\n").trim();
      if (content || currentHeading) {
        sections.push({ heading: currentHeading, content });
      }
      currentHeading = h2Match[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Save last section
  const content = currentLines.join("\n").trim();
  if (content || currentHeading) {
    sections.push({ heading: currentHeading, content });
  }

  return sections;
}
