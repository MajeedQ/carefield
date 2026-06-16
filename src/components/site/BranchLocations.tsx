/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, ExternalLink, Clock, CheckCircle2, Sparkles, Navigation2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const getEmbeddableUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('<iframe')) {
    const match = url.match(/src=["']([^"']+)["']/);
    if (match && match[1]) return match[1];
  }
  return url;
};

const LazyMap: React.FC<{ embedUrl: string; title: string }> = ({ embedUrl, title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { rootMargin: '200px' });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-50 flex items-center justify-center">
      {isVisible ? (
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-50 flex items-center justify-center text-[#002c6d]">
          <MapPin className="w-8 h-8 animate-bounce" />
        </div>
      )}
    </div>
  );
};

export const BranchLocations: React.FC = () => {
  const { config } = useApp();
  const branches = config.branches || [];

  return (
    <section id="branches-locations-section" className="py-16 md:py-24 px-4 md:px-8 bg-white border-b border-blue-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">تفضلوا بزيارتنا</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d]">مواقع فروعنا الجغرافية</h2>
          <div className="w-12 h-1 bg-[#775a19] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-[#434651] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
            فروع مجهزة بالكامل في كبرى أحياء مدينة الرياض، مع باصات نقل مخصصة لخدمة الأحياء الأخرى.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10" id="branches-container">
          {branches.map((branch) => {
            const embedUrl = getEmbeddableUrl(branch.mapUrl);
            const isEmbed = embedUrl && embedUrl.includes('embed');
            const directionsUrl = branch.shareUrl
              || (embedUrl && embedUrl.startsWith('http') && !embedUrl.includes('embed')
                ? embedUrl
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`);
            return (
              <article
                key={branch.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,44,109,0.04)] hover:shadow-[0_20px_44px_rgba(0,44,109,0.08)] transition-all duration-300 flex flex-col"
                id={`branch-card-${branch.id}`}
              >
                {/* Hero image */}
                {branch.imageUrl ? (
                  <div className="relative w-full h-44 md:h-56 overflow-hidden bg-slate-100">
                    <img src={branch.imageUrl} alt={branch.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002c6d]/80 via-[#002c6d]/10 to-transparent" />
                    <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between gap-2">
                      <div>
                        <span className="bg-white/95 text-[#002c6d] text-[10px] font-black px-3 py-1 rounded-full inline-block mb-1">📍 فرع</span>
                        <h3 className="text-lg md:text-xl font-black text-white drop-shadow">{branch.name}</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <div className="bg-[#002c6d]/10 text-[#002c6d] text-xs font-black px-4 py-1.5 rounded-full w-fit">📍 فرع {branch.name}</div>
                  </div>
                )}

                <div className="p-5 md:p-7 flex flex-col gap-4 flex-1">
                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 font-bold leading-relaxed">{branch.address}</p>
                  </div>

                  {/* Description */}
                  {branch.description && (
                    <p className="text-xs md:text-sm text-[#434651] leading-relaxed font-light">{branch.description}</p>
                  )}

                  {/* Working hours */}
                  {branch.workingHours && (
                    <div className="flex items-center gap-2 bg-blue-50/60 px-3 py-2 rounded-xl">
                      <Clock className="w-4 h-4 text-[#002c6d] shrink-0" />
                      <span className="text-xs font-bold text-[#002c6d]">{branch.workingHours}</span>
                    </div>
                  )}

                  {/* Services list */}
                  {branch.servicesList && branch.servicesList.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-black text-[#775a19] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> الخدمات المتوفرة
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {branch.servicesList.map((s, i) => (
                          <span key={i} className="text-[11px] bg-slate-50 border border-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-bold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {branch.features && branch.features.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                      {branch.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-[#434651]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Directions text */}
                  {branch.directions && (
                    <div className="flex items-start gap-2 bg-amber-50/60 border border-amber-100 px-3 py-2 rounded-xl">
                      <Navigation2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#775a19] font-bold leading-relaxed">{branch.directions}</p>
                    </div>
                  )}

                  {/* Contact actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                    {branch.phone && (
                      <a href={`tel:${branch.phone}`} className="flex items-center gap-2 bg-[#002c6d] text-white hover:bg-[#1a438d] px-4 py-2 rounded-xl text-xs font-black transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        <span dir="ltr">{branch.phone}</span>
                      </a>
                    )}
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-white border border-[#002c6d]/20 text-[#002c6d] hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-black transition-colors"
                    >
                      <span>الاتجاهات</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Map */}
                  {isEmbed && (
                    <div className="relative w-full h-[200px] md:h-[260px] rounded-2xl overflow-hidden border border-slate-200 mt-2">
                      <LazyMap embedUrl={embedUrl} title={branch.name} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
