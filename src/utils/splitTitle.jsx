// src/utils/splitTitle.jsx
// ═══════════════════════════════════════════════════════════════════════════════
// Universal Two-Tone Solid Split Title Formatter
// Converts standard titles into two-tone solid split format:
// "Principal's Message" -> "Principal's <span>Message</span>"
// "Vision & Mission" -> "Vision & <span>Mission</span>"
// "Recent Events & Happenings" -> "Recent Events & <span>Happenings</span>"
// Matches user-uploaded reference image & Contact page ("Get In <span>Touch</span>")
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';

export function splitHeading(title) {
  if (!title) return null;
  if (React.isValidElement(title)) return title;
  if (typeof title !== 'string') return title;

  const trimmed = title.trim();
  if (trimmed.includes('<span') || trimmed.includes('</')) {
    return <span dangerouslySetInnerHTML={{ __html: trimmed }} />;
  }

  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return trimmed;
  const lastWord = words.pop();
  return (
    <>
      {words.join(' ')} <span>{lastWord}</span>
    </>
  );
}

export default splitHeading;
