// src/i18n.js — Hindi/English bilingual configuration with i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('gnc_language') || 'en') : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi }
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('gnc_language', lang);
  }
};

export default i18n;
