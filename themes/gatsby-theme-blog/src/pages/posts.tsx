import React, { memo } from 'react';

import styled from '@emotion/styled';

import { AllPosts } from '../../types';
import { ArticleCard, Background, ScatteredChars, SEO } from '../components';
import { useAllPosts } from '../hooks';

type ContainerProps = { path: string };
type Props = { allPosts: AllPosts };

const Component: React.FCX<Props> = memo(({ className, allPosts }) => (
  <main className={className}>
    <Background />
    <section>
      <ScatteredChars chars={'Posts'} />
    </section>
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

  > section:nth-of-type(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;

    > h1 {
      color: #ffffff;
      font-size: 10rem;
    }
  }

  > section:nth-of-type(2) {
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
  const nodes: AllPosts = useAllPosts();
  return (
    <>
      <SEO title='Posts' pathname={props.path} />
      <StyledComponent allPosts={nodes} />
    </>
  );
};

export default memo(Container);
