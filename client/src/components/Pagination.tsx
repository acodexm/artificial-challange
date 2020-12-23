import React, { FunctionComponent } from 'react';
import { State } from './Main';
import { QueryUpdater } from '../helpers/hooks/useQueryAsState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

interface OwnProps {
  pageIndex: number;
  setPage: QueryUpdater<State>;
  isPreviousData: boolean;
  hasMore: boolean;
  isFetching: boolean;
}

type Props = OwnProps;
const StickyButtons = styled.div`
  position: fixed;
  top: 50%;
  right: 1rem;
  left: 1rem;
  button {
    background: none;
    border: none;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
`;
const Pagination: FunctionComponent<Props> = ({
  pageIndex,
  setPage,
  isPreviousData,
  hasMore,
  isFetching,
}) => {
  return (
    <StickyButtons>
      <div>
        <button
          onClick={() => setPage({ pageIndex: Math.max(pageIndex - 1, 0) })}
          disabled={pageIndex === 0}>
          <FontAwesomeIcon icon={faChevronLeft} size={'5x'} />
        </button>
        <span>{isFetching && <FontAwesomeIcon icon={faSpinner} spin size={'5x'} />}</span>
        <button
          onClick={() => {
            if (!isPreviousData && hasMore) {
              setPage({ pageIndex: pageIndex + 1 });
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !hasMore}>
          <FontAwesomeIcon icon={faChevronRight} size={'5x'} />
        </button>
      </div>
    </StickyButtons>
  );
};

export default Pagination;
