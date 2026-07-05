-- Harden articles access for the editorial expansion.
-- Supabase Data API exposure now requires explicit grants:
-- https://supabase.com/changelog

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON TABLE public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.articles TO authenticated;
GRANT ALL ON TABLE public.articles TO service_role;

DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
CREATE POLICY "Public can read published articles"
ON public.articles
FOR SELECT
TO anon, authenticated
USING (
  published = true
  AND (
    published_at IS NULL
    OR published_at <= now()
  )
);

DROP POLICY IF EXISTS "Admins can manage articles" ON public.articles;
CREATE POLICY "Admins can manage articles"
ON public.articles
FOR ALL
TO authenticated
USING (
  public.has_role((select auth.uid()), 'admin')
  OR public.has_role((select auth.uid()), 'editor')
)
WITH CHECK (
  public.has_role((select auth.uid()), 'admin')
  OR public.has_role((select auth.uid()), 'editor')
);
