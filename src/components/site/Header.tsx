/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Home, Award, Activity, Compass, Mail } from 'lucide-react';
import { CareFieldLogo } from './CareFieldLogo';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const { config, activePage, setActivePage } = useApp();
  const waRaw = String(config.socialMedia.whatsapp || '966560098881').trim();
  const waText = encodeURIComponent(config.socialMedia.whatsappMessage || '');
  const whatsappUrl = waRaw.startsWith('http')
    ? (waText && !waRaw.includes('?') ? `${waRaw}?text=${waText}` : waRaw)
    : `https://wa.me/${waRaw.replace(/\+/g, '')}${waText ? `?text=${waText}` : ''}`;

  const navItems = [
    { id: 'home' as const, label: 'الرئيسية', icon: Home },
    { id: 'about' as const, label: 'من نحن', icon: Award },
    { id: 'services' as const, label: 'خدماتنا', icon: Activity },
    { id: 'branches' as const, label: 'فروعنا', icon: Compass },
    { id: 'contact' as const, label: 'تواصل معنا', icon: Mail },
  ];

  const handlePageChange = (pageId: 'home' | 'about' | 'services' | 'branches' | 'contact') => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-50/50 shadow-[0_4px_24px_-4px_rgba(0,44,109,0.03)] transition-all duration-300">
      
      {/* Top Brand & Status Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* RIGHT SIDE: Corporate Logo & Responsive Textual Brand Identity */}
        <div className="flex items-center justify-start shrink-0">
          <button 
            type="button"
            onClick={() => handlePageChange('home')} 
            className="flex items-center gap-3 text-right outline-hidden hover:opacity-95 transition-all cursor-pointer"
            id="header-logo-link"
          >
            <CareFieldLogo className="h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18 shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-sm" />
            <div className="flex flex-col text-right">
              <span className="font-black text-xs sm:text-xs md:text-sm lg:text-[16px] text-[#002c6d] tracking-tight leading-tight">
                {config.theme?.logoText || 'مركز مجال العناية للرعاية النهارية'}
              </span>
              <span className="hidden xs:inline-block text-[9px] md:text-[9.5px] text-[#775a19] font-black mt-0.5 tracking-wide leading-none">
                {config.theme?.logoSubtitle || 'رعاية طبية وسلوكية وتأهيلية متخصصة تحت إشراف فريق مرخص ومؤهل'}
              </span>
            </div>
          </button>
        </div>

        {/* CENTER SECTION: Secondary supportive actions (hidden on mobile, visible on desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#434651]">
          <a href={`tel:${config.socialMedia.phone1}`} className="flex items-center gap-2 hover:text-[#002c6d] transition-all group" id="header-phone-link">
            <div className="w-8 h-8 rounded-lg bg-[#775a19]/10 flex items-center justify-center text-[#775a19] group-hover:bg-[#775a19] group-hover:text-white transition-all duration-300">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] text-slate-400 font-light leading-none">تواصل معنا مباشر</span>
              <span dir="ltr" className="font-mono text-[11px] mt-0.5 text-[#002c6d]">{config.socialMedia.phone1}</span>
            </div>
          </a>
          
          <button 
            type="button"
            onClick={() => handlePageChange('branches')} 
            className="hidden xl:flex items-center gap-2 text-right cursor-pointer" 
            id="header-branches-indicator"
          >
            <div className="w-8 h-8 rounded-lg bg-[#002c6d]/10 flex items-center justify-center text-[#002c6d]">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] text-slate-400 font-light leading-none">تغطية جغرافية معتمدة</span>
              <span className="text-[11px] mt-0.5 text-[#434651]">فروع الرياض (لبن والنُزهة)</span>
            </div>
          </button>
        </div>

        {/* LEFT SIDE: CTA quick buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            type="button"
            onClick={() => handlePageChange('contact')} 
            className="hidden sm:inline-flex items-center justify-center bg-[#002c6d] text-white px-4.5 py-2 rounded-xl text-[11px] font-black hover:bg-[#775a19] hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer"
          >
            صفحة حجز موعد كشفية
          </button>

          {/* Quick-Contact Options for small screens */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a 
              href={`tel:${config.socialMedia.phone1}`}
              className="w-9 h-9 rounded-xl bg-blue-50 text-[#002c6d] flex items-center justify-center active:scale-90 transition-all border border-blue-100"
              title="اتصال سريع بالمركز"
              aria-label="اتصال هاتفي سريع بالمركز"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center active:scale-90 transition-all border border-emerald-100"
              title="محادثة واتساب مباشرة"
              aria-label="فتح محادثة واتساب مع المركز"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 1.012C18.062 1.012 23 5.95 23 12.012s-4.938 11.002-11.001 11.002c-1.879 0-3.642-.472-5.187-1.306l-4.721 1.542 1.572-4.597c-.928-1.583-1.464-3.418-1.464-5.385.001-6.062 4.938-11 11.001-11zm0 2.016c-4.953 0-8.985 4.032-8.985 8.984 0 1.83.548 3.535 1.492 4.966l-.979 2.862 2.94-.962c1.378.857 2.998 1.353 4.73 1.353 4.953 0 8.984-4.032 8.984-8.983-.001-4.952-4.032-8.984-8.983-8.984zm4.415 11.411c.245.122.399.204.46.306.061.102.061.59-.143 1.168-.204.577-1.183 1.134-1.631 1.173-.449.041-.898.118-2.898-.674-2-1.92-3.266-1.956-4.532-3.153-.85-.804-1.554-1.743-1.554-2.846 0-1.103.572-1.642.776-1.846.204-.204.449-.306.592-.306.143 0 .285.004.408.01.122.006.286-.041.449.347.163.388.551 1.346.592 1.448.041.102.061.224-.02.347-.082.122-.163.204-.245.306-.082.102-.164.204-.082.347.082.143.367.605.788.98.543.483 1.002.633 1.144.714.143.082.224.061.306-.02.082-.082.347-.408.449-.551.102-.143.204-.122.347-.061.143.061.918.432 1.082.513z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Navigation Tabs Layer */}
      <div className="bg-[#002c6d] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Scrollable container on mobile, flex row on desktop */}
          <nav className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none py-1.5 md:py-2.5 gap-2 md:gap-8 text-right font-sans">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer whitespace-nowrap group shrink-0 ${
                    isActive
                      ? 'bg-white text-[#002c6d] shadow-sm scale-102'
                      : 'text-[#e2eafc] hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
                    isActive ? 'text-[#775a19]' : 'text-slate-300 group-hover:text-white'
                  }`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

    </header>
  );
};
