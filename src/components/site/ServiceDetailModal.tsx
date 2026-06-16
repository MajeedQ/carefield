/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, Check, Send } from 'lucide-react';
import { ServiceItem } from '@/lib/site-types';
import { LucideIcon } from './LucideIcon';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ 
  service, 
  onClose,
  onSelectForConsultation 
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* Backdrop overlay */}
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 transition-opacity bg-slate-900/40 backdrop-blur-xs" 
            aria-hidden="true" 
          />

          {/* Centering trick */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          {/* Modal box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 inline-block w-full max-w-2xl overflow-hidden text-right align-bottom bg-white rounded-2xl shadow-2xl transition-all transform sm:my-8 sm:align-middle sm:max-w-lg md:max-w-xl lg:max-w-2xl"
          >
            {/* Top gold bar matching premium theme */}
            <div className="h-2 bg-[#775a19]" />

            <div className="px-6 py-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#002c6d]">
                    <LucideIcon name={service.iconName} className="w-6 h-6 text-[#002c6d]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#775a19] font-semibold bg-amber-50 px-2 py-1 rounded-md">برنامج تأهيلي متميز</span>
                    <h3 className="text-lg md:text-2xl font-bold text-[#002c6d] mt-1" id="modal-title">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#434651]/80 hover:text-[#0b1c30] transition-colors"
                  aria-label="إغلاق النافذة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="mt-6 flex flex-col gap-6">
                
                {/* Long detailed description */}
                <div>
                  <h4 className="font-bold text-[#002c6d] text-base mb-2">عن الخدمة</h4>
                  <p className="text-[#434651] text-[15px] leading-relaxed">
                    {service.detailedDescription}
                  </p>
                </div>

                {/* Practical Quick Stats */}
                <div className="grid grid-cols-2 gap-4 bg-[#f8f9ff] p-4 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#775a19] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-[#434651]/75 font-medium">جدول الحصص والأنشطة</span>
                      <span className="text-sm font-bold text-[#002c6d] mt-0.5 block">{service.sessionsPerWeek}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#002c6d] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-[#434651]/75 font-medium">الفئات العمرية الملائمة</span>
                      <span className="text-sm font-bold text-[#002c6d] mt-0.5 block">{service.targetAge}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits / Outcomes checklist */}
                <div>
                  <h4 className="font-bold text-[#002c6d] text-base mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4.5 h-4.5 text-[#775a19]" />
                    <span>مخرجات التأهيل والفوائد المرجوة:</span>
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#434651] leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-[#775a19] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end">
                <button 
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-[#434651] hover:bg-slate-50 transition-colors"
                >
                  الرجوع للرئيسية
                </button>
                <button 
                  onClick={() => {
                    onSelectForConsultation(service.title);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#002c6d] text-white text-sm font-bold hover:bg-[#1a438d] transition-all flex items-center justify-center gap-2"
                >
                  <span>طلب استشارة لهذه الخدمة</span>
                  <Send className="w-4 h-4 shrink-0" />
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
