/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { CareFieldLogo } from './CareFieldLogo';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { config } = useApp();

  // Handle flexible inputs for links (either direct full URLs or simple user handles)
  const getSocialUrl = (value: string, prefix: string) => {
    if (!value) return '#';
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
    return prefix + value;
  };

  const twitterUrl = getSocialUrl(config.socialMedia.twitter, 'https://twitter.com/');
  const instagramUrl = getSocialUrl(config.socialMedia.instagram, 'https://instagram.com/');
  const snapchatUrl = getSocialUrl(config.socialMedia.snapchat, 'https://snapchat.com/add/');
  const tiktokUrl = getSocialUrl(config.socialMedia.tiktok, 'https://tiktok.com/@');
  const emailUrl = `mailto:${config.socialMedia.email || 'Care.f.center@gmail.com'}`;
  const waRaw = String(config.socialMedia.whatsapp || '966560098881').trim();
  const waText = encodeURIComponent(config.socialMedia.whatsappMessage || '');
  const whatsappUrl = waRaw.startsWith('http')
    ? (waText && !waRaw.includes('?') ? `${waRaw}?text=${waText}` : waRaw)
    : `https://wa.me/${waRaw.replace(/\+/g, '')}${waText ? `?text=${waText}` : ''}`;

  return (
    <footer id="main-footer" className="bg-[#d3e4fe] border-t border-[#775a19]/20 pt-12 pb-8 px-4 md:px-8 mt-auto text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Logo */}
        <CareFieldLogo variant="symbol" className="h-32 w-32 md:h-40 md:w-40 drop-shadow-md" />

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-[#002c6d]" id="footer-logo-title">
            {config.theme?.logoText || 'مركز مجال العناية للرعاية النهارية'}
          </h2>
          <p className="text-xs md:text-sm text-[#434651] max-w-lg mx-auto leading-relaxed font-light">
            {config.footerDescription || 'رعاية طبية وسلوكية وتأهيلية متخصصة تحت إشراف فريق مرخص ومؤهل في بيئة آمنة ومحفزة. حاصل على تقييم A+ من وزارة الموارد البشرية والتنمية الاجتماعية بمدينة الرياض.'}
          </p>
        </div>

        {/* Quick Contacts Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-white p-5 rounded-2xl shadow-xs border border-blue-100 max-w-lg w-full text-[#002c6d]">
          <a 
            href={`tel:${config.socialMedia.phone1}`} 
            className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-blue-50/50 rounded-xl transition-all"
            id="footer-phone1"
          >
            <Phone className="w-4.5 h-4.5 text-[#775a19]" />
            <span className="text-xs font-bold font-mono" dir="ltr">{config.socialMedia.phone1}</span>
          </a>
          <div className="hidden md:block w-px h-6 bg-slate-100 self-center" />
          <a 
            href={`tel:${config.socialMedia.phone2}`} 
            className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-blue-50/50 rounded-xl transition-all"
            id="footer-phone2"
          >
            <Phone className="w-4.5 h-4.5 text-[#775a19]" />
            <span className="text-xs font-bold font-mono" dir="ltr">{config.socialMedia.phone2}</span>
          </a>
        </div>

        {/* Social media icons (Original brand icons) */}
        <div className="flex gap-2.5 sm:gap-3 justify-center text-[#002c6d] mt-2 flex-wrap" id="footer-social-icons-row">
          
          {/* WhatsApp Direct - official mark */}
          {config.socialMedia.whatsapp && (
            <a 
              aria-label="تواصل معنا واتساب مباشر" 
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#25D366] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto" 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-whatsapp-icon"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26L3.4 19.795l3.255-1.602zM17.5 14.382c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
            </a>
          )}

          {/* X (Twitter) */}
          {config.socialMedia.twitter && (
            <a 
              aria-label="الحساب الرسمي على منصة إكس" 
              className="p-3 bg-white rounded-full shadow-sm hover:bg-black hover:text-white transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto" 
              href={twitterUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-twitter"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}

          {/* Instagram - official gradient on hover */}
          {config.socialMedia.instagram && (
            <a 
              aria-label="الحساب الرسمي على إنستغرام" 
              className="p-3 bg-white rounded-full shadow-sm hover:bg-gradient-to-tr hover:from-[#fdc468] hover:via-[#e1306c] hover:to-[#833ab4] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto" 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}

          {/* Snapchat - same neutral style as other socials, official ghost mark */}
          {config.socialMedia.snapchat && (
            <a
              aria-label="سناب شات"
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#FFFC00] hover:text-black transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto"
              href={snapchatUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-snapchat"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 512 512" aria-hidden>
                <path d="M255.92 64c-50.61 0-92.42 38.78-95.55 88.59-1.06 16.83.16 33.18.43 49.18-5.14-2.43-11.06-4.21-17.18-4.21-13.16 0-28.32 8.66-30.46 22.71-1.51 9.95 4.39 19.86 13.65 25.95 7.27 4.79 16.78 7.34 24.61 11.06 6 2.83 12.85 6.95 12.85 13.21 0 4.74-2.95 8.81-6.18 12.81-15.66 19.42-39.62 33.32-63.31 41.05-7.5 2.44-12.84 6.21-12.43 11.95.62 8.83 11.53 11.43 17.71 12.86 6.46 1.5 11.62 1.94 14.61 7.31 1.94 3.5 1.32 8.61 4.06 13.36 4.18 7.27 13.49 8.95 22.43 8.95 11.7 0 24.78-2 38.91 1.34 12 2.85 22.81 9.39 33.91 17 19.6 13.43 38.93 22.78 64.61 22.78s45.01-9.34 64.61-22.78c11.1-7.6 21.91-14.15 33.91-17 14.13-3.36 27.21-1.34 38.91-1.34 8.94 0 18.25-1.68 22.43-8.95 2.74-4.75 2.12-9.86 4.06-13.36 3-5.37 8.15-5.81 14.61-7.31 6.18-1.43 17.09-4.03 17.71-12.86.41-5.74-4.93-9.51-12.43-11.95-23.69-7.73-47.65-21.63-63.31-41.05-3.23-4-6.18-8.07-6.18-12.81 0-6.26 6.85-10.38 12.85-13.21 7.83-3.72 17.34-6.27 24.61-11.06 9.26-6.09 15.16-16 13.65-25.95-2.14-14.05-17.3-22.71-30.46-22.71-6.12 0-12.04 1.78-17.18 4.21.27-16 1.49-32.35.43-49.18-3.13-49.81-44.94-88.59-95.55-88.59z"/>
              </svg>
            </a>
          )}

          {/* TikTok - official mark */}
          {config.socialMedia.tiktok && (
            <a 
              aria-label="تيك توك" 
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#010101] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto" 
              href={tiktokUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-tiktok"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.59a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.02z"/>
              </svg>
            </a>
          )}

          {/* Email */}
          {config.socialMedia.email && (
            <a 
              aria-label="البريد الإلكتروني للمراسلة" 
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#ea4335] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto" 
              href={emailUrl}
              id="footer-email"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}

        </div>

        {/* Legal links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold text-[#002c6d] mt-3" aria-label="روابط قانونية">
          <Link to="/privacy" className="hover:underline">سياسة الخصوصية</Link>
          <span className="text-slate-300">•</span>
          <Link to="/terms" className="hover:underline">شروط الاستخدام</Link>
          <span className="text-slate-300">•</span>
          <Link to="/blog" className="hover:underline">المدونة</Link>
          <span className="text-slate-300">•</span>
          <Link to="/contact" className="hover:underline">تواصل معنا</Link>
        </nav>

        {/* Footer legalities */}
        <p className="text-[11px] text-[#434651]/80 mt-2 leading-normal">
          {config.footerCopyright || `© ${new Date().getFullYear()} مركز مجال العناية للرعاية النهارية. جميع الحقوق محفوظة ومسجلة بوزارة الموارد البشرية.`}
        </p>
      </div>

      {/* Floating WhatsApp bubble lives in <WhatsAppBubble /> mounted at the route level */}

    </footer>
  );
};
