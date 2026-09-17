import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { SITE_IMAGES, getActiveImage } from '../config/siteImages';
import { Eye, Play, ExternalLink, Sparkles } from 'lucide-react';

export const TikTokSection: React.FC = () => {
  const featuredVideoUrl = "https://www.tiktok.com/@luxcleanmali223/video/7652775796922141972?is_from_webapp=1&sender_device=pc&web_id=7685441021673178644";
  const featuredVideoId = "7652775796922141972";

  // Load TikTok embed script dynamically for native embed support
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Real stats from official TikTok account @luxcleanmali223
  const featuredStats = {
    likes: '78',
    comments: '0',
    views: '646',
  };

  const otherVideos = [
    {
      id: 'tt-2',
      title: 'Nettoyage & shampouinage en profondeur d’un fauteuil salon haut de gamme',
      views: '12',
      likes: '3',
      comments: '0',
      category: 'Fauteuil & Salon',
      thumbnail: getActiveImage('tt_2', SITE_IMAGES.tiktok.video2),
      url: 'https://www.tiktok.com/@luxcleanmali223/video/7652748142588611860?is_from_webapp=1&sender_device=pc&web_id=7685441021673178644',
    },
    {
      id: 'tt-3',
      title: 'Nettoyage professionnel avec machine haute puissance sur salon & tapis',
      views: '18',
      likes: '5',
      comments: '1',
      category: 'Machine & Salon',
      thumbnail: getActiveImage('tt_3', SITE_IMAGES.tiktok.video3),
      url: 'https://www.tiktok.com/@luxcleanmali223/video/7652749222416043285?is_from_webapp=1&sender_device=pc&web_id=7685441021673178644',
    },
    {
      id: 'tt-4',
      title: 'Nettoyage complet maison, salon & fauteuils avec machine professionnelle',
      views: '598',
      likes: '7',
      comments: '0',
      category: 'Maison & Fauteuils',
      thumbnail: getActiveImage('tt_4', SITE_IMAGES.tiktok.video4),
      url: 'https://www.tiktok.com/@luxcleanmali223/video/7652774188607966485?is_from_webapp=1&sender_device=pc&web_id=7685441021673178644',
    },
  ];

  return (
    <section className="py-20 bg-[#060b18] text-white relative border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/30 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>Compte Officiel TikTok : {COMPANY_INFO.tiktokHandle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Nos Réalisations Virales en <span className="text-gold-gradient">Vidéo</span>
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Regardez nos techniciens en pleine action avec l'aspirateur injection-extraction haute puissance et le brossage rotatif sur nos chantiers à Bamako.
            </p>
          </div>

          <a
            href={featuredVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2.5 cursor-pointer shrink-0 font-display"
          >
            <span>Voir la vidéo sur TikTok</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Video Cards Grid (Exact previous 4-column layout & height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: User's featured TikTok video */}
          <a
            href={featuredVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-[#09142b] border-2 border-[#C5A869]/60 hover:border-[#DFC792] transition-all duration-300 shadow-xl flex flex-col h-96"
          >
            {/* Background Thumbnail */}
            <img
              src={getActiveImage('tt_1', SITE_IMAGES.tiktok.video1)}
              alt="Nettoyage et extraction vidéo TikTok Lux Clean Mali"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-[#060b18]/45 to-transparent"></div>

            {/* Top Badge */}
            <div className="absolute top-3 left-3 bg-[#C5A869] text-[#060B16] px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Vidéo Officielle</span>
            </div>

            {/* Play icon center in Sober Logo Gold */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-gradient text-[#060B16] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play className="w-5 h-5 fill-[#060B16] ml-0.5" />
              </div>
            </div>

            {/* TikTok side metrics: Real views count only */}
            <div className="absolute right-3 bottom-14 flex flex-col items-center text-white text-[11px] font-bold">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#060b18]/70 backdrop-blur-md flex items-center justify-center border border-[#C5A869]/20 shadow-sm">
                  <Eye className="w-4 h-4 text-[#DFC792]" />
                </div>
                <span className="text-[10px] mt-1 text-slate-200 font-semibold">{featuredStats.views}</span>
              </div>
            </div>

            {/* Bottom Title & Audio */}
            <div className="absolute bottom-3 left-3 right-12">
              <p className="text-xs font-bold text-white line-clamp-2 leading-snug">
                Démonstration en direct de nettoyage haute pression et injection-extraction à Bamako
              </p>
              <span className="text-[10px] text-[#DFC792] block mt-1 font-medium">
                @luxcleanmali223 • Voir la vidéo
              </span>
            </div>
          </a>

          {/* Cards 2, 3, 4 */}
          {otherVideos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden bg-[#09142b] border border-[#C5A869]/25 hover:border-[#C5A869]/60 transition-all duration-300 shadow-xl flex flex-col h-96"
            >
              {/* Background Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-[#060b18]/45 to-transparent"></div>

              {/* Category pill */}
              <div className="absolute top-3 left-3 bg-[#060b18]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#DFC792] border border-[#C5A869]/40">
                {video.category}
              </div>

              {/* Play icon center in Sober Logo Gold */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-[#060B16] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <Play className="w-5 h-5 fill-[#060B16] ml-0.5" />
                </div>
              </div>

              {/* TikTok side metrics: Real views count only */}
              <div className="absolute right-3 bottom-14 flex flex-col items-center text-white text-[11px] font-bold">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#060b18]/70 backdrop-blur-md flex items-center justify-center border border-[#C5A869]/20 shadow-sm">
                    <Eye className="w-4 h-4 text-[#DFC792]" />
                  </div>
                  <span className="text-[10px] mt-1 text-slate-200 font-semibold">{video.views}</span>
                </div>
              </div>

              {/* Bottom Title & Audio */}
              <div className="absolute bottom-3 left-3 right-12">
                <p className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {video.title}
                </p>
                <span className="text-[10px] text-[#DFC792] block mt-1 font-medium">
                  Son original • Lux Clean Mali
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

