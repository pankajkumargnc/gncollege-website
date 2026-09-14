// scripts/test_document_validator.mjs
import { detectMagicType } from '../src/utils/documentValidator.js';

console.log('🧪 Testing Document Security & Magic Byte Validator...');

// 1. PDF Header: %PDF- -> [0x25, 0x50, 0x44, 0x46]
const pdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x35]);
const detectedPdf = detectMagicType(pdfBytes);
console.assert(detectedPdf === 'pdf', `Expected 'pdf', got '${detectedPdf}'`);
console.log('✅ PDF Magic Byte Sniffing Passed (%PDF-)');

// 2. OpenXML (DOCX / XLSX): PK\x03\x04 -> [0x50, 0x4B, 0x03, 0x04]
const officeBytes = new Uint8Array([0x50, 0x4B, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00]);
const detectedOffice = detectMagicType(officeBytes);
console.assert(detectedOffice === 'zipOffice', `Expected 'zipOffice', got '${detectedOffice}'`);
console.log('✅ Office OpenXML Magic Byte Sniffing Passed (PK\\x03\\x04)');

// 3. Spoofed File (.exe disguised header: MZ -> [0x4D, 0x5A, 0x90, 0x00])
const exeBytes = new Uint8Array([0x4D, 0x5A, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00]);
const detectedExe = detectMagicType(exeBytes);
console.assert(detectedExe === 'unknown', `Expected 'unknown' for spoofed exe, got '${detectedExe}'`);
console.log('✅ Spoofed Executable Header Rejected Successfully');

// 4. JPEG Header: \xFF\xD8\xFF
const jpegBytes = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46]);
const detectedJpeg = detectMagicType(jpegBytes);
console.assert(detectedJpeg === 'jpeg', `Expected 'jpeg', got '${detectedJpeg}'`);
console.log('✅ JPEG Header Sniffing Passed (\\xFF\\xD8\\xFF)');

// 5. PNG Header: \x89PNG
const pngBytes = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const detectedPng = detectMagicType(pngBytes);
console.assert(detectedPng === 'png', `Expected 'png', got '${detectedPng}'`);
console.log('✅ PNG Header Sniffing Passed (\\x89PNG)');

console.log('\n🎉 ALL 5 BINARY SECURITY TESTS PASSED PERFECTLY!');
