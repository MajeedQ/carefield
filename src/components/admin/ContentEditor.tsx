import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { settingsQuery } from "@/lib/site-content";

export type ContentField = {
  key: string;
  label: string;
  type?: "text" | "textarea";
  section: string;
};

interface ContentEditorProps {
  title: string;
  column: "content" | "seo";
  fields: ContentField[];
}

export function ContentEditor({ title, column, fields }: ContentEditorProps) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery(settingsQuery());
  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data) setDraft({ ...((data as any)[column] ?? {}) });
  }, [data, column]);

  const save = useMutation({
    mutationFn: async () => {
      if (!data) return;
      const { error } = await (supabase.from("site_settings" as any) as any)
        .update({ [column]: draft })
        .eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] }),
  });

  if (isLoading || !data) return <p className="text-sm text-slate-500">جاري التحميل...</p>;

  const sections = Array.from(new Set(fields.map((f) => f.section)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-extrabold text-[#002c6d]">{title}</h2>
          <p className="text-xs text-slate-500 mt-1">عدّل النصوص والروابط، التغييرات تظهر فور الحفظ.</p>
        </div>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="inline-flex items-center gap-1.5 bg-[#002c6d] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1a438d] disabled:opacity-50"
        >
          {save.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          حفظ
        </button>
      </div>

      {save.isError && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">{(save.error as Error).message}</div>}
      {save.isSuccess && <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded">تم الحفظ بنجاح</div>}

      {sections.map((sec) => (
        <div key={sec} className="bg-white rounded-2xl border border-blue-100 p-5 space-y-4">
          <h3 className="font-bold text-sm text-[#002c6d] border-b border-blue-50 pb-2">{sec}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.filter((f) => f.section === sec).map((f) => {
              const v = draft[f.key] ?? "";
              return (
                <label key={f.key} className={`block text-xs ${f.type === "textarea" ? "md:col-span-2" : ""}`}>
                  <span className="font-bold text-slate-600 block mb-1">{f.label}</span>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={v}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  ) : (
                    <input
                      type="text"
                      value={v}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Field presets ============
export const HOMEPAGE_FIELDS: ContentField[] = [
  { section: "شارة الهيرو", key: "hero_badge_prefix", label: "نص الشارة قبل التصنيف" },
  { section: "شارة الهيرو", key: "hero_badge_emphasis", label: "نص التصنيف المميز" },
  { section: "شارة الهيرو", key: "hero_badge_authority", label: "الجهة المانحة" },

  { section: "عنوان الهيرو", key: "hero_title_line1", label: "السطر الأول من العنوان" },
  { section: "عنوان الهيرو", key: "hero_title_line2", label: "السطر الثاني (بلون مميز)" },
  { section: "عنوان الهيرو", key: "hero_paragraph", label: "الفقرة التعريفية", type: "textarea" },

  { section: "أزرار الهيرو", key: "hero_cta_primary", label: "نص الزر الرئيسي" },
  { section: "أزرار الهيرو", key: "hero_cta_primary_link", label: "رابط الزر الرئيسي" },
  { section: "أزرار الهيرو", key: "hero_cta_secondary", label: "نص الزر الثانوي" },
  { section: "أزرار الهيرو", key: "hero_cta_secondary_link", label: "رابط الزر الثانوي" },
  { section: "أزرار الهيرو", key: "hero_microcopy", label: "ملاحظة أسفل الأزرار", type: "textarea" },

  { section: "ختم الهيرو", key: "hero_stamp_top", label: "السطر العلوي للختم" },
  { section: "ختم الهيرو", key: "hero_stamp_bottom", label: "السطر السفلي للختم" },

  { section: "نموذج التسجيل", key: "form_badge", label: "شارة النموذج العلوية" },
  { section: "نموذج التسجيل", key: "form_title", label: "عنوان النموذج" },
  { section: "نموذج التسجيل", key: "form_subtitle", label: "الوصف أسفل العنوان", type: "textarea" },
  { section: "نموذج التسجيل", key: "form_submit", label: "نص زر الإرسال" },
  { section: "نموذج التسجيل", key: "form_submit_loading", label: "نص الزر أثناء الإرسال" },

  { section: "رسالة نجاح التسجيل", key: "form_success_title", label: "عنوان رسالة النجاح" },
  { section: "رسالة نجاح التسجيل", key: "form_success_body", label: "نص رسالة النجاح", type: "textarea" },
  { section: "رسالة نجاح التسجيل", key: "form_step_1", label: "الخطوة 1" },
  { section: "رسالة نجاح التسجيل", key: "form_step_2", label: "الخطوة 2" },
  { section: "رسالة نجاح التسجيل", key: "form_step_3", label: "الخطوة 3" },
  { section: "رسالة نجاح التسجيل", key: "form_whatsapp_btn", label: "نص زر الواتساب" },
  { section: "رسالة نجاح التسجيل", key: "form_new_btn", label: "نص زر تسجيل مستفيد آخر" },

  { section: "عناوين الأقسام", key: "services_title", label: "عنوان قسم الخدمات" },
  { section: "عناوين الأقسام", key: "services_subtitle", label: "وصف قسم الخدمات", type: "textarea" },
  { section: "عناوين الأقسام", key: "gallery_title", label: "عنوان المعرض" },
  { section: "عناوين الأقسام", key: "gallery_subtitle", label: "وصف المعرض", type: "textarea" },
  { section: "عناوين الأقسام", key: "branches_title", label: "عنوان الفروع" },
  { section: "عناوين الأقسام", key: "branches_subtitle", label: "وصف الفروع", type: "textarea" },
  { section: "عناوين الأقسام", key: "faq_title", label: "عنوان الأسئلة الشائعة" },
  { section: "عناوين الأقسام", key: "faq_subtitle", label: "وصف الأسئلة الشائعة", type: "textarea" },
];

export const SEO_FIELDS: ContentField[] = [
  { section: "الواجهة الرئيسية", key: "home_title", label: "Title" },
  { section: "الواجهة الرئيسية", key: "home_description", label: "Description", type: "textarea" },
  { section: "من نحن", key: "about_title", label: "Title" },
  { section: "من نحن", key: "about_description", label: "Description", type: "textarea" },
  { section: "الخدمات", key: "services_title", label: "Title" },
  { section: "الخدمات", key: "services_description", label: "Description", type: "textarea" },
  { section: "الفروع", key: "branches_title", label: "Title" },
  { section: "الفروع", key: "branches_description", label: "Description", type: "textarea" },
  { section: "تواصل", key: "contact_title", label: "Title" },
  { section: "تواصل", key: "contact_description", label: "Description", type: "textarea" },
];
