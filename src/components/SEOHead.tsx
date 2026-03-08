import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
}

const SEOHead = ({ title, description, image, url, type = "website", publishedAt, author }: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = `${title} | Winerim`;
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

    if (description) {
      setMeta("description", description, true);
      setMeta("og:description", description);
      setMeta("twitter:description", description);
    }

    setMeta("og:title", fullTitle);
    setMeta("twitter:title", fullTitle);
    setMeta("og:type", type);

    if (image) {
      setMeta("og:image", image);
      setMeta("twitter:image", image);
      setMeta("twitter:card", "summary_large_image");
    }

    if (url) {
      setMeta("og:url", url);
    }

    // JSON-LD for articles
    let scriptEl = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    if (type === "article") {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "seo-jsonld";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description || "",
        "image": image || "",
        "author": author ? { "@type": "Person", "name": author } : undefined,
        "datePublished": publishedAt || undefined,
        "publisher": {
          "@type": "Organization",
          "name": "Winerim",
          "url": "https://winerim.wine",
        },
      });
    }

    return () => {
      document.title = "Winerim – Carta de Vinos Digital | Recomendador Inteligente";
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, image, url, type, publishedAt, author]);

  return null;
};

export default SEOHead;
