
-- The "Anyone can submit leads" policy with WITH CHECK (true) is intentional 
-- for public contact forms. Restrict to only INSERT to minimize exposure.
-- Drop and recreate with explicit anon + authenticated roles
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.contact_leads;
CREATE POLICY "Anyone can submit leads"
  ON public.contact_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
