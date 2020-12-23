import React, { Component, ErrorInfo } from 'react';
import styled from 'styled-components';

const Error = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

class ErrorBoundary extends Component {
  state = { error: null, info: null };

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;
    if (!error) return this.props.children;
    console.error(info, error);
    return <Error>Error occurred :(</Error>;
  }
}

export default ErrorBoundary;
