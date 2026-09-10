// src/utils/aiExtractor.js — Gemini AI Powered Notice & Document Auto-Extractor
// 🤖 @AI_Agent — Analyzes rough drafts, circular titles, and documents to extract structured metadata

const VALID_CATEGORIES = [
  'General',
  'Examination',
  'Admission',
  'Result',
  'Holiday',
  'Scholarship',
  'Sports'
];

function formatAcademicText(str) {
  let res = (str || '')
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .trim();

  // Initial title case
  res = res.replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  // Restore academic uppercase acronyms
  const acronyms = ['BCA', 'BBA', 'BA', 'BCOM', 'BSC', 'MA', 'MCOM', 'UG', 'PG', 'CBCS', 'NEP', 'BBMKU', 'NAAC', 'NSS', 'NCC', 'IQAC', 'ERP', 'CIMS', 'PDF', 'AI'];
  acronyms.forEach(acr => {
    const reg = new RegExp(`\\b${acr}\\b`, 'gi');
    res = res.replace(reg, acr);
  });

  // Expand "Sem 3" -> "Semester 3"
  res = res.replace(/\bSem\s*([0-9ivx]+)\b/gi, 'Semester $1');
  return res;
}

/**
 * High-speed academic rule-based extractor
 */
function ruleBasedExtractor(input) {
  const str = (input || '').trim();
  const lower = str.toLowerCase();

  let type = 'General';
  if (lower.includes('admiss') || lower.includes('chancellor') || lower.includes('selection list') || lower.includes('merit') || lower.includes('counselling')) {
    type = 'Admission';
  } else if (lower.includes('result') || lower.includes('marksheet') || lower.includes('pass percentage')) {
    type = 'Result';
  } else if (lower.includes('exam') || lower.includes('routine') || lower.includes('admit card') || lower.includes('backlog') || (lower.includes('semester') && lower.includes('form'))) {
    type = 'Examination';
  } else if (lower.includes('holiday') || lower.includes('closed') || lower.includes('puja') || lower.includes('diwali') || lower.includes('vacation') || lower.includes('jayanti')) {
    type = 'Holiday';
  } else if (lower.includes('scholarship') || lower.includes('ekalyan') || lower.includes('e-kalyan') || lower.includes('financial aid') || lower.includes('stipend')) {
    type = 'Scholarship';
  } else if (lower.includes('sport') || lower.includes('cricket') || lower.includes('football') || lower.includes('tournament') || lower.includes('badminton') || lower.includes('athletics')) {
    type = 'Sports';
  } else if (lower.includes('semester') || lower.includes('class') || lower.includes('syllabus')) {
    type = 'General';
  }

  const isUrgent = lower.includes('urgent') || lower.includes('last date') || lower.includes('immediate') || lower.includes('important') || lower.includes('without fine');
  const polished = formatAcademicText(str);

  return {
    text: polished,
    type,
    isNew: true,
    pinned: isUrgent,
    shortSummary: `${type} Notice: ${polished}`
  };
}

/**
 * Auto-extracts metadata, formalizes notice text, and predicts category using Google Gemini API
 * @param {string} rawInput - Rough draft text, circular headline, or PDF filename
 * @returns {Promise<{ text: string, type: string, isNew: boolean, pinned: boolean, shortSummary: string }>}
 */
export async function extractNoticeMetadata(rawInput) {
  const cleanInput = (rawInput || '').trim();
  if (!cleanInput) {
    return { text: '', type: 'General', isNew: true, pinned: false, shortSummary: '' };
  }

  const apiKey = (typeof import.meta !== 'undefined' && import.meta?.env)
    ? (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY || '')
    : '';
  if (!apiKey) {
    console.warn('[AIExtractor] No Gemini API Key found in .env, using rule-based fallback.');
    return ruleBasedExtractor(cleanInput);
  }

  const prompt = `
You are the Senior Academic Registrar at Guru Nanak College, Dhanbad (affiliated with BBMKU, NAAC accredited).
Analyze the following draft notice / circular title / document name and return a formal academic notice specification.

INPUT:
"${cleanInput}"

RULES:
1. "text": Write a formal, grammatically polished, official academic notice headline/announcement (1-2 sentences). Do not use Markdown formatting inside the text field.
2. "type": Must be EXACTLY ONE of: ["General", "Examination", "Admission", "Result", "Holiday", "Scholarship", "Sports"].
3. "isNew": true if this relates to an active event, upcoming deadline, or new notification; otherwise false.
4. "pinned": true only if this is high priority or urgent (e.g., examination schedules, fee deadline with fine, immediate holiday); otherwise false.
5. "shortSummary": A brief 10-15 word summary.

Return ONLY a valid, raw JSON object without markdown code blocks, following this schema:
{
  "text": "Formal notice text",
  "type": "Category",
  "isNew": true,
  "pinned": false,
  "shortSummary": "Short summary"
}
`;

  try {
    // Call Gemini 1.5 Flash (Fast, accurate, structured)
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 300
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API HTTP ${res.status}`);
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Strip possible markdown backticks
    const cleanedJson = candidateText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedJson);

    // Validate category
    const finalType = VALID_CATEGORIES.includes(parsed.type) ? parsed.type : 'General';

    return {
      text: parsed.text || cleanInput,
      type: finalType,
      isNew: typeof parsed.isNew === 'boolean' ? parsed.isNew : true,
      pinned: typeof parsed.pinned === 'boolean' ? parsed.pinned : false,
      shortSummary: parsed.shortSummary || ''
    };
  } catch (err) {
    console.warn('[AIExtractor] Gemini extraction error, applying fallback:', err.message);
    return ruleBasedExtractor(cleanInput);
  }
}

export default extractNoticeMetadata;
