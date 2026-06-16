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

          {/* Snapchat - official ghost mark */}
          {config.socialMedia.snapchat && (
            <a 
              aria-label="سناب شات" 
              className="p-3 bg-white rounded-full shadow-sm hover:bg-[#FFFC00] hover:text-black transition-all border border-slate-100 flex items-center justify-center w-12 h-12 pointer-events-auto" 
              href={snapchatUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-snapchat"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden>
                <path d="M12.166 22.5c-.398 0-.781-.022-1.054-.06-.262-.038-.514-.151-.694-.302-.18-.151-.299-.34-.328-.529-.029-.18-.024-.36.014-.529.038-.18.108-.34.205-.471.097-.13.21-.232.328-.302.119-.07.232-.108.328-.108.07 0 .14.014.205.043.135.06.27.13.398.21l.043.029c.052.038.108.07.167.097l.108.06c.06.029.119.06.18.07-.06-.097-.151-.232-.27-.398-.119-.18-.252-.367-.398-.572-.151-.21-.302-.421-.471-.644-.18-.232-.352-.464-.514-.694-.18-.252-.34-.487-.487-.715l-.302-.471c-.097-.151-.18-.302-.252-.45-.078-.151-.151-.302-.21-.45-.06-.151-.119-.302-.151-.45-.043-.151-.07-.302-.08-.45-.01-.151-.014-.302 0-.45.014-.151.043-.302.08-.45-.07-.06-.151-.119-.232-.18-.097-.07-.21-.151-.34-.232-.13-.097-.27-.21-.421-.328-.151-.119-.302-.252-.45-.398-.151-.151-.302-.302-.45-.471-.151-.18-.302-.367-.45-.572-.151-.21-.302-.421-.45-.644-.151-.232-.302-.464-.45-.694L4.9 11.3c-.07-.151-.13-.302-.18-.45-.052-.151-.097-.302-.13-.45-.043-.151-.07-.302-.08-.45-.014-.151-.014-.302 0-.45.024-.27.08-.529.151-.78.078-.252.18-.495.302-.715.119-.232.252-.45.398-.65.151-.21.302-.398.45-.572.151-.18.302-.34.45-.487.151-.151.302-.27.45-.398.151-.119.302-.232.45-.34-.043-.151-.097-.302-.151-.45-.06-.151-.119-.302-.18-.45-.078-.151-.14-.302-.21-.45-.07-.151-.14-.302-.21-.45-.078-.151-.151-.302-.21-.45-.06-.151-.119-.302-.18-.45-.052-.151-.097-.302-.13-.45-.043-.151-.07-.302-.08-.45-.014-.151-.014-.302 0-.45.024-.302.097-.595.21-.866.119-.27.27-.514.45-.715.18-.21.398-.367.644-.487.252-.119.524-.18.808-.18.27 0 .529.06.78.18.252.119.487.27.694.45.21.18.398.398.572.65.18.252.34.514.487.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.151-.27.302-.514.45-.78.18-.27.398-.487.65-.65.252-.151.529-.232.836-.232.302 0 .595.07.866.21.27.151.514.34.715.572.21.252.367.524.487.836.119.302.18.6.18.916 0 .314-.06.6-.18.866-.13.27-.302.514-.514.715-.21.21-.45.367-.715.487-.27.119-.555.18-.836.18-.097 0-.18-.014-.252-.024-.252.832-.45 1.64-.595 2.43-.151.78-.232 1.535-.232 2.267 0 .314.014.6.052.866.034.27.097.514.18.715.078.21.18.398.302.572.119.18.27.34.45.487.18.151.398.27.65.398.252.119.529.232.836.34.314.119.65.232 1.022.34.367.119.78.232 1.225.34.45.119.93.21 1.44.302.514.097 1.054.18 1.626.252.572.07 1.176.13 1.808.18.65.043 1.328.07 2.04.08.715.014 1.46.014 2.232 0 .78-.014 1.582-.052 2.408-.119.043-.014.097-.014.151-.014.151.014.302.043.45.097.151.052.302.119.45.21.151.097.302.21.45.34.151.13.302.27.45.421.151.151.27.302.398.45.119.151.21.302.27.45.06.151.097.302.097.45 0 .151-.043.302-.13.45-.097.151-.232.302-.398.45-.18.151-.398.302-.65.45-.252.151-.529.302-.836.45-.302.151-.625.302-.954.45-.328.151-.65.302-.97.45-.328.151-.625.302-.93.45-.302.151-.572.302-.808.45-.232.151-.421.302-.572.45-.151.151-.252.302-.302.45-.043.151-.052.302-.014.45.043.151.13.302.27.45.13.151.302.302.514.45.21.151.45.302.715.45.27.151.55.302.836.45.314.151.65.302.998.45.34.151.7.302 1.054.45.367.151.738.302 1.114.45.375.151.748.302 1.114.45.367.151.738.302 1.114.45.367.151.738.302 1.114.45.375.151.748.302 1.114.45.367.151.738.302 1.114.45-1.32.715-2.69 1.32-4.116 1.808-1.426.487-2.91.836-4.461 1.054-.715.097-1.44.151-2.18.18l-1.486.014h-.029z"/>
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

        {/* Footer legalities */}
        <p className="text-[11px] text-[#434651]/80 mt-4 leading-normal">
          {config.footerCopyright || `© ${new Date().getFullYear()} مركز مجال العناية للرعاية النهارية. جميع الحقوق محفوظة ومسجلة بوزارة الموارد البشرية.`}
        </p>
      </div>

      {/* Floating WhatsApp bubble lives in <WhatsAppBubble /> mounted at the route level */}

    </footer>
  );
};
