// src/hooks/useAdminIdleTimeout.js — Enterprise Admin Inactivity & Security Guard
// 🛡️ Enforces idle auto-logout (10–15 min timeout) with a 60-second warning countdown per Section 81
import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

const DEFAULT_IDLE_MINUTES = 15;
const DEFAULT_WARNING_SECONDS = 60;

/**
 * useAdminIdleTimeout Hook
 * 
 * @param {Object} options
 * @param {boolean} options.isActive - Whether the admin session is currently authenticated
 * @param {number} [options.timeoutMinutes=15] - Idle duration before termination
 * @param {number} [options.warningSeconds=60] - Pre-logout warning window
 * @param {Function} options.onLogout - Callback executed upon idle expiration
 */
export default function useAdminIdleTimeout({
  isActive = false,
  timeoutMinutes = DEFAULT_IDLE_MINUTES,
  warningSeconds = DEFAULT_WARNING_SECONDS,
  onLogout
}) {
  const [showWarning, setShowWarning] = useState(false);
  const [remainingWarningSecs, setRemainingWarningSecs] = useState(warningSeconds);

  const lastActivityRef = useRef(Date.now());
  const throttleRef = useRef(0);

  const totalTimeoutMs = (timeoutMinutes || DEFAULT_IDLE_MINUTES) * 60 * 1000;
  const warningWindowMs = (warningSeconds || DEFAULT_WARNING_SECONDS) * 1000;
  const warningThresholdMs = totalTimeoutMs - warningWindowMs;

  // Reset timer on genuine user activity
  const recordActivity = useCallback(() => {
    const now = Date.now();
    // Throttle to at most once per 1000ms to preserve performance
    if (now - throttleRef.current > 1000) {
      throttleRef.current = now;
      lastActivityRef.current = now;
      if (showWarning) {
        setShowWarning(false);
        setRemainingWarningSecs(warningSeconds);
      }
    }
  }, [showWarning, warningSeconds]);

  // Explicit user action to dismiss warning and extend session
  const staySignedIn = useCallback(() => {
    lastActivityRef.current = Date.now();
    throttleRef.current = Date.now();
    setShowWarning(false);
    setRemainingWarningSecs(warningSeconds);
    toast.success('Session extended. You remain signed in.', { icon: '🛡️', duration: 2500 });
  }, [warningSeconds]);

  useEffect(() => {
    if (!isActive) {
      setShowWarning(false);
      return;
    }

    lastActivityRef.current = Date.now();

    // User interaction listeners
    const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleEvent = () => recordActivity();

    ACTIVITY_EVENTS.forEach((evt) => {
      window.addEventListener(evt, handleEvent, { passive: true });
    });

    // Check ticker every second
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;

      if (elapsed >= totalTimeoutMs) {
        // Expired! Execute logout
        clearInterval(interval);
        setShowWarning(false);
        toast.error('Admin session expired due to inactivity. Signed out for security.', {
          icon: '🔒',
          duration: 6000
        });
        if (typeof onLogout === 'function') {
          onLogout();
        }
      } else if (elapsed >= warningThresholdMs) {
        // Within warning countdown window
        const leftSecs = Math.max(1, Math.ceil((totalTimeoutMs - elapsed) / 1000));
        setShowWarning(true);
        setRemainingWarningSecs(leftSecs);
      } else {
        if (showWarning) {
          setShowWarning(false);
        }
      }
    }, 1000);

    return () => {
      ACTIVITY_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handleEvent);
      });
      clearInterval(interval);
    };
  }, [isActive, totalTimeoutMs, warningThresholdMs, onLogout, recordActivity, showWarning]);

  return {
    showWarning,
    remainingWarningSecs,
    staySignedIn,
    recordActivity
  };
}
