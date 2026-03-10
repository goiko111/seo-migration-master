import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "https://winerim.wine/og-image.png";

interface HreflangLink {
  lang: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedAt?: string;
  author?: string;
  noindex?: boolean;
  hreflang?: HreflangLink[];
}

const SEOHead = ({ title, description, image, url, type = "website", publishedAt, author, noindex, hreflang }: SEOHeadProps) => {
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

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, follow", true);
    } else {
      setMeta("robots", "index, follow", true);
    }

    // Hreflang
    const hreflangEls: HTMLLinkElement[] = [];
    if (hreflang && hreflang.length > 0) {
      hreflang.forEach((link) => {
        const el = document.createElement("link");
        el.rel = "alternate";
        el.hreflang = link.lang;
        el.href = link.url;
        document.head.appendChild(el);
        hreflangEls.push(el);
      });
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
    setMeta("og:locale", hreflang?.find(h => h.lang !== "x-default")?.lang === "en" ? "en_GB" : hreflang?.find(h => h.lang !== "x-default")?.lang === "it" ? "it_IT" : hreflang?.find(h => h.lang !== "x-default")?.lang === "fr" ? "fr_FR" : "es_ES");
    setMeta("twitter:card", "summary_large_image");

    // Always set og:image (use default if none provided)
    const ogImage = image || DEFAULT_OG_IMAGE;
    setMeta("og:image", ogImage);
    setMeta("og:image:width", "1200");
    setMeta("og:image:height", "630");
    setMeta("twitter:image", ogImage);

    if (url) {
      setMeta("og:url", url);
    }

    // JSON-LD: Page-specific
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
        image: ogImage,
        author: author ? { "@type": "Person", name: author } : undefined,
        datePublished: publishedAt || undefined,
        publisher: {
          "@type": "Organization",
          name: "Winerim",
          url: "https://winerim.wine",
          logo: { "@type": "ImageObject", url: "https://winerim.wine/og-image.png" },
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

    // JSON-LD: Organization (always present)
    let orgScript = document.getElementById("seo-org-jsonld") as HTMLScriptElement | null;
    if (!orgScript) {
      orgScript = document.createElement("script");
      orgScript.id = "seo-org-jsonld";
      orgScript.type = "application/ld+json";
      document.head.appendChild(orgScript);
    }
    orgScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Winerim",
      url: "https://winerim.wine",
      logo: "https://winerim.wine/og-image.png",
      description: "Carta de vinos digital y recomendador inteligente para restaurantes, hoteles y vinotecas.",
      sameAs: [
        "https://www.instagram.com/winerim/",
        "https://www.youtube.com/@Winerim",
        "https://www.linkedin.com/company/winerim/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: "https://winerim.wine/contacto",
        availableLanguage: ["Spanish"],
      },
    });

    return () => {
      document.title = "Winerim – Carta de Vinos Digital | Recomendador Inteligente";
      if (scriptEl) scriptEl.remove();
      if (orgScript) orgScript.remove();
      if (canonical) canonical.remove();
      hreflangEls.forEach((el) => el.remove());
      // Clean up robots meta to prevent stale noindex on navigation
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    };
  }, [title, description, image, url, type, publishedAt, author, noindex, hreflang]);

  return null;
};

export default SEOHead;
