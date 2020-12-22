import React, { FunctionComponent, SetStateAction } from 'react';

interface OwnProps {
  pageIndex: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  isPreviousData: boolean;
  hasMore: boolean;
}

type Props = OwnProps;

const Pagination: FunctionComponent<Props> = ({ pageIndex, setPage, isPreviousData, hasMore }) => {
  return (
    <div>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={pageIndex === 0}>
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData && hasMore) {
            setPage((old) => old + 1);
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
