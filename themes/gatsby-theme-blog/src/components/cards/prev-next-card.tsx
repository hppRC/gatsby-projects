import { Link } from 'gatsby';
import path from 'path';
import React, { memo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { MemolizedImage, TagsList } from '../';
import { PostNode, Theme } from '../../../types';
import { useAnyImage, useHpprcThemeConfig } from '../../hooks';
import { useTheme } from '../../theme';
import DecoMoon from './deco-moon';

type ContainerProps = { prev: PostNode; next: PostNode };
type Props = { theme: Theme; blogPath: string } & ContainerProps;
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
    box-shadow: ${({ theme }) => theme.cardBoxShadow};
    background-color: ${({ theme }) => theme.cardBackground};
    transition: background-color 0.3s, box-shadow 0.15s;

    > a {
      height: 25rem;
      display: flex;
      color: ${({ theme }) => theme.color};
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
    display: flex;
    flex-direction: column;

    margin: 0;
    padding: 2rem;

    > article {
      margin: 2rem 0;
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
      margin: 1rem 0;
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
  const { blogPath } = useHpprcThemeConfig();
  const theme = useTheme();
  return <StyledComponent {...{ prev, next, theme, blogPath }} />;
};

export default memo(Container);
