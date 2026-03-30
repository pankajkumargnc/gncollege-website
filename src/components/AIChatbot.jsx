import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../styles/colors';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Guru Nanak College, Dhanbad. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Dark mode detection
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setIsTyping(true);

    // Simulated simple bot responses
    setTimeout(() => {
      setIsTyping(false);
      let botResponse = "I am a virtual assistant. Currently, I am in demo mode for testing.";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes('admission')) {
        botResponse = "For admission inquiries, please check our Admission Portal or visit the contact page.";
      } else if (lowerInput.includes('fees') || lowerInput.includes('fee')) {
        botResponse = "You can pay your fees online through our Fee Payment portal linked at the top of the site.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
        botResponse = "You can contact Bhuda Campus at +91 79033 40991 or email info@gncollege.org.";
      } else if (lowerInput.includes('website') || lowerInput.includes('beautiful') || lowerInput.includes('premium')) {
        botResponse = "Thank you! This website was designed as an Ultra Premium platform for Guru Nanak College.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello there! Ask me anything about GNC College.";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1500);
  };

  const bgModal = isDark ? 'rgba(10, 22, 48, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const borderModal = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.6)';
  const textModal = isDark ? '#e2e8f0' : '#1e293b';
  
  const botBubbleBg = isDark ? 'rgba(15, 35, 71, 0.8)' : '#f1f5f9';
  const botBubbleText = isDark ? '#e2e8f0' : '#334155';
  
  const userBubbleBg = COLORS.gold;
  const userBubbleText = '#fff';

  return (
    <>
      {/* Bot Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${COLORS.navy}, #1a365d)`,
          color: COLORS.gold,
          border: '2px solid rgba(244, 160, 35, 0.5)',
          boxShadow: '0 8px 32px rgba(15, 35, 71, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 999999,
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          transform: isOpen ? 'scale(0.9) rotate(15deg)' : 'scale(1) rotate(0deg)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(244, 160, 35, 0.5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = isOpen ? 'scale(0.9) rotate(15deg)' : 'scale(1) rotate(0deg)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(15, 35, 71, 0.4)'; }}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '25px',
          width: 'clamp(300px, 90vw, 360px)',
          height: '450px',
          background: bgModal,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${borderModal}`,
          borderRadius: '20px',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
          fontFamily: 'Inter, sans-serif'
        }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(90deg, ${COLORS.navy}, #1a365d)`,
            padding: '16px 20px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '35px', height: '35px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: `1px solid ${COLORS.gold}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px'
            }}>🤖</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', color: COLORS.gold }}>GNC Helper</div>
              <div style={{ fontSize: '11px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
                Online
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.isBot ? 'flex-start' : 'flex-end'
              }}>
                <div style={{
                  background: msg.isBot ? botBubbleBg : userBubbleBg,
                  color: msg.isBot ? botBubbleText : userBubbleText,
                  padding: '12px 16px',
                  borderRadius: msg.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  fontSize: '13.5px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: '10px', color: isDark ? '#64748b' : '#94a3b8', marginTop: '4px', padding: '0 6px' }}>
                  {msg.isBot ? 'GNC Bot' : 'You'}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: botBubbleBg,
                padding: '12px 16px',
                borderRadius: '16px 16px 16px 4px',
                display: 'flex',
                gap: '4px'
              }}>
                <span className="typing-dot" style={{ width: '6px', height: '6px', background: COLORS.gold, borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', background: COLORS.gold, borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out 0.2s' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', background: COLORS.gold, borderRadius: '50%', animation: 'typing 1.4s infinite ease-in-out 0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '16px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
            display: 'flex',
            gap: '10px',
            background: isDark ? 'rgba(10,22,48,0.9)' : '#fff'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
                background: isDark ? 'rgba(0,0,0,0.3)' : '#f8fafc',
                color: textModal,
                fontSize: '14px',
                outline: 'none',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <button type="submit" style={{
              width: '44px', height: '44px',
              borderRadius: '50%',
              background: COLORS.gold, color: '#fff',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'default',
              opacity: input.trim() ? 1 : 0.5,
              transition: 'all 0.2s',
              flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>

          <style>{`
            @keyframes typing {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-4px); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
