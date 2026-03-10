-- Restaurants table for client logos
CREATE TABLE public.restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  city text,
  category text,
  display_order integer DEFAULT 0,
  featured boolean DEFAULT false,
  visible boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Public can read visible restaurants
CREATE POLICY "Public can read visible restaurants"
  ON public.restaurants
  FOR SELECT
  TO public
  USING (visible = true);

-- Admins can manage restaurants
CREATE POLICY "Admins can manage restaurants"
  ON public.restaurants
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- Storage bucket for restaurant logos
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant-logos', 'restaurant-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: anyone can view, admins can upload/delete
CREATE POLICY "Public can view restaurant logos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'restaurant-logos');

CREATE POLICY "Admins can upload restaurant logos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'restaurant-logos' AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'editor'::app_role)));

CREATE POLICY "Admins can delete restaurant logos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'restaurant-logos' AND (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'editor'::app_role)));