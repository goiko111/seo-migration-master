-- Superseded by 20260630082747_c608b25f-fbaa-4950-b158-6611319b8ade.sql
-- and by Lovable Storage bucket settings.
--
-- The original version of this migration updated storage.buckets directly to
-- set public=false, file_size_limit and allowed_mime_types. Lovable blocked
-- direct SQL against storage.buckets in production, so keeping those UPDATEs
-- here can break future migration runs before the policy-only migration is
-- applied.
--
-- Effective state:
-- - Bucket privacy is managed via Lovable Storage tools.
-- - Object INSERT policies are managed in the later policy migration.
-- - Bucket-level size and MIME constraints remain a Lovable panel/support task.

select 1;
