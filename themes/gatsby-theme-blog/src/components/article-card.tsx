import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import path from 'path';
import React, { memo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';

import styled from '@emotion/styled';

import { Frontmatter } from '../../types';
import { useHpprcThemeConfig } from '../hooks';
import { ColorModeContainer } from '../store';
import { DecoMoon, TagsList } from './';

type ContainerProps = {
  key: number;
  frontmatter: Frontmatter;
  fluid: FluidObject | undefined;
  excerpt: string;
};
type Props = { mode: boolean; enter: boolean; setEnter: (enter: boolean) => void; blogPath: string } & ContainerProps;
type EyeCatchProps = { fluid: FluidObject | undefined };

// to avoid re-rendering image component
const EyeCatch: React.FCX<EyeCatchProps> = memo(({ fluid }) => (
  <>{fluid && <Img fluid={fluid} alt='eyecatch iage' />}</>
));

const Component: React.FCX<Props> = ({ className, key, excerpt, frontmatter, fluid, enter, setEnter, blogPath }) => {
  const { slug, title, date, tags } = frontmatter;

  const sp = useSpring({
    config: config.wobbly,
    transform: enter ? 'scale(1.05)' : 'scale(1.0)'
  });

  return (
    <animated.article
      key={key}
      className={className}
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
      style={sp}
    >
      <Link to={path.join('/', blogPath, slug || '')}>
        <EyeCatch fluid={fluid} />
        <div>
          <h2>{title}</h2>
          <p>{date}</p>
          <TagsList tags={tags} />
          <p>{excerpt}</p>
        </div>
      </Link>
      <DecoMoon enter={enter} />
    </animated.article>
  );
};

const StyledComponent = styled(Component)`
  position: relative;
  overflow: hidden;

  background-color: ${({ mode }) => (mode ? 'transparent' : '#13131f')};
  box-shadow: 0px 3px 10px 0px #09090f30;
  transition: background-color 0.3s;

  > a {
    position: relative;
    display: block;

    width: 100%;
    height: 100%;
    padding: 1rem;
    color: ${({ mode }) => (mode ? '#09090fe0' : '#ffffffe0')};
    text-decoration: none;
    transition: color 0.3s;

    > div {
      padding: 1rem;
      > p {
        padding: 0.5rem 0;
      }
    }
  }

  will-change: transform;

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
  const [enter, setEnter] = useState(false);
  const { mode } = ColorModeContainer.useContainer();
  const { blogPath } = useHpprcThemeConfig();
  return <StyledComponent {...{ ...props, enter, setEnter, mode, blogPath }} />;
};

export default Container;
