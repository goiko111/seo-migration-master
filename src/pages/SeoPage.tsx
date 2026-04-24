import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSeoPage } from "@/hooks/useSeoPage";
import CityTemplate from "@/components/templates/CityTemplate";
import RestaurantTypeTemplate from "@/components/templates/RestaurantTypeTemplate";
import CountryTemplate from "@/components/templates/CountryTemplate";
import GenericSeoTemplate from "@/components/templates/GenericSeoTemplate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/i18n/LanguageContext";
import type { SupportedLang } from "@/i18n/types";

const SeoPageLoader = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-16 max-w-4xl mx-auto px-6 md:px-12">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-14 w-full mb-4" />
      <Skeleton className="h-6 w-2/3 mb-10" />
      <Skeleton className="h-12 w-48" />
    </div>
    <Footer />
  </div>
);

const SeoPageNotFound = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <SEOHead title="PÃ¡gina no encontrada | Winerim" description="Esta pÃ¡gina no existe o no estÃ¡ disponible." noindex />
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">PÃ¡gina no encontrada</h1>
        <p className="text-muted-foreground mb-8">Lo sentimos, esta pÃ¡gina no existe o no estÃ¡ disponible.</p>
        <Link to="/" className="bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase">
          Volver al inicio
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

/** Cluster-specific templates */
const templateMap: Record<string, React.ComponentType<{ page: any; related: any[] }>> = {
  city: CityTemplate,
  restaurant_type: RestaurantTypeTemplate,
  country: CountryTemplate,
};

/** All other clusters use a rich generic template */
const genericClusters = new Set([
  "grape", "region", "style", "pairing", "guide", "problem", "comparison", "resource",
]);

/**
 * Extract the SEO slug from the current pathname.
 * DB slugs never include a language prefix (e.g. "weinkarten-software-berlin",
 * not "de/weinkarten-software-berlin"), so we strip the leading /xx/ for
 * language-prefixed routes and the leading / for root (es) routes.
 */
function slugFromPathname(pathname: string): string {
  // Remove leading slash
  const path = pathname.replace(/^\//, "");
  // Language-prefixed routes: /de/weinkarten-software-berlin â de/weinkarten-software-berlin
  const langPrefixMatch = path.match(/^(en|it|fr|de|pt)\/(.*)/);
  if (langPrefixMatch) return langPrefixMatch[2];
  // Root (es) route: /software-carta-de-vinos-madrid â software-carta-de-vinos-madrid
  return path;
}

const VALID_LANGS: SupportedLang[] = ["es", "en", "it", "fr", "de", "pt"];

const SeoPage = () => {
  const { pathname } = useLocation();
  const slug = slugFromPathname(pathname);
  const { page, related, loading, notFound } = useSeoPage(slug);
  const { setLangOverride } = useLanguage();

  // Override language context with the page's actual language from Supabase
  useEffect(() => {
    if (page?.lang && VALID_LANGS.includes(page.lang as SupportedLang)) {
      setLangOverride(page.lang as SupportedLang);
    }
    return () => setLangOverride(null);
  }, [page?.lang, setLangOverride]);

  if (loading) return <SeoPageLoader />;
  if (notFound || !page) return <SeoPageNotFound />;

  // Dedicated template
  const Template = templateMap[page.cluster];
  if (Template) return <Template page={page} related={related} />;

  // Generic template for all other clusters
  if (genericClusters.has(page.cluster)) {
    return <GenericSeoTemplate page={page} related={related} />;
  }

  // Fallback: use GenericSeoTemplate for any unknown cluster
  return <GenericSeoTemplate page={page} related={related} />;
};

export default SeoPage;
