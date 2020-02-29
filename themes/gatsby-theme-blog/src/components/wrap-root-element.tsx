import React from 'react';

import { ColorModeContainer } from '../store';
import { ThemeProvider } from '../theme';

export const WrapRootElement = ({ element }: { element: React.FCX }) => (
  <ColorModeContainer.Provider>
    <ThemeProvider>{element}</ThemeProvider>
  </ColorModeContainer.Provider>
);

export default WrapRootElement;
