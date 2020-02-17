import React from 'react';

import styled from '@emotion/styled';

import Header from './Header';

type ContainerProps = {};
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = ({ children }) => (
  <>
    <Header />
    {children}
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
