import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { MessageCircle } from 'lucide-react';

/**
 * Persistent WhatsApp bubble for desktop/tablet (lg+). Mobile already has an
 * equivalent CTA baked into MobileBottomBar, so this only renders above the
 * lg breakpoint to avoid duplicating it.
 */
export const FloatingWhatsApp: React.FC = () => {
  const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Bonjour Lux Clean Mali, je souhaite un devis ou réserver un nettoyage à Bamako.',
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white items-center justify-center shadow-2xl shadow-black/40 transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
      <MessageCircle className="w-7 h-7 relative" fill="white" />
    </a>
  );
};
