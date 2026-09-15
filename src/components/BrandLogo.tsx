import React from 'react';
import { COMPANY_INFO } from '../data/mockData';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSlogan?: boolean;
  className?: string;
  variant?: 'full' | 'icon-only' | 'badge';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSlogan = true,
  className = '',
  variant = 'full',
}) => {
  const getIconDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-9 h-9';
      case 'md':
        return 'w-11 h-11';
      case 'lg':
        return 'w-14 h-14';
      case 'hero':
        return 'w-20 h-20 sm:w-24 sm:h-24';
      default:
        return 'w-11 h-11';
    }
  };

  const getTitleSize = () => {
    switch (size) {
      case 'sm':
        return 'text-base';
      case 'md':
        return 'text-xl';
      case 'lg':
        return 'text-2xl';
      case 'hero':
        return 'text-3xl sm:text-4xl';
      default:
        return 'text-xl';
    }
  };

  if (variant === 'icon-only') {
    return (
      <div
        className={`relative rounded-xl overflow-hidden shadow-xl border border-[#C5A869]/40 ring-1 ring-[#C5A869]/20 bg-[#070e1f] shrink-0 ${getIconDimensions()} ${className}`}
      >
        <img
          src={COMPANY_INFO.logoUrl}
          alt={COMPANY_INFO.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A869]/15 via-transparent to-[#DFC792]/15 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Circular / Rounded Logo Image with Subtle Gold Accent */}
      <div
        className={`relative rounded-xl overflow-hidden shadow-xl border-2 border-[#C5A869]/45 ring-1 ring-[#C5A869]/20 bg-[#070e1f] shrink-0 transition-transform duration-300 group-hover:scale-105 ${getIconDimensions()}`}
      >
        <img
          src={COMPANY_INFO.logoUrl}
          alt={COMPANY_INFO.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A869]/15 via-transparent to-[#DFC792]/15 pointer-events-none" />
      </div>

      {/* Brand Names & Official Slogan in Sober Logo Gold */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-extrabold tracking-tight font-display text-white group-hover:text-[#DFC792] transition-colors ${getTitleSize()}`}>
            LUXCLEAN
          </span>
          <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-[#C5A869]/20 text-[#C5A869] border border-[#C5A869]/35 font-display tracking-wider">
            MALI
          </span>
        </div>
        {showSlogan && (
          <span className="text-[11px] sm:text-xs text-[#C5A869] font-normal tracking-wide mt-0.5 opacity-90">
            {COMPANY_INFO.officialSlogan}
          </span>
        )}
      </div>
    </div>
  );
};
