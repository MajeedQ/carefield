/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Hero: React.FC = () => {
  const { config } = useApp();
  const slides = config.heroSlides || [];
  const stats = config.heroStats || [];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    if (slides.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (slides.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const logoText = config.theme?.logoText || 'مركز مجال العناية للرعاية النهارية';

  return (
    <section id="hero-section" className="relative pt-6 pb-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#f8f9ff] via-[#f1f4ff]/50 to-white overflow-hidden">
      {/* Absolute Handcrafted Background Atmosphere Layers */}
      {/* Subtle modern Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5eeff_1px,transparent_1px),linear-gradient(to_bottom,#e5eeff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 z-0" />
      
      {/* Glowing Ambient light orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-amber-100/20 rounded-full blur-3xl -translate-y-1/2 z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Right side: Handcrafted Typography, Accents & Stats (7 columns on large desktop) */}
        <div className="flex flex-col gap-6 text-center lg:text-right lg:col-span-7">
          
          {/* Handcrafted Class-A+ Accreditation Tag Pill */}
          <div className="inline-flex self-center lg:self-start items-center gap-2 bg-white/80 backdrop-blur-md border border-amber-500/30 text-[#002c6d] px-4 py-2 rounded-full text-xs font-bold shadow-[0_4px_12px_rgba(119,90,25,0.05)] transition-all duration-300 hover:border-amber-500/50">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#775a19]"></span>
            </span>
            <span className="text-slate-500">حاصل على</span>
            <span className="text-[#775a19] font-black">تصنيف الفئة الأولى (A+)</span>
            <span className="text-slate-400 font-light">|</span>
            <span className="text-slate-600 font-bold">وزارة الموارد البشرية</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-[#002c6d] leading-tight md:leading-[1.15] tracking-tight">
            الرعاية التأهيلية الأمثل <br />
            <span className="relative inline-block text-[#775a19] mt-1">
              لأطفالنا أبطال القدرات
              <span className="absolute bottom-2 right-0 left-0 h-2 bg-amber-400/20 rounded-full -z-10" />
            </span>
          </h1>

          <p className="text-base md:text-[17px] text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
            في <span className="font-bold text-[#002c6d]">{logoText}</span>، نكرّس جهودنا لبناء جسور الأمل لتمكين وتأهيل أبطالنا ذوي الاحتياجات الخاصة عبر خطط علاجية وتأهيلية فردية بإشراف نخبة مرخصة ومؤهلة.
          </p>

          {/* Key Credentials Stats Grid (Bento style) - Eliminates simple flat design */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-blue-50/70 shadow-sm mt-2">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start p-2.5 rounded-xl bg-white border border-slate-100 hover:border-[#775a19]/25 transition-colors group">
                <span className="text-sm md:text-[15px] font-black text-[#002c6d] group-hover:text-[#775a19] transition-colors">{stat.num}</span>
                <span className="text-[10px] text-slate-500 mt-1 font-medium text-center lg:text-right">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
              <a 
                href="#lead-form" 
                className="inline-flex items-center justify-center gap-2.5 bg-[#002c6d] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#775a19] hover:shadow-xl hover:shadow-amber-500/10 active:scale-98 transition-all duration-300 shadow-lg shadow-blue-950/10 group cursor-pointer"
              >
                <span>طلب تواصل واستشارة مجانية</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
              </a>
              <a 
                href="#services-section" 
                className="inline-flex items-center justify-center bg-white text-[#002c6d] border border-blue-100/80 px-7 py-4 rounded-xl font-bold hover:bg-[#002c6d]/5 hover:border-[#002c6d]/30 active:scale-98 transition-all duration-300"
              >
                استعراض خدمات التأهيل
              </a>
            </div>

            <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              ⚡ المبادرة بالتسجيل المبكر تضمن لطفلك مقعده المعتمد والمدرج في برنامج الرعاية والمتابعة.
            </p>
          </div>
        </div>

        {/* Left side: Premium Image Carousel Frame (5 columns on large desktop) */}
        <div className="lg:col-span-5 relative w-full h-[340px] sm:h-[420px] md:h-[460px] rounded-3xl overflow-hidden p-1 bg-white border border-slate-100 shadow-[0_24px_50px_rgba(0,44,109,0.08)]">
          <div className="w-full h-full rounded-[20px] overflow-hidden relative">
            {slides.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Premium Gradient Shaders overlaying the dynamic image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#011a43]/75 via-transparent to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 z-10" />
                  
                  {/* The beautifully aligned image */}
                  <img 
                    src={slides[activeSlide]?.imageUrl} 
                    alt={slides[activeSlide]?.title} 
                    className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Micro-Interaction Tag */}
                  <span className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md text-[#002c6d] text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm leading-none">
                    {slides[activeSlide]?.tag}
                  </span>

                  {/* Subtitle & Title card absolute placement with premium hierarchy */}
                  <div className="absolute bottom-6 right-6 left-6 z-20 text-white text-right">
                    <div className="inline-flex items-center gap-1.5 bg-amber-400/90 text-[#011a43] px-2 py-0.5 rounded text-[10px] font-black mb-2 shadow-xs">
                      ⭐ مميز معتمد
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-md">
                      {slides[activeSlide]?.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-200 mt-1.5 font-light leading-relaxed">
                      {slides[activeSlide]?.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Premium Slideway manual navigation buttons */}
            {slides.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#002c6d] hover:text-white text-[#002c6d] flex items-center justify-center shadow-md transition-all active:scale-90"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#002c6d] hover:text-white text-[#002c6d] flex items-center justify-center shadow-md transition-all active:scale-90"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Floating Glassmorphic Certified Stamp */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white-30 max-w-[180px] pointer-events-none select-none hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-[#775a19] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-medium leading-none">ترخيص وزارة</span>
                  <span className="text-xs text-[#002c6d] font-black mt-1">تأهيل طبي معتمد</span>
                </div>
              </div>
            </div>

            {/* Elegant Dots Slide Navigational Indicator */}
            {slides.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSlide === index ? 'bg-amber-400 w-5' : 'bg-white/50 hover:bg-white'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
