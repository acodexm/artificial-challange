import React, { FunctionComponent, useLayoutEffect, useState } from 'react';
import Jobs from './Jobs';
import { RouteComponentProps, withRouter } from 'react-router';

interface OwnProps {}
export type State = {
  thread: string;
  pageIndex: number;
  filters: (string | undefined)[];
  sortBy?: string;
  desc?: string;
};
type Props = OwnProps & RouteComponentProps;

const Main: FunctionComponent<Props> = ({ location: { search }, history }) => {
  const [state, setState] = useState<State>({
    thread: '25266288',
    pageIndex: 0,
    filters: [],
    sortBy: 'date',
    desc: 'true',
  });

  useLayoutEffect(() => {
    console.log(2, search);
      const params = new URLSearchParams(search);
      setState({
        thread: params.get('thread') || '25266288',
        pageIndex: Number(params.get('pageIndex')) || 0,
        sortBy: params.get('sortBy') || 'date',
        desc: params.get('desc') || 'true',
        filters: params.getAll('filters') || [],
      });
  }, []);

  useLayoutEffect(() => {
    console.log(3, search);
    const { pageIndex, desc, filters, sortBy, thread } = state;
    const params = new URLSearchParams();
    params.set('pageIndex', String(pageIndex));
    params.set('thread', thread);
    desc && params.set('desc', desc);
    sortBy && params.set('sortBy', sortBy);
    filters &&
      filters.forEach((filter) => {
        filter && params.append('filters', filter);
      });
    const searchParams = '?' + params.toString();
    history.replace({
      pathname: '/jobs',
      search: searchParams,
    });
  }, [state]);

  return (
    <main>
      <Jobs setState={setState} state={state} />
    </main>
  );
};

export default withRouter(Main);
