import React from 'react';

import styled from '@emotion/styled';

import { Frontmatter, PostsByTagPageContext } from '../../types';
import { ArticleCard, Background, ScatteredChars, SEO } from '../components';
import { ColorModeContainer } from '../store';
import { postsStyle } from '../styles';

type ContainerProps = { pageContext: PostsByTagPageContext; path: string };
type Props = {
  posts: { frontmatter: Frontmatter; excerpt: string }[];
  tagName: string;
  mode: boolean;
};

const Component: React.FCX<Props> = ({ className, tagName, posts }) => (
  <main className={className}>
    <Background />
    <section>
      <ScatteredChars chars={tagName} />
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

const Container: React.FCX<ContainerProps> = ({ pageContext, path }) => {
  const { posts, tagName }: PostsByTagPageContext = pageContext;
  const { mode } = ColorModeContainer.useContainer();

  return (
    <>
      <SEO title={tagName} pathname={path} />
      <StyledComponent tagName={tagName} posts={posts} mode={mode} />
    </>
  );
};

export default Container;
