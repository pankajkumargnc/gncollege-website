import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const Breadcrumbs = () => {
  const location = useLocation();

  // HashRouter ke liye path ko sahi se handle karna
  let path = location.pathname;
  if (path === '/' && location.hash.startsWith('#/')) {
    path = location.hash.substring(1);
  }
  
  const pathnames = path.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null; // Homepage par breadcrumb nahi dikhega
  }

  return (
    <div style={{ background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '12px 20px', 
        fontSize: '13.5px', 
        color: '#666',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500'
      }}>
        <Link to="/" style={{ color: COLORS.navy, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🏠</span> Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ margin: '0 10px', color: '#ccc', fontSize: '10px' }}>❯</span>
              {isLast ? (
                <span style={{ color: COLORS.gold, fontWeight: '700' }}>{label}</span>
              ) : (
                <Link to={to} style={{ color: COLORS.navy, textDecoration: 'none' }}>{label}</Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;