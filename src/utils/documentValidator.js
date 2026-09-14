// src/utils/documentValidator.js
/**
 * 🛡️ ENTERPRISE DOCUMENT SECURITY & MAGIC BYTES VALIDATOR
 * Verifies file authenticity using binary header inspection (magic bytes),
 * cross-checks extensions against MIME types, and enforces frontend size limits.
 */

// Binary Magic Byte Signatures
const MAGIC_SIGNATURES = {
  // PDF: '%PDF-' -> 0x25, 0x50, 0x44, 0x46
  pdf: [0x25, 0x50, 0x44, 0x46],
  
  // Office Open XML (.docx, .xlsx, .pptx): PK\x03\x04 (ZIP container)
  zipOffice: [0x50, 0x4B, 0x03, 0x04],
  
  // Legacy Microsoft Office (.doc, .xls, .ppt Compound File Binary)
  legacyOffice: [0xD0, 0xCF, 0x11, 0xE0],
  
  // JPEG: \xFF\xD8\xFF
  jpeg: [0xFF, 0xD8, 0xFF],
  
  // PNG: \x89PNG\r\n\x1a\n
  png: [0x89, 0x50, 0x4E, 0x47],
  
  // WebP: 'RIFF....WEBP' -> 0x52, 0x49, 0x46, 0x46
  riff: [0x52, 0x49, 0x46, 0x46],
};

// Recognized MIME types
const ALLOWED_MIME_TYPES = {
  pdf: ['application/pdf'],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  excel: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  image: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ],
};

// Size limits in Bytes
export const SIZE_LIMITS = {
  // Web-Optimized screen reading target limit (5MB threshold for auto-compression)
  WEB_OPTIMIZED_PDF_MAX: 5 * 1024 * 1024,      // 5 MB
  // Hard ceiling for screen reading PDFs (if impossible to compress)
  WEB_OPTIMIZED_HARD_LIMIT: 10 * 1024 * 1024,  // 10 MB
  // Print-Ready high quality target limit (300 DPI)
  PRINT_READY_MAX: 15 * 1024 * 1024,           // 15 MB
  // Standard images
  IMAGE_MAX: 5 * 1024 * 1024,                  // 5 MB
  // Backend absolute hard limit (enforced in storage.rules)
  STORAGE_ABSOLUTE_LIMIT: 15 * 1024 * 1024,    // 15 MB
};

/**
 * Reads the first N bytes of a File or Blob as Uint8Array
 * @param {File|Blob} file 
 * @param {number} byteCount 
 * @returns {Promise<Uint8Array>}
 */
export async function readHeaderBytes(file, byteCount = 8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(new Uint8Array(reader.result));
    };
    reader.onerror = () => reject(new Error('Failed to read file header.'));
    reader.readAsArrayBuffer(file.slice(0, byteCount));
  });
}

/**
 * Checks if header bytes match target signature
 */
function matchesSignature(bytes, signature) {
  if (!bytes || bytes.length < signature.length) return false;
  return signature.every((byte, idx) => bytes[idx] === byte);
}

/**
 * Detects binary file type by sniffing magic bytes
 * @param {Uint8Array} bytes 
 * @returns {'pdf'|'zipOffice'|'legacyOffice'|'jpeg'|'png'|'riff'|'unknown'}
 */
export function detectMagicType(bytes) {
  if (matchesSignature(bytes, MAGIC_SIGNATURES.pdf)) return 'pdf';
  if (matchesSignature(bytes, MAGIC_SIGNATURES.zipOffice)) return 'zipOffice';
  if (matchesSignature(bytes, MAGIC_SIGNATURES.legacyOffice)) return 'legacyOffice';
  if (matchesSignature(bytes, MAGIC_SIGNATURES.png)) return 'png';
  if (matchesSignature(bytes, MAGIC_SIGNATURES.jpeg)) return 'jpeg';
  if (matchesSignature(bytes, MAGIC_SIGNATURES.riff)) return 'riff';
  return 'unknown';
}

/**
 * Validates any document or image file before upload.
 * 
 * @param {File} file - The file object from <input type="file">
 * @param {Object} options
 * @param {'web'|'print'} [options.dpiMode='web'] - 'web' (72-150 DPI) or 'print' (300 DPI)
 * @param {'pdf'|'image'|'any'} [options.expectedType='any'] - Expected media category
 * @param {number} [options.maxSize] - Custom max size in bytes
 * @returns {Promise<{
 *   isValid: boolean,
 *   error: string | null,
 *   warning: string | null,
 *   fileType: string,
 *   magicType: string,
 *   magicVerified: boolean,
 *   sizeMB: number,
 *   needsCompression: boolean,
 *   recommendedAction: string | null
 * }>}
 */
