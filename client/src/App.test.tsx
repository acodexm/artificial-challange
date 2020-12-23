import React from 'react';
import App from './App';
import { renderWithProviders } from './helpers/mocked-component';

describe('<App>', () => {
  it('renders learn react link', () => {
    const { getByText } = renderWithProviders(<App hideLoader={() => {}} />);
    const linkElement = getByText(/HACKER NEWS/i);
    expect(document.body.contains(linkElement));
  });
});
