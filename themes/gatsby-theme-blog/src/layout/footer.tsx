import React, { memo } from 'react';
import { FaGithub } from 'react-icons/fa';

import styled from '@emotion/styled';

import { useSiteMetadata } from '../hooks';
import { ColorModeContainer } from '../store';

type ContainerProps = {};
type Props = { mode: boolean; author: string } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, author }) => (
  <footer className={className}>
    <div>
      Copyright©2020.<a href={`https://twitter.com/${author.slice(1)}`}> {author}</a>
    </div>
    <div>
      <a href='https://github.com/hppRC'>
        <i>
          <FaGithub />
        </i>
      </a>
      <a href='https://github.com/hppRC/gatsby-projects/tree/master/themes/gatsby-theme-blog'>Theme</a>by{' '}
      <a href='https://hpprc.com'>
        hpp<span>🌝</span>
      </a>
    </div>
  </footer>
));

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  > div {
    margin: 0.2rem 0;
    font-weight: 500;
    color: ${({ mode }) => (mode ? '#30303f' : '#f5f5f5')};
    transition: color 0.3s;
    > a {
      margin-right: 0.5rem;
      color: ${({ mode }) => (mode ? '#30303f' : '#f5f5f5')};
      text-decoration: none;
      transition: color 0.3s, opacity 0.3s;

      :hover {
        opacity: 0.6;
      }

      > span {
        margin-left: 0.3rem;
      }
    }
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = () => {
  const { author } = useSiteMetadata();
  const { mode } = ColorModeContainer.useContainer();

  return <StyledComponent mode={mode} author={author || 'hppRC'} />;
};

export default memo(Container);
