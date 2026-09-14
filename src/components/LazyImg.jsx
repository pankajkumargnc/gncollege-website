// src/components/LazyImg.jsx — Progressive Image with IntersectionObserver
import { useState, useRef, useEffect, memo } from 'react';

// ── Shared observer singleton ──────────────────────────────────────────────
let _sharedObserver = null;
const _callbacks = new WeakMap();

function getSharedObserver() {
  if (!_sharedObserver && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    _sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = _callbacks.get(entry.target);
            if (cb) {
              cb();
              _sharedObserver.unobserve(entry.target);
              _callbacks.delete(entry.target);
            }
          }
        });
      },
      { rootMargin: '200px' }
    );
  }
  return _sharedObserver;
}

const LazyImg = memo(function LazyImg({ src, fallbackSrc, alt = '', className = '', style = {}, width, height, onClick, fallbackIcon = '🖼️' }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = getSharedObserver();
    if (!observer) {
      setInView(true);
      return;
    }

    _callbacks.set(el, () => setInView(true));
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      _callbacks.delete(el);
    };
  }, []);

  return (
    <div ref={imgRef} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }} onClick={onClick}>
      {!loaded && !hasError && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(110deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          borderRadius: 'inherit',
        }} />
      )}
      {hasError && (
        <div style={{
          position: 'absolute', inset: 0,
          background: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94a3b8',
          fontSize: 24,
          borderRadius: 'inherit'
        }}>
          {fallbackIcon}
        </div>
      )}
      {inView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            if (fallbackSrc && e.target.src !== fallbackSrc) {
              e.target.src = fallbackSrc;
            } else {
              setHasError(true);
            }
            setLoaded(true);
          }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            display: 'block',
          }}
        />
      )}
    </div>
  );
});

export default LazyImg;
