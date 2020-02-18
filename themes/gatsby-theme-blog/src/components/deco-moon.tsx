import React, { memo } from 'react';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

type ContainerProps = { enter: boolean };
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, enter }) => {
  const sp = useSpring({
    config: config.wobbly,
    transform: enter ? 'translate3d(-10rem,0rem,0)' : 'translate3d(2rem,-10rem,0)'
  });
  return (
    <animated.div style={sp} className={className}>
      🌝
    </animated.div>
  );
});

const StyledComponent = styled(Component)`
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  font-size: 8rem;
  will-change: transform;

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
  return <StyledComponent {...props} />;
};

export default memo(Container);
