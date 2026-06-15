/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MessageCircle, Instagram, Linkedin } from 'lucide-react';
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
  const linkedinUrl = getSocialUrl(config.socialMedia.linkedin || 'company/carefieldcenter', 'https://linkedin.com/in/');
  const emailUrl = `mailto:${config.socialMedia.email || 'Care.f.center@gmail.com'}`;
  const waRaw = String(config.socialMedia.whatsapp || '966560098881').trim();
  const whatsappUrl = waRaw.startsWith('http') ? waRaw : `https://wa.me/${waRaw.replace(/\+/g, '')}`;

  return (
    <footer id="main-footer" className="bg-[#d3e4fe] border-t border-[#775a19]/20 pt-12 pb-8 px-4 md:px-8 mt-auto text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        
        {/* Logo */}
        <CareFieldLogo variant="symbol" className="h-24 w-24" />

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-[#002c6d]" id="footer-logo-title">
            {config.theme?.logoText || 'مركز مجال العناية للرعاية النهارية'}
          </h2>
          <p className="text-xs md:text-sm text-[#434651] max-w-lg mx-auto leading-relaxed font-light">
            {config.theme?.logoSubtitle || 'رعاية طبية وسلوكية وتأهيلية متخصصة تحت إشراف فريق مرخص ومؤهل في بيئة آمنة ومحفزة.'} حاصل على تقييم <strong className="font-semibold text-[#002c6d]">A+</strong> من قبل وزارة الموارد البشرية والتنمية الاجتماعية بمدينة الرياض.
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

        {/* Social media icons (Matching specifications and URLs) */}
        <div className="flex gap-3 justify-center text-[#002c6d] mt-2 flex-wrap" id="footer-social-icons-row">
          
          {/* WhatsApp Direct */}
          {config.socialMedia.whatsapp && (
            <a 
              aria-label="تواصل معنا واتساب مباشر" 
              className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#25D366] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-whatsapp-icon"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          )}

          {/* X (Twitter) */}
          {config.socialMedia.twitter && (
            <a 
              aria-label="الحساب الرسمي على منصة إكس" 
              className="p-2.5 bg-white rounded-full shadow-xs hover:bg-black hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
              href={twitterUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-twitter"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
          )}

          {/* Instagram */}
          {config.socialMedia.instagram && (
            <a 
              aria-label="الحساب الرسمي على إنستغرام" 
              className="p-2.5 bg-white rounded-full shadow-xs hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
          )}

          {/* LinkedIn Direct */}
          <a 
            aria-label="الصفحة المهنية على لينكد إن" 
            className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#0077b5] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            id="footer-linkedin"
          >
            <Linkedin className="w-4.5 h-4.5 fill-current" />
          </a>

          {/* Snapchat */}
          {config.socialMedia.snapchat && (
            <a 
              aria-label="سناب شات" 
              className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#FFFC00] hover:text-black transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
              href={snapchatUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-snapchat"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.164 1.018c-3.284 0-5.787 2.015-6.52 4.707-.156.57-.22 1.488-.168 2.453-.027 1.076.248 1.956.452 2.658.113.393.208.723.243.987.054.409-.126.963-1.077 1.636-.547.387-1.408.823-2.185 1.259-1.12.63-2.316 1.303-2.723 2.196-.445.975-.102 1.83.987 2.463 1.144.664 2.614.99 4.368.966.368-.005.748-.02 1.135-.045.228-.016.463-.034.697-.04.475-.015.688.307.722.56.036.27-.087.614-.52.883-1.07.663-1.435 1.258-1.435 1.258-.025.044-.21.413.354.764.444.275 1.07.412 1.86.412.836 0 1.868-.182 3.064-.54 1.13-.34 2.227-.85 3.32-1.378.136-.065.27-.13.406-.195.14-.066.274-.13.414-.194 1.11.536 2.223 1.054 3.372 1.4.152.046.307.09.462.133 1.11.31 2.083.47 2.875.47.788 0 1.413-.136 1.856-.412.565-.35.38-.72.355-.764 0 0-.365-.594-1.435-1.258-.432-.268-.555-.612-.52-.882.034-.253.247-.575.722-.56.234.006.47.024.697.04.387.025.767.04 1.135.045 1.753.023 3.223-.302 4.366-.966 1.09-.633 1.433-1.488.988-2.463-.406-.893-1.602-1.566-2.723-2.196-.777-.436-1.637-.87-2.185-1.258-.95-.672-1.13-1.226-1.076-1.635.035-.264.13-.594.243-.987.204-.702.48-1.582.453-2.658.05-9.458-10.457-11.458-12.015-11.458z"></path>
              </svg>
            </a>
          )}

          {/* TikTok */}
          {config.socialMedia.tiktok && (
            <a 
              aria-label="تيك توك" 
              className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#010101] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
              href={tiktokUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              id="footer-tiktok"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.58 2.2-6.99 1.58-2.5-.66-4.58-2.44-5.46-4.84-.86-2.38-.64-5.18.57-7.39 1.16-2.13 3.39-3.71 5.8-4.08.31-.05.63-.08.94-.11v4.04c-1.39.23-2.79.84-3.7 1.91-.9 1.05-1.33 2.5-1.1 3.89.24 1.51 1.34 2.87 2.78 3.37 1.45.51 3.16.32 4.41-.6 1.11-.83 1.76-2.18 1.8-3.56.08-4.99.04-9.98.04-14.97h.03z"></path>
              </svg>
            </a>
          )}

          {/* Email */}
          {config.socialMedia.email && (
            <a 
              aria-label="البريد الإلكتروني للمراسلة" 
              className="p-2.5 bg-white rounded-full shadow-xs hover:bg-[#ea4335] hover:text-white transition-all border border-slate-100 flex items-center justify-center w-11 h-11 pointer-events-auto" 
              href={emailUrl}
              id="footer-email"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          )}

        </div>

        {/* Footer legalities */}
        <p className="text-[11px] text-[#434651]/80 mt-4 leading-normal">
          © {new Date().getFullYear()} مركز مجال العناية للرعاية النهارية. جميع الحقوق محفوظة ومسجلة بوزارة الموارد البشرية.
        </p>
      </div>

      {/* Floating WhatsApp bubble lives in <WhatsAppBubble /> mounted at the route level */}

    </footer>
  );
};
