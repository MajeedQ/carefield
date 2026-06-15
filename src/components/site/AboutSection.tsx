/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Eye, Target, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const AboutSection: React.FC = () => {
  const { config } = useApp();
  const about = config.aboutSection;

  if (!about) return null;

  return (
    <section id="about-section" className="py-20 px-4 md:px-8 bg-white overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute top-24 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#002c6d] text-xs font-black mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            من نحن ورؤيتنا
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002c6d] leading-tight">
            {about.title}
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-4 leading-relaxed font-medium">
            {about.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#775a19] mx-auto mt-6 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Right Column: Text Story & Mission/Vision Details (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-right">
            
            {/* Main Description */}
            <p className="text-base text-slate-600 leading-relaxed font-normal bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              {about.description}
            </p>

            {/* Vision & Mission Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Vision Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-blue-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#002c6d] flex items-center justify-center mb-4 group-hover:bg-[#002c6d] group-hover:text-white transition-colors duration-300">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#002c6d] mb-2">رؤيتنا المستدامة</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {about.vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-xs hover:border-amber-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#775a19] flex items-center justify-center mb-4 group-hover:bg-[#775a19] group-hover:text-white transition-colors duration-300">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#775a19] mb-2">رسالتنا السامية</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {about.mission}
                </p>
              </div>

            </div>

            {/* Goals List */}
            {about.goals && about.goals.length > 0 && (
              <div className="mt-2 bg-gradient-to-br from-blue-50/20 to-amber-50/10 p-6 rounded-2xl border border-blue-50/40">
                <h4 className="flex items-center gap-2 text-base font-black text-[#002c6d] mb-4">
                  <Award className="w-5 h-5 text-[#775a19]" />
                  أهدافنا الرئيسية وهدف تمكين الطفل
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {about.goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-right">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span className="text-xs text-slate-600 font-medium leading-relaxed">
                        {goal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Left Column: Visual Brand Card (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden p-1 bg-white border border-slate-100 shadow-[0_20px_40px_rgba(0,44,109,0.04)] aspect-square md:aspect-[4/3] lg:aspect-square">
              <img 
                src={about.imageUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'} 
                alt="مركز مجال العناية" 
                className="w-full h-full object-cover rounded-[20px] select-none hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay elements for physical depth */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 p-6 flex flex-col text-right text-white">
                <span className="text-[10px] text-amber-300 font-bold tracking-wide">التميز والرعاية النهارية</span>
                <span className="text-base font-black mt-1">تأهيل يتحدث بالنتائج الواقعية</span>
              </div>
            </div>

            {/* Micro floating info bullet */}
            <div className="absolute -top-6 -right-6 bg-amber-400 text-[#011a43] p-4 rounded-2xl shadow-xl border border-amber-300 pointer-events-none select-none rotate-3 hidden sm:flex items-center gap-2">
              <span className="text-base font-black">A+</span>
              <span className="text-[10px] font-bold leading-tight">معتمد بالكلية <br />من الموارد البشرية</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
