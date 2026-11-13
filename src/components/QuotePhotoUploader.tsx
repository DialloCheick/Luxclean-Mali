import React, { useRef } from 'react';
import { Camera, X, ImagePlus } from 'lucide-react';
import { compressImageFile, CompressedImage } from '../utils/image';

interface QuotePhotoUploaderProps {
  photos: CompressedImage[];
  onChange: (photos: CompressedImage[]) => void;
  maxPhotos?: number;
}

/**
 * Simple client-side multi-photo picker for the quote request form.
 *
 * Unlike the older PhotoConditionEstimator, this does NOT call any backend
 * AI analysis and does NOT influence any price shown to the client — the
 * site no longer computes a price from photo condition. Photos are kept
 * only in the page's local state so the client can see what they selected;
 * they are never uploaded anywhere automatically (this is a static site
 * with no file backend). The client is told elsewhere in the form that
 * they must attach these same photos manually inside the WhatsApp
 * conversation once it opens, since a wa.me link can only pre-fill text.
 */
export const QuotePhotoUploader: React.FC<QuotePhotoUploaderProps> = ({
  photos,
  onChange,
  maxPhotos = 6,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFilesSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const files = Array.from(fileList).slice(0, Math.max(0, maxPhotos - photos.length));
    try {
      const compressed = await Promise.all(files.map((f) => compressImageFile(f)));
      onChange([...photos, ...compressed].slice(0, maxPhotos));
    } catch {
      setError("Impossible de lire une des photos. Réessayez avec une autre image.");
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (idx: number) => {
    onChange(photos.filter((_, i) => i !== idx));
  };

  return (
    <div className="pt-4 border-t border-slate-800 space-y-3">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <ImagePlus className="w-3.5 h-3.5 text-[#C5A869]" />
          Photos de votre tapis / moquette / article (jusqu'à {maxPhotos})
        </h4>
        <p className="text-[11px] text-slate-500 mt-1">
          Ajoutez quelques photos pour que notre équipe évalue l'état et la taille réelle avant de vous donner un prix précis sur WhatsApp.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {photos.map((photo, idx) => (
          <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#C5A869]/30 shrink-0">
            <img src={photo.dataUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(idx)}
              className="absolute top-0.5 right-0.5 w-4.5 h-4.5 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
              aria-label={`Retirer la photo ${idx + 1}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {photos.length < maxPhotos && (
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

      {error && <p className="text-[11px] text-amber-300">{error}</p>}

      {photos.length > 0 && (
        <p className="text-[10px] text-slate-500 italic">
          {photos.length} photo{photos.length > 1 ? 's' : ''} sélectionnée{photos.length > 1 ? 's' : ''}. Pensez à les joindre manuellement dans la conversation WhatsApp qui s'ouvrira — elles ne sont pas envoyées automatiquement.
        </p>
      )}
    </div>
  );
};
