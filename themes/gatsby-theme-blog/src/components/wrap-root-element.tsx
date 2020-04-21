import React from 'react';

import { ColorModeContainer } from '../store';
import { ThemeProvider } from '../theme';
import { DynamicGlobalCSS } from './';

export const WrapRootElement = ({ element }: { element: React.FCX }) => (
  <ColorModeContainer.Provider>
    <ThemeProvider>
      <DynamicGlobalCSS />
      {element}
    </ThemeProvider>
  </ColorModeContainer.Provider>
);

export default WrapRootElement;
