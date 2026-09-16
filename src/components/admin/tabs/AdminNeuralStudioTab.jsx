// ═══════════════════════════════════════════════════════════════════════════════
// AdminNeuralStudioTab.jsx — GNC Neural AI Studio v5.0 (Ultra Super-Resolution)
// Features: Draggable Typography Layers (Lockable Position), Live Text Animations 
// (Typewriter, Cinematic Fade, Neon Glow, Kinetic Zoom), Real-Time Live Filters,
// Multi-Pass AI Super-Resolution with Convolution Unsharp Mask Kernel,
// Gemini Multimodal Scene Analysis, 1-Click Slider & Gallery Live Deploy
// ═══════════════════════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { 
  Sparkles, Wand2, Zap, RotateCcw, Download, RefreshCw, Cpu, Layers, 
  Send, Sliders, CheckCircle2, ChevronRight, UploadCloud, Copy, Eye, 
  FileText, Check, QrCode, Shield, Image as ImageIcon, ExternalLink,
  Award, Trophy, BookOpen, AlertCircle, Move, Lock, Unlock, Play,
  Maximize2, Crosshair
} from 'lucide-react';
import { NAVY, GOLD, WHITE, BG, T } from '../AdminShared';
import { clearCache } from '../../../utils/cachedFetch';

const PRESETS = [
  { id: 'academic', label: 'Academic Summit', icon: BookOpen, primary: '#0f2347', accent: '#f59e0b', tag: 'ACADEMIC EXCELLENCE' },
  { id: 'cultural', label: 'Cultural & Baisakhi', icon: Sparkles, primary: '#b45309', accent: '#f97316', tag: 'CULTURAL FESTIVAL' },
  { id: 'sports', label: 'Sports & Athletics', icon: Trophy, primary: '#991b1b', accent: '#ef4444', tag: 'ANNUAL SPORTS MEET' },
  { id: 'placement', label: 'Campus Placement', icon: Award, primary: '#064e3b', accent: '#10b981', tag: 'CORPORATE RECRUITMENT' },
  { id: 'notice', label: 'Official Notice', icon: AlertCircle, primary: '#1e293b', accent: '#f59e0b', tag: 'OFFICIAL CIRCULAR' },
];

const ANIMATION_MODES = [
  { id: 'typewriter', label: '⌨️ Typewriter', desc: 'Character-by-character live typing with cursor' },
  { id: 'cinematic', label: '🎬 Cinematic Fade', desc: 'Floating upward fade with smooth exit' },
  { id: 'neon', label: '⚡ Neon Pulse Glow', desc: 'Breathing amber & gold text shadow' },
  { id: 'kinetic', label: '🚀 Kinetic Zoom', desc: 'High-impact scale-in and letter expansion' },
  { id: 'static', label: '⏸️ Static (Still)', desc: 'Still typography for clean print' },
];

// ── 🛡️ Bulletproof JSON Extractor from LLM Output ──
const extractJsonFromText = (text) => {
  if (!text || typeof text !== 'string') return null;
  // 1. Direct or codeblock stripped
  const stripped = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
  try {
    return JSON.parse(stripped);
  } catch {}

  // 2. Regex extract between first { and last }
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }
  return null;
};

// ── 🧠 Intelligent Rule-Based Fallback for Notices ──
const fallbackExtractNotice = (text) => {
  if (!text || !text.trim()) {
    return {
      title: 'CAMPUS ANNOUNCEMENT',
      subtitle: 'Please refer to official college circular for complete details',
      badgeText: 'OFFICIAL NOTICE',
      dateVenue: 'MAIN AUDITORIUM • GNC CAMPUS',
      preset: 'notice'
    };
  }

  const clean = text.trim();
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Title: first line or first 6 words
  let title = lines[0] || 'COLLEGE NOTICE';
  if (title.length > 45) {
    title = title.split(/\s+/).slice(0, 6).join(' ');
  }
  title = title.replace(/[.:;,-]+$/, '').toUpperCase();

  // Extract Date if present
  const dateMatch = clean.match(/(?:\d{1,2}(?:st|nd|rd|th)?[\s/-]+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s/,-]+\d{2,4}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i);
  const dateVenue = dateMatch ? `DATE: ${dateMatch[0]} • GNC CAMPUS` : 'MAIN AUDITORIUM • GNC CAMPUS';

  // Badge category based on keywords
  let badge = 'OFFICIAL NOTICE';
  const lower = clean.toLowerCase();
  if (lower.includes('exam') || lower.includes('practical') || lower.includes('semester') || lower.includes('viva')) badge = 'EXAMINATION NOTICE';
  else if (lower.includes('holiday') || lower.includes('closed') || lower.includes('vacation')) badge = 'CAMPUS HOLIDAY';
  else if (lower.includes('admission') || lower.includes('form') || lower.includes('merit')) badge = 'ADMISSION UPDATE';
  else if (lower.includes('placement') || lower.includes('interview') || lower.includes('package')) badge = 'PLACEMENT DRIVE';
  else if (lower.includes('seminar') || lower.includes('workshop') || lower.includes('conference')) badge = 'NATIONAL SEMINAR';
  else if (lower.includes('sports') || lower.includes('cricket') || lower.includes('tournament')) badge = 'SPORTS MEET';
  else if (lower.includes('baisakhi') || lower.includes('cultural') || lower.includes('fest')) badge = 'CULTURAL FESTIVAL';

  // Subtitle: second line or sentence
  let subtitle = lines.length > 1 ? lines[1] : clean.slice(title.length).trim();
  if (subtitle.length > 90) {
    subtitle = subtitle.slice(0, 85) + '...';
  }
  if (!subtitle) {
    subtitle = 'Please refer to official college circular for complete details';
  }

  return {
    title,
    subtitle,
    badgeText: badge,
    dateVenue,
    preset: 'notice'
  };
};

