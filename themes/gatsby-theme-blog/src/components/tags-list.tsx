import { Link } from 'gatsby';
import path from 'path';
import React, { memo } from 'react';

import styled from '@emotion/styled';

import { useHpprcThemeConfig } from '../hooks';
import { ColorModeContainer } from '../store';

type ContainerProps = { tags: string[] | undefined; isTitle?: boolean };
type Props = { mode: boolean; tagsPath: string } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, tags, isTitle, tagsPath }) => (
  <ul className={className}>
    {tags?.map((tag, i) =>
      isTitle ? (
        <li key={i}>
          <Link to={path.join(tagsPath, tag)}>{tag}</Link>
        </li>
      ) : (
        <li key={i}>{tag}</li>
      )
    )}
  </ul>
));

const StyledComponent = styled(Component)`
  display: flex;
  padding: 0.8rem 0;
  overflow: auto;
  list-style: none;

  > li {
    padding: ${({ isTitle }) => (isTitle ? '0 0' : '0.2rem 0.4rem')};
    margin-right: 0.5rem;
    font-size: 1.4rem;
    color: ${({ mode }) => (mode ? '#09090ff0' : '#fffffff0')};
    word-break: keep-all;
    border: 0.5px solid ${({ mode, isTitle }) => (!isTitle && mode ? '#09090ff0' : '#fffffff0')};
    border-radius: 3px;
    transition: color 0.3s, border 0.3s;

    > a {
      display: block;
      color: #fffffff0;
      border-radius: 2px;
      padding: 0.2rem 0.4rem;
      transition: color, background-color 0.15s;

      :hover {
        color: #09090ff0;
        background-color: #ffffff;
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

const Container: React.FCX<ContainerProps> = ({ tags, isTitle }) => {
  const { mode } = ColorModeContainer.useContainer();
  const { tagsPath } = useHpprcThemeConfig();
  return <StyledComponent {...{ tags, isTitle, mode, tagsPath }} />;
};

export default memo(Container);
