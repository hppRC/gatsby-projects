import React, { useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useScroll } from 'react-use-gesture';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../../store';
import ModeButton from './mode-button';
import SlideInOutTitle from './slide-in-out-title';

type ContainerProps = {};
type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => {
  const [{ translate, scale }, set] = useSpring(() => ({
    translate: `translate3d(0rem, 0, 0)`,
    scale: 'scale(1.0)'
  }));

  const bind = useScroll(
    ({ xy: [, y] }) =>
      set({
        translate: `translate3d(-${Math.min(y * 0.02, 15)}rem, 0, 0)`,
        scale: `scale(${Math.min(2, 1 + y * 0.001)})`
      }),
    { domTarget: typeof window !== 'undefined' ? window : undefined }
  );

  useEffect(() => {
    bind();
  }, [bind]);

  return (
    <header className={className}>
      <animated.div style={{ transform: translate }}>
        <SlideInOutTitle scale={scale} />
      </animated.div>
      <nav>
        <ModeButton />
      </nav>
    </header>
  );
};

const StyledComponent = styled(Component)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 0 0.5rem;

  > div {
    padding: 1rem;
    will-change: transform;
  }

  > nav {
    padding: 1.5rem;
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  const { mode } = ColorModeContainer.useContainer();

  return <StyledComponent mode={mode} />;
};

export default Container;
