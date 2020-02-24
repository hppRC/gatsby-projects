import React, { memo, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useScroll } from 'react-use-gesture';

import styled from '@emotion/styled';

import ModeButton from './mode-button';
import SlideInOutTitle from './slide-in-out-title';

type ContainerProps = {};
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => {
  const [{ translate, scale }, set] = useSpring(() => ({
    translate: `translate3d(0rem, 0, 0)`,
    scale: 'scale(1.0)'
  }));

  const bind = useScroll(
    ({ xy: [, y] }) =>
      set({
        translate: `translate3d(-${Math.min(y * 0.02, 25)}rem, 0, 0)`,
        scale: `scale(${Math.min(1.5, 1 + y * 0.001)})`
      }),
    { domTarget: typeof window !== 'undefined' ? window : undefined }
  );

  useEffect(() => {
    bind();
  }, [bind]);

  return (
    <header className={className}>
      <div>
        <animated.div style={{ transform: translate }}>
          <SlideInOutTitle scale={scale} />
        </animated.div>
        <nav>
          <ModeButton />
        </nav>
      </div>
    </header>
  );
};

const StyledComponent = styled(Component)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 0.5rem;

  pointer-events: none;

  > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    > div {
      padding: 1rem;
      will-change: transform;
    }

    > nav {
      padding: 1.5rem;
    }
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    padding: 0;
    > div {
      padding: 0rem 0.3rem;
    }

    > nav {
      padding: 0.8rem 0;
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  return <StyledComponent />;
};

export default Container;
