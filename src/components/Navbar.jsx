import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { COLORS } from '../styles/colors'

export default function Navbar({ onAdminClick, navLinks }) {
  const [openL1, setOpenL1] = useState(null)
  const [openL2, setOpenL2] = useState(null)
  const [openL3, setOpenL3] = useState(null)
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100)
      if (window.innerWidth >= 1100) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleL1 = (label) => {
    if (openL1 === label) { setOpenL1(null); setOpenL2(null); setOpenL3(null); }
    else { setOpenL1(label); setOpenL2(null); setOpenL3(null); }
  }
  const toggleL2 = (label) => {
    if (openL2 === label) { setOpenL2(null); setOpenL3(null); }
    else { setOpenL2(label); setOpenL3(null); }
  }
  const toggleL3 = (label) => {
    if (openL3 === label) { setOpenL3(null); }
    else { setOpenL3(label); }
  }

  return (
    <nav style={{ background: '#ffffff', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}>
      {/* MaxWidth 1400 kar diya taaki dono side aur space mile */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* LOGO AREA: marginLeft '-40px' kar diya (extreme left) aur marginRight '60px' (double gap) */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', marginRight: isMobile ? '0' : '60px', marginLeft: isMobile ? '0' : '-100px' }}>
          <img src={`${import.meta.env.BASE_URL}images/logo1.png`} 
            alt="Guru Nanak College Dhanbad" 
            style={{ 
              height: 80,            
              width: 'auto', 
              objectFit: 'contain' 
            }} 
          />
        </div>

        {/* MOBILE MENU BUTTON */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: COLORS.navy, fontSize: 32, cursor: 'pointer', padding: '4px 8px' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* NAV ITEMS & BUTTON */}
        <div style={{
          display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          position: isMobile ? 'absolute' : 'static',
          top: '100%', left: 0, right: 0,
          background: '#ffffff',
          padding: isMobile ? '10px 20px 20px' : 0,
          gap: isMobile ? 10 : 0,
          boxShadow: isMobile && menuOpen ? '0 10px 20px rgba(0,0,0,.1)' : 'none',
          maxHeight: isMobile ? '80vh' : 'auto',
          overflowY: isMobile ? 'auto' : 'visible',
          flex: 1, 
          justifyContent: 'flex-end',
          borderTop: isMobile && menuOpen ? '1px solid #eee' : 'none'
        }}>
          {navLinks.map(l0 => (
            <div key={l0.label} style={{ position: 'relative', width: isMobile ? '100%' : 'auto' }}
              onMouseEnter={() => !isMobile && setOpenL1(l0.label)}
              onMouseLeave={() => { if (!isMobile) { setOpenL1(null); setOpenL2(null); setOpenL3(null); } }}>

              {/* LEVEL 0 MAIN LINKS */}
              <div onClick={() => isMobile && l0.sub && toggleL1(l0.label)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: isMobile && l0.sub ? 'pointer' : 'default' }}>
                <Link to={l0.href || '#'}
                  onClick={() => {
                    if (l0.label === 'Home') {
                      window.scrollTo(0, 0);
                    }
                  }}
                  style={{ color: COLORS.navy, padding: isMobile ? '12px 0' : '24px 12px', display: 'block', fontSize: 14.5, fontWeight: 700, whiteSpace: 'nowrap', borderBottom: !isMobile && openL1 === l0.label ? '3px solid ' + COLORS.gold : '3px solid transparent', transition: 'all .2s', width: '100%' }}>
                  {l0.label === 'Home' ? '🏠 ' : ''}{l0.label}
                </Link>
                {isMobile && l0.sub && <span style={{ color: COLORS.navy, fontSize: 20 }}>{openL1 === l0.label ? '▴' : '▾'}</span>}
                {!isMobile && l0.sub && <span style={{ color: COLORS.navy, fontSize: 11, marginLeft: 2, marginRight: 8, marginTop: 2 }}>▾</span>}
              </div>

              {/* LEVEL 1 DROPDOWN */}
              {l0.sub && openL1 === l0.label && (
                <div style={{ 
                  position: isMobile ? 'static' : 'absolute', 
                  top: '100%', left: 0, 
                  background: '#fff', 
                  minWidth: 260, 
                  boxShadow: isMobile ? 'none' : '0 12px 30px rgba(0,0,0,.15)', 
                  borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy,
                  borderRadius: isMobile ? 8 : '0 0 8px 8px', 
                  zIndex: 200, padding: isMobile ? '5px 0' : '8px 0'
                }}>
                  {l0.sub.map(l1 => (
                    <div key={l1.label} style={{ position: 'relative' }}
                      onMouseEnter={() => !isMobile && setOpenL2(l1.label)}
                      onMouseLeave={() => !isMobile && setOpenL2(null)}>
                      
                      <div onClick={(e) => { if (isMobile && l1.sub) { e.stopPropagation(); toggleL2(l1.label); } }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '10px 16px' : '10px 18px', borderBottom: isMobile ? 'none' : '1px solid #f8f9fa', cursor: isMobile && l1.sub ? 'pointer' : 'default' }}
                        onMouseEnter={e => { if(!isMobile) e.currentTarget.style.background = '#f4f6f9' }}
                        onMouseLeave={e => { if(!isMobile) e.currentTarget.style.background = 'transparent' }}>
                        
                        <Link to={l1.href || '#'} style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: 'block', width: '100%' }}>{l1.label}</Link>
                        {l1.sub && <span style={{ fontSize: 12, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL2 === l1.label ? '▴' : '▾') : '▶'}</span>}
                      </div>

                      {/* LEVEL 2 DROPDOWN */}
                      {l1.sub && openL2 === l1.label && (
                        <div style={{ 
                          position: isMobile ? 'static' : 'absolute', 
                          top: 0, left: '100%', 
                          background: '#fff', 
                          minWidth: 260, 
                          boxShadow: isMobile ? 'none' : '4px 4px 20px rgba(0,0,0,.15)', 
                          borderTop: isMobile ? 'none' : '3px solid ' + COLORS.gold,
                          borderRadius: isMobile ? 4 : '0 8px 8px 8px',
                          margin: isMobile ? '0 16px 10px' : 0, borderLeft: isMobile ? '2px solid ' + COLORS.gold : 'none'
                        }}>
                          {l1.sub.map(l2 => (
                             <div key={l2.label} style={{ position: 'relative' }}
                              onMouseEnter={() => !isMobile && setOpenL3(l2.label)}
                              onMouseLeave={() => !isMobile && setOpenL3(null)}>
                               
                              <div onClick={(e) => { if (isMobile && l2.sub) { e.stopPropagation(); toggleL3(l2.label); } }}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: isMobile ? 'none' : '1px solid #f8f9fa', cursor: isMobile && l2.sub ? 'pointer' : 'default' }}
                                onMouseEnter={e => { if(!isMobile) e.currentTarget.style.background = '#f4f6f9' }}
                                onMouseLeave={e => { if(!isMobile) e.currentTarget.style.background = 'transparent' }}>
                                
                                <Link to={l2.href || '#'} style={{ fontSize: 12.5, fontWeight: 600, color: '#444', display: 'block', width: '100%' }}>{l2.label}</Link>
                                {l2.sub && <span style={{ fontSize: 11, color: COLORS.gold, marginLeft: 8 }}>{isMobile ? (openL3 === l2.label ? '▴' : '▾') : '▶'}</span>}
                              </div>

                              {/* LEVEL 3 DROPDOWN */}
                              {l2.sub && openL3 === l2.label && (
                                <div style={{ 
                                  position: isMobile ? 'static' : 'absolute', 
                                  top: 0, left: '100%', 
                                  background: '#fff', 
                                  minWidth: 260, 
                                  boxShadow: isMobile ? 'none' : '4px 4px 20px rgba(0,0,0,.15)', 
                                  borderTop: isMobile ? 'none' : '3px solid ' + COLORS.navy,
                                  borderRadius: isMobile ? 4 : '0 8px 8px 8px',
                                  margin: isMobile ? '0 16px 10px' : 0, borderLeft: isMobile ? '2px solid ' + COLORS.navy : 'none'
                                }}>
                                  {l2.sub.map(l3 => (
                                    <Link key={l3.label} to={l3.href || '#'}
                                      style={{ display: 'block', padding: '10px 16px', fontSize: 12, color: '#555', borderBottom: isMobile ? 'none' : '1px solid #f8f9fa' }}
                                      onMouseEnter={e => { if(!isMobile) e.currentTarget.style.background = '#f4f6f9' }}
                                      onMouseLeave={e => { if(!isMobile) e.currentTarget.style.background = 'transparent' }}>
                                      {l3.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* ADMIN BUTTON */}
          <button onClick={onAdminClick}
            style={{ 
              background: COLORS.gold, 
              color: '#000', 
              border: 'none', 
              padding: '8px 24px',  
              borderRadius: 6, 
              cursor: 'pointer', 
              fontSize: 13, 
              fontWeight: 800, 
              marginLeft: isMobile ? 0 : 20, 
              marginTop: isMobile ? 12 : 0, 
              width: isMobile ? '100%' : 'auto', 
              boxShadow: '0 2px 5px rgba(0,0,0,.2)',
              whiteSpace: 'nowrap', 
              display: 'flex',      
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '8px'            
            }}>
            <span style={{ fontSize: 18 }}>⚙️</span> Admin Login
          </button>
        </div>
      </div>
    </nav>
  )
}