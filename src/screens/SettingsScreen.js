import React, { useState, useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importação corrigida
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import i18n from '../i18n';

const SettingsScreen = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{i18n.t('settings')}</Text>
      {/* Switch para alternar entre tema claro e escuro */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 16, flex: 1 }}>{i18n.t('dark_mode')}</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
      {/* Seletor de idioma */}
      <Text style={{ fontSize: 16, marginBottom: 10 }}>{i18n.t('language')}</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
        style={{ height: 50, width: 150 }}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Português" value="pt" />
      </Picker>
    </View>
  );
};

export default SettingsScreen;
