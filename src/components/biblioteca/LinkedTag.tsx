import { Link } from "react-router-dom";
import { resolveLibraryLink, type TagCategory } from "@/data/wineLibraryLinks";
import { getWineLibraryPath } from "@/data/wineLibraryI18n";
import { useLanguage } from "@/i18n/LanguageContext";

interface LinkedTagProps {
  name: string;
  hint?: TagCategory;
  variant?: "wine" | "neutral" | "outline";
  className?: string;
}

const variantClasses = {
  wine: "bg-wine/10 text-wine border border-wine/20 hover:bg-wine/20 hover:border-wine/40",
  neutral: "bg-secondary/50 border border-border hover:border-wine/30 hover:text-wine",
  outline: "border border-border hover:border-wine/30 hover:text-wine",
};

const LinkedTag = ({ name, hint = "auto", variant = "wine", className = "" }: LinkedTagProps) => {
  const resolved = resolveLibraryLink(name, hint);
  const { lang } = useLanguage();

  const baseClasses = `px-3 py-1.5 rounded-full text-sm transition-all ${variantClasses[variant]} ${className}`;

  if (resolved) {
    return (
      <Link to={getWineLibraryPath(lang, resolved.path)} className={`${baseClasses} inline-block`}>
        {name}
      </Link>
    );
  }

  // Fallback to static span
  return (
    <span className={`px-3 py-1.5 rounded-full text-sm ${variant === "wine" ? "bg-wine/10 text-wine border border-wine/20" : "bg-secondary/50 border border-border"} ${className}`}>
      {name}
    </span>
  );
};

export default LinkedTag;
