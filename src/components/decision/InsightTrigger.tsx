import { HelpCircle } from "lucide-react";

interface InsightTriggerProps {
  onClick: () => void;
  label?: string;
  size?: "sm" | "md";
}

/**
 * Small, non-invasive trigger button that opens the InsightDrawer.
 * Place next to any metric, alert, or insight in the product UI.
 *
 * Usage:
 * <InsightTrigger onClick={() => setOpen(true)} label="¿Qué significa?" />
 */
const InsightTrigger = ({ onClick, label, size = "sm" }: InsightTriggerProps) => {
  const isSmall = size === "sm";

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 hover:bg-wine/5 hover:border-wine/30 transition-all group ${
        isSmall ? "px-2 py-1" : "px-3 py-1.5"
      }`}
      title={label || "Entender este dato"}
    >
      <HelpCircle size={isSmall ? 12 : 14} className="text-muted-foreground/50 group-hover:text-wine transition-colors" />
      {label && (
        <span className={`font-medium text-muted-foreground/60 group-hover:text-wine transition-colors ${
          isSmall ? "text-[10px]" : "text-xs"
        }`}>
          {label}
        </span>
      )}
    </button>
  );
};

export default InsightTrigger;
