import React, { FunctionComponent } from 'react';
import Jobs from './Jobs';
import { RouteComponentProps, withRouter } from 'react-router';
import { useQueryAsState } from '../helpers/hooks/useQueryAsState';

interface OwnProps {}
export type State = {
  thread: string;
  pageIndex: number;
  filters: string[];
  sortBy: string;
  desc: boolean;
};
type Props = OwnProps & RouteComponentProps;

const Main: FunctionComponent<Props> = () => {
  const [state, setState] = useQueryAsState<State>({
    thread: '25266288',
    pageIndex: 0,
    filters: [],
    sortBy: 'date',
    desc: true,
  });
  return (
    <main>
      <Jobs setState={setState} state={state} />
    </main>
  );
};

export default withRouter(Main);
