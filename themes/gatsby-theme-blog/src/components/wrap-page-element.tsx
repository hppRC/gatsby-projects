import React, { ReactNode } from 'react';

import Layout from '../layout';

export const WrapPageElement: ReactNode = ({ element }: { element: React.FCX }) => <Layout>{element}</Layout>;

export default WrapPageElement;
