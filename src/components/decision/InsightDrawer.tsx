import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, Info, Target, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface InsightDrawerData {
  id: string;
  title: string;
  queSignifica: string;
  porQueTeLoMostramos: string;
  queDeberias: string[];
  recurso: { label: string; href: string };
  decisionCenterHref?: string;
}

interface InsightDrawerProps {
  insight: InsightDrawerData;
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-in drawer that explains a metric/alert contextually.
 * Designed to live alongside product views without breaking the flow.
 */
const InsightDrawer = ({ insight, open, onClose }: InsightDrawerProps) => (
  <AnimatePresence>
    {open && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer panel */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-wine/10 flex items-center justify-center">
                <Info size={16} className="text-wine" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Decision Center
              </span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Title */}
            <h3 className="font-heading text-xl font-bold text-foreground leading-tight">
              {insight.title}
            </h3>

            {/* Qué significa */}
            <DrawerBlock icon={Info} iconStyle="bg-muted/50 text-muted-foreground" title="Qué significa">
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.queSignifica}</p>
            </DrawerBlock>

            {/* Por qué te lo mostramos */}
            <DrawerBlock icon={Target} iconStyle="bg-wine/10 text-wine" title="Por qué te lo mostramos">
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.porQueTeLoMostramos}</p>
            </DrawerBlock>

            {/* Qué deberías hacer ahora */}
            <DrawerBlock icon={Lightbulb} iconStyle="bg-emerald-500/10 text-emerald-500" title="Qué deberías hacer ahora">
              <ol className="space-y-3">
                {insight.queDeberias.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </DrawerBlock>

            {/* Recurso relacionado */}
            <Link
              to={insight.recurso.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:border-wine/30 hover:bg-wine/5 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/50">
                  Recurso relacionado
                </p>
                <p className="text-sm font-medium text-foreground group-hover:text-wine transition-colors truncate">
                  {insight.recurso.label}
                </p>
              </div>
              <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-wine transition-colors shrink-0" />
            </Link>
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

/* ── Small reusable block inside drawer ── */
const DrawerBlock = ({
  icon: BlockIcon, iconStyle, title, children,
}: {
  icon: React.ElementType; iconStyle: string; title: string; children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card/70 p-4">
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-7 h-7 rounded-md ${iconStyle} flex items-center justify-center`}>
        <BlockIcon size={13} />
      </div>
      <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground">{title}</h4>
    </div>
    {children}
  </div>
);

export default InsightDrawer;
