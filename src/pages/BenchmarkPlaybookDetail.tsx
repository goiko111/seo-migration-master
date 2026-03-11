import { useParams, Navigate } from "react-router-dom";
import { getBPBySlug } from "@/data/benchmarksPlaybooks";
import BenchmarkPlaybookTemplate from "@/components/templates/BenchmarkPlaybookTemplate";

const BenchmarkPlaybookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? getBPBySlug(slug) : undefined;

  if (!data) return <Navigate to="/benchmarks-playbooks" replace />;

  return <BenchmarkPlaybookTemplate data={data} />;
};

export default BenchmarkPlaybookDetail;
