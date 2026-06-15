import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { settingsQuery, type DbSettings } from "@/lib/site-content";

const fields: { key: keyof DbSettings; label: string; type?: "text" | "color" | "checkbox" | "textarea" | "select"; options?: string[]; section: string }[] = [
  { key: "primary_color", label: "اللون الرئيسي", type: "color", section: "الثيم" },
  { key: "accent_color", label: "اللون الذهبي", type: "color", section: "الثيم" },
  { key: "background_color", label: "لون الخلفية", type: "color", section: "الثيم" },
  { key: "logo_text", label: "اسم المركز (شعار)", section: "الثيم" },
  { key: "logo_subtitle", label: "العبارة التعريفية", section: "الثيم" },
  { key: "font_family", label: "الخط", type: "select", options: ["tajawal","cairo","inter","grotesk","system"], section: "الثيم" },
  { key: "font_scale", label: "حجم الخط", type: "select", options: ["compact","normal","large","huge"], section: "الثيم" },
  { key: "border_radius", label: "زوايا العناصر", type: "select", options: ["none","small","medium","large","xlarge","full"], section: "الثيم" },
  { key: "spacing_scale", label: "كثافة المسافات", type: "select", options: ["compact","normal","comfortable","loose"], section: "الثيم" },

  { key: "phone1", label: "جوال 1", section: "تواصل" },
  { key: "phone2", label: "جوال 2", section: "تواصل" },
  { key: "whatsapp", label: "واتساب (رقم دولي بدون + أو رابط wa.me كامل)", section: "تواصل" },
  { key: "whatsapp_message" as any, label: "نص رسالة الواتساب الافتراضي (يظهر في الهيدر والفوتر والفقاعة ورسالة نجاح النموذج)", type: "textarea", section: "تواصل" },
  { key: "email", label: "البريد الإلكتروني", section: "تواصل" },
  { key: "twitter", label: "X (تويتر)", section: "تواصل" },
  { key: "instagram", label: "إنستغرام", section: "تواصل" },
  { key: "snapchat", label: "سناب شات", section: "تواصل" },
  { key: "tiktok", label: "تيك توك", section: "تواصل" },
  { key: "linkedin", label: "لينكدإن", section: "تواصل" },

  { key: "announce_enabled", label: "تفعيل الشريط العلوي", type: "checkbox", section: "الإعلان العلوي" },
  { key: "announce_text", label: "نص الإعلان", type: "textarea", section: "الإعلان العلوي" },
  { key: "announce_link", label: "رابط الإعلان", section: "الإعلان العلوي" },
  { key: "announce_bg", label: "لون الخلفية", type: "color", section: "الإعلان العلوي" },
  { key: "announce_color", label: "لون النص", type: "color", section: "الإعلان العلوي" },
  { key: "announce_speed", label: "السرعة", type: "select", options: ["slow","normal","fast"], section: "الإعلان العلوي" },

  { key: "about_title", label: "عنوان قسم من نحن", section: "من نحن" },
  { key: "about_subtitle", label: "العنوان الفرعي", section: "من نحن" },
  { key: "about_description", label: "الوصف العام", type: "textarea", section: "من نحن" },
  { key: "about_vision", label: "الرؤية", type: "textarea", section: "من نحن" },
  { key: "about_mission", label: "الرسالة", type: "textarea", section: "من نحن" },
  { key: "about_image", label: "رابط صورة من نحن", section: "من نحن" },

  { key: "footer_description" as any, label: "وصف الفوتر", type: "textarea", section: "الفوتر" },
  { key: "footer_copyright" as any, label: "نص حقوق الفوتر", type: "textarea", section: "الفوتر" },

  { key: "ga_id", label: "Google Analytics ID", section: "بيكسلات التسويق" },
  { key: "meta_pixel_id", label: "Meta (Facebook) Pixel", section: "بيكسلات التسويق" },
  { key: "snap_pixel_id", label: "Snapchat Pixel", section: "بيكسلات التسويق" },
  { key: "tiktok_pixel_id", label: "TikTok Pixel", section: "بيكسلات التسويق" },

  { key: "sheets_webhook_url", label: "Google Sheets Webhook (اختياري)", section: "تكامل خارجي" },
];

