/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Calendar, Trash2, Plus, Edit2, Link, Image as ImageIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { WideBanner } from '@/lib/pixels';

export const WideBannerCarousel: React.FC = () => {
  const { config, isAdminMode, updateConfig } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadedBanners, setLoadedBanners] = useState<Record<string, boolean>>({});
  const [newBanner, setNewBanner] = useState<Omit<WideBanner, 'id'>>({
    title: 'عنوان البانر الجديد',
    subtitle: 'وصف فرعي توضيحي يظهر تحت العنوان للفت انتباه العملاء للبرنامج',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200',
    tag: 'عرض جديد',
    linkUrl: '#lead-form',
    buttonText: 'التقديم المباشر'
  });

  const banners = config.banners || [];

  // Auto-play interval
  useEffect(() => {
    if (banners.length <= 1 || isAdminMode) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [banners.length, isAdminMode]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleDeleteBanner = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('هل أنت متأكد من حذف هذا البانر العريض بالكامل؟')) return;
    
    updateConfig((prev) => {
      const filtered = prev.banners.filter((b) => b.id !== id);
      return { ...prev, banners: filtered };
    });
    
    setCurrentIndex(0);
  };

  const handleAddBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const added: WideBanner = {
      ...newBanner,
      id: `banner-${Date.now()}`
    };

    updateConfig((prev) => ({
      ...prev,
      banners: [...prev.banners, added]
    }));

    setShowAddModal(false);
    setCurrentIndex(banners.length); // switch to the new one
  };

  if (banners.length === 0) {
    return (
      <div className="w-full bg-[#f0f4ff] border-y border-blue-100 py-12 px-4 text-center">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
          <Calendar className="w-12 h-12 text-[#002c6d] opacity-40 animate-pulse" />
          <h3 className="text-lg font-bold text-[#002c6d]">لا توجد بانرات ترويجية عريضة نشطة حالياً</h3>
          <p className="text-xs text-[#434651]">يمكنك إضافة بنرات عريضة أعلى الصفحة لتعريف زوارك بالمستجدات بدعم كامل للصور وروابط التوجيه.</p>
          {isAdminMode && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-[#002c6d] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1a438d] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة بانر عريض الآن</span>
            </button>
          )}
        </div>
        {renderModal()}
      </div>
    );
  }

  const activeBanner = banners[currentIndex] || banners[0];

  function renderModal() {
    if (!showAddModal) return null;
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs text-right">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-100 shadow-2xl relative"
        >
          <h3 className="text-xl font-bold text-[#002c6d] mb-4">إضافة بانر عريض جديد</h3>
          <form onSubmit={handleAddBannerSubmit} className="space-y-4 text-sm font-medium text-slate-700">
            <div>
              <label className="block mb-1 font-bold text-xs text-slate-500">عنوان البانر الرئيسي</label>
              <input 
                type="text" 
                required
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002c6d]" 
                value={newBanner.title}
                onChange={(e) => setNewBanner(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-slate-500">الوصف الفرعي</label>
              <textarea 
                required
                rows={2}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002c6d]" 
                value={newBanner.subtitle}
                onChange={(e) => setNewBanner(prev => ({ ...prev, subtitle: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-bold text-xs text-slate-500">نص الزر الإضافي</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002c6d]" 
                  value={newBanner.buttonText}
                  onChange={(e) => setNewBanner(prev => ({ ...prev, buttonText: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-1 font-bold text-xs text-slate-500">تاج تصنيفي (أعلى البانر)</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002c6d]" 
                  value={newBanner.tag}
                  onChange={(e) => setNewBanner(prev => ({ ...prev, tag: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-slate-500">رابط توجيه الزر (سلس لو غيّرته)</label>
              <input 
                type="text" 
                placeholder="#lead-form أو رابط خارجي كامل"
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002c6d] placeholder:text-slate-300" 
                value={newBanner.linkUrl}
                onChange={(e) => setNewBanner(prev => ({ ...prev, linkUrl: e.target.value }))}
              />
            </div>

            <div>
              <label className="block mb-1 font-bold text-xs text-slate-500">رابط صورة الخلفية (أو الصق رابط خارجي)</label>
              <input 
                type="text" 
                required
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002c6d]" 
                value={newBanner.imageUrl}
                onChange={(e) => setNewBanner(prev => ({ ...prev, imageUrl: e.target.value }))}
              />
              <p className="text-[10px] text-slate-400 mt-1">تلميح: يُفضل استخدام صور عريضة بمقاس 1200 × 500 بكسل على Unsplash أو أي مركز تحميل مفرغ.</p>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-xs font-bold"
              >
                إلغاء التعديل
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-[#002c6d] text-white hover:bg-[#1a438d] rounded-xl text-xs font-bold"
              >
                حفظ ونشر البانر
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="wide-banner-carousel-root" className="w-full bg-[#031126] overflow-hidden relative border-b border-blue-900/30">
      
      {/* Absolute Admin overlay panels */}
      {isAdminMode && (
        <div className="absolute top-4 left-4 z-40 flex gap-2">
          {/* Add banner trigger */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-emerald-600 text-white font-black text-[11px] px-3.5 py-2 rounded-xl shadow-lg border border-emerald-500 hover:bg-emerald-500 transition-all pointer-events-auto select-none"
            title="إضافة بانر جديد ومحبب بضغطة زر"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>إضافة بانر عريض</span>
          </button>

          {/* Delete active banner */}
          <button
            onClick={(e) => handleDeleteBanner(activeBanner.id, e)}
            className="flex items-center gap-1.5 bg-red-600 text-white font-black text-[11px] px-3.5 py-2 rounded-xl shadow-lg border border-red-500 hover:bg-red-500 transition-all pointer-events-auto select-none"
            title="حذف هذا البانر المعروض حالياً بضغطة زر"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>حذف هذا البانر المعروض</span>
          </button>
        </div>
      )}

      {/* Slide Visual block */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[400px] w-full flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The Background Photo (Lazy Loaded with beautiful blur-up effect) */}
            {!loadedBanners[activeBanner.id] && (
              <div className="absolute inset-0 bg-[#031126] animate-pulse z-0" />
            )}
            <img 
              src={activeBanner.imageUrl} 
              alt={activeBanner.title}
              loading="lazy"
              onLoad={() => setLoadedBanners(prev => ({ ...prev, [activeBanner.id]: true }))}
              className={`w-full h-full object-cover opacity-35 filter blur-[0.5px] scale-102 transition-all duration-700 ${
                loadedBanners[activeBanner.id] ? 'opacity-35 blur-[0.5px] scale-102' : 'opacity-0 blur-md scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Premium Overlay Ambient Blue Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031126] via-[#031126]/40 to-[#031126]/80 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031126] via-transparent to-[#031126]/30 z-10" />

            {/* Content box centered container */}
            <div className="absolute inset-0 z-20 flex items-center max-w-7xl mx-auto px-4 md:px-8">
              <div className="max-w-2xl text-right flex flex-col items-start gap-4">
                
                {activeBanner.tag && (
                  <span className="inline-block bg-amber-400 text-[#031126] text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm select-none">
                    {activeBanner.tag}
                  </span>
                )}

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-sm">
                  {activeBanner.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-light drop-shadow-2xs">
                  {activeBanner.subtitle}
                </p>

                {activeBanner.linkUrl && (
                  <a
                    href={activeBanner.linkUrl}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-[#eba011] text-[#031126] font-bold text-xs px-6 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md mt-1"
                  >
                    <span>{activeBanner.buttonText || 'تصفح العرض'}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </a>
                )}

              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Manual Slide controls if multiple exist */}
        {banners.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 text-white flex items-center justify-center transition-all"
              aria-label="Slide previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 text-white flex items-center justify-center transition-all"
              aria-label="Slide next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom dots list */}
            <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === i ? 'bg-amber-400 w-5' : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {renderModal()}
    </div>
  );
};
