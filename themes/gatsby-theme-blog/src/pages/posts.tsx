import React, { memo } from 'react';

import styled from '@emotion/styled';

import { AllPosts } from '../../types';
import { ArticleCard, Background, ScatteredChars, SEO } from '../components';
import { useAllPosts } from '../hooks';
import { postsStyle } from '../styles';

type ContainerProps = { path: string };
type Props = { allPosts: AllPosts };

const Component: React.FCX<Props> = memo(({ className, allPosts }) => (
  <main className={className}>
    <Background />
    <section>
      <ScatteredChars chars={'posts'} />
    </section>
    <ul>
      {allPosts.map(({ excerpt, frontmatter }, i) => {
        const fluid = frontmatter.cover?.childImageSharp.fluid;
        return (
          <li key={i}>
            <ArticleCard frontmatter={frontmatter} fluid={fluid} excerpt={excerpt} />
          </li>
        );
      })}
    </ul>
  </main>
));

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
