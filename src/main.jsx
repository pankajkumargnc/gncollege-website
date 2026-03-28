import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import AppWrapper from './AppWrapper'
import './styles/index.css'

// ── Root-level Error Boundary — poori app crash hone se bachata hai ──────────
class RootErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '100vh',
          background: '#0f2347', color: '#fff', fontFamily: 'sans-serif',
          padding: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>⚠️</div>
          <h1 style={{ color: '#f4a023', fontSize: 22, marginBottom: 10 }}>
            Website Load Nahi Ho Saka
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.7, marginBottom: 24 }}>
            {this.state.error?.message?.includes('Firebase')
              ? '🔥 Firebase configuration missing hai. Project root mein .env file banao.'
              : this.state.error?.message || 'Ek unexpected error aaya hai.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#f4a023', color: '#0f2347', border: 'none',
              borderRadius: 10, padding: '12px 28px', fontWeight: 800,
              fontSize: 15, cursor: 'pointer',
            }}
          >
            🔄 Page Reload Karo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <Router>
        <AppWrapper />
      </Router>
    </RootErrorBoundary>
  </React.StrictMode>,
)