/**
 * =========================================================================
 * 📸 CONFIGURATION CENTRALE DES IMAGES - LUXCLEAN MALI
 * =========================================================================
 * Ce fichier vous permet de changer très facilement toutes les images
 * du site web avant de le déployer, SANS avoir besoin de bouton upload public.
 *
 * 💡 COMMENT CHANGER UNE IMAGE :
 * 1. Déposez votre nouveau fichier image dans le dossier "public/" 
 *    (par exemple : public/mon-nouveau-canape.jpg)
 * 2. Remplacez le chemin ci-dessous par "/mon-nouveau-canape.jpg"
 *    (ou collez directement une URL web https://...)
 * 3. Enregistrez : le site se met à jour immédiatement !
 * =========================================================================
 */

import heroMainImg from '../assets/images/regenerated_image_1789493331862.png';
import carInteriorImg from '../assets/images/regenerated_image_1789495549036.png';

export interface ImageConfigItem {
  id: string;
  label: string;
  section: string;
  url: string;
  recommendedSize?: string;
  note?: string;
}

export const SITE_IMAGES = {
  // 1. Logo officiel & Identité de la marque
  brand: {
    logo: '/luxclean-logo.jpg',
  },

  // 2. Section Hero (Grande photo d'accueil)
  hero: {
    // Photo d'intervention haute puissance (brossage rotatif / injection-extraction)
    main: heroMainImg,
  },

  // 3. Galerie Interactive Avant / Après (Curseur coulissant)
  beforeAfter: {
    canape: {
      id: 'ba-1',
      title: 'Canapé d’angle en velours gris',
      before: '/sofa-before-clean.jpg',
      after: '/sofa-after-clean.jpg',
    },
    tapis: {
      id: 'ba-2',
      title: 'Grand Tapis de salon oriental',
      before: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    moquetteMosquee: {
      id: 'ba-3',
      title: 'Moquette de salle de prière mosquée',
      before: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    },
    moquetteBureau: {
      id: 'ba-4',
      title: 'Moquette de bureaux de direction',
      before: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
  },

  // 4. Catalogue des Prestations & Services
  services: {
    tapisMaison: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=80',
    moquetteMosquee: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80',
    moquetteBureau: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    canapesSalons: '/sofa-after-clean.jpg',
    matelasLiterie: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    interieurAuto: carInteriorImg,
  },

  // 5. Vidéos & Réalisations TikTok (@luxcleanmali223)
  tiktok: {
    video1: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    video2: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
    video3: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80',
    video4: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
  },
};

/**
 * Fonction d'aide pour obtenir l'image active (soit personnalisée en prévisualisation locale,
 * soit la configuration par défaut de production ci-dessus).
 */
export function getActiveImage(key: string, fallbackUrl: string): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`luxclean_override_${key}`);
      if (saved) return saved;
    } catch {
      // Pas de stockage accessible
    }
  }
  return fallbackUrl;
}
