## الهدف
دمج المشروع الجديد من GitHub (Vite + localStorage + 6 صفحات + CMS كامل + ثيم ديناميكي + بيكسلات تسويق + WhatsApp bubble + فروع + بانرات عريضة + قسم "من نحن") فوق بنية المشروع الحالية (TanStack Start + Lovable Cloud)، مع:
- استبدال localStorage بقاعدة بيانات Lovable Cloud (آمنة، متعددة الأجهزة، صلاحيات أدمن حقيقية).
- تحويل تبديل الصفحات بـ `activePage` إلى راوتس TanStack حقيقية (SEO + مشاركة).
- توسعة لوحة `/admin` لتشمل كل أقسام CMS الجديدة.
- تجهيز جاهز للإطلاق (meta, OG, robots, sitemap, تنظيف الكونسول).

ينفّذ كله دفعة واحدة بعد الموافقة، بدون أسئلة لاحقة.

## التغييرات الرئيسية

### 1. قاعدة البيانات (Migration واحدة)
جداول جديدة في `public` + GRANT + RLS (قراءة عامة، كتابة `admin` فقط) + trigger `set_updated_at`:
- `site_settings` (سطر واحد): theme (primary/accent/bg/font/scale/radius/spacing)، social (هواتف، واتساب، تويتر، إنستغرام، تيكتوك، إيميل، لينكدإن)، pixels (GA/Meta/Snap/TikTok)، announcement (نص، تفعيل، ألوان، سرعة)، about (عنوان/رؤية/رسالة/أهداف/صورة)، hero_intro، sheets_webhook_url.
- `branches` (id, name, address, map_url, share_url, phone, sort_order, active).
- `hero_slides` (id, title, subtitle, image_url, tag, sort_order, active).
- `trust_badges` (id, icon, text, sort_order, active).
- `services` (id, title, icon_name, short_description, detailed_description, benefits[], target_age, sessions_per_week, sort_order, active).
- `faqs` (id, question, answer, sort_order, active).
- `wide_banners` (id, title, subtitle, image_url, tag, link_url, button_text, sort_order, active) — أو إعادة استخدام `banners` بـ `kind='wide'` (الأنظف: جدول مستقل).
- `leads` (id, full_name, phone, district, age, service_id, notes, status, created_at) + سياسة: insert عام، select/update/delete أدمن فقط.
- بذور بيانات: نسخ القيم من `DEFAULT_CONFIG` في GitHub.

### 2. طبقة البيانات
- `src/lib/queries.ts`: queryOptions لكل جدول (settings, branches, services, faqs, hero_slides, trust_badges, wide_banners, gallery_items, banners, leads).
- `src/lib/mutations.functions.ts`: server functions محمية بـ `requireSupabaseAuth` + فحص `has_role('admin')` لكل update/insert/delete.
- `src/lib/leads.functions.ts`: server function عام لإنشاء lead (input validation بـ zod) — يكتب في DB ويرسل أيضاً للـ Google Sheets webhook إذا مفعّل في `site_settings`.

### 3. الراوتس (تحويل activePage إلى ملفات)
- `src/routes/index.tsx` — الصفحة الرئيسية (Hero + WideBannerCarousel + Trust + Services + LeadForm + Gallery + Branches + FAQ).
- `src/routes/about.tsx` — قسم "من نحن" + Gallery.
- `src/routes/services.tsx` — كل الخدمات.
- `src/routes/branches.tsx` — الفروع بالخريطة.
- `src/routes/contact.tsx` — نموذج التواصل.
- كل راوت فيه `head()` خاص (title/description/og) — meta مختلفة لكل صفحة (SEO حقيقي بدل hash anchors).
- `__root.tsx`: يحقن البيكسلات + الإعلان العلوي + Header + Footer + WhatsAppBubble + يطبّق الثيم الديناميكي من `site_settings` عبر `<style>` معلّق على CSS variables.

### 4. المكوّنات الجديدة (مأخوذة من GitHub ومُعدّلة)
ينقل ويُربط بقاعدة البيانات بدل `useApp()`/localStorage:
- `Hero.tsx` — يقرأ hero_slides من DB.
- `WideBannerCarousel.tsx` — wide_banners.
- `RegistrationBanner.tsx` — site_settings.announcement.
- `TrustIndicators.tsx` — trust_badges.
- `ServicesGrid.tsx` + `ServiceDetailModal.tsx` — services.
- `GallerySection.tsx` — gallery_items (موجود، يُحدّث بالنسخة الأجمل).
- `AboutSection.tsx` — site_settings.about.
- `BranchLocations.tsx` — branches.
- `FAQSection.tsx` — faqs.
- `LeadForm.tsx` — يستدعي `submitLead` server function، عرض بنفس تصميم GitHub المطوّر.
- `InquiryDashboard.tsx` — يقرأ leads من DB (للأدمن فقط؛ يُخفى للعموم).
- `Footer.tsx` + `Header.tsx` + `LucideIcon.tsx` + `CareFieldLogo.tsx` + `WhatsAppBubble.tsx` — كما هي من GitHub، تستهلك site_settings.

