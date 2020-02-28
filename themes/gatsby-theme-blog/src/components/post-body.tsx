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
  --borderWidth: 3px;

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
    padding: 1rem 0;
    margin: 6rem 0 1rem 0;
    font-size: 5.5rem;
    color: ${({ mode }) => (mode ? '#30303f' : '#f5f5f5')};
    border-bottom: solid ${({ mode }) => (mode ? '0.25rem #3F8EFC' : '0.3rem #3F8EFC')};
    border-radius: 1px;
    transition: border-bottom 0.3s;
  }

  > h2 {
    left: min(calc(-1 * min((100vw - 1200px) / 2, 1vw)), -0.5vw);
    padding: 0.8rem 0;
    margin: 4rem 0 0.8rem 0;
    font-size: 4rem;
    border-bottom: solid ${({ mode }) => (mode ? '0.25rem #3F8EFC' : '0.3rem #3F8EFC')};
    border-radius: 1px;
    transition: border-bottom 0.3s;
  }

  > h3 {
    left: min(calc(-1 * min((100vw - 1200px) / 2, 0.5vw)), -0.2vw);
    padding: 0.5rem 0;
    margin: 2rem 0 1rem 0;
    font-size: 3rem;
    border-bottom: solid ${({ mode }) => (mode ? '0.25rem #3F8EFC' : '0.3rem #3F8EFC')};
    border-radius: 1px;
    transition: border-bottom 0.3s;
  }

  > p {
    margin: 1.5rem 0 3.5rem 0;
    line-height: 2;
  }

  > .gatsby-image-wrapper {
    margin-bottom: 5rem;
    border-radius: 3px;
  }

  @media screen and (max-width: 1100px) {
    padding: 1rem 10rem;
    > h1 {
      font-size: 4.5rem;
    }
    > h2 {
      margin-top: 0.8rem;
      font-size: 3rem;
    }
    > h3 {
      margin-top: 0.5rem;
      font-size: 3rem;
    }

    > p {
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0 4rem;
    margin: 0 auto;
  }
  @media screen and (max-width: 480px) {
    padding: 0 2rem;
    > h1 {
      margin: 2rem 0 1rem 0;
      font-size: 3.5rem;
    }
    > h2 {
      margin-top: 0.8rem;
      font-size: 2.5rem;
    }
    > h3 {
      margin-top: 0.5rem;
      font-size: 2rem;
    }

    > p {
    }
  }
  @media screen and (max-height: 430px) {
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Container: React.FCX<ContainerProps> = props => {
  const { mode } = ColorModeContainer.useContainer();
  return <StyledComponent {...props} mode={mode} />;
};

export default memo(Container);
