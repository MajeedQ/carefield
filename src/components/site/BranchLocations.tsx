/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, ExternalLink, Sliders, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

// Get embeddable URL helper
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
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
          className="absolute inset-0 w-full h-full animate-fadeIn"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center gap-2 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#002c6d] flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#002c6d] animate-bounce" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-[#002c6d]">جاري تحميل الخريطة التفاعلية...</p>
            <p className="text-[9px] text-slate-400">تحميل ذكي لتقليل استهلاك البيانات</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const BranchLocations: React.FC = () => {
  const { config, isAdminMode, updateConfig } = useApp();
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedMapUrl, setEditedMapUrl] = useState('');

  const branches = config.branches || [];

  const handleStartEditing = (id: string, name: string, address: string, phone: string, mapUrl: string) => {
    setEditingBranchId(id);
    setEditedName(name);
    setEditedAddress(address);
    setEditedPhone(phone);
    setEditedMapUrl(mapUrl);
  };

  const handleSaveBranch = (id: string) => {
    updateConfig((prev) => {
      const updated = prev.branches.map((br) => {
        if (br.id === id) {
          const isEmbed = editedMapUrl.includes('embed') || editedMapUrl.includes('<iframe');
          return {
            ...br,
            name: editedName,
            address: editedAddress,
            phone: editedPhone,
            mapUrl: editedMapUrl,
            shareUrl: isEmbed ? br.shareUrl : editedMapUrl
          };
        }
        return br;
      });
      return { ...prev, branches: updated };
    });
    setEditingBranchId(null);
  };

  return (
    <section id="branches-locations-section" className="py-16 md:py-24 px-4 md:px-8 bg-white border-b border-blue-50 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">تفضلوا بزيارتنا</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d]">مواقع فروعنا الجغرافية</h2>
          <div className="w-12 h-1 bg-[#775a19] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-[#434651] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
            نوفر فرعين مجهزين بالكامل للبنين في كبرى أحياء مدينة الرياض، مع باصات نقل مخصصة لخدمة الأحياء الأخرى.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12" id="branches-container">
          {branches.map((branch) => {
            const isEditing = editingBranchId === branch.id;
            const embedUrl = getEmbeddableUrl(branch.mapUrl);

            return (
              <div 
                key={branch.id} 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,44,109,0.02)] hover:shadow-[0_16px_36px_rgba(0,44,109,0.05)] transition-all duration-300 flex flex-col gap-6"
                id={`branch-card-${branch.id}`}
              >
                
                {/* Branch Info Block */}
                <div className="flex flex-col gap-3">
                  
                  {isEditing ? (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-400">تعديل بيانات {branch.name}</h4>
                      <div>
                        <label className="block text-[10px] font-bold mb-0.5">اسم الفرع</label>
                        <input 
                          type="text" 
                          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#002c6d]"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold mb-0.5">العنوان بالتفصيل</label>
                        <input 
                          type="text" 
                          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#002c6d]"
                          value={editedAddress}
                          onChange={(e) => setEditedAddress(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold mb-0.5">جوال الفرع المباشر</label>
                        <input 
                          type="text" 
                          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#002c6d]"
                          value={editedPhone}
                          onChange={(e) => setEditedPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold mb-0.5">رابط خرائط جوجل أو كود Iframe</label>
                        <textarea 
                          rows={2}
                          className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#002c6d]"
                          value={editedMapUrl}
                          placeholder="مثال: https://www.google.com/maps/embed?pb=..."
                          onChange={(e) => setEditedMapUrl(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-1.5 justify-end">
                        <button 
                          onClick={() => setEditingBranchId(null)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#434651] text-[10px] font-bold rounded-lg"
                        >
                          إلغاء التعديل
                        </button>
                        <button 
                          onClick={() => handleSaveBranch(branch.id)}
                          className="px-3.5 py-1.5 bg-[#002c6d] text-white hover:bg-[#1a438d] text-[10px] font-bold rounded-lg"
                        >
                          حفظ التعديلات
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="bg-[#002c6d]/10 text-[#002c6d] text-xs font-black px-4 py-1.5 rounded-full w-fit">
                          📍 فرع {branch.name}
                        </div>
                        {isAdminMode && (
                          <button
                            onClick={() => handleStartEditing(branch.id, branch.name, branch.address, branch.phone, branch.mapUrl)}
                            className="text-[#002c6d] text-xs font-bold hover:underline flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-lg"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>تعديل الفرع والخريطة</span>
                          </button>
                        )}
                      </div>

                      <h3 className="text-base md:text-lg font-black text-slate-800 flex items-start gap-1.5 mt-2">
                        <span className="text-[#775a19] font-bold">الموقع:</span>
                        <span>{branch.address}</span>
                      </h3>

                      <div className="flex flex-wrap items-center gap-3.5 text-xs font-bold text-[#434651] mt-1">
                        <a href={`tel:${branch.phone}`} className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50/50 hover:text-[#002c6d] px-3.5 py-2 rounded-xl border border-slate-100 transition-colors shadow-6xs">
                          <Phone className="w-3.5 h-3.5 text-[#775a19]" />
                          <span dir="ltr">{branch.phone}</span>
                        </a>
                        <a 
                          href={branch.shareUrl || (embedUrl.startsWith('http') && !embedUrl.includes('embed') ? embedUrl : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`)}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-[#002c6d] hover:text-[#775a19] transition-colors"
                        >
                          <span>عرض الاتجاهات في خرائط جوجل</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </>
                  )}

                </div>

                {/* Google Map Display Iframe */}
                <div className="relative w-full h-[240px] md:h-[300px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
                  {embedUrl && embedUrl.includes('embed') ? (
                    <LazyMap embedUrl={embedUrl} title={branch.name} />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-6 text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#002c6d] flex items-center justify-center">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#002c6d]">الفرع مضاف كرابط خارجي مباشر</p>
                        <p className="text-[11px] text-slate-500">تم تهيئة الخرائط لتوجيه عملائك للخروج إلى تطبيق خرائط جوجل فورا</p>
                      </div>
                      <a 
                        href={branch.mapUrl || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 bg-[#002c6d] hover:bg-[#1a438d] text-white text-xs font-bold rounded-xl shadow-xs mt-1"
                      >
                        <span>فتح الاتجاهات المباشرة</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
