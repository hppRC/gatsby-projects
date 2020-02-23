import Img, { FluidObject } from 'gatsby-image';
import React, { memo } from 'react';

import styled from '@emotion/styled';

type ContainerProps = { fluid: FluidObject | undefined };
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = memo(({ fluid, className }) => (
  <>{fluid && <Img fluid={fluid} alt='eyecatch iage' className={className} />}</>
));

const StyledComponent = styled(Component)`
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
