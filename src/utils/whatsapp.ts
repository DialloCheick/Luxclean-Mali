import { COMPANY_INFO } from '../data/mockData';

export interface WhatsAppQuotePayload {
  clientName?: string;
  clientPhone?: string;
  district?: string;
  addressDetails?: string;
  selectedDate?: string;
  preferredTime?: string;
  category?: string;
  serviceSummary: string;
  optionsSummary?: string[];
  paymentMethod?: string;
  customNotes?: string;
  photoCount?: number;
}

export function generateWhatsAppQuoteLink(payload: WhatsAppQuotePayload): string {
  const phone = COMPANY_INFO.whatsappNumber; // e.g. 22376543210

  const lines: string[] = [
    `✨ *NOUVELLE DEMANDE DE DEVIS - LUX CLEAN MALI* ✨`,
    `--------------------------------------`,
  ];

  if (payload.clientName) {
    lines.push(`👤 *Nom du Client :* ${payload.clientName}`);
  }
  if (payload.clientPhone) {
    lines.push(`📞 *Téléphone :* ${payload.clientPhone}`);
  }
  if (payload.category) {
    lines.push(`🏷️ *Catégorie :* ${payload.category}`);
  }
  if (payload.district) {
    lines.push(`📍 *Quartier (Bamako) :* ${payload.district}${payload.addressDetails ? ` (${payload.addressDetails})` : ''}`);
  }
  if (payload.selectedDate) {
    lines.push(`📅 *Date souhaitée :* ${payload.selectedDate} ${payload.preferredTime ? `à ${payload.preferredTime}` : ''}`);
  }

  lines.push(``);
  lines.push(`📋 *Détail de la demande :*`);
  lines.push(payload.serviceSummary);

  if (payload.optionsSummary && payload.optionsSummary.length > 0) {
    lines.push(`⚙️ *Options souhaitées :*`);
    payload.optionsSummary.forEach(opt => lines.push(` • ${opt}`));
  }

  if (payload.photoCount && payload.photoCount > 0) {
    lines.push(``);
    lines.push(`📸 *${payload.photoCount} photo${payload.photoCount > 1 ? 's' : ''} sélectionnée${payload.photoCount > 1 ? 's' : ''} sur le site* — je vais les joindre juste ici dans cette conversation.`);
  }

  if (payload.paymentMethod) {
    lines.push(`💳 *Moyen de paiement souhaité :* ${payload.paymentMethod}`);
  }

  if (payload.customNotes) {
    lines.push(`📝 *Remarques :* ${payload.customNotes}`);
  }

  lines.push(`--------------------------------------`);
  lines.push(`Bonjour Lux Clean Mali, voici ma demande. Merci de me donner le prix et la disponibilité.`);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${phone}?text=${text}`;
}

export function formatFCFA(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} FCFA`;
}
