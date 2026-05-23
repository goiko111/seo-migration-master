
-- Public bucket for lead-submitted wine list files
INSERT INTO storage.buckets (id, name, public)
VALUES ('lead-uploads', 'lead-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anonymous + authenticated uploads
CREATE POLICY "Anyone can upload lead files"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'lead-uploads');

-- Allow public read access (so admins can open the link from the lead notification email)
CREATE POLICY "Public can read lead uploads"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'lead-uploads');
