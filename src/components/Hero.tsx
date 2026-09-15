import React from 'react';
import { Sparkles, ArrowRight, Clock, CheckCircle2, MessageCircle, Star, MapPin, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { SITE_IMAGES, getActiveImage } from '../config/siteImages';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenBooking }) => {
  const directWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Lux Clean Mali, je souhaite avoir des informations ou réserver un nettoyage à Bamako."
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#070e20] via-[#09132a] to-[#060b18] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#C5A869]/20">
      {/* Sober Champagne Gold luxury ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-[#C5A869]/10 via-[#DFC792]/5 to-[#A08242]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to actions */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Official Emblem Badge */}
            <div className="inline-flex items-center gap-3 p-1.5 pr-5 rounded-2xl bg-[#0a142c]/90 border border-[#C5A869]/35 shadow-xl backdrop-blur-md">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-[#C5A869]/40 shrink-0 bg-[#060b17] shadow-inner">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt={COMPANY_INFO.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white font-display tracking-wide">LUXCLEAN MALI</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#C5A869]/20 text-[#C5A869] border border-[#C5A869]/30 font-bold uppercase tracking-wider">
                    Maison d'Excellence
                  </span>
                </div>
                <span className="text-xs text-[#DFC792] font-normal italic block mt-0.5">
                  « {COMPANY_INFO.officialSlogan} »
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0f1e40] text-[#DFC792] border border-[#C5A869]/25">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                Service Premium de Nettoyage à Bamako
              </span>
              <a
                href={COMPANY_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0f1e40] text-slate-200 border border-[#C5A869]/25 hover:border-[#C5A869]/50 hover:bg-[#152a57] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] animate-pulse"></span>
                Vidéos TikTok {COMPANY_INFO.tiktokHandle}
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.15] text-white">
              Redonnez à vos{' '}
              <span className="text-gold-gradient font-black">
                Tapis, Moquettes & Canapés
              </span>{' '}
              l’éclat et la pureté du neuf.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Spécialiste du nettoyage industriel et haute pression à <strong>Bamako</strong> pour les{' '}
              <span className="text-white font-semibold">résidences de prestige</span>, les{' '}
              <span className="text-white font-semibold">sièges d’entreprises</span> et les{' '}
              <span className="text-[#DFC792] font-semibold">grandes moquettes de mosquées</span>.
              Élimination radicale de la poussière rouge, des acariens et des taches tenaces avec séchage accéléré.
            </p>

            {/* CTA Group with Sober Logo Gold */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                id="btn-hero-quote"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-[#060B16] font-extrabold font-display text-base shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Calculer mon devis gratuit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-hero-whatsapp"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0c1836] hover:bg-[#122452] text-white border border-[#C5A869]/40 hover:border-[#C5A869] font-bold text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer group shadow-lg"
              >
                <MessageCircle className="w-5 h-5 text-[#C5A869] group-hover:scale-110 transition-transform" />
                <span>Réserver sur WhatsApp</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#C5A869]/20 text-xs text-slate-300 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A869] shrink-0" />
                <span className="text-white">Extraction haute puissance</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A869] shrink-0" />
                <span className="text-white">Séchage rapide (2 à 4h)</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-[#C5A869] shrink-0" />
                <span className="text-white">Déplacement partout à Bamako</span>
              </div>
            </div>

            {/* Payment badge teaser */}
            <div className="p-3.5 rounded-xl bg-[#091329] border border-[#C5A869]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C5A869]" />
                Paiement local sécurisé :
              </span>
              <div className="flex items-center gap-2 font-semibold">
                <span className="px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">Orange Money</span>
                <span className="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-500/40">Wave Mali</span>
                <span className="px-2.5 py-0.5 rounded bg-blue-600/20 text-blue-200 border border-blue-600/40">Moov Money</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Espèces</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Sober Gold Accents */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer sober luxury gold ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#C5A869]/20 via-[#DFC792]/10 to-[#A08242]/20 blur-md"></div>

              <div className="relative rounded-2xl bg-[#081226] border-2 border-[#C5A869]/35 overflow-hidden shadow-2xl">
                {/* Hero Image */}
                <div className="relative h-72 sm:h-84 w-full overflow-hidden">
                  <img
                    src={getActiveImage('hero_main', SITE_IMAGES.hero.main)}
                    alt="Brossage mécanique haute puissance sur canapé et tissus à Bamako - Lux Clean Mali"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081226] via-[#081226]/40 to-transparent"></div>

                  {/* Floating Tech badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#060b18]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A869]/30 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] animate-pulse"></span>
                    <span className="font-bold text-white">Technologie Haute Pression</span>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-[#060b18]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A869]/30 text-xs flex items-center gap-1.5 text-[#C5A869] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#C5A869]" />
                    <span className="text-white">4.9 / 5</span>
                    <span className="text-slate-300 font-normal">(180+ avis)</span>
                  </div>

                  {/* Bottom overlay text */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-wider font-extrabold text-[#DFC792] mb-1">
                      Démonstration en direct
                    </p>
                    <h3 className="text-base font-bold text-white leading-snug">
                      Évacuation immédiate de la poussière rouge incrustée
                    </h3>
                  </div>
                </div>

                {/* Card Sub-stats & Actions */}
                <div className="p-5 space-y-4 bg-[#091329]">
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-3 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/20">
                      <div className="text-lg font-black text-[#C5A869] font-display">4 800+</div>
                      <div className="text-[11px] text-slate-300">Clients Bamako</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/20">
                      <div className="text-lg font-black text-white font-display">99.8%</div>
                      <div className="text-[11px] text-slate-300">Désinfection</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/20">
                      <div className="text-lg font-black text-[#DFC792] font-display">2h à 4h</div>
                      <div className="text-[11px] text-slate-300">Séchage Express</div>
                    </div>
                  </div>

                  {/* Quick trigger banner */}
                  <div className="p-3.5 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Besoin d'une intervention urgente ?</p>
                      <p className="text-[11px] text-[#DFC792]">Disponible aujourd'hui partout à Bamako</p>
                    </div>
                    <button
                      onClick={onOpenBooking}
                      className="px-4 py-2 rounded-lg bg-gold-gradient text-[#060B16] text-xs font-bold transition-all cursor-pointer shadow-sm"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
