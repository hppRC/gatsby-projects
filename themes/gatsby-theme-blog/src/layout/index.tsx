import React from 'react';

import styled from '@emotion/styled';

import { GlobalCss, ResetCss } from '../components';
import Footer from './footer';
import Header from './header';

type ContainerProps = {};
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = ({ children }) => (
  <>
    <ResetCss />
    <GlobalCss />
    <Header />
    {children}
    <Footer />
  </>
);

const StyledComponent = styled(Component)`
  color: red;
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = props => {
  return <StyledComponent {...props} />;
};

export default Container;