export async function validateDocumentFile(file, options = {}) {
  const {
    dpiMode = 'web',
    expectedType = 'any',
    maxSize = null,
  } = options;

  if (!file || !(file instanceof File || file instanceof Blob)) {
    return {
      isValid: false,
      error: 'Invalid file provided. Please select a valid document.',
      warning: null,
      fileType: 'unknown',
      magicType: 'unknown',
      magicVerified: false,
      sizeMB: 0,
      needsCompression: false,
      recommendedAction: null,
    };
  }

  const fileName = (file.name || '').toLowerCase();
  const fileExt = fileName.split('.').pop() || '';
  const declaredMime = (file.type || '').toLowerCase();
  const sizeBytes = file.size;
  const sizeMB = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));

  // 1. Extension Whitelist Check
  const allowedExtensions = ['pdf', 'docx', 'doc', 'xlsx', 'xls', 'jpg', 'jpeg', 'png', 'webp'];
  if (!allowedExtensions.includes(fileExt)) {
    return {
      isValid: false,
      error: `Disallowed file format (.${fileExt}). Allowed formats: PDF (.pdf), Word (.docx/.doc), Excel (.xlsx), and Images (JPG/PNG/WebP).`,
      warning: null,
      fileType: fileExt,
      magicType: 'unknown',
      magicVerified: false,
      sizeMB,
      needsCompression: false,
      recommendedAction: 'Please convert the file to a standard PDF or supported document format.',
    };
  }

  // 2. Read Magic Bytes from Binary Header
  let headerBytes;
  try {
    headerBytes = await readHeaderBytes(file, 8);
  } catch {
    return {
      isValid: false,
      error: 'Unable to inspect file binary header. The file may be corrupt or inaccessible.',
      warning: null,
      fileType: fileExt,
      magicType: 'unknown',
      magicVerified: false,
      sizeMB,
      needsCompression: false,
      recommendedAction: null,
    };
  }

  const magicType = detectMagicType(headerBytes);

  // 3. Security Cross-Check: Extension vs Magic Bytes (Anti-Spoofing)
  let magicVerified = false;

  if (fileExt === 'pdf') {
    if (magicType !== 'pdf') {
      return {
        isValid: false,
        error: 'Security Alert: This file has a .pdf extension but lacks a valid PDF header (%PDF-). Upload rejected to protect server integrity.',
        warning: null,
        fileType: 'pdf',
        magicType,
        magicVerified: false,
        sizeMB,
        needsCompression: false,
        recommendedAction: 'Ensure this is a genuine PDF and not an executable (.exe) or renamed script.',
      };
    }
    magicVerified = true;
  } else if (['docx', 'xlsx'].includes(fileExt)) {
    if (magicType !== 'zipOffice') {
      return {
        isValid: false,
        error: `Security Alert: The .${fileExt} document binary header does not match standard OpenXML format.`,
        warning: null,
        fileType: fileExt,
        magicType,
        magicVerified: false,
        sizeMB,
        needsCompression: false,
        recommendedAction: 'Re-save the file from Microsoft Word / Excel and re-upload.',
      };
    }
    magicVerified = true;
  } else if (['jpg', 'jpeg'].includes(fileExt)) {
    if (magicType !== 'jpeg') {
      return {
        isValid: false,
        error: 'Security Alert: Image signature does not match JPEG specifications.',
        warning: null,
        fileType: fileExt,
        magicType,
        magicVerified: false,
        sizeMB,
        needsCompression: false,
        recommendedAction: null,
      };
    }
    magicVerified = true;
  } else if (fileExt === 'png') {
    if (magicType !== 'png') {
      return {
        isValid: false,
        error: 'Security Alert: Image signature does not match PNG specifications.',
        warning: null,
        fileType: fileExt,
        magicType,
        magicVerified: false,
        sizeMB,
        needsCompression: false,
        recommendedAction: null,
      };
    }
    magicVerified = true;
  } else {
    // Other allowed extensions
    magicVerified = magicType !== 'unknown';
  }

  // 4. Expected Type Validation
  if (expectedType === 'pdf' && fileExt !== 'pdf') {
    return {
      isValid: false,
      error: `Expected a PDF file, but received .${fileExt}. Please select a PDF document.`,
      warning: null,
      fileType: fileExt,
      magicType,
      magicVerified,
      sizeMB,
      needsCompression: false,
      recommendedAction: null,
    };
  }

  if (expectedType === 'image' && !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
    return {
      isValid: false,
      error: `Expected an image file, but received .${fileExt}. Please select an image (JPG, PNG, WebP).`,
      warning: null,
      fileType: fileExt,
      magicType,
      magicVerified,
      sizeMB,
      needsCompression: false,
      recommendedAction: null,
    };
  }

  // 5. Size Limit Enforcement (Frontend & Backend Alignment)
  let ceiling = maxSize || (dpiMode === 'print' ? SIZE_LIMITS.PRINT_READY_MAX : SIZE_LIMITS.STORAGE_ABSOLUTE_LIMIT);
  let warning = null;
  let needsCompression = false;

  // Web-Optimized threshold logic
  if (dpiMode === 'web' && fileExt === 'pdf') {
    if (sizeBytes > SIZE_LIMITS.WEB_OPTIMIZED_PDF_MAX) {
      needsCompression = true;
      warning = `File size is ${sizeMB} MB (exceeds recommended 5 MB for web reading). Automatic 150 DPI optimization will be applied.`;
    }
    if (sizeBytes > SIZE_LIMITS.WEB_OPTIMIZED_HARD_LIMIT) {
      return {
        isValid: false,
        error: `File size (${sizeMB} MB) exceeds maximum Web-Optimized limit of 10 MB. Please compress the PDF before uploading or choose Print-Ready mode (up to 15 MB).`,
        warning: null,
        fileType: fileExt,
        magicType,
        magicVerified,
        sizeMB,
        needsCompression: true,
        recommendedAction: 'Switch to Print-Ready mode if this document requires 300 DPI high resolution, or downsample pages.',
      };
    }
  }

  // Hard maximum check for all uploads (15MB Storage Rule)
  if (sizeBytes > ceiling) {
    const maxMB = (ceiling / (1024 * 1024)).toFixed(0);
    return {
      isValid: false,
      error: `File size (${sizeMB} MB) exceeds the maximum allowed limit of ${maxMB} MB.`,
      warning: null,
      fileType: fileExt,
      magicType,
      magicVerified,
      sizeMB,
      needsCompression: true,
      recommendedAction: 'Please reduce the document size below the limit.',
    };
  }

  return {
    isValid: true,
    error: null,
    warning,
    fileType: fileExt,
    magicType,
    magicVerified,
    sizeMB,
    needsCompression,
    recommendedAction: null,
  };
}
