import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

const keyframes1 = keyframes`
  0% {
    top: 36px;
    height: 128px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;
const keyframes2 = keyframes`
  0% {
    top: 42px;
    height: 116px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;
const keyframes3 = keyframes`
  0% {
    top: 48px;
    height: 104px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;
const LoadingWrapper = styled.div<{ 'data-loading': boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  .bars div {
    position: absolute;
    width: 30px;
    border-radius: 1rem;
  }
  .bars div:nth-child(1) {
    left: 35px;
    background: #f79100;
    animation: ${keyframes1} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.2s;
  }
  .bars div:nth-child(2) {
    left: 85px;
    background: #00d8ff;
    animation: ${keyframes2} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation-delay: -0.1s;
  }
  .bars div:nth-child(3) {
    left: 135px;
    background: #8e8e8e;
    animation: ${keyframes3} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .loading-bars {
    width: 200px;
    height: 200px;
    overflow: hidden;
    background: none;
    position: absolute;
    display: flex;
    flex: 1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    visibility: ${(props) => (props['data-loading'] ? 'visible' : 'hidden')};
  }
  .bars {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
  }
  .bars div {
    box-sizing: content-box;
  }
`;
const Content = styled.div<{ 'data-visible'?: boolean }>`
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props['data-visible'] ? 'visible' : 'hidden')};
`;
const Error = styled.div<{ 'data-error': boolean }>`
  display: inline-block;
  position: absolute;
  visibility: ${(props) => (props['data-error'] ? 'visible' : 'hidden')};
`;
interface OwnProps {
  loading: boolean;
  error: boolean;
  preventDisplayContent?: boolean;
  style?: React.CSSProperties;
}

type Props = OwnProps;
const LoadingHandler: FunctionComponent<Props> = ({
  children,
  loading,
  error,
  preventDisplayContent,
  style,
}) => {
  const renderChildren = () => {
    if (preventDisplayContent && !error && !loading) return children;
    else if (!preventDisplayContent) return children;
    else return null;
  };
  return (
    <LoadingWrapper data-loading={loading} style={style}>
      <Content data-testid="content" data-visible={!loading && !error}>
        {renderChildren()}
      </Content>
      <div className="loading-bars" data-testid="loading">
        <div className="bars">
          <div />
          <div />
          <div />
        </div>
      </div>
      <Error data-error={error} data-testid="error">
        Failed to load content
      </Error>
    </LoadingWrapper>
  );
};

export default LoadingHandler;
