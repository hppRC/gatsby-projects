import Img, { FluidObject } from 'gatsby-image';
import React, { memo } from 'react';

import styled from '@emotion/styled';

import { useAnyImage } from '../hooks';

type ContainerProps = {};
type Props = { background?: FluidObject } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, background }) => (
  <div className={className}>
    <Img fluid={background} />
  </div>
));

const StyledComponent = styled(Component)`
  > .gatsby-image-wrapper {
    position: relative;
    width: 100vw;
    height: 75vh;
    > img,
    > picture {
      position: absolute;
      top: -25vh;
      width: 100%;
      height: 100vh;
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

const Container: React.FCX<ContainerProps> = props => {
  const background = useAnyImage('background.jpg');
  return <StyledComponent {...props} background={background} />;
};

export default memo(Container);
