import { Link, useLocation } from 'react-router-dom';
import { COLORS } from '../styles/colors';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div style={{ background: '#e9ecef', padding: '15px 20px', borderRadius: '8px 8px 0 0' }}>
      <Link to="/" style={{ color: COLORS.navy, textDecoration: 'none', fontWeight: 600 }}>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={name}>
            <span style={{ margin: '0 10px', color: '#6c757d' }}>/</span>
            {isLast ? (
              <span style={{ color: '#495057', fontWeight: 600 }}>{name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            ) : (
              <Link to={routeTo} style={{ color: COLORS.navy, textDecoration: 'none', fontWeight: 600 }}>
                {name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
