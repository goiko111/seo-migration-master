import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ContentMap {
  [section: string]: {
    [key: string]: string;
  };
}

const fetchPageContent = async (page: string): Promise<ContentMap> => {
  const { data } = await supabase
    .from("page_content")
    .select("section, content_key, content_value")
    .eq("page", page);

  const map: ContentMap = {};
  if (data) {
    data.forEach((item) => {
      if (!map[item.section]) map[item.section] = {};
      map[item.section][item.content_key] = item.content_value;
    });
  }
  return map;
};

export const usePageContent = (page: string) => {
  const { data: content = {}, isLoading: loading } = useQuery({
    queryKey: ["page_content", page],
    queryFn: () => fetchPageContent(page),
    staleTime: 5 * 60 * 1000, // 5 min cache
    gcTime: 10 * 60 * 1000,
  });

  const get = (section: string, key: string, fallback: string): string => {
    return content[section]?.[key] ?? fallback;
  };

  const getJson = <T,>(section: string, key: string, fallback: T): T => {
    const raw = content[section]?.[key];
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  };

  return { content, loading, get, getJson };
};
