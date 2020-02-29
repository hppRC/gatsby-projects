import {
    ThemeProvider as ThemeProviderEmotion, useTheme as useThemeEmotion
} from 'emotion-theming';
import React from 'react';

import { Theme } from '../../types';
import { useHpprcThemeConfig } from '../hooks';
import { ColorModeContainer } from '../store';

export const useTheme = () => {
  const theme = useThemeEmotion<Theme>();
  return theme;
};

export const ThemeProvider: React.FCX = ({ children }) => {
  const { lightTheme, darkTheme } = useHpprcThemeConfig();
  const { mode } = ColorModeContainer.useContainer();
  const theme = mode ? lightTheme : darkTheme;

  return <ThemeProviderEmotion theme={theme}>{children}</ThemeProviderEmotion>;
};
