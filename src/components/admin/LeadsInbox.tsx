import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Phone, MapPin, Calendar, Download, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { leadsQuery, type DbLead, servicesQuery, branchesQuery } from "@/lib/site-content";

const STATUSES = [
  { value: "pending", label: "بانتظار", color: "bg-amber-100 text-amber-800" },
  { value: "contacted", label: "تم التواصل", color: "bg-blue-100 text-blue-800" },
  { value: "scheduled", label: "تمت الجدولة", color: "bg-emerald-100 text-emerald-800" },
];

function toCsv(rows: DbLead[]) {
  const headers = ["التاريخ", "الاسم", "الجوال", "الحي/الفرع", "العمر", "الخدمة", "الحالة", "ملاحظات"];
  const esc = (v: string | null | undefined) => {
    const s = (v ?? "").toString().replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const lines = [headers.join(",")];
  rows.forEach((r) => {
    lines.push([
      new Date(r.created_at).toLocaleString("ar-SA"),
      esc(r.full_name),
      esc(r.phone),
      esc(r.district),
      esc(r.age),
      esc(r.service_id),
      esc(r.status),
      esc(r.notes),
    ].join(","));
  });
  return "\uFEFF" + lines.join("\n"); // BOM for Excel Arabic
}

export function LeadsInbox() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery(leadsQuery());
  const { data: services = [] } = useQuery(servicesQuery(false));
  const { data: branches = [] } = useQuery(branchesQuery(false));

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [branch, setBranch] = useState("");
  const [service, setService] = useState("");

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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (status && l.status !== status) return false;
      if (branch && !(l.district || "").toLowerCase().includes(branch.toLowerCase())) return false;
      if (service && (l.service_id || "") !== service) return false;
      if (!q) return true;
      return (
        l.full_name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.district || "").toLowerCase().includes(q) ||
        (l.service_id || "").toLowerCase().includes(q) ||
        (l.notes || "").toLowerCase().includes(q)
      );
    });
  }, [leads, search, status, branch, service]);

  const exportCsv = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) return <p className="text-sm text-slate-500">جاري التحميل...</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-[#002c6d]">طلبات التسجيل ({filtered.length}/{leads.length})</h2>
        <button
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> تصدير CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="relative">
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم/الجوال/الملاحظات"
            className="w-full rounded-lg border border-slate-200 pr-8 pl-2 py-2 text-xs"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option value="">كل الحالات</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option value="">كل الفروع/الأحياء</option>
          {branches.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
        <select value={service} onChange={(e) => setService(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option value="">كل الخدمات</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          لا توجد طلبات مطابقة.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-blue-100">
          <table className="w-full text-xs">
            <thead className="bg-blue-50 text-[#002c6d]">
              <tr>
                <th className="text-right p-2.5 font-bold">التاريخ</th>
                <th className="text-right p-2.5 font-bold">الاسم</th>
                <th className="text-right p-2.5 font-bold">الجوال</th>
                <th className="text-right p-2.5 font-bold">الحي/الفرع</th>
                <th className="text-right p-2.5 font-bold">العمر</th>
                <th className="text-right p-2.5 font-bold">الخدمة</th>
                <th className="text-right p-2.5 font-bold">الحالة</th>
                <th className="text-right p-2.5 font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const st = STATUSES.find((s) => s.value === l.status) ?? STATUSES[0];
                const svc = services.find((s) => s.id === l.service_id);
                return (
                  <tr key={l.id} className="border-t border-slate-100 hover:bg-blue-50/30">
                    <td className="p-2.5 text-slate-500 whitespace-nowrap">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(l.created_at).toLocaleDateString("ar-SA")}</span>
                    </td>
                    <td className="p-2.5 font-bold text-[#002c6d]">{l.full_name}</td>
                    <td className="p-2.5">
                      <a href={`tel:${l.phone}`} className="text-slate-700 hover:text-[#002c6d] flex items-center gap-1" dir="ltr">
                        <Phone className="w-3 h-3" />{l.phone}
                      </a>
                    </td>
                    <td className="p-2.5 text-slate-600"><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{l.district}</span></td>
                    <td className="p-2.5 text-slate-500">{l.age || "—"}</td>
                    <td className="p-2.5 text-slate-600 max-w-[160px] truncate" title={svc?.title || l.service_id || ""}>{svc?.title || l.service_id || "—"}</td>
                    <td className="p-2.5">
                      <select
                        value={l.status}
                        onChange={(e) => update.mutate({ id: l.id, status: e.target.value })}
                        className={`text-xs rounded-md px-2 py-1 border-0 font-bold ${st.color}`}
                      >
                        {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className="p-2.5 text-left">
                      <button onClick={() => { if (confirm("حذف الطلب؟")) remove.mutate(l.id); }} className="text-red-500 hover:bg-red-50 p-1.5 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
