import React, { useState } from 'react';
import { PAYMENT_METHODS, COMPANY_INFO } from '../data/mockData';
import { Check, Copy, MessageCircle, ShieldCheck, Smartphone } from 'lucide-react';

export const LocalPayments: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSendProofWhatsApp = (methodName: string) => {
    const text = encodeURIComponent(
      `Bonjour Lux Clean Mali, je viens d'effectuer un règlement via *${methodName}*. Voici ma preuve de paiement (capture d'écran).`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="paiement" className="py-20 bg-[#060b18] text-white relative border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <Smartphone className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Paiements 100% Adaptés au Mali • Bamako</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Réglez Simplement via <span className="text-gold-gradient">Orange Money, Wave ou Espèces</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Zéro complication. Payez depuis votre téléphone à Bamako ou réglez en espèces directement au technicien après avoir inspecté vos tapis et canapés.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.id}
              className="rounded-2xl bg-[#09142b] border border-[#C5A869]/25 p-6 flex flex-col justify-between space-y-4 hover:border-[#C5A869]/60 transition-all hover:shadow-xl shadow-lg"
            >
              <div>
                {/* Badge top */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${method.color}`}>
                    {method.badge}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                </div>

                <h3 className="text-lg font-bold font-display text-white">{method.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{method.subtitle}</p>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed bg-[#060c1a] p-3 rounded-xl border border-[#C5A869]/15">
                  {method.instructions}
                </p>

                {method.accountNumber && (
                  <div className="mt-4 p-3 rounded-xl bg-[#060b17] border border-[#C5A869]/25">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Numéro de transfert :</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono font-black text-[#C5A869] text-sm">{method.accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(method.accountNumber!, method.id)}
                        className="p-1.5 rounded-lg bg-[#0d1c3a] hover:bg-[#132752] text-slate-200 text-xs flex items-center gap-1 cursor-pointer transition-colors border border-[#C5A869]/20"
                        title="Copier le numéro"
                      >
                        {copiedId === method.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                            <span className="text-[10px] text-[#C5A869] font-bold">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px]">Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    {method.accountName && (
                      <span className="text-[11px] text-slate-300 block mt-1">Titulaire : {method.accountName}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => handleSendProofWhatsApp(method.name)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#0d1c3a] hover:bg-[#132752] text-white border border-[#C5A869]/25 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Envoyer reçu sur WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Reassurance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#09142b] border border-[#C5A869]/25 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-11 h-11 rounded-xl bg-[#C5A869]/15 border border-[#C5A869]/35 text-[#C5A869] flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantie Totale de Sérénité</h4>
              <p className="text-xs text-slate-300">
                Vous ne payez rien tant que l'intervention n'est pas programmée. Pour les résidences, le solde peut être versé après vérification du résultat.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Bonjour Lux Clean Mali, je souhaite payer un devis ou poser une question sur les modes de règlement."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-[#060B16] text-xs font-black transition-all flex items-center gap-2 shrink-0 shadow-md font-display"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Assistance WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
