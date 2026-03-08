import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  noindex?: boolean;
}

const SEOHead = ({ title, description, image, url, type = "website", publishedAt, author, noindex }: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = title.length > 55 ? title : `${title} | Winerim`;
    document.title = fullTitle;

    const setMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (url) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    // Noindex
    if (noindex) {
      setMeta("robots", "noindex, nofollow", true);
    }

    if (description) {
      setMeta("description", description.slice(0, 160), true);
      setMeta("og:description", description.slice(0, 160));
      setMeta("twitter:description", description.slice(0, 160));
    }

    setMeta("og:title", fullTitle);
    setMeta("twitter:title", fullTitle);
    setMeta("og:type", type);
    setMeta("og:site_name", "Winerim");
    setMeta("og:locale", "es_ES");
    setMeta("twitter:card", "summary_large_image");

    if (image) {
      setMeta("og:image", image);
      setMeta("twitter:image", image);
    }

    if (url) {
      setMeta("og:url", url);
    }

    // JSON-LD
    let scriptEl = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "seo-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }

    if (type === "article") {
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description || "",
        image: image || "",
        author: author ? { "@type": "Person", name: author } : undefined,
        datePublished: publishedAt || undefined,
        publisher: {
          "@type": "Organization",
          name: "Winerim",
          url: "https://winerim.wine",
          logo: { "@type": "ImageObject", url: "https://winerim.wine/favicon.ico" },
        },
      });
    } else {
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: description || "Carta de vinos digital con recomendador inteligente para restaurantes y bodegas.",
        url: url || "https://winerim.wine",
        offers: {
          "@type": "Offer",
          category: "SaaS",
        },
        publisher: {
          "@type": "Organization",
          name: "Winerim",
          url: "https://winerim.wine",
        },
      });
    }

    return () => {
      document.title = "Winerim – Carta de Vinos Digital | Recomendador Inteligente";
      if (scriptEl) scriptEl.remove();
      if (canonical) canonical.remove();
    };
  }, [title, description, image, url, type, publishedAt, author, noindex]);

  return null;
};

export default SEOHead;
