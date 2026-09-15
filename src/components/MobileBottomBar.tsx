import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { Phone, Calculator, MessageCircle, Calendar } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenQuote: () => void;
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenQuote,
  onOpenBooking,
}) => {
  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Lux Clean Mali, je souhaite un devis ou réserver un nettoyage à Bamako."
  )}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060b18]/95 backdrop-blur-lg border-t border-[#C5A869]/30 p-2.5 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.7)]">
      <div className="grid grid-cols-4 gap-2 items-center max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#09142b] border border-[#C5A869]/20 text-slate-200 hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4 text-[#C5A869] mb-0.5" />
          <span className="text-[10px] font-semibold">Appeler</span>
        </a>

        {/* Devis Button */}
        <button
          onClick={onOpenQuote}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/35 text-[#DFC792] font-bold transition-colors cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-[#C5A869] mb-0.5" />
          <span className="text-[10px]">Devis</span>
        </button>

        {/* RDV Button */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#09142b] border border-[#C5A869]/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#C5A869] mb-0.5" />
          <span className="text-[10px] font-semibold">RDV</span>
        </button>

        {/* WhatsApp Button (Sober Brushed Gold) */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-gold-gradient text-[#060B16] font-bold shadow-md transition-transform active:scale-95 relative"
        >
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-slate-950 animate-ping"></div>
          <MessageCircle className="w-4 h-4 fill-[#060B16] mb-0.5" />
          <span className="text-[10px]">WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
