/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '@/lib/site-data';

export const FAQSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isExpanded = activeIdx === idx;
            return (
              <div 
                key={idx}
                className="border-b border-blue-100/50 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className={`w-full py-4 px-4 flex items-center justify-between text-right gap-4 rounded-xl cursor-pointer hover:bg-[#e5eeff]/20 transition-all ${
                    isExpanded ? 'bg-[#e5eeff]/50' : ''
                  }`}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isExpanded ? 'text-[#002c6d]' : 'text-[#775a19]'}`} />
                    <span className="text-xs md:text-base font-bold text-[#0b1c30] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  {/* Chevron rotates clockwise for RTL structure (90 degrees right) as per requirement */}
                  <ChevronDown 
                    className={`w-4 h-4 text-[#002c6d] shrink-0 transition-transform duration-300 ${
                      isExpanded ? 'rotate-90 text-[#775a19]' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pt-2 px-6 text-xs md:text-[15px] text-[#434651] leading-relaxed font-light font-sans">
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
