import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const useLanguage = () => {
  const { language } = useContext(LanguageContext);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  return currentLanguage;
};

export default useLanguage;
