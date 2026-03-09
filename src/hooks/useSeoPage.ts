import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SeoPage {
  id: string;
  slug: string;
  cluster: string;
  lang: string;
  meta_title: string;
  meta_description: string;
  og_image: string | null;
  canonical_url: string | null;
  hero_badge: string | null;
  hero_title: string;
  hero_subtitle: string | null;
  cta_primary_text: string | null;
  cta_primary_url: string | null;
  cta_secondary_text: string | null;
  cta_secondary_url: string | null;
  body: Record<string, any>;
  faqs: { q: string; a: string }[];
  related_pages: string[];
  schema_type: string | null;
}

export interface RelatedPageInfo {
  slug: string;
  title: string;
  cluster: string;
}

export function useSeoPage(slug: string | undefined) {
  const [page, setPage] = useState<SeoPage | null>(null);
  const [related, setRelated] = useState<RelatedPageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }

    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("seo_pages")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const parsed: SeoPage = {
        ...data,
        body: (typeof data.body === "object" && data.body !== null ? data.body : {}) as Record<string, any>,
        faqs: Array.isArray(data.faqs) ? (data.faqs as { q: string; a: string }[]) : [],
        related_pages: Array.isArray(data.related_pages) ? data.related_pages : [],
      };
      setPage(parsed);

      // Fetch related pages
      if (parsed.related_pages.length > 0) {
        const { data: relData } = await supabase
          .from("seo_pages")
          .select("slug, hero_title, cluster")
          .in("slug", parsed.related_pages)
          .eq("published", true);

        if (relData) {
          setRelated(relData.map(r => ({ slug: r.slug, title: r.hero_title, cluster: r.cluster })));
        }
      }

      setNotFound(false);
      setLoading(false);
    };

    fetch();
  }, [slug]);

  return { page, related, loading, notFound };
}
