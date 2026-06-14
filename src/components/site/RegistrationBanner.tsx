/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export const RegistrationBanner: React.FC = () => {
  return (
    <div id="registration-banner" className="bg-amber-100 text-[#775a19] border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-amber-500/20"
        >
          <Award className="w-3.5 h-3.5" />
          <span>تنبيه التسجيل</span>
        </motion.div>
        <p className="font-medium text-sm md:text-base leading-relaxed">
          يبدأ التسجيل للعام التأهيلي الجديد <strong className="font-bold">1448هـ</strong> يوم الأحد <strong className="font-bold">21/06/2026</strong> وينتهي يوم الخميس <strong className="font-bold">16/07/2026</strong>
        </p>
      </div>
    </div>
  );
};
