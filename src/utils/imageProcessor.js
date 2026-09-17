// src/utils/imageProcessor.js
// Client-side image processing engine for GNC Hero Background & Media assets
// Features: Auto-scaling, 16:9 clamping, WebP conversion, perceptual compression, and byte analytics

/**
 * Format bytes to readable string (e.g. 245.5 KB, 2.4 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Calculate optimal dimensions keeping aspect ratio within max bounds
 */
export function calculateOptimalDimensions(srcWidth, srcHeight, maxWidth = 1920, maxHeight = 1080) {
  if (srcWidth <= 0 || srcHeight <= 0) {
    return { width: maxWidth, height: maxHeight };
  }

  let width = srcWidth;
  let height = srcHeight;

  // Scale down if either dimension exceeds max
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  // Ensure even dimensions for standard video/canvas codecs
  width = width % 2 === 0 ? width : width - 1;
  height = height % 2 === 0 ? height : height - 1;

  return { width, height };
}

/**
 * Process any image file (JPG, PNG, WEBP, AVIF, etc.) entirely client-side:
 * - Reads file via FileReader / ObjectURL
 * - Auto scales down to maximum 1920x1080 maintaining aspect ratio
 * - Draws onto HTML5 Canvas with smooth bicubic interpolation
 * - Converts to WebP format with configured quality (default 0.85)
 * - Returns blob, dataUrl, and compression analytics
 */
export async function processHeroImage(file, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85,
    format = 'image/webp'
  } = options;

  if (!file) {
    throw new Error('No image file provided for processing.');
  }

  const originalSize = file.size || 0;
  const originalName = file.name || 'image';
  const originalType = file.type || 'image/jpeg';

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const srcWidth = img.naturalWidth || img.width;
      const srcHeight = img.naturalHeight || img.height;

      const { width: targetWidth, height: targetHeight } = calculateOptimalDimensions(
        srcWidth,
        srcHeight,
        maxWidth,
        maxHeight
      );

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to obtain 2D canvas context for image processing.'));
        return;
      }

      // High-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw and scale image
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Determine export MIME type with graceful fallback
      let outputMime = format;
      // Check if browser supports WebP canvas export
      try {
        const testData = canvas.toDataURL(format);
        if (!testData.startsWith(`data:${format}`)) {
          outputMime = 'image/jpeg'; // Fallback if browser can't encode webp
        }
      } catch (_) {
        outputMime = 'image/jpeg';
      }

      // Export as Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // Fallback via data URL if toBlob fails
            const dataUrl = canvas.toDataURL(outputMime, quality);
            const compressedSize = Math.round((dataUrl.length * 3) / 4);
            const reductionRatio = originalSize > 0
              ? Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))
              : 0;

            resolve({
              blob: null,
              dataUrl,
              originalSize,
              compressedSize,
              reductionRatio,
              width: targetWidth,
              height: targetHeight,
              mimeType: outputMime,
              originalName,
              originalType,
              formattedOriginal: formatBytes(originalSize),
              formattedCompressed: formatBytes(compressedSize)
            });
            return;
          }

          const compressedSize = blob.size;
          const reductionRatio = originalSize > 0
            ? Math.max(0, Math.round((1 - compressedSize / originalSize) * 100))
            : 0;

          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              blob,
              dataUrl: reader.result,
              originalSize,
              compressedSize,
              reductionRatio,
              width: targetWidth,
              height: targetHeight,
              mimeType: blob.type || outputMime,
              originalName,
              originalType,
              formattedOriginal: formatBytes(originalSize),
              formattedCompressed: formatBytes(compressedSize)
            });
          };
          reader.onerror = () => {
            resolve({
              blob,
              dataUrl: canvas.toDataURL(outputMime, quality),
              originalSize,
              compressedSize,
              reductionRatio,
              width: targetWidth,
              height: targetHeight,
              mimeType: blob.type || outputMime,
              originalName,
              originalType,
              formattedOriginal: formatBytes(originalSize),
              formattedCompressed: formatBytes(compressedSize)
            });
          };
          reader.readAsDataURL(blob);
        },
        outputMime,
        quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image file into browser memory.'));
    };

    img.src = objectUrl;
  });
}
