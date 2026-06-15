/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const FAQSection: React.FC = () => {
  const { config } = useApp();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const faqs = config.faqs || [];

  const toggleAccordion = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-blue-50/50">
      <div className="max-w-3xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">الأسئلة الشائعة</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d]">استفسارات تهم أولياء الأمور</h2>
          <div className="w-12 h-1 bg-[#775a19] mx-auto mt-3 rounded-full" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isExpanded = activeIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 hover:border-amber-500/20 shadow-[0_2px_8px_rgba(0,44,109,0.01)] transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className={`w-full py-5 px-5 flex items-center justify-between text-right gap-4 cursor-pointer transition-all ${
                    isExpanded ? 'bg-gradient-to-r from-blue-50/50 to-white' : 'hover:bg-slate-50/50'
                  }`}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isExpanded ? 'bg-[#002c6d] text-white' : 'bg-[#775a19]/10 text-[#775a19]'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm md:text-[15px] font-black text-slate-700 leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Chevron rotates clockwise for RTL structure (90 degrees right) as per requirement */}
                  <ChevronDown 
                    className={`w-4 h-4 text-[#002c6d] shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-90 text-[#775a19] scale-110' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pt-1 px-14 text-xs md:text-sm text-slate-500 leading-relaxed font-normal font-sans border-t border-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
