// Reusable "Key Takeaway" / "En resumen" callout for improved scannability
import { Lightbulb } from "lucide-react";

interface KeyTakeawayProps {
  /** Label shown above the content — defaults to "En resumen" */
  label?: string;
  children: React.ReactNode;
  /** Visual variant */
  variant?: "default" | "wine" | "gold";
}

const variantStyles = {
  default: {
    border: "border-border",
    bg: "bg-gradient-card",
    icon: "text-accent",
    label: "text-accent",
  },
  wine: {
    border: "border-wine/20",
    bg: "bg-wine/5",
    icon: "text-wine",
    label: "text-wine",
  },
  gold: {
    border: "border-accent/20",
    bg: "bg-accent/5",
    icon: "text-accent",
    label: "text-accent",
  },
};

const KeyTakeaway = ({ label = "En resumen", children, variant = "wine" }: KeyTakeawayProps) => {
  const s = variantStyles[variant];

  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} p-5 sm:p-6 my-8`}>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className={s.icon} />
        <span className={`text-xs font-semibold tracking-widest uppercase ${s.label}`}>{label}</span>
      </div>
      <div className="text-sm text-foreground/85 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:space-y-1.5 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:text-sm [&>ul>li]:text-muted-foreground">
        {children}
      </div>
    </div>
  );
};

export default KeyTakeaway;
