import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translations from './locales/translations.json'; // Arquivo unificado de traduções


// Configuração das traduções
i18n.fallbacks = true;
i18n.translations = translations; // Usa o arquivo unificado

// Define o idioma com base na configuração do dispositivo
i18n.locale = Localization.locale.split('-')[0]; // Usa apenas o código da língua (ex: 'en', 'pt')

export default i18n;
