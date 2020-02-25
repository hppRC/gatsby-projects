import { ThemeProvider } from 'emotion-theming';
import React from 'react';

import { ColorModeContainer } from '../store';

const theme = {
  colors: {
    darkCharacterColor: '#ffffff',
    darkBackground: '#09090f',
    lightCharacterColor: '#09090f',
    lightBackground: '#ffffff'
  }
} as const;

export const WrapRootElement = ({ element }: { element: React.FCX }) => (
  <ThemeProvider theme={theme}>
    <ColorModeContainer.Provider>{element}</ColorModeContainer.Provider>
  </ThemeProvider>
);

export default WrapRootElement;
