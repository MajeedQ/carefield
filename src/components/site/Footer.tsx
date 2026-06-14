/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MessageCircle, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#d3e4fe] border-t border-[#775a19]/20 pt-12 pb-8 px-4 md:px-8 mt-auto text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Logo */}
        <img 
          alt="مركز مجال العناية" 
          className="h-16 object-contain" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA"
          referrerPolicy="no-referrer"
        />

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-[#002c6d]">
            مركز مجال العناية للرعاية النهارية
          </h2>
          <p className="text-xs md:text-sm text-[#434651] max-w-lg mx-auto leading-relaxed font-light">
            رعاية طبية وسلوكية وتأهيلية متخصصة تحت إشراف فريق مرخص ومؤهل في بيئة آمنة ومحفزة. حاصل على تقييم <strong className="font-semibold text-[#002c6d]">A+</strong> من قبل وزارة الموارد البشرية والتنمية الاجتماعية بمدينة الرياض.
          </p>
        </div>

        {/* Quick Contacts Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-white p-5 rounded-2xl shadow-xs border border-blue-100 max-w-lg w-full text-[#002c6d]">
          <a 
            href="tel:0560098881" 
            className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-blue-50/50 rounded-xl transition-all"
          >
            <Phone className="w-4.5 h-4.5 text-[#775a19]" />
            <span className="text-xs font-bold font-mono" dir="ltr">0560098881</span>
          </a>
          <div className="hidden md:block w-px h-6 bg-slate-100 self-center" />
          <a 
            href="tel:0546461647" 
            className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-blue-50/50 rounded-xl transition-all"
          >
            <Phone className="w-4.5 h-4.5 text-[#775a19]" />
            <span className="text-xs font-bold font-mono" dir="ltr">0546461647</span>
          </a>
        </div>

        {/* Social media icons (Matching specifications and URLs) */}
        <div className="flex gap-3 justify-center text-[#002c6d] mt-2 flex-wrap">
          
          {/* X (Twitter) */}
          <a 
            aria-label="الحساب الرسمي على منصة إكس" 
            className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#002c6d] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11" 
            href="https://twitter.com/carefieldcenter" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>

          {/* Instagram */}
          <a 
            aria-label="الحساب الرسمي على إنستغرام" 
            className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#002c6d] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11" 
            href="https://instagram.com/carefieldcenter" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Instagram className="w-4.5 h-4.5" />
          </a>

          {/* Snapchat */}
          <a 
            aria-label="سناب شات" 
            className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#002c6d] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11" 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.164 1.018c-3.284 0-5.787 2.015-6.52 4.707-.156.57-.22 1.488-.168 2.453-.027 1.076.248 1.956.452 2.658.113.393.208.723.243.987.054.409-.126.963-1.077 1.636-.547.387-1.408.823-2.185 1.259-1.12.63-2.316 1.303-2.723 2.196-.445.975-.102 1.83.987 2.463 1.144.664 2.614.99 4.368.966.368-.005.748-.02 1.135-.045.228-.016.463-.034.697-.04.475-.015.688.307.722.56.036.27-.087.614-.52.883-1.07.663-1.435 1.258-1.435 1.258-.025.044-.21.413.354.764.444.275 1.07.412 1.86.412.836 0 1.868-.182 3.064-.54 1.13-.34 2.227-.85 3.32-1.378.136-.065.27-.13.406-.195.14-.066.274-.13.414-.194 1.11.536 2.223 1.054 3.372 1.4.152.046.307.09.462.133 1.11.31 2.083.47 2.875.47.788 0 1.413-.136 1.856-.412.565-.35.38-.72.355-.764 0 0-.365-.594-1.435-1.258-.432-.268-.555-.612-.52-.882.034-.253.247-.575.722-.56.234.006.47.024.697.04.387.025.767.04 1.135.045 1.753.023 3.223-.302 4.366-.966 1.09-.633 1.433-1.488.988-2.463-.406-.893-1.602-1.566-2.723-2.196-.777-.436-1.637-.87-2.185-1.258-.95-.672-1.13-1.226-1.076-1.635.035-.264.13-.594.243-.987.204-.702.48-1.582.453-2.658.05-9.458-10.457-11.458-12.015-11.458z"></path>
            </svg>
          </a>

          {/* TikTok */}
          <a 
            aria-label="تيك توك" 
            className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#002c6d] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11" 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.58 2.2-6.99 1.58-2.5-.66-4.58-2.44-5.46-4.84-.86-2.38-.64-5.18.57-7.39 1.16-2.13 3.39-3.71 5.8-4.08.31-.05.63-.08.94-.11v4.04c-1.39.23-2.79.84-3.7 1.91-.9 1.05-1.33 2.5-1.1 3.89.24 1.51 1.34 2.87 2.78 3.37 1.45.51 3.16.32 4.41-.6 1.11-.83 1.76-2.18 1.8-3.56.08-4.99.04-9.98.04-14.97h.03z"></path>
            </svg>
          </a>

          {/* Email */}
          <a 
            aria-label="البريد الإلكتروني للمراسلة" 
            className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#002c6d] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11" 
            href="mailto:Care.f.center@gmail.com"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>

        </div>

        {/* Footer legalities */}
        <p className="text-[11px] text-[#434651]/80 mt-4 leading-normal">
          © {new Date().getFullYear()} مركز مجال العناية للرعاية النهارية. جميع الحقوق محفوظة ومسجلة بوزارة الموارد البشرية.
        </p>
      </div>

      {/* Fixed bottom floating green WhatsApp bubble matching screenshots */}
      <a 
        href="https://wa.me/966560098881" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="تواصل مباشر معنا عبر واتساب"
        className="fixed bottom-6 right-6 z-45 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 flex items-center justify-center hover:shadow-emerald-500/20 group"
      >
        <MessageCircle className="w-7 h-7 fill-current text-white shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs pl-0 group-hover:pl-2 whitespace-nowrap">
          تواصل معنا واتساب
        </span>
      </a>

    </footer>
  );
};
