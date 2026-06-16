/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const WhatsAppBubble: React.FC = () => {
  const { config } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const waRaw = String(config?.socialMedia?.whatsapp || '966560098881').trim();
  const defaultText = config?.socialMedia?.whatsappMessage || 'السلام عليكم ورحمة الله وبركاته، أود الاستفسار عن حجز مقعد وتحديد موعد التقييم المجاني في مركز مجال العناية للرعاية النهارية.';
  const waText = encodeURIComponent(defaultText);
  const whatsappUrl = waRaw.startsWith('http')
    ? (waRaw.includes('?') ? waRaw : `${waRaw}?text=${waText}`)
    : `https://wa.me/${waRaw.replace(/\+/g, '')}?text=${waText}`;

  useEffect(() => {
    // Automatically trigger the tooltip after 3.5 seconds to interact with users
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end gap-3.5 select-none" dir="rtl">
      
      {/* Interactive Tooltip popup resembling a modern helper support widget */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,44,109,0.08)] border border-emerald-100 p-4 max-w-[280px] sm:max-w-xs relative text-right"
          >
            {/* Smooth exit button inside tooltip */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute top-2 left-2 w-5 h-5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              title="إغلاق"
              aria-label="إغلاق نافذة الواتساب"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Typography and interactive layout content */}
            <div className="space-y-2.5 mt-1">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-2.5 py-0.5 rounded-full font-black tracking-wide inline-block">
                مستشار القبول والتسجيل • متصل الآن
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-bold">
                أهلاً بك! تواصل معنا مباشرة عبر الواتساب لحجز مقعد المستفيد وجدولة موعد التقييم السلوكي مجاناً في الفروع 💚
              </p>
              
              {/* Floating CTA links */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowTooltip(false)}
                className="flex items-center justify-center gap-1.5 w-full bg-[#25d366] hover:bg-[#20ba59] active:scale-98 text-white rounded-xl py-2 text-xs font-black shadow-sm transition-all text-center"
              >
                <span>ابدأ المحادثة الآن</span>
                <Send className="w-3 h-3" />
              </a>
            </div>

            {/* Speech bubble arrow notch */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-emerald-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Pulsing click trigger circle */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-gradient-to-tr from-[#25d366] to-[#128c7e] text-white p-4 rounded-full shadow-[0_12px_36px_rgba(37,211,102,0.35)] hover:shadow-[0_16px_40px_rgba(18,140,126,0.5)] flex items-center justify-center cursor-pointer border border-emerald-400/20 group"
        id="whatsapp-floating-bubble"
        aria-label="تواصل معنا عبر واتساب"
        onClick={() => setShowTooltip(false)}
      >
        {/* Pulsing visual glow effect */}
        <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-25 -z-10" />
        
        {/* Core Icon wrapper */}
        <MessageCircle className="w-6.5 h-6.5 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Ambient green dot active badge */}
        <span className="absolute -top-1 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25d366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
        </span>
      </motion.a>

    </div>
  );
};
