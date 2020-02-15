import React from 'react';

import { useAnyImage } from '@hpprc/gatsby-theme-blog-core';

type ContainerProps = {};
type Props = { fluid: any } & ContainerProps;

const Component: React.FCX<Props> = ({ className, fluid }) => <div className={className}>{JSON.stringify(fluid)}</div>;

const Container: React.FCX<ContainerProps> = props => {
  const fluid = useAnyImage('test1.jpg');
  return <Component {...props} fluid={fluid} />;
};

export default Container;
