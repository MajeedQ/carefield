
-- ============ site_settings (singleton) ============
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- theme
  primary_color text NOT NULL DEFAULT '#002c6d',
  accent_color text NOT NULL DEFAULT '#775a19',
  background_color text NOT NULL DEFAULT '#f8f9ff',
  logo_text text NOT NULL DEFAULT 'مركز مجال العناية للرعاية النهارية',
  logo_subtitle text NOT NULL DEFAULT 'تأهيل، تمكين، استقلالية',
  font_scale text NOT NULL DEFAULT 'normal',
  font_family text NOT NULL DEFAULT 'tajawal',
  border_radius text NOT NULL DEFAULT 'large',
  spacing_scale text NOT NULL DEFAULT 'comfortable',
  -- social
  phone1 text DEFAULT '0560098881',
  phone2 text DEFAULT '0546461647',
  whatsapp text DEFAULT '966560098881',
  twitter text DEFAULT '',
  instagram text DEFAULT '',
  snapchat text DEFAULT '',
  tiktok text DEFAULT '',
  email text DEFAULT 'care.f.center@gmail.com',
  linkedin text DEFAULT '',
  -- pixels
  ga_id text DEFAULT '',
  meta_pixel_id text DEFAULT '',
  snap_pixel_id text DEFAULT '',
  tiktok_pixel_id text DEFAULT '',
  -- announcement
  announce_enabled boolean NOT NULL DEFAULT true,
  announce_text text NOT NULL DEFAULT 'تنبيه التسجيل: يبدأ التسجيل للعام التأهيلي الجديد 1448هـ',
  announce_link text DEFAULT '',
  announce_bg text NOT NULL DEFAULT '#775a19',
  announce_color text NOT NULL DEFAULT '#ffffff',
  announce_speed text NOT NULL DEFAULT 'normal',
  -- about
  about_title text NOT NULL DEFAULT 'نبذة تعريفية عن مركز مجال العناية',
  about_subtitle text NOT NULL DEFAULT 'الرعاية الأمثل للأشخاص ذوي الإعاقة',
  about_description text NOT NULL DEFAULT '',
  about_vision text NOT NULL DEFAULT '',
  about_mission text NOT NULL DEFAULT '',
  about_goals text[] NOT NULL DEFAULT ARRAY[]::text[],
  about_image text DEFAULT '',
  -- webhook
  sheets_webhook_url text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update settings" ON public.site_settings FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_settings (
  about_description, about_vision, about_mission, about_goals, about_image
) VALUES (
  'في مركز مجال العناية، نقدم بيئة آمنة ومتطورة لتأهيل وتطوير مهارات الأشخاص ذوي الإعاقة، مع نخبة من الأخصائيين المعتمدين.',
  'الريادة والتميز الإقليمي في تقديم الرعاية النهارية والخدمات التأهيلية الشاملة للفئات المستهدفة بأعلى مستويات الجودة والحب والأمان.',
  'تمكين وتأهيل أبطالنا ذوي الإعاقة عبر تطبيق برامج فردية متخصصة ومبنية على أسس علمية، ودعم أسرهم بالشراكة المجتمعية.',
  ARRAY[
    'تنمية مهارات الاستقلال الذاتي والاعتمادية لكل مستفيد بمحيط المركز والمنزل.',
    'تعديل السلوك وبناء استجابات إيجابية تفاعلية مرنة ومثمرة.',
    'توفير رعاية ترفيهية وصحية واجتماعية وتدريب مهني وفني مكثف.',
    'تثقيف أهالي وأولياء أمور الأبطال بكيفية رعاية المستفيدين.'
  ],
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA'
);

-- ============ branches ============
CREATE TABLE public.branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL DEFAULT '',
  map_url text NOT NULL DEFAULT '',
  share_url text DEFAULT '',
  phone text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.branches TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.branches TO authenticated;
GRANT ALL ON public.branches TO service_role;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read branches" ON public.branches FOR SELECT TO anon, authenticated USING (active = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage branches" ON public.branches FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_branches_updated BEFORE UPDATE ON public.branches FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.branches (name, address, map_url, share_url, phone, sort_order) VALUES
('فرع البنين - ضاحية لبن', 'الرياض - حي ضاحية لبن، الشارع العام', 'https://maps.google.com/maps?q=24.6362813,46.5532394&z=15&output=embed', 'https://maps.app.goo.gl/C1UQ28Qcw3ABGfoe9?g_st=iw', '0560098881', 1),
('فرع البنين - حي النزهة', 'الرياض - حي النزهة، شارع سعد بن بيشان', 'https://maps.google.com/maps?q=مركز+مجال+العناية+للرعاية+النهارية+حي+النزهة+الرياض&z=15&output=embed', 'https://maps.app.goo.gl/ZL2SvDm7VUnYTH3u5?g_st=iw', '0546461647', 2);

