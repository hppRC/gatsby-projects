import React, { memo } from 'react';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../../store';

type ContainerProps = {};
type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className }) => (
  <footer className={className}>Copyright © 2020 hppRC All Rights Reserved.</footer>
));

const StyledComponent = styled(Component)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 10vh;
  color: ${({ mode }) => (mode ? '#09090f' : '#ffffff')};
  transition: color 0.3s;

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

export default memo(Container);
