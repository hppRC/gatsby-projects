import React from 'react';

import { ColorModeContainer } from '../store';

export const WrapRootElement = ({ element }: { element: React.FCX }) => (
  <ColorModeContainer.Provider>{element}</ColorModeContainer.Provider>
);

export default WrapRootElement;