-- ============ hero_slides ============
CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  tag text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read hero" ON public.hero_slides FOR SELECT TO anon, authenticated USING (active = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage hero" ON public.hero_slides FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_hero_updated BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.hero_slides (title, subtitle, image_url, tag, sort_order) VALUES
('الرعاية الأمثل للأشخاص ذوي الإعاقة', 'في مركز مجال العناية، نقدم بيئة آمنة ومتطورة لتأهيل وتطوير مهارات الأشخاص ذوي الإعاقة، مع نخبة من الأخصائيين المعتمدين.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA', 'الرعاية الأمثل', 1),
('تمكين وتأهيل طبي وسلوكي متقدم', 'أحدث الأدوات والخطط العلاجية لتدريب ورعاية أبطال القدرات الفردية', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop', 'رعاية صحية', 2),
('أنشطة حركية وتعليمية مبهجة للجميع', 'فصول دراسية وغرف حسية متكاملة لزيادة تواصل المستفيدين بالحياة اليومية', 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop', 'أنشطة تأهيلية', 3);

-- ============ trust_badges ============
CREATE TABLE public.trust_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Award',
  text text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.trust_badges TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.trust_badges TO authenticated;
GRANT ALL ON public.trust_badges TO service_role;
ALTER TABLE public.trust_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read badges" ON public.trust_badges FOR SELECT TO anon, authenticated USING (active = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage badges" ON public.trust_badges FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_badges_updated BEFORE UPDATE ON public.trust_badges FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.trust_badges (icon, text, sort_order) VALUES
('Award', 'أكثر من 8 سنوات خبرة وتصنيف A+', 1),
('Users', 'الفئات العمرية من 12 إلى 45 سنة', 2),
('Building2', 'فروعنا: لبن والنزهة (بنين)', 3),
('Bus', 'مواصلات لجميع أحياء الرياض مع مرافقين ومجهزة بالكاميرات', 4);

-- ============ services ============
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Sparkles',
  short_description text NOT NULL DEFAULT '',
  detailed_description text NOT NULL DEFAULT '',
  benefits text[] NOT NULL DEFAULT ARRAY[]::text[],
  target_age text DEFAULT '',
  sessions_per_week text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT TO anon, authenticated USING (active = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.services (title, icon_name, short_description, detailed_description, benefits, target_age, sessions_per_week, sort_order) VALUES
('تعديل السلوك', 'BrainCircuit', 'برامج علمية متخصصة لتعديل السلوك وبناء استجابات إيجابية مرنة.', 'يعتمد برنامج تعديل السلوك على تحليل سلوكي تطبيقي (ABA) ومناهج علمية مبنية على الأدلة لتقليل السلوكيات غير المرغوبة وتعزيز السلوكيات الإيجابية البديلة.', ARRAY['خفض السلوكيات النمطية', 'تعزيز التواصل الاجتماعي', 'تعليم مهارات الحياة اليومية'], '12-45 سنة', 'يحدد بعد التقييم الأولي', 1),
('علاج عيوب النطق والتخاطب', 'MessageSquare', 'تطوير مهارات النطق والتواصل اللفظي وغير اللفظي للمستفيدين.', 'جلسات فردية لتأهيل وعلاج اضطرابات النطق واللغة وصعوبات البلع والتواصل، باستخدام أحدث الأدوات والوسائل المرئية والحسية.', ARRAY['تحسين مخارج الحروف', 'بناء حصيلة لغوية', 'تعزيز التواصل الوظيفي'], '12-45 سنة', '2-3 جلسات أسبوعياً', 2),
('العلاج الطبيعي والوظيفي', 'Activity', 'إعادة التأهيل الحركي وتطوير المهارات الحركية الدقيقة والكبيرة.', 'برامج متكاملة لتحسين القوة العضلية والتوازن والمهارات الحركية الدقيقة، بإشراف أخصائيين معتمدين وأجهزة حديثة.', ARRAY['تقوية العضلات', 'تحسين التوازن', 'تطوير المهارات الحركية الدقيقة'], '12-45 سنة', '2-3 جلسات أسبوعياً', 3),
('الدمج الأكاديمي', 'BookOpen', 'برامج تعليمية مخصصة لتطوير المهارات الأكاديمية والمعرفية.', 'منهج فردي مرن يراعي قدرات كل مستفيد ويعمل على تطوير مهارات القراءة والكتابة والحساب بطرق تفاعلية.', ARRAY['تعزيز مهارات القراءة', 'تطوير الكتابة', 'تنمية المفاهيم الرياضية'], '12-45 سنة', '5 أيام أسبوعياً', 4),
('التدريب المهني', 'Briefcase', 'تأهيل المستفيدين للحياة العملية بمهارات مهنية مناسبة لقدراتهم.', 'ورش عمل تدريبية في مجالات متنوعة كالحرف اليدوية والفنون والمهن البسيطة، لتعزيز الاستقلالية والاندماج في المجتمع.', ARRAY['تنمية المهارات اليدوية', 'بناء الثقة بالنفس', 'الإعداد لسوق العمل'], '18-45 سنة', '3 أيام أسبوعياً', 5),
('الأنشطة الترفيهية والرياضية', 'Trophy', 'برامج رياضية وترفيهية متنوعة لتعزيز الصحة النفسية والبدنية.', 'أنشطة رياضية وفنية وموسيقية ورحلات ميدانية لتعزيز الصحة الشاملة والمتعة والاندماج الاجتماعي.', ARRAY['تحسين اللياقة البدنية', 'تنمية المهارات الاجتماعية', 'تعزيز الصحة النفسية'], '12-45 سنة', 'يومياً', 6);

-- ============ faqs ============
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT TO anon, authenticated USING (active = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.faqs (question, answer, sort_order) VALUES
('ما هي الفئات العمرية التي تخدمها المركز؟', 'يقدم المركز خدماته للفئات العمرية من 12 إلى 45 سنة من ذوي الإعاقة.', 1),
('هل يوجد مواصلات؟', 'نعم، يوفر المركز مواصلات لجميع أحياء الرياض مع مرافقين ومجهزة بالكاميرات لضمان السلامة.', 2),
('كم عدد الفروع؟', 'لدينا فرعان للبنين: فرع ضاحية لبن وفرع حي النزهة.', 3),
('ما هي خطوات التسجيل؟', 'املأ نموذج التسجيل في الموقع، وسيتواصل معك منسق الحالات لترتيب موعد المقابلة والتقييم الأولي.', 4),
('هل الاستشارة الأولى مجانية؟', 'نعم، الاستشارة والتقييم الأولي مجاني لأولياء أمور المستفيدين الجدد.', 5);

-- ============ wide_banners ============
CREATE TABLE public.wide_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  tag text DEFAULT '',
  link_url text DEFAULT '',
  button_text text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.wide_banners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.wide_banners TO authenticated;
GRANT ALL ON public.wide_banners TO service_role;
ALTER TABLE public.wide_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read wide" ON public.wide_banners FOR SELECT TO anon, authenticated USING (active = true OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins manage wide" ON public.wide_banners FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_wide_updated BEFORE UPDATE ON public.wide_banners FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.wide_banners (title, subtitle, image_url, tag, link_url, button_text, sort_order) VALUES
('الرعاية الأمثل للأشخاص ذوي الإعاقة', 'في مركز مجال العناية، نقدم بيئة آمنة ومتطورة لتأهيل وتطوير مهارات الأشخاص ذوي الإعاقة، مع نخبة من الأخصائيين المعتمدين.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtmrKHWruhd8B7jOPSXzUNaz0LSxp3ywigDxzGiXIrMGThLH_UtXSv_6M4mvqL-i7yDTFvdQGwSMApodmIPbTv3qX6kCX3GdwR52rIdgPCHgwgFGQfCsaTh7RzYQqqmefBQGsg0w2BvyfZAbTzvAQg-qvQMtgU9y3rSoX73gt0mZYwiA5lsKmiDOL7pO3r15YaQZWOdQ_AsgAolu7kmCjpHnyFWWjO2UVqaSS2GiIkNnyKNZiEEVIJFWlgrVqOjx0aUmpYlEKdyYSXVw', 'التسجيل للعام الجديد مفتوح', '#lead-form', 'احجز مقعدًا وباشر الاستشارة مجاناً', 1),
('مواصلات مجهزة وآمنة بكافة الفروع', 'مواصلات لجميع أحياء الرياض مع مرافقين ومجهزة بالكاميرات', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop', 'توصيل متاح', '#lead-form', 'تواصل لمعرفة مناطق التوصيل', 2);

-- ============ leads ============
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  district text NOT NULL DEFAULT '',
  age text DEFAULT '',
  service_id text DEFAULT '',
  notes text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read leads" ON public.leads FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update leads" ON public.leads FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER trg_leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
