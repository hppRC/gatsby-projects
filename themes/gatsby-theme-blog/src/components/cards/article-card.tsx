import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import path from 'path';
import React, { memo, useState } from 'react';
import { FaTags } from 'react-icons/fa';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { MemolizedImage, TagsList } from '../';
import { Frontmatter, Theme } from '../../../types';
import { useAnyImage, useHpprcThemeConfig } from '../../hooks';
import { useTheme } from '../../theme';
import DecoMoon from './deco-moon';

type ContainerProps = {
  frontmatter: Frontmatter;
  fluid: FluidObject | undefined;
  excerpt: string;
};
type Props = { theme: Theme; enter: boolean; setEnter: (enter: boolean) => void; blogPath: string } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, excerpt, frontmatter, fluid, enter, setEnter, blogPath }) => {
  const { slug, title, date, tags } = frontmatter;

  const sp = useSpring({
    config: config.wobbly,
    transform: enter ? 'scale(1.05)' : 'scale(1.0)'
  });

  return (
    <animated.article
      className={className}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      style={sp}
    >
      <Link to={path.join('/', blogPath, slug || '')}>
        <MemolizedImage fluid={fluid} />
        <div>
          <h2>{title}</h2>
          <p>{date}</p>
          <div>
            <i>
              <FaTags />
            </i>
            <TagsList tags={tags} />
          </div>
          <p>{excerpt}</p>
        </div>
      </Link>
      <DecoMoon enter={enter} />
    </animated.article>
  );
});

const StyledComponent = styled(Component)`
  position: relative;
  overflow: hidden;

  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 3px;
  box-shadow: ${({ theme }) => theme.cardBoxShadow};
  transition: background-color 0.3s, box-shadow 0.15s;

  will-change: transform;

  > a {
    position: relative;
    display: block;
    height: 100%;

    color: ${({ theme }) => theme.color};
    text-decoration: none;
    transition: color 0.3s;

    .gatsby-image-wrapper {
      height: 25rem;
      border-radius: 3px 3px 1px 1px;
    }

    > div {
      display: flex;
      flex-direction: column;
      padding: 1rem 2rem 2rem 2rem;

      > h2 {
        font-size: 2rem;
      }
      > p {
        font-size: 1.4rem;
      }

      > div {
        display: flex;
        align-items: flex-end;
        > i {
          padding: 0.5rem 0.2rem 0.8rem 0.2rem;
          font-size: 1.6rem;
          color: ${({ theme }) => theme.color};
          transition: color 0.3s;
        }
      }
    }
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    > a {
      > div {
        > h2 {
          font-size: 1.8rem;
        }
        > p {
          font-size: 1.2rem;
        }

        > div {
          > i {
            padding: 0.2rem 0.1rem 0.4rem 0.1rem;
          }
        }
      }
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({
  frontmatter,
  fluid = useAnyImage('banner.png') || useAnyImage('banner.jpg'),
  excerpt
}) => {
  const [enter, setEnter] = useState(false);
  const theme = useTheme();
  const { blogPath } = useHpprcThemeConfig();
  return <StyledComponent {...{ frontmatter, fluid, excerpt, enter, setEnter, theme, blogPath }} />;
};

export default memo(Container);
