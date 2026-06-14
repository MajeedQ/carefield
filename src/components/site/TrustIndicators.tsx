/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TRUST_BADGES } from '@/lib/site-data';
import { LucideIcon } from './LucideIcon';

export const TrustIndicators: React.FC = () => {
  return (
    <section id="trust-indicators" className="bg-[#e5eeff] py-6 border-y border-blue-100 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRUST_BADGES.map((badge) => (
          <div 
            key={badge.id}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-xs border border-blue-50/50 hover:shadow-md hover:scale-[1.01] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <LucideIcon 
                name={badge.icon} 
                className={`w-6 h-6 ${badge.id === 'exp' || badge.id === 'ages' ? 'text-[#775a19]' : 'text-[#002c6d]'}`} 
              />
            </div>
            <div>
              <p className="text-sm md:text-[15px] font-semibold text-[#011a43] leading-snug">
                {badge.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
