import React, { useState, useEffect } from 'react';
import { SITE_IMAGES } from '../config/siteImages';
import { Sparkles, X, Image as ImageIcon, Upload, Check, RotateCcw, Copy, ExternalLink, HelpCircle, FileCode } from 'lucide-react';

interface MediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onImagesUpdated: () => void;
}

interface ImageSlot {
  id: string;
  section: string;
  name: string;
  defaultPath: string;
  description: string;
  recommendedSize: string;
}

const ALL_IMAGE_SLOTS: ImageSlot[] = [
  {
    id: 'brand_logo',
    section: 'Identité & Marque',
    name: 'Logo Officiel LuxClean Mali',
    defaultPath: SITE_IMAGES.brand.logo,
    description: 'Logo affiché dans l’en-tête, le Hero et le pied de page.',
    recommendedSize: 'Carré (500x500 px ou 800x800 px)',
  },
  {
    id: 'hero_main',
    section: 'Accueil / Hero',
    name: 'Photo Principale d’Intervention',
    defaultPath: SITE_IMAGES.hero.main,
    description: 'Grande photo d’action (brossage rotatif ou injection sur tissu).',
    recommendedSize: 'Paysage 16:9 ou 4:3 (1200x800 px)',
  },
  {
    id: 'ba_canape_before',
    section: 'Avant / Après : Canapés',
    name: 'Canapé - Avant Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.canape.before,
    description: 'Photo du canapé sale avec poussière ou taches.',
    recommendedSize: '800x600 px ou 1200x800 px',
  },
  {
    id: 'ba_canape_after',
    section: 'Avant / Après : Canapés',
    name: 'Canapé - Après Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.canape.after,
    description: 'Photo du canapé parfaitement nettoyé et rénové.',
    recommendedSize: '800x600 px ou 1200x800 px (même cadrage)',
  },
  {
    id: 'ba_tapis_before',
    section: 'Avant / Après : Tapis',
    name: 'Tapis - Avant Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.tapis.before,
    description: 'Tapis terni ou poussiéreux avant dépoussiérage.',
    recommendedSize: '800x600 px',
  },
  {
    id: 'ba_tapis_after',
    section: 'Avant / Après : Tapis',
    name: 'Tapis - Après Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.tapis.after,
    description: 'Tapis aux couleurs éclatantes et fibres assainies.',
    recommendedSize: '800x600 px',
  },
  {
    id: 'ba_mosquee_before',
    section: 'Avant / Après : Mosquée',
    name: 'Moquette Mosquée - Avant',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteMosquee.before,
    description: 'Moquette de salle de prière avant intervention.',
    recommendedSize: '800x600 px',
  },
  {
    id: 'ba_mosquee_after',
    section: 'Avant / Après : Mosquée',
    name: 'Moquette Mosquée - Après',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteMosquee.after,
    description: 'Moquette purifiée et désinfectée.',
    recommendedSize: '800x600 px',
  },
  {
    id: 'ba_bureau_before',
    section: 'Avant / Après : Bureaux',
    name: 'Moquette Bureaux - Avant',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteBureau.before,
    description: 'Moquette de bureau avec taches de café et traces de roulettes.',
    recommendedSize: '800x600 px',
  },
  {
    id: 'ba_bureau_after',
    section: 'Avant / Après : Bureaux',
    name: 'Moquette Bureaux - Après',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteBureau.after,
    description: 'Moquette de direction rénovée et uniforme.',
    recommendedSize: '800x600 px',
  },
  {
    id: 'service_tapis',
    section: 'Services & Prestations',
    name: 'Carte Service : Tapis de Maison',
    defaultPath: SITE_IMAGES.services.tapisMaison,
    description: 'Illustration pour le lavage de tapis à domicile & atelier.',
    recommendedSize: '900x600 px',
  },
  {
    id: 'service_mosquee',
    section: 'Services & Prestations',
    name: 'Carte Service : Moquettes de Mosquées',
    defaultPath: SITE_IMAGES.services.moquetteMosquee,
    description: 'Illustration pour la purification des lieux de culte.',
    recommendedSize: '900x600 px',
  },
  {
    id: 'service_bureau',
    section: 'Services & Prestations',
    name: 'Carte Service : Moquettes d’Entreprises',
    defaultPath: SITE_IMAGES.services.moquetteBureau,
    description: 'Illustration pour le nettoyage tertiaire B2B.',
    recommendedSize: '900x600 px',
  },
  {
    id: 'service_canapes',
    section: 'Services & Prestations',
    name: 'Carte Service : Salons & Canapés',
    defaultPath: SITE_IMAGES.services.canapesSalons,
    description: 'Illustration pour la rénovation de canapés et fauteuils.',
    recommendedSize: '900x600 px',
  },
  {
    id: 'service_matelas',
    section: 'Services & Prestations',
    name: 'Carte Service : Matelas & Literie',
    defaultPath: SITE_IMAGES.services.matelasLiterie,
    description: 'Illustration pour le traitement anti-acariens de matelas.',
    recommendedSize: '900x600 px',
  },
  {
    id: 'service_auto',
    section: 'Services & Prestations',
    name: 'Carte Service : Intérieur Véhicules 4x4',
    defaultPath: SITE_IMAGES.services.interieurAuto,
    description: 'Illustration pour le shampouinage de sièges de voitures.',
    recommendedSize: '900x600 px',
  },
];

