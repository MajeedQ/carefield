/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Play, X, Film, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { GalleryItem } from '@/lib/site-types';

const LazyGalleryImage: React.FC<{
  src: string;
  alt: string;
  onLoadComplete?: () => void;
  isLoaded?: boolean;
}> = ({ src, alt, onLoadComplete, isLoaded }) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setIsInView(true);
        obs.disconnect();
      }
    }, { rootMargin: '150px' });
    if (elementRef.current) obs.observe(elementRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={elementRef} className="w-full h-full relative">
      {isInView ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={onLoadComplete}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            isLoaded ? 'opacity-100 blur-none' : 'opacity-90'
          }`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
    </div>
  );
};

const GalleryCard: React.FC<{
  item: GalleryItem;
  onClick: () => void;
  showTitle: boolean;
  showCategory: boolean;
}> = ({ item, onClick, showTitle, showCategory }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative aspect-square w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-blue-50/60 cursor-pointer text-right transition-all"
    >
      <LazyGalleryImage
        src={item.thumbnailUrl}
        alt={item.title}
        onLoadComplete={() => setLoaded(true)}
        isLoaded={loaded}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent group-hover:from-slate-900/85 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#002c6d] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
          {item.type === 'video' ? (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          ) : (
            <Camera className="w-5 h-5" />
          )}
        </div>
      </div>
      {(showTitle || showCategory) && (
        <div className="absolute bottom-0 right-0 left-0 p-3 text-right">
          {showCategory && item.category && (
            <span className="text-[10px] text-amber-300 font-bold">{item.category}</span>
          )}
          {showTitle && item.title && (
            <p className="text-xs text-white font-bold truncate mt-0.5" title={item.title}>{item.title}</p>
          )}
        </div>
      )}
    </button>
  );
};

export const GallerySection: React.FC = () => {
  const { config } = useApp();
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const galleryItems = config.gallery || [];
  const activeMedia = galleryItems.find((img) => img.id === selectedMediaId);
  const settings = config.gallerySettings ?? {
    layout: 'grid' as const,
    columns: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    showTitles: true,
    showCategories: true,
    showArrows: true,
    showDots: true,
    title: 'معرض الصور والفيديو المتكامل',
    subtitle: 'حياتنا اليومية',
    description: 'شاهد بيئة أبطالنا وحياتهم التأهيلية اليومية الفعالة.',
  };

  // Slider state
  const [page, setPage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 768) setPerView(2);
      else if (w < 1024) setPerView(3);
      else setPerView(Math.max(1, Math.min(settings.columns || 4, 6)));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [settings.columns]);

  const totalPages = Math.max(1, Math.ceil(galleryItems.length / perView));

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  useEffect(() => {
    if (settings.layout === 'grid') return;
    if (!settings.autoplay || totalPages <= 1) return;
    const t = setInterval(next, Math.max(1500, settings.autoplaySpeed));
    return () => clearInterval(t);
  }, [settings.layout, settings.autoplay, settings.autoplaySpeed, totalPages, next]);

  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [page, totalPages]);

  const colsClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <section id="gallery-section" className="py-16 md:py-24 px-4 md:px-8 bg-[#e5eeff] border-t border-b border-blue-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">{settings.subtitle}</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d]">{settings.title}</h2>
          <div className="w-12 h-1 bg-[#775a19] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-[#434651] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
            {settings.description}
          </p>
        </div>

        {galleryItems.length === 0 ? (
          <div className="text-center py-16 bg-white/40 rounded-2xl border border-dashed border-[#002c6d]/20">
            <Film className="w-12 h-12 text-[#002c6d]/40 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-sm">المعرض فارغ حالياً.</p>
          </div>
        ) : settings.layout === 'grid' ? (
          <div className={`grid ${colsClass[Math.min(settings.columns, 6)] ?? colsClass[4]} gap-4 md:gap-6`}>
            {galleryItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setSelectedMediaId(item.id)}
                showTitle={settings.showTitles}
                showCategory={settings.showCategories}
              />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(${page * 100}%)` }}
                dir="ltr"
              >
                {Array.from({ length: totalPages }).map((_, pIdx) => (
                  <div key={pIdx} className="w-full shrink-0 px-1" dir="rtl">
                    <div className={`grid ${colsClass[perView] ?? colsClass[4]} gap-4 md:gap-6`}>
                      {galleryItems.slice(pIdx * perView, pIdx * perView + perView).map((item) => (
                        <GalleryCard
                          key={item.id}
                          item={item}
                          onClick={() => setSelectedMediaId(item.id)}
                          showTitle={settings.showTitles}
                          showCategory={settings.showCategories}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {settings.showArrows && totalPages > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="السابق"
                  className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 w-10 h-10 rounded-full bg-white text-[#002c6d] shadow-lg hover:bg-[#002c6d] hover:text-white transition flex items-center justify-center z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="التالي"
                  className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 w-10 h-10 rounded-full bg-white text-[#002c6d] shadow-lg hover:bg-[#002c6d] hover:text-white transition flex items-center justify-center z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}

            {settings.showDots && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`الانتقال إلى ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === page ? 'w-8 bg-[#002c6d]' : 'w-2 bg-[#002c6d]/30 hover:bg-[#002c6d]/60'}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedMediaId && activeMedia && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMediaId(null)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-40"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl z-50 text-right"
              >
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#002c6d]">
                    {activeMedia.title} {activeMedia.category && `(${activeMedia.category})`}
                  </h4>
                  <button
                    onClick={() => setSelectedMediaId(null)}
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-black aspect-video flex items-center justify-center">
                  {activeMedia.type === 'video' ? (
                    activeMedia.externalVideoUrl ? (
                      <iframe
                        src={activeMedia.externalVideoUrl}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={activeMedia.title}
                      />
                    ) : (
                      <video src={activeMedia.videoUrl} controls autoPlay className="w-full h-full object-contain" />
                    )
                  ) : (
                    <img
                      src={activeMedia.thumbnailUrl}
                      alt={activeMedia.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                {activeMedia.description && (
                  <div className="px-5 py-3 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {activeMedia.description}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
