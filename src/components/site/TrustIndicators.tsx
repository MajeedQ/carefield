/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LucideIcon } from './LucideIcon';

export const TrustIndicators: React.FC = () => {
  const { config } = useApp();
  const badges = config.trustBadges || [];

  return (
    <section id="trust-indicators" className="relative bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 py-8 border-y border-blue-100/50 px-4 md:px-8 overflow-hidden">
      {/* Dynamic background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5eeff_1.5px,transparent_1.5px)] bg-[size:24px_24px] opacity-25" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {badges.map((badge, idx) => (
          <div 
            key={badge.id || idx}
            className="group flex items-center gap-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_4px_16px_rgba(0,44,109,0.015)] hover:shadow-[0_12px_24px_rgba(0,44,109,0.04)] border border-slate-100 hover:border-amber-500/20 hover:scale-[1.01] transition-all duration-300"
          >
            {/* Elegant double-ring icon holder with dual-tone bg */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
              badge.icon === 'Award' 
                ? 'bg-amber-500/10 text-[#775a19] group-hover:bg-[#775a19] group-hover:text-white' 
                : 'bg-blue-500/10 text-[#002c6d] group-hover:bg-[#002c6d] group-hover:text-white'
            }`}>
              <LucideIcon 
                name={badge.icon} 
                className="w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
            
            {/* Typography */}
            <div className="text-right">
              <p className="text-xs md:text-sm font-black text-slate-700 leading-snug group-hover:text-[#002c6d] transition-colors duration-300">
                {badge.text}
              </p>
              <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">حالة موثقة معتمدة</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