export const PreDeploymentMediaManager: React.FC<MediaManagerProps> = ({
  isOpen,
  onClose,
  onImagesUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hero' | 'beforeAfter' | 'services'>('all');
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [copiedCode, setCopiedCode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Load local storage overrides
    const loaded: Record<string, string> = {};
    ALL_IMAGE_SLOTS.forEach((slot) => {
      const saved = localStorage.getItem(`luxclean_override_${slot.id}`);
      if (saved) {
        loaded[slot.id] = saved;
      }
    });
    setOverrides(loaded);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelected = (slotId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez choisir un fichier image (JPG, PNG ou WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        try {
          localStorage.setItem(`luxclean_override_${slotId}`, dataUrl);
          setOverrides((prev) => ({ ...prev, [slotId]: dataUrl }));
          onImagesUpdated();
          setFeedback(`Image pour "${slotId}" appliquée en prévisualisation directe !`);
          setTimeout(() => setFeedback(null), 3500);
        } catch (err) {
          alert("L'image est trop lourde pour le cache local du navigateur. Réduisez la taille du fichier ou déposez-la dans le dossier /public/.");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleManualPathChange = (slotId: string, path: string) => {
    const trimmed = path.trim();
    if (trimmed) {
      localStorage.setItem(`luxclean_override_${slotId}`, trimmed);
      setOverrides((prev) => ({ ...prev, [slotId]: trimmed }));
    } else {
      localStorage.removeItem(`luxclean_override_${slotId}`);
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
    }
    onImagesUpdated();
  };

  const handleResetSlot = (slotId: string) => {
    localStorage.removeItem(`luxclean_override_${slotId}`);
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
    onImagesUpdated();
  };

  const handleResetAll = () => {
    if (confirm('Voulez-vous réinitialiser toutes les images aux réglages d’origine du site ?')) {
      ALL_IMAGE_SLOTS.forEach((slot) => {
        localStorage.removeItem(`luxclean_override_${slot.id}`);
      });
      setOverrides({});
      onImagesUpdated();
      setFeedback('Toutes les images ont été réinitialisées aux originaux.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const copyConfigCode = () => {
    const configExport = `// Copiez-collez cette configuration dans src/config/siteImages.ts
export const SITE_IMAGES = {
  brand: {
    logo: '${overrides['brand_logo']?.startsWith('data:') ? '/luxclean-logo.jpg' : (overrides['brand_logo'] || SITE_IMAGES.brand.logo)}',
  },
  hero: {
    main: '${overrides['hero_main']?.startsWith('data:') ? '/sofa-drill-scrub.jpg' : (overrides['hero_main'] || SITE_IMAGES.hero.main)}',
  },
  beforeAfter: {
    canape: {
      id: 'ba-1',
      title: 'Canapé d’angle en velours gris',
      before: '${overrides['ba_canape_before']?.startsWith('data:') ? '/sofa-before-clean.jpg' : (overrides['ba_canape_before'] || SITE_IMAGES.beforeAfter.canape.before)}',
      after: '${overrides['ba_canape_after']?.startsWith('data:') ? '/sofa-after-clean.jpg' : (overrides['ba_canape_after'] || SITE_IMAGES.beforeAfter.canape.after)}',
    },
    tapis: {
      id: 'ba-2',
      title: 'Grand Tapis de salon oriental',
      before: '${overrides['ba_tapis_before'] || SITE_IMAGES.beforeAfter.tapis.before}',
      after: '${overrides['ba_tapis_after'] || SITE_IMAGES.beforeAfter.tapis.after}',
    },
    moquetteMosquee: {
      id: 'ba-3',
      title: 'Moquette de salle de prière mosquée',
      before: '${overrides['ba_mosquee_before'] || SITE_IMAGES.beforeAfter.moquetteMosquee.before}',
      after: '${overrides['ba_mosquee_after'] || SITE_IMAGES.beforeAfter.moquetteMosquee.after}',
    },
    moquetteBureau: {
      id: 'ba-4',
      title: 'Moquette de bureaux de direction',
      before: '${overrides['ba_bureau_before'] || SITE_IMAGES.beforeAfter.moquetteBureau.before}',
      after: '${overrides['ba_bureau_after'] || SITE_IMAGES.beforeAfter.moquetteBureau.after}',
    },
  },
  services: {
    tapisMaison: '${overrides['service_tapis'] || SITE_IMAGES.services.tapisMaison}',
    moquetteMosquee: '${overrides['service_mosquee'] || SITE_IMAGES.services.moquetteMosquee}',
    moquetteBureau: '${overrides['service_bureau'] || SITE_IMAGES.services.moquetteBureau}',
    canapesSalons: '${overrides['service_canapes']?.startsWith('data:') ? '/sofa-after-clean.jpg' : (overrides['service_canapes'] || SITE_IMAGES.services.canapesSalons)}',
    matelasLiterie: '${overrides['service_matelas'] || SITE_IMAGES.services.matelasLiterie}',
    interieurAuto: '${overrides['service_auto'] || SITE_IMAGES.services.interieurAuto}',
  },
};`;

    navigator.clipboard.writeText(configExport).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    });
  };

  const filteredSlots = ALL_IMAGE_SLOTS.filter((s) => {
    if (activeTab === 'hero') return s.id.includes('hero') || s.id.includes('brand');
    if (activeTab === 'beforeAfter') return s.id.includes('ba_');
    if (activeTab === 'services') return s.id.includes('service_');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#070e20] border-2 border-[#C5A869]/40 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#C5A869]/20 bg-[#0a142c] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A869]/20 border border-[#C5A869]/40 flex items-center justify-center text-[#C5A869]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  Gestionnaire d’Images Pré-Déploiement
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold uppercase">
                  Outil Auteur
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Changez et prévisualisez vos photos sans afficher aucun bouton public sur le site.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Guidance Banner */}
        <div className="p-4 bg-[#091530] border-b border-[#C5A869]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Comment remplacer définitivement vos photos avant déploiement :</strong>
              <span className="block text-[11px] text-slate-300 mt-0.5">
                1. Glissez vos photos ci-dessous pour tester en direct. 
                2. Déposez vos fichiers dans le dossier <code className="bg-[#050914] px-1.5 py-0.5 rounded text-[#DFC792]">/public/</code> de votre projet (ou modifiez <code className="bg-[#050914] px-1.5 py-0.5 rounded text-[#DFC792]">src/config/siteImages.ts</code>).
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyConfigCode}
              className="px-3 py-1.5 rounded-xl bg-[#0d1c3a] hover:bg-[#132750] text-[#DFC792] border border-[#C5A869]/40 hover:border-[#C5A869] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copier la configuration TypeScript"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Code Copié !' : 'Copier Code Config'}</span>
            </button>

            {Object.keys(overrides).length > 0 && (
              <button
                onClick={handleResetAll}
                className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Tout réinitialiser par défaut"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rétablir Défaut</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Filter Navigation */}
        <div className="px-5 pt-4 flex flex-wrap gap-2 border-b border-[#C5A869]/15 pb-3 bg-[#070e20]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-gold-gradient text-[#060B16]'
                : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/40'
            }`}
          >
            Toutes les Sections ({ALL_IMAGE_SLOTS.length})
          </button>
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-gold-gradient text-[#060B16]'
                : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/40'
            }`}
          >
            Hero & Logo
          </button>
          <button
            onClick={() => setActiveTab('beforeAfter')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'beforeAfter'
                ? 'bg-gold-gradient text-[#060B16]'
                : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/40'
            }`}
          >
            Galerie Avant / Après
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-gold-gradient text-[#060B16]'
                : 'bg-[#0a152d] text-slate-300 border border-[#C5A869]/20 hover:border-[#C5A869]/40'
            }`}
          >
            Services & Prestations
          </button>
        </div>

        {/* Slots List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSlots.map((slot) => {
              const currentSrc = overrides[slot.id] || slot.defaultPath;
              const isOverridden = Boolean(overrides[slot.id]);

              return (
                <div
                  key={slot.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isOverridden
                      ? 'bg-[#0c1836] border-[#C5A869]/50 shadow-md ring-1 ring-[#C5A869]/30'
                      : 'bg-[#081226] border-[#C5A869]/20 hover:border-[#C5A869]/35'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail preview */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black/50 border border-[#C5A869]/30 shrink-0 shadow-inner group">
                      <img
                        src={currentSrc}
                        alt={slot.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isOverridden && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-emerald-600 text-[9px] font-black text-white uppercase tracking-wider">
                          Modifié
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0d1d3d] text-[#DFC792] border border-[#C5A869]/30">
                          {slot.section}
                        </span>
                        {isOverridden && (
                          <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            Aperçu actif
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white mt-1 truncate">
                        {slot.name}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                        {slot.description}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Format conseillé : {slot.recommendedSize}
                      </span>
                    </div>
                  </div>

                  {/* Actions: File upload (for immediate preview) & manual path */}
                  <div className="pt-2 border-t border-[#C5A869]/15 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`file-input-${slot.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#0e1d3e] hover:bg-[#142854] text-white border border-[#C5A869]/35 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#C5A869]" />
                        <span>Tester un fichier</span>
                        <input
                          id={`file-input-${slot.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileSelected(slot.id, e.target.files[0]);
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>

                      {isOverridden && (
                        <button
                          onClick={() => handleResetSlot(slot.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="Rétablir l'image par défaut"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Rétablir</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-[170px]" title={slot.defaultPath}>
                      {slot.defaultPath.startsWith('http') ? 'URL externe' : slot.defaultPath}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a142c] border-t border-[#C5A869]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-400 text-center sm:text-left text-[11px]">
            💡 <strong>Astuce Déploiement :</strong> Vous pouvez également modifier directement le fichier <code className="text-[#DFC792]">src/config/siteImages.ts</code> avec vos chemins d’images préférés.
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold-gradient hover:opacity-95 text-[#060B16] font-bold text-xs font-display shadow-md cursor-pointer transition-all"
          >
            Appliquer & Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
