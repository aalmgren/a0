import React, { createContext, useState, useEffect } from 'react';
import i18n from '../i18n';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);

  const changeLanguage = (lang) => {
    if (lang !== language) { // Adicionado para evitar atualizações desnecessárias
      i18n.locale = lang;
      setLanguage(lang);
      console.log(`Idioma alterado para: ${lang}`);
    }
  };

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
