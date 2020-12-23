import React from 'react';
import { render } from '@testing-library/react';
import { isFunction } from 'lodash';
import { BrowserRouter } from 'react-router-dom';

/**
 * Wraps a component in a ThemeProvider to allow testing
 * themed styled components
 */

interface MockedComponentProps {
  Component: any;
}

const MockedComponent = ({ Component }: MockedComponentProps) => {
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
};
export const renderWithProviders = (component: any) =>
  render(<BrowserRouter>{isFunction(component) ? component() : component}</BrowserRouter>);
export default MockedComponent;
