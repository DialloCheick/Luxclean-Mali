import React from 'react';
import { COMPANY_INFO } from '../data/mockData';

// Lucide-react doesn't ship brand logos, so these are small hand-drawn SVGs
// sized to inherit currentColor like any other icon in this project.

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82c-.83-.9-1.29-2.07-1.29-3.32h-3.1v13.4c0 1.52-1.23 2.75-2.75 2.75s-2.75-1.23-2.75-2.75 1.23-2.75 2.75-2.75c.27 0 .53.04.78.11V10.2a5.86 5.86 0 0 0-.78-.05 5.85 5.85 0 1 0 5.85 5.85V8.78a7.26 7.26 0 0 0 4.24 1.36V7.04c-1.03 0-2-.33-2.95-1.22z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.14h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.21 8.21 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.24-.86.85-.86 2.07 0 1.21.88 2.39 1 2.55.12.17 1.74 2.69 4.25 3.72.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.67-1.19.21-.58.21-1.08.14-1.19-.06-.1-.23-.16-.48-.29z" />
  </svg>
);

interface SocialLinksProps {
  variant?: 'row' | 'stacked';
  iconClassName?: string;
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'row',
  iconClassName = 'w-4 h-4',
  className = '',
}) => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}`;

  const links = [
    { href: whatsappUrl, label: 'WhatsApp', Icon: WhatsAppIcon, hoverClass: 'hover:text-emerald-400 hover:border-emerald-500/50' },
    { href: COMPANY_INFO.tiktokUrl, label: 'TikTok', Icon: TikTokIcon, hoverClass: 'hover:text-[#DFC792] hover:border-[#C5A869]/60' },
    // Facebook only shows once COMPANY_INFO.facebookUrl is a real, confirmed URL.
    ...(COMPANY_INFO.facebookUrl
      ? [{ href: COMPANY_INFO.facebookUrl, label: 'Facebook', Icon: FacebookIcon, hoverClass: 'hover:text-sky-400 hover:border-sky-500/50' }]
      : []),
  ];

  return (
    <div className={`flex ${variant === 'stacked' ? 'flex-col' : 'flex-row'} gap-2 ${className}`}>
      {links.map(({ href, label, Icon, hoverClass }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`w-8 h-8 rounded-lg bg-[#09142b] border border-[#C5A869]/25 text-slate-300 flex items-center justify-center transition-colors ${hoverClass}`}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
};
