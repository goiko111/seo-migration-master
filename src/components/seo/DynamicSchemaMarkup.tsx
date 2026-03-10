import { useEffect } from "react";
import { CANONICAL_DOMAIN, DEFAULT_OG_IMAGE } from "@/seo/config";

interface FAQ {
  q: string;
  a: string;
}

interface DynamicSchemaMarkupProps {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  faqs?: FAQ[];
  breadcrumbs?: { name: string; url: string }[];
}

const DynamicSchemaMarkup = ({ id, type, title, description, url, faqs, breadcrumbs }: DynamicSchemaMarkupProps) => {
  useEffect(() => {
    const schemas: object[] = [];

    // Main schema
    if (type === "SoftwareApplication") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        description,
        url: "https://winerim.wine",
        offers: { "@type": "Offer", url: "https://winerim.wine/precios", priceCurrency: "EUR" },
      });
    } else {
      schemas.push({
        "@context": "https://schema.org",
        "@type": type,
        headline: title,
        description,
        author: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine" },
        publisher: { "@type": "Organization", name: "Winerim", url: "https://winerim.wine", logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" } },
        mainEntityOfPage: url,
        inLanguage: url.includes("/en/") ? "en" : "es",
      });
    }

    // FAQ schema
    if (faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }

    // Breadcrumb schema
    if (breadcrumbs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((bc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: bc.name,
          item: bc.url,
        })),
      });
    }

    const el = document.createElement("script");
    el.id = `schema-${id}`;
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schemas);
    document.head.appendChild(el);

    return () => { document.getElementById(`schema-${id}`)?.remove(); };
  }, [id, type, title, description, url, faqs, breadcrumbs]);

  return null;
};

export default DynamicSchemaMarkup;
