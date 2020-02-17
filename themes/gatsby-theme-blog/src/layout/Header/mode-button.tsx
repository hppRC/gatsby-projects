import React, { useMemo } from 'react';
import { animated, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../../store';

type ContainerProps = {};
type Props = { mode: boolean; toggle: () => void } & ContainerProps;

const Component: React.FCX<Props> = ({ className, mode, toggle }) => {
  const sp = useMemo(
    () =>
      useSpring({
        transform: mode ? 'translate3d(2rem, 0, 0)' : 'translate3d(-2rem, 0, 0)',
        backgroundColor: mode ? '#ffffff' : '#09090f',
        border: mode ? '2px solid #09090f' : '2px solid #ffffff'
      }),
    []
  );

  return (
    <button onClick={toggle} className={className}>
      <animated.div style={sp} />
    </button>
  );
};

const StyledComponent = styled(Component)`
  border: ${({ mode }) => (mode ? '2px solid #ffffff' : '2px solid #09090f')};
  border-radius: 4rem;
  cursor: pointer;
  outline: none;
  padding: 0 2rem;
  position: relative;
  transition: border 0.3s;

  ::after {
    border: ${({ mode }) => (mode ? '2px solid #09090f' : '2px solid #ffffff')};
    border-radius: 4rem;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: border 0.3s;
    width: 100%;
    z-index: -1;
  }

  div {
    border-radius: 2rem;
    height: 4rem;
    width: 4rem;
  }
  span {
    display: none;
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

export default Container;
