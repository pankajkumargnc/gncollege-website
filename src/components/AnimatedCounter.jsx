// src/components/AnimatedCounter.jsx — Smooth CountUp on scroll using countup.js
import React, { useEffect, useRef, useState } from 'react';
import { CountUp } from 'countup.js';

export default function AnimatedCounter({ 
  end = 0, 
  duration = 2.5, 
  prefix = '', 
  suffix = '', 
  fallback = null 
}) {
  const spanRef = useRef(null);
  const countUpRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const num = Number(end) || 0;
          
          if (!countUpRef.current) {
            countUpRef.current = new CountUp(el, num, {
              startVal: 0,
              duration,
              prefix,
              suffix,
              separator: ',',
              enableScrollSpy: false
            });
          }

          if (!countUpRef.current.error) {
            countUpRef.current.start();
          } else {
            console.warn('CountUp error:', countUpRef.current.error);
            if (el) el.textContent = `${prefix}${end}${suffix}`;
          }
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, duration, prefix, suffix, hasAnimated]);

  return (
    <span ref={spanRef}>
      {fallback || `${prefix}${end}${suffix}`}
    </span>
  );
}
