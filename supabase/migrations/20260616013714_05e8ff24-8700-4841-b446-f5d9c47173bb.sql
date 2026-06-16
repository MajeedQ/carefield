ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS logo_image_url text,
  ADD COLUMN IF NOT EXISTS logo_size text DEFAULT 'md',
  ADD COLUMN IF NOT EXISTS logo_shape text DEFAULT 'circle',
  ADD COLUMN IF NOT EXISTS logo_show_frame boolean DEFAULT true;