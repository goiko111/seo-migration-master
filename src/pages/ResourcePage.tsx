import { useParams, Navigate } from "react-router-dom";
import { getResourceBySlug } from "@/data/newResources";
import ResourceTemplate from "@/components/templates/ResourceTemplate";

const ResourcePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getResourceBySlug(slug) : undefined;

  if (!data) return <Navigate to="/recursos" replace />;

  return <ResourceTemplate data={data} />;
};

export default ResourcePage;
