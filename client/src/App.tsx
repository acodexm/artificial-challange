import React, { FunctionComponent, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BaseCSS } from 'styled-bootstrap-grid';
import { Normalize } from 'styled-normalize';
import { Redirect, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';
import Header from './components/Header';
import Main from './components/Main';
import NotFound from './components/NotFound';

interface Loading {
  hideLoader(): void;
}
const queryClient = new QueryClient();

const App: FunctionComponent<Loading> = ({ hideLoader }) => {
  useEffect(hideLoader, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Normalize />
        <BaseCSS />
        <Header />
        <Switch>
          <Route path={'/jobs'} component={Main} />
          <Route exact path={'/'}>
            <Redirect to={'/jobs'} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
