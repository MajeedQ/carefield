/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, User, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '@/context/AppContext';
import { trackEvent } from '@/lib/pixels';

interface LeadFormProps {
  preselectedService: string;
  onClearPreselected: () => void;
  onNewInquiryAdded: () => void;
}


export const LeadForm: React.FC<LeadFormProps> = ({ 
  preselectedService, 
  onClearPreselected,
  onNewInquiryAdded
}) => {
  const { addLead, config } = useApp();
  const c = config.content || {};
  const waRaw = String(config?.socialMedia?.whatsapp || '966560098881').trim();
  const waText = encodeURIComponent(config?.socialMedia?.whatsappMessage || 'السلام عليكم، أرسلت طلب تسجيل عبر الموقع وأرغب بتأكيد موعد التقييم المجاني.');
  const whatsappUrl = waRaw.startsWith('http')
    ? (waRaw.includes('?') ? waRaw : `${waRaw}?text=${waText}`)
    : `https://wa.me/${waRaw.replace(/\+/g, '')}?text=${waText}`;
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [ageOfBeneficiary, setAgeOfBeneficiary] = useState('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync preselected service from modal clicks (keep internally as tracking context)
  useEffect(() => {
    if (preselectedService) {
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
      setErrorMessage('يرجى كتابة الاسم الكامل (ثلاثي على الأقل) للمستفيد.');
      return;
    }

    // Saudi Phone format: must start with 05 or 5 and be 9-10 digits
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const saudiPhoneRegex = /^(05|5)\d{8}$/;
    if (!saudiPhoneRegex.test(cleanPhone)) {
      setErrorMessage('يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام.');
      return;
    }

    if (!district.trim()) {
      setErrorMessage('يرجى تحديد الحي لتنسيق الحافلات ومجموعات التأهيل.');
      return;
    }

    if (!ageOfBeneficiary.trim()) {
      setErrorMessage('يرجى تحديد عمر المستفيد ليتم تصنيفه في المجموعة العمرية المناسبة.');
      return;
    }

    setIsLoading(true);

    const rawLead = {
      fullName: fullName.trim(),
      phone: cleanPhone,
      district: district.trim(),
      ageOfBeneficiary: ageOfBeneficiary.trim(),
      serviceId: preselectedService || 'طلب تسجيل مباشر',
      notes: `عمر المستفيد: ${ageOfBeneficiary.trim()}`
    };

    // Trigger Lead tracking events on pixels
    trackEvent('SubmitApplication', { 
      fullName: rawLead.fullName, 
      serviceId: rawLead.serviceId 
    });

    addLead(rawLead).then(() => {
      const generatedTicket = 'MC-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setIsLoading(false);
      setIsSuccess(true);

      // Track the final conversion event via pixels
      trackEvent('Lead', {
        id: generatedTicket,
        fullName: rawLead.fullName,
        district: rawLead.district,
        serviceId: rawLead.serviceId
      });
      
      // Reset inputs
      setFullName('');
      setPhone('');
      setDistrict('');
      setAgeOfBeneficiary('');
      onClearPreselected();
      onNewInquiryAdded(); // Trigger reload list inside Dashboard
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
      setErrorMessage('حدث خطأ أثناء إرسال بيانات الاستشارة، يرجى المحاولة مجدداً.');
    });
  };

  return (
    <section id="lead-form-section" className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-white to-[#f4f7fc]/50 relative overflow-hidden">
      {/* Decorative handcrafted background lights */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,44,109,0.04),0_1px_3px_rgba(0,0,0,0.01)] p-6 md:p-10 relative z-10 border border-blue-100/50" id="lead-form">
        
        {/* Dynamic Highlight Golden Top Bar (Gives it a certified editorial touch) */}
        <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#002c6d] via-amber-500 to-[#002c6d] rounded-t-[24px]" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              key="form-entry"
            >
              {/* Center aligned title block */}
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-[#775a19] text-xs font-black px-4 py-2 rounded-full mb-3 shadow-6xs border border-amber-500/15">
                  {c.form_badge || '⭐ حجز مقعد وتقييم سلوكي مجاني'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-[#002c6d] tracking-tight leading-snug">
                  {c.form_title || 'طلب استشارة مبدئية وجدولة زيارة'}
                </h2>
                <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed max-w-xl mx-auto mt-2">
                  {c.form_subtitle || 'سجل بيانات طفلك الغالي الآن، وسيتواصل معك منسق الرعاية لترتيب موعد زيارة الفروع وتحديد أوقات دراسة الكشف والمهارات مجانًا.'}
                </p>
              </div>

              {/* Error messages wrapper with friendly warning aesthetic */}
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-4 bg-red-50/70 border-r-4 border-red-500 rounded-xl text-xs md:text-sm text-red-800 font-medium text-right shadow-xs"
                >
                  ⚠️ {errorMessage}
                </motion.div>
              )}

              {/* Core responsive inputs utilizing high-end UI patterns */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                  {/* Name Input */}
                  <div className="flex flex-col gap-2" id="form-field-name">
                    <label className="text-xs md:text-[13px] font-bold text-[#011a43] flex items-center gap-2" htmlFor="fullName">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#775a19] shrink-0">
                        <User className="w-4 h-4" />
                      </span>
                      <span>اسم المستفيد الكريم <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: أحمد محمد الرويلي"
                      className="rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white px-4 py-3 text-sm focus:border-[#002c6d] focus:ring-4 focus:ring-blue-100/50 transition-all font-normal text-right placeholder-slate-400 outline-none shadow-6xs"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-2" id="form-field-phone">
                    <label className="text-xs md:text-[13px] font-bold text-[#011a43] flex items-center gap-2" htmlFor="phone">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#775a19] shrink-0">
                        <Phone className="w-4 h-4" />
                      </span>
                      <span>الرقم الهاتفي للتواصل <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className="rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white px-4 py-3 text-sm focus:border-[#002c6d] focus:ring-4 focus:ring-blue-100/50 transition-all font-normal text-right placeholder-slate-400 outline-none shadow-6xs"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* District / Neighborhood */}
                  <div className="flex flex-col gap-2" id="form-field-district">
                    <label className="text-xs md:text-[13px] font-bold text-[#011a43] flex items-center gap-2" htmlFor="district">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#775a19] shrink-0">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <span>الحي السكني بالرياض <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="مثال: حي النزهة أو ضاحية لبن"
                      className="rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white px-4 py-3 text-sm focus:border-[#002c6d] focus:ring-4 focus:ring-blue-100/50 transition-all font-normal text-right placeholder-slate-400 outline-none shadow-6xs"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Beneficiary's Age */}
                  <div className="flex flex-col gap-2" id="form-field-age">
                    <label className="text-xs md:text-[13px] font-bold text-[#011a43] flex items-center gap-2" htmlFor="ageOfBeneficiary">
                      <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#775a19] shrink-0">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <span>عمر المستفيد <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      id="ageOfBeneficiary"
                      value={ageOfBeneficiary}
                      onChange={(e) => setAgeOfBeneficiary(e.target.value)}
                      placeholder="مثال: 8 سنوات"
                      className="rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white px-4 py-3 text-sm focus:border-[#002c6d] focus:ring-4 focus:ring-blue-100/50 transition-all font-normal text-right placeholder-slate-400 outline-none shadow-6xs"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Highly Crafted Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#002c6d] text-white py-4.5 rounded-xl font-bold hover:bg-[#775a19] active:scale-99 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-blue-900/10 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer disabled:opacity-75 disabled:cursor-wait group mt-4 font-black text-[15px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{c.form_submit_loading || 'جاري تشفير البيانات وإرسال طلب الحجز...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{c.form_submit || 'تقديم طلب الاستشارة المجانية'}</span>
                      <Send className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="form-success"
              className="text-center py-6 flex flex-col items-center"
            >
              <motion.div 
                variants={checkmarkVariants}
                className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-5 shadow-xs"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <motion.span 
                variants={itemVariants}
                className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full"
              >
                تم استلام طلبك بنجاح · رقم التذكرة {ticketId}
              </motion.span>

              <motion.h2 
                variants={itemVariants}
                className="text-xl md:text-2xl font-black text-[#002c6d] mt-4 mb-3"
              >
                {c.form_success_title || 'وصلَنا طلبك 💚 وسنتواصل معك خلال 24 ساعة'}
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-xs md:text-sm text-[#434651] font-light leading-relaxed max-w-xl mx-auto"
              >
                {c.form_success_body || 'شكراً لثقتك بمركز مجال العناية. تم تحويل طلبك مباشرةً إلى منسّق القبول والاستشارات، وسيتواصل معك على الرقم الذي أرسلته لترتيب موعد التقييم السلوكي المجاني في الفرع الأقرب.'}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="mt-6 bg-[#002c6d]/5 p-5 rounded-2xl border border-blue-50 max-w-lg w-full text-right flex flex-col gap-3 shadow-6xs"
              >
                <h4 className="font-bold text-[#002c6d] text-xs">خطواتك القادمة:</h4>
                <div className="space-y-2 text-xs text-[#434651] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002c6d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                    <span>{c.form_step_1 || 'مكالمة ترحيبية قصيرة من فريق القبول لتحديد موعد الزيارة.'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002c6d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                    <span>{c.form_step_2 || 'تقييم سلوكي وحركي مجاني داخل المركز يحدد الخدمة الأنسب لطفلك.'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4.5 h-4.5 rounded-full bg-[#002c6d] text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                    <span>{c.form_step_3 || 'عرض خطة تأهيل واضحة مع المواعيد ووسائل النقل عند الحاجة.'}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">احتفظ برقم التذكرة <strong className="text-[#002c6d]">{ticketId}</strong> للرجوع إليه عند التواصل.</p>
              </motion.div>

              {/* Action buttons upon successful registration */}
              <motion.div 
                variants={itemVariants}
                className="mt-6 flex flex-col sm:flex-row gap-3 w-full justify-center"
              >
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#434651] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  {c.form_new_btn || 'تسجيل مستفيد آخر'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-[0.99] transition-transform shadow-md cursor-pointer"
                >
                  <span>{c.form_whatsapp_btn || 'متابعة فورية على الواتساب'}</span>
                </a>
              </motion.div>


            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
