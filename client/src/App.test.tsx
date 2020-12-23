import React from 'react';
import App from './App';
import { renderWithProviders } from './helpers/mocked-component';
const loader = document.querySelector('.loader');

const hideLoader = () => loader?.classList.add('loader--hide');
describe('<App>', () => {
  it('renders learn react link', () => {
    const { getByText } = renderWithProviders(<App hideLoader={hideLoader} />);
    const linkElement = getByText(/HACKER NEWS/i);
    expect(document.body.contains(linkElement));
  });
});
