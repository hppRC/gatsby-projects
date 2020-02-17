import React from 'react';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../../store';

type ContainerProps = {};
type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => (
  <footer className={className}>Copyright © 2019 hppRC All Rights Reserved.</footer>
);

const StyledComponent = styled(Component)`
  color: ${({ mode }) => (mode ? '#09090f' : '#ffffff')};

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  const { mode } = ColorModeContainer.useContainer();

  return <StyledComponent mode={mode} />;
};

export default Container;
