// src/utils/confetti.js — Celebration animations using dynamic canvas-confetti
// ⚡ Optimized per Section 32/33: Dynamic import on-demand prevents canvas-confetti
// from bloating the initial homepage critical bundle.

let confettiPromise = null;
function getConfetti() {
  if (!confettiPromise) {
    confettiPromise = import('canvas-confetti').then((m) => m.default || m);
  }
  return confettiPromise;
}

/**
 * Standard celebratory blast from bottom center
 */
export function fireConfetti(opts = {}) {
  getConfetti()
    .then((confetti) => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#0B1F3A', '#F4B942', '#10b981', '#3b82f6', '#ec4899'],
        ...opts
      });
    })
    .catch((e) => {
      console.warn('Confetti effect failed', e);
    });
}

export const triggerConfetti = fireConfetti;

/**
 * Double cannon celebration from left and right edges
 */
export function fireCelebration() {
  getConfetti()
    .then((confetti) => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#0B1F3A', '#D4A72C', '#2563eb', '#10b981', '#f59e0b']
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    })
    .catch((e) => {
      console.warn('Celebration confetti failed', e);
    });
}

/**
 * Golden stars shower for honors, achievements and awards
 */
export function fireStars() {
  getConfetti()
    .then((confetti) => {
      confetti({
        shapes: ['star'],
        colors: ['#FFE843', '#D4A72C', '#FFA500', '#ffffff'],
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 }
      });
    })
    .catch((e) => {
      console.warn('Stars confetti failed', e);
    });
}

/**
 * GNC Blue & Gold School Pride shower
 */
export function fireSchoolPride() {
  getConfetti()
    .then((confetti) => {
      const end = Date.now() + 2 * 1000;
      const colors = ['#0B1F3A', '#D4A72C', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    })
    .catch((e) => {
      console.warn('School pride confetti failed', e);
    });
}
