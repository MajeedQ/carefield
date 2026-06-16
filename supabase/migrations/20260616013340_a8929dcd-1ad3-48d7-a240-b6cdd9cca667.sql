ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS whatsapp_bubble_tag text,
  ADD COLUMN IF NOT EXISTS whatsapp_bubble_text text,
  ADD COLUMN IF NOT EXISTS whatsapp_bubble_cta text;