// Enhanced content section renderer with lead paragraph extraction and visual hierarchy
import { CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface ContentSection {
  heading: string;
  content: string;
  tips?: string[];
}

interface Props {
  sections: ContentSection[];
  /** Insert a React node after the nth section (0-indexed) */
  insertAfter?: { index: number; node: React.ReactNode };
  /** Starting offset for alternating backgrounds */
  altOffset?: number;
}

/**
 * Renders body sections with improved readability:
 * - First sentence extracted as a bold "lead" paragraph
 * - Remaining content as normal text
 * - Tips as checkmark list
 * - Alternating section backgrounds
 */
const EnhancedSections = ({ sections, insertAfter, altOffset = 0 }: Props) => {
  return (
    <>
      {sections.map((section, i) => {
        const isAlt = (i + altOffset) % 2 === 1;

        // Extract first sentence as lead paragraph
        const dotIndex = section.content.indexOf(". ");
        const hasLead = dotIndex > 0 && dotIndex < 200;
        const leadText = hasLead ? section.content.slice(0, dotIndex + 1) : "";
        const restText = hasLead ? section.content.slice(dotIndex + 2) : section.content;

        return (
          <div key={i}>
            <section className={isAlt ? "bg-gradient-card border-y border-border py-16" : "py-16"}>
              <div className="max-w-4xl mx-auto px-6 md:px-12">
                <ScrollReveal>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5">{section.heading}</h2>

                  {/* Lead paragraph — bold, larger */}
                  {leadText && (
                    <p className="text-foreground/90 text-lg font-medium leading-relaxed mb-4">
                      {leadText}
                    </p>
                  )}

                  {/* Rest of content */}
                  {restText && (
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                      {restText}
                    </div>
                  )}

                  {/* Tips */}
                  {section.tips && section.tips.length > 0 && (
                    <div className="space-y-2.5 mt-6">
                      {section.tips.map((tip, j) => (
                        <div key={j} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background">
                          <CheckCircle size={16} className="text-wine shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollReveal>
              </div>
            </section>
            {insertAfter && insertAfter.index === i && insertAfter.node}
          </div>
        );
      })}
    </>
  );
};

export default EnhancedSections;
