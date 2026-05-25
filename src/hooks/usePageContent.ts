import { useEffect, useState } from "react";
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

const CACHE_TTL_MS = 5 * 60 * 1000;
const contentCache = new Map<string, { content: ContentMap; expiresAt: number }>();
const pendingRequests = new Map<string, Promise<ContentMap>>();

const getCachedContent = (page: string): ContentMap | null => {
  const cached = contentCache.get(page);
  if (!cached || cached.expiresAt < Date.now()) {
    contentCache.delete(page);
    return null;
  }
  return cached.content;
};

const getPageContent = (page: string): Promise<ContentMap> => {
  const cached = getCachedContent(page);
  if (cached) return Promise.resolve(cached);

  const pending = pendingRequests.get(page);
  if (pending) return pending;

  const request = fetchPageContent(page)
    .then((content) => {
      contentCache.set(page, { content, expiresAt: Date.now() + CACHE_TTL_MS });
      return content;
    })
    .finally(() => {
      pendingRequests.delete(page);
    });

  pendingRequests.set(page, request);
  return request;
};

export const usePageContent = (page: string) => {
  const initialContent = getCachedContent(page) ?? {};
  const [content, setContent] = useState<ContentMap>(initialContent);
  const [loading, setLoading] = useState(!getCachedContent(page));

  useEffect(() => {
    let cancelled = false;
    const cached = getCachedContent(page);

    if (cached) {
      setContent(cached);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setContent({});
    setLoading(true);
    getPageContent(page)
      .then((nextContent) => {
        if (cancelled) return;
        setContent(nextContent);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setContent({});
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
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
