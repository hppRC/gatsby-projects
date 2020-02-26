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
    width: 100%;
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
    > .gatsby-image-wrapper {
      height: 40vh;

      > img,
      > picture {
        top: -10vh;
        height: 50vh;
      }
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  const background = useAnyImage('background.png') || useAnyImage('background.jpg');
  return <StyledComponent background={background} />;
};

export default memo(Container);
