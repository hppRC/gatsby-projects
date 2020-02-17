import { ThemeProvider } from 'emotion-theming';
import React, { ReactNode } from 'react';

import { ColorModeContainer } from '../store';

const theme = {
  colors: {
    darkCharacterColor: '#ffffff',
    darkBackground: '#09090f',
    lightCharacterColor: '#09090f',
    lightBackground: '#ffffff'
  }
} as const;

export const WrapRootElement = ({ element }: { element: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <ColorModeContainer.Provider>{element}</ColorModeContainer.Provider>
  </ThemeProvider>
);

export default WrapRootElement;
