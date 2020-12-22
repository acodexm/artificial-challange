import React, { FunctionComponent } from 'react';

interface OwnProps {
  isLoading: boolean;
  isError: boolean;
  error: any;
}

type Props = OwnProps;

const LoadingHandler: FunctionComponent<Props> = ({ children, isError, isLoading, error }) => {
  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Error: {error.message}</div>
  ) : (
    <div>{children}</div>
  );
};

export default LoadingHandler;
