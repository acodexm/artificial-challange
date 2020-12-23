import React, { FunctionComponent, SetStateAction } from 'react';
import { State } from './Main';

interface OwnProps {
  pageIndex: number;
  setPage: React.Dispatch<SetStateAction<State>>;
  isPreviousData: boolean;
  hasMore: boolean;
}

type Props = OwnProps;

const Pagination: FunctionComponent<Props> = ({ pageIndex, setPage, isPreviousData, hasMore }) => {
  return (
    <div>
      <button
        onClick={() =>
          setPage((prevState) => ({ ...prevState, pageIndex: Math.max(pageIndex - 1, 0) }))
        }
        disabled={pageIndex === 0}>
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && hasMore) {
            setPage((prevState) => ({ ...prevState, pageIndex: pageIndex + 1 }));
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
