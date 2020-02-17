import React from 'react';

import styled from '@emotion/styled';

import { SEO } from '../components';
import { baseStyle } from '../styles';

type ContainerProps = { path: string };
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => (
  <main className={className}>
    <h1>Not Found</h1>
  </main>
);

const StyledComponent = styled(Component)`
  ${baseStyle}
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
  return (
    <>
      <SEO title='Not Found' pathname={props.path} />
      <StyledComponent {...props} />
    </>
  );
};

export default Container;
