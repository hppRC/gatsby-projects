import { Link } from 'gatsby';
import React, { memo } from 'react';
import { animated, SpringValue } from 'react-spring';

import styled from '@emotion/styled';

type ContainerProps = { scale: SpringValue<string> };
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, scale }) => (
  <Link to='/' className={className}>
    <h1>
      hpp blog
      <animated.span style={{ transform: scale }}>🌝</animated.span>
    </h1>
  </Link>
));

const StyledComponent = styled(Component)`
  pointer-events: auto;

  > h1 {
    color: #fff;
    > span {
      display: inline-block;
      padding: 0.3rem 0.5rem;
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

const Container: React.FCX<ContainerProps> = ({ scale }) => {
  return <StyledComponent scale={scale} />;
};

export default memo(Container);
