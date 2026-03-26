// src/components/ErrorBoundary.jsx
// ✅ Agar kisi bhi page pe unexpected JS error aaye toh
//    poora website crash nahi hoga — sirf wo page error message dikhayega
//
// Usage — App.jsx mein:
//   <ErrorBoundary page="EventsPage">
//     <EventsPage />
//   </ErrorBoundary>

import React from 'react';
import { COLORS } from '../styles/colors';

// ── Error States Config ─────────────────────────────────────────────
// Har page ke liye alag friendly message
const PAGE_MESSAGES = {
  HomePage:          { icon: '🏠', msg: 'Home page load nahi ho saka.'   },
  EventsPage:        { icon: '🏆', msg: 'Events section mein kuch gadbad.'  },
  NotificationsPage: { icon: '📢', msg: 'Notice board load nahi ho saka.' },
  DocumentsPage:     { icon: '📁', msg: 'Documents section mein error.'   },
  NewsPage:          { icon: '📣', msg: 'News section load nahi ho saka.' },
  VideoGallery:      { icon: '▶️',  msg: 'Video gallery load nahi ho saka.'},
  StaffPage:         { icon: '👨‍🏫', msg: 'Staff directory mein kuch gadbad.'},
  CollegeProfile:    { icon: '🏛️', msg: 'College profile load nahi ho saka.'},
  Contact:           { icon: '📞', msg: 'Contact page load nahi ho saka.' },
  PageViewer:        { icon: '📄', msg: 'Page content load nahi ho saka.' },
  PlacementsSection: { icon: '🎓', msg: 'Placements section mein error.'  },
  AlertBanner:       { icon: '🔔', msg: ''  }, // Silent — banner hide ho jaayega
  DEFAULT:           { icon: '⚠️', msg: 'Kuch gadbad ho gayi.'           },
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError:   false,
      errorMsg:   '',
      errorStack: '',
    };
  }

  // ── Step 1: Error pakdo ────────────────────────────────────────────
  static getDerivedStateFromError(error) {
    return {
      hasError:   true,
      errorMsg:   error?.message || 'Unknown error',
      errorStack: error?.stack   || '',
    };
  }

  // ── Step 2: Log karo (development mein helpful) ────────────────────
  componentDidCatch(error, info) {
    // Development mein console mein dikhega
    // Production mein vite.config.js ki wajah se remove ho jaayega

    // Future mein yahan Firebase error logging add kar sakte ho:
    // logError({ page: this.props.page, error: error.message, stack: info.componentStack });
  }

  // ── Step 3: Retry button ───────────────────────────────────────────
  handleReset = () => {
    this.setState({ hasError: false, errorMsg: '', errorStack: '' });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const pageName  = this.props.page || 'DEFAULT';
    const meta      = PAGE_MESSAGES[pageName] || PAGE_MESSAGES.DEFAULT;
    const navy      = COLORS.navy || '#0f2347';
    const gold      = COLORS.gold || '#f4a023';
    const isMinimal = this.props.minimal; // AlertBanner jaisi silent components

    // Silent mode — kuch bhi render mat karo
    if (isMinimal) return null;

    return (
      <div style={{
        minHeight:      '40vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '40px 20px',
        background:     '#f8fafc',
        fontFamily:     "'DM Sans', sans-serif",
      }}>
        <div style={{
          textAlign:    'center',
          background:   '#fff',
          borderRadius: '20px',
          padding:      '50px 40px',
          maxWidth:     '480px',
          width:        '100%',
          boxShadow:    '0 10px 40px rgba(0,0,0,0.06)',
          border:       '1px solid #e2e8f0',
        }}>
          {/* Icon */}
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>{meta.icon}</div>

          {/* Heading */}
          <h2 style={{
            color:        navy,
            fontSize:     '20px',
            fontWeight:   900,
            margin:       '0 0 10px',
            letterSpacing: '-0.3px',
          }}>
            Oops! Something went wrong
          </h2>

          {/* Message */}
          <p style={{
            color:        '#64748b',
            fontSize:     '14px',
            margin:       '0 0 24px',
            lineHeight:   1.6,
          }}>
            {meta.msg} Please try again or refresh the page.
          </p>

          {/* Error detail — sirf development mein dikhao */}
          {import.meta.env.DEV && this.state.errorMsg && (
            <details style={{
              textAlign:    'left',
              background:   '#fef2f2',
              border:       '1px solid #fecaca',
              borderRadius: '8px',
              padding:      '12px',
              marginBottom: '20px',
              fontSize:     '11px',
              color:        '#dc2626',
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 700, marginBottom: '6px' }}>
                🐛 Error Details (visible in dev only)
              </summary>
              <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {this.state.errorMsg}
              </code>
            </details>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleReset}
              style={{
                background:   `linear-gradient(135deg, ${navy}, #1a3a7c)`,
                color:        '#fff',
                border:       'none',
                borderRadius: '10px',
                padding:      '11px 24px',
                fontSize:     '14px',
                fontWeight:   800,
                cursor:       'pointer',
                fontFamily:   'inherit',
                transition:   'opacity .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              🔄 Try Again
            </button>

            <button
              onClick={() => window.location.href = '/'}
              style={{
                background:   '#f1f5f9',
                color:        '#475569',
                border:       '1px solid #e2e8f0',
                borderRadius: '10px',
                padding:      '11px 24px',
                fontSize:     '14px',
                fontWeight:   700,
                cursor:       'pointer',
                fontFamily:   'inherit',
              }}
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;