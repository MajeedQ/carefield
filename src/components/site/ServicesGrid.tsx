/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '@/lib/site-data';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '@/lib/site-types';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  return (
    <section id="services-section" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold text-[#775a19] uppercase tracking-wider block mb-2">
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

        {/* The 15 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              onClick={() => onSelectService(service)}
              className="bg-[#f8f9ff] cursor-pointer rounded-2xl p-6 border-t-4 border-[#775a19] shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Round Icon */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm border border-blue-50/70 group-hover:bg-[#002c6d] group-hover:text-white transition-all duration-300">
                  <LucideIcon 
                    name={service.iconName} 
                    className="w-5.5 h-5.5 text-[#002c6d] group-hover:text-white transition-colors" 
                  />
                </div>

                {/* Card Title */}
                <h3 className="text-base md:text-lg font-bold text-[#0b1c30] group-hover:text-[#002c6d] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Service Short Slogan */}
                <p className="text-xs text-[#434651] mt-2 leading-relaxed line-clamp-2 md:line-clamp-3 font-light">
                  {service.shortDescription}
                </p>
              </div>

              {/* Read more indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#775a19] opacity-70 group-hover:opacity-100 transition-opacity">
                <span>عرض التفاصيل والبرنامج</span>
                <span className="text-[10px] bg-amber-50 px-2 py-1 rounded">معتمدة</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
