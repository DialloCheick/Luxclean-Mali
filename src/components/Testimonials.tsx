import React from 'react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/mockData';
import { Star, CheckCircle2, MessageCircle, MapPin, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="temoignages" className="py-20 bg-[#060b18] text-white relative border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <Star className="w-3.5 h-3.5 fill-[#C5A869] text-[#C5A869]" />
            <span>Témoignages & Avis Vérifiés • Bamako</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            La Confiance des Familles, Mosquées et Entreprises de <span className="text-gold-gradient">Bamako</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Découvrez les retours d'expérience authentiques de nos clients basés à l'ACI 2000, Badalabougou, Cité du Niger, Sotuba et dans tout le district de Bamako.
          </p>

          {/* Social Proof badge */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1 text-[#C5A869]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C5A869]" />
              ))}
            </div>
            <span className="text-xs font-black text-white">4.9 / 5 étoiles</span>
            <span className="text-[#C5A869]/40">•</span>
            <span className="text-xs text-slate-300">Satisfaction garantie à chaque intervention</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl bg-[#09142b] border border-[#C5A869]/25 p-6 flex flex-col justify-between hover:border-[#C5A869]/60 transition-all hover:shadow-xl relative group shadow-lg"
            >
              <Quote className="w-8 h-8 text-[#C5A869]/15 absolute top-5 right-5 group-hover:text-[#C5A869]/35 transition-colors" />

              <div className="space-y-4">
                {/* Rating and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A869]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A869]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{test.date}</span>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{test.content}"
                </p>

                {/* Service Tag */}
                <div className="inline-block px-3 py-1 rounded-lg bg-[#060c1a] border border-[#C5A869]/20 text-[11px] font-semibold text-[#DFC792]">
                  Prestation : {test.serviceUsed}
                </div>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-[#C5A869]/20 mt-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{test.name}</span>
                    {test.verified && (
                      <span className="flex items-center gap-1 text-[10px] text-[#DFC792] font-bold bg-[#0d1c3a] px-2 py-0.5 rounded border border-[#C5A869]/25">
                        <CheckCircle2 className="w-3 h-3 text-[#C5A869]" />
                        Avis vérifié
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    {test.roleOrCompany && (
                      <>
                        <span>{test.roleOrCompany}</span>
                        <span>•</span>
                      </>
                    )}
                    <span className="flex items-center gap-0.5 text-[#C5A869] font-medium">
                      <MapPin className="w-3 h-3" />
                      {test.neighborhood}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to leave a review */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            Vous avez récemment fait appel à Lux Clean Mali ?
          </p>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Bonjour Lux Clean Mali, je souhaite vous laisser mon avis suite à votre intervention."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-xs font-bold text-[#C5A869] hover:text-[#DFC792] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Partagez votre retour d'expérience sur notre WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
