import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Linha para alternar entre tema claro e escuro */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{i18n.t('dark_mode')}</Text>
        <View style={styles.inputContainer}>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            thumbColor={isDarkTheme ? theme.colors.primary : '#f4f3f4'}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
          />
        </View>
      </View>

      {/* Separador */}
      <View style={styles.separator} />

      {/* Linha para selecionar o idioma */}
      <View style={styles.row}>
        <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{i18n.t('language')}</Text>
        <View style={styles.inputContainer}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adiciona espaço superior para evitar sobreposição
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
    flex: 2, // Ajusta para ocupar mais espaço na linha
  },
  inputContainer: {
    flex: 3, // Garante que o input tenha espaço suficiente para alinhamento
    alignItems: 'flex-end', // Alinha os inputs à direita
  },
  picker: {
    height: 40,
    width: '100%', // Garante que o Picker ocupe a largura disponível
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
});

export default SettingsScreen;
