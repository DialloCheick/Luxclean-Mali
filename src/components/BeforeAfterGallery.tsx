import React, { useState, useRef, useEffect } from 'react';
import { BEFORE_AFTER_ITEMS, COMPANY_INFO } from '../data/mockData';
import { BeforeAfterItem } from '../types';
import { Sparkles, ArrowLeftRight, Check, MapPin, Clock, Video, ExternalLink } from 'lucide-react';

export const BeforeAfterGallery: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const currentItem: BeforeAfterItem = BEFORE_AFTER_ITEMS[selectedItemIndex];

  // Touch and mouse handlers for interactive slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="galerie" className="py-20 bg-[#060b18] text-slate-100 relative border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Galerie Résultats Concrets • Bamako</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Avant / Après : <span className="text-gold-gradient">La Preuve en Image</span>
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Faites glisser le curseur interactif pour constater la métamorphose entre l'état incrusté de poussière sahélienne et le résultat purifié après notre intervention.
          </p>
        </div>

        {/* Project Selector Pills with Sober Logo Gold */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {BEFORE_AFTER_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(index);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedItemIndex === index
                  ? 'bg-gold-gradient text-[#060B16] shadow-md scale-105'
                  : 'bg-[#0a142c] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/50 hover:text-white'
              }`}
            >
              <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
              <span className="opacity-80 text-[10px]">({item.location.split(',')[0]})</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-[#09142b] border-2 border-[#C5A869]/30 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Card Meta Bar */}
          <div className="p-4 sm:p-6 border-b border-[#C5A869]/20 flex flex-wrap items-center justify-between gap-3 bg-[#070e20]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/30">
                  {currentItem.category.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
                  {currentItem.location}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                {currentItem.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#0d1c3a] text-white flex items-center gap-1.5 border border-[#C5A869]/30 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C5A869]" />
                {currentItem.duration}
              </span>
            </div>
          </div>

          {/* Interactive Slider Area */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-80 sm:h-96 md:h-[450px] w-full select-none cursor-ew-resize overflow-hidden bg-[#060b18]"
          >
            {/* "AFTER" Image (Full background) */}
            <img
              src={currentItem.afterImg}
              alt={`${currentItem.title} après nettoyage`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 bg-emerald-600/90 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg backdrop-blur-md shadow-lg pointer-events-none flex items-center gap-1.5 border border-emerald-400/40">
              <Check className="w-4 h-4 text-white" />
              <span>APRÈS NETTOYAGE</span>
            </div>

            {/* "BEFORE" Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentItem.beforeImg}
                alt={`${currentItem.title} avant nettoyage`}
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{
                  width: containerWidth > 0 ? `${containerWidth}px` : (containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'),
                  height: '100%',
                }}
                referrerPolicy="no-referrer"
              />
              {/* Before Tag */}
              <div className="absolute top-4 left-4 bg-rose-600/90 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg backdrop-blur-md shadow-lg pointer-events-none flex items-center gap-1.5 border border-rose-400/40">
                <span>AVANT INTERVENTION</span>
              </div>
            </div>

            {/* Vertical Divider Line with Sober Brushed Gold */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C5A869] shadow-[0_0_10px_rgba(197,168,105,0.6)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Draggable gold handle knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gold-gradient text-[#060B16] shadow-xl flex items-center justify-center border-2 border-white ring-2 ring-[#C5A869]/30">
                <ArrowLeftRight className="w-4 h-4 font-black" />
              </div>
            </div>
          </div>

          {/* Quick preset controls */}
          <div className="p-4 bg-[#070e20] flex items-center justify-between border-t border-[#C5A869]/20 text-xs">
            <button
              onClick={() => setSliderPosition(10)}
              className="px-3.5 py-1.5 rounded-lg bg-[#0d1c3a] hover:bg-[#12254e] text-slate-200 hover:text-white font-semibold border border-[#C5A869]/20 cursor-pointer"
            >
              Voir Tout Après
            </button>
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <ArrowLeftRight className="w-4 h-4 text-[#C5A869]" />
              Glissez à gauche ou à droite
            </span>
            <button
              onClick={() => setSliderPosition(90)}
              className="px-3.5 py-1.5 rounded-lg bg-[#0d1c3a] hover:bg-[#12254e] text-slate-200 hover:text-white font-semibold border border-[#C5A869]/20 cursor-pointer"
            >
              Voir Tout Avant
            </button>
          </div>

          {/* Description footer */}
          <div className="p-6 bg-[#09142b] space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              {currentItem.description}
            </p>
            <div className="p-3.5 rounded-xl bg-[#060b17] border border-[#C5A869]/20 flex items-center gap-2 text-xs text-slate-300">
              <span className="text-[#C5A869] font-bold">Saleté ciblée :</span>
              <span>{currentItem.dirtType}</span>
            </div>
          </div>
        </div>

        {/* TikTok Highlight Card - Maintained in distinctive red as requested */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#1c0812] via-[#09142b] to-[#09142b] border border-rose-500/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-rose-950/20">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-600 text-white tracking-wider">TIKTOK</span>
                <span className="text-xs text-rose-300 font-bold">{COMPANY_INFO.tiktokHandle}</span>
              </div>
              <h4 className="text-lg font-bold text-white mt-1">
                L'Effet Satisfaisant en Vidéo Réelle !
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Découvrez en direct nos vidéos d'aspiration d'eau noire et de purification de tapis à Bamako.
              </p>
            </div>
          </div>

          <a
            href={COMPANY_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-rose-600/30 font-display"
          >
            <span>Regarder sur TikTok</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
