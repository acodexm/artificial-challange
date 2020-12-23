import React, { FunctionComponent } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { renderWithProviders } from '../../helpers/mocked-component';

const warning = `I'm dangerous`;
const Bomb: FunctionComponent<{ explode?: boolean }> = ({ explode }) => {
  if (explode) throw new Error('Boom');
  return <div>{warning}</div>;
};
const renderBomb = (explode?: boolean) =>
  renderWithProviders(
    <ErrorBoundary>
      <Bomb explode={explode} />
    </ErrorBoundary>
  );
describe('checks global error handler', () => {
  it('chatches error', () => {
    const { getByText } = renderBomb(true);
    expect(getByText('Error occurred :(')).toBeVisible();
  });
  it('renders children', () => {
    const { getByText } = renderBomb();
    expect(getByText(warning)).toBeInTheDocument();
  });
});
