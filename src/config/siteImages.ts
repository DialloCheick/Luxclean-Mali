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

import heroMainImg from '../assets/images/regenerated_image_1789578624366.png';

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
      before: '/tapis-before.jpg',
      after: '/tapis-after.jpg',
    },
    moquetteMosquee: {
      id: 'ba-3',
      title: 'Moquette de salle de prière mosquée',
      before: '/mosquee-before.jpg',
      after: '/mosquee-after.jpg',
    },
    moquetteBureau: {
      id: 'ba-4',
      title: 'Moquette de bureaux de direction',
      before: '/bureau-before.jpg',
      after: '/bureau-after.jpg',
    },
  },

  // 4. Catalogue des Prestations & Services
  services: {
    tapisMaison: '/tapis-after.jpg',
    moquetteMosquee: '/mosquee-after.jpg',
    moquetteBureau: '/bureau-after.jpg',
    canapesSalons: '/sofa-after-clean.jpg',
    matelasLiterie: '/matelas-clean.jpg',
    interieurAuto: '/interieur-auto.png',
  },

  // 5. Vidéos & Réalisations TikTok (@luxcleanmali223)
  tiktok: {
    video1: '/tiktok-video-thumbnail.jpg',
    video2: '/tiktok-video-thumbnail-2.jpg',
    video3: '/tiktok-video-thumbnail-3.jpg',
    video4: '/tiktok-video-thumbnail-4.jpg',
  },
};

// Cache mémoire immédiat pour éliminer toute latence et contourner les quotas stricts
const memoryOverrides: Record<string, string> = {};

// Nom de la base IndexedDB haute capacité pour stocker les images sans limite de quota
const IDB_NAME = 'luxclean_media_db';
const IDB_STORE = 'images';
let dbPromise: Promise<IDBDatabase | null> | null = null;

function getIDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        const req = indexedDB.open(IDB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(IDB_STORE)) {
            db.createObjectStore(IDB_STORE);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }
  return dbPromise;
}

/**
 * Initialise le stockage d'images depuis IndexedDB et localStorage au démarrage
 */
export async function initImageStore(): Promise<void> {
  if (typeof window === 'undefined') return;

  // 1. Restauration rapide depuis localStorage
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('luxclean_override_')) {
        const slotId = k.replace('luxclean_override_', '');
        const val = localStorage.getItem(k);
        if (val) {
          memoryOverrides[slotId] = val;
        }
      }
    }
  } catch {
    // Quota ou restriction d'iframe
  }

  // 2. Restauration durable depuis IndexedDB (qui n'a pas de limite de 5 Mo)
  try {
    const db = await getIDB();
    if (db) {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.openCursor();
      let updated = false;
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const key = cursor.key as string;
          const val = cursor.value as string;
          if (key && val) {
            memoryOverrides[key] = val;
            updated = true;
          }
          cursor.continue();
        } else if (updated) {
          window.dispatchEvent(new CustomEvent('luxclean_images_updated', { detail: { source: 'idb_init' } }));
        }
      };
    }
  } catch {
    // Ignore les erreurs d'IndexedDB en sandbox restreinte
  }
}

// Auto-initialisation immédiate côté client
if (typeof window !== 'undefined') {
  initImageStore();
}

/**
 * Enregistre une image en mémoire, dans IndexedDB et dans localStorage
 */
export function saveImageOverride(key: string, dataUrl: string): boolean {
  memoryOverrides[key] = dataUrl;

  // Sauvegarde dans IndexedDB (espace quasi-illimité pour les photos)
  getIDB().then((db) => {
    if (db) {
      try {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(dataUrl, key);
      } catch (err) {
        console.warn('Erreur sauvegarde IndexedDB:', err);
      }
    }
  });

  // Sauvegarde secondaire dans localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`luxclean_override_${key}`, dataUrl);
    } catch {
      // Si localStorage est plein, IndexedDB et la mémoire vive prennent le relais
    }
    window.dispatchEvent(new CustomEvent('luxclean_images_updated', { detail: { key, value: dataUrl } }));
  }
  return true;
}

/**
 * Supprime une surcharge d'image et rétablit l'image originale
 */
export function removeImageOverride(key: string): void {
  delete memoryOverrides[key];

  getIDB().then((db) => {
    if (db) {
      try {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).delete(key);
      } catch {}
    }
  });

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`luxclean_override_${key}`);
    } catch {}
    window.dispatchEvent(new CustomEvent('luxclean_images_updated', { detail: { key, removed: true } }));
  }
}

/**
 * Récupère l'image active (priorité: mémoire > localStorage > URL originale)
 */
export function getActiveImage(key: string, fallbackUrl: string): string {
  if (memoryOverrides[key]) {
    return memoryOverrides[key];
  }
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`luxclean_override_${key}`);
      if (saved) {
        memoryOverrides[key] = saved;
        return saved;
      }
    } catch {
      // Pas de stockage accessible
    }
  }
  return fallbackUrl;
}

/**
 * Compresse et optimise intelligemment une image via Canvas HTML5.
 * Ne rejette JAMAIS : intègre de multiples filets de sécurité pour que
 * chaque photo importée (smartphone, appareil photo, URL) soit acceptée avec succès.
 */
export function compressImageFile(file: File, maxDimension = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    // Timeout de sécurité : si le navigateur tarde sur un gros fichier, on ne bloque jamais
    const safetyTimeout = setTimeout(() => {
      try {
        resolve(URL.createObjectURL(file));
      } catch {
        resolve('');
      }
    }, 4500);

    reader.onerror = () => {
      clearTimeout(safetyTimeout);
      try {
        resolve(URL.createObjectURL(file));
      } catch {
        resolve('');
      }
    };

    reader.onload = () => {
      clearTimeout(safetyTimeout);
      const rawDataUrl = reader.result as string;

      // Si c'est un format vectoriel SVG, conserver tel quel
      if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
        resolve(rawDataUrl);
        return;
      }

      const img = new Image();
      // Si le décodage échoue (ex: format brut ou HEIC spécifique), repli immédiat sur le DataURL d'origine
      img.onerror = () => {
        resolve(rawDataUrl);
      };

      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Test WebP puis JPEG
          let resultDataUrl = '';
          try {
            resultDataUrl = canvas.toDataURL('image/webp', quality);
          } catch {}

          if (!resultDataUrl || !resultDataUrl.startsWith('data:image/webp')) {
            try {
              resultDataUrl = canvas.toDataURL('image/jpeg', quality);
            } catch {}
          }

          resolve(resultDataUrl || rawDataUrl);
        } catch {
          resolve(rawDataUrl);
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}
