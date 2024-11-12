import React, { createContext, useState } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = isDarkTheme ? DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
