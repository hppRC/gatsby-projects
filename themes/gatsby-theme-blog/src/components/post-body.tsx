import { FluidObject } from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React, { memo } from 'react';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../store';
import { MemolizedImage } from './';

type ContainerProps = { cover?: FluidObject; body: string };
type Props = { mode: boolean } & ContainerProps;
type BodyProps = { body: string };

const Body: React.FCX<BodyProps> = memo(({ body }) => <MDXRenderer>{body}</MDXRenderer>);

const Component: React.FCX<Props> = ({ className, cover, body }) => (
  <div className={className}>
    <MemolizedImage fluid={cover} />
    <Body body={body} />
  </div>
);

const StyledComponent = styled(Component)`
  position: relative;
  width: 100%;

  color: ${({ mode }) => (mode ? '#30303f' : '#f5f5f5')};
  transition: color 0.3s;

  > svg {
    display: block;
    margin: 2rem auto;
  }

  > h1 {
    left: min(calc(-1 * min((100vw - 1200px) / 2, 2vw)), -1vw);
    padding-top: 6rem;
    padding-bottom: 1rem;
    font-size: 5.5rem;
    color: ${({ mode }) => (mode ? '#30303f' : '#f5f5f5')};
  }
  > h2 {
    left: min(calc(-1 * min((100vw - 1200px) / 2, 1vw)), -0.5vw);
    padding-top: 4rem;
    padding-bottom: 1rem;
    font-size: 4rem;
  }
  > h3 {
    left: min(calc(-1 * min((100vw - 1200px) / 2, 0.5vw)), -0.2vw);
    padding-top: 3rem;
    font-size: 3rem;
  }

  > p {
    padding: 1.5rem 0 3.5rem 0;
    line-height: 2;
  }

  > .gatsby-image-wrapper {
    border-radius: 3px;
  }

  @media screen and (max-width: 1100px) {
    padding: 1rem 10rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0 4rem;
    margin: 0 auto;
  }
  @media screen and (max-width: 480px) {
    padding: 0 3rem;
    > h1 {
      padding-top: 1rem;
      padding-bottom: 0.2rem;
      font-size: 3.5rem;
    }
    > h2 {
      padding-top: 0.8rem;
      font-size: 2.5rem;
    }
    > h3 {
      padding-top: 0.4rem;
      font-size: 2rem;
    }

    > p {
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