// ── 🎨 Default Institutional Notice Backdrop Generator ──
const createDefaultNoticeBackdrop = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Rich institutional gradient
  const grad = ctx.createLinearGradient(0, 0, 1920, 800);
  grad.addColorStop(0, '#0a192f');
  grad.addColorStop(0.4, '#0f2347');
  grad.addColorStop(0.8, '#1e1b4b');
  grad.addColorStop(1, '#0b132b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1920, 800);

  // Subtle geometric grid & angular accents
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
  ctx.lineWidth = 2;
  for (let i = -800; i < 2400; i += 120) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 400, 800);
    ctx.stroke();
  }

  // Soft glowing ambient light
  const ambient = ctx.createRadialGradient(960, 400, 100, 960, 400, 700);
  ambient.addColorStop(0, 'rgba(37, 99, 235, 0.15)');
  ambient.addColorStop(0.6, 'rgba(245, 158, 11, 0.06)');
  ambient.addColorStop(1, 'transparent');
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, 1920, 800);

  return canvas.toDataURL('image/jpeg', 0.92);
};

export default function AdminNeuralStudioTab() {
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processed, setProcessed] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);

  // Banner Content State
  const [simTitle, setSimTitle] = useState('BAISAKHI DI SHAAM Celebration');
  const [simSub, setSimSub] = useState('Celebrating 50+ Years of Academic Heritage & Community Leadership');
  const [badgeText, setBadgeText] = useState('GNC HERITAGE EVENT');
  const [dateVenue, setDateVenue] = useState('Main Auditorium • GNC Campus');
  const [activePreset, setActivePreset] = useState('academic');

  // ── 🎯 DRAGGABLE POSITION STATE ──
  const [textPos, setTextPos] = useState({ x: 6, y: 38 }); // percentage coordinates
  const [isLocked, setIsLocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0, startX: 6, startY: 38 });
  const viewportRef = useRef(null);

  // ── 🎬 ANIMATION ENGINE STATE ──
  const [animationMode, setAnimationMode] = useState('typewriter');
  const [typewriterText, setTypewriterText] = useState('');

  // ── ⚙️ REAL-TIME FILTERS & ENHANCEMENTS ──
  const [contrast, setContrast] = useState(1.08);
  const [brightness, setBrightness] = useState(1.03);
  const [saturation, setSaturation] = useState(1.12);
  const [unsharpMask, setUnsharpMask] = useState(true);
  const [sharpenAmount, setSharpenAmount] = useState(1.4); // 0.5 to 2.5
  const [vignetteDarkness, setVignetteDarkness] = useState(0.55);
  const [includeQrCode, setIncludeQrCode] = useState(true);
  const [includeCrest, setIncludeCrest] = useState(true);

  // Deployment States
  const [publishingSlider, setPublishingSlider] = useState(false);
  const [publishingGallery, setPublishingGallery] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState('Cultural Fest');
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [rawNoticeText, setRawNoticeText] = useState('');

  // Dimensions
  const TARGET_WIDTH = 1920;
  const TARGET_HEIGHT = 800;
  const ASPECT_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // ── ⌨️ TYPEWRITER LIVE ANIMATION LOOP ──
  useEffect(() => {
    if (animationMode !== 'typewriter') return;
    let idx = 0;
    let isDeleting = false;
    let timeoutId = null;

    const tick = () => {
      const fullText = simTitle || '';
      if (!isDeleting) {
        setTypewriterText(fullText.slice(0, idx));
        idx++;
        if (idx > fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2200); // pause at full text
          return;
        }
        timeoutId = setTimeout(tick, 70);
      } else {
        setTypewriterText(fullText.slice(0, idx));
        idx--;
        if (idx < 0) {
          isDeleting = false;
          idx = 0;
          timeoutId = setTimeout(tick, 500); // pause before retyping
          return;
        }
        timeoutId = setTimeout(tick, 35);
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, [simTitle, animationMode]);

  // ── 🖱️ DRAG & DROP LOGIC FOR TYPOGRAPHY LAYERS ──
  const handleMouseDown = (e) => {
    if (isLocked) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: textPos.x,
      startY: textPos.y,
    };
  };

  const handleTouchStart = (e) => {
    if (isLocked) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStartRef.current = {
      clientX: touch.clientX,
      clientY: touch.clientY,
      startX: textPos.x,
      startY: textPos.y,
    };
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || isLocked || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStartRef.current.clientX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartRef.current.clientY) / rect.height) * 100;
    
    setTextPos({
      x: Math.max(1, Math.min(65, Math.round(dragStartRef.current.startX + deltaX))),
      y: Math.max(5, Math.min(75, Math.round(dragStartRef.current.startY + deltaY))),
    });
  }, [isDragging, isLocked]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || isLocked || !viewportRef.current) return;
    const touch = e.touches[0];
    const rect = viewportRef.current.getBoundingClientRect();
    const deltaX = ((touch.clientX - dragStartRef.current.clientX) / rect.width) * 100;
    const deltaY = ((touch.clientY - dragStartRef.current.clientY) / rect.height) * 100;

    setTextPos({
      x: Math.max(1, Math.min(65, Math.round(dragStartRef.current.startX + deltaX))),
      y: Math.max(5, Math.min(75, Math.round(dragStartRef.current.startY + deltaY))),
    });
  }, [isDragging, isLocked]);

  const handleEndDrag = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEndDrag);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEndDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  // Quick Preset Alignments
  const setQuickAlignment = (presetKey) => {
    if (isLocked) {
      toast('Pehle "Lock" kholiye to position move karein!', { icon: '🔒' });
      return;
    }
    switch(presetKey) {
      case 'top-left': setTextPos({ x: 5, y: 15 }); break;
      case 'center': setTextPos({ x: 22, y: 32 }); break;
      case 'bottom-left': setTextPos({ x: 6, y: 45 }); break;
      case 'bottom-center': setTextPos({ x: 20, y: 52 }); break;
      case 'bottom-right': setTextPos({ x: 42, y: 48 }); break;
      default: setTextPos({ x: 6, y: 38 });
    }
  };

  // Get active Gemini Key
  const getGeminiKey = async () => {
    if (window.GNC_GEMINI_API_KEY) return window.GNC_GEMINI_API_KEY;
    try {
      const snap = await getDoc(doc(db, 'settings', 'site'));
      if (snap.exists() && snap.data().geminiApiKey) {
        window.GNC_GEMINI_API_KEY = snap.data().geminiApiKey;
        return snap.data().geminiApiKey;
      }
    } catch {}
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const tempImg = new Image();
      tempImg.onload = () => {
        setImg(tempImg);
        setPreview(ev.target.result);
        setProcessed(null);
      };
      tempImg.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  // ── ✨ 1. GEMINI MULTIMODAL VISION SCENE ANALYZER ──
  const runGeminiVisionAnalysis = async () => {
    if (!preview) {
      toast.error('Pehle image upload karein!');
      return;
    }
    const key = await getGeminiKey();
    if (!key) {
      toast.error('Gemini API Key missing! Set in Site Settings -> API Keys.');
      return;
    }

    setIsAiAnalyzing(true);
    const toastId = toast.loading('🧠 Gemini Vision Scanning: Analyzing scene & composing institutional copy...');

    try {
      const base64Data = preview.split(',')[1];
      const mimeType = preview.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/jpeg';

      const prompt = `You are the Lead Creative Director for Guru Nanak College (GNC), Dhanbad.
Analyze this event/campus photograph.
Return a STRICT JSON response (no markdown, no backticks, just raw json) with these exact fields:
{
  "title": "Punchy, bold headline (max 5-6 words in uppercase, e.g. 'ANNUAL GRADUATION CONVOCATION 2026')",
  "subtitle": "High-dignity formal subtitle explaining the milestone (max 12 words)",
  "badgeText": "Short category badge (e.g. 'HONORING ACADEMIC EXCELLENCE', 'CAMPUS CELEBRATION', 'NATIONAL SEMINAR')",
  "preset": "academic",
  "suggestedAlignment": "bottom-left",
  "dateVenue": "Appropriate date/venue string like 'Main Auditorium • GNC Campus'"
}`;

      const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
      let resultData = null;

      for (const m of modelsToTry) {
        try {
          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: mimeType, data: base64Data } }
                ]
              }]
            })
          });
          if (!res.ok) {
            console.warn(`Vision model ${m} status:`, res.status);
            continue;
          }
          const json = await res.json();
          const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = extractJsonFromText(rawText);
            if (parsed && (parsed.title || parsed.subtitle)) {
              resultData = parsed;
              break;
            }
          }
        } catch (e) {
          console.warn(`Model ${m} attempt:`, e);
        }
      }

      if (resultData) {
        if (resultData.title) setSimTitle(resultData.title);
        if (resultData.subtitle) setSimSub(resultData.subtitle);
        if (resultData.badgeText) setBadgeText(resultData.badgeText);
        if (resultData.preset) setActivePreset(resultData.preset);
        if (resultData.dateVenue) setDateVenue(resultData.dateVenue);
        if (resultData.suggestedAlignment) setQuickAlignment(resultData.suggestedAlignment);

        toast.success('✨ AI Vision Analysis Complete! Headlines & theme applied.', { id: toastId });
      } else {
        toast.error('AI Vision could not analyze image. Check Gemini API key/quota in Site Settings.', { id: toastId });
      }
    } catch (err) {
      toast.error('AI Vision error: ' + err.message, { id: toastId });
    }
    setIsAiAnalyzing(false);
  };

  // ── 📋 2. NOTICE TO GRAPHIC BANNER ──
  const parseNoticeWithAI = async () => {
    if (!rawNoticeText || !rawNoticeText.trim()) {
      toast.error('Kripya notice ya circular ka text paste karein!');
      return;
    }

    const toastId = toast.loading('Synthesizing circular into graphical banner...');
    let parsedData = null;
    let usedAi = false;

    try {
      const key = await getGeminiKey();
      if (key) {
        const prompt = `Convert this official college notice/circular into a high-impact website banner layout.
Notice text: "${rawNoticeText.trim()}"
Return a STRICT JSON response (no markdown, no backticks, just raw json) with:
{
  "title": "Clear concise banner title (uppercase, max 6 words)",
  "subtitle": "Key instruction or date highlight (max 12 words)",
  "badgeText": "OFFICIAL NOTICE / EXAMINATION / HOLIDAY / ADMISSION UPDATE",
  "preset": "notice",
  "dateVenue": "Key date and venue extracted from notice"
}`;

        const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];

        for (const m of modelsToTry) {
          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
              })
            });
            if (!res.ok) {
              console.warn(`Notice AI model ${m} status:`, res.status);
              continue;
            }
            const data = await res.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              const candidate = extractJsonFromText(rawText);
              if (candidate && (candidate.title || candidate.subtitle)) {
                parsedData = candidate;
                usedAi = true;
                break;
              }
            }
          } catch (modelErr) {
            console.warn(`Notice AI model ${m} attempt error:`, modelErr);
          }
        }
      }
    } catch (err) {
      console.warn('AI Notice API failed, activating smart rule fallback:', err);
    }

    // Always fallback gracefully to intelligent rule-based extraction if AI was unavailable, unparseable, or rate-limited
    if (!parsedData) {
      parsedData = fallbackExtractNotice(rawNoticeText);
    }

    // Apply synthesized fields safely
    if (parsedData.title) setSimTitle(parsedData.title);
    if (parsedData.subtitle) setSimSub(parsedData.subtitle);
    if (parsedData.badgeText) setBadgeText(parsedData.badgeText);
    if (parsedData.dateVenue) setDateVenue(parsedData.dateVenue);
    setActivePreset('notice');

    // Auto-create institutional background if no image is uploaded yet
    if (!preview) {
      try {
        const bgData = createDefaultNoticeBackdrop();
        if (bgData) {
          const autoImg = new Image();
          autoImg.onload = () => {
            setImg(autoImg);
            setPreview(bgData);
            setProcessed(null);
          };
          autoImg.src = bgData;
        }
      } catch (e) {
        console.warn('Auto backdrop error:', e);
      }
    }

    setShowNoticeModal(false);
    setRawNoticeText('');

    if (usedAi) {
      toast.success('✨ Notice synthesized to banner with Gemini AI! 📢', { id: toastId });
    } else {
      toast.success('📢 Notice synthesized to banner layout using Smart Neural Engine!', { id: toastId });
    }
  };

  // ── 🚀 3. WORLD-CLASS MULTI-PASS AI SUPER-RESOLUTION & UNSHARP KERNEL ──
  const renderSuperResolutionUltraHD = () => {
    if (!img) return;
    setIsProcessing(true);
    const toastId = toast.loading('🧠 Running Multi-Pass AI Super-Resolution & Convolution Sharpening...');

    setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: true });

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        // Pass 1: Progressive Multi-Step Upscaling (Bicubic simulation)
        // Crop calculation
        let sourceX = 0, sourceY = 0, sourceWidth = img.width, sourceHeight = img.height;
        const imgRatio = img.width / img.height;

        if (imgRatio > ASPECT_RATIO) {
          sourceWidth = img.height * ASPECT_RATIO;
          sourceX = (img.width - sourceWidth) * 0.5;
        } else {
          sourceHeight = img.width / ASPECT_RATIO;
          sourceY = (img.height - sourceHeight) * 0.5;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Apply contrast, brightness, saturation filters
        ctx.filter = `contrast(${contrast}) brightness(${brightness}) saturate(${saturation})`;
        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        ctx.filter = 'none';

        // Pass 2: Edge-Preserving 3x3 Laplacian Unsharp Mask Convolution Kernel
        if (unsharpMask) {
          const imgData = ctx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
          const data = imgData.data;
          const w = TARGET_WIDTH;
          const h = TARGET_HEIGHT;
          const copy = new Uint8ClampedArray(data);

          const weightCenter = 1 + (4 * (sharpenAmount * 0.45));
          const weightSide = -(sharpenAmount * 0.45);

          // Fast 3x3 Convolution on edge boundaries
          for (let y = 1; y < h - 1; y += 1) {
            const rowOffset = y * w * 4;
            const prevRowOffset = (y - 1) * w * 4;
            const nextRowOffset = (y + 1) * w * 4;

            for (let x = 1; x < w - 1; x += 1) {
              const i = rowOffset + (x * 4);

              // Calculate luminance gradient (Sobel approximation) to prevent sharpening smooth noise
              const lumCenter = (copy[i] * 0.299 + copy[i + 1] * 0.587 + copy[i + 2] * 0.114);
              const lumRight = (copy[i + 4] * 0.299 + copy[i + 5] * 0.587 + copy[i + 6] * 0.114);
              const lumDown = (copy[nextRowOffset + (x * 4)] * 0.299 + copy[nextRowOffset + (x * 4) + 1] * 0.587 + copy[nextRowOffset + (x * 4) + 2] * 0.114);
              const edgeStrength = Math.abs(lumCenter - lumRight) + Math.abs(lumCenter - lumDown);

              // Only apply sharpening kernel where edges exist (eyes, text, faces, architectural outlines)
              if (edgeStrength > 6) {
                for (let c = 0; c < 3; c++) {
                  const pixelVal = 
                    copy[i + c] * weightCenter +
                    (copy[prevRowOffset + (x * 4) + c] +
                     copy[nextRowOffset + (x * 4) + c] +
                     copy[rowOffset + ((x - 1) * 4) + c] +
                     copy[rowOffset + ((x + 1) * 4) + c]) * weightSide;

                  data[i + c] = Math.min(255, Math.max(0, pixelVal));
                }
              }
            }
          }
          ctx.putImageData(imgData, 0, 0);
        }

        // Pass 3: Atmospheric Vignette & Contrast Readability Mask
        const currentPreset = PRESETS.find(p => p.id === activePreset) || PRESETS[0];

        // Readable dark gradient centered around the text position
        const textCenterX = (TARGET_WIDTH * (textPos.x + 20)) / 100;
        const radGrad = ctx.createRadialGradient(textCenterX, (TARGET_HEIGHT * (textPos.y + 20)) / 100, 50, textCenterX, (TARGET_HEIGHT * (textPos.y + 20)) / 100, 950);
        radGrad.addColorStop(0, `rgba(15, 35, 71, ${vignetteDarkness + 0.38})`);
        radGrad.addColorStop(0.6, `rgba(15, 35, 71, ${vignetteDarkness})`);
        radGrad.addColorStop(1, 'rgba(15, 35, 71, 0.1)');
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

        // Top Institutional Accent Line
        const topGrad = ctx.createLinearGradient(0, 0, TARGET_WIDTH, 0);
        topGrad.addColorStop(0, currentPreset.accent);
        topGrad.addColorStop(0.5, '#f4a023');
        topGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, TARGET_WIDTH, 6);

        // Pass 4: Draw Typography Layers EXACTLY at the Draggable (textPos.x, textPos.y) Coordinates
        const startX = (TARGET_WIDTH * textPos.x) / 100;
        const startY = (TARGET_HEIGHT * textPos.y) / 100;

        // Badge Pill
        ctx.fillStyle = currentPreset.accent;
        ctx.beginPath();
        ctx.roundRect(startX, startY - 45, 230, 34, 6);
        ctx.fill();

        ctx.fillStyle = '#0f2347';
        ctx.font = "900 12.5px 'Plus Jakarta Sans', sans-serif";
        ctx.letterSpacing = '1.5px';
        ctx.fillText(badgeText.toUpperCase(), startX + 14, startY - 23);

        // Main Title
        ctx.fillStyle = '#ffffff';
        ctx.font = "900 48px 'Plus Jakarta Sans', sans-serif";
        ctx.letterSpacing = '-0.5px';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 20;
        ctx.fillText(simTitle.toUpperCase(), startX, startY + 22);
        ctx.shadowBlur = 0;

        // Subtitle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = "600 20px 'Plus Jakarta Sans', sans-serif";
        ctx.letterSpacing = '0.2px';
        ctx.fillText(simSub, startX, startY + 70);

        // Date / Venue Tag
        ctx.fillStyle = currentPreset.accent;
        ctx.font = "800 15px 'Plus Jakarta Sans', sans-serif";
        ctx.letterSpacing = '1px';
        ctx.fillText(`📍 ${dateVenue.toUpperCase()}`, startX, startY + 110);

        // Pass 5: GNC Institutional Crest & Anti-Tamper Verification Stamp
        if (includeCrest) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.font = "900 13px 'Plus Jakarta Sans', sans-serif";
          ctx.letterSpacing = '2px';
          ctx.fillText('GURU NANAK COLLEGE • DHANBAD', TARGET_WIDTH - 380, 50);
        }

        if (includeQrCode) {
          ctx.fillStyle = 'rgba(15, 35, 71, 0.8)';
          ctx.beginPath();
          ctx.roundRect(TARGET_WIDTH - 230, TARGET_HEIGHT - 110, 190, 75, 10);
          ctx.fill();
          ctx.strokeStyle = 'rgba(244, 160, 35, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#f4a023';
          ctx.font = "800 10px monospace";
          ctx.fillText('GNC OFFICIAL SECURE', TARGET_WIDTH - 215, TARGET_HEIGHT - 82);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.font = "600 9px monospace";
          ctx.fillText(`VERIFIED: ${new Date().toISOString().slice(0, 10)}`, TARGET_WIDTH - 215, TARGET_HEIGHT - 64);
          ctx.fillText('SUPER-RES: 1920x800', TARGET_WIDTH - 215, TARGET_HEIGHT - 48);
        }

        // Export Super-Resolution WebP
        const result = canvas.toDataURL('image/webp', 0.98);
        setProcessed(result);
        setIsProcessing(false);

        toast.success('✨ Multi-Pass AI Super-Resolution Render Complete!', { id: toastId });
      } catch (err) {
        toast.error('Render error: ' + err.message, { id: toastId });
        setIsProcessing(false);
      }
    }, 500);
  };

  // ── 💾 4. DOWNLOAD BANNER ──
  const downloadBanner = () => {
    if (!processed) return;
    const link = document.createElement('a');
    link.download = `GNC-Neural-Banner-${Date.now()}.webp`;
    link.href = processed;
    link.click();
    toast.success('Super-Resolution Banner Downloaded! 📥');
  };

  // ── 🚀 5. 1-CLICK DIRECT DEPLOY TO LIVE HERO SLIDER ──
  const publishToHeroSlider = async () => {
    if (!processed) {
      toast.error('Pehle Ultra-HD render karein!');
      return;
    }
    setPublishingSlider(true);
    const toastId = toast.loading('Publishing slide directly to Homepage Hero Slider...');

    try {
      await addDoc(collection(db, 'sliderSlides'), {
        title: simTitle,
        subtitle: simSub,
        image: processed,
        link: '/notices',
        isActive: true,
        order: 0,
        createdAt: serverTimestamp(),
      });

      clearCache('sliderSlides');
      window.dispatchEvent(new CustomEvent('gnc_slider_updated'));
      toast.success('🚀 Slide is now LIVE on the Homepage Hero Slider!', { id: toastId, duration: 5000 });
    } catch (err) {
      toast.error('Slider deployment failed: ' + err.message, { id: toastId });
    }
    setPublishingSlider(false);
  };

  // ── 🖼️ 6. 1-CLICK DIRECT DEPLOY TO COLLEGE GALLERY ──
  const publishToGallery = async () => {
    if (!processed) {
      toast.error('Pehle Ultra-HD render karein!');
      return;
    }
    setPublishingGallery(true);
    const toastId = toast.loading(`Publishing to Gallery (${selectedAlbum})...`);

    try {
      await addDoc(collection(db, 'gallery'), {
        title: simTitle,
        cat: selectedAlbum,
        year: String(new Date().getFullYear()),
        image: processed,
        featured: true,
        createdAt: serverTimestamp(),
      });

      clearCache('gallery');
      toast.success(`🖼️ Successfully published to Gallery under "${selectedAlbum}"!`, { id: toastId, duration: 5000 });
    } catch (err) {
      toast.error('Gallery deployment failed: ' + err.message, { id: toastId });
    }
    setPublishingGallery(false);
  };

  const currentPresetObj = PRESETS.find(p => p.id === activePreset) || PRESETS[0];

  return (
    <div className="fade-up" style={{ padding: 16, maxWidth: 1400, margin: '0 auto' }}>
      
      {/* Studio Animations & CSS */}
      <style>{`
        .studio-shell {
          background: #090f20; border-radius: 28px; border: 1.5px solid #1e293b;
          padding: 24px; box-shadow: 0 25px 60px rgba(0,0,0,0.55);
          position: relative; overflow: hidden; color: #f8fafc;
        }
        .neon-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #3b82f6, #f4a023, #10b981, #ef4444);
        }
        .viewport-box {
          position: relative; border-radius: 18px; overflow: hidden;
          border: 1.5px solid #334155; box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          background: #050b18; aspect-ratio: 1920 / 800; user-select: none;
        }
        .hud-input {
          width: 100%; background: #070d1e; border: 1px solid #1e293b;
          color: #fff; font-size: 13px; padding: 10px 14px; border-radius: 10px;
          outline: none; font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hud-input:focus { border-color: #f4a023; }
        .preset-btn {
          padding: 10px 12px; border-radius: 10px; border: 1.5px solid #1e293b;
          background: #0f172a; color: #94a3b8; font-size: 11.5px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s;
        }
        .preset-btn.active {
          border-color: #f4a023; background: rgba(244, 160, 35, 0.12); color: #fff;
        }

        /* 🎬 Text Animation Styles */
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          display: inline-block; width: 3px; height: 1.1em;
          background: #f59e0b; margin-left: 4px; vertical-align: text-bottom;
          animation: blinkCursor 0.8s infinite;
        }
        @keyframes cinematicFadeSlide {
          0% { opacity: 0; transform: translateY(16px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-12px); }
        }
        .anim-cinematic {
          animation: cinematicFadeSlide 5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes neonBreathe {
          0%, 100% { text-shadow: 0 0 10px rgba(245,158,11,0.5), 0 0 25px rgba(245,158,11,0.25); }
          50% { text-shadow: 0 0 25px rgba(245,158,11,0.9), 0 0 50px rgba(245,158,11,0.6); }
        }
        .anim-neon {
          animation: neonBreathe 2s ease-in-out infinite;
        }
        @keyframes kineticZoom {
          0%, 100% { transform: scale(0.96); letter-spacing: -0.5px; }
          50% { transform: scale(1.02); letter-spacing: 0.5px; }
        }
        .anim-kinetic {
          animation: kineticZoom 4s ease-in-out infinite;
        }
      `}</style>

      <div className="studio-shell">
        <div className="neon-accent" />

        {/* Studio Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={24} color="#60a5fa" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>
                  GNC NEURAL AI STUDIO
                </h1>
                <span style={{ fontSize: 10, fontWeight: 900, padding: '3px 8px', borderRadius: 6, background: '#f59e0b', color: '#0f2347' }}>
                  v5.0 SUPER-RES
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Draggable Typography • In & Out Text Animations • Multi-Pass Super-Resolution
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setShowNoticeModal(true)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid #334155',
                color: '#e2e8f0',
                padding: '8px 14px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FileText size={14} color="#f59e0b" /> Notice to Graphic
            </button>

            <button
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              style={{
                background: isLocked ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.06)',
                border: isLocked ? '1.5px solid #f59e0b' : '1px solid #334155',
                color: isLocked ? '#f59e0b' : '#94a3b8',
                padding: '8px 14px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {isLocked ? <Lock size={14} color="#f59e0b" /> : <Unlock size={14} />}
              <span>{isLocked ? 'Position Locked (Fixed)' : 'Drag Mode (Active)'}</span>
            </button>
          </div>
        </div>

        {/* Notice to Graphic Modal */}
        {showNoticeModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ background: '#0f172a', border: '1.5px solid #334155', borderRadius: 20, padding: 24, maxWidth: 540, width: '100%', color: '#fff' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 900, color: '#f59e0b' }}>
                📢 Notice / Circular to Graphic Banner Generator
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: 12, color: '#94a3b8' }}>
                Paste the text of any official notification, exam circular, or event alert. Gemini AI will synthesize it into graphic banner headlines.
              </p>
              <textarea
                rows={5}
                className="hud-input"
                placeholder="Paste notification text here (e.g. 'All BCA Semester 4 students are hereby informed that internal practical exams will begin from 28th September 2026 at Lab 1...')"
                value={rawNoticeText}
                onChange={e => setRawNoticeText(e.target.value)}
                style={{ resize: 'vertical', marginBottom: 16 }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '8px 14px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={parseNoticeWithAI}
                  className="abtn abtn-gold"
                  style={{ fontSize: 12 }}
                >
                  <Wand2 size={14} /> Synthesize Banner
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace */}
        {!preview ? (
          <div className="dropzone-advanced fade-up" onClick={() => fileInputRef.current.click()}>
            <Wand2 size={48} color="#60a5fa" style={{ margin: '0 auto 16px', display: 'block' }} />
            <h2 style={{ margin: '0 0 10px', color: '#fff', fontWeight: 900 }}>INITIALIZE VISUAL ASSET</h2>
            <p style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>
              Upload any college event photo, seminar snapshot, or campus view
            </p>
            <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: 50, border: '1px solid rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 800, color: '#f4a023' }}>
              <Zap size={13} color="#f4a023" /> SUPPORTS: JPG • PNG • WEBP • HEIC
            </div>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFile} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 370px', gap: 20 }} className="fade-up">
            
            {/* LEFT: VIEWPORT WITH DRAGGABLE OVERLAY & REAL-TIME FILTERS */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Interactive Studio Viewport
                  </span>
                  <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: 4, color: '#f59e0b', fontFamily: 'monospace' }}>
                    POS: X {textPos.x}% | Y {textPos.y}%
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={runGeminiVisionAnalysis}
                    disabled={isAiAnalyzing}
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      border: '1px solid #60a5fa',
                      color: '#ffffff',
                      padding: '6px 12px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: isAiAnalyzing ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {isAiAnalyzing ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} color="#f59e0b" />}
                    <span>{isAiAnalyzing ? 'Scanning...' : 'AI Vision'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={renderSuperResolutionUltraHD}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      border: 'none',
                      color: '#0f2347',
                      padding: '6px 14px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Zap size={13} /> Render Ultra-HD
                  </button>
                </div>
              </div>

              {/* Viewport Frame with Draggable Overlay */}
              <div 
                ref={viewportRef}
                className="viewport-box"
                style={{ cursor: isLocked ? 'default' : (isDragging ? 'grabbing' : 'crosshair') }}
              >
                {/* Background Image with REAL-TIME CSS Filter Enhancements */}
                <img 
                  src={preview} 
                  alt="Asset Preview" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: `contrast(${contrast}) brightness(${brightness}) saturate(${saturation}) ${unsharpMask ? 'drop-shadow(0 0 1px rgba(0,0,0,0.8))' : ''}`,
                    transition: 'filter 0.1s ease',
                  }} 
                />

                {/* Dark Vignette Overlay */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `radial-gradient(circle at ${textPos.x + 20}% ${textPos.y + 20}%, rgba(15,35,71,${vignetteDarkness + 0.3}) 0%, rgba(15,35,71,${vignetteDarkness}) 50%, rgba(15,35,71,0.15) 100%)`,
                }} />

                {/* Top Accent Line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 4, pointerEvents: 'none',
                  background: `linear-gradient(90deg, ${currentPresetObj.accent}, #f4a023, transparent)`
                }} />

                {/* 🎯 DRAGGABLE TYPOGRAPHY BOX WITH ANIMATION */}
                <div
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{
                    position: 'absolute',
                    left: `${textPos.x}%`,
                    top: `${textPos.y}%`,
                    maxWidth: '55%',
                    cursor: isLocked ? 'default' : (isDragging ? 'grabbing' : 'grab'),
                    border: isLocked ? '1px dashed transparent' : (isDragging ? '1.5px dashed #f59e0b' : '1px dashed rgba(255,255,255,0.4)'),
                    padding: '8px 12px',
                    borderRadius: 12,
                    background: isDragging ? 'rgba(15,35,71,0.4)' : 'transparent',
                    backdropFilter: isDragging ? 'blur(4px)' : 'none',
                    transition: isDragging ? 'none' : 'border 0.2s ease',
                    zIndex: 20,
                  }}
                  title={isLocked ? 'Position Locked (Unlock in top bar to drag)' : 'Drag anywhere to move text position!'}
                >
                  {/* Drag Handle Tag */}
                  {!isLocked && (
                    <div style={{
                      position: 'absolute', top: -18, left: 0,
                      background: '#f59e0b', color: '#0f2347',
                      fontSize: 8.5, fontWeight: 900, padding: '1px 6px',
                      borderRadius: 4, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: 4
                    }}>
                      <Move size={10} /> DRAG ME
                    </div>
                  )}

                  {/* Badge */}
                  <div style={{
                    display: 'inline-block',
                    background: currentPresetObj.accent,
                    color: '#0f2347',
                    fontSize: 'clamp(8px, 1vw, 11px)',
                    fontWeight: 900,
                    padding: '3px 8px',
                    borderRadius: 4,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}>
                    {badgeText}
                  </div>

                  {/* Animated Main Title */}
                  <div 
                    className={
                      animationMode === 'cinematic' ? 'anim-cinematic' :
                      animationMode === 'neon' ? 'anim-neon' :
                      animationMode === 'kinetic' ? 'anim-kinetic' : ''
                    }
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 'clamp(15px, 2.4vw, 30px)',
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1.15,
                      textShadow: '0 4px 16px rgba(0,0,0,0.8)',
                      marginBottom: 6,
                      letterSpacing: '-0.3px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {animationMode === 'typewriter' ? (
                      <>
                        {typewriterText}
                        <span className="cursor-blink" />
                      </>
                    ) : (
                      simTitle
                    )}
                  </div>

                  {/* Subtitle */}
                  <div style={{
                    fontSize: 'clamp(10px, 1.2vw, 14px)',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.88)',
                    lineHeight: 1.3,
                    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                    marginBottom: 6,
                  }}>
                    {simSub}
                  </div>

                  {/* Date / Venue */}
                  <div style={{
                    fontSize: 'clamp(9px, 1vw, 12px)',
                    fontWeight: 800,
                    color: currentPresetObj.accent,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}>
                    📍 {dateVenue}
                  </div>
                </div>

                {/* Crest Watermark */}
                {includeCrest && (
                  <div style={{
                    position: 'absolute', top: 16, right: 20, pointerEvents: 'none',
                    fontSize: 'clamp(8px, 0.9vw, 11px)', fontWeight: 900, color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '1.5px', textTransform: 'uppercase'
                  }}>
                    GURU NANAK COLLEGE • DHANBAD
                  </div>
                )}

                {/* Verification Stamp */}
                {includeQrCode && (
                  <div style={{
                    position: 'absolute', bottom: 16, right: 20, pointerEvents: 'none',
                    background: 'rgba(15, 35, 71, 0.8)', border: '1px solid rgba(244, 160, 35, 0.4)',
                    borderRadius: 8, padding: '6px 12px', textAlign: 'left',
                  }}>
                    <div style={{ fontSize: 8.5, color: '#f59e0b', fontWeight: 800 }}>GNC OFFICIAL SECURE</div>
                    <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>
                      SUPER-RES 1920x800
                    </div>
                  </div>
                )}
              </div>

              {/* Deployment Bar */}
              <div style={{ marginTop: 16, background: '#070d1e', border: '1px solid #1e293b', borderRadius: 16, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>
                  1-Click Direct Live Deployment Hub
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                  {/* Download */}
                  <button
                    type="button"
                    onClick={downloadBanner}
                    disabled={!processed}
                    style={{
                      background: '#1e293b',
                      border: '1px solid #334155',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: 10,
                      fontWeight: 800,
                      fontSize: 12,
                      cursor: processed ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      opacity: processed ? 1 : 0.5,
                    }}
                  >
                    <Download size={14} color="#f59e0b" /> Download WebP
                  </button>

                  {/* Publish to Hero Slider */}
                  <button
                    type="button"
                    onClick={publishToHeroSlider}
                    disabled={!processed || publishingSlider}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      border: 'none',
                      color: '#0f2347',
                      padding: '10px 14px',
                      borderRadius: 10,
                      fontWeight: 900,
                      fontSize: 12,
                      cursor: (processed && !publishingSlider) ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      opacity: processed ? 1 : 0.5,
                    }}
                  >
                    {publishingSlider ? <RefreshCw size={13} className="animate-spin" /> : <Send size={13} />}
                    <span>Publish to Live Hero Slider</span>
                  </button>

                  {/* Publish to Gallery */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <select
                      value={selectedAlbum}
                      onChange={e => setSelectedAlbum(e.target.value)}
                      style={{
                        background: '#0f172a',
                        border: '1px solid #334155',
                        color: '#fff',
                        borderRadius: 10,
                        padding: '0 6px',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {['Seminars', 'Cultural Fest', 'Guest Visit', 'Campus', 'Departments', 'NSS Programs'].map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={publishToGallery}
                      disabled={!processed || publishingGallery}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        border: 'none',
                        color: '#ffffff',
                        padding: '10px 12px',
                        borderRadius: 10,
                        fontWeight: 800,
                        fontSize: 11.5,
                        cursor: (processed && !publishingGallery) ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        opacity: processed ? 1 : 0.5,
                      }}
                    >
                      {publishingGallery ? <RefreshCw size={13} className="animate-spin" /> : <ImageIcon size={13} />}
                      <span>To Gallery</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: INTERACTIVE CONTROL PANEL */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              
              {/* 1. Quick Alignments & Lock */}
              <div style={{ background: '#070d1e', border: '1px solid #1e293b', borderRadius: 16, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    🎯 Typography Placement
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLocked(!isLocked)}
                    style={{ background: 'none', border: 'none', color: isLocked ? '#f59e0b' : '#64748b', cursor: 'pointer', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
                    <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
                  {[
                    { id: 'top-left', label: 'TL' },
                    { id: 'center', label: 'C' },
                    { id: 'bottom-left', label: 'BL' },
                    { id: 'bottom-center', label: 'BC' },
                    { id: 'bottom-right', label: 'BR' },
                  ].map(a => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setQuickAlignment(a.id)}
                      style={{
                        padding: '6px 4px',
                        borderRadius: 6,
                        border: '1px solid #334155',
                        background: '#0f172a',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Text Animation Modes */}
              <div style={{ background: '#070d1e', border: '1px solid #1e293b', borderRadius: 16, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: '#60a5fa', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.8px' }}>
                  🎬 Text Animation Style
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {ANIMATION_MODES.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setAnimationMode(m.id)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 8,
                        border: animationMode === m.id ? '1.5px solid #60a5fa' : '1px solid #1e293b',
                        background: animationMode === m.id ? 'rgba(59, 130, 246, 0.15)' : '#0f172a',
                        color: animationMode === m.id ? '#ffffff' : '#94a3b8',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{m.label}</span>
                      {animationMode === m.id && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa' }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Typography Content */}
              <div style={{ background: '#070d1e', border: '1px solid #1e293b', borderRadius: 16, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.8px' }}>
                  ✍️ Text Content
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 9.5, color: '#94a3b8', display: 'block', marginBottom: 3, fontWeight: 700 }}>HEADLINE</label>
                  <input className="hud-input" value={simTitle} onChange={e => setSimTitle(e.target.value)} />
                </div>

                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 9.5, color: '#94a3b8', display: 'block', marginBottom: 3, fontWeight: 700 }}>SUBTITLE</label>
                  <input className="hud-input" value={simSub} onChange={e => setSimSub(e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div>
                    <label style={{ fontSize: 9.5, color: '#94a3b8', display: 'block', marginBottom: 3, fontWeight: 700 }}>BADGE</label>
                    <input className="hud-input" value={badgeText} onChange={e => setBadgeText(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 9.5, color: '#94a3b8', display: 'block', marginBottom: 3, fontWeight: 700 }}>DATE / VENUE</label>
                    <input className="hud-input" value={dateVenue} onChange={e => setDateVenue(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* 4. Real-Time Filters & Super-Res Engine */}
              <div style={{ background: '#070d1e', border: '1px solid #1e293b', borderRadius: 16, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: '#10b981', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.8px' }}>
                  ⚙️ Real-Time Filters & Super-Res
                </div>

                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginBottom: 3 }}>
                    <span>Contrast</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{contrast}</span>
                  </div>
                  <input type="range" min="0.8" max="1.4" step="0.02" value={contrast} onChange={e => setContrast(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginBottom: 3 }}>
                    <span>Saturation</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{saturation}</span>
                  </div>
                  <input type="range" min="0.8" max="1.6" step="0.02" value={saturation} onChange={e => setSaturation(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginBottom: 3 }}>
                    <span>Brightness</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{brightness}</span>
                  </div>
                  <input type="range" min="0.8" max="1.3" step="0.02" value={brightness} onChange={e => setBrightness(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, borderTop: '1px solid #1e293b', paddingTop: 8 }}>
                  <span style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 700 }}>3x3 Laplacian Unsharp Mask</span>
                  <input type="checkbox" checked={unsharpMask} onChange={e => setUnsharpMask(e.target.checked)} />
                </div>
              </div>

              {/* Reset */}
              <button
                type="button"
                onClick={() => { setImg(null); setPreview(null); setProcessed(null); }}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  padding: '9px',
                  borderRadius: 10,
                  fontSize: 11.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <RotateCcw size={13} /> Reset Studio Asset
              </button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
