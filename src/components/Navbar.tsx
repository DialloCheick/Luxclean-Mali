import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { Phone, Menu, X, Calendar, Calculator } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenQuote: () => void;
  onOpenMediaManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Devis en Ligne', href: '#devis' },
    { label: 'Avant / Après', href: '#galerie' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Paiement Mali', href: '#paiement' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Banner with phone & Bamako prestige location */}
      <div className="bg-[#050b17] text-slate-300 text-xs py-2 px-4 border-b border-[#C5A869]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#DFC792] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] animate-pulse"></span>
              Disponible 7j/7 à Bamako (07h30 - 20h30)
            </span>
            <span className="hidden md:inline-block text-[#C5A869]/30">•</span>
            <span className="hidden md:inline-block text-slate-300">
              Interventions Rive Gauche & Rive Droite
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-[#DFC792] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>{COMPANY_INFO.phone1}</span>
            </a>
            <a
              href={COMPANY_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-[#DFC792] transition-colors"
            >
              <span className="font-semibold text-[#C5A869]">TikTok:</span> {COMPANY_INFO.tiktokHandle}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#070e1f]/95 backdrop-blur-md border-b border-[#C5A869]/20 text-white transition-all shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <BrandLogo size="md" showSlogan={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#DFC792] transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A869] group-hover:w-full transition-all duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Action CTAs with Sober Logo Gold */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onOpenQuote}
              className="px-3.5 py-2 text-xs font-semibold text-white hover:text-[#DFC792] bg-[#0d1a38] hover:bg-[#13254e] border border-[#C5A869]/30 hover:border-[#C5A869]/60 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Devis Express</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-bold text-[#060B16] bg-gold-gradient rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer font-display tracking-wide transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#060B16]" />
              <span>Prendre RDV</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-[#060B16] bg-gold-gradient rounded-lg shadow-sm"
            >
              RDV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-[#DFC792] rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070e1f] border-b border-[#C5A869]/20 px-4 pt-2 pb-6 space-y-3 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 pt-2 pb-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-2.5 px-3 bg-[#0d1a38] border border-[#C5A869]/30 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-[#C5A869]" />
                Devis en Ligne
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-3 bg-gold-gradient text-[#060B16] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Prendre RDV
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:text-[#DFC792] hover:bg-[#0f1d3d] text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0b162f] border border-[#C5A869]/30 text-white font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-[#C5A869]" />
                <span>Appel Direct : {COMPANY_INFO.phone1}</span>
              </a>
              <a
                href={COMPANY_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs text-slate-300 py-1"
              >
                Suivez-nous sur TikTok : <span className="text-[#C5A869] font-bold">{COMPANY_INFO.tiktokHandle}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
