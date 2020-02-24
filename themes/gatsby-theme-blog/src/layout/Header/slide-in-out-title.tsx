import { Link } from 'gatsby';
import React, { memo, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useScroll } from 'react-use-gesture';

import styled from '@emotion/styled';

type ContainerProps = {};
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => {
  const [{ translate, scale }, set] = useSpring(() => ({
    translate: `translate3d(0rem, 0, 0)`,
    scale: 'scale(1.0)'
  }));

  const bind = useScroll(
    ({ xy: [, y] }) => {
      if (typeof window === 'undefined') return;

      const bk = window.innerWidth > 1100 ? 30 : window.innerWidth > 768 ? 20 : 14.2;
      set({
        translate: `translate3d(-${Math.min(y * 0.02, bk)}rem, 0, 0)`,
        scale: `scale(${Math.min(1.5, 1 + y * 0.001)})`
      });
    },
    { domTarget: typeof window !== 'undefined' ? window : undefined }
  );

  useEffect(() => {
    bind();
  }, [bind]);

  return (
    <animated.div style={{ transform: translate }} className={className}>
      <Link to='/'>
        <h1>
          hpp blog
          <animated.span style={{ transform: scale }}>🌝</animated.span>
        </h1>
      </Link>
    </animated.div>
  );
};

const StyledComponent = styled(Component)`
  padding: 1rem;
  will-change: transform;
  > a {
    pointer-events: auto;

    > h1 {
      display: inline-block;
      color: #fff;
      > span {
        display: inline-block;
        padding: 0.3rem 0.5rem;
      }
    }
  }
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    padding: 0 0.5rem;
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  return <StyledComponent />;
};

export default memo(Container);
