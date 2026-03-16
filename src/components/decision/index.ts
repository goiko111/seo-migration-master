/**
 * Decision Center contextual system — barrel export.
 *
 * Components:
 *   InsightDrawer    — Full slide-in panel with 4 explanation blocks
 *   InsightTrigger   — Tiny button to place next to any metric (opens drawer)
 *   InsightCard      — Inline card that summarizes + opens drawer
 *   insightLibrary   — 8 pre-built insights for common alerts
 *
 * Usage examples:
 *
 * 1) Inline card in a dashboard:
 *    import { InsightCard, insightLibrary } from "@/components/decision";
 *    <InsightCard insight={insightLibrary["margen-bajo"]} />
 *
 * 2) Trigger next to a metric:
 *    import { InsightTrigger, InsightDrawer, insightLibrary } from "@/components/decision";
 *    const [open, setOpen] = useState(false);
 *    <InsightTrigger onClick={() => setOpen(true)} label="¿Qué significa?" />
 *    <InsightDrawer insight={insightLibrary["stock-muerto"]} open={open} onClose={() => setOpen(false)} />
 */
export { default as InsightDrawer } from "./InsightDrawer";
export type { InsightDrawerData } from "./InsightDrawer";
export { default as InsightTrigger } from "./InsightTrigger";
export { default as InsightCard } from "./InsightCard";
export { default as insightLibrary } from "./insightLibrary";
