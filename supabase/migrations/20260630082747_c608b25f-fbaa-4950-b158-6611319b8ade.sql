DROP POLICY IF EXISTS "Public can read lead uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public read cartas-vinos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload lead files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload cartas-vinos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload lead analysis files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload popup wine lists" ON storage.objects;

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