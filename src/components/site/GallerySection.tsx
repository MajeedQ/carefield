/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Play, X, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/site-data';

export const GallerySection: React.FC = () => {
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  const activeMedia = GALLERY_IMAGES.find(img => img.id === selectedMediaId);

  return (
    <section id="gallery-section" className="py-16 md:py-24 px-4 md:px-8 bg-[#e5eeff] border-t border-b border-blue-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">حياتنا اليومية</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d]">معرض الصور والفيديو</h2>
          <div className="w-12 h-1 bg-[#775a19] mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-[#434651] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-light">
            جانب من أنشطتنا وفعالياتنا الرياضية والترفيهية والتعليمية، وبيئة العمل الآمنة والمجهزة داخل الفروع.
          </p>
        </div>

        {/* 4 elements Grid matching screenshots structurally */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              onClick={() => setSelectedMediaId(item.id)}
              className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-blue-50/60 cursor-pointer"
            >
              {/* Media Thumbnail */}
              <img 
                src={item.thumbnailUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition-colors" />

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
                <p className="text-xs text-white font-medium truncate mt-0.5">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal / HTML5 Video player */}
        <AnimatePresence>
          {selectedMediaId && activeMedia && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMediaId(null)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl z-10 text-right"
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
