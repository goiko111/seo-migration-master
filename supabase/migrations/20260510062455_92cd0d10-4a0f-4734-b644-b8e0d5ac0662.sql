
-- Add carta_url column to contact_leads
ALTER TABLE public.contact_leads
ADD COLUMN IF NOT EXISTS carta_url text;

-- Create public storage bucket for wine lists (if missing)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cartas-vinos', 'cartas-vinos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to wine list files
DROP POLICY IF EXISTS "Public read cartas-vinos" ON storage.objects;
CREATE POLICY "Public read cartas-vinos"
ON storage.objects FOR SELECT
USING (bucket_id = 'cartas-vinos');

-- Allow anyone (anon + authenticated) to upload wine lists
DROP POLICY IF EXISTS "Anyone can upload cartas-vinos" ON storage.objects;
CREATE POLICY "Anyone can upload cartas-vinos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cartas-vinos');
