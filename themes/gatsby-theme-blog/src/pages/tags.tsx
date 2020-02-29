import React from 'react';

import styled from '@emotion/styled';

import { Background, ScatteredChars, SEO, TagCard } from '../components';
import { useAllTags } from '../hooks';
import { postsStyle } from '../styles';

type ContainerProps = { path: string };
type Props = { tags: string[] };

const Component: React.FCX<Props> = ({ className, tags }) => (
  <main className={className}>
    <Background />
    <section>
      <ScatteredChars chars='tags' />
    </section>
    <ul>
      {tags.map((tag, i) => (
        <li key={i}>
          <TagCard tag={tag} />
        </li>
      ))}
    </ul>
  </main>
);

const StyledComponent = styled(Component)`
  ${postsStyle}

  @media screen and (max-width: 1500px) {
    > ul {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
    }
  }
  @media screen and (max-width: 1100px) {
    > ul {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
    }
  }
  @media screen and (max-width: 768px) {
    > ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2rem;
    }
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({ path }) => {
  const tags = useAllTags();

  return (
    <>
      <SEO title='Top' pathname={path} />
      <StyledComponent tags={tags} />
    </>
  );
};

export default Container;
