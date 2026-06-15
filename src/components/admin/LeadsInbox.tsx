import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Phone, MapPin, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { leadsQuery, type DbLead } from "@/lib/site-content";

const STATUSES = [
  { value: "pending", label: "بانتظار", color: "bg-amber-100 text-amber-800" },
  { value: "contacted", label: "تم التواصل", color: "bg-blue-100 text-blue-800" },
  { value: "scheduled", label: "تمت الجدولة", color: "bg-emerald-100 text-emerald-800" },
];

export function LeadsInbox() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery(leadsQuery());

  const update = useMutation({
    mutationFn: async (l: Partial<DbLead> & { id: string }) => {
      const { error } = await (supabase.from("leads" as any) as any).update(l).eq("id", l.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from("leads" as any) as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  if (isLoading) return <p className="text-sm text-slate-500">جاري التحميل...</p>;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-extrabold text-[#002c6d]">طلبات التسجيل ({leads.length})</h2>
      {leads.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          لا توجد طلبات حتى الآن.
        </div>
      ) : (
        <div className="space-y-2">
          {leads.map((l) => {
            const st = STATUSES.find((s) => s.value === l.status) ?? STATUSES[0];
            return (
              <div key={l.id} className="bg-white rounded-xl border border-blue-100 p-4 grid md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-3">
                  <div className="font-bold text-sm text-[#002c6d]">{l.full_name}</div>
                  <a href={`tel:${l.phone}`} className="text-xs text-slate-600 hover:text-[#002c6d] flex items-center gap-1 mt-1" dir="ltr"><Phone className="w-3 h-3" />{l.phone}</a>
                </div>
                <div className="md:col-span-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {l.district}</div>
                  {l.age && <div className="text-slate-400 mt-1">العمر: {l.age}</div>}
                </div>
                <div className="md:col-span-3 text-xs">
                  {l.service_id && <div className="text-slate-600 truncate">الخدمة: {l.service_id}</div>}
                  {l.notes && <div className="text-slate-400 truncate mt-0.5">{l.notes}</div>}
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <select
                    value={l.status}
                    onChange={(e) => update.mutate({ id: l.id, status: e.target.value })}
                    className={`text-xs rounded-md px-2 py-1 border-0 font-bold ${st.color}`}
                  >
                    {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(l.created_at).toLocaleDateString("ar-SA")}</span>
                </div>
                <div className="md:col-span-1 text-right">
                  <button onClick={() => { if (confirm("حذف الطلب؟")) remove.mutate(l.id); }} className="text-red-500 hover:bg-red-50 p-2 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
