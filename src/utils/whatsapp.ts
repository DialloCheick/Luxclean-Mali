import { COMPANY_INFO } from '../data/mockData';

export interface WhatsAppQuotePayload {
  clientName?: string;
  clientPhone?: string;
  district?: string;
  addressDetails?: string;
  selectedDate?: string;
  preferredTime?: string;
  serviceSummary: string;
  optionsSummary?: string[];
  totalEstimateFCFA: number;
  paymentMethod?: string;
  customNotes?: string;
}

export function generateWhatsAppQuoteLink(payload: WhatsAppQuotePayload): string {
  const phone = COMPANY_INFO.whatsappNumber; // e.g. 22376543210

  const lines: string[] = [
    `✨ *NOUVELLE DEMANDE DE DEVIS / RÉSERVATION - LUX CLEAN MALI* ✨`,
    `--------------------------------------`,
  ];

  if (payload.clientName) {
    lines.push(`👤 *Nom du Client :* ${payload.clientName}`);
  }
  if (payload.clientPhone) {
    lines.push(`📞 *Téléphone :* ${payload.clientPhone}`);
  }
  if (payload.district) {
    lines.push(`📍 *Quartier (Bamako) :* ${payload.district}${payload.addressDetails ? ` (${payload.addressDetails})` : ''}`);
  }
  if (payload.selectedDate) {
    lines.push(`📅 *Date souhaitée :* ${payload.selectedDate} ${payload.preferredTime ? `à ${payload.preferredTime}` : ''}`);
  }

  lines.push(``);
  lines.push(`📋 *Détail des prestations :*`);
  lines.push(payload.serviceSummary);

  if (payload.optionsSummary && payload.optionsSummary.length > 0) {
    lines.push(`⚙️ *Options sélectionnées :*`);
    payload.optionsSummary.forEach(opt => lines.push(` • ${opt}`));
  }

  lines.push(``);
  lines.push(`💰 *Total Estimé :* *${payload.totalEstimateFCFA.toLocaleString('fr-FR')} FCFA*`);

  if (payload.paymentMethod) {
    lines.push(`💳 *Moyen de paiement souhaité :* ${payload.paymentMethod}`);
  }

  if (payload.customNotes) {
    lines.push(`📝 *Remarques :* ${payload.customNotes}`);
  }

  lines.push(`--------------------------------------`);
  lines.push(`Bonjour Lux Clean Mali, merci de me confirmer la disponibilité et le rendez-vous.`);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
}

export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} FCFA`;
}
