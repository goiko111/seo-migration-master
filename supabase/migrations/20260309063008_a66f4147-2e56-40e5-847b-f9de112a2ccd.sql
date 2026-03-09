
-- Enum for SEO page clusters
CREATE TYPE public.seo_cluster AS ENUM ('city', 'restaurant_type', 'country', 'grape', 'region', 'style', 'pairing', 'guide', 'problem', 'comparison', 'resource');

-- Main programmatic SEO pages table
CREATE TABLE public.seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  cluster seo_cluster NOT NULL,
  lang TEXT NOT NULL DEFAULT 'es',
  
  -- SEO metadata
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  og_image TEXT,
  canonical_url TEXT,
  
  -- Hero
  hero_badge TEXT,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT,
  cta_primary_text TEXT DEFAULT 'Solicitar demo',
  cta_primary_url TEXT DEFAULT '/demo',
  cta_secondary_text TEXT,
  cta_secondary_url TEXT,
  
  -- Dynamic body content as JSONB
  body JSONB NOT NULL DEFAULT '{}',
  
  -- FAQ for schema markup
  faqs JSONB DEFAULT '[]',
  
  -- Related pages (slugs)
  related_pages TEXT[] DEFAULT '{}',
  
  -- Schema type
  schema_type TEXT DEFAULT 'Article',
  
  -- Publishing
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_seo_pages_cluster ON public.seo_pages(cluster);
CREATE INDEX idx_seo_pages_lang ON public.seo_pages(lang);
CREATE INDEX idx_seo_pages_published ON public.seo_pages(published);

-- RLS
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published seo pages"
ON public.seo_pages FOR SELECT
USING (published = true);

CREATE POLICY "Admins can manage seo pages"
ON public.seo_pages FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Taxonomy table for cross-linking
CREATE TABLE public.seo_taxonomies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES public.seo_pages(id) ON DELETE CASCADE NOT NULL,
  taxonomy_type TEXT NOT NULL,
  taxonomy_value TEXT NOT NULL,
  UNIQUE(page_id, taxonomy_type, taxonomy_value)
);

CREATE INDEX idx_seo_taxonomies_type_value ON public.seo_taxonomies(taxonomy_type, taxonomy_value);

ALTER TABLE public.seo_taxonomies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read seo taxonomies"
ON public.seo_taxonomies FOR SELECT
USING (true);

CREATE POLICY "Admins can manage seo taxonomies"
ON public.seo_taxonomies FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));
