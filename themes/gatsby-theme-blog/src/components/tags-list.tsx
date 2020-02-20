import React, { memo } from 'react';

import styled from '@emotion/styled';

import { ColorModeContainer } from '../store';

type ContainerProps = { tags: string[] | undefined; isTitle?: boolean };
type Props = { mode: boolean } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, tags }) => (
  <ul className={className}>
    {tags?.map((tag, j) => (
      <li key={j}>{tag}</li>
    ))}
  </ul>
));

const StyledComponent = styled(Component)`
  display: flex;
  padding: 1rem 0;
  overflow: auto;
  list-style: none;

  > li {
    padding: 0.2rem 0.4rem;
    margin-right: 0.5rem;
    font-size: 1.4rem;
    color: ${({ mode, isTitle }) => (!isTitle && mode ? '#09090ff0' : '#fffffff0')};
    word-break: keep-all;
    border: 0.5px solid ${({ mode, isTitle }) => (!isTitle && mode ? '#09090ff0' : '#fffffff0')};
    border-radius: 3px;
    transition: color, border 0.3s;
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
  return <StyledComponent tags={tags} mode={mode} isTitle={isTitle} />;
};

export default memo(Container);
