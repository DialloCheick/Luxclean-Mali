import React, { useState, useMemo } from 'react';
import { BAMAKO_DISTRICTS, PAYMENT_METHODS, COMPANY_INFO } from '../data/mockData';
import { formatFCFA, generateWhatsAppQuoteLink } from '../utils/whatsapp';
import {
  Calculator,
  MessageCircle,
  Sparkles,
  Plus,
  Minus,
  Check,
  MapPin,
  Calendar,
  CreditCard,
  Phone,
  User,
  ShieldCheck,
  CheckCircle2,
  Share2,
  RefreshCw,
  Clock
} from 'lucide-react';

interface QuoteCalculatorProps {
  initialCategory?: string;
  onBookingSuccess?: () => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ initialCategory }) => {
  // Category state
  const [activeTab, setActiveTab] = useState<'tapis' | 'canapes' | 'moquette_mosquee' | 'moquette_bureau' | 'matelas' | 'auto'>('tapis');

  // Items configuration state
  // Tapis
  const [tapisSizes, setTapisSizes] = useState({
    petit: 0, // 5000 FCFA
    moyen: 1, // 9000 FCFA
    grand: 0, // 15000 FCFA
  });
  const [tapisM2, setTapisM2] = useState<number>(0);

  // Canapés
  const [sofaItems, setSofaItems] = useState({
    fauteuil: 0, // 5000 FCFA
    places2: 0, // 12000 FCFA
    places3: 1, // 18000 FCFA
    salon5: 0, // 28000 FCFA
    salon7: 0, // 38000 FCFA
    angle: 0, // 25000 FCFA
    chaises: 0, // 2000 FCFA
  });

  // Moquettes (m2)
  const [mosqueeM2, setMosqueeM2] = useState<number>(100);
  const [bureauM2, setBureauM2] = useState<number>(50);

  // Matelas
  const [matelas1Place, setMatelas1Place] = useState<number>(0);
  const [matelas2Places, setMatelas2Places] = useState<number>(0);

  // Auto
  const [autoSeats, setAutoSeats] = useState<number>(0);
  const [autoComplet, setAutoComplet] = useState<number>(0);

  // Additional options
  const [options, setOptions] = useState({
    disinfection: true, // +2500 FCFA (Free for mosquée)
    deepStain: false, // +2000 FCFA
    luxuryFragrance: true, // +1500 FCFA
    expressDrying: false, // +2000 FCFA
  });

  // Customer info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(BAMAKO_DISTRICTS[0].name);
  const [addressDetails, setAddressDetails] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Matin (08h00 - 12h00)');
  const [selectedPayment, setSelectedPayment] = useState('Orange Money Mali');
  const [customNotes, setCustomNotes] = useState('');

  // Confirmation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedQuoteCode, setSubmittedQuoteCode] = useState('');

  // Calculate pricing breakdown
  const quoteCalculation = useMemo(() => {
    let subtotal = 0;
    const itemsList: { name: string; qty: number; total: number }[] = [];

    // Tapis
    if (tapisSizes.petit > 0) {
      const price = tapisSizes.petit * 5000;
      subtotal += price;
      itemsList.push({ name: 'Petit Tapis (~2x1.5m)', qty: tapisSizes.petit, total: price });
    }
    if (tapisSizes.moyen > 0) {
      const price = tapisSizes.moyen * 9000;
      subtotal += price;
      itemsList.push({ name: 'Tapis Moyen (~3x2m)', qty: tapisSizes.moyen, total: price });
    }
    if (tapisSizes.grand > 0) {
      const price = tapisSizes.grand * 15000;
      subtotal += price;
      itemsList.push({ name: 'Grand Tapis Salon (~4x3m)', qty: tapisSizes.grand, total: price });
    }
    if (tapisM2 > 0) {
      const price = tapisM2 * 1500;
      subtotal += price;
      itemsList.push({ name: `Tapis sur mesure (${tapisM2} m²)`, qty: tapisM2, total: price });
    }

    // Canapés
    if (sofaItems.fauteuil > 0) {
      const price = sofaItems.fauteuil * 5000;
      subtotal += price;
      itemsList.push({ name: 'Fauteuil 1 place', qty: sofaItems.fauteuil, total: price });
    }
    if (sofaItems.places2 > 0) {
      const price = sofaItems.places2 * 12000;
      subtotal += price;
      itemsList.push({ name: 'Canapé 2 places', qty: sofaItems.places2, total: price });
    }
    if (sofaItems.places3 > 0) {
      const price = sofaItems.places3 * 18000;
      subtotal += price;
      itemsList.push({ name: 'Canapé 3 places', qty: sofaItems.places3, total: price });
    }
    if (sofaItems.salon5 > 0) {
      const price = sofaItems.salon5 * 28000;
      subtotal += price;
      itemsList.push({ name: 'Salon complet 5 places', qty: sofaItems.salon5, total: price });
    }
    if (sofaItems.salon7 > 0) {
      const price = sofaItems.salon7 * 38000;
      subtotal += price;
      itemsList.push({ name: 'Salon complet 7 places', qty: sofaItems.salon7, total: price });
    }
    if (sofaItems.angle > 0) {
      const price = sofaItems.angle * 25000;
      subtotal += price;
      itemsList.push({ name: 'Canapé d’angle en L', qty: sofaItems.angle, total: price });
    }
    if (sofaItems.chaises > 0) {
      const price = sofaItems.chaises * 2000;
      subtotal += price;
      itemsList.push({ name: 'Chaise de salle à manger', qty: sofaItems.chaises, total: price });
    }

    // Moquette Mosquée
    if (activeTab === 'moquette_mosquee' && mosqueeM2 > 0) {
      // Dégressif : 800 F/m2 si > 200m2, sinon 950 F/m2
      const unitRate = mosqueeM2 >= 200 ? 800 : 950;
      const price = mosqueeM2 * unitRate;
      subtotal += price;
      itemsList.push({ name: `Moquette Mosquée (${mosqueeM2} m² à ${unitRate} F/m²)`, qty: mosqueeM2, total: price });
    }

    // Moquette Bureau
    if (activeTab === 'moquette_bureau' && bureauM2 > 0) {
      // 1200 F/m2 ou 1000 F/m2 si > 100m2
      const unitRate = bureauM2 >= 100 ? 1000 : 1200;
      const price = bureauM2 * unitRate;
      subtotal += price;
      itemsList.push({ name: `Moquette Bureau (${bureauM2} m² à ${unitRate} F/m²)`, qty: bureauM2, total: price });
    }

    // Matelas
    if (matelas1Place > 0) {
      const price = matelas1Place * 10000;
      subtotal += price;
      itemsList.push({ name: 'Matelas 1 place', qty: matelas1Place, total: price });
    }
    if (matelas2Places > 0) {
      const price = matelas2Places * 18000;
      subtotal += price;
      itemsList.push({ name: 'Matelas 2 places (King/Queen)', qty: matelas2Places, total: price });
    }

    // Auto
    if (autoSeats > 0) {
      const price = autoSeats * 15000;
      subtotal += price;
      itemsList.push({ name: 'Nettoyage Sièges Véhicule', qty: autoSeats, total: price });
    }
    if (autoComplet > 0) {
      const price = autoComplet * 25000;
      subtotal += price;
      itemsList.push({ name: 'Rénovation Intérieure Complète Auto', qty: autoComplet, total: price });
    }

    // Options calculation
    let optionsCost = 0;
    const selectedOptionsList: string[] = [];

    if (options.disinfection && activeTab !== 'moquette_mosquee') {
      optionsCost += 2500;
      selectedOptionsList.push('Désinfection antibactérienne & anti-acariens (+2 500 F)');
    } else if (activeTab === 'moquette_mosquee') {
      selectedOptionsList.push('Désinfection & purification certifiée (Inclus d’office)');
    }

    if (options.deepStain) {
      optionsCost += 2000;
      selectedOptionsList.push('Détachage ciblé intensif haute pression (+2 000 F)');
    }
    if (options.luxuryFragrance) {
      optionsCost += 1500;
      selectedOptionsList.push('Parfumage signature Oud/Musc ou Fraîcheur (+1 500 F)');
    }
    if (options.expressDrying) {
      optionsCost += 2000;
      selectedOptionsList.push('Séchage accéléré ultra-rapide turbo (+2 000 F)');
    }

    // Delivery to Bamako district: free if subtotal >= 15000 FCFA, else 2000 FCFA
    let transportCost = 0;
    if (subtotal > 0 && subtotal < 15000) {
      transportCost = 2000;
    }

    const totalEstimate = subtotal + optionsCost + transportCost;

    return {
      subtotal,
      optionsCost,
      transportCost,
      totalEstimate,
      itemsList,
      selectedOptionsList,
    };
  }, [
    tapisSizes,
    tapisM2,
    sofaItems,
    mosqueeM2,
    bureauM2,
    matelas1Place,
    matelas2Places,
    autoSeats,
    autoComplet,
    options,
    activeTab,
  ]);

  // Handle WhatsApp Link trigger
  const handleWhatsAppQuote = () => {
    const serviceSummaryText = quoteCalculation.itemsList.length > 0
      ? quoteCalculation.itemsList.map(i => `• ${i.name} : ${formatFCFA(i.total)}`).join('\n')
      : '• Devis sur-mesure à préciser';

    const link = generateWhatsAppQuoteLink({
      clientName: clientName || undefined,
      clientPhone: clientPhone || undefined,
      district: selectedDistrict,
      addressDetails: addressDetails || undefined,
      selectedDate: preferredDate || undefined,
      preferredTime: preferredTime || undefined,
      serviceSummary: serviceSummaryText,
      optionsSummary: quoteCalculation.selectedOptionsList,
      totalEstimateFCFA: quoteCalculation.totalEstimate,
      paymentMethod: selectedPayment,
      customNotes: customNotes || undefined,
    });

    window.open(link, '_blank');
  };

  const handleConfirmQuoteOnline = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `LXM-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedQuoteCode(code);
    setIsSubmitted(true);
  };

  const resetCalculator = () => {
    setTapisSizes({ petit: 0, moyen: 1, grand: 0 });
    setTapisM2(0);
    setSofaItems({ fauteuil: 0, places2: 0, places3: 1, salon5: 0, salon7: 0, angle: 0, chaises: 0 });
    setMosqueeM2(100);
    setBureauM2(50);
    setMatelas1Place(0);
    setMatelas2Places(0);
    setAutoSeats(0);
    setAutoComplet(0);
    setIsSubmitted(false);
  };

  return (
    <section id="devis" className="py-20 bg-[#060b18] text-slate-100 relative border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Simulateur Transparent • Tarification Officielle FCFA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Système de Devis en Ligne <span className="text-gold-gradient">Immédiat</span>
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Configurez vos besoins en quelques clics, visualisez l'estimation exacte en Franc CFA et transférez instantanément votre demande à notre service client sur WhatsApp.
          </p>
        </div>

        {/* Modal or Card Confirmation State */}
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#09142b] border-2 border-[#C5A869]/35 shadow-2xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-[#C5A869]/15 text-[#C5A869] flex items-center justify-center mx-auto border border-[#C5A869]/35 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25">
                Réf. Devis : {submittedQuoteCode}
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-3">
                Votre Devis a été Enregistré avec Succès !
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                Merci {clientName || 'cher client'}. Notre équipe à Bamako a bien reçu votre demande pour le quartier{' '}
                <strong className="text-[#DFC792]">{selectedDistrict}</strong>.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 rounded-2xl bg-[#060b17] border border-[#C5A869]/20 text-left space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Date souhaitée :</span>
                <span className="text-white font-medium">{preferredDate || 'Dès que possible'} ({preferredTime})</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Paiement sélectionné :</span>
                <span className="text-[#DFC792] font-bold">{selectedPayment}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-1">
                <span className="text-white font-bold">Montant Total Estimé :</span>
                <span className="text-2xl font-black text-[#C5A869] font-display">
                  {formatFCFA(quoteCalculation.totalEstimate)}
                </span>
              </div>
            </div>

            {/* Instruction for Payment & WhatsApp */}
            <div className="p-4 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/25 text-xs text-slate-200 text-left space-y-2">
              <p className="font-bold text-[#DFC792] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
                Instructions de confirmation & prise en charge :
              </p>
              <p>
                Pour accélérer le passage de nos techniciens à votre adresse, transmettez dès maintenant cette référence <strong>{submittedQuoteCode}</strong> sur notre WhatsApp officiel.
              </p>
            </div>

            {/* Direct WhatsApp button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handleWhatsAppQuote}
                className="px-7 py-3.5 rounded-xl bg-gold-gradient text-[#060B16] font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer font-display"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirmer sur WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
              </button>

              <button
                onClick={resetCalculator}
                className="px-5 py-3.5 rounded-xl bg-[#0d1c3a] hover:bg-[#132752] text-slate-200 hover:text-white border border-[#C5A869]/25 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#C5A869]" />
                <span>Nouveau Calcul</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Interactive Calculator Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Category selector & items (8 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category Tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1.5 rounded-2xl bg-[#09142b] border border-[#C5A869]/25 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('tapis')}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                    activeTab === 'tapis'
                      ? 'bg-gold-gradient text-[#060B16] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Tapis
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('canapes')}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                    activeTab === 'canapes'
                      ? 'bg-gold-gradient text-[#060B16] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Canapés
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('moquette_mosquee')}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                    activeTab === 'moquette_mosquee'
                      ? 'bg-gold-gradient text-[#060B16] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Mosquées
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('moquette_bureau')}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                    activeTab === 'moquette_bureau'
                      ? 'bg-gold-gradient text-[#060B16] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Bureaux
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('matelas')}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                    activeTab === 'matelas'
                      ? 'bg-gold-gradient text-[#060B16] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Matelas
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('auto')}
                  className={`py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                    activeTab === 'auto'
                      ? 'bg-gold-gradient text-[#060B16] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Auto
                </button>
              </div>

              {/* Dynamic Items Panel */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
                
                {/* 1. Tapis Panel */}
                {activeTab === 'tapis' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-base">Sélectionnez vos Tapis</h4>
                        <p className="text-xs text-slate-400">Dépoussiérage vibrant + Lavage haute extraction</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-[#DFC792] border border-cyan-500/30">
                        Collecte Bamako incluse
                      </span>
                    </div>

                    {/* Petit Tapis */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                      <div>
                        <span className="font-semibold text-white text-sm block">Petit Tapis (~2 x 1.5 m)</span>
                        <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(5000)} / unité</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTapisSizes(prev => ({ ...prev, petit: Math.max(0, prev.petit - 1) }))}
                          className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-white text-base">{tapisSizes.petit}</span>
                        <button
                          type="button"
                          onClick={() => setTapisSizes(prev => ({ ...prev, petit: prev.petit + 1 }))}
                          className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Moyen Tapis */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                      <div>
                        <span className="font-semibold text-white text-sm block">Tapis Moyen (~3 x 2 m - Format Salon standard)</span>
                        <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(9000)} / unité</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTapisSizes(prev => ({ ...prev, moyen: Math.max(0, prev.moyen - 1) }))}
                          className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-white text-base">{tapisSizes.moyen}</span>
                        <button
                          type="button"
                          onClick={() => setTapisSizes(prev => ({ ...prev, moyen: prev.moyen + 1 }))}
                          className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Grand Tapis */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                      <div>
                        <span className="font-semibold text-white text-sm block">Grand Tapis Salon Royal (~4 x 3 m)</span>
                        <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(15000)} / unité</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setTapisSizes(prev => ({ ...prev, grand: Math.max(0, prev.grand - 1) }))}
                          className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-6 text-center font-bold text-white text-base">{tapisSizes.grand}</span>
                        <button
                          type="button"
                          onClick={() => setTapisSizes(prev => ({ ...prev, grand: prev.grand + 1 }))}
                          className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Tapis m2 personnalisé */}
                    <div className="p-3.5 rounded-xl bg-slate-850/60 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-white text-sm block">Ou saisissez la surface exacte en m²</span>
                        <span className="text-xs text-slate-400">1 500 FCFA / m²</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="200"
                          value={tapisM2 || ''}
                          onChange={(e) => setTapisM2(Math.max(0, parseInt(e.target.value) || 0))}
                          placeholder="0"
                          className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-center font-bold text-sm focus:border-[#C5A869] outline-none"
                        />
                        <span className="text-xs text-slate-400">m²</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Canapés Panel */}
                {activeTab === 'canapes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-base">Configurez votre Salon</h4>
                        <p className="text-xs text-slate-400">Velours, cuir, alcantara, tissu déperlant ou coton</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/15 text-[#DFC792] border border-cyan-500/30">
                        Nettoyage à domicile
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Fauteuil 1 place */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-xs block">Fauteuil (1 place)</span>
                          <span className="text-[11px] text-[#C5A869] font-medium">{formatFCFA(5000)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, fauteuil: Math.max(0, prev.fauteuil - 1) }))}
                            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-white text-sm">{sofaItems.fauteuil}</span>
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, fauteuil: prev.fauteuil + 1 }))}
                            className="w-7 h-7 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Canapé 2 places */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-xs block">Canapé 2 places</span>
                          <span className="text-[11px] text-[#C5A869] font-medium">{formatFCFA(12000)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, places2: Math.max(0, prev.places2 - 1) }))}
                            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-white text-sm">{sofaItems.places2}</span>
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, places2: prev.places2 + 1 }))}
                            className="w-7 h-7 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Canapé 3 places */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-xs block">Canapé 3 places</span>
                          <span className="text-[11px] text-[#C5A869] font-medium">{formatFCFA(18000)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, places3: Math.max(0, prev.places3 - 1) }))}
                            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-white text-sm">{sofaItems.places3}</span>
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, places3: prev.places3 + 1 }))}
                            className="w-7 h-7 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Canapé d'angle */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-xs block">Canapé d'Angle en L</span>
                          <span className="text-[11px] text-[#C5A869] font-medium">{formatFCFA(25000)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, angle: Math.max(0, prev.angle - 1) }))}
                            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-white text-sm">{sofaItems.angle}</span>
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, angle: prev.angle + 1 }))}
                            className="w-7 h-7 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Salon complet 5 places */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-xs block">Salon Complet 5 Places</span>
                          <span className="text-[11px] text-[#C5A869] font-medium">{formatFCFA(28000)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, salon5: Math.max(0, prev.salon5 - 1) }))}
                            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-white text-sm">{sofaItems.salon5}</span>
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, salon5: prev.salon5 + 1 }))}
                            className="w-7 h-7 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Salon complet 7 places */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-xs block">Salon Royal 7 Places</span>
                          <span className="text-[11px] text-[#C5A869] font-medium">{formatFCFA(38000)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, salon7: Math.max(0, prev.salon7 - 1) }))}
                            className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center font-bold text-white text-sm">{sofaItems.salon7}</span>
                          <button
                            type="button"
                            onClick={() => setSofaItems(prev => ({ ...prev, salon7: prev.salon7 + 1 }))}
                            className="w-7 h-7 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Moquette Mosquée Panel */}
                {activeTab === 'moquette_mosquee' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-base">Moquettes de Mosquées (Lieux de Culte)</h4>
                        <p className="text-xs text-slate-400">Tarif solidaire dégressif + Parfumage Musc & Oud inclus</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#C5A869]/15 text-[#C5A869] border border-[#C5A869]/30">
                        Désinfection offerte
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-white">Surface estimée de la salle de prière :</span>
                        <span className="text-lg font-bold text-[#C5A869] font-display">{mosqueeM2} m²</span>
                      </div>

                      <input
                        type="range"
                        min="20"
                        max="800"
                        step="10"
                        value={mosqueeM2}
                        onChange={(e) => setMosqueeM2(parseInt(e.target.value))}
                        className="w-full accent-[#C5A869] cursor-pointer"
                      />

                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>20 m² (Petite zawiya)</span>
                        <span>250 m² (Mosquée de quartier)</span>
                        <span>800 m² (Grande Mosquée)</span>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                        <span>Tarif unitaire appliqué :</span>
                        <span className="font-bold text-[#DFC792]">
                          {mosqueeM2 >= 200 ? '800 FCFA / m² (Tarif Grand Espace)' : '950 FCFA / m²'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Moquette Bureau Panel */}
                {activeTab === 'moquette_bureau' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-base">Moquettes de Bureaux & Entreprises</h4>
                        <p className="text-xs text-slate-400">Facturation officielle avec reçu, créneau nuit/weekend possible</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        Service B2B Bamako
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-white">Superficie des bureaux & salles :</span>
                        <span className="text-lg font-bold text-[#C5A869] font-display">{bureauM2} m²</span>
                      </div>

                      <input
                        type="range"
                        min="15"
                        max="500"
                        step="5"
                        value={bureauM2}
                        onChange={(e) => setBureauM2(parseInt(e.target.value))}
                        className="w-full accent-[#C5A869] cursor-pointer"
                      />

                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>15 m² (Bureau individuel)</span>
                        <span>100 m² (Open Space)</span>
                        <span>500 m² (Siège complet)</span>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                        <span>Tarif entreprise :</span>
                        <span className="font-bold text-[#DFC792]">
                          {bureauM2 >= 100 ? '1 000 FCFA / m² (Remise grand volume)' : '1 200 FCFA / m²'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Matelas Panel */}
                {activeTab === 'matelas' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-base">Désinfection Matelas & Literie</h4>
                        <p className="text-xs text-slate-400">Traitement anti-acariens, punaises de lit et taches de transpiration</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-sm block">Matelas 1 place (Enfant / Célibataire)</span>
                          <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(10000)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setMatelas1Place(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-white text-base">{matelas1Place}</span>
                          <button
                            type="button"
                            onClick={() => setMatelas1Place(prev => prev + 1)}
                            className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-sm block">Matelas 2 places (Queen / King Size)</span>
                          <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(18000)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setMatelas2Places(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-white text-base">{matelas2Places}</span>
                          <button
                            type="button"
                            onClick={() => setMatelas2Places(prev => prev + 1)}
                            className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Auto Panel */}
                {activeTab === 'auto' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="font-bold text-white text-base">Véhicules & Sièges Auto</h4>
                        <p className="text-xs text-slate-400">Intervention directement à votre domicile ou bureau à Bamako</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-sm block">Shampouinage des Sièges (Avant + Banquette)</span>
                          <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(15000)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setAutoSeats(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-white text-base">{autoSeats}</span>
                          <button
                            type="button"
                            onClick={() => setAutoSeats(prev => prev + 1)}
                            className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-850 border border-slate-800">
                        <div>
                          <span className="font-semibold text-white text-sm block">Intérieur Complet (Sièges, Moquette sol, Plafonnier & Coffre)</span>
                          <span className="text-xs text-[#C5A869] font-medium">{formatFCFA(25000)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setAutoComplet(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-white text-base">{autoComplet}</span>
                          <button
                            type="button"
                            onClick={() => setAutoComplet(prev => prev + 1)}
                            className="w-8 h-8 rounded-lg bg-gold-gradient text-[#060B16] font-bold hover:opacity-90 flex items-center justify-center font-bold text-sm cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Treatments Options */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Traitements & Options de Confort
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={options.disinfection}
                        onChange={(e) => setOptions(prev => ({ ...prev, disinfection: e.target.checked }))}
                        className="w-4 h-4 rounded accent-[#C5A869]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-white block">Désinfection anti-acariens</span>
                        <span className="text-slate-400">+2 500 FCFA</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={options.deepStain}
                        onChange={(e) => setOptions(prev => ({ ...prev, deepStain: e.target.checked }))}
                        className="w-4 h-4 rounded accent-[#C5A869]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-white block">Détachage intensif (café/graisse)</span>
                        <span className="text-slate-400">+2 000 FCFA</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={options.luxuryFragrance}
                        onChange={(e) => setOptions(prev => ({ ...prev, luxuryFragrance: e.target.checked }))}
                        className="w-4 h-4 rounded accent-[#C5A869]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-white block">Parfumage signature Oud/Musc</span>
                        <span className="text-slate-400">+1 500 FCFA</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-850 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={options.expressDrying}
                        onChange={(e) => setOptions(prev => ({ ...prev, expressDrying: e.target.checked }))}
                        className="w-4 h-4 rounded accent-[#C5A869]"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-white block">Séchage accéléré soufflerie</span>
                        <span className="text-slate-400">+2 000 FCFA</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Bamako District & Client Details */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Vos Coordonnées & Quartier à Bamako
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Votre Nom & Prénom</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Ex: Fatoumata Coulibaly"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-850 border border-slate-750 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Téléphone (WhatsApp)</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="+223 70 00 00 00"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-850 border border-slate-750 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Quartier à Bamako</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                        <select
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-850 border border-slate-750 text-white text-xs focus:border-[#C5A869] outline-none"
                        >
                          {BAMAKO_DISTRICTS.map((d) => (
                            <option key={d.id} value={d.name} className="bg-slate-900 text-white">
                              {d.name} ({d.zone})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Précision adresse / Rue</label>
                      <input
                        type="text"
                        placeholder="Ex: Rue 412, Porte 50 près pharmacie"
                        value={addressDetails}
                        onChange={(e) => setAddressDetails(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-850 border border-slate-750 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Date souhaitée</label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-850 border border-slate-750 text-white text-xs focus:border-[#C5A869] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Créneau horaire</label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-850 border border-slate-750 text-white text-xs focus:border-[#C5A869] outline-none"
                      >
                        <option value="Matin (08h00 - 12h00)">Matin (08h00 - 12h00)</option>
                        <option value="Après-midi (13h00 - 17h00)">Après-midi (13h00 - 17h00)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Preferred Payment Method */}
                <div className="pt-4 border-t border-slate-800">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Moyen de Paiement Souhaité
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'om', name: 'Orange Money', color: 'border-orange-500/50 bg-orange-500/10 text-orange-300' },
                      { id: 'wave', name: 'Wave Mali', color: 'border-sky-500/50 bg-sky-500/10 text-sky-300' },
                      { id: 'moov', name: 'Moov Money', color: 'border-blue-500/50 bg-blue-500/10 text-blue-300' },
                      { id: 'cash', name: 'Espèces', color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setSelectedPayment(m.name)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          selectedPayment.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])
                            ? `${m.color} ring-1 ring-white/20 shadow-md`
                            : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Live Recapitulative Receipt & WhatsApp Action (5 cols) */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="rounded-2xl bg-[#09142b] border-2 border-[#C5A869]/35 p-6 shadow-2xl space-y-5">
                
                {/* Header with Official Logo */}
                <div className="flex items-center justify-between pb-4 border-b border-[#C5A869]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#C5A869]/40 shrink-0 bg-[#060b17] shadow">
                      <img
                        src={COMPANY_INFO.logoUrl}
                        alt={COMPANY_INFO.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold font-display text-white text-base leading-tight">LUXCLEAN MALI</h3>
                      <span className="text-[10px] text-[#DFC792] font-medium">Devis Estimatif Officiel</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#C5A869]/15 text-[#C5A869] border border-[#C5A869]/35 font-bold">
                    Calcul instantané
                  </span>
                </div>

                {/* Items breakdown list */}
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
                  {quoteCalculation.itemsList.length === 0 ? (
                    <p className="text-slate-400 italic py-4 text-center">
                      Sélectionnez au moins un article (tapis, canapé, moquette ou matelas) pour calculer votre devis.
                    </p>
                  ) : (
                    quoteCalculation.itemsList.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-300 py-1.5 border-b border-slate-800/80">
                        <span className="truncate max-w-[200px] text-white font-medium">{item.name}</span>
                        <span className="font-bold text-[#DFC792] shrink-0 ml-2">{formatFCFA(item.total)}</span>
                      </div>
                    ))
                  )}

                  {/* Options */}
                  {quoteCalculation.optionsCost > 0 && (
                    <div className="flex justify-between items-center text-[#DFC792] py-1.5 border-b border-slate-800/80">
                      <span>Traitements additionnels</span>
                      <span className="font-bold">+{formatFCFA(quoteCalculation.optionsCost)}</span>
                    </div>
                  )}

                  {/* Transport */}
                  <div className="flex justify-between items-center text-slate-300 py-1.5">
                    <span>Déplacement Bamako ({selectedDistrict})</span>
                    <span className="font-bold text-emerald-400">
                      {quoteCalculation.transportCost === 0 ? 'OFFERT' : formatFCFA(quoteCalculation.transportCost)}
                    </span>
                  </div>
                </div>

                {/* Total box */}
                <div className="p-4 rounded-xl bg-[#060b17] border border-[#C5A869]/25 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Total Devis Estimé</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#C5A869] font-display">
                      {formatFCFA(quoteCalculation.totalEstimate)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Règlement via <strong className="text-[#DFC792]">{selectedPayment}</strong> ou espèces après inspection.
                  </p>
                </div>

                {/* Primary WhatsApp Action */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppQuote}
                    id="btn-quote-send-whatsapp"
                    className="w-full py-4 px-4 rounded-xl bg-gold-gradient text-[#060B16] font-black text-sm shadow-xl shadow-black/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer font-display tracking-wide"
                  >
                    <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950" />
                    <span>Envoyer ce Devis sur WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmQuoteOnline}
                    className="w-full py-3 px-4 rounded-xl bg-[#0d1c3a] hover:bg-[#132752] text-white border border-[#C5A869]/25 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A869]" />
                    <span>Enregistrer la demande en ligne sans WhatsApp</span>
                  </button>
                </div>

                {/* Trust assurances */}
                <div className="pt-2 text-[11px] text-slate-300 space-y-1.5 border-t border-[#C5A869]/20">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Aucun paiement préalable obligatoire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Facture & reçu avec NIF pour les entreprises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Techniciens certifiés aux protocoles d'hygiène</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
