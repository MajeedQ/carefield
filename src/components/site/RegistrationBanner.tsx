/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Megaphone, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const RegistrationBanner: React.FC = () => {
  const { config } = useApp();
  
  if (!config.announcement || !config.announcement.enabled) return null;

  const text = config.announcement.text || '';
  const linkUrl = config.announcement.linkUrl || '';
  const bg = config.announcement.backgroundColor || '#fffbeb';
  const color = config.announcement.textColor || '#78350f';

  // Determine marquee speed duration in seconds
  const speedSec = 
    config.announcement.speed === 'fast' 
      ? 15 
      : config.announcement.speed === 'slow' 
        ? 45 
        : 30; // normal

  return (
    <div 
      id="registration-banner" 
      style={{ backgroundColor: bg, color: color }}
      className="relative overflow-hidden w-full border-b border-black/5 py-3 select-none flex items-center z-40"
    >
      {/* Custom Keyframes Injector */}
      <style>{`
        @keyframes marquee-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(50%, 0, 0); }
        }
        .animate-marquee-rtl {
          animation: marquee-rtl ${speedSec}s linear infinite;
        }
      `}</style>

      {/* Static Label Side Badge (Gives it an official editorial news feel) */}
      <div 
        className="absolute right-0 top-0 bottom-0 z-20 px-4 md:px-5 flex items-center gap-1.5 font-bold text-xs"
        style={{ backgroundColor: bg, color: color }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Megaphone className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[11px] tracking-wide font-black border-l pl-2 pr-1 border-black/10">عاجل</span>
      </div>

      {/* Loop Container */}
      <div className="w-full overflow-hidden flex text-xs md:text-sm font-bold pr-24">
        <div className="animate-marquee-rtl whitespace-nowrap flex gap-12 text-right justify-start">
          {/* Double or triple the text for an infinite scrolling seamless illusion */}
          {[1, 2, 3, 4].map((idx) => (
            <span key={idx} className="inline-flex items-center gap-3">
              <span>{text}</span>
              {linkUrl && (
                <a 
                  href={linkUrl} 
                  className="inline-flex items-center gap-0.5 hover:underline font-black px-2.5 py-1 bg-black/5 hover:bg-black/10 rounded-full text-[10px] transition-all"
                >
                  <span>استثمر فرصة ولدك</span>
                  <ArrowLeft className="w-3 h-3" />
                </a>
              )}
              <span className="opacity-40">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
