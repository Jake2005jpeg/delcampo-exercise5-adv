import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeVariables: Record<Theme, Record<string, string>> = {
  light: {
    '--body-bg': '#f7f7fb',
    '--body-text': '#111827',
    '--header-bg': '#ffffff',
    '--app-bg': '#f7f7fb',
    '--card-bg': '#ffffff',
    '--input-bg': '#ffffff',
    '--button-bg': '#1f2937',
    '--button-text': '#ffffff',
    '--button-border': '#d1d5db',
    '--border': '#d1d5db',
    '--link-color': '#2563eb',
  },
  dark: {
    '--body-bg': '#0f172a',
    '--body-text': '#e2e8f0',
    '--header-bg': '#111827',
    '--app-bg': '#0f172a',
    '--card-bg': '#111827',
    '--input-bg': '#1f2937',
    '--button-bg': '#2563eb',
    '--button-text': '#f8fafc',
    '--button-border': '#334155',
    '--border': '#334155',
    '--link-color': '#93c5fd',
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return (localStorage.getItem('appTheme') as Theme) || 'light';
  });

  useEffect(() => {
    const themeVars = themeVariables[theme];
    (Object.entries(themeVars) as [string, string][]).forEach(([key, value]) => {
      document.body.style.setProperty(key, value);
    });
    document.body.dataset.theme = theme;
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current: Theme) => (current === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
