# Enterprise PDF Optimization & Compression Microservice Architecture

## 1. Executive Summary

Guru Nanak College's document infrastructure employs a **defense-in-depth, two-tier optimization strategy**:

1. **Client-Side Tier (Active in Browser)**:
   - Integrated directly into the Admin Panel via [`src/utils/documentValidator.js`](file:///d:/New%20folder/Working/gnc-college/gnc-college/src/utils/documentValidator.js), [`src/utils/pdfOptimizer.js`](file:///d:/New%20folder/Working/gnc-college/gnc-college/src/utils/pdfOptimizer.js), and [`src/components/MediaPicker.jsx`](file:///d:/New%20folder/Working/gnc-college/gnc-college/src/components/MediaPicker.jsx).
   - Validates file authenticity via binary magic bytes (`%PDF-`, `PK\x03\x04`).
   - Empowers administrators to select between **Web-Optimized (72–150 DPI)** and **Print-Ready (300 DPI)**.
   - Pre-compresses documents before uploading, saving network bandwidth and storage costs with zero server infrastructure overhead.

2. **Backend Serverless Tier (Cloud Microservice)**:
   - Optional, enterprise-grade automated trigger executing Ghostscript or Spatie PDF Optimizer in a containerized environment (Google Cloud Run / Firebase Cloud Functions) whenever large files are deposited into `documents/`.

---

## 2. DPI Profiles & Compression Standards

| Mode | Target DPI | Primary Use Case | Target Size | Quality Level |
| :--- | :--- | :--- | :--- | :--- |
| **Web-Optimized** | **72 – 150 DPI** | Circulars, notices, e-magazines, syllabus, brochures | < 1.5 MB | Fast mobile delivery, screen reading |
| **Print-Ready** | **300 DPI** | Admit cards, certificates, mark sheets, legal documents | < 15 MB | Crisp vector paths, high-fidelity print |

---

## 3. Ghostscript Engine Specification

Ghostscript (`gs`) is the industry benchmark for postscript and PDF downsampling.

### 3.1 Ghostscript CLI Commands

#### Mode A: Web-Optimized (150 DPI - Screen Reading)
```bash
gs -sDEVICE=pdfwrite \
   -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook \
   -r150 \
   -dColorImageResolution=150 \
   -dGrayImageResolution=150 \
   -dMonoImageResolution=150 \
   -dDownsampleColorImages=true \
   -dAutoRotatePages=/None \
   -dNOPAUSE \
   -dQUIET \
   -dBATCH \
   -sOutputFile="output_150dpi.pdf" "input.pdf"
```

#### Mode B: Print-Ready (300 DPI - High Quality)
```bash
gs -sDEVICE=pdfwrite \
   -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/printer \
   -r300 \
   -dColorImageResolution=300 \
   -dGrayImageResolution=300 \
   -dMonoImageResolution=300 \
   -dDownsampleColorImages=true \
   -dAutoRotatePages=/None \
   -dNOPAUSE \
   -dQUIET \
   -dBATCH \
   -sOutputFile="output_300dpi.pdf" "input.pdf"
```

---

## 4. Google Cloud Run / Firebase Cloud Function Worker

### 4.1 Dockerfile (Containerized Ghostscript Microservice)
```dockerfile
FROM node:20-alpine

# Install Ghostscript and Poppler utilities
RUN apk update && apk add --no-cache ghostscript poppler-utils qpdf

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .
EXPOSE 8080

CMD ["node", "server.js"]
```

### 4.2 Node.js Express Controller (`server.js`)
```javascript
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const upload = multer({ dest: '/tmp/uploads/' });

app.post('/optimize', upload.single('file'), (req, res) => {
  const { dpi = '150' } = req.body;
  const inputPath = req.file.path;
  const outputPath = `/tmp/opt_${Date.now()}.pdf`;

  const pdfSetting = dpi === '300' ? '/printer' : '/ebook';
  const cmd = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${pdfSetting} -r${dpi} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

  exec(cmd, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Ghostscript compression failed', details: err.message });
    }

    res.download(outputPath, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(8080, () => console.log('Ghostscript microservice running on port 8080'));
```

---

## 5. Spatie PDF Optimizer (PHP) Integration

If deploying on an Apache/cPanel server with PHP 8.1+:

### 5.1 Installation
```bash
composer require spatie/pdf-optimizer
```

### 5.2 Implementation
```php
<?php
require 'vendor/autoload.php';

use Spatie\PdfOptimizer\PdfOptimizerFactory;

$optimizer = PdfOptimizerFactory::create();

// Optimizes in-place using Ghostscript under the hood
$optimizer->optimize('uploaded_document.pdf');
```

---

## 6. Python PDF Processing & Batch Tooling

The companion Python script [`scripts/optimize_pdf.py`](file:///d:/New%20folder/Working/gnc-college/gnc-college/scripts/optimize_pdf.py) is provided for batch verification, text/table inspection, and administrative watermarking:

```bash
# Verify magic bytes and inspect PDF structure
python scripts/optimize_pdf.py inspect document.pdf

# Recompress or downsample with pypdf / ghostscript
python scripts/optimize_pdf.py optimize document.pdf --dpi 150 --out web_doc.pdf

# Watermark document with college seal
python scripts/optimize_pdf.py watermark document.pdf --seal seal.pdf --out stamped.pdf
```
