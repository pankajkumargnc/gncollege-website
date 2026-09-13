import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { triggerConfetti } from '../utils/confetti';
import { useTranslation } from 'react-i18next';

const FALLBACK_POLL = {
  id: 'campus-fest-workshop-2026',
  question: 'Which skill workshop should Guru Nanak College organize next month?',
  questionHi: 'गुरु नानक कॉलेज को अगले महीने कौन सी कौशल कार्यशाला आयोजित करनी चाहिए?',
  options: [
    { text: 'AI & Generative Tools for Students', textHi: 'छात्रों के लिए एआई और जेनरेटिव टूल्स', votes: 142 },
    { text: 'Full Stack Web & Mobile App Dev', textHi: 'फुल स्टैक वेब और मोबाइल ऐप डेवलपमेंट', votes: 215 },
    { text: 'Cybersecurity & Ethical Hacking', textHi: 'साइबर सुरक्षा और नैतिक हैकिंग', votes: 118 },
    { text: 'Data Analytics with Python', textHi: 'पायथन के साथ डेटा एनालिटिक्स', votes: 164 }
  ],
  active: true,
  createdAt: new Date().toISOString()
};

export default function PollWidget({ className = '' }) {
  const { t, i18n } = useTranslation();
  const isHi = i18n?.language === 'hi';

  const [poll, setPoll] = useState(FALLBACK_POLL);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVotedIndex, setUserVotedIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check local storage for previous vote
    const checkVoted = (pollId) => {
      const stored = localStorage.getItem(`gnc_poll_voted_${pollId}`);
      if (stored !== null) {
        setHasVoted(true);
        setUserVotedIndex(parseInt(stored, 10));
      } else {
        setHasVoted(false);
        setUserVotedIndex(null);
      }
    };

    checkVoted(FALLBACK_POLL.id);

    // Try listening to Firestore
    try {
      const q = query(collection(db, 'polls'), where('active', '==', true));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();
          const loadedPoll = { id: snapshot.docs[0].id, ...docData };
          setPoll(loadedPoll);
          checkVoted(loadedPoll.id);
        } else {
          setPoll(null);
        }
      }, (err) => {
        console.warn('Using fallback poll data:', err?.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore poll listener not active:', e?.message);
    }
  }, []);

  if (!poll) return null;

  const totalVotes = (poll.options || []).reduce((acc, curr) => acc + (curr.votes || 0), 0);

  const handleVote = async () => {
    if (selectedOption === null || hasVoted || isSubmitting) return;
    setIsSubmitting(true);

    const updatedOptions = [...poll.options];
    updatedOptions[selectedOption] = {
      ...updatedOptions[selectedOption],
      votes: (updatedOptions[selectedOption].votes || 0) + 1
    };

    setPoll(prev => ({ ...prev, options: updatedOptions }));
    setHasVoted(true);
    setUserVotedIndex(selectedOption);
    localStorage.setItem(`gnc_poll_voted_${poll.id}`, selectedOption.toString());

    // Celebrate with confetti
    triggerConfetti();

    // Persist to Firestore if possible
    try {
      if (poll.id && poll.id !== FALLBACK_POLL.id) {
        const pollRef = doc(db, 'polls', poll.id);
        await updateDoc(pollRef, {
          options: updatedOptions
        });
      }
    } catch (err) {
      console.warn('Could not persist vote to Firestore, local state updated:', err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`gnc-poll-card ${className}`}
      data-aos="fade-up"
      style={{
        background: '#ffffff',
        borderRadius: 20,
        padding: 'clamp(24px, 4vw, 36px)',
        boxShadow: '0 12px 40px rgba(15, 35, 71, 0.08)',
        border: '1.5px solid rgba(15, 35, 71, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'linear-gradient(90deg, #f4a023, #0f2347, #f4a023)'
      }} />

      {/* Header Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(244, 160, 35, 0.12)',
          color: '#b87711',
          padding: '6px 14px',
          borderRadius: 50,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 0.5,
          textTransform: 'uppercase'
        }}>
          <span style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#22c55e',
            display: 'inline-block',
            boxShadow: '0 0 8px #22c55e'
          }} />
          {isHi ? 'छात्र मत / जनमत' : 'Student Voice Poll'}
        </div>
        
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
          📊 {totalVotes} {isHi ? 'कुल मत' : 'votes cast'}
        </span>
      </div>

      {/* Question */}
      <h3 style={{
        fontSize: 'clamp(18px, 2.2vw, 22px)',
        fontWeight: 800,
        color: '#0f2347',
        lineHeight: 1.35,
        margin: '0 0 20px 0'
      }}>
        {isHi && poll.questionHi ? poll.questionHi : poll.question}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {(poll.options || []).map((opt, idx) => {
          const voteCount = opt.votes || 0;
          const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          const isSelected = selectedOption === idx;
          const isUserVote = userVotedIndex === idx;

          const displayText = isHi && opt.textHi ? opt.textHi : opt.text;

          return (
            <div
              key={idx}
              onClick={() => !hasVoted && setSelectedOption(idx)}
              style={{
                position: 'relative',
                borderRadius: 14,
                border: isSelected || isUserVote ? '2px solid #f4a023' : '1.5px solid #e2e8f0',
                padding: '14px 18px',
                cursor: hasVoted ? 'default' : 'pointer',
                background: isSelected ? 'rgba(244, 160, 35, 0.04)' : '#f8fafc',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Progress bar background for results */}
              {hasVoted && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${percentage}%`,
                    background: isUserVote ? 'rgba(244, 160, 35, 0.22)' : 'rgba(15, 35, 71, 0.07)',
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 0
                  }}
                />
              )}

              <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {!hasVoted && (
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #f4a023' : '2px solid #cbd5e1',
                      background: '#fff',
                      transition: 'border 0.2s ease',
                      flexShrink: 0
                    }} />
                  )}
                  {isUserVote && (
                    <span style={{ color: '#f4a023', fontWeight: 900, fontSize: 16 }}>✓</span>
                  )}
                  <span style={{
                    fontSize: 14.5,
                    fontWeight: isSelected || isUserVote ? 700 : 500,
                    color: '#0f2347'
                  }}>
                    {displayText}
                  </span>
                </div>

                {hasVoted && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                      {voteCount}
                    </span>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: isUserVote ? '#b87711' : '#0f2347',
                      minWidth: 42,
                      textAlign: 'right'
                    }}>
                      {percentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action / Feedback */}
      <div>
        {!hasVoted ? (
          <button
            onClick={handleVote}
            disabled={selectedOption === null || isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              background: selectedOption !== null ? 'linear-gradient(135deg, #f4a023 0%, #e08b10 100%)' : '#e2e8f0',
              color: selectedOption !== null ? '#0f2347' : '#94a3b8',
              border: 'none',
              fontWeight: 800,
              fontSize: 14.5,
              cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: selectedOption !== null ? '0 4px 14px rgba(244, 160, 35, 0.35)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            {isSubmitting ? (isHi ? 'वोट दर्ज हो रहा है...' : 'Recording Vote...') : (isHi ? '🗳️ अपना वोट दें' : '🗳️ Submit Your Vote')}
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px 16px',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: 12,
            color: '#15803d',
            fontSize: 13,
            fontWeight: 700
          }}>
            <span>✨</span>
            <span>{isHi ? 'धन्यवाद! आपका मत दर्ज कर लिया गया है।' : 'Thank you! Your vote has been recorded.'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
