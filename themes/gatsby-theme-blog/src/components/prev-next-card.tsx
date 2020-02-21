import { Link } from 'gatsby';
import path from 'path';
import React, { memo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { PostNode } from '../../types';
import { useHpprcThemeConfig } from '../hooks';
import { ColorModeContainer } from '../store';
import { DecoMoon, MemolizedImage, TagsList } from './';

type ContainerProps = { prev: PostNode; next: PostNode };
type Props = { mode: boolean; blogPath: string } & ContainerProps;
type CardProps = { node: PostNode; blogPath: string };

const Card: React.FCX<CardProps> = memo(({ node, blogPath }) => {
  if (!node) return <div></div>;

  const { frontmatter, excerpt } = node;
  const { title, date, slug, cover, tags } = frontmatter;
  const fluid = cover?.childImageSharp?.fluid;
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
  grid-template-columns: min(50vw, 700px) min(50vw, 700px);

  > article {
    height: auto;
    position: relative;
    margin: 3rem;
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0px 3px 10px 0px #09090f30;
    background-color: ${({ mode }) => (mode ? 'transparent' : '#13131f')};

    > a {
      padding: 2rem 1rem;
      display: flex;
      align-items: center;
      color: ${({ mode }) => (mode ? '#09090f' : '#fffffff0')};

      > .gatsby-image-wrapper {
        margin: 0 1rem;
        width: 50%;
        height: 100%;
        > img {
          height: 20rem;
          border-radius: 3px;
        }
      }

      > section {
        display: flex;
        flex-direction: column;

        width: 50%;
        height: 100%;
        padding: 0 0.5rem;
        transition: background-color 0.3s;
      }
    }
  }

  > article:nth-of-type(2) {
    > a {
      flex-direction: row-reverse;
    }
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

const Container: React.FCX<ContainerProps> = ({ prev, next }) => {
  const { mode } = ColorModeContainer.useContainer();
  const { blogPath } = useHpprcThemeConfig();
  return <StyledComponent {...{ prev, next, mode, blogPath }} />;
};

export default memo(Container);
