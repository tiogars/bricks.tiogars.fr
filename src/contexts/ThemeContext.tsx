import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { Theme } from '../types/theme';
import { getTheme, DEFAULT_THEME_NAME } from '../themes/themes';
import { createMuiTheme } from '../themes/muiTheme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<string>(() => {
    const saved = localStorage.getItem('theme');
    return saved || DEFAULT_THEME_NAME;
  });

  const theme = getTheme(themeName);
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

  useEffect(() => {
    localStorage.setItem('theme', themeName);
    
    // Apply CSS variables to root for legacy components
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      // Convert camelCase to kebab-case for CSS variables
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVarName}`, value);
    });
  }, [themeName, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeName }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
