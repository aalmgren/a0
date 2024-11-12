import React, { createContext, useState } from 'react';

const CustomLightTheme = {
  dark: false,
  colors: {
    background: '#ffffff',
    text: '#0b2a49',
    card: '#e5e9f4',
    border: '#d5dbe9',
    primary: '#0b2a49',  // Cor de destaque
  },
};

const CustomDarkTheme = {
  dark: true,
  colors: {
    background: '#0b2a49',
    text: '#ffffff',
    card: '#d5dbe9',
    border: '#dfe4f0',
    primary: '#e5e9f4',  // Cor de destaque no modo escuro
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomLightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
