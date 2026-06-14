import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Plus, Image as ImageIcon, Type, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { bannersQuery, type DbBanner } from "@/lib/site-content";
import { uploadMedia, deleteMedia } from "@/lib/storage";
import { SortableList, FileDropzone } from "./Sortable";

type Draft = {
  kind: "text" | "image";
  title: string;
  subtitle: string;
  body: string;
  image_url: string;
  bg_color: string;
  text_color: string;
  link_url: string;
};

const empty = (kind: "text" | "image"): Draft => ({
  kind,
  title: "",
  subtitle: "",
  body: "",
  image_url: "",
  bg_color: kind === "text" ? "#fef3c7" : "",
  text_color: kind === "text" ? "#775a19" : "",
  link_url: "",
});

export function BannerManager() {
  const qc = useQueryClient();
  const { data: banners = [], isLoading } = useQuery(bannersQuery(false));
  const [draft, setDraft] = useState<Draft | null>(null);
  const [uploading, setUploading] = useState(false);

  const create = useMutation({
    mutationFn: async (d: Draft) => {
      const sort_order = (banners[banners.length - 1]?.sort_order ?? 0) + 10;
      const { error } = await supabase.from("banners").insert({
        kind: d.kind,
        title: d.title || null,
        subtitle: d.subtitle || null,
        body: d.body || null,
        image_url: d.image_url || null,
        bg_color: d.bg_color || null,
        text_color: d.text_color || null,
        link_url: d.link_url || null,
        sort_order,
        active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["banners"] });
      setDraft(null);
    },
  });

  const update = useMutation({
    mutationFn: async (b: Partial<DbBanner> & { id: string }) => {
      const { error } = await supabase.from("banners").update(b).eq("id", b.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banners"] }),
  });

  const remove = useMutation({
    mutationFn: async (b: DbBanner) => {
      if (b.image_url) await deleteMedia(b.image_url).catch(() => {});
      const { error } = await supabase.from("banners").delete().eq("id", b.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banners"] }),
  });

  const reorder = useMutation({
    mutationFn: async (list: DbBanner[]) => {
      await Promise.all(
        list.map((b, i) =>
          supabase.from("banners").update({ sort_order: (i + 1) * 10 }).eq("id", b.id),
        ),
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["banners"] }),
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const { url } = await uploadMedia(file);
      setDraft((d) => (d ? { ...d, image_url: url } : d));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-[#002c6d]">إدارة البنرات</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setDraft(empty("text"))}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold hover:bg-amber-200"
          >
            <Type className="w-3.5 h-3.5" /> بنر نصي
          </button>
          <button
            onClick={() => setDraft(empty("image"))}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#002c6d] text-white text-xs font-bold hover:bg-[#1a438d]"
          >
            <ImageIcon className="w-3.5 h-3.5" /> بنر بصورة
          </button>
        </div>
      </div>

      {draft && (
        <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-[#002c6d]">
            بنر جديد ({draft.kind === "text" ? "نصي" : "بصورة"})
          </h3>

          <input
            placeholder="العنوان"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          {draft.kind === "image" && (
            <input
              placeholder="عنوان فرعي (اختياري)"
              value={draft.subtitle}
              onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          )}
          {draft.kind === "text" && (
            <textarea
              placeholder="نص البنر"
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          )}
          <input
            placeholder="رابط عند الضغط (اختياري)"
            value={draft.link_url}
            onChange={(e) => setDraft({ ...draft, link_url: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            dir="ltr"
          />

          {draft.kind === "text" && (
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs flex items-center gap-2">
                خلفية:
                <input
                  type="color"
                  value={draft.bg_color}
                  onChange={(e) => setDraft({ ...draft, bg_color: e.target.value })}
                />
              </label>
              <label className="text-xs flex items-center gap-2">
                لون النص:
                <input
                  type="color"
                  value={draft.text_color}
                  onChange={(e) => setDraft({ ...draft, text_color: e.target.value })}
                />
              </label>
            </div>
          )}

          {draft.kind === "image" && (
            <div className="space-y-2">
              {draft.image_url ? (
                <div className="relative">
                  <img
                    src={draft.image_url}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => setDraft({ ...draft, image_url: "" })}
                    className="absolute top-2 left-2 bg-white/90 text-red-600 rounded-full p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <FileDropzone
                  accept="image/*"
                  onFile={handleUpload}
                  hint={uploading ? "جاري الرفع..." : "PNG / JPG / WEBP"}
                />
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => create.mutate(draft)}
              disabled={create.isPending || uploading || (draft.kind === "image" && !draft.image_url)}
              className="flex-1 bg-[#002c6d] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a438d] disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" /> حفظ
            </button>
            <button
              onClick={() => setDraft(null)}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-slate-500">جاري التحميل...</p>
      ) : banners.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          ما في بنرات حالياً. اضغط زر إضافة بنر.
        </div>
      ) : (
        <SortableList
          items={banners}
          onReorder={(list) => reorder.mutate(list)}
          renderItem={(b) => (
            <div className="flex items-center gap-3">
              {b.kind === "image" && b.image_url ? (
                <img src={b.image_url} alt="" className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: b.bg_color || "#fef3c7", color: b.text_color || "#775a19" }}
                >
                  نص
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#002c6d] truncate">{b.title || "بدون عنوان"}</div>
                <div className="text-xs text-slate-500 truncate">{b.body || b.subtitle || ""}</div>
              </div>
              <label className="flex items-center gap-1.5 text-xs">
                <input
                  type="checkbox"
                  checked={b.active}
                  onChange={(e) => update.mutate({ id: b.id, active: e.target.checked })}
                />
                مفعّل
              </label>
              <button
                onClick={() => {
                  if (confirm("حذف البنر؟")) remove.mutate(b);
                }}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}
