import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import App from './App';

function AppWrapper() {
  const location = useLocation();

  // 🌟 MAGIC TRICK 1: Jab bhi Page Refresh ho (F5 ya Reload button se)
  useEffect(() => {
    // Browser ki default aadat ko rokna ki wo purani jagah par na jaye
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Turant top par bhej dena
    window.scrollTo(0, 0);
  }, []);

  // 🌟 MAGIC TRICK 2: Jab bhi ek Page se doosre Page par jaye (Link click karne par)
  useEffect(() => {
    const hash = location.hash;
    
    // Agar link mein # hai (jaise same page par kisi section mein jana)
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Agar normal link hai, toh hamesha TOP par scroll kar do
      window.scrollTo(0, 0);
    }
  }, [location]); // Ye tab chalega jab URL (location) change hoga

  return <App />;
}

export default AppWrapper;