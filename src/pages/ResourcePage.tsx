import { useParams, Navigate } from "react-router-dom";
import { getResourceBySlug } from "@/data/newResources";
import { getLocalizedResource } from "@/data/newResourcesI18n";
import { useLanguage } from "@/i18n/LanguageContext";
import ResourceTemplate from "@/components/templates/ResourceTemplate";

const ResourcePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();

  // Try localized version first, fall back to base Spanish data
  const data = slug
    ? getLocalizedResource(slug, lang) ?? getResourceBySlug(slug)
    : undefined;

  if (!data) return <Navigate to="/recursos" replace />;

  return <ResourceTemplate data={data} />;
};

export default ResourcePage;
