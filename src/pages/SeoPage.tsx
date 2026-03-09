import { useParams } from "react-router-dom";
import { useSeoPage } from "@/hooks/useSeoPage";
import CityTemplate from "@/components/templates/CityTemplate";
import RestaurantTypeTemplate from "@/components/templates/RestaurantTypeTemplate";
import CountryTemplate from "@/components/templates/CountryTemplate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

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
    <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8">Lo sentimos, esta página no existe o no está disponible.</p>
        <Link to="/" className="bg-gradient-wine text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase">
          Volver al inicio
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

const templateMap: Record<string, React.ComponentType<{ page: any; related: any[] }>> = {
  city: CityTemplate,
  restaurant_type: RestaurantTypeTemplate,
  country: CountryTemplate,
};

const SeoPage = () => {
  const { "*": wildcardSlug } = useParams();
  const slug = wildcardSlug || "";
  const { page, related, loading, notFound } = useSeoPage(slug);

  if (loading) return <SeoPageLoader />;
  if (notFound || !page) return <SeoPageNotFound />;

  const Template = templateMap[page.cluster];
  if (!Template) return <SeoPageNotFound />;

  return <Template page={page} related={related} />;
};

export default SeoPage;
