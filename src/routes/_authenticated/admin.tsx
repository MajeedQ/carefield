import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Image as ImageIcon, Megaphone, Home, Settings, BookOpen, Award, MapPin, HelpCircle, Mail, Layers, Search, FileText, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { BannerManager } from "@/components/admin/BannerManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { CmsSettings } from "@/components/admin/CmsSettings";
import { CmsCrud } from "@/components/admin/CmsCrud";
import { LeadsInbox } from "@/components/admin/LeadsInbox";
import { ContentEditor, HOMEPAGE_FIELDS, SEO_FIELDS } from "@/components/admin/ContentEditor";
import {
  servicesQuery, faqsQuery, branchesQuery, heroSlidesQuery,
  trustBadgesQuery, wideBannersQuery, heroStatsQuery,
} from "@/lib/site-content";
import { blogPostsQuery } from "@/lib/blog";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم - مركز مجال العناية" }] }),
  component: AdminPage,
});

type TabKey = "settings" | "homepage" | "seo" | "leads" | "hero" | "stats" | "wide" | "banners" | "services" | "branches" | "trust" | "faqs" | "gallery" | "blog";

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: "settings", label: "الإعدادات العامة", icon: Settings },
  { key: "homepage", label: "محتوى الواجهة والنموذج", icon: FileText },
  { key: "seo", label: "SEO ومحركات البحث", icon: Search },
  { key: "leads", label: "الطلبات الواردة", icon: Mail },
  { key: "hero", label: "شرائح الهيرو", icon: ImageIcon },
  { key: "stats", label: "إحصائيات الهيرو", icon: BarChart3 },
  { key: "wide", label: "بانرات عريضة", icon: Layers },
  { key: "banners", label: "بانرات نصية", icon: Megaphone },
  { key: "services", label: "الخدمات", icon: BookOpen },
  { key: "branches", label: "الفروع", icon: MapPin },
  { key: "trust", label: "شارات الثقة", icon: Award },
  { key: "faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
  { key: "gallery", label: "المعرض", icon: ImageIcon },
  { key: "blog", label: "المدونة", icon: FileText },
];

function AdminPage() {
  const [tab, setTab] = useState<TabKey>("settings");
  const navigate = useNavigate();
  const qc = useQueryClient();

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-[#f8f9ff] font-sans">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-base md:text-lg font-extrabold text-[#002c6d]">لوحة تحكم المركز</h1>
          <div className="flex items-center gap-2">
            <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002c6d] hover:bg-blue-50 px-3 py-1.5 rounded-lg">
              <Home className="w-3.5 h-3.5" /> الموقع
            </a>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg">
              <LogOut className="w-3.5 h-3.5" /> خروج
            </button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                  active ? "border-[#002c6d] text-[#002c6d]" : "border-transparent text-slate-500 hover:text-[#002c6d]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {tab === "settings" && <CmsSettings />}
        {tab === "homepage" && <ContentEditor title="محتوى الواجهة الرئيسية والنموذج" column="content" fields={HOMEPAGE_FIELDS} />}
        {tab === "seo" && <ContentEditor title="عناوين ووصف SEO لكل صفحة" column="seo" fields={SEO_FIELDS} />}
        {tab === "leads" && <LeadsInbox />}
        {tab === "stats" && (
          <CmsCrud
            table="hero_stats" queryKey="hero_stats" queryOpts={heroStatsQuery(false)}
            title="إحصائيات الهيرو" primary="num"
            fields={[
              { key: "num", label: "الرقم/النص الأبرز (مثل +٨ سنوات)" },
              { key: "label", label: "الوصف" },
            ]}
          />
        )}
        {tab === "banners" && <BannerManager />}
        {tab === "gallery" && <GalleryManager />}
        {tab === "hero" && (
          <CmsCrud
            table="hero_slides" queryKey="hero_slides" queryOpts={heroSlidesQuery(false)}
            title="شرائح القسم الرئيسي (الهيرو)"
            primary="title"
            fields={[
              { key: "title", label: "العنوان" },
              { key: "subtitle", label: "العنوان الفرعي", type: "textarea" },
              { key: "image_url", label: "صورة الشريحة", type: "image" },
              { key: "tag", label: "وسم (مثل: رعاية صحية)" },
            ]}
          />
        )}
        {tab === "wide" && (
          <CmsCrud
            table="wide_banners" queryKey="wide_banners" queryOpts={wideBannersQuery(false)}
            title="البانرات العريضة" primary="title"
            fields={[
              { key: "title", label: "العنوان" },
              { key: "subtitle", label: "العنوان الفرعي", type: "textarea" },
              { key: "image_url", label: "صورة البانر", type: "image" },
              { key: "tag", label: "وسم" },
              { key: "link_url", label: "رابط الزر (مثل #lead-form)" },
              { key: "button_text", label: "نص الزر" },
            ]}
          />
        )}
        {tab === "services" && (
          <CmsCrud
            table="services" queryKey="services" queryOpts={servicesQuery(false)}
            title="الخدمات" primary="title"
            fields={[
              { key: "title", label: "اسم الخدمة" },
              { key: "icon_name", label: "اسم الأيقونة (Lucide مثل Brain, Activity, BookOpen)" },
              { key: "short_description", label: "وصف مختصر", type: "textarea" },
              { key: "detailed_description", label: "وصف تفصيلي", type: "textarea" },
              { key: "benefits", label: "الفوائد", type: "list" },
              { key: "target_age", label: "الفئة العمرية" },
              { key: "sessions_per_week", label: "عدد الجلسات الأسبوعية" },
            ]}
          />
        )}
        {tab === "branches" && (
          <CmsCrud
            table="branches" queryKey="branches" queryOpts={branchesQuery(false)}
            title="الفروع" primary="name"
            fields={[
              { key: "name", label: "اسم الفرع" },
              { key: "address", label: "العنوان", type: "textarea" },
              { key: "map_url", label: "رابط خريطة Google Maps embed" },
              { key: "share_url", label: "رابط المشاركة (maps.app.goo.gl)" },
              { key: "phone", label: "هاتف الفرع" },
            ]}
          />
        )}
        {tab === "trust" && (
          <CmsCrud
            table="trust_badges" queryKey="trust_badges" queryOpts={trustBadgesQuery(false)}
            title="شارات الثقة" primary="text"
            fields={[
              { key: "icon", label: "أيقونة (Award, Users, Building2, Bus...)" },
              { key: "text", label: "النص" },
            ]}
          />
        )}
        {tab === "faqs" && (
          <CmsCrud
            table="faqs" queryKey="faqs" queryOpts={faqsQuery(false)}
            title="الأسئلة الشائعة" primary="question"
            fields={[
              { key: "question", label: "السؤال" },
              { key: "answer", label: "الجواب", type: "textarea" },
            ]}
          />
        )}
      </main>
    </div>
  );
}
