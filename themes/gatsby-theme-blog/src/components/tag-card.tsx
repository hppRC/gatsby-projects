import { Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import path from 'path';
import React, { memo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { useAnyImage, useHpprcThemeConfig } from '../hooks';
import { ColorModeContainer } from '../store';
import { DecoMoon, MemolizedImage } from './';

type ContainerProps = {
  tag: string;
};
type Props = {
  mode: boolean;
  enter: boolean;
  setEnter: (enter: boolean) => void;
  fluid?: FluidObject;
  tagsPath: string;
} & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, fluid, enter, setEnter, tag, tagsPath }) => {
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
      <Link to={path.join('/', tagsPath, tag)}>
        <MemolizedImage fluid={fluid} />
        <div>
          <h2>{tag}</h2>
        </div>
      </Link>
      <DecoMoon enter={enter} />
    </animated.article>
  );
});

const StyledComponent = styled(Component)`
  position: relative;
  overflow: hidden;

  background-color: ${({ mode }) => (mode ? 'transparent' : '#13131f')};
  border-radius: 3px;
  box-shadow: 5px 5px 10px ${({ mode }) => (mode ? '#d9d9d9' : '#00000f')},
    -5px -5px 10px ${({ mode }) => (mode ? '#ffffff' : '#00000f')};
  transition: background-color 0.3s, box-shadow 0.15s;

  will-change: transform;

  > a {
    position: relative;
    display: block;
    height: 100%;

    color: ${({ mode }) => (mode ? '#13131f' : '#f5f5f5')};
    text-decoration: none;
    transition: color 0.3s;

    .gatsby-image-wrapper {
      height: 25rem;
      border-radius: 3px;
    }

    > div {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      > h2 {
        z-index: 1;
        font-size: 6rem;
        color: #ffffff;
      }

      ::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background-color: #09090f;
        opacity: 0.3;
      }
    }
  }

  @media screen and (max-width: 1100px) {
    > a {
      .gatsby-image-wrapper {
        height: 20rem;
      }
      > div {
        > h2 {
          font-size: 4.5rem;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    > a {
      .gatsby-image-wrapper {
        height: 15rem;
      }
      > div {
        > h2 {
          font-size: 3rem;
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({ tag }) => {
  const [enter, setEnter] = useState(false);
  const { mode } = ColorModeContainer.useContainer();
  const { tagsPath } = useHpprcThemeConfig();
  const fluid = useAnyImage(tag) || useAnyImage('banner.png') || useAnyImage('banner.jpg');
  return <StyledComponent {...{ fluid, enter, setEnter, mode, tag, tagsPath }} />;
};

export default memo(Container);
