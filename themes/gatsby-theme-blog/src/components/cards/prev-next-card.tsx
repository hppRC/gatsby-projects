import { Link } from 'gatsby';
import path from 'path';
import React, { memo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { MemolizedImage, TagsList } from '../';
import { PostNode } from '../../../types';
import { useAnyImage, useHpprcThemeConfig } from '../../hooks';
import { ColorModeContainer } from '../../store';
import DecoMoon from './deco-moon';

type ContainerProps = { prev: PostNode; next: PostNode };
type Props = { mode: boolean; blogPath: string } & ContainerProps;
type CardProps = { node: PostNode; blogPath: string };

const Card: React.FCX<CardProps> = memo(({ node, blogPath }) => {
  if (!node) return <div></div>;

  const { frontmatter, excerpt } = node;
  const { title, date, slug, cover, tags } = frontmatter;
  const fluid = cover?.childImageSharp?.fluid || useAnyImage('banner.png') || useAnyImage('banner.jpg');
  const [enter, setEnter] = useState(false);

  const sp = useSpring({
    config: config.wobbly,
    transform: enter ? 'scale(1.05)' : 'scale(1.0)'
  });

  return (
    <animated.article style={sp} onMouseEnter={() => setEnter(true)} onMouseLeave={() => setEnter(false)}>
      <Link to={path.join(blogPath, slug || '')}>
        <MemolizedImage fluid={fluid} />
        <section>
          <h2>{title}</h2>
          <p>{date}</p>
          <TagsList tags={tags} />
          <p>{excerpt}</p>
        </section>
        <DecoMoon enter={enter} />
      </Link>
    </animated.article>
  );
});

const Component: React.FCX<Props> = memo(({ className, prev, next, blogPath }) => (
  <div className={className}>
    <Card node={prev} blogPath={blogPath} />
    <Card node={next} blogPath={blogPath} />
  </div>
));

const StyledComponent = styled(Component)`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: min(50%, 700px) min(50%, 700px);

  > article {
    height: 100%;
    position: relative;
    margin: 0 3rem;
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 5px 5px 10px ${({ mode }) => (mode ? '#d9d9d9' : '#00000f')},
      -5px -5px 10px ${({ mode }) => (mode ? '#ffffff' : '#00000f')};
    background-color: ${({ mode }) => (mode ? 'transparent' : '#13131f')};
    transition: background-color 0.3s, box-shadow 0.15s;

    > a {
      height: 25rem;
      display: flex;
      color: ${({ mode }) => (mode ? '#13131f' : '#f5f5f5')};
      transition: color 0.3s;

      > .gatsby-image-wrapper {
        display: block;
        width: 40%;
        height: 100%;
        > picture img {
          height: 100%;
        }
      }

      > section {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 60%;
        height: 100%;
        padding: 1rem 2rem;
        transition: background-color 0.3s;

        > h2 {
          font-size: 2rem;
          padding: 0.6rem 0;
        }

        > p {
          font-size: 1.4rem;
          z-index: -1;
        }
      }
    }
  }

  > article:nth-of-type(2) {
    > a {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: 1100px) {
    > article {
      > a {
        height: 40rem;
        flex-direction: column;
        > .gatsby-image-wrapper {
          width: 100%;
        }

        > section {
          width: 100%;
          height: 100%;
          padding: 1.5rem 2rem;
          justify-content: flex-start;

          > h2 {
            font-size: 2rem;
            padding: 0.6rem 0;
          }

          > p {
            font-size: 1.4rem;
            z-index: -1;
          }
        }
      }
    }
    > article:nth-of-type(2) {
      > a {
        flex-direction: column;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 5rem;
    margin: 0;
    padding: 2rem;

    > article {
      margin: 0;
      width: 100%;
      > a {
        > section {
          padding: 0rem 2rem;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    > article {
      > a {
        flex-direction: column;
        height: auto;

        > .gatsby-image-wrapper {
          width: 100%;
          > picture img {
            width: 100%;
          }
        }

        > section {
          width: 100%;
          padding: 2rem;
          box-shadow: 0 0;
        }
      }
    }
    > article:nth-of-type(2) {
      > a {
        flex-direction: column;
      }
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({ prev, next }) => {
  const { mode } = ColorModeContainer.useContainer();
  const { blogPath } = useHpprcThemeConfig();
  return <StyledComponent {...{ prev, next, mode, blogPath }} />;
};

export default memo(Container);
