// src/components/AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const COLLEGE_PHONE = '917903340991';
const CHANCELLOR_PORTAL = 'https://universities.jharkhand.gov.in/';
const CIMS_FEE_PORTAL = 'https://cimsstudentnewui.mastersofterp.in/';
const BBMKU_RESULT_PORTAL = 'https://bbmkuniv.in/login';
const SIKH_HERITAGE_PATH = '/#/about-us/sikh-heritage';

const COLLEGE_KNOWLEDGE = `
# INSTITUTION IDENTITY
- Name: Guru Nanak College, Dhanbad
- Status: NAAC Accredited Premier Sikh Minority Degree College (Established in 1970)
- Affiliation: Binod Bihari Mahto Koyalanchal University (BBMKU), Dhanbad
- Campus Location: Bhuda, Dhanbad, Jharkhand - 826001
- Principal: Dr. Sanjay Prasad
- Official Helpline: +91 79033 40991
- Official Email: principal@gncollege.org
- Office Hours: Monday to Saturday, 9:30 AM to 4:30 PM (Office closed on Sundays and Gazetted Holidays)

# OFFICIAL DIRECT PORTALS & LINKS
- Online Admission 2026: Chancellor Portal -> https://universities.jharkhand.gov.in/
- Online Fee Payment: CIMS Student ERP -> https://cimsstudentnewui.mastersofterp.in/
- Semester & Annual Results: BBMKU University Result Portal -> https://bbmkuniv.in/login
- Official College Website: https://gncollege.org

# ACADEMIC PROGRAMS OFFERED
1. Vocational & Professional Courses (High Placement & Modern Labs):
   - BCA (Bachelor of Computer Applications) - 3/4 Years FYUGP NEP 2020. Focus: C++, Java, Python, Web Tech, AI basics, DBMS, Project Work. Eligibility: 10+2 with Mathematics/Statistics/Computer Applications.
   - BBA (Bachelor of Business Administration) - 3/4 Years FYUGP NEP 2020. Focus: Marketing, Finance, HR, Management, Business Law. Eligibility: 10+2 in any stream.
2. Under-Graduate Degree Programs (NEP 2020 Four Year Framework):
   - Commerce: B.Com (Honours in Accounts & Finance, Management)
   - Science: B.Sc (Honours in Physics, Chemistry, Mathematics, Botany, Zoology)
   - Humanities & Arts: B.A. (Honours in English, Hindi, History, Political Science, Economics, Philosophy)
3. Post-Graduate Program:
   - M.Com (Master of Commerce)

# ADMISSION PROCEDURE 2026
1. Visit the Jharkhand Universities Chancellor Portal: https://universities.jharkhand.gov.in/
2. Register as a new student with active mobile number and email ID.
3. Select "Binod Bihari Mahto Koyalanchal University (BBMKU)" and choose "Guru Nanak College, Dhanbad".
4. Fill academic details (Class 10th & 12th marks) and upload documents (Photo, Signature, Marks Sheet, Caste/Minority certificate if applicable).
5. Submit form & pay application fee.
6. Await college merit list published on college notice board and website.
7. After selection, verify physical documents at college office and pay admission fee via CIMS ERP.

# CAMPUS FACILITIES & HIGHLIGHTS
- Central Library: Over 40,000+ volumes, DELNET and INFLIBNET N-LIST e-journal access, spacious reading hall.
- High-Tech IT & Computer Labs: 100+ high-performance nodes with dedicated high-speed fiber internet.
- Student Support Cells: Women Grievance Cell, Anti-Ragging Committee (Zero Tolerance), SC/ST/OBC/Minority Cell, Career Guidance & Placement Cell.
- Co-curricular & Youth Activities: NCC Army Wing (Boys & Girls), NSS Units (Social service), Annual Sports Meet, Cultural & Sikh Heritage Festivities.
- Scholarships: e-Kalyan Jharkhand Government Scholarship, Post-Matric Minority Scholarships (NSP), Merit-cum-Means assistance.
`;

