import React, { FunctionComponent } from 'react';
import Jobs from './components/Jobs';
import { QueryClient, QueryClientProvider } from 'react-query';

interface OwnProps {}

type Props = OwnProps;
const queryClient = new QueryClient();

const App: FunctionComponent<Props> = () => (
  <QueryClientProvider client={queryClient}>
    <header>HACKER NEWS: Who is hiring?</header>
    <main>
      <Jobs />
    </main>
    <footer>footer</footer>
  </QueryClientProvider>
);

export default App;
