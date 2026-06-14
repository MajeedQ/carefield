/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { bannersQuery } from '@/lib/site-content';

const DEFAULT_SLIDES = [
  {
    id: 'd1',
    title: 'مركز مجال العناية',
    subtitle: 'شعار الثقة والأمان لأطفالنا',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtmrKHWruhd8B7jOPSXzUNaz0LSxp3ywigDxzGiXIrMGThLH_UtXSv_6M4mvqL-i7yDTFvdQGwSMApodmIPbTv3qX6kCX3GdwR52rIdgPCHgwgFGQfCsaTh7RzYQqqmefBQGsg0w2BvyfZAbTzvAQg-qvQMtgU9y3rSoX73gt0mZYwiA5lsKmiDOL7pO3r15YaQZWOdQ_AsgAolu7kmCjpHnyFWWjO2UVqaSS2GiIkNnyKNZiEEVIJFWlgrVqOjx0aUmpYlEKdyYSXVw',
    tag: 'بيئة متكاملة'
  },
  {
    id: 'd2',
    title: 'تأهيل طبي وسلوكي',
    subtitle: 'أحدث الأدوات لتدريب الأبطال',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    tag: 'رعاية صحية'
  },
  {
    id: 'd3',
    title: 'أنشطة حركية وتعليمية',
    subtitle: 'فصول مجهزة لتنمية المهارات',
    image_url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
    tag: 'أنشطة ترفيهية'
  }
];

export const Hero: React.FC = () => {
  const { data: banners = [] } = useQuery(bannersQuery(true));
  const dbSlides = banners
    .filter((b) => b.kind === 'image' && b.image_url)
    .map((b) => ({
      id: b.id,
      title: b.title || '',
      subtitle: b.subtitle || '',
      image_url: b.image_url!,
      tag: b.subtitle || ''
    }));
  const HIGHLIGHT_SLIDES = dbSlides.length > 0 ? dbSlides : DEFAULT_SLIDES;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (HIGHLIGHT_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HIGHLIGHT_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [HIGHLIGHT_SLIDES.length]);

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HIGHLIGHT_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + HIGHLIGHT_SLIDES.length) % HIGHLIGHT_SLIDES.length);
  };

  return (
    <section id="hero-section" className="relative pt-8 pb-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-[#f8f9ff] to-white overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Right side: Arabic text and actions */}
        <div className="flex flex-col gap-6 text-center md:text-right">
          
          <div className="inline-flex self-center md:self-start items-center gap-1.5 bg-blue-100/60 border border-blue-200/50 text-[#002c6d] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>التسجيل مفتوح حالياً للعام الجديد</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#002c6d] leading-snug md:leading-tight">
            الرعاية الأمثل لأطفالنا <br />
            <span className="text-[#775a19] bg-gradient-to-r from-[#775a19] to-[#e9c176] bg-clip-text text-transparent">ذوي الاحتياجات الخاصة</span>
          </h1>

          <p className="text-base md:text-lg text-[#434651] max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
            في مركز مجال العناية، نقدم بيئة آمنة ومتطورة لتأهيل وتطوير مهارات الأطفال، مع نخبة من الأخصائيين المعتمدين لتنمية قدرات المستفيدين وتحقيق الاستقلالية التامة.
          </p>

          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a 
                href="#lead-form" 
                className="inline-flex items-center justify-center gap-2 bg-[#002c6d] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a438d] hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-blue-950/10 group"
              >
                <span>طلب تواصل واستشارة مجانية</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </a>
              <a 
                href="#services-section" 
                className="inline-flex items-center justify-center bg-white text-[#002c6d] border border-blue-100 px-6 py-4 rounded-xl font-semibold hover:bg-blue-50/50 transition-all"
              >
                استعراض الخدمات
              </a>
            </div>

            <p className="text-xs text-[#434651]/75 leading-relaxed max-w-lg mx-auto md:mx-0">
              * هذا النموذج مخصص لطلب استشارة مبدئية للتواصل معكم من قبل أخصائيينا، وليس تسجيلاً نهائيًا في الرعاية النهارية الحكومية.
            </p>
          </div>
        </div>

        {/* Left side: Premium Image Carousel / Device Display */}
        <div className="relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-blue-100/30">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Overlay shadow tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002c6d]/50 via-transparent to-transparent z-10" />
              
              {/* The slideshow image */}
              <img 
                src={HIGHLIGHT_SLIDES[activeSlide].imageUrl} 
                alt={HIGHLIGHT_SLIDES[activeSlide].title} 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />

              {/* Tag */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-xs text-[#002c6d] text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-100 shadow-xs">
                {HIGHLIGHT_SLIDES[activeSlide].tag}
              </div>

              {/* Title & Subtitle inside slide */}
              <div className="absolute bottom-6 right-6 left-6 z-20 text-white text-right">
                <span className="text-xs text-[#e9c176] font-semibold">{HIGHLIGHT_SLIDES[activeSlide].subtitle}</span>
                <h3 className="text-xl md:text-2xl font-bold mt-1 text-white">{HIGHLIGHT_SLIDES[activeSlide].title}</h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left/Right manual arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-[#002c6d] flex items-center justify-center shadow-xs transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-xs text-[#002c6d] flex items-center justify-center shadow-xs transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Floating 'Certified Care' badge (Glassmorphism) matched from screenshot */}
          <div className="absolute bottom-6 left-6 z-20 bg-white/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-white/20 max-w-[170px] pointer-events-none select-none hidden sm:block">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#775a19] shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] text-[#434651] font-medium leading-none">مركز مجال العناية</span>
                <span className="text-xs text-[#002c6d] font-bold mt-0.5">رعاية وتأهيل معتمد</span>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {HIGHLIGHT_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'bg-amber-400 w-6' : 'bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
