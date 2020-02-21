import React, { memo } from 'react';
import { animated, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../../store';

type ContainerProps = {};
type Props = { mode: boolean; toggle: () => void } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, mode, toggle }) => {
  const sp = useSpring({
    transform: mode ? 'translate3d(2rem, 0, 0)' : 'translate3d(-2rem, 0, 0)',
    backgroundColor: mode ? '#ffffff' : '#09090f90',
    border: mode ? '2px solid #09090f' : '2px solid #ffffff'
  });

  return (
    <button onClick={toggle} className={className}>
      <animated.div style={sp} />
    </button>
  );
});

const StyledComponent = styled(Component)`
  position: relative;
  padding: 0 2rem;
  pointer-events: auto;
  cursor: pointer;
  border: ${({ mode }) => (mode ? '2px solid #ffffff' : '2px solid #09090f90')};
  border-radius: 4rem;
  outline: none;
  transition: border 0.3s;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    border: ${({ mode }) => (mode ? '2px solid #09090f90' : '2px solid #ffffff')};
    border-radius: 4rem;
    transition: border 0.3s;
  }

  > div {
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
  }

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
  const { mode, toggle } = ColorModeContainer.useContainer();
  return <StyledComponent mode={mode} toggle={toggle} />;
};

export default memo(Container);
