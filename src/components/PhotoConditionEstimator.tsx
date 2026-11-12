import React, { useRef, useState } from 'react';
import { Camera, X, Sparkles, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { DIRT_SEVERITY_TIERS } from '../data/mockData';
import { DirtSeverity } from '../types';
import { compressImageFile, CompressedImage } from '../utils/image';

interface PhotoConditionEstimatorProps {
  category: string;
  selectedTier: DirtSeverity;
  onSelectTier: (
    tier: DirtSeverity,
    meta: { source: 'ai' | 'manual'; justification?: string; confidence?: number },
  ) => void;
}

const MAX_PHOTOS = 3;

export const PhotoConditionEstimator: React.FC<PhotoConditionEstimatorProps> = ({
  category,
  selectedTier,
  onSelectTier,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<CompressedImage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiJustification, setAiJustification] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<'ai' | 'manual' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const files = Array.from(fileList).slice(0, MAX_PHOTOS - photos.length);
    try {
      const compressed = await Promise.all(files.map((f) => compressImageFile(f)));
      setPhotos((prev) => [...prev, ...compressed].slice(0, MAX_PHOTOS));
    } catch {
      setError("Impossible de lire une des photos. Réessayez avec une autre image.");
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
    setAiJustification(null);
    setAiSource(null);
  };

  const handleAnalyze = async () => {
    if (photos.length === 0) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const res = await fetch('/api/estimate-condition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: photos.map((p) => p.base64),
          category,
        }),
      });

      if (!res.ok) {
        throw new Error('api_error');
      }

      const data = await res.json();
      if (!data.tier) throw new Error('no_tier');

      onSelectTier(data.tier as DirtSeverity, {
        source: 'ai',
        justification: data.justification,
        confidence: data.confidence,
      });
      setAiJustification(data.justification || null);
      setAiSource('ai');
    } catch {
      setError(
        "L'analyse automatique n'a pas pu se faire pour le moment. Choisissez vous-même le niveau de salissure ci-dessous — un technicien confirmera le prix exact après vos photos sur WhatsApp.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-4 border-t border-slate-800 space-y-3">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          État de salissure (ajuste le prix automatiquement)
        </h4>
        <p className="text-[11px] text-slate-500 mt-1">
          Le prix de base suppose un entretien courant. Si l'article est plus sale, le tarif peut augmenter — ajoutez une photo pour une estimation plus juste, ou choisissez vous-même.
        </p>
      </div>

      {/* Photo thumbnails + add button */}
      <div className="flex flex-wrap gap-2.5">
        {photos.map((photo, idx) => (
          <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#C5A869]/30 shrink-0">
            <img src={photo.dataUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(idx)}
              className="absolute top-0.5 right-0.5 w-4.5 h-4.5 rounded-full bg-black/70 text-white flex items-center justify-center"
              aria-label="Retirer la photo"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-700 hover:border-[#C5A869]/60 flex flex-col items-center justify-center text-slate-400 hover:text-[#C5A869] transition-colors shrink-0 cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span className="text-[9px] mt-0.5">Ajouter</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      {photos.length > 0 && (
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0d1c3a] hover:bg-[#132752] border border-[#C5A869]/35 text-[#DFC792] font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyse de {photos.length > 1 ? 'vos photos' : 'votre photo'} en cours...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#C5A869]" />
              <span>Analyser avec l'IA pour affiner le prix</span>
            </>
          )}
        </button>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {aiJustification && aiSource === 'ai' && (
        <div className="p-3 rounded-xl bg-[#0d1c3a] border border-[#C5A869]/25 text-[11px] text-slate-200 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#C5A869]" />
          <span>
            <strong className="text-[#DFC792]">Estimation IA : </strong>
            {aiJustification}
          </span>
        </div>
      )}

      {/* Manual tier selector — always available, overrides AI */}
      <div className="grid grid-cols-3 gap-2">
        {DIRT_SEVERITY_TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => {
              onSelectTier(tier.id, { source: 'manual' });
              setAiSource('manual');
              setAiJustification(null);
            }}
            className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
              selectedTier === tier.id
                ? `${tier.colorClass} ring-1 ring-white/20 shadow-md font-bold`
                : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-white'
            }`}
            title={tier.description}
          >
            <span className="block text-xs">{tier.shortLabel}</span>
            {tier.multiplier > 1 && (
              <span className="block text-[10px] mt-0.5 opacity-80">+{Math.round((tier.multiplier - 1) * 100)}%</span>
            )}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 italic">
        Estimation indicative. Le prix final est confirmé par notre équipe après réception de vos photos sur WhatsApp.
      </p>
    </div>
  );
};
