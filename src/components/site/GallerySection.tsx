/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Play, X, Trash2, UploadCloud, Film, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GalleryItem } from '@/lib/site-types';

// Browser-based image compression utility using HTML5 canvas
const compressImage = (dataUrl: string, maxWidth = 1000, maxHeight = 1000, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      resolve(dataUrl);
    };
  });
};

const LazyGalleryImage: React.FC<{ 
  src: string; 
  alt: string; 
  onLoadComplete: () => void;
  isLoaded: boolean;
}> = ({ src, alt, onLoadComplete, isLoaded }) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
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
            isLoaded ? 'opacity-100 blur-none' : 'opacity-0 blur-xs scale-98'
          }`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
      )}
    </div>
  );
};

export const GallerySection: React.FC = () => {
  const { config, isAdminMode, updateConfig } = useApp();
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Fallback to config gallery list
  const galleryItems = config.gallery || [];
  const activeMedia = galleryItems.find(img => img.id === selectedMediaId);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const isImg = file.type.startsWith('image/');
      const isVid = file.type.startsWith('video/');
      if (!isImg && !isVid) {
        alert('يرجى سحب وإفلات ملفات صور أو فيديو فقط!');
        return;
      }

      // Check file size (restrict Base64 storage size so it doesn't exceed localStorage limits)
      if (file.size > 8 * 1024 * 1024) {
        alert('ملفت كبير جداً! يرجى سحب ملفات يقل حجمها عن 8 ميجابايت لضمان الحفظ السريع.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async () => {
        let dataUrl = reader.result as string;
        
        if (isImg) {
          setIsCompressing(true);
          try {
            dataUrl = await compressImage(dataUrl);
          } catch (err) {
            console.error('Failed to compress image, falling back to original:', err);
          } finally {
            setIsCompressing(false);
          }
        }

        const newItem: GalleryItem = {
          id: `gallery-media-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: (isVid ? 'video' : 'image') as 'image' | 'video',
          title: file.name.split('.')[0] || 'ملف تأهيلي جديد',
          category: isVid ? 'فيديو حقيقي' : 'أنشطة المركز',
          thumbnailUrl: isVid ? 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600' : dataUrl,
          videoUrl: isVid ? dataUrl : undefined
        };

        updateConfig((prev) => ({
          ...prev,
          gallery: [...prev.gallery, newItem]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('هل تريد حذف هذه الصورة/الفيديو من معرض أعمالك؟')) return;
    updateConfig((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item.id !== id)
    }));
  };

  return (
    <section id="gallery-section" className="py-16 md:py-24 px-4 md:px-8 bg-[#e5eeff] border-t border-b border-blue-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">حياتنا اليومية</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d]">معرض الصور والفيديو المتكامل</h2>
          <div className="w-12 h-1 bg-[#775a19] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-[#434651] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
            شاهد بيئة أبطالنا وحياتهم التأهيلية اليومية الفعالة. يمكنك إسقاط صور جديدة بضغطة زر.
          </p>
        </div>

        {/* Drag and Drop dropzone area ONLY for Admin Mode */}
        {isAdminMode && (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mb-8 border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 transition-colors ${
              isDragging 
                ? 'border-emerald-500 bg-emerald-50/50 text-[#002c6d]' 
                : 'border-[#002c6d]/30 hover:border-[#002c6d]/60 bg-white/55'
            }`}
          >
            <UploadCloud className="w-11 h-11 text-[#002c6d] opacity-75" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#002c6d]">اسحب وأفلت صور أو مقاطع فيديو أبطال المركز هنا مباشرة</p>
              <p className="text-xs text-slate-500">أو اضغط لاختيار الملف من جهازك بشكل كلاسيكي</p>
            </div>
            
            <label className="inline-flex items-center gap-2 bg-[#002c6d] text-white hover:bg-[#1a438d] px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all mt-1">
              <span>تصفح ملفات جهازك</span>
              <input 
                type="file" 
                multiple
                accept="image/*,video/*"
                className="hidden" 
                onChange={handleFileInputChange}
              />
            </label>
            <p className="text-[10px] text-slate-400">يدعم الصور والمقاطع حتى 8 ميجابايت (يتم معالجة وحفظ الصور فوراً داخل متصفحك الحالي!)</p>
          </div>
        )}

        {/* Compression Progress Toast banner */}
        {isCompressing && (
          <div className="mb-8 bg-amber-500/10 border border-amber-550/25 p-4 rounded-2xl flex items-center justify-center gap-3 animate-pulse text-amber-900 font-bold text-xs" dir="rtl">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-700" />
            <span>محسن الصور التلقائي يعمل الآن: جاري ضغط وضبط ترميز الصورة لتقليل حجم التحميل... ⏳</span>
          </div>
        )}

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence>
            {galleryItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layoutId={`media-container-${item.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedMediaId(item.id)}
                className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-blue-50/60 cursor-pointer"
              >
                 {/* Media Thumbnail (Lazy Loaded with Blur-up shimmer placeholder and IntersectionObserver) */}
                <LazyGalleryImage 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  onLoadComplete={() => setLoadedImages(prev => ({ ...prev, [item.id]: true }))}
                  isLoaded={!!loadedImages[item.id]}
                />

                {/* Tint overlay */}
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition-colors" />

                {/* Admin quick Delete action Overlay */}
                {isAdminMode && (
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-3 left-3 z-30 bg-red-600 hover:bg-red-500 text-white p-2 rounded-xl shadow-md border border-red-500 scale-90 md:scale-100 transition-all pointer-events-auto"
                    title="حذف الميديا فوراً"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Floating icon indicators matching screenshots (camera / play button) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#002c6d] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    {item.type === 'video' ? (
                      <Play className="w-5.5 h-5.5 text-[#002c6d] fill-current mr-0.5" />
                    ) : (
                      <Camera className="w-5.5 h-5.5 text-[#002c6d]" />
                    )}
                  </div>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 right-0 left-0 p-3 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent text-right">
                  <span className="text-[10px] text-amber-400 font-bold">{item.category}</span>
                  <p className="text-xs text-white font-medium truncate mt-0.5" title={item.title}>{item.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty placeholder */}
        {galleryItems.length === 0 && (
          <div className="text-center py-16 bg-white/40 rounded-2xl border border-dashed border-[#002c6d]/20">
            <Film className="w-12 h-12 text-[#002c6d]/40 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-sm">المعرض فارغ حالياً! قم بتفعيل "لوحة التحكم" وإفلات ملفاتك هنا.</p>
          </div>
        )}

        {/* Lightbox Modal / HTML5 Video player */}
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
                {/* Header bar */}
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#002c6d]">
                    {activeMedia.title} ({activeMedia.category})
                  </h4>
                  <button 
                    onClick={() => setSelectedMediaId(null)}
                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Media Body */}
                <div className="bg-black aspect-video flex items-center justify-center">
                  {activeMedia.type === 'video' ? (
                    <video 
                      src={activeMedia.videoUrl} 
                      controls 
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img 
                      src={activeMedia.thumbnailUrl} 
                      alt={activeMedia.title} 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
