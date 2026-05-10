import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FreemiumGate from "./FreemiumGate";
import {
  trackToolUsed,
  shouldGateTool,
  getToolsUsed,
  useFreemiumState,
} from "@/lib/freemium";

/**
 * Global guard mounted once in App.tsx.
 * - Detects /herramientas/<slug> routes (any language prefix).
 * - If the slug is new and the user has already used >= LIMIT distinct tools and is not unlocked → renders the gate.
 * - Otherwise tracks the slug as used.
 */
const FreemiumToolGuard = () => {
  const { pathname } = useLocation();
  const { toolsUsed, unlocked } = useFreemiumState();
  const [showGate, setShowGate] = useState(false);

  // Strip language prefix and detect tool slug
  const stripped = pathname.replace(/^\/(en|it|fr|de|pt)(?=\/|$)/, "") || "/";
  const match = stripped.match(/^\/herramientas\/([^/]+)/);
  const slug = match ? match[1] : null;

  useEffect(() => {
    if (!slug) {
      setShowGate(false);
      return;
    }
    if (shouldGateTool(slug)) {
      setShowGate(true);
      // lock body scroll while gated
      document.body.style.overflow = "hidden";
    } else {
      trackToolUsed(slug);
      setShowGate(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
    // re-evaluate when unlocked changes too
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, unlocked]);

  if (!showGate || !slug) return null;

  return (
    <FreemiumGate
      context="tool"
      count={getToolsUsed().length}
      onUnlocked={() => {
        trackToolUsed(slug);
        setShowGate(false);
        document.body.style.overflow = "";
      }}
    />
  );
};

export default FreemiumToolGuard;