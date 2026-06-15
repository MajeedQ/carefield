/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CareFieldLogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
}

export const CareFieldLogo: React.FC<CareFieldLogoProps> = ({ 
  className = "h-16 md:h-20", 
  variant = 'full' 
}) => {
  return (
    <div className={`relative flex items-center justify-center aspect-square ${className} select-none group`} id="care-field-logo-root">
      
      {/* Outer golden halo animation backing that pulses elegantly to attract positive attention to the brand */}
      <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-amber-500/20 via-blue-500/5 to-amber-500/30 opacity-70 group-hover:opacity-100 blur-[3px] transition-opacity duration-500 animate-pulse" />

      {/* Double border layer & gold metallic rim for premium aesthetic */}
      <div className="absolute inset-[-1.5px] rounded-full border border-amber-500/40 group-hover:border-amber-500/80 transition-colors duration-550 z-0" />

      {/* Premium multi-layered background circle: pure brilliant white, with high-contrast realistic shadow depths to make it stand out of the navbar */}
      <div className="absolute inset-0 bg-white rounded-full border border-amber-500/40 shadow-[0_8px_24px_-4px_rgba(0,44,109,0.18),0_4px_12px_-2px_rgba(119,90,25,0.12),0_0_0_2px_rgba(255,255,255,1)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,44,109,0.25),0_6px_18px_rgba(119,90,25,0.18)] z-1" />
      
      {/* Internal pure gold alignment rings to visually frame and emphasize the original logo */}
      <div className="absolute inset-[2.5px] rounded-full border border-amber-500/30 group-hover:border-amber-500/50 transition-colors duration-500 z-2 pointer-events-none" />
      <div className="absolute inset-[4.5px] rounded-full border border-[#002c6d]/10 z-2 pointer-events-none" />

      {/* The pristine logo graphic rendered beautifully with balanced high contrast */}
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA" 
        alt="مركز مجال العناية للرعاية النهارية" 
        className="relative z-10 h-[90%] w-[90%] object-contain select-none transition-transform duration-500 ease-out group-hover:scale-110"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        style={{ imageRendering: 'auto' }}
        referrerPolicy="no-referrer"
        id="care-field-logo-img"
      />

      {/* Decorative premium bright sheen reflection effect sweeping on hover over the card */}
      <div className="absolute inset-0 rounded-full overflow-hidden z-15 pointer-events-none">
        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-25 group-hover:animate-shine" style={{ animationDuration: '1.2s' }} />
      </div>
    </div>
  );
};
