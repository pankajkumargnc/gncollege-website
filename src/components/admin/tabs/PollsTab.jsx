// src/components/admin/tabs/PollsTab.jsx
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD, BG, Toggle, SectionSearch } from '../AdminShared';
import { exportToExcel } from '../../../utils/excelExport';

export default function PollsTab({ logAct }) {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // New poll form
  const [question, setQuestion] = useState('');
  const [questionHi, setQuestionHi] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'polls'), (snapshot) => {
        const loaded = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setPolls(loaded);
        setLoading(false);
      }, (err) => {
        console.error('Error fetching polls:', err);
        setLoading(false);
      });
      return () => unsub();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOptionField = () => {
    if (options.length >= 6) {
      toast.error('Maximum 6 options allowed per poll');
      return;
    }
    setOptions([...options, '']);
  };

  const removeOptionField = (index) => {
    if (options.length <= 2) {
      toast.error('At least 2 options are required');
      return;
    }
    setOptions(options.filter((_, i) => i !== index));
  };

  const createPoll = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error('Please enter a poll question');
      return;
    }
    const cleanOptions = options.map(o => o.trim()).filter(Boolean);
    if (cleanOptions.length < 2) {
      toast.error('At least 2 valid options are required');
      return;
    }

    setSubmitting(true);
    try {
      const formattedOptions = cleanOptions.map(opt => ({
        text: opt,
        votes: 0
      }));

      // If set as active, optionally deactivate other polls
      if (isActive) {
        for (const p of polls) {
          if (p.active) {
            await updateDoc(doc(db, 'polls', p.id), { active: false });
          }
        }
      }

      await addDoc(collection(db, 'polls'), {
        question: question.trim(),
        questionHi: questionHi.trim() || null,
        options: formattedOptions,
        active: isActive,
        createdAt: serverTimestamp()
      });

      toast.success('🗳️ Student Poll created successfully!');
      if (logAct) logAct('add', `Poll: ${question.trim()}`, 'polls');

      // Reset form
      setQuestion('');
      setQuestionHi('');
      setOptions(['', '', '']);
      setIsActive(true);
    } catch (err) {
      toast.error(err?.message || 'Failed to create poll');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (poll) => {
    try {
      const newActive = !poll.active;
      if (newActive) {
        // Deactivate others
        for (const p of polls) {
          if (p.id !== poll.id && p.active) {
            await updateDoc(doc(db, 'polls', p.id), { active: false });
          }
        }
      }
      await updateDoc(doc(db, 'polls', poll.id), { active: newActive });
      toast.success(newActive ? 'Poll activated live!' : 'Poll deactivated.');
      if (logAct) logAct('update', `Poll ${poll.id} active=${newActive}`, 'polls');
    } catch (err) {
      toast.error(err?.message || 'Error updating status');
    }
  };

  const resetVotes = async (poll) => {
    if (!window.confirm(`Reset all votes for "${poll.question}" back to zero?`)) return;
    try {
      const resetOpts = (poll.options || []).map(o => ({ ...o, votes: 0 }));
      await updateDoc(doc(db, 'polls', poll.id), { options: resetOpts });
      toast.success('Poll votes reset to 0');
      if (logAct) logAct('update', `Reset votes for poll ${poll.id}`, 'polls');
    } catch (err) {
      toast.error(err?.message || 'Error resetting votes');
    }
  };

  const deletePoll = async (poll) => {
    if (!window.confirm(`Delete poll: "${poll.question}"?`)) return;
    try {
      await deleteDoc(doc(db, 'polls', poll.id));
      toast.success('Poll deleted');
      if (logAct) logAct('delete', `Deleted poll: ${poll.question}`, 'polls');
    } catch (err) {
      toast.error(err?.message || 'Error deleting poll');
    }
  };

  const handleExport = (poll) => {
    const totalVotes = (poll.options || []).reduce((acc, curr) => acc + (curr.votes || 0), 0);
    const data = (poll.options || []).map((o, idx) => ({
      'Option No': idx + 1,
      'Option Choice': o.text,
      'Votes Received': o.votes || 0,
      'Percentage Share': totalVotes > 0 ? `${Math.round(((o.votes || 0) / totalVotes) * 100)}%` : '0%'
    }));

    exportToExcel(data, `GNC_Poll_${poll.question.slice(0, 25).replace(/[^a-zA-Z0-9]/g, '_')}`);
    toast.success('Poll results exported to Excel! 📊');
  };

  const filteredPolls = polls.filter(p =>
    !search || p.question?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
      {/* Header Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a7c 100%)`,
        borderRadius: 16,
        padding: '24px 30px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <h2 style={{ margin: '0 0 6px 0', fontSize: 22, fontWeight: 900, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🗳️</span> Campus Polls & Student Voice
          </h2>
          <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.75)' }}>
            Conduct live polls for students, collect instant votes, and export verified statistical data.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            background: 'rgba(244,160,35,0.2)',
            border: '1px solid #f4a023',
            color: '#f4a023',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800
          }}>
            {polls.filter(p => p.active).length} Active Live
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.3fr)', gap: 24, alignItems: 'start' }}>
        {/* Create Form */}
        <form onSubmit={createPoll} style={{
          background: '#fff',
          border: `1.5px solid ${T.b1}`,
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 18
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: NAVY }}>Create New Poll</h3>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 6 }}>
              Poll Question (English) *
            </label>
            <input
              type="text"
              placeholder="e.g., Which workshop topic do you prefer next month?"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: `1.5px solid ${T.b1}`,
                fontSize: 13.5,
                outline: 'none'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: T.t2, marginBottom: 6 }}>
              Poll Question (Hindi - Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., अगले महीने आप किस कार्यशाला विषय को पसंद करेंगे?"
              value={questionHi}
              onChange={e => setQuestionHi(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: `1.5px solid ${T.b1}`,
                fontSize: 13.5,
                outline: 'none'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: T.t2 }}>
                Options / Choices ({options.length})
              </label>
              {options.length < 6 && (
                <button
                  type="button"
                  onClick={addOptionField}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0284c7',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer'
                  }}
                >
                  + Add Option
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {options.map((opt, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', width: 20 }}>
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(idx, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: `1.5px solid ${T.b1}`,
                      fontSize: 13,
                      outline: 'none'
                    }}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOptionField(idx)}
                      style={{
                        background: '#fee2e2',
                        border: 'none',
                        color: '#ef4444',
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: 800
                      }}
                      title="Remove option"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderTop: `1px solid ${T.b1}` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>Set as Active Live Poll</span>
            <Toggle checked={isActive} onChange={setIsActive} />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: GOLD,
              color: NAVY,
              fontWeight: 800,
              padding: '12px 20px',
              borderRadius: 10,
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: 14,
              boxShadow: '0 4px 12px rgba(244,160,35,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            {submitting ? 'Creating Poll...' : '🚀 Publish Student Poll'}
          </button>
        </form>

        {/* Existing Polls List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: NAVY }}>
              All Polls ({filteredPolls.length})
            </h3>
            <div style={{ width: 220 }}>
              <SectionSearch value={search} onChange={setSearch} placeholder="Search polls..." />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: 30, textAlign: 'center', color: '#94a3b8' }}>Loading campus polls...</div>
          ) : filteredPolls.length === 0 ? (
            <div style={{
              background: '#fff',
              border: `1.5px solid ${T.b1}`,
              borderRadius: 16,
              padding: 40,
              textAlign: 'center',
              color: '#94a3b8'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🗳️</div>
              <div style={{ fontWeight: 700 }}>No polls found</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Create your first poll using the form on the left!</div>
            </div>
          ) : (
            filteredPolls.map((p) => {
              const total = (p.options || []).reduce((acc, curr) => acc + (curr.votes || 0), 0);

              return (
                <div key={p.id} style={{
                  background: '#fff',
                  border: p.active ? `2px solid #f4a023` : `1.5px solid ${T.b1}`,
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: p.active ? '0 8px 24px rgba(244,160,35,0.12)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{
                          background: p.active ? 'rgba(34,197,94,0.12)' : 'rgba(100,116,139,0.12)',
                          color: p.active ? '#15803d' : '#64748b',
                          padding: '3px 8px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 800
                        }}>
                          {p.active ? '🟢 ACTIVE LIVE' : '⚪ CLOSED'}
                        </span>
                        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                          Total Votes: {total}
                        </span>
                      </div>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: NAVY }}>
                        {p.question}
                      </h4>
                      {p.questionHi && (
                        <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#64748b' }}>
                          {p.questionHi}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => toggleActive(p)}
                        className="abtn abtn-outline abtn-sm"
                        style={{ fontSize: 11 }}
                      >
                        {p.active ? 'Pause' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleExport(p)}
                        className="abtn abtn-outline abtn-sm"
                        style={{ fontSize: 11, color: '#15803d', borderColor: '#86efac' }}
                        title="Export Excel"
                      >
                        📊 Excel
                      </button>
                      <button
                        onClick={() => resetVotes(p)}
                        className="abtn abtn-outline abtn-sm"
                        style={{ fontSize: 11, color: '#f59e0b' }}
                        title="Reset Votes"
                      >
                        🔄 Reset
                      </button>
                      <button
                        onClick={() => deletePoll(p)}
                        className="abtn abtn-danger abtn-sm"
                        style={{ fontSize: 11 }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Options Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(p.options || []).map((o, idx) => {
                      const pct = total > 0 ? Math.round(((o.votes || 0) / total) * 100) : 0;

                      return (
                        <div key={idx} style={{
                          background: BG,
                          borderRadius: 8,
                          padding: '8px 12px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: `${pct}%`,
                            background: 'rgba(244,160,35,0.2)',
                            transition: 'width 0.4s ease'
                          }} />
                          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12.5, fontWeight: 600, color: NAVY }}>{o.text}</span>
                            <span style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>
                              {o.votes || 0} votes ({pct}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
