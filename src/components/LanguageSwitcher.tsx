import { useNavigate, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SUPPORTED_LANGS, LANG_FLAGS, LANG_LABELS, ROUTE_MAP, SupportedLang, DEFAULT_LANG } from "@/i18n/types";

/** Find the ES route equivalent for the current path */
function findEsRoute(pathname: string, currentLang: SupportedLang): string {
  if (currentLang === "es") return pathname;

  const langMap = ROUTE_MAP[currentLang];
  // Reverse lookup: find ES path from localized path
  for (const [esPath, localPath] of Object.entries(langMap)) {
    if (localPath === pathname) return esPath;
  }
  // Fallback: strip prefix
  const prefix = `/${currentLang}`;
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) || "/" : pathname;
}

const LanguageSwitcher = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchTo = (targetLang: SupportedLang) => {
    setOpen(false);
    if (targetLang === lang) return;

    const esRoute = findEsRoute(location.pathname, lang);

    if (targetLang === DEFAULT_LANG) {
      navigate(esRoute);
    } else {
      const targetPath = ROUTE_MAP[targetLang][esRoute] || `/${targetLang}${esRoute}`;
      navigate(targetPath);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Change language"
      >
        <Globe size={14} />
        <span className="hidden sm:inline">{LANG_FLAGS[lang]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-xl py-1 min-w-[150px] z-50">
          {SUPPORTED_LANGS.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                l === lang ? "text-foreground bg-wine/5" : "text-muted-foreground hover:text-foreground hover:bg-wine/5"
              }`}
            >
              <span>{LANG_FLAGS[l]}</span>
              <span>{LANG_LABELS[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
