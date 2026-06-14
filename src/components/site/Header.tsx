/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header id="main-header" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        
        {/* Secondary supportive actions (Hidden on small mobile, elegant accents on desktop) */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-[#434651]">
          <a href="tel:0560098881" className="flex items-center gap-1.5 hover:text-[#002c6d] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#775a19]" />
            <span dir="ltr">0560098881</span>
          </a>
          <span className="w-px h-3 bg-blue-100" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#002c6d]" />
            <span>الرياض - لبن والنزّهة</span>
          </div>
        </div>

        {/* Center Logo */}
        <div className="flex-1 sm:flex-initial flex justify-center sm:justify-start">
          <a href="#" className="block focus:outline-none focus:ring-2 focus:ring-[#002c6d] rounded-lg">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA" 
              alt="مركز مجال العناية للرعاية النهارية" 
              className="h-16 md:h-20 object-contain drop-shadow-xs hover:scale-[1.02] transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* CTA quick button */}
        <div className="hidden sm:block">
          <a 
            href="#lead-form" 
            className="inline-flex items-center justify-center bg-[#002c6d] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1a438d] transition-all shadow-xs"
          >
            التسجيل المبدئي
          </a>
        </div>

      </div>
    </header>
  );
};
