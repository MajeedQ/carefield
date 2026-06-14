/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, Phone, User, Landmark, HelpCircle, Loader2 } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/site-data';
import { LeadSubmission } from '@/lib/site-types';

interface LeadFormProps {
  preselectedService: string;
  onClearPreselected: () => void;
  onNewInquiryAdded: () => void; // Reload list inside parent Dashboard if visible
}

export const LeadForm: React.FC<LeadFormProps> = ({ 
  preselectedService, 
  onClearPreselected,
  onNewInquiryAdded
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketId, setTicketId] = useState('');

  // Sync preselected service from modal clicks
  useEffect(() => {
    if (preselectedService) {
      setServiceOfInterest(preselectedService);
      // Smoothly scroll to the form element
      const element = document.getElementById('lead-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage('يرجى كتابة الاسم الكامل (ثلاثي على الأقل) للاستشارة.');
      return;
    }

    // Saudi Phone format: must start with 05 (or 9665) and be 10 digits
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const saudiPhoneRegex = /^(05|5)\d{8}$/;
    if (!saudiPhoneRegex.test(cleanPhone)) {
      setErrorMessage('يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام.');
      return;
    }

    if (!district.trim()) {
      setErrorMessage('يرجى تحديد الحي أو المنطقة السكنية لتنسيق النقل ومجموعات التدريب.');
      return;
    }

    setIsLoading(true);

    // Simulate submission delay
    setTimeout(() => {
      const ggenId = 'MC-' + Math.floor(100000 + Math.random() * 900000);
      
      const newLead: LeadSubmission = {
        id: ggenId,
        fullName: fullName.trim(),
        phone: cleanPhone,
        district: district.trim(),
        serviceId: serviceOfInterest || 'تأهيل عام',
        notes: notes.trim() || undefined,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      // Save to localStorage
      try {
        const existingLeadsStr = localStorage.getItem('care_field_leads') || '[]';
        const existingLeads = JSON.parse(existingLeadsStr) as LeadSubmission[];
        existingLeads.unshift(newLead);
        localStorage.setItem('care_field_leads', JSON.stringify(existingLeads));
      } catch (err) {
        console.error('Failed to save lead local:', err);
      }

      setTicketId(ggenId);
      setIsLoading(false);
      setIsSuccess(true);
      
      // Reset inputs
      setFullName('');
      setPhone('');
      setDistrict('');
      setServiceOfInterest('');
      setNotes('');
      onClearPreselected();
      onNewInquiryAdded(); // Trigger reload list
    }, 1500);
  };

  return (
    <section id="lead-form-section" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-[#f8f9ff] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 relative z-10 border border-blue-105-50" id="lead-form">
        
        {/* Top Visual Accent */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-[#002c6d] rounded-t-2xl" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="form-entry"
            >
              {/* Heading */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#002c6d] mb-3">
                  سجل بياناتك للتواصل واستلام الاستشارة
                </h2>
                <p className="text-sm md:text-base text-[#434651] font-light leading-relaxed max-w-xl mx-auto">
                  يرجى تعيئة النموذج أدناه بكافة التفاصيل، وسيقوم المشرف الرياضي أو الأخصائي الاجتماعي بالتواصل معكم خلال 24 ساعة لدراسة الملف وتنسيق الكشف المبدئي.
                </p>
              </div>

              {/* Error box */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border-r-4 border-red-500 rounded-lg text-sm text-red-700 font-medium"
                >
                  {errorMessage}
                </motion.div>
              )}

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-sm font-semibold text-[#011a43] flex items-center gap-1.5" htmlFor="fullName">
                      <User className="w-4 h-4 text-[#775a19]" />
                      <span>الاسم الكامل للمستفيد (أو ولي الأمر) <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: أحمد عبد الله الرويلي"
                      className="rounded-xl border border-blue-100 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#002c6d] focus:bg-white focus:ring-1 focus:ring-[#002c6d] transition-all font-light text-right placeholder-slate-400"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-sm font-semibold text-[#011a43] flex items-center gap-1.5" htmlFor="phone">
                      <Phone className="w-4 h-4 text-[#775a19]" />
                      <span>رقم الجوال للتواصل والدراسة <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className="rounded-xl border border-blue-100 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#002c6d] focus:bg-white focus:ring-1 focus:ring-[#002c6d] transition-all font-light text-right placeholder-slate-400"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* District / Locale */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-sm font-semibold text-[#011a43] flex items-center gap-1.5" htmlFor="district">
                      <Landmark className="w-4 h-4 text-[#775a19]" />
                      <span>البلدة أو الحي بمدينة الرياض <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="مثال: ضاحية لبن / حي النزهة"
                      className="rounded-xl border border-blue-100 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#002c6d] focus:bg-white focus:ring-1 focus:ring-[#002c6d] transition-all font-light text-right placeholder-slate-400"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Service Of Interest */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs md:text-sm font-semibold text-[#011a43] flex items-center gap-1.5" htmlFor="serviceInterest">
                      <HelpCircle className="w-4 h-4 text-[#775a19]" />
                      <span>الخدمة الرئيسية المطلوبة</span>
                    </label>
                    <div className="relative">
                      <select
                        id="serviceInterest"
                        value={serviceOfInterest}
                        onChange={(e) => setServiceOfInterest(e.target.value)}
                        className="w-full rounded-xl border border-blue-100 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#002c6d] focus:bg-white focus:ring-1 focus:ring-[#002c6d] transition-all font-light text-right appearance-none"
                        disabled={isLoading}
                      >
                        <option value="">-- اختر أحد البرامج التأهيلية --</option>
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.title}>
                            {srv.title}
                          </option>
                        ))}
                        <option value="الرعاية العامة">استفسار تأهيلي عام</option>
                      </select>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional custom notes */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs md:text-sm font-semibold text-[#011a43]" htmlFor="notes">
                    ملاحظات طبية أو استفسارات خاصة (اختياري)
                  </label>
                  <textarea 
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="اكتب هنا أي تفاصيل تود مشاركتها حول حالة ابنكم الغالي أو مواعيد الحضور الملائمة..."
                    className="rounded-xl border border-blue-100 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#002c6d] focus:bg-white focus:ring-1 focus:ring-[#002c6d] transition-all font-light text-right placeholder-slate-400"
                    disabled={isLoading}
                  />
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#002c6d] text-white py-4 rounded-xl font-bold hover:bg-[#1a438d] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-900/10 hover:shadow-xl cursor-pointer disabled:opacity-75 disabled:cursor-wait group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري إرسال الطلب وتسجيل التذكرة الطبية...</span>
                    </>
                  ) : (
                    <>
                      <span>طلب التواصل الفوري والزيارة</span>
                      <Send className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              key="form-success"
              className="text-center py-8 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                تم استلام الطلب رقم {ticketId} بنجاح
              </span>

              <h2 className="text-2xl md:text-3xl font-black text-[#002c6d] mt-4 mb-3">
                شكرًا لثقتكم بمركز مجال العناية!
              </h2>

              <p className="text-sm md:text-base text-[#434651] font-light leading-relaxed max-w-xl mx-auto">
                لقد تم تسجيل بياناتكم وتمريرها للأخصائي في قسم الاستشارات لفرع <strong className="font-semibold text-[#002c6d]">الرياض</strong>. سيقوم الأخصائي بطلب دراسة الحالة من خلال مراجعة ملفكم والاتصال الهاتفي السريع.
              </p>

              {/* Onboarding info or fast actions */}
              <div className="mt-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-105-50 max-w-lg w-full text-right flex flex-col gap-4">
                <h4 className="font-bold text-[#002c6d] text-sm">خطواتكم القادمة:</h4>
                <div className="space-y-3.5 text-xs text-[#434651] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#002c6d] font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                    <span>استقبال مكالمة ترحيبية قصيرة لتسجيل موعد الزيارة الاستكشافية.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#002c6d] font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                    <span>إحضار المستندات الطبية والهوية الشخصية المعتمدة برفقتكم للمركز.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#002c6d] font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                    <span>مقابلة الفريق الاستشاري وإجراء التقييم السلوكي مجانًا لتحديد خط المهارات.</span>
                  </div>
                </div>
              </div>

              {/* Buttons on completion */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-[#434651] hover:bg-slate-50 transition-colors"
                >
                  تقديم طلب استشارة آخر
                </button>
                <a
                  href="https://wa.me/966560098881"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl text-xs font-bold hover:scale-[1.01] transition-transform shadow-md"
                >
                  <span>التواصل الفوري عبر الواتساب</span>
                </a>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
