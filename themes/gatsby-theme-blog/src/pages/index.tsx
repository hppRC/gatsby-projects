import React from 'react';

import styled from '@emotion/styled';

import { AllPosts } from '../../types';
import { ArticleCard, Background, ScatteredChars, SEO } from '../components';
import { useAllPosts, useHpprcThemeConfig } from '../hooks';
import { postsStyle } from '../styles';

type ContainerProps = { path: string };
type Props = { posts: AllPosts; siteTitle: string };

const Component: React.FCX<Props> = ({ className, posts, siteTitle }) => (
  <main className={className}>
    <Background />
    <section>
      <ScatteredChars chars={siteTitle} />
    </section>
    <section>
      {posts.map(({ excerpt, frontmatter }, i) => {
        const fluid = frontmatter.cover?.childImageSharp.fluid;
        return <ArticleCard key={i} frontmatter={frontmatter} fluid={fluid} excerpt={excerpt} />;
      })}
    </section>
  </main>
);

const StyledComponent = styled(Component)`
  ${postsStyle}
  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({ path }) => {
  const nodes = useAllPosts();
  const { siteTitle } = useHpprcThemeConfig();
  return (
    <>
      <SEO title='Top' pathname={path} />
      <StyledComponent posts={nodes} siteTitle={siteTitle} />
    </>
  );
};

export default Container;
