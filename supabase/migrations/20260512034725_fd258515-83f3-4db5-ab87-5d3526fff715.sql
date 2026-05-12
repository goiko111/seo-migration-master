CREATE TABLE IF NOT EXISTS public.freemium_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  restaurant text NOT NULL,
  tool_slug text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.freemium_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit freemium leads"
ON public.freemium_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins and editors can read freemium leads"
ON public.freemium_leads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

CREATE POLICY "Admins can delete freemium leads"
ON public.freemium_leads
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS freemium_leads_email_idx ON public.freemium_leads (email);
CREATE INDEX IF NOT EXISTS freemium_leads_created_at_idx ON public.freemium_leads (created_at DESC);