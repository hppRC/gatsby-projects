import React, { memo } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import styled from '@emotion/styled';

type ContainerProps = { chars: string };
type Props = {} & ContainerProps;
type BlockProps = { ch: string };

const Block: React.FCX<BlockProps> = memo(({ ch }) => {
  const [{ x, y }, set] = useSpring(() => ({
    config: config.gentle,
    x: 0,
    y: 0
  }));
  const bind = useDrag(({ offset: [x, y] }) => set({ x, y }));
  return (
    <animated.h2 {...bind()} style={{ x: x, y: y }}>
      {ch}
    </animated.h2>
  );
});

const Component: React.FCX<Props> = memo(({ className, chars }) => (
  <section className={className}>
    {Array.from(chars).map((ch: string, i: number) => (
      <li key={i}>
        <Block ch={ch} />
      </li>
    ))}
  </section>
));

const StyledComponent = styled(Component)`
  display: flex;
  align-items: baseline;
  justify-content: center;

  > li {
    z-index: 100;
    touch-action: auto;
    cursor: pointer;
    user-select: none;
    > h2 {
      font-size: 10rem;
      color: #ffffff;
    }
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

const Container: React.FCX<ContainerProps> = ({ chars }) => {
  return <StyledComponent chars={chars} />;
};

export default memo(Container);
