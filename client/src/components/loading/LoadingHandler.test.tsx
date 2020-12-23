import React from 'react';
import { cleanup, render } from '@testing-library/react';
import LoadingHandler from './LoadingHandler';

describe('test loading handler', () => {
  beforeAll(() => cleanup());
  test('Hide children until its safe to render', () => {
    const { getByTestId, rerender } = render(
      <LoadingHandler error={false} loading={true} preventDisplayContent={true}>
        <div>anything</div>
      </LoadingHandler>
    );
    const content = getByTestId('content');
    expect(content).toBeEmpty();
    rerender(
      <LoadingHandler error={false} loading={false} preventDisplayContent={true}>
        <div>anything</div>
      </LoadingHandler>
    );
    expect(content).toHaveStyle('visibility: visible');
  });
  test('Shows loading', () => {
    const { getByTestId } = render(
      <LoadingHandler error={false} loading={true}>
        <div>anything</div>
      </LoadingHandler>
    );
    const loading = getByTestId('loading');
    const content = getByTestId('content');
    const error = getByTestId('error');
    expect(content).toHaveStyle('visibility: hidden');
    expect(loading).toHaveStyle('visibility: visible');
    expect(error).toHaveStyle('visibility: hidden');
  });
  test('Shows error', async () => {
    const { getByTestId } = render(
      <LoadingHandler error={true} loading={false}>
        <div>anything</div>
      </LoadingHandler>
    );
    const content = getByTestId('content');
    const error = getByTestId('error');
    const loading = getByTestId('loading');
    expect(content).toHaveStyle('visibility: hidden');
    expect(loading).toHaveStyle('visibility: hidden');
    expect(error).toHaveStyle('visibility: visible');
  });
  test('Shows success', async () => {
    const { getByTestId } = render(
      <LoadingHandler error={false} loading={false}>
        <div>anything</div>
      </LoadingHandler>
    );
    const content = getByTestId('content');
    const loading = getByTestId('loading');
    const error = getByTestId('error');
    expect(content).toHaveStyle('visibility: visible');
    expect(loading).toHaveStyle('visibility: hidden');
    expect(error).toHaveStyle('visibility: hidden');
  });
});
