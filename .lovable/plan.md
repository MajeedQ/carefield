## الهدف
نقل تصميم وكود مشروع `--main.zip` (مركز مجال العناية) إلى هذا المشروع الحالي على TanStack Start، مع الحفاظ على هيكلة TanStack Start (ملف `src/routes/index.tsx` بدل `App.tsx`).

## ما يحتويه المشروع المرفوع
- React 19 + Vite + Tailwind v4 + `motion` + `lucide-react`
- 11 مكوّن: `Header`, `RegistrationBanner`, `Hero`, `TrustIndicators`, `ServicesGrid`, `ServiceDetailModal`, `GallerySection`, `LeadForm`, `InquiryDashboard`, `FAQSection`, `Footer`, `LucideIcon`
- `src/data.ts` (محتوى الخدمات/الأسئلة/المعرض) و `src/types.ts`
- خطوط: Noto Kufi Arabic + IBM Plex Sans Arabic
- ألوان: أزرق `#002c6d` + ذهبي `#e9c176` على خلفية `#f8f9ff`
- نموذج التسجيل ولوحة الاستفسارات يعتمدان على `localStorage` (لا backend)

## خطة التنفيذ

1. **التبعيات**
   - `bun add motion` (المشروع الأصلي يستخدم `motion` لا `framer-motion`)
   - `lucide-react` موجود مسبقاً

2. **الخطوط والثيم** (`src/styles.css`)
   - إضافة استيراد Google Fonts لـ Noto Kufi Arabic + IBM Plex Sans Arabic داخل `index.html` الجذر (عبر `__root.tsx` head)
   - تحديث `--font-sans` ليصبح Noto Kufi Arabic، وإضافة `--font-display` لـ IBM Plex
   - إضافة متغيرات الألوان الخاصة بالمشروع (primary/secondary/accent-gold/surface)

3. **الجذر** (`src/routes/__root.tsx`)
   - ضبط `<html lang="ar" dir="rtl">` وإضافة preconnect + رابط Google Fonts
   - تحديث العنوان والوصف (SEO عربي)

4. **نقل المكونات** إلى `src/components/site/`:
   - نسخ كل ملفات `components/*.tsx` و `LucideIcon.tsx` و `data.ts` و `types.ts` كما هي (تعديل بسيط للمسارات النسبية)
   - الحفاظ على `localStorage` لـ `LeadForm` + `InquiryDashboard` (سنربطها لاحقاً بـ Google Sheets / Lovable Cloud حسب طلبك القادم)

5. **الصفحة الرئيسية** (`src/routes/index.tsx`)
   - استبدال المحتوى الحالي بنفس بنية `App.tsx` من المشروع المرفوع (نفس الحالات: `selectedService`, `preselectedForForm`, `reloadInquiries`)
   - الحفاظ على RTL والـ direction
   - استخدام `head()` من TanStack لإضافة العنوان والوصف

6. **زر الواتساب العائم** يبقى كما في النسخة الحالية (إن لم يكن موجوداً في الملفات الأصلية، نضيفه داخل `index.tsx`)

7. **التحقق**
   - قراءة preview للتأكد من ظهور كل الأقسام بالخطوط والألوان الصحيحة

## ملاحظات
- لن أضيف Lovable Cloud أو ربط Google Sheets/Pixels في هذه الخطوة — هذي مرحلة منفصلة نتفق عليها بعد ما يتثبت التصميم.
- لن أنشئ `.env` ولا أنقل ملف `metadata.json` أو `vite.config.ts` من المشروع الأصلي (إعدادات TanStack الحالية تكفي).
- صور المعرض ستبقى كما هي معرّفة في `data.ts` (روابط Unsplash/خارجية).

## التقنيات
- الإطار: TanStack Start (نفس الحالي)
- Tailwind v4 + متغيرات `@theme`
- `motion` للحركات
- `lucide-react` للأيقونات

هل أبدأ التنفيذ؟
