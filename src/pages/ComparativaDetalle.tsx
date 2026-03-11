import { useParams, Navigate } from "react-router-dom";
import ComparisonPageTemplate from "@/components/templates/ComparisonPageTemplate";
import { comparisons } from "@/data/comparisons";

const ComparativaDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = comparisons.find((c) => c.slug === slug);

  if (!data) return <Navigate to="/comparativas" replace />;

  return <ComparisonPageTemplate data={data} />;
};

export default ComparativaDetalle;
