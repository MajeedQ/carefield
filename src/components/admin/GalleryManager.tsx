import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Upload, Play, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { galleryQuery, type DbGalleryItem } from "@/lib/site-content";
import { uploadMedia, deleteMedia } from "@/lib/storage";
import { SortableList, FileDropzone } from "./Sortable";

export function GalleryManager() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery(galleryQuery(false));
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: async (input: {
      kind: "image" | "video";
      url: string;
      thumbnail_url?: string;
      title: string;
      category: string;
    }) => {
      const sort_order = (items[items.length - 1]?.sort_order ?? 0) + 10;
      const { error } = await supabase.from("gallery_items").insert({
        ...input,
        thumbnail_url: input.thumbnail_url ?? input.url,
        sort_order,
        active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery_items"] }),
  });

  const update = useMutation({
    mutationFn: async (b: Partial<DbGalleryItem> & { id: string }) => {
      const { error } = await supabase.from("gallery_items").update(b).eq("id", b.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery_items"] }),
  });

  const remove = useMutation({
    mutationFn: async (item: DbGalleryItem) => {
      if (item.url) await deleteMedia(item.url).catch(() => {});
      if (item.thumbnail_url && item.thumbnail_url !== item.url)
        await deleteMedia(item.thumbnail_url).catch(() => {});
      const { error } = await supabase.from("gallery_items").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery_items"] }),
  });

  const reorder = useMutation({
    mutationFn: async (list: DbGalleryItem[]) => {
      await Promise.all(
        list.map((it, i) =>
          supabase.from("gallery_items").update({ sort_order: (i + 1) * 10 }).eq("id", it.id),
        ),
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery_items"] }),
  });

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress("جاري الرفع...");
    try {
      const isVideo = file.type.startsWith("video/");
      const { url } = await uploadMedia(file);
      await create.mutateAsync({
        kind: isVideo ? "video" : "image",
        url,
        title: file.name.replace(/\.[^.]+$/, ""),
        category: isVideo ? "فيديو" : "صور",
      });
      setProgress(null);
    } catch (e: any) {
      setProgress("فشل: " + (e?.message ?? "خطأ"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#002c6d]">إدارة معرض الصور والفيديو</h2>
      </div>

      <FileDropzone
        accept="image/*,video/*"
        onFile={handleUpload}
        hint={progress ?? "صور أو فيديوهات MP4/WebM"}
      />
      {uploading && <p className="text-xs text-slate-500 text-center">⏳ {progress}</p>}

      {isLoading ? (
        <p className="text-sm text-slate-500">جاري التحميل...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          ما في عناصر بعد. اسحب صور أو فيديو هنا للرفع.
        </div>
      ) : (
        <SortableList
          items={items}
          onReorder={(list) => reorder.mutate(list)}
          renderItem={(it) => (
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  {it.kind === "video" ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                      <Play className="w-6 h-6" />
                    </div>
                  ) : (
                    <img src={it.url} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    value={it.title ?? ""}
                    onChange={(e) => update.mutate({ id: it.id, title: e.target.value })}
                    placeholder="العنوان"
                    className="w-full text-sm font-bold bg-transparent border-b border-transparent hover:border-slate-200 focus:border-[#002c6d] outline-none py-0.5"
                  />
                  <input
                    value={it.category ?? ""}
                    onChange={(e) => update.mutate({ id: it.id, category: e.target.value })}
                    placeholder="التصنيف"
                    className="w-full text-xs text-slate-500 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-[#002c6d] outline-none py-0.5"
                  />
                </div>
                <label className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={it.active}
                    onChange={(e) => update.mutate({ id: it.id, active: e.target.checked })}
                  />
                  ظاهر
                </label>
                <button
                  onClick={() => {
                    if (confirm("حذف العنصر؟")) remove.mutate(it);
                  }}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={(it as any).description ?? ""}
                onChange={(e) => update.mutate({ id: it.id, description: e.target.value } as any)}
                placeholder="وصف اختياري يظهر داخل نافذة العرض"
                rows={2}
                className="w-full text-xs rounded-lg border border-slate-200 px-2 py-1.5"
              />
              {it.kind === "video" && (
                <input
                  value={(it as any).external_video_url ?? ""}
                  onChange={(e) => update.mutate({ id: it.id, external_video_url: e.target.value } as any)}
                  placeholder="رابط فيديو خارجي (YouTube/Vimeo embed) — اختياري"
                  dir="ltr"
                  className="w-full text-xs rounded-lg border border-slate-200 px-2 py-1.5"
                />
              )}
            </div>
          )}
        />
      )}
    </div>
  );
}
