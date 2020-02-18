import Img, { FluidObject } from 'gatsby-image';
import React, { memo } from 'react';

import styled from '@emotion/styled';

import { AllPosts } from '../../types';
import { ArticleCard, ScatteredChars, SEO } from '../components';
import { useAllPosts, useAnyImage } from '../hooks';
import { ColorModeContainer } from '../store';

type ContainerProps = { path: string };
type Props = { mode: boolean; background?: FluidObject; allPosts: AllPosts };

const Component: React.FCX<Props> = memo(({ className, background, allPosts }) => (
  <main className={className}>
    <Img fluid={background} />
    <ScatteredChars chars={'Posts'} />
    <section>
      {allPosts.map(({ excerpt, frontmatter }, i) => {
        const fluid = frontmatter.cover?.childImageSharp.fluid;
        return <ArticleCard key={i} frontmatter={frontmatter} fluid={fluid} excerpt={excerpt} />;
      })}
    </section>
  </main>
));

const StyledComponent = styled(Component)`
  position: relative;

  > .gatsby-image-wrapper {
    width: 100vw;
    height: 75vh;
    > img,
    > picture {
      position: absolute;
      top: -25vh;
      width: 100%;
      height: 100vh;
      /* transform: rotate(90deg); */
    }
  }

  section:nth-of-type(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: #ffffff;
      font-size: 10rem;
    }
  }

  section:nth-of-type(2) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2rem;
    padding: 5rem;
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
  const { mode } = ColorModeContainer.useContainer();
  const background = useAnyImage('background.jpg');
  const nodes: AllPosts = useAllPosts();
  return (
    <>
      <SEO title='Posts' pathname={props.path} />
      <StyledComponent mode={mode} background={background} allPosts={nodes} />
    </>
  );
};

export default memo(Container);
