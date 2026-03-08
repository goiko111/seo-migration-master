import { Button } from "@/components/ui/button";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link, Image, Quote, Code, Minus } from "lucide-react";

interface MarkdownToolbarProps {
  textareaId: string;
  value: string;
  onChange: (value: string) => void;
}

const MarkdownToolbar = ({ textareaId, value, onChange }: MarkdownToolbarProps) => {
  const insertAt = (before: string, after = "", placeholder = "") => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || placeholder;
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + before.length + selected.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const tools = [
    { icon: Bold, action: () => insertAt("**", "**", "negrita"), title: "Negrita" },
    { icon: Italic, action: () => insertAt("*", "*", "cursiva"), title: "Cursiva" },
    { icon: Heading2, action: () => insertAt("\n## ", "\n", "Título"), title: "Título H2" },
    { icon: Heading3, action: () => insertAt("\n### ", "\n", "Subtítulo"), title: "Título H3" },
    { icon: List, action: () => insertAt("\n- ", "\n", "elemento"), title: "Lista" },
    { icon: ListOrdered, action: () => insertAt("\n1. ", "\n", "elemento"), title: "Lista numerada" },
    { icon: Quote, action: () => insertAt("\n> ", "\n", "cita"), title: "Cita" },
    { icon: Link, action: () => insertAt("[", "](url)", "texto"), title: "Enlace" },
    { icon: Image, action: () => insertAt("![", "](url)", "alt"), title: "Imagen" },
    { icon: Code, action: () => insertAt("`", "`", "código"), title: "Código" },
    { icon: Minus, action: () => insertAt("\n---\n", "", ""), title: "Separador" },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-1 bg-muted/50 rounded-t-md border border-b-0 border-border">
      {tools.map((tool, i) => (
        <Button key={i} type="button" variant="ghost" size="icon" className="h-7 w-7"
          onClick={tool.action} title={tool.title}>
          <tool.icon className="w-3.5 h-3.5" />
        </Button>
      ))}
    </div>
  );
};

export default MarkdownToolbar;