export function CmsSettings() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery(settingsQuery());
  const [draft, setDraft] = useState<Partial<DbSettings>>({});
  const [goalsText, setGoalsText] = useState("");

  useEffect(() => {
    if (data) {
      setDraft(data);
      setGoalsText((data.about_goals ?? []).join("\n"));
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      if (!data) return;
      const payload = { ...draft, about_goals: goalsText.split("\n").map((s) => s.trim()).filter(Boolean) };
      const { error } = await (supabase.from("site_settings" as any) as any).update(payload).eq("id", data.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] }),
  });

  if (isLoading || !data) return <p className="text-sm text-slate-500">جاري التحميل...</p>;

  const sections = Array.from(new Set(fields.map((f) => f.section)));

  // Live preview values from draft
  const pPrimary = (draft.primary_color as string) || data.primary_color;
  const pAccent = (draft.accent_color as string) || data.accent_color;
  const pBg = (draft.background_color as string) || data.background_color;
  const pRadiusMap: Record<string, string> = { none: "0px", small: "6px", medium: "12px", large: "18px", xlarge: "28px", full: "9999px" };
  const pFontMap: Record<string, string> = {
    system: 'system-ui, -apple-system, sans-serif',
    inter: '"Inter", sans-serif',
    cairo: '"Cairo", sans-serif',
    tajawal: '"Tajawal", sans-serif',
    grotesk: '"Space Grotesk", sans-serif',
  };
  const pRadius = pRadiusMap[(draft.border_radius as string) || data.border_radius] ?? "12px";
  const pFont = pFontMap[(draft.font_family as string) || data.font_family] ?? pFontMap.tajawal;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-xl font-extrabold text-[#002c6d]">محرر الثيم وإعدادات الموقع</h2>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="inline-flex items-center gap-1.5 bg-[#002c6d] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1a438d] disabled:opacity-50"
        >
          {save.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          حفظ التغييرات
        </button>
      </div>

      {save.isError && <div className="text-xs text-red-600 bg-red-50 p-2 rounded">{(save.error as Error).message}</div>}
      {save.isSuccess && <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded">تم الحفظ بنجاح</div>}

      {/* Live preview card */}
      <div className="rounded-2xl border border-blue-100 overflow-hidden shadow-sm">
        <div className="px-4 py-2 bg-blue-50 text-[11px] font-bold text-[#002c6d]">معاينة فورية للثيم</div>
        <div className="p-6" style={{ background: pBg, fontFamily: pFont }}>
          <div className="flex flex-wrap items-center gap-4">
            <h3 style={{ color: pPrimary }} className="text-2xl font-black">{(draft.logo_text as string) || data.logo_text}</h3>
            <span style={{ color: pAccent }} className="text-xs font-bold">{(draft.logo_subtitle as string) || data.logo_subtitle}</span>
          </div>
          <p className="mt-3 text-sm" style={{ color: "#334155" }}>
            هكذا تظهر النصوص والأزرار في موقعك. عدّل الألوان والخطوط أعلاه وستراها هنا قبل الحفظ.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button style={{ background: pPrimary, color: "#fff", borderRadius: pRadius }} className="px-4 py-2 text-xs font-bold">زر رئيسي</button>
            <button style={{ background: pAccent, color: "#fff", borderRadius: pRadius }} className="px-4 py-2 text-xs font-bold">زر ثانوي</button>
            <button style={{ background: "#fff", color: pPrimary, border: `1px solid ${pPrimary}`, borderRadius: pRadius }} className="px-4 py-2 text-xs font-bold">زر شفاف</button>
            <span style={{ background: pAccent + "22", color: pAccent, borderRadius: pRadius }} className="px-3 py-2 text-xs font-bold">شارة</span>
          </div>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec} className="bg-white rounded-2xl border border-blue-100 p-5 space-y-4">
          <h3 className="font-bold text-sm text-[#002c6d] border-b border-blue-50 pb-2">{sec}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.filter((f) => f.section === sec).map((f) => {
              const v = (draft as any)[f.key] ?? "";
              return (
                <label key={String(f.key)} className="block text-xs">
                  <span className="font-bold text-slate-600 block mb-1">{f.label}</span>
                  {f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!v}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.checked })}
                    />
                  ) : f.type === "color" ? (
                    <input
                      type="color"
                      value={v || "#000000"}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full h-9 rounded border border-slate-200"
                    />
                  ) : f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={v}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={v}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2"
                    >
                      {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
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
            {sec === "من نحن" && (
              <label className="block text-xs md:col-span-2">
                <span className="font-bold text-slate-600 block mb-1">الأهداف (هدف لكل سطر)</span>
                <textarea
                  rows={5}
                  value={goalsText}
                  onChange={(e) => setGoalsText(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2"
                />
              </label>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
