import React from 'react';
import { render } from '@testing-library/react';
import { isFunction } from 'lodash';

/**
 * Wraps a component in a ThemeProvider to allow testing
 * themed styled components
 */

interface MockedComponentProps {
  Component: any;
}

const MockedComponent = ({ Component }: MockedComponentProps) => {
  return (
    <>
      <Component />
    </>
  );
};
export const renderWithProviders = (component: any) =>
  render(
    <>
      {isFunction(component) ? component() : component}
    </>
  );
export default MockedComponent;
