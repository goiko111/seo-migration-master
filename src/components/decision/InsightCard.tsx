import { useState } from "react";
import { Info } from "lucide-react";
import InsightDrawer, { type InsightDrawerData } from "./InsightDrawer";

interface InsightCardProps {
  insight: InsightDrawerData;
  /** Optional accent color class, e.g. "text-amber-500" */
  accent?: string;
}

/**
 * Inline contextual card that summarizes an insight and opens the full drawer.
 * Use in dashboards, alert lists, or any product view.
 *
 * Usage:
 * import insightLibrary from "@/components/decision/insightLibrary";
 * <InsightCard insight={insightLibrary["margen-bajo"]} />
 */
const InsightCard = ({ insight, accent }: InsightCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left rounded-xl border border-border bg-card/70 backdrop-blur-sm p-4 hover:border-wine/30 hover:bg-wine/5 transition-all group"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center shrink-0 mt-0.5">
            <Info size={14} className={accent || "text-wine"} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground group-hover:text-wine transition-colors">
              {insight.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {insight.queSignifica}
            </p>
            <span className="inline-block mt-2 text-[10px] font-semibold tracking-widest uppercase text-wine/50 group-hover:text-wine transition-colors">
              Entender más →
            </span>
          </div>
        </div>
      </button>

      <InsightDrawer insight={insight} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default InsightCard;
