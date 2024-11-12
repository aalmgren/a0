import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <MainTabNavigator />
    </ThemeProvider>
  );
}
