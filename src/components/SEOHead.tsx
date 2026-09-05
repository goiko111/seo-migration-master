import { useEffect } from "react";
import {
  CANONICAL_DOMAIN,
  DEFAULT_OG_IMAGE,
  getLocalizedOgImage,
  getLocalizedOgImageAlt,
  getOgLocale,
  getOgLocaleAlternates,
  getSeoLangFromPath,
  isProduction,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  type SeoLang,
} from "@/seo/config";

interface HreflangLink {
  lang: string;
  url: string;
}

type StructuredData = Record<string, unknown>;
const SITE_TITLE_SUFFIX = " | Winerim";
const TRAILING_SITE_TITLE_RE = /\s*(?:\||—|–|-|·)\s*Winerim\s*$/i;

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
  structuredData?: StructuredData | StructuredData[];
}

const detectPageLang = (url?: string, hreflang?: HreflangLink[]): SeoLang => {
  const path = (() => {
    if (!url) return "";
    try {
      return url.startsWith("http") ? new URL(url).pathname : url;
    } catch {
      return url;
    }
  })();

  const urlLang = getSeoLangFromPath(path);
  if (urlLang !== "es") return urlLang;
  if (path) return "es";

  return getSeoLangFromPath(hreflang?.find((h) => h.lang !== "x-default")?.url);
};

const normalizeSiteTitle = (value: string) => {
  const cleanTitle = value.trim();
  if (!cleanTitle) return "Winerim";

  const brandFreeTitle = cleanTitle.replace(TRAILING_SITE_TITLE_RE, "").trim();
  if (brandFreeTitle !== cleanTitle) return `${brandFreeTitle}${SITE_TITLE_SUFFIX}`;

  return cleanTitle.endsWith(SITE_TITLE_SUFFIX) || cleanTitle.length > 55
    ? cleanTitle
    : `${cleanTitle}${SITE_TITLE_SUFFIX}`;
};

const SEOHead = ({ title, description, image, url, type = "website", publishedAt, modifiedAt, author, wordCount, noindex, hreflang, structuredData }: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = normalizeSiteTitle(title);
    document.title = fullTitle;

    const setMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      if (isName) {
        document.querySelectorAll(`meta[property="${property}"]`).forEach((el) => el.remove());
      }
      let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const removeRepeatedMeta = (property: string, isName = false) => {
      const attr = isName ? "name" : "property";
      document.querySelectorAll(`meta[${attr}="${property}"]`).forEach((el) => el.remove());
    };

    const appendMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? "name" : "property";
      const el = document.createElement("meta");
      el.setAttribute(attr, property);
      el.content = content;
      document.head.appendChild(el);
      return el;
    };

    // ── Environment-aware robots ──
    // Staging/preview domains are ALWAYS noindex, regardless of the prop
    const shouldNoindex = noindex || !isProduction();
    if (noindex) {
      setMeta("robots", "noindex, follow", true);
    } else if (shouldNoindex) {
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
    const localeAlternateEls: HTMLMetaElement[] = [];
    if (hreflang && hreflang.length > 0) {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
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
      setMeta("twitter:description", description.slice(0, 160), true);
    }

    setMeta("og:title", fullTitle);
    setMeta("twitter:title", fullTitle, true);
    setMeta("og:type", type);
    setMeta("og:site_name", "Winerim");
    const pageLang = detectPageLang(url, hreflang);
    setMeta("og:locale", getOgLocale(pageLang));
    removeRepeatedMeta("og:locale:alternate");
    getOgLocaleAlternates(pageLang).forEach((locale) => {
      localeAlternateEls.push(appendMeta("og:locale:alternate", locale));
    });
    setMeta("twitter:card", "summary_large_image", true);

    // OG image — always absolute with production domain
    const ogImage = image || getLocalizedOgImage(pageLang) || DEFAULT_OG_IMAGE;
    const ogImageAlt = getLocalizedOgImageAlt(pageLang);
    setMeta("og:image", ogImage);
    setMeta("og:image:type", "image/png");
    setMeta("og:image:width", String(OG_IMAGE_WIDTH));
    setMeta("og:image:height", String(OG_IMAGE_HEIGHT));
    setMeta("og:image:alt", ogImageAlt);
    setMeta("twitter:image", ogImage, true);
    setMeta("twitter:image:alt", ogImageAlt, true);

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

    if (structuredData) {
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (type === "article") {
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
          logo: { "@type": "ImageObject", url: `${CANONICAL_DOMAIN}/favicon.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalArticleUrl },
        wordCount: wordCount || undefined,
        inLanguage: pageLang,
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
        image: ogImage,
        inLanguage: pageLang,
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
    const organizationCopy: Record<SeoLang, { description: string; slogan: string }> = {
      es: {
        description: "Plataforma de gestión inteligente de cartas de vinos para restaurantes, hoteles y grupos de restauración.",
        slogan: "La inteligencia artificial que vende más vino en tu restaurante",
      },
      en: {
        description: "AI wine list software for restaurants, hotels and hospitality groups.",
        slogan: "AI that helps restaurants sell more wine",
      },
      it: {
        description: "Piattaforma intelligente per carte dei vini in ristoranti, hotel e gruppi di ristorazione.",
        slogan: "L'intelligenza artificiale che aiuta a vendere piu vino",
      },
      fr: {
        description: "Plateforme intelligente pour cartes des vins de restaurants, hotels et groupes de restauration.",
        slogan: "L'intelligence artificielle qui aide a vendre plus de vin",
      },
      de: {
        description: "KI-Plattform fuer Weinkarten in Restaurants, Hotels und Gastronomiegruppen.",
        slogan: "KI, die Restaurants hilft, mehr Wein zu verkaufen",
      },
      pt: {
        description: "Plataforma inteligente para cartas de vinho em restaurantes, hoteis e grupos de restauracao.",
        slogan: "A inteligencia artificial que ajuda restaurantes a vender mais vinho",
      },
    };
    orgScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Winerim",
      legalName: "Winerim",
      url: CANONICAL_DOMAIN,
      logo: `${CANONICAL_DOMAIN}/favicon.png`,
      image: ogImage,
      description: organizationCopy[pageLang].description,
      slogan: organizationCopy[pageLang].slogan,
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
        availableLanguage: ["Spanish", "English", "Italian", "French", "German", "Portuguese"],
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
      localeAlternateEls.forEach((el) => el.remove());
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    };
  }, [title, description, image, url, type, publishedAt, modifiedAt, author, wordCount, noindex, hreflang, structuredData]);

  return null;
};

export default SEOHead;
