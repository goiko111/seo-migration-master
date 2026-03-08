import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "winerim_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-sm font-semibold mb-1">Usamos cookies</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el uso del sitio.{" "}
                  <a href="/privacidad" className="text-accent hover:underline">Más información</a>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={accept} className="bg-gradient-wine text-primary-foreground flex-1">
                Aceptar
              </Button>
              <Button size="sm" variant="outline" onClick={reject} className="flex-1">
                Rechazar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
