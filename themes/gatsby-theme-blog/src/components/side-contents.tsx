import React, { memo } from 'react';

import styled from '@emotion/styled';

import { TOC } from './';

type ContainerProps = {
  headings: {
    value: string;
    depth: number;
  }[];
};
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = memo(({ className, headings }) => (
  <div className={className}>
    <div>
      <TOC headings={headings} />
    </div>
  </div>
));

const StyledComponent = styled(Component)`
  padding: 0 2rem;

  > div {
    position: sticky;
    top: 7.5vh;
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

const Container: React.FCX<ContainerProps> = ({ headings }) => {
  return <StyledComponent headings={headings} />;
};

export default memo(Container);
