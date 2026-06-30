-- Harden lead-submitted wine list uploads.
-- These files can contain private restaurant wine lists, so they must not be
-- exposed through public Storage URLs. The web forms still allow anonymous
-- uploads, but reads are handled by trusted Edge Functions through signed URLs.

UPDATE storage.buckets
SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
WHERE id = 'lead-uploads';

UPDATE storage.buckets
SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/png'
  ]
WHERE id = 'cartas-vinos';

DROP POLICY IF EXISTS "Public can read lead uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public read cartas-vinos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload lead files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload cartas-vinos" ON storage.objects;

CREATE POLICY "Anyone can upload lead analysis files"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'lead-uploads'
  AND (storage.foldername(name))[1] = 'analisis'
  AND lower(storage.extension(name)) IN ('pdf', 'jpg', 'jpeg', 'png', 'webp')
);

CREATE POLICY "Anyone can upload popup wine lists"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'cartas-vinos'
  AND lower(storage.extension(name)) IN ('pdf', 'jpg', 'jpeg', 'png')
);
