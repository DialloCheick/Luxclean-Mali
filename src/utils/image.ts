/**
 * Client-side image downscale + JPEG re-encode before sending to the
 * photo-condition-estimator API. Keeps payloads small (important on the
 * mobile data connections most Bamako clients will be using) and strips
 * EXIF/metadata in the process.
 */
export interface CompressedImage {
  dataUrl: string; // for <img src> preview, includes the data: prefix
  base64: string; // raw base64 payload (no prefix), for sending to the API
}

export function compressImageFile(
  file: File,
  maxDimension = 1280,
  quality = 0.72,
): Promise<CompressedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width >= height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('canvas_unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      const base64 = dataUrl.split(',')[1] || '';
      resolve({ dataUrl, base64 });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('image_load_failed'));
    };

    img.src = objectUrl;
  });
}
