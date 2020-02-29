import React, { memo } from 'react';

import styled from '@emotion/styled';

import { GlobalCSS, ResetCSS } from '../components';
import Footer from './footer';
import Header from './header';

type ContainerProps = { children: React.FCX };
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = memo(({ children }) => (
  <>
    <ResetCSS />
    <GlobalCSS />
    <Header />
    {children}
    <Footer />
  </>
));

const StyledComponent = styled(Component)`
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledComponent>{children}</StyledComponent>;
};

export default memo(Container);
