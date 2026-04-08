import { useEffect } from "react";
import { CANONICAL_DOMAIN, DEFAULT_OG_IMAGE, isProduction } from "@/seo/config";

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
  modifiedAt?: string;
  author?: string;
  wordCount?: number;
  noindex?: boolean;
  hreflang?: HreflangLink[];
}

const SEOHead = ({ title, description, image, url, type = "website", publishedAt, modifiedAt, author, wordCount, noindex, hreflang }: SEOHeadProps) => {
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

    // ── Environment-aware robots ──
    // Staging/preview domains are ALWAYS noindex, regardless of the prop
    const shouldNoindex = noindex || !isProduction();
    if (shouldNoindex) {
      setMeta("robots", "noindex, nofollow", true);
    } else {
      setMeta("robots", "index, follow", true);
    }

    // ── Canonical — always points to production domain ──
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (url) {
      // Ensure canonical always uses production domain
      const canonicalUrl = url.startsWith("http") && !url.includes("lovable.app")
        ? url
        : `${CANONICAL_DOMAIN}${url.startsWith("/") ? url : `/${url}`}`;

      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }

    // ── Hreflang — always uses production domain ──
    const hreflangEls: HTMLLinkElement[] = [];
    if (hreflang && hreflang.length > 0) {
      hreflang.forEach((link) => {
        const el = document.createElement("link");
        el.rel = "alternate";
        el.hreflang = link.lang;
        // Ensure hreflang URLs use production domain
        el.href = link.url.includes("lovable.app")
          ? link.url.replace(/https?:\/\/[^/]+/, CANONICAL_DOMAIN)
          : link.url;
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

    // OG image — always absolute with production domain
    const ogImage = image || DEFAULT_OG_IMAGE;
    setMeta("og:image", ogImage);
    setMeta("og:image:width", "1200");
    setMeta("og:image:height", "630");
    setMeta("twitter:image", ogImage);

    if (url) {
      // og:url always uses production domain
      const ogUrl = url.startsWith("http") && !url.includes("lovable.app")
        ? url
        : `${CANONICAL_DOMAIN}${url.startsWith("/") ? url : `/${url}`}`;
      setMeta("og:url", ogUrl);
    }

    // ── JSON-LD: Page-specific ──
    let scriptEl = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "seo-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }

    if (type === "article") {
      const canonicalArticleUrl = url && url.startsWith("http") && !url.includes("lovable.app")
        ? url
        : `${CANONICAL_DOMAIN}${url?.startsWith("/") ? url : `/${url || ""}`}`;
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description || "",
        image: ogImage,
        datePublished: publishedAt || undefined,
        dateModified: modifiedAt || publishedAt || undefined,
        author: { "@type": "Organization", name: "Winerim", url: CANONICAL_DOMAIN },
        publisher: {
          "@type": "Organization",
          name: "Winerim",
          url: CANONICAL_DOMAIN,
          logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalArticleUrl },
        wordCount: wordCount || undefined,
        inLanguage: hreflang?.find(h => h.lang !== "x-default")?.lang || "es",
      });
    } else {
      scriptEl.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Winerim",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: description || "Carta de vinos digital con recomendador inteligente para restaurantes y bodegas.",
        url: url || CANONICAL_DOMAIN,
        offers: {
          "@type": "Offer",
          category: "SaaS",
        },
        publisher: {
          "@type": "Organization",
          name: "Winerim",
          url: CANONICAL_DOMAIN,
        },
      });
    }

    // ── JSON-LD: Organization (always present) ──
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
      legalName: "Winerim",
      url: CANONICAL_DOMAIN,
      logo: `${CANONICAL_DOMAIN}/favicon.png`,
      image: DEFAULT_OG_IMAGE,
      description: "Plataforma de gestión inteligente de cartas de vinos para restaurantes, hoteles y grupos de restauración. Carta digital interactiva con recomendaciones de IA, maridajes automáticos, pricing dinámico y analítica de ventas.",
      slogan: "La inteligencia artificial que vende más vino en tu restaurante",
      foundingDate: "2024",
      areaServed: [
        { "@type": "Place", name: "Europe" },
        { "@type": "Place", name: "Spain" },
        { "@type": "Place", name: "Italy" },
        { "@type": "Place", name: "France" },
        { "@type": "Place", name: "United Kingdom" },
      ],
      knowsAbout: [
        "Wine list management",
        "Restaurant wine sales optimization",
        "AI-powered wine recommendations",
        "Digital wine menus",
        "Wine pricing strategy",
        "Food and wine pairing",
        "Hospitality technology",
        "Wine inventory management",
        "Wine rotation analysis",
        "Average ticket optimization",
        "By-the-glass wine programs",
        "Wine cellar management",
        "Restaurant analytics",
        "Wine margin optimization",
        "Sommelier training tools",
      ],
      sameAs: [
        "https://www.instagram.com/winerim/",
        "https://www.youtube.com/@Winerim",
        "https://www.linkedin.com/company/winerim/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${CANONICAL_DOMAIN}/contacto`,
        availableLanguage: ["Spanish", "English", "Italian", "French"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Winerim Plans",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: "Winerim", applicationCategory: "BusinessApplication" } },
        ],
      },
    });

    return () => {
      document.title = "Winerim – Carta de Vinos Digital | Recomendador Inteligente";
      if (scriptEl) scriptEl.remove();
      if (orgScript) orgScript.remove();
      if (canonical) canonical.remove();
      hreflangEls.forEach((el) => el.remove());
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    };
  }, [title, description, image, url, type, publishedAt, author, noindex, hreflang]);

  return null;
};

export default SEOHead;
