import { FluidObject } from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { memo } from 'react';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../store';
import { MemolizedImage } from './';

type ContainerProps = { fluid?: FluidObject; body: string };
type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = ({ className, fluid, body }) => (
  <div className={className}>
    <MemolizedImage fluid={fluid} />
    <MDXRenderer>{body}</MDXRenderer>
  </div>
);

const StyledComponent = styled(Component)`
  line-height: 1.4;
  color: ${({ mode }) => (mode ? '#09090f' : '#ffffffe0')};
  transition: color 0.3s;

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
  const { mode } = ColorModeContainer.useContainer();
  return <StyledComponent {...props} mode={mode} />;
};

export default memo(Container);
