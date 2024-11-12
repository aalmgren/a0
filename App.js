import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainTabNavigator />
      </LanguageProvider>
    </ThemeProvider>
  );
}
