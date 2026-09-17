// src/utils/errorTracker.js — Enterprise Error Tracking & Monitoring
// Supports Sentry (via VITE_SENTRY_DSN) with graceful zero-dependency fallback.

let isInitialized = false;

/**
 * Initialize error tracking
 * If Sentry is installed and VITE_SENTRY_DSN is provided, initializes Sentry.
 * Otherwise, falls back to graceful console/telemetry monitoring with zero crashes.
 */
export function initErrorTracker() {
  if (isInitialized) return;
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (dsn && import.meta.env.PROD) {
    const sentryPkg = '@sentry/react';
    import(/* @vite-ignore */ sentryPkg)
      .then((Sentry) => {
        Sentry.init({
          dsn,
          integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false })
          ],
          tracesSampleRate: 0.1,
          replaysSessionSampleRate: 0.05,
          replaysOnErrorSampleRate: 1.0,
          environment: import.meta.env.MODE || 'production'
        });
        console.log('[ErrorTracker] Sentry monitoring initialized.');
      })
      .catch(() => {
        console.warn('[ErrorTracker] @sentry/react not installed; running in resilient fallback mode.');
      });
  }

  // Global window error listener for unhandled runtime exceptions
  window.addEventListener('error', (event) => {
    if (import.meta.env.DEV) {
      console.warn('[ErrorTracker] Unhandled error captured:', event.error || event.message);
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    if (import.meta.env.DEV) {
      console.warn('[ErrorTracker] Unhandled Promise rejection captured:', event.reason);
    }
  });

  isInitialized = true;
}

/**
 * Capture an exception manually
 * @param {Error|string} error
 * @param {object} [context]
 */
export function captureException(error, context = {}) {
  if (import.meta.env.DEV) {
    console.error('[ErrorTracker] Captured exception:', error, context);
  }

  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (dsn && typeof window !== 'undefined' && window.__SENTRY__) {
    const sentryPkg = '@sentry/react';
    import(/* @vite-ignore */ sentryPkg).then((Sentry) => {
      Sentry.captureException(error, { extra: context });
    }).catch(() => {});
  }
}

export default { initErrorTracker, captureException };