### 5. لوحة `/admin` (Lovable Cloud)
- إعادة بناء `src/routes/_authenticated/admin.tsx` بتبويبات شاملة: 
  - الثيم والشعار (CmsTheme) — يستبدل AdminThemeController.
  - الإعلان العلوي + السوشل + البيكسلات + Webhook (CmsGeneral).
  - الهيرو والـ Trust Badges (CmsHero).
  - البانرات العريضة (CmsBanners) + بانرات نصية (BannerManager الحالي).
  - الخدمات (CmsServices).
  - الفروع (CmsBranches).
  - من نحن (CmsAbout).
  - الأسئلة الشائعة (CmsFaqs).
  - المعرض (GalleryManager الحالي).
  - الطلبات الواردة (Leads inbox مع تغيير الحالة/الحذف).
- كل التبويبات تكتب عبر server functions مع mutation hooks و invalidateQueries.
- رفع الصور يذهب إلى bucket `site-media` (موجود) بمسارات منظمة (`branches/`, `hero/`, `wide-banners/`, `about/`, `gallery/`).

### 6. حذف ما لا يصلح
- `src/context/AppContext.tsx` — لا يُنقل (يُستبدل بـ TanStack Query).
- `src/lib/configStore.ts` — يُستفاد من DEFAULT_CONFIG للبذور فقط، ثم لا يعمل في الإنتاج.
- وضع `?admin=true` و localStorage admin — يُلغى نهائياً (الأدمن عبر `/auth` + `has_role`).

### 7. التجهيز للإطلاق
- `index.html` (إذا لزم) + كل راوت: title/description/og:image صحيحة بالعربي.
- `robots.txt` + `sitemap.xml` لجميع الراوتس العامة.
- إزالة `console.log` من configStore (نسخة مهذّبة).
- فحص build (تلقائي) + التأكد من الراوتس تعمل + لوحة `/admin` تعمل.

## التفاصيل التقنية

### بنية الملفات النهائية (مُختصرة)
```
src/
  components/
    site/  (موجود — يُستبدل ويُوسّع بمكوّنات GitHub)
      Header.tsx, Footer.tsx, Hero.tsx, WideBannerCarousel.tsx,
      RegistrationBanner.tsx, TrustIndicators.tsx, ServicesGrid.tsx,
      ServiceDetailModal.tsx, GallerySection.tsx, AboutSection.tsx,
      BranchLocations.tsx, FAQSection.tsx, LeadForm.tsx,
      InquiryDashboard.tsx, WhatsAppBubble.tsx, LucideIcon.tsx,
      CareFieldLogo.tsx, ThemeStyleInjector.tsx
    admin/
      BannerManager.tsx (موجود), GalleryManager.tsx (موجود),
      CmsTheme.tsx, CmsGeneral.tsx, CmsHero.tsx, CmsServices.tsx,
      CmsBranches.tsx, CmsAbout.tsx, CmsFaqs.tsx, CmsWideBanners.tsx,
      LeadsInbox.tsx, ImageUploader.tsx, Sortable.tsx (موجود)
  lib/
    queries.ts, mutations.functions.ts, leads.functions.ts,
    site-types.ts, site-defaults.ts (البذور من DEFAULT_CONFIG),
    pixels.ts (حقن البيكسلات على الكلاينت)
  routes/
    __root.tsx (يحقن الثيم + البيكسلات + Layout)
    index.tsx, about.tsx, services.tsx, branches.tsx, contact.tsx,
    auth.tsx (موجود), _authenticated/route.tsx (موجود),
    _authenticated/admin.tsx (يُعاد بناؤه بتبويبات شاملة),
    api/public/sitemap[.]xml.ts, api/public/robots[.]txt.ts
```

### قرارات
- التحويل من PageSwitcher إلى راوتس يحقّق SEO أفضل ومشاركة روابط فعلية.
- جداول مستقلة بدل JSON واحد ضخم → تحرير ذرّي، فهرسة، RLS أوضح.
- البيكسلات تُحقن في `__root.tsx` بعد قراءة `site_settings` (queryOptions مع staleTime عالٍ).
- الثيم الديناميكي عبر `<style>` معلّق على CSS vars (نفس أسلوب GitHub) داخل `__root.tsx`.
- AdminThemeController الطافي → يُحذف من الموقع العام، يصير تبويب داخل `/admin`.

### خطوات التنفيذ المتسلسلة
1. Migration واحدة شاملة لكل الجداول الجديدة + بذور البيانات.
2. كتابة `queries.ts` و server functions و helpers.
3. نقل وتعديل كل مكوّنات GitHub إلى `src/components/site/` مع ربطها بالكويريز.
4. إنشاء الراوتس الجديدة (`about`, `services`, `branches`, `contact`) + تحديث `index.tsx` + `__root.tsx`.
5. بناء مكوّنات `Cms*` الجديدة وتركيبها في `/_authenticated/admin.tsx`.
6. إضافة `sitemap.xml` و `robots.txt`.
7. تنظيف الكود وفحص البناء.

## ما يبقى كما هو
- `src/integrations/supabase/*` (بدون مساس).
- `src/routes/auth.tsx` و `src/routes/_authenticated/route.tsx`.
- `src/start.ts` (مع التأكد من `attachSupabaseAuth`).
- `BannerManager` و `GalleryManager` الحاليان (يُعاد استخدامهما داخل التبويبات).
- جدولا `banners` و `gallery_items` الحاليان.

## ملاحظة الإطلاق
بعد التنفيذ والفحص، أعرض زر النشر مباشرة. الحجم كبير لكن الخطة منسّقة لتنفّذ في جلسة واحدة بدون توقّف.
