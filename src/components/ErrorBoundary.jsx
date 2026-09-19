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
  HomePage:          { icon: '🏠', msg: 'Unable to load the Home page.' },
  EventsPage:        { icon: '🏆', msg: 'Unable to load the Events section.' },
  NotificationsPage: { icon: '📢', msg: 'Unable to load the Notice Board.' },
  DocumentsPage:     { icon: '📁', msg: 'Unable to load the Documents section.' },
  NewsPage:          { icon: '📣', msg: 'Unable to load the News section.' },
  VideoGallery:      { icon: '▶️',  msg: 'Unable to load the Video Gallery.' },
  StaffPage:         { icon: '👨‍🏫', msg: 'Unable to load the Faculty & Staff directory.' },
  CollegeProfile:    { icon: '🏛️', msg: 'Unable to load the College Profile.' },
  Contact:           { icon: '📞', msg: 'Unable to load the Contact page.' },
  PageViewer:        { icon: '📄', msg: 'Unable to load the requested page.' },
  PlacementsSection: { icon: '🎓', msg: 'Unable to load the Placements section.' },
  AlertBanner:       { icon: '🔔', msg: '' },
  DEFAULT:           { icon: '⚠️', msg: 'An unexpected application error occurred.' },
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
    console.error('[ErrorBoundary caught error]:', error, info);
    this.setState({
      errorStack: (error?.stack || '') + (info?.componentStack ? `\n\nComponent Stack:${info.componentStack}` : '')
    });
  }

  // ── Step 3: Retry button ───────────────────────────────────────────
  handleReset = () => {
    this.setState({ hasError: false, errorMsg: '', errorStack: '', copied: false });
  };

  handleCopyReport = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'Unknown URL';
    const page = this.props.page || 'Unspecified Page';
    const report = [
      '=== GNC RUNTIME ERROR REPORT ===',
      `URL: ${url}`,
      `Page: ${page}`,
      `Error: ${this.state.errorMsg}`,
      '',
      '--- Stack Trace ---',
      this.state.errorStack || 'No stack trace captured',
      '================================'
    ].join('\n');

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(report).then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2500);
      }).catch(() => {});
    }
  };

  handleClearCacheAndReload = () => {
    try {
      if (typeof sessionStorage !== 'undefined') sessionStorage.clear();
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('gnc_site_settings_cache');
        localStorage.removeItem('gnc_nav_v1');
        localStorage.removeItem('gnc_nav_v1_ts');
      }
    } catch (_) {}
    window.location.reload();
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

    const currentUrl = typeof window !== 'undefined' ? (window.location.hash || window.location.pathname) : '';

    return (
      <div style={{
        minHeight:      '40vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '40px 20px',
        background:     '#f8fafc',
        fontFamily:     "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        <div style={{
          textAlign:    'center',
          background:   '#fff',
          borderRadius: '20px',
          padding:      '40px 32px',
          maxWidth:     '560px',
          width:        '100%',
          boxShadow:    '0 10px 40px rgba(0,0,0,0.06)',
          border:       '1px solid #e2e8f0',
        }}>
          {/* Icon */}
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{meta.icon}</div>

          {/* Heading */}
          <h2 style={{
            color:        navy,
            fontSize:     '20px',
            fontWeight:   900,
            margin:       '0 0 8px',
            letterSpacing: '-0.3px',
          }}>
            Oops! Something went wrong
          </h2>

          {/* Message */}
          <p style={{
            color:        '#64748b',
            fontSize:     '14px',
            margin:       '0 0 20px',
            lineHeight:   1.6,
          }}>
            {meta.msg} Please try again or refresh the page.
          </p>

          {/* Error detail — visible in dev mode, open by default */}
          {import.meta.env.DEV && this.state.errorMsg && (
            <details open style={{
              textAlign:    'left',
              background:   '#fef2f2',
              border:       '1px solid #fecaca',
              borderRadius: '10px',
              padding:      '14px',
              marginBottom: '20px',
              fontSize:     '11.5px',
              color:        '#b91c1c',
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 800, marginBottom: '8px', color: '#991b1b', userSelect: 'none' }}>
                🐛 Error Details (visible in dev only)
              </summary>

              <div style={{ marginBottom: 8, padding: '6px 10px', background: '#fee2e2', borderRadius: 6, fontSize: 11 }}>
                <div><strong>Route:</strong> <code>{currentUrl || '/'}</code></div>
                <div><strong>Component:</strong> <code>{pageName}</code></div>
              </div>

              <code style={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word', 
                display: 'block', 
                maxHeight: '220px', 
                overflowY: 'auto',
                background: '#450a0a',
                color: '#fecaca',
                padding: '10px 12px',
                borderRadius: '6px',
                lineHeight: 1.45,
                fontFamily: 'Consolas, Monaco, monospace',
                fontSize: '11px'
              }}>
                {this.state.errorMsg}
                {this.state.errorStack && `\n\n${this.state.errorStack}`}
              </code>

              <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={this.handleCopyReport}
                  style={{
                    background: this.state.copied ? '#16a34a' : '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background .2s'
                  }}
                >
                  {this.state.copied ? '✅ Copied to Clipboard!' : '📋 Copy Error Details'}
                </button>
                <button
                  type="button"
                  onClick={this.handleClearCacheAndReload}
                  style={{
                    background: '#ffffff',
                    color: '#991b1b',
                    border: '1px solid #fca5a5',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🧹 Clear Cache & Reload
                </button>
              </div>
            </details>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleReset}
              style={{
                background:   `linear-gradient(135deg, ${navy}, #1a3a7c)`,
                color:        '#fff',
                border:       'none',
                borderRadius: '10px',
                padding:      '11px 22px',
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
                padding:      '11px 22px',
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