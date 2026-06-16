
ALTER TABLE public.branches
  ADD COLUMN IF NOT EXISTS image_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS description text DEFAULT '',
  ADD COLUMN IF NOT EXISTS working_hours text DEFAULT '',
  ADD COLUMN IF NOT EXISTS services_list text[] DEFAULT ARRAY[]::text[],
  ADD COLUMN IF NOT EXISTS features text[] DEFAULT ARRAY[]::text[],
  ADD COLUMN IF NOT EXISTS directions text DEFAULT '';

ALTER TABLE public.gallery_items
  ADD COLUMN IF NOT EXISTS description text DEFAULT '',
  ADD COLUMN IF NOT EXISTS external_video_url text DEFAULT '';

ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS gallery_layout text DEFAULT 'grid',
  ADD COLUMN IF NOT EXISTS gallery_columns integer DEFAULT 4,
  ADD COLUMN IF NOT EXISTS gallery_autoplay boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery_autoplay_speed integer DEFAULT 4000,
  ADD COLUMN IF NOT EXISTS gallery_show_titles boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery_show_categories boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery_show_arrows boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery_show_dots boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery_title text DEFAULT 'معرض الصور والفيديو المتكامل',
  ADD COLUMN IF NOT EXISTS gallery_subtitle text DEFAULT 'حياتنا اليومية',
  ADD COLUMN IF NOT EXISTS gallery_description text DEFAULT 'شاهد بيئة أبطالنا وحياتهم التأهيلية اليومية الفعالة.';
