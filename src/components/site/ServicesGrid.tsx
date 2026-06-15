/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '@/context/AppContext';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '@/lib/site-types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const { config } = useApp();
  const [showAll, setShowAll] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const services = config.services || [];

  // Show exactly 3 services initially, or all services if expanded
  const displayedServices = showAll ? services : services.slice(0, 3);

  // Handle Drag scrolling for standard mouse simulated touches
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(scrollRef.current.scrollLeft);
    setHasDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.clientX;
    const walk = (x - startX) * 1.5; // Drag sensitivity multiplier
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Track scroll on mobile to animate the dot indicators
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = Math.abs(container.scrollLeft);
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth <= 0) return;
    
    // Calculate fractional or rounded index corresponding to active item
    const fraction = scrollPosition / (scrollWidth / (displayedServices.length - 1 || 1));
    setActiveIndex(Math.min(Math.max(Math.round(fraction), 0), displayedServices.length - 1));
  };

  const handleCardClick = (service: ServiceItem, e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
      return;
    }
    onSelectService(service);
  };

  return (
    <section id="services-section" className="py-16 md:py-24 px-4 md:px-8 bg-white select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2 bg-amber-50/50 px-4 py-1 rounded-full w-fit mx-auto">
            تمكين ورعاية متكاملة
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#002c6d] tracking-tight">
            الخدمات التأهيلية المقدمة
          </h2>
          <div className="w-16 h-1.5 bg-[#775a19] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-[#434651] max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
            نقدم مجموعة متكاملة من الخدمات التأهيلية والتربوية والسريرية المصممة خصيصاً لتلبية متطلبات واحتياجات كل فرد لتحقيق الريادة والاستقلالية في الحياة.
          </p>
        </div>

        {/* Swipe Instructions alert on small devices */}
        <div className="flex md:hidden justify-center items-center gap-1.5 text-[10px] text-slate-400 font-light mb-4">
          <span>← اسحب أو مرر لليسار لمشاهدة كافة الخدمات →</span>
        </div>

        {/* The Cards Grid (Swipeable list on mobile, grid on desktop) */}
        <div className="relative">
          <motion.div 
            layout
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onScroll={handleScroll}
            className={`flex overflow-x-auto md:overflow-x-visible md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-start md:justify-center scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 md:pb-0 -mx-4 px-4 md:-mx-0 md:px-0 cursor-grab ${isDragging ? 'cursor-grabbing active:scale-[0.995] transition-transform duration-100' : ''}`}
            id="services-cards-grid"
          >
            <AnimatePresence mode="popLayout">
              {displayedServices.map((service, index) => (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={(e) => handleCardClick(service, e)}
                  className="relative group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/20 cursor-pointer rounded-2xl p-6 md:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(0,44,109,0.02)] hover:shadow-[0_20px_40px_-8px_rgba(0,44,109,0.06)] hover:border-amber-500/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-[285px] sm:w-[315px] md:w-auto shrink-0 snap-center md:snap-align-none"
                >
                  {/* Decorative golden corner stamp only shown on card hover */}
                  <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-[#775a19]/10 to-transparent rounded-tr-2xl rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Glowing Premium Icon Box */}
                    <div className="relative w-14 h-14 bg-blue-50/60 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#002c6d] group-hover:shadow-[0_8px_20px_rgba(0,44,109,0.2)]">
                      <LucideIcon 
                        name={service.iconName} 
                        className="w-6 h-6 text-[#002c6d] group-hover:text-white transition-colors duration-300" 
                       
                      />
                      {/* Ambient ring accent */}
                      <div className="absolute -inset-1.5 rounded-2xl border border-blue-500/5 group-hover:border-[#002c6d]/15 transition-all duration-300 pointer-events-none" />
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base md:text-lg font-black text-[#0b1c30] group-hover:text-[#002c6d] transition-colors duration-300 leading-snug">
                      {service.title}
                    </h3>

                    {/* Service Short Slogan */}
                    <p className="text-xs md:text-[13px] text-slate-500 group-hover:text-slate-600 mt-2.5 leading-relaxed line-clamp-2 md:line-clamp-3 font-normal transition-colors duration-300">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Read more indicator - extremely clean footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between text-xs font-bold text-[#775a19] opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1 group-hover:text-[#002c6d] transition-colors duration-300">
                      <span>عرض تفاصيل البرنامج</span>
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
                    </span>
                    <span className="text-[10px] bg-amber-500/10 text-[#775a19] px-2.5 py-1 rounded-md font-extrabold tracking-wide">
                      معتمد A+
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dynamic Pagination Active dots (only shown on mobile) */}
        <div className="flex md:hidden justify-center gap-1.5 mt-4" id="services-dots-indicator">
          {displayedServices.map((_, dotIdx) => (
            <div 
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === dotIdx ? 'w-5 bg-[#002c6d]' : 'w-1.5 bg-slate-300'}`}
            />
          ))}
        </div>

        {/* Dynamic Expand Button (تصفح المزيد) requested by user */}
        {services.length > 3 && (
          <div className="flex justify-center mt-12" id="services-toggle-container">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-white border border-[#002c6d]/20 hover:border-[#002c6d] text-sm font-bold text-[#002c6d] rounded-2xl shadow-xs hover:shadow-md hover:bg-[#002c6d] hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer group"
              id="services-expand-btn"
            >
              <span>{showAll ? 'تصفح خدمات أقل' : 'تصفح المزيد من الخدمات'}</span>
              {showAll ? (
                <ChevronUp className="w-4.5 h-4.5 transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4.5 h-4.5 transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
