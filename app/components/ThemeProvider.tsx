'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'celo' | 'solana' | 'base' | 'coinbase';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    // Get theme from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme') as Theme;
    const savedTheme = localStorage.getItem('chronocanvas-theme') as Theme;
    
    const initialTheme = urlTheme || savedTheme || 'default';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chronocanvas-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
