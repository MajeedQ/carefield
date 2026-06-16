/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

interface CareFieldLogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
}

const DEFAULT_LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBNlY6nvcGw8M02ViWxRHOWDCqEchiVrI83N3zS5zfJIznuJ_STVVwBhqjqfrssaaoWnqkATtEfLbrTqRGzEE2Cvbm0BJ1LUFSq132Ff-5lcYvM9x6Y0iJTdSAjxCXHqR1kYfyofwwlmkfBCvrV2y8NjR1EhH7aNYEbRJVVMTC9cE7jHGF_yZOAa05vR2fznbVAJTT3w7fMubBwomh6ExZMrqru7Oct39idVNHn3BtNqiPa6RFnrxsuRmjKfdXS6ELw25vsypCPnyA";

const SIZE_PX: Record<string, number> = {
  sm: 40,
  md: 56,
  lg: 72,
  xl: 88,
};

const SHAPE_CLASSES: Record<string, string> = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-md",
};

type Viewport = 'mobile' | 'tablet' | 'desktop';

function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => {
      const w = window.innerWidth;
      setVp(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return vp;
}

export const CareFieldLogo: React.FC<CareFieldLogoProps> = ({ className }) => {
  const { config } = useApp();
  const theme = (config?.theme ?? {}) as any;
  const viewport = useViewport();

  const customUrl = (theme.logoImageUrl ?? "").trim();
  const logoSrc = customUrl || DEFAULT_LOGO_URL;

  // Pick viewport-specific override, fallback to global setting
  const size = (
    viewport === 'mobile'
      ? theme.logoSizeMobile
      : viewport === 'tablet'
      ? theme.logoSizeTablet
      : theme.logoSizeDesktop
  ) || theme.logoSize || 'md';

  const shape = (
    viewport === 'mobile'
      ? theme.logoShapeMobile
      : viewport === 'tablet'
      ? theme.logoShapeTablet
      : theme.logoShapeDesktop
  ) || theme.logoShape || 'circle';

  const frameOverride = viewport === 'mobile'
    ? theme.logoShowFrameMobile
    : viewport === 'tablet'
    ? theme.logoShowFrameTablet
    : theme.logoShowFrameDesktop;
  const showFrame = frameOverride === null || frameOverride === undefined
    ? theme.logoShowFrame !== false
    : !!frameOverride;

  const px = SIZE_PX[size as keyof typeof SIZE_PX] ?? SIZE_PX.md;
  const shapeClass = SHAPE_CLASSES[shape as keyof typeof SHAPE_CLASSES] ?? SHAPE_CLASSES.circle;

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center aspect-square select-none group ${className ?? ''}`}
      style={{ width: px, height: px }}
      id="care-field-logo-root"
    >
      {showFrame && (
        <>
          {/* Outer golden halo - stronger ring for contrast on light headers */}
          <div className={`absolute inset-[-4px] ${shapeClass} bg-gradient-to-tr from-amber-500/25 via-blue-500/10 to-amber-500/35 opacity-80 group-hover:opacity-100 blur-[3px] transition-opacity duration-500`} />
          {/* Gold rim */}
          <div className={`absolute inset-[-1.5px] ${shapeClass} border-2 border-amber-500/60 group-hover:border-amber-500/90 transition-colors duration-500 z-0`} />
          {/* White background + crisp shadow */}
          <div className={`absolute inset-0 bg-white ${shapeClass} border border-amber-500/40 shadow-[0_8px_24px_-4px_rgba(0,44,109,0.18),0_4px_12px_-2px_rgba(119,90,25,0.18),0_0_0_2px_rgba(255,255,255,1)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,44,109,0.25),0_6px_18px_rgba(119,90,25,0.22)] z-1`} />
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
