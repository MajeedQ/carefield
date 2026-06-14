/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Search, Trash2, ShieldAlert, Check, Clock, User, PhoneCall, Filter, ExternalLink } from 'lucide-react';
import { LeadSubmission } from '@/lib/site-types';

interface InquiryDashboardProps {
  reloadTrigger: number;
}

export const InquiryDashboard: React.FC<InquiryDashboardProps> = ({ reloadTrigger }) => {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadLeads();
  }, [reloadTrigger]);

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('care_field_leads');
      if (stored) {
        setLeads(JSON.parse(stored) as LeadSubmission[]);
      } else {
        setLeads([]);
      }
    } catch (err) {
      console.error('Error loading stored leads:', err);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm('هل أنت متأكد من رغبتك في حذف هذا الطلب الاستشاري بشكل نهائي من السجلات المحفوظة؟');
    if (!confirmed) return;

    try {
      const updated = leads.filter(lead => lead.id !== id);
      localStorage.setItem('care_field_leads', JSON.stringify(updated));
      setLeads(updated);
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'contacted' | 'scheduled') => {
    try {
      const updated = leads.map(lead => {
        if (lead.id === id) {
          return { ...lead, status: newStatus };
        }
        return lead;
      });
      localStorage.setItem('care_field_leads', JSON.stringify(updated));
      setLeads(updated);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Filter and search
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.phone.includes(searchQuery) || 
      lead.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && lead.status === statusFilter;
  });

  return (
    <section className="bg-slate-50 border-t border-slate-200/60 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Toggle Panel Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-full font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>{isOpen ? 'إخفاء لوحة مراجعة الطلبات المودعة' : 'عرض طلبات تذاكر الاستشارة المودعة (خاص بالمشرفين)'}</span>
            <span className="bg-slate-800 text-amber-200 px-1.5 py-0.5 rounded-full text-[10px]">{leads.length}</span>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-200/80">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-4 mb-6">
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                      <span>سجل تذاكر الاستشارة الرقمية - الرياض</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      هذه لوحة تحكم محاكاة للمشرفين لمراجعة طلبات أولياء الأمور وحفظ أرقام هواتفهم وتتبع الاستجابة محلياً.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* Status badges count total */}
                    <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold px-2 py-1 rounded">
                      قيد الانتظار: {leads.filter(l => l.status === 'pending').length}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-1 rounded">
                      تم الاتصال: {leads.filter(l => l.status === 'contacted').length}
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded">
                      تم الحجز: {leads.filter(l => l.status === 'scheduled').length}
                    </span>
                  </div>
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-400">لا توجد طلبات مسجلة حتى الآن. يرجى تعبئة النموذج أعلاه لتظهر البيانات هنا في الوقت الفعلي.</p>
                  </div>
                ) : (
                  <>
                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="ابحث بالاسم، الجوال، أو الحي الجغرافي..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full text-xs rounded-xl border border-slate-200 pr-9 pl-3 py-2.5 bg-slate-50/50 focus:bg-white focus:border-[#002c6d] focus:ring-1 focus:ring-[#002c6d] outline-hidden text-right"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="text-xs rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50 outline-hidden"
                        >
                          <option value="all">كل الحالات الجارية</option>
                          <option value="pending">قيد الانتظار</option>
                          <option value="contacted">تم الاتصال والتأهيل</option>
                          <option value="scheduled">تم حجز الكشف الطبي</option>
                        </select>
                      </div>
                    </div>

                    {/* Leads listing */}
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                      {filteredLeads.map((lead) => (
                        <div 
                          key={lead.id}
                          className="p-4 rounded-xl border border-slate-100 bg-slate-50/80 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{lead.fullName}</span>
                              <span className="text-[10px] font-mono text-slate-400">({lead.id})</span>
                              
                              {/* Status badge inline */}
                              {lead.status === 'pending' && (
                                <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>بانتظار الأخصائي</span>
                                </span>
                              )}
                              {lead.status === 'contacted' && (
                                <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <PhoneCall className="w-2.5 h-2.5" />
                                  <span>تم الاتصال الأولي</span>
                                </span>
                              )}
                              {lead.status === 'scheduled' && (
                                <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>حجز زيارة مجانية</span>
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 leading-none">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-400" />
                                <span dir="ltr">{lead.phone}</span>
                              </span>
                              <span>•</span>
                              <span>الحي: {lead.district}</span>
                              <span>•</span>
                              <span className="text-[#002c6d] font-medium">الخدمة: {lead.serviceId}</span>
                            </div>

                            {lead.notes && (
                              <p className="text-[11px] bg-white p-2 rounded-lg border border-slate-100 text-slate-600 mt-2 font-light">
                                تفاصيل وملاحظات: {lead.notes}
                              </p>
                            )}

                            <span className="block text-[10px] text-slate-400 mt-1">
                              تاريخ التقديم: {new Date(lead.createdAt).toLocaleString('ar-SA')}
                            </span>
                          </div>

                          {/* Quick statuses action panel */}
                          <div className="flex items-center gap-2 self-end md:self-center">
                            <span className="text-[10px] text-slate-400">برمجة الحالة:</span>
                            <div className="inline-flex rounded-lg overflow-hidden border border-slate-200">
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'pending')}
                                className={`px-2 py-1 text-[10px] font-medium border-l border-slate-200 ${lead.status === 'pending' ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-white hover:bg-slate-100 text-slate-600'}`}
                              >
                                انتظار
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'contacted')}
                                className={`px-2 py-1 text-[10px] font-medium border-l border-slate-200 ${lead.status === 'contacted' ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-white hover:bg-slate-100 text-slate-600'}`}
                              >
                                اتصال
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(lead.id, 'scheduled')}
                                className={`px-2 py-1 text-[10px] font-medium ${lead.status === 'scheduled' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-white hover:bg-slate-100 text-slate-600'}`}
                              >
                                حجز
                              </button>
                            </div>

                            <button
                              onClick={(e) => handleDelete(lead.id, e)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              aria-label="حذف التذكرة"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
