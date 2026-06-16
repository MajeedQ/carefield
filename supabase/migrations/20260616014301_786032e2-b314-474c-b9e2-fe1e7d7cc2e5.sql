
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS logo_size_mobile text,
  ADD COLUMN IF NOT EXISTS logo_size_tablet text,
  ADD COLUMN IF NOT EXISTS logo_size_desktop text,
  ADD COLUMN IF NOT EXISTS logo_shape_mobile text,
  ADD COLUMN IF NOT EXISTS logo_shape_tablet text,
  ADD COLUMN IF NOT EXISTS logo_shape_desktop text,
  ADD COLUMN IF NOT EXISTS logo_show_frame_mobile boolean,
  ADD COLUMN IF NOT EXISTS logo_show_frame_tablet boolean,
  ADD COLUMN IF NOT EXISTS logo_show_frame_desktop boolean;
