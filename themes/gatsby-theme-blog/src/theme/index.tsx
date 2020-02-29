import {
    ThemeProvider as ThemeProviderEmotion, useTheme as useThemeEmotion
} from 'emotion-theming';
import React, { memo, useEffect, useState } from 'react';

import { Theme } from '../../types';
import { useHpprcThemeConfig } from '../hooks';
import { ColorModeContainer } from '../store';

export const useTheme = () => {
  const theme = useThemeEmotion<Theme>();
  return theme;
};

export const ThemeProvider: React.FCX = memo(({ children }) => {
  const { lightTheme, darkTheme } = useHpprcThemeConfig();
  const { mode } = ColorModeContainer.useContainer();

  const [theme, setTheme] = useState({});
  useEffect(() => setTheme(mode ? lightTheme : darkTheme), [mode]);

  return <ThemeProviderEmotion theme={theme}>{children}</ThemeProviderEmotion>;
});
