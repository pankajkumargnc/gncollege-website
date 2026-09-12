// src/components/WhatsAppButton.jsx
import React, { useState, useEffect, useRef } from 'react';

const COLLEGE_PHONE = '917903340991'; // 91 + 7903340991
const COLLEGE_NAME = 'Guru Nanak College, Dhanbad';

const QUICK_TOPICS = [
  { id: 'admission', label: '🎓 Admission 2026', text: 'Namaste! Main 2026 Session mein Admission ke baare mein jaankari chahta hoon. (UG/Vocational courses)' },
  { id: 'fee', label: '💳 Fee Payment / Receipt', text: 'Namaste! Mujhe Fee Payment / CIMS ERP Receipt ke regarding help chahiye.' },
  { id: 'exam', label: '📋 Exam / Admit Card', text: 'Namaste! Examination form / Admit card / BBMKU Result ke regarding query hai.' },
  { id: 'certificate', label: '📜 TC / Migration / CLC', text: 'Namaste! College Leaving Certificate (CLC) / TC / Migration certificate lene ka process jaanna hai.' },
  { id: 'general', label: '🏫 General Enquiry', text: 'Namaste! Main Guru Nanak College ke regarding inquiry karna chahta hoon.' },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic.id);
    setUserQuery(topic.text);
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const message = userQuery.trim() || 'Namaste! Main Guru Nanak College ke baare mein jaankari chahta hoon.';
    const finalUrl = `https://wa.me/${COLLEGE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          70%  { box-shadow: 0 0 0 16px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes wa-slide-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .wa-floating-btn {
          position: fixed;
          bottom: clamp(95px, 13vw, 115px);
          right: clamp(18px, 3vw, 25px);
          z-index: 999990;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0;
        }
        .wa-floating-btn:hover .wa-circle {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 10px 28px rgba(37, 211, 102, 0.45);
        }
        .wa-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25d366, #128c7e);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          animation: wa-pulse 2.2s infinite;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
          position: relative;
        }
        .wa-online-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #4ade80;
          border: 2.5px solid #fff;
          box-shadow: 0 0 6px #22c55e;
        }
        .wa-tooltip-pill {
          background: #0f2347;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 20px;
          white-space: nowrap;
          font-family: 'Inter', sans-serif;
          position: relative;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          border: 1px solid rgba(244, 160, 35, 0.4);
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.2px;
        }
        .wa-tooltip-pill::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: #0f2347;
          border-right: none;
        }

        /* ── POPUP WINDOW ── */
        .wa-popup-window {
          position: fixed;
          bottom: clamp(160px, 20vw, 180px);
          right: clamp(16px, 3vw, 25px);
          width: clamp(320px, 92vw, 380px);
          max-height: 520px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.25);
          z-index: 999995;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: wa-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .wa-popup-header {
          background: linear-gradient(135deg, #075e54, #128c7e);
          color: #fff;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .wa-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wa-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #25d366;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .wa-avatar img {
          width: 34px;
          height: 34px;
          object-fit: contain;
        }
        .wa-header-info {
          display: flex;
          flex-direction: column;
        }
        .wa-header-title {
          font-weight: 800;
          font-size: 14.5px;
          display: flex;
          align-items: center;
          gap: 5px;
          letter-spacing: 0.2px;
        }
        .wa-verified-badge {
          background: #25d366;
          color: #fff;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 900;
        }
        .wa-header-status {
          font-size: 11.5px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .wa-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          display: inline-block;
          box-shadow: 0 0 6px #4ade80;
        }
        .wa-close-btn {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.2s;
        }
        .wa-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* ── BODY CHAT ── */
        .wa-popup-body {
          flex: 1;
          background: #e5ddd5;
          background-image: radial-gradient(rgba(0,0,0,0.05) 1px, transparent 0);
          background-size: 14px 14px;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wa-chat-bubble {
          align-self: flex-start;
          background: #fff;
          color: #111827;
          border-radius: 4px 14px 14px 14px;
          padding: 12px 14px;
          max-width: 92%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          position: relative;
        }
        .wa-chat-author {
          font-weight: 800;
          font-size: 12px;
          color: #075e54;
          margin-bottom: 4px;
        }
        .wa-chat-text {
          font-size: 13px;
          line-height: 1.5;
          color: #374151;
        }
        .wa-chat-time {
          font-size: 10px;
          color: #9ca3af;
          text-align: right;
          margin-top: 4px;
          font-weight: 600;
        }

        /* ── QUICK CHIPS ── */
        .wa-chips-title {
          font-size: 11px;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 4px 0 2px;
        }
        .wa-chips-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wa-topic-chip {
          background: #ffffff;
          color: #075e54;
          border: 1px solid rgba(7, 94, 84, 0.2);
          border-radius: 12px;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .wa-topic-chip:hover {
          background: #f0fdf4;
          border-color: #25d366;
          transform: translateX(3px);
        }
        .wa-topic-chip.active {
          background: #dcf8c6;
          border-color: #25d366;
          font-weight: 700;
        }

        /* ── INPUT FOOTER ── */
        .wa-popup-footer {
          background: #f0f2f5;
          padding: 12px 14px;
          border-top: 1px solid rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .wa-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wa-input-field {
          flex: 1;
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 24px;
          padding: 10px 16px;
          font-size: 13px;
          color: #111827;
          outline: none;
          transition: border-color 0.2s;
        }
        .wa-input-field:focus {
          border-color: #25d366;
        }
        .wa-send-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.4);
        }
        .wa-send-btn:hover {
          background: #1ebe57;
          transform: scale(1.06);
        }
        .wa-footer-subtext {
          font-size: 10.5px;
          color: #6b7280;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
      `}</style>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="wa-floating-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="WhatsApp Support Window Kholiye"
        aria-label="Toggle WhatsApp live support chat"
      >
        {/* Hover Tooltip Pill */}
        {hovered && !isOpen && (
          <div className="wa-tooltip-pill">
            <span>🟢 Chat with College Helpdesk</span>
          </div>
        )}

        {/* Pulsing WhatsApp Circle */}
        <div className="wa-circle">
          <span className="wa-online-dot"></span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </button>

      {/* Interactive WhatsApp Live Helpdesk Popup Window */}
      {isOpen && (
        <div className="wa-popup-window" role="dialog" aria-modal="true" aria-label="WhatsApp Live Chat Widget">
          {/* Header */}
          <div className="wa-popup-header">
            <div className="wa-header-left">
              <div className="wa-avatar">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo.webp`}
                  alt="Guru Nanak College Logo"
                  onError={(e) => { e.currentTarget.src = 'https://gncollege.org/images/logo.webp'; }}
                />
                <span className="wa-online-dot" style={{ width: '12px', height: '12px', top: '-2px', right: '-2px' }}></span>
              </div>
              <div className="wa-header-info">
                <div className="wa-header-title">
                  Guru Nanak College Helpdesk
                  <span className="wa-verified-badge" title="Official Verified WhatsApp">✓</span>
                </div>
                <div className="wa-header-status">
                  <span className="wa-status-dot"></span>
                  <span>Bhuda Campus • Typically replies in 15 mins</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="wa-close-btn"
              title="Close window"
              aria-label="Close WhatsApp chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="wa-popup-body">
            {/* Official Greeting Bubble */}
            <div className="wa-chat-bubble">
              <div className="wa-chat-author">Guru Nanak College Office</div>
              <div className="wa-chat-text">
                Sat Sri Akal! 🙏 <strong>Guru Nanak College Dhanbad</strong> Helpdesk mein aapka swagat hai.
                <br /><br />
                Aapko kis vishay mein sahayata chahiye? Kripya neeche diye gaye topic chunein ya apna sawal type karein:
              </div>
              <div className="wa-chat-time">{currentTime || '12:00 PM'}</div>
            </div>

            {/* Quick Topic Chips */}
            <div className="wa-chips-title">Suggested Inquiries</div>
            <div className="wa-chips-container">
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic)}
                  className={`wa-topic-chip ${selectedTopic === topic.id ? 'active' : ''}`}
                >
                  <span>{topic.label}</span>
                  <span style={{ opacity: 0.6, fontSize: '11px' }}>➜</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input & Action Footer */}
          <form onSubmit={handleSend} className="wa-popup-footer">
            <div className="wa-input-row">
              <input
                ref={inputRef}
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Type your question here..."
                className="wa-input-field"
              />
              <button 
                type="submit" 
                className="wa-send-btn"
                title="Send via WhatsApp"
                aria-label="Send via WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div className="wa-footer-subtext">
              <span>🔒 Direct chat with College Office on <strong>+91 7903340991</strong></span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}