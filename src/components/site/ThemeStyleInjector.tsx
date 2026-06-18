import React from "react";
import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/site-content";
import { injectMarketingPixels } from "@/lib/pixels";

/**
 * Applies the dynamic theme (CSS variables) loaded from site_settings and
 * injects marketing pixels (GA / Meta / Snap / TikTok) once on the client.
 */
export const ThemeStyleInjector: React.FC = () => {
  const { data: s } = useQuery(settingsQuery());

  React.useEffect(() => {
    if (!s) return;
    injectMarketingPixels({
      ga_id: s.ga_id,
      meta_pixel_id: s.meta_pixel_id,
      snap_pixel_id: s.snap_pixel_id || "418c8228-3960-40f4-b398-3f9f17c5f933",
      tiktok_pixel_id: s.tiktok_pixel_id || "D8Q3BL3C77U896T4RT80",
    });
  }, [s]);

  if (!s) return null;

  const fontScaleMap: Record<string, string> = { compact: "14px", normal: "16px", large: "18px", huge: "20px" };
  const fontFamilyMap: Record<string, string> = {
    system: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    inter: '"Inter", sans-serif',
    cairo: '"Cairo", sans-serif',
    tajawal: '"Tajawal", "IBM Plex Sans Arabic", sans-serif',
    grotesk: '"Space Grotesk", sans-serif',
  };
  const radiusMap: Record<string, string> = {
    none: "0px", small: "6px", medium: "12px", large: "18px", xlarge: "28px", full: "9999px",
  };
  const spacingMap: Record<string, string> = { compact: "0.75", normal: "1.0", comfortable: "1.25", loose: "1.5" };

  const isSafeColor = (v: unknown): v is string =>
    typeof v === "string" && /^(#[0-9a-fA-F]{3,8}|rgba?\([\d\s,.%/]+\)|hsla?\([\d\s,.%/]+\))$/.test(v.trim());
  const safeColor = (v: unknown, fallback: string) => (isSafeColor(v) ? v.trim() : fallback);

  const primary = safeColor(s.primary_color, "#002c6d");
  const accent = safeColor(s.accent_color, "#775a19");
  const bg = safeColor(s.background_color, "#ffffff");
  const fSize = fontScaleMap[s.font_scale] ?? "16px";
  const fFam = fontFamilyMap[s.font_family] ?? fontFamilyMap.tajawal;
  const radius = radiusMap[s.border_radius] ?? "18px";
  const spacing = spacingMap[s.spacing_scale] ?? "1.0";

  return (
    <style suppressHydrationWarning>{`
      :root {
        --color-primary: ${primary} !important;
        --color-accent-gold: ${accent} !important;
        --color-surface-bg: ${bg} !important;
        --font-size-base: ${fSize} !important;
        --font-sans: ${fFam} !important;
        --font-display: ${fFam} !important;
        --radius-factor: ${radius} !important;
        --spacing-multiplier: ${spacing} !important;
      }
      html { font-size: var(--font-size-base) !important; font-family: var(--font-sans) !important; background: ${bg}; }
      body, div, p, span, a, button, select, input, textarea, h1, h2, h3, h4, h5, h6 { font-family: var(--font-sans) !important; }
      .text-\\[\\#002c6d\\] { color: ${primary} !important; }
      .bg-\\[\\#002c6d\\] { background-color: ${primary} !important; }
      .border-\\[\\#002c6d\\] { border-color: ${primary} !important; }
      .focus\\:border-\\[\\#002c6d\\]:focus { border-color: ${primary} !important; }
      .focus\\:ring-\\[\\#002c6d\\]:focus { --tw-ring-color: ${primary} !important; }
      .hover\\:bg-\\[\\#1a438d\\]:hover { background-color: ${primary} !important; opacity: .9 !important; }
      .hover\\:text-\\[\\#002c6d\\]:hover { color: ${primary} !important; }
      .text-\\[\\#775a19\\] { color: ${accent} !important; }
      .bg-\\[\\#775a19\\] { background-color: ${accent} !important; }
      .border-\\[\\#775a19\\] { border-color: ${accent} !important; }
      .hover\\:bg-\\[\\#775a19\\]:hover { background-color: ${accent} !important; }
      @keyframes shine { 0%{left:-100%} 100%{left:100%} }
      .group-hover\\:animate-shine:hover .animate-shine, .animate-shine { animation: shine 1.2s ease-in-out; }
    `}</style>
  );
};