const SYSTEM_PROMPT = `
You are "GNC Virtual Assistant", the official, polite, and intelligent AI Counselor of Guru Nanak College, Dhanbad.
Your mission is to provide accurate, helpful, student-friendly guidance to students, parents, and alumni.

CORE GUARDRAILS:
1. Always base your answers on Guru Nanak College facts and official portals.
2. For Admission: Always refer to the Chancellor Portal (https://universities.jharkhand.gov.in/).
3. For Fees: Direct students to the CIMS ERP Portal (https://cimsstudentnewui.mastersofterp.in/).
4. For Results: Direct students to the BBMKU Portal (https://bbmkuniv.in/login).
5. For Administrative / Urgent inquiries: Share Phone (+91 79033 40991) and Email (principal@gncollege.org).
6. Format your output cleanly with bold keywords, markdown links, bullet points, and friendly emojis (🎓, 📚, 💳, 📢).
7. Keep responses concise, warm, and structured (under 3-4 short paragraphs).
8. Support Hindi, English, and Hinglish queries naturally.

Knowledge Base:
${COLLEGE_KNOWLEDGE}
`;

const QUICK_PROMPTS = [
  { label: '🎓 Admission 2026', query: 'How do I apply for Admission 2026 at Guru Nanak College?' },
  { label: '💳 Pay College Fees', query: 'Where and how do I pay college fees online?' },
  { label: '📊 Check Results', query: 'How can I check my BBMKU Semester Exam results?' },
  { label: '💻 BCA & BBA Info', query: 'Tell me about BCA and BBA courses, fees and eligibility at GNC.' },
  { label: '📞 Contact Office', query: 'What are the contact details and office timings for Guru Nanak College?' },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Sat Sri Akal! 🙏 Welcome to **Guru Nanak College, Dhanbad**.\n\nI am your official **AI Academic Assistant**. How can I help you today with Admissions, Courses, Fees, or Exam Results?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [adminApiKey, setAdminApiKey] = useState('');
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );
  const [pos, setPos] = useState(null); // { x: number, y: number }
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, elX: 0, elY: 0 });
  const hasDraggedRef = useRef(false);
  const btnRef = useRef(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const speechRecognitionRef = useRef(null);

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const rect = btnRef.current ? btnRef.current.getBoundingClientRect() : { left: 0, top: 0 };
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      elX: rect.left,
      elY: rect.top
    };
    hasDraggedRef.current = false;

    const onPointerMove = (moveEvt) => {
      const moveX = moveEvt.clientX ?? moveEvt.touches?.[0]?.clientX;
      const moveY = moveEvt.clientY ?? moveEvt.touches?.[0]?.clientY;
      if (moveX === undefined || moveY === undefined) return;

      const dx = moveX - dragStartRef.current.mouseX;
      const dy = moveY - dragStartRef.current.mouseY;

      if (!hasDraggedRef.current && Math.hypot(dx, dy) > 5) {
        hasDraggedRef.current = true;
        setIsDragging(true);
      }

      if (hasDraggedRef.current) {
        if (moveEvt.preventDefault && moveEvt.cancelable) moveEvt.preventDefault();
        const maxX = window.innerWidth - 65;
        const maxY = window.innerHeight - 65;
        const boundedX = Math.max(10, Math.min(maxX, dragStartRef.current.elX + dx));
        const boundedY = Math.max(10, Math.min(maxY, dragStartRef.current.elY + dy));
        setPos({ x: boundedX, y: boundedY });
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      setTimeout(() => setIsDragging(false), 50);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  };

  const handleButtonClick = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsOpen(!isOpen);
  };

  // Logo URL with base support
  const logoUrl = `${import.meta.env.BASE_URL}images/logo.webp`;

  // Fetch API key securely from Firestore admin settings
  useEffect(() => {
    getDoc(doc(db, 'settings', 'site'))
      .then(snap => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.geminiApiKey) {
            setAdminApiKey(data.geminiApiKey.trim());
          }
        }
      })
      .catch(() => {});
  }, []);

  // Dark mode listener
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`[\]()]/g, '').replace(/https?:\/\/\S+/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ── INTELLIGENT RULE-BASED FALLBACK ENGINE ──
  const getIntelligentFallback = (query) => {
    const q = query.toLowerCase();

    if (q.includes('admission') || q.includes('apply') || q.includes('form') || q.includes('chancellor')) {
      return `Sat Sri Akal! 🎓 **UG & Vocational Admission 2026** at Guru Nanak College is conducted through the official Jharkhand Chancellor Portal.\n\n` +
        `• **Portal Link**: [Apply on Chancellor Portal](${CHANCELLOR_PORTAL})\n` +
        `• **Steps**: Register ➜ Select BBMKU Dhanbad ➜ Select Guru Nanak College ➜ Choose Course (BCA, BBA, B.Com, B.Sc, B.A.) ➜ Upload documents ➜ Submit.\n` +
        `• For admission guidance, contact our Admission Desk at **+91 79033 40991** or chat with our Counselor on WhatsApp!`;
    }

    if (q.includes('fee') || q.includes('payment') || q.includes('cims') || q.includes('receipt') || q.includes('dues')) {
      return `💳 **College Fee Payment & Receipt Portal**:\n\n` +
        `All academic and semester fees are paid online through our **MasterSoft CIMS Student ERP**:\n` +
        `• **Payment Portal**: [CIMS Student ERP Login](${CIMS_FEE_PORTAL})\n` +
        `• Enter your registered Student ID / Username and Password to view pending dues, make payment, and download official receipts.\n` +
        `• Need help with transaction errors? Contact the College Accounts Office: **+91 79033 40991**.`;
    }

    if (q.includes('result') || q.includes('mark') || q.includes('exam') || q.includes('bbmku') || q.includes('semester')) {
      return `📊 **Exam Results & University Portal**:\n\n` +
        `Guru Nanak College is affiliated with **BBMKU (Binod Bihari Mahto Koyalanchal University)**. Semester and annual results are released directly on the university portal:\n` +
        `• **Results Portal**: [Check BBMKU Results](${BBMKU_RESULT_PORTAL})\n` +
        `• Enter your University Roll Number and Stream to download your marksheet / result sheet.`;
    }

    if (q.includes('bca') || q.includes('computer') || q.includes('it')) {
      return `💻 **Bachelor of Computer Applications (BCA)** at GNC:\n\n` +
        `• **Program**: 3/4-Year Professional Degree (NEP 2020 FYUGP Framework)\n` +
        `• **Curriculum**: C, C++, Core Java, Python, Web Technologies, Database Systems, Artificial Intelligence basics.\n` +
        `• **Eligibility**: 10+2 with Mathematics / Statistics / Computer Science with minimum 45% aggregate.\n` +
        `• **Facilities**: 100+ High-speed nodes, Wi-Fi campus, expert faculty, and placement training.\n` +
        `• Apply online through [Chancellor Portal](${CHANCELLOR_PORTAL}).`;
    }

    if (q.includes('bba') || q.includes('business') || q.includes('management')) {
      return `📈 **Bachelor of Business Administration (BBA)** at GNC:\n\n` +
        `• **Program**: 3/4-Year Professional Management Degree\n` +
        `• **Specializations**: Marketing, Financial Management, Human Resource (HR), Digital Business.\n` +
        `• **Eligibility**: 10+2 in any stream (Arts, Science, or Commerce).\n` +
        `• **Opportunities**: Corporate campus drives, internship guidance, and business case competitions.\n` +
        `• Apply online through [Chancellor Portal](${CHANCELLOR_PORTAL}).`;
    }

    if (q.includes('course') || q.includes('subject') || q.includes('department') || q.includes('b.com') || q.includes('b.sc') || q.includes('b.a')) {
      return `📚 **Courses Offered at Guru Nanak College, Dhanbad**:\n\n` +
        `1. **Vocational/Professional**: BCA (Computer Apps), BBA (Business Admin)\n` +
        `2. **Commerce**: B.Com (Honours in Accounts & Finance)\n` +
        `3. **Science**: B.Sc (Honours in Mathematics, Physics, Chemistry, Botany, Zoology)\n` +
        `4. **Humanities & Arts**: B.A. (Honours in English, Hindi, History, Political Science, Economics, Philosophy)\n` +
        `5. **Postgraduate**: M.Com (Master of Commerce)\n\n` +
        `All UG programs follow the National Education Policy (NEP 2020) with flexible credit pathways.`;
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('time') || q.includes('location')) {
      return `🏫 **Guru Nanak College Contact Information**:\n\n` +
        `• **Address**: Bhuda, Dhanbad, Jharkhand - 826001\n` +
        `• **Phone / Helpline**: **+91 79033 40991**\n` +
        `• **Email**: principal@gncollege.org\n` +
        `• **Principal**: Dr. Sanjay Prasad\n` +
        `• **Office Hours**: Monday to Saturday, 9:30 AM to 4:30 PM\n` +
        `• **Nearest Landmark**: Near Bhuda Mor, Dhanbad Railway Station (~3.5 km).`;
    }

    if (q.includes('scholarship') || q.includes('ekalyan') || q.includes('minority') || q.includes('nsp')) {
      return `💰 **Scholarships & Financial Assistance**:\n\n` +
        `• **e-Kalyan Jharkhand**: Post-Matric scholarships for SC, ST, and OBC students of Jharkhand.\n` +
        `• **Minority Scholarships (NSP)**: As a recognized Sikh Minority institution, students can access national minority schemes.\n` +
        `• **Central Sector Schemes**: For meritorious college students.\n` +
        `Visit the College Scholarship Nodal Officer in the Admin Block for verification.`;
    }

    if (q.includes('sikh') || q.includes('minority') || q.includes('heritage') || q.includes('gurmukhi')) {
      return `☬ **Sikh Minority Institution & Heritage**:\n\n` +
        `Established in 1970 under the leadership of the Sikh community of Dhanbad, Guru Nanak College fosters academic excellence alongside values of equality, selfless service (Seva), and inclusivity.\n\n` +
        `You can explore our dedicated heritage archives in the [Sikh Heritage Section](${SIKH_HERITAGE_PATH}).`;
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('sat sri akal') || q.includes('hey')) {
      return `Sat Sri Akal & Namaste! 🙏 Welcome to Guru Nanak College, Dhanbad.\n\n` +
        `I am your 24/7 Virtual Guide. What would you like to know today?\n` +
        `• **Admission 2026**\n• **Online Fee Payment**\n• **BCA / BBA Programs**\n• **BBMKU Exam Results**\n• **Office Contact & Helpdesk**`;
    }

    return `Sat Sri Akal! 🙏 Thank you for reaching out to Guru Nanak College, Dhanbad.\n\n` +
      `For specific inquiries, you can use our direct portals:\n` +
      `• [Admission 2026 Portal](${CHANCELLOR_PORTAL})\n` +
      `• [Online Fee Payment](${CIMS_FEE_PORTAL})\n` +
      `• [BBMKU University Results](${BBMKU_RESULT_PORTAL})\n\n` +
      `Or speak directly with our College Office at **+91 79033 40991** (Mon-Sat, 9:30 AM to 4:30 PM).`;
  };

  // ── CALL GEMINI MULTI-TURN AI ──
  const callGeminiAPI = async (userPrompt, history) => {
    const activeKey = adminApiKey || window.GNC_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY;

    if (!activeKey) {
      return null;
    }

    // Build multi-turn format
    const contents = [];

    // Add recent turns (up to 8 turns for token efficiency)
    const recentHistory = history.slice(-8);
    for (const msg of recentHistory) {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    }

    // Add current question
    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }]
    });

    const modelsToTry = [
      'gemini-2.0-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash',
      'gemini-1.5-flash-8b',
      'gemini-1.5-pro',
      'gemini-pro'
    ];

    for (const model of modelsToTry) {
      for (const ver of ['v1beta', 'v1']) {
        try {
          const url = `https://generativelanguage.googleapis.com/${ver}/models/${model}:generateContent?key=${activeKey}`;
          const body = ver === 'v1beta'
            ? {
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: contents,
                generationConfig: { temperature: 0.4, maxOutputTokens: 600, topP: 0.95 }
              }
            : {
                contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}` }] }]
              };

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          if (!response.ok) {
            continue;
          }

          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText && candidateText.trim()) {
            return candidateText.trim();
          }
        } catch (err) {
          // try next model / endpoint
        }
      }
    }

    return null;
  };

  const handleSend = async (e, directText) => {
    if (e) e.preventDefault();
    const query = (directText !== undefined ? directText : input).trim();
    if (!query) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const updatedMessages = [...messages, { role: 'user', text: query, timestamp: timeString }];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    let replyText = null;

    try {
      replyText = await callGeminiAPI(query, messages);
    } catch (err) {
      console.error('Error during AI call:', err);
    }

    // If Gemini key is missing or failed, use Intelligent Fallback
    if (!replyText) {
      replyText = getIntelligentFallback(query);
    }

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'model',
        text: 'Sat Sri Akal! 🙏 Chat history cleared. How may I assist you now with Guru Nanak College?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // ── SIMPLE MARKDOWN FORMATTER FOR MESSAGE TEXT ──
  const renderFormattedMessage = (text) => {
    if (!text) return null;

    const lines = text.split('\n');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {lines.map((line, lineIdx) => {
          if (!line.trim()) {
            return <div key={lineIdx} style={{ height: '4px' }} />;
          }

          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('* ') || line.trim().startsWith('- ');
          const displayLine = isBullet ? line.trim().replace(/^([•*-]\s*)/, '') : line;

          const parts = [];
          const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/#\/[^\s)]+)\)/g;
          let lastIndex = 0;
          let match;

          while ((match = linkRegex.exec(displayLine)) !== null) {
            if (match.index > lastIndex) {
              parts.push(displayLine.substring(lastIndex, match.index));
            }
            parts.push({
              isLink: true,
              text: match[1],
              url: match[2]
            });
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < displayLine.length) {
            parts.push(displayLine.substring(lastIndex));
          }

          const renderPartWithBold = (str, pIdx) => {
            if (typeof str !== 'string') return null;
            const boldParts = str.split(/(\*\*[^*]+\*\*)/g);
            return boldParts.map((bp, bpIdx) => {
              if (bp.startsWith('**') && bp.endsWith('**')) {
                return <strong key={`${pIdx}-${bpIdx}`} style={{ color: 'var(--gold, #f59e0b)' }}>{bp.slice(2, -2)}</strong>;
              }
              return <span key={`${pIdx}-${bpIdx}`}>{bp}</span>;
            });
          };

          return (
            <div
              key={lineIdx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: isBullet ? '6px' : '0',
                paddingLeft: isBullet ? '8px' : '0',
                lineHeight: '1.5'
              }}
            >
              {isBullet && <span style={{ color: 'var(--gold, #f59e0b)', fontWeight: 900 }}>•</span>}
              <div style={{ flex: 1 }}>
                {parts.length === 0 ? (
                  renderPartWithBold(displayLine, 0)
                ) : (
                  parts.map((p, pIdx) => {
                    if (p.isLink) {
                      return (
                        <a
                          key={pIdx}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#38bdf8',
                            textDecoration: 'underline',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            wordBreak: 'break-all',
                            margin: '0 2px'
                          }}
                        >
                          {p.text} ↗
                        </a>
                      );
                    }
                    return renderPartWithBold(p, pIdx);
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const bgModal = isDark ? '#0f172a' : '#ffffff';
  const borderModal = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
  const textModal = isDark ? '#f8fafc' : '#0f172a';
  const botBubbleBg = isDark ? '#1e293b' : '#f1f5f9';
  const botBubbleText = isDark ? '#f1f5f9' : '#1e293b';
  const userBubbleBg = 'linear-gradient(135deg, #0f2347, #1e3a8a)';
  const userBubbleText = '#ffffff';

  return (
    <>
      <style>{`
        @keyframes gnc-bot-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6); }
          70%  { box-shadow: 0 0 0 16px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        @keyframes gnc-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gnc-dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%           { transform: scale(1.1); opacity: 1; }
        }
        .gnc-bot-trigger {
          position: fixed;
          bottom: clamp(20px, 4vw, 30px);
          right: clamp(18px, 3vw, 25px);
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f2347, #1e3a8a);
          color: #f59e0b;
          border: 2px solid rgba(245, 158, 11, 0.6);
          box-shadow: 0 10px 28px rgba(15, 35, 71, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999999;
          animation: gnc-bot-pulse 2.8s infinite;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          padding: 0;
          overflow: hidden;
        }
        .gnc-bot-trigger:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 14px 34px rgba(245, 158, 11, 0.45);
          border-color: #f59e0b;
        }
        .gnc-bot-window {
          position: fixed;
          bottom: clamp(90px, 12vw, 100px);
          right: clamp(16px, 3vw, 25px);
          width: clamp(320px, 94vw, 420px);
          height: clamp(520px, 78vh, 620px);
          background: ${bgModal};
          border: 1px solid ${borderModal};
          border-radius: 22px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          z-index: 999999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: gnc-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .gnc-prompt-chip {
          background: ${isDark ? 'rgba(245, 158, 11, 0.12)' : '#fffbeb'};
          color: ${isDark ? '#fbbf24' : '#b45309'};
          border: 1px solid ${isDark ? 'rgba(245, 158, 11, 0.3)' : '#fde68a'};
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 11.5px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .gnc-prompt-chip:hover {
          background: #f59e0b;
          color: #000;
          transform: translateY(-1px);
        }
        .gnc-action-btn-small {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          cursor: pointer;
          padding: 5px 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          font-size: 13px;
        }
        .gnc-action-btn-small:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Floatable / Draggable Launcher Button */}
      <button
        ref={btnRef}
        onPointerDown={handlePointerDown}
        onClick={handleButtonClick}
        className="gnc-bot-trigger"
        aria-label={isOpen ? "Close GNC Assistant" : "Open GNC Assistant"}
        title="GNC AI Assistant (Drag karke kahi bhi move kar sakte hain)"
        style={pos ? {
          position: 'fixed',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          bottom: 'auto',
          right: 'auto',
          zIndex: 999999,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        } : {
          cursor: 'grab',
          touchAction: 'none'
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>✕</span>
        ) : (
          <img
            src={logoUrl}
            alt="GNC Logo"
            style={{ width: '38px', height: '38px', objectFit: 'contain', pointerEvents: 'none' }}
            onError={(e) => { e.currentTarget.src = 'https://gncollege.org/images/logo.webp'; }}
          />
        )}
      </button>

      {/* Main AI Chat Window */}
      {isOpen && (
        <div
          className="gnc-bot-window"
          role="dialog"
          aria-modal="true"
          aria-label="GNC AI Assistant"
          style={pos ? {
            left: pos.x > (window.innerWidth / 2) ? 'auto' : `${Math.max(12, pos.x)}px`,
            right: pos.x > (window.innerWidth / 2) ? `${Math.max(12, window.innerWidth - pos.x - 60)}px` : 'auto',
            bottom: pos.y > (window.innerHeight / 2) ? `${Math.max(12, window.innerHeight - pos.y + 10)}px` : 'auto',
            top: pos.y > (window.innerHeight / 2) ? 'auto' : `${Math.max(12, pos.y + 65)}px`,
            zIndex: 999999
          } : {}}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #09152b, #0f2347)',
            padding: '14px 18px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* College Logo Avatar */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '2px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.4)',
                position: 'relative',
                flexShrink: 0
              }}>
                <img
                  src={logoUrl}
                  alt="Guru Nanak College Logo"
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                  onError={(e) => { e.currentTarget.src = 'https://gncollege.org/images/logo.webp'; }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '-1px',
                  right: '-1px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '2px solid #09152b',
                  boxShadow: '0 0 6px #10b981'
                }}></span>
              </div>

              {/* Title & Accreditation */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 900, fontSize: '14px', color: '#ffffff', letterSpacing: '0.2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Guru Nanak College
                  <span style={{
                    fontSize: '9.5px',
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.5)',
                    padding: '1px 6px',
                    borderRadius: '6px',
                    fontWeight: 800
                  }}>
                    Estd. 1970
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>NAAC Accredited</span>
                  <span>•</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>AI Counselor Live</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleClearChat}
                className="gnc-action-btn-small"
                title="Clear Chat History"
                aria-label="Clear chat history"
              >
                🔄
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="gnc-action-btn-small"
                title="Close Window"
                aria-label="Close Assistant"
                style={{ fontSize: '14px', fontWeight: 'bold' }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: isDark ? '#0b1329' : '#f8fafc'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    background: msg.role === 'user' ? userBubbleBg : botBubbleBg,
                    color: msg.role === 'user' ? userBubbleText : botBubbleText,
                    padding: '12px 15px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '13px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: msg.role === 'model' ? `1px solid ${borderModal}` : 'none',
                    position: 'relative'
                  }}
                >
                  {renderFormattedMessage(msg.text)}

                  {/* Actions for Bot Message: Audio Speak & WhatsApp handoff */}
                  {msg.role === 'model' && (
                    <div style={{
                      marginTop: '8px',
                      paddingTop: '6px',
                      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}>
                      <div style={{ fontSize: '10px', opacity: 0.6, fontWeight: 600 }}>
                        {msg.timestamp}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => speakText(msg.text)}
                          title="Listen to response"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            fontSize: '12px',
                            opacity: 0.75,
                            padding: '2px 5px',
                            borderRadius: '4px'
                          }}
                        >
                          🔊 Speak
                        </button>
                        <a
                          href={`https://wa.me/${COLLEGE_PHONE}?text=${encodeURIComponent('Hello GNC Office! I need assistance regarding: ' + (messages[idx - 1]?.text || 'General Inquiry'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat with Counselor on WhatsApp"
                          style={{
                            background: '#25d366',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          WhatsApp ↗
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: botBubbleBg,
                padding: '10px 16px',
                borderRadius: '16px 16px 16px 4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: `1px solid ${borderModal}`,
                width: '60px',
                justifyContent: 'center'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', animation: 'gnc-dot-bounce 1.2s infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', animation: 'gnc-dot-bounce 1.2s infinite 0.2s' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', animation: 'gnc-dot-bounce 1.2s infinite 0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div
            className="hide-scroll"
            style={{
              padding: '8px 16px',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              background: isDark ? '#0f172a' : '#ffffff',
              borderTop: `1px solid ${borderModal}`
            }}
          >
            {QUICK_PROMPTS.map((item, qIdx) => (
              <button
                key={qIdx}
                type="button"
                className="gnc-prompt-chip"
                onClick={() => handleSend(null, item.query)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => handleSend(e)}
            style={{
              padding: '12px 16px',
              borderTop: `1px solid ${borderModal}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isDark ? '#0f172a' : '#ffffff'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening... Speak now' : 'Ask anything about Guru Nanak College...'}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '24px',
                border: `1px solid ${borderModal}`,
                background: isDark ? '#1e293b' : '#f1f5f9',
                color: textModal,
                fontSize: '13px',
                fontWeight: 500,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />

            {/* Mic button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={isListening ? 'Stop Listening' : 'Speak your query'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isListening ? '#ef4444' : (isDark ? '#1e293b' : '#f1f5f9'),
                color: isListening ? '#fff' : (isDark ? '#f8fafc' : '#0f172a'),
                border: `1px solid ${borderModal}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s',
                fontSize: '15px'
              }}
            >
              {isListening ? '⏹️' : '🎙️'}
            </button>

            {/* Send button */}
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: input.trim() ? '#f59e0b' : (isDark ? '#334155' : '#cbd5e1'),
                color: '#000',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                flexShrink: 0,
                transition: 'all 0.2s',
                boxShadow: input.trim() ? '0 4px 12px rgba(245, 158, 11, 0.4)' : 'none'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
