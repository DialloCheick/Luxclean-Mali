import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/mockData';
import { ServiceItem, ServiceCategory } from '../types';
import { Sparkles, Check, ArrowRight, Shield, Clock, Award, Moon, Building2, Armchair, BedDouble, Car } from 'lucide-react';
import { formatFCFA } from '../utils/whatsapp';

interface ServiceCatalogProps {
  onSelectServiceForQuote: (service: ServiceItem) => void;
  onSelectServiceForBooking: (service: ServiceItem) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  onSelectServiceForQuote,
  onSelectServiceForBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredServices = activeFilter === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => {
        if (activeFilter === 'tapis_moquettes') return s.category === 'tapis' || s.category === 'moquette_mosquee' || s.category === 'moquette_bureau';
        if (activeFilter === 'salons') return s.category === 'canapes';
        if (activeFilter === 'matelas_auto') return s.category === 'matelas' || s.category === 'auto';
        return true;
      });

  const getServiceIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'moquette_mosquee':
        return <Moon className="w-5 h-5 text-[#C5A869]" />;
      case 'moquette_bureau':
        return <Building2 className="w-5 h-5 text-[#DFC792]" />;
      case 'canapes':
        return <Armchair className="w-5 h-5 text-[#C5A869]" />;
      case 'matelas':
        return <BedDouble className="w-5 h-5 text-[#DFC792]" />;
      case 'auto':
        return <Car className="w-5 h-5 text-[#C5A869]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C5A869]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#060c1a] text-slate-100 relative border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Expertise Haute Précision • Bamako</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Des Prestations <span className="text-gold-gradient">Haut de Gamme</span> & Sur-Mesure
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Qu’il s’agisse d’une résidence privée à l'ACI 2000, du lieu de culte de votre quartier ou des bureaux de votre entreprise, nous déployons les meilleures technologies de purification textile.
          </p>

          {/* Luxury Filter Tabs with Sober Logo Gold */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gold-gradient text-[#060B16] shadow-md'
                  : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/50 hover:text-white'
              }`}
            >
              Tous nos Services
            </button>
            <button
              onClick={() => setActiveFilter('tapis_moquettes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'tapis_moquettes'
                  ? 'bg-gold-gradient text-[#060B16] shadow-md'
                  : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/50 hover:text-white'
              }`}
            >
              Tapis & Moquettes (Maison, Mosquée, Bureau)
            </button>
            <button
              onClick={() => setActiveFilter('salons')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'salons'
                  ? 'bg-gold-gradient text-[#060B16] shadow-md'
                  : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/50 hover:text-white'
              }`}
            >
              Salons, Canapés & Fauteuils
            </button>
            <button
              onClick={() => setActiveFilter('matelas_auto')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'matelas_auto'
                  ? 'bg-gold-gradient text-[#060B16] shadow-md'
                  : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/50 hover:text-white'
              }`}
            >
              Matelas & Véhicules
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl bg-[#09142b] border border-[#C5A869]/25 overflow-hidden flex flex-col hover:border-[#C5A869]/60 transition-all duration-300 hover:shadow-xl shadow-md"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-[#060b17]">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09142b] via-[#09142b]/30 to-transparent" />

                {/* Badge if exists */}
                {service.badge && (
                  <div className="absolute top-3 left-3 bg-[#060b17]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A869]/35 text-xs font-bold text-[#DFC792]">
                    {service.badge}
                  </div>
                )}

                {/* Category Icon */}
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-[#060b17]/90 backdrop-blur-md border border-[#C5A869]/30 flex items-center justify-center">
                  {getServiceIcon(service.category)}
                </div>

                {/* Price pill with Sober Logo Gold */}
                <div className="absolute bottom-3 right-3 bg-[#060b17]/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#C5A869]/35 text-right">
                  <span className="text-[10px] text-slate-300 block leading-tight">À partir de</span>
                  <span className="text-sm font-black text-[#C5A869] font-display">
                    {formatFCFA(service.priceStartingAt)}
                  </span>
                  <span className="text-[10px] text-slate-300 ml-1">{service.unit}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-[#DFC792] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Feature Checklist with Sober Logo Gold */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-200">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#C5A869]/20 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onSelectServiceForQuote(service)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0d1d3d] hover:bg-[#132752] text-white hover:text-[#DFC792] border border-[#C5A869]/30 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Simuler Devis</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A869]" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gold-gradient text-[#060B16] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer font-display shadow-sm"
                  >
                    <span>Prendre RDV</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Box with Sober Logo Gold */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#09142b] border border-[#C5A869]/25 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e1d3e] border border-[#C5A869]/35 flex items-center justify-center text-[#C5A869] shrink-0 shadow-inner">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Garantie 100% Satisfait</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Si une tache traitable persiste, réintervention gratuite sous 48h sur Bamako.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e1d3e] border border-[#C5A869]/35 flex items-center justify-center text-[#C5A869] shrink-0 shadow-inner">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Ponctualité & Rapidité</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Créneaux stricts respectés, séchage rapide en quelques heures seulement.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0e1d3e] border border-[#C5A869]/35 flex items-center justify-center text-[#C5A869] shrink-0 shadow-inner">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Machines Haute Dépression</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Injecteurs-extracteurs professionnels pour un résultat digne de nos vidéos TikTok.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
