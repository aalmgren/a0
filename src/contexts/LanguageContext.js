import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);
  const [updateCounter, setUpdateCounter] = useState(0); // Para forçar a re-renderização

  const changeLanguage = (lang) => {
    i18n.locale = lang;
    setLanguage(lang);
    setUpdateCounter(prev => prev + 1); // Força a re-renderização
  };

  useEffect(() => {
    i18n.locale = language;
    console.log('Idioma atual:', i18n.locale);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, updateCounter }}>
      {children}
    </LanguageContext.Provider>
  );
};
