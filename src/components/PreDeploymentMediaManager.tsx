import React, { useState, useEffect, useRef } from 'react';
import {
  SITE_IMAGES,
  getActiveImage,
  compressImageFile,
  saveImageOverride,
  removeImageOverride,
} from '../config/siteImages';
import {
  Sparkles,
  X,
  Image as ImageIcon,
  Upload,
  Check,
  RotateCcw,
  Copy,
  ExternalLink,
  HelpCircle,
  Link as LinkIcon,
  Eye,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

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
  targetAnchor?: string;
}

const ALL_IMAGE_SLOTS: ImageSlot[] = [
  {
    id: 'brand_logo',
    section: 'Identité & Marque',
    name: 'Logo Officiel LuxClean Mali',
    defaultPath: SITE_IMAGES.brand.logo,
    description: 'Logo affiché dans l’en-tête, le Hero et le pied de page.',
    recommendedSize: 'Carré (500x500 px ou 800x800 px)',
    targetAnchor: 'top',
  },
  {
    id: 'hero_main',
    section: 'Accueil / Hero',
    name: 'Photo Principale d’Intervention',
    defaultPath: SITE_IMAGES.hero.main,
    description: 'Grande photo d’action (brossage rotatif ou injection sur tissu).',
    recommendedSize: 'Paysage 16:9 ou 4:3 (1200x800 px)',
    targetAnchor: 'top',
  },
  {
    id: 'ba_canape_before',
    section: 'Avant / Après : Canapés',
    name: 'Canapé - Avant Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.canape.before,
    description: 'Photo du canapé sale avec poussière ou taches.',
    recommendedSize: '800x600 px ou 1200x800 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_canape_after',
    section: 'Avant / Après : Canapés',
    name: 'Canapé - Après Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.canape.after,
    description: 'Photo du canapé parfaitement nettoyé et rénové.',
    recommendedSize: '800x600 px ou 1200x800 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_tapis_before',
    section: 'Avant / Après : Tapis',
    name: 'Tapis - Avant Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.tapis.before,
    description: 'Tapis terni ou poussiéreux avant dépoussiérage.',
    recommendedSize: '800x600 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_tapis_after',
    section: 'Avant / Après : Tapis',
    name: 'Tapis - Après Nettoyage',
    defaultPath: SITE_IMAGES.beforeAfter.tapis.after,
    description: 'Tapis aux couleurs éclatantes et fibres assainies.',
    recommendedSize: '800x600 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_mosquee_before',
    section: 'Avant / Après : Mosquée',
    name: 'Moquette Mosquée - Avant',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteMosquee.before,
    description: 'Moquette de salle de prière avant intervention.',
    recommendedSize: '800x600 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_mosquee_after',
    section: 'Avant / Après : Mosquée',
    name: 'Moquette Mosquée - Après',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteMosquee.after,
    description: 'Moquette purifiée et désinfectée.',
    recommendedSize: '800x600 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_bureau_before',
    section: 'Avant / Après : Bureaux',
    name: 'Moquette Bureaux - Avant',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteBureau.before,
    description: 'Moquette de bureau avec traces et taches de passages.',
    recommendedSize: '800x600 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'ba_bureau_after',
    section: 'Avant / Après : Bureaux',
    name: 'Moquette Bureaux - Après',
    defaultPath: SITE_IMAGES.beforeAfter.moquetteBureau.after,
    description: 'Moquette de direction rénovée et uniforme.',
    recommendedSize: '800x600 px',
    targetAnchor: 'galerie',
  },
  {
    id: 'service_tapis',
    section: 'Services & Prestations',
    name: 'Carte Service : Tapis de Maison',
    defaultPath: SITE_IMAGES.services.tapisMaison,
    description: 'Illustration pour le lavage de tapis à domicile & atelier.',
    recommendedSize: '900x600 px',
    targetAnchor: 'services',
  },
  {
    id: 'service_mosquee',
    section: 'Services & Prestations',
    name: 'Carte Service : Moquettes de Mosquées',
    defaultPath: SITE_IMAGES.services.moquetteMosquee,
    description: 'Illustration pour la purification des lieux de culte.',
    recommendedSize: '900x600 px',
    targetAnchor: 'services',
  },
  {
    id: 'service_bureau',
    section: 'Services & Prestations',
    name: 'Carte Service : Moquettes d’Entreprises',
    defaultPath: SITE_IMAGES.services.moquetteBureau,
    description: 'Illustration pour le nettoyage tertiaire B2B.',
    recommendedSize: '900x600 px',
    targetAnchor: 'services',
  },
  {
    id: 'service_canapes',
    section: 'Services & Prestations',
    name: 'Carte Service : Salons & Canapés',
    defaultPath: SITE_IMAGES.services.canapesSalons,
    description: 'Illustration pour la rénovation de canapés et fauteuils.',
    recommendedSize: '900x600 px',
    targetAnchor: 'services',
  },
  {
    id: 'service_matelas',
    section: 'Services & Prestations',
    name: 'Carte Service : Matelas & Literie',
    defaultPath: SITE_IMAGES.services.matelasLiterie,
    description: 'Illustration pour le traitement anti-acariens de matelas.',
    recommendedSize: '900x600 px',
    targetAnchor: 'services',
  },
  {
    id: 'service_auto',
    section: 'Services & Prestations',
    name: 'Carte Service : Intérieur Véhicules 4x4',
    defaultPath: SITE_IMAGES.services.interieurAuto,
    description: 'Illustration pour le shampouinage de sièges de voitures.',
    recommendedSize: '900x600 px',
    targetAnchor: 'services',
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
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [processingSlotId, setProcessingSlotId] = useState<string | null>(null);
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);
  const [editingUrlSlotId, setEditingUrlSlotId] = useState<string | null>(null);
  const [urlInputValue, setUrlInputValue] = useState('');
  const feedbackTimerRef = useRef<number | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
    }
    setFeedback({ text, type });
    feedbackTimerRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  // Recharger l'état des surcharges à l'ouverture
  useEffect(() => {
    if (!isOpen) return;

    const loaded: Record<string, string> = {};
    ALL_IMAGE_SLOTS.forEach((slot) => {
      const active = getActiveImage(slot.id, '');
      if (active && active !== slot.defaultPath) {
        loaded[slot.id] = active;
      }
    });
    setOverrides(loaded);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelected = async (slotId: string, file: File) => {
    const isLikelyImage =
      file.type.startsWith('image/') ||
      /\.(jpe?g|png|webp|gif|svg|avif|heic|heif|bmp)$/i.test(file.name);

    if (!isLikelyImage) {
      showNotification('Veuillez sélectionner un fichier image valide (JPG, PNG, WebP, SVG, etc.).', 'error');
      return;
    }

    setProcessingSlotId(slotId);
    showNotification(`Traitement et application de la photo sur "${slotId}"...`, 'info');

    try {
      // 1. Compression optimisée & conversion universelle
      const dataUrl = await compressImageFile(file, 1400, 0.84);

      if (!dataUrl) {
        throw new Error('Échec de la lecture du fichier image.');
      }

      // 2. Sauvegarde double (Mémoire vive + IndexedDB + LocalStorage)
      saveImageOverride(slotId, dataUrl);

      // 3. Mise à jour synchrone locale du gestionnaire
      setOverrides((prev) => ({ ...prev, [slotId]: dataUrl }));

      // 4. Notification immédiate à l'application
      onImagesUpdated();

      const slot = ALL_IMAGE_SLOTS.find((s) => s.id === slotId);
      showNotification(`✅ Photo "${slot ? slot.name : slotId}" appliquée avec succès sur le site !`, 'success');
    } catch (err) {
      console.error('Erreur lors du traitement image:', err);

      // Filet de sécurité ultime : lecture brute
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const raw = reader.result as string;
          saveImageOverride(slotId, raw);
          setOverrides((prev) => ({ ...prev, [slotId]: raw }));
          onImagesUpdated();
          showNotification(`✅ Photo importée avec succès !`, 'success');
        };
        reader.readAsDataURL(file);
      } catch {
        showNotification('Impossible de charger ce fichier. Essayez avec un JPG ou PNG standard.', 'error');
      }
    } finally {
      setProcessingSlotId(null);
    }
  };

  const handleApplyUrl = (slotId: string) => {
    const trimmed = urlInputValue.trim();
    if (!trimmed) {
      setEditingUrlSlotId(null);
      return;
    }

    saveImageOverride(slotId, trimmed);
    setOverrides((prev) => ({ ...prev, [slotId]: trimmed }));
    onImagesUpdated();
    setEditingUrlSlotId(null);
    setUrlInputValue('');
    showNotification(`✅ Image URL appliquée avec succès !`, 'success');
  };

  const handleResetSlot = (slotId: string) => {
    removeImageOverride(slotId);
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
    onImagesUpdated();
    showNotification(`Image d'origine restaurée.`, 'info');
  };

  const handleResetAll = () => {
    if (confirm('Voulez-vous réinitialiser toutes les images aux versions par défaut du site ?')) {
      ALL_IMAGE_SLOTS.forEach((slot) => {
        removeImageOverride(slot.id);
      });
      setOverrides({});
      onImagesUpdated();
      showNotification(`Toutes les images ont été réinitialisées par défaut.`, 'info');
    }
  };

  const handleViewOnSite = (slot: ImageSlot) => {
    onClose();
    setTimeout(() => {
      if (slot.targetAnchor === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (slot.targetAnchor) {
        const el = document.getElementById(slot.targetAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 120);
  };

  const copyConfigCode = () => {
    const configExport = `// Configuration mise à jour à coller dans src/config/siteImages.ts
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
      showNotification('Code TypeScript copié dans votre presse-papiers !', 'success');
    });
  };

  const filteredSlots = ALL_IMAGE_SLOTS.filter((s) => {
    if (activeTab === 'hero') return s.id.includes('hero') || s.id.includes('brand');
    if (activeTab === 'beforeAfter') return s.id.includes('ba_');
    if (activeTab === 'services') return s.id.includes('service_');
    return true;
  });

  const modifiedCount = Object.keys(overrides).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
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
                {modifiedCount > 0 ? (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C5A869]/20 text-[#DFC792] border border-[#C5A869]/40 font-bold">
                    {modifiedCount} photo{modifiedCount > 1 ? 's' : ''} personnalisée{modifiedCount > 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                    Images par défaut
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Glissez ou uploadez vos propres photos : elles s'affichent immédiatement sur le site.
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

        {/* Guidance and Quick Actions Banner */}
        <div className="p-4 bg-[#091530] border-b border-[#C5A869]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Comment remplacer vos photos :</strong>
              <span className="block text-[11px] text-slate-300 mt-0.5">
                • <strong>Glissez-déposez</strong> un fichier directement sur n'importe quelle carte ci-dessous.
                <br />• Ou cliquez sur <strong>« Uploader photo »</strong> pour sélectionner un fichier de votre appareil.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyConfigCode}
              className="px-3 py-1.5 rounded-xl bg-[#0d1c3a] hover:bg-[#132750] text-[#DFC792] border border-[#C5A869]/40 hover:border-[#C5A869] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copier la configuration TypeScript pour déploiement"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Code Copié !' : 'Exporter Code'}</span>
            </button>

            {modifiedCount > 0 && (
              <button
                onClick={handleResetAll}
                className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Rétablir toutes les photos d'origine"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rétablir Défaut</span>
              </button>
            )}
          </div>
        </div>

        {/* Feedback Alert Bar */}
        {feedback && (
          <div
            className={`mx-5 mt-4 p-3 rounded-xl border text-xs flex items-center gap-2 transition-all ${
              feedback.type === 'error'
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-200'
                : feedback.type === 'info'
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-200'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
            }`}
          >
            {feedback.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : feedback.type === 'info' ? (
              <Loader2 className="w-4 h-4 text-sky-400 animate-spin shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span className="font-medium">{feedback.text}</span>
          </div>
        )}

        {/* Category Tabs */}
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
            Cartes Prestations
          </button>
        </div>

        {/* Slots Grid */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSlots.map((slot) => {
              const currentSrc = overrides[slot.id] || slot.defaultPath;
              const isOverridden = Boolean(overrides[slot.id]);
              const isDraggingOver = dragOverSlotId === slot.id;
              const isProcessing = processingSlotId === slot.id;
              const isEditingUrl = editingUrlSlotId === slot.id;

              return (
                <div
                  key={slot.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverSlotId(slot.id);
                  }}
                  onDragLeave={() => {
                    setDragOverSlotId(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverSlotId(null);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileSelected(slot.id, e.dataTransfer.files[0]);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 relative ${
                    isDraggingOver
                      ? 'bg-[#15274d] border-[#C5A869] ring-2 ring-[#C5A869] shadow-xl'
                      : isOverridden
                      ? 'bg-[#0c1836] border-[#C5A869]/55 shadow-md ring-1 ring-[#C5A869]/30'
                      : 'bg-[#081226] border-[#C5A869]/20 hover:border-[#C5A869]/40'
                  }`}
                >
                  {/* Drop Overlay when dragging file over this card */}
                  {isDraggingOver && (
                    <div className="absolute inset-0 z-20 bg-[#070e20]/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-[#DFC792] border-2 border-dashed border-[#C5A869] pointer-events-none p-4 text-center">
                      <Upload className="w-8 h-8 text-[#C5A869] animate-bounce mb-2" />
                      <span className="font-bold text-sm text-white">Déposez votre photo ici</span>
                      <span className="text-xs text-slate-300">Elle sera appliquée immédiatement à « {slot.name} »</span>
                    </div>
                  )}

                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail preview */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black/60 border border-[#C5A869]/30 shrink-0 shadow-inner group">
                      <img
                        src={currentSrc}
                        alt={slot.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {isOverridden ? (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-emerald-600 text-[9px] font-black text-white uppercase tracking-wider shadow">
                          Actif
                        </span>
                      ) : (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-800/80 text-[9px] font-medium text-slate-300 uppercase tracking-wider">
                          Défaut
                        </span>
                      )}
                    </div>

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0d1d3d] text-[#DFC792] border border-[#C5A869]/30">
                          {slot.section}
                        </span>
                        {isOverridden && (
                          <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#C5A869]" />
                            Personnalisée
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

                  {/* Inline URL editor when toggled */}
                  {isEditingUrl && (
                    <div className="p-2.5 rounded-xl bg-[#070e1e] border border-[#C5A869]/40 space-y-2 animate-fadeIn">
                      <label className="text-[11px] text-slate-300 font-medium block">
                        Coller une URL web (https://...) ou un chemin public (/mon-image.jpg) :
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={urlInputValue}
                          onChange={(e) => setUrlInputValue(e.target.value)}
                          placeholder="https://images.unsplash.com/... ou /ma-photo.jpg"
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#0b162f] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A869]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApplyUrl(slot.id);
                            if (e.key === 'Escape') setEditingUrlSlotId(null);
                          }}
                        />
                        <button
                          onClick={() => handleApplyUrl(slot.id)}
                          className="px-3 py-1.5 rounded-lg bg-gold-gradient text-[#060B16] text-xs font-bold cursor-pointer hover:opacity-90"
                        >
                          Appliquer
                        </button>
                        <button
                          onClick={() => setEditingUrlSlotId(null)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          title="Annuler"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Action Controls */}
                  <div className="pt-2 border-t border-[#C5A869]/15 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Upload button with native file input */}
                      <label
                        htmlFor={`file-input-${slot.id}`}
                        className={`px-3 py-1.5 rounded-lg text-white border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                          isProcessing
                            ? 'bg-[#152a55] border-[#C5A869] opacity-75 cursor-wait'
                            : isOverridden
                            ? 'bg-[#0e1d3e] hover:bg-[#162c5e] border-[#C5A869]/60 text-[#DFC792]'
                            : 'bg-[#0e1d3e] hover:bg-[#142854] border-[#C5A869]/35 text-slate-200'
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 text-[#C5A869] animate-spin" />
                            <span>Application...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-[#C5A869]" />
                            <span>{isOverridden ? 'Remplacer photo' : 'Uploader photo'}</span>
                          </>
                        )}
                        <input
                          id={`file-input-${slot.id}`}
                          type="file"
                          accept="image/*"
                          disabled={isProcessing}
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileSelected(slot.id, e.target.files[0]);
                              e.target.value = '';
                            }
                          }}
                        />
                      </label>

                      {/* URL Toggle button */}
                      <button
                        onClick={() => {
                          if (isEditingUrl) {
                            setEditingUrlSlotId(null);
                          } else {
                            setEditingUrlSlotId(slot.id);
                            setUrlInputValue(isOverridden ? currentSrc : '');
                          }
                        }}
                        className="px-2 py-1.5 rounded-lg bg-[#0b162f] hover:bg-[#12244a] text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        title="Saisir ou coller une URL web"
                      >
                        <LinkIcon className="w-3 h-3 text-[#C5A869]" />
                        <span>URL</span>
                      </button>

                      {/* Reset to default */}
                      {isOverridden && (
                        <button
                          onClick={() => handleResetSlot(slot.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="Rétablir l'image originale d'usine"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Rétablir</span>
                        </button>
                      )}
                    </div>

                    {/* Jump to preview on site */}
                    <button
                      onClick={() => handleViewOnSite(slot)}
                      className="text-[11px] text-[#DFC792] hover:text-[#C5A869] font-medium flex items-center gap-1 cursor-pointer underline-offset-2 hover:underline ml-auto"
                      title="Fermer et afficher cet élément directement sur le site web"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Voir sur le site</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0a142c] border-t border-[#C5A869]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-400 text-center sm:text-left text-[11px]">
            💡 <strong>Persistance Active :</strong> Vos photos importées sont sauvegardées en local et s'affichent instantanément à chaque visite.
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold-gradient hover:opacity-95 text-[#060B16] font-bold text-xs font-display shadow-md cursor-pointer transition-all"
            >
              Fermer & Admirer le Site
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
