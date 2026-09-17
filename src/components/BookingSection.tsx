import React, { useState, useEffect } from 'react';
import { BAMAKO_DISTRICTS, SERVICES_LIST, COMPANY_INFO } from '../data/mockData';
import { generateWhatsAppQuoteLink } from '../utils/whatsapp';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

interface BookingSectionProps {
  preselectedServiceId?: string;
  onSuccess?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedServiceId }) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [district, setDistrict] = useState(BAMAKO_DISTRICTS[0].name);
  const [addressDetails, setAddressDetails] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId || SERVICES_LIST[0].id);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Matin (08h00 - 12h00)');
  const [paymentChoice, setPaymentChoice] = useState('Orange Money Mali');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Sync with preselectedServiceId when user clicks "Prendre RDV" in the service catalog
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const selectedService = SERVICES_LIST.find(s => s.id === selectedServiceId) || SERVICES_LIST[0];

  const handleWhatsAppBooking = () => {
    const link = generateWhatsAppQuoteLink({
      clientName: clientName || undefined,
      clientPhone: clientPhone || undefined,
      district,
      addressDetails: addressDetails || undefined,
      selectedDate: appointmentDate || 'Dès que possible',
      preferredTime: timeSlot,
      serviceSummary: `• Prestation : ${selectedService.title}\n• Localisation : ${district}`,
      totalEstimateFCFA: selectedService.priceStartingAt,
      paymentMethod: paymentChoice,
      customNotes: notes || undefined,
    });

    const newWindow = window.open(link, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = link;
    }
  };

  const handleOnlineBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `LXM-RDV-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(code);
    setIsBooked(true);
  };

  return (
    <section id="reservation" className="py-20 bg-[#060b18] text-white relative border-b border-[#C5A869]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/25 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Prise de Rendez-Vous Express • Bamako</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Planifiez Votre Nettoyage <span className="text-gold-gradient">Haut de Gamme</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Réservation garantie en 60 secondes. Choisissez votre date et recevez la confirmation directement par WhatsApp ou SMS.
          </p>
        </div>

        {/* Confirmation or Form */}
        {isBooked ? (
          <div className="p-8 rounded-3xl bg-[#09142b] border-2 border-[#C5A869]/35 shadow-2xl text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#C5A869]/40 shadow-xl p-0.5 bg-[#060b17]">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt={COMPANY_INFO.name}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#0d1c3a] text-[#DFC792] border border-[#C5A869]/35">
                Code Rendez-vous : {bookingCode}
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-3">
                Rendez-vous Pré-enregistré !
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Merci {clientName || 'cher client'}. Notre responsable logistique à Bamako va vous contacter sous 15 minutes pour confirmer l’horaire exact.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#060b17] border border-[#C5A869]/20 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Prestation :</span>
                <span className="font-semibold text-white">{selectedService.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Quartier :</span>
                <span className="font-semibold text-white">{district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Heure :</span>
                <span className="font-semibold text-[#C5A869]">{appointmentDate || 'Dès que possible'} ({timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Paiement :</span>
                <span className="font-bold text-[#DFC792]">{paymentChoice}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="px-6 py-3.5 rounded-xl bg-gold-gradient text-[#060B16] font-black flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer font-display"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Envoyer confirmation sur WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="px-5 py-3.5 rounded-xl bg-[#0d1c3a] hover:bg-[#132752] text-slate-200 text-xs font-semibold cursor-pointer border border-[#C5A869]/20"
              >
                Modifier
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleOnlineBooking}
            className="p-6 sm:p-8 rounded-3xl bg-[#09142b] border-2 border-[#C5A869]/25 shadow-2xl space-y-6"
          >
            {/* Service Chooser */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Prestation souhaitée
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SERVICES_LIST.map((srv) => (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedServiceId === srv.id
                        ? 'border-[#C5A869] bg-[#C5A869]/15 text-white ring-1 ring-[#C5A869]/40 shadow-md'
                        : 'border-[#C5A869]/20 bg-[#060c1a] text-slate-300 hover:border-[#C5A869]/35'
                    }`}
                  >
                    <span className="text-xs font-bold block leading-snug">{srv.title}</span>
                    <span className="text-[10px] text-[#C5A869] block mt-1 font-semibold">Dès {srv.priceStartingAt.toLocaleString('fr-FR')} F</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Client info */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                2. Vos Coordonnées (Bamako)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nom complet *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#C5A869]/60 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ibrahim Touré"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Numéro WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#C5A869]/60 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+223 70 00 00 00"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address and location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Quartier à Bamako *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C5A869]/60 absolute left-3 top-3" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs focus:border-[#C5A869] outline-none"
                  >
                    {BAMAKO_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name} className="bg-[#060c1a] text-white">
                        {d.name} ({d.zone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Repère / Rue exacte</label>
                <input
                  type="text"
                  placeholder="Ex: Près de la clinique / pharmacie..."
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none"
                />
              </div>
            </div>

            {/* Date & Time Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Date & Créneau d'intervention
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Date souhaitée</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs focus:border-[#C5A869] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Créneau horaire</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs focus:border-[#C5A869] outline-none"
                  >
                    <option value="Matin (08h00 - 12h00)">Matin (08h00 - 12h00)</option>
                    <option value="Après-midi (13h00 - 17h00)">Après-midi (13h00 - 17h00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                4. Mode de règlement préféré
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Orange Money Mali', 'Wave Mali', 'Moov Money', 'Espèces sur place'].map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setPaymentChoice(mode)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      paymentChoice === mode
                        ? 'border-[#C5A869] bg-[#C5A869]/15 text-[#DFC792] ring-1 ring-[#C5A869]/40 shadow-sm'
                        : 'border-[#C5A869]/20 bg-[#060c1a] text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs text-slate-400 mb-1">Remarques ou précisions (taches spécifiques, etc.)</label>
              <textarea
                rows={2}
                placeholder="Ex: Taches de café anciennes sur le canapé 3 places..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#060c1a] border border-[#C5A869]/25 text-white text-xs placeholder-slate-500 focus:border-[#C5A869] outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="w-full py-3.5 px-4 rounded-xl bg-gold-gradient text-[#060B16] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/40 transition-all cursor-pointer font-display"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Prendre RDV via WhatsApp</span>
              </button>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#0d1c3a] hover:bg-[#132752] text-white border border-[#C5A869]/35 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-display"
              >
                <Calendar className="w-5 h-5 text-[#C5A869]" />
                <span>Valider le Rendez-Vous en Ligne</span>
              </button>
            </div>

            {/* Reassurance */}
            <div className="text-center text-[11px] text-slate-300 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
              <span>Annulation sans frais • Déplacement offert dès 15 000 FCFA</span>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
