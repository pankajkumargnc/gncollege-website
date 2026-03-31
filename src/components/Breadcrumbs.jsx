// src/components/Breadcrumbs.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { COLORS } from '../styles/colors';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // 🚀 Smart Formatter: College ke short-forms ko Capital rakhega
  const formatName = (name) => {
    const map = {
      'bbmku': 'BBMKU',
      'vbu': 'VBU',
      'ug': 'UG',
      'pg': 'PG',
      'iqac': 'IQAC',
      'aqar': 'AQAR',
      'nirf': 'NIRF',
      'nss': 'NSS',
      'ncc': 'NCC',
      'rusa': 'RUSA',
      'icc': 'ICC',
      'obc': 'OBC',
      'sc-st': 'SC/ST',
      'ssr-1st-cycle': 'SSR 1st Cycle',
      'ssr-2nd-cycle': 'SSR 2nd Cycle',
      'fyugp': 'FYUGP',
      'cbcs': 'CBCS',
      'bca': 'BCA'
    };
    
    const lowerName = name.toLowerCase();
    if (map[lowerName]) return map[lowerName];

    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => {
        if (map[word.toLowerCase()]) return map[word.toLowerCase()];
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  // 🚀 SMART REDIRECTOR: Blank Pages rokne ke liye
  // Agar koi in categories pe click karega toh usko inke first valid page par bhej diya jayega
  const categoryRedirects = {
    '/about-us': '/about-us/college-profile',
    '/about-us/college-management': '/about-us/college-management/principal',
    '/about-us/various-committees': '/about-us/various-committees/womens-cell',
    '/about-us/regulations': '/about-us/regulations/college-affiliation',
    '/about-us/regulations/bbmku': '/about-us/regulations/bbmku/ug-regulation-cbcs',
    '/about-us/regulations/vbu': '/about-us/regulations/vbu/ug-regulation-2015',
    '/campus': '/campus/infrastructure',
    '/campus/visuals': '/campus/visuals/bhuda',
    '/academics': '/academics/course-offered',
    '/admission': '/admission/rule',
    '/admission/notification': '/admission/notification/latest',
    '/activity': '/activity/nss',
    '/activity/collaboration': '/activity/collaboration/rotaract-club',
    '/naac': '/naac/aqar',
    '/naac/ssr-1st-cycle': '/naac/ssr-1st-cycle/cycle-1-documents',
    '/naac/ssr-2nd-cycle': '/naac/ssr-2nd-cycle/cycle-2-documents',
    '/publication': '/publication/college-library',
    '/publication/examination-results': '/publication/examination-results/2024',
    '/publication/sss-report': '/publication/sss-report/2023-24'
  };

  if (pathnames.length === 0 || location.pathname.startsWith('/admin')) return null;

  return (
    <nav 
      aria-label="Breadcrumb"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
      style={{
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div style={{
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '10px 20px', 
        display: 'flex',
        alignItems: 'center', 
        flexWrap: 'wrap',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: '13.5px',
      }}>
        
        {/* Home Link */}
        <span 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Link 
            itemProp="item" 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              color: COLORS.navy,
              textDecoration: 'none',
              fontWeight: 700,
              gap: '5px'
            }}
          >
            <span style={{ fontSize: '15px', display: 'flex', alignItems: 'center' }}>🏠</span>
            <span itemProp="name" style={{ display: 'flex', alignItems: 'center', paddingTop: '1px' }}>Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </span>

        {/* Dynamic Breadcrumb Path */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // ✅ Checking if the path needs to be redirected
          const finalTo = categoryRedirects[to] || to;
          
          return (
            <React.Fragment key={to}>
              {/* Separator */}
              <span style={{
                display: 'flex',
                alignItems: 'center',
                color: '#94a3b8',
                margin: '0 8px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                ›
              </span>
              
              {/* ListItem */}
              <span 
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {isLast ? (
                  <span 
                    itemProp="name"
                    style={{
                      color: COLORS.gold,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '1px'
                    }}
                  >
                    {formatName(value)}
                  </span>
                ) : (
                  <Link 
                    itemProp="item"
                    to={finalTo} 
                    style={{
                      color: COLORS.navy,
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '1px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.color = COLORS.gold}
                    onMouseLeave={e => e.target.style.color = COLORS.navy}
                  >
                    <span itemProp="name">{formatName(value)}</span>
                  </Link>
                )}
                <meta itemProp="position" content={index + 2} />
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}