/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '@/context/AppContext';

interface CareFieldLogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
}

const DEFAULT_LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA";

const SIZE_CLASSES: Record<string, string> = {
  sm: "h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14",
  md: "h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18",
  lg: "h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
  xl: "h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28",
};

const SHAPE_CLASSES: Record<string, string> = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-md",
};

export const CareFieldLogo: React.FC<CareFieldLogoProps> = ({ className, variant = 'full' }) => {
  const { config } = useApp();
  const theme = config?.theme ?? ({} as any);
  const customUrl = (theme.logoImageUrl ?? "").trim();
  const logoSrc = customUrl || DEFAULT_LOGO_URL;
  const size = (theme.logoSize as keyof typeof SIZE_CLASSES) || "md";
  const shape = (theme.logoShape as keyof typeof SHAPE_CLASSES) || "circle";
  const showFrame = theme.logoShowFrame !== false;

  const sizeClass = className ?? SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
  const shapeClass = SHAPE_CLASSES[shape] ?? SHAPE_CLASSES.circle;

  return (
    <div
      className={`relative flex items-center justify-center aspect-square ${sizeClass} select-none group`}
      id="care-field-logo-root"
    >
      {showFrame && (
        <>
          {/* Outer golden halo */}
          <div className={`absolute inset-[-4px] ${shapeClass} bg-gradient-to-tr from-amber-500/20 via-blue-500/5 to-amber-500/30 opacity-70 group-hover:opacity-100 blur-[3px] transition-opacity duration-500 animate-pulse`} />
          {/* Gold rim */}
          <div className={`absolute inset-[-1.5px] ${shapeClass} border border-amber-500/40 group-hover:border-amber-500/80 transition-colors duration-550 z-0`} />
          {/* White background with shadow */}
          <div className={`absolute inset-0 bg-white ${shapeClass} border border-amber-500/40 shadow-[0_8px_24px_-4px_rgba(0,44,109,0.18),0_4px_12px_-2px_rgba(119,90,25,0.12),0_0_0_2px_rgba(255,255,255,1)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,44,109,0.25),0_6px_18px_rgba(119,90,25,0.18)] z-1`} />
          {/* Inner rings */}
          <div className={`absolute inset-[2.5px] ${shapeClass} border border-amber-500/30 group-hover:border-amber-500/50 transition-colors duration-500 z-2 pointer-events-none`} />
          <div className={`absolute inset-[4.5px] ${shapeClass} border border-[#002c6d]/10 z-2 pointer-events-none`} />
        </>
      )}

      <img
        src={logoSrc}
        alt={theme.logoText || "مركز مجال العناية للرعاية النهارية"}
        className={`relative z-10 ${showFrame ? 'h-[90%] w-[90%]' : 'h-full w-full'} object-cover ${shapeClass} select-none transition-transform duration-500 ease-out group-hover:scale-110`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        referrerPolicy="no-referrer"
        id="care-field-logo-img"
      />

      {showFrame && (
        <div className={`absolute inset-0 ${shapeClass} overflow-hidden z-15 pointer-events-none`}>
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-25 group-hover:animate-shine" style={{ animationDuration: '1.2s' }} />
        </div>
      )}
    </div>
  );
};
