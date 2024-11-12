import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './locales/en.json';
import pt from './locales/pt.json';

// Configuração das traduções
i18n.fallbacks = true;
i18n.translations = {
  en,
  pt,
};

// Define o idioma com base na configuração do dispositivo
i18n.locale = Localization.locale.split('-')[0]; // Usa apenas o código da língua (ex: 'en', 'pt')

export default i18n;
