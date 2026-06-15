import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Phone, MapPin, Calendar, Download, Search, X, ArrowUp, ArrowDown, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { leadsQuery, type DbLead, servicesQuery, branchesQuery } from "@/lib/site-content";

const STATUSES = [
  { value: "pending", label: "بانتظار", color: "bg-amber-100 text-amber-800" },
  { value: "contacted", label: "تم التواصل", color: "bg-blue-100 text-blue-800" },
  { value: "scheduled", label: "تمت الجدولة", color: "bg-emerald-100 text-emerald-800" },
];

type SortKey = "created_at" | "full_name" | "phone" | "district" | "age" | "status";
type SortDir = "asc" | "desc";

const PAGE_SIZES = [10, 25, 50, 100];

function fmtDateExcel(iso: string) {
  // YYYY-MM-DD HH:mm — universal, Excel-friendly, sortable
  try {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

function fmtDateAr(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "2-digit" }) +
      " · " + d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

function toCsv(
  rows: DbLead[],
  servicesMap: Map<string, string>,
  statusMap: Map<string, string>,
) {
  const headers = [
    "رقم التذكرة",
    "تاريخ الإرسال",
    "الاسم الكامل",
    "رقم الجوال",
    "الحي / الفرع",
    "عمر المستفيد",
    "الخدمة المطلوبة",
    "حالة الطلب",
    "ملاحظات إضافية",
  ];
  const esc = (v: string | number | null | undefined) => {
    const s = (v ?? "").toString().replace(/"/g, '""');
    // Wrap every cell — safest for Excel + Arabic + commas
    return `"${s}"`;
  };

  // CRLF + UTF-8 BOM = the combination Excel needs to render Arabic + open cleanly
  const lines = [headers.map(esc).join(",")];
  rows.forEach((r) => {
    lines.push([
      esc(r.id?.slice(0, 8).toUpperCase()),
      esc(fmtDateExcel(r.created_at)),
      esc(r.full_name),
      esc(r.phone),
      esc(r.district),
      esc(r.age),
      esc(servicesMap.get(r.service_id || "") || r.service_id || ""),
      esc(statusMap.get(r.status) || r.status),
      esc(r.notes),
    ].join(","));
  });
  return "\uFEFF" + lines.join("\r\n");
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
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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

  const servicesMap = useMemo(
    () => new Map(services.map((s) => [s.id, s.title])),
    [services],
  );
  const statusMap = useMemo(
    () => new Map(STATUSES.map((s) => [s.value, s.label])),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = leads.filter((l) => {
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
    rows.sort((a, b) => {
      const av = (a[sortKey] ?? "") as string;
      const bv = (b[sortKey] ?? "") as string;
      const cmp = sortKey === "created_at"
        ? new Date(av).getTime() - new Date(bv).getTime()
        : String(av).localeCompare(String(bv), "ar");
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [leads, search, status, branch, service, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  };

  const exportCsv = () => {
    const csv = toCsv(filtered, servicesMap, statusMap);
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

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 font-bold hover:text-[#002c6d]">
      {label}
      {sortKey === k ? (sortDir === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />) : null}
    </button>
  );

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
          <Download className="w-4 h-4" /> تصدير المُفلتر ({filtered.length}) إلى Excel/CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="relative">
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="بحث بالاسم/الجوال/الملاحظات"
            className="w-full rounded-lg border border-slate-200 pr-8 pl-2 py-2 text-xs"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option value="">كل الحالات</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={branch} onChange={(e) => { setBranch(e.target.value); setPage(1); }} className="rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option value="">كل الفروع/الأحياء</option>
          {branches.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
        <select value={service} onChange={(e) => { setService(e.target.value); setPage(1); }} className="rounded-lg border border-slate-200 px-2 py-2 text-xs">
          <option value="">كل الخدمات</option>
          {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
          لا توجد طلبات مطابقة.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-xl border border-blue-100">
            <table className="w-full text-xs">
              <thead className="bg-blue-50 text-[#002c6d]">
                <tr>
                  <th className="text-right p-2.5"><SortBtn k="created_at" label="التاريخ" /></th>
                  <th className="text-right p-2.5"><SortBtn k="full_name" label="الاسم" /></th>
                  <th className="text-right p-2.5"><SortBtn k="phone" label="الجوال" /></th>
                  <th className="text-right p-2.5"><SortBtn k="district" label="الحي/الفرع" /></th>
                  <th className="text-right p-2.5"><SortBtn k="age" label="العمر" /></th>
                  <th className="text-right p-2.5 font-bold">الخدمة</th>
                  <th className="text-right p-2.5"><SortBtn k="status" label="الحالة" /></th>
                  <th className="text-right p-2.5 font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((l) => {
                  const st = STATUSES.find((s) => s.value === l.status) ?? STATUSES[0];
                  const svc = services.find((s) => s.id === l.service_id);
                  return (
                    <tr key={l.id} className="border-t border-slate-100 hover:bg-blue-50/30 transition-colors">
                      <td className="p-2.5 text-slate-500 whitespace-nowrap">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDateAr(l.created_at)}</span>
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
                        <button onClick={() => { if (confirm("حذف الطلب؟")) remove.mutate(l.id); }} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-xl border border-blue-100 px-4 py-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span>عرض لكل صفحة:</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                className="rounded-md border border-slate-200 px-2 py-1"
              >
                {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <span className="text-slate-400">·</span>
              <span>
                {((currentPage - 1) * pageSize) + 1} – {Math.min(currentPage * pageSize, filtered.length)} من {filtered.length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 disabled:opacity-40 hover:bg-blue-50"
              >
                <ChevronRight className="w-3.5 h-3.5" /> السابق
              </button>
              <span className="px-3 py-1.5 font-bold text-[#002c6d]">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 disabled:opacity-40 hover:bg-blue-50"
              >
                التالي <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
