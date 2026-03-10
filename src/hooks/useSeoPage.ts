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
  /** True when content is too thin for indexing */
  isThinContent: boolean;
}

export interface RelatedPageInfo {
  slug: string;
  title: string;
  cluster: string;
}

/**
 * Calculates a content quality score (0-100).
 * Returns true if the page should be noindexed due to thin content.
 */
function evaluateContentQuality(page: {
  hero_title: string;
  hero_subtitle: string | null;
  meta_description: string;
  body: Record<string, any>;
  faqs: { q: string; a: string }[];
}): boolean {
  let score = 0;

  // H1 exists and is unique-ish (>10 chars)
  if (page.hero_title && page.hero_title.length > 10) score += 15;

  // Subtitle exists (>20 chars)
  if (page.hero_subtitle && page.hero_subtitle.length > 20) score += 10;

  // Meta description (>50 chars)
  if (page.meta_description && page.meta_description.length > 50) score += 10;

  // Body content depth
  const body = page.body || {};
  const bodyStr = JSON.stringify(body);
  const bodyLength = bodyStr.length;

  // Intro text exists
  if (body.intro && typeof body.intro === "string" && body.intro.length > 80) score += 15;

  // Has substantive body content (>500 chars of JSON = real content)
  if (bodyLength > 500) score += 15;
  if (bodyLength > 1500) score += 10;

  // Has structured arrays (problems, benefits, features, etc.)
  const arrayFields = ["problems", "benefits", "features", "stats", "wine_culture_points", "carta_strategy", "winerim_modules", "wine_styles", "sections", "causes", "solution"];
  const filledArrays = arrayFields.filter(f => Array.isArray(body[f]) && body[f].length > 0);
  score += Math.min(filledArrays.length * 5, 15);

  // FAQs
  if (page.faqs && page.faqs.length >= 3) score += 10;
  else if (page.faqs && page.faqs.length >= 1) score += 5;

  // Threshold: pages below 40 are thin content
  return score < 40;
}

export function useSeoPage(slug: string | undefined) {
  const [page, setPage] = useState<SeoPage | null>(null);
  const [related, setRelated] = useState<RelatedPageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }

    const fetchData = async () => {
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

      const body = (typeof data.body === "object" && data.body !== null ? data.body : {}) as Record<string, any>;
      const faqs = Array.isArray(data.faqs) ? (data.faqs as { q: string; a: string }[]) : [];
      const related_pages = Array.isArray(data.related_pages) ? data.related_pages : [];

      const isThinContent = evaluateContentQuality({
        hero_title: data.hero_title,
        hero_subtitle: data.hero_subtitle,
        meta_description: data.meta_description,
        body,
        faqs,
      });

      const parsed: SeoPage = {
        ...data,
        body,
        faqs,
        related_pages,
        isThinContent,
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

    fetchData();
  }, [slug]);

  return { page, related, loading, notFound };
}
