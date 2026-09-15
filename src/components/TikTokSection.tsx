import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { SITE_IMAGES, getActiveImage } from '../config/siteImages';
import { Heart, MessageCircle, Play, ExternalLink } from 'lucide-react';

export const TikTokSection: React.FC = () => {
  const tiktokVideos = [
    {
      id: 'tt-1',
      title: 'Extraction impressionnante de l’eau noire sur canapé velours à l’ACI 2000',
      views: '48.5K',
      likes: '3.2K',
      category: 'Canapé Velours',
      thumbnail: getActiveImage('tt_1', SITE_IMAGES.tiktok.video1),
    },
    {
      id: 'tt-2',
      title: 'Brossage rotatif moussant & dépoussiérage vibrant sur grand tapis oriental',
      views: '62.1K',
      likes: '4.8K',
      category: 'Tapis Royal',
      thumbnail: getActiveImage('tt_2', SITE_IMAGES.tiktok.video2),
    },
    {
      id: 'tt-3',
      title: 'Opération nuit : Nettoyage & parfumage musc de la moquette de mosquée',
      views: '35.4K',
      likes: '2.9K',
      category: 'Moquette Mosquée',
      thumbnail: getActiveImage('tt_3', SITE_IMAGES.tiktok.video3),
    },
    {
      id: 'tt-4',
      title: 'Rattrapage d’un canapé familial beige taché de thé à Badalabougou',
      views: '51.0K',
      likes: '3.7K',
      category: 'Détachage Tissu',
      thumbnail: getActiveImage('tt_4', SITE_IMAGES.tiktok.video4),
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
              Regardez nos techniciens à l’œuvre avec l’aspirateur transparent haute puissance qui extrait la saleté incrustée sous vos yeux.
            </p>
          </div>

          <a
            href={COMPANY_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2.5 cursor-pointer shrink-0 font-display"
          >
            <span>Suivre @luxcleanmali223</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Video Cards Grid (TikTok phone mockup style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiktokVideos.map((video) => (
            <a
              key={video.id}
              href={COMPANY_INFO.tiktokUrl}
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

              {/* TikTok side metrics */}
              <div className="absolute right-3 bottom-16 flex flex-col items-center gap-3 text-white text-[11px] font-bold">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#060b18]/70 backdrop-blur-md flex items-center justify-center border border-[#C5A869]/20">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  </div>
                  <span className="text-[10px] mt-0.5 text-slate-200">{video.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#060b18]/70 backdrop-blur-md flex items-center justify-center border border-[#C5A869]/20">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] mt-0.5 text-slate-200">{video.views}</span>
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
