import React from 'react';
import { COMPANY_INFO, BAMAKO_DISTRICTS } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { MapPin, Clock, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040710] text-slate-400 text-xs border-t border-[#C5A869]/20 pt-16 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C5A869]/20">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" showSlogan={true} />

            <p className="text-slate-300 leading-relaxed mt-2">
              Maison d'excellence malienne pour le nettoyage, détachage haute pression et assainissement vapeur de tapis, moquettes de mosquées, fauteuils d'entreprises et salons de prestige à Bamako.
            </p>

            <div className="space-y-2 pt-2 text-slate-200">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A869] shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A869] shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A869] shrink-0" />
                <span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#DFC792] transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links & Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Nos Prestations Phares
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="hover:text-[#DFC792] transition-colors text-slate-300">
                  • Nettoyage Tapis de Maison (Atelier & Domicile)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#DFC792] transition-colors text-slate-300">
                  • Moquettes de Mosquées (Spécial Prières)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#DFC792] transition-colors text-slate-300">
                  • Moquettes Bureaux & Sièges d'Entreprises
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#DFC792] transition-colors text-slate-300">
                  • Salons, Fauteuils & Canapés Velours/Tissu
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#DFC792] transition-colors text-slate-300">
                  • Matelas & Literie Anti-Acariens
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#DFC792] transition-colors text-slate-300">
                  • Sièges & Intérieur Véhicules 4x4
                </a>
              </li>
            </ul>
          </div>

          {/* District Coverage Bamako (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Zones Desservies à Bamako
            </h4>
            <p className="text-[11px] text-slate-400">
              Déplacement offert dès 15 000 FCFA dans tous les quartiers :
            </p>
            <div className="flex flex-wrap gap-1.5">
              {BAMAKO_DISTRICTS.slice(0, 11).map((d) => (
                <span
                  key={d.id}
                  className="px-2.5 py-1 rounded-lg bg-[#09142b] border border-[#C5A869]/20 text-[10px] text-slate-300 font-medium"
                >
                  {d.name.split('/')[0]}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg bg-[#0d1c3a] border border-[#C5A869]/35 text-[10px] text-[#DFC792] font-bold">
                + Tout le Grand Bamako
              </span>
            </div>
          </div>

          {/* Contacts & Social (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Ligne Directe
            </h4>
            <div className="space-y-2">
              <a
                href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`}
                className="block p-2.5 rounded-xl bg-[#09142b] border border-[#C5A869]/25 hover:border-[#C5A869] text-white font-bold transition-colors"
              >
                <div className="text-[10px] text-[#C5A869] font-medium">Standard / WhatsApp :</div>
                <div className="text-sm font-display tracking-wide">{COMPANY_INFO.phone1}</div>
              </a>
              <a
                href={COMPANY_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/25 hover:border-[#C5A869] text-[#DFC792] font-bold text-center transition-colors text-xs"
              >
                TikTok : {COMPANY_INFO.tiktokHandle}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with payment reminder & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_INFO.name} Bamako — Tous droits réservés. Excellence & Hygiène Certifiée.
          </p>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-slate-400">Paiements :</span>
            <span className="font-bold text-orange-400">Orange Money</span>
            <span className="text-slate-600">•</span>
            <span className="font-bold text-sky-400">Wave</span>
            <span className="text-slate-600">•</span>
            <span className="font-bold text-blue-400">Moov Money</span>
            <span className="text-slate-600">•</span>
            <span className="font-bold text-emerald-400">Espèces</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
