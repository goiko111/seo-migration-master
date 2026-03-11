ALTER TABLE public.contact_leads
  ADD COLUMN IF NOT EXISTS business_type text,
  ADD COLUMN IF NOT EXISTS num_locations text,
  ADD COLUMN IF NOT EXISTS main_challenge text,
  ADD COLUMN IF NOT EXISTS has_sommelier text;