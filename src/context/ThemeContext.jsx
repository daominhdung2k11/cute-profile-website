import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeColors } from '../utils/mock';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('pink'); // 'pink' or 'lavender'

  useEffect(() => {
    const colors = themeColors[theme];
    document.documentElement.style.setProperty('--theme-primary', colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', colors.secondary);
    document.documentElement.style.setProperty('--theme-accent', colors.accent);
    document.documentElement.style.setProperty('--theme-light', colors.light);
    document.documentElement.style.setProperty('--theme-text', colors.text);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'pink' ? 'lavender' : 'pink');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};