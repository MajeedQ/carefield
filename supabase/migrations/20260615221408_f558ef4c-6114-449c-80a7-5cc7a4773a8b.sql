
-- Homepage editable content + SEO + hero stats CRUD
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS content jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS footer_description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS footer_copyright text NOT NULL DEFAULT '';

-- Seed sensible defaults into the single row (only when empty / missing keys)
UPDATE public.site_settings
SET content = jsonb_build_object(
  'hero_badge_prefix', 'حاصل على',
  'hero_badge_emphasis', 'تصنيف الفئة الأولى (A+)',
  'hero_badge_authority', 'وزارة الموارد البشرية',
  'hero_title_line1', 'الرعاية التأهيلية الأمثل',
  'hero_title_line2', 'لأطفالنا أبطال القدرات',
  'hero_paragraph', 'نكرّس جهودنا لبناء جسور الأمل لتمكين وتأهيل أبطالنا ذوي الاحتياجات الخاصة عبر خطط علاجية وتأهيلية فردية بإشراف نخبة مرخصة ومؤهلة.',
  'hero_cta_primary', 'طلب تواصل واستشارة مجانية',
  'hero_cta_primary_link', '#lead-form',
  'hero_cta_secondary', 'استعراض خدمات التأهيل',
  'hero_cta_secondary_link', '#services-section',
  'hero_microcopy', '⚡ المبادرة بالتسجيل المبكر تضمن لطفلك مقعده المعتمد والمدرج في برنامج الرعاية والمتابعة.',
  'hero_stamp_top', 'ترخيص وزارة',
  'hero_stamp_bottom', 'تأهيل طبي معتمد',
  'form_badge', '⭐ حجز مقعد وتقييم سلوكي مجاني',
  'form_title', 'طلب استشارة مبدئية وجدولة زيارة',
  'form_subtitle', 'سجل بيانات طفلك الغالي الآن، وسيتواصل معك منسق الرعاية لترتيب موعد زيارة الفروع وتحديد أوقات دراسة الكشف والمهارات مجانًا.',
  'form_submit', 'تقديم طلب الاستشارة المجانية',
  'form_submit_loading', 'جاري تشفير البيانات وإرسال طلب الحجز...',
  'form_success_title', 'وصلَنا طلبك 💚 وسنتواصل معك خلال 24 ساعة',
  'form_success_body', 'شكراً لثقتك بمركز مجال العناية. تم تحويل طلبك مباشرةً إلى منسّق القبول والاستشارات، وسيتواصل معك على الرقم الذي أرسلته لترتيب موعد التقييم السلوكي المجاني في الفرع الأقرب.',
  'form_step_1', 'مكالمة ترحيبية قصيرة من فريق القبول لتحديد موعد الزيارة.',
  'form_step_2', 'تقييم سلوكي وحركي مجاني داخل المركز يحدد الخدمة الأنسب لطفلك.',
  'form_step_3', 'عرض خطة تأهيل واضحة مع المواعيد ووسائل النقل عند الحاجة.',
  'form_whatsapp_btn', 'متابعة فورية على الواتساب',
  'form_new_btn', 'تسجيل مستفيد آخر',
  'services_title', 'خدماتنا التأهيلية المتخصصة',
  'services_subtitle', 'برامج مصممة بإشراف نخبة من الأخصائيين لتلبية احتياجات كل مستفيد.',
  'gallery_title', 'لقطات من حياة المركز',
  'gallery_subtitle', 'بيئة آمنة، مرافق مجهزة، وأنشطة يومية ممتعة.',
  'branches_title', 'فروعنا في الرياض',
  'branches_subtitle', 'فرعان مجهزان بالكامل لخدمتكم.',
  'faq_title', 'الأسئلة الشائعة',
  'faq_subtitle', 'إجابات سريعة لأكثر الأسئلة تكراراً من أولياء الأمور.'
) || content
WHERE content = '{}'::jsonb OR content IS NULL;

UPDATE public.site_settings
SET seo = jsonb_build_object(
  'home_title', 'مركز مجال العناية للرعاية النهارية | تأهيل ذوي الإعاقة بالرياض',
  'home_description', 'مركز رعاية نهارية معتمد A+ في الرياض لتأهيل ذوي الإعاقة من 12-45 سنة. تعديل سلوك، تخاطب، علاج طبيعي، دمج أكاديمي. احجز كشف مجاني.',
  'about_title', 'من نحن | مركز مجال العناية للرعاية النهارية',
  'about_description', 'تعرف على رسالة ورؤية مركز مجال العناية وفريقنا المعتمد لتأهيل ذوي الإعاقة في الرياض.',
  'services_title', 'خدمات التأهيل | مركز مجال العناية',
  'services_description', 'برامج تأهيل سلوكي، تخاطب، علاج طبيعي، ودمج أكاديمي بإشراف أخصائيين مرخصين بالرياض.',
  'branches_title', 'فروعنا في الرياض | مركز مجال العناية',
  'branches_description', 'فروع مركز مجال العناية في حي النزهة وضاحية لبن بالرياض مع مواصلات مكيفة ومرافقين.',
  'contact_title', 'تواصل معنا | مركز مجال العناية',
  'contact_description', 'تواصل مع مركز مجال العناية للرعاية النهارية بالرياض هاتفياً أو واتساب أو عبر النموذج لحجز كشف مجاني.'
) || seo
WHERE seo = '{}'::jsonb OR seo IS NULL;

UPDATE public.site_settings
SET footer_description = COALESCE(NULLIF(footer_description, ''),
  'رعاية طبية وسلوكية وتأهيلية متخصصة تحت إشراف فريق مرخص ومؤهل في بيئة آمنة ومحفزة. حاصل على تقييم A+ من وزارة الموارد البشرية والتنمية الاجتماعية بمدينة الرياض.'),
    footer_copyright = COALESCE(NULLIF(footer_copyright, ''),
  '© ' || extract(year from now())::text || ' مركز مجال العناية للرعاية النهارية. جميع الحقوق محفوظة ومسجلة بوزارة الموارد البشرية.');

-- Hero stats CRUD table
CREATE TABLE IF NOT EXISTS public.hero_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  num text NOT NULL,
  label text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.hero_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_stats TO authenticated;
GRANT ALL ON public.hero_stats TO service_role;

ALTER TABLE public.hero_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read hero stats" ON public.hero_stats FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage hero stats" ON public.hero_stats FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_hero_stats_updated BEFORE UPDATE ON public.hero_stats
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.hero_stats (num, label, sort_order) VALUES
  ('+٨ سنوات', 'خبرة رعاية تراكمية', 1),
  ('الفئة A+', 'أعلى تصنيف رعاية', 2),
  ('+٢٥ متخصص', 'أخصائي مرخص ومؤهل', 3),
  ('مجهزة بالكامل', 'باصات توصيل مبردة بالكاميرات', 4)
ON CONFLICT DO NOTHING;
