import { Link } from 'gatsby';
import React, { useCallback, useEffect, useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import { useScroll } from 'react-use-gesture';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../../store';
import ModeButton from './mode-button';

type ContainerProps = {};
type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => {
  const [{ translate, scale }, set] = useMemo(
    () =>
      useSpring(() => ({
        translate: `translate3d(0rem, 0, 0)`,
        scale: 'scale(1.0)'
      })),
    []
  );

  const bind = useCallback(
    useScroll(
      ({ xy: [, y] }) =>
        set({
          translate: `translate3d(-${Math.min(y * 0.02, 15)}rem, 0, 0)`,
          scale: `scale(${Math.min(2, 1 + y * 0.001)})`
        }),
      { domTarget: typeof window !== 'undefined' ? window : undefined }
    ),
    []
  );

  useEffect(() => {
    bind();
  }, [bind]);

  return (
    <header className={className}>
      <animated.div style={{ transform: translate }}>
        <Link to='/'>
          <h1>
            hpp blog
            <animated.span style={{ transform: scale }}>🌝</animated.span>
          </h1>
        </Link>
      </animated.div>
      <nav>
        <ModeButton />
      </nav>
    </header>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 0 0.5rem;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;

  div {
    padding: 1rem;
    will-change: transform;
    a {
      text-decoration: none;
      h1 {
        color: #fff;
        span {
          display: inline-block;
          padding: 0.3rem 0.5rem;
          width: 2rem;
        }
      }
    }
  }

  nav {
    padding: 1.5rem;
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  const { mode } = ColorModeContainer.useContainer();

  return <StyledComponent mode={mode} />;
};

export default Container;
