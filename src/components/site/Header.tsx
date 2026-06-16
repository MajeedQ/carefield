/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Home, Award, Activity, Compass, Mail, BookOpen } from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { CareFieldLogo } from './CareFieldLogo';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const { config, activePage, setActivePage } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const waRaw = String(config.socialMedia.whatsapp || '966560098881').trim();
  const waText = encodeURIComponent(config.socialMedia.whatsappMessage || '');
  const whatsappUrl = waRaw.startsWith('http')
    ? (waText && !waRaw.includes('?') ? `${waRaw}?text=${waText}` : waRaw)
    : `https://wa.me/${waRaw.replace(/\+/g, '')}${waText ? `?text=${waText}` : ''}`;

  const navItems = [
    { id: 'home' as const, label: 'الرئيسية', icon: Home, to: '/' },
    { id: 'about' as const, label: 'من نحن', icon: Award, to: '/about' },
    { id: 'services' as const, label: 'خدماتنا', icon: Activity, to: '/services' },
    { id: 'branches' as const, label: 'فروعنا', icon: Compass, to: '/branches' },
    { id: 'blog' as const, label: 'المدونة', icon: BookOpen, to: '/blog' },
    { id: 'contact' as const, label: 'تواصل معنا', icon: Mail, to: '/contact' },
  ];

  const handlePageChange = (pageId: 'home' | 'about' | 'services' | 'branches' | 'contact') => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-50/50 shadow-[0_4px_24px_-4px_rgba(0,44,109,0.03)] transition-all duration-300">

      {/* Top Brand & Status Row */}
      <div className="max-w-7xl mx-auto px-3 md:px-8 py-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">

        {/* RIGHT SIDE: Corporate Logo & Responsive Textual Brand Identity */}
        <div className="flex items-center justify-start min-w-0">
          <button
            type="button"
            onClick={() => handlePageChange('home')}
            className="flex items-center gap-2.5 text-right outline-hidden hover:opacity-95 transition-all cursor-pointer min-w-0 w-full"
            id="header-logo-link"
          >
            <CareFieldLogo />
            <div className="flex flex-col text-right min-w-0 flex-1">
              <span className="font-black text-[11px] sm:text-xs md:text-sm lg:text-[16px] text-[#002c6d] tracking-tight leading-tight line-clamp-2">
                {config.theme?.logoText || 'مركز مجال العناية للرعاية النهارية'}
              </span>
              <span className="hidden sm:inline-block text-[9px] md:text-[9.5px] text-[#775a19] font-black mt-0.5 tracking-wide leading-tight line-clamp-1">
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
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => handlePageChange('contact')}
            className="hidden sm:inline-flex items-center justify-center bg-[#002c6d] text-white px-4 py-2 rounded-xl text-[11px] font-black hover:bg-[#775a19] hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            حجز موعد كشف
          </button>

          {/* Quick-Contact Options for small screens */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              href={`tel:${config.socialMedia.phone1}`}
              className="w-10 h-10 rounded-xl bg-blue-50 text-[#002c6d] flex items-center justify-center active:scale-90 transition-all border border-blue-100 shrink-0"
              title="اتصال سريع بالمركز"
              aria-label="اتصال هاتفي سريع بالمركز"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center active:scale-90 transition-all shadow-sm shrink-0"
              title="محادثة واتساب مباشرة"
              aria-label="فتح محادثة واتساب مع المركز"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26L3.4 19.795l3.255-1.602zM17.5 14.382c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
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
              const isActive = item.id === 'blog' ? pathname.startsWith('/blog') : activePage === item.id;
              const cls = `flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer whitespace-nowrap group shrink-0 ${
                isActive
                  ? 'bg-white text-[#002c6d] shadow-sm scale-102'
                  : 'text-[#e2eafc] hover:text-white hover:bg-white/10'
              }`;
              const iconCls = `w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
                isActive ? 'text-[#775a19]' : 'text-slate-300 group-hover:text-white'
              }`;
              if (item.id === 'blog') {
                return (
                  <Link key={item.id} to={item.to} className={cls} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <IconComponent className={iconCls} />
                    <span>{item.label}</span>
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id as 'home' | 'about' | 'services' | 'branches' | 'contact')}
                  className={cls}
                >
                  <IconComponent className={iconCls} />
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
