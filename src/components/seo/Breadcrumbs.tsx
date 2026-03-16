import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { t } = useLanguage();

  // Inject BreadcrumbList JSON-LD
  useEffect(() => {
    const breadcrumbItems = [
      { "@type": "ListItem", position: 1, name: t.breadcrumb_home, item: "https://winerim.wine/" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://winerim.wine${item.href}` } : {}),
      })),
    ];

    const script = document.createElement("script");
    script.id = "breadcrumb-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    });

    // Remove any existing breadcrumb schema first
    const existing = document.getElementById("breadcrumb-jsonld");
    if (existing) existing.remove();

    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [items, t.breadcrumb_home]);

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-foreground transition-colors">{t.breadcrumb_home}</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-border">/</span>
            {item.href ? (
              <Link to={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
