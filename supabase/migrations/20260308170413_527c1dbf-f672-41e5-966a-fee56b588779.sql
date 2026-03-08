
-- Fix the INSERT policy parentheses
DROP POLICY "Admins can upload files" ON storage.objects;
CREATE POLICY "Admins can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'admin-uploads'
  AND (public.has_role(auth.uid(), 'admin'::public.app_role)
  OR public.has_role(auth.uid(), 'editor'::public.app_role))
);
