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
  width: 100%;

  line-height: 1.4;
  color: ${({ mode }) => (mode ? '#09090f' : '#ffffffe0')};
  transition: color 0.3s;

  > svg {
    display: block;
    margin: 2rem auto;
  }

  > h1 {
    left: -4rem;
    padding-top: 6rem;
    padding-bottom: 0.5rem;
    font-size: 5.5rem;
  }
  > h2 {
    left: -2rem;
    padding-top: 4rem;
    font-size: 4rem;
  }
  > h3 {
    left: -1rem;
    padding-top: 3rem;
    font-size: 3rem;
  }

  > p {
  }

  > .gatsby-image-wrapper {
    border-radius: 3px;
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    > h1 {
      left: 0;
      padding-top: 1rem;
      padding-bottom: 0.2rem;
      font-size: 3.5rem;
    }
    > h2 {
      left: 0;
      padding-top: 0.8rem;
      font-size: 2.5rem;
    }
    > h3 {
      left: 0;
      padding-top: 0.6rem;
      font-size: 1.8rem;
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = props => {
  const { mode } = ColorModeContainer.useContainer();
  return <StyledComponent {...props} mode={mode} />;
};

export default memo(Container);
