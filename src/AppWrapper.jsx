import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import App from './App';

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]); 

  // 🌟 FIX: Yahan se div hata diya, ab directly App render hoga
  return <App />;
}

export default AppWrapper;