export type ServiceCategory = 'tapis' | 'canapes' | 'moquette_bureau' | 'moquette_mosquee' | 'matelas' | 'auto';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  shortDesc: string;
  fullDesc: string;
  priceStartingAt: number; // in FCFA
  unit: string; // "par m²", "par place", "par tapis", etc.
  iconName: string;
  badge?: string;
  features: string[];
  imageUrl: string;
  videoTiktokRef?: string;
}

export interface QuoteItemSelection {
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  quantity: number;
  unitPrice: number;
  unit: string;
  options: {
    disinfection?: boolean;
    deepStainRemoval?: boolean;
    luxuryFragrance?: boolean;
    expressDrying?: boolean;
  };
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: ServiceCategory;
  location: string; // e.g. "ACI 2000, Bamako", "Mosquée de Badalabougou"
  beforeImg: string;
  afterImg: string;
  description: string;
  dirtType: string; // "Poussière latérite & café", "Taches anciennes de graisse", etc.
  duration: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  roleOrCompany: string;
  neighborhood: string; // Bamako quartier
  rating: number;
  date: string;
  content: string;
  serviceUsed: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface BamakoDistrict {
  id: string;
  name: string;
  zone: string; // "Rive Gauche" | "Rive Droite"
}

export type DirtSeverity = 'leger' | 'modere' | 'severe';

export interface DirtSeverityTier {
  id: DirtSeverity;
  label: string;
  shortLabel: string;
  multiplier: number;
  description: string;
  colorClass: string;
}

export interface PhotoEstimateResult {
  tier: DirtSeverity;
  confidence: number; // 0 to 1
  justification: string; // short French explanation shown to the client
  source: 'ai' | 'manual'; // whether the AI produced it or the client self-selected
}

export type PaymentMethodId = 'orange_money' | 'wave' | 'moov_money' | 'cash';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  subtitle: string;
  badge: string;
  color: string;
  instructions: string;
  accountNumber?: string;
  accountName?: string;
}
