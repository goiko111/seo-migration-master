import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContentMap {
  [section: string]: {
    [key: string]: string;
  };
}

export const usePageContent = (page: string) => {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("page_content")
        .select("section, content_key, content_value")
        .eq("page", page);

      if (data) {
        const map: ContentMap = {};
        data.forEach((item) => {
          if (!map[item.section]) map[item.section] = {};
          map[item.section][item.content_key] = item.content_value;
        });
        setContent(map);
      }
      setLoading(false);
    };

    fetchContent();
  }, [page]);

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
