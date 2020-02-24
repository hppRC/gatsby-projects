import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { memo } from 'react';

import styled from '@emotion/styled';

import { PostData, PostNode, PostPageContext } from '../../types';
import {
    Background, PostBody, PrevNextCard, ScatteredChars, SEO, SideContents, TagsList
} from '../components';
import { ColorModeContainer } from '../store';

type ContainerProps = { path: string; data: PostData; pageContext: PostPageContext };
type Props = {
  body: string;
  headings: { value: string; depth: number }[];
  title?: string;
  date?: string;
  tags?: string[];
  fluid?: FluidObject;
  previous: PostNode;
  next: PostNode;
  mode: boolean;
  slug: string;
};

const Component: React.FCX<Props> = memo(
  ({ className, body, headings, title, date, tags, fluid, previous, next, slug }) => (
    <main className={className}>
      <Background />
      <section>
        <ScatteredChars chars={title || 'title'} />
        <div>
          <p>{date}</p>
          <TagsList tags={tags} isTitle />
        </div>
      </section>
      <article>
        <PostBody cover={fluid} body={body} />
        <SideContents headings={headings} title={title || 'blog'} slug={slug} />
      </article>
      <PrevNextCard prev={previous} next={next} />
    </main>
  )
);

const StyledComponent = styled(Component)`
  position: relative;

  > section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 2rem;

      > p {
        padding: 0.5rem 2rem;
        color: #ffffff;
      }

      > ul {
        > li {
          margin: 0 0.4rem;
          font-size: 1.6rem;
        }
      }
    }
  }

  > article {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 10rem auto;
    display: grid;
    grid-template-columns: 3fr 0.75fr;
    background-color: transparent;
    justify-content: center;
    padding: 5rem 2rem;
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
    > article {
      margin: 0;
      padding: 2rem;
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    > section {
      > div {
        flex-direction: column;
        > p {
          font-size: 1.8rem;
        }
      }
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({ data, pageContext, path }) => {
  if (!data.mdx) return <></>;

  const { body, headings, frontmatter } = data.mdx;
  const { title, date, tags, cover } = frontmatter;
  const fluid = cover?.childImageSharp?.fluid;
  const { previous, next, slug } = pageContext;
  const { mode } = ColorModeContainer.useContainer();

  return (
    <>
      <SEO title='Posts' pathname={path} />
      <StyledComponent {...{ body, headings, title, date, tags, fluid, previous, next, mode, slug }} />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      excerpt
      headings {
        value
        depth
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        cover {
          childImageSharp {
            fluid(maxWidth: 1400, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default memo(Container);
