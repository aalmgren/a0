import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import i18n from 'i18n-js';

const SettingsScreen = () => {
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
    i18n.locale = lang;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Linha para alternar entre tema claro e escuro */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: theme.colors.text, textAlign: 'left' }]}>{i18n.t('dark_mode')}</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? theme.colors.primary : '#f4f3f4'}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
        />
      </View>

      {/* Separador */}
      <View style={styles.separator} />

      {/* Linha para selecionar o idioma */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: theme.colors.text, textAlign: 'left' }]}>{i18n.t('language')}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handleLanguageChange(itemValue)}
            style={[styles.picker, { color: theme.colors.text }]}
            mode="dropdown"
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Português" value="pt" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  rowLabel: {
    fontSize: 16,
    flex: 1,
  },
  picker: {
    height: 40,
    width: '100%', // Ajusta para ocupar a largura disponível na área direita
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});

export default SettingsScreen;
