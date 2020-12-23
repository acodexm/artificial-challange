import React, { FunctionComponent } from 'react';
import { State } from './Main';
import { QueryUpdater } from '../helpers/hooks/useQueryAsState';

interface OwnProps {
  pageIndex: number;
  setPage: QueryUpdater<State>;
  isPreviousData: boolean;
  hasMore: boolean;
}

type Props = OwnProps;

const Pagination: FunctionComponent<Props> = ({ pageIndex, setPage, isPreviousData, hasMore }) => {
  return (
    <div>
      <button
        onClick={() => setPage({ pageIndex: Math.max(pageIndex - 1, 0) })}
        disabled={pageIndex === 0}>
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && hasMore) {
            setPage({ pageIndex: pageIndex + 1 });
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !hasMore}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
