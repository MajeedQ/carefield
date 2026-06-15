import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Plus, Save, X, ChevronUp, ChevronDown, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/storage";

export type CmsField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image" | "list" | "checkbox";
  placeholder?: string;
};

interface CmsCrudProps {
  table: string;
  queryKey: string;
  queryOpts: any;
  fields: CmsField[];
  title: string;
  primary: string; // key used as the row title in the list
}

export function CmsCrud({ table, queryKey, queryOpts, fields, title, primary }: CmsCrudProps) {
  const qc = useQueryClient();
  const { data: rowsRaw = [] as any[], isLoading } = useQuery<any[]>(queryOpts);
  const rows = rowsRaw as any[];
  const [draft, setDraft] = useState<any | null>(null);

  const newRow = () => {
    const obj: any = { active: true };
    fields.forEach((f) => (obj[f.key] = f.type === "list" ? [] : f.type === "checkbox" ? false : ""));
    setDraft(obj);
  };

  const save = useMutation({
    mutationFn: async (d: any) => {
      const payload: any = {};
      fields.forEach((f) => (payload[f.key] = d[f.key]));
      if ("active" in d) payload.active = d.active;
      if (d.id) {
        const { error } = await (supabase.from(table as any) as any).update(payload).eq("id", d.id);
        if (error) throw error;
      } else {
        const sort_order = (rows[rows.length - 1]?.sort_order ?? 0) + 10;
        const { error } = await (supabase.from(table as any) as any).insert({ ...payload, sort_order, active: true });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey] });
      setDraft(null);
    },
  });

  const update = useMutation({
    mutationFn: async (b: any) => {
      const { error } = await (supabase.from(table as any) as any).update(b).eq("id", b.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from(table as any) as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [queryKey] }),
  });

  const moveSort = (idx: number, dir: -1 | 1) => {
    const list = [...rows];
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const a = list[idx], b = list[target];
    update.mutate({ id: a.id, sort_order: b.sort_order });
    update.mutate({ id: b.id, sort_order: a.sort_order });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-[#002c6d]">{title}</h2>
        <button onClick={newRow} className="inline-flex items-center gap-1.5 bg-[#002c6d] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1a438d]">
          <Plus className="w-3.5 h-3.5" /> إضافة
        </button>
      </div>

      {draft && (
        <DraftForm draft={draft} setDraft={setDraft} fields={fields} onSave={() => save.mutate(draft)} onCancel={() => setDraft(null)} saving={save.isPending} />
      )}

      {isLoading ? (
        <p className="text-sm text-slate-500">جاري التحميل...</p>
      ) : rows.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">لا يوجد عناصر</div>
      ) : (
        <div className="space-y-2">
          {rows.map((r, idx) => (
            <div key={r.id} className="bg-white rounded-xl border border-blue-100 p-3 flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveSort(idx, -1)} disabled={idx === 0} className="text-slate-400 hover:text-[#002c6d] disabled:opacity-30"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => moveSort(idx, 1)} disabled={idx === rows.length - 1} className="text-slate-400 hover:text-[#002c6d] disabled:opacity-30"><ChevronDown className="w-3.5 h-3.5" /></button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-[#002c6d] truncate">{r[primary] || "بدون عنوان"}</div>
                <div className="text-xs text-slate-500 truncate">{r.subtitle || r.short_description || r.answer || r.address || r.text || ""}</div>
              </div>
              <label className="flex items-center gap-1 text-xs">
                <input type="checkbox" checked={r.active} onChange={(e) => update.mutate({ id: r.id, active: e.target.checked })} /> مفعّل
              </label>
              <button onClick={() => setDraft(r)} className="text-xs text-[#002c6d] hover:underline">تعديل</button>
              <button onClick={() => { if (confirm("حذف العنصر؟")) remove.mutate(r.id); }} className="text-red-500 hover:bg-red-50 p-1.5 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DraftForm({ draft, setDraft, fields, onSave, onCancel, saving }: any) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-5 space-y-3">
      <div className="flex justify-between">
        <h3 className="font-bold text-sm text-[#002c6d]">{draft.id ? "تعديل" : "إضافة جديد"}</h3>
        <button onClick={onCancel}><X className="w-4 h-4" /></button>
      </div>
      {fields.map((f: CmsField) => {
        const v = draft[f.key] ?? "";
        if (f.type === "textarea") {
          return (
            <label key={f.key} className="block text-xs">
              <span className="font-bold mb-1 block">{f.label}</span>
              <textarea rows={3} value={v} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
          );
        }
        if (f.type === "list") {
          const text = Array.isArray(v) ? v.join("\n") : "";
          return (
            <label key={f.key} className="block text-xs">
              <span className="font-bold mb-1 block">{f.label} (عنصر لكل سطر)</span>
              <textarea rows={4} value={text} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
            </label>
          );
        }
        if (f.type === "checkbox") {
          return (
            <label key={f.key} className="flex items-center gap-2 text-xs">
              <input type="checkbox" checked={!!v} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.checked })} />
              <span>{f.label}</span>
            </label>
          );
        }
        if (f.type === "image") {
          return <ImageField key={f.key} field={f} value={v} onChange={(val) => setDraft({ ...draft, [f.key]: val })} />;
        }
        return (
          <label key={f.key} className="block text-xs">
            <span className="font-bold mb-1 block">{f.label}</span>
            <input type="text" value={v} placeholder={f.placeholder} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
        );
      })}
      <button onClick={onSave} disabled={saving} className="w-full bg-[#002c6d] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a438d] disabled:opacity-50 inline-flex items-center justify-center gap-1.5">
        <Save className="w-4 h-4" /> حفظ
      </button>
    </div>
  );
}
