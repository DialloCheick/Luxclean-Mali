import React, { useState } from 'react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#060b18] text-white relative border-b border-[#C5A869]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Questions Fréquentes • Bamako</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Tout Ce Que Vous Devez <span className="text-gold-gradient">Savoir</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Découvrez comment nous travaillons au quotidien pour garantir un résultat d'une propreté irréprochable à Bamako.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#09142b] border border-[#C5A869]/25 overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0c1a38] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-display">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-gold-gradient text-[#060B16] font-bold'
                        : 'bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#C5A869]/20 bg-[#060c1a]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support helper */}
        <div className="mt-10 p-5 rounded-2xl bg-[#09142b] border border-[#C5A869]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="font-bold text-white text-sm">Une autre question spécifique ?</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Notre service client à Bamako est joignable 7j/7 sur WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Bonjour Lux Clean Mali, j'ai une question sur vos prestations de nettoyage."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-[#060B16] text-xs font-black transition-all flex items-center gap-2 shrink-0 shadow-md font-display"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Poser ma question</span>
          </a>
        </div>

      </div>
    </section>
  );
};
