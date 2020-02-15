import React from 'react';

type ContainerProps = {};
type Props = {} & ContainerProps;

const Component: React.FCX<Props> = ({ className }) => <div className={className}>test</div>;

const Container: React.FCX<ContainerProps> = props => {
  return <Component {...props} />;
};

export default Container;
