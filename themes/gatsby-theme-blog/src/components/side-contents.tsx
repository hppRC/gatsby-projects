import { Link } from 'gatsby';
import React, { memo } from 'react';

import styled from '@emotion/styled';
import { Location } from '@reach/router';

import { ColorModeContainer } from '../store';

const GithubSlugger = require('github-slugger');
const slugger = new GithubSlugger();

type ContainerProps = {
  headings: {
    value: string;
    depth: number;
  }[];
};

type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, headings }) => (
  <Location>
    {({ location }) => (
      <div className={className}>
        <ul>
          {headings.map(({ value, depth }, i) => (
            <li key={i} style={{ paddingLeft: `${depth * 1.1}rem` }}>
              <Link to={`${location.pathname}#${slugger.slug(value)}`}>{value}</Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </Location>
));

const StyledComponent = styled(Component)`
  padding: 0 2rem;
  > ul {
    position: sticky;
    top: 7.5vh;
    list-style: none;

    > li {
      border-radius: 3px;
      transition: background-color 0.15s;
      :hover {
        background-color: ${({ mode }) => (mode ? '#09090f10' : '#ffffff10')};
      }

      > a {
        display: block;
        padding: 0.5rem;
        color: ${({ mode }) => (mode ? '#09090f90' : '#ffffff90')};
        text-decoration: none;
        transition: color 0.15s;
        :hover {
          color: ${({ mode }) => (mode ? '#09090fc0' : '#ffffffc0')};
        }
      }
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

const Container: React.FCX<ContainerProps> = props => {
  const { mode } = ColorModeContainer.useContainer();
  slugger.reset();
  return <StyledComponent {...props} mode={mode} />;
};

// when you memolize this, you'll get an error to jump headdings(you can jump only once)
export default Container;
