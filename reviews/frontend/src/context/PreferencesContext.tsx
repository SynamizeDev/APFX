'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

interface PreferencesContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from localStorage, defaulting to 'light' (white theme)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('apfx-theme') as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        setThemeState('light');
      }
    } catch {
      setThemeState('light');
    }
    setIsMounted(true);
  }, []);

  // Synchronize theme with DOM and localStorage
  useEffect(() => {
    if (!isMounted) return;

    try {
      localStorage.setItem('apfx-theme', theme);
    } catch (e) {
      console.error(e);
    }

    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-mode');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light-mode');
      root.classList.add('dark');
    }
  }, [theme, isMounted]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <PreferencesContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
